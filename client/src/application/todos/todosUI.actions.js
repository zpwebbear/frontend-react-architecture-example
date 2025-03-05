export const todosUIActionTypes = {
  FETCH_TODOS_START: "todosUI/fetchTodosStart",
  FETCH_TODOS_SUCCESS: "todosUI/fetchTodosSuccess",
  FETCH_TODOS_ERROR: "todosUI/fetchTodosError",
  WARNING_SET_VISIBLE: "todosUI/warningSetVisible",
  WARNING_SET_HIDDEN: "todosUI/warningSetHidden",
  WARNING_SET_MESSAGE: "todosUI/warningSetMessage",
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
  warningSetVisible: () => ({
    type: todosUIActionTypes.WARNING_SET_VISIBLE,
  }),
  warningSetHidden: () => ({
    type: todosUIActionTypes.WARNING_SET_HIDDEN,
  }),
  warningSetMessage: (message) => ({
    type: todosUIActionTypes.WARNING_SET_MESSAGE,
    payload: { message },
  }),
};
