import {
  createTodoItem,
  deleteTodoItem,
  moveTodoItemUp,
  moveTodoItemDown,
} from "@/domain/todo-list/logic.js";
import { todoListActionTypes } from "@/application/todo-list/todoList.actions.js";

const reducers = {
  [todoListActionTypes.ADD_TODO]: (state, action) => {
    const newTodo = createTodoItem(state.newTodoName, action.payload);
    if (!newTodo) {
      return state;
    }
    return {
      ...state,
      todos: [...state.todos, newTodo],
      newTodoName: "",
    };
  },
  [todoListActionTypes.DELETE_TODO]: (state, action) => {
    const todos = deleteTodoItem(state.todos, action.payload);
    return {
      ...state,
      todos,
    };
  },
  [todoListActionTypes.MOVE_TODO_UP]: (state, action) => {
    const todos = moveTodoItemUp(state.todos, action.payload);
    return {
      ...state,
      todos,
    };
  },
  [todoListActionTypes.MOVE_TODO_DOWN]: (state, action) => {
    const todos = moveTodoItemDown(state.todos, action.payload);
    return {
      ...state,
      todos,
    };
  },
  [todoListActionTypes.CHANGE_TODO_NAME]: (state, action) => {
    return {
      ...state,
      newTodoName: action.payload.name,
    };
  },
  DEFAULT: (state) => state,
};

const getReducer = (actionType) => {
  return reducers[actionType] || reducers.DEFAULT;
};

const getInitialState = () => ({
  todos: [],
  newTodoName: "",
});

export const todoListReducer = (state = getInitialState(), action) => {
  const reducer = getReducer(action.type);
  return reducer(state, action);
};
