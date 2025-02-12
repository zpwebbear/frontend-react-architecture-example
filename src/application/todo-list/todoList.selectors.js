import {createSelector} from 'reselect';

const selectTodoList = state => state.todoList;

const selectTodos = createSelector(
  selectTodoList,
  state => state.todos
);

export const selectTodoById = createSelector(
  selectTodos,
  (state, id) => id,
  (state, id) => state.find(todo => todo.id === id)
);

export const selectTodoListIds = createSelector(
  selectTodos,
  state => state.map(todo => todo.id)
);

export const selectTodoItemPosition = createSelector(
  selectTodos,
  (state, id) => id,
  (state, id) => state.findIndex(todo => todo.id === id)
);

export const selectIsFirstTodo = createSelector(
  selectTodos,
  selectTodoItemPosition,
  (state, position) => position === 0
);

export const selectIsLastTodo = createSelector(
  selectTodos,
  selectTodoItemPosition,
  (state, position) => position === state.length - 1
);

export const selectNewTodoName = createSelector(
  selectTodoList,
  state => state.newTodoName
);
