import { v4 as uuidv4 } from "uuid";


export const calculateNextIndex = (todos) => {
  const maxIndex = Math.max(...todos.map((todo) => todo.index), 0);
  return maxIndex + 1;
};

const withUpdatedIndexes = (todos) => {
  return todos.map((todo, index) => ({
    ...todo,
    index,
  }));
};

export const createTodoItem = (name, index) => {
  if (!name) {
    return null;
  }

  return {
    id: uuidv4(),
    name,
    index,
  };
};

export const deleteTodoItem = (todos, id) => {
  const currentIndex = todos.findIndex((todo) => todo.id === id);
  if (currentIndex === -1) {
    return todos;
  }
  const newTodos = [...todos];
  newTodos.splice(currentIndex, 1);
  return withUpdatedIndexes(newTodos);
};

export const moveTodoItemUp = (state, { id }) => {
  const currentIndex = state.findIndex((todo) => todo.id === id);
  if (currentIndex === 0) {
    return state;
  }
  const newIndex = currentIndex - 1;
  const newState = [...state];
  const [movedItem] = newState.splice(currentIndex, 1);
  newState.splice(newIndex, 0, movedItem);
  return withUpdatedIndexes(newState);
};

export const moveTodoItemDown = (state, { id }) => {
  const currentIndex = state.findIndex((todo) => todo.id === id);
  if (currentIndex === state.length - 1) {
    return state;
  }
  const newIndex = currentIndex + 1;
  const newState = [...state];
  const [movedItem] = newState.splice(currentIndex, 1);
  newState.splice(newIndex, 0, movedItem);
  return withUpdatedIndexes(newState);
};

const MAX_ALLOWED_TODOS = 5;

export const getIsNewTodoAllowed = (todos) => {
  return todos.length < MAX_ALLOWED_TODOS;
};
