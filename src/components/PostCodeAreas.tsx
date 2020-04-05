import React, { useEffect } from "react";
import { GeoJSON } from "react-leaflet";
import { useSelector } from "react-redux";
import { useThunkDispatch } from "../useThunkDispatch";

import { State } from "../state";
import { fetchPostCodeAreas } from '../state/thunks/fetchPostCodeAreas';
import { fetchDataset } from '../state/thunks/fetchDataset';

export function PostCodeAreas () {
  const dispatch = useThunkDispatch();
  const postCodeAreas = useSelector((state: State) => state.app.postCodeAreas);
  const currentDataset = useSelector((state: State) => state.app.currentDataset);
  
  useEffect(() => {
    if (!postCodeAreas) {
      dispatch(fetchPostCodeAreas())
    }
    if (!currentDataset) {
      dispatch(fetchDataset())
    }
  });

  if (!postCodeAreas || !currentDataset) {
    return null;
  }

  // TODO: GUI to choose which key should be displayed (from currentDataset.types)
  const dataField = 'coughs';

  function getColor(d) {
    return d > 70 ? '#800026' :
      d > 60  ? '#BD0026' :
        d > 50  ? '#E31A1C' :
          d > 40  ? '#FC4E2A' :
            d > 30   ? '#FD8D3C' :
              d > 20   ? '#FEB24C' :
                d > 10   ? '#FED976' :
                  '#FFEDA0';
  }

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: (e) => resetHighlight(e, feature, layer),
    });
  }
  
  const highlightFeature = (e) => {
    const layer = e.target;
    layer.bringToFront();
    layer.setStyle({
      weight: 3,
      // color: getColor(currentDataset.data[feature.properties.PLZ99][dataField]),
      dashArray: '',
    });
  }
  
  const resetHighlight = (e, feature, layer) => {
    layer.setStyle({
      // color: getColor(currentDataset.data[feature.properties.PLZ99][dataField]),
      weight: 1,
      dashArray: '0',
    });
  }
  
  return (
    <GeoJSON 
      data={postCodeAreas}
      style={(feature) => {
        const color = getColor(currentDataset.data[feature.properties.PLZ99][dataField]);
        return ({
          color,
          weight: 1,
          dashArray: '0',
          fillOpacity: 0.7,
          fillColor: color,
        });
      }}
      onEachFeature={onEachFeature}
    />
  )
}