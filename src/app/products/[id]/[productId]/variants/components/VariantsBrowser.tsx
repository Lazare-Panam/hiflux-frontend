"use client";

import { useState, useMemo } from "react";
import { Box, Typography, Chip, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PageBreadcrumbs from "@/app/Common/PageBreadcrumbs";
import { useParams } from "next/navigation";
import type { ProductSeriesVariants } from "@/api/useProductVariants";
import VariantsSidebar from "./VariantsSidebar";
import VariantsTable from "./VariantsTable";
import VariantsActiveFilters from "./VariantsActiveFilters";
import { BLUE_BG } from "@/theme/brand";


/**
 * Client-side variants browser (filtering UI). Receives the already-fetched
 * variants from the server component, so the full table is present in the
 * initial HTML; filtering then runs client-side after hydration.
 */
export default function VariantsBrowser({
  data,
  category,
}: {
  data: ProductSeriesVariants;
  category?: string;
}) {
  const { id, productId } = useParams<{ id: string; productId: string }>();
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(
    {},
  );

  const allSpecKeys = useMemo(() => {
    if (!data.variants.length) return [];
    const keys = new Set<string>();
    data.variants.forEach((v) => Object.keys(v.specs).forEach((k) => keys.add(k)));
    return Array.from(keys);
  }, [data]);

  const filterOptions = useMemo(() => {
    if (!data.variants.length) return {} as Record<string, string[]>;
    const opts: Record<string, Set<string>> = {};
    allSpecKeys.forEach((key) => {
      opts[key] = new Set();
    });
    data.variants.forEach((v) => {
      Object.entries(v.specs).forEach(([k, val]) => opts[k]?.add(val));
    });
    return Object.fromEntries(
      Object.entries(opts).map(([k, s]) => [k, Array.from(s)]),
    );
  }, [data, allSpecKeys]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.variants.filter(
      (v) =>
        (!q || (v.specs["SKU"] ?? v.id).toLowerCase().includes(q)) &&
        Object.entries(activeFilters).every(
          ([key, vals]) => vals.length === 0 || vals.includes(v.specs[key]),
        ),
    );
  }, [data, activeFilters, query]);

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero */}
      <Box sx={{ background: BLUE_BG, px: { xs: 3, md: 8 }, py: { xs: 4, md: 5 } }}>
        <Box sx={{ maxWidth: "1280px", mx: "auto" }}>
          <PageBreadcrumbs
            items={[
              { label: "Products", href: "/products" },
              ...(category ? [{ label: category, href: `/products/${id}` }] : []),
              { label: data.name, href: `/products/${id}/${productId}` },
              { label: "All Models" },
            ]}
          />
          {category && (
            <Typography
              sx={{
                color: "rgba(255,255,255,0.75)",
                letterSpacing: "0.2em",
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                mb: 1,
              }}
            >
              {category}
            </Typography>
          )}
          <Typography
            component="h1"
            sx={{
              color: "#fff",
              fontSize: { xs: "1.8rem", md: "2.6rem" },
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            {data.name}
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.75)", fontSize: "0.85rem", mt: 1 }}>
            {filtered.length} model{filtered.length !== 1 ? "s" : ""} available
          </Typography>
        </Box>
      </Box>

      {/* Content */}
      {/* Near full-width so wide spec tables have room */}
      <Box sx={{ px: { xs: 2, md: 3 }, py: { xs: 3, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { md: "flex-start" },
            gap: 3,
          }}
        >
          {/* Sidebar stays in view while the table scrolls */}
          <Box
            sx={{
              width: { md: 260 },
              flexShrink: 0,
              position: { md: "sticky" },
              top: 16,
              maxHeight: { md: "calc(100vh - 32px)" },
              overflowY: { md: "auto" },
            }}
          >
            <VariantsSidebar
              specKeys={allSpecKeys}
              filterOptions={filterOptions}
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              bgcolor: "#fff",
              border: "1px solid rgba(15,40,70,0.08)",
              borderRadius: "12px",
              boxShadow: "0 1px 2px rgba(15,40,70,0.04), 0 12px 32px rgba(15,40,70,0.06)",
              overflow: "hidden",
            }}
          >
            {/* Toolbar */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
                px: 3,
                py: 2,
                borderBottom: "1px solid rgba(15,40,70,0.08)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                <Typography component="h2" sx={{ fontSize: "1.2rem", fontWeight: 800, color: "text.primary" }}>
                  All Models
                </Typography>
                <Chip
                  label={`${filtered.length} of ${data.variants.length}`}
                  size="small"
                  sx={{ height: 24, fontSize: "0.8rem", fontWeight: 700, bgcolor: "rgba(0,114,188,0.1)", color: "#0072BC", "& .MuiChip-label": { textTransform: "none" } }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1.5,
                  height: 42,
                  width: { xs: "100%", sm: 300 },
                  bgcolor: "#f5f8fb",
                  border: "1px solid rgba(15,40,70,0.08)",
                  borderRadius: "8px",
                  transition: "border-color 0.15s ease, background-color 0.15s ease",
                  "&:focus-within": { borderColor: "#0072BC", bgcolor: "#fff" },
                }}
              >
                <SearchIcon sx={{ fontSize: 20, color: "text.secondary" }} />
                <InputBase
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search SKU…"
                  inputProps={{ "aria-label": "Search models by SKU" }}
                  sx={{ flex: 1, fontSize: "0.98rem" }}
                />
              </Box>
            </Box>

            <Box sx={{ px: 3, pt: 2, "&:empty": { display: "none" } }}>
              <VariantsActiveFilters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
            </Box>

            <VariantsTable
              variants={filtered}
              specKeys={allSpecKeys}
              thumbnailImage={data.thumbnailImage}
              productName={data.name}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
