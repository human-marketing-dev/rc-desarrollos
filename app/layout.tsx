import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "R.C. Desarrollos — Desarrollos industriales Triple A",
  description:
    "Diseñamos, construimos y operamos parques industriales Triple A. Infraestructura de clase mundial para la nueva era de manufactura y almacenamiento en el Noreste de México y Texas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
