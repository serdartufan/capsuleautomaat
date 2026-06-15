import type { NextConfig } from "next";

const BASE_PATH = "/richard";

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
  // Beschikbaar in de client (o.a. voor fetch-aanroepen naar /api).
  env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "capsuleautomaat.nl",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
