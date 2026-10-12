import { getCatalog } from "@/api/useProductCatalog";
import { getProductVariants } from "@/api/useProductVariants";
import { CATEGORIES } from "@/app/products/data/categories";
import ShopClient, { type ShopItem } from "./ShopClient";

// The shop lists every model in the product database: priced ones can be
// bought online, the rest are quoted on request. Rebuilt at most once an hour (ISR), so new
// prices appear without a deploy.
export const revalidate = 3600;

const PART_KEYS = ["SKU", "Catalog No", "Product Code", "Part Number", "Model"];
const HIDDEN = new Set([...PART_KEYS, "Price"]);

async function loadItems(): Promise<ShopItem[]> {
  const perCategory = await Promise.all(
    CATEGORIES.map(async (cat) => {
      const catalog = await getCatalog(cat.id).catch(() => null);
      const series = await Promise.all(
        (catalog?.products ?? []).map(async (p) => {
          const data = await getProductVariants(p.id).catch(() => null);
          return (data?.variants ?? []).flatMap((v): ShopItem[] => {
            const n = Number(String(v.specs["Price"] ?? "").replace(/[£,]/g, ""));
            // Unpriced models are listed too, as "price on request".
            const price = n > 0 ? n : null;
            const part = PART_KEYS.map((k) => v.specs[k]).find(Boolean) ?? v.id.toUpperCase();
            return [
              {
                id: `${p.id}/${v.id}`,
                part,
                urlId: v.specs["SKU"] ?? v.id,
                price,
                category: cat.id,
                categoryLabel: cat.label,
                series: p.id,
                seriesName: p.name,
                image: data?.thumbnailImage || p.thumbnailImage,
                specs: Object.entries(v.specs).filter(([k, val]) => !HIDDEN.has(k) && val) as [string, string][],
              },
            ];
          });
        }),
      );
      return series.flat();
    }),
  );
  return perCategory.flat();
}

export default async function ShopPage() {
  const items = await loadItems();
  return <ShopClient items={items} />;
}
