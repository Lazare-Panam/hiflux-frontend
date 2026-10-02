'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Box, Typography, Stack, Button, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import { CATEGORIES } from '../products/data/categories';
import { LEFT_NAV } from '../Common/Navbar/navData';

const TRUST_ITEMS = [
  { label: 'Exclusive UK & EU HIFLUX Distributor', Icon: VerifiedOutlinedIcon },
  { label: 'Rated To 150,000 psi', Icon: SpeedOutlinedIcon },
  { label: 'UK Hydrogen Energy Association Member', Icon: BoltOutlinedIcon },
  { label: 'Prices Online For Standard Items', Icon: SellOutlinedIcon },
];

// Rows shown in the finder before the visitor types anything.
const FINDER_ROWS: { label: string; href: string; image?: string }[] = [
  ...CATEGORIES.map((c) => ({ label: c.label, href: c.href, image: c.image })),
  { label: 'Industrial Filtration Systems', href: '/industrial-filtration-systems' },
];

type SearchEntry = { label: string; group: string; href: string };

// Search index built from the same data that drives the mega menu, so the
// finder never links to a page that doesn't exist.
function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = CATEGORIES.map((c) => ({
    label: c.label,
    group: 'Category',
    href: c.href,
  }));
  for (const nav of LEFT_NAV) {
    for (const col of nav.megaMenu ?? []) {
      for (const item of col.items) {
        entries.push({ label: item.label, group: col.heading, href: item.href });
      }
    }
  }
  entries.push(
    { label: 'Industrial Filtration Systems', group: 'Filtration', href: '/industrial-filtration-systems' },
    { label: 'Y Strainers & Basket Strainers', group: 'Filtration', href: '/industrial-strainers' },
    { label: 'Magnetic Filters', group: 'Filtration', href: '/magnetic-filters' },
    { label: 'Cone & Thread Fittings Guide', group: 'Guide', href: '/news/high-pressure-cone-and-thread-fittings-guide' },
  );
  return entries;
}

const SEARCH_INDEX = buildIndex();

const PLACEHOLDER_TERMS = ['Needle Valve', 'Cone & Thread Fittings', 'Back Pressure Regulator', 'Magnetic Filter'];

// Cycles the highlighted term in the search placeholder, like a typing hint.
function useCyclingTerm(terms: string[], intervalMs = 2600) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % terms.length), intervalMs);
    return () => clearInterval(id);
  }, [terms.length, intervalMs]);
  return terms[i];
}

function TrustStrip() {
  return (
    <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
      <Box
        sx={{
          maxWidth: '1280px',
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
        }}
      >
        {TRUST_ITEMS.map(({ label, Icon }, i) => (
          <Box
            key={label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              py: 1.25,
              px: 1.5,
              color: 'primary.main',
              fontSize: { xs: '0.72rem', md: '0.82rem' },
              fontWeight: 600,
              textAlign: 'center',
              borderLeft: { md: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.08)' },
              borderTop: { xs: i >= 2 ? '1px solid rgba(0,0,0,0.08)' : 'none', md: 'none' },
            }}
          >
            {label}
            <Icon sx={{ fontSize: 18, flexShrink: 0 }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function ProductFinder() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const term = useCyclingTerm(PLACEHOLDER_TERMS);

  const q = query.trim().toLowerCase();
  const matches = q
    ? SEARCH_INDEX
        .filter((e) => `${e.label} ${e.group}`.toLowerCase().includes(q))
        .filter((e, i, arr) => arr.findIndex((x) => x.href === e.href) === i)
        .slice(0, 6)
    : [];

  const rowSx = {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    px: 2.5,
    py: 1.25,
    minHeight: 56,
    borderTop: '1px solid rgba(0,0,0,0.08)',
    textDecoration: 'none',
    color: 'text.primary',
    transition: 'background-color 0.15s ease',
    '&:hover': { bgcolor: 'rgba(0,114,188,0.05)' },
  } as const;

  return (
    <Box
      sx={{
        bgcolor: '#fff',
        borderRadius: '4px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
        overflow: 'hidden',
        width: '100%',
        maxWidth: 400,
      }}
    >
      <Box sx={{ px: 2.5, pt: 2.5, pb: 2, textAlign: 'center' }}>
        <Typography sx={{ fontSize: '0.95rem', color: 'text.primary' }}>
          Quickly Find What You Need
        </Typography>
        <Typography component="h2" sx={{ fontSize: '1.4rem', fontWeight: 800, color: 'primary.main', lineHeight: 1.3 }}>
          Use Our Product Finder
        </Typography>
        <Box
          component="form"
          role="search"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            if (matches[0]) router.push(matches[0].href);
          }}
          sx={{
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1.5,
            height: 42,
            border: '1px solid rgba(0,0,0,0.2)',
            borderRadius: '2px',
            position: 'relative',
            '&:focus-within': { borderColor: 'primary.main' },
          }}
        >
          <SearchIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
          <InputBase
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            inputProps={{ 'aria-label': 'Search products' }}
            sx={{ flex: 1, fontSize: '0.92rem' }}
          />
          {!query && (
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                left: 44,
                pointerEvents: 'none',
                fontSize: '0.92rem',
                color: 'text.secondary',
                whiteSpace: 'nowrap',
              }}
            >
              Search for{' '}
              <Box component="span" sx={{ color: 'primary.main', fontWeight: 700 }}>
                {term}
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {q ? (
        matches.length ? (
          matches.map((m) => (
            <Box key={m.href} component={Link} href={m.href} sx={rowSx}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: '0.92rem', fontWeight: 600 }} noWrap>
                  {m.label}
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }} noWrap>
                  {m.group}
                </Typography>
              </Box>
              <ChevronRightIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
            </Box>
          ))
        ) : (
          <Box component={Link} href="/contact" sx={rowSx}>
            <Typography sx={{ flex: 1, fontSize: '0.9rem' }}>
              No match. Ask our engineers about{' '}
              <Box component="span" sx={{ fontWeight: 700 }}>
                {query.trim()}
              </Box>
            </Typography>
            <ChevronRightIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
          </Box>
        )
      ) : (
        FINDER_ROWS.map((row) => (
          <Box key={row.href} component={Link} href={row.href} sx={rowSx}>
            <Box
              sx={{
                position: 'relative',
                width: 40,
                height: 32,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {row.image ? (
                <Image src={row.image} alt="" fill sizes="40px" style={{ objectFit: 'contain' }} />
              ) : (
                <FilterAltOutlinedIcon sx={{ color: 'primary.main' }} />
              )}
            </Box>
            <Typography sx={{ flex: 1, fontSize: '0.95rem', fontWeight: 600 }}>{row.label}</Typography>
            <ChevronRightIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
          </Box>
        ))
      )}
    </Box>
  );
}

export default function Hero() {
  return (
    <>
      <TrustStrip />
      <Box
        component="section"
        sx={{
          position: 'relative',
          minHeight: { xs: 'auto', md: 'calc(100vh - 160px)' },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          bgcolor: '#04141f',
          py: { xs: 8, md: 10 },
        }}
      >
        <Box
          component="video"
          autoPlay
          muted
          loop
          playsInline
          src="https://pblol2.blob.core.windows.net/hiflux/landing.mp4"
          // Shifted right on desktop so the product sits clear of the copy;
          // the gap on the left is covered by the solid end of the gradient.
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: { xs: 0, md: '24%' },
            width: { xs: '100%', md: '76%' },
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />

        {/* dark gradient so text stays legible over footage */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background:
              'linear-gradient(90deg, #04141f 0%, #04141f 24%, rgba(4,20,31,0.7) 42%, rgba(4,20,31,0.25) 70%, rgba(4,20,31,0.15) 100%)',
          }}
        />


        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            // Anchored to the left edge (not a centred column) so the copy
            // stays off the product in the video.
            px: { xs: 2, md: '10vw' },
          }}
        >
          <Stack spacing={3} sx={{ maxWidth: 820 }}>
            <Typography
              component="span"
              sx={{
                color: 'primary.light',
                letterSpacing: '0.25em',
                fontSize: { xs: '0.68rem', md: '0.75rem' },
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              Exclusive UK &amp; EU Distributor · HIFLUX Co., Ltd., Korea
            </Typography>

            <Typography
              component="h1"
              sx={{
                color: '#fff',
                fontSize: { xs: '2rem', sm: '2.6rem', md: '3.1rem' },
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              HIFLUX High-Pressure Valves &amp; Fittings, Supplied In The UK By The Exclusive Distributor
            </Typography>

            <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: { xs: '1rem', md: '1.1rem' }, maxWidth: 720, textTransform: 'none' }}>
              Needle, check, ball and air operated valves, cone and thread fittings, tubing and
              regulators rated to 150,000 psi. Genuine HIFLUX product, manufacturer documentation,
              and prices you can see online for standard items.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                component={Link}
                href="/shop"
                variant="contained"
                size="large"
                disableElevation
                sx={{ px: 4, py: 1.5, fontWeight: 700, textTransform: 'none', fontSize: '1rem', borderRadius: '2px' }}
              >
                Shop the Range
              </Button>
              <Button
                component={Link}
                href="/contact"
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: '1rem',
                  borderRadius: '2px',
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.06)' },
                }}
              >
                Request a Quote
              </Button>
            </Stack>

            <ProductFinder />
          </Stack>
        </Box>

        {/* scroll cue */}
        <Box
          aria-hidden
          sx={{
            display: { xs: 'none', md: 'flex' },
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.68rem', letterSpacing: '0.3em' }}>
            SCROLL
          </Typography>
          <Box sx={{ width: '1px', height: 36, bgcolor: 'primary.main' }} />
        </Box>
      </Box>
    </>
  );
}
