"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Property } from "../models/property";
import { getPropertiesServer } from "../services/propertyService";
import { HERO_IMAGES } from "../config/Constants";
import { Paginator } from "@/components/Paginator";

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleBuscar = async (page = 1) => {
    setLoading(true);
    try {
      const response = await getPropertiesServer({
        pageNumber: page,
        pageSize: 10,
      });

      const {
        pageNumber: pg,
        totalPages,
        data: propiedadesArr,
      } = response.data;
      setFeaturedProperties(propiedadesArr);
      setPageNumber(pg);
      setTotalPages(totalPages);
    } catch (err) {
      console.error("Error cargando propiedades", err);
    } finally {
      setLoading(false);
    }
  };
  // Cambio automático cada 5 segundos
  useEffect(() => {
    handleBuscar(pageNumber);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    if (pageNumber > 1) {
      handleBuscar(pageNumber - 1);
    }
  };

  const handleNext = () => {
    if (pageNumber < totalPages) {
      handleBuscar(pageNumber + 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO con Slider */}
      <div className="relative h-[70vh] overflow-hidden">
        <div
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {HERO_IMAGES.map((img, idx) => (
            <div
              key={idx}
              className="w-full flex-shrink-0 h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${img})` }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-6">
                <h1 className="text-3xl md:text-6xl font-bold mb-4 text-center drop-shadow-lg">
                  Bienvenido a Million Real Estate
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-center">
                  Encuentra las mejores propiedades, administra propietarios e
                  imágenes con facilidad y estilo.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/propiedad"
                    className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded shadow-md transition transform hover:scale-105 flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-black"
                    >
                      <path d="M12 3l10 9h-3v9h-6v-6H11v6H5v-9H2l10-9z" />
                    </svg>
                    Buscar Propiedades
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicadores */}
        <div className="absolute bottom-4 w-full flex justify-center gap-2 z-20">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full ${
                idx === currentIndex ? "bg-yellow-500" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* PROPIEDADES DESTACADAS */}
      <section className="bg-white py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Propiedades Destacadas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {featuredProperties.map((prop, i) => (
            <Link
              key={i}
              href={`/propiedad/${prop.idProperty}`} // Redirige a detalles
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-105"
              onClick={() => {
                localStorage.setItem(
                  "propiedad-seleccionada",
                  JSON.stringify(prop)
                );
              }}
            >
              <div className="relative group">
                <div className="relative">
                  <span className="absolute top-2 left-2 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                    ⭐ Destacada
                  </span>
                </div>
                <img
                  src={prop.imageUrls[0] ?? "/placeholder.jpg"}
                  alt={prop.name}
                  className="h-56 w-full object-cover group-hover:opacity-90 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-lg font-semibold">
                  Ver detalles
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{prop.name}</h3>
                <p className="text-yellow-500 font-semibold">
                  {prop.price.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {/* Paginación */}
      <Paginator
        loading={loading}
        pageNumber={pageNumber}
        totalPages={totalPages}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
    </div>
  );
}
