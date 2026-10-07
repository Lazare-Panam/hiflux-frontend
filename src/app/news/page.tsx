import type { Metadata } from "next";
import { Box, Chip, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { blogs } from "./data/blogs";
import PageBreadcrumbs from "@/app/Common/PageBreadcrumbs";

const NEWS_TITLE = "High-Pressure Valve News & Technical Guides | Hiflux UK";
const NEWS_DESCRIPTION =
  "Technical guides on high-pressure cone and thread fittings, check valves and regulators, plus Hiflux UK company news.";
const NEWS_URL = "https://www.hiflux.uk.com/news";

// Own canonical and social tags (previously inherited the homepage's og:url and copy).
export const metadata: Metadata = {
  title: NEWS_TITLE,
  description: NEWS_DESCRIPTION,
  alternates: { canonical: NEWS_URL },
  openGraph: { type: "website", siteName: "Hiflux UK", title: NEWS_TITLE, description: NEWS_DESCRIPTION, url: NEWS_URL },
  twitter: { card: "summary_large_image", title: NEWS_TITLE, description: NEWS_DESCRIPTION },
};



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
              "linear-gradient(to right, rgba(0,58,110,0.85) 0%, rgba(0,83,155,0.45) 60%, rgba(0,114,188,0.15) 100%)",
          }}
        />

        {/* Back to Home button */}
        <Box
          component="a"
          href="/"
          sx={{
            position: "absolute",
            top: { xs: 16, md: 24 },
            left: { xs: 16, md: 24 },
            zIndex: 2,
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            px: 2,
            py: 0.75,
            borderRadius: "999px",
            textDecoration: "none",
            bgcolor: "rgba(0,0,0,0.35)",
            border: "1px solid rgba(255,255,255,0.35)",
            backdropFilter: "blur(4px)",
            color: "#fff",
            fontSize: "0.8rem",
            fontWeight: 600,
            transition: "background-color 0.2s ease, border-color 0.2s ease",
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.55)",
              borderColor: "rgba(255,255,255,0.6)",
            },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: "1rem" }} />
          Back to Home
        </Box>

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
          <PageBreadcrumbs items={[{ label: "News" }]} />
          <Typography
            variant="overline"
            sx={{
              color: "rgba(255,255,255,0.8)",
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
            component="h1"
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
          component="a"
          href={`/news/${featured.slug}`}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            mb: 8,
            textDecoration: "none",
            bgcolor: "#fff",
            border: "1px solid rgba(15,40,70,0.08)",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 1px 2px rgba(15,40,70,0.04)",
            transition: "box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease",
            "&:hover": { transform: "translateY(-4px)", borderColor: "rgba(0,114,188,0.35)", boxShadow: "0 18px 40px rgba(0,83,155,0.12)" },
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
                borderRadius: "8px",
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

        <Typography component="h2" sx={{ fontSize: { xs: "1.4rem", md: "1.6rem" }, fontWeight: 800, color: "text.primary", mb: 3 }}>
          More articles
        </Typography>

        {/* Rest */}
        <Grid container spacing={3}>
          {rest.map((blog) => (
            <Grid key={blog.slug} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                component="a"
                href={`/news/${blog.slug}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  height: "100%",
                  bgcolor: "#fff",
                  border: "1px solid rgba(15,40,70,0.08)",
                  borderRadius: "14px",
                  overflow: "hidden",
                  boxShadow: "0 1px 2px rgba(15,40,70,0.04)",
                  transition: "box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease",
                  "&:hover": { transform: "translateY(-4px)", borderColor: "rgba(0,114,188,0.35)", boxShadow: "0 18px 40px rgba(0,83,155,0.12)" },
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
                    bgcolor: "#f6f9fc",
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
                      borderRadius: "8px",
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