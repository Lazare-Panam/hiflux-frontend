import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop High-Pressure Valves, Fittings & Tubing | Hiflux UK",
  description:
    "Shop high-pressure valves, fittings, tubing and flow-control components from Hiflux UK — rated up to 150,000 psi in 316 stainless steel for industrial, energy and hydrogen service.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
