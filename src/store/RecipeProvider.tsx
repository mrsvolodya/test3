import React, { createContext, useEffect, useState } from "react";
import { ProviderProps } from "../types/ProviderProps";
import { Meal } from "../types/Meal";
import { ContextProps } from "../types/ContextProps";

const RecipeContext = createContext<ContextProps>({
  selectedRecipes: [],
  hanleSelectedRecipes: () => {},
  isInCart: () => false,
  selectedCategory: "",
  setSelectedCategory: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
});

const RecipeProvider: React.FC<ProviderProps> = ({ children }) => {
  const [selectedRecipes, setSelectedRecipes] = useState<Meal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isInCart = (recipes: Meal[], idMeal: string) => {
    return recipes.some((recipe: Meal) => recipe.idMeal === idMeal);
  };

  const addToLocalStorage = (key: string, recipe: Meal[]) => {
    localStorage.setItem(key, JSON.stringify(recipe));
  };

  const hanleSelectedRecipes = (recipe: Meal) => {
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
  };

  useEffect(() => {
    const favorites = localStorage.getItem("selectedRecipes");
    if (favorites) {
      const parsedFavorites = JSON.parse(favorites);
      setSelectedRecipes(parsedFavorites);
    }
  }, []);

  return (
    <RecipeContext.Provider
      value={{
        selectedRecipes,
        hanleSelectedRecipes,
        isInCart,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export { RecipeContext, RecipeProvider };
