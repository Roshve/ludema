// Ruta legacy /logica — redirige a /materia/logica.
// Se mantiene por compatibilidad con links externos y bookmarks.
import type { Metadata } from "next";
import { Redirect } from "@/components/ui/Redirect";

export const metadata: Metadata = { title: "Lógica y Estructuras Discretas" };

export default function LogicaPage() {
  return <Redirect to="/materia/logica" />;
}
