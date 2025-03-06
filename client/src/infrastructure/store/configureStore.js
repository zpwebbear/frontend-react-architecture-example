import { todosApiClient, todosServerApiClient } from "@/infrastructure/http/apiClient.js";
import { createTransport } from "@/infrastructure/http/httpTransport.js";
import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, createStore } from "redux";
import { withExtraArgument } from "redux-thunk";

import { todosMiddleware } from "@/application/todos-client/todos.middleware.js";
import { rootReducer } from "@/infrastructure/store/rootReducer.js";

const transport = createTransport("http://localhost:3333");
const todosApi = todosApiClient(transport);
const todosServerApi = todosServerApiClient(transport);

export const configureStore = (preloadedState = {}) => {
  const thunk = withExtraArgument({ todosApi, todosServerApi });
  const middlewares = [thunk, todosMiddleware]; 
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
};
