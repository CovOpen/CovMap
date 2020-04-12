import { AppConfig } from "../src/app-config.types"
import { AnimatedLogo } from "./components/AnimatedLogo"
import buildJSON from "./build.json"

export const config: AppConfig = {
  ui: {
    Logo: AnimatedLogo
  },
  buildJSON
}