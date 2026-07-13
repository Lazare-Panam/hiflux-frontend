'use client';

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import type { MegaMenuColumn } from './navData';

export default function MegaMenuPanel({ columns }: { columns: MegaMenuColumn[] }) {
  const [activeTab, setActiveTab] = useState<MegaMenuColumn>(columns[0]);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        bgcolor: '#fff',
        borderTop: '1px solid',
        borderColor: 'rgba(0,0,0,0.08)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        zIndex: 20,
      }}
    >
      <Box
        sx={{
          maxWidth: '1280px',
          mx: 'auto',
          px: { xs: 3, md: 8 },
          display: 'flex',
          minHeight: 320,
        }}
      >
        {/* Left sidebar */}
        <Box
          sx={{
            width: 240,
            flexShrink: 0,
            borderRight: '1px solid',
            borderColor: 'rgba(0,0,0,0.06)',
            py: 3,
          }}
        >
          {columns.map((col) => {
            const isActive = activeTab.heading === col.heading;
            return (
              <Box
                key={col.heading}
                component={Link}
                href={col.href}
                onMouseEnter={() => setActiveTab(col)}
                sx={{
                  display: 'block',
                  textDecoration: 'none',
                  px: 3,
                  py: 1.5,
                  cursor: 'pointer',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                  color: isActive ? 'primary.main' : 'text.primary',
                  bgcolor: isActive ? 'rgba(231,57,15,0.06)' : 'transparent',
                  borderLeft: '3px solid',
                  borderColor: isActive ? 'primary.main' : 'transparent',
                  transition: 'all 0.15s ease',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {col.heading}
              </Box>
            );
          })}
        </Box>

        {/* Right content */}
        <Box sx={{ flex: 1, py: 4, px: 5 }}>
          <Typography
            component={Link}
            href={activeTab.href}
            sx={{
              color: 'primary.main',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              mb: 3,
              display: 'block',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {activeTab.heading}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px 32px' }}>
            {activeTab.items.map((item) => (
              <Typography
                key={item.label}
                component={Link}
                href={item.href}
                sx={{
                  fontSize: '0.9rem',
                  color: 'text.primary',
                  textDecoration: 'none',
                  width: { xs: '100%', sm: 'calc(50% - 16px)' },
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}