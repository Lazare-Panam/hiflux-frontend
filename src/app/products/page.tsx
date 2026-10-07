import type { Metadata } from "next";
import ProductsPageClient from "./ProductsPageClient";

const TITLE = "High-Pressure Valves, Fittings, Tubing & Regulators | Hiflux UK";
const DESCRIPTION =
  "Browse HIFLUX high-pressure valves, fittings, tubing, unions, adapters and regulators by category. Certification copies on request; request a quote online.";
const URL = "https://www.hiflux.uk.com/products";

// Own canonical and social tags (previously inherited the homepage's).
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { type: "website", siteName: "Hiflux UK", title: TITLE, description: DESCRIPTION, url: URL },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
