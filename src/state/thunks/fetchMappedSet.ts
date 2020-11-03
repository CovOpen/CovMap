import type { GeoJSON, FeatureCollection } from "geojson";

import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi, VisualId, MapSet } from "../app";
import type { State } from "../";

import { formatUTCDate } from "../../lib/formatUTCDate";
import { config } from "app-config/index";
import { Moment } from "moment";

const fetchAndTransform = async (
  url: string | Function,
  formattedDate: string,
  date: Moment,
  property: string,
  transform?: Function,
) => {
  let dataUrl = url;
  let res;

  if (typeof dataUrl === "function") {
    dataUrl = dataUrl(formattedDate, date);
  }

  try {
    res = await fetch(dataUrl as string, {
      mode: "no-cors",
    });
  } catch (err) {
    return null;
  }

  if (res.status === 404) {
    return undefined;
  }

  if (res.status === 200) {
    let json = await res.json();

    if (transform) {
      json = transform(json, property);
    }

    return json;
  }

  return null;
};

const currentlyFetchingMapping = new Set();
const currentlyFetchingData = new Map();
const currentlyFetchingGeo = new Map();

async function fetchDataset(datasource, date, mapping, datasets, dispatch) {
  const timeKey = formatUTCDate(date);
  const { datasourceId, transformData, dataProperty } = mapping;
  const datasetKey = `${timeKey}-${datasourceId}`;

  if (currentlyFetchingData.has(datasetKey)) {
    return currentlyFetchingData.get(datasetKey);
  }

  const datasetPromise = (async () => {
    if (datasets.has(datasetKey)) {
      return datasets.get(datasetKey);
    }
    const dataset = await fetchAndTransform(datasource.url, timeKey, date, dataProperty, transformData);
    dispatch(AppApi.addDataset(datasetKey, dataset));

    currentlyFetchingData.delete(datasetKey);

    return dataset;
  })();

  currentlyFetchingData.set(datasetKey, datasetPromise);

  return datasetPromise;
}

async function fetchGeo(geo, date, mapping, geos, dispatch): Promise<GeoJSON | undefined> {
  const timeKey = formatUTCDate(date);
  const { geoId, transformGeo, geoProperty } = mapping;

  if (currentlyFetchingGeo.has(geoId)) {
    return currentlyFetchingGeo.get(geoId);
  }

  const geoPromise = (async () => {
    const geoKey = `${geoId}`;
    if (geos.has(geoKey)) {
      return geos.get(geoKey);
    }
    const geoset = await fetchAndTransform(geo.url, timeKey, date, geoProperty, transformGeo);
    dispatch(AppApi.addGeo(geoKey, geoset));

    currentlyFetchingGeo.delete(geoId);

    return geoset;
  })();

  currentlyFetchingGeo.set(geoId, geoPromise);

  return geoPromise;
}

const dateResets = new Map();

export function fetchMappedSet(visualId: VisualId, mappingId: string, date: Moment) {
  return async (dispatch: ReduxDispatch, getState: () => State) => {
    const timeKey = formatUTCDate(date);
    const loadingKey = `loading-${mappingId}-${timeKey}`;

    if (currentlyFetchingMapping.has(loadingKey)) {
      return;
    }
    currentlyFetchingMapping.add(loadingKey);

    dispatch(AppApi.pushLoading(loadingKey));

    try {
      const mapping = config.visuals[visualId].mappings[mappingId];
      const { datasourceId, geoId, geoProperty } = mapping;
      const { datasets, geos, mappedSets } = getState().app;
      const datasource = config.datasources[datasourceId];
      const geo = config.geos[geoId];

      const [data, geojson] = await Promise.all([
        fetchDataset(datasource, date, mapping, datasets, dispatch),
        fetchGeo(geo, date, mapping, geos, dispatch),
      ]);

      if (!data || !geojson) {
        dispatch(AppApi.popLoading("mappedSet"));

        if (data === undefined) {
          const resetKey = `${visualId}-${mappingId}`;

          if (!dateResets.has(resetKey)) {
            dateResets.set(resetKey, 1);
          } else {
            dateResets.set(resetKey, dateResets.get(resetKey) + 1);
          }

          if (dateResets.get(resetKey) > 3) {
            dispatch(AppApi.setDatasetFound(false));
            return;
          }

          const newDate = date.clone().subtract(1, "days");

          dispatch(AppApi.setCurrentDate(newDate));
          return;
        }

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
      currentlyFetchingMapping.delete(loadingKey);
    }
  };
}
