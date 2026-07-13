'use client';

import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Props {
  label: string;
  description: string;
  image: string;
  href: string;
}

export default function ProductCategoryCard({ label, description, image, href }: Props) {
  return (
    <Card
      component={Link}
      href={href}
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        border: '1px solid',
        borderColor: 'rgba(0,0,0,0.08)',
        borderRadius: '6px',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        '&:hover': { boxShadow: '0 12px 32px rgba(0,0,0,0.10)', transform: 'translateY(-2px)' },
      }}
    >
      {/* Image area — white background */}
      <Box sx={{ position: 'relative', pt: '65%', bgcolor: '#fff' }}>
        <Image
          src={image}
          alt={label}
          fill
          style={{ objectFit: 'contain', padding: '32px' }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Box>

      {/* Divider */}
      <Box sx={{ height: '1px', bgcolor: 'rgba(0,0,0,0.06)' }} />

      {/* Content */}
      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 1.5, bgcolor: '#FAF6F4' }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: 'text.primary' }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', lineHeight: 1.65 }}>
          {description}
        </Typography>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            mt: 0.5,
            color: 'primary.main',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          View Range <ArrowForwardIcon sx={{ fontSize: 15 }} />
        </Box>
      </CardContent>
    </Card>
  );
}