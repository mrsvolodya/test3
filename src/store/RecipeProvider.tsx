import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { ProviderProps } from "../types/ProviderProps";
import { Meal } from "../types/Meal";
import { ContextProps } from "../types/ContextProps";

const RecipeContext = createContext<ContextProps>({
  recipes: [],
  selectedRecipes: [],
  hanleSelectedRecipes: () => {},
  isInCart: () => false,
});
const RecipeProvider: React.FC<ProviderProps> = ({ children }) => {
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<Meal[]>([]);
  const isInCart = (recipes: Meal[], idMeal: string) => {
    return recipes.some((recipe: Meal) => recipe.idMeal === idMeal);
  };

  const hanleSelectedRecipes = (recipe: Meal) => {
    setSelectedRecipes((prevRecipes) => {
      const isRecipeInCart = isInCart(prevRecipes, recipe.idMeal);

      if (isRecipeInCart) {
        return prevRecipes.filter((rec) => rec.idMeal !== recipe.idMeal);
      } else {
        return [...prevRecipes, recipe];
      }
    });
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        );
        setRecipes(response.data.meals || []);
      } catch (e) {
        console.error(e, "Failed to fetch recipes.");
      }
    };

    fetchRecipes();
  }, []);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        selectedRecipes,
        hanleSelectedRecipes,
        isInCart,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export { RecipeContext, RecipeProvider };
