import { combineReducers } from "redux";
import { todosReducer } from "./todos.reducer.js";
import { todosUIReducer } from "./todosUI.reducer.js";

export const rootReducer = combineReducers({
  todos: todosReducer,
  todosUI: todosUIReducer,
});
