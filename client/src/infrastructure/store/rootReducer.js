import { combineReducers } from "redux";
import { todosReducer } from "./todos.reducer.js";

export const rootReducer = combineReducers({ todos: todosReducer });
