'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VerifiedIcon from '@mui/icons-material/Verified';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import SpeedIcon from '@mui/icons-material/Speed';
import CategoryIcon from '@mui/icons-material/Category';

function CountUp({ target }: { target: string }) {
  const numericPart = parseFloat(target.replace(/[^0-9.]/g, ''));
  const prefix = target.match(/^[^0-9]*/)?.[0] ?? '';
  const suffix = target.match(/[^0-9.]*$/)?.[0] ?? '';
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!ref.current || Number.isNaN(numericPart)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const duration = 1500;
          const start = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * numericPart));
            if (progress < 1) requestAnimationFrame(tick);
            else setValue(numericPart);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [numericPart]);

  if (Number.isNaN(numericPart)) return <span ref={ref}>{target}</span>;

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

const STATS = [
  { num: '150', unit: 'k psi', label: 'MAX PRESSURE RATING' },
  { num: '6', unit: '', label: 'VALVE PRODUCT LINES' },
  { num: '316', unit: '', label: 'STAINLESS GRADE (SS316)' },
  { num: '100', unit: '%', label: 'PRESSURE TESTED PRE-SHIP' },
];

const FEATURES = [
  { icon: <VerifiedIcon fontSize="small" />, title: 'KGS & KC Certified', desc: 'Hydrogen refueling and gas relief valves independently certified for safety-critical service.' },
  { icon: <PrecisionManufacturingIcon fontSize="small" />, title: 'Rated to 150,000 PSI', desc: 'From standard 15k psi lines to extreme 150k psi research and test applications.' },
  { icon: <SpeedIcon fontSize="small" />, title: 'Zero Margin for Error', desc: 'Every needle, check, and ball valve built to hold at the pressures where others fail.' },
  { icon: <CategoryIcon fontSize="small" />, title: 'Full System Coverage', desc: 'Valves, fittings, manifolds, and safety components engineered to work as one system.' },
];

export default function HifluxStats() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        color: '#fff',
        background: 'linear-gradient(135deg, #0072BC 0%, #00539B 60%, #002d54 100%)',
      }}
    >
      <Box
        sx={{
          maxWidth: '1280px',
          mx: 'auto',
          px: { xs: 3, md: 8 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
          gap: 6,
          alignItems: 'center',
        }}
      >
        {/* left: copy + features + CTAs */}
        <Box>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.15)',
              px: 1.5,
              py: 0.5,
              mb: 3,
            }}
          >
            <Typography sx={{ fontWeight: 900, fontSize: '0.7rem', letterSpacing: '0.05em', color: 'primary.light' }}>
              BUILT FOR EXTREME PRESSURE
            </Typography>
          </Box>

          <Typography
            component="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: '2.25rem', md: '3.2rem' },
              lineHeight: 1.1,
              color: '#fff',
            }}
          >
            Engineered to hold,
            <br />
            <Box component="span" sx={{ color: 'rgba(255,255,255,0.55)', fontStyle: 'italic' }}>
              proven under pressure.
            </Box>
          </Typography>

          <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 5, maxWidth: 550, lineHeight: 1.7 }}>
            HiFlux exists for the systems where failure isn't an option — hydrogen refueling,
            wellhead pressure control, high-pressure research. Every valve that leaves our facility
            is tested to the exact rating stamped on it, not a marketing estimate.
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 3,
              mb: 5,
            }}
          >
            {FEATURES.map((feat) => (
              <Box key={feat.title} sx={{ display: 'flex', gap: 1.5 }}>
                <Box sx={{ mt: 0.3, color: 'primary.light' }}>{feat.icon}</Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>
                    {feat.title}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', lineHeight: 1.4, mt: 0.5 }}>
                    {feat.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              disableElevation
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: 'primary.main',
                color: '#fff',
                fontWeight: 800,
                borderRadius: 0,
                px: 3,
                py: 1.2,
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              VIEW FULL RANGE
            </Button>
            <Button
              variant="outlined"
              startIcon={<MenuBookIcon />}
              sx={{
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.25)',
                borderRadius: 0,
                px: 3,
                '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.06)' },
              }}
            >
              CERTIFICATION GUIDE
            </Button>
          </Box>
        </Box>

        {/* right: stat grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {STATS.map((stat) => (
            <Box
              key={stat.label}
              sx={{
                p: 4,
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.1)',
                bgcolor: 'rgba(255,255,255,0.03)',
                transition: '0.3s',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.06)', transform: 'translateY(-5px)' },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '1.8rem', md: '2.2rem' },
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                <CountUp target={stat.num} />
                {stat.unit && (
                  <Typography
                    component="span"
                    sx={{ fontSize: '1rem', ml: 0.5, fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}
                  >
                    {stat.unit}
                  </Typography>
                )}
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.65)',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  letterSpacing: '0.05em',
                  mt: 1,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}