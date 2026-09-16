import { Box, Container, Typography, Button } from "@mui/material";
import { getCatalog } from "@/api/useProductCatalog";

// Top-level categories, matching next-sitemap.config.js. Kept in sync manually
// because they change rarely.
const CATALOGS: { id: string; label: string }[] = [
  { id: "high-pressure-valves", label: "High-Pressure Valves" },
  { id: "high-pressure-fittings", label: "High-Pressure Fittings" },
  { id: "high-pressure-tubing", label: "High-Pressure Tubing" },
  { id: "union-adapters", label: "Union Adapters" },
  { id: "high-pressure-regulators", label: "High-Pressure Regulators" },
];

const LINK_BTN = {
  borderRadius: 0,
  textTransform: "none" as const,
  fontWeight: 600,
  fontSize: "0.85rem",
  px: 1.75,
  py: 0.75,
  color: "text.primary",
  borderColor: "rgba(0,0,0,0.15)",
  justifyContent: "flex-start",
  "&:hover": { borderColor: "primary.main", bgcolor: "rgba(0,114,188,0.04)" },
};

/**
 * Server-rendered product index. Renders a real <a href> to every product
 * series' listing page, grouped by category. Each listing page in turn links
 * to all of its individual SKU variant pages, so this section gives search
 * crawlers a clean path (About -> series -> SKU) to the whole catalogue and
 * removes orphaned variant pages from the internal-link graph.
 *
 * Each catalogue is fetched independently and guarded so a single API failure
 * (or a build with the API unreachable) degrades to hiding that group rather
 * than breaking the About page.
 */
export default async function ProductIndexSection() {
  const groups = await Promise.all(
    CATALOGS.map(async (cat) => {
      try {
        const catalog = await getCatalog(cat.id);
        return { ...cat, products: catalog.products ?? [] };
      } catch {
        return { ...cat, products: [] as { id: string; name: string }[] };
      }
    }),
  );

  const populated = groups.filter((g) => g.products.length > 0);
  if (populated.length === 0) return null;

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography
        component="h2"
        sx={{
          fontSize: { xs: "1.6rem", md: "2rem" },
          fontWeight: 800,
          color: "text.primary",
          mb: 2,
        }}
      >
        Browse the full Hiflux range
      </Typography>
      <Typography
        sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8, mb: 5 }}
      >
        Every Hiflux product series we supply in the UK. Select a series to view
        its full list of models, sizes and configurations.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {populated.map((group) => (
          <Box key={group.id}>
            <Typography
              component="h3"
              sx={{
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "primary.main",
                mb: 2,
              }}
            >
              {group.label}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 1.25,
              }}
            >
              {group.products.map((product) => (
                <Button
                  key={product.id}
                  component="a"
                  href={`/products/${group.id}/${product.id}/variants`}
                  variant="outlined"
                  sx={LINK_BTN}
                >
                  {product.name}
                </Button>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
