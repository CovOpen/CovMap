import { GeoJSON, FeatureCollection } from "geojson";

import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, VisualId, MapSet } from "../app";
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

  return null
}

export function fetchMappedSet(visualId: VisualId, mappingId: string, date: Date) {
  return async (dispatch: ReduxDispatch, getState: () => State) => {
    dispatch(AppApi.pushLoading('mappedSet', 'Loading mapped set'))

    try {
      const mapping = config.visuals[visualId].mappings[mappingId]
      const { datasourceId, geoId, transformData, transformGeo, geoProperty, dataProperty } = mapping
      const { datasets, geos, mappedSets }  = getState().app
      const datasource = config.datasources[datasourceId]
      const geo = config.geos[geoId]
      const timeKey = formatUTCDate(date)

      const [data, geojson] = await Promise.all([
        Promise.resolve().then(async () => {
          const datasetKey = `${formatUTCDate(date)}-${datasourceId}`
          if (datasets.has(datasetKey)) {
            return datasets.get(datasetKey)
          }

          return fetchAndTransform(datasource.url, timeKey, date, dataProperty, transformData)
        }),
        Promise.resolve().then(async (): Promise<GeoJSON | undefined> => {
          const geoKey = `${geoId}`
          if (geos.has(geoKey)) {
            return geos.get(geoKey)
          }

          return fetchAndTransform(geo.url, timeKey, date, geoProperty, transformGeo)
        }),
      ])

      if (!data || !geojson) {
        dispatch(AppApi.popLoading('mappedSet'))
        dispatch(AppApi.setDatasetFound(false))
        return
      }

      let mapset: MapSet | undefined = mappedSets.get(visualId)
      if (!mapset) {
        mapset = {
          timeKeys: [],
          geo: geojson
        }
      }

      // TODO: Extend to make it work with differen GeoJSON types than FeatureCollection
      Object.assign(mapset, {
        timeKeys: mapset.timeKeys.concat(timeKey),
        geo: {
          ...mapset.geo,
          features: (mapset.geo as FeatureCollection).features.map(feature => ({
            ...feature,
            properties: {
              ...feature.properties,
              [timeKey]: data.data[(feature.properties || {})[geoProperty]],
            }
          }))
        }
      })

      dispatch(AppApi.addMappedSet(visualId, mapset));
    } catch(err) {
      // TODO: error snackbar
      console.error(err)
    } finally {
      dispatch(AppApi.popLoading('mappedSet'))
    }
  };
}
