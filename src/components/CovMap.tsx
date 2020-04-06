import React, { useEffect, createRef } from "react";
import { withSnackbar } from "notistack";
import { useSelector } from "react-redux";

import { State } from "../state";
import { AppApi, MapArea } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";
import L from "leaflet";
// import { Map, Marker, CircleMarker, Viewport, FeatureGroup, Popup } from "react-leaflet";
import { hasGeolocation, getCurrentPosition } from "../geolocation";
import { states as geoCountryStates, FederalState } from "../data/geo_de";
import { PostCodeAreas } from './PostCodeAreas';
import MapboxGLLayer from './MapboxGLLayer';

import { Map } from './mapbox/Map'
import { Source } from './mapbox/Source'

function areaQueryFromBounds(bounds): MapArea {
  const center = bounds.getCenter();
  const northEast = bounds.getNorthEast();

  return {
    celat: center.lat,
    celng: center.lng,
    nelat: northEast.lat,
    nelng: northEast.lng,
  };
}

let hasInitialPosition = false;

export const CovMap = withSnackbar(({ enqueueSnackbar, closeSnackbar }) => {
  const dispatch = useThunkDispatch();
  const position = useSelector((state: State) => state.app.currentPosition);
  const stateViewport = useSelector((state: State) => state.app.viewport);
  const allowedLocation = useSelector((state: State) => state.app.userAllowedLocation);
  const postCodeAreas = useSelector((state: State) => state.app.postCodeAreas);
  const currentDataset = useSelector((state: State) => state.app.currentDataset);
  const mapRef = createRef<Map>();
  
  // Bound to germany for the time being
  const southWest = L.latLng(43.27103747280261, 2.3730468750000004);
  const northEast = L.latLng(56.47462805805594, 17.885742187500004);
  const maxBounds = L.latLngBounds(southWest, northEast);

  useEffect(() => {
    // const map = mapRef.current;
    // map.leafletElement.setMinZoom(6);
    // const bounds = map.leafletElement.getBounds();
    // dispatch(AppApi.setCurrentArea(areaQueryFromBounds(bounds)));
        
    // TODO: Does CovMapper even need the current location?
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


  // const onViewportChanged = async (viewport: Viewport) => {
  //   const map = mapRef.current;
        
  //   if (map) {
  //     const bounds = map.leafletElement.getBounds();
  //     dispatch(AppApi.setCurrentArea(areaQueryFromBounds(bounds)));
  //     // TODO: fetch JSON postCodeArea tiles depending on viewport.zoom level
  //   }
  // };

  // const onZoomEnd = (e) => {
  //   const map = mapRef.current;

  //   if (map) {
  //     const bounds = map.leafletElement.getBounds();
  //     dispatch(AppApi.setCurrentArea(areaQueryFromBounds(bounds)));
  //     // TODO: fetch JSON postCodeArea tiles depending on viewport.zoom level
  //   }
  // };

  // const UserPosition = ({ center }: { center: Array<number> | null }) => (center ? <CircleMarker center={center}></CircleMarker> : null);

  // const StateMarker = ({ state }: { state: FederalState} ) => {
  //   const { center, name } = state;
  //   return (
  //     <Marker
  //       position={center}
  //       title={name}
  //     >
  //       <Popup>
  //         <div>
  //           {name}
  //         </div>
  //       </Popup>
  //     </Marker>
  //   );
  // }

  // const StateMarkers = ({ states }: { states: Record<string, FederalState> }) => {
  //   const stateComps = Object.values(states).map((state, key) => <StateMarker state={state} key={key} />)

  //   return (<>{stateComps}</>)
  // }

  return (
    <>
      <main id="search">
        <Map
          center={stateViewport.center}
          zoom={stateViewport.zoom}
          accessToken="pk.eyJ1IjoiYWxleGFuZGVydGhpZW1lIiwiYSI6ImNrODFjNjV0NDBuenIza3J1ZXFsYnBxdHAifQ.8Xh_Y9eCFgEgQ-6mXsxZxQ"
          style="mapbox://styles/mapbox/light-v9"
        >
          <Source id="postCodeAreas" type="geojson" data={postCodeAreas} />
        </Map>
      </main>
    </>
  );
});
