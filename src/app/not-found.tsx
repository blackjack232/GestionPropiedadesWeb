"use client";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
      {/* Ícono SVG estilo casa */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24 text-yellow-500 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 9.75L12 3l9 6.75M4.5 10.5v9.75h15V10.5M8.25 21V12h7.5v9"
        />
      </svg>

      <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Lo sentimos, no encontramos la página que buscas.
      </p>

      <Link
        href="/"
        className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded shadow-md transition"
      >
        {/* Flecha SVG en lugar de emoji */}
        <span className="inline-flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Volver al Inicio
        </span>
      </Link>

      <p className="mt-8 text-sm text-gray-400">
        Million Real Estate &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
}
