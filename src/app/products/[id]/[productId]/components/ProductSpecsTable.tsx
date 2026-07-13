'use client';

import { Box, Typography } from '@mui/material';

export default function ProductSpecsTable({ specs }: { specs: Record<string, string> }) {
  if (!specs || Object.keys(specs).length === 0) return null;

  return (
    <Box>
      <Typography sx={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'primary.main', mb: 2 }}>
        Specifications
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
        {Object.entries(specs).map(([label, value]) => (
          <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>{label}</Typography>
            <Typography sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.85rem' }}>{value}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}