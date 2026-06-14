import { Redirect } from "@docusaurus/router";

// La raíz del sitio redirige al primer doc de "Proyecto".
// Con routeBasePath: "/" los docs están en /, no en /docs/.
export default function Home() {
  return <Redirect to="/proyecto/intro" />;
}
