import React, { useState, useEffect } from "react";
import { Visual } from './Visual';
import { FeatureInfo } from './FeatureInfo';
import { useSelector } from "react-redux";
import { LazyError } from './LazyError'
import debounce from 'debounce'
const ReactMapGL = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/es6/components/interactive-map')
  .catch(() => ({ default: LazyError })));

import { State } from "../state";
import { Viewport } from "../state/app";
import { MAX_ZOOM_LEVEL } from '../constants';
import { config } from 'app-config/index'

export type GLMapProps = {
  mapRef: any;
  onMapClick: Function;
  onViewportChange?: Function;
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
let debouncedViewportChange

export const GLMap = ({ mapRef, onMapClick, onViewportChange }: GLMapProps) => {
  const stateViewport = useSelector((state: State) => state.app.viewport);
  const [viewport, setViewport] = useState<Viewport>(() => {
    return stateViewport;
  })

  useEffect(() => {
    debouncedViewportChange = debounce(onViewportChange, 2500)
  }, [])

  useEffect(() => {
    setViewport(stateViewport)
  }, [stateViewport])

  const handleLocalViewportChange = ({ pitch, bearing, zoom, latitude, longitude}) => {
    const newViewPort = {
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
    
    setViewport(newViewPort)
    
    if (debouncedViewportChange) {
      debouncedViewportChange(newViewPort)
    }
  }
  
  return (
    <ReactMapGL
      // reuseMaps={true} // - experimental, consider using when remounting the map component often
      ref={mapRef}
      width="100%"
      height="100%"
      maxZoom={MAX_ZOOM_LEVEL}
      minZoom={4}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      {...viewport}
      onClick={(evt) => onMapClick(evt, viewport)}
      onViewportChange={handleLocalViewportChange}
      mapboxApiAccessToken="pk.eyJ1IjoiYWxleGFuZGVydGhpZW1lIiwiYSI6ImNrODFjNjV0NDBuenIza3J1ZXFsYnBxdHAifQ.8Xh_Y9eCFgEgQ-6mXsxZxQ"
    >
      <Visual />
      <FeatureInfo />
    </ReactMapGL>
  )
}