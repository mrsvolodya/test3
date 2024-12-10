import { Meal } from "./Meal";
import { SetURLSearchParams } from "react-router-dom";

export interface ContextProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  selectedRecipes: Meal[];
  hanleSelectedRecipes: (recipe: Meal) => void;
  isInCart: (recipe: Meal[], idMeal: string) => boolean;
}
