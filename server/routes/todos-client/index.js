const { todosRepository } = require('./infrastructure/todosRepository.js')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    console.log(todosRepository(fastify.pg))
    const todos = await todosRepository(fastify.pg).getAll()
    return { data: todos }
  })

  fastify.post('/', async function (request, reply) {
    const { todos } = request.body
    const todo = await todosRepository(fastify.pg).upsertAll(todos)
    return { data: todo }
  })
}
