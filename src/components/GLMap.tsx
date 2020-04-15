import React from "react";
import { Visual } from './Visual';
import { FeatureInfo } from './FeatureInfo';
import { useSelector } from "react-redux";
import { LazyError } from './LazyError'
const ReactMapGL = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/es6/components/interactive-map')
  .catch(() => ({ default: LazyError })));

import { State } from "../state";
import { MAX_ZOOM_LEVEL } from '../constants';

export type GLMapProps = {
  mapRef: any;
  onMapClick: Function;
  onViewportChange: Function;
}

export const GLMap = ({ mapRef, onMapClick, onViewportChange }: GLMapProps) => {
  const stateViewport = useSelector((state: State) => state.app.viewport);
  
  return (
    <ReactMapGL
      // reuseMaps={true} // - experimental, consider using when remounting the map component often
      ref={mapRef}
      width="100%"
      height="100%"
      maxZoom={MAX_ZOOM_LEVEL}
      minZoom={4}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      {...stateViewport}
      onClick={(evt) => onMapClick(evt, stateViewport)}
      onViewportChange={onViewportChange}
      mapboxApiAccessToken="pk.eyJ1IjoiYWxleGFuZGVydGhpZW1lIiwiYSI6ImNrODFjNjV0NDBuenIza3J1ZXFsYnBxdHAifQ.8Xh_Y9eCFgEgQ-6mXsxZxQ"
    >
      <Visual />
      <FeatureInfo />
    </ReactMapGL>
  )
}