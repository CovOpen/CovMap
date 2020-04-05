import L from "leaflet";
import { GridLayer, withLeaflet } from "react-leaflet";

// Notes:
// There is a warning in the console: "Geometry exceeds allowed extent, reduce your vector tile buffer size"
// can be ignored -> https://github.com/mapbox/mapbox-gl-js/issues/8639
//
class MapBoxGLLayer extends GridLayer {
  constructor(props) {
    if (!props.style) {
      props.style = "mapbox://styles/mapbox/streets-v9"
    }
    super(props)
  }
  createLeafletElement(props) {
    return L.mapboxGL(props);
  }
}

export default withLeaflet(MapBoxGLLayer);
