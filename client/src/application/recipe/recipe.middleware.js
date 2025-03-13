import { recipeActions, recipeActionTypes } from "./recipe.actions";

const syncActions = [
  recipeActionTypes.ADD_RECIPE,
  recipeActionTypes.SAVE_RECIPE,
];

const instructionFormingActions = [
  recipeActionTypes.ADD_RECIPE,
  recipeActionTypes.SAVE_RECIPE,
  recipeActionTypes.DELETE_RECIPE,
]

export const recipeMiddleware = (store) => (next) => (action) => {
  if (syncActions.includes(action.type)) {
    setTimeout(() => {
      store.dispatch(recipeActions.syncRecipeApi());
    }, 0);
  }

  if (instructionFormingActions.includes(action.type)){
    setTimeout(() => {
      store.dispatch(recipeActions.updateInstructions())
    }, 0)
  }

  if (action.type === recipeActionTypes.DELETE_RECIPE) {
    store.dispatch(recipeActions.syncDeleteRecipeApi(action.payload.id));
  }
  return next(action);
}