import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Locale root
      { source: "/", destination: "/ru", permanent: true },
      // Pre-i18n URLs, kept alive so existing links and any indexed pages
      // land on the Russian version instead of 404ing.
      { source: "/menu", destination: "/ru/menu", permanent: true },
      { source: "/plans", destination: "/ru/plans", permanent: true },
    ];
  },
};

export default nextConfig;
