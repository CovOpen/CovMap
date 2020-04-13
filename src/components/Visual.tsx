import React, { Suspense, useEffect } from "react";
const Source = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/es6/components/source'));
const Layer = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/es6/components/layer'));
import { useSelector } from "react-redux";

import { State } from "../state";
import { AppApi } from "../state/app";
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
  const layers = useSelector((state: State) => state.app.layers);
  const visual = config.visuals[currentVisual]
  const mappingId = visual.defaultMapping
  const mapsetKey = `${mappingId}-${formatUTCDate(currentDate)}`
  const mapset = mappedSets.get(currentVisual)?.get(mapsetKey)

  useEffect(() => {
    const executedLayers = visual.layers.map(layer => {
      if (typeof layer === 'function') {
        return layer(dataField)
      }
      return layer
    })
    dispatch(AppApi.setLayers(currentVisual, executedLayers))
  }, [dataField])

  if (!mapset) {
    dispatch(fetchMappedSet(currentVisual, mappingId, currentDate))
    return null
  }
  const visualLayers = layers.get(currentVisual)
  if (!visualLayers) {
    return null
  }
  
  return (
    <Suspense fallback={getFallbackComponent()}>
      <Source id={mappingId} type="geojson" data={mapset}>
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
