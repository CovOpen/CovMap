import { AppConfig } from "../src/app-config.types"
import { AnimatedLogo } from "./components/AnimatedLogo"
import buildJSON from "./build.json"
import { Welcome } from "./components/pages/Welcome"
import { About } from "./components/pages/About"
import { Imprint } from "./components/pages/Imprint"

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
          transformData: (json) => {
            const propertiesByCCA2 = json.result.reduce((acc, curr) => Object.assign(acc, {
              [curr.RS]: curr
            }), {})

            return {
              data: propertiesByCCA2
            };
          }
        }
      }
    }
  },
  geos: {
    'districts-city-details': {
      url: '/data/districts_small.geojson'
    }
  }
}