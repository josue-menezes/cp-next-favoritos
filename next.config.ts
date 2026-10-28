import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Libera as imagens da DummyJSON para o componente <Image /> do Next
  images: {
    remotePatterns: [new URL("https://cdn.dummyjson.com/**")],
  },
  // Tailwind v4 via loader do Turbopack (mesmo setup da aula)
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
