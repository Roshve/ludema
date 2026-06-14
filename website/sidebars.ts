import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  proyectoSidebar: [
    {
      type: "doc",
      id: "proyecto/intro",
      label: "Introducción",
    },
    {
      type: "category",
      label: "Arquitectura",
      items: [
        "proyecto/arquitectura",
        "proyecto/modelo-de-contenido",
        "proyecto/motor-de-logica",
        "proyecto/renderers-y-player",
        "proyecto/progreso-y-gating",
      ],
    },
    {
      type: "doc",
      id: "proyecto/contribuir",
      label: "Contribuir",
    },
  ],

  logicaSidebar: [
    {
      type: "doc",
      id: "logica/intro",
      label: "Introducción",
    },
    "logica/logica-proposicional",
    "logica/tablas-de-verdad",
    "logica/leyes-logicas",
    "logica/cuantificadores",
    "logica/inferencia-y-contraejemplos",
    "logica/cheatsheet",
  ],
};

export default sidebars;
