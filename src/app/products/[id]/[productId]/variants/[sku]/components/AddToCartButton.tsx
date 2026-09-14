"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { useCartStore } from "@/store/useCartStore";

const BRAND = "#0072BC";

/** Interactive add-to-cart leaf so the surrounding variant page can be server-rendered. */
export default function AddToCartButton({
  productId,
  sku,
  name,
  thumbnailImage,
  price,
}: {
  productId: string;
  sku: string;
  name: string;
  thumbnailImage: string;
  price: number;
}) {
  const addItem = useCartStore((state) => state.addItem);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({ productId, sku, name, thumbnailImage, price });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
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
  );
}
