"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Propietario {
  name: string;
  address: string;
  birthday: string;
  photo: string;
}

interface Propiedad {
  id: string;
  name: string;
  address: string;
  price: number;
  year: number;
  codeInternal: string;
  images: string[];
  owner: Propietario;
}

export default function PropiedadDetalle() {
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState<Propiedad | null>(null);
  const carruselRef = useRef<HTMLDivElement>(null);

  // Estado para imagen seleccionada
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (carruselRef.current) {
      carruselRef.current.scrollLeft = 0;
    }

    const propiedadDemo: Propiedad = {
      id: "1",
      name: "Casa Moderna en Bogotá",
      address: "Calle 123 #45-67, Bogotá",
      price: 1200000000,
      year: 2023,
      codeInternal: "INT-001",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      ],
      owner: {
        name: "Juan Pérez",
        address: "Calle Falsa 123, Bogotá",
        birthday: "1985-05-15",
        photo: "https://randomuser.me/api/portraits/men/32.jpg",
      },
    };

    setPropiedad(propiedadDemo);
  }, [id]);

  if (!propiedad) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-800">
          Cargando propiedad...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {propiedad.name}
        </h1>

        {/* Carrusel de imágenes */}
        <div
          ref={carruselRef}
          className="relative w-full overflow-x-auto flex gap-4 pb-4"
        >
          {propiedad.images?.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Imagen ${i + 1}`}
              className="w-[400px] h-[250px] object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* Datos principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              Información de la propiedad
            </h2>
            <p className="text-gray-700">
              <strong>Dirección:</strong> {propiedad.address}
            </p>
            <p className="text-gray-700">
              <strong>Precio:</strong>{" "}
              {propiedad.price.toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
              })}
            </p>
            <p className="text-gray-700">
              <strong>Año:</strong> {propiedad.year}
            </p>
            <p className="text-gray-700">
              <strong>Código Interno:</strong> {propiedad.codeInternal}
            </p>
          </div>

          {/* Información del propietario */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              Propietario
            </h2>
            <div className="flex items-center gap-4">
              <img
                src={propiedad.owner.photo}
                alt={propiedad.owner.name}
                className="w-20 h-20 rounded-full object-cover border"
              />
              <div>
                <p className="text-gray-700">
                  <strong>Nombre:</strong> {propiedad.owner.name}
                </p>
                <p className="text-gray-700">
                  <strong>Dirección:</strong> {propiedad.owner.address}
                </p>
                <p className="text-gray-700">
                  <strong>Fecha de nacimiento:</strong>{" "}
                  {new Date(propiedad.owner.birthday).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botón volver */}
        <div className="mt-8">
          <Link
            href="/propiedad"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded shadow-md transition"
          >
            ⬅ Volver a propiedades
          </Link>
        </div>
        {/* Botón historial */}
        <div className="mt-4">
          <Link
            href={`/propertytrace/${propiedad.id}`}
            className="bg-slate-900 hover:bg-slate-700 text-white font-semibold px-6 py-2 rounded shadow-md transition"
          >
            📜 Ver historial de la propiedad
          </Link>
        </div>
      </div>

      {/* Modal de imagen */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Vista ampliada"
              className="max-w-[90vw] max-h-[80vh] object-contain transition-transform duration-300 hover:scale-110"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-2xl font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
