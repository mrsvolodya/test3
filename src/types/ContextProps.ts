import { Dispatch, SetStateAction } from "react";
import { Meal } from "./Meal";

export interface ContextProps {
  selectedRecipes: Meal[];
  hanleSelectedRecipes: (recipe: Meal) => void;
  isInCart: (recipe: Meal[], idMeal: string) => boolean;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}
