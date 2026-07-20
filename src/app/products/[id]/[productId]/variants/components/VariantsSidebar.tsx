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
  Divider,
} from "@mui/material";
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
      sx={{
        width: 220,
        flexShrink: 0,
        p: 2,
        bgcolor: "#fff",
        position: "sticky",
        top: 0,
        alignSelf: "flex-start",
        maxHeight: "100vh",
        overflowY: "auto",
        borderRadius: "6px",
        border: "1px solid rgba(0,0,0,0.08)",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "0.72rem",
            fontWeight: 900,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "text.secondary",
          }}
        >
          Filter
        </Typography>
        {activeCount > 0 && (
          <Typography
            onClick={() => setActiveFilters({})}
            sx={{
              fontSize: "0.72rem",
              fontWeight: 700,
              color: BRAND,
              cursor: "pointer",
            }}
          >
            Clear all
          </Typography>
        )}
      </Box>

      {filterableKeys.map((key, i) => {
        const options = filterOptions[key] ?? [];
        if (options.length <= 1) return null;
        const selected = activeFilters[key] ?? [];

        return (
          <Box key={key}>
            {i > 0 && <Divider sx={{ my: 0.5 }} />}
            <Accordion
              defaultExpanded
              disableGutters
              elevation={0}
              sx={{
                bgcolor: "transparent",
                "&:before": { display: "none" },
                mb: 0.5,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ fontSize: 16 }} />}
                sx={{
                  px: 0,
                  minHeight: 36,
                  "& .MuiAccordionSummary-content": { my: 0.5 },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "text.primary",
                    }}
                  >
                    {key}
                  </Typography>
                  {selected.length > 0 && (
                    <Chip
                      label={selected.length}
                      size="small"
                      sx={{
                        height: 16,
                        fontSize: "0.65rem",
                        bgcolor: BRAND,
                        color: "#fff",
                      }}
                    />
                  )}
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0, pt: 0 }}>
                <FormGroup>
                  <Box sx={{ maxHeight: 200, overflowY: "auto" }}>
                    {options.map((opt) => (
                      <FormControlLabel
                        key={opt}
                        control={
                          <Checkbox
                            size="small"
                            checked={selected.includes(opt)}
                            onChange={() => toggle(key, opt)}
                            sx={{ py: 0.25, "&.Mui-checked": { color: BRAND } }}
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: "0.8rem" }}>
                            {opt}
                          </Typography>
                        }
                      />
                    ))}
                  </Box>
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          </Box>
        );
      })}
    </Box>
  );
}
