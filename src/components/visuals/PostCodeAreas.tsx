import React, { Suspense } from "react";
const Source = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/esm/components/source'));
const Layer = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/esm/components/layer'));

import { VisualProps, FeatureInfoProps } from '../types';
import { getFallbackComponent } from '../getFallback';

export type State = {
  mergedGeoJSON: any; // TODO: user geojson type
}

export class PostCodeAreas extends React.Component<VisualProps, State> { // TODO: use geojson type
  state = {
    mergedGeoJSON: null,
  };
  dataField = 'coughs';
  postCodeAreas = null;
  currentDataset = null;

  shouldComponentUpdate({ postCodeAreas, currentDataset }: VisualProps) {
    if ((postCodeAreas !== null && postCodeAreas !== this.postCodeAreas) 
      || (currentDataset !== null && currentDataset !== this.currentDataset)) {
      this.postCodeAreas = postCodeAreas;
      this.currentDataset = currentDataset;
      this.mergeDataWithGeoFeatures({ postCodeAreas, currentDataset });
    }
    return true;
  }

  componentDidMount() {
    this.mergeDataWithGeoFeatures(this.props as any) // TODO: Dammit fix those lazy anytypeeees
  }

  mergeDataWithGeoFeatures({ postCodeAreas, currentDataset }) {
    if (!postCodeAreas || !currentDataset) {
      return;
    }
    
    const mergedGeoJSON = Object.assign({}, postCodeAreas, {
      features: postCodeAreas.features.map(feature => ({
        ...feature,
        properties: {
          ...feature.properties,
          ...currentDataset.data[feature.properties.PLZ99]
        }
      }))
    })
    this.setState({ mergedGeoJSON });
  }

  render() {
    if (!this.state.mergedGeoJSON) {
      return null;
    }

    return (
      <Suspense fallback={getFallbackComponent()}>    
        <Source id="postCodeAreas" type="geojson" data={this.state.mergedGeoJSON}>
          <Layer
            id="areas-fill"
            type="fill"
            paint={{
              'fill-color': {
                property: this.dataField,
                stops: [
                  [0, '#FFEDA0'],
                  [10, '#FED976'],
                  [20, '#FEB24C'],
                  [30, '#FD8D3C'],
                  [40, '#FC4E2A'],
                  [50, '#E31A1C'],
                  [60, '#BD0026'],
                  [70, '#800026'],
                ]
              },
              'fill-opacity': 0.8,
            }} />
          <Layer
            id="areas-borders"
            type="line"
            paint={{
              'line-color': '#627BC1',
              'line-width': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                4,
                0
              ]
            }} />
        </Source>
      </Suspense>
    )
  }
}

export const FeatureInfo = ({ feature, dataField }: FeatureInfoProps) => {
  return (
    <div>
      <div>PLZ: {feature.properties.PLZ99}</div>
      <div>Value: {feature.properties[dataField]}</div>
    </div>
  )
}