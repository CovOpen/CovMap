# app-config

The `src` folder contains a white-label mapping app and consumes configuration for visuals as js objects
and content as react components from the `app-config`.

If `app-config` contains a `static` folder, it will be copied to the `dist` via webpack.

## index.ts

The build process expects an `index.ts` at `app-config`.
Possible configuration and customization values are described in the `AppConfig` type,
at `src/app-config.types.ts`.

### build.json

Webpack uses a JSON customization file, which has to be at `app-config/build.json`
and it is expected to exposed from `app-config/index.ts` as well.
