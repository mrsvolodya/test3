import { Routes, Route } from "react-router-dom";
import App from "./App";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RecipeDetail } from "./components/RecipeDetail";
import { FavoritesPage } from "./pages/FavoritesPage";

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="recipe/:id" element={<RecipeDetail />} />
    <Route path="/favoritesRecepies" element={<FavoritesPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
