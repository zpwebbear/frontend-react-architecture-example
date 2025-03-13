const { todosRepository } = require("../../modules/todos-client/infrastructure/todosRepository.js")

module.exports = async function (fastify) {
  fastify.get('/', async function () {
    const todos = await todosRepository(fastify.pg).getAll()
    return { data: todos }
  })

  fastify.post('/', async function (request) {
    const { todos } = request.body
    const result = await todosRepository(fastify.pg).upsertAll(todos)
    return { data: result }
  })

  fastify.delete('/:id', async function (request) {
    const { id } = request.params
    const result = await todosRepository(fastify.pg).deleteById(id)
    return { data: result }
  })
}
