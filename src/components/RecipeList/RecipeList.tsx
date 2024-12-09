import React, { useContext } from "react";
import { RecipeContext } from "../../store/RecipeProvider";
import { Meal } from "../../types/Meal";
import { Link } from "react-router-dom";
import styles from "./RecipeList.module.css";
import { RecipeFilter } from "../CategoryFilter/RecipeFilter";
import { IngredientsList } from "../IngredientsList/IngredientsList";

interface RecipeListProps {
  recipes: Meal[];
  isFavorite?: boolean;
}

export const RecipeList: React.FC<RecipeListProps> = ({
  recipes,
  isFavorite = false,
}) => {
  const { hanleSelectedRecipes, isInCart, selectedRecipes } =
    useContext(RecipeContext);
  const isFavorites = selectedRecipes.length > 0;

  return (
    <>
      <div className={styles.cartsContainer}>
        <Link to="/favoritesRecepies" className={styles.cartLink}>
          Favorites recipes {isFavorites && selectedRecipes.length}
        </Link>

        {!isFavorite && <RecipeFilter />}
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
      {isFavorite && <IngredientsList recipes={recipes} />}
    </>
  );
};
