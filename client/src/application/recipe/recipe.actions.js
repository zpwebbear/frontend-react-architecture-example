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
  UPDATE_INSTRUCTIONS: "recipe/updateInstructions"
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
}