import React from "react";
const Source = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/esm/components/source'));
const Layer = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/esm/components/layer'));

import { MAX_ZOOM_LEVEL } from '../../constants';
import { VisualProps, FeatureInfoProps } from '../types';

export type State = {
  mergedGeoJSON: any; // TODO: user geojson type
}

//This layer will show the data points as circles when zoomed in completely
const bubblemapLayer = {
  minzoom: 1,
  type: 'circle',
  paint: {
    'circle-stroke-color': 'white',
    'circle-stroke-width': 0.5,
    'circle-opacity': ['interpolate', ['linear'], ['zoom'], 1, 0, 14, 1]
  }
};



export class Bubblemap extends React.Component<VisualProps, State> { // TODO: use geojson type
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

    
    bubblemapLayer.paint['circle-radius'] = {
      property: dataField,
      type: 'exponential',
      stops: [
        [{ zoom: 1, value: 1 }, 2],
        [{ zoom: 1, value: 62 }, 2],
        [{ zoom: MAX_ZOOM_LEVEL, value: 1 }, 3],
        [{ zoom: MAX_ZOOM_LEVEL, value: 62 }, 3],
      ]
    };
    
    bubblemapLayer.paint['circle-color'] = {
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
        <Layer {...bubblemapLayer} />
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