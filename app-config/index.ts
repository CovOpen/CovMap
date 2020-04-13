import { AppConfig, LayerType } from "../src/app-config.types"
import { AnimatedLogo } from "./components/AnimatedLogo"
import buildJSON from "./build.json"
import { Welcome } from "./components/pages/Welcome"
import { About } from "./components/pages/About"
import { Imprint } from "./components/pages/Imprint"
import { RKIFeatureInfo } from "./components/RKIFeatureInfo"

export const config: AppConfig = {
  ui: {
    Logo: AnimatedLogo
  },
  content: {
    pages: [{
      id: 'welcome-page',
      title: 'Willkommen',
      Component: Welcome
    }, {
      id: 'about-page',
      title: 'About',
      Component: About
    }, {
      id: 'imprint-page',
      title: 'Impressum',
      Component: Imprint
    }]
  },
  buildJSON,
  mapSettings: {
    constraints: [[56.47462805805594,  2.3730468750000004], [43.27103747280261, 17.885742187500004]]
  },
  defaultVisual: 'rki',
  datasources: {
    'rki-case-numbers': {
      url: (dateString) => `https://warte.app/api/rki/rki-district-case-numbers?fields=BL,RS,EWZ,cases,deaths,cases_per_100k,cases_per_population,cases7_per_100k,death_rate&limit=0&date=${dateString}`
    }
  },
  visuals: {
    'rki': {
      name: 'RKI Betroffenenrate',
      description: 'Anteil der betroffenen pro Landkreis',
      defaultMapping: 'cases-per-population',
      mappings: {
        'cases-per-population': {
          datasourceId: 'rki-case-numbers',
          geoId: 'districts-city-details',
          geoProperty: 'cca_2',
          dataProperty: 'RS',
          FeatureInfo: RKIFeatureInfo,
          transformData: (json) => {
            if (!json.result.length) {
              return null
            }

            const propertiesByCCA2 = json.result.reduce((acc, curr) => Object.assign(acc, {
              [curr.RS]: curr
            }), {})

            return {
              data: propertiesByCCA2
            };
          }
        }
      },
      layers: [
        (dataField, timeKey) => ({
          id: "areas-fill",
          sourceId: "cases-per-population",
          type: LayerType.FILL,
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', dataField, ['get', timeKey]],
              // ['get', dataField],
              0, '#f8fbff',
              0.05, '#e1ebf5',
              0.1, '#cadbed',
              0.3, '#a6c9df',
              0.5, '#79add2',
              0.8, '#5591c3',
              1, '#3771b0',
              1.2, '#205297',
              1.4, '#113068',
            ],
            'fill-opacity': 0.8,
          }
        }),
        () => ({
          id: "areas-borders",
          sourceId: "cases-per-population",
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
      ],
      search: {
        placeholder: 'Landkreis',
        inMappings: [{
          id: 'cases-per-population',
          properties: ['name_2'],
          getCoordinates: (feature) => {
            return feature.properties.geo_point_2d
          }
        }]
      }
    },
  },
  geos: {
    'districts-city-details': {
      url: '/data/districts_small.geojson'
    }
  }
}