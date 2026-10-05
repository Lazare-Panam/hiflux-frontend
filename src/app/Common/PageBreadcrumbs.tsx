"use client";

import Link from "next/link";
import { Breadcrumbs, Typography } from "@mui/material";

const SITE = "https://www.hiflux.uk.com";

export type Crumb = { label: string; href?: string };

/**
 * Visible breadcrumb trail plus matching BreadcrumbList JSON-LD. "Home" is
 * added automatically; the last crumb is the current page (no link).
 *
 * `tone="light"` is for the blue page banners, `tone="dark"` for white pages.
 * Pass `schema={false}` on pages that already emit their own BreadcrumbList.
 */
export default function PageBreadcrumbs({
  items,
  tone = "light",
  align = "left",
  schema = true,
}: {
  items: Crumb[];
  tone?: "light" | "dark";
  align?: "left" | "center";
  schema?: boolean;
}) {
  const crumbs: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  const light = tone === "light";
  const linkColor = light ? "rgba(255,255,255,0.85)" : "#00539B";
  const currentColor = light ? "#fff" : "#1A1A1A";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE}${c.href === "/" ? "" : c.href}` } : {}),
    })),
  };

  return (
    <>
      {schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <Breadcrumbs
        aria-label="Breadcrumb"
        separator="/"
        sx={{
          mb: 2,
          fontSize: "0.8rem",
          "& ol": { justifyContent: align === "center" ? "center" : "flex-start" },
          fontWeight: 600,
          "& .MuiBreadcrumbs-separator": { color: light ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.3)" },
          "& a": { color: linkColor, textDecoration: "none" },
          "& a:hover": { color: light ? "#fff" : "#0072BC", textDecoration: "underline" },
        }}
      >
        {crumbs.map((c, i) =>
          c.href && i < crumbs.length - 1 ? (
            <Link key={c.label + i} href={c.href}>
              {c.label}
            </Link>
          ) : (
            <Typography
              key={c.label + i}
              aria-current="page"
              sx={{ fontSize: "0.8rem", fontWeight: 600, color: currentColor, textTransform: "none" }}
            >
              {c.label}
            </Typography>
          ),
        )}
      </Breadcrumbs>
    </>
  );
}
