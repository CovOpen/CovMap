import "./app.css";
import "mapbox-gl/dist/mapbox-gl.css";

import React from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import * as moment from "moment";
import "moment/locale/de";
moment.locale("de");

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#2274E3",
      contrastText: "#E3E9F3",
    },
    primary: {
      main: "#E3E9F3",
      contrastText: "#161616",
    },
    text: {
      primary: "#161616",
    },
    warning: {
      main: "#FEAE00",
      contrastText: "#E3E9F3",
    },
    error: {
      main: "#ED4661",
      contrastText: "#E3E9F3",
    },
    success: {
      main: "#10B17E",
      contrastText: "#E3E9F3",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: {
      fontSize: "24px",
      fontWeight: 600,
    },
    h2: {
      fontSize: "20px",
    },
    h3: {
      fontSize: "16px",
      fontWeight: 600,
    },
  },
});

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
    return <Route path={page.route} key={page.id} render={() => <page.Component />} />;
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
