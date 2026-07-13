'use client';

import { Box, Typography, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useProductDetail } from '@/api/useProductDetail';

function RelatedProductCard({ catalogId, productId }: { catalogId: string; productId: string }) {
  const router = useRouter();
  const { data, isLoading } = useProductDetail(productId);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
        <CircularProgress size={24} color="primary" />
      </Box>
    );
  }

  if (!data) return null;

  return (
    <Card
      onClick={() => router.push(`/products/${catalogId}/${productId}`)}
      elevation={0}
      sx={{
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: '6px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        '&:hover': {
          boxShadow: '0 12px 32px rgba(0,0,0,0.10)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Box sx={{ position: 'relative', pt: '65%', bgcolor: '#fff' }}>
        {data.image ? (
          <Image
            src={data.image}
            alt={data.name}
            fill
            style={{ objectFit: 'contain', padding: '28px' }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>No image</Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ height: '1px', bgcolor: 'rgba(0,0,0,0.06)' }} />
      <CardContent sx={{ p: 2.5, bgcolor: '#FAF6F4' }}>
        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: 'text.primary', mb: 0.5 }}>
          {data.name}
        </Typography>
        <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {data.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

interface Props {
  catalogId: string;
  productIds: string[];
}

export default function RelatedProducts({ catalogId, productIds }: Props) {
  return (
    <Box>
      <Typography
        sx={{ fontWeight: 800, fontSize: { xs: '1.4rem', md: '1.8rem' }, color: 'text.primary', mb: 4 }}
      >
        Related Products
      </Typography>
      <Grid container spacing={3}>
        {productIds.map((pid) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={pid}>
            <RelatedProductCard catalogId={catalogId} productId={pid} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}