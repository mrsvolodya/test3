import { useRecipes } from "../../hooks/useRecipes";
import { useDebounce } from "../../hooks/useDebounce";
import { RecipeList } from "../../components/RecipeList/RecipeList";
import { Pagination } from "../../components/Pagination/Pagination";
import { useFilteredRecipes } from "../../hooks/useFilteredRecipes";
import { useSearchParams } from "react-router-dom";

const RECIPE_ON_PAGE = 2;

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams("");

  const filterBy = searchParams.get("filterBy") || "";
  const debouncedSearchQuery = useDebounce(filterBy, 1000);

  const {
    data: recipes = [],
    isLoading,
    isError,
  } = useRecipes(debouncedSearchQuery);

  const categoryQuery = searchParams.get("category") || "";
  const filteredRecipes = useFilteredRecipes(recipes, categoryQuery, filterBy);

  const currentPage = searchParams.get("page") || "1";
  const startIndex = (+currentPage - 1) * RECIPE_ON_PAGE;

  const showRecipes = filteredRecipes.slice(
    startIndex,
    startIndex + RECIPE_ON_PAGE
  );
  const totalNumberOfPage = Math.ceil(filteredRecipes.length / RECIPE_ON_PAGE);

  function handleClearSearch() {
    setSearchParams({ filterBy: "" });
  }

  function handleCurrentPage(currentPage: string) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(currentPage));
    setSearchParams(params);
  }

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
