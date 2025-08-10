"use client";


export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-20 text-center text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Términos y Condiciones</h1>
          <p className="text-xl md:text-2xl">
            Conoce los términos que rigen nuestro servicio
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 ">
        <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 ">1. Aceptación de los Términos</h2>
            <p className="mb-6 text-gray-500">
              Al acceder y utilizar los servicios de Million Real Estate, usted acepta cumplir con estos términos y condiciones, así como con nuestra política de privacidad.
            </p>

            <h2 className="text-2xl font-bold text-blue-900 mb-6">2. Uso del Servicio</h2>
            <p className="mb-4 text-gray-500">
              Nuestra plataforma está diseñada para facilitar la búsqueda, compra, venta y arrendamiento de propiedades. Usted acepta:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-500">
              <li>Proporcionar información veraz y actualizada</li>
              <li>No utilizar nuestros servicios para actividades ilegales</li>
              <li>Respetar los derechos de propiedad intelectual</li>
              <li>No realizar actividades que puedan dañar nuestros sistemas</li>
            </ul>

            <h2 className="text-2xl font-bold text-blue-900 mb-6">3. Propiedad Intelectual</h2>
            <p className="mb-6 text-gray-500">
              Todo el contenido del sitio web, incluyendo textos, gráficos, logotipos, imágenes y software, es propiedad de Million Real Estate y está protegido por las leyes de propiedad intelectual.
            </p>

            <h2 className="text-2xl font-bold text-blue-900 mb-6">4. Limitación de Responsabilidad</h2>
            <p className="mb-6 text-gray-500">
              Million Real Estate no será responsable por daños indirectos, incidentales o consecuentes que resulten del uso o la imposibilidad de uso de nuestros servicios.
            </p>

            <h2 className="text-2xl font-bold text-blue-900 mb-6">5. Modificaciones</h2>
            <p className="mb-6 text-gray-500">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Las versiones actualizadas se publicarán en nuestro sitio web con la fecha de última actualización.
            </p>

            <h2 className="text-2xl font-bold text-blue-900 mb-6">6. Ley Aplicable</h2>
            <p className="mb-6 text-gray-500">
              Estos términos se regirán e interpretarán de acuerdo con las leyes de Colombia. Cualquier disputa estará sujeta a la jurisdicción exclusiva de los tribunales de Bogotá.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-8">
              <h3 className="text-xl font-bold text-blue-900 mb-3">¿Tienes preguntas?</h3>
              <p className="mb-4 text-gray-500">Si necesitas más información sobre nuestros términos y condiciones, no dudes en contactarnos.</p>
              <a 
                href="/contacto" 
                className="inline-block bg-blue-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-900 transition"
              >
                Contáctanos
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}