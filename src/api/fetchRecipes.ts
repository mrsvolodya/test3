import axios from "axios";

export const fetchRecipes = async (query: string = "") => {
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

  const { data } = await axios.get(url);
  return data.meals;
};
