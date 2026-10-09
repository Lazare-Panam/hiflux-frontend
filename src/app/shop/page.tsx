"use client";

import { useState } from "react";
import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { useCartStore } from "@/store/useCartStore";
import PageBreadcrumbs from "@/app/Common/PageBreadcrumbs";
import CtaBanner from "@/app/Common/CtaBanner";
import { BLUE_BG, PRODUCT_STAGE } from "@/theme/brand";

const BRAND = "#0072BC";
const BRAND_DARK = "#00539B";

type ProductVariant = {
  id: string;
  thumbnailImage: string;
  specs: Record<string, string>;
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function specEntries(specs: Record<string, string>) {
  // Show everything except SKU and Price inline; Price rendered separately.
  return Object.entries(specs).filter(
    ([key]) => key !== "SKU" && key !== "Price",
  );
}

// "15000psi" -> "15,000 psi" so every card shows ratings the same way.
function tidySpec(value: string) {
  const m = value.match(/^(\d+)\s*psi$/i);
  return m ? `${Number(m[1]).toLocaleString("en-GB")} psi` : value;
}

const fmtPrice = (p: string) => `£${Number(p).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// Route shape: /products/[categorySlug]/[productId]/variants/[sku]
function variantHref(categorySlug: string, productId: string, sku: string) {
  return `/products/${categorySlug}/${productId}/variants/${sku}`;
}

/* ------------------------------------------------------------------ */
/* Card components (now Link-wrapped, with Add to Cart)               */
/* ------------------------------------------------------------------ */

function GridCard({
  variant,
  productName,
  thumbnailImage,
  categorySlug,
  productId,
}: {
  variant: ProductVariant;
  productName: string;
  thumbnailImage: string;
  categorySlug: string;
  productId: string;
}) {
  const { specs } = variant;
  const addItem = useCartStore((state) => state.addItem);
  const [justAdded, setJustAdded] = useState(false);

  const parsedPrice = parseFloat(specs.Price);
  const hasPrice = !isNaN(parsedPrice) && parsedPrice > 0;

  // Card is wrapped in a Link (navigates to the detail page on click), so the
  // button needs to stop that navigation from firing when it's clicked.
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId,
      sku: specs.SKU,
      name: productName,
      thumbnailImage,
      price: parsedPrice,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <Link
      href={variantHref(categorySlug, productId, specs.SKU)}
      style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}
    >
      <Box
        sx={{
          bgcolor: "#fff",
          border: "1px solid rgba(15,40,70,0.08)",
          borderRadius: "16px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          transition: "box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease",
          "&:hover": { transform: "translateY(-4px)", borderColor: "rgba(0,114,188,0.3)", boxShadow: "0 18px 40px rgba(0,83,155,0.12)" },
          "&:hover .shop-img": { transform: "scale(1.06)" },
          "& .MuiTypography-root": { textTransform: "none" },
        }}
      >
        <Box sx={{ position: "relative", aspectRatio: "4 / 3", background: PRODUCT_STAGE, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(15,40,70,0.06)" }}>
          <Box component="img" className="shop-img" src={thumbnailImage} alt={`${productName} ${specs.SKU}`} sx={{ maxWidth: "72%", maxHeight: "78%", objectFit: "contain", mixBlendMode: "multiply", transition: "transform 0.35s ease" }} />
          <Box component="span" sx={{ position: "absolute", top: 12, left: 12, px: 1, py: 0.35, borderRadius: "6px", bgcolor: "#f3f6fa", fontFamily: "monospace", fontSize: "0.75rem", fontWeight: 700, color: "text.primary" }}>
            {specs.SKU}
          </Box>
        </Box>

        <Box sx={{ p: 2.25, display: "flex", flexDirection: "column", gap: 1, flex: 1 }}>
          <Typography sx={{ fontSize: "0.95rem", fontWeight: 800, color: "text.primary", lineHeight: 1.3 }}>{productName}</Typography>
          <Box component="dl" sx={{ m: 0 }}>
            {specEntries(specs).slice(0, 3).map(([key, value]) => (
              <Box key={key} sx={{ display: "flex", justifyContent: "space-between", gap: 1.5, py: 0.6, borderBottom: "1px solid rgba(15,40,70,0.06)" }}>
                <Typography component="dt" sx={{ fontSize: "0.8rem", color: "text.secondary" }}>{key}</Typography>
                <Typography component="dd" sx={{ m: 0, fontSize: "0.8rem", fontWeight: 700, color: "text.primary", textAlign: "right" }}>{tidySpec(value)}</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ mt: "auto", pt: 1.25, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
            <Typography sx={{ fontSize: "1.25rem", fontWeight: 800, color: BRAND_DARK }}>{fmtPrice(specs.Price)}</Typography>
            {hasPrice && (
              <Button
                variant="contained"
                size="small"
                onClick={handleAddToCart}
                startIcon={justAdded ? <CheckIcon /> : <ShoppingCartIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: "999px",
                  px: 1.75,
                  bgcolor: justAdded ? "#2e7d32" : BRAND,
                  boxShadow: "none",
                  fontSize: "0.8rem",
                  whiteSpace: "nowrap",
                  "&:hover": { bgcolor: justAdded ? "#2e7d32" : "#005a94", boxShadow: "none" },
                }}
              >
                {justAdded ? "Added" : "Add to cart"}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Link>
  );
}

function FeaturedCard({
  variant,
  productName,
  thumbnailImage,
  categorySlug,
  productId,
}: {
  variant: ProductVariant;
  productName: string;
  thumbnailImage: string;
  categorySlug: string;
  productId: string;
}) {
  const { specs } = variant;
  const addItem = useCartStore((state) => state.addItem);
  const [justAdded, setJustAdded] = useState(false);

  const parsedPrice = parseFloat(specs.Price);
  const hasPrice = !isNaN(parsedPrice) && parsedPrice > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId,
      sku: specs.SKU,
      name: productName,
      thumbnailImage,
      price: parsedPrice,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <Link href={variantHref(categorySlug, productId, specs.SKU)} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "0.9fr 1.1fr" },
          bgcolor: "#fff",
          borderRadius: "22px",
          border: "1px solid rgba(15,40,70,0.08)",
          overflow: "hidden",
          transition: "box-shadow 0.25s ease",
          "&:hover": { boxShadow: "0 22px 48px rgba(0,83,155,0.14)" },
          "& .MuiTypography-root": { textTransform: "none" },
        }}
      >
        <Box sx={{ minHeight: { xs: 220, md: 320 }, display: "flex", alignItems: "center", justifyContent: "center", background: PRODUCT_STAGE }}>
          <Box component="img" src={thumbnailImage} alt={`${productName} ${specs.SKU}`} sx={{ maxWidth: "60%", maxHeight: 240, objectFit: "contain", mixBlendMode: "multiply" }} />
        </Box>
        <Box sx={{ p: { xs: 3, md: 5 }, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1.5 }}>
            <Box component="span" sx={{ px: 1.25, py: 0.4, borderRadius: "999px", bgcolor: BRAND, color: "#fff", fontSize: "0.75rem", fontWeight: 700 }}>Best Value</Box>
            <Box component="span" sx={{ fontFamily: "monospace", fontSize: "0.85rem", fontWeight: 700, color: "text.secondary" }}>{specs.SKU}</Box>
          </Box>
          <Typography sx={{ fontSize: { xs: "1.4rem", md: "1.9rem" }, fontWeight: 800, color: "text.primary", lineHeight: 1.2 }}>{productName}</Typography>
          <Box sx={{ mt: 2.5, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, border: "1px solid rgba(15,40,70,0.1)", borderRadius: "12px", overflow: "hidden" }}>
            {specEntries(specs).slice(0, 3).map(([key, value], i) => (
              <Box key={key} sx={{ p: 1.5, borderLeft: { sm: i ? "1px solid rgba(15,40,70,0.1)" : 0 }, borderTop: { xs: i ? "1px solid rgba(15,40,70,0.1)" : 0, sm: 0 } }}>
                <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", color: "text.secondary", textTransform: "uppercase !important" }}>{key}</Typography>
                <Typography sx={{ mt: 0.25, fontWeight: 800, fontSize: "0.95rem" }}>{tidySpec(value)}</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ mt: 3, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            <Typography sx={{ fontSize: "2.2rem", fontWeight: 800, color: BRAND_DARK, lineHeight: 1 }}>{fmtPrice(specs.Price)}</Typography>
            {hasPrice && (
              <Button
                variant="contained"
                onClick={handleAddToCart}
                startIcon={justAdded ? <CheckIcon /> : <ShoppingCartIcon />}
                sx={{ textTransform: "none", fontWeight: 700, borderRadius: "999px", bgcolor: justAdded ? "#2e7d32" : BRAND, boxShadow: "none", px: 3, py: 1.1, "&:hover": { bgcolor: justAdded ? "#2e7d32" : "#005a94", boxShadow: "none" } }}
              >
                {justAdded ? "Added to cart" : "Add to cart"}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Curated data: 3 priced variants from each product                  */
/* categorySlug values confirmed against live routes:                 */
/* valves + ball valve -> "high-pressure-valves"                      */
/* fittings + accessories -> "high-pressure-fittings"                 */
/* STILL UNCONFIRMED: needle valve variant "NV10VS08" — data below    */
/* uses SKU suffix "-S", but a confirmed URL used "-A". If that       */
/* specific link 404s, this is the value to check.                    */
/* ------------------------------------------------------------------ */

const FEATURED: {
  productId: string;
  productName: string;
  thumbnailImage: string;
  categorySlug: string;
  variants: ProductVariant[];
}[] = [
  {
    productId: "ndl-ultra-100k",
    productName: "High Pressure Needle Valve - Ultra High Pressure",
    thumbnailImage:
      "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/needle-valve.png",
    categorySlug: "high-pressure-valves",
    variants: [
      {
        id: "NVNVS02-S",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/needle-valve.png",
        specs: {
          SKU: "NVNVS02-S",
          "Pressure Rating": "15000psi",
          "Tube Size": '1/8"',
          "Body Type": "Straight",
          Price: "141.60",
        },
      },
      {
        id: "NV10VS08-S",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/needle-valve.png",
        specs: {
          SKU: "NV10VS08-S",
          "Pressure Rating": "10000psi",
          "Tube Size": '1/2"',
          "Body Type": "Straight",
          Price: "189.60",
        },
      },
      {
        id: "NV150VS06-D",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/needle-valve.png",
        specs: {
          SKU: "NV150VS06-D",
          "Pressure Rating": "150000psi",
          "Tube Size": '3/8"',
          "Body Type": "3-Way 2 Stem",
          Price: "1543.20",
        },
      },
    ],
  },
  {
    productId: "ball-med-20k",
    productName: "High Pressure Ball Valve",
    thumbnailImage:
      "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/trunion-ball-valve.png",
    categorySlug: "high-pressure-valves",
    variants: [
      {
        id: "BV2003S04-S",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/trunion-ball-valve.png",
        specs: {
          SKU: "BV2003S04-S",
          "Pressure Rating": "20,000 psi",
          "Tube Size": '1/4"',
          "Orifice Size": "4.8 mm",
          Finish: "Standard",
          Price: "410.40",
        },
      },
      {
        id: "BVN05S08-S",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/trunion-ball-valve.png",
        specs: {
          SKU: "BVN05S08-S",
          "Pressure Rating": "15,000 psi",
          "Tube Size": '1/2"',
          "Orifice Size": "8 mm",
          Finish: "Standard",
          Price: "591.60",
        },
      },
      {
        id: "BV2005S06-180",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/trunion-ball-valve.png",
        specs: {
          SKU: "BV2005S06-180",
          "Pressure Rating": "15,000 psi",
          "Tube Size": '3/8"',
          "Orifice Size": "8 mm",
          Finish: "180",
          Price: "601.20",
        },
      },
    ],
  },
  {
    productId: "fit-ultra-150k",
    productName: "High Pressure Fitting",
    thumbnailImage:
      "https://pblol2.blob.core.windows.net/hiflux/images/rf.jpeg",
    categorySlug: "high-pressure-fittings",
    variants: [
      {
        id: "FTNES02",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/hiflux/images/rf.jpeg",
        specs: {
          SKU: "FTNES02",
          Type: "Elbow",
          "Pressure Rating": "15,000 psi",
          "Tube Size": '1/8"',
          Price: "63.60",
        },
      },
      {
        id: "FT150CS06",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/hiflux/images/rf.jpeg",
        specs: {
          SKU: "FT150CS06",
          Type: "Cross",
          "Pressure Rating": "150,000 psi",
          "Tube Size": '3/8"',
          Price: "291.60",
        },
      },
      {
        id: "FT20TS12",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/hiflux/images/rf.jpeg",
        specs: {
          SKU: "FT20TS12",
          Type: "Tee",
          "Pressure Rating": "20,000 psi",
          "Tube Size": '3/4"',
          Price: "222.00",
        },
      },
    ],
  },
  {
    productId: "acc-ultra-150k",
    productName: "High Pressure Fitting Accessory",
    thumbnailImage:
      "https://pblol2.blob.core.windows.net/hiflux/images/nb.jpeg",
    categorySlug: "high-pressure-fittings",
    variants: [
      {
        id: "FA15SS02",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/hiflux/images/nb.jpeg",
        specs: {
          SKU: "FA15SS02",
          Type: "Sleeve",
          "Pressure Rating": "15,000 psi",
          "Tube Size": '1/8"',
          Price: "9.60",
        },
      },
      {
        id: "FA60GS04-AVS",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/hiflux/images/nb.jpeg",
        specs: {
          SKU: "FA60GS04-AVS",
          Type: "Gland Assy/Anti-V",
          "Pressure Rating": "60,000 psi",
          "Tube Size": '1/4"',
          Price: "30.00",
        },
      },
      {
        id: "FA20PS16",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/hiflux/images/nb.jpeg",
        specs: {
          SKU: "FA20PS16",
          Type: "Plug",
          "Pressure Rating": "20,000 psi",
          "Tube Size": '1"',
          Price: "46.80",
        },
      },
    ],
  },
];

// Cheapest curated item becomes the big featured card.
const ALL_VARIANTS = FEATURED.flatMap((p) =>
  p.variants.map((v) => ({ ...p, variant: v })),
);
const FEATURED_PICK = ALL_VARIANTS.reduce((min, cur) =>
  parseFloat(cur.variant.specs["Price"] ?? "Infinity") <
  parseFloat(min.variant.specs["Price"] ?? "Infinity")
    ? cur
    : min,
);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const GROUPS = ["All", ...Array.from(new Set(FEATURED.map((p) => p.productName)))];

export default function ShopLandingPage() {
  const [group, setGroup] = useState("All");
  const shelf = ALL_VARIANTS.filter((v) => v.variant.id !== FEATURED_PICK.variant.id && (group === "All" || v.productName === group));

  return (
    <Box sx={{ bgcolor: "#f3f6fa", minHeight: "100vh", "& .MuiTypography-root": { textTransform: "none" } }}>
      {/* Hero */}
      <Box component="section" sx={{ color: "#fff", background: BLUE_BG, py: { xs: 5, md: 7 } }}>
        <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 2, md: 4 } }}>
          <PageBreadcrumbs items={[{ label: "Shop" }]} />
          <Typography sx={{ color: "rgba(255,255,255,0.75)", letterSpacing: "0.2em", fontSize: "0.74rem", fontWeight: 800, textTransform: "uppercase !important" }}>
            Hiflux
          </Typography>
          <Typography component="h1" sx={{ mt: 1.25, fontSize: { xs: "2.1rem", md: "3rem" }, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Welcome to the Hiflux Shop
          </Typography>
          <Typography sx={{ mt: 1.75, color: "rgba(255,255,255,0.85)", fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.7, maxWidth: 620 }}>
            High pressure valves, fittings and accessories, engineered to spec — browse our range below.
          </Typography>
          <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 1.25 }}>
            {[
              { Icon: InventoryOutlinedIcon, text: "Lead times confirmed with your quote" },
              { Icon: LocalShippingOutlinedIcon, text: "Fast dispatch on every order" },
            ].map(({ Icon, text }) => (
              <Box key={text} sx={{ display: "inline-flex", alignItems: "center", gap: 1, px: 1.75, py: 0.85, borderRadius: "999px", bgcolor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <Icon sx={{ fontSize: 18 }} />
                <Typography sx={{ fontSize: "0.88rem", fontWeight: 600 }}>{text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ maxWidth: "1280px", mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 5, md: 7 } }}>
        {/* Featured */}
        <Typography component="h2" sx={{ fontSize: { xs: "1.4rem", md: "1.7rem" }, fontWeight: 800, mb: 2.5 }}>
          Featured
        </Typography>
        <FeaturedCard
          variant={FEATURED_PICK.variant}
          productName={FEATURED_PICK.productName}
          thumbnailImage={FEATURED_PICK.thumbnailImage}
          categorySlug={FEATURED_PICK.categorySlug}
          productId={FEATURED_PICK.productId}
        />

        {/* Shelf with product-type tabs */}
        <Box sx={{ mt: { xs: 6, md: 8 }, display: "flex", alignItems: { md: "center" }, justifyContent: "space-between", flexDirection: { xs: "column", md: "row" }, gap: 2, mb: 3 }}>
          <Typography component="h2" sx={{ fontSize: { xs: "1.4rem", md: "1.7rem" }, fontWeight: 800 }}>
            More products
          </Typography>
          <Box role="tablist" aria-label="Product type" sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {GROUPS.map((g) => {
              const active = g === group;
              return (
                <Box
                  key={g}
                  component="button"
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setGroup(g)}
                  sx={{ cursor: "pointer", px: 1.75, py: 0.85, borderRadius: "999px", border: "1px solid", borderColor: active ? BRAND : "rgba(15,40,70,0.15)", bgcolor: active ? BRAND : "#fff", color: active ? "#fff" : "text.primary", fontFamily: "inherit", fontWeight: 700, fontSize: "0.85rem", "&:hover": { borderColor: BRAND } }}
                >
                  {g === "All" ? "All" : g.replace(/^High Pressure /, "").replace(/ - .*$/, "")}
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }, gap: { xs: 2, md: 2.5 } }}>
          {shelf.map(({ productName, thumbnailImage, variant, categorySlug, productId }) => (
            <GridCard key={variant.id} variant={variant} productName={productName} thumbnailImage={thumbnailImage} categorySlug={categorySlug} productId={productId} />
          ))}
        </Box>

        <Link href="/products" style={{ textDecoration: "none", display: "inline-block", marginTop: 32 }}>
          <Box component="span" sx={{ display: "inline-flex", alignItems: "center", px: 3, py: 1.2, borderRadius: "999px", border: "1.5px solid", borderColor: BRAND, color: BRAND, fontWeight: 700, fontSize: "0.95rem", "&:hover": { bgcolor: BRAND, color: "#fff" } }}>
            Browse the full range →
          </Box>
        </Link>

        <CtaBanner sx={{ mt: { xs: 5, md: 7 } }} />
      </Box>
    </Box>
  );
}
