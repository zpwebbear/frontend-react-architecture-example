const { createInstructions } = require('../../modules/recipes-server/application/createInstructions.js');
const { createRecipe } = require('../../modules/recipes-server/application/createRecipe.js');
const { instructionsRepository } = require('../../modules/recipes-server/infrastructure/instructionsRepository.js');
const { recipesRepository } = require('../../modules/recipes-server/infrastructure/recipesRepository.js');

module.exports = async function (fastify) {
  fastify.get('/', async function () {
    const recipes = await recipesRepository(fastify.pg).getAll();
    return { data: recipes };
  });

  fastify.post('/', async function (request) {
    const { recipe } = request.body;
    const result = await createRecipe(recipe, { pg: fastify.pg });
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
    const { recipes } = request.body;
    const result = await createInstructions(recipes, { pg: fastify.pg });
    return { data: result };
  });
}