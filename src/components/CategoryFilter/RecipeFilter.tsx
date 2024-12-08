import React, { useContext } from "react";
import { RecipeContext } from "../../store/RecipeProvider";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../api/fetchCtigories";

export const RecipeFilter: React.FC = () => {
  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } =
    useContext(RecipeContext);
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) throw new Error("Error fetching  category data!");

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
        {data.map(({ strCategory }: { strCategory: string }) => (
          <option key={strCategory} value={strCategory}>
            {strCategory}
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
