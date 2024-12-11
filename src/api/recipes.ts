import axios from "axios";

export async function fetchRecipes(query: string = "") {
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

  const { data } = await axios.get(url);
  return data.meals;
}

export async function fetchRecipesById(id: string) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { data } = await axios.get(url);

  return data.meals[0];
}

export async function fetchCategories() {
  const response = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  return response.data.categories || [];
}
