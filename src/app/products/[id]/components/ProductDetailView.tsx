'use client';

import { useRouter } from 'next/navigation';
import { Box, Typography, Button, Divider, Chip, Grid } from '@mui/material';
import Image from 'next/image';
import { ProductCatalog } from '@/api/useProductCatalog';

interface Props {
  data: ProductCatalog;
  id: string;
}

export default function ProductDetailView({ data, id }: Props) {
  const router = useRouter();

  // use first product's specs/features/image as the detail content
  const first = data.products?.[0];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero */}
      <Box sx={{ bgcolor: '#0a0604', px: { xs: 3, md: 8 }, py: { xs: 4, md: 5 } }}>
        <Box sx={{ maxWidth: '1280px', mx: 'auto' }}>
          <Typography sx={{ color: 'primary.light', letterSpacing: '0.2em', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', mb: 1 }}>
            Ball Valves
          </Typography>
          <Typography component="h1" sx={{ color: '#fff', fontSize: { xs: '1.8rem', md: '2.6rem' }, fontWeight: 800, lineHeight: 1.1 }}>
            {data.bannerTitle}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', mt: 1 }}>
            {data.bannerSubtitle}
          </Typography>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ maxWidth: '1280px', mx: 'auto', px: { xs: 3, md: 8 }, py: { xs: 6, md: 10 } }}>
        <Grid container spacing={{ xs: 6, md: 10 }}>

          {/* Image */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ position: 'relative', pt: '100%', bgcolor: '#fff', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              {data.bannerImage ? (
                <Image
                  src={data.bannerImage}
                  alt={data.bannerTitle}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>No image available</Typography>
                </Box>
              )}
            </Box>
          </Grid>

          {/* Details */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Typography sx={{ fontSize: '1rem', color: 'text.secondary', lineHeight: 1.75 }}>
                {data.bannerSubtitle}
              </Typography>

              <Divider />

              {/* Specs from first product */}
              {first?.specs && Object.keys(first.specs).length > 0 && (
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'primary.main', mb: 2 }}>
                    Specifications
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                    {Object.entries(first.specs).map(([label, value]) => (
                      <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                        <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>{label}</Typography>
                        <Typography sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.85rem' }}>{value}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Features from first product */}
              {first?.features && first.features.length > 0 && (
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'primary.main', mb: 2 }}>
                    Features
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {first.features.map((f) => (
                      <Chip key={f} label={f} size="small" sx={{ fontSize: '0.75rem', height: 26, bgcolor: 'rgba(231,57,15,0.08)', color: 'primary.main', fontWeight: 600, borderRadius: '3px' }} />
                    ))}
                  </Box>
                </Box>
              )}

              {/* View All Models */}
              <Button
                onClick={() => router.push(`/products/${id}/variants`)}
                variant="contained"
                sx={{ alignSelf: 'flex-start', bgcolor: 'primary.main', color: '#fff', fontWeight: 700, borderRadius: '4px', textTransform: 'none', px: 3, py: 1.25, boxShadow: 'none', '&:hover': { bgcolor: 'primary.dark', boxShadow: 'none' } }}
              >
                View All Models
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}