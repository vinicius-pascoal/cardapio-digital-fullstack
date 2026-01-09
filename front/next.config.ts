import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Desabilita telemetria
  telemetry: {
    enabled: false,
  },
};

export default nextConfig;
