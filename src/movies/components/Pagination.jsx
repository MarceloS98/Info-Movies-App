import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Pagination = ({ totalPages = 1, currentPage, q }) => {
  const calculatePaginationStart = () => {
    if (totalPages - currentPage < 4) {
      totalPages - 9 > 0 ? totalPages - 9 : 1;
    }
    return currentPage - 5 >= 1 ? currentPage - 5 : 1;
  };

  const [paginationStart, setPaginationStart] = useState(
    calculatePaginationStart()
  );

  useEffect(() => {
    if (totalPages - currentPage < 4) return;

    currentPage - 5 >= 1
      ? setPaginationStart(currentPage - 5)
      : setPaginationStart(1);
  }, [currentPage]);

  const navigate = useNavigate();

  const pagesRange = (start = paginationStart, stop = start + 9, step = 1) => {
    if (stop > totalPages) stop = totalPages;

    const paginas = Array.from(
      { length: (stop - start) / step + 1 },
      (_, index) => start + index * step
    );

    return paginas;
  };

  const handlePageChange = (page, index) => {
    q ? navigate(`?q=${q}&page=${page}`) : navigate(`?page=${page}`);

    if (totalPages - page <= 3) {
      setPaginationStart(totalPages - 9 > 0 ? totalPages - 9 : 1);
    } else if (index > 5) {
      setPaginationStart(page - 5);
    } else if (page - 5 <= 1) {
      setPaginationStart(1);
    }
  };

  const isActive = (page) => {
    const match = currentPage == page;
    const className =
      "w-10 shrink-0 rounded-md py-1 text-center text-white hover:bg-gray-700";
    return match ? `${className} bg-red-500` : `${className} bg-gray-700 `;
  };

  return (
    <>
      <div className="mt-10 flex flex-wrap justify-center gap-3 md:container">
        {pagesRange().map((page, index) => {
          return (
            <button
              key={page}
              className={isActive(page)}
              onClick={() => handlePageChange(page, index)}
            >
              {page}
            </button>
          );
        })}
      </div>
    </>
  );
};
