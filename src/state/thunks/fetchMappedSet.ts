import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, VisualId } from "../app";
import { State } from "../";

import { config } from '../../../app-config/index'
import { formatUTCDate } from '../../lib/formatUTCDate.js'

const fetchAndTransform = async (
  url: string | Function, 
  formattedDate: string, 
  date: Date, 
  property: string, 
  transform?: Function
) => {
  let dataUrl = url
  if (typeof dataUrl === 'function') {
    dataUrl = dataUrl(formattedDate, date)
  }

  const res = await fetch(dataUrl as string);
  
  if (res.status === 200) {
    let json = await res.json();
    
    if (transform) {
      json = transform(json, property)
    }
    
    return json
  }
}

export function fetchMappedSet(visualId: VisualId, mappingId: string, date: Date) {
  return async (dispatch: ReduxDispatch, getState: () => State) => {
    dispatch(AppApi.pushLoading('mappedSet', 'Loading mapped set'))

    try {
      const mapping = config.visuals[visualId].mappings[mappingId]
      const { datasourceId, geoId, transformData, transformGeo, geoProperty, dataProperty } = mapping
      const { datasets, geos }  = getState().app
      const datasource = config.datasources[datasourceId]
      const geo = config.geos[geoId]
      const formattedDate = formatUTCDate(date)

      const [data, geojson] = await Promise.all([
        Promise.resolve().then(async () => {
          const datasetKey = `${formatUTCDate(date)}-${datasourceId}`
          if (datasets.has(datasetKey)) {
            return datasets.get(datasetKey)
          }

          const json = await fetchAndTransform(datasource.url, formattedDate, date, dataProperty, transformData)

          if (json.data.length !== 0) {
            return json
          }
        }),
        Promise.resolve().then(async () => {
          const geoKey = `${formatUTCDate(date)}-${geoId}`
          if (geos.has(geoKey)) {
            return geos.get(geoKey)
          }

          return fetchAndTransform(geo.url, formattedDate, date, geoProperty, transformGeo)
        }),
      ])

      if (!data) {
        dispatch(AppApi.popLoading('mappedSet'))
        dispatch(AppApi.setDatasetFound(false))
        return
      }

      const mapset = Object.assign({}, geojson, {
        features: geojson.features.map(feature => ({
          ...feature,
          properties: {
            ...feature.properties,
            ...data.data[feature.properties[geoProperty]]
          }
        }))
      })

      const mapsetKey = `${mappingId}-${formatUTCDate(date)}`

      dispatch(AppApi.addMappedSet(visualId, mapsetKey, mapset));
      dispatch(AppApi.setDatasetFound(true))
    } catch(err) {
      // TODO: error snackbar
      console.error(err)
    } finally {
      dispatch(AppApi.popLoading('mappedSet'))
    }
  };
}
