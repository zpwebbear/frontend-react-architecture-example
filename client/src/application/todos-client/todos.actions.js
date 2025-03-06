import { todosUIActions } from "@/application/todos-client/todosUI.actions.js";
import { getIsNewTodoAllowed } from "@/domain/todos-client/logic.js";

export const todosActionTypes = {
  ADD_TODO: "todos/addTodo",
  CHANGE_TODO_NAME: "todos/changeTodoName",
  DELETE_TODO: "todos/deleteTodo",
  MOVE_TODO_UP: "todos/moveTodoUp",
  MOVE_TODO_DOWN: "todos/moveTodoDown",
  SET_TODOS: "todos/setTodos",
  SYNC_TODOS: "todos/syncTodos",
};

const fetchTodos = () => async (dispatch, getState, extra) => {
  dispatch(todosUIActions.fetchTodosStart());
  try {
    const { todosApi } = extra;
    const { data } = await todosApi.getTodos();
    dispatch(todosActions.setTodos(data));
    dispatch(todosUIActions.fetchTodosSuccess());
  } catch (error) {
    dispatch(todosUIActions.fetchTodosError(error.message));
  }
};

const syncTodos = () => async (dispatch, getState, extra) => {
  const { todosApi } = extra;
  const { todos } = getState();
  try {
    await todosApi.syncTodos(todos);
  } catch (error) {
    console.error(error);
  }
}

const syncDeleteTodo = (id) => async (dispatch, getState, extra) => {
  const { todosApi } = extra;
  try {
    await todosApi.deleteTodo(id);
    dispatch(todosActions.syncTodos());
  } catch (error) {
    console.error(error);
  }
}

const addTodoUseCase = (name) => async (dispatch, getState, extra) => {
  const { todos } = getState();
  const isNewTodoAllowed = getIsNewTodoAllowed(todos.todos);
  if (!isNewTodoAllowed) {
    dispatch(todosUIActions.warningSetMessage("You can't add more than 5 todos"));
    dispatch(todosUIActions.warningSetVisible());
    return;
  }
  dispatch(todosActions.addTodo());
}

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
  fetchTodos,
  syncTodos,
  syncDeleteTodo,
  addTodoUseCase
};
