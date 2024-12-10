import React, { useContext, useEffect, useRef } from "react";
import { RecipeContext } from "../../store/RecipeProvider";
import { useCategories } from "../../hooks/useCategories";

export const RecipeFilter: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const { setSearchParams, searchParams } = useContext(RecipeContext);
  const { data, isLoading, isError } = useCategories();
  const postQuery = searchParams.get("filterBy") || "";
  const categoryQuery = searchParams.get("category") || "";

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("filterBy", event.target.value);
    setSearchParams(params);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", event.target.value);
    setSearchParams(params);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching category data!</div>;

  return (
    <div>
      <select onChange={handleCategoryChange} value={categoryQuery}>
        <option value="">All Categories</option>
        {data.map(({ strCategory }: { strCategory: string }) => (
          <option key={strCategory} value={strCategory}>
            {strCategory}
          </option>
        ))}
      </select>
      <input
        ref={inputRef}
        type="search"
        placeholder="Search for a recipe"
        value={postQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};
