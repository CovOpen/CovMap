import "./app.css";
import "mapbox-gl/dist/mapbox-gl.css"

import React, { useState, useEffect, Suspense } from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import { SnackbarProvider } from 'notistack';
import Container from "@material-ui/core/Container";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Step } from "state/app";
import { About } from "components/About";
import { NavBar } from "components/NavBar";
import { Imprint } from "./components/Imprint";
import { CovMap } from "./components/CovMap";
import { Welcome } from "./components/Welcome";
import { State } from "./state";
import { IntermediateProgress } from "./components/IntermediateProgress";

const fallbackComponent = () => {
  return (
    <Backdrop open={true}>
      <CircularProgress></CircularProgress>
    </Backdrop>
  )
}

export const App = () => {
  const activeStep = useSelector((state: State) => state.app.activeStep);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight)
  const timeout: any = null;
  const resizeListener = () => {
    clearTimeout(timeout);
    setTimeout(() => setInnerHeight(window.innerHeight), 100)
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
    <SnackbarProvider maxSnack={3}>
      <Container style={{  height: innerHeight, padding: 0, maxWidth: 'none' }}>
        <NavBar />
        <Container style={{ position: 'relative', height: innerHeight - 64, paddingLeft: 0, paddingRight: 0, maxWidth: 'none' }}>
          <IntermediateProgress />
          <Suspense fallback={fallbackComponent()}>
            {renderContent()}
          </Suspense>
        </Container>
      </Container>
    </SnackbarProvider>
  )
};

// TODO: Hot only in dev?
export default hot(module)(App);
