import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";
import { State } from "../";
import { FeatureCollection } from "geojson";

import { config } from "../../../app-config/index"

export function switchViewToPlace(inputPlace, onFoundCallback, onErrorCallback) {
  return async (dispatch: ReduxDispatch, getState: () => State) => {
    const { default: FlyToInterpolator } = await import(/* webpackChunkName: "mapgl" */ 'react-map-gl/dist/es6/utils/transition/viewport-fly-to-interpolator')
    const { viewport, currentVisual, mappedSets } = getState().app;
    const visual = config.visuals[currentVisual]
    const notFoundMessage = visual.search?.notFoundMessage
    const mappedSetsToSearchIn = visual.search?.inMappings.map(mapping => ({
      ...mapping,
      data: mappedSets.get(currentVisual)?.get(mapping.id)
    }))

    if (!mappedSetsToSearchIn) {
      return
    }
    
    const locationFound = (inputPlace, data, properties) => {
      const query = inputPlace.toLowerCase()
        .replace('ö', "oe")
        .replace('ä', "ae")
        .replace('ü', "ue")
        .replace('ß', "ss");
    
      return properties.some(propName => {
        if (!data.properties[propName]) {
          dispatch(AppApi.setSnackbarMessage({ 
            text: `Property "${propName}" not found in dataset, check your app-config search settings`, 
            type: 'warning' 
          }))
          return false;
        }
        if (data.properties[propName].toLowerCase().includes(query)) {
          return true;
        }
        return false;
      })
    }

    //TODO Javascript array.find, nimmt callback, wenn true gibt Eintrag im Array zurück
    //json.features.find -> Ergebnis ist Eintrag im Array

    let latitude = 0
    let longitude = 0
    let coordinates: Array<number> | null = null
    const foundResults: any[] = [];
    
    for (let setNum = 0; setNum < mappedSetsToSearchIn.length; setNum++){
      const currentSet = mappedSetsToSearchIn[setNum]
      const features = (currentSet.data?.geo as FeatureCollection).features

      for (let i = 0; i < features.length; i++){
        //TODO Umlaute are not working and should look for lowercase, currently only UpperCase
        if (locationFound(inputPlace, features[i], currentSet.properties)){
          foundResults.push({ ...features[i], source: currentSet.id });
          coordinates = currentSet.getCoordinates(features[i])
          break;
        } 
      }
    }

    if (!coordinates) {
      dispatch(AppApi.setSnackbarMessage({ 
        text: 'No coordinates found, check your app-config search settings and geo data', 
        type: 'warning' 
      }))
      return
    }

    latitude = coordinates[1]
    longitude = coordinates[0]

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
      onFoundCallback()
    } else if (foundResults.length === 0) {
      onErrorCallback() 
      dispatch(AppApi.setSnackbarMessage({ text: notFoundMessage || '', type: 'error' }))
    } else {
      //Todo show multiple results
    }
  };
}
