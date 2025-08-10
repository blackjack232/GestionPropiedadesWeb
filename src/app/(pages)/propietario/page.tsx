"use client";
import Owner from "@/models/owner";
import Propietario from "@/models/owner";

import { useEffect, useState } from "react";


export default function OwnersPage() {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [form, setForm] = useState({ id: "", name: "", address: "", photo: null as File | null });

  const fetchOwners = async () => {
    try {
      const res = await fetch("/api/owners");
      const data = await res.json();
      setOwners(data);
    } catch (error) {
      console.error("Error al obtener propietarios", error);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("address", form.address);
    if (form.photo) formData.append("photo", form.photo);

    const method = form.id ? "PUT" : "POST";
    const url = form.id ? `/api/owners/${form.id}` : `/api/owners`;

    const res = await fetch(url, {
      method,
      body: formData,
    });

    if (res.ok) {
      fetchOwners();
      setForm({ id: "", name: "", address: "", photo: null });
    }
  };

  const handleEdit = (owner: Propietario) => {
    setForm({ id: owner.id, name: owner.name, address: owner.address, photo: null });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este propietario?")) return;

    const res = await fetch(`/api/owners/${id}`, {
      method: "DELETE",
    });

    if (res.ok) fetchOwners();
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Gestión de Propietarios</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Nombre"
          required
          className="bg-gray-800 text-white p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Dirección"
          required
          className="bg-gray-800 text-white p-2 rounded"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          className="text-white"
          onChange={(e) => setForm({ ...form, photo: e.target.files?.[0] || null })}
        />
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded font-medium col-span-full md:col-auto"
        >
          {form.id ? "Actualizar" : "Crear"}
        </button>
      </form>

      {/* Lista de propietarios */}
      <div className="grid md:grid-cols-3 gap-6">
        {owners.map((owner) => (
          <div key={owner.id} className="bg-gray-800 p-4 rounded shadow">
            {owner.photoUrl && (
              <img
                src={owner.photoUrl}
                alt={owner.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}
            <h3 className="text-xl font-bold text-yellow-400">{owner.name}</h3>
            <p>{owner.address}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEdit(owner)}
                className="bg-yellow-400 hover:bg-yellow-300 text-black px-3 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(owner.id)}
                className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
