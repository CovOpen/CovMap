import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";
import ReactMapGL, {FlyToInterpolator} from 'react-map-gl';


export function switchViewToPlace(inputPlace) {
  return async (dispatch: ReduxDispatch, getState) => {    
    const state = getState().app;


    const res = await fetch('/data/plz_points_area.geojson');
    const json = await res.json();
    //TODO find input in list
    const features = json.features;

    //TODO Javascript array.find, nimmt callback, wenn true gibt Eintrag im Array zurück
    //json.features.find -> Ergebnis ist Eintrag im Array

    for (var i = 0; i < features.length; i++){
        //TODO throw error when not found
        //TODO Umlaute are not working and should look for lowercase, currently only UpperCase
        if (features[i].properties.plz == inputPlace|| features[i].properties.name.includes(inputPlace)){
            const lat = features[i].geometry.coordinates[1]
            const long = features[i].geometry.coordinates[0]
            const viewport = {
                ...state.viewport,
                center: [lat, long],
                zoom: 10,
                transitionDuration: 5000,
                transitionInterpolator: new FlyToInterpolator()
              };
            dispatch(AppApi.setViewport(viewport));
            console.log(features[i]);
            break;
        } else {
            //Todo error message to user that location is not found
        }
      }


    
  };
}
