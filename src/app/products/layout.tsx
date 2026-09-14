import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "High-Pressure Valves, Fittings, Tubing & Regulators | Hiflux UK",
  description:
    "Browse the Hiflux UK range of high-pressure valves, fittings, tubing, unions, adapters and regulators — rated up to 150,000 psi for industrial, energy and hydrogen applications.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
