import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchRecipeById = async (id: string) => {
  const response = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  return response.data.meals[0];
};

export const useRecipeQuery = (id: string) => {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => fetchRecipeById(id),
  });
};
