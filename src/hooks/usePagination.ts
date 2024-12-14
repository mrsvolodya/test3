import { useSearchParams } from "react-router-dom";

export function usePagination(
  totalPages: number,
  setCurrentPage: (v: string) => void
) {
  const [searchParams] = useSearchParams("");
  const currentPage = searchParams.get("page") || "1";
  const toNumber = (value: string | number): number => +value;

  function handlePrevPage() {
    const current = toNumber(currentPage);
    if (current > 1) {
      setCurrentPage(String(current - 1));
    }
  }

  function handleNextPage() {
    const current = toNumber(currentPage);
    if (current < totalPages) {
      setCurrentPage(String(current + 1));
    }
  }

  function handlePageClick(page: string | number) {
    const pageStr = String(page);
    if (!isNaN(toNumber(pageStr))) {
      setCurrentPage(pageStr);
    }
  }

  function visiblePageNumbers(total: number, current: string, limit = 9) {
    const quantityPages = Array.from({ length: total }, (_, i) =>
      String(i + 1)
    );
    const currentIndex = quantityPages.indexOf(current);

    let visibleNumbers = quantityPages.slice(
      Math.max(0, currentIndex - Math.floor(limit / 2))
    );
    if (visibleNumbers.length > 0) {
      if (visibleNumbers.length > limit) {
        visibleNumbers = visibleNumbers.slice(0, limit);
      } else {
        visibleNumbers = quantityPages.slice(-limit);
      }

      if (visibleNumbers[0] !== "1") {
        visibleNumbers[0] = "1";
        visibleNumbers[1] = "...";
      }

      const lastPage = String(quantityPages[quantityPages.length - 1]);
      if (visibleNumbers[visibleNumbers.length - 1] !== lastPage) {
        visibleNumbers[visibleNumbers.length - 1] = lastPage;
        visibleNumbers[visibleNumbers.length - 2] = "...";
      }
    }
    return visibleNumbers;
  }

  const visiblePages = visiblePageNumbers(totalPages, currentPage);

  return {
    currentPage,
    visiblePages,
    handlePrevPage,
    handleNextPage,
    handlePageClick,
  };
}
