import {
  Box,
  Typography,
  Button,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import type { CategoryEditorial, CTA, EditorialBlock } from "../data/editorial";

// Server components (no client handlers). Links use MUI Button/anchor `href`,
// matching CatalogView — no `component={Link}`, which would break prerender in
// a Server Component.

function ButtonRow({
  ctas,
  align = "flex-start",
}: {
  ctas: CTA[];
  align?: "flex-start" | "center";
}) {
  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: align }}>
      {ctas.map((cta, i) => {
        const external = cta.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {};
        return (
          <Button
            key={cta.label}
            href={cta.href}
            {...external}
            variant={i === 0 ? "contained" : "outlined"}
            size="large"
            sx={{
              borderRadius: 0,
              px: 4,
              py: 1.5,
              fontWeight: 700,
              textTransform: "none",
              ...(i !== 0 && {
                borderColor: "#ddd",
                color: "text.primary",
              }),
            }}
          >
            {cta.label}
          </Button>
        );
      })}
    </Box>
  );
}

// Above-the-grid intro: short lead paragraph(s) + primary CTAs.
export function EditorialIntro({ above }: { above: NonNullable<CategoryEditorial["above"]> }) {
  return (
    <Box sx={{ mb: 8 }}>
      {above.paragraphs.map((p, i) => (
        <Typography
          key={i}
          sx={{
            color: "text.secondary",
            fontSize: { xs: 16, md: 18 },
            lineHeight: 1.85,
            maxWidth: 760,
            mb: 3,
          }}
        >
          {p}
        </Typography>
      ))}
      <ButtonRow ctas={above.ctas} />
    </Box>
  );
}

function InlineLink({ cta }: { cta: CTA }) {
  const external = cta.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <Box
      component="a"
      href={cta.href}
      {...external}
      sx={{
        color: "primary.main",
        fontWeight: 700,
        fontSize: "0.95rem",
        textDecoration: "none",
        "&:hover": { textDecoration: "underline" },
      }}
    >
      {cta.label} →
    </Box>
  );
}

function BlockView({ block }: { block: EditorialBlock }) {
  switch (block.type) {
    case "prose":
      return (
        <Box>
          {block.heading && (
            <Typography
              variant="h3"
              sx={{ fontSize: { xs: 22, md: 28 }, fontWeight: 800, mb: 2.5 }}
            >
              {block.heading}
            </Typography>
          )}
          {block.paragraphs.map((p, i) => (
            <Typography
              key={i}
              sx={{ color: "text.secondary", lineHeight: 1.85, mb: 2 }}
            >
              {p}
            </Typography>
          ))}
        </Box>
      );

    case "bullets":
      return (
        <Box>
          {block.heading && (
            <Typography
              variant="h3"
              sx={{ fontSize: { xs: 22, md: 28 }, fontWeight: 800, mb: 2.5 }}
            >
              {block.heading}
            </Typography>
          )}
          {block.paragraphs?.map((p, i) => (
            <Typography
              key={i}
              sx={{ color: "text.secondary", lineHeight: 1.85, mb: 2 }}
            >
              {p}
            </Typography>
          ))}
          <Box component="ul" sx={{ pl: 3, m: 0 }}>
            {block.items.map((item, i) => (
              <Typography
                key={i}
                component="li"
                sx={{ color: "text.secondary", lineHeight: 1.85, mb: 1.5 }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      );

    case "table":
      return (
        <Box>
          {block.heading && (
            <Typography
              variant="h3"
              sx={{ fontSize: { xs: 22, md: 28 }, fontWeight: 800, mb: 2.5 }}
            >
              {block.heading}
            </Typography>
          )}
          {block.paragraphs?.map((p, i) => (
            <Typography
              key={i}
              sx={{ color: "text.secondary", lineHeight: 1.85, mb: 2 }}
            >
              {p}
            </Typography>
          ))}
          <Box sx={{ overflowX: "auto" }}>
            <Table
              sx={{
                minWidth: 520,
                borderTop: "1px solid",
                borderColor: "divider",
                "& td, & th": { verticalAlign: "top" },
              }}
            >
              <TableHead>
                <TableRow sx={{ bgcolor: "action.hover" }}>
                  {block.columns.map((col) => (
                    <TableCell key={col} sx={{ fontWeight: 800 }}>
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {block.rows.map((row, i) => (
                  <TableRow key={i}>
                    {row.map((cell, j) => (
                      <TableCell
                        key={j}
                        sx={{
                          fontWeight: j === 0 ? 700 : 400,
                          color: j === 0 ? "text.primary" : "text.secondary",
                        }}
                      >
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          {block.footnote && (
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                mt: 2.5,
                fontStyle: "italic",
              }}
            >
              {block.footnote}
            </Typography>
          )}
        </Box>
      );

    case "links":
      return (
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {block.links.map((l) => (
            <InlineLink key={l.label} cta={l} />
          ))}
        </Box>
      );

    case "cta":
      return (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: 24, md: 32 }, fontWeight: 800, mb: 2 }}
          >
            {block.heading}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              lineHeight: 1.8,
              mb: 4,
              maxWidth: 560,
              mx: "auto",
            }}
          >
            {block.body}
          </Typography>
          <ButtonRow ctas={block.buttons} align="center" />
        </Box>
      );
  }
}

// Below-the-grid reference sections, divider-separated.
export function EditorialBlocks({ blocks }: { blocks: EditorialBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <Box key={i}>
          <BlockView block={block} />
          {i !== blocks.length - 1 && block.type !== "links" && (
            <Divider sx={{ my: { xs: 6, md: 8 } }} />
          )}
          {block.type === "links" && <Box sx={{ mb: { xs: 6, md: 8 } }} />}
        </Box>
      ))}
    </>
  );
}
