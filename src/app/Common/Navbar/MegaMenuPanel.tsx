"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { MegaMenuColumn, MegaMenuItem } from "./navData";

export default function MegaMenuPanel({
  columns,
}: {
  columns: MegaMenuColumn[];
}) {
  const [activeTab, setActiveTab] = useState<MegaMenuColumn>(columns[0]);
  const [hoveredItem, setHoveredItem] = useState<MegaMenuItem | null>(null);

  const handleTabEnter = (col: MegaMenuColumn) => {
    setActiveTab(col);
    setHoveredItem(null);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        bgcolor: "#fff",
        borderTop: "1px solid",
        borderColor: "rgba(0,0,0,0.08)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        zIndex: 20,
      }}
    >
      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          px: { xs: 3, md: 8 },
          display: "flex",
          minHeight: 320,
        }}
      >
        {/* Level 1 - headings */}
        <Box
          sx={{
            width: 240,
            flexShrink: 0,
            borderRight: "1px solid",
            borderColor: "rgba(0,0,0,0.06)",
            py: 3,
          }}
        >
          {columns.map((col) => {
            const isActive = activeTab.heading === col.heading;
            return (
              <Box
                key={col.heading}
                component={Link}
                href={col.href}
                onMouseEnter={() => handleTabEnter(col)}
                sx={{
                  display: "block",
                  textDecoration: "none",
                  px: 3,
                  py: 1.5,
                  cursor: "pointer",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: "0.9rem",
                  color: isActive ? "primary.main" : "text.primary",
                  bgcolor: isActive ? "rgba(231,57,15,0.06)" : "transparent",
                  borderLeft: "3px solid",
                  borderColor: isActive ? "primary.main" : "transparent",
                  transition: "all 0.15s ease",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {col.heading}
              </Box>
            );
          })}
        </Box>

        {/* Level 2 - items for active heading */}
        <Box
          sx={{
            width: 300,
            flexShrink: 0,
            borderRight: hoveredItem?.subItems?.length ? "1px solid" : "none",
            borderColor: "rgba(0,0,0,0.06)",
            py: 4,
            px: 5,
          }}
        >
          <Typography
            component={Link}
            href={activeTab.href}
            sx={{
              color: "primary.main",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              mb: 3,
              display: "block",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {activeTab.heading}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {activeTab.items.map((item) => {
              const isHovered = hoveredItem?.label === item.label;
              return (
                <Box
                  key={item.label}
                  component={Link}
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    color: isHovered ? "primary.main" : "text.primary",
                    fontWeight: isHovered ? 600 : 500,
                    transition: "color 0.15s ease",
                  }}
                >
                  {item.label}
                  {!!item.subItems?.length && (
                    <ChevronRightIcon
                      sx={{
                        fontSize: 18,
                        color: isHovered ? "primary.main" : "text.disabled",
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Level 3 - subItems for hovered item */}
        {!!hoveredItem?.subItems?.length && (
          <Box sx={{ flex: 1, py: 4, px: 5 }}>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                mb: 3,
              }}
            >
              {hoveredItem.label}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "12px 32px" }}>
              {hoveredItem.subItems.map((sub) => (
                <Typography
                  key={sub.label}
                  component={Link}
                  href={sub.href}
                  sx={{
                    fontSize: "0.9rem",
                    color: "text.primary",
                    textDecoration: "none",
                    width: { xs: "100%", sm: "calc(50% - 16px)" },
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {sub.label}
                </Typography>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
