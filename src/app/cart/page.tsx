"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import { DeleteOutlineOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIosNew";
import { useCartStore } from "@/store/useCartStore";

const PAGE_BG = "#EAF3FB";

export default function CartPage() {
  const theme = useTheme();
  const ACCENT = theme.palette.primary.main;
  const INK = theme.palette.text.primary;
  const RUST = theme.palette.text.secondary;
  const PAPER = theme.palette.background.paper;

  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const totalItems = useCartStore((state) => state.totalItems());

  if (items.length === 0) {
    return (
      <Box sx={{ bgcolor: PAGE_BG, minHeight: "100vh" }}>
        <Box
          sx={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            px: 3,
            py: 10,
          }}
        >
          <ShoppingBagOutlinedIcon
            sx={{ fontSize: 56, color: alpha(INK, 0.2), mb: 2 }}
          />
          <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", mb: 1 }}>
            Your cart is empty
          </Typography>
          <Typography sx={{ color: RUST, fontSize: "0.9rem", mb: 3 }}>
            Browse the shop to find valves, fittings, and accessories.
          </Typography>
          <Button
            component={Link}
            href="/shop"
            variant="contained"
            disableElevation
            sx={{ px: 3, py: 1.2, fontWeight: 600 }}
          >
            Go to shop
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: PAGE_BG, minHeight: "100vh" }}>
      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 6 },
        }}
      >
        <Box
          component={Link}
          href="/shop"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            textDecoration: "none",
            color: ACCENT,
            fontWeight: 700,
            fontSize: "0.8rem",
            mb: 3,
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 12 }} />
          Continue shopping
        </Box>

        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "1.5rem", md: "1.9rem" },
            fontWeight: 800,
            mb: 4,
          }}
        >
          Your Cart{" "}
          <Typography
            component="span"
            sx={{ color: RUST, fontWeight: 500, fontSize: "1rem" }}
          >
            ({totalItems} {totalItems === 1 ? "item" : "items"})
          </Typography>
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          {/* Line items */}
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            {items.map((item) => (
              <Box
                key={item.sku}
                sx={{
                  display: "flex",
                  gap: 2,
                  p: 2,
                  border: `1px solid ${alpha(INK, 0.08)}`,
                  borderRadius: "10px",
                  bgcolor: "#fff",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: 84,
                    height: 84,
                    flexShrink: 0,
                    bgcolor: PAPER,
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={item.thumbnailImage}
                    alt={item.name}
                    fill
                    style={{ objectFit: "contain", padding: 10 }}
                  />
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      color: ACCENT,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      color: RUST,
                      fontFamily: "monospace",
                    }}
                  >
                    {item.sku}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "1rem", fontWeight: 800, mt: 0.5 }}
                  >
                    £{item.price.toFixed(2)}
                  </Typography>
                </Box>

                {/* Quantity stepper */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: `1px solid ${alpha(INK, 0.12)}`,
                    borderRadius: "8px",
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                    sx={{ borderRadius: "8px 0 0 8px" }}
                  >
                    <RemoveIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                  <Typography
                    sx={{
                      width: 28,
                      textAlign: "center",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                    }}
                  >
                    {item.quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                    sx={{ borderRadius: "0 8px 8px 0" }}
                  >
                    <AddIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>

                <IconButton
                  onClick={() => removeItem(item.sku)}
                  aria-label={`Remove ${item.sku}`}
                  sx={{ color: RUST, "&:hover": { color: "#c62828" } }}
                >
                  <DeleteOutlineOutlined sx={{ fontSize: 20 }} />
                </IconButton>
              </Box>
            ))}
          </Box>

          {/* Summary */}
          <Box
            sx={{
              width: { xs: "100%", md: 320 },
              flexShrink: 0,
              border: `1px solid ${alpha(INK, 0.08)}`,
              borderRadius: "10px",
              bgcolor: "#fff",
              p: 3,
              height: "fit-content",
              position: { md: "sticky" },
              top: { md: 24 },
            }}
          >
            <Typography sx={{ fontWeight: 800, fontSize: "1rem", mb: 2 }}>
              Order Summary
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography sx={{ fontSize: "0.85rem", color: RUST }}>
                Subtotal
              </Typography>
              <Typography sx={{ fontSize: "0.85rem", fontWeight: 600 }}>
                £{totalPrice.toFixed(2)}
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography sx={{ fontSize: "0.85rem", color: RUST }}>
                Shipping
              </Typography>
              <Typography sx={{ fontSize: "0.85rem", color: RUST }}>
                Calculated at checkout
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography sx={{ fontWeight: 800 }}>Total</Typography>
              <Typography
                sx={{ fontWeight: 800, fontSize: "1.2rem", color: ACCENT }}
              >
                £{totalPrice.toFixed(2)}
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              disableElevation
              sx={{ py: 1.4, fontWeight: 700 }}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
