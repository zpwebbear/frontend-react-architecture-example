const { instructionsRepository } = require('../../modules/recipes/infrastructure/instructionsRepository.js');
const { recipesRepository } = require('../../modules/recipes/infrastructure/recipesRepository.js');

module.exports = async function (fastify) {
  fastify.get('/', async function () {
    const recipes = await recipesRepository(fastify.pg).getAll();
    return { data: recipes };
  });

  fastify.post('/', async function (request) {
    const { recipes } = request.body;
    const result = await recipesRepository(fastify.pg).upsertAll(recipes);
    return { data: result };
  });

  fastify.delete('/:id', async function (request) {
    const { id } = request.params;
    const result = await recipesRepository(fastify.pg).deleteById(id);
    return { data: result };
  });

  fastify.get('/instructions', async function () {
    const instructions = await instructionsRepository(fastify.pg).getAll();
    return { data: instructions };
  }
  );
  fastify.post('/instructions', async function (request) {
    const { instructions } = request.body;
    await instructionsRepository(fastify.pg).deleteAll();
    const result = await instructionsRepository(fastify.pg).upsertAll(instructions);
    return { data: result };
  });
}