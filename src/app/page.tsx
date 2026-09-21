import type { Metadata } from "next";
import ContactCTA from "./Landing/ContactCTA";
import FeaturedProducts from "./Landing/FeaturedProducts";
import Hero from "./Landing/Hero";
import HeaMembership from "./Landing/HeaMembership";
import HifluxSection from "./Landing/HifluxSection";
import TrustBar from "./Landing/TrustBar";
import ProductRange from "./Landing/ProductRange";
import Certification from "./Landing/Certification";
import IndustriesSection from "./Landing/IndustryApplications";

const TITLE = "High-Pressure Valves & Fittings to 150,000 psi | Hiflux UK";
const DESCRIPTION =
  "Exclusive UK & EU distributor for HIFLUX Co., Ltd of Daejeon. Ultra high-pressure valves, fittings and tubing rated to 150,000 psi. UK stock and support.";
const URL = "https://www.hiflux.uk.com";
const OG_IMAGE =
  "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/logo.png";

// Home-specific metadata. Overrides the generic site defaults in layout.tsx so
// other pages keep their own fallback title/description.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    siteName: "Hiflux UK",
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    locale: "en_GB",
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HifluxSection />
      <ProductRange />
      <FeaturedProducts />
      <IndustriesSection />
      <Certification />
      <HeaMembership />
      <ContactCTA />
    </>
  );
}
