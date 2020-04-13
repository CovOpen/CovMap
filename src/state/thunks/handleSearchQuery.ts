import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";


const locationFound = (inputPlace, data) => {
  var query = inputPlace.toLowerCase();
  if (query.includes('ö')) {
    query = query.replace('ö', "oe");
  }
  if (query.includes('ä')) {
    query = query.replace('ä', "ae");
  }
  if (query.includes('ü')) {
    query = query.replace('ü', "ue");
  }
  if (query.includes('ß')) {
    query = query.replace('ß', "ss");
  }

  if (data.properties.plz == query 
    || data.properties.name.toLowerCase() == query
    || data.properties.name.toLowerCase().includes(query)) {
      return true;
    }
  return false;
}

export function switchViewToPlace(inputPlace, onErrorCallback) {
  return async (dispatch: ReduxDispatch, getState) => {
    const { default: FlyToInterpolator } = await import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/es6/utils/transition/viewport-fly-to-interpolator')
    const state = getState().app;
    const res = await fetch('/data/plz_points_area.geojson');
    const json = await res.json();
    //TODO find input in list
    const features = json.features;

    //TODO Javascript array.find, nimmt callback, wenn true gibt Eintrag im Array zurück
    //json.features.find -> Ergebnis ist Eintrag im Array


    let latitude = 0
    let longitude = 0
    let foundResults : number[] = [];
    for (let i = 0; i < features.length; i++){
      //TODO Umlaute are not working and should look for lowercase, currently only UpperCase
      if (locationFound(inputPlace, features[i])){
        foundResults.push(i);
        latitude = features[i].geometry.coordinates[1]
        longitude = features[i].geometry.coordinates[0]
        
        break;
      } 
    }

    if(foundResults.length == 1) {
      const i = foundResults.pop();
      //not working yet: 
        //const latitude = features[i].geometry.coordinates[1]
        //const longitude = features[i].geometry.coordinates[0]
      const viewport = {
        ...state.viewport,
        latitude, 
        longitude,
        zoom: 10,
        transitionDuration: 2500,
        transitionInterpolator: new FlyToInterpolator()
      };
      dispatch(AppApi.setViewport(viewport));
    } else if (foundResults.length == 0) {
      onErrorCallback() 
      dispatch(AppApi.setErrorStateSearch(true))
    } else {
      //Todo show multiple results
    }
    
  };
}
