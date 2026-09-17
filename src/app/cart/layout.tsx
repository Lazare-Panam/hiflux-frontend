import type { Metadata } from "next";

// The cart page is a client component, so its metadata is defined here in a
// layout. (Previously the title was injected by the external SEO script, which
// has been removed — without this the cart would fall back to the site title.)
export const metadata: Metadata = {
  title: "Your Cart | Hiflux UK High-Pressure Valves & Fittings",
  description:
    "Review the high-pressure valves, fittings and tubing in your Hiflux UK cart, then request a quote or check out.",
};

export default function CartLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
