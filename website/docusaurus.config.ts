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
          href: APP_URL,
          label: "Ir a la app",
          position: "right",
        },
        {
          href: "https://github.com/roshve/ludema",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            { label: "Arquitectura", to: "/proyecto/arquitectura" },
            { label: "Contribuir", to: "/proyecto/contribuir" },
            { label: "Modelo de contenido", to: "/proyecto/modelo-de-contenido" },
          ],
        },
        {
          title: "Materias",
          items: [
            { label: "Lógica — Introducción", to: "/logica/intro" },
            { label: "Lógica Proposicional", to: "/logica/logica-proposicional" },
            { label: "Tablas de Verdad", to: "/logica/tablas-de-verdad" },
          ],
        },
        {
          title: "Más",
          items: [
            { label: "App Ludema", href: APP_URL },
            { label: "GitHub", href: "https://github.com/roshve/ludema" },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Ludema. Construido con Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["typescript", "bash"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
