import { v4 as uuidv4 } from 'uuid';

const calculateNextIndex = (todos) => {
  const maxIndex = Math.max(...todos.map((todo) => todo.index), 0);
  return maxIndex + 1;
}

const withUpdatedIndexes = (todos) => {
  return todos.map((todo, index) => ({
    ...todo,
    index
  }));
}

export const createTodoItem = (todos, name) => {
  if (!name) {
    return null;
  }

  const index = calculateNextIndex(todos);
  return {
    id: uuidv4(),
    name,
    index
  };
};

export const deleteTodoItem = (state, { id }) => {
  const currentIndex = state.findIndex((todo) => todo.id === id);
  if (currentIndex === -1) {
    return state;
  }
  const newState = [...state];
  newState.splice(currentIndex, 1);
  return withUpdatedIndexes(newState);
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
}

export const moveTodoItemDown = (state, { id }) => {
  const currentIndex = state.findIndex((todo) => todo.id === id);
  if (currentIndex === state.length - 1) {
    return state;
  }
  const newIndex = currentIndex + 1;
  const newState = [...state];
  const [movedItem] = newState.splice(currentIndex, 1);
  newState.splice(newIndex, 0, movedItem);
}
