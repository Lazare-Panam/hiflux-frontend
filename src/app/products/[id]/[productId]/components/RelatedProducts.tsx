import { Box, Typography, Grid } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { getProductDetail } from '@/api/useProductDetail';
import { categorySlug } from '@/api/catalogSlug';

async function RelatedProductCard({ productId }: { productId: string }) {
  const data = await getProductDetail(productId).catch(() => null);
  if (!data) return null;

  return (
    <Link
      // Link using the related product's OWN category (data.catalogId), not the
      // category of the page we're on — otherwise a valve page would link a
      // fitting as /products/high-pressure-valves/... creating a duplicate URL.
      href={`/products/${categorySlug(data.catalogId)}/${productId}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <Box
        sx={{
          height: '100%',
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
          '& .MuiTypography-root': { textTransform: 'none' },
        }}
      >
        <Box sx={{ position: 'relative', pt: '65%', background: 'linear-gradient(180deg, #f6f9fc 0%, #ffffff 100%)' }}>
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
        <Box sx={{ p: 2.5 }}>
          <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: 'text.primary', mb: 0.5 }}>
            {data.name}
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {data.description}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}

interface Props {
  productIds: string[];
}

export default function RelatedProducts({ productIds }: Props) {
  if (!productIds?.length) return null;

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
            {/* async Server Component — fetched and rendered on the server */}
            <RelatedProductCard productId={pid} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
