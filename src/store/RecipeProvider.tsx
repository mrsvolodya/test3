import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { ProviderProps } from "../types/ProviderProps";
import { Meal } from "../types/Meal";
import { ContextProps } from "../types/ContextProps";
import { useDebounce } from "use-debounce";

const RecipeContext = createContext<ContextProps>({
  recipes: [],
  selectedRecipes: [],
  hanleSelectedRecipes: () => {},
  isInCart: () => false,
  setRecipes: () => {},
  categories: [],
  selectedCategory: "",
  setSelectedCategory: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
});

const RecipeProvider: React.FC<ProviderProps> = ({ children }) => {
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const categories = response.data.categories || [];
      setCategories(
        categories.map(
          (category: { strCategory: string }) => category.strCategory
        )
      );
    } catch (e) {
      console.error(e, "Failed to fetch categories.");
    }
  };

  const fetchRecipes = async (query: string = "", page: number = 1) => {
    try {
      let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
      const response = await axios.get(url);
      const meals = response.data.meals || [];
      setRecipes(meals);
    } catch (e) {
      console.error(e, "Failed to fetch recipes.");
    }
  };

  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);
  useEffect(() => {
    fetchCategories();
    fetchRecipes(debouncedSearchQuery);
  }, [debouncedSearchQuery, selectedCategory]);

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
        recipes,
        selectedRecipes,
        hanleSelectedRecipes,
        isInCart,
        categories,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setRecipes,
        setSearchQuery,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export { RecipeContext, RecipeProvider };
