import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { ipcRenderer as ipc, remote } from "electron";
import Root from "./containers/Root";
import { configureStore, history } from "./store/configureStore";
import * as Immutable from "immutable";
import "./app.global.css";

const store = configureStore();

// Register for debugging
// window.store = store;

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("./containers/Root", () => {
    const NextRoot = require("./containers/Root"); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById("root")
    );
  });
}
