import { createRecipeItem, validateRecipeItem } from "../../../../domain/recipes/businessLogic.js";
import { recipesRepository } from "../infrastructure/recipesRepository.js";

const idProvider = {
  getId: () => {
    return crypto.randomUUID();
  },
};

export const createRecipe = async (recipe, { pg }) => {
  const validatedRecipe = validateRecipeItem(recipe);
  const recipeItem = createRecipeItem(validatedRecipe, { idProvider });
  const result = await recipesRepository(pg).create(recipeItem);
  return result;
}