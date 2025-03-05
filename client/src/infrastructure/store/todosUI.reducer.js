import {
  createTodoItem,
  deleteTodoItem,
  moveTodoItemUp,
  moveTodoItemDown,
} from "@/domain/todos/logic.js";
import { todosUIActionTypes } from "@/application/todos/todosUI.actions.js";

const status = {
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
};

const reducers = {
  [todosUIActionTypes.FETCH_TODOS_START]: (state, action) => {
    return {
      ...state,
      status: status.LOADING,
    };
  },
  [todosUIActionTypes.FETCH_TODOS_SUCCESS]: (state, action) => {
    return {
      ...state,
      status: status.IDLE,
    };
  },
  [todosUIActionTypes.FETCH_TODOS_ERROR]: (state, action) => {
    return {
      ...state,
      status: status.ERROR,
      error: action.payload,
    };
  },
  [todosUIActionTypes.WARNING_SET_VISIBLE]: (state, action) => {
    return {
      ...state,
      warningIsVisible: true,
    };
  },
  [todosUIActionTypes.WARNING_SET_HIDDEN]: (state) => {
    return {
      ...state,
      warningIsVisible: false,
      warningText: "",
    };
  },
  [todosUIActionTypes.WARNING_SET_MESSAGE]: (state, action) => {
    const { message } = action.payload;
    return {
      ...state,
      warningText: message,
    };
  },
  DEFAULT: (state) => state,
};

const getReducer = (actionType) => {
  return reducers[actionType] || reducers.DEFAULT;
};

const getInitialState = () => ({
  status: status.IDLE,
  error: null,
  warningIsVisible: false,
  warningText: "",
});

export const todosUIReducer = (state = getInitialState(), action) => {
  const reducer = getReducer(action.type);
  return reducer(state, action);
};
