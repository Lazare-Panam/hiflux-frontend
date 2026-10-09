import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import PageBreadcrumbs from '@/app/Common/PageBreadcrumbs';
import { BLUE_BG } from '@/theme/brand';
import { summarise } from '../components/seriesSummary';
import { getProductDetail } from '@/api/useProductDetail';
import { categorySlug } from '@/api/catalogSlug';
import { getCatalog } from '@/api/useProductCatalog';
import { CATEGORIES } from '../../data/categories';
import ProductDetailImage from './components/ProductDetailImage';
import ProductSpecsTable from './components/ProductSpecsTable';
import ProductFeatureChips from './components/ProductFeatureChips';
import RelatedProducts from './components/RelatedProducts';

// Cache the rendered page (ISR): built on the first visit, then served from
// cache and regenerated in the background at most once an hour. Without this
// every request re-rendered and re-fetched the product API, which SE Ranking
// flagged as "Slow page loading speed".
export const revalidate = 3600;

// No paths are prebuilt at deploy time (there are 1,300+ SKUs); an empty list
// means each page is rendered on its first request and then cached.
export function generateStaticParams() {
  return [];
}

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
  const canonical = `https://www.hiflux.uk.com/products/${categorySlug(data.catalogId)}/${productId}`;

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
  const catalogId = categorySlug(data.catalogId);
  // Proper category name where we have one ("LOK Fittings & Valves", not "Lok Fittings Valves").
  const category = CATEGORIES.find((c) => c.id === catalogId)?.label ?? humanizeCategory(catalogId);

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

  const summary = await summarise({ id: productId }).catch(() => null);
  // Other series in this category: Related products falls back to these when
  // the product data's related IDs don't exist.
  const siblings = ((await getCatalog(catalogId).catch(() => null))?.products ?? []).map((p) => p.id).filter((id) => id !== productId);
  // Key-spec strip under the title (pressure, tube size, connection, material).
  const keySpecs = (summary?.rows ?? []).filter(([k]) => k !== 'Price').slice(0, 4);
  const models = summary?.models ?? 0;
  const variantsHref = `/products/${catalogId}/${productId}/variants`;
  const guide = catalogId === 'high-pressure-fittings' || catalogId === 'high-pressure-tubing';

  const eyebrow = { color: 'primary.main', fontWeight: 800, fontSize: '0.74rem', letterSpacing: '0.16em', textTransform: 'uppercase !important' } as const;
  // On phones both columns flatten into one list ordered by `order`, so the
  // title comes first; from md up they are two independent columns.
  const column = { display: { xs: 'contents', md: 'flex' }, flexDirection: 'column', gap: 3, minWidth: 0 } as const;

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

      {/* Breadcrumb bar */}
      <Box sx={{ borderBottom: '1px solid rgba(15,40,70,0.08)', bgcolor: '#fff' }}>
        <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, md: 3 }, py: 1.5, '& nav': { mb: 0 } }}>
          <PageBreadcrumbs
            schema={false}
            tone="dark"
            items={[
              { label: 'Products', href: '/products' },
              { label: category, href: `/products/${catalogId}` },
              { label: data.name },
            ]}
          />
        </Box>
      </Box>

      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, md: 3 }, py: { xs: 4, md: 6 } }}>
        <Box
          sx={{
            display: { xs: 'flex', md: 'grid' },
            flexDirection: 'column',
            gap: { xs: 3, md: 7 },
            gridTemplateColumns: { md: '1fr 1.05fr' },
            alignItems: { xs: 'stretch', md: 'start' },
          }}
        >
          {/* LEFT: image, trust tiles, overview */}
          <Box sx={column}>
            <Box sx={{ order: 2 }}>
              <ProductDetailImage image={data.image} name={data.name} />
            </Box>

            <Box sx={{ order: 4, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5 }}>
              {[
                { Icon: VerifiedOutlinedIcon, title: 'Genuine HIFLUX', text: 'Authorised UK & EU distributor' },
                { Icon: DescriptionOutlinedIcon, title: 'Documented', text: 'Material certificates on request' },
                { Icon: SupportAgentOutlinedIcon, title: 'UK Support', text: 'Help choosing a spec' },
              ].map(({ Icon, title, text }) => (
                <Box key={title} sx={{ bgcolor: '#f3f6fa', borderRadius: '14px', p: { xs: 1.5, md: 2 }, textAlign: 'center' }}>
                  <Icon sx={{ color: 'primary.main', fontSize: 24 }} />
                  <Typography sx={{ mt: 0.5, fontWeight: 800, fontSize: { xs: '0.8rem', md: '0.9rem' }, color: 'text.primary', textTransform: 'none' }}>{title}</Typography>
                  <Typography sx={{ fontSize: { xs: '0.72rem', md: '0.8rem' }, color: 'text.secondary', lineHeight: 1.4, textTransform: 'none' }}>{text}</Typography>
                </Box>
              ))}
            </Box>

            {data.description && (
              <Box sx={{ order: 6, mt: { md: 2 } }}>
                <Typography component="h2" sx={{ fontWeight: 800, fontSize: '1.4rem', pl: 1.5, borderLeft: '4px solid', borderColor: 'primary.main', lineHeight: 1.2, mb: 2, textTransform: 'none' }}>
                  Overview
                </Typography>
                <Typography sx={{ fontSize: '1rem', color: 'text.secondary', lineHeight: 1.85, textTransform: 'none' }}>
                  {data.description}
                </Typography>
              </Box>
            )}
          </Box>

          {/* RIGHT: title, key specs, details, models box */}
          <Box sx={column}>
            <Box sx={{ order: 1 }}>
              <Typography sx={eyebrow}>HIFLUX {category}</Typography>
              <Typography
                component="h1"
                sx={{ mt: 1, fontWeight: 800, fontSize: { xs: '1.9rem', md: '2.5rem' }, lineHeight: 1.12, letterSpacing: '-0.02em', color: 'text.primary', textTransform: 'none' }}
              >
                {data.name}
              </Typography>
              {data.features?.[0] && (
                <Typography sx={{ mt: 1.25, color: 'text.secondary', fontSize: '1.05rem', textTransform: 'none' }}>{data.features[0]}</Typography>
              )}

              {keySpecs.length > 0 && (
                <Box
                  sx={{
                    mt: 3,
                    display: 'grid',
                    gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: `repeat(${keySpecs.length}, 1fr)` },
                    border: '1px solid rgba(15,40,70,0.1)',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    bgcolor: '#fff',
                  }}
                >
                  {keySpecs.map(([k, v], i) => (
                    <Box
                      key={k}
                      sx={{
                        p: 2,
                        borderLeft: { sm: i === 0 ? 0 : '1px solid rgba(15,40,70,0.1)' },
                        borderTop: { xs: i >= 2 ? '1px solid rgba(15,40,70,0.1)' : 0, sm: 0 },
                        borderRight: { xs: i % 2 === 0 ? '1px solid rgba(15,40,70,0.1)' : 0, sm: 0 },
                      }}
                    >
                      <Typography sx={{ ...eyebrow, color: 'text.secondary', fontSize: '0.68rem', letterSpacing: '0.12em' }}>{k}</Typography>
                      <Typography sx={{ mt: 0.5, fontWeight: 800, fontSize: '0.98rem', lineHeight: 1.35, color: 'text.primary', textTransform: 'none' }}>{v}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>

            <Box sx={{ order: 3, display: 'flex', flexDirection: 'column', gap: 3.5, mt: { md: 1 } }}>
              <ProductSpecsTable specs={data.specs} />
              <ProductFeatureChips features={data.features} />

              {/* Models box */}
              <Box sx={{ bgcolor: '#f3f6fa', borderRadius: '16px', p: { xs: 2.5, md: 3 } }}>
                <Typography sx={{ ...eyebrow, fontSize: '0.7rem' }}>Models in this series</Typography>
                <Typography sx={{ mt: 0.75, color: 'text.secondary', fontSize: '0.98rem', textTransform: 'none' }}>
                  {models > 0 && (
                    <Box component="span" sx={{ color: 'text.primary', fontWeight: 800, fontSize: '1.6rem', mr: 1 }}>
                      {models}
                    </Box>
                  )}
                  {models > 0 ? `models with full specifications${summary?.minPrice ? `, prices from £${summary.minPrice.toFixed(2)}` : ''}` : 'Ask us for the models and prices in this series.'}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mt: 2.25 }}>
                  <Link href="/contact" style={{ textDecoration: 'none', flex: '1 1 200px' }}>
                    <Box component="span" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, py: 1.4, borderRadius: '999px', bgcolor: 'primary.main', color: '#fff', fontWeight: 700, fontSize: '0.95rem', '&:hover': { bgcolor: 'primary.dark' } }}>
                      Request a Quote →
                    </Box>
                  </Link>
                  {/* Always shown: series without models yet (e.g. new LOK data)
                      get a "being added" models page instead of a 404. */}
                  <Link href={variantsHref} style={{ textDecoration: 'none', flex: '1 1 200px' }}>
                    <Box component="span" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 1.4, borderRadius: '999px', bgcolor: '#fff', border: '1.5px solid rgba(15,40,70,0.15)', color: 'text.primary', fontWeight: 700, fontSize: '0.95rem', '&:hover': { borderColor: 'primary.main', color: 'primary.main' } }}>
                      {models > 0 ? `View all ${models} models` : 'View all models'}
                    </Box>
                  </Link>
                </Box>
              </Box>

              {guide && (
                <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary', textTransform: 'none' }}>
                  New to cone and thread?{' '}
                  <Link href="/news/high-pressure-cone-and-thread-fittings-guide" style={{ color: '#0072BC', fontWeight: 600 }}>
                    Read the cone and thread fittings guide
                  </Link>
                  {' · '}
                  <Link href={`/products/${catalogId}`} style={{ color: '#0072BC', fontWeight: 600 }}>
                    All {category.toLowerCase()}
                  </Link>
                </Typography>
              )}
            </Box>
          </Box>
        </Box>

      </Box>

      {/* Applications on a deep-blue band */}
      {(data.applications?.length > 0 || data.temperature) && (
        <Box component="section" sx={{ background: BLUE_BG, color: '#fff', py: { xs: 6, md: 8 }, '& .MuiTypography-root': { textTransform: 'none' } }}>
          <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, md: 3 }, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.8fr 1.2fr' }, gap: { xs: 3, md: 7 }, alignItems: 'center' }}>
            <Box>
              <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontWeight: 800, fontSize: '0.74rem', letterSpacing: '0.16em', textTransform: 'uppercase !important' }}>
                Applications
              </Typography>
              <Typography component="h2" sx={{ mt: 1, fontWeight: 800, fontSize: { xs: '1.6rem', md: '2.1rem' }, lineHeight: 1.15 }}>
                Where this series is used
              </Typography>
              {data.temperature && (
                <Typography sx={{ mt: 1.5, color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
                  Operating temperature: <Box component="span" sx={{ color: '#fff', fontWeight: 700 }}>{data.temperature}</Box>
                </Typography>
              )}
            </Box>
            {data.applications?.length > 0 && (
              <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: 1.25, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
                {data.applications.map((app) => (
                  <Box key={app} component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.5, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.16)', fontWeight: 600, fontSize: '0.95rem' }}>
                    <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#7cc4f2', flexShrink: 0 }} />
                    {app}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      )}

      {/* Related products (renders its own light-blue band, or nothing) */}
      <RelatedProducts productIds={data.relatedProducts ?? []} fallbackIds={siblings} />
    </Box>
  );
}
