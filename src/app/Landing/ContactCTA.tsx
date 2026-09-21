"use client";

import { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PhoneIcon from "@mui/icons-material/Phone";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const EMAIL = "sales@hiflux.uk.com";
const PHONE_DISPLAY = "+44 7369 243459";
const PHONE_HREF = "+447369243459";
const CATALOG_PDF =
  "https://pblol2.blob.core.windows.net/hiflux/catalogs/hiflux_catalog_en.pdf";

export default function ContactCTA() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Frontend-only enquiry handoff: open the visitor's mail client with the
  // form contents prefilled to sales@. No backend/API involved.
  const mailtoHref =
    `mailto:${EMAIL}` +
    `?subject=${encodeURIComponent(
      `Website enquiry${name ? ` from ${name}` : ""}`,
    )}` +
    `&body=${encodeURIComponent(
      `${message}\n\n---\nName: ${name}\nEmail: ${email}`,
    )}`;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: "#FAF6F4" }}>
      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 3, md: 8 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
          gap: 6,
          alignItems: "center",
        }}
      >
        {/* left: copy */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <Box sx={{ width: 32, height: 1, bgcolor: "primary.main" }} />
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "primary.main",
                textTransform: "uppercase",
              }}
            >
              Get In Touch
            </Typography>
          </Box>

          <Typography
            component="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.9rem", md: "2.5rem" },
              lineHeight: 1.15,
              color: "text.primary",
              mb: 2.5,
            }}
          >
            Send us your specification. We&apos;ll come back with a price and
            the paperwork.
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "1rem",
              lineHeight: 1.75,
              mb: 4,
              maxWidth: 520,
            }}
          >
            Whether it&apos;s a single valve or a full system, send your
            pressure rating, connection type and material requirement.
            We&apos;ll confirm availability, pricing and the certification that
            comes with it.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              disableElevation
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: "primary.main",
                color: "#fff",
                fontWeight: 700,
                borderRadius: 0,
                px: 3,
                py: 1.2,
                textTransform: "none",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              Request a Quote
            </Button>
            <Button
              component="a"
              href={`tel:${PHONE_HREF}`}
              variant="outlined"
              startIcon={<PhoneIcon />}
              sx={{
                borderRadius: 0,
                px: 3,
                py: 1.2,
                fontWeight: 700,
                textTransform: "none",
                borderColor: "primary.main",
                color: "primary.main",
                "&:hover": { bgcolor: "primary.main", color: "#fff", borderColor: "primary.main" },
              }}
            >
              Call {PHONE_DISPLAY}
            </Button>
            <Button
              component="a"
              href={CATALOG_PDF}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              startIcon={<MenuBookIcon />}
              sx={{
                borderRadius: 0,
                px: 3,
                py: 1.2,
                fontWeight: 700,
                textTransform: "none",
                borderColor: "rgba(0,0,0,0.25)",
                color: "text.primary",
                "&:hover": { borderColor: "text.primary", bgcolor: "rgba(0,0,0,0.03)" },
              }}
            >
              Download the Catalogue
            </Button>
          </Box>
        </Box>

        {/* right: contact form card — opens a prefilled email on submit */}
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = mailtoHref;
          }}
          sx={{
            bgcolor: "#fff",
            border: "1px solid",
            borderColor: "rgba(0,0,0,0.08)",
            borderRadius: "4px",
            p: { xs: 3, md: 4 },
            boxShadow: "0 12px 32px rgba(0,0,0,0.06)",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
              label="Full Name"
              variant="outlined"
              size="small"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "primary.main",
                  },
                "& .MuiInputLabel-root.Mui-focused": { color: "primary.main" },
              }}
            />
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              size="small"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "primary.main",
                  },
                "& .MuiInputLabel-root.Mui-focused": { color: "primary.main" },
              }}
            />
            <TextField
              label="What do you need?"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "primary.main",
                  },
                "& .MuiInputLabel-root.Mui-focused": { color: "primary.main" },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              disableElevation
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: "primary.main",
                color: "#fff",
                fontWeight: 700,
                borderRadius: "2px",
                py: 1.3,
                textTransform: "none",
                fontSize: "0.95rem",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              Send Enquiry
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
