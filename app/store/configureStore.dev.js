import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createEpicMiddleware } from "redux-observable";
import { createHashHistory } from "history";
import { routerMiddleware, routerActions } from "react-router-redux";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";
import rootEpic from "../epics";
import * as counterActions from "../actions/counter";
import * as jupyterActions from "../actions/counter";
import type { counterStateType } from "../reducers/counter";
import type { jupyterStateType } from "../reducers/jupyter";

const history = createHashHistory();

const configureStore = (initialState?: AppState) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Redux Observable (Epic) Middleware
  const epicMiddleware = createEpicMiddleware(rootEpic);
  middleware.push(epicMiddleware);

  // Logging Middleware
  const logger = createLogger({
    level: "info",
    collapsed: true
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== "test") {
    middleware.push(logger);
  }

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // Redux DevTools Configuration
  const actionCreators = {
    ...counterActions,
    ...jupyterActions,
    ...routerActions
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
        actionCreators
      })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept("../reducers", () =>
      store.replaceReducer(require("../reducers"))
    ); // eslint-disable-line global-require
  }

  return store;
};

export default { configureStore, history };
