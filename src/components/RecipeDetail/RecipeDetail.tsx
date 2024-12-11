import { useParams, useNavigate } from "react-router-dom";
import styles from "./RecipeDetail.module.css";
import { useDetails } from "../../hooks/useDetails";
import { IngredientsList } from "../IngredientsList";

export function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: recipe, isLoading, isError } = useDetails(id || "");
  console.log(recipe);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: Could not fetch recipe details.</div>;
  if (!recipe) {
    return <div>No recipe found!</div>;
  }

  return (
    <div className={styles.recipeDetail}>
      <button onClick={() => navigate("/")} className={styles.backButton}>
        Back to All Recipes
      </button>
      <h1 className={styles.recipeTitle}>{recipe.strMeal}</h1>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className={styles.recipeImage}
      />
      <h2 className={styles.recipeCategory}>Category: {recipe.strCategory}</h2>
      <h3 className={styles.recipeArea}>Area: {recipe.strArea}</h3>
      <h4 className={styles.recipeInstructions}>Instructions</h4>
      <p>{recipe.strInstructions}</p>
      <IngredientsList recipe={recipe} />
    </div>
  );
}
