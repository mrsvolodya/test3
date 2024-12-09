import { useContext, useState } from "react";
import { RecipeList } from "./components/RecipeList/RecipeList";
import { RecipeContext } from "./store/RecipeProvider";
import Pagination from "./components/Pagination/Pagination";
import { Meal } from "./types/Meal";
import { useDebounce } from "use-debounce";
import { useRecipes } from "./hooks/useRecipes";

function App() {
  const RECIPE_ON_PAGE = 4;
  const { selectedCategory, searchQuery, setSearchQuery } =
    useContext(RecipeContext);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);
  const handleClearSearch = () => {
    setSearchQuery("");
  };
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    data: recipes,
    isLoading,
    isError,
  } = useRecipes(debouncedSearchQuery);
  if (isLoading) return <div>Loading...</div>;
  if (isError) throw new Error("Error fetching data!");
  if (!recipes || recipes.length === 0) {
    return (
      <div>
        Recipes not found!...
        <button onClick={handleClearSearch}>Clear Field</button>
      </div>
    );
  }

  const filteredByCategory = recipes.filter((recipe: Meal) => {
    return selectedCategory ? recipe.strCategory === selectedCategory : true;
  });
  const startIndex = (currentPage - 1) * RECIPE_ON_PAGE;
  const endIndex = startIndex + RECIPE_ON_PAGE;
  const showRecipes = filteredByCategory.slice(startIndex, endIndex);
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
          setCurrentPage={(page) => setCurrentPage(page)}
        />
      </main>

      <footer></footer>
    </div>
  );
}

export default App;
