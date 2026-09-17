import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Box, Grid, Typography, Divider, Button } from '@mui/material';
import { getProductDetail } from '@/api/useProductDetail';
import ProductDetailHero from './components/ProductDetailHero';
import ProductDetailImage from './components/ProductDetailImage';
import ProductSpecsTable from './components/ProductSpecsTable';
import ProductFeatureChips from './components/ProductFeatureChips';
import ProductApplicationsList from './components/ProductApplicationsList';
import RelatedProducts from './components/RelatedProducts';

type Props = { params: Promise<{ id: string; productId: string }> };

// "high-pressure-valves" -> "High Pressure Valves"
function humanizeCategory(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Trim to a meta-description-friendly length (<=158 chars recommended) without
// cutting a word in half; appends an ellipsis only when actually truncated.
function metaDescription(text: string, max = 155): string {
  const t = (text ?? '').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.–-]+$/, '')}…`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;

  const data = await getProductDetail(productId).catch(() => null);
  if (!data) {
    return { title: 'Product Not Found | Hiflux UK' };
  }

  const title = `${data.name} | Hiflux UK`;
  const description = metaDescription(data.description);
  const images = data.image ? [{ url: data.image }] : undefined;
  // Canonical always uses the product's TRUE category so the same product
  // reached via a wrong-category URL collapses to one indexed page.
  const canonical = `https://www.hiflux.uk.com/products/${data.catalogId}/${productId}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      siteName: 'Hiflux UK',
      title,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: data.image ? [data.image] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { productId } = await params;

  const data = await getProductDetail(productId).catch(() => null);
  if (!data) notFound();

  // Always use the product's real category for on-page links/breadcrumbs so a
  // visit via a wrong-category URL still emits correct, non-duplicating links.
  const catalogId = data.catalogId;
  const category = humanizeCategory(catalogId);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.name,
    description: data.description,
    image: data.image ? [data.image] : undefined,
    category,
    brand: { '@type': 'Brand', name: 'Hiflux' },
    additionalProperty: Object.entries(data.specs ?? {}).map(([name, value]) => ({
      '@type': 'PropertyValue',
      name,
      value,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.hiflux.uk.com' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.hiflux.uk.com/products' },
      { '@type': 'ListItem', position: 3, name: category, item: `https://www.hiflux.uk.com/products/${catalogId}` },
      { '@type': 'ListItem', position: 4, name: data.name, item: `https://www.hiflux.uk.com/products/${catalogId}/${productId}` },
    ],
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ProductDetailHero name={data.name} category={category} />
      <Box sx={{ maxWidth: '1280px', mx: 'auto', px: { xs: 3, md: 8 }, py: { xs: 6, md: 10 } }}>
        <Grid container spacing={{ xs: 6, md: 10 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <ProductDetailImage image={data.image} name={data.name} />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Typography sx={{ fontSize: '1rem', color: 'text.secondary', lineHeight: 1.75 }}>
                {data.description}
              </Typography>
              <Divider />
              <ProductSpecsTable specs={data.specs} />
              <ProductFeatureChips features={data.features} />
              <ProductApplicationsList applications={data.applications} />
              <Button
                href={`/products/${catalogId}/${productId}/variants`}
                variant="contained"
                sx={{ alignSelf: 'flex-start', bgcolor: 'primary.main', color: '#fff', fontWeight: 700, borderRadius: '4px', textTransform: 'none', px: 3, py: 1.25, boxShadow: 'none', '&:hover': { bgcolor: 'primary.dark', boxShadow: 'none' } }}
              >
                View All Models
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: { xs: 8, md: 12 } }}>
          <Divider sx={{ mb: { xs: 6, md: 8 } }} />
          <RelatedProducts productIds={data.relatedProducts ?? []} />
        </Box>
      </Box>
    </Box>
  );
}
