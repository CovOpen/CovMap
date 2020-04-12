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
  }
}