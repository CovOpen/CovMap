import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";
import ReactMapGL, {FlyToInterpolator} from 'react-map-gl';

export function switchViewport(inputPlace) {
  return async (dispatch: ReduxDispatch, getState) => {    
    const state = getState().app;


    //TODO find input in list
    const res = await fetch('/data/plz_points.geojson');
    const json = await res.json();

    for (var i = 0; i < json.length; i++){
        if (json[i].properties.plz == inputPlace || json[i].properties.name == inputPlace ){
            const viewport = {
                ...state.viewport,
                latitude : json[i].geometry.coordinates[0],
                longitude : json[i].geometry.coordinates[1],
                zoom: 10,
                transitionDuration: 5000,
                transitionInterpolator: new FlyToInterpolator()
              };
          dispatch(AppApi.setViewport(viewport));
          break;
        } else {
            //Todo error message to user that location is not found
        }
      }


    
  };
}
