export const todosUIActionTypes = {
  FETCH_TODOS_START: "todosUI/fetchTodosStart",
  FETCH_TODOS_SUCCESS: "todosUI/fetchTodosSuccess",
  FETCH_TODOS_ERROR: "todosUI/fetchTodosError",
};

export const todosUIActions = {
  fetchTodosStart: () => ({
    type: todosUIActionTypes.FETCH_TODOS_START,
  }),
  fetchTodosSuccess: () => ({
    type: todosUIActionTypes.FETCH_TODOS_SUCCESS,
  }),
  fetchTodosError: (error) => ({
    type: todosUIActionTypes.FETCH_TODOS_ERROR,
    payload: error,
  }),
};
