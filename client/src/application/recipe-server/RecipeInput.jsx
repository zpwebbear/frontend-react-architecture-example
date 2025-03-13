import { UiInput } from "@/application/components/UiInput";
import { UiButton } from "../components/UiButton";
import { selectInputDrug } from "./recipe.selectors";
import { recipeActions } from "./recipe.actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const inputDrug = selectInputDrug(state);
  return {
    name: inputDrug.name,
    timesPerDay: inputDrug.timesPerDay,
    duration: inputDrug.duration,
  };
}

const mapDispatchToProps = (dispatch) => ({
  onAdd: () => dispatch(recipeActions.addRecipeAPI()),
  onInputDrugChange: (changes) => dispatch(recipeActions.updateInputDrug(changes)),});

const connector = connect(mapStateToProps, mapDispatchToProps);

const RecipeInputComponent = ({
  name,
  timesPerDay,
  duration,
  onAdd,
  onInputDrugChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="dark:text-white">No:</span>
      <UiInput value={name} onChange={(e) => onInputDrugChange({ name: e.target.value, timesPerDay, duration })} />
      <UiInput value={timesPerDay} onChange={(e) => onInputDrugChange({ name, timesPerDay: e.target.value, duration })} type="number" min="1" max="4"/>
      <UiInput value={duration} onChange={(e) => onInputDrugChange({ name, timesPerDay, duration: e.target.value })} type="number" min="1" max="30"/>
      <UiButton onClick={onAdd}>Add</UiButton>
    </div>
  );
}

export const RecipeInput = connector(RecipeInputComponent);