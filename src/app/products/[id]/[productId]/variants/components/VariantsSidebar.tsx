"use client";

import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { compareSpec } from "./specSort";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const BRAND = "#0072BC";
const NON_FILTERABLE_KEYS = ["SKU", "Price"];

interface Props {
  specKeys: string[];
  filterOptions: Record<string, string[]>;
  activeFilters: Record<string, string[]>;
  setActiveFilters: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
}

export default function VariantsSidebar({
  specKeys,
  filterOptions,
  activeFilters,
  setActiveFilters,
}: Props) {
  const activeCount = Object.values(activeFilters).flat().length;

  const toggle = (key: string, val: string) => {
    setActiveFilters((prev) => {
      const current = prev[key] ?? [];
      return {
        ...prev,
        [key]: current.includes(val)
          ? current.filter((v) => v !== val)
          : [...current, val],
      };
    });
  };

  const filterableKeys = specKeys.filter(
    (key) => !NON_FILTERABLE_KEYS.includes(key),
  );

  return (
    <Box
      component="aside"
      aria-label="Filter models"
      sx={{
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 2 }}>
        <Typography component="h2" sx={{ fontSize: "1.15rem", fontWeight: 800, color: "text.primary" }}>
          Shop By
        </Typography>
        {activeCount > 0 && (
          <Typography
            component="button"
            onClick={() => setActiveFilters({})}
            sx={{
              border: 0,
              bgcolor: "transparent",
              p: 0,
              fontSize: "0.78rem",
              fontWeight: 700,
              color: BRAND,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Clear all ({activeCount})
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {filterableKeys.map((key) => {
          const options = [...(filterOptions[key] ?? [])].sort(compareSpec);
          if (options.length <= 1) return null;
          const selected = activeFilters[key] ?? [];
          return (
            <Accordion
              key={key}
              defaultExpanded
              disableGutters
              elevation={0}
              sx={{
                border: "1px solid rgba(15,40,70,0.08)",
                borderRadius: "10px !important",
                bgcolor: "#fff",
                boxShadow: "0 1px 2px rgba(15,40,70,0.04)",
                overflow: "hidden",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ fontSize: 20, color: "text.primary" }} />}
                sx={{ px: 2, minHeight: 52, "& .MuiAccordionSummary-content": { my: 1 } }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: "text.primary" }}>
                    {key}
                  </Typography>
                  {selected.length > 0 && (
                    <Chip
                      label={selected.length}
                      size="small"
                      sx={{ height: 18, fontSize: "0.68rem", fontWeight: 700, bgcolor: BRAND, color: "#fff" }}
                    />
                  )}
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
                <FormGroup
                  sx={{
                    border: "1px solid rgba(15,40,70,0.08)",
                    borderRadius: "6px",
                    bgcolor: "#fbfcfe",
                    px: 1.5,
                    py: 1,
                    maxHeight: 260,
                    overflowY: "auto",
                    flexWrap: "nowrap",
                  }}
                >
                  {options.map((opt) => (
                    <FormControlLabel
                      key={opt}
                      sx={{ mx: 0, my: 0.1 }}
                      control={
                        <Checkbox
                          size="small"
                          checked={selected.includes(opt)}
                          onChange={() => toggle(key, opt)}
                          sx={{
                            py: 0.5,
                            pl: 0,
                            color: alpha(BRAND, 0.6),
                            "&.Mui-checked": { color: BRAND },
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ fontSize: "0.88rem", color: "text.primary", textTransform: "none" }}>
                          {opt}
                        </Typography>
                      }
                    />
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Box>
  );
}
