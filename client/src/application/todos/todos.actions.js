export const todosActionTypes = {
  ADD_TODO: "todos/addTodo",
  CHANGE_TODO_NAME: "todos/changeTodoName",
  DELETE_TODO: "todos/deleteTodo",
  MOVE_TODO_UP: "todos/moveTodoUp",
  MOVE_TODO_DOWN: "todos/moveTodoDown",
  SET_TODOS: "todos/setTodos",
  SYNC_TODOS: "todos/syncTodos",
};

export const todosActions = {
  addTodo: (name) => ({
    type: todosActionTypes.ADD_TODO,
    payload: { name },
  }),
  deleteTodo: (id) => ({
    type: todosActionTypes.DELETE_TODO,
    payload: { id },
  }),
  moveTodoUp: (id) => ({
    type: todosActionTypes.MOVE_TODO_UP,
    payload: { id },
  }),
  moveTodoDown: (id) => ({
    type: todosActionTypes.MOVE_TODO_DOWN,
    payload: { id },
  }),
  changeTodoName: (name) => ({
    type: todosActionTypes.CHANGE_TODO_NAME,
    payload: { name },
  }),
  setTodos: (todos) => ({
    type: todosActionTypes.SET_TODOS,
    payload: { todos },
  }),
  syncTodos: () => ({
    type: todosActionTypes.SYNC_TODOS,
  }),
};
