import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import thunk from "redux-thunk";

import App from "./App";
import { rootReducer } from "./state";
import { AppApi } from "./state/app";

const root = document.getElementById("app");

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

// window.addEventListener("popstate", (e: PopStateEvent) => {
//     store.dispatch(AppApi.gotoPage(Page.Map))
// })

store.subscribe(() => {
  (window as any).state = store.getState();
});
(window as any).go = (pageId: string) => store.dispatch(AppApi.gotoPage(pageId))
const persistor = persistStore(store);
render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  root,
);
