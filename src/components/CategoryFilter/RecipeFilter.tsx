import React, { useContext, useEffect, useRef } from "react";
import { RecipeContext } from "../../store/RecipeProvider";
import { useCategories } from "../../hooks/useCategories";
import styles from "./RecipeFilter.module.css";

export function RecipeFilter() {
  const { setSearchParams, searchParams } = useContext(RecipeContext);
  const { data, isLoading, isError } = useCategories();
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const postQuery = searchParams.get("filterBy") || "";
  const categoryQuery = searchParams.get("category") || "";

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("filterBy", event.target.value);
    params.set("page", "1");
    setSearchParams(params);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", event.target.value);
    params.set("page", "1");
    setSearchParams(params);
  };

  if (isLoading) return <div>Loading categories...</div>;
  if (isError)
    return <div>Error fetching categories. Please try again later.</div>;

  return (
    <div className={styles.searchContainer}>
      <select
        onChange={handleCategoryChange}
        value={categoryQuery}
        className={styles.selectField}
      >
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
        className={styles.searchField}
      />
    </div>
  );
}
