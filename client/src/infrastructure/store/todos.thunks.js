import { todosUIActions } from "@/application/todos/todosUI.actions.js";
import { todosActions } from "@/application/todos/todos.actions.js";

export const fetchTodos = () => async (dispatch, getState, extra) => {
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

export const syncTodos = () => async (dispatch, getState, extra) => {
  const { todosApi } = extra;
  const { todos } = getState();
  try {
    await todosApi.syncTodos(todos);
  } catch (error) {
    console.error(error);
  }
}

export const deleteTodo = (id) => async (dispatch, getState, extra) => {
  const { todosApi } = extra;
  try {
    await todosApi.deleteTodo(id);
    dispatch(todosActions.syncTodos());
  } catch (error) {
    console.error(error);
  }
}
