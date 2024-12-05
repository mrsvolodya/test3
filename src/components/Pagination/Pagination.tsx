import React, { useContext } from "react";
import { RecipeContext } from "../../store/RecipeProvider";

const Pagination: React.FC = () => {
  const { currentPage, setCurrentPage, totalPages } = useContext(RecipeContext);

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
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        {"<"}
      </button>

      {pageNumbers.slice(0, 7).map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={page === currentPage ? "active" : ""}
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
