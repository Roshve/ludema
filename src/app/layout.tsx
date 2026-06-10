import type { Metadata } from "next";
import { Nunito, Press_Start_2P } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

// Fuente pixel para los títulos del tema arcade.
const pressStart = Press_Start_2P({
  variable: "--font-arcade",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Ludema · Aprende lógica jugando",
  description:
    "Ludema es un juego estilo Duolingo para dominar la lógica: proposiciones, tablas de verdad, leyes, cuantificadores y razonamientos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${nunito.variable} ${pressStart.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        {/* Aplica .dark antes del primer paint para evitar el flash de tema claro. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("ludema-theme");var c=document.documentElement.classList;if(t==="arcade")c.add("dark","theme-arcade");else if(t==="dark"||((t===null||t==="system")&&matchMedia("(prefers-color-scheme: dark)").matches))c.add("dark")}catch(e){}})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
