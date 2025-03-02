'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const response = await fastify.pg.query('SELECT NOW()')
    return response.rows[0];
  })
}
