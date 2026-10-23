"use client";

import { Box } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

// Prefilled chat to the Hiflux sales WhatsApp number.
const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=447369243459&text=Hi+Hiflux%2C+I+have+an+enquiry.&type=phone_number&app_absent=0";

export default function WhatsAppButton() {
  return (
    <Box
      component="a"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Hiflux on WhatsApp"
      sx={{
        position: "fixed",
        bottom: { xs: 16, md: 24 },
        right: { xs: 16, md: 24 },
        zIndex: 1250,
        width: { xs: 52, md: 58 },
        height: { xs: 52, md: 58 },
        borderRadius: "50%",
        bgcolor: "#25D366",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 6px 20px rgba(0,0,0,0.28)",
        transition: "transform 0.15s ease, background-color 0.15s ease",
        "&:hover": { bgcolor: "#1ebe5d", transform: "scale(1.06)" },
      }}
    >
      <WhatsAppIcon sx={{ fontSize: { xs: 28, md: 32 } }} />
    </Box>
  );
}
