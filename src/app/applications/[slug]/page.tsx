import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
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
import { APP_VISUALS } from "../visuals";
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

function SectionHeading({ index, children }: { index: number; children: string }) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Typography sx={{ color: "primary.main", fontWeight: 800, fontSize: "0.74rem", letterSpacing: "0.18em" }}>
        {String(index).padStart(2, "0")}
      </Typography>
      <Typography component="h2" sx={{ mt: 0.5, fontSize: { xs: "1.45rem", md: "1.8rem" }, fontWeight: 800, letterSpacing: "-0.01em", color: "text.primary", lineHeight: 1.2 }}>
        {children}
      </Typography>
    </Box>
  );
}

function Paragraph({ children }: { children: string }) {
  return (
    <Typography sx={{ color: "text.secondary", fontSize: "1.02rem", lineHeight: 1.85, mb: 2, "&:last-child": { mb: 0 } }}>
      {children}
    </Typography>
  );
}

// "Cycling, not static pressure. A dispenser ..." -> ["Cycling, not static pressure", "A dispenser ..."].
// Only short lead-ins count, so ordinary paragraphs are left alone.
function leadIn(p: string): [string, string] | null {
  const m = p.match(/^([^.]{3,70})\.\s+([\s\S]+)$/);
  if (!m || m[1].split(/\s+/).length > 9) return null;
  return [m[1], m[2]];
}

function FeatureGrid({ items }: { items: [string, string][] }) {
  return (
    <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" } }}>
      {items.map(([title, body], i) => (
        <Box key={title} sx={{ p: { xs: 2.5, md: 3 }, borderRadius: "16px", bgcolor: "#fff", border: "1px solid rgba(15,40,70,0.08)" }}>
          <Box sx={{ width: 36, height: 36, borderRadius: "10px", bgcolor: "rgba(0,114,188,0.1)", color: "primary.main", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.9rem" }}>
            {i + 1}
          </Box>
          <Typography component="h3" sx={{ mt: 1.5, fontWeight: 800, fontSize: "1.05rem", color: "text.primary", lineHeight: 1.3 }}>
            {title}
          </Typography>
          <Typography sx={{ mt: 0.75, color: "text.secondary", fontSize: "0.93rem", lineHeight: 1.7 }}>{body}</Typography>
        </Box>
      ))}
    </Box>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "prose": {
      const leads = block.paragraphs.map(leadIn);
      if (block.paragraphs.length > 1 && leads.every(Boolean)) return <FeatureGrid items={leads as [string, string][]} />;
      return (
        <Box sx={{ maxWidth: 760 }}>
          {block.paragraphs.map((p, i) => (
            <Paragraph key={i}>{p}</Paragraph>
          ))}
        </Box>
      );
    }

    case "bullets":
      return (
        <Box>
          {block.paragraphs?.map((p, i) => (
            <Paragraph key={i}>{p}</Paragraph>
          ))}
          <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, mt: block.paragraphs?.length ? 2 : 0, display: "grid", gap: 1.25 }}>
            {block.items.map((item, i) => (
              <Box key={i} component="li" sx={{ display: "flex", gap: 1.5, p: 2, borderRadius: "12px", bgcolor: "#fff", border: "1px solid rgba(15,40,70,0.08)", color: "text.secondary", fontSize: "0.98rem", lineHeight: 1.7 }}>
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
          {block.paragraphs?.map((p, i) => (
            <Paragraph key={i}>{p}</Paragraph>
          ))}
          <Box sx={{ mt: block.paragraphs?.length ? 2 : 0, overflowX: "auto", bgcolor: "#fff", border: "1px solid rgba(15,40,70,0.08)", borderRadius: "16px" }}>
            <Table sx={{ "& td": { verticalAlign: "top", borderColor: "rgba(15,40,70,0.07)", py: 1.75 }, "& tr:last-of-type td": { borderBottom: "none" }, "& tbody tr:not(:first-of-type):hover": { bgcolor: "rgba(0,114,188,0.03)" } }}>
              <TableBody>
                <TableRow sx={{ bgcolor: "#f6f9fc", "& td": { color: "#5b6b7c", fontSize: "0.74rem", letterSpacing: "0.1em", textTransform: "uppercase" } }}>
                  <TableCell sx={{ fontWeight: 800, width: { md: "42%" } }}>{block.columns[0]}</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>{block.columns[1]}</TableCell>
                </TableRow>
                {block.rows.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>{row[0]}</TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>{row[1]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          {block.footnote && (
            <Typography sx={{ mt: 1.75, color: "text.secondary", fontSize: "0.9rem", lineHeight: 1.7 }}>{block.footnote}</Typography>
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

const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default async function ApplicationPage({ params }: Props) {
  const { slug } = await params;
  const app: Application | undefined = getApplication(slug);
  if (!app) notFound();
  const visual = APP_VISUALS[app.slug];

  // The last block is usually the page's product links ("View fittings"...).
  // Those become the hero buttons, so the hero points at products and the
  // closing banner alone handles quotes (no repeated "Request a Quote").
  const last = app.blocks[app.blocks.length - 1];
  const productLinks = last?.type === "links" ? last.links : [];
  const bodyBlocks = productLinks.length ? app.blocks.slice(0, -1) : app.blocks;
  const heroLinks = productLinks.length ? productLinks.slice(0, 3) : app.heroCtas;

  // Group blocks into sections: a headed block starts a section; an unheaded
  // links block attaches to the section before it.
  type Section = { heading?: string; id?: string; blocks: Block[] };
  const sections: Section[] = [];
  for (const b of bodyBlocks) {
    const heading = "heading" in b ? b.heading : undefined;
    if (heading || !sections.length) sections.push({ heading, id: heading ? slugify(heading) : undefined, blocks: [b] });
    else sections[sections.length - 1].blocks.push(b);
  }
  const toc = sections.filter((s) => s.heading);

  const url = `https://www.hiflux.uk.com/applications/${app.slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.hiflux.uk.com" },
      { "@type": "ListItem", position: 2, name: "Applications", item: "https://www.hiflux.uk.com/applications" },
      { "@type": "ListItem", position: 3, name: app.h1, item: url },
    ],
  };

  const pill = (primary: boolean) => ({
    display: "inline-flex",
    alignItems: "center",
    px: 2.75,
    py: 1.3,
    borderRadius: "999px",
    fontWeight: 700,
    fontSize: "0.95rem",
    transition: "background-color 0.2s ease, border-color 0.2s ease",
    ...(primary
      ? { bgcolor: "#fff", color: "#00539B", "&:hover": { bgcolor: "rgba(255,255,255,0.9)" } }
      : { border: "1.5px solid rgba(255,255,255,0.6)", color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.1)", borderColor: "#fff" } }),
  });

  return (
    <Box sx={{ bgcolor: "#f3f6fa", "& .MuiTypography-root": { textTransform: "none" } }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero: copy left, product + facts right */}
      <Box component="section" sx={{ color: "#fff", background: BLUE_BG, py: { xs: 5, md: 8 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.25fr 1fr" }, gap: { xs: 4, md: 8 }, alignItems: "center" }}>
            <Box>
              <PageBreadcrumbs schema={false} items={[{ label: "Applications", href: "/applications" }, { label: app.h1 }]} />
              <Typography sx={{ color: "rgba(255,255,255,0.75)", letterSpacing: "0.2em", fontSize: "0.74rem", fontWeight: 800, textTransform: "uppercase !important" }}>
                {app.eyebrow}
              </Typography>
              <Typography component="h1" sx={{ mt: 1.25, fontSize: { xs: "2.2rem", md: "3.1rem" }, fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.02em" }}>
                {app.h1}
              </Typography>
              {app.intro.map((p, i) => (
                <Typography key={i} sx={{ mt: i === 0 ? 2.25 : 1.5, color: i === 0 ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.75)", fontSize: i === 0 ? { xs: "1.02rem", md: "1.12rem" } : "0.98rem", lineHeight: 1.75, maxWidth: 620 }}>
                  {p}
                </Typography>
              ))}
              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mt: 3.5 }}>
                {heroLinks.map((cta, i) => (
                  <Link key={i} href={cta.href} style={{ textDecoration: "none" }}>
                    <Box component="span" sx={pill(i === 0)}>
                      {cta.label}
                    </Box>
                  </Link>
                ))}
              </Box>
            </Box>

            {visual && (
              <Box>
                <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", justifyContent: "center", height: 320, bgcolor: "#fff", borderRadius: "24px", boxShadow: "0 30px 60px rgba(0,20,50,0.3)" }}>
                  <Box component="img" src={visual.image} alt={visual.imageAlt} sx={{ maxWidth: "62%", maxHeight: "80%", objectFit: "contain" }} />
                </Box>
                <Box sx={{ mt: { xs: 0, md: 2 }, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1.25 }}>
                  {visual.facts.map((f) => (
                    <Box key={f.value} sx={{ p: { xs: 1.5, md: 1.75 }, borderRadius: "14px", bgcolor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}>
                      <Typography sx={{ fontWeight: 800, fontSize: { xs: "0.92rem", md: "1.05rem" }, lineHeight: 1.2 }}>{f.value}</Typography>
                      <Typography sx={{ mt: 0.4, color: "rgba(255,255,255,0.72)", fontSize: { xs: "0.72rem", md: "0.78rem" }, lineHeight: 1.35 }}>{f.label}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      {/* Body: sections left, sticky "on this page" right */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 280px" }, gap: { xs: 4, md: 7 }, alignItems: "start" }}>
          <Box sx={{ minWidth: 0, display: "grid", gap: { xs: 6, md: 8 } }}>
            {sections.map((sec, si) => {
              const n = toc.indexOf(sec) + 1;
              return (
                <Box key={si} id={sec.id} component="section" sx={{ scrollMarginTop: 120 }}>
                  {sec.heading && <SectionHeading index={n}>{sec.heading}</SectionHeading>}
                  <Box sx={{ display: "grid", gap: 2.5 }}>
                    {sec.blocks.map((b, bi) => (
                      <BlockView key={bi} block={b} />
                    ))}
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box component="aside" sx={{ position: { md: "sticky" }, top: { md: 120 }, display: "grid", gap: 2 }}>
            {toc.length > 1 && (
              <Box sx={{ display: { xs: "none", md: "block" }, p: 2.5, bgcolor: "#fff", borderRadius: "16px", border: "1px solid rgba(15,40,70,0.08)" }}>
                <Typography sx={{ color: "text.secondary", fontWeight: 800, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase !important", mb: 1 }}>
                  On this page
                </Typography>
                {toc.map((s, i) => (
                  <Box key={s.id} component="a" href={`#${s.id}`} sx={{ display: "flex", gap: 1.25, py: 0.9, color: "text.primary", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600, borderTop: i ? "1px solid rgba(15,40,70,0.06)" : 0, "&:hover": { color: "primary.main" } }}>
                    <Box component="span" sx={{ color: "primary.main", fontWeight: 800, minWidth: 20 }}>
                      {String(i + 1).padStart(2, "0")}
                    </Box>
                    {s.heading}
                  </Box>
                ))}
              </Box>
            )}
            <Box sx={{ p: 2.5, borderRadius: "16px", background: BLUE_BG, color: "#fff" }}>
              <Typography sx={{ fontWeight: 800, fontSize: "1.05rem" }}>Need help choosing?</Typography>
              <Typography sx={{ mt: 0.75, color: "rgba(255,255,255,0.8)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                Send the pressure, temperature and media. We reply within one working day.
              </Typography>
              <Link href="/contact" style={{ textDecoration: "none" }}>
                <Box component="span" sx={{ mt: 2, display: "flex", justifyContent: "center", py: 1.1, borderRadius: "999px", bgcolor: "#fff", color: "#00539B", fontWeight: 700, fontSize: "0.9rem", "&:hover": { bgcolor: "rgba(255,255,255,0.9)" } }}>
                  Request a Quote
                </Box>
              </Link>
              <Box component="a" href="tel:+447369243459" sx={{ mt: 1.25, display: "block", textAlign: "center", color: "#fff", fontWeight: 600, fontSize: "0.88rem", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
                or call +44 7369 243459
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Closing CTA */}
      <Container maxWidth="lg" sx={{ pb: { xs: 6, md: 9 } }}>
        <CtaBanner heading={app.closing.heading} body={app.closing.body} buttons={app.closing.buttons} />
      </Container>
    </Box>
  );
}
