import React, { useEffect, useState, createRef, Suspense } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
const ReactMapGL = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/es6/components/interactive-map'));
const Popup = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/es6/components/popup'));

import { State } from "../state";
import { AppApi, VisualType } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";
import { fetchDataset } from "../state/thunks/fetchDataset"
import { fetchPostCodeAreas } from "../state/thunks/fetchPostCodeAreas"
import { fetchPostCodePoints } from "../state/thunks/fetchPostCodePoints"
import { fetchDistrictAreas } from "../state/thunks/fetchDistrictAreas"
import { Settings } from './Settings';
import { Zoom } from './Zoom';
import { MAX_ZOOM_LEVEL } from '../constants';
import { TimeRangeSlider } from './TimeRangeSlider';
import { getFallbackComponent } from './getFallback';
import { formatNowMinusDays } from '../lib/formatUTCDate.js';

import { VisualProps, FeatureInfoProps } from './types'; // eslint-disable-line
import { PostCodeAreas, FeatureInfo as PostCodeAreaFeatureInfo } from './visuals/PostCodeAreas'
import { DistrictAreas, FeatureInfo as DistrictAreaFeatureInfo } from './visuals/DistrictAreas'
import { RKIDistrictAreas, FeatureInfo as RKIDistrictAreaFeatureInfo } from './visuals/RKIDistrictAreas'
import { Heatmap, FeatureInfo as HeatmapFeatureInfo } from './visuals/Heatmap'
import { Bubblemap, FeatureInfo as BubblemapFeatureInfo } from './visuals/Bubblemap'

const typeToVisualComponentMap = {
  [VisualType.POSTCODE]: PostCodeAreas,
  [VisualType.HEATMAP]: Heatmap,
  [VisualType.BUBBLEMAP]: Bubblemap,
  [VisualType.DISTRICTS]: DistrictAreas,
  [VisualType.RKI_DISTRICTS]: RKIDistrictAreas
};

const typeToFeatureInfoComponentMap = {
  [VisualType.POSTCODE]: PostCodeAreaFeatureInfo,
  [VisualType.HEATMAP]: HeatmapFeatureInfo,
  [VisualType.BUBBLEMAP]: BubblemapFeatureInfo,
  [VisualType.DISTRICTS]: DistrictAreaFeatureInfo,
  [VisualType.RKI_DISTRICTS]: RKIDistrictAreaFeatureInfo
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

// Note: React hooks ref diffing workaround
let previousMapRef = null;

export const CovMap = () => {
  const classes = useStyles();
  const dispatch = useThunkDispatch();
  // const position = useSelector((state: State) => state.app.currentPosition); // TODO
  const stateViewport = useSelector((state: State) => state.app.viewport);
  const currentDataset = useSelector((state: State) => state.app.currentDataset); // TODO
  const postCodeAreas = useSelector((state: State) => state.app.postCodeAreas);
  const postCodePoints = useSelector((state: State) => state.app.postCodePoints);
  const districtAreas = useSelector((state: State) => state.app.districtAreas);
  const visualType = useSelector((state: State) => state.app.visualType);
  const datasetFound = useSelector((state: State) => state.app.datasetFound);
  const [currentFeature, setCurrenFeature] = useState(null)
  const mapRef = createRef<any>();

  // Bound to germany for the time being
  // TODO: Use mapbox helpers
  // const southWest = L.latLng(43.27103747280261, 2.3730468750000004);
  // const northEast = L.latLng(56.47462805805594, 17.885742187500004);
  // const maxBounds = L.latLngBounds(southWest, northEast);

  const handleMapBusy = (evt) => {
    dispatch(AppApi.pushLoading('map-busy', 'Map is rendering stuff...'))
  }

  const handleMapIdle = (evt) => {
    dispatch(AppApi.popLoading('map-busy'))
  }

  useEffect(() => {
    if (!postCodePoints) {
      dispatch(fetchPostCodePoints());
    }
    if (!postCodeAreas) {
      dispatch(fetchPostCodeAreas());
    }
    if (!districtAreas) {
      dispatch(fetchDistrictAreas());
    }
  }, []);

  useEffect(() => {
    console.log('CHANGED Visual');
    dispatch(AppApi.setCurrentDataset(null))
    dispatch(fetchDataset(formatNowMinusDays(0)));
  }, [visualType])

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
      map.on('idle', handleMapIdle)
    }

    return () => {
      if (mapRef.current) {
        const map = mapRef.current.getMap();
        map.off('dataloading', handleMapBusy)
        map.off('idle', handleMapIdle)
      }
    }
  }, [changedMapRef])

  const onViewportChange = ({ latitude, longitude, zoom }) => {
    dispatch(AppApi.setViewport({
      zoom,
      latitude,
      longitude,
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
          <VisualComponent
            dataField={dataField}
            currentDataset={currentDataset}
            postCodeAreas={postCodeAreas}
            postCodePoints={postCodePoints}
            districtAreas={districtAreas}
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
