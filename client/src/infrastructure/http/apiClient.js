export const todosApiClient = (transport) => {
  return {
    getTodos: async () => transport.get("/todos-client"),
    syncTodos: async (todos) => transport.post("/todos-client", todos),
    deleteTodo: async (id) => transport.delete(`/todos-client/${id}`),
  };
};
