import React from "react";

interface PaginadorProps {
  loading: boolean;
  pageNumber: number;
  totalPages: number;
  handlePrev: () => void;
  handleNext: () => void;
}

export function Paginator({
  loading,
  pageNumber,
  totalPages,
  handlePrev,
  handleNext,
}: PaginadorProps) {
  if (loading || totalPages < 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-8 bg-transparent p-4">
      <button
        onClick={handlePrev}
        disabled={pageNumber === 1}
        className={`px-4 py-2 rounded-md ${
          pageNumber === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        } transition-colors`}
      >
        Anterior
      </button>
      
      <span className="text-gray-700 font-medium">
        Página {pageNumber} de {totalPages}
      </span>
      
      <button
        onClick={handleNext}
        disabled={pageNumber === totalPages}
        className={`px-4 py-2 rounded-md ${
          pageNumber === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        } transition-colors`}
      >
        Siguiente
      </button>
    </div>
  );
}