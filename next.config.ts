import type { NextConfig } from "next";
import { version } from "./package.json";

// GitHub Pages serves the site under /<repo>; set at build time by the deploy workflow.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  // Expone solo la versión al bundle del cliente; el resto de package.json no se incluye.
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
  },
};

export default nextConfig;
