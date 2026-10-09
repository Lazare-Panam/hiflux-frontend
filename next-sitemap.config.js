const axios = require("axios");

const API_BASE =
  "https://hiflux-api.mangobeach-29eb5614.ukwest.azurecontainerapps.io/";

// only thing hardcoded — top-level categories, which rarely change
const catalogIds = [
  "high-pressure-valves",
  "high-pressure-fittings",
  "high-pressure-tubing",
  "union-adapters",
  "high-pressure-regulators",
];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.hiflux.uk.com/",
  generateRobotsTxt: true,
  // noindex pages must not be advertised in the sitemap.
  additionalPaths: async (config) => {
    const result = [];

    for (const catalogId of catalogIds) {
      result.push(await config.transform(config, `/products/${catalogId}`));

      try {
        const { data: catalog } = await axios.get(
          `${API_BASE}api/product/${catalogId}`,
        );

        // /variants and /variants/<SKU> pages are self-canonical, so they are
        // listed alongside their series page.
        for (const product of catalog.products) {
          const base = `/products/${catalogId}/${product.id}`;
          result.push(await config.transform(config, base));
          result.push(await config.transform(config, `${base}/variants`));

          try {
            const { data: variantData } = await axios.get(
              `${API_BASE}api/product/${product.id}/variants`,
            );

            for (const variant of variantData.variants) {
              const slug = variant.specs?.["SKU"] ?? variant.id; // matches VariantDetail's lookup logic
              result.push(
                await config.transform(config, `${base}/variants/${slug}`),
              );
            }
          } catch {
            console.warn(`No variants found for ${product.id}, skipping`);
          }
        }
      } catch {
        console.warn(`Failed to fetch catalog ${catalogId}, skipping`);
      }
    }

    return result;
  },
};
