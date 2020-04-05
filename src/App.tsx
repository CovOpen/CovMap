import "./app.css";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// https://github.com/PaulLeCam/react-leaflet/issues/453
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
  iconUrl: require('leaflet/dist/images/marker-icon.png').default,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
});

import React from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import { SnackbarProvider } from 'notistack';
import Container from "@material-ui/core/Container";

import { Step } from "state/app";
import { About } from "components/About";
import { NavBar } from "components/NavBar";
import { Imprint } from "./components/Imprint";
import { CovMap } from "./components/CovMap";
import { Welcome } from "./components/Welcome";
import { State } from "./state";

export const App = () => {
  const activeStep = useSelector((state: State) => state.app.activeStep);

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

  return <>
    <SnackbarProvider maxSnack={3}>
      <>
        <NavBar />
        <Container style={{height: '100%', paddingLeft: 0, paddingRight: 0, maxWidth: 'none' }}>
          {renderContent()}
        </Container>
      </>
    </SnackbarProvider>
  </>
};

// TODO: Hot only in dev?
export default hot(module)(App);
