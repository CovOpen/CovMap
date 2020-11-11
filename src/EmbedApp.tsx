import "./app.css";
import "mapbox-gl/dist/mapbox-gl.css";

import React, { Suspense } from "react";
import { hot } from "react-hot-loader";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";

import { CovMap } from "./components/CovMap";
import { IntermediateProgress } from "./components/IntermediateProgress";
import { ServiceWorker } from "./components/ServiceWorker";
import { getFallbackComponent } from "./components/getFallback";
import { AutoProgressDate } from "./components/AutoProgressDate";
import { RenderPageRoute } from "./components/RenderPageRoute";
import { GlobalSnackbar } from "./components/GlobalSnackbar";

/**
 * Note: For translations within the Base application we use a namespace called "common",
 * so all shared translations will come from /static/locales/[lang]/common.json
 * App specific translations will come from /apps/official/static/locales/[lang]/translation.json
 */
import "./i18n";

import { HashRouter as Router, Route } from "react-router-dom";

import { config } from "app-config/index";
import { theme } from "./theme";

export const EmbedApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AutoProgressDate />
        <ServiceWorker />
        <Container
          disableGutters
          maxWidth={false}
          style={{ position: "absolute", height: "100%", display: "flex", flexDirection: "column" }}
        >
          <IntermediateProgress />
          {config.content?.pages.map((page, id) => (
            <Suspense fallback={getFallbackComponent()}>
              <RenderPageRoute key={id} page={page} />
            </Suspense>
          ))}
          <Suspense fallback={getFallbackComponent()}>
            <Route key="map" path="/:subPage?" component={CovMap} />
          </Suspense>
        </Container>
        <GlobalSnackbar />
      </Router>
    </ThemeProvider>
  );
};

// TODO: Hot only in dev?
export default hot(module)(EmbedApp);
