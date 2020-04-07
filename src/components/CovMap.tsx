import React, { useEffect } from "react";
import { withSnackbar } from "notistack";
import { useSelector } from "react-redux";
import ReactMapGL from 'react-map-gl';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import { State } from "../state";
import { AppApi, VisualType } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";
import { formatNowMinusDays } from '../lib/formatUTCDate.js';
import { fetchDataset } from "../state/thunks/fetchDataset"
import { fetchPostCodeAreas } from "../state/thunks/fetchPostCodeAreas"
import { fetchPostCodePoints } from "../state/thunks/fetchPostCodePoints"
import { Settings } from './Settings';
import { MAX_ZOOM_LEVEL } from '../constants';

import { PostCodeAreas } from './PostCodeAreas'
import { Heatmap } from './Heatmap'

const useStyles = makeStyles((theme) => ({
  main: {
    height: '100%',
    position: 'relative',
    display: 'flex',
    'flex-direction': 'column',
  },
  slider: {
    position: "absolute",
    bottom: theme.spacing(4),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    zIndex: 1200,
    width: 'calc(100% - 64px)'
  },
}));

export const CovMap = withSnackbar(({ enqueueSnackbar, closeSnackbar }) => {
  const classes = useStyles();
  const dispatch = useThunkDispatch();
  // const position = useSelector((state: State) => state.app.currentPosition); // TODO
  const stateViewport = useSelector((state: State) => state.app.viewport);
  const currentDataset = useSelector((state: State) => state.app.currentDataset); // TODO
  const postCodeAreas = useSelector((state: State) => state.app.postCodeAreas);
  const postCodePoints = useSelector((state: State) => state.app.postCodePoints);
  const visualType = useSelector((state: State) => state.app.visualType);
  const datasetFound = useSelector((state: State) => state.app.datasetFound);
  
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

  function valuetext(value) {
    return formatNowMinusDays(value);
  }
  
  let timeout: any = 0;
  function onDayChange(event, value) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const dateString = formatNowMinusDays(value);
      dispatch(fetchDataset(dateString));
    }, 400);
  }

  return (
    <>
      <main className={classes.main}>
        <Settings />
        <ReactMapGL
          width="100%"
          height="100%"
          maxZoom={MAX_ZOOM_LEVEL}
          minZoom={4}
          latitude={stateViewport.center[0]}
          longitude={stateViewport.center[1]}
          zoom={stateViewport.zoom}
          onViewportChange={onViewportChange}
          mapboxApiAccessToken="pk.eyJ1IjoiYWxleGFuZGVydGhpZW1lIiwiYSI6ImNrODFjNjV0NDBuenIza3J1ZXFsYnBxdHAifQ.8Xh_Y9eCFgEgQ-6mXsxZxQ"
        >
          {(() => {
            switch(visualType) {
              case VisualType.POSTCODE:
                return <PostCodeAreas currentDataset={currentDataset} postCodeAreas={postCodeAreas} />
              case VisualType.HEATMAP:
                return <Heatmap currentDataset={currentDataset} postCodePoints={postCodePoints} />
            }
          })()}
        </ReactMapGL>
        <Slider
          className={classes.slider}
          defaultValue={0}
          getAriaValueText={valuetext}
          onChange={onDayChange}
          aria-labelledby="discrete-slider-small-steps"
          step={1}
          marks
          min={-30}
          max={0}
          valueLabelDisplay="auto"
        />
        <Dialog 
          // onClose={handleNoDataDialogClose} 
          aria-labelledby="simple-dialog-title" 
          open={!datasetFound}
          style={{
            zIndex: 1190
          }}
        >
          <DialogTitle id="simple-dialog-title">
            Keine Daten für den ausgewählten Zeitraum.
          </DialogTitle>
        </Dialog>
      </main>
    </>
  );
});
