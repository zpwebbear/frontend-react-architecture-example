import { connect } from "react-redux"
import { RecipeInput } from "./RecipeInput"
import { RecipeItem } from "./RecipeItem"
import { selectDrugs } from "@/application/recipe/recipe.selectors"

const mapStateToProps = (state) => {
  return {
    drugs: selectDrugs(state),
  }
}

const connector = connect(mapStateToProps)

const RecipeListComponent = ({ drugs }) => {
  return (
    <div className="flex flex-col gap-4 px-4 py-2">
      <h2 className="text-4xl font-extrabold dark:text-white">Recipe List</h2>
      {drugs.map((drug, index) => (
        <RecipeItem
          key={drug.id}
          id={drug.id} />
      ))}
      <RecipeInput />
    </div>
  )
}

export const RecipeList = connector(RecipeListComponent)
