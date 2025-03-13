import { connect } from "react-redux"
import { UiButton } from "../components/UiButton"
import { selectDrugById, selectDrugIndexById } from "./recipe.selectors"

const mapStateToProps = (state, { id }) => ({
  index: selectDrugIndexById(state, id),
  ...selectDrugById(state, id),
});

const mapDispatchToProps = (dispatch, { id }) => ({
  onDelete: () => dispatch(recipeActions.deleteRecipe(id)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

const RecipeItemComponent = ({
  index,
  name,
  timesPerDay,
  duration,
  onDelete,
}) => {
  return (
    <div className="w-full flex items-center justify-between gap-2 dark:text-white">
      <span>{index}.</span>
      <span>{name}</span>
      <span>{timesPerDay}</span>
      <span>{duration}</span>
      <UiButton onClick={onDelete}>Delete</UiButton>
    </div>
  )
}

export const RecipeItem = connector(RecipeItemComponent)