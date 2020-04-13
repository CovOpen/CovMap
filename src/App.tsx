import "./app.css";
import "mapbox-gl/dist/mapbox-gl.css"

import React, { useState, useEffect, Suspense } from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { getFallbackComponent } from './components/getFallback';
import { InternalPages } from "state/app";
import { NavBar } from "components/NavBar";
import { CovMap } from "./components/CovMap";
import { State } from "./state";
import { IntermediateProgress } from "./components/IntermediateProgress";
import { ServiceWorker } from './components/ServiceWorker';
import { InstallPrompt } from './components/InstallPrompt';
import { AppPage } from './app-config.types'

import { config } from '../app-config/index'

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

const pagesById: Record<string, AppPage> = config.content?.pages.reduce((acc, page) => Object.assign(acc, {
  [page.id]: page
}), {}) || {}

export const App = () => {
  const activePage = useSelector((state: State) => state.app.activePage);
  const currentVisual = useSelector((state: State) => state.app.currentVisual);
  const viewportEventsCount = useSelector((state: State) => state.app.viewPortEventsCount);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight)
  const visual = config.visuals[currentVisual]
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
    switch (activePage) {
      case InternalPages.MAP: {
        return <CovMap />;
      }
      default: {
        const PageComponent = pagesById[activePage].Component
        if (!PageComponent) {
          return <div>Page not found &quot;{activePage}&quot;</div>;
        }
        return <PageComponent />
      }
    }
  }
  
  return (
    <ThemeProvider theme={theme}>
      <ServiceWorker />
      <InstallPrompt shouldShow={viewportEventsCount > 1000} />
      <Container style={{  height: innerHeight, padding: 0, maxWidth: 'none' }}>
        <NavBar showSearch={!!visual.search} />
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
