import React from "react";
import {Source, Layer} from 'react-map-gl';

export type Props = {
  postCodePoints: any; 
  currentDataset: any;
}

const MAX_ZOOM_LEVEL = 14;

const heatmapLayer = {
  maxzoom: MAX_ZOOM_LEVEL,
  type: 'heatmap',
  paint: {
    // Increase the heatmap weight based on frequency and property magnitude
    // Increase the heatmap color weight weight by zoom level
    // heatmap-intensity is a multiplier on top of heatmap-weight
    'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, MAX_ZOOM_LEVEL, 3],
    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    // Begin color ramp at 0-stop with a 0-transparancy color
    // to create a blur-like effect.
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(33,102,172,0)',
      0.2,
      'rgb(103,169,207)',
      0.4,
      'rgb(209,229,240)',
      0.6,
      'rgb(253,219,199)',
      0.7,
      'rgb(239,138,98)',
      0.8,
      'rgb(255,201,101)',
      0.9,
      'rgb(255,25,25)'
    ],
    // Adjust the heatmap radius by zoom level
    'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, MAX_ZOOM_LEVEL, 12],
    // Transition from heatmap to circle layer by zoom level
    'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0]
  }
};

export class Heatmap extends React.Component<Props> { // TODO: use geojson type
  mergedGeoJSON = null;
  // TODO: GUI to choose which key should be displayed (from currentDataset.types)
  dataField = 'coughs';
  postCodePoints = null;
  currentDataset = null;

  constructor(props) {
    super(props)
  }

  shouldComponentUpdate({ postCodePoints, currentDataset }) {
    if (postCodePoints !== this.postCodePoints || currentDataset !== this.currentDataset) {
      this.postCodePoints = postCodePoints;
      this.currentDataset = currentDataset;
      this.mergeDataWithGeoFeatures({ postCodePoints, currentDataset });
      console.log('UPDATIGN')
      return true;
    }
    return false;
  }

  mergeDataWithGeoFeatures({ postCodePoints, currentDataset }) {
    console.log(typeof currentDataset, typeof postCodePoints, {currentDataset, postCodePoints})
    if (!postCodePoints || !currentDataset) {
      return;
    }

    this.mergedGeoJSON = Object.assign({}, postCodePoints, {
      features: postCodePoints.features.map(feature => ({
        ...feature,
        properties: {
          ...feature.properties,
          ...currentDataset.data[feature.properties['plz2.data.PLZ99']]
        }
      }))
    })
  }

  render() {
    if (!this.mergedGeoJSON) {
      return null;
    }

    heatmapLayer.paint['heatmap-weight'] = ['interpolate', ['linear'], ['get', this.dataField], 0, 0, 6, 1];
  
    return (
      <Source id="postCodePoints" type="geojson" data={this.mergedGeoJSON}>
        <Layer {...heatmapLayer} />
      </Source>
    )
  }
}