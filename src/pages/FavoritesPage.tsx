import React from "react";
import { FavoritesList } from "../components/FavoritesList";
import styles from "../styles/FavoritesPage.module.css";

export const FavoritesPage: React.FC = () => {
  return (
    <div className={styles.favoritesPage}>
      <h1 className={styles.title}>Your Favorite Recipes</h1>
      <FavoritesList />
    </div>
  );
};
