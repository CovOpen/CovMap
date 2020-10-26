import "./app.css";
import "mapbox-gl/dist/mapbox-gl.css";

import React, { Suspense } from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { NavBar } from "src/components/NavBar";
import { CovMap } from "./components/CovMap";
import { State } from "./state";
import { IntermediateProgress } from "./components/IntermediateProgress";
import { ServiceWorker } from "./components/ServiceWorker";
import { InstallPrompt } from "./components/InstallPrompt";
import { useThunkDispatch } from "src/useThunkDispatch";
import { AppApi } from "src/state/app";
import { getFallbackComponent } from "./components/getFallback";

/**
 * Note: For translations within the Base application we use a namespace called "common",
 * so all shared translations will come from /static/locales/[lang]/common.json
 * App specific translations will come from /apps/official/static/locales/[lang]/translation.json
 */
import "./i18n";

import { HashRouter as Router, Route } from "react-router-dom";

import { config } from "app-config/index";
import { theme } from "./theme";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const App = () => {
  const dispatch = useThunkDispatch();
  const viewportEventsCount = useSelector((state: State) => state.app.viewPortEventsCount);
  const snackbarMessage = useSelector((state: State) => state.app.snackbarMessage);
  let showInstallPrompt = false;
  if (viewportEventsCount > 1000) {
    showInstallPrompt = true;
  }

  function renderRoute(page) {
    return (
      <Route
        path={page.route}
        key={page.id}
        component={() => (
          <div style={{ zIndex: 1095, backgroundColor: "white", width: "100%", minHeight: "100%", flexShrink: 0 }}>
            <page.Component />
          </div>
        )}
        style={{ flex: "1 1 auto", position: "absolute" }}
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ServiceWorker />
        <InstallPrompt shouldShow={showInstallPrompt} />
        <Container
          disableGutters
          maxWidth={false}
          style={{ position: "absolute", height: "100%", display: "flex", flexDirection: "column" }}
        >
          <Suspense fallback={getFallbackComponent()}>
            <Route key="map" path="/:subPage?" component={NavBar} />
          </Suspense>
          <IntermediateProgress />
          {config.content?.pages.map((page) => renderRoute(page))}
          <Suspense fallback={getFallbackComponent()}>
            <Route key="map" path="/:subPage?" component={CovMap} />
          </Suspense>
        </Container>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={!snackbarMessage.done}
          autoHideDuration={snackbarMessage.duration || 6000}
          onClose={() => {
            dispatch(
              AppApi.setSnackbarMessage({
                ...snackbarMessage,
                done: true,
              }),
            );
          }}
        >
          <Alert severity={snackbarMessage.type}>{snackbarMessage.text}</Alert>
        </Snackbar>
      </Router>
    </ThemeProvider>
  );
};

// TODO: Hot only in dev?
export default hot(module)(App);
