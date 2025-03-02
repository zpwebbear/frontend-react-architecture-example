import {
  createTodoItem,
  deleteTodoItem,
  moveTodoItemUp,
  moveTodoItemDown,
} from "@/domain/todos/logic.js";
import { todosActionTypes } from "@/application/todos/todos.actions.js";

const reducers = {
  [todosActionTypes.ADD_TODO]: (state, action) => {
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
  [todosActionTypes.DELETE_TODO]: (state, action) => {
    const todos = deleteTodoItem(state.todos, action.payload);
    return {
      ...state,
      todos,
    };
  },
  [todosActionTypes.MOVE_TODO_UP]: (state, action) => {
    const todos = moveTodoItemUp(state.todos, action.payload);
    return {
      ...state,
      todos,
    };
  },
  [todosActionTypes.MOVE_TODO_DOWN]: (state, action) => {
    const todos = moveTodoItemDown(state.todos, action.payload);
    return {
      ...state,
      todos,
    };
  },
  [todosActionTypes.CHANGE_TODO_NAME]: (state, action) => {
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

export const todosReducer = (state = getInitialState(), action) => {
  const reducer = getReducer(action.type);
  return reducer(state, action);
};
