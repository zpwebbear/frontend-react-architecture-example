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

const INGESTION_PERIODS = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  night: "Night",
}

export const selectInstructions = createSelector(
  selectRecipe,
  (state) => state.instructions
);

export const selectInstructionsView = createSelector(
  selectInstructions,
  (instructions) => {
    const instructionsView = instructions.map((instruction) => {
      const dayView = Object.entries(INGESTION_PERIODS).map(([key, value]) => {
        const period = instruction[key];
        if (period.length === 0) return null;
        const drugs = period.map((drug) => drug.name).join(', ');
        return {
          period: value,
          drugs,
        }
      });
      return {
        day: instruction.day,
        periods: dayView.filter((item) => item !== null)
      };
    });
    return instructionsView;
  }
);
