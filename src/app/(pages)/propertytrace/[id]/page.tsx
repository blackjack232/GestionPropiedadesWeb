"use client";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Trace } from "@/models/trace";

import { getPropertyTrace } from "@/services/propertyService";
import BackButton from "@/components/BackButton";

export default function PropertyTracePage() {
  const { id } = useParams();
  const [traces, setTraces] = useState<Trace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    window.scrollTo(0, 0);

    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getPropertyTrace(id as string);
        setTraces(data?.data);
      } catch (err) {
        setError("No se pudo cargar el historial.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">
          Historial de la Propiedad #{id}
        </h1>

        {loading && <p>Cargando...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && traces.length === 0 && <p>No hay registros.</p>}

        {!loading && traces.length > 0 && (
          <table className="min-w-full border border-gray-200">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Valor</th>
                <th className="px-4 py-3">Impuesto</th>
                <th className="px-4 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {traces.map((t) => (
                <tr key={t.idPropertyTrace}>
                  <td className="px-4 py-3">
                    {new Date(t.dateSale).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{t.name}</td>
                  <td className="px-4 py-3">
                    {t.value.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    {t.tax.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </td>
                  <td className="px-4 py-3 font-bold">
                    {(t.value + t.tax).toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="mt-8">
            <BackButton href={`/propiedad/${id}`} label="Volver al detalle" className="flex"/>
        </div>
      </div>
    </div>
  );
}
