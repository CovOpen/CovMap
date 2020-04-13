import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";
import { State } from "../";
import { FeatureCollection } from "geojson";

import { config } from "../../../app-config/index"

const locationFound = (inputPlace, data, properties) => {
  const query = inputPlace.toLowerCase()
    .replace('ö', "oe")
    .replace('ä', "ae")
    .replace('ü', "ue")
    .replace('ß', "ss");

  return properties.some(propName => {
    if (data.properties[propName].toLowerCase().includes(query)) {
      return true;
    }
    return false;
  }) 
}

export function switchViewToPlace(inputPlace, onErrorCallback) {
  return async (dispatch: ReduxDispatch, getState: () => State) => {
    const { default: FlyToInterpolator } = await import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/es6/utils/transition/viewport-fly-to-interpolator')
    const { viewport, currentVisual, mappedSets } = getState().app;
    const visual = config.visuals[currentVisual]
    const mappedSetsToSearchIn = visual.search?.inMappings.map(mapping => ({
      ...mapping,
      data: mappedSets.get(currentVisual)?.get(mapping.id)
    }))

    if (!mappedSetsToSearchIn) {
      return
    }
    
    //TODO Javascript array.find, nimmt callback, wenn true gibt Eintrag im Array zurück
    //json.features.find -> Ergebnis ist Eintrag im Array

    let latitude = 0
    let longitude = 0
    const foundResults: any[] = [];
    
    for (let setNum = 0; setNum < mappedSetsToSearchIn.length; setNum++){
      const currentSet = mappedSetsToSearchIn[setNum]
      const features = (currentSet.data?.geo as FeatureCollection).features

      for (let i = 0; i < features.length; i++){
        //TODO Umlaute are not working and should look for lowercase, currently only UpperCase
        if (locationFound(inputPlace, features[i], currentSet.properties)){
          foundResults.push({ ...features[i], source: currentSet.id });
          const coordinates = currentSet.getCoordinates(features[i])
          latitude = coordinates[0]
          longitude = coordinates[1]
          
          break;
        } 
      }
    }

    if(foundResults.length === 1) {
      const newViewport = {
        ...viewport,
        latitude, 
        longitude,
        zoom: 9.5,
        transitionDuration: 2500,
        transitionInterpolator: new FlyToInterpolator()
      };
      dispatch(AppApi.setViewport(newViewport));
      dispatch(AppApi.setCurrentFeature(foundResults[0], [longitude, latitude]));
    } else if (foundResults.length === 0) {
      onErrorCallback() 
      dispatch(AppApi.setErrorStateSearch(true))
    } else {
      //Todo show multiple results
    }
  };
}
