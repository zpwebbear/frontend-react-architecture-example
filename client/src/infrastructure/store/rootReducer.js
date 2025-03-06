import { combineReducers } from "redux";
import { todosReducer } from "@/application/todos-client/todos.reducer.js";
import { todosUIReducer } from "@/application/todos-client/todosUI.reducer.js";

export const rootReducer = combineReducers({
  todos: todosReducer,
  todosUI: todosUIReducer,
});
