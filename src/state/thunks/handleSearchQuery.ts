import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";

export function switchViewToPlace(inputPlace) {
  return async (dispatch: ReduxDispatch, getState) => {
    const { default: FlyToInterpolator } = await import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/es6/utils/transition/viewport-fly-to-interpolator')
    const state = getState().app;
    const res = await fetch('/data/plz_points_area.geojson');
    const json = await res.json();
    //TODO find input in list
    const features = json.features;

    //TODO Javascript array.find, nimmt callback, wenn true gibt Eintrag im Array zurück
    //json.features.find -> Ergebnis ist Eintrag im Array

    for (let i = 0; i < features.length; i++){
      //TODO throw error when not found
      //TODO Umlaute are not working and should look for lowercase, currently only UpperCase
      if (features[i].properties.plz == inputPlace || features[i].properties.name.includes(inputPlace)){
        const latitude = features[i].geometry.coordinates[1]
        const longitude = features[i].geometry.coordinates[0]
        const viewport = {
          ...state.viewport,
          latitude, 
          longitude,
          zoom: 10,
          transitionDuration: 2500,
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
