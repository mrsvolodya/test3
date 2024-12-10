import React from "react";
import style from "./Pagination.module.css";
import classNames from "classnames";

interface FilteredRecipe {
  totalPages: number;
  setCurrentPage: (v: string) => void;
  currentPage: string;
}

const Pagination: React.FC<FilteredRecipe> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const toString = (value: string | number): string => String(value);
  const toNumber = (value: string | number): number => +value;

  const handlePrevPage = () => {
    const current = toNumber(currentPage);
    if (current > 1) {
      setCurrentPage(toString(current - 1));
    }
  };

  const handleNextPage = () => {
    const current = toNumber(currentPage);
    if (current < totalPages) {
      setCurrentPage(toString(current + 1));
    }
  };

  const handlePageClick = (page: string | number) => {
    const pageStr = toString(page);
    if (!isNaN(toNumber(pageStr))) {
      setCurrentPage(pageStr);
    }
  };

  const visiblePageNumbers = (total: number, current: string, limit = 9) => {
    const quantityPages = Array.from({ length: total }, (_, i) =>
      toString(i + 1)
    );
    const currentIndex = quantityPages.indexOf(current);

    let visibleNumbers: string[] = [
      ...quantityPages.slice(Math.max(0, currentIndex - Math.floor(limit / 2))),
    ];

    if (visibleNumbers.length > limit) {
      visibleNumbers = visibleNumbers.slice(0, limit);
    } else {
      visibleNumbers = quantityPages.slice(-limit);
    }

    if (visibleNumbers[0] !== "1") {
      visibleNumbers[0] = "1";
      visibleNumbers[1] = "...";
    }

    const lastPage = toString(quantityPages[quantityPages.length - 1]);
    if (visibleNumbers[visibleNumbers.length - 1] !== lastPage) {
      visibleNumbers[visibleNumbers.length - 1] = lastPage;
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
        disabled={currentPage === "1"}
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
        disabled={currentPage === toString(totalPages)}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
