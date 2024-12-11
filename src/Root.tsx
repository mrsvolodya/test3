import { Routes, Route } from "react-router-dom";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { RecipeDetail } from "./components/RecipeDetail";
import { FavoritesPage } from "./pages/FavoritesPage/FavoritesPage";
import { HomePage } from "./pages/HomePage/HomePage";

export function Root() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="recipe/:id" element={<RecipeDetail />} />
      <Route path="/favoritesRecepies" element={<FavoritesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
