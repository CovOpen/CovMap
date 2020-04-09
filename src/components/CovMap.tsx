import React, { useEffect, useState, createRef, Suspense } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
const ReactMapGL = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/esm/components/interactive-map'));
const Popup = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/esm/components/popup'));

import { State } from "../state";
import { AppApi, VisualType } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";
import { fetchDataset } from "../state/thunks/fetchDataset"
import { fetchPostCodeAreas } from "../state/thunks/fetchPostCodeAreas"
import { fetchPostCodePoints } from "../state/thunks/fetchPostCodePoints"
import { Settings } from './Settings';
import { Zoom } from './Zoom';
import { MAX_ZOOM_LEVEL } from '../constants';
import { TimeRangeSlider } from './TimeRangeSlider';
import { getFallbackComponent } from './getFallback';

import { VisualProps, FeatureInfoProps } from './types'; // eslint-disable-line
import { PostCodeAreas, FeatureInfo as AreaFeatureInfo } from './visuals/PostCodeAreas'
import { Heatmap, FeatureInfo as HeatmapFeatureInfo } from './visuals/Heatmap'
import { Bubblemap, FeatureInfo as BubblemapFeatureInfo } from './visuals/Bubblemap'
import { Districtsmap, FeatureInfo as DistrictsmapFeatureInfo } from './visuals/Districtsmap'

const typeToVisualComponentMap = {
  [VisualType.POSTCODE]: PostCodeAreas,
  [VisualType.HEATMAP]: Heatmap,
  [VisualType.BUBBLEMAP]: Bubblemap,
  [VisualType.DISTRICTS]: Districtsmap
};

const typeToFeatureInfoComponentMap = {
  [VisualType.POSTCODE]: AreaFeatureInfo,
  [VisualType.HEATMAP]: HeatmapFeatureInfo,
  [VisualType.BUBBLEMAP]: BubblemapFeatureInfo,
  [VisualType.DISTRICTS]: DistrictsmapFeatureInfo
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      VisualComponent: VisualProps;
      FeatureInfoComponent: FeatureInfoProps;
    }
  }
}

const useStyles = makeStyles((theme) => ({
  main: {
    height: '100%',
    position: 'relative',
    display: 'flex',
    'flex-direction': 'column',
  },
}));

export const CovMap = () => {
  const classes = useStyles();
  const dispatch = useThunkDispatch();
  // const position = useSelector((state: State) => state.app.currentPosition); // TODO
  const stateViewport = useSelector((state: State) => state.app.viewport);
  const currentDataset = useSelector((state: State) => state.app.currentDataset); // TODO
  const postCodeAreas = useSelector((state: State) => state.app.postCodeAreas);
  const postCodePoints = useSelector((state: State) => state.app.postCodePoints);
  const visualType = useSelector((state: State) => state.app.visualType);
  const datasetFound = useSelector((state: State) => state.app.datasetFound);
  const [currentFeature, setCurrenFeature] = useState(null)
  const mapRef = createRef<any>();

  // Bound to germany for the time being
  // TODO: Use mapbox helpers
  // const southWest = L.latLng(43.27103747280261, 2.3730468750000004);
  // const northEast = L.latLng(56.47462805805594, 17.885742187500004);
  // const maxBounds = L.latLngBounds(southWest, northEast); 
  
  useEffect(() => {
    if (!postCodePoints) {
      dispatch(fetchPostCodePoints());
    }
    if (!postCodeAreas) {
      dispatch(fetchPostCodeAreas());
    }
    if (!currentDataset) {
      dispatch(fetchDataset());
    }

    return () => {
      // componendWillUnmount
    }
  }, []);

  const onViewportChange = ({ latitude, longitude, zoom }) => {
    dispatch(AppApi.setViewport({
      zoom,
      center: [latitude, longitude]
    }))
  }

  const VisualComponent = typeToVisualComponentMap[visualType];
  const FeatureInfoComponent = typeToFeatureInfoComponentMap[visualType];

  const resetCurrentFeature = () => {
    if (currentFeature && mapRef.current) {
      const map = mapRef.current.getMap();
      map.setFeatureState(
        { source: (currentFeature as any).feature.source, id: (currentFeature as any).feature.id },
        { hover: false }
      );
    }
  }
  const handleMapClick = (pointerEvent) => {
    const { features } = pointerEvent;
    if (features.length > 0) {
      if (mapRef.current) {
        const map = mapRef.current.getMap();

        // TODO: When app is setup by config lookup a match from configured layers
        if (features[0].source !== 'postCodeAreas' && features[0].source !== 'postCodePoints') {
          return;
        }
        resetCurrentFeature()
        
        map.setFeatureState(
          { source: (features[0] as any).source, id: (features[0] as any).id },
          { hover: true }
        );
      }
      
      setCurrenFeature({ feature: features[0], lngLat: pointerEvent.lngLat } as any);
    }
  }

  const dataField = 'coughs';

  return (
    <>
      <main className={classes.main}>
        <Settings />
        <Zoom />
        <ReactMapGL
          ref={mapRef}
          width="100%"
          height="100%"
          maxZoom={MAX_ZOOM_LEVEL}
          minZoom={4}
          mapStyle="mapbox://styles/mapbox/dark-v10"
          latitude={stateViewport.center[0]}
          longitude={stateViewport.center[1]}
          zoom={stateViewport.zoom}
          onClick={handleMapClick}
          onViewportChange={onViewportChange}
          mapboxApiAccessToken="pk.eyJ1IjoiYWxleGFuZGVydGhpZW1lIiwiYSI6ImNrODFjNjV0NDBuenIza3J1ZXFsYnBxdHAifQ.8Xh_Y9eCFgEgQ-6mXsxZxQ"
        >
          <VisualComponent 
            dataField={dataField}
            currentDataset={currentDataset} 
            postCodeAreas={postCodeAreas}
            postCodePoints={postCodePoints}
          />
          {currentFeature && <Suspense fallback={getFallbackComponent()}>
            <Popup
              latitude={(currentFeature as any).lngLat[1]}
              longitude={(currentFeature as any).lngLat[0]}
              closeButton={false}
              closeOnClick={true}
              anchor="top"
              style={{ zIndex: 1100 }}
            >
              <FeatureInfoComponent
                dataField={dataField}
                feature={(currentFeature as any).feature}
              />
            </Popup>
          </Suspense>}
        </ReactMapGL>
        <TimeRangeSlider onChange={() => {
          resetCurrentFeature();
          setCurrenFeature(null)
        }} />
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
