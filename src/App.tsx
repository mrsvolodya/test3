import { useContext } from "react";
import "./App.css";
import { RecipeList } from "./components/RecipeList/RecipeList";
import { RecipeContext } from "./store/RecipeProvider";

function App() {
  const { recipes } = useContext(RecipeContext);
  return (
    <div className="App">
      <header className="App-header"></header>

      <main>
        <RecipeList recipes={recipes} />
      </main>

      <footer></footer>
    </div>
  );
}

export default App;
