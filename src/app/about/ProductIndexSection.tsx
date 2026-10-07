import { Box, Container, Typography } from "@mui/material";
import { getCatalog } from "@/api/useProductCatalog";

// Top-level categories, matching next-sitemap.config.js. Kept in sync manually
// because they change rarely.
const CATALOGS: { id: string; label: string }[] = [
  { id: "high-pressure-valves", label: "High-Pressure Valves" },
  { id: "high-pressure-fittings", label: "High-Pressure Fittings" },
  { id: "high-pressure-tubing", label: "High-Pressure Tubing" },
  { id: "union-adapters", label: "Unions & Adapters" },
  { id: "high-pressure-regulators", label: "High-Pressure Regulators" },
];


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
    <Box component="section" sx={{ bgcolor: "#f3f6fa", py: { xs: 7, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography sx={{ color: "primary.main", letterSpacing: "0.2em", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase !important", mb: 1 }}>
          Product index
        </Typography>
        <Typography component="h2" sx={{ fontSize: { xs: "1.7rem", md: "2.2rem" }, fontWeight: 800, color: "text.primary", lineHeight: 1.2 }}>
          Browse the full Hiflux range
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: "1.02rem", lineHeight: 1.8, mt: 2, maxWidth: 760, textTransform: "none" }}>
          Every Hiflux product series we supply in the UK. Select a series to view its full list of
          models, sizes and configurations.
        </Typography>

        <Box
          sx={{
            mt: { xs: 4, md: 5 },
            display: "grid",
            gap: 2.5,
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            alignItems: "start",
          }}
        >
          {populated.map((group) => (
            <Box
              key={group.id}
              sx={{
                bgcolor: "#fff",
                border: "1px solid rgba(15,40,70,0.08)",
                borderRadius: "14px",
                boxShadow: "0 1px 2px rgba(15,40,70,0.04)",
                overflow: "hidden",
              }}
            >
              <Box
                component="a"
                href={`/products/${group.id}`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 2.5,
                  py: 2,
                  borderBottom: "1px solid rgba(15,40,70,0.08)",
                  bgcolor: "#f8fbfe",
                  textDecoration: "none",
                  "&:hover h3": { color: "primary.main" },
                }}
              >
                <Typography component="h3" sx={{ fontSize: "1rem", fontWeight: 800, color: "text.primary", textTransform: "none", transition: "color 0.15s ease" }}>
                  {group.label}
                </Typography>
                <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: "primary.main", bgcolor: "rgba(0,114,188,0.1)", px: 1, py: 0.25, borderRadius: "999px" }}>
                  {group.products.length}
                </Typography>
              </Box>
              <Box component="ul" sx={{ listStyle: "none", m: 0, p: 1 }}>
                {group.products.map((product) => (
                  <li key={product.id}>
                    <Box
                      component="a"
                      href={`/products/${group.id}/${product.id}/variants`}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1,
                        px: 1.5,
                        py: 1.1,
                        borderRadius: "8px",
                        color: "text.primary",
                        fontSize: "0.92rem",
                        fontWeight: 600,
                        textDecoration: "none",
                        transition: "background-color 0.15s ease, color 0.15s ease",
                        "&:hover": { bgcolor: "rgba(0,114,188,0.06)", color: "primary.main" },
                      }}
                    >
                      {product.name}
                      <Box component="span" aria-hidden sx={{ color: "primary.main" }}>→</Box>
                    </Box>
                  </li>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
