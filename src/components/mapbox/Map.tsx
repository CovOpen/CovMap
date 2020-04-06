import React from 'react'
import mapboxgl from 'mapbox-gl'

interface Props {
  accessToken: string;
  style: string;
  center: number[];
  zoom: number;
}

export class Map extends React.Component<Props> {
  mapRef = React.createRef();
  map;
  loaded = false;

  componentDidUpdate() {
    const {
      center,
      zoom
    } = this.props;
  
    this.map.setZoom(zoom)
    this.map.setCenter(center)
  }

  componentDidMount() {
    const {
      accessToken,
      style = 'mapbox://styles/mapbox/streets-v9',
      center = [5, 34],
      zoom = 1.5
    } = this.props;

    mapboxgl.accessToken = accessToken;

    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style,
      center,
      zoom
    });
    
    this.map.on('load', () => {
      this.loaded = true;
    });
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child as any, { map: this.map })
    );

    return (
      <div ref={this.mapRef as any} style={{ width: '100%', height: '100%' }} className="react-mapbox-map">
        {this.loaded ? childrenWithProps : null}
      </div>
    );
  }
}