"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";
import Link from "next/link";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { MegaMenuColumn, NavLink } from "./navData";

const fadeDown = keyframes`
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: none; }
`;

const LINE = "rgba(0,0,0,0.1)";

function LinkColumn({ heading, links }: { heading: string; links: NavLink[] }) {
  return (
    <Box>
      <Typography
        sx={{
          color: "primary.main",
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          pb: 1.5,
          mb: 1.5,
          borderBottom: `1px solid ${LINE}`,
        }}
      >
        {heading}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {links.map((link) => (
          <Box
            key={link.href + link.label}
            component={link.external ? "a" : Link}
            href={link.href}
            {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            sx={{
              py: 0.85,
              fontSize: "0.95rem",
              color: "text.primary",
              textDecoration: "none",
              transition: "color 0.15s ease, transform 0.15s ease",
              "&:hover": { color: "primary.main", transform: "translateX(3px)" },
            }}
          >
            {link.label}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function RatingsColumn({ ratings }: { ratings: NonNullable<MegaMenuColumn["ratings"]> }) {
  return (
    <Box>
      <Typography
        sx={{
          color: "primary.main",
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          pb: 1.5,
          mb: 1.5,
          borderBottom: `1px solid ${LINE}`,
        }}
      >
        By Pressure Rating
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {ratings.map((r) => (
          <Box key={r.label}>
            <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: "text.secondary", textTransform: "none" }}>
              {r.label}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 1, rowGap: 0.25 }}>
              {r.links.map((link, i) => (
                <Box key={link.href} sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
                  {i > 0 && <Box component="span" sx={{ color: "text.disabled" }}>·</Box>}
                  <Box
                    component={Link}
                    href={link.href}
                    sx={{
                      fontSize: "0.95rem",
                      color: "text.primary",
                      textDecoration: "none",
                      transition: "color 0.15s ease",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    {link.label}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/**
 * Desktop mega menu. With several columns (Products) it shows a full-width
 * tab bar of categories; hovering a tab swaps the panel below to that
 * category's types, pressure ratings, and guides/catalogue links. With a
 * single column (Applications) it shows the panel on its own.
 */
export default function MegaMenuPanel({ columns }: { columns: MegaMenuColumn[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = columns[activeIndex] ?? columns[0];
  const tabbed = columns.length > 1;

  return (
    <Box
      sx={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        zIndex: 20,
        animation: `${fadeDown} 0.2s ease-out`,
      }}
    >
      {tabbed && (
        <Box sx={{ bgcolor: "#fff", borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <Box
            sx={{
              maxWidth: "1280px",
              mx: "auto",
              px: { md: 4 },
              display: "grid",
              gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
            }}
          >
            {columns.map((col, i) => {
              const isActive = i === activeIndex;
              return (
                <Box
                  key={col.heading}
                  component={Link}
                  href={col.href}
                  onMouseEnter={() => setActiveIndex(i)}
                  onFocus={() => setActiveIndex(i)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.5,
                    py: 1.25,
                    px: 1,
                    textAlign: "center",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: isActive ? "primary.main" : "primary.dark",
                    bgcolor: isActive ? "rgba(0,114,188,0.06)" : "transparent",
                    borderLeft: i === 0 ? "none" : `1px solid ${LINE}`,
                    boxShadow: isActive ? "inset 0 -2px 0 #0072BC" : "none",
                    transition: "background-color 0.15s ease, color 0.15s ease",
                    "&:hover": { bgcolor: "rgba(0,114,188,0.06)" },
                  }}
                >
                  {col.heading}
                  <KeyboardArrowDownIcon
                    sx={{
                      fontSize: 16,
                      transition: "transform 0.2s ease",
                      transform: isActive ? "rotate(180deg)" : "none",
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      <Box sx={{ maxWidth: "1280px", mx: "auto", px: { md: 4 } }}>
        <Box
          key={active.heading}
          sx={{
            bgcolor: "#fff",
            boxShadow: "0 24px 48px rgba(0,0,0,0.14)",
            borderTop: tabbed ? "none" : `1px solid ${LINE}`,
            px: 5,
            py: 4,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            columnGap: 6,
            animation: `${fadeDown} 0.22s ease-out`,
          }}
        >
          <LinkColumn heading={tabbed ? "By Type" : active.heading} links={active.items} />
          {!!active.ratings?.length && <RatingsColumn ratings={active.ratings} />}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {(active.resources ?? []).map((group) => (
              <LinkColumn key={group.heading} heading={group.heading} links={group.links} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
