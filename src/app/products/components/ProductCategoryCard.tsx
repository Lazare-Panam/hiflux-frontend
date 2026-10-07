'use client';

import { Box, Typography, Card, CardContent } from '@mui/material';
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
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        bgcolor: '#fff',
        border: '1px solid rgba(15,40,70,0.08)',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 1px 2px rgba(15,40,70,0.04)',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'rgba(0,114,188,0.35)',
          boxShadow: '0 18px 40px rgba(0,83,155,0.12)',
        },
        '&:hover .card-img': { transform: 'scale(1.05)' },
        '&:hover .card-arrow': { transform: 'translateX(4px)' },
        '& .MuiTypography-root': { textTransform: 'none' },
      }}
    >
      {/* Image area: soft tint so white product shots don't blend into the card */}
      <Box sx={{ position: 'relative', pt: '62%', background: 'linear-gradient(180deg, #f6f9fc 0%, #ffffff 100%)' }}>
        <Image
          className="card-img"
          src={image}
          alt={label}
          fill
          style={{ objectFit: 'contain', padding: '28px', transition: 'transform 0.35s ease' }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Box>

      <CardContent sx={{ p: 3, pt: 2.5, display: 'flex', flexDirection: 'column', gap: 1.25, flex: 1, '&:last-child': { pb: 3 } }}>
        <Typography component="h3" sx={{ fontWeight: 800, fontSize: '1.08rem', color: 'text.primary' }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary', lineHeight: 1.6, flex: 1 }}>
          {description}
        </Typography>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            mt: 0.75,
            color: 'primary.main',
            fontSize: '0.9rem',
            fontWeight: 700,
          }}
        >
          View range
          <ArrowForwardIcon className="card-arrow" sx={{ fontSize: 17, transition: 'transform 0.2s ease' }} />
        </Box>
      </CardContent>
    </Card>
  );
}
