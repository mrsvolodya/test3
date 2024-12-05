import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./RecipeDetail.module.css";

export const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setRecipe(response.data.meals[0]);
      } catch (error) {
        console.error("Error fetching recipe", error);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (!recipe) return <div>Loading...</div>;
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
      <h4 className={styles.recipeInstructions}>Ingredients</h4>
      <ul className={styles.recipeIngredients}>
        {Array.from({ length: 100 }).map((_, index) => {
          const ingredient = recipe[`strIngredient${index + 1}`];
          const measure = recipe[`strMeasure${index + 1}`];
          return (
            ingredient && (
              <li key={index}>
                {ingredient} - {measure}
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
};
