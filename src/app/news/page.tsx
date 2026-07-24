"use client";

import { Box, Chip, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { blogs } from "./data/blogs";

export default function NewsPage() {
  const featured = blogs[0];
  const rest = blogs.slice(1);

  return (
    <Box sx={{ bgcolor: "background.paper", minHeight: "100vh" }}>
      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 320, md: 440 },
          overflow: "hidden",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=90"
          alt="News hero"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%)",
          }}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            px: { xs: 3, md: 8 },
            pb: { xs: 4, md: 6 },
            maxWidth: 1100,
            mx: "auto",
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "primary.light",
              letterSpacing: 6,
              fontSize: "0.7rem",
              display: "block",
              mb: 2,
            }}
          >
            Latest News
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              maxWidth: 560,
            }}
          >
            Insights, Stories & Updates
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.7)",
              mt: 2,
              maxWidth: 440,
              lineHeight: 1.75,
            }}
          >
            News, updates and insights from our team.
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        {/* Featured */}
        <Box
          component={Link}
          href={`/news/${featured.slug}`}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            mb: 8,
            textDecoration: "none",
            border: "1px solid",
            borderColor: "divider",
            transition: "border-color 0.2s ease",
            borderRadius: "8px",
            overflow: "hidden",
            "&:hover": { borderColor: "primary.main" },
          }}
        >
          <Box
            component="img"
            src={featured.heroImage}
            alt={featured.title}
            sx={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
          <Box
            sx={{
              p: { xs: 3, md: 5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              bgcolor: "background.default",
            }}
          >
            <Chip
              label={featured.category}
              size="small"
              color="primary"
              sx={{
                borderRadius: 0,
                fontWeight: 600,
                width: "fit-content",
                mb: 2,
              }}
            />
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: "text.primary", lineHeight: 1.2 }}
            >
              {featured.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", lineHeight: 1.75 }}
            >
              {featured.excerpt}
            </Typography>
          </Box>
        </Box>

        {/* Rest */}
        <Grid container spacing={3}>
          {rest.map((blog) => (
            <Grid key={blog.slug} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                component={Link}
                href={`/news/${blog.slug}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  border: "1px solid",
                  borderColor: "divider",
                  height: "100%",
                  bgcolor: "background.default",
                  transition: "border-color 0.2s ease",
                  "&:hover": { borderColor: "primary.main" },
                  "&:hover .blog-title": { color: "primary.main" },
                }}
              >
                <Box
                  component="img"
                  src={blog.heroImage}
                  alt={blog.title}
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    display: "block",
                    bgcolor: "background.paper",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                />
                <Box
                  sx={{
                    p: 3,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Chip
                    label={blog.category}
                    size="small"
                    variant="outlined"
                    color="primary"
                    sx={{
                      borderRadius: 0,
                      fontWeight: 600,
                      width: "fit-content",
                      mb: 1.5,
                      fontSize: "0.7rem",
                    }}
                  />
                  <Typography
                    variant="h6"
                    className="blog-title"
                    sx={{
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "text.primary",
                      lineHeight: 1.3,
                      mb: 1.5,
                      transition: "color 0.2s ease",
                    }}
                  >
                    {blog.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.8rem",
                      lineHeight: 1.65,
                      mb: 2,
                      flexGrow: 1,
                    }}
                  >
                    {blog.excerpt}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mt: "auto",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: "text.disabled" }}
                    >
                      {blog.date}
                    </Typography>
                    <Typography
                      sx={{
                        color: "primary.main",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                      }}
                    >
                      Read →
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
