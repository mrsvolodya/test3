import React from "react";
import style from "./Pagination.module.css";
import classNames from "classnames";
import { usePagination } from "../../hooks/usePagination";

interface PaginationProps {
  totalPages: number;
  currentPage: string;
  setCurrentPage: (v: string) => void;
}

export function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const { visiblePages, handlePrevPage, handleNextPage, handlePageClick } =
    usePagination(totalPages, setCurrentPage);

  return (
    <div className={style.pagination}>
      <button
        className={classNames(style.paginationButton, style.prev)}
        onClick={handlePrevPage}
        disabled={currentPage === "1"}
        aria-label="Previous page"
      >
        {"<"}
      </button>

      {visiblePages.map((page, i) => (
        <button
          className={classNames(style.paginationNumber, {
            [style.paginationActive]: page === currentPage,
          })}
          key={`${page}+ ${i}`}
          onClick={() => handlePageClick(page)}
          aria-label={`Go to page ${page}`}
        >
          {page}
        </button>
      ))}

      <button
        className={classNames(style.paginationButton, style.next)}
        onClick={handleNextPage}
        disabled={currentPage === String(totalPages)}
        aria-label="Next page"
      >
        {">"}
      </button>
    </div>
  );
}
