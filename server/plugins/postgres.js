import fp from 'fastify-plugin'
import fastifyPostgres from 'fastify-postgres'

export default fp(async (fastify) => {
  fastify.register(fastifyPostgres, { connectionString: fastify.config.DB_CONNECTION_STRING })
}, { name: 'pg', dependencies: ['env'] })
