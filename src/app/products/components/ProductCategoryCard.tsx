'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Props {
  label: string;
  description: string;
  image: string;
  href: string;
  facts?: string[];
  /** Large tile in the bento grid: taller image, bigger title. */
  featured?: boolean;
}

export default function ProductCategoryCard({ label, description, image, href, facts, featured = false }: Props) {
  return (
    <Box
      component={Link}
      href={href}
      sx={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        bgcolor: '#fff',
        border: '1px solid rgba(15,40,70,0.08)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 1px 2px rgba(15,40,70,0.04)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'rgba(0,114,188,0.3)',
          boxShadow: '0 22px 48px rgba(0,83,155,0.14)',
        },
        '&:hover .card-img': { transform: 'scale(1.06)' },
        '&:hover .card-go': { bgcolor: 'primary.main', color: '#fff', borderColor: 'primary.main' },
        '&:hover .card-go svg': { transform: 'translateX(2px)' },
        '& .MuiTypography-root': { textTransform: 'none' },
      }}
    >
      {/* Product shots have white backgrounds, so the image area stays white. */}
      <Box sx={{ position: 'relative', flex: featured ? { md: 1 } : 'none', minHeight: featured ? { xs: 220, md: 340 } : 190, bgcolor: '#fff' }}>
        <Image
          className="card-img"
          src={image}
          alt={label}
          fill
          style={{ objectFit: 'contain', padding: featured ? '36px' : '26px', transition: 'transform 0.4s ease' }}
          sizes={featured ? '(max-width: 900px) 100vw, 40vw' : '(max-width: 900px) 100vw, 30vw'}
        />
      </Box>

      <Box sx={{ p: { xs: 2.5, md: featured ? 3.5 : 2.75 }, pt: { xs: 2, md: featured ? 2.5 : 2 }, display: 'flex', flexDirection: 'column', gap: 1, borderTop: '1px solid rgba(15,40,70,0.06)' }}>
        {facts && facts.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 0.5 }}>
            {facts.map((f) => (
              <Box
                key={f}
                component="span"
                sx={{ px: 1.1, py: 0.3, borderRadius: '999px', bgcolor: 'rgba(0,114,188,0.08)', color: 'primary.main', fontSize: '0.74rem', fontWeight: 700 }}
              >
                {f}
              </Box>
            ))}
          </Box>
        )}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography component="h3" sx={{ fontWeight: 800, fontSize: featured ? { xs: '1.2rem', md: '1.45rem' } : '1.1rem', lineHeight: 1.25, color: 'text.primary' }}>
              {label}
            </Typography>
            <Typography sx={{ mt: 0.75, fontSize: featured ? '0.98rem' : '0.88rem', color: 'text.secondary', lineHeight: 1.6 }}>
              {description}
            </Typography>
          </Box>
          <Box
            className="card-go"
            aria-hidden
            sx={{
              flexShrink: 0,
              width: 42,
              height: 42,
              borderRadius: '50%',
              border: '1.5px solid rgba(15,40,70,0.15)',
              color: 'text.primary',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease',
            }}
          >
            <ArrowForwardIcon sx={{ fontSize: 19, transition: 'transform 0.2s ease' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

/** The five categories as a bento grid: the first is a large tile spanning two
 *  rows, the other four fill a 2x2 block beside it (no gap left over). */
export function CategoryBento({ categories }: { categories: (Omit<Props, 'featured'> & { id: string })[] }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: { xs: 2, md: 3 },
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: '1.25fr 1fr 1fr' },
        gridAutoRows: { md: 'minmax(0, auto)' },
      }}
    >
      {categories.map((cat, i) => (
        <Box key={cat.id} sx={i === 0 ? { gridColumn: { sm: 'span 2', md: 'auto' }, gridRow: { md: 'span 2' } } : undefined}>
          <ProductCategoryCard {...cat} featured={i === 0} />
        </Box>
      ))}
    </Box>
  );
}
