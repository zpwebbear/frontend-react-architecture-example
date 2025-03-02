export const createTodoItem = (name) => {
  if (!name) {
    return null;
  }
  return {
    id: Date.now(),
    name,
  };
};

export const deleteTodoItem = (state, { id }) => {
  return state.filter((todo) => todo.id !== id);
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
  return newState;
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
  return newState;
}
