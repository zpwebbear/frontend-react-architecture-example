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

export const createTodoItem = (name, index, { idProvider }) => {
  if (!idProvider) {
    throw new Error("uuidProvider is required");
  }

  if (!name) {
    return null;
  }
  
  return {
    id: idProvider.getId(),
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

export const moveTodoItemUp = (todos, id) => {
  const sortedTodos = todos.sort((a, b) => a.index - b.index);
  const currentIndex = sortedTodos.findIndex((todo) => todo.id === id);
  if (currentIndex === 0) {
    return state;
  }
  const newIndex = currentIndex - 1;
  const newTodos = todos.slice();
  const [movedItem] = newTodos.splice(currentIndex, 1);
  newTodos.splice(newIndex, 0, movedItem);
  return withUpdatedIndexes(newTodos);
};

export const moveTodoItemDown = (todos, id) => {
  const sortedTodos = todos.sort((a, b) => a.index - b.index);
  const currentIndex = sortedTodos.findIndex((todo) => todo.id === id);
  if (currentIndex === sortedTodos.length - 1) {
    return state;
  }
  const newIndex = currentIndex + 1;
  const newTodos = sortedTodos.slice();
  const [movedItem] = newTodos.splice(currentIndex, 1);
  newTodos.splice(newIndex, 0, movedItem);
  return withUpdatedIndexes(newTodos);
};

const MAX_ALLOWED_TODOS = 5;

export const getIsNewTodoAllowed = (todos) => {
  return todos.length < MAX_ALLOWED_TODOS;
};