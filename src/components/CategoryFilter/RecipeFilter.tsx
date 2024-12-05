import React, { useContext } from "react";
import { RecipeContext } from "../../store/RecipeProvider";

export const RecipeFilter: React.FC = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useContext(RecipeContext);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <select onChange={handleCategoryChange} value={selectedCategory}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search for a recipe"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};
