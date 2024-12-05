import React, { useContext } from "react";
import { RecipeContext } from "../../store/RecipeProvider";
import { Meal } from "../../types/Meal";
import { Link } from "react-router-dom";
import styles from "./RecipeList.module.css";
import { RecipeFilter } from "../CategoryFilter/RecipeFilter";

interface RecipeListProps {
  recipes: Meal[];
}

export const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const { hanleSelectedRecipes, isInCart, selectedRecipes, selectedCategory } =
    useContext(RecipeContext);

  const filteredRecipes = recipes.filter((recipe: Meal) => {
    const matchesCategory = selectedCategory
      ? recipe.strCategory === selectedCategory
      : true;

    return matchesCategory;
  });

  return (
    <div className={styles.cartsContainer}>
      <Link to="/favoritesRecepies" className={styles.cartLink}>
        Cart ({selectedRecipes.length})
      </Link>

      <RecipeFilter />

      <div className={styles.recipeList}>
        {filteredRecipes.map((recipe: Meal) => (
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
