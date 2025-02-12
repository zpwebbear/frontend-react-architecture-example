export const todoListActionTypes = {
  ADD_TODO: "todoList/addTodo",
  CHANGE_TODO_NAME: "todoList/changeTodoName",
  DELETE_TODO: "todoList/deleteTodo",
  MOVE_TODO_UP: "todoList/moveTodoUp",
  MOVE_TODO_DOWN: "todoList/moveTodoDown",
};

export const todoListActions = {
  addTodo: (name) => ({
    type: todoListActionTypes.ADD_TODO,
    payload: { name },
  }),
  deleteTodo: (id) => ({
    type: todoListActionTypes.DELETE_TODO,
    payload: { id },
  }),
  moveTodoUp: (id) => ({
    type: todoListActionTypes.MOVE_TODO_UP,
    payload: { id },
  }),
  moveTodoDown: (id) => ({
    type: todoListActionTypes.MOVE_TODO_DOWN,
    payload: { id },
  }),
  changeTodoName: (name) => ({
    type: todoListActionTypes.CHANGE_TODO_NAME,
    payload: { name },
  }),
};
