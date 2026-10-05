'use client';

import { Box, Typography } from '@mui/material';

export default function ProductDetailHero({
  name,
  category,
}: {
  name: string;
  category?: string;
}) {
  return (
    <Box sx={{ background: 'linear-gradient(135deg, #0072BC 0%, #00539B 60%, #002d54 100%)', px: { xs: 3, md: 8 }, py: { xs: 4, md: 5 } }}>
      <Box sx={{ maxWidth: '1280px', mx: 'auto' }}>
        {category && (
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.75)',
              letterSpacing: '0.2em',
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              mb: 1,
            }}
          >
            {category}
          </Typography>
        )}
        <Typography
          component="h1"
          sx={{ color: '#fff', fontSize: { xs: '1.8rem', md: '2.6rem' }, fontWeight: 800, lineHeight: 1.1 }}
        >
          {name}
        </Typography>
      </Box>
    </Box>
  );
}