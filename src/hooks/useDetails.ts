import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../keys/QueryKeys";
import { fetchRecipesById } from "../api/recipes";

export function useDetails(id: string) {
  return useQuery({
    queryKey: [QueryKeys.recipeById, id],
    queryFn: () => fetchRecipesById(id),
  });
}
