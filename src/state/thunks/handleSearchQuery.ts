import { ReduxDispatch } from "../../useThunkDispatch";
import { AppApi } from "../app";
import {
  DefaultSearchOptions,
  CustomSearchOptions,
  SearchMethod,
  SearchResult,
  SearchResultList,
} from "../../app-config.types";
import { State } from "../";
import { FeatureCollection } from "geojson";



const locationFound = (query, data, properties, searchOptions?) => {
  const queryTransformed = searchOptions?.transformQuery
    ? searchOptions?.transformQuery(query)
    : query


  return properties.some((propName) => {
    if (!data.properties[propName]) {
      console.warn(`Property "${propName}" not found in dataset, check your app-config search settings`);
      return false;
    }
    const propVal: any = data.properties[propName];

    // string constructor is pretty expensive as far as i know so forcing everything to be a string might be smart
    if (Array.isArray(propVal)) {
      // if its an array compare each item as string
      return propVal.some(val => String(val).toLowerCase().includes(query))
    }

    // compare strings or numbers
    if (String(propVal).toLowerCase().includes(queryTransformed.toLowerCase())) {
      return true;
    }
    return false;
  });


}

export function getPossibleSearchResults() {
  return (dispatch: ReduxDispatch, getState: () => State) => {
    const state = getState();
    const { currentLayerGroup } = state.app;
    const result = defaultSearchMethod("", state, {
      ...currentLayerGroup.search,
      all: true,
    } as DefaultSearchOptions);

    return result;
  };
}

function defaultSearchMethod(query: string, state: State, searchOptions?: DefaultSearchOptions) {
  const { currentVisual, mappedSets } = state.app;
  const mappedSetsToSearchIn = searchOptions?.inMappings.map((mapping) => ({
    ...mapping,
    data: mappedSets[currentVisual] ? mappedSets[currentVisual][mapping.id] : null,
  }));

  if (!mappedSetsToSearchIn) {
    return { results: [] };
  }

  const foundResults: Array<SearchResult> = [];

  for (let setNum = 0; setNum < mappedSetsToSearchIn.length; setNum++) {
    const currentSet = mappedSetsToSearchIn[setNum]
    const features = (currentSet.data?.geo as FeatureCollection).features

    for (let i = 0; i < features.length; i++) {
      if (locationFound(query, features[i], currentSet.properties, searchOptions)) {
        try {
          const coordinates = features[i]?.properties?.geo_point_2d || [13.404954, 52.520008] // if nothing found zoom to the source of all evil
          const props = features[i].properties || {}
          const name = props[searchOptions?.nameProp || 'name']

          foundResults.push({
            name,
            feature: features[i],
            source: currentSet.id,
            lat: coordinates[1],
            lng: coordinates[0],
          });

        } catch (err) {
          console.log(err)
          console.warn('Coordinates extraction error, check your app-config search settings and geo data')
          return { results: [] }
        }
        if (!searchOptions?.all) {
          break;
        }
      }
    }
  }

  return { results: foundResults };
}

export function switchViewToPlace(query: string, onFoundCallback?, onErrorCallback?) {
  return async (dispatch: ReduxDispatch, getState: () => State) => {
    if (!query || query.length < 3) {
      return;
    }
    const { default: FlyToInterpolator } = await import(
      /* webpackChunkName: "mapgl" */ "react-map-gl/dist/es6/utils/transition/viewport-fly-to-interpolator"
    );
    const state = getState();
    const { viewport, currentLayerGroup } = state.app;
    const notFoundMessage = currentLayerGroup.search?.notFoundMessage;

    let searchResult: SearchResultList;

    if (currentLayerGroup.search && (currentLayerGroup.search as CustomSearchOptions).searchMethod) {
      searchResult = await ((currentLayerGroup.search as CustomSearchOptions).searchMethod as SearchMethod)(
        query,
        state,
      );
    } else {
      searchResult = await defaultSearchMethod(query, state, currentLayerGroup.search as DefaultSearchOptions);
    }

    if (searchResult.results.length === 1) {
      const result = searchResult.results[0];
      const latitude = result.lat;
      const longitude = result.lng;

      if (!latitude || !longitude) {
        dispatch(AppApi.setSnackbarMessage({ text: notFoundMessage || "Nothing found.", type: "error" }));
        return;
      }

      const newViewport = {
        ...viewport,
        latitude,
        longitude,
        zoom: 8.5, // TODO: Choose zoom depending on screen size
        transitionDuration: 2500,
        transitionInterpolator: new FlyToInterpolator(),
      };

      dispatch(AppApi.setViewport(newViewport));
      // TODO: find feature by coordinates and select on map
      if (result.feature) {
        dispatch(AppApi.setCurrentFeature({ ...result.feature, source: result.source }, [longitude, latitude]));
      }
      onFoundCallback && onFoundCallback();
    } else if (searchResult.results.length === 0) {
      onErrorCallback && onErrorCallback();
      dispatch(AppApi.setSnackbarMessage({ text: notFoundMessage || "", type: "error" }));
    } else {
      // TODO: show multiple results
    }
  };
}
