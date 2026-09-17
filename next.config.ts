import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "pblol2.blob.core.windows.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
    ],
  },
  async redirects() {
    return [
      // The product API uses catalogId "regulators", but the canonical category
      // slug across the site is "high-pressure-regulators". Permanently redirect
      // the alias so the duplicate /products/regulators/... URLs collapse to one.
      {
        source: "/products/regulators/:path*",
        destination: "/products/high-pressure-regulators/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
