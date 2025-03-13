import { deleteRecipeItem, setRecipeItemEditable, updateRecipeItem } from "../../../../domain/recipes/businessLogic";
import { recipeServerActionTypes } from "./recipe.actions";

const Status = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  ERROR: "ERROR",
}

const getInputDrugInitialState = () => ({
  name: "",
  timesPerDay: 1,
  duration: 1,
})

const getInitialState = () => ({
  drugs: [],
  status: Status.IDLE,
  error: null,
  inputDrug: getInputDrugInitialState(),
  instructions: [],
})

const reducers = {
  [recipeServerActionTypes.RESET_INPUT_DRUG]: (state) => {
    return {
      ...state,
      inputDrug: getInputDrugInitialState(),
    };
  },
  [recipeServerActionTypes.ADD_RECIPE]: (state, action) => {
    const { drug } = action.payload;
    const { drugs } = state;
    return {
      ...state,
      drugs: [...drugs, drug],
    };
  },

  [recipeServerActionTypes.DELETE_RECIPE]: (state, action) => {
    const { id } = action.payload;
    const { drugs } = state;
    const updatedDrugs = deleteRecipeItem(drugs, id);
    return {
      ...state,
      drugs: updatedDrugs,
    };
  },
  [recipeServerActionTypes.EDIT_RECIPE]: (state, action) => {
    const { drugs } = state;
    const { id } = action.payload;
    const updatedDrugs = setRecipeItemEditable(drugs, id);
    return {
      ...state,
      drugs: updatedDrugs,
    };
  },
  [recipeServerActionTypes.UPDATE_RECIPE]: (state, action) => {
    const { drugs } = state;
    const { id, name, timesPerDay, duration } = action.payload;
    const updatedDrugs = updateRecipeItem(drugs, id, { name, timesPerDay, duration });
    return {
      ...state,
      drugs: updatedDrugs,
    };
  },
  [recipeServerActionTypes.SET_RECIPE]: (state, action) => {
    const { drugs } = action.payload;
    return {
      ...state,
      drugs,
    };
  },
  [recipeServerActionTypes.FETCH_RECIPE_START]: (state) => {
    return {
      ...state,
      status: Status.LOADING,
    };
  },
  [recipeServerActionTypes.FETCH_RECIPE_SUCCESS]: (state) => {
    return {
      ...state,
      status: Status.IDLE,
    };
  },
  [recipeServerActionTypes.FETCH_RECIPE_ERROR]: (state, action) => {
    return {
      ...state,
      status: Status.ERROR,
      error: action.payload,
    };
  },
  [recipeServerActionTypes.UPDATE_INPUT_DRUG]: (state, action) => {
    const { inputDrug } = action.payload;
    return {
      ...state,
      inputDrug: {
        ...state.inputDrug,
        ...inputDrug,
      },
    };
  },
  [recipeServerActionTypes.SAVE_RECIPE]: (state, action) => {
    const { id } = action.payload;
    const { drugs } = state;
    const updatedDrugs = saveRecipeItem(drugs, id);
    return {
      ...state,
      drugs: updatedDrugs,
    };
  },
  [recipeServerActionTypes.UPDATE_INSTRUCTIONS]: (state, action) => {
    const { instructions } = action.payload;
    return {
      ...state,
      instructions,
    }
  },
  [recipeServerActionTypes.SET_INSTRUCTIONS]: (state, action) => {
    const { instructions } = action.payload;
    return {
      ...state,
      instructions,
    }
  },
  DEFAULT: (state) => state,
};

const getReducer = (actionType) => {
  return reducers[actionType] || reducers.DEFAULT;
}

export const recipeServerReducer = (state = getInitialState(), action) => {
  const reducer = getReducer(action.type);
  return reducer(state, action);
}