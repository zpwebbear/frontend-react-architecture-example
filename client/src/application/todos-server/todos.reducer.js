import { todosActionTypes } from "@/application/todos-server/todos.actions.js";

const reducers = {
  [todosActionTypes.ADD_TODO]: (state, action) => {
    const { todo } = action.payload;
    const todos = [...state.todos, todo];
    return {
      ...state,
      todos,
      newTodoName: "",
    };
  },
  [todosActionTypes.DELETE_TODO]: (state, action) => {
    const { id } = action.payload;
    const { todos } = state;
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    return {
      ...state,
      todos: updatedTodos,
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
