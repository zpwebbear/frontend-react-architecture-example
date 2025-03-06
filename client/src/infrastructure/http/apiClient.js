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
