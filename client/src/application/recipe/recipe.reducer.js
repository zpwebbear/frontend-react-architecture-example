import { uuidProvider } from "@/application/providers/uuid.provider";
import { calculateIngestingInstructions, createRecipeItem, validateRecipeItem } from "../../../../domain/recipes/businessLogic";
import { recipeActionTypes } from "./recipe.actions";

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
  [recipeActionTypes.ADD_RECIPE]: (state) => {
    const { drugs, inputDrug } = state;
    const validatedInputDrug = validateRecipeItem(inputDrug);
    const recipeItem = createRecipeItem(validatedInputDrug, { idProvider: uuidProvider });
    return {
      ...state,
      drugs: [...drugs, recipeItem],
      inputDrug: getInputDrugInitialState(),
    };
  },
  [recipeActionTypes.UPDATE_INSTRUCTIONS]: (state, action) => {
    const { drugs } = state;
    const instructions = calculateIngestingInstructions(drugs);
    return {
      ...state,
      instructions,
    }
  },
}

const uiRedusers = {
  [recipeActionTypes.DELETE_RECIPE]: (state, action) => {
    const { id } = action.payload;
    const { drugs } = state;
    const updatedDrugs = deleteRecipeItem(drugs, id);
    return {
      ...state,
      drugs: updatedDrugs,
    };
  },
  [recipeActionTypes.SET_RECIPE]: (state, action) => {
    const { drugs } = action.payload;
    return {
      ...state,
      drugs,
    };
  },
  [recipeActionTypes.UPDATE_INPUT_DRUG]: (state, action) => {
    const { inputDrug } = action.payload;
    return {
      ...state,
      inputDrug: {
        ...state.inputDrug,
        ...inputDrug,
      },
    };
  },
  [recipeActionTypes.SAVE_RECIPE]: (state, action) => {
    const { id } = action.payload;
    const { drugs } = state;
    const updatedDrugs = saveRecipeItem(drugs, id);
    return {
      ...state,
      drugs: updatedDrugs,
    };
  },
  [recipeActionTypes.SET_INSTRUCTIONS]: (state, action) => {
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

export const recipeReducer = (state = getInitialState(), action) => {
  const reducer = getReducer(action.type);
  return reducer(state, action);
}