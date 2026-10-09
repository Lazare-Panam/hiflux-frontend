import { Box, Typography, Grid } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { getProductDetail } from '@/api/useProductDetail';
import { categorySlug } from '@/api/catalogSlug';

type Detail = NonNullable<Awaited<ReturnType<typeof getProductDetail>>>;

function RelatedProductCard({ productId, data }: { productId: string; data: Detail }) {
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
  /** Used when none of productIds exist: other series in the same category. */
  fallbackIds?: string[];
}

// Product data can list related IDs that no longer exist (e.g. spc-ctrl-75k),
// so fetch first and hide the whole section, band included, when none load.
const load = async (ids: string[]) =>
  (await Promise.all(ids.map(async (pid) => ({ pid, data: await getProductDetail(pid).catch(() => null) })))).filter(
    (r): r is { pid: string; data: Detail } => !!r.data,
  );

export default async function RelatedProducts({ productIds, fallbackIds = [] }: Props) {
  let found = await load(productIds ?? []);
  if (!found.length && fallbackIds.length) found = await load(fallbackIds.slice(0, 3));
  if (!found.length) return null;

  return (
    <Box sx={{ bgcolor: '#f3f6fa' }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, md: 3 }, py: { xs: 6, md: 8 } }}>
        <Typography sx={{ fontWeight: 800, fontSize: { xs: '1.4rem', md: '1.8rem' }, color: 'text.primary', mb: 4, textTransform: 'none' }}>
          Related Products
        </Typography>
        <Grid container spacing={3}>
          {found.map(({ pid, data }) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={pid}>
              <RelatedProductCard productId={pid} data={data} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
