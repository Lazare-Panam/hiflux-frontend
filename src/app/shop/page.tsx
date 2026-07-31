"use client";

import Link from "next/link";
import { Box, Typography, Chip } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";

const BRAND = "#0072BC";
const BRAND_DARK = "#00539B";
const PAGE_BG = "#EAF3FB"; // light blue wash to contrast white cards

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

// Route shape: /products/[categorySlug]/[productId]/variants/[sku]
function variantHref(categorySlug: string, productId: string, sku: string) {
  return `/products/${categorySlug}/${productId}/variants/${sku}`;
}

/* ------------------------------------------------------------------ */
/* Card components (now Link-wrapped)                                 */
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
  return (
    <Link
      href={variantHref(categorySlug, productId, specs.SKU)}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box
        sx={{
          bgcolor: "#fff",
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: 2,
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          height: "100%",
          cursor: "pointer",
          transition: "box-shadow 0.15s, transform 0.15s",
          "&:hover": {
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            transform: "translateY(-2px)",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            aspectRatio: "1 / 1",
            bgcolor: "background.paper",
            borderRadius: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            mb: 0.5,
          }}
        >
          <Box
            component="img"
            src={thumbnailImage}
            alt={productName}
            sx={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain" }}
          />
        </Box>

        <Typography
          sx={{
            fontSize: "0.7rem",
            fontWeight: 700,
            color: BRAND,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {productName}
        </Typography>

        <Typography
          sx={{
            fontSize: "0.72rem",
            color: "text.secondary",
            fontFamily: "monospace",
          }}
        >
          {specs.SKU}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
          {specEntries(specs)
            .slice(0, 3)
            .map(([key, value]) => (
              <Chip
                key={key}
                label={value}
                size="small"
                sx={{
                  fontSize: "0.68rem",
                  height: 22,
                  bgcolor: "background.paper",
                  color: "text.primary",
                  textTransform: "capitalize",
                }}
              />
            ))}
        </Box>

        <Typography
          sx={{
            fontSize: "1.15rem",
            fontWeight: 800,
            color: "text.primary",
            mt: "auto",
            pt: 1,
          }}
        >
          £{specs.Price}
        </Typography>
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
  return (
    <Link
      href={variantHref(categorySlug, productId, specs.SKU)}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box
        sx={{
          bgcolor: "#fff",
          border: `1px solid rgba(0,0,0,0.08)`,
          borderRadius: 3,
          p: { xs: 3, md: 4 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "6px",
            height: "100%",
            bgcolor: BRAND,
          }}
        />
        <Box
          sx={{
            width: { xs: "100%", md: 260 },
            height: 260,
            flexShrink: 0,
            bgcolor: "background.paper",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={thumbnailImage}
            alt={productName}
            sx={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain" }}
          />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Chip
            label="Best Value"
            size="small"
            sx={{
              bgcolor: BRAND,
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.7rem",
              mb: 1.5,
            }}
          />
          <Typography
            sx={{
              fontSize: { xs: "1.3rem", md: "1.6rem" },
              fontWeight: 800,
              color: "text.primary",
              mb: 0.5,
            }}
          >
            {productName}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.8rem",
              color: "text.secondary",
              fontFamily: "monospace",
              mb: 2,
            }}
          >
            {specs.SKU}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 2.5 }}>
            {specEntries(specs).map(([key, value]) => (
              <Chip
                key={key}
                label={`${key}: ${value}`}
                size="small"
                sx={{
                  fontSize: "0.72rem",
                  height: 24,
                  bgcolor: "background.paper",
                  color: "text.primary",
                  textTransform: "capitalize",
                }}
              />
            ))}
          </Box>

          <Typography
            sx={{ fontSize: "2rem", fontWeight: 800, color: BRAND_DARK }}
          >
            £{specs.Price}
          </Typography>
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
      "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/reducing-fitting.png",
    categorySlug: "high-pressure-fittings",
    variants: [
      {
        id: "FTNES02",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/reducing-fitting.png",
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
          "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/reducing-fitting.png",
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
          "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/reducing-fitting.png",
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
      "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/Accessory.png",
    categorySlug: "high-pressure-fittings",
    variants: [
      {
        id: "FA15SS02",
        thumbnailImage:
          "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/Accessory.png",
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
          "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/Accessory.png",
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
          "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/Accessory.png",
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

export default function ShopLandingPage() {
  return (
    <Box sx={{ bgcolor: PAGE_BG, minHeight: "100vh" }}>
      {/* Welcome hero */}
      <Box
        sx={{
          bgcolor: "#fff",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          px: { xs: 3, md: 8 },
          py: { xs: 5, md: 7 },
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            bgcolor: "primary.main",
          }}
        />
        <Box sx={{ maxWidth: "1280px", mx: "auto", textAlign: "center" }}>
          <Typography
            sx={{
              color: "primary.main",
              letterSpacing: "0.2em",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            Hiflux
          </Typography>
          <Typography
            component="h1"
            sx={{
              color: "text.primary",
              fontSize: { xs: "2rem", md: "2.8rem" },
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              mb: 1.5,
            }}
          >
            Welcome to the Hiflux Shop
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "1rem",
              maxWidth: 560,
              mx: "auto",
              mb: 3,
            }}
          >
            High pressure valves, fittings and accessories, engineered to spec —
            browse our range below.
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: { xs: 2, md: 4 },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <InventoryOutlinedIcon sx={{ fontSize: 18, color: BRAND }} />
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "text.primary",
                }}
              >
                All products shown are in stock
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocalShippingOutlinedIcon sx={{ fontSize: 18, color: BRAND }} />
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "text.primary",
                }}
              >
                Fast dispatch on every order
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <Box
        sx={{
          maxWidth: "1600px",
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: { xs: 5, md: 7 },
        }}
      >
        {/* Featured */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <Box sx={{ width: 3, height: 20, bgcolor: BRAND }} />
          <Typography sx={{ fontSize: "1.3rem", fontWeight: 800 }}>
            Featured
          </Typography>
        </Box>
        <FeaturedCard
          variant={FEATURED_PICK.variant}
          productName={FEATURED_PICK.productName}
          thumbnailImage={FEATURED_PICK.thumbnailImage}
          categorySlug={FEATURED_PICK.categorySlug}
          productId={FEATURED_PICK.productId}
        />

        {/* Rest of the shelf */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, mt: 5 }}
        >
          <Box sx={{ width: 3, height: 20, bgcolor: BRAND }} />
          <Typography sx={{ fontSize: "1.3rem", fontWeight: 800 }}>
            More Products
          </Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 2,
          }}
        >
          {ALL_VARIANTS.filter(
            (v) => v.variant.id !== FEATURED_PICK.variant.id,
          ).map(({ productName, thumbnailImage, variant, categorySlug, productId }) => (
            <GridCard
              key={variant.id}
              variant={variant}
              productName={productName}
              thumbnailImage={thumbnailImage}
              categorySlug={categorySlug}
              productId={productId}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}