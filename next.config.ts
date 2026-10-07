import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cap generated widths at 1920px. Without this the srcset offers 2048 and
    // 3840px versions, which crawlers fetch and flag as "Image too big".
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
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
      // Filtration pages and water-treatment posts removed Oct 2026: HIFLUX
      // Co., Ltd. doesn't make industrial filtration, so Hiflux UK doesn't sell
      // it. Permanent redirects keep existing links and rankings off a 404.
      ...[
        "/industrial-filtration-systems",
        "/industrial-strainers",
        "/magnetic-filters",
        "/news/backwashing-filter-cycles-municipal-industrial",
        "/news/high-flow-industrial-water-filter-selection-guide",
      ].map((source) => ({ source, destination: "/products", permanent: true })),
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
