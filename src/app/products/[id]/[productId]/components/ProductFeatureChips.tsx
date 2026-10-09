'use client';

import { Box, Typography, Chip } from '@mui/material';

export default function ProductFeatureChips({ features }: { features: string[] }) {
  if (!features?.length) return null;

  return (
    <Box>
      <Typography sx={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'primary.main', mb: 2 }}>
        Features
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {features.map((f) => (
          <Chip
            key={f}
            label={f}
            size="small"
            sx={{
              fontSize: '0.8rem',
              height: 30,
              px: 0.5,
              bgcolor: 'rgba(0,114,188,0.08)',
              color: 'primary.main',
              fontWeight: 600,
              borderRadius: '999px',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}