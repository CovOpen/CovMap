import { AppConfig, LayerType } from "../../src/app-config.types";
import { AnimatedLogo } from "./components/AnimatedLogo";
import buildJSON from "./build.json";
import { Faq } from "./components/pages/Faq";
import { Imprint } from "./components/pages/Imprint";
import { Legal } from "./components/pages/Legal";
import { Privacy } from "./components/pages/Privacy";
import BasicRecommendations from "./components/pages/BasicRecommendations";
import { CovMapFeatureInfo } from "./components/CovMapFeatureInfo";
// TODO: Integrate CovQuestions
// import { Questions } from './components/pages/Questions'

const CovMapMappables = [
  {
    property: "riskScore",
    title: "Risikoeinschätzung",
    default: true,
  },
];

const CovMapSearch = {
  placeholder: "PLZ oder Landkreis",
  nameProp: "name",
  inMappings: [
    {
      id: "CI-to-plz",
      properties: ["name", "zip_codes"],
      getCoordinates: (feature) => {
        //return feature.properties.geo_point_2d TODO
      },
    },
  ],
  notFoundMessage: "Leider keinen Landkreis gefunden.",
};

export const config: AppConfig = {
  ui: {
    Logo: AnimatedLogo,
  },
  showSettings: false,
  showTimeNavigation: false,
  content: {
    pages: [
      {
        id: "faq-page",
        title: "Fragen und Antworten",
        route: "/faq",
        Component: Faq,
      },
      {
        id: "imprint-page",
        title: "Impressum",
        route: "/imprint",
        Component: Imprint,
      },
      {
        id: "legal-page",
        title: "Rechtliches",
        route: "/legal",
        Component: Legal,
      },
      {
        id: "privacy-page",
        title: "Datenschutz",
        route: "/privacy-statement",
        Component: Privacy,
      },
      {
        id: "basic-recommendations",
        title: "Empfehlungen",
        route: "/recommendations",
        Component: BasicRecommendations,
        hidden: true, // dont show this page in the navbar
      },
      /* {
     id: 'questions-page',
     title: 'Symptome erfassen',
     route: '/questions',
     Component: Questions
   },*/
    ],
  },
  buildJSON,
  mapSettings: {
    constraints: [
      [56.47462805805594, 2.3730468750000004],
      [43.27103747280261, 17.885742187500004],
    ],
  },
  defaultVisual: "covmap",
  datasources: {
    "contact-index": {
      url: (dateString) => `/data/districts_data_all.json`,
    },
  },
  visuals: {
    covmap: {
      name: "CovMap Fallzahlen",
      description: "Tagesaktuelle Zahlen des RKI - bis jetzt",
      dateFormat: "dddd, Do MMMM YYYY",
      mappings: {
        "CI-to-plz": {
          datasourceId: "contact-index",
          geoId: "plz-details",
          geoProperty: "cca_2",
          dataProperty: "IdDistrict",
          transformData: transformData,
          calculateLegend: calculateLegend,
        },
      },
      layerGroups: [
        {
          id: "areas",
          title: "Flächen",
          mappables: CovMapMappables,
          FeatureInfo: CovMapFeatureInfo,
          layers: ["areas-fill", "hover"],
          search: CovMapSearch,
          default: true,
        },
      ],
      layers: [
        {
          id: "areas-fill",
          source: "CI-to-plz",
          // showLegend: true,
          fn: (dataField, timeKey) => ({
            type: LayerType.FILL,
            paint: {
              "fill-color": [
                "interpolate",
                ["linear"],
                ["get", dataField, ["get", timeKey]],
                1,
                "#219653",
                2,
                "#EEC341",
                3,
                "#E84C4C",
              ],
              "fill-opacity": 0.5,
            },
            beforeId: "road-label",
          }),
        },
        {
          id: "hover",
          source: "CI-to-plz",
          fn: () => ({
            type: LayerType.LINE,
            paint: {
              "line-color": "#627BC1",
              "line-width": ["case", ["boolean", ["feature-state", "hover"], false], 4, 0],
            },
          }),
        },
      ],
    },
  },
  geos: {
    "plz-details": {
      url: "/data/de_districts_all.geojson",
    },
  },
};

function transformData(json) {
  if (!json.length) {
    return null;
  }

  return {
    data: json.reduce(
      (acc, elem) =>
        Object.assign(acc, {
          [elem.IdDistrict]: elem,
        }),
      {},
    ),
  };
}

/**
 * Calcultes the y-Values and the labels for the legend
 */
function calculateLegend(data, propertyName) {
  const legend = Array(3)
    .fill(undefined)
    .map((_val, index) => {
      const y = index / 2;
      const labelText = index.toString();

      return [y, labelText];
    });

  return legend;
}
