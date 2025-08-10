"use client";
import Image from "next/image";

export default function NosotrosPage() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-400 py-16 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Sobre Nosotros</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Somos una inmobiliaria comprometida en ayudarte a encontrar el hogar
          de tus sueños, con transparencia, confianza y pasión por lo que
          hacemos.
        </p>
      </section>

      {/* Historia */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <Image
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
            alt="Nuestra oficina"
            width={600}
            height={400}
            className="rounded-lg shadow-md object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Nuestra Historia</h2>
          <p className="mb-4">
            Desde 2010 hemos ayudado a cientos de familias a encontrar su lugar
            ideal para vivir. Nos especializamos en la venta y arriendo de
            propiedades en las principales ciudades de Colombia.
          </p>
          <p>
            Nuestro compromiso es ofrecerte un servicio personalizado,
            acompañándote en cada paso del proceso para que la experiencia sea
            segura, ágil y satisfactoria.
          </p>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-8">
            Nuestros Valores
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
              <span className="text-4xl">🤝</span>
              <h3 className="text-xl font-semibold mt-4">Confianza</h3>
              <p>Construimos relaciones basadas en la transparencia.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
              <span className="text-4xl">⚡</span>
              <h3 className="text-xl font-semibold mt-4">Eficiencia</h3>
              <p>Procesos rápidos y efectivos para tu comodidad.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
              <span className="text-4xl">💡</span>
              <h3 className="text-xl font-semibold mt-4">Innovación</h3>
              <p>Usamos tecnología para mejorar tu experiencia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Nuestro Equipo</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { nombre: "María Pérez", cargo: "Gerente General" },
            { nombre: "Carlos Gómez", cargo: "Asesor Comercial" },
            { nombre: "Laura Torres", cargo: "Marketing" },
            { nombre: "Juan Rodríguez", cargo: "Ventas" },
          ].map((persona, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 text-center"
            >
              <Image
                src={`https://randomuser.me/api/portraits/${
                  i % 2 === 0 ? "women" : "men"
                }/${i + 10}.jpg`}
                alt={persona.nombre}
                width={120}
                height={120}
                className="rounded-full mx-auto object-cover"
              />
              <h3 className="text-lg font-bold mt-4">{persona.nombre}</h3>
              <p className="text-sm text-gray-500">{persona.cargo}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
