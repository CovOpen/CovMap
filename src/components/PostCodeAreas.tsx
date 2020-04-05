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
        color: '#adc9ff',
        weight: 1,
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
    weight: 3,
    color: '#003f97',
    dashArray: '',
  });
}

function resetHighlight(e, feature, layer) {
  layer.setStyle({
    color: '#adc9ff',
    weight: 1,
    dashArray: '0',
  });
}