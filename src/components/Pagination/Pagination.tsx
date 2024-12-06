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

  const pagination = (total: number[], current: number, length = 7) => {
    const prevLength = Math.ceil(length / 2);
    const nextLength = Math.floor(length / 2);

    if (current <= prevLength) {
      return total.slice(0, length);
    }

    if (current >= total.length - nextLength) {
      return total.slice(-length);
    }

    return total.slice(current - prevLength, current + nextLength);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pagination(pageNumbers, currentPage);
  const showDotsBefore = currentPage > 4;
  const showDotsAfter = totalPages > 7 && currentPage + 3 < totalPages;

  return (
    <div className={style.pagination}>
      <button
        className={classNames(style.paginationButton, style.prev)}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      {showDotsBefore && (
        <>
          <button
            className={classNames(style.paginationNumber)}
            onClick={() => handlePageClick(1)}
          >
            1
          </button>
          <span className={style.paginationDots}>...</span>
        </>
      )}

      {visiblePages.map((page) => (
        <button
          className={classNames(style.paginationNumber, {
            [style.paginationActive]: page === currentPage,
          })}
          key={page}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}

      {showDotsAfter && (
        <>
          <span className={style.paginationDots}>...</span>
          <button
            className={classNames(style.paginationNumber)}
            onClick={() => handlePageClick(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

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
