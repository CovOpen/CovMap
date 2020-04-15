import React, { Suspense } from 'react'
import { useSelector } from "react-redux";
import { LazyError } from './LazyError'
const Popup = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/es6/components/popup')
  .catch(() => ({ default: LazyError })));

import { config } from '../../app-config/index'
import { State } from "../state";
import { formatUTCDate } from '../lib/formatUTCDate.js'
import { getFallbackComponent } from './getFallback';

export const FeatureInfo = ({ feature, dataField, onClose }: { feature: any; dataField: string; onClose: Function }) => {
  const currentVisual = useSelector((state: State) => state.app.currentVisual);
  const datasets = useSelector((state: State) => state.app.datasets);
  const currentDate = useSelector((state: State) => state.app.currentDate);
  const datasetFound = useSelector((state: State) => state.app.datasetFound);
  const currentLayerGroup = useSelector((state: State) => state.app.currentLayerGroup);
  const visual = config.visuals[currentVisual]
  // TODO: Select data correctly from a dataset for info here
  const mappingId = Object.keys(visual.mappings)[0]
  const activeMapping = visual.mappings[mappingId]
  const timeKey = formatUTCDate(currentDate)
  const currentDataSet = datasets.get(`${timeKey}-${activeMapping.datasourceId}`)
  
  if (!feature.feature || !datasetFound) {
    return null
  }

  const InfoComponent = currentLayerGroup.FeatureInfo
  let rawData: any = null
  if (currentDataSet) {
    rawData = currentDataSet.data[feature.feature.properties[activeMapping.geoProperty]]
  }

  if (!rawData) {
    return null
  }
  
  return (
    <Suspense fallback={getFallbackComponent()}>
      <Popup
        latitude={(feature as any).lngLat[1]}
        longitude={(feature as any).lngLat[0]}
        closeButton={false}
        closeOnClick={true}
        onClose={onClose}
        anchor="top"
        style={{ zIndex: 1100 }}
      >
        <InfoComponent 
          feature={feature.feature} 
          dataField={dataField} 
          timeKey={timeKey} 
          rawData={rawData} 
          onClose={onClose}
        />
      </Popup>
    </Suspense>
  )
}