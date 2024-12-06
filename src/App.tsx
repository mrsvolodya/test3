import { useContext, useState } from "react";
import { RecipeList } from "./components/RecipeList/RecipeList";
import { RecipeContext } from "./store/RecipeProvider";
import Pagination from "./components/Pagination/Pagination";

function App() {
  const RECIPE_ON_PAGE = 2;
  const { recipes, selectedCategory } = useContext(RecipeContext);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredByCategory = recipes.filter((recipe) => {
    return selectedCategory ? recipe.strCategory === selectedCategory : true;
  });

  const showRecipes = filteredByCategory.slice(
    (currentPage - 1) * RECIPE_ON_PAGE,
    (currentPage - 1) * RECIPE_ON_PAGE + RECIPE_ON_PAGE
  );

  const totalNumberOfPage = Math.ceil(
    filteredByCategory.length / RECIPE_ON_PAGE
  );
  

  return (
    <div className="App">
      <header className="App-header"></header>

      <main>
        <RecipeList recipes={showRecipes} />
        <Pagination
          totalPages={totalNumberOfPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </main>

      <footer></footer>
    </div>
  );
}

export default App;
