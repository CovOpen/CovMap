import React, { Suspense, useEffect } from "react";
import { LazyError } from './LazyError'
const Source = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/es6/components/source')
  .catch(() => ({ default: LazyError })));
const Layer = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/es6/components/layer')
  .catch(() => ({ default: LazyError })));
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

export const Visual = ({ dataField }: VisualProps) => {
  const dispatch = useThunkDispatch();
  const currentVisual = useSelector((state: State) => state.app.currentVisual);
  const mappedSets = useSelector((state: State) => state.app.mappedSets);
  const currentDate = useSelector((state: State) => state.app.currentDate);
  const currentLayerGroup = useSelector((state: State) => state.app.currentLayerGroup);
  const visual = config.visuals[currentVisual]
  // TODO: handle multiple mappings (map and merge data on same geojson, layer decides what to render)
  const mappingId = visual.defaultMapping
  const mapset = mappedSets.get(currentVisual)?.get(mappingId)
  const timeKey = formatUTCDate(currentDate)

  useEffect(() => {
    if (mapset && mapset.timeKeys.includes(timeKey)) {
      dispatch(AppApi.setDatasetFound(true))
    }
  }, [mappedSets])

  if (!mapset || !mapset.timeKeys.includes(timeKey)) {
    dispatch(fetchMappedSet(currentVisual, mappingId, currentDate))
    return null
  }

  let visualLayers = visual.layers.map(layer => {
    if (typeof layer === 'function') {
      return layer(dataField, timeKey)
    }
    return layer
  })

  if (currentLayerGroup) {
    visualLayers = visualLayers.filter(layer => ['hover'].includes(layer.id) || currentLayerGroup.layers.includes(layer.id))
  }

  // TODO: Render function is called too often, seems unnecessary
  
  return (
    <Suspense fallback={getFallbackComponent()}>
      <Source id={mappingId} type="geojson" data={mapset.geo}>
        {visualLayers.map(layer => <Layer key={layer.id} {...layer} />)}
      </Source>
    </Suspense>
  )
}
