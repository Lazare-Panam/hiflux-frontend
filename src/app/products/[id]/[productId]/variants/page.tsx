import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductVariants } from "@/api/useProductVariants";
import { categorySlug } from "@/api/catalogSlug";
import VariantsBrowser from "./components/VariantsBrowser";

// Cache the rendered page (ISR): built on the first visit, then served from
// cache and regenerated in the background at most once an hour. Without this
// every request re-rendered and re-fetched the product API, which SE Ranking
// flagged as "Slow page loading speed".
export const revalidate = 3600;

// No paths are prebuilt at deploy time (there are 1,300+ SKUs); an empty list
// means each page is rendered on its first request and then cached.
export function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ id: string; productId: string }> };

function humanizeCategory(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, productId } = await params;
  const data = await getProductVariants(productId).catch(() => null);
  if (!data) return { title: "Product Models | Hiflux UK" };

  const count = data.variants?.length ?? 0;
  const title = `${data.name} — Models & Specs`;
  const description = `Compare ${count} ${data.name} model${count !== 1 ? "s" : ""} from Hiflux UK — specifications, pressure ratings and materials.`;
  const url = `https://www.hiflux.uk.com/products/${categorySlug(id)}/${productId}/variants`;
  // Self-canonical, consistent with the SKU pages (see variants/[sku]/page.tsx).
  const images = data.thumbnailImage ? [data.thumbnailImage] : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: "Hiflux UK", title, description, url, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function ProductVariantsPage({ params }: Props) {
  const { id, productId } = await params;

  const data = await getProductVariants(productId).catch(() => null);
  if (!data) notFound();

  return <VariantsBrowser data={data} category={humanizeCategory(id)} />;
}
