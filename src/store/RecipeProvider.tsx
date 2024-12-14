import React, { createContext, useEffect, useState } from "react";
import { ProviderProps } from "../types/ProviderProps";
import { Meal } from "../types/Meal";
import { ContextProps } from "../types/ContextProps";

const RecipeContext = createContext<ContextProps>({
  selectedRecipes: [],
  hanleSelectedRecipes: () => {},
  isInCart: () => false,
});

function RecipeProvider({ children }: ProviderProps) {
  const [selectedRecipes, setSelectedRecipes] = useState<Meal[]>([]);

  useEffect(() => {
    const favorites = localStorage.getItem("selectedRecipes");
    if (favorites) {
      const parsedFavorites = JSON.parse(favorites);
      setSelectedRecipes(parsedFavorites);
    }
  }, []);

  function isInCart(recipes: Meal[], idMeal: string) {
    return recipes.some((recipe: Meal) => recipe.idMeal === idMeal);
  }

  function addToLocalStorage(key: string, recipe: Meal[]) {
    localStorage.setItem(key, JSON.stringify(recipe));
  }

  function hanleSelectedRecipes(recipe: Meal) {
    setSelectedRecipes((prevRecipes) => {
      const isRecipeInCart = isInCart(prevRecipes, recipe.idMeal);
      if (isRecipeInCart) {
        const filteredRecipes = prevRecipes.filter(
          (rec) => rec.idMeal !== recipe.idMeal
        );

        addToLocalStorage("selectedRecipes", filteredRecipes);
        return filteredRecipes;
      } else {
        const addNewRecipe = [...prevRecipes, recipe];
        addToLocalStorage("selectedRecipes", addNewRecipe);

        return addNewRecipe;
      }
    });
  }

  return (
    <RecipeContext.Provider
      value={{
        selectedRecipes,
        hanleSelectedRecipes,
        isInCart,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export { RecipeContext, RecipeProvider };
