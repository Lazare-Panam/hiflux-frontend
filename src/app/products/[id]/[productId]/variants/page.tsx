import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductVariants } from "@/api/useProductVariants";
import VariantsBrowser from "./components/VariantsBrowser";

type Props = { params: Promise<{ id: string; productId: string }> };

function humanizeCategory(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  const data = await getProductVariants(productId).catch(() => null);
  if (!data) return { title: "Product Models | Hiflux UK" };

  const count = data.variants?.length ?? 0;
  const title = `${data.name} — Models & Specifications | Hiflux UK`;
  const description = `Compare ${count} model${count !== 1 ? "s" : ""} of the ${data.name} from Hiflux UK — full specifications, pressure ratings and materials for high-pressure flow control.`;
  return { title, description };
}

export default async function ProductVariantsPage({ params }: Props) {
  const { id, productId } = await params;

  const data = await getProductVariants(productId).catch(() => null);
  if (!data) notFound();

  return <VariantsBrowser data={data} category={humanizeCategory(id)} />;
}
