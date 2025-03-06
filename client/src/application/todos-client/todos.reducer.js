import {
  createTodoItem,
  deleteTodoItem,
  moveTodoItemUp,
  moveTodoItemDown,
  calculateNextIndex,
  getIsNewTodoAllowed,
} from "@/domain/todos-client/logic.js";
import { todosActionTypes } from "@/application/todos-client/todos.actions.js";

const reducers = {
  [todosActionTypes.ADD_TODO]: (state, action) => {
    const { newTodoName, todos } = state;
    const isNewTodoTodoAllowed = getIsNewTodoAllowed(todos);
    if (!newTodoName || !isNewTodoTodoAllowed) {
      return state;
    }

    const nextIndex = calculateNextIndex(todos);
    const newTodo = createTodoItem(newTodoName, nextIndex);
    return {
      ...state,
      todos: [...todos, newTodo],
      newTodoName: "",
    };
  },
  [todosActionTypes.DELETE_TODO]: (state, action) => {
    const { id } = action.payload;
    const todos = deleteTodoItem(state.todos, id);
    return {
      ...state,
      todos,
    };
  },
  [todosActionTypes.MOVE_TODO_UP]: (state, action) => {
    const { id } = action.payload;
    const todos = moveTodoItemUp(state.todos, id);
    return {
      ...state,
      todos,
    };
  },
  [todosActionTypes.MOVE_TODO_DOWN]: (state, action) => {
    const { id } = action.payload;
    const todos = moveTodoItemDown(state.todos, id);
    return {
      ...state,
      todos,
    };
  },
  [todosActionTypes.CHANGE_TODO_NAME]: (state, action) => {
    const { name } = action.payload;
    return {
      ...state,
      newTodoName: name,
    };
  },
  [todosActionTypes.SET_TODOS]: (state, action) => {
    const { todos } = action.payload;
    return {
      ...state,
      todos,
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
