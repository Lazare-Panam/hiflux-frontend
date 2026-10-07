'use client';

import { Box, Typography } from '@mui/material';
import PageBreadcrumbs, { type Crumb } from '@/app/Common/PageBreadcrumbs';
import { BLUE_BG } from "@/theme/brand";

export default function ProductDetailHero({
  name,
  category,
  crumbs,
}: {
  name: string;
  category?: string;
  // Trail after "Home"; the page itself emits the BreadcrumbList JSON-LD.
  crumbs?: Crumb[];
}) {
  return (
    <Box sx={{ background: BLUE_BG, px: { xs: 3, md: 8 }, py: { xs: 4, md: 5 } }}>
      <Box sx={{ maxWidth: '1280px', mx: 'auto' }}>
        {crumbs && <PageBreadcrumbs schema={false} items={crumbs} />}
        {category && (
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.75)',
              letterSpacing: '0.2em',
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              mb: 1,
            }}
          >
            {category}
          </Typography>
        )}
        <Typography
          component="h1"
          sx={{ color: '#fff', fontSize: { xs: '1.8rem', md: '2.6rem' }, fontWeight: 800, lineHeight: 1.1 }}
        >
          {name}
        </Typography>
      </Box>
    </Box>
  );
}