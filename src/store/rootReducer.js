import { combineReducers } from "redux";
import { todoListReducer } from "./todoList.reducer.js";

export const rootReducer = combineReducers({ todoList: todoListReducer });
