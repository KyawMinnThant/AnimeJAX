"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePaginationStore } from "../store/usePaginationStore";

const EpisodePagination = () => {
  const { page, lastPage, setPage, nextPage, prevPage } = usePaginationStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allPages = Array.from({ length: lastPage }, (_, i) => i + 1);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (num: number) => {
    setPage(num);
    setOpen(false);
  };

  return (
    <div className="flex items-center font-mono ml-[60px] gap-4 mt-10 select-none relative">
      {/* Prev Button */}
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

      {/* Custom dropdown */}
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="bg-gray-900 border border-purple-600 text-white px-3 py-1 rounded-md text-sm cursor-pointer w-[120px] text-left"
        >
          Page {page}
        </button>

        {open && (
          <div className="absolute mt-1 w-[120px] max-h-48 overflow-y-auto bg-gray-900 border border-purple-600 rounded-md shadow-lg z-50">
            {allPages.map((num) => (
              <div
                key={num}
                onClick={() => handleSelect(num)}
                className={`px-3 py-2 cursor-pointer select-none hover:bg-purple-600 ${
                  num === page ? "bg-purple-700 font-semibold" : ""
                }`}
              >
                Page {num}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Next Button */}
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

export default EpisodePagination;
