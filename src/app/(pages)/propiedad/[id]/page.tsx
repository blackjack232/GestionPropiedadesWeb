"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getOwnerById } from "@/app/lib/api/owner";

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
  imageUrls: string[];
  owner: Propietario;
}

export default function PropiedadDetalle() {
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState<Propiedad | null>(null);
  const carruselRef = useRef<HTMLDivElement>(null);

  // Estado para imagen seleccionada
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const storedData = localStorage.getItem("propiedad-seleccionada");
    if (storedData) {
      const prop = JSON.parse(storedData);

      getOwnerById(prop.idOwner)
        .then((res) => {
          setPropiedad({ ...prop, owner: res.data });
        })
        .catch((err) => {
          console.error("Error cargando propietario:", err);
          setPropiedad(prop);
        });
    }
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
        <div className="w-full flex justify-center">
          <div
            ref={carruselRef}
            className="overflow-x-auto inline-flex gap-4 pb-4"
          >
            {propiedad.imageUrls?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Imagen ${i + 1}`}
                className="w-[400px] h-[250px] object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
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
            aria-label="Volver a propiedades"
            className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded shadow-md transition"
          >
            {/* Icono flecha izquierda */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0L3.586 10l4.707-4.707a1 1 0 111.414 1.414L6.414 10l3.293 3.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M16 10a1 1 0 01-1 1H5a1 1 0 010-2h10a1 1 0 011 1z"
                clipRule="evenodd"
              />
            </svg>
            Volver a propiedades
          </Link>
        </div>

        {/* Botón historial */}
        <div className="mt-4">
          <Link
            href={`/propertytrace/${id}`}
            aria-label="Ver historial de la propiedad"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white font-semibold px-4 py-2 rounded shadow-md transition"
          >
            {/* Icono historial/clock */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v6l4 2" />
            </svg>
            Ver historial de la propiedad
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
