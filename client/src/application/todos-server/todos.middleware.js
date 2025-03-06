import { todosActionTypes, todosActions } from "@/application/todos-client/todos.actions";

const syncActions = [
  todosActionTypes.ADD_TODO,
  todosActionTypes.MOVE_TODO_UP,
  todosActionTypes.MOVE_TODO_DOWN,
];

export const todosMiddleware = (store) => (next) => (action) => {
  if (syncActions.includes(action.type)) {
    setTimeout(() => {
      store.dispatch(todosActions.syncTodos());
    }, 0);
  }

  if (action.type === todosActionTypes.DELETE_TODO) {
    store.dispatch(todosActions.syncDeleteTodo(action.payload.id));
  }
  return next(action);
};

