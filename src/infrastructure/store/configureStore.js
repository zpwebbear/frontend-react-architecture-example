import { applyMiddleware, compose, createStore } from "redux";
import { withExtraArgument } from "redux-thunk";

import { rootReducer } from "./rootReducer.js";

export const configureStore = (preloadedState = {}) => {
  const thunk = withExtraArgument({});
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
};
