"use client";

import React from "react";
import { usePaginationStore } from "../store/usePaginationStore";

const Pagination = () => {
  const { page, lastPage, setPage, nextPage, prevPage } = usePaginationStore();

  // Generate visible pages (max 5 pages shown)
  const getVisiblePages = () => {
    const pages = [];
    let start = Math.max(1, page - 2);
    let end = Math.min(lastPage, start + 4);

    if (end - start < 4) start = Math.max(1, end - 4);

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  // console.log(page);
  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center mb-10 justify-center gap-2 mt-10 select-none">
      {/* PREVIOUS BUTTON */}
      <button
        onClick={prevPage}
        disabled={page === 1}
        className={`px-3 py-1 rounded-md text-sm transition
          ${
            page === 1
              ? "bg-gray-800/60 text-gray-500 cursor-not-allowed"
              : "bg-gray-900 border border-purple-600 text-white hover:bg-gray-800"
          }
        `}
      >
        Prev
      </button>

      {/* PAGE NUMBERS */}
      <div className="flex items-center gap-2">
        {visiblePages.map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-3 py-1 rounded-md text-sm transition font-semibold
              ${
                page === num
                  ? "bg-purple-600 text-white border border-purple-400"
                  : "bg-gray-900 text-gray-300 border border-gray-700 hover:bg-gray-800 hover:text-purple-400"
              }
            `}
          >
            {num}
          </button>
        ))}
      </div>

      {/* NEXT BUTTON */}
      <button
        onClick={nextPage}
        disabled={page === lastPage}
        className={`px-3 py-1 rounded-md text-sm transition
          ${
            page === lastPage
              ? "bg-gray-800/60 text-gray-500 cursor-not-allowed"
              : "bg-gray-900 border border-purple-600 text-white hover:bg-gray-800"
          }
        `}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
