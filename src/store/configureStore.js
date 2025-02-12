import { applyMiddleware, compose, createStore } from "redux";
import * as thunkMiddleware from "redux-thunk";

import { rootReducer } from "./rootReducer.js";

export const configureStore = (preloadedState = {}) => {
  const middlewares = [thunkMiddleware.thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
};
