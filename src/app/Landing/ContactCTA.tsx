"use client";

import { useState } from "react";
import { Box, Typography, InputBase } from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { BLUE_BG } from "@/theme/brand";

const EMAIL = "sales@hiflux.uk.com";
const PHONE_DISPLAY = "+44 7369 243459";
const PHONE_HREF = "+447369243459";
const CATALOG_PDF = "https://pblol2.blob.core.windows.net/hiflux/catalogs/hiflux_catalog_en.pdf";

const fieldSx = {
  width: "100%",
  px: 1.75,
  py: 1.1,
  borderRadius: "10px",
  bgcolor: "#f5f8fb",
  border: "1px solid rgba(15,40,70,0.1)",
  fontSize: "0.95rem",
  transition: "border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease",
  "&.Mui-focused": { bgcolor: "#fff", borderColor: "primary.main", boxShadow: "0 0 0 3px rgba(0,114,188,0.12)" },
} as const;

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <Box component="label" htmlFor={htmlFor} sx={{ display: "block", mb: 0.75, fontSize: "0.85rem", fontWeight: 700, color: "text.primary" }}>
      {children}
    </Box>
  );
}

export default function ContactCTA() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Frontend-only enquiry handoff: open the visitor's mail client with the
  // form contents prefilled to sales@. No backend/API involved.
  const mailtoHref =
    `mailto:${EMAIL}` +
    `?subject=${encodeURIComponent(`Website enquiry${name ? ` from ${name}` : ""}`)}` +
    `&body=${encodeURIComponent(`${message}\n\n---\nName: ${name}\nEmail: ${email}`)}`;

  const contacts = [
    { Icon: PhoneOutlinedIcon, label: "Call us", value: PHONE_DISPLAY, href: `tel:${PHONE_HREF}`, aria: `Call ${PHONE_DISPLAY}` },
    { Icon: EmailOutlinedIcon, label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, aria: `Email ${EMAIL}` },
    { Icon: MenuBookOutlinedIcon, label: "Catalogue", value: "Download the PDF", href: CATALOG_PDF, external: true, aria: "Download the Catalogue" },
  ];

  return (
    <Box component="section" sx={{ py: { xs: 5, md: 9 }, px: { xs: 2, md: 4 }, bgcolor: "#fff", "& .MuiTypography-root": { textTransform: "none" } }}>
      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          borderRadius: { xs: "22px", md: "32px" },
          background: BLUE_BG,
          color: "#fff",
          px: { xs: 3, md: 7 },
          py: { xs: 5, md: 7 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr" },
          gap: { xs: 4, md: 8 },
          alignItems: "center",
        }}
      >
        {/* Copy + direct contacts */}
        <Box>
          <Typography sx={{ color: "rgba(255,255,255,0.75)", letterSpacing: "0.2em", fontSize: "0.74rem", fontWeight: 800, textTransform: "uppercase !important" }}>
            Get in touch
          </Typography>
          <Typography component="h2" sx={{ mt: 1.25, fontWeight: 800, fontSize: { xs: "1.9rem", md: "2.5rem" }, lineHeight: 1.12, letterSpacing: "-0.02em" }}>
            Send us your specification. We&apos;ll come back with a price and the paperwork.
          </Typography>
          <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.82)", fontSize: "1rem", lineHeight: 1.75, maxWidth: 520 }}>
            Whether it&apos;s a single valve or a full system, send your pressure rating, connection type and material
            requirement. We&apos;ll confirm availability, pricing and the certification that comes with it.
          </Typography>

          <Box sx={{ mt: 4, display: "grid", gap: 1.25, maxWidth: 440 }}>
            {contacts.map(({ Icon, label, value, href, external, aria }) => (
              <Box
                key={label}
                component="a"
                href={href}
                aria-label={aria}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.75,
                  p: 1.25,
                  pr: 2,
                  borderRadius: "14px",
                  bgcolor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "#fff",
                  textDecoration: "none",
                  transition: "background-color 0.2s ease",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.16)" },
                  "&:hover .go": { transform: "translateX(3px)" },
                }}
              >
                <Box sx={{ width: 40, height: 40, borderRadius: "10px", bgcolor: "#fff", color: "primary.main", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon sx={{ fontSize: 21 }} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{label}</Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: "0.98rem", wordBreak: "break-word" }}>{value}</Typography>
                </Box>
                <ArrowForwardIcon className="go" sx={{ fontSize: 18, opacity: 0.8, transition: "transform 0.2s ease" }} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Quick enquiry form: opens a prefilled email on submit */}
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = mailtoHref;
          }}
          sx={{ bgcolor: "#fff", color: "text.primary", borderRadius: "22px", p: { xs: 3, md: 4 }, boxShadow: "0 30px 60px rgba(0,20,50,0.3)" }}
        >
          <Typography sx={{ fontWeight: 800, fontSize: "1.3rem" }}>Quick enquiry</Typography>
          <Typography sx={{ mt: 0.5, mb: 2.5, color: "text.secondary", fontSize: "0.9rem" }}>
            We usually reply within one working day.
          </Typography>
          <Box sx={{ display: "grid", gap: 2 }}>
            <Box>
              <Label htmlFor="cta-name">Full name</Label>
              <InputBase id="cta-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" autoComplete="name" sx={fieldSx} />
            </Box>
            <Box>
              <Label htmlFor="cta-email">Email address</Label>
              <InputBase id="cta-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@company.com" autoComplete="email" sx={fieldSx} />
            </Box>
            <Box>
              <Label htmlFor="cta-message">What do you need?</Label>
              <InputBase
                id="cta-message"
                multiline
                minRows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Part numbers, pressure, tube size, quantity…"
                sx={{ ...fieldSx, alignItems: "flex-start" }}
              />
            </Box>
            <Box
              component="button"
              type="submit"
              sx={{
                mt: 0.5,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                py: 1.4,
                border: 0,
                borderRadius: "999px",
                bgcolor: "primary.main",
                color: "#fff",
                fontFamily: "inherit",
                fontWeight: 700,
                fontSize: "0.98rem",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              Send enquiry <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography sx={{ textAlign: "center", fontSize: "0.82rem", color: "text.secondary" }}>
              Bigger project?{" "}
              <Link href="/contact" style={{ color: "#0072BC", fontWeight: 700 }}>
                Use the full enquiry form
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
