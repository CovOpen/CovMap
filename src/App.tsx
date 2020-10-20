import "./app.css";
import "mapbox-gl/dist/mapbox-gl.css";

import React from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import * as moment from "moment";
import "moment/locale/de";
import { NavBar } from "src/components/NavBar";
import { CovMap } from "./components/CovMap";
import { State } from "./state";
import { IntermediateProgress } from "./components/IntermediateProgress";
import { ServiceWorker } from "./components/ServiceWorker";
import { InstallPrompt } from "./components/InstallPrompt";
import { useThunkDispatch } from "src/useThunkDispatch";
import { AppApi } from "src/state/app";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { config } from "app-config/index";
import { theme } from "./theme";

moment.locale("de");

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const App = () => {
  const dispatch = useThunkDispatch();
  const currentLayerGroup = useSelector((state: State) => state.app.currentLayerGroup);
  const viewportEventsCount = useSelector((state: State) => state.app.viewPortEventsCount);
  const snackbarMessage = useSelector((state: State) => state.app.snackbarMessage);
  let showInstallPrompt = false;
  if (viewportEventsCount > 1000) {
    showInstallPrompt = true;
  }

  function renderRoute(page) {
    return <Route path={page.route} key={page.id} component={page.Component} />;
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
          <NavBar showSearch={!!currentLayerGroup.search} />
          <IntermediateProgress />
          <Container disableGutters maxWidth={false} style={{ flex: "1 1 auto", position: "relative" }}>
            <Switch>
              {config.content?.pages.map((page) => renderRoute(page))}
              <Route key="map" path="/:subPage?" component={CovMap} />
            </Switch>
          </Container>
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
