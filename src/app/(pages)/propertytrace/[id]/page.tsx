"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Trace {
  idPropertyTrace: string;
  dateSale: string;
  name: string;
  value: number;
  tax: number;
  idProperty: string;
}

export default function PropertyTracePage() {
  const { id } = useParams();
  const [traces, setTraces] = useState<Trace[]>([]);

  useEffect(() => {
    // Reiniciar scroll arriba
    window.scrollTo(0, 0);

    // Datos quemados de ejemplo
    setTraces([
      {
        idPropertyTrace: "1",
        dateSale: "2023-05-01",
        name: "Venta inicial",
        value: 1200000000,
        tax: 50000000,
        idProperty: id as string,
      },
      {
        idPropertyTrace: "2",
        dateSale: "2024-01-15",
        name: "Cambio de precio",
        value: 1300000000,
        tax: 0,
        idProperty: id as string,
      },
      {
        idPropertyTrace: "3",
        dateSale: "2024-08-10",
        name: "Arriendo anual",
        value: 6000000,
        tax: 0,
        idProperty: id as string,
      },
    ]);
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6 text-gray-800">
        {/* Título */}
        <h1 className="text-3xl font-bold mb-6">
          Historial de la Propiedad #{id}
        </h1>

        {/* Tabla estilizada */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse border border-gray-200">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="px-4 py-3 border border-gray-200 text-left rounded-tl-lg">
                  Fecha de Venta
                </th>
                <th className="px-4 py-3 border border-gray-200 text-left">
                  Nombre
                </th>
                <th className="px-4 py-3 border border-gray-200 text-left">
                  Valor
                </th>
                <th className="px-4 py-3 border border-gray-200 text-left">
                  Impuesto
                </th>
                <th className="px-4 py-3 border border-gray-200 text-left rounded-tr-lg">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {traces.map((t, i) => {
                const total = t.value + t.tax;
                return (
                  <tr
                    key={i}
                    className="hover:bg-gray-100 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 border border-gray-200">
                      {new Date(t.dateSale).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 border border-gray-200 font-medium">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          t.name.toLowerCase().includes("venta")
                            ? "bg-green-100 text-green-700"
                            : t.name.toLowerCase().includes("arriendo")
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {t.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 border border-gray-200 text-green-600 font-semibold">
                      {t.value.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                      })}
                    </td>
                    <td className="px-4 py-3 border border-gray-200 text-red-500 font-semibold">
                      {t.tax.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                      })}
                    </td>
                    <td className="px-4 py-3 border border-gray-200 font-bold">
                      {total.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Botón volver */}
        <div className="mt-8">
          <Link
            href={`/propiedad/${id}`}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded shadow-md transition"
          >
            ⬅ Volver al detalle
          </Link>
        </div>
      </div>
    </div>
  );
}
