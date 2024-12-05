import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { ProviderProps } from "../types/ProviderProps";
import { Meal } from "../types/Meal";
import { ContextProps } from "../types/ContextProps";


const RecipeContext = createContext<ContextProps>({
  recipes: [],
});
const RecipeProvider: React.FC<ProviderProps> = ({ children }) => {
  const [recipes, setRecipes] = useState<Meal[]>([]);
  console.log(recipes[0]);

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
    <RecipeContext.Provider value={{ recipes }}>
      {children}
    </RecipeContext.Provider>
  );
};

export { RecipeContext, RecipeProvider };
