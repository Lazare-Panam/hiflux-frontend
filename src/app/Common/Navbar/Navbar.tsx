"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  IconButton,
  Drawer,
  Collapse,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { LEFT_NAV, RIGHT_NAV, type NavItem } from "./navData";
import MegaMenuPanel from "./MegaMenuPanel";

const Navbar: React.FC = () => {
  const theme = useTheme();
  const INK = theme.palette.text.primary;
  const RUST = theme.palette.text.secondary;
  const PAPER = theme.palette.background.default;
  const ACCENT = theme.palette.primary.main;
  const LINE = theme.palette.divider;

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  const activeItem = LEFT_NAV.find((i) => i.label === openMenu);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ bgcolor: PAPER, color: INK, borderBottom: `1px solid ${LINE}` }}
        onMouseLeave={handleLeave}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ height: 88, justifyContent: "space-between" }}
          >
            {/* Logo */}
            <Box
              component={Link}
              href="/"
              sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}
            >
              <Image
                src="https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/logo.png"
                alt="Hiflux"
                width={120}
                height={40}
                priority
                style={{ objectFit: "contain", height: 40, width: "auto" }}
              />
            </Box>

            {/* Left nav (desktop) */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "row",
                gap: 4,
                ml: 6,
              }}
            >
              {LEFT_NAV.map((item) => {
                const active = openMenu === item.label;
                return (
                  <Box
                    key={item.label}
                    onMouseEnter={() =>
                      item.megaMenu && handleEnter(item.label)
                    }
                  >
                    <Box
                      component={Link}
                      href={item.href}
                      sx={{
                        position: "relative",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        textDecoration: "none",
                        color: active ? INK : RUST,
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        py: 3,
                        transition: "color 0.15s ease",
                        "&:hover": { color: INK },
                      }}
                    >
                      {item.label}
                      {item.megaMenu && (
                        <KeyboardArrowDownIcon
                          sx={{
                            fontSize: 16,
                            transition: "transform 0.2s ease",
                            transform: active ? "rotate(180deg)" : "none",
                            color: active ? ACCENT : RUST,
                          }}
                        />
                      )}
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 14,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: active ? 22 : 0,
                          height: 2,
                          bgcolor: ACCENT,
                          transition: "width 0.2s ease",
                        }}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {/* Right nav (desktop) */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              {RIGHT_NAV.map((item) => (
                <Box
                  key={item.label}
                  component={Link}
                  href={item.href}
                  sx={{
                    textDecoration: "none",
                    color: RUST,
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    transition: "color 0.15s ease",
                    "&:hover": { color: INK },
                  }}
                >
                  {item.label}
                </Box>
              ))}
              <Box
                component="a"
                href="https://pblol2.blob.core.windows.net/hiflux/catalogs/hiflux_catalog_en.pdf"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  textDecoration: "none",
                  border: `1.5px solid ${ACCENT}`,
                  color: ACCENT,
                  fontWeight: 600,
                  fontSize: "0.74rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  px: 2.5,
                  py: 1,
                  transition: "all 0.15s ease",
                  "&:hover": {
                    bgcolor: ACCENT,
                    color: theme.palette.primary.contrastText,
                  },
                }}
              >
                Download Catalog
              </Box>
            </Box>

            {/* Mobile trigger */}
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{ display: { md: "none" }, color: INK }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>

        {/* Mega menu */}
        {openMenu && activeItem?.megaMenu && (
          <Box onMouseEnter={() => activeItem && handleEnter(activeItem.label)}>
            <MegaMenuPanel columns={activeItem.megaMenu} />
          </Box>
        )}
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: { sx: { width: "100%", maxWidth: 360, bgcolor: PAPER } },
        }}
      >
        <Box
          sx={{
            p: 2.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${LINE}`,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "0.85rem",
              letterSpacing: "0.06em",
            }}
          >
            MENU
          </Typography>
          <IconButton onClick={() => setMobileOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", px: 1.5, py: 1 }}>
          {[...LEFT_NAV, ...RIGHT_NAV].map((item: NavItem) => (
            <Box key={item.label} sx={{ borderBottom: `1px solid ${LINE}` }}>
              <Box
                onClick={() =>
                  item.megaMenu
                    ? setMobileExpanded(
                        mobileExpanded === item.label ? null : item.label,
                      )
                    : setMobileOpen(false)
                }
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 2,
                  px: 1,
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  letterSpacing: "0.02em",
                  color: INK,
                }}
              >
                {item.megaMenu ? (
                  item.label
                ) : (
                  <Link
                    href={item.href}
                    style={{ color: "inherit", textDecoration: "none" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
                {item.megaMenu && (
                  <ExpandMoreIcon
                    sx={{
                      fontSize: 18,
                      color: RUST,
                      transition: "transform 0.2s ease",
                      transform:
                        mobileExpanded === item.label
                          ? "rotate(180deg)"
                          : "none",
                    }}
                  />
                )}
              </Box>
              {item.megaMenu && (
                <Collapse in={mobileExpanded === item.label}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      pb: 2,
                      pl: 2,
                      gap: 2,
                    }}
                  >
                    {item.megaMenu.map((col) => (
                      <Box key={col.heading}>
                        <Typography
                          component={Link}
                          href={col.href}
                          onClick={() => setMobileOpen(false)}
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.68rem",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: ACCENT,
                            mb: 1,
                            display: "block",
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          {col.heading}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          {col.items.map((it) => (
                            <Box
                              key={it.label}
                              component={Link}
                              href={it.href}
                              onClick={() => setMobileOpen(false)}
                              sx={{
                                textDecoration: "none",
                                color: RUST,
                                fontSize: "0.85rem",
                                "&:hover": { color: INK },
                              }}
                            >
                              {it.label}
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Collapse>
              )}
            </Box>
          ))}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
