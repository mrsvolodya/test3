import React from "react";
import styles from "./IngredientsList.module.css";
import { Meal } from "../../types/Meal";

interface IngredientsListProps {
  recipe: Meal | Meal[];
}

export function IngredientsList({ recipe }: IngredientsListProps) {
  const recipes = Array.isArray(recipe) ? recipe : [recipe];
  const ingredientCounts: Record<string, number> = recipes.reduce(
    (acc, recipe) => {
      let i = 1;
      while (recipe[`strIngredient${i}`]) {
        const ingredient = recipe[`strIngredient${i}`] as string;
        acc[ingredient] = (acc[ingredient] || 0) + 1;
        i++;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  const ingredientList = Object.entries(ingredientCounts);
  const totalIngredients = ingredientList.reduce(
    (sum, [, count]) => sum + count,
    0
  );

  if (totalIngredients === 0) {
    return <p>No ingredients found.</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Ingredients</h2>
      <ul className={styles.list}>
        {ingredientList.map(([ingredient, count]) => (
          <li key={ingredient} className={styles.item}>
            {ingredient} - {count}
          </li>
        ))}
      </ul>
      <p className={styles.totalIngredients}>
        Total ingredients: {totalIngredients} pcs
      </p>
    </div>
  );
}
