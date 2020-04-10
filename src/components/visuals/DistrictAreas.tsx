import React, { Suspense } from "react";
const Source = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/esm/components/source'));
const Layer = React.lazy(() => import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/esm/components/layer'));

import { VisualProps, FeatureInfoProps } from '../types';
import { getFallbackComponent } from '../getFallback';

export type State = {
  mergedGeoJSON: any; // TODO: user geojson type
}

export class DistrictAreas extends React.Component<VisualProps, State> { // TODO: use geojson type
  state = {
    mergedGeoJSON: null,
  };
  dataField = 'coughs';
  districtAreas = null;
  currentDataset = null;

  shouldComponentUpdate({ districtAreas, currentDataset }: VisualProps) {
    if ((districtAreas !== null && districtAreas !== this.districtAreas)
      || (currentDataset !== null && currentDataset !== this.currentDataset)) {
      this.districtAreas = districtAreas;
      this.currentDataset = currentDataset;
      this.mergeDataWithGeoFeatures({ districtAreas, currentDataset });
    }
    return true;
  }

  componentDidMount() {
    this.mergeDataWithGeoFeatures(this.props as any) // TODO: Dammit fix those lazy anytypeeees
  }

  mergeDataWithGeoFeatures({ districtAreas, currentDataset }) {
    if (!districtAreas || !currentDataset) {
      return;
    }

    const mergedGeoJSON = Object.assign({}, districtAreas, {
      features: districtAreas.features.map(feature => ({
        ...feature,
        properties: {
          ...feature.properties,
          "coughs": Math.round(Math.random()*100) //TODO replace
          //...currentDataset.data[feature.properties.name_2]
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
        <Source id="districtAreas" type="geojson" data={this.state.mergedGeoJSON}>
          <Layer
            id="areas-fill"
            type="fill"
            paint={{
              'fill-color': {
                property: this.dataField,
                stops: [
                  [0, '#FFFFFF'],
                  [10, '#FED976'],
                  [20, '#FEB24C'],
                  [30, '#FFFFFF'],
                  [40, '#FC4E00'],
                  [50, '#E31A00'],
                  [60, '#BD0000'],
                  [70, '#800000'],
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
      <div>PLZ: {feature.properties.name_2}</div>
      <div>Value: {feature.properties[dataField]}</div>
    </div>
  )
}
