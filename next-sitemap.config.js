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
  exclude: ["/cart"],
  additionalPaths: async (config) => {
    const result = [];

    for (const catalogId of catalogIds) {
      result.push(await config.transform(config, `/products/${catalogId}`));

      try {
        const { data: catalog } = await axios.get(
          `${API_BASE}api/product/${catalogId}`,
        );

        // Only the series page is listed: /variants and /variants/<SKU> pages
        // canonicalise to it, and a sitemap should contain canonical URLs only.
        for (const product of catalog.products) {
          result.push(
            await config.transform(config, `/products/${catalogId}/${product.id}`),
          );
        }
      } catch {
        console.warn(`Failed to fetch catalog ${catalogId}, skipping`);
      }
    }

    return result;
  },
};
