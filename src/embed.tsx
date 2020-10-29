import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import EmbedApp from "./EmbedApp";
import { store } from "./state";

const root = document.getElementById("embed");
const persistor = persistStore(store);

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}></PersistGate>
    <EmbedApp />
  </Provider>,
  root,
);
