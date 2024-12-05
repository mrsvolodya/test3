import { Dispatch, SetStateAction } from "react";
import { Meal } from "./Meal";

export interface ContextProps {
  recipes: Meal[];
  selectedRecipes: Meal[];
  hanleSelectedRecipes: (recipe: Meal) => void;
  isInCart: (recipe: Meal[], idMeal: string) => boolean;
  setRecipes: Dispatch<SetStateAction<Meal[]>>;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}
