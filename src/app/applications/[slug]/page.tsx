import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
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
function CtaButton({
  cta,
  variant,
}: {
  cta: CTA;
  variant: "contained" | "outlined";
}) {
  // Rendered only inside the dark closing band, so the outlined variant needs
  // white border/text for contrast (default outlined uses the primary colour).
  const sx = {
    borderRadius: 0,
    px: 3,
    py: 1.25,
    fontWeight: 700,
    textTransform: "none" as const,
    ...(variant === "outlined" && {
      borderColor: "rgba(255,255,255,0.4)",
      color: "#fff",
      "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.08)" },
    }),
  };

  if (cta.external) {
    return (
      <Button
        variant={variant}
        component="a"
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer"
        sx={sx}
      >
        {cta.label}
      </Button>
    );
  }

  return (
    <Link href={cta.href} style={{ textDecoration: "none" }}>
      <Button variant={variant} component="span" sx={sx}>
        {cta.label}
      </Button>
    </Link>
  );
}

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
        fontSize: { xs: "1.5rem", md: "1.85rem" },
        fontWeight: 800,
        color: "text.primary",
        mb: 2.5,
      }}
    >
      {children}
    </Typography>
  );
}

function Paragraph({ children }: { children: string }) {
  return (
    <Typography
      sx={{ color: "text.secondary", fontSize: "1rem", lineHeight: 1.8, mb: 2 }}
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
          <Box component="ul" sx={{ pl: 3, m: 0 }}>
            {block.items.map((item, i) => (
              <Typography
                key={i}
                component="li"
                sx={{
                  color: "text.secondary",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  mb: 1.5,
                }}
              >
                {item}
              </Typography>
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
          <Box sx={{ overflowX: "auto" }}>
            <Table
              sx={{
                borderTop: "1px solid",
                borderColor: "divider",
                "& td": { verticalAlign: "top" },
              }}
            >
              <TableBody>
                <TableRow sx={{ bgcolor: "action.hover" }}>
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
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
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
            "linear-gradient(135deg, #0072BC 0%, #00539B 60%, #002d54 100%)",
        }}
      >
        <Container maxWidth="md">
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
            {app.heroCtas.map((cta, i) => (
              <Link
                key={i}
                href={cta.href}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant={i === 0 ? "contained" : "outlined"}
                  component="span"
                  sx={{
                    borderRadius: 0,
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

      {/* Content blocks */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        {app.blocks.map((block, i) => (
          <Box
            key={i}
            sx={{ mb: i === app.blocks.length - 1 ? 0 : 6 }}
          >
            <BlockView block={block} />
            {i !== app.blocks.length - 1 && block.type !== "links" && (
              <Divider sx={{ mt: 5 }} />
            )}
          </Box>
        ))}
      </Container>

      {/* Closing CTA */}
      <Box sx={{ bgcolor: "secondary.main", py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "1.4rem", md: "1.75rem" },
              fontWeight: 800,
              color: "#fff",
              mb: 1.5,
            }}
          >
            {app.closing.heading}
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.7)", mb: 3 }}>
            {app.closing.body}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {app.closing.buttons.map((cta, i) => (
              <CtaButton
                key={i}
                cta={cta}
                variant={i === 0 ? "contained" : "outlined"}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
