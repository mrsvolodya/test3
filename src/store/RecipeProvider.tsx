import React, { createContext, useState } from "react";
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
