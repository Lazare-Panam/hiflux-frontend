'use client';

import { Box, Typography, Chip } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import Image from 'next/image';

interface FeaturedValve {
  code: string;
  name: string;
  type: string;
  pressureLabel: string;
  connectionType: string;
  description: string;
  image: string;
}

const FEATURED_VALVES: FeaturedValve[] = [
  {
    code: 'ndl-ultra-150k',
    name: 'Ultra High Pressure Needle Valve',
    type: 'Needle Valve',
    pressureLabel: '~150,000 psi',
    connectionType: 'UNF',
    description: 'Extreme duty needle valve for research and test applications.',
    image: 'https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/needle-valve.png',
  },
  {
    code: 'fit-ultra-150k',
    name: 'Ultra High Pressure Fitting',
    type: 'Fitting',
    pressureLabel: '~150,000 psi',
    connectionType: 'UNF',
    description: 'Rated for the most extreme high pressure applications.',
    image: 'https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/reducing-fitting.png',
  },
  {
    code: 'ndl-ultra-100k',
    name: 'Ultra High Pressure Needle Valve',
    type: 'Needle Valve',
    pressureLabel: '~100,000 psi',
    connectionType: 'UNF',
    description: 'Ultra high pressure needle valve for extreme environments.',
    image: 'https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/needle-valve.png',
  },
  {
    code: 'chk-ultra-100k',
    name: 'Ultra High Pressure Check Valve',
    type: 'Check Valve',
    pressureLabel: '~100,000 psi',
    connectionType: 'UNF',
    description: 'Rated to 100,000 psi for extreme applications.',
    image: 'https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/check-valve.png',
  },
  {
    code: 'fit-ultra-100k',
    name: 'Ultra High Pressure Fitting',
    type: 'Fitting',
    pressureLabel: '~100,000 psi',
    connectionType: 'UNF',
    description: 'Ultra high pressure fitting for extreme applications.',
    image: 'https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/reducing-fitting.png',
  },
  {
    code: 'acc-ultra-150k',
    name: 'Ultra High Pressure Fitting Accessory',
    type: 'Fitting Accessory',
    pressureLabel: '~150,000 psi',
    connectionType: 'UNF',
    description: 'Accessory rated to 150,000 psi.',
    image: 'https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/Accessory.png',
  },
  {
    code: 'ndl-3way-60k',
    name: '3-Way 2-Stem Needle Valve',
    type: 'Needle Valve',
    pressureLabel: '60,000 psi',
    connectionType: 'UNF',
    description: 'Multi-port flow control at 60,000 psi.',
    image: 'https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/needle-valve.png',
  },
  {
    code: 'saf-rupt-60k',
    name: 'High Pressure Rupture Disc',
    type: 'Safety Valve',
    pressureLabel: '~60,000 psi',
    connectionType: 'UNF',
    description: 'Burst protection rated to 60,000 psi.',
    image: 'https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/rupture-disc.png',
  },
];

const scroll = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

function FeaturedCard({ valve }: { valve: FeaturedValve }) {
  return (
    <Box
      sx={{
        width: 280,
        flexShrink: 0,
        bgcolor: '#fff',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: 'rgba(0,0,0,0.08)',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          pt: '75%',
          bgcolor: 'background.paper',
        }}
      >
        <Image
          src={valve.image}
          alt={valve.name}
          fill
          style={{ objectFit: 'contain', padding: '20px' }}
          sizes="280px"
        />
        <Chip
          label={valve.pressureLabel}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: 'primary.main',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.7rem',
          }}
        />
      </Box>

      <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{
            fontSize: '0.7rem',
            fontWeight: 700,
            color: 'primary.main',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            mb: 0.5,
          }}
        >
          {valve.type}
        </Typography>

        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 700,
            color: 'text.primary',
            lineHeight: 1.3,
            mb: 1,
          }}
        >
          {valve.name}
        </Typography>

        <Typography
          sx={{
            fontSize: '0.85rem',
            color: 'text.secondary',
            lineHeight: 1.5,
            mb: 1.5,
            flex: 1,
          }}
        >
          {valve.description}
        </Typography>
      </Box>
    </Box>
  );
}

export default function FeaturedProducts() {
  const track = [...FEATURED_VALVES, ...FEATURED_VALVES];

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
      <Box sx={{ maxWidth: '1280px', mx: 'auto', px: { xs: 3, md: 8 }, mb: 5 }}>
        <Typography
          component="span"
          sx={{
            color: 'primary.main',
            letterSpacing: '0.3em',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          Featured Range
        </Typography>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: '1.75rem', md: '2.5rem' },
            fontWeight: 800,
            color: 'text.primary',
            mt: 1,
          }}
        >
          Built for every line, every condition.
        </Typography>
      </Box>

      <Box
        sx={{
          width: '100%',
          overflow: 'hidden',
          maskImage:
            'linear-gradient(90deg, transparent 0%, #000 5%, #000 95%, transparent 100%)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            width: 'max-content',
            px: 3,
            py: 2,
            animation: `${scroll} 35s linear infinite`,
            '&:hover': { animationPlayState: 'paused' },
          }}
        >
          {track.map((valve, i) => (
            <FeaturedCard key={`${valve.code}-${i}`} valve={valve} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}