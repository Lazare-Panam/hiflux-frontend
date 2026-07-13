"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@mui/material";
import { ProductType, useProductCatalog } from "@/api/useProductCatalog";
import ProductCard from "./ProductCard";
import ProductDetailContent from "../../components/ProductDetailContent";

export default function ProductCatalogPageClient({ id }: { id: string }) {
  const router = useRouter();
  const theme = useTheme();
  const { data, isLoading, isError } = useProductCatalog(id);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Typography sx={{ color: "text.secondary" }}>
          Failed to load products.
        </Typography>
      </Box>
    );
  }
  if (data.type === ProductType.Grid) {
    return <ProductDetailContent id={id} />;
  }

  const hero = data.hero ?? {
    overline: undefined,
    title: data.bannerTitle,
    titleAccent: undefined,
    subtitle: data.bannerSubtitle,
    bannerImage: data.bannerImage,
    primaryCta: { label: "Explore Range", link: "#products" },
    secondaryCta: { label: "Request Quote", link: "/enquiry" },
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* HERO */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: { xs: "60vh", md: "75vh" },
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.52), rgba(0,0,0,0.52)), url("${hero.bannerImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          {hero.overline && (
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                letterSpacing: 3,
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {hero.overline}
            </Typography>
          )}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 38, md: 68 },
              fontWeight: 900,
              color: "#fff",
              mt: 1,
              mb: 3,
              lineHeight: 1.08,
              maxWidth: 750,
              letterSpacing: "-0.03em",
            }}
          >
            {hero.title}
            {hero.titleAccent && (
              <>
                <br />
                <Box component="span" sx={{ color: "primary.main" }}>
                  {hero.titleAccent}
                </Box>
              </>
            )}
          </Typography>
          {hero.subtitle && (
            <Typography
              sx={{
                fontSize: { xs: 16, md: 19 },
                color: "rgba(255,255,255,0.88)",
                maxWidth: 580,
                mb: 5,
                lineHeight: 1.75,
              }}
            >
              {hero.subtitle}
            </Typography>
          )}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {hero.primaryCta && (
              <Button
                href={hero.primaryCta.link}
                variant="contained"
                size="large"
                sx={{ borderRadius: 0, px: 4, py: 1.5, fontWeight: 700 }}
              >
                {hero.primaryCta.label}
              </Button>
            )}
            {hero.secondaryCta && (
              <Button
                variant="outlined"
                size="large"
                href={hero.secondaryCta.link}
                sx={{
                  borderColor: "rgba(255,255,255,0.5)",
                  color: "#fff",
                  borderRadius: 0,
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.08)",
                    borderColor: "#fff",
                  },
                }}
              >
                {hero.secondaryCta.label}
              </Button>
            )}
          </Box>
        </Container>
      </Box>

      {/* MARQUEE */}
      {data.marquee &&
        data.marquee.length > 0 &&
        (() => {
          const marqueeItems = data.marquee!; // narrowed once, stored in a plain variable — safe to use anywhere below
          return (
            <Box
              sx={{
                borderBottom: "1px solid #eee",
                py: 1.5,
                bgcolor: "background.paper",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
              <Box
                sx={{
                  display: "flex",
                  width: "max-content",
                  animation: "marquee 28s linear infinite",
                  "&:hover": { animationPlayState: "paused" },
                }}
              >
                {[1, 2].map((i) => (
                  <Box key={i} sx={{ display: "flex", gap: 6, pr: 6 }}>
                    {marqueeItems.map((item) => (
                      <Typography
                        key={item}
                        sx={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: "text.secondary",
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                        }}
                      >
                        <Box
                          component="span"
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            bgcolor: "primary.main",
                            flexShrink: 0,
                          }}
                        />
                        {item}
                      </Typography>
                    ))}
                  </Box>
                ))}
              </Box>
            </Box>
          );
        })()}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        {/* INTRO */}
        {data.intro && (
          <>
            <Grid container spacing={6} sx={{ mb: 8 }}>
              <Grid size={{ xs: 12, md: 7 }}>
                {data.intro.heading && (
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: 26, md: 34 },
                      fontWeight: 800,
                      mb: 3,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {data.intro.heading}
                  </Typography>
                )}
                {data.intro.paragraphs?.map((p, idx) => (
                  <Typography
                    key={idx}
                    sx={{ color: "text.secondary", lineHeight: 1.85, mb: 2.5 }}
                  >
                    {p}
                  </Typography>
                ))}
              </Grid>
            </Grid>
            <Divider sx={{ mb: 8 }} />
          </>
        )}

        {/* PRODUCTS */}
        <Box id="products" sx={{ mb: 10 }}>
          {data.productsSectionLabel && (
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                letterSpacing: 3,
                fontSize: 11,
                display: "block",
                mb: 1,
              }}
            >
              {data.productsSectionLabel}
            </Typography>
          )}
          {data.productsHeading && (
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 26, md: 32 },
                fontWeight: 800,
                mb: 1.5,
                letterSpacing: "-0.02em",
              }}
            >
              {data.productsHeading}
            </Typography>
          )}
          {data.productsSubtext && (
            <Typography
              sx={{
                color: "text.secondary",
                mb: 6,
                maxWidth: 560,
                lineHeight: 1.8,
              }}
            >
              {data.productsSubtext}
            </Typography>
          )}
          <Grid container spacing={3}>
            {data.products.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                <ProductCard
                  {...product}
             
                  onClick={(pid: string) =>
                    router.push(`/products/${id}/${pid}`)
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* KEY FEATURES */}
        {data.keyFeatures && (
          <>
            <Divider sx={{ mb: 10 }} />
            <Box sx={{ mb: 10 }}>
              {data.keyFeatures.heading && (
                <Typography
                  variant="h3"
                  sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 800, mb: 2 }}
                >
                  {data.keyFeatures.heading}
                </Typography>
              )}
              {data.keyFeatures.subtext && (
                <Typography
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.8,
                    mb: 5,
                    maxWidth: 620,
                  }}
                >
                  {data.keyFeatures.subtext}
                </Typography>
              )}
              <Grid container spacing={2}>
                {data.keyFeatures.items?.map((feat) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={feat}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          flexShrink: 0,
                          mt: "6px",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: 14,
                          color: "text.secondary",
                          lineHeight: 1.7,
                        }}
                      >
                        {feat}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}

        {/* CTA */}
        {data.cta && (
          <>
            <Divider sx={{ mb: 10 }} />
            <Box sx={{ textAlign: "center", py: 6 }}>
              {data.cta.heading && (
                <Typography
                  variant="h3"
                  sx={{ fontSize: { xs: 24, md: 32 }, fontWeight: 800, mb: 2 }}
                >
                  {data.cta.heading}
                </Typography>
              )}
              {data.cta.text && (
                <Typography
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.8,
                    mb: 4,
                    maxWidth: 520,
                    mx: "auto",
                  }}
                >
                  {data.cta.text}
                </Typography>
              )}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {data.cta.emailCta && (
                  <Button
                    variant="contained"
                    size="large"
                    href={data.cta.emailCta.link}
                    sx={{ borderRadius: 0, px: 4, py: 1.5, fontWeight: 700 }}
                  >
                    {data.cta.emailCta.label}
                  </Button>
                )}
                {data.cta.quoteCta && (
                  <Button
                    variant="outlined"
                    size="large"
                    href={data.cta.quoteCta.link}
                    sx={{
                      borderColor: "#ddd",
                      color: "text.primary",
                      borderRadius: 0,
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                    }}
                  >
                    {data.cta.quoteCta.label}
                  </Button>
                )}
              </Box>
            </Box>
          </>
        )}
        
      </Container>
    </Box>
  );
}
