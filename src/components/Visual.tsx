import React, { Suspense, useEffect, memo } from "react";
import { LazyError } from "./LazyError";
const Source = React.lazy(() =>
  import(/* webpackChunkName: "mapgl" */ "react-map-gl/dist/es6/components/source").catch(() => ({
    default: LazyError,
  })),
);
const Layer = React.lazy(() =>
  import(/* webpackChunkName: "mapgl" */ "react-map-gl/dist/es6/components/layer").catch(() => ({
    default: LazyError,
  })),
);
import { useSelector } from "react-redux";

import { AppApi, MapSet } from "../state/app";
import { State } from "../state";
import { getFallbackComponent } from "./getFallback";
import { useThunkDispatch } from "../useThunkDispatch";
import { fetchMappedSet } from "../state/thunks/fetchMappedSet";
import { formatUTCDate } from "../lib/formatUTCDate";
import { config } from "app-config/index";

export const Visual = memo(() => {
  const dispatch = useThunkDispatch();
  const currentVisual = useSelector((state: State) => state.app.currentVisual);
  const mappedSets = useSelector((state: State) => state.app.mappedSets);
  const currentMappable = useSelector((state: State) => state.app.currentMappable);
  const currentDate = useSelector((state: State) => state.app.currentDate);
  const currentLayerGroup = useSelector((state: State) => state.app.currentLayerGroup);
  const visual = config.visuals[currentVisual];
  const timeKey = formatUTCDate(currentDate);

  const filteredLayers = visual.layers.filter((layer) => currentLayerGroup.layers.includes(layer.id));

  const mappingIds = new Set(filteredLayers.map((layer) => layer.source));
  const allSetsAreLoaded = () => {
    for (const mappingId of mappingIds) {
      const mapset = mappedSets[currentVisual] ? mappedSets[currentVisual][mappingId] : null;
      if (!mapset || !mapset.timeKeys.includes(timeKey)) {
        return false;
      }
    }
    return true;
  };
  const loadMissingSets = () => {
    for (const mappingId of mappingIds) {
      const mapset = mappedSets[currentVisual] ? mappedSets[currentVisual][mappingId] : null;
      if (!mapset || !mapset.timeKeys.includes(timeKey)) {
        dispatch(fetchMappedSet(currentVisual, mappingId, currentDate));
      }
    }
  };

  useEffect(() => {
    loadMissingSets();
    if (allSetsAreLoaded()) {
      dispatch(AppApi.setDatasetFound(true));
    }
  }, [mappedSets, timeKey]);

  if (!allSetsAreLoaded()) {
    return null;
  }

  const mapsets: Array<MapSet | undefined> = [];
  for (const mappingId of mappingIds) {
    mapsets.push(mappedSets[currentVisual] ? mappedSets[currentVisual][mappingId] : undefined);
  }

  const visualLayers = filteredLayers.map((layer) => {
    const l = layer.fn(currentMappable.property, timeKey);
    l.id = layer.id;
    l.source = layer.source;
    return l;
  });

  return (
    <Suspense fallback={getFallbackComponent()}>
      {mapsets.map((mapset) =>
        mapset ? <Source id={mapset.id} key={mapset.id} type="geojson" data={mapset.geo} /> : null,
      )}
      {visualLayers.map((layer) => (
        <Layer key={layer.id} {...layer} />
      ))}
    </Suspense>
  );
});
