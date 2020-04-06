import React from 'react'

interface Props {
  id: string;
  type: string; // TODO: Enum
  data: any; // TODO: use geojson type (and possibly other allowed data types for mapbox-gl sources)
  map?: any; // TODO: use @types/mapbox-gl
}

export class Source extends React.Component<Props> {
  shouldComponentUpdate() {
    // TODO
    return true;
  }

  // TODO: Allow to merge postCodeAreas with actual data,
  // to load postCodeAreas only once and diplay with different data in the client
  componentDidUpdate() {
    const {
      id,
      data
    } = this.props;
  
    this.props.map.getSource(id).setData(data);
  }

  componentDidMount() {
    const {
      id,
      type,
      data,
    } = this.props;

    this.props.map.addSource(id, {
      type,
      data
    });
  }

  render() {
    return null;
  }
}