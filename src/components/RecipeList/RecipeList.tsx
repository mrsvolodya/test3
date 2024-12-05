import { useContext } from "react";
import { RecipeContext } from "../../store/RecipeProvider";
import styles from "./RecipeList.module.css";
import { Meal } from "../../types/Meal";
import { Link } from "react-router-dom";
interface RecipeListProps {
  recipes: Meal[];
}
export const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const { hanleSelectedRecipes, isInCart, selectedRecipes } =
    useContext(RecipeContext);

  return (
    <div className={styles.cartsContainer}>
      <Link to="/favoritesRecepies" className={styles.cartLink}>
        Cart ({selectedRecipes.length})
      </Link>

      <div className={styles.recipeList}>
        {recipes.map((recipe: Meal) => (
          <div key={recipe.idMeal} className={styles.recipeCard}>
            <button
              className={styles.backButton}
              onClick={() => hanleSelectedRecipes(recipe)}
            >
              {isInCart(selectedRecipes, recipe.idMeal)
                ? "Remove from the cart"
                : "Add to cart"}
            </button>
            <Link to={`/recipe/${recipe.idMeal}`}>
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className={styles.recipeCardImage}
              />
              <div className={styles.recipeCardContent}>
                <h3 className={styles.recipeCardTitle}>{recipe.strMeal}</h3>
                <p className={styles.recipeCardInfo}>{recipe.strCategory}</p>
                <p className={styles.recipeCardInfo}>{recipe.strArea}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
