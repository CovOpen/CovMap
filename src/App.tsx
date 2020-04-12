import "./app.css";
import "mapbox-gl/dist/mapbox-gl.css"

import React, { useState, useEffect, Suspense } from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { getFallbackComponent } from './components/getFallback';
import { Step } from "state/app";
import { About } from "components/About";
import { NavBar } from "components/NavBar";
import { Imprint } from "./components/Imprint";
import { CovMap } from "./components/CovMap";
import { Welcome } from "./components/Welcome";
import { State } from "./state";
import { IntermediateProgress } from "./components/IntermediateProgress";
import { ServiceWorker } from './components/ServiceWorker';
import { InstallPrompt } from './components/InstallPrompt';

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
  const activeStep = useSelector((state: State) => state.app.activeStep);
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

  function renderContent() {
    switch (activeStep) {
      case Step.Welcome:
        return <Welcome />;
      case Step.Map:
        return <CovMap />;
      case Step.Imprint:
        return <Imprint />
      case Step.About:
        return <About />;
      default:
        return <div>Page not found {Step[activeStep]}</div>;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <ServiceWorker />
      <InstallPrompt />
      <Container style={{  height: innerHeight, padding: 0, maxWidth: 'none' }}>
        <NavBar />
        <Container style={{ position: 'relative', height: innerHeight - 64, paddingLeft: 0, paddingRight: 0, maxWidth: 'none' }}>
          <IntermediateProgress />
          <Suspense fallback={getFallbackComponent()}>
            {renderContent()}
          </Suspense>
        </Container>
      </Container>
    </ThemeProvider>
  )
};

// TODO: Hot only in dev?
export default hot(module)(App);
