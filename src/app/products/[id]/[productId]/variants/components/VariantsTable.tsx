'use client';

import { useState } from 'react';
import {
  Box, Table, TableHead, TableRow, TableCell, TableBody, TableSortLabel,
  TablePagination, Typography, Chip, IconButton, Collapse, Button
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Image from 'next/image';
import { ProductVariant } from '@/api/useProductVariants';

const BRAND = '#E7390F';

interface RowProps {
  variant: ProductVariant;
  specKeys: string[];
  thumbnailImage: string;
}

function VariantRow({ variant, specKeys, thumbnailImage }: RowProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        hover
        sx={{
          bgcolor: open ? alpha(BRAND, 0.03) : 'inherit',
          '&:hover': { bgcolor: `${alpha(BRAND, 0.02)} !important` },
        }}
      >
        <TableCell sx={{ width: 40, py: 1.5 }}>
          <IconButton size="small" onClick={() => setOpen(o => !o)}>
            {open ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
          </IconButton>
        </TableCell>
        {specKeys.map(key => (
          <TableCell key={key} sx={{ py: 1.5, fontSize: '0.875rem' }}>
            {variant.specs[key] ? (
              key === 'End Connection' ? (
                <Chip
                  label={variant.specs[key]}
                  size="small"
                  sx={{ fontSize: '0.72rem', fontWeight: 700, bgcolor: alpha(BRAND, 0.08), color: BRAND, borderRadius: '3px' }}
                />
              ) : variant.specs[key]
            ) : '—'}
          </TableCell>
        ))}
      </TableRow>

      <TableRow>
        <TableCell colSpan={specKeys.length + 1} sx={{ p: 0, borderBottom: open ? '1px solid rgba(0,0,0,0.08)' : 'none' }}>
          <Collapse in={open} unmountOnExit>
            <Box sx={{ p: 3, bgcolor: alpha(BRAND, 0.02), borderLeft: `4px solid ${BRAND}` }}>
              <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                {thumbnailImage && (
                  <Box sx={{ width: 140, height: 140, flexShrink: 0, border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', bgcolor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image src={thumbnailImage} alt={variant.id} width={120} height={120} style={{ objectFit: 'contain' }} />
                  </Box>
                )}
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: '0.72rem', fontWeight: 900, letterSpacing: '0.1em', color: BRAND, mb: 2, textTransform: 'uppercase' }}>
                    Specifications
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 3 }}>
                    {Object.entries(variant.specs).map(([k, v]) => (
                      <Box key={k}>
                        <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary', mb: 0.25 }}>{k}</Typography>
                        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>{v}</Typography>
                      </Box>
                    ))}
                  </Box>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '4px', bgcolor: BRAND, boxShadow: 'none', px: 3, '&:hover': { bgcolor: '#A8270A', boxShadow: 'none' } }}
                  >
                    Request Quote
                  </Button>
                </Box>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

interface Props {
  variants: ProductVariant[];
  specKeys: string[];
  thumbnailImage: string;
}

export default function VariantsTable({ variants, specKeys, thumbnailImage }: Props) {
  const [sortKey, setSortKey] = useState<string>(specKeys[0] ?? '');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const sorted = [...variants].sort((a, b) => {
    const av = a.specs[sortKey] ?? '';
    const bv = b.specs[sortKey] ?? '';
    return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
  });

  const paginated = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const headerSx = {
    bgcolor: alpha(BRAND, 0.04),
    borderBottom: `2px solid ${BRAND}`,
    fontWeight: 700,
    fontSize: '0.75rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    py: 1.5,
  };

  return (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ ...headerSx, width: 40 }} />
            {specKeys.map(key => (
              <TableCell key={key} sx={headerSx}>
                <TableSortLabel
                  active={sortKey === key}
                  direction={sortKey === key ? sortDir : 'asc'}
                  onClick={() => handleSort(key)}
                >
                  {key}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginated.length === 0 ? (
            <TableRow>
              <TableCell colSpan={specKeys.length + 1} align="center" sx={{ py: 8 }}>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>No variants found.</Typography>
              </TableCell>
            </TableRow>
          ) : (
            paginated.map(v => (
              <VariantRow key={v.id} variant={v} specKeys={specKeys} thumbnailImage={thumbnailImage} />
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={sorted.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={e => { setRowsPerPage(parseInt(e.target.value)); setPage(0); }}
        rowsPerPageOptions={[10, 25, 50]}
        sx={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
      />
    </Box>
  );
}