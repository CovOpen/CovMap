import React from 'react'

interface Props {
  id: string;
  type: string; // TODO: Enum
  data: any; // TODO
  map?: any; // TODO
}

// TODO: take source id, add fill for source according to data
export class Fill extends React.Component<Props> {
  shouldComponentUpdate() {
    // TODO
    return true;
  }

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