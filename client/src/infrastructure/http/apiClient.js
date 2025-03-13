export const todosApiClient = (transport) => {
  return {
    getTodos: async () => transport.get("/todos-client"),
    syncTodos: async (todos) => transport.post("/todos-client", todos),
    deleteTodo: async (id) => transport.delete(`/todos-client/${id}`),
  };
};

export const todosServerApiClient = (transport) => {
  return {
    getTodos: async () => transport.get("/todos-server"),
    createTodo: async (name) => transport.post("/todos-server", { name }),
    deleteTodo: async (id) => transport.delete(`/todos-server/${id}`),
    moveTodoUp: async (id) => transport.put(`/todos-server/${id}/up`, { id }),
    moveTodoDown: async (id) => transport.put(`/todos-server/${id}/down`, { id }),
  };
}

export const recipeApiClient = (transport) => {
  return {
    fetchRecipe: async () => transport.get("/recipes"),
    deleteRecipe: async (id) => transport.delete(`/recipes/${id}`),
    syncRecipe: async (drugs) => transport.post("/recipes", { recipes: drugs }),
    syncInstructions: async (instructions) =>
      transport.post("/recipes/instructions", { instructions }),
    fetchInstructions: async () => transport.get("/recipes/instructions"),
  };
}
