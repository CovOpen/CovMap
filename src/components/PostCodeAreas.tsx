import React from "react";
import { GeoJSON } from "react-leaflet";
import { GeoJSON as GeoJSONType } from 'geojson';

export function PostCodeAreas ({ data }: { data: GeoJSONType | null }) {
  if (!data) {
    return null;
  }
  
  return (
    <GeoJSON 
      data={data}
      style={(feature) => ({
        color: '#3b7cd6',
        weight: 2,
        dashArray: '0',
      })}
      onEachFeature={onEachFeature}
    />
  )
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: (e) => resetHighlight(e, feature, layer),
  });
}

function highlightFeature(e) {
  const layer = e.target;

  layer.setStyle({
    weight: 5,
    color: '#003f97',
    dashArray: '',
  });
}

function resetHighlight(e, feature, layer) {
  layer.setStyle({
    color: '#3b7cd6',
    weight: 2,
    dashArray: '0',
  });
}