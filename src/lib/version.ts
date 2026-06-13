// Versión de la app, inyectada en build time desde package.json (ver next.config.ts).
// En dev local sin build previo aparece "dev" como fallback.
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? "dev";
