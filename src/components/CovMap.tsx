import React, { useEffect, createRef, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from "@material-ui/core/Typography";
import moment from 'moment';
import { useParams } from "react-router-dom";

import { State } from "../state";
import { AppApi } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";
import { Zoom } from './Zoom';
import { OfflineIndicator } from './OfflineIndicator';
import { TopLeftContainer } from './TopLeftContainer';
import { TimeNav } from './TimeNav';
import { WelcomeStepsModal } from './WelcomeStepsModal/WelcomeStepsModal';
import { WelcomeInfo } from './WelcomeInfo';
import { WelcomeInfoButton } from './WelcomeInfoButton';
import { GLMap } from './GLMap'
import { Legend } from './Legend'
import { Settings } from './Settings'
import { config } from 'app-config/index'

const useStyles = makeStyles((theme) => ({
  main: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    display: 'flex',
    'flex-direction': 'column',
  },
  currentInfo: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: theme.spacing(2),
    zIndex: 1100,
    textShadow: `
      -1px -1px 0 rgba(0,0,0,0.36),
      1px -1px 0 rgba(0,0,0,0.36),
      -1px 1px 0 rgba(0,0,0,0.36),
      1px 1px 0 rgba(0,0,0,0.36);
    `,
    '& h2': {
      fontWeight: 600
    },
    '& h6': {
      fontWeight: 600
    },
    textAlign: 'right',
    touchAction: 'none'
  }
}));

let viewPortEventCounter = 0

// Note: React hooks ref diffing workaround
let previousMapRef = null;
let FlyToInterpolator = null
async function loadFlyTo() {
  const { default: FlyTo } = await import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/es6/utils/transition/viewport-fly-to-interpolator')
  FlyToInterpolator = FlyTo
}

export const CovMap = () => {
  const classes = useStyles();
  const dispatch = useThunkDispatch();
  const urlParams = useParams<{subPage?: string}>()
  // const position = useSelector((state: State) => state.app.currentPosition); // TODO
  const currentVisual = useSelector((state: State) => state.app.currentVisual);
  const datasetFound = useSelector((state: State) => state.app.datasetFound);
  const currentFeature = useSelector((state: State) => state.app.currentFeature);
  const currentMappable = useSelector((state: State) => state.app.currentMappable);
  const currentDate = useSelector((state: State) => state.app.currentDate);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false)
  const mapRef = createRef<any>();
  const visual = config.visuals[currentVisual]

  const handleMapBusy = () => {
    dispatch(AppApi.pushLoading('map-busy'))
  }

  const handleMapIdleOrRemoved = () => {
    dispatch(AppApi.popLoading('map-busy'))
  }

  useEffect(() => {
    loadFlyTo()
    const interval = setInterval(() => {
      if (viewPortEventCounter > 1000) {
        clearInterval(interval)
      }

      dispatch(AppApi.setViewportEventCount(viewPortEventCounter))
    }, 10000)
  }, []);

  // Note: This is to ensure the event listeners are attached only once,
  // because react useEffect fires multiple times, even though mapRef.current did not change
  const changedMapRef = previousMapRef !== mapRef.current;
  useEffect(() => {
    previousMapRef = mapRef.current;
  }, [mapRef])
  useEffect(function () {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      map.on('dataloading', handleMapBusy)
      map.on('idle', handleMapIdleOrRemoved)
      map.once('remove', handleMapIdleOrRemoved)
    }

    return () => {
      if (mapRef.current) {
        const map = mapRef.current.getMap();
        map.off('dataloading', handleMapBusy)
        map.off('idle', handleMapIdleOrRemoved)
      }
    }
  }, [changedMapRef])

  const resetFeature = (feature) => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      map.setFeatureState(
        { source: feature.source, id: feature.id },
        { hover: false }
      );
    }
  }

  useEffect(() => {
    if (!mapLoaded) {
      return
    }
    if (currentFeature.previousFeature) {
      resetFeature(currentFeature.previousFeature)
    }
    if (currentFeature.feature) {
      if (mapRef.current) {
        const map = mapRef.current.getMap();
        map.setFeatureState(
          { source: currentFeature.feature.source, id: currentFeature.feature.id },
          { hover: true }
        );
      }
    }
  }, [currentFeature])

  const onViewportChange = (newViewPort) => {
    viewPortEventCounter += 1

    // Note: Explicitly not spreading stateViewport in here,
    // because it blows up with the transition interpolators
    dispatch(AppApi.setViewport(newViewPort))
  }

  const mappingLayers = Object.keys(visual.mappings);
  const handleMapClick = (pointerEvent, stateViewport) => {
    const { features } = pointerEvent;
    if (features.length > 0) {
      if (mapRef.current) {
        if (!mappingLayers.includes(features[0].source)) {
          return;
        }
      }

      dispatch(AppApi.setCurrentFeature(features[0], pointerEvent.lngLat));

      if (stateViewport.zoom > 7) {
        const newViewport = {
          ...stateViewport,
          latitude: pointerEvent.lngLat[1],
          longitude: pointerEvent.lngLat[0],
          transitionDuration: 400,
          transitionInterpolator: FlyToInterpolator ? new (FlyToInterpolator as any)({ curve: 1 }) : null
        };
        dispatch(AppApi.setViewport(newViewport));
      }
    }
  }

  const handleMapLoaded = () => {
    setMapLoaded(true)
  }

  return (
    <div className={classes.main}>
      <div className={classes.currentInfo}>
        {/*<Typography variant="h2" color="primary">{visual.name}</Typography>*/}
        <Typography variant="h2" color="primary">{currentMappable.title}</Typography>
        <Typography variant="subtitle1" color="primary">{moment(currentDate).format(visual.dateFormat)}</Typography>
      </div>
      {config.showSettings === false ? null : <Settings />}
      <Zoom />
      <TopLeftContainer>
        {visual.InfoComponent ? <WelcomeInfoButton /> : null}
        <OfflineIndicator />
      </TopLeftContainer>
      {visual.InfoComponent ? <WelcomeInfo /> : null}
      <GLMap 
        mapRef={mapRef}
        onMapClick={handleMapClick}
        onViewportChange={onViewportChange}
        onLoad={handleMapLoaded}
      />
      {config.showTimeNavigation === false ? null : <TimeNav />}
      <Legend />
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={!datasetFound}
        style={{
          zIndex: 1190,
          touchAction: 'none'
        }}
      >
        <DialogTitle id="simple-dialog-title" style={{
          touchAction: 'none'
        }}>
          Keine Daten für den ausgewählten Zeitraum.
        </DialogTitle>
      </Dialog>
      <WelcomeStepsModal subPage={urlParams.subPage}/>
    </div>
  );
};
