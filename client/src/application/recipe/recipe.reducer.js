import { calculateIngestingInstructions, createRecipeItem, deleteRecipeItem, setRecipeItemEditable, updateRecipeItem, validateRecipeItem } from "../../domain/recipe/businessLogic";
import { recipeActionTypes } from "./recipe.actions";
import { uuidProvider } from "@/application/providers/uuid.provider";

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
  [recipeActionTypes.ADD_RECIPE]: (state, action) => {
    const { drugs, inputDrug } = state;
    const validatedInputDrug = validateRecipeItem(inputDrug);
    const recipeItem = createRecipeItem(validatedInputDrug, { idProvider: uuidProvider });
    return {
      ...state,
      drugs: [...drugs, recipeItem],
      inputDrug: getInputDrugInitialState(),
    };
  },
  [recipeActionTypes.DELETE_RECIPE]: (state, action) => {
    const { id } = action.payload;
    const { drugs } = state;
    const updatedDrugs = deleteRecipeItem(drugs, id);
    return {
      ...state,
      drugs: updatedDrugs,
    };
  },
  [recipeActionTypes.EDIT_RECIPE]: (state, action) => {
    const { drugs } = state;
    const { id } = action.payload;
    const updatedDrugs = setRecipeItemEditable(drugs, id);
    return {
      ...state,
      drugs: updatedDrugs,
    };
  },
  [recipeActionTypes.UPDATE_RECIPE]: (state, action) => {
    const { drugs } = state;
    const { id, name, timesPerDay, duration } = action.payload;
    const updatedDrugs = updateRecipeItem(drugs, id, { name, timesPerDay, duration });
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
  [recipeActionTypes.FETCH_RECIPE_START]: (state) => {
    return {
      ...state,
      status: Status.LOADING,
    };
  },
  [recipeActionTypes.FETCH_RECIPE_SUCCESS]: (state) => {
    return {
      ...state,
      status: Status.IDLE,
    };
  },
  [recipeActionTypes.FETCH_RECIPE_ERROR]: (state, action) => {
    return {
      ...state,
      status: Status.ERROR,
      error: action.payload,
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
  [recipeActionTypes.UPDATE_INSTRUCTIONS]: (state, action) => {
    const { drugs } = state;
    const instructions = calculateIngestingInstructions(drugs);
    return {
      ...state,
      instructions,
    }
  },
  [recipeActionTypes.SET_INSTRUCTIONS]: (state, action) => {
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

export const recipeReducer = (state = getInitialState(), action) => {
  const reducer = getReducer(action.type);
  return reducer(state, action);
}