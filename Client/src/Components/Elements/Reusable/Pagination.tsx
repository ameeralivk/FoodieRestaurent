import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex items-center gap-4 mt-4">
      {/* Prev Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-4 py-1 rounded-lg border transition
          ${
            currentPage === 1
              ? "bg-gray-700 text-gray-500 border-gray-600 cursor-not-allowed"
              : "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          }
        `}
      >
        Prev
      </button>

      {/* ONLY ONE PAGE BOX */}
      <div className="px-4 py-1 rounded-lg bg-amber-600 border border-amber-700 text-white font-bold">
        {currentPage} / {totalPages}
      </div>

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-4 py-1 rounded-lg border transition
          ${
            currentPage === totalPages
              ? "bg-gray-700 text-gray-500 border-gray-600 cursor-not-allowed"
              : "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          }
        `}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
