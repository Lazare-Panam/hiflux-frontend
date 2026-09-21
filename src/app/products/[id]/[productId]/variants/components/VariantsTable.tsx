"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  TablePagination,
  Typography,
  Chip,
  IconButton,
  Collapse,
  Button,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import CheckIcon from "@mui/icons-material/Check";
import Image from "next/image";
import Link from "next/link";
import { ProductVariant } from "@/api/useProductVariants";
import { useCartStore } from "@/store/useCartStore";

const BRAND = "#0072BC";

interface RowProps {
  variant: ProductVariant;
  specKeys: string[];
  thumbnailImage: string;
  productName: string;
  // When true the row stays in the DOM (so its <a href> is crawlable) but is
  // visually hidden because it belongs to another pagination page.
  hidden: boolean;
}

function VariantRow({
  variant,
  specKeys,
  thumbnailImage,
  productName,
  hidden,
}: RowProps) {
  const [open, setOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const router = useRouter();
  const { id, productId } = useParams<{ id: string; productId: string }>();
  const addItem = useCartStore((state) => state.addItem);

  const sku = variant.specs["SKU"] ?? variant.id;
  const detailHref = `/products/${id}/${productId}/variants/${sku}`;

  // Price comes from specs as a string (e.g. "141.60"); guard against it
  // being missing, empty, or non-numeric before treating this as priced.
  const rawPrice = variant.specs["Price"];
  const parsedPrice = rawPrice ? parseFloat(rawPrice) : NaN;
  const hasPrice = !isNaN(parsedPrice) && parsedPrice > 0;

  const goToDetail = () => {
    router.push(detailHref);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      productId,
      sku,
      name: productName,
      thumbnailImage,
      price: parsedPrice,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <>
      <TableRow
        hover
        onClick={goToDetail}
        sx={{
          display: hidden ? "none" : undefined,
          cursor: "pointer",
          bgcolor: open ? alpha(BRAND, 0.03) : "inherit",
          "&:hover": { bgcolor: `${alpha(BRAND, 0.02)} !important` },
        }}
      >
        <TableCell sx={{ width: 40, py: 1.5 }}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((o) => !o);
            }}
          >
            {open ? (
              <KeyboardArrowUpIcon fontSize="small" />
            ) : (
              <KeyboardArrowDownIcon fontSize="small" />
            )}
          </IconButton>
        </TableCell>
        {specKeys.map((key, index) => {
          const cellContent = variant.specs[key] ? (
            key === "End Connection" ? (
              <Chip
                label={variant.specs[key]}
                size="small"
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  bgcolor: alpha(BRAND, 0.08),
                  color: BRAND,
                  borderRadius: "3px",
                }}
              />
            ) : (
              variant.specs[key]
            )
          ) : (
            "—"
          );

          // The first column carries a real crawlable <a href> to the variant
          // detail page so search engines can discover each SKU. The row's
          // onClick still handles click-anywhere navigation for humans; the
          // link stops propagation to avoid a redundant second navigation.
          return (
            <TableCell key={key} sx={{ py: 1.5, fontSize: "0.875rem" }}>
              {index === 0 ? (
                <Link
                  href={detailHref}
                  aria-label={`View ${productName} ${sku}`.trim()}
                  onClick={(e) => e.stopPropagation()}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {cellContent}
                </Link>
              ) : (
                cellContent
              )}
            </TableCell>
          );
        })}
        <TableCell sx={{ py: 1.5 }} onClick={(e) => e.stopPropagation()}>
          {hasPrice ? (
            <Button
              variant="contained"
              size="small"
              onClick={handleAddToCart}
              startIcon={justAdded ? <CheckIcon /> : <ShoppingCartIcon />}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                borderRadius: "4px",
                bgcolor: justAdded ? "#2e7d32" : BRAND,
                boxShadow: "none",
                fontSize: "0.72rem",
                px: 1.5,
                whiteSpace: "nowrap",
                transition: "background-color 0.2s",
                "&:hover": {
                  bgcolor: justAdded ? "#2e7d32" : "#005a94",
                  boxShadow: "none",
                },
              }}
            >
              {justAdded ? "Added" : "Add to cart"}
            </Button>
          ) : (
            <Button
              variant="outlined"
              size="small"
              onClick={goToDetail}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                borderRadius: "4px",
                borderColor: BRAND,
                color: BRAND,
                fontSize: "0.72rem",
                px: 1.5,
                whiteSpace: "nowrap",
                "&:hover": { borderColor: BRAND, bgcolor: alpha(BRAND, 0.06) },
              }}
            >
              Request quote
            </Button>
          )}
        </TableCell>
      </TableRow>

      <TableRow sx={{ display: hidden ? "none" : undefined }}>
        <TableCell
          colSpan={specKeys.length + 2}
          sx={{
            p: 0,
            borderBottom: open ? "1px solid rgba(0,0,0,0.08)" : "none",
          }}
        >
          <Collapse in={open} unmountOnExit>
            <Box
              sx={{
                p: 3,
                bgcolor: alpha(BRAND, 0.02),
                borderLeft: `4px solid ${BRAND}`,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 4,
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                {thumbnailImage && (
                  <Box
                    sx={{
                      width: 140,
                      height: 140,
                      flexShrink: 0,
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: "8px",
                      bgcolor: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={thumbnailImage}
                      alt={variant.id}
                      width={120}
                      height={120}
                      style={{ objectFit: "contain" }}
                    />
                  </Box>
                )}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "0.72rem",
                      fontWeight: 900,
                      letterSpacing: "0.1em",
                      color: BRAND,
                      mb: 2,
                      textTransform: "uppercase",
                    }}
                  >
                    Specifications
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 4, mb: 3 }}
                  >
                    {Object.entries(variant.specs).map(([k, v]) => (
                      <Box key={k}>
                        <Typography
                          sx={{
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            color: "text.secondary",
                            mb: 0.25,
                          }}
                        >
                          {k}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "0.875rem", fontWeight: 600 }}
                        >
                          {v}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  {hasPrice ? (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleAddToCart}
                      startIcon={
                        justAdded ? <CheckIcon /> : <ShoppingCartIcon />
                      }
                      sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: "4px",
                        bgcolor: justAdded ? "#2e7d32" : BRAND,
                        boxShadow: "none",
                        px: 3,
                        transition: "background-color 0.2s",
                        "&:hover": {
                          bgcolor: justAdded ? "#2e7d32" : "#005a94",
                          boxShadow: "none",
                        },
                      }}
                    >
                      {justAdded ? "Added to cart" : "Add to cart"}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToDetail();
                      }}
                      sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: "4px",
                        bgcolor: BRAND,
                        boxShadow: "none",
                        px: 3,
                        "&:hover": { bgcolor: "#A8270A", boxShadow: "none" },
                      }}
                    >
                      Request Quote
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

interface Props {
  variants: ProductVariant[];
  specKeys: string[];
  thumbnailImage: string;
  productName?: string;
}

export default function VariantsTable({
  variants,
  specKeys,
  thumbnailImage,
  productName = "",
}: Props) {
  const [sortKey, setSortKey] = useState<string>(specKeys[0] ?? "");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = [...variants].sort((a, b) => {
    const av = a.specs[sortKey] ?? "";
    const bv = b.specs[sortKey] ?? "";
    return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
  });

  // Every row is rendered into the DOM (so each variant's <a href> is present
  // in the HTML for search crawlers); pagination only controls which slice is
  // visible. `page`/`rowsPerPage` define the visible window.
  const pageStart = page * rowsPerPage;
  const pageEnd = pageStart + rowsPerPage;

  const headerSx = {
    bgcolor: alpha(BRAND, 0.04),
    borderBottom: `2px solid ${BRAND}`,
    fontWeight: 700,
    fontSize: "0.75rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    py: 1.5,
  };

  return (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ ...headerSx, width: 40 }} />
            {specKeys.map((key) => (
              <TableCell key={key} sx={headerSx}>
                <TableSortLabel
                  active={sortKey === key}
                  direction={sortKey === key ? sortDir : "asc"}
                  onClick={() => handleSort(key)}
                >
                  {key}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell sx={{ ...headerSx, width: 160 }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={specKeys.length + 2}
                align="center"
                sx={{ py: 8 }}
              >
                <Typography
                  sx={{ color: "text.secondary", fontSize: "0.875rem" }}
                >
                  No variants found.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            sorted.map((v, i) => (
              <VariantRow
                key={v.id}
                variant={v}
                specKeys={specKeys}
                thumbnailImage={thumbnailImage}
                productName={productName}
                hidden={i < pageStart || i >= pageEnd}
              />
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={sorted.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value));
          setPage(0);
        }}
        rowsPerPageOptions={[10, 25, 50]}
        sx={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
      />
    </Box>
  );
}
