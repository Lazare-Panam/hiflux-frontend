import type { Metadata } from "next";
import { fetchCatalog, ProductCatalog } from "@/api/useProductCatalog";
import ProductCatalogPageClient from "./components/ProductCatalogPageClient";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  let data: ProductCatalog | null = null;
  try {
    data = await fetchCatalog(id);
  } catch {
    // API unreachable, or product genuinely doesn't exist — fall back
    // to generic metadata instead of crashing the whole route.
  }

  if (!data) {
    return { title: "Hiflux Valves" };
  }

  const seo = data.seo;
  const title = seo?.title ?? data.bannerTitle ?? "Hiflux Valves";
  const description = seo?.description ?? data.bannerSubtitle ?? "";
  const ogImage = seo?.ogImage ?? data.bannerImage;

  return {
    title,
    description,
    alternates: seo?.canonical ? { canonical: seo.canonical } : undefined,
    openGraph: {
      type: "website",
      siteName: "Hiflux Valves",
      title,
      description,
      url: seo?.canonical,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function ProductCatalogPage({ params }: Props) {
  const { id } = await params;
  return <ProductCatalogPageClient id={id} />;
}