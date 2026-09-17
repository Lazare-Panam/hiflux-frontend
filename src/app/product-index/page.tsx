import type { Metadata } from "next";
import { getCatalog } from "@/api/useProductCatalog";
import { getProductVariants } from "@/api/useProductVariants";
import { blogs } from "../news/data/blogs";
import styles from "./product-index.module.css";

const PAGE_URL = "https://www.hiflux.uk.com/product-index";

// Top-level categories, matching next-sitemap.config.js and the footer.
const CATALOGS: { id: string; label: string }[] = [
  { id: "high-pressure-valves", label: "High-Pressure Valves" },
  { id: "high-pressure-fittings", label: "High-Pressure Fittings" },
  { id: "high-pressure-tubing", label: "High-Pressure Tubing" },
  { id: "union-adapters", label: "Union Adapters" },
  { id: "high-pressure-regulators", label: "High-Pressure Regulators" },
];

export const metadata: Metadata = {
  title: "Product Index — All Models & Specifications | Hiflux UK",
  description:
    "Complete index of every Hiflux high-pressure valve, fitting, tubing, adapter and regulator series and model available from Hiflux UK, with links to full specifications for each SKU.",
  alternates: { canonical: PAGE_URL },
};

type IndexedProduct = { id: string; name: string; skus: string[] };
type IndexedCategory = { id: string; label: string; products: IndexedProduct[] };

/**
 * Server-rendered HTML index (site map) of the whole catalogue. Emits a real
 * <a href> for every category page, product series listing and individual SKU
 * variant page, plus the news articles — giving each of those pages an
 * additional internal inbound link (SE Ranking flagged many as having only
 * one). Linked from the footer site-wide so this hub itself carries authority.
 *
 * Each API call is guarded independently: a failure degrades to omitting that
 * branch rather than failing the page build.
 */
async function buildIndex(): Promise<IndexedCategory[]> {
  return Promise.all(
    CATALOGS.map(async (cat) => {
      try {
        const catalog = await getCatalog(cat.id);
        const products = await Promise.all(
          (catalog.products ?? []).map(async (p): Promise<IndexedProduct> => {
            try {
              const data = await getProductVariants(p.id);
              const skus = (data.variants ?? []).map(
                (v) => v.specs?.["SKU"] ?? v.id,
              );
              return { id: p.id, name: p.name, skus };
            } catch {
              return { id: p.id, name: p.name, skus: [] };
            }
          }),
        );
        return { ...cat, products };
      } catch {
        return { ...cat, products: [] };
      }
    }),
  );
}

export default async function ProductIndexPage() {
  const categories = await buildIndex();

  return (
    <div className={styles.wrap}>
      <h1 className={styles.h1}>Product Index</h1>
      <p className={styles.intro}>
        Every Hiflux high-pressure product we supply in the UK — browse by
        category and series, or jump straight to the specifications for an
        individual model.
      </p>

      {categories.map((cat) =>
        cat.products.length === 0 ? null : (
          <section key={cat.id} className={styles.category}>
            <h2 className={styles.catHeading}>
              <a href={`/products/${cat.id}`}>{cat.label}</a>
            </h2>

            {cat.products.map((product) => (
              <div key={product.id} className={styles.product}>
                <h3 className={styles.productHeading}>
                  <a href={`/products/${cat.id}/${product.id}/variants`}>
                    {product.name}
                  </a>{" "}
                  {product.skus.length > 0 && (
                    <span className={styles.count}>
                      ({product.skus.length} model
                      {product.skus.length !== 1 ? "s" : ""})
                    </span>
                  )}
                </h3>
                {product.skus.length > 0 && (
                  <div className={styles.skuGrid}>
                    {product.skus.map((sku) => (
                      <a
                        key={sku}
                        className={styles.sku}
                        href={`/products/${cat.id}/${product.id}/variants/${sku}`}
                      >
                        {sku}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        ),
      )}

      {blogs.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Latest News</h2>
          <div className={styles.linkList}>
            {blogs.map((blog) => (
              <a
                key={blog.slug}
                className={styles.newsLink}
                href={`/news/${blog.slug}`}
              >
                {blog.title}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
