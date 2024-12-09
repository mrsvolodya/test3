import { useContext } from "react";
import { RecipeContext } from "../../store/RecipeProvider";
import { RecipeList } from "../RecipeList/RecipeList";
import { useNavigate } from "react-router-dom";
import styles from "./FavoritesList.module.css";

export const FavoritesList = () => {
  const { selectedRecipes } = useContext(RecipeContext);
  const navigation = useNavigate();
  return (
    <div>
      <button className={styles.button} onClick={() => navigation(-1)}>
        Back to home
      </button>
      {selectedRecipes.length > 0 ? (
        <RecipeList recipes={selectedRecipes} isFavorite={true} />
      ) : (
        <div>
          <p>No favorites selected yet!</p>
        </div>
      )}
    </div>
  );
};
