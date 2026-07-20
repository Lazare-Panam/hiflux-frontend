"use client";

import { use, useState, useMemo } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useProductVariants } from "@/api/useProductVariants";
import VariantsSidebar from "./components/VariantsSidebar";
import VariantsTable from "./components/VariantsTable";
import VariantsActiveFilters from "./components/VariantsActiveFilters";
import { alpha } from "@mui/material/styles";

const BRAND = "#0072BC";

export default function ProductVariantsPage({
  params,
}: {
  params: Promise<{ id: string; productId: string }>;
}) {
  const { id, productId } = use(params);
  const { data, isLoading, isError } = useProductVariants(productId);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(
    {},
  );

  const allSpecKeys = useMemo(() => {
    if (!data?.variants.length) return [];
    const keys = new Set<string>();
    data.variants.forEach((v) =>
      Object.keys(v.specs).forEach((k) => keys.add(k)),
    );
    return Array.from(keys);
  }, [data]);

  const filterOptions = useMemo(() => {
    if (!data?.variants.length) return {} as Record<string, string[]>;
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
    if (!data?.variants) return [];
    return data.variants.filter((v) =>
      Object.entries(activeFilters).every(
        ([key, vals]) => vals.length === 0 || vals.includes(v.specs[key]),
      ),
    );
  }, [data, activeFilters]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Typography sx={{ color: "text.secondary" }}>
          Failed to load variants.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero */}
      <Box
        sx={{ bgcolor: "#0a0604", px: { xs: 3, md: 8 }, py: { xs: 4, md: 5 } }}
      >
        <Box sx={{ maxWidth: "1280px", mx: "auto" }}>
          <Typography
            sx={{
              color: "primary.light",
              letterSpacing: "0.2em",
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Ball Valves
          </Typography>
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
          <Typography
            sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", mt: 1 }}
          >
            {filtered.length} model{filtered.length !== 1 ? "s" : ""} available
          </Typography>
        </Box>
      </Box>

      {/* Content */}
      <Box
        sx={{
          maxWidth: "1600px",
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 6 },
        }}
      >
        <VariantsActiveFilters
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />

        <Box
          sx={{
            display: "flex",
            gap: 0,
            alignItems: "flex-start",
            border: `1px solid ${alpha(BRAND, 0.15)}`,
            borderRadius: "8px",
            bgcolor: "#fff",
          }}
        >
          <VariantsSidebar
            specKeys={allSpecKeys}
            filterOptions={filterOptions}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              borderLeft: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <VariantsTable
              variants={filtered}
              specKeys={allSpecKeys}
              thumbnailImage={data.thumbnailImage}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
