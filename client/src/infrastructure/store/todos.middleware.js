import { todosActionTypes } from "@/application/todos/todos.actions";
import { syncTodos, deleteTodo } from "@/infrastructure/store/todos.thunks.js";

const syncActions = [
  todosActionTypes.ADD_TODO,
  todosActionTypes.MOVE_TODO_UP,
  todosActionTypes.MOVE_TODO_DOWN,
  todosActionTypes.SYNC_TODOS,
];

export const todosMiddleware = (store) => (next) => (action) => {
  if (syncActions.includes(action.type)) {
    setTimeout(() => {
      store.dispatch(syncTodos());
    }, 0);
  }

  if (action.type === todosActionTypes.DELETE_TODO) {
    store.dispatch(deleteTodo(action.payload.id));
  }
  return next(action);
};

