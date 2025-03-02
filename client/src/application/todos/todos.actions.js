export const todosActionTypes = {
  ADD_TODO: "todos/addTodo",
  CHANGE_TODO_NAME: "todos/changeTodoName",
  DELETE_TODO: "todos/deleteTodo",
  MOVE_TODO_UP: "todos/moveTodoUp",
  MOVE_TODO_DOWN: "todos/moveTodoDown",
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
};
