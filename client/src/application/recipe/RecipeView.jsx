import { IngestionsInstructions } from "./IngestionInstructions"
import { RecipeList } from "./RecipeList"

export const RecipeView = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <RecipeList />
      <IngestionsInstructions />
    </div>
  )
}