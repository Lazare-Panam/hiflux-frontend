'use client';

import { Box, Typography } from '@mui/material';

interface Props {
  title: string;
  subtitle: string;
  bannerImage: string;
}

export default function ProductHero({ title, subtitle, bannerImage }: Props) {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 280, md: 380 },
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
        bgcolor: '#0a0604',
      }}
    >
      {bannerImage && (
        <Box
          component="img"
          src={bannerImage}
          alt={title}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.4,
          }}
        />
      )}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10,6,4,0.2) 0%, rgba(10,6,4,0.88) 100%)',
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1280px',
          width: '100%',
          mx: 'auto',
          px: { xs: 3, md: 8 },
          pb: { xs: 4, md: 6 },
        }}
      >
        <Typography
          sx={{
            color: 'primary.light',
            letterSpacing: '0.2em',
            fontSize: '0.72rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            mb: 1.5,
          }}
        >
          Ball Valves
        </Typography>
        <Typography
          component="h1"
          sx={{
            color: '#fff',
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 800,
            lineHeight: 1.1,
            mb: 1.5,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: { xs: '0.9rem', md: '1rem' },
            maxWidth: 560,
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}