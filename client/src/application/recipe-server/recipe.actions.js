import { selectDrugs, selectInputDrug, selectInstructions, selectInstructionsView } from "./recipe.selectors";

export const recipeServerActionTypes = {
  ADD_RECIPE: "recipeServer/addRecipe",
  DELETE_RECIPE: "recipeServer/deleteRecipe",
  EDIT_RECIPE: "recipeServer/editRecipe",
  UPDATE_RECIPE: "recipeServer/updateRecipe",
  SAVE_RECIPE: "recipeServer/saveRecipe",
  SET_RECIPE: "recipeServer/setRecipe",
  UPDATE_INPUT_DRUG: "recipeServer/updateInputDrug",
  RESET_INPUT_DRUG: "recipeServer/resetInputDrug",
  SET_INSTRUCTIONS: "recipeServer/setInstructions",
}

export const recipeActions = {
  resetInputDrug: () => ({
    type: recipeServerActionTypes.RESET_INPUT_DRUG,
  }),
  addRecipe: (payload) => ({
    type: recipeServerActionTypes.ADD_RECIPE,
    payload,
  }),
  addRecipeAPI: () => async (dispatch, getState, extra) => {
    const { recipeServerApi } = extra;
    const state = getState();
    const inputDrug = selectInputDrug(state);
    try {
      const result = await recipeServerApi.createRecipe(inputDrug);
      dispatch(recipeActions.addRecipe({ drug: result.data }));
      const freshState = getState();
      const drugs = selectDrugs(freshState);
      const instructions = await recipeServerApi.createInstructions(drugs);
      dispatch(recipeActions.setInstructions(instructions.data));
      dispatch(recipeActions.resetInputDrug());
    }
    catch (error) {
      console.error(error);
    }
  },
  deleteRecipe: (id) => ({
    type: recipeServerActionTypes.DELETE_RECIPE,
    payload: { id },
  }),
  deleteRecipeAPI: (id) => async (dispatch, getState, extra) => {
    const { recipeServerApi } = extra;
    try {
      await recipeServerApi.deleteRecipe(id);
      dispatch(recipeActions.deleteRecipe(id));
      const state = getState();
      const drugs = selectDrugs(state);
      const instructions = await recipeServerApi.createInstructions(drugs);
      dispatch(recipeActions.setInstructions(instructions.data));
    } catch (error) {
      console.error(error);
    }
  },
  setRecipe: (drugs) => ({
    type: recipeServerActionTypes.SET_RECIPE,
    payload: { drugs },
  }),
  updateInputDrug: (inputDrug) => ({
    type: recipeServerActionTypes.UPDATE_INPUT_DRUG,
    payload: { inputDrug },
  }),
  setInstructions: (instructions) => ({
    type: recipeServerActionTypes.SET_INSTRUCTIONS,
    payload: { instructions },
  }),
  fetchRecipesApi: () => async (dispatch, getState, extra) => {
    const { recipeServerApi } = extra;
    try {
      const response = await recipeServerApi.fetchRecipe();
      dispatch(recipeActions.setRecipe(response.data));
    } catch (error) {
      console.error(error);
    }
  },
  fetchInstructionsApi: () => async (dispatch, getState, extra) => {
    const { recipeServerApi } = extra;
    try {
      const response = await recipeServerApi.fetchInstructions();
      dispatch(recipeActions.setInstructions(response.data));
    } catch (error) {
      console.error(error);
    }
  }
}