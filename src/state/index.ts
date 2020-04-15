import { setAutoFreeze, enableMapSet } from "immer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { createBlacklistFilter } from 'redux-persist-transform-filter';

import { AppReduxReducer, AppState } from "./app";

enableMapSet()
setAutoFreeze(false);

const viewportSubsetFiler = createBlacklistFilter(
  'viewport',
  ['transitionInterpolator']
);

// const transformMap = (props): any => createTransform(
//   (inboundState: any, key: string | number, ...args) => {
//     props.includes(key) && console.log('SSSSSERIALIZE MAAAPP', props.includes(key), typeof inboundState, inboundState, key, args)
//     // const prop = inboundState
//     return props.includes(key)
//       ? [...inboundState]
//       : inboundState
//     return inboundState
//   },
//   (outboundState: any, key: string | number, ...args) => {
//     // const prop = outboundState
//     props.includes(key) && console.log('DEEEEEEERIALIZE MAAAPP', props.includes(key), typeof outboundState, outboundState, key, args)
//     return props.includes(key)
//       ? new Map(outboundState)
//       : outboundState
//     return outboundState
//   },
//   { whitelist: ['infoDialogs'] }
// );

function persist(reducer: any, key: string, whitelist?: string[], blacklist?: string[]) {
  return persistReducer({
    blacklist,
    key,
    stateReconciler: autoMergeLevel2,  // alternatives: autoMigrateLevel1 (default), autoMigrateLevel2
    storage,
    whitelist,
    transforms: [
      viewportSubsetFiler, 
      // transformMap(['infoDialogs'])
    ]
  }, reducer);
}

export const rootReducer = combineReducers({
  app: persist(AppReduxReducer, "app", undefined, [
    'mappedSets', 'datasets', 'geos', 'loading', 'datasetFound', 
    'viewPortEventsCount', 'currentDate', 'hasSearchError',
    'currentFeature', 'isInstalled', 'installPrompt', 'snackbarMessage',
    'currentLayerGroup'
  ]),
});

// tslint:disable-next-line: no-empty-interface
export interface State {
    app: AppState;
}
