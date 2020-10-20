import { GeoJSON, FeatureCollection } from "geojson";

import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, VisualId, MapSet } from "../app";
import { State } from "../";

import { formatUTCDate } from "../../lib/formatUTCDate.js";
import { config } from "app-config/index";

const fetchAndTransform = async (
  url: string | Function,
  formattedDate: string,
  date: Date,
  property: string,
  transform?: Function,
) => {
  let dataUrl = url;
  if (typeof dataUrl === "function") {
    dataUrl = dataUrl(formattedDate, date);
  }

  const res = await fetch(dataUrl as string);

  if (res.status === 200) {
    let json = await res.json();

    if (transform) {
      json = transform(json, property);
    }

    return json;
  }

  return null;
};

export function fetchMappedSet(visualId: VisualId, mappingId: string, date: Date) {
  return async (dispatch: ReduxDispatch, getState: () => State) => {
    const timeKey = formatUTCDate(date);
    const loadingKey = `loading-${mappingId}-${timeKey}`;

    dispatch(() => AppApi.pushLoading(loadingKey));

    try {
      const mapping = config.visuals[visualId].mappings[mappingId];
      const { datasourceId, geoId, transformData, transformGeo, geoProperty, dataProperty } = mapping;
      const { datasets, geos, mappedSets } = getState().app;
      const datasource = config.datasources[datasourceId];
      const geo = config.geos[geoId];

      const [data, geojson] = await Promise.all([
        Promise.resolve().then(async () => {
          const datasetKey = `${formatUTCDate(date)}-${datasourceId}`;
          if (datasets.has(datasetKey)) {
            return datasets.get(datasetKey);
          }
          const dataset = await fetchAndTransform(datasource.url, timeKey, date, dataProperty, transformData);
          dispatch(AppApi.addDataset(datasetKey, dataset));
          return dataset;
        }),
        Promise.resolve().then(
          async (): Promise<GeoJSON | undefined> => {
            const geoKey = `${geoId}`;
            if (geos.has(geoKey)) {
              return geos.get(geoKey);
            }
            const geoset = await fetchAndTransform(geo.url, timeKey, date, geoProperty, transformGeo);
            dispatch(AppApi.addGeo(geoKey, geoset));
            return geoset;
          },
        ),
      ]);

      if (!data || !geojson) {
        dispatch(AppApi.popLoading("mappedSet"));
        dispatch(AppApi.setDatasetFound(false));
        return;
      }

      let mapset: MapSet | undefined = mappedSets[visualId] ? mappedSets[visualId][mappingId] : undefined;
      if (!mapset) {
        mapset = {
          id: mappingId,
          timeKeys: [],
          geo: geojson,
        };
      }

      // TODO: Extend to make it work with differen GeoJSON types than FeatureCollection
      Object.assign(mapset, {
        timeKeys: mapset.timeKeys.concat(timeKey),
        geo: {
          ...mapset.geo,
          features: (mapset.geo as FeatureCollection).features.map((feature, id) => ({
            ...feature,
            id,
            properties: {
              ...feature.properties,
              [timeKey]: data.data[(feature.properties || {})[geoProperty]],
            },
          })),
        },
      });

      dispatch(AppApi.addMappedSet(visualId, mappingId, mapset));
    } catch (err) {
      // TODO: error snackbar
      console.error(err);
    } finally {
      dispatch(AppApi.popLoading(loadingKey));
    }
  };
}
