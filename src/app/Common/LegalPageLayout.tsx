"use client";

import { Box, Container, Typography, Stack } from "@mui/material";

export interface LegalSection {
  heading: string;
  // Each string is one paragraph. Keep plain text; no HTML.
  body: string[];
}

/**
 * Shared shell for the static legal pages (privacy, terms, cookies, returns).
 * Pages stay server components (so they can export `metadata` for SEO) and pass
 * their content in as props; this client component only handles presentation.
 */
export default function LegalPageLayout({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
}) {
  return (
    <Box component="main" sx={{ bgcolor: "#f3f6fa", py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "1.9rem", md: "2.6rem" },
            fontWeight: 800,
            color: "text.primary",
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ mt: 1.5, fontSize: "0.82rem", color: "text.secondary" }}>
          Last updated: {lastUpdated}
        </Typography>

        {intro && (
          <Typography
            sx={{
              mt: 3,
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "text.secondary",
            }}
          >
            {intro}
          </Typography>
        )}

        <Stack spacing={4} sx={{ mt: 5 }}>
          {sections.map((section) => (
            <Box key={section.heading} component="section">
              <Typography
                component="h2"
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "text.primary",
                  mb: 1.5,
                }}
              >
                {section.heading}
              </Typography>
              {section.body.map((paragraph, i) => (
                <Typography
                  key={i}
                  sx={{
                    fontSize: "0.95rem",
                    lineHeight: 1.75,
                    color: "text.secondary",
                    mb: 1.5,
                  }}
                >
                  {paragraph}
                </Typography>
              ))}
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
