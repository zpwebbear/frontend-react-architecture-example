import { todosUIActions } from "@/application/todos-server/todosUI.actions.js";
import { selectNewTodoName } from "../todos-server/todos.selectors";

export const todosActionTypes = {
  ADD_TODO: "todos-server/addTodo",
  CHANGE_TODO_NAME: "todos-server/changeTodoName",
  DELETE_TODO: "todos-server/deleteTodo",
  SET_TODOS: "todos-server/setTodos",
};

const fetchTodosAPI = () => async (dispatch, getState, extra) => {
  dispatch(todosUIActions.fetchTodosStart());
  try {
    const { todosServerApi } = extra;
    const { data } = await todosServerApi.getTodos();
    dispatch(todosActions.setTodos(data));
    dispatch(todosUIActions.fetchTodosSuccess());
  } catch (error) {
    dispatch(todosUIActions.fetchTodosError(error.message));
  }
};

const deleteTodoAPI = (id) => async (dispatch, _, extra) => {
  const { todosServerApi } = extra;
  try {
    await todosServerApi.deleteTodo(id);
    const result = await todosServerApi.getTodos();
    dispatch(todosActions.setTodos(result.data));
  } catch (error) {
    console.error(error);
  }
}

const addTodoAPI = () => async (dispatch, getState, extra) => {
  const { todosServerApi } = extra;
  const state = getState();
  const newTodoName = selectNewTodoName(state);
  const result = await todosServerApi.createTodo(newTodoName);
  if(result.error !== null) {
    const { message } = result.error;
    dispatch(todosUIActions.warningSetMessage(message));
    dispatch(todosUIActions.warningSetVisible());
    return;
  }
  dispatch(todosActions.addTodo({todo: result.data}));
}

const moveTodoUpAPI = (id) => async (dispatch, _, extra) => {
  const { todosServerApi } = extra;
  const result = await todosServerApi.moveTodoUp(id);
  dispatch(todosActions.setTodos(result.data));
}

const moveTodoDownAPI = (id) => async (dispatch, _, extra) => {
  const { todosServerApi } = extra;
  const result = await todosServerApi.moveTodoDown(id);
  dispatch(todosActions.setTodos(result.data));
}

export const todosActions = {
  addTodo: (payload) => ({
    type: todosActionTypes.ADD_TODO,
    payload,
  }),
  deleteTodo: (id) => ({
    type: todosActionTypes.DELETE_TODO,
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
  fetchTodosAPI,
  deleteTodoAPI,
  addTodoAPI,
  moveTodoUpAPI,
  moveTodoDownAPI,
};
