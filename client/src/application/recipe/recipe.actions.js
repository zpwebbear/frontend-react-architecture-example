import { selectInstructions, selectInstructionsView } from "./recipe.selectors";

export const recipeActionTypes = {
  ADD_RECIPE: "recipe/addRecipe",
  DELETE_RECIPE: "recipe/deleteRecipe",
  EDIT_RECIPE: "recipe/editRecipe",
  UPDATE_RECIPE: "recipe/updateRecipe",
  SAVE_RECIPE: "recipe/saveRecipe",
  SET_RECIPE: "recipe/setRecipe",
  UPDATE_INPUT_DRUG: "recipe/updateInputDrug",
  FETCH_RECIPE_START: "recipe/fetchRecipeStart",
  FETCH_RECIPE_SUCCESS: "recipe/fetchRecipeSuccess",
  FETCH_RECIPE_ERROR: "recipe/fetchRecipeError",
  UPDATE_INSTRUCTIONS: "recipe/updateInstructions",
  FETCH_INSTRUCTIONS_START: "recipe/fetchInstructionsStart",
  FETCH_INSTRUCTIONS_SUCCESS: "recipe/fetchInstructionsSuccess",
  FETCH_INSTRUCTIONS_ERROR: "recipe/fetchInstructionsError",
  SET_INSTRUCTIONS: "recipe/setInstructions",
}

export const recipeActions = {
  addRecipe: () => ({
    type: recipeActionTypes.ADD_RECIPE,
  }),
  deleteRecipe: (id) => ({
    type: recipeActionTypes.DELETE_RECIPE,
    payload: { id },
  }),
  editRecipe: (id) => ({
    type: recipeActionTypes.EDIT_RECIPE,
    payload: { id },
  }),
  updateRecipe: (id, { name, timesPerDay, duration }) => ({
    type: recipeActionTypes.UPDATE_RECIPE,
    payload: { id, name, timesPerDay, duration },
  }),
  saveRecipe: (id) => ({
    type: recipeActionTypes.SAVE_RECIPE,
    payload: { id },
  }),
  setRecipe: (drugs) => ({
    type: recipeActionTypes.SET_RECIPE,
    payload: { drugs },
  }),
  updateInputDrug: (inputDrug) => ({
    type: recipeActionTypes.UPDATE_INPUT_DRUG,
    payload: { inputDrug },
  }),
  updateInstructions: () => ({
    type: recipeActionTypes.UPDATE_INSTRUCTIONS,
  }),
  fetchRecipeStart: () => ({
    type: recipeActionTypes.FETCH_RECIPE_START,
  }),
  fetchRecipeSuccess: () => ({
    type: recipeActionTypes.FETCH_RECIPE_SUCCESS,
  }),
  fetchRecipeError: (error) => ({
    type: recipeActionTypes.FETCH_RECIPE_ERROR,
    payload: error,
  }),
  fetchInstructionsStart: () => ({
    type: recipeActionTypes.FETCH_INSTRUCTIONS_START,
  }),
  fetchInstructionsSuccess: () => ({
    type: recipeActionTypes.FETCH_INSTRUCTIONS_SUCCESS,
  }),
  fetchInstructionsError: (error) => ({
    type: recipeActionTypes.FETCH_INSTRUCTIONS_ERROR,
    payload: error,
  }),
  setInstructions: (instructions) => ({
    type: recipeActionTypes.SET_INSTRUCTIONS,
    payload: { instructions },
  }),
  fetchRecipesApi: () => async (dispatch, getState, extra) => {
    const { recipeApi } = extra;
    dispatch(recipeActions.fetchRecipeStart());
    try {
      const response = await recipeApi.fetchRecipe();
      dispatch(recipeActions.setRecipe(response.data));
    } catch (error) {
      console.error(error);
      dispatch(recipeActions.fetchRecipeError(error));
    } finally {
      dispatch(recipeActions.fetchRecipeSuccess());
    }
  },
  syncRecipeApi: () => async (dispatch, getState, extra) => {
    const { recipeApi } = extra;
    const { recipe } = getState();
    try {
      await recipeApi.syncRecipe(recipe.drugs);
    } catch (error) {
      console.error(error);
    }
  },
  syncDeleteRecipeApi: (id) => async (dispatch, getState, extra) => {
    const { recipeApi } = extra;
    try {
      await recipeApi.deleteRecipe(id);
      dispatch(recipeActions.syncRecipeApi());
    } catch (error) {
      console.error(error);
    }
  },
  syncInstructionsApi: () => async (dispatch, getState, extra) => {
    const { recipeApi } = extra;
    const state = getState();
    const instructions = selectInstructions(state);
    try {
      await recipeApi.syncInstructions(instructions);
    } catch (error) {
      console.error(error);
    }
  },
  fetchInstructionsApi: () => async (dispatch, getState, extra) => {
    const { recipeApi } = extra;
    dispatch(recipeActions.fetchInstructionsStart());
    try {
      const response = await recipeApi.fetchInstructions();
      dispatch(recipeActions.setInstructions(response.data));
    } catch (error) {
      console.error(error);
      dispatch(recipeActions.fetchInstructionsError(error));
    } finally {
      dispatch(recipeActions.fetchInstructionsSuccess());
    }
  }
}