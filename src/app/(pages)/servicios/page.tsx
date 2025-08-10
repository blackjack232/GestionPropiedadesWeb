"use client";


export default function ServiciosPage() {
  const services = [
    {
      title: "Compra y Venta de Propiedades",
      description: "Te ayudamos a encontrar la propiedad perfecta o a vender tu inmueble al mejor precio del mercado.",
      icon: "🏠"
    },
    {
      title: "Arrendamiento",
      description: "Gestión profesional de arriendos para propietarios e inquilinos.",
      icon: "🔑"
    },
    {
      title: "Asesoría Jurídica",
      description: "Expertos en derecho inmobiliario para garantizar transacciones seguras.",
      icon: "⚖️"
    },
    {
      title: "Tasación Profesional",
      description: "Valoración precisa de tu propiedad con metodologías certificadas.",
      icon: "📊"
    },
    {
      title: "Administración de Propiedades",
      description: "Servicio integral para propietarios que desean delegar la gestión de sus inmuebles.",
      icon: "🏢"
    },
    {
      title: "Inversiones Inmobiliarias",
      description: "Asesoramiento especializado para maximizar el retorno de tu inversión.",
      icon: "📈"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-20 text-center text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Servicios</h1>
          <p className="text-xl md:text-2xl">
            Soluciones integrales para todas tus necesidades inmobiliarias
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="p-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-blue-900">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">¿Listo para encontrar tu propiedad ideal?</h2>
          <p className="mb-8 text-lg">Nuestros asesores están listos para ayudarte en cada paso del proceso.</p>
          <a 
            href="/contacto" 
            className="inline-block bg-white text-blue-900 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
          >
            Contáctanos
          </a>
        </div>
      </section>
    </div>
  );
}