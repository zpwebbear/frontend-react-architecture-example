const { getIsNewTodoAllowed, calculateNextIndex, createTodoItem, moveTodoItemUp, moveTodoItemDown, deleteTodoItem } = require("../../modules/todos-server/domain/logic")
const { todosRepository } = require("../../modules/todos-server/infrastructure/todosRepository")

module.exports = async function (fastify) {
  /**
   * Get all todos
   */
  fastify.get('/', async function () {
    const todos = await todosRepository(fastify.pg).getAll()
    return { data: todos, error: null }
  })

  /**
   * Create a new todo
   */
  fastify.post('/', async function (request, reply) {
    const { name } = request.body;
    if (!name) {
      return reply.status(400).send({ data: null, error: { message: 'Name is required', code: '001' } });
    }
    const todos = await todosRepository(fastify.pg).getAll();
    const isNewTodoAllowed = getIsNewTodoAllowed(todos);
    if (!isNewTodoAllowed) {
      return reply.status(400).send({ data: null, error: { message: "You can't add more than 5 todos", code: '002' } });
    }
    const newIndex = calculateNextIndex(todos);
    const newTodo = createTodoItem(name, newIndex);
    const result = await todosRepository(fastify.pg).create(newTodo);
    return { data: result, error: null }
  })

  /**
   * Delete a todo by id
   */
  fastify.delete('/:id', async function (request) {
    const { id } = request.params
    const todos = await todosRepository(fastify.pg).getAll();
    const updatedTodos = deleteTodoItem(todos, id);
    await todosRepository(fastify.pg).deleteById(id);
    const result = await todosRepository(fastify.pg).upsertAll(updatedTodos)
    return { data: result }
  })

  /**
   * Move a todo up
   */
  fastify.put('/:id/up', async function (request) {
    const { id } = request.params
    const todos = await todosRepository(fastify.pg).getAll();
    const updatedTodos = moveTodoItemUp(todos, id);
    const result = await todosRepository(fastify.pg).upsertAll(updatedTodos);
    return { data: result, error: null }
  });

  /**
   * Move a todo down
   */
  fastify.put('/:id/down', async function (request) {
    const { id } = request.params
    const todos = await todosRepository(fastify.pg).getAll();
    const updatedTodos = moveTodoItemDown(todos, id);
    const result = await todosRepository(fastify.pg).upsertAll(updatedTodos);
    return { data: result, error: null }
  });
}
