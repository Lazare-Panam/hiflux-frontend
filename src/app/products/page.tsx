import { Box, Typography, Grid } from '@mui/material';
import ProductCategoryCard from './components/ProductCategoryCard';
import { CATEGORIES } from './data/categories';
export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 280, md: 420 },
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
          bgcolor: '#0a0604',
        }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80"
          alt="Industrial valves"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.35,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(10,6,4,0.2) 0%, rgba(10,6,4,0.9) 100%)',
          }}
        />
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1280px',
            width: '100%',
            mx: 'auto',
            px: { xs: 3, md: 8 },
            pb: { xs: 5, md: 7 },
          }}
        >
          <Typography
            sx={{
              color: 'primary.light',
              letterSpacing: '0.2em',
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              mb: 1.5,
            }}
          >
            Our Range
          </Typography>
          <Typography
            component="h1"
            sx={{ color: '#fff', fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800, lineHeight: 1.1, mb: 1.5 }}
          >
            Products
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', maxWidth: 500 }}>
            Engineered for extreme conditions. Every valve certified, traceable, and built to last.
          </Typography>
        </Box>
      </Box>

      {/* Cards */}
      <Box sx={{ bgcolor: 'background.default', py: { xs: 6, md: 10 }, px: { xs: 3, md: 8 } }}>
        <Box sx={{ maxWidth: '1280px', mx: 'auto' }}>
          <Grid container spacing={3}>
            {CATEGORIES.map((cat) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cat.id}>
                <ProductCategoryCard {...cat} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}