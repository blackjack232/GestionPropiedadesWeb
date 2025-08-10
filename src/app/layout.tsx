import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Million Real Estate | Compra y Venta de Propiedades",
  description:
    "Encuentra las mejores propiedades en Colombia. Casas, apartamentos, fincas y más, con fotos, precios y detalles completos.",
  icons: {
    icon: "/assets/favicon.svg",
  },
  keywords: [
    "bienes raíces",
    "casas en venta",
    "apartamentos en arriendo",
    "propiedades Colombia",
    "inmobiliaria",
  ],
  authors: [{ name: "Million Real Estate" }],
  openGraph: {
    title: "Million Real Estate",
    description:
      "Explora nuestra selección de propiedades destacadas y encuentra tu próximo hogar.",
    url: "https://tusitio.com",
    siteName: "Million Real Estate",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        width: 800,
        height: 600,
        alt: "Casa moderna en venta",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
