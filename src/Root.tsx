import { Routes, Route } from "react-router-dom";
import App from "./App";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RecipeList } from "./components/RecipeList";

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<RecipeList />} />
      {/* <Route path="recipe/:id" element={<RecipePage />} /> */}
      {/* <Route path="cart" element={<CartPage />} /> */}
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
