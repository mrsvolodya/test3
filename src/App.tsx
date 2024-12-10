import { useContext } from "react";
import { RecipeList } from "./components/RecipeList/RecipeList";
import { RecipeContext } from "./store/RecipeProvider";
import Pagination from "./components/Pagination/Pagination";
import { useDebounce } from "use-debounce";
import { useRecipes } from "./hooks/useRecipes";
import { useFilteredRecipes } from "./hooks/useFilteredRecipes";

function App() {
  const RECIPE_ON_PAGE = 4;
  const { setSearchParams, searchParams } = useContext(RecipeContext);
  const handleClearSearch = () => {
    setSearchParams({ filterBy: "" });
  };

  const filterBy = searchParams.get("filterBy") || "";
  const categoryQuery = searchParams.get("category") || "";
  const currentPage = searchParams.get("page") || "1";
  const [debouncedSearchQuery] = useDebounce(filterBy, 1000);
  const {
    data: recipes = [],
    isLoading,
    isError,
  } = useRecipes(debouncedSearchQuery);

  const filteredRecipes = useFilteredRecipes(recipes, categoryQuery, filterBy);
  const startIndex = (+currentPage - 1) * RECIPE_ON_PAGE;
  const showRecipes = filteredRecipes.slice(
    startIndex,
    startIndex + RECIPE_ON_PAGE
  );
  const totalNumberOfPage = Math.ceil(filteredRecipes.length / RECIPE_ON_PAGE);

  const handleCurrentPage = (currentPage: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(currentPage));
    setSearchParams(params);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) throw new Error("Error fetching data!");
  if (!recipes) {
    return (
      <div>
        Recipes not found!...
        <button onClick={handleClearSearch}>Clear Field</button>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header"></header>

      <main>
        <RecipeList recipes={showRecipes} />
        <Pagination
          totalPages={totalNumberOfPage}
          currentPage={currentPage}
          setCurrentPage={(page) => handleCurrentPage(page)}
        />
      </main>

      <footer></footer>
    </div>
  );
}

export default App;
