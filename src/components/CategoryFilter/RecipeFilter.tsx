import React, { useContext, useEffect, useRef } from "react";
import { RecipeContext } from "../../store/RecipeProvider";
import { useCategories } from "../../hooks/useCategories";

export const RecipeFilter: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, [inputRef]);

  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } =
    useContext(RecipeContext);

  const { data, isLoading, isError } = useCategories();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) throw new Error("Error fetching  category data!");

  return (
    <div>
      <select onChange={handleCategoryChange} value={selectedCategory}>
        <option value="">All Categories</option>
        {data.map(({ strCategory }: { strCategory: string }) => (
          <option key={strCategory} value={strCategory}>
            {strCategory}
          </option>
        ))}
      </select>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a recipe"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};
