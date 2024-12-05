import { Meal } from "./Meal";

export interface ContextProps {
  recipes: Meal[];
  selectedRecipes: Meal[];
  hanleSelectedRecipes: (recipe: Meal) => void;
  isInCart: (recipe: Meal[], idMeal: string) => boolean;
}
