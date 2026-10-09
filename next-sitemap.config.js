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
  "lok-fittings-valves",
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
          // Skip series whose detail isn't in the API yet (their page 404s).
          try {
            await axios.get(`${API_BASE}api/product/${product.id}/detail`);
          } catch {
            console.warn(`No detail for ${product.id}, skipping`);
            continue;
          }
          const base = `/products/${catalogId}/${product.id}`;
          result.push(await config.transform(config, base));

          try {
            const { data: variantData } = await axios.get(
              `${API_BASE}api/product/${product.id}/variants`,
            );

            // The models page only exists once the series has models.
            if (variantData.variants?.length) {
              result.push(await config.transform(config, `${base}/variants`));
            }
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
