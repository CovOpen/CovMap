import React, { Suspense } from "react";
const Source = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/es6/components/source'));
const Layer = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/es6/components/layer'));
import { useSelector } from "react-redux";

import { AppApi } from "../state/app";
import { State } from "../state";
import { getFallbackComponent } from './getFallback';
import { config } from '../../app-config/index'
import { useThunkDispatch } from "../useThunkDispatch";
import { fetchMappedSet } from "../state/thunks/fetchMappedSet"
import { formatUTCDate } from '../lib/formatUTCDate.js'

export type VisualProps = {
  dataField: string;
}

export type FeatureInfoProps = {
  feature: any; // TODO: use mapbox-gl feature type
  dataField: string;
}

export const Visual = ({ dataField }: VisualProps) => {
  const dispatch = useThunkDispatch();
  const currentVisual = useSelector((state: State) => state.app.currentVisual);
  const mappedSets = useSelector((state: State) => state.app.mappedSets);
  const currentDate = useSelector((state: State) => state.app.currentDate);
  const visual = config.visuals[currentVisual]
  const mappingId = visual.defaultMapping
  const mapset = mappedSets.get(currentVisual)
  const timeKey = formatUTCDate(currentDate)

  if (!mapset || !mapset.timeKeys.includes(timeKey)) {
    dispatch(fetchMappedSet(currentVisual, mappingId, currentDate))
    return null
  }
  
  dispatch(AppApi.setDatasetFound(true))
  
  const visualLayers = visual.layers.map(layer => {
    if (typeof layer === 'function') {
      return layer(dataField, timeKey)
    }
    return layer
  })

  // TODO: Render function is called too often, seems unnecessary
  
  return (
    <Suspense fallback={getFallbackComponent()}>
      <Source id={mappingId} type="geojson" data={mapset.geo}>
        {visualLayers.map(layer => <Layer key={layer.id} {...layer} />)}
      </Source>
    </Suspense>
  )
}

export const FeatureInfo = ({ feature, dataField }: FeatureInfoProps) => {
  return (
    <div>
      <div>PLZ: {feature.properties.name_2}</div>
      <div>Value: {feature.properties[dataField]}</div>
    </div>
  )
}
