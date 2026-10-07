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
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckIcon from "@mui/icons-material/Check";
import Image from "next/image";
import Link from "next/link";
import { ProductVariant } from "@/api/useProductVariants";
import { useCartStore } from "@/store/useCartStore";
import { compareSpec } from "./specSort";

const BRAND = "#0072BC";
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';
const ROW_LINE = "1px solid rgba(15,40,70,0.07)";

// A variant counts as "priced" only when Price is present and a positive
// number. Shared by the row (which button to show) and the table (sort order)
// so both agree on what "has a price" means.
function variantPrice(variant: ProductVariant): number | null {
  const raw = variant.specs["Price"];
  const parsed = raw ? parseFloat(raw) : NaN;
  return !isNaN(parsed) && parsed > 0 ? parsed : null;
}

const formatPrice = (n: number) => `£${n.toFixed(2)}`;

function AddButton({
  justAdded,
  onClick,
  size = "row",
}: {
  justAdded: boolean;
  onClick: (e: React.MouseEvent) => void;
  size?: "row" | "panel";
}) {
  return (
    <Button
      variant={justAdded || size === "panel" ? "contained" : "outlined"}
      size="small"
      disableElevation
      onClick={onClick}
      startIcon={justAdded ? <CheckIcon /> : <AddShoppingCartIcon />}
      sx={{
        textTransform: "none",
        fontWeight: 700,
        fontSize: size === "panel" ? "0.95rem" : "0.86rem",
        borderRadius: "8px",
        whiteSpace: "nowrap",
        px: size === "panel" ? 2.5 : 1.5,
        transition: "background-color 0.2s, color 0.2s, border-color 0.2s",
        ...(justAdded
          ? { bgcolor: "#2e7d32", "&:hover": { bgcolor: "#2e7d32" } }
          : size === "panel"
            ? { bgcolor: BRAND, "&:hover": { bgcolor: "#005a94" } }
            : {
                borderColor: alpha(BRAND, 0.5),
                color: BRAND,
                bgcolor: "#fff",
                "&:hover": { borderColor: BRAND, bgcolor: alpha(BRAND, 0.06) },
              }),
      }}
    >
      {justAdded ? "Added" : "Add to Cart"}
    </Button>
  );
}

interface RowProps {
  variant: ProductVariant;
  specKeys: string[];
  showPrice: boolean;
  thumbnailImage: string;
  productName: string;
  striped: boolean;
  // When true the row stays in the DOM (so its <a href> is crawlable) but is
  // visually hidden because it belongs to another pagination page.
  hidden: boolean;
}

function VariantRow({
  variant,
  specKeys,
  showPrice,
  thumbnailImage,
  productName,
  striped,
  hidden,
}: RowProps) {
  const [open, setOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const router = useRouter();
  const { id, productId } = useParams<{ id: string; productId: string }>();
  const addItem = useCartStore((state) => state.addItem);

  const sku = variant.specs["SKU"] ?? variant.id;
  const detailHref = `/products/${id}/${productId}/variants/${sku}`;
  const price = variantPrice(variant);

  const goToDetail = () => router.push(detailHref);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (price === null) return;
    addItem({ productId, sku, name: productName, thumbnailImage, price });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const quoteButton = (
    <Button
      variant="outlined"
      size="small"
      onClick={(e) => {
        e.stopPropagation();
        goToDetail();
      }}
      sx={{
        textTransform: "none",
        fontWeight: 700,
        fontSize: "0.86rem",
        borderRadius: "8px",
        whiteSpace: "nowrap",
        borderColor: alpha(BRAND, 0.5),
        color: BRAND,
        "&:hover": { borderColor: BRAND, bgcolor: alpha(BRAND, 0.06) },
      }}
    >
      Request Quote
    </Button>
  );

  const cellSx = { py: 2.25, fontSize: "1rem", borderBottom: ROW_LINE, color: "text.primary", textTransform: "none" as const };
  const colCount = specKeys.length + (showPrice ? 1 : 0) + 3;

  return (
    <>
      <TableRow
        onClick={goToDetail}
        sx={{
          display: hidden ? "none" : undefined,
          cursor: "pointer",
          bgcolor: open ? alpha(BRAND, 0.08) : striped ? "#fbfcfe" : "#fff",
          // Blue bar on the left edge marks the hovered/open row.
          boxShadow: open ? `inset 4px 0 0 ${BRAND}` : "none",
          transition: "background-color 0.15s ease, box-shadow 0.15s ease",
          "&:hover": { bgcolor: alpha(BRAND, 0.1), boxShadow: `inset 4px 0 0 ${BRAND}` },
          "&:active": { bgcolor: alpha(BRAND, 0.18) },
          // Hovering anywhere on the row highlights its SKU link.
          "&:hover .sku-link": { color: BRAND, textDecoration: "underline" },
        }}
      >
        <TableCell sx={{ ...cellSx, width: 48, pr: 0 }}>
          <IconButton
            size="small"
            aria-label={open ? "Hide specifications" : "Show specifications"}
            aria-expanded={open}
            onClick={(e) => {
              e.stopPropagation();
              setOpen((o) => !o);
            }}
          >
            <KeyboardArrowDownIcon
              fontSize="small"
              sx={{ transition: "transform 0.2s ease", transform: open ? "rotate(180deg)" : "none" }}
            />
          </IconButton>
        </TableCell>

        <TableCell sx={{ ...cellSx, width: 72, py: 1.25 }}>
          <Box
            sx={{
              width: 58,
              height: 58,
              background: "linear-gradient(180deg, #fff 0%, #f3f6f9 100%)",
              border: "1px solid rgba(15,40,70,0.08)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {thumbnailImage && (
              <Image src={thumbnailImage} alt={`${productName} ${sku}`.trim()} width={46} height={46} style={{ objectFit: "contain" }} />
            )}
          </Box>
        </TableCell>

        {specKeys.map((key, index) => {
          const value = variant.specs[key];
          const content = !value ? (
            "—"
          ) : key === "End Connection" ? (
            <Chip
              label={value}
              size="small"
              sx={{ fontSize: "0.72rem", fontWeight: 700, bgcolor: alpha(BRAND, 0.08), color: BRAND, borderRadius: "3px" }}
            />
          ) : (
            value
          );

          // The first column carries a real crawlable <a href> to the variant
          // detail page so search engines can discover each SKU. The row's
          // onClick still handles click-anywhere navigation for humans; the
          // link stops propagation to avoid a redundant second navigation.
          return (
            <TableCell
              key={key}
              sx={{
                ...cellSx,
                ...(index === 0 && {
                  fontFamily: MONO,
                  fontWeight: 600,
                  fontSize: "0.98rem",
                  letterSpacing: "0.02em",
                  "& .sku-link": {
                    color: "inherit",
                    textDecoration: "none",
                    textUnderlineOffset: "3px",
                    transition: "color 0.15s ease",
                  },
                }),
              }}
            >
              {index === 0 ? (
                <Link
                  href={detailHref}
                  aria-label={`View ${productName} ${sku}`.trim()}
                  onClick={(e) => e.stopPropagation()}
                  className="sku-link"
                >
                  {content}
                </Link>
              ) : (
                content
              )}
            </TableCell>
          );
        })}

        {showPrice && (
          <TableCell sx={{ ...cellSx, fontWeight: 800, fontSize: "1.08rem", whiteSpace: "nowrap" }}>
            {price !== null ? formatPrice(price) : "—"}
          </TableCell>
        )}

        <TableCell sx={{ ...cellSx, width: 150 }} align="right" onClick={(e) => e.stopPropagation()}>
          {price !== null ? <AddButton justAdded={justAdded} onClick={handleAddToCart} /> : quoteButton}
        </TableCell>
      </TableRow>

      <TableRow sx={{ display: hidden ? "none" : undefined }}>
        <TableCell colSpan={colCount} sx={{ p: 0, borderBottom: open ? ROW_LINE : "none" }}>
          <Collapse in={open} unmountOnExit>
            <Box
              sx={{
                display: "flex",
                gap: 4,
                alignItems: "flex-start",
                flexWrap: "wrap",
                p: 3,
                bgcolor: alpha(BRAND, 0.03),
                borderLeft: `4px solid ${BRAND}`,
              }}
            >
              {thumbnailImage && (
                <Box
                  sx={{
                    width: 130,
                    height: 130,
                    flexShrink: 0,
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    bgcolor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image src={thumbnailImage} alt={sku} width={110} height={110} style={{ objectFit: "contain" }} />
                </Box>
              )}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{ fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.12em", color: BRAND, mb: 2, textTransform: "uppercase" }}
                >
                  Specifications
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 4, rowGap: 2, mb: 2.5 }}>
                  {Object.entries(variant.specs).map(([k, v]) => (
                    <Box key={k}>
                      <Typography
                        sx={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "primary.dark", mb: 0.25 }}
                      >
                        {k}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "1rem", fontWeight: 700, color: "text.primary", textTransform: "none", ...(k === "SKU" && { fontFamily: MONO }) }}
                      >
                        {k === "Price" && price !== null ? formatPrice(price) : v}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                {price !== null ? (
                  <AddButton justAdded={justAdded} onClick={handleAddToCart} size="panel" />
                ) : (
                  quoteButton
                )}
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

export default function VariantsTable({ variants, specKeys, thumbnailImage, productName = "" }: Props) {
  // Price gets its own formatted column at the end rather than a generic one.
  const columns = specKeys.filter((k) => k !== "Price");
  const showPrice = variants.some((v) => variantPrice(v) !== null);

  const [sortKey, setSortKey] = useState<string>(columns[0] ?? "");
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
    // Priced variants always float to the top, regardless of the active column
    // or sort direction; the column sort only orders rows within each group.
    const ap = variantPrice(a) !== null;
    const bp = variantPrice(b) !== null;
    if (ap !== bp) return ap ? -1 : 1;
    const cmp = compareSpec(a.specs[sortKey] ?? "", b.specs[sortKey] ?? "");
    return sortDir === "asc" ? cmp : -cmp;
  });

  // Every row is rendered into the DOM (so each variant's <a href> is present
  // in the HTML for search crawlers); pagination only controls which slice is
  // visible. `page`/`rowsPerPage` define the visible window.
  // Filtering can shrink the list below the current page; clamp so the
  // table never shows an empty page.
  const lastPage = Math.max(0, Math.ceil(sorted.length / rowsPerPage) - 1);
  const currentPage = Math.min(page, lastPage);
  const pageStart = currentPage * rowsPerPage;
  const pageEnd = pageStart + rowsPerPage;
  const colCount = columns.length + (showPrice ? 1 : 0) + 3;

  const headerSx = {
    bgcolor: "#f6f9fc",
    borderBottom: "1px solid rgba(15,40,70,0.08)",
    fontWeight: 700,
    fontSize: "0.78rem",
    color: "#5b6b7c",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    py: 2,
    whiteSpace: "nowrap" as const,
  };

  const sortable = (key: string, label: string) => (
    <TableSortLabel
      active={sortKey === key}
      direction={sortKey === key ? sortDir : "asc"}
      onClick={() => handleSort(key)}
      sx={{ "&.Mui-active": { color: BRAND }, "& .MuiTableSortLabel-icon": { fontSize: 18 } }}
    >
      {label}
    </TableSortLabel>
  );

  return (
    <Box sx={{ flex: 1, minWidth: 0, overflowX: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ ...headerSx, width: 48 }} />
            <TableCell sx={{ ...headerSx, width: 72 }} />
            {columns.map((key) => (
              <TableCell key={key} sx={headerSx}>
                {sortable(key, key)}
              </TableCell>
            ))}
            {showPrice && <TableCell sx={headerSx}>{sortable("Price", "Price")}</TableCell>}
            <TableCell sx={{ ...headerSx, width: 150 }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.length === 0 ? (
            <TableRow>
              <TableCell colSpan={colCount} align="center" sx={{ py: 8 }}>
                <Typography sx={{ color: "text.secondary", fontSize: "1rem" }}>
                  No models match these filters.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            sorted.map((v, i) => (
              <VariantRow
                key={v.id}
                variant={v}
                specKeys={columns}
                showPrice={showPrice}
                thumbnailImage={thumbnailImage}
                productName={productName}
                striped={(i - pageStart) % 2 === 1}
                hidden={i < pageStart || i >= pageEnd}
              />
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={sorted.length}
        page={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value));
          setPage(0);
        }}
        rowsPerPageOptions={[10, 25, 50]}
        sx={{ borderTop: ROW_LINE }}
      />
    </Box>
  );
}
