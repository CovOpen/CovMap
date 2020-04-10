import React from "react";
const Source = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/esm/components/source'));
const Layer = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/esm/components/layer'));

import { MAX_ZOOM_LEVEL } from '../../constants';
import { VisualProps, FeatureInfoProps } from '../types';

export type State = {
  mergedGeoJSON: any; // TODO: user geojson type
}

//This layer will show the data points as circles when zoomed in completely
const heatmapLayerDetail = {
  minzoom: MAX_ZOOM_LEVEL - 4,
  type: 'circle',
  paint: {
    'circle-stroke-color': 'white',
    'circle-stroke-width': 2,
  }
};

const heatmapLayer = {
  maxzoom: MAX_ZOOM_LEVEL,
  type: 'heatmap',
  paint: {
    // Increase the heatmap weight based on frequency and property magnitude
    // Increase the heatmap color weight weight by zoom level
    // heatmap-intensity is a multiplier on top of heatmap-weight
    'heatmap-intensity': ['interpolate', ['exponential', 0.8], ['zoom'], 0, 1, MAX_ZOOM_LEVEL, 0],
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
      'rgb(239,201,101)',
      0.9,
      'rgb(239,25,25)'
    ],
    // Adjust the heatmap radius by zoom level
    'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 10, MAX_ZOOM_LEVEL, 12],
    // Transition from heatmap to circle layer by zoom level
    'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 12, 1, 13, 0]
  }
};

export class Heatmap extends React.Component<VisualProps, State> { // TODO: use geojson type
  state = {
    mergedGeoJSON: null,
  };
  postCodePoints = null;
  currentDataset = null;

  shouldComponentUpdate({ postCodePoints, currentDataset }: VisualProps) {
    if ((postCodePoints !== null && postCodePoints !== this.postCodePoints) 
      || (currentDataset !== null && currentDataset !== this.currentDataset)) {
      this.postCodePoints = postCodePoints;
      this.currentDataset = currentDataset;
      this.mergeDataWithGeoFeatures({ postCodePoints, currentDataset });
    }
    return true;
  }

  componentDidMount() {
    this.mergeDataWithGeoFeatures(this.props as any)
    this.render()
  }

  mergeDataWithGeoFeatures({ postCodePoints, currentDataset }) {
    if (!postCodePoints || !currentDataset) {
      return;
    }
    
    const mergedGeoJSON = Object.assign({}, postCodePoints, {
      features: postCodePoints.features.map(feature => ({
        ...feature,
        properties: {
          ...feature.properties,
          ...currentDataset.data[feature.properties['plz2.data.PLZ99']]
        }
      }))
    })

    this.setState({ mergedGeoJSON });
  }

  render() {
    if (!this.state.mergedGeoJSON) {
      return null;
    }
    const { dataField } = this.props;

    heatmapLayer.paint['heatmap-weight'] = ['interpolate', ['linear'], ['get', dataField], 0, 1, 6, 1];
    heatmapLayerDetail.paint['circle-radius'] = {
      property: dataField,
      type: 'exponential',
      stops: [
        [{ zoom: MAX_ZOOM_LEVEL - 4, value: 1 }, 2],
        [{ zoom: MAX_ZOOM_LEVEL - 4, value: 62 }, 5],
        [{ zoom: MAX_ZOOM_LEVEL, value: 1 }, 10],
        [{ zoom: MAX_ZOOM_LEVEL, value: 62 }, 15],
      ]
    };
    heatmapLayerDetail.paint['circle-color'] = {
      property: dataField,
      type: 'exponential',
      stops: [
        [0, 'rgba(236,222,239,0)'],
        [10, 'rgb(236,222,239)'],
        [20, 'rgb(208,209,230)'],
        [30, 'rgb(166,189,219)'],
        [40, 'rgb(103,169,207)'],
        [50, 'rgb(28,144,153)'],
        [60, 'rgb(1,108,89)']
      ]
    };
    
    return (
      <Source id="postCodePoints" type="geojson" data={this.state.mergedGeoJSON as any}>
        <Layer {...heatmapLayer} />
        <Layer {...heatmapLayerDetail} />
      </Source>
    )
  }
}

export const FeatureInfo = ({ feature, dataField }: FeatureInfoProps) => {
  return (
    <div>
      <div>PLZ: {feature.properties['plz2.data.PLZ99']}</div>
      <div>Value: {feature.properties[dataField]}</div>
    </div>
  )
}