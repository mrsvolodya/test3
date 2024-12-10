import { useMemo } from "react";
import { Meal } from "../types/Meal";

export function useFilteredRecipes(
  recipes: Meal[] | null,
  categoryQuery: string,
  filterBy: string
) {
  return useMemo(() => {
    if (!recipes) return [];

    const filteredByCategory = recipes.filter((recipe) =>
      categoryQuery ? recipe.strCategory === categoryQuery : true
    );

    return filteredByCategory.filter((recipe) =>
      recipe.strMeal.toLowerCase().includes(filterBy.toLowerCase())
    );
  }, [recipes, categoryQuery, filterBy]);
}
