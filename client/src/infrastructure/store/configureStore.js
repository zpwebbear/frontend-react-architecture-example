import { applyMiddleware, compose, createStore } from "redux";
import { withExtraArgument } from "redux-thunk";
import { todosApiClient } from "@/infrastructure/http/apiClient.js";
import { createTransport } from "@/infrastructure/http/httpTransport.js";
import { composeWithDevTools } from "@redux-devtools/extension";

import { rootReducer } from "./rootReducer.js";
import { todosMiddleware } from "./todos.middleware.js";

const transport = createTransport("http://localhost:3333");
const todosApi = todosApiClient(transport);

export const configureStore = (preloadedState = {}) => {
  const thunk = withExtraArgument({ todosApi });
  const middlewares = [thunk, todosMiddleware]; 
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
};
