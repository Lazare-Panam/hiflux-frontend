import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import PageBreadcrumbs from "@/app/Common/PageBreadcrumbs";
import CtaBanner from "@/app/Common/CtaBanner";
import { BLUE_BG } from "@/theme/brand";

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
  /** Optional SEO <title>; falls back to `title` (before any colon) when absent. */
  seoTitle?: string;
  /** Optional meta description; falls back to `excerpt` when absent. */
  metaDescription?: string;
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

// Inline links in post copy use markdown syntax: [anchor text](/path).
// Internal paths render as next/link (crawlable <a href>), absolute URLs as
// plain anchors.
const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

function renderInline(text: string) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const [whole, label, href] = m;
    const start = m.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    const style = { color: '#0072BC', fontWeight: 600, textDecoration: 'underline' };
    parts.push(
      href.startsWith('/') ? (
        <Link key={start} href={href} style={style}>
          {label}
        </Link>
      ) : (
        <a key={start} href={href} style={style} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      ),
    );
    last = start + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function renderBody(body: string) {
  return body.split('\n').map((line, i) => {
    if (!line.trim()) return null;
    if (line.startsWith('•')) {
      return (
        <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 1 }}>
          <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: 'primary.main', flexShrink: 0, mt: '10px' }} />
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1rem' }}>
            {renderInline(line.replace('• ', ''))}
          </Typography>
        </Box>
      );
    }
    return (
      <Typography key={i} variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.9, fontSize: '1rem', mb: 2 }}>
        {renderInline(line)}
      </Typography>
    );
  });
}

const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function BlogPost({ blog }: { blog: BlogData }) {
  const toc = blog.sections.filter((sec) => sec.heading).map((sec) => ({ id: slugify(sec.heading!), label: sec.heading! }));
  if (blog.faq?.length) toc.push({ id: 'faq', label: 'Frequently asked questions' });

  return (
    <Box sx={{ bgcolor: '#f3f6fa', minHeight: '100vh', '& .MuiTypography-root': { textTransform: 'none' } }}>
      {/* Hero: title left, article image right */}
      <Box component="section" sx={{ color: '#fff', background: BLUE_BG, py: { xs: 5, md: 7 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' }, gap: { xs: 4, md: 7 }, alignItems: 'center' }}>
            <Box sx={{ minWidth: 0 }}>
              <PageBreadcrumbs items={[{ label: 'News', href: '/news' }, { label: blog.title }]} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                <Box component="span" sx={{ px: 1.25, py: 0.4, borderRadius: '999px', bgcolor: 'rgba(255,255,255,0.16)', fontSize: '0.78rem', fontWeight: 700 }}>
                  {blog.category}
                </Box>
                <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem' }}>{blog.date}</Typography>
              </Box>
              <Typography component="h1" sx={{ mt: 1.75, fontWeight: 800, lineHeight: 1.12, letterSpacing: '-0.02em', fontSize: { xs: '1.9rem', md: '2.6rem' } }}>
                {blog.title}
              </Typography>
              <Typography sx={{ mt: 2, color: 'rgba(255,255,255,0.85)', fontSize: { xs: '1rem', md: '1.08rem' }, lineHeight: 1.75 }}>
                {blog.excerpt}
              </Typography>
            </Box>
            <Box sx={{ borderRadius: '22px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,20,50,0.3)', bgcolor: '#fff', lineHeight: 0 }}>
              <Box component="img" src={blog.heroImage} alt={blog.title} sx={{ width: '100%', height: { xs: 220, md: 320 }, objectFit: 'cover', display: 'block' }} />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Article + sidebar */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 280px' }, gap: { xs: 4, md: 7 }, alignItems: 'start' }}>
          <Box component="article" sx={{ minWidth: 0, bgcolor: '#fff', borderRadius: '20px', border: '1px solid rgba(15,40,70,0.08)', p: { xs: 3, md: 6 } }}>
            {blog.sections.map((section, i) => (
              <Box key={i} id={section.heading ? slugify(section.heading) : undefined} sx={{ mb: 5, scrollMarginTop: 120, '&:last-of-type': { mb: 0 } }}>
                {section.heading && (
                  <Typography component="h2" sx={{ fontWeight: 800, color: 'text.primary', mb: 2, fontSize: { xs: '1.35rem', md: '1.6rem' }, lineHeight: 1.25 }}>
                    {section.heading}
                  </Typography>
                )}
                {renderBody(section.body)}
              </Box>
            ))}

            {blog.faq && blog.faq.length > 0 && (
              <Box id="faq" sx={{ mt: 6, scrollMarginTop: 120 }}>
                <Typography component="h2" sx={{ fontWeight: 800, color: 'text.primary', mb: 2.5, fontSize: { xs: '1.35rem', md: '1.6rem' } }}>
                  Frequently asked questions
                </Typography>
                {blog.faq.map((item, i) => (
                  <Accordion
                    key={i}
                    elevation={0}
                    sx={{ border: '1px solid rgba(15,40,70,0.1)', borderRadius: '12px !important', mb: 1.25, '&:before': { display: 'none' }, '&.Mui-expanded': { borderColor: 'rgba(0,114,188,0.35)' } }}
                  >
                    <AccordionSummary expandIcon={<ChevronIcon />}>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.98rem', color: 'text.primary' }}>{item.q}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '0.95rem' }}>{item.a}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            )}

            {blog.tags.length > 0 && (
              <Box sx={{ mt: 5, pt: 3, borderTop: '1px solid rgba(15,40,70,0.08)' }}>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem', lineHeight: 1.7 }}>
                  <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>Topics: </Box>
                  {blog.tags.join(' · ')}
                </Typography>
              </Box>
            )}
          </Box>

          <Box component="aside" sx={{ position: { md: 'sticky' }, top: { md: 120 }, display: 'grid', gap: 2 }}>
            {toc.length > 1 && (
              <Box sx={{ display: { xs: 'none', md: 'block' }, p: 2.5, bgcolor: '#fff', borderRadius: '16px', border: '1px solid rgba(15,40,70,0.08)' }}>
                <Typography sx={{ color: 'text.secondary', fontWeight: 800, fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase !important', mb: 1 }}>
                  In this article
                </Typography>
                {toc.map((t, i) => (
                  <Box key={t.id} component="a" href={`#${t.id}`} sx={{ display: 'block', py: 0.85, color: 'text.primary', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600, lineHeight: 1.4, borderTop: i ? '1px solid rgba(15,40,70,0.06)' : 0, '&:hover': { color: 'primary.main' } }}>
                    {t.label}
                  </Box>
                ))}
              </Box>
            )}
            <Box sx={{ p: 2.5, borderRadius: '16px', background: BLUE_BG, color: '#fff' }}>
              <Typography sx={{ fontWeight: 800, fontSize: '1.05rem' }}>Need a part number?</Typography>
              <Typography sx={{ mt: 0.75, color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Send your pressure, tube size and media. We reply within one working day.
              </Typography>
              <Link href="/contact" style={{ textDecoration: 'none' }}>
                <Box component="span" sx={{ mt: 2, display: 'flex', justifyContent: 'center', py: 1.1, borderRadius: '999px', bgcolor: '#fff', color: '#00539B', fontWeight: 700, fontSize: '0.9rem' }}>
                  Request a Quote
                </Box>
              </Link>
            </Box>
            <Link href="/news" style={{ textDecoration: 'none' }}>
              <Box component="span" sx={{ display: 'block', textAlign: 'center', color: 'primary.main', fontWeight: 700, fontSize: '0.9rem', '&:hover': { textDecoration: 'underline' } }}>
                ← All articles
              </Box>
            </Link>
          </Box>
        </Box>

        {blog.cta && (
          <Box sx={{ mt: { xs: 5, md: 7 } }}>
            <CtaBanner
              heading={blog.cta.heading}
              body={blog.cta.body}
              buttons={[
                { label: `Email ${blog.cta.email}`, href: `mailto:${blog.cta.email}` },
                { label: `Call ${blog.cta.phone}`, href: `tel:${blog.cta.phone.replace(/\s/g, '')}` },
              ]}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}
