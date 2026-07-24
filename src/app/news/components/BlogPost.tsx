'use client';

import {
  Box,
  Chip,
  Container,
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@mui/material';

interface BlogSection {
  heading: string | null;
  body: string;
}

interface BlogFaq {
  q: string;
  a: string;
}

interface BlogCta {
  heading: string;
  body: string;
  email: string;
  phone: string;
}

export interface BlogData {
  slug: string;
  title: string;
  date: string;
  category: string;
  heroImage: string;
  excerpt: string;
  tags: string[];
  sections: BlogSection[];
  faq?: BlogFaq[];
  cta?: BlogCta;
}

const ChevronIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

function renderBody(body: string) {
  return body.split('\n').map((line, i) => {
    if (!line.trim()) return null;
    if (line.startsWith('•')) {
      return (
        <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 1 }}>
          <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: 'primary.main', flexShrink: 0, mt: '10px' }} />
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1rem' }}>
            {line.replace('• ', '')}
          </Typography>
        </Box>
      );
    }
    return (
      <Typography key={i} variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.9, fontSize: '1rem', mb: 2 }}>
        {line}
      </Typography>
    );
  });
}

export default function BlogPost({ blog }: { blog: BlogData }) {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>

      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 340, md: 500 },
          overflow: 'hidden',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box
          component="img"
          src={blog.heroImage}
          alt={blog.title}
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%)' }} />
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            px: { xs: 3, md: 8 },
            pb: { xs: 4, md: 6 },
            maxWidth: 900,
            mx: 'auto',
          }}
        >
          <Chip
            label={blog.category}
            size="small"
            sx={{ mb: 2, fontWeight: 600, borderRadius: 0, width: 'fit-content', bgcolor: 'primary.main', color: 'white' }}
          />
          <Typography variant="h2" sx={{ fontWeight: 700, color: 'white', lineHeight: 1.15, mb: 1.5, fontSize: { xs: '1.8rem', md: '2.8rem' } }}>
            {blog.title}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
            {blog.date}
          </Typography>
        </Box>
      </Box>

      {/* Content */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>

        {/* Excerpt */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 400, color: 'text.primary', lineHeight: 1.75, mb: 5, fontSize: '1.15rem', borderLeft: '3px solid', borderColor: 'primary.main', pl: 3 }}
        >
          {blog.excerpt}
        </Typography>

        <Divider sx={{ mb: 5 }} />

        {/* Sections */}
        {blog.sections.map((section, i) => (
          <Box key={i} sx={{ mb: 5 }}>
            {section.heading && (
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 2.5, fontSize: { xs: '1.3rem', md: '1.6rem' } }}>
                {section.heading}
              </Typography>
            )}
            {renderBody(section.body)}
          </Box>
        ))}

        {/* FAQ */}
        {blog.faq && blog.faq.length > 0 && (
          <Box sx={{ mt: 6, mb: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 3, fontSize: { xs: '1.3rem', md: '1.6rem' } }}>
              Frequently Asked Questions
            </Typography>
            {blog.faq.map((item, i) => (
              <Accordion
                key={i}
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '0 !important',
                  mb: 1.5,
                  '&:before': { display: 'none' },
                }}
              >
                <AccordionSummary expandIcon={<ChevronIcon />}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: 'text.primary' }}>
                    {item.q}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.75 }}>
                    {item.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}

        {/* Tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 6 }}>
          {blog.tags.map((t) => (
            <Chip key={t} label={t} size="small" variant="outlined" sx={{ borderRadius: 0, fontSize: '0.75rem' }} />
          ))}
        </Box>

        <Divider sx={{ mb: 6 }} />

        {/* CTA */}
        {blog.cta && (
          <Box
            sx={{
              bgcolor: 'secondary.main',
              p: { xs: 4, md: 6 },
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { md: 'center' },
              justifyContent: 'space-between',
              gap: 4,
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff', mb: 1 }}>
                {blog.cta.heading}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, maxWidth: 420 }}>
                {blog.cta.body}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, flexShrink: 0 }}>
              <Button
                variant="contained"
                color="primary"
                component="a"
                href={`mailto:${blog.cta.email}`}
                sx={{ borderRadius: 0, px: 3, py: 1.25, fontWeight: 600, textTransform: 'none' }}
              >
                {blog.cta.email}
              </Button>
              <Button
                variant="outlined"
                component="a"
                href={`tel:${blog.cta.phone.replace(/\s/g, '')}`}
                sx={{ borderRadius: 0, px: 3, py: 1.25, fontWeight: 600, textTransform: 'none', borderColor: 'rgba(255,255,255,0.3)', color: '#fff', '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.08)' } }}
              >
                {blog.cta.phone}
              </Button>
            </Box>
          </Box>
        )}

      </Container>
    </Box>
  );
}