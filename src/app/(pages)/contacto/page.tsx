"use client";
import { useState } from "react";
import Image from "next/image";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.");
    setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-20 text-center text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contacta a Million Real Estate</h1>
          <p className="text-xl md:text-2xl">
            Estamos aquí para ayudarte a encontrar la propiedad de tus sueños
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        {/* Formulario */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-900">Envía un mensaje</h2>
          <form onSubmit={handleSubmit} className="space-y-6 text-gray-700">
            <div>
              <label className="block text-gray-700 mb-2">Nombre completo</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Mensaje</label>
              <textarea
                name="mensaje"
                rows={5}
                value={formData.mensaje}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>

        {/* Información de Contacto */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-blue-900">Nuestra información</h2>
          
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Oficina Principal</h3>
                <p className="text-gray-600">Carrera 15 #88-64, Bogotá, Colombia</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Teléfono</h3>
                <p className="text-gray-600">+57 1 123 4567</p>
                <p className="text-gray-500 text-sm">Lunes a Viernes: 8am - 6pm</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Correo electrónico</h3>
                <p className="text-gray-600">contacto@millionrealestate.com</p>
                <p className="text-gray-600">soporte@millionrealestate.com</p>
              </div>
            </div>

            {/* <div className="pt-4">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Síguenos</h3>
              <div className="flex space-x-4">
                {['facebook', 'instagram', 'linkedin'].map((red) => (
                  <a 
                    key={red} 
                    href="#" 
                    className="bg-gray-100 hover:bg-blue-100 p-3 rounded-full transition"
                    aria-label={red}
                  >
                    <Image 
                      src={`/${red}-icon.svg`} 
                      alt={red} 
                      width={24} 
                      height={24} 
                      className="text-blue-800"
                    />
                  </a>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}