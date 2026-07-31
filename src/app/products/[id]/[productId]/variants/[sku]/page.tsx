"use client";

import { use, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Grid,
  CircularProgress,
  Breadcrumbs,
  Divider,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { useProductVariants } from "@/api/useProductVariants";
import { useCartStore } from "@/store/useCartStore";

const BRAND = "#0072BC";
const HIDDEN_SPEC_KEYS = ["SKU", "Price"];

export default function VariantDetail({
  params,
}: {
  params: Promise<{ id: string; productId: string; sku: string }>;
}) {
  const { id, productId, sku } = use(params);
  const { data, isLoading, isError } = useProductVariants(productId);
  const addItem = useCartStore((state) => state.addItem);
  const [justAdded, setJustAdded] = useState(false);

  const variant = useMemo(() => {
    if (!data?.variants) return undefined;
    return data.variants.find((v) => (v.specs["SKU"] ?? v.id) === sku);
  }, [data, sku]);

  const related = useMemo(() => {
    if (!data?.variants || !variant) return [];
    return data.variants.filter((v) => v.id !== variant.id).slice(0, 4);
  }, [data, variant]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 12 }}>
        <CircularProgress sx={{ color: BRAND }} />
      </Box>
    );
  }

  if (isError || !data || !variant) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 12 }}>
        <Typography sx={{ color: "text.secondary" }}>
          Variant not found.
        </Typography>
      </Box>
    );
  }

  const price = variant.specs["Price"];
  // Price comes from specs as a string (e.g. "141.60"); guard against it being
  // missing, empty, or non-numeric before treating this as a priced item.
  const parsedPrice = price ? parseFloat(price) : NaN;
  const hasPrice = !isNaN(parsedPrice) && parsedPrice > 0;

  const displaySpecs = Object.entries(variant.specs).filter(
    ([key]) => !HIDDEN_SPEC_KEYS.includes(key),
  );

  const handleAddToCart = () => {
    addItem({
      productId,
      sku,
      name: data.name,
      thumbnailImage: data.thumbnailImage,
      price: parsedPrice,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 6 },
        }}
      >
        {/* Breadcrumb / back */}
        <Breadcrumbs
          separator="/"
          sx={{
            mb: 4,
            fontSize: "0.8rem",
            "& .MuiBreadcrumbs-separator": { color: "text.disabled" },
          }}
        >
          <Link
            href={`/products/${id}/${productId}/variants`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: BRAND,
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 12 }} />
            {data.name}
          </Link>
          <Typography
            sx={{
              fontSize: "0.8rem",
              color: "text.secondary",
              fontFamily: "monospace",
            }}
          >
            {sku}
          </Typography>
        </Breadcrumbs>

        <Grid container spacing={6}>
          {/* Image */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                position: "sticky",
                top: 24,
                border: `1px solid ${alpha(BRAND, 0.15)}`,
                borderRadius: "12px",
                bgcolor: "#fff",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  aspectRatio: "1/1",
                  bgcolor: alpha(BRAND, 0.03),
                }}
              >
                <Image
                  src={data.thumbnailImage}
                  alt={sku}
                  fill
                  style={{ objectFit: "contain", padding: 40 }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Details */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography
              sx={{
                fontSize: "0.72rem",
                fontWeight: 900,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: BRAND,
                mb: 1,
              }}
            >
              {data.name}
            </Typography>

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "1.6rem", md: "2rem" },
                fontWeight: 800,
                lineHeight: 1.15,
              }}
            >
              {sku}
            </Typography>

            {hasPrice && (
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "baseline",
                  gap: 0.5,
                  mt: 2.5,
                  px: 2,
                  py: 1,
                  bgcolor: alpha(BRAND, 0.06),
                  borderRadius: "8px",
                  borderLeft: `4px solid ${BRAND}`,
                }}
              >
                <Typography
                  sx={{ fontSize: "1.9rem", fontWeight: 800, color: BRAND }}
                >
                  £{price}
                </Typography>
                <Typography
                  sx={{ fontSize: "0.8rem", color: "text.secondary" }}
                >
                  per unit
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            <Typography
              sx={{
                fontSize: "0.72rem",
                fontWeight: 900,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "text.secondary",
                mb: 1.5,
              }}
            >
              Specifications
            </Typography>

            <Table
              size="small"
              sx={{
                border: `1px solid ${alpha(BRAND, 0.12)}`,
                borderRadius: "8px",
                overflow: "hidden",
                "& td, & th": {
                  borderBottom: `1px solid ${alpha(BRAND, 0.08)}`,
                },
                "& tr:last-of-type td, & tr:last-of-type th": {
                  borderBottom: "none",
                },
              }}
            >
              <TableBody>
                {displaySpecs.map(([label, value], i) => (
                  <TableRow
                    key={label}
                    sx={{ bgcolor: i % 2 === 0 ? "#fff" : alpha(BRAND, 0.02) }}
                  >
                    <TableCell
                      component="th"
                      sx={{
                        width: "40%",
                        fontWeight: 700,
                        fontSize: "0.78rem",
                        color: "text.secondary",
                        textTransform: "uppercase",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {label}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
                      {value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {hasPrice ? (
              <Button
                variant="contained"
                fullWidth
                disableElevation
                onClick={handleAddToCart}
                startIcon={justAdded ? <CheckIcon /> : <ShoppingCartIcon />}
                sx={{
                  mt: 3,
                  py: 1.5,
                  bgcolor: justAdded ? "#2e7d32" : BRAND,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  borderRadius: "8px",
                  transition: "background-color 0.2s",
                  "&:hover": { bgcolor: justAdded ? "#2e7d32" : "#005a94" },
                }}
              >
                {justAdded ? "Added to cart" : "Add to cart"}
              </Button>
            ) : (
              <Button
                variant="contained"
                fullWidth
                disableElevation
                sx={{
                  mt: 3,
                  py: 1.5,
                  bgcolor: BRAND,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  borderRadius: "8px",
                  "&:hover": { bgcolor: "#005a94" },
                }}
              >
                Request quote
              </Button>
            )}
          </Grid>
        </Grid>

        {/* Related */}
        {related.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Divider sx={{ mb: 4 }} />
            <Typography sx={{ fontSize: "1.15rem", fontWeight: 800, mb: 3 }}>
              Related products
            </Typography>
            <Grid container spacing={2.5}>
              {related.map((item) => {
                const itemSku = item.specs["SKU"] ?? item.id;
                const itemPrice = item.specs["Price"];
                return (
                  <Grid size={{ xs: 6, sm: 3 }} key={item.id}>
                    <Link
                      href={`/products/${id}/${productId}/variants/${itemSku}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Box
                        sx={{
                          border: `1px solid ${alpha(BRAND, 0.12)}`,
                          borderRadius: "10px",
                          p: 1.5,
                          bgcolor: "#fff",
                          transition: "all 0.15s",
                          "&:hover": {
                            borderColor: BRAND,
                            boxShadow: `0 4px 16px ${alpha(BRAND, 0.12)}`,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            aspectRatio: "1/1",
                            bgcolor: alpha(BRAND, 0.03),
                            borderRadius: "6px",
                          }}
                        >
                          <Image
                            src={data.thumbnailImage}
                            alt={itemSku}
                            fill
                            style={{ objectFit: "contain", padding: 16 }}
                          />
                        </Box>
                        <Typography
                          noWrap
                          sx={{
                            fontSize: "0.82rem",
                            fontWeight: 700,
                            mt: 1.25,
                            fontFamily: "monospace",
                          }}
                        >
                          {itemSku}
                        </Typography>
                        {itemPrice && (
                          <Typography
                            sx={{
                              fontSize: "0.85rem",
                              fontWeight: 800,
                              color: BRAND,
                              mt: 0.25,
                            }}
                          >
                            £{itemPrice}
                          </Typography>
                        )}
                      </Box>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
}
