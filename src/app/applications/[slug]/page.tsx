import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import {
  APPLICATIONS,
  getApplication,
  type Application,
  type Block,
  type CTA,
} from "../data";
import PageBreadcrumbs from "@/app/Common/PageBreadcrumbs";
import { BLUE_BG } from "@/theme/brand";
import CtaBanner from "@/app/Common/CtaBanner";

type Props = { params: Promise<{ slug: string }> };

// Content is fixed at build time — no on-demand rendering of unknown slugs.
export const dynamicParams = false;

export function generateStaticParams() {
  return APPLICATIONS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const app = getApplication(slug);
  if (!app) return { title: "Applications | Hiflux UK" };

  const url = `https://www.hiflux.uk.com/applications/${app.slug}`;
  const images = [
    "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/logo.png",
  ];
  return {
    title: app.title,
    description: app.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "Hiflux UK",
      title: app.title,
      description: app.description,
      url,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: app.title,
      description: app.description,
      images,
    },
  };
}

// Shared CTA renderer: internal links use next/link, external (catalogue PDF)
// opens in a new tab with rel="noopener".

// Inline "View X →" text links that sit between content sections.
function InlineLink({ cta }: { cta: CTA }) {
  const sx = {
    color: "primary.main",
    fontWeight: 700,
    fontSize: "0.95rem",
    "&:hover": { textDecoration: "underline" },
  };

  if (cta.external) {
    return (
      <Box
        component="a"
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ ...sx, textDecoration: "none" }}
      >
        {cta.label} →
      </Box>
    );
  }

  return (
    <Link href={cta.href} style={{ textDecoration: "none" }}>
      <Box component="span" sx={sx}>
        {cta.label} →
      </Box>
    </Link>
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <Typography
      component="h2"
      sx={{
        fontSize: { xs: "1.35rem", md: "1.6rem" },
        fontWeight: 800,
        color: "text.primary",
        mb: 2,
      }}
    >
      {children}
    </Typography>
  );
}

function Paragraph({ children }: { children: string }) {
  return (
    <Typography
      sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8, mb: 2, "&:last-child": { mb: 0 } }}
    >
      {children}
    </Typography>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "prose":
      return (
        <Box>
          {block.heading && <SectionHeading>{block.heading}</SectionHeading>}
          {block.paragraphs.map((p, i) => (
            <Paragraph key={i}>{p}</Paragraph>
          ))}
        </Box>
      );

    case "bullets":
      return (
        <Box>
          {block.heading && <SectionHeading>{block.heading}</SectionHeading>}
          {block.paragraphs?.map((p, i) => (
            <Paragraph key={i}>{p}</Paragraph>
          ))}
          <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, display: "grid", gap: 1.5 }}>
            {block.items.map((item, i) => (
              <Box
                key={i}
                component="li"
                sx={{ display: "flex", gap: 1.5, p: 2, borderRadius: "10px", bgcolor: "#f6f9fc", color: "text.secondary", fontSize: "1rem", lineHeight: 1.7 }}
              >
                <Box sx={{ width: 22, height: 22, flexShrink: 0, mt: "3px", borderRadius: "50%", bgcolor: "primary.main", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 800 }}>
                  ✓
                </Box>
                {item}
              </Box>
            ))}
          </Box>
        </Box>
      );

    case "table":
      return (
        <Box>
          {block.heading && <SectionHeading>{block.heading}</SectionHeading>}
          {block.paragraphs?.map((p, i) => (
            <Paragraph key={i}>{p}</Paragraph>
          ))}
          <Box sx={{ overflowX: "auto", border: "1px solid rgba(15,40,70,0.08)", borderRadius: "12px" }}>
            <Table
              sx={{
                "& td": { verticalAlign: "top", borderColor: "rgba(15,40,70,0.07)" },
                "& tr:last-of-type td": { borderBottom: "none" },
                "& tbody tr:not(:first-of-type):hover": { bgcolor: "rgba(0,114,188,0.03)" },
              }}
            >
              <TableBody>
                <TableRow sx={{ bgcolor: "#f6f9fc", "& td": { color: "#5b6b7c", fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase" } }}>
                  <TableCell sx={{ fontWeight: 800, width: { md: "42%" } }}>
                    {block.columns[0]}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>
                    {block.columns[1]}
                  </TableCell>
                </TableRow>
                {block.rows.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell
                      sx={{ fontWeight: 700, color: "text.primary" }}
                    >
                      {row[0]}
                    </TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>
                      {row[1]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          {block.footnote && (
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                mt: 2.5,
                fontStyle: "italic",
              }}
            >
              {block.footnote}
            </Typography>
          )}
        </Box>
      );

    case "links":
      return (
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", "& a": { px: 2, py: 1, borderRadius: "999px", bgcolor: "rgba(0,114,188,0.08)", "&:hover": { bgcolor: "rgba(0,114,188,0.14)" } } }}>
          {block.links.map((l, i) => (
            <InlineLink key={i} cta={l} />
          ))}
        </Box>
      );
  }
}

export default async function ApplicationPage({ params }: Props) {
  const { slug } = await params;
  const app: Application | undefined = getApplication(slug);
  if (!app) notFound();

  // The last block is usually the page's product links ("View fittings"...).
  // Those become the banner buttons, so the banner points at products and the
  // closing banner alone handles quotes (no repeated "Request a Quote").
  const last = app.blocks[app.blocks.length - 1];
  const productLinks = last?.type === "links" ? last.links : [];
  const bodyBlocks = productLinks.length ? app.blocks.slice(0, -1) : app.blocks;
  const heroLinks = productLinks.length ? productLinks.slice(0, 3) : app.heroCtas;


  const url = `https://www.hiflux.uk.com/applications/${app.slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.hiflux.uk.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Applications",
        item: "https://www.hiflux.uk.com/applications",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: app.h1,
        item: url,
      },
    ],
  };

  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          color: "#fff",
          background:
            BLUE_BG,
        }}
      >
        <Container maxWidth="md">
          <PageBreadcrumbs schema={false} items={[{ label: "Applications", href: "/applications" }, { label: app.h1 }]} />
          <Typography
            component="span"
            sx={{
              color: "rgba(255,255,255,0.75)",
              letterSpacing: "0.2em",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {app.eyebrow}
          </Typography>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "2.1rem", md: "3rem" },
              fontWeight: 800,
              lineHeight: 1.15,
              mt: 1.5,
              mb: 3,
            }}
          >
            {app.h1}
          </Typography>
          {app.intro.map((p, i) => (
            <Typography
              key={i}
              sx={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                maxWidth: 640,
                mb: 2,
              }}
            >
              {p}
            </Typography>
          ))}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 3 }}>
            {heroLinks.map((cta, i) => (
              <Link
                key={i}
                href={cta.href}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant={i === 0 ? "contained" : "outlined"}
                  component="span"
                  sx={{
                    borderRadius: "8px",
                    px: 3,
                    py: 1.25,
                    fontWeight: 700,
                    textTransform: "none",
                    ...(i === 0
                      ? { bgcolor: "#fff", color: "#00539B", "&:hover": { bgcolor: "rgba(255,255,255,0.9)" } }
                      : {
                          borderColor: "rgba(255,255,255,0.5)",
                          color: "#fff",
                          "&:hover": {
                            borderColor: "#fff",
                            bgcolor: "rgba(255,255,255,0.08)",
                          },
                        }),
                  }}
                >
                  {cta.label}
                </Button>
              </Link>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Content blocks: each section as a card on a tinted band */}
      <Box sx={{ bgcolor: "#f3f6fa", py: { xs: 5, md: 8 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "grid", gap: { xs: 2.5, md: 3 }, maxWidth: 980, mx: "auto" }}>
            {bodyBlocks.map((block, i) =>
              block.type === "links" ? (
                <BlockView key={i} block={block} />
              ) : (
                <Box
                  key={i}
                  sx={{
                    bgcolor: "#fff",
                    border: "1px solid rgba(15,40,70,0.08)",
                    borderRadius: "14px",
                    boxShadow: "0 1px 2px rgba(15,40,70,0.04)",
                    p: { xs: 3, md: 4.5 },
                  }}
                >
                  <BlockView block={block} />
                </Box>
              ),
            )}
          </Box>
        </Container>
      </Box>

      {/* Closing CTA */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <CtaBanner heading={app.closing.heading} body={app.closing.body} buttons={app.closing.buttons} />
      </Container>
    </Box>
  );
}
