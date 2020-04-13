import React, { Suspense } from "react";
const Source = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/es6/components/source'));
const Layer = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/es6/components/layer'));
import { useSelector } from "react-redux";

import { State } from "../state";
import { getFallbackComponent } from './getFallback';
import { config } from '../../app-config/index'
import { useThunkDispatch } from "../useThunkDispatch";
import { fetchMappedSet } from "../state/thunks/fetchMappedSet"
import { plusDays, formatUTCDate } from '../lib/formatUTCDate.js'

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
  const currentDay = useSelector((state: State) => state.app.currentDay);
  const date = plusDays(currentDay)
  const visual = config.visuals[currentVisual]
  const mappingId = visual.defaultMapping
  const mapsetKey = `${mappingId}-${formatUTCDate(date)}`
  const mapset = mappedSets.get(currentVisual)?.get(mapsetKey)

  if (!mapset) {
    dispatch(fetchMappedSet(currentVisual, mappingId, date))
    return null
  }
  
  return (
    <Suspense fallback={getFallbackComponent()}>
      <Source id={mappingId} type="geojson" data={mapset}>
        <Layer
          id="areas-fill"
          type="fill"
          paint={{
            'fill-color': {
              property: dataField,
              stops: [
                [0, '#f8fbff'],
                [0.05, '#e1ebf5'],
                [0.1, '#cadbed'],
                [0.3, '#a6c9df'],
                [0.5, '#79add2'],
                [0.8, '#5591c3'],
                [1, '#3771b0'],
                [1.2, '#205297'],
                [1.4, '#113068'],
              ]
            },
            'fill-opacity': 0.8,
          }} />
        <Layer
          id="areas-borders"
          type="line"
          paint={{
            'line-color': '#627BC1',
            'line-width': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              4,
              0
            ]
          }} />
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
