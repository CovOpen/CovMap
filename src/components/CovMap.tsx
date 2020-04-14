import React, { useEffect, createRef } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from "@material-ui/core";
import { LazyError } from './LazyError'
const ReactMapGL = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/es6/components/interactive-map')
  .catch(() => ({ default: LazyError })));

import { State } from "../state";
import { AppApi } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";
import { Settings } from './Settings';
import { Zoom } from './Zoom';
import { MAX_ZOOM_LEVEL } from '../constants';
import { TimeRangeSlider } from './TimeRangeSlider';
import { Visual } from './Visual';
import { FeatureInfo } from './FeatureInfo';
import { config } from '../../app-config/index'
 
const useStyles = makeStyles((theme) => ({
  main: {
    height: '100%',
    position: 'relative',
    display: 'flex',
    'flex-direction': 'column',
  },
  currentInfo: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: theme.spacing(2),
    zIndex: 1100,
    textShadow: '0px 0px 6px rgba(0,0,0,0.86)',
    '& h2': {
      // fontWeight: 600
    }
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
  // const position = useSelector((state: State) => state.app.currentPosition); // TODO
  const currentVisual = useSelector((state: State) => state.app.currentVisual);
  const stateViewport = useSelector((state: State) => state.app.viewport);
  const datasetFound = useSelector((state: State) => state.app.datasetFound);
  const currentFeature = useSelector((state: State) => state.app.currentFeature);
  const currentMappable = useSelector((state: State) => state.app.currentMappable);
  const mapRef = createRef<any>();
  const visual = config.visuals[currentVisual]

  const handleMapBusy = () => {
    dispatch(AppApi.pushLoading('map-busy', 'Map is rendering stuff...'))
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

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

  const onViewportChange = ({ latitude, longitude, zoom, pitch, bearing }) => {
    viewPortEventCounter += 1
    const newViewPort = {
      // ...stateViewport,
      pitch,
      bearing,
      zoom,
      latitude,
      longitude,
    }

    if (config.mapSettings?.constraints) {
      const constraints = config.mapSettings?.constraints
      newViewPort.latitude = clamp(latitude, constraints[1][0], constraints[0][0])
      newViewPort.longitude = clamp(longitude, constraints[0][1], constraints[1][1])
    }
    
    dispatch(AppApi.setViewport(newViewPort))
  }

  const mappingLayers = Object.keys(visual.mappings);
  const handleMapClick = (pointerEvent) => {
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

  const dataField = currentMappable.property;

  return (
    <>
      <main className={classes.main}>
        <div className={classes.currentInfo}>
          <Typography variant="h2" color="primary">{visual.name}</Typography>
          <Typography variant="subtitle1" color="primary">{currentMappable.title}</Typography>
        </div>
        <Settings />
        <Zoom />
        <ReactMapGL
          // reuseMaps={true} // - experimental, consider using when remounting the map component often
          ref={mapRef}
          width="100%"
          height="100%"
          maxZoom={MAX_ZOOM_LEVEL}
          minZoom={4}
          mapStyle="mapbox://styles/mapbox/dark-v10"
          {...stateViewport}
          onClick={handleMapClick}
          onViewportChange={onViewportChange}
          mapboxApiAccessToken="pk.eyJ1IjoiYWxleGFuZGVydGhpZW1lIiwiYSI6ImNrODFjNjV0NDBuenIza3J1ZXFsYnBxdHAifQ.8Xh_Y9eCFgEgQ-6mXsxZxQ"
        >
          <Visual
            dataField={dataField}
          />
          <FeatureInfo
            dataField={dataField}
            feature={currentFeature}
            onClose={() => {
              dispatch(AppApi.setCurrentFeature(null))
            }}
          />
        </ReactMapGL>
        <TimeRangeSlider />
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
      </main>
    </>
  );
};
