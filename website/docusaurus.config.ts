import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const APP_URL = "https://roshve.github.io/ludema/";

const config: Config = {
  title: "Ludema Docs",
  tagline: "Gamificá cualquier materia universitaria.",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  // GitHub Pages: la app vive en /ludema, los docs en /ludema/docs/
  url: "https://roshve.github.io",
  baseUrl: "/ludema/docs/",

  organizationName: "roshve",
  projectName: "ludema",
  trailingSlash: true,

  onBrokenLinks: "throw",

  // Módulo arcade: se inyecta en el cliente para crear el botón de toggle
  clientModules: ["./src/js/arcade-toggle.js"],

  headTags: [
    {
      tagName: "link",
      attributes: { rel: "preconnect", href: "https://fonts.googleapis.com" },
    },
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: "anonymous",
      },
    },
    // Script pre-paint: restaura el tema arcade antes del primer render (evita FOUC)
    {
      tagName: "script",
      attributes: {},
      innerHTML: `try{if(localStorage.getItem("ludema-docs-arcade")==="1")document.documentElement.classList.add("theme-arcade")}catch(e){}`,
    },
  ],

  stylesheets: [
    {
      href: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Press+Start+2P&display=swap",
      type: "text/css",
    },
  ],

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  i18n: {
    defaultLocale: "es",
    locales: ["es"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/roshve/ludema/edit/main/website/",
          routeBasePath: "/", // los docs son la raíz del sitio
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Ludema",
      logo: {
        alt: "Ludema",
        src: "img/ludema-negro.svg",
        srcDark: "img/ludema-blanco.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "proyectoSidebar",
          position: "left",
          label: "Proyecto",
        },
        {
          type: "docSidebar",
          sidebarId: "materiasSidebar",
          position: "left",
          label: "Materias",
        },
        {
          // Chip primario — estilizado como botón pill en custom.css
          href: APP_URL,
          label: "Ir a la app",
          position: "right",
          className: "navbar__cta",
        },
        {
          // Ícono GitHub — solo ícono, sin label (accesible vía aria-label)
          href: "https://github.com/roshve/ludema",
          position: "right",
          className: "header-github-link",
          "aria-label": "Repositorio en GitHub",
        },
      ],
    },
    footer: {
      style: "dark",
      logo: {
        alt: "Ludema",
        src: "img/ludema-blanco.svg",
        href: APP_URL,
        height: 36,
      },
      links: [
        {
          title: "Proyecto",
          items: [
            { label: "Introducción", to: "/proyecto/intro" },
            { label: "Arquitectura", to: "/proyecto/arquitectura" },
            { label: "Modelo de contenido", to: "/proyecto/modelo-de-contenido" },
            { label: "Contribuir", to: "/proyecto/contribuir" },
          ],
        },
        {
          title: "Lógica",
          items: [
            { label: "Introducción", to: "/logica/intro" },
            { label: "Lógica Proposicional", to: "/logica/logica-proposicional" },
            { label: "Tablas de Verdad", to: "/logica/tablas-de-verdad" },
          ],
        },
        {
          title: "Más",
          items: [
            { label: "Ir a la app", href: APP_URL, className: "footer__cta" },
            {
              label: "GitHub",
              href: "https://github.com/roshve/ludema",
              className: "footer__github-link",
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Ludema · v0.6.0 · Construido con Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["typescript", "bash"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
