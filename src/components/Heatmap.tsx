import React from "react";
import {Source, Layer} from 'react-map-gl';

export type Props = {
  postCodePoints: any; 
  currentDataset: any;
}

const MAX_ZOOM_LEVEL = 14;


//This layer will show the data points as circles when zoomed in completely
const heatmapLayerDetail = {
  minzoom: MAX_ZOOM_LEVEL,
  type: 'circle',
  paint: {
    "circle-radius": {
      "property": "dbh",
      "type": "exponential",
      stops: [
        [{ zoom: 15, value: 1 }, 5],
        [{ zoom: 15, value: 62 }, 10],
        [{ zoom: 22, value: 1 }, 20],
        [{ zoom: 22, value: 62 }, 50],
      ]
  },
    'circle-color': [
      'dbh',
      ['exponential'],
      0,
      'rgba(33,102,172,0)',
      10,
      'rgb(103,169,207)',
      20,
      'rgb(209,229,240)',
      30,
      'rgb(253,219,199)',
      40,
      'rgb(239,138,98)',
      50,
      'rgb(255,201,101)',
      60,
      'rgb(255,25,25)'
  ],
  'circle-stroke-color': 'white',
  'circle-stroke-width': 1,
  "circle-opacity": {
    "stops": [
        [14, 1],
        [15, 1]
    ]
}
  }
};


const heatmapLayer = {
  maxzoom: MAX_ZOOM_LEVEL,
  type: 'heatmap',
  paint: {

    // : property, type, zoom and stops: from 1 to 0 between zoom levels MAX_ZOOM_LEVEL and 3
    // can be exponential or linear
    'heatmap-weight': ['interpolate', ['linear'], ['zoom'], 0, 1, MAX_ZOOM_LEVEL, 1],
    // Increase the heatmap weight based on frequency and property magnitude
    // Increase the heatmap color weight weight by zoom level
    // heatmap-intensity is a multiplier on top of heatmap-weight
    //'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, MAX_ZOOM_LEVEL, 3],
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
    // Adjust the heatmap radius by zoom level - fifth value is for radius of single points, last for max radius
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

  shouldComponentUpdate({ postCodePoints, currentDataset }) {
    if (postCodePoints !== this.postCodePoints || currentDataset !== this.currentDataset) {
      this.postCodePoints = postCodePoints;
      this.currentDataset = currentDataset;
      this.mergeDataWithGeoFeatures({ postCodePoints, currentDataset });
      console.log('UPDATING')
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
    heatmapLayerDetail.paint['heatmap-weight'] = ['interpolate', ['linear'], ['get', this.dataField], 0, 1, 14, 1];
    
  
    return (
      <Source id="postCodePoints" type="geojson" data={this.mergedGeoJSON}>
        <Layer {...heatmapLayer} />
        <Layer {...heatmapLayerDetail} />
      </Source>
    )
  }
}