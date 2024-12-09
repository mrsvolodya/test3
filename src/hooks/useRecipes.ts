import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../keys/QueryKeys";
import { fetchRecipes } from "../api/fetchRecipes";

export const useRecipes = (searchQuery: string) => {
  return useQuery({
    queryKey: [QueryKeys.allCategories, searchQuery],
    queryFn: () => fetchRecipes(searchQuery),
  });
};
