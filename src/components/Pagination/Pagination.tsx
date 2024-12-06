import React from "react";
import style from "./Pagination.module.css";
import classNames from "classnames";
interface FilteredRecipe {
  totalPages: number;
  setCurrentPage: (v: number) => void;
  currentPage: number;
}

const Pagination: React.FC<FilteredRecipe> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.pagination}>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        {"<"}
      </button>

      {pageNumbers.slice(0, 7).map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={classNames(page === currentPage ? style.active : "")}
        >
          {page}
        </button>
      ))}

      {totalPages > 7 && (
        <>
          <span>...</span>
          <button onClick={() => handlePageClick(totalPages)}>
            {totalPages}
          </button>
        </>
      )}

      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
