import { useContext, useState } from "react";
import "./App.css";
import { RecipeList } from "./components/RecipeList/RecipeList";
import { RecipeContext } from "./store/RecipeProvider";
import Pagination from "./components/Pagination/Pagination";

function App() {
  const RECIPE_ON_PAGE = 4;
  const { recipes, selectedCategory } = useContext(RecipeContext);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredByCategory = recipes.filter((recipe) => {
    return selectedCategory ? recipe.strCategory === selectedCategory : true;
  });

  const totalPages = Math.ceil(filteredByCategory.length / RECIPE_ON_PAGE);

  const showRecipes = filteredByCategory.slice(
    (currentPage - 1) * RECIPE_ON_PAGE,
    (currentPage - 1) * RECIPE_ON_PAGE + RECIPE_ON_PAGE
  );
  console.log("🚀 ~ App ~ currentPage:", showRecipes);

  return (
    <div className="App">
      <header className="App-header"></header>

      <main>
        <RecipeList recipes={showRecipes} />
        <Pagination
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </main>

      <footer></footer>
    </div>
  );
}

export default App;
