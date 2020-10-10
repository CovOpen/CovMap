import { AppConfig, LayerType } from "../../src/app-config.types"
import { AnimatedLogo } from "./components/AnimatedLogo"
import buildJSON from "./build.json"
import { About } from "./components/pages/About"
import { Imprint } from "./components/pages/Imprint"
import { CovMapFeatureInfo } from "./components/CovMapFeatureInfo"
// TODO: Integrate CovQuestions
// import { Questions } from './components/pages/Questions'

import netcheckCIData from "../../data/netcheck_ci.json"

const CovMapMappables = [{
  property: 'CI_scaled',
  title: 'Contact Index C',
  default: true
}]

const CovMapSearch = {
  placeholder: 'PLZ',
  nameProp: 'note',
  inMappings: [{
    id: 'CI-to-plz',
    properties: ['note'],
    getCoordinates: (feature) => {
      //return feature.properties.geo_point_2d TODO
    }
  }],
  notFoundMessage: 'Leider keinen Landkreis gefunden.'
}

export const config: AppConfig = {
  ui: {
    Logo: AnimatedLogo
  },
  showSettings: false,
  showTimeNavigation: false,
  content: {
    pages: [{
      id: 'about-page',
      title: 'Info',
      route: '/about',
      Component: About
    }, {
      id: 'imprint-page',
      title: 'Impressum',
      route: '/imprint',
      Component: Imprint
    },/* {
      id: 'questions-page',
      title: 'Symptome erfassen',
      route: '/questions',
      Component: Questions
    },*/
    ]
  },
  buildJSON,
  mapSettings: {
    constraints: [[56.47462805805594,  2.3730468750000004], [43.27103747280261, 17.885742187500004]]
  },
  defaultVisual: 'covmap',
  datasources: {
    'contact-index': {
      url: (dateString) => `data:application/json,${JSON.stringify(netcheckCIData)}`
    }
  },
  visuals: {
    'covmap': {
      name: 'CovMap Fallzahlen',
      description: 'Tagesaktuelle Zahlen des RKI - bis jetzt',
      dateFormat: 'dddd, Do MMMM YYYY',
      mappings: {
        'CI-to-plz': {
          datasourceId: 'contact-index',
          geoId: 'plz-details',
          geoProperty: 'plz',
          dataProperty: 'plz',
          transformData: transformData,
          calculateLegend: calculateLegend,
        }
      },
      layerGroups: [{
        id: 'areas',
        title: 'Flächen',
        mappables: CovMapMappables,
        FeatureInfo: CovMapFeatureInfo,
        layers: ['areas-fill', 'hover'],
        search: CovMapSearch,
        default: true
      }],
      layers: [
        {
          id: "areas-fill",
          source: "CI-to-plz",
          showLegend: true,
          fn: (dataField, timeKey) => ({
            type: LayerType.FILL,
            paint: {
              'fill-color': [
                'interpolate',
                ['linear'],
                ['get', dataField, ['get', timeKey]],
                // ['get', dataField],
                0, '#f8fbff',
                0.025, '#e1ebf5',
                0.05, '#cadbed',
                0.1, '#a6c9df',
                0.2, '#79add2',
                0.35, '#5591c3',
                0.5, '#3771b0',
                0.65, '#205297',
                0.8, '#113068',
              ],
              'fill-opacity': 0.8,
            }
          })
        },
        {
          id: "hover",
          source: "CI-to-plz",
          fn: () => ({
            type: LayerType.LINE,
            paint: {
              'line-color': '#627BC1',
              'line-width': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                4,
                0
              ]
            }
          })
        }
      ],
    },
  },
  geos: {
    'plz-details': {
      url: '/data/postleitzahlen-deutschland.geojson'
    },
  }
}

/**
 * This function calclulates approximate lower and upper bounds and a
 * distance between labels for readable legends
 */
function calculateNumericScale(minData, maxData) {
  // The minimum and maximum number of legend labels
  const minLabels = 6, maxLabels = 10

  // This function works by calculating the number of digits and then dividing or scaling by 2 until it kinda fits
  let distanceBetweenLabels = Math.pow(10, Math.floor(Math.log10(maxData)))
  let lowestLabel
  let highestLabel
  let numLabels

  function recalculateLabels()
  {
    highestLabel = Math.ceil(maxData / distanceBetweenLabels) * distanceBetweenLabels
    lowestLabel = Math.floor(minData / distanceBetweenLabels) * distanceBetweenLabels
    numLabels = highestLabel / distanceBetweenLabels - lowestLabel / distanceBetweenLabels + 1
  }

  recalculateLabels()
  while(numLabels < minLabels)
  {
    distanceBetweenLabels /= 2
    recalculateLabels()
  }
  while(numLabels > maxLabels)
  {
    distanceBetweenLabels *= 2
    recalculateLabels()
  }
  return {distanceBetweenLabels, lowestLabel, highestLabel, numLabels}
}

function calculateBounds(data, propertyName) {
  let min = Infinity, max = -Infinity

  for (const featureID of Object.keys(data)) {
    const value = data[featureID][propertyName]
    min = Math.min(value, min);
    max = Math.max(value, max);
  }

  return {min, max}
}

function scaleProperty(data, newPropertyName, propertyName) {
  const {min, max} = calculateBounds(data, propertyName)
  const {lowestLabel, highestLabel} = calculateNumericScale(min, max)
  
  const offset = lowestLabel;
  const scale = 1 / (highestLabel - lowestLabel)
  
  for (const featureID of Object.keys(data)) {
    const feature = data[featureID]
    feature[newPropertyName] = (feature[propertyName] - offset) * scale
  }
}

function scaleProperties(data, postfix, propertyNames) {
  for(const propertyName of propertyNames) {
    scaleProperty(data, `${propertyName}${postfix}`, propertyName)
  }
  return data
}

function transformData(json) {
  if (!json.length) {
    return null
  }

  const propertiesByPLZ = {}
  json.forEach((properties) => propertiesByPLZ[properties.plz] = properties)

  const scaledData = scaleProperties(propertiesByPLZ, '_scaled', [
    'CI',
  ])

  return {
    data: scaledData
  };
}

/**
 * Calcultes the y-Values and the labels for the legend
 */
function calculateLegend(data, propertyName) {

  if(!propertyName.endsWith('_scaled'))
    return null;

  propertyName = propertyName.substring(0, propertyName.length - '_scaled'.length)

  const {min, max} = calculateBounds(data, propertyName)
  const {distanceBetweenLabels, lowestLabel, numLabels} = calculateNumericScale(min, max)
  
  const legend = Array(numLabels).fill(undefined).map((_val, index) => {
    const y = index / ( numLabels - 1)
    const labelText = (index * distanceBetweenLabels + lowestLabel).toString()
    
    return [y, labelText]
  })

  return legend
}
