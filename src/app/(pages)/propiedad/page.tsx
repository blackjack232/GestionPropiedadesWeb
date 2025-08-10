"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { Property } from "@/models/property";
import { getPropertiesServer } from "@/services/propertyService";
import { Paginator } from "@/components/Paginator";


export default function PropiedadesPage() {
  const [inputs, setInputs] = useState({
    name: "",
    address: "",
    priceMin: "",
    priceMax: "",
  });

  const [loading, setLoading] = useState(false);
  const [propiedades, setPropiedades] = useState<Property[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleBuscar = async (page = 1) => {
    setLoading(true);
    try {
      const response = await getPropertiesServer({
        name: inputs.name || undefined,
        address: inputs.address || undefined,
        minPrice: inputs.priceMin ? Number(inputs.priceMin) : undefined,
        maxPrice: inputs.priceMax ? Number(inputs.priceMax) : undefined,
        pageNumber: page,
        pageSize: 10,
      });

      const {
        pageNumber: pg,
        totalPages,
        data: propiedadesArr,
      } = response.data;

      setPropiedades(propiedadesArr);
      setPageNumber(pg);
      setTotalPages(totalPages);
    } catch (err) {
      console.error("Error cargando propiedades", err);
    } finally {
      setLoading(false);
    }
  };

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    handleBuscar(pageNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="bg-gray-50 text-gray-800 min-h-screen px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Buscar Propiedades
      </h1>

      {/* Filtros */}
      <div className="bg-white p-4 rounded shadow mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          <input
            placeholder="Nombre"
            className="border p-2 rounded"
            value={inputs.name}
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          />
          <input
            placeholder="Dirección"
            className="border p-2 rounded"
            value={inputs.address}
            onChange={(e) => setInputs({ ...inputs, address: e.target.value })}
          />
          <input
            placeholder="Precio Min"
            type="number"
            className="border p-2 rounded"
            value={inputs.priceMin}
            onChange={(e) => setInputs({ ...inputs, priceMin: e.target.value })}
          />
          <input
            placeholder="Precio Max"
            type="number"
            className="border p-2 rounded"
            value={inputs.priceMax}
            onChange={(e) => setInputs({ ...inputs, priceMax: e.target.value })}
          />
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => handleBuscar(1)}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded shadow-md transition flex items-center gap-2"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Estado de carga */}
      {loading && <p className="text-center text-gray-500">Cargando...</p>}

      {/* Cards */}
      {!loading && propiedades.length === 0 && (
        <p className="text-center text-gray-500">
          No se encontraron propiedades.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {propiedades.map((prop) => (
          <Link
            href={`/propiedad/${prop.idProperty}`}
            key={prop.idProperty}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
            onClick={() => {
              localStorage.setItem(
                "propiedad-seleccionada",
                JSON.stringify(prop)
              );
            }}
          >
            <img
              src={prop.imageUrls[0] ?? "/placeholder.jpg"}
              alt={prop.name}
              className="h-56 w-full object-cover hover:scale-105 transition duration-300"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{prop.name}</h3>
              <p className="text-sm text-gray-500">{prop.address}</p>
              <p className="text-yellow-500 font-semibold mt-2">
                {prop.price.toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>

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
