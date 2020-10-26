import React, { useState, useEffect, Suspense } from "react";
import { Visual } from "./Visual";
import { FeatureInfo } from "./FeatureInfo";
import { useSelector } from "react-redux";
import { LazyError } from "./LazyError";
import debounce from "debounce";
const ReactMapGL = React.lazy(() =>
  import(/* webpackChunkName: "mapgl" */ "react-map-gl/dist/es6/components/interactive-map").catch(() => ({
    default: LazyError,
  })),
);

import { State } from "../state";
import { Viewport } from "../state/app";
import { MAX_ZOOM_LEVEL } from "../constants";
import { config } from "app-config/index";
import { getFallbackComponent } from "./getFallback";

export type GLMapProps = {
  mapRef: any;
  onMapClick: Function;
  onViewportChange?: Function;
  onLoad?: Function;
};

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
let debouncedViewportChange;

export const GLMap = ({ mapRef, onMapClick, onViewportChange, onLoad }: GLMapProps) => {
  const stateViewport = useSelector((state: State) => state.app.viewport);
  const [viewport, setViewport] = useState<Viewport>(() => {
    return stateViewport;
  });

  useEffect(() => {
    debouncedViewportChange = debounce(onViewportChange, 250);
  }, []);

  useEffect(() => {
    setViewport(stateViewport);
  }, [stateViewport]);

  const handleLocalViewportChange = ({ pitch, bearing, zoom, latitude, longitude }) => {
    const newViewPort = {
      pitch,
      bearing,
      zoom,
      latitude,
      longitude,
    };

    if (config.mapSettings?.constraints) {
      const constraints = config.mapSettings?.constraints;
      newViewPort.latitude = clamp(latitude, constraints[1][0], constraints[0][0]);
      newViewPort.longitude = clamp(longitude, constraints[0][1], constraints[1][1]);
    }

    setViewport(newViewPort);

    if (debouncedViewportChange) {
      debouncedViewportChange(newViewPort);
    }
  };

  const additionalSettings = {};
  if (config.mapSettings) {
    Object.assign(additionalSettings, {
      baseApiUrl: config.mapSettings?.baseApiUrl,
      mapStyle: config.mapSettings?.mapStyle,
      mapboxApiAccessToken: config.mapSettings?.mapboxApiAccessToken,
    });
  }

  return (
    <Suspense fallback={getFallbackComponent()}>
      <ReactMapGL
        // reuseMaps={true} // - experimental, consider using when remounting the map component often
        ref={mapRef}
        width="100%"
        height="100%"
        maxZoom={MAX_ZOOM_LEVEL}
        minZoom={4}
        {...additionalSettings}
        {...viewport}
        onClick={(evt) => onMapClick(evt, viewport)}
        onLoad={onLoad}
        onViewportChange={handleLocalViewportChange}
        preventStyleDiffing={true}
        asyncRender={true}
      >
        <Visual />
      </ReactMapGL>
      <FeatureInfo />
    </Suspense>
  );
};
