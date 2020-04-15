import React from "react";
import { Visual } from './Visual';
import { FeatureInfo } from './FeatureInfo';
import { useSelector } from "react-redux";
import { LazyError } from './LazyError'
const ReactMapGL = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/es6/components/interactive-map')
  .catch(() => ({ default: LazyError })));

import { State } from "../state";
import { MAX_ZOOM_LEVEL } from '../constants';
import { AppApi } from "../state/app";
import { useThunkDispatch } from "../useThunkDispatch";

export type GLMapProps = {
  mapRef: any;
  onMapClick: Function;
  onViewportChange: Function;
  dataField: string;
}

export const GLMap = ({ mapRef, onMapClick, onViewportChange, dataField }: GLMapProps) => {
  const dispatch = useThunkDispatch();
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
      <FeatureInfo
        dataField={dataField}
        onClose={() => {
          dispatch(AppApi.setCurrentFeature(null))
        }}
      />
    </ReactMapGL>
  )
}