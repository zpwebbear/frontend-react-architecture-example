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

const deleteRecipeItem = (drugs, id) => {
  return drugs.filter((drug) => drug.id !== id);
};

const businessLogicRedusers = {
}

const uiRedusers = {
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
  [recipeServerActionTypes.SET_RECIPE]: (state, action) => {
    const { drugs } = action.payload;
    return {
      ...state,
      drugs,
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
  [recipeServerActionTypes.SET_INSTRUCTIONS]: (state, action) => {
    const { instructions } = action.payload;
    return {
      ...state,
      instructions,
    }
  },
}

const reducers = {
  ...businessLogicRedusers,
  ...uiRedusers,
  DEFAULT: (state) => state,
};

const getReducer = (actionType) => {
  return reducers[actionType] || reducers.DEFAULT;
}

export const recipeServerReducer = (state = getInitialState(), action) => {
  const reducer = getReducer(action.type);
  return reducer(state, action);
}