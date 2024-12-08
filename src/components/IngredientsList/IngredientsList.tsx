import React from "react";
import styles from "./IngredientsList.module.css";
import { Meal } from "../../types/Meal";

interface IngredientsListProps {
  recipes: Meal[];
}

export const IngredientsList: React.FC<IngredientsListProps> = ({
  recipes,
}) => {
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
    </div>
  );
};
