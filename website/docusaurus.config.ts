import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const APP_URL = "https://roshve.github.io/ludema/";

const config: Config = {
  title: "Ludema Docs",
  tagline: "Lógica universitaria, gamificada.",
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
      title: "Ludema Docs",
      items: [
        {
          type: "docSidebar",
          sidebarId: "proyectoSidebar",
          position: "left",
          label: "Proyecto",
        },
        {
          type: "docSidebar",
          sidebarId: "logicaSidebar",
          position: "left",
          label: "Lógica",
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
            { label: "Motor de Lógica", to: "/proyecto/motor-de-logica" },
          ],
        },
        {
          title: "Guía de Lógica",
          items: [
            { label: "Lógica Proposicional", to: "/logica/logica-proposicional" },
            { label: "Tablas de Verdad", to: "/logica/tablas-de-verdad" },
            { label: "Leyes Lógicas", to: "/logica/leyes-logicas" },
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
