import React, { createContext, useEffect, useState } from "react";
import { ProviderProps } from "../types/ProviderProps";
import { Meal } from "../types/Meal";
import { ContextProps } from "../types/ContextProps";
import { useSearchParams } from "react-router-dom";

const RecipeContext = createContext<ContextProps>({
  searchParams: new URLSearchParams(),
  setSearchParams: () => {},
  selectedRecipes: [],
  hanleSelectedRecipes: () => {},
  isInCart: () => false,
});

function RecipeProvider({ children }: ProviderProps) {
  const [selectedRecipes, setSelectedRecipes] = useState<Meal[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

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
        searchParams,
        setSearchParams,
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
