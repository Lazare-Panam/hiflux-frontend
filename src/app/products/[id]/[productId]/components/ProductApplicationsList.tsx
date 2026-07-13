'use client';

import { Box, Typography } from '@mui/material';

export default function ProductApplicationsList({ applications }: { applications: string[] }) {
  if (!applications?.length) return null;

  return (
    <Box>
      <Typography sx={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'primary.main', mb: 2 }}>
        Applications
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
        {applications.map((app) => (
          <Box key={app} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: 'primary.main', flexShrink: 0 }} />
            <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>{app}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}