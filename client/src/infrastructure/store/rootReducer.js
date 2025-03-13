import { combineReducers } from "redux";
import { todosReducer } from "@/application/todos-client/todos.reducer.js";
import { todosUIReducer } from "@/application/todos-client/todosUI.reducer.js";
import { todosReducer as todosServerReducer } from "@/application/todos-server/todos.reducer.js";
import { todosUIReducer as todosServerUIReducer } from "@/application/todos-server/todosUI.reducer.js";
import { recipeReducer } from "../../application/recipe/recipe.reducer";
import { recipeServerReducer } from "../../application/recipe-server/recipe.reducer";

export const rootReducer = combineReducers({
  todos: todosReducer,
  todosUI: todosUIReducer,
  todosServer: todosServerReducer,
  todosServerUI: todosServerUIReducer,
  recipe: recipeReducer,
  recipeServer: recipeServerReducer,
});
