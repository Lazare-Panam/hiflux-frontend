'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface Props {
  image: string;
  name: string;
}

export default function ProductDetailImage({ image, name }: Props) {
  return (
    <Box
      sx={{
        position: 'relative',
        pt: '100%',
        bgcolor: '#fff',
        borderRadius: '6px',
        border: '1px solid rgba(0,0,0,0.08)',
        overflow: 'hidden',
      }}
    >
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          style={{ objectFit: 'contain', padding: '40px' }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>No image available</Typography>
        </Box>
      )}
    </Box>
  );
}