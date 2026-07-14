'use client';

import { Box, Chip, Typography } from '@mui/material';

const BRAND = '#0072BC';

interface Props {
  activeFilters: Record<string, string[]>;
  setActiveFilters: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
}

export default function VariantsActiveFilters({ activeFilters, setActiveFilters }: Props) {
  const chips: { label: string; onDelete: () => void }[] = [];

  Object.entries(activeFilters).forEach(([key, vals]) => {
    vals.forEach(val => chips.push({
      label: `${key}: ${val}`,
      onDelete: () => setActiveFilters(prev => ({
        ...prev,
        [key]: prev[key].filter(v => v !== val),
      })),
    }));
  });

  if (chips.length === 0) return null;

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mb: 2 }}>
      <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: 'text.secondary' }}>ACTIVE FILTERS:</Typography>
      {chips.map((c, i) => (
        <Chip
          key={i}
          label={c.label}
          size="small"
          variant="outlined"
          onDelete={c.onDelete}
          sx={{ borderColor: BRAND, color: BRAND, fontSize: '0.72rem' }}
        />
      ))}
    </Box>
  );
}