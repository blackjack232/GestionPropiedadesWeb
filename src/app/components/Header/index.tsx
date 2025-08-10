"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#0B1F3A] border-b border-gray-700 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-8 h-8 fill-yellow-400"
            >
              <path d="M32 12l20 18h-6v20h-8V36h-12v14h-8V30h-6z" />
              <path
                d="M2 30L32 4l30 26"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="stroke-yellow-400"
              />
            </svg>
            <Link
              href="/"
              className="text-xl font-bold text-yellow-400 hover:text-yellow-300 transition"
            >
              Million Real Estate
            </Link>
          </div>

          {/* Botón para móviles */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-400 focus:outline-none"
            >
              <span className="sr-only">Abrir menú</span>
              {open ? "✖" : "☰"}
            </button>
          </div>

          {/* Navegación escritorio */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="text-white hover:text-yellow-400 transition">
              Inicio
            </Link>
            <Link href="/propiedad" className="text-white hover:text-yellow-400 transition">
              Propiedades
            </Link>
            {/* <Link href="/propietarios" className="text-white hover:text-yellow-400 transition">
              Propietarios
            </Link> */}
            <Link href="/nosotros" className="text-white hover:text-yellow-400 transition">
              Nosotros
            </Link>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`md:hidden bg-[#0B1F3A] overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-40" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-4 pb-4 space-y-2">
          <Link href="/" className="text-white hover:text-yellow-400 transition">
            Inicio
          </Link>
          <Link href="/propiedad" className="text-white hover:text-yellow-400 transition">
            Propiedades
          </Link>
          {/* <Link href="/propietarios" className="text-white hover:text-yellow-400 transition">
            Propietarios
          </Link> */}
          <Link href="/nosotros" className="text-white hover:text-yellow-400 transition">
            Nosotros
          </Link>
        </div>
      </div>
    </nav>
  );
}
