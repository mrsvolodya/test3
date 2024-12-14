import { Meal } from "./Meal";

export interface ContextProps {
  selectedRecipes: Meal[];
  hanleSelectedRecipes: (recipe: Meal) => void;
  isInCart: (recipe: Meal[], idMeal: string) => boolean;
}
