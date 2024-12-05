import { useContext } from "react";
import "./App.css";
import { RecipeList } from "./components/RecipeList/RecipeList";
import { RecipeContext } from "./store/RecipeProvider";
import Pagination from "./components/Pagination/Pagination";

function App() {
  const { recipes } = useContext(RecipeContext);
  return (
    <div className="App">
      <header className="App-header"></header>

      <main>
        <RecipeList recipes={recipes} />
        <Pagination />
      </main>

      <footer></footer>
    </div>
  );
}

export default App;
