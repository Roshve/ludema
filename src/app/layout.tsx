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

// Los URLs de metadata.icons no reciben el basePath automáticamente:
// prefijar a mano (mismo env var que usa next.config.ts para GH Pages).
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Ludema · Aprende lógica jugando",
  description:
    "Ludema es un juego estilo Duolingo para dominar la lógica: proposiciones, tablas de verdad, leyes, cuantificadores y razonamientos.",
  icons: {
    icon: [
      { url: `${base}/favicon-16x16.png`, sizes: "16x16", type: "image/png" },
      { url: `${base}/favicon-32x32.png`, sizes: "32x32", type: "image/png" },
      {
        url: `${base}/favicon-192x192.png`,
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  manifest: `${base}/site.webmanifest`,
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
