"use client";

import { Box, Typography, Button, TextField } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function ContactCTA() {
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
              fontSize: { xs: "2rem", md: "2.75rem" },
              lineHeight: 1.15,
              color: "text.primary",
              mb: 2.5,
            }}
          >
            Talk to us. We'll give you
            <br />
            the best price in the market.
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "1rem",
              lineHeight: 1.75,
              mb: 4,
              maxWidth: 480,
            }}
          >
            Whether it's a single valve or a full pipeline order, our team
            responds fast with specs, certifications, and pricing — no
            middlemen, no guesswork.
          </Typography>

          <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "text.primary",
                  mb: 0.5,
                }}
              >
                Email
              </Typography>
              <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
                sales@marsvalveuk.com
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "text.primary",
                  mb: 0.5,
                }}
              >
                Phone
              </Typography>
              <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
                +44 7368 1379917
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* right: contact form card */}
        <Box
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
              variant="outlined"
              size="small"
              fullWidth
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
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "primary.main",
                  },
                "& .MuiInputLabel-root.Mui-focused": { color: "primary.main" },
              }}
            />

            <Button
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
