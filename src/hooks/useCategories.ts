import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../keys/QueryKeys";
import { fetchCategories } from "../api/fetchCtigories";

export const useCategories = () => {
  return useQuery({
    queryKey: [QueryKeys.allRecipes],
    queryFn: fetchCategories,
  });
};
