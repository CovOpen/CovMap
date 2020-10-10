import { setAutoFreeze, enableMapSet } from "immer";
import { combineReducers, compose } from "redux";
import { persistReducer, createTransform } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import { AppReduxReducer, AppState } from "./app";
import { config } from 'app-config/index'

enableMapSet()
setAutoFreeze(false);

const viewportSubsetFiler = createBlacklistFilter(
  'viewport',
  ['transitionInterpolator']
);

const reviveCurrentLayerGroup = createTransform(
  (inboundState: any, key: string | number | symbol, state: any) => {
    return 'currentLayerGroup' === key
      ? inboundState.id
      : inboundState
  },
  (outboundState: any, key: string | number | symbol, fullState: any) => {
    return 'currentLayerGroup' === key
      ? config.visuals[JSON.parse(fullState.currentVisual)].layerGroups.find(({ id }) => (id === outboundState)) as any
      : outboundState
  },
  { whitelist: ['currentLayerGroup'] }
);

function persist(reducer: any, key: string, whitelist?: string[], blacklist?: string[]) {
  return persistReducer({
    blacklist,
    key,
    stateReconciler: autoMergeLevel2,  // alternatives: autoMigrateLevel1 (default), autoMigrateLevel2
    storage,
    whitelist,
    transforms: [
      viewportSubsetFiler,
      reviveCurrentLayerGroup
    ]
  }, reducer);
}

export const rootReducer = combineReducers({
  app: persist(AppReduxReducer, "app", undefined, [
    'mappedSets', 'datasets', 'geos', 'loading', 'isLoading', 'datasetFound',
    'viewPortEventsCount', 'currentDate', 'hasSearchError',
    'currentFeature', 'isInstalled', 'installPrompt', 'snackbarMessage',
  ]),
});

const composeEnhancers = process.env.NODE_ENV === 'development' ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : (middleware) => middleware;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export interface State {
    app: AppState;
}
