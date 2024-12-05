import React from "react";
import { FavoritesList } from "../components/SelectedRecipes";

export const FavoritesPage: React.FC = () => {
  return (
    <div>
      <h1>Your Favorite Recipes</h1>
      <FavoritesList />
    </div>
  );
};
