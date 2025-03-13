import { calculateIngestingInstructions } from "../../../../domain/recipes/businessLogic.js";
import { instructionsRepository } from "../infrastructure/instructionsRepository.js";

export const createInstructions = async (recipes, { pg }) => {
  const instructions = calculateIngestingInstructions(recipes);
  await instructionsRepository(pg).deleteAll();
  const result = await instructionsRepository(pg).upsertAll(instructions);
  return result;
}