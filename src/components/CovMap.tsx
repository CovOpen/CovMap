import React, { useEffect } from "react";
import { withSnackbar } from "notistack";
import { useSelector } from "react-redux";
import ReactMapGL from 'react-map-gl';

import { State } from "../state";
import { AppApi } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";
import { hasGeolocation, getCurrentPosition } from "../geolocation";
import { fetchDataset } from "../state/thunks/fetchDataset"
import { fetchPostCodeAreas } from "../state/thunks/fetchPostCodeAreas"
import { fetchPostCodePoints } from "../state/thunks/fetchPostCodePoints"

import { PostCodeAreas } from './PostCodeAreas'
import { Heatmap } from './Heatmap'

let hasInitialPosition = false;

export const CovMap = withSnackbar(({ enqueueSnackbar, closeSnackbar }) => {
  const dispatch = useThunkDispatch();
  // const position = useSelector((state: State) => state.app.currentPosition); // TODO
  const stateViewport = useSelector((state: State) => state.app.viewport);
  const allowedLocation = useSelector((state: State) => state.app.userAllowedLocation);
  const currentDataset = useSelector((state: State) => state.app.currentDataset); // TODO
  const postCodeAreas = useSelector((state: State) => state.app.postCodeAreas);
  const postCodePoints = useSelector((state: State) => state.app.postCodePoints);
  
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
    // TODO: Does CovMapper even need the current location?
    // -> Possibly, because a user wants to know the situation around him
    if (hasGeolocation && allowedLocation && !hasInitialPosition) {
      hasInitialPosition = true;
      const positionPendingSnackbar = enqueueSnackbar("Versuche deine momentane Position zu finden...", {
        persist: true,
        variant: "info",
      });

      getCurrentPosition(
        async (pos) => {
          closeSnackbar(positionPendingSnackbar);
          enqueueSnackbar("Position gefunden!", {
            variant: "success",
            autoHideDuration: 3000,
          });
          const crd = pos.coords;
          dispatch(AppApi.setCurrentPosition([crd.latitude, crd.longitude]));
        },
        (err) => {
          closeSnackbar(positionPendingSnackbar);
          enqueueSnackbar(`Position Fehler: ${err.message} (${err.code})`, {
            variant: "error",
            autoHideDuration: 7000,
          });

          if (err.code === 1) {
            dispatch(AppApi.setUserAllowedLocation(false));
          }
        },
      );
    } 

    return () => {
      // componendWillUnmount
    }
  }, []);

  // const UserPosition = ({ center }: { center: Array<number> | null }) => (center ? <CircleMarker center={center}></CircleMarker> : null);

  // TODO: How to store the viewport state without constantly rerendering all map components?
  const onViewportChange = ({ latitude, longitude, zoom }) => {
    dispatch(AppApi.setViewport({
      zoom,
      center: [latitude, longitude]
    }))
  }

  return (
    <>
      <main id="search">
        <ReactMapGL
          width="100%"
          height="100%"
          latitude={stateViewport.center[0]}
          longitude={stateViewport.center[1]}
          zoom={stateViewport.zoom}
          onViewportChange={onViewportChange}
          mapboxApiAccessToken="pk.eyJ1IjoiYWxleGFuZGVydGhpZW1lIiwiYSI6ImNrODFjNjV0NDBuenIza3J1ZXFsYnBxdHAifQ.8Xh_Y9eCFgEgQ-6mXsxZxQ"
        >
          <PostCodeAreas currentDataset={currentDataset} postCodeAreas={postCodeAreas} />
          {/* <Heatmap currentDataset={currentDataset} postCodePoints={postCodePoints} /> */}
        </ReactMapGL>
      </main>
    </>
  );
});
