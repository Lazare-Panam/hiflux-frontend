import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCatalog, ProductType } from "@/api/useProductCatalog";
import CatalogView from "./components/CatalogView";
import ProductDetailContent from "../components/ProductDetailContent";
import { getCategoryEditorial } from "../data/editorial";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const data = await getCatalog(id).catch(() => null);
  if (!data) {
    return { title: "Hiflux Valves" };
  }

  const seo = data.seo;
  // Frontend editorial overlay takes precedence for title/description/canonical
  // (the catalog API returns null seo for the overlaid categories).
  const editorial = getCategoryEditorial(id);
  const title =
    editorial?.seo?.title ?? seo?.title ?? data.bannerTitle ?? "Hiflux Valves";
  const description =
    editorial?.seo?.description ?? seo?.description ?? data.bannerSubtitle ?? "";
  const ogImage = seo?.ogImage ?? data.bannerImage;
  const canonical = editorial?.canonical ?? seo?.canonical;

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      type: "website",
      siteName: "Hiflux Valves",
      title,
      description,
      url: canonical,
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

  const data = await getCatalog(id).catch(() => null);
  if (!data) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.hiflux.uk.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://www.hiflux.uk.com/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.bannerTitle ?? id,
        item: `https://www.hiflux.uk.com/products/${id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {data.type === ProductType.Grid ? (
        <ProductDetailContent id={id} />
      ) : (
        <CatalogView data={data} id={id} />
      )}
    </>
  );
}
