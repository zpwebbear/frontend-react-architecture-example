import { createSelector } from 'reselect';

const selectRecipe = (state) => state.recipe;

export const selectDrugs = createSelector(
  selectRecipe,
  (state) => state.drugs
);

export const selectRecipeStatus = createSelector(
  selectRecipe,
  (state) => state.status
);
export const selectRecipeError = createSelector(
  selectRecipe,
  (state) => state.error
);
export const selectRecipeLoading = createSelector(
  selectRecipeStatus,
  (status) => status === 'loading'
);
export const selectRecipeErrorState = createSelector(
  selectRecipeStatus,
  (status) => status === 'error'
);
export const selectDrugById = createSelector(
  selectDrugs,
  (state, id) => id,
  (state, id) => state.find((drug) => drug.id === id)
);
export const selectDrugIndexById = createSelector(
  selectDrugs,
  (state, id) => id,
  (state, id) => state.findIndex((drug) => drug.id === id) + 1,
);

export const selectInputDrug = createSelector(
  selectRecipe,
  (state) => state.inputDrug
);

export const selectInstructions = createSelector(
  selectRecipe,
  (state) => state.instructions
);
