import "./app.css";
import "mapbox-gl/dist/mapbox-gl.css"

import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import * as moment from 'moment';
import 'moment/locale/de';
moment.locale('de');

import { NavBar } from "src/components/NavBar";
import { CovMap } from "./components/CovMap";
import { State } from "./state";
import { IntermediateProgress } from "./components/IntermediateProgress";
import { ServiceWorker } from './components/ServiceWorker';
import { InstallPrompt } from './components/InstallPrompt';
import { useThunkDispatch } from "src/useThunkDispatch";
import { AppApi } from "src/state/app";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import { config } from 'app-config/index'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#002E62',
      contrastText: '#E3E9F3'
    },
    primary: {
      main: '#E3E9F3',
      contrastText: '#002E62'
    },
    text: {
      primary: '#002E62'
    },
    warning: {
      main: '#FEAE00',
      contrastText: '#E3E9F3',
    },
    error: {
      main:'#ED4661',
      contrastText: '#E3E9F3',
    },
    success: {
      main: '#10B17E',
      contrastText: '#E3E9F3',
    }
  },
  typography: {
    fontFamily: 'Dosis',
    h1: {
      fontSize: '24px'
    },
    h2: {
      fontSize: '20px'
    }
  }
});

export const App = () => {
  const dispatch = useThunkDispatch();
  const currentLayerGroup = useSelector((state: State) => state.app.currentLayerGroup);
  const viewportEventsCount = useSelector((state: State) => state.app.viewPortEventsCount);
  const snackbarMessage = (useSelector((state: State) => state.app.snackbarMessage))
  let showInstallPrompt = false
  if (viewportEventsCount > 1000) {
    showInstallPrompt = true
  }
  const [innerHeight, setInnerHeight] = useState(window.innerHeight)

  const timeout: any = null;
  const resizeListener = () => {
    clearTimeout(timeout);
    setTimeout(() => setInnerHeight(window.innerHeight), 350)
  }

  useEffect(() => {
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  });

  function renderRoute(page) {
    return (
      <Route
        path={page.route}
        key={page.id}
        render={() => (
          <page.Component />
        )}
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ServiceWorker />
        <InstallPrompt shouldShow={showInstallPrompt} />
        <Container style={{  height: innerHeight, padding: 0, maxWidth: 'none' }}>
          <NavBar showSearch={!!currentLayerGroup.search} />
          <Container style={{ position: 'relative', height: innerHeight - 64, paddingLeft: 0, paddingRight: 0, maxWidth: 'none' }}>
            <IntermediateProgress />
            <Switch>
              <Route key="map" exact path="/" render={() => (<CovMap />)} />
              {config.content?.pages.map(renderRoute)}
            </Switch>
          </Container>
        </Container>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={!snackbarMessage.done}
          autoHideDuration={snackbarMessage.duration || 6000}
          onClose = {() => {
            dispatch(AppApi.setSnackbarMessage({
              ...snackbarMessage,
              done: true
            }))
          }}
        >
          <Alert severity={snackbarMessage.type}>{snackbarMessage.text}</Alert>
        </Snackbar>
      </Router>
    </ThemeProvider>
  )
};

// TODO: Hot only in dev?
export default hot(module)(App);
