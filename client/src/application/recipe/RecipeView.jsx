import { useDispatch } from "react-redux"
import { IngestionsInstructions } from "./IngestionInstructions"
import { RecipeList } from "./RecipeList"
import { useEffect } from "react"
import { recipeActions } from "./recipe.actions"

export const RecipeView = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(recipeActions.fetchRecipesApi())
    dispatch(recipeActions.fetchInstructionsApi())
  }, [])

  return (
    <div className="grid grid-cols-2 gap-4">
      <RecipeList />
      <IngestionsInstructions />
    </div>
  )
}