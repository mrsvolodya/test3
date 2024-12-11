import { useContext } from "react";
import { RecipeContext } from "../../store/RecipeProvider";
import { RecipeList } from "../RecipeList/RecipeList";
import { useNavigate } from "react-router-dom";
import styles from "./FavoritesList.module.css";

export function FavoritesList() {
  const { selectedRecipes } = useContext(RecipeContext);
  const navigation = useNavigate();

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => navigation(-1)}
        aria-label="Back to home"
      >
        Back to home
      </button>

      {selectedRecipes.length > 0 ? (
        <RecipeList recipes={selectedRecipes} isFavorite={true} />
      ) : (
        <div className={styles.noFavorites}>
          <p>No favorites selected yet!</p>
        </div>
      )}
    </div>
  );
};
