import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import { store } from "./state";
import { AppApi } from "./state/app";

const root = document.getElementById("app");


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
    <PersistGate loading={null} persistor={persistor}></PersistGate>
    <App />
  </Provider>,
  root,
);
