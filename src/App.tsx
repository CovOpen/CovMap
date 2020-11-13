import "./app.css";
import "mapbox-gl/dist/mapbox-gl.css";

import React, { Suspense } from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";
import { NavBar } from "src/components/NavBar";
import { CovMap } from "./components/CovMap";
import type { State } from "./state";
import { IntermediateProgress } from "./components/IntermediateProgress";
import { ServiceWorker } from "./components/ServiceWorker";
import { InstallPrompt } from "./components/InstallPrompt";
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

export const App = () => {
  const viewportEventsCount = useSelector((state: State) => state.app.viewPortEventsCount);
  let showInstallPrompt = false;
  if (viewportEventsCount > 1000) {
    showInstallPrompt = true;
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AutoProgressDate />
        <ServiceWorker />
        <Suspense fallback={getFallbackComponent()}>
          <InstallPrompt shouldShow={showInstallPrompt} />
        </Suspense>
        <Container
          disableGutters
          maxWidth={false}
          style={{ position: "absolute", height: "100%", display: "flex", flexDirection: "column" }}
        >
          <Suspense fallback={getFallbackComponent()}>
            <Route key="map" path="/:subPage?" component={NavBar} />
          </Suspense>
          <IntermediateProgress />
          {config.content?.pages.map((page, id) => (
            <Suspense key={id} fallback={getFallbackComponent()}>
              <RenderPageRoute page={page} />
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
export default hot(module)(App);
