import { todosApiClient, todosServerApiClient, recipeApiClient } from "@/infrastructure/http/apiClient.js";
import { createTransport } from "@/infrastructure/http/httpTransport.js";
import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, createStore } from "redux";
import { withExtraArgument } from "redux-thunk";

import { todosMiddleware } from "@/application/todos-client/todos.middleware.js";
import { rootReducer } from "@/infrastructure/store/rootReducer.js";
import { recipeMiddleware } from "../../application/recipe/recipe.middleware";

const transport = createTransport("http://localhost:3333");
const todosApi = todosApiClient(transport);
const todosServerApi = todosServerApiClient(transport);
const recipeApi = recipeApiClient(transport);

export const configureStore = (preloadedState = {}) => {
  const thunk = withExtraArgument({ todosApi, todosServerApi, recipeApi });
  const middlewares = [thunk, todosMiddleware, recipeMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
};
