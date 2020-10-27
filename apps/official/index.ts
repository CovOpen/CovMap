import { AppConfig, CustomSearchOptions, DefaultSearchOptions, LayerType } from "../../src/app-config.types";
import { AnimatedLogo } from "./components/AnimatedLogo";
import buildJSON from "./build.json";
import { Faq } from "./components/pages/Faq";
import { Imprint } from "./components/pages/Imprint";
import { Legal } from "./components/pages/Legal";
import { Privacy } from "./components/pages/Privacy";
import { Credits } from "./components/pages/Credits";
import { Charts } from "./components/pages/Charts";
import RKI from "./components/pages/RKI";
import ContactBehavior from "./components/pages/ContactBehavior";
import SymptomLevel from "./components/pages/SymptomLevel";
import { BasicRecommendations } from "./components/basic-recommendations/BasicRecommendations";
import { CovMapFeatureInfo } from "./components/CovMapFeatureInfo";
import { RiskLevelsPage } from "./components/risk-levels-page/RiskLevelsPage";
// TODO: Integrate CovQuestions
// import { Questions } from './components/pages/Questions'

const CovMapMappables = [
  {
    property: "riskScore",
    title: (t) => t("translation:risk-score"),
    default: true,
  },
];

const CovMapSearch: DefaultSearchOptions | CustomSearchOptions = {
  placeholder: (t) => t("translation:search-placeholder"),
  nameProp: "name",
  inMappings: [
    {
      id: "riskscore-to-district-area",
      properties: ["name", "zip_codes"],
      getCoordinates: (feature) => {
        //return feature.properties.geo_point_2d TODO
        return [];
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
        id: "charts",
        title: (t) => t("translation:pages.charts"),
        route: "/charts",
        Component: Charts,
      },
      {
        id: "faq-page",
        title: (t) => t("translation:pages.faq"),
        route: "/faq",
        Component: Faq,
      },
      {
        id: "credits",
        title: (t) => t("translation:pages.about"),
        route: "/credits",
        Component: Credits,
      },
      {
        id: "imprint-page",
        title: (t) => t("translation:pages.copyright"),
        route: "/imprint",
        Component: Imprint,
        menuDivider: true,
      },
      {
        id: "legal-page",
        title: (t) => t("translation:pages.legal"),
        route: "/legal",
        Component: Legal,
      },
      {
        id: "privacy-page",
        title: (t) => t("translation:pages.privacy-policy"),
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
      {
        id: "risk-levels-page",
        title: "Risikostufen",
        route: "/risk-levels",
        Component: RiskLevelsPage,
        hidden: true,
      },
      {
        id: "rki-page",
        title: "RKI",
        route: "/rki",
        Component: RKI,
        hidden: true,
      },
      {
        id: "contact-behavior",
        title: "Kontaktverhalten",
        route: "/contact-behavior",
        Component: ContactBehavior,
        hidden: true,
      },
      {
        id: "symptom-level",
        title: "Symptomlast",
        route: "/symptom-level",
        Component: SymptomLevel,
        hidden: true,
      },
      /* {
     id: 'questions-page',
     title: 'Symptome erfassen',
     route: '/questions',
     Component: Questions
   },*/
    ],
    PrivacyComponent: Privacy,
  },
  buildJSON,
  mapSettings: {
    constraints: [
      [56.47462805805594, 2.3730468750000004],
      [43.27103747280261, 17.885742187500004],
    ],
    baseApiUrl: "https://tiles.covmap.de",
    mapStyle: "https://tiles.covmap.de/styles/custom_dark_matter/style.json",
  },
  defaultVisual: "covmap",
  datasources: {
    "contact-index": {
      url: (dateString) =>
        process.env.NODE_ENV === "production"
          ? `https://data.covmap.de/data/map-${dateString}.json`
          : `/data/districts_data_all.json`,
    },
  },
  visuals: {
    covmap: {
      name: "CovMap Fallzahlen",
      description: "Tagesaktuelle Zahlen des RKI - bis jetzt",
      dateFormat: (t, date) => t("translation:formats.date", date),
      mappings: {
        "riskscore-to-district-area": {
          datasourceId: "contact-index",
          featurePropKey: "cca_2",
          geoId: "district-details",
          geoProperty: "cca_2",
          dataProperty: "IdDistrict",
          transformData: transformData,
          calculateLegend: calculateLegend,
        },
        "riskscore-to-district-point": {
          datasourceId: "contact-index",
          geoId: "district-points",
          featurePropKey: "cca_2",
          geoProperty: "cca_2",
          dataProperty: "IdDistrict",
          transformData: transformData,
        },
      },
      layerGroups: [
        {
          id: "areas",
          title: "Flächen",
          mappables: CovMapMappables,
          FeatureInfo: CovMapFeatureInfo,
          layers: ["icons", "areas-fill", "hover"],
          search: CovMapSearch,
          default: true,
        },
      ],
      layers: [
        {
          id: "areas-fill",
          source: "riskscore-to-district-area",
          clickable: true,
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
            beforeId: "place_other",
          }),
        },
        {
          id: "hover",
          source: "riskscore-to-district-area",
          fn: () => ({
            type: LayerType.LINE,
            paint: {
              "line-color": "#627BC1",
              "line-width": ["case", ["boolean", ["feature-state", "hover"], false], 4, 0],
            },
          }),
        },
        {
          id: "icons",
          source: "riskscore-to-district-point",
          fn: (dataField, timeKey) => ({
            type: LayerType.SYMBOL,
            layout: {
              "icon-image": ["match", ["get", "contactScore", ["get", timeKey]], 1, "group-contacts", ""],
              "icon-size": 0.9,
            },
          }),
        },
      ],
    },
  },
  geos: {
    "district-details": {
      url: "/data/de_districts_all.geojson",
    },
    "district-points": {
      url: "/data/de_districts_all_points.geojson",
    },
  },
  imageIcons: [
    {
      id: "group-contacts",
      url: "/images/52px-group-contact.png",
    },
  ],
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
