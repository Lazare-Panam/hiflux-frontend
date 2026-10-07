"use client";

import { useState } from "react";
import { Box, Typography, TextField, Button, Alert, CircularProgress, InputAdornment } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { COMPANY } from "@/app/Common/company";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import axios from "axios";
import axiosClient from "@/api/axiosClient";

// Backend endpoint for enquiries, relative to the API base URL in
// src/api/axiosClient.ts. Change this if your controller uses a different route.
export const CONTACT_ENDPOINT = "/api/contact";

const EMAIL = "sales@hiflux.uk.com";

type Fields = {
  name: string;
  email: string;
  company: string;
  country: string;
  productOrPartNumber: string;
  message: string;
};

const EMPTY: Fields = { name: "", email: "", company: "", country: "", productOrPartNumber: "", message: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mirrors the [StringLength] rules on Hiflux.API's ContactEnquiry model.
const MAX: Record<keyof Fields, number> = {
  name: 100,
  email: 254,
  company: 150,
  country: 100,
  productOrPartNumber: 150,
  message: 5000,
};
const MESSAGE_MIN = 10;

function validate(f: Fields): Partial<Record<keyof Fields, string>> {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (!f.name.trim()) errors.name = "Please enter your name";
  if (!f.email.trim()) errors.email = "Please enter your email";
  else if (!EMAIL_RE.test(f.email.trim())) errors.email = "Please enter a valid email address";
  if (!f.message.trim()) errors.message = "Please tell us what you need";
  else if (f.message.trim().length < MESSAGE_MIN)
    errors.message = `Please add a little more detail (at least ${MESSAGE_MIN} characters)`;
  return errors;
}

// Hiflux.API responses: 400 = validation (ProblemDetails with PascalCase field
// keys), 429 = rate limit (5 per IP per 10 minutes), 503 = email not sent
// (body carries a customer-facing message).
function describeError(
  err: unknown,
  setErrors: (e: Partial<Record<keyof Fields, string>>) => void,
): string {
  if (!axios.isAxiosError(err)) return "Something went wrong.";
  const res = err.response;
  if (!res) return "We couldn't reach the server.";
  const data = res.data as { message?: string; errors?: Record<string, string[]> } | undefined;

  if (res.status === 400 && data?.errors) {
    const mapped: Partial<Record<keyof Fields, string>> = {};
    for (const [key, msgs] of Object.entries(data.errors)) {
      const field = (key.charAt(0).toLowerCase() + key.slice(1)) as keyof Fields;
      if (field in MAX) mapped[field] = msgs[0];
    }
    setErrors(mapped);
    return "Please check the highlighted fields.";
  }
  if (res.status === 429) return "You've sent several enquiries in a short time. Please wait a few minutes and try again.";
  if (data?.message) return data.message;
  return `The server responded with ${res.status}.`;
}

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  // Honeypot: real visitors never see or fill this; bots usually do.
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [failure, setFailure] = useState("");

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("sending");
    try {
      await axiosClient.post(CONTACT_ENDPOINT, {
        name: fields.name.trim(),
        email: fields.email.trim(),
        company: fields.company.trim(),
        country: fields.country.trim(),
        productOrPartNumber: fields.productOrPartNumber.trim(),
        message: fields.message.trim(),
        // Honeypot: the API accepts and silently discards anything that fills this in.
        website,
      });
      setStatus("sent");
      setFields(EMPTY);
    } catch (err) {
      setFailure(describeError(err, setErrors));
      setStatus("failed");
    }
  };

  const sending = status === "sending";

  return (
    <Box
      component="section"
      aria-labelledby="enquiry-heading"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "380px 1fr" },
        bgcolor: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(15,40,70,0.08)",
        boxShadow: "0 2px 4px rgba(15,40,70,0.04), 0 24px 56px rgba(15,40,70,0.10)",
        position: "relative",
        "& .MuiTypography-root": { textTransform: "none" },
      }}
    >
      {/* Left: contact panel */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          color: "#fff",
          p: { xs: 3.5, md: 4.5 },
          background: "linear-gradient(160deg, #0072BC 0%, #00539B 55%, #002d54 100%)",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* soft decorative rings */}
        <Box aria-hidden sx={{ position: "absolute", width: 260, height: 260, borderRadius: "50%", border: "40px solid rgba(255,255,255,0.06)", right: -110, bottom: -110 }} />
        <Box aria-hidden sx={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.06)", right: 40, top: -50 }} />

        <Box sx={{ position: "relative" }}>
          <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase !important" }}>
            Talk to our team
          </Typography>
          <Typography sx={{ fontSize: "1.35rem", fontWeight: 800, lineHeight: 1.3, mt: 1 }}>
            Engineers who know high pressure
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.95rem", lineHeight: 1.65, mt: 1.25 }}>
            We&apos;ll come back with part numbers, documentation and a price, usually within one working day.
          </Typography>
        </Box>

        <Box sx={{ position: "relative", display: "flex", flexDirection: "column", gap: 2 }}>
          {[
            { icon: <EmailOutlinedIcon fontSize="small" />, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
            { icon: <PhoneOutlinedIcon fontSize="small" />, label: "Phone", value: "+44 7369 243459", href: "tel:+447369243459" },
            { icon: <PlaceOutlinedIcon fontSize="small" />, label: "Office", value: `${COMPANY.office.street}, ${COMPANY.office.locality} ${COMPANY.office.postcode}` },
            { icon: <ScheduleOutlinedIcon fontSize="small" />, label: "Response", value: "Within one working day" },
          ].map((c) => (
            <Box key={c.label} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box sx={{ width: 38, height: 38, flexShrink: 0, borderRadius: "10px", bgcolor: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {c.icon}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.65)", fontWeight: 600 }}>{c.label}</Typography>
                {c.href ? (
                  <Box component="a" href={c.href} sx={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none", wordBreak: "break-word", "&:hover": { textDecoration: "underline" } }}>
                    {c.value}
                  </Box>
                ) : (
                  <Typography sx={{ fontWeight: 600, fontSize: "0.95rem" }}>{c.value}</Typography>
                )}
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ position: "relative", mt: "auto", pt: 3, borderTop: "1px solid rgba(255,255,255,0.15)" }}>
          <Typography sx={{ fontSize: "0.88rem", lineHeight: 1.6, color: "rgba(255,255,255,0.8)" }}>
            Authorised UK &amp; EU distributor for HIFLUX Co., Ltd. Genuine product, manufacturer documentation and
            UK-based support.
          </Typography>
        </Box>
      </Box>

      {/* Right: form */}
      <Box sx={{ p: { xs: 3, md: 5 } }}>
        <Typography id="enquiry-heading" component="h2" sx={{ fontSize: { xs: "1.45rem", md: "1.7rem" }, fontWeight: 800, color: "text.primary" }}>
          Send your enquiry
        </Typography>
        <Typography sx={{ color: "text.secondary", mt: 0.75, mb: 3.5, fontSize: "0.98rem" }}>
          Fill in your details and requirements. Fields marked <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>*</Box> are required.
        </Typography>

        {status === "sent" ? (
          <Box sx={{ textAlign: "center", py: { xs: 4, md: 6 }, px: 2 }}>
            <Box sx={{ width: 72, height: 72, mx: "auto", mb: 2.5, borderRadius: "50%", bgcolor: "rgba(46,125,50,0.1)", color: "#2e7d32", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CheckCircleOutlineIcon sx={{ fontSize: 40 }} />
            </Box>
            <Typography sx={{ fontSize: "1.3rem", fontWeight: 800, color: "text.primary" }}>Enquiry sent. Thank you!</Typography>
            <Typography sx={{ color: "text.secondary", mt: 1, maxWidth: 420, mx: "auto", lineHeight: 1.65 }}>
              We&apos;ve emailed you a copy. Our team will come back to you shortly, usually within one working day.
            </Typography>
            <Button variant="outlined" onClick={() => setStatus("idle")} sx={{ mt: 3, borderRadius: "10px", px: 3, py: 1, fontWeight: 700, textTransform: "none" }}>
              Send another enquiry
            </Button>
          </Box>
        ) : (
          <Box component="form" noValidate onSubmit={onSubmit}>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, columnGap: 2.5, rowGap: 2.25 }}>
              <Field label="Name" required icon={<PersonOutlineIcon />} placeholder="Jane Smith" autoComplete="name"
                value={fields.name} onChange={set("name")} max={MAX.name} error={errors.name} />
              <Field label="Email" required icon={<EmailOutlinedIcon />} placeholder="jane@company.com" type="email" autoComplete="email"
                value={fields.email} onChange={set("email")} max={MAX.email} error={errors.email} />
              <Field label="Company" icon={<BusinessOutlinedIcon />} placeholder="Company name" autoComplete="organization"
                value={fields.company} onChange={set("company")} max={MAX.company} />
              <Field label="Country" icon={<PublicOutlinedIcon />} placeholder="United Kingdom" autoComplete="country-name"
                value={fields.country} onChange={set("country")} max={MAX.country} />
              <Field label="Product or part number" hint="Optional" icon={<Inventory2OutlinedIcon />} placeholder="e.g. NV60VS06-T"
                value={fields.productOrPartNumber} onChange={set("productOrPartNumber")} max={MAX.productOrPartNumber} wide />
              <Field label="Message" required multiline placeholder="Pressure, tube size, media, quantity and anything else that helps us quote."
                value={fields.message} onChange={set("message")} max={MAX.message} error={errors.message} wide
                counter={`${fields.message.length} / ${MAX.message}`} />
            </Box>

            {/* Honeypot, hidden from people and screen readers */}
            <Box aria-hidden sx={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
              <label>
                Website
                <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </label>
            </Box>

            {status === "failed" && (
              <Alert severity="error" sx={{ mt: 2.5, borderRadius: "10px" }}>
                Your enquiry couldn&apos;t be sent. {failure}
                {!failure.includes(EMAIL) && (
                  <>
                    {" "}Please try again, or email us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                  </>
                )}
              </Alert>
            )}

            <Box sx={{ mt: 3.5, display: "flex", alignItems: { sm: "center" }, flexDirection: { xs: "column-reverse", sm: "row" }, gap: 2, justifyContent: "space-between" }}>
              <Typography sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "text.secondary", fontSize: "0.82rem" }}>
                <LockOutlinedIcon sx={{ fontSize: 16 }} /> We only use your details to reply to this enquiry.
              </Typography>
              <Button
                type="submit"
                variant="contained"
                disableElevation
                disabled={sending}
                endIcon={sending ? <CircularProgress size={18} color="inherit" /> : <ArrowForwardIcon />}
                sx={{
                  minWidth: 220,
                  py: 1.5,
                  px: 3.5,
                  fontSize: "1rem",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #0a84d6 0%, #0072BC 50%, #00539B 100%)",
                  boxShadow: "0 8px 20px rgba(0,114,188,0.28)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  "&:hover": { transform: "translateY(-1px)", boxShadow: "0 12px 26px rgba(0,114,188,0.36)" },
                  "&.Mui-disabled": { color: "#fff", opacity: 0.8 },
                }}
              >
                {sending ? "Sending…" : "Submit Enquiry"}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

// A labelled input: label above, soft filled box, optional leading icon,
// blue focus ring, error text below.
function Field({
  label,
  required,
  hint,
  icon,
  error,
  max,
  wide,
  multiline,
  counter,
  ...input
}: {
  label: string;
  required?: boolean;
  hint?: string;
  icon?: React.ReactNode;
  error?: string;
  max: number;
  wide?: boolean;
  multiline?: boolean;
  counter?: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  const id = `enquiry-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  return (
    <Box sx={{ gridColumn: wide ? { sm: "1 / -1" } : undefined }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 0.75 }}>
        <Box component="label" htmlFor={id} sx={{ fontSize: "0.86rem", fontWeight: 700, color: "text.primary" }}>
          {label}
          {required && <Box component="span" aria-hidden sx={{ color: "primary.main", ml: 0.4 }}>*</Box>}
        </Box>
        {hint && <Typography sx={{ fontSize: "0.75rem", color: "text.secondary" }}>{hint}</Typography>}
      </Box>
      <TextField
        id={id}
        fullWidth
        required={required}
        multiline={multiline}
        minRows={multiline ? 5 : undefined}
        error={!!error}
        {...input}
        slotProps={{
          htmlInput: { maxLength: max, "aria-required": required || undefined },
          input: icon
            ? { startAdornment: <InputAdornment position="start" sx={{ color: error ? "error.main" : "#94a3b8" }}>{icon}</InputAdornment> }
            : undefined,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            bgcolor: "#f6f8fb",
            transition: "background-color 0.15s ease, box-shadow 0.15s ease",
            "& fieldset": { borderColor: "transparent" },
            "&:hover fieldset": { borderColor: "rgba(0,114,188,0.35)" },
            "&.Mui-focused": { bgcolor: "#fff", boxShadow: "0 0 0 4px rgba(0,114,188,0.12)" },
            "&.Mui-focused fieldset": { borderColor: "primary.main", borderWidth: "1.5px" },
            "&.Mui-error": { bgcolor: "#fff7f7" },
            "&.Mui-error fieldset": { borderColor: "error.main" },
          },
          "& .MuiInputBase-input::placeholder": { color: "#94a3b8", opacity: 1 },
          "& .MuiInputAdornment-root svg": { fontSize: 20 },
        }}
      />
      {(error || counter) && (
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.6, gap: 2 }}>
          <Typography role={error ? "alert" : undefined} sx={{ fontSize: "0.78rem", color: "error.main" }}>{error}</Typography>
          {counter && <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", flexShrink: 0 }}>{counter}</Typography>}
        </Box>
      )}
    </Box>
  );
}
