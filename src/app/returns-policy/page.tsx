"use client";

import React from "react";
import { Box, Container, Typography, Grid, Stack } from "@mui/material";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import BlockIcon from "@mui/icons-material/Block";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import { alpha } from "@mui/material/styles";

const returnPoints = [
  {
    icon: <EventBusyIcon />,
    title: "30-Day Return Window",
    text: "Items may be returned within 30 days of delivery for a refund or exchange, provided they're unused and in original packaging.",
  },
  {
    icon: <BlockIcon />,
    title: "Non-Returnable Items",
    text: "Perishable, personalised, or made-to-order items are excluded from returns unless faulty or damaged.",
  },
  {
    icon: <BuildCircleIcon />,
    title: "Faulty or Damaged Goods",
    text: "Report faulty or damaged items within 48 hours of delivery. We'll arrange a replacement or full refund at no cost to you.",
  },
  {
    icon: <AssignmentReturnIcon />,
    title: "How to Start a Return",
    text: "Email us with your order number and reason for return. We'll issue return instructions within 1 working day.",
  },
];

const InfoCard = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => (
  <Grid size={{ xs: 12, sm: 6 }}>
    <Stack
      spacing={2}
      sx={{
        height: "100%",
        p: 4,
        bgcolor: "#fff",
        border: "1px solid",
        borderColor: "divider",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: (theme) =>
            `0 15px 30px ${alpha(theme.palette.primary.main, 0.12)}`,
        },
      }}
    >
      <Box sx={{ color: "primary.main", display: "flex" }}>{icon}</Box>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 800, color: "text.primary" }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", lineHeight: 1.7 }}
      >
        {text}
      </Typography>
    </Stack>
  </Grid>
);

const ReturnsPolicyPage = () => {
  return (
    <Box component="section" sx={{ bgcolor: "background.default" }}>
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#fff",
          borderBottom: "1px solid",
          borderColor: "divider",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", mb: 2 }}
          >
            <Typography
              variant="overline"
              sx={{
                fontWeight: 800,
                color: "primary.main",
                letterSpacing: 1.5,
              }}
            >
              Customer Service
            </Typography>
            <Box sx={{ width: 40, height: "1px", bgcolor: "primary.main" }} />
          </Stack>
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, fontSize: { xs: "2.25rem", md: "3rem" } }}
          >
            Returns{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              Policy
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", maxWidth: 640, mt: 2 }}
          >
            We want you to be happy with your order. If something isn't
            right, here's how returns work.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={3}>
          {returnPoints.map((p, i) => (
            <InfoCard key={i} {...p} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ReturnsPolicyPage;