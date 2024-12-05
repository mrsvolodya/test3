import { useContext } from "react";
import { RecipeContext } from "../../store/RecipeProvider";
import "./RecipeList.css";
import { Meal } from "../../types/Meal";

export const RecipeList = () => {
  const { recipes } = useContext(RecipeContext);

  return (
    <div className="recipe-list">
      {recipes.map((recipe: Meal) => (
        <div key={recipe.idMeal} className="recipe-card">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="recipe-card-image"
          />
          <div className="recipe-card-content">
            <h3 className="recipe-card-title">{recipe.strMeal}</h3>
            <p className="recipe-card-category">{recipe.strCategory}</p>
            <p className="recipe-card-area">{recipe.strArea}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
