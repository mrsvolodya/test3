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

  const handlePageClick = (page: number | string) => {
    if (typeof page === "number") {
      setCurrentPage(page);
    }
  };

  const visiblePageNumbers = (total: number, current: number, limit = 9) => {
    const quantityPages = Array.from({ length: total }, (_, i) => i + 1);
    const currentIndex = quantityPages.indexOf(current);
    let visibleNumbers: (string | number)[] = [
      ...quantityPages.slice(Math.max(0, currentIndex - Math.floor(limit / 2))),
    ];

    if (visibleNumbers.length > limit) {
      visibleNumbers.length = limit;
    } else {
      visibleNumbers = quantityPages.slice(-limit);
    }

    if (visibleNumbers[0] !== 1) {
      visibleNumbers[0] = 1;
      visibleNumbers[1] = "...";
    }

    if (
      visibleNumbers[visibleNumbers.length - 1] !==
      quantityPages[quantityPages.length - 1]
    ) {
      visibleNumbers[visibleNumbers.length - 1] =
        quantityPages[quantityPages.length - 1];
      visibleNumbers[visibleNumbers.length - 2] = "...";
    }

    return visibleNumbers;
  };

  const visiblePages = visiblePageNumbers(totalPages, currentPage);

  return (
    <div className={style.pagination}>
      <button
        className={classNames(style.paginationButton, style.prev)}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      {visiblePages.map((page, index) => (
        <button
          className={classNames(style.paginationNumber, {
            [style.paginationActive]: page === currentPage,
          })}
          key={`${page}-${index}`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={classNames(style.paginationButton, style.next)}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
