import { Box, Container, Grid, Typography, Divider } from "@mui/material";
import Link from "next/link";
import PageBreadcrumbs from "@/app/Common/PageBreadcrumbs";
import { ProductCatalog, ProductItem } from "@/api/useProductCatalog";
import { BLUE_BG } from "@/theme/brand";
import { getCategoryEditorial } from "../../data/editorial";
import { EditorialBlocks } from "../../components/ProductEditorial";
import CtaBanner from "@/app/Common/CtaBanner";
import { getSeriesSummaries, type SeriesSummary } from "./seriesSummary";

/**
 * Server-rendered catalog listing (hero, marquee, intro, product grid, key
 * features, CTA). Receives already-fetched catalog data so all content is in
 * the initial HTML. Interactivity is limited to links (no client handlers).
 */
export default async function CatalogView({
  data,
  id,
}: {
  data: ProductCatalog;
  id: string;
}) {
  // Frontend-only editorial overlay (undefined for categories without one).
  const editorial = getCategoryEditorial(id);

  const hero = data.hero ?? {
    overline: undefined,
    title: data.bannerTitle,
    titleAccent: undefined,
    subtitle: data.bannerSubtitle,
    bannerImage: data.bannerImage,
    primaryCta: { label: "Explore Range", link: "#products" },
    secondaryCta: { label: "Request Quote", link: "/contact" },
  };

  const summaries = await getSeriesSummaries(data.products);
  const all = Object.values(summaries);
  const totalModels = all.reduce((n, s) => n + s.models, 0);
  const maxPsi = Math.max(0, ...all.map((s) => s.maxPsi ?? 0));
  const stats = [
    { value: String(data.products.length), label: data.products.length === 1 ? "Series" : "Series" },
    ...(maxPsi ? [{ value: `${maxPsi.toLocaleString("en-GB")} psi`, label: "Highest rating" }] : []),
    ...(totalModels ? [{ value: totalModels.toLocaleString("en-GB"), label: "Models" }] : []),
  ];
  const tiles = data.products.slice(0, 3);
  const title = editorial?.bannerTitle ?? hero.title ?? data.bannerTitle;

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* HERO: title, stats and CTAs on the left; series tiles on the right */}
      <Box
        component="section"
        sx={{
          color: "#fff",
          py: { xs: 5, md: 7 },
          // Category banner photo under a blue tint (as before the redesign).
          background: hero.bannerImage
            ? `linear-gradient(rgba(0,58,110,0.78), rgba(0,45,84,0.88)), url("${hero.bannerImage}") center / cover`
            : BLUE_BG,
        }}
      >
        <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gap: { xs: 4, md: 6 },
            alignItems: "center",
            gridTemplateColumns: { xs: "1fr", md: "1.05fr 1fr" },
          }}
        >
          <Box>
            <PageBreadcrumbs schema={false} items={[{ label: "Products", href: "/products" }, { label: data.bannerTitle ?? hero.title }]} />
            <Typography
              sx={{ color: "rgba(255,255,255,0.75)", letterSpacing: "0.2em", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase !important", mb: 1 }}
            >
              {hero.overline ?? "HIFLUX high-pressure range"}
            </Typography>
            <Typography
              variant="h1"
              sx={{ fontSize: { xs: "2rem", md: "2.9rem" }, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", textTransform: "none", maxWidth: 640 }}
            >
              {title}
            </Typography>
            {hero.subtitle && (
              <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.82)", fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.7, maxWidth: 560, textTransform: "none" }}>
                {hero.subtitle}
              </Typography>
            )}

            {stats.length > 1 && (
              <Box sx={{ display: "flex", flexWrap: "wrap", mt: 3.5, rowGap: 2 }}>
                {stats.map((st, i) => (
                  <Box
                    key={st.label}
                    sx={{ pr: { xs: 2.5, md: 3.5 }, mr: { xs: 2.5, md: 3.5 }, borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.25)" : 0 }}
                  >
                    <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.3rem", md: "1.55rem" }, lineHeight: 1.2, textTransform: "none" }}>{st.value}</Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", textTransform: "none" }}>{st.label}</Typography>
                  </Box>
                ))}
              </Box>
            )}

            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mt: 4 }}>
              <Link href="#products" style={{ textDecoration: "none" }}>
                <Box
                  component="span"
                  sx={{ display: "inline-flex", alignItems: "center", gap: 1, px: 3, py: 1.4, borderRadius: "999px", bgcolor: "#fff", color: "#00539B", fontWeight: 700, fontSize: "0.95rem", "&:hover": { bgcolor: "rgba(255,255,255,0.9)" } }}
                >
                  Choose a series ↓
                </Box>
              </Link>
              <Link href="/contact" style={{ textDecoration: "none" }}>
                <Box
                  component="span"
                  sx={{ display: "inline-flex", alignItems: "center", px: 3, py: 1.4, borderRadius: "999px", border: "1.5px solid rgba(255,255,255,0.7)", color: "#fff", fontWeight: 700, fontSize: "0.95rem", "&:hover": { bgcolor: "rgba(255,255,255,0.1)", borderColor: "#fff" } }}
                >
                  Request a Quote
                </Box>
              </Link>
            </Box>
          </Box>

          {/* Series tiles: first series large, next two stacked */}
          {tiles.length > 0 && (
            <Box
              sx={{
                display: { xs: "none", md: "grid" },
                gap: 2,
                gridTemplateColumns: tiles.length > 1 ? "1fr 1fr" : "1fr",
                gridTemplateRows: "1fr 1fr",
                height: 400,
              }}
            >
              {tiles.map((t, i) => (
                <HeroTile key={t.id} product={t} href={`/products/${id}/${t.id}`} big={i === 0} />
              ))}
            </Box>
          )}
        </Box>
        </Container>
      </Box>

      {/* MARQUEE */}
      {data.marquee && data.marquee.length > 0 && (
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
                {data.marquee!.map((item) => (
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
      )}

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        {/* CHOOSE A SERIES */}
        <Box id="products" sx={{ mb: { xs: 8, md: 10 }, scrollMarginTop: 110 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 2, mb: 1.5 }}>
            <Typography component="h2" sx={{ fontSize: { xs: "1.6rem", md: "2.1rem" }, fontWeight: 800, letterSpacing: "-0.02em", textTransform: "none" }}>
              Choose a series
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: "0.92rem", textTransform: "none" }}>
              Every model with prices online, or ask us about any series.
            </Typography>
          </Box>
          {editorial?.above?.paragraphs.map((p, i) => (
            <Typography key={i} sx={{ color: "text.secondary", fontSize: { xs: "0.98rem", md: "1.05rem" }, lineHeight: 1.8, maxWidth: 820, mb: 1, textTransform: "none" }}>
              {p}
            </Typography>
          ))}
          <Box
            sx={{
              mt: 4,
              display: "grid",
              gap: 3,
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            }}
          >
            {data.products.map((product) => (
              <SeriesCard key={product.id} product={product} summary={summaries[product.id]} href={`/products/${id}/${product.id}`} />
            ))}
          </Box>
        </Box>

      </Container>

      {/* Reference sections + closing banner on a light-blue band */}
      <Box sx={{ bgcolor: "#f3f6fa", "& .MuiTypography-root": { textTransform: "none" } }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        {/* EDITORIAL SECTIONS (frontend overlay, below the grid) */}
        {editorial?.below && <EditorialBlocks blocks={editorial.below} />}

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

        {/* Every category ends on the blue banner; fittings/tubing bring their own. */}
        {!editorial?.below?.some((b) => b.type === "cta") && (
          <Box sx={{ mt: editorial?.below || data.keyFeatures ? { xs: 6, md: 8 } : 0 }}>
            <CtaBanner />
          </Box>
        )}
      </Container>
      </Box>
    </Box>
  );
}

function HeroTile({ product, href, big }: { product: ProductItem; href: string; big: boolean }) {
  return (
    <Link href={href} style={{ gridRow: big ? "span 2" : "auto", textDecoration: "none", display: "block", minHeight: 0 }}>
    <Box
      sx={{
        height: "100%",
        bgcolor: "#fff",
        borderRadius: "16px",
        boxShadow: "0 18px 40px rgba(0,20,50,0.25)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        p: 2.5,
        textDecoration: "none",
        overflow: "hidden",
        transition: "transform 0.25s ease",
        "&:hover": { transform: "translateY(-4px)" },
      }}
    >
      <Box
        component="img"
        src={product.thumbnailImage}
        alt={product.name}
        sx={{ width: "100%", height: big ? 240 : 100, objectFit: "contain" }}
      />
      <Typography sx={{ color: "text.primary", fontWeight: 800, fontSize: big ? "1rem" : "0.88rem", textAlign: "center", lineHeight: 1.3, textTransform: "none" }}>
        {product.tag ?? product.name}
      </Typography>
    </Box>
    </Link>
  );
}

function SeriesCard({ product, summary, href }: { product: ProductItem; summary?: SeriesSummary; href: string }) {
  const rows = summary?.rows ?? [];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "#fff",
        border: "1px solid rgba(15,40,70,0.08)",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 1px 2px rgba(15,40,70,0.04)",
        transition: "box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease",
        "&:hover": { transform: "translateY(-4px)", borderColor: "rgba(0,114,188,0.35)", boxShadow: "0 18px 40px rgba(0,83,155,0.12)" },
        "&:hover .series-img": { transform: "scale(1.05)" },
      }}
    >
      <Link href={href} aria-label={product.name} style={{ display: "block" }}>
      <Box sx={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", height: 210, p: 3, bgcolor: "#fff" }}>
        {product.tag && (
          <Box component="span" sx={{ position: "absolute", top: 14, left: 14, px: 1.25, py: 0.4, borderRadius: "999px", bgcolor: "primary.main", color: "#fff", fontSize: "0.72rem", fontWeight: 700 }}>
            {product.tag}
          </Box>
        )}
        <Box component="img" className="series-img" src={product.thumbnailImage} alt={product.name} sx={{ maxWidth: "80%", height: 160, objectFit: "contain", transition: "transform 0.35s ease" }} />
      </Box>
      </Link>

      <Box sx={{ p: 2.75, pt: 2.25, display: "flex", flexDirection: "column", flex: 1, borderTop: "1px solid rgba(15,40,70,0.06)" }}>
        <Typography component="h3" sx={{ fontWeight: 800, fontSize: "1.08rem", lineHeight: 1.35, color: "text.primary", mb: 1.5, textTransform: "none" }}>
          <Link href={href} style={{ color: "inherit", textDecoration: "none" }}>
            {product.name}
          </Link>
        </Typography>

        {rows.length > 0 ? (
          <Box component="dl" sx={{ m: 0, mb: 2 }}>
            {rows.map(([k, v]) => (
              <Box key={k} sx={{ display: "flex", justifyContent: "space-between", gap: 2, py: 1, borderBottom: "1px solid rgba(15,40,70,0.08)" }}>
                <Typography component="dt" sx={{ color: "text.secondary", fontSize: "0.86rem", textTransform: "none", flexShrink: 0 }}>
                  {k}
                </Typography>
                <Typography component="dd" sx={{ m: 0, fontWeight: 700, fontSize: "0.86rem", textAlign: "right", color: "text.primary", textTransform: "none" }}>
                  {v}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          product.description && (
            <Typography sx={{ color: "text.secondary", fontSize: "0.88rem", lineHeight: 1.7, mb: 2, textTransform: "none" }}>{product.description}</Typography>
          )
        )}

        <Box sx={{ mt: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5, flexWrap: "wrap" }}>
          <Link href={href} style={{ textDecoration: "none" }}>
            <Box component="span" sx={{ color: "primary.main", fontWeight: 700, fontSize: "0.92rem", "&:hover": { textDecoration: "underline" } }}>
              View details →
            </Box>
          </Link>
          {summary && summary.models > 1 && (
            <Link href={`${href}/variants`} style={{ textDecoration: "none" }}>
              <Box component="span" sx={{ color: "text.secondary", fontWeight: 600, fontSize: "0.84rem", "&:hover": { color: "primary.main" } }}>
                {summary.models} models
              </Box>
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
}
