"use client";
import { useState } from "react";
import Link from "next/link";

interface Propiedad {
  id: string;
  name: string;
  address: string;
  price: number;
  image: string;
}

export default function PropiedadesPage() {
  const [inputs, setInputs] = useState({
    name: "",
    address: "",
    priceMin: "",
    priceMax: "",
  });

  const [filters, setFilters] = useState(inputs);

  // 🔥 Datos quemados de ejemplo
  const propiedades: Propiedad[] = [
    {
      id: "1",
      name: "Casa Moderna en Bogotá",
      address: "Calle 123 #45-67, Bogotá",
      price: 1200000000,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "2",
      name: "Apartamento en Medellín",
      address: "Cra 45 #10-20, Medellín",
      price: 850000000,
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "3",
      name: "Finca en Nariño",
      address: "Vereda El Carmen, Nariño",
      price: 600000000,
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "4",
      name: "Penthouse en Cartagena",
      address: "Bocagrande, Cartagena",
      price: 2500000000,
      image:
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Filtrado solo cuando se presiona el botón
  const propiedadesFiltradas = propiedades.filter((p) => {
    const matchesName = p.name
      .toLowerCase()
      .includes(filters.name.toLowerCase());
    const matchesAddress = p.address
      .toLowerCase()
      .includes(filters.address.toLowerCase());
    const matchesPriceMin = filters.priceMin
      ? p.price >= parseInt(filters.priceMin)
      : true;
    const matchesPriceMax = filters.priceMax
      ? p.price <= parseInt(filters.priceMax)
      : true;

    return matchesName && matchesAddress && matchesPriceMin && matchesPriceMax;
  });

  const handleBuscar = () => {
    setFilters(inputs);
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
            onClick={handleBuscar}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded shadow-md transition flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>
            Buscar
          </button>
        </div>
      </div>

      {/* Cards */}
      {propiedadesFiltradas.length === 0 ? (
        <p className="text-center text-gray-500">
          No se encontraron propiedades.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {propiedadesFiltradas.map((prop) => (
            <Link
              href={`/propiedad/${prop.id}`}
              key={prop.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <img
                src={prop.image}
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
      )}
    </div>
  );
}
