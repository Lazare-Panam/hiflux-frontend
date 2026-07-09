'use client';

import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0072BC',
      dark: '#00539B',
      light: '#4A9FD8',
      contrastText: '#fff',
    },
    secondary: {
      main: '#1A1A1A',
      contrastText: '#fff',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F7FA',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#5A5A5A',
    },
  },
  typography: {
    fontFamily: 'var(--font-body), sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: false }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}