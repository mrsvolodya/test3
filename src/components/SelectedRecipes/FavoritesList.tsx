import { useContext } from "react";
import { RecipeContext } from "../../store/RecipeProvider";
import { RecipeList } from "../RecipeList/RecipeList";

export const FavoritesList = () => {
  const { selectedRecipes } = useContext(RecipeContext);

  return (
    <div>
      {selectedRecipes.length > 0 ? (
        <RecipeList recipes={selectedRecipes} />
      ) : (
        <p>No favorites selected yet!</p>
      )}
    </div>
  );
};
