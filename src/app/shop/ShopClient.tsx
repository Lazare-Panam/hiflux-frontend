"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Box, Typography, Button, InputBase, MenuItem, Select, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { useCartStore } from "@/store/useCartStore";
import PageBreadcrumbs from "@/app/Common/PageBreadcrumbs";
import { CATEGORIES } from "@/app/products/data/categories";

// Industrial-store layout (search, category sidebar, sort, uniform product
// grid or list with quantity), in the style of RS / McMaster-type shops.

const BRAND = "#0072BC";
const BRAND_DARK = "#00539B";
const LINE = "rgba(15,40,70,0.1)";

// "15000psi" -> "15,000 psi" so every card shows ratings the same way.
function tidySpec(value: string) {
  const m = value.match(/^(\d+)\s*psi$/i);
  return m ? `${Number(m[1]).toLocaleString("en-GB")} psi` : value;
}

const fmtPrice = (p: number) =>
  `£${p.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export type ShopItem = {
  id: string;
  part: string;
  urlId: string;
  price: number | null;
  category: string;
  categoryLabel: string;
  series: string;
  seriesName: string;
  image: string;
  specs: [string, string][];
};
type Item = ShopItem;

const hrefOf = (it: Item) => `/products/${it.category}/${it.series}/variants/${encodeURIComponent(it.urlId)}`;
const specLine = (it: Item, n = 3) => it.specs.slice(0, n).map(([, v]) => tidySpec(v)).join(" · ");

/** Quantity stepper + add to cart, shared by grid and list views. */
function BuyBox({ item, compact }: { item: Item; compact?: boolean }) {
  const addItem = useCartStore((state) => state.addItem);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const price = item.price;
  if (price === null) {
    return (
      <Button
        component={Link}
        href={`/contact?part=${encodeURIComponent(item.part)}`}
        variant="outlined"
        startIcon={<RequestQuoteOutlinedIcon />}
        sx={{ width: compact ? "auto" : "100%", height: 38, textTransform: "none", fontWeight: 700, borderRadius: "8px", borderColor: BRAND, color: BRAND, fontSize: "0.85rem", whiteSpace: "nowrap" }}
      >
        Request quote
      </Button>
    );
  }
  const add = () => {
    addItem({ productId: item.series, sku: item.part, name: item.seriesName, thumbnailImage: item.image, price }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "stretch", width: compact ? "auto" : "100%", minWidth: 0, height: 38 }}>
      <Box
        role="group"
        aria-label="Quantity"
        sx={{ display: "flex", alignItems: "center", border: `1px solid ${LINE}`, borderRadius: "8px", bgcolor: "#fff", flexShrink: 0 }}
      >
        <IconButton size="small" aria-label="Decrease quantity" disabled={qty <= 1} onClick={() => setQty((q) => Math.max(1, q - 1))} sx={{ borderRadius: "8px", width: 30, height: "100%" }}>
          <RemoveIcon sx={{ fontSize: 15 }} />
        </IconButton>
        <Typography aria-live="polite" sx={{ minWidth: 22, textAlign: "center", fontWeight: 700, fontSize: "0.88rem" }}>{qty}</Typography>
        <IconButton size="small" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)} sx={{ borderRadius: "8px", width: 30, height: "100%" }}>
          <AddIcon sx={{ fontSize: 15 }} />
        </IconButton>
      </Box>
      <Button
        variant="contained"
        onClick={add}
        aria-label={`Add ${qty} × ${item.part} to cart`}
        startIcon={added ? <CheckIcon /> : <ShoppingCartIcon />}
        sx={{
          flex: 1,
          minWidth: compact ? 92 : 0,
          px: 1.5,
          textTransform: "none",
          fontWeight: 700,
          borderRadius: "8px",
          bgcolor: added ? "#2e7d32" : BRAND,
          boxShadow: "none",
          fontSize: "0.85rem",
          whiteSpace: "nowrap",
          "&:hover": { bgcolor: added ? "#2e7d32" : "#005a94", boxShadow: "none" },
        }}
      >
        {added ? "Added" : "Add"}
      </Button>
    </Box>
  );
}

function GridCard({ item }: { item: Item }) {
  const href = hrefOf(item);
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        border: `1px solid ${LINE}`,
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minWidth: 0,
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        "&:hover": { borderColor: "rgba(0,114,188,0.45)", boxShadow: "0 10px 26px rgba(0,83,155,0.1)" },
      }}
    >
      <Link href={href} style={{ display: "block", position: "relative" }}>
        <Box sx={{ position: "relative", height: { xs: 120, sm: 170 }, borderBottom: `1px solid ${LINE}` }}>
          <Box component="img" src={item.image} alt={`${item.seriesName} ${item.part}`} loading="lazy" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", p: { xs: 1.5, sm: 2.5 } }} />
        </Box>
      </Link>
      <Box sx={{ p: { xs: 1.25, sm: 1.75 }, display: "flex", flexDirection: "column", gap: 0.75, flex: 1, pb: 1.25 }}>
        <Link href={href} style={{ textDecoration: "none" }}>
          <Typography sx={{ fontFamily: "monospace", fontWeight: 800, fontSize: { xs: "0.85rem", sm: "0.95rem" }, color: BRAND_DARK, wordBreak: "break-all", "&:hover": { textDecoration: "underline" } }}>{item.part}</Typography>
        </Link>
        <Typography sx={{ fontSize: { xs: "0.78rem", sm: "0.85rem" }, color: "text.primary", lineHeight: 1.35, minHeight: "2.7em", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {item.seriesName}
        </Typography>
        <Typography sx={{ fontSize: { xs: "0.72rem", sm: "0.78rem" }, color: "text.secondary", lineHeight: 1.5 }}>{specLine(item)}</Typography>
      </Box>
      <Box sx={{ mt: "auto", px: { xs: 1.25, sm: 1.75 }, pt: 1.25, pb: { xs: 1.25, sm: 1.5 }, borderTop: `1px solid ${LINE}`, bgcolor: "#f7fafd", borderRadius: "0 0 10px 10px" }}>
        <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 1, mb: 1 }}>
          <Typography sx={{ fontWeight: 800, fontSize: item.price === null ? { xs: "0.88rem", sm: "0.95rem" } : { xs: "1.05rem", sm: "1.2rem" }, color: "text.primary", lineHeight: 1.2 }}>
            {item.price === null ? "Price on request" : fmtPrice(item.price)}
          </Typography>
          <Typography sx={{ fontSize: "0.7rem", color: "text.secondary", whiteSpace: "nowrap" }}>{item.price === null ? "with lead time" : "per unit"}</Typography>
        </Box>
        <BuyBox item={item} />
      </Box>
    </Box>
  );
}

function ListRow({ item }: { item: Item }) {
  const href = hrefOf(item);
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "72px 1fr", md: "88px 1.3fr 1.5fr auto" }, gap: { xs: 1.5, md: 2.5 }, alignItems: "center", p: 1.5, bgcolor: "#fff", borderBottom: `1px solid ${LINE}`, "&:hover": { bgcolor: "#f8fbfe" } }}>
      <Link href={href} style={{ display: "block" }}>
        <Box component="img" src={item.image} alt={item.part} loading="lazy" sx={{ width: "100%", height: { xs: 64, md: 72 }, objectFit: "contain", border: `1px solid ${LINE}`, borderRadius: "8px", p: 0.75, bgcolor: "#fff" }} />
      </Link>
      <Box sx={{ minWidth: 0 }}>
        <Link href={href} style={{ textDecoration: "none" }}>
          <Typography sx={{ fontFamily: "monospace", fontWeight: 800, color: BRAND_DARK, "&:hover": { textDecoration: "underline" } }}>
            {item.part}
          </Typography>
        </Link>
        <Typography sx={{ fontSize: "0.85rem", color: "text.primary" }}>{item.seriesName}</Typography>
        <Typography sx={{ display: { md: "none" }, mt: 0.5, fontSize: "0.75rem", color: "text.secondary" }}>
          {specLine(item, 6)}
        </Typography>
        <Box sx={{ mt: 1, display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1.5 }}>
          <Typography sx={{ fontWeight: 800 }}>{item.price === null ? "On request" : fmtPrice(item.price)}</Typography>
          <BuyBox item={item} compact />
        </Box>
      </Box>
      <Box component="dl" sx={{ display: { xs: "none", md: "grid" }, gridTemplateColumns: "auto 1fr", columnGap: 1.5, rowGap: 0.25, m: 0, fontSize: "0.8rem" }}>
        {item.specs.slice(0, 5).map(([k, v]) => (
          <Box key={k} sx={{ display: "contents" }}>
            <Box component="dt" sx={{ color: "text.secondary" }}>{k}</Box>
            <Box component="dd" sx={{ m: 0, fontWeight: 700 }}>{tidySpec(v)}</Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: { xs: "none", md: "flex" }, flexDirection: "column", alignItems: "flex-end", gap: 1, minWidth: 210 }}>
        <Typography sx={{ fontWeight: 800, fontSize: item.price === null ? "0.95rem" : "1.15rem" }}>{item.price === null ? "Price on request" : fmtPrice(item.price)}</Typography>
        <BuyBox item={item} />
      </Box>
    </Box>
  );
}

const SORTS: Record<string, { label: string; fn: (a: Item, b: Item) => number }> = {
  relevance: { label: "Relevance", fn: () => 0 },
  "price-asc": { label: "Price: low to high", fn: (a, b) => (a.price ?? Infinity) - (b.price ?? Infinity) },
  "price-desc": { label: "Price: high to low", fn: (a, b) => (b.price ?? -1) - (a.price ?? -1) },
  sku: { label: "Part number A–Z", fn: (a, b) => a.part.localeCompare(b.part, "en", { numeric: true }) },
};

const PAGE = 24;
const LABEL_SHORT = (t: string) => t.replace(/^High Pressure /, "").replace(/^High-Pressure /, "");

const SERVICE = [
  { Icon: SellOutlinedIcon, text: "Prices online for standard items" },
  { Icon: RequestQuoteOutlinedIcon, text: "Quotes for projects and volumes" },
  { Icon: VerifiedOutlinedIcon, text: "Documentation with every order" },
  { Icon: SupportAgentOutlinedIcon, text: "UK technical support" },
];

export default function ShopClient({ items: all }: { items: ShopItem[] }) {
  const [cat, setCat] = useState("all");
  const [series, setSeries] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("relevance");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [shown, setShown] = useState(PAGE);
  const [pricedOnly, setPricedOnly] = useState(false);

  // Categories and series that actually have priced models, in catalogue order.
  const cats = useMemo(() => {
    const m = new Map<string, { id: string; label: string; count: number }>();
    for (const it of all) {
      const c = m.get(it.category) ?? { id: it.category, label: it.categoryLabel, count: 0 };
      c.count++;
      m.set(it.category, c);
    }
    return [...m.values()];
  }, [all]);
  const seriesList = useMemo(() => {
    if (cat === "all") return [];
    const m = new Map<string, { id: string; label: string; count: number }>();
    for (const it of all.filter((x) => x.category === cat)) {
      const s = m.get(it.series) ?? { id: it.series, label: it.seriesName, count: 0 };
      s.count++;
      m.set(it.series, s);
    }
    return [...m.values()];
  }, [all, cat]);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all
      .filter((v) => cat === "all" || v.category === cat)
      .filter((v) => series === "all" || v.series === series)
      .filter((v) => !pricedOnly || v.price !== null)
      .filter((v) => !q || `${v.part} ${v.seriesName} ${v.specs.map((x) => x[1]).join(" ")}`.toLowerCase().includes(q))
      .slice()
      .sort(SORTS[sort].fn);
  }, [all, cat, series, query, sort, pricedOnly]);
  const visible = items.slice(0, shown);
  const pickCat = (c: string) => {
    setCat(c);
    setSeries("all");
    setShown(PAGE);
  };
  const pickSeries = (s: string) => {
    setSeries(s);
    setShown(PAGE);
  };
  const catLabel = cats.find((c) => c.id === cat)?.label;
  const seriesLabel = seriesList.find((x) => x.id === series)?.label;

  const sideLink = (active: boolean) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    px: 1.25,
    py: 0.9,
    border: 0,
    borderRadius: "8px",
    bgcolor: active ? "rgba(0,114,188,0.1)" : "transparent",
    color: active ? BRAND_DARK : "text.primary",
    fontFamily: "inherit",
    fontWeight: active ? 800 : 600,
    fontSize: "0.88rem",
    textAlign: "left" as const,
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": { bgcolor: "rgba(0,114,188,0.06)" },
  });

  return (
    <Box sx={{ bgcolor: "#f5f7fa", minHeight: "100vh", "& .MuiTypography-root": { textTransform: "none" } }}>
      {/* Store header: title + search */}
      <Box sx={{ bgcolor: "#fff", borderBottom: `1px solid ${LINE}` }}>
        <Box sx={{ maxWidth: 1320, mx: "auto", px: { xs: 2, md: 3 }, py: { xs: 2.5, md: 3 } }}>
          <PageBreadcrumbs tone="dark" items={[{ label: "Shop" }]} />
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { md: "center" }, justifyContent: "space-between", gap: 2 }}>
            <Box>
              <Typography component="h1" sx={{ fontWeight: 800, fontSize: { xs: "1.6rem", md: "2rem" }, letterSpacing: "-0.01em", lineHeight: 1.15 }}>
                Hiflux Shop
              </Typography>
              <Typography sx={{ mt: 0.5, color: "text.secondary", fontSize: "0.95rem" }}>
                High pressure valves, fittings and accessories, engineered to spec. Order online or request a quote.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.5, height: 46, width: { xs: "100%", md: 420 }, border: `1.5px solid ${LINE}`, borderRadius: "10px", bgcolor: "#fff", "&:focus-within": { borderColor: BRAND } }}>
              <SearchIcon sx={{ color: "text.secondary" }} />
              <InputBase value={query} onChange={(e) => { setQuery(e.target.value); setShown(PAGE); }} placeholder={`Search ${all.length.toLocaleString("en-GB")} parts by part number or product…`} inputProps={{ "aria-label": "Search the shop" }} sx={{ flex: 1, fontSize: "0.95rem" }} />
            </Box>
          </Box>
        </Box>
        {/* Service strip */}
        <Box sx={{ borderTop: `1px solid ${LINE}`, bgcolor: "#fbfcfe" }}>
          <Box sx={{ maxWidth: 1320, mx: "auto", px: { xs: 2, md: 3 }, py: 1.1, display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, auto)" }, justifyContent: { md: "space-between" }, gap: 1 }}>
            {SERVICE.map(({ Icon, text }) => (
              <Box key={text} sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "text.secondary" }}>
                <Icon sx={{ fontSize: 17, color: BRAND }} />
                <Typography sx={{ fontSize: { xs: "0.74rem", md: "0.82rem" }, fontWeight: 600 }}>{text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1320, mx: "auto", px: { xs: 2, md: 3 }, py: { xs: 2.5, md: 4 }, display: "grid", gridTemplateColumns: { xs: "1fr", md: "250px 1fr" }, gap: { xs: 2, md: 3.5 }, alignItems: "start" }}>
        {/* Sidebar */}
        <Box component="aside" sx={{ position: { md: "sticky" }, top: { md: 110 }, display: { xs: "none", md: "grid" }, gap: 2 }}>
          <Box sx={{ bgcolor: "#fff", border: `1px solid ${LINE}`, borderRadius: "10px", p: 1.5 }}>
            <Typography sx={{ px: 1.25, pb: 1, fontWeight: 800, fontSize: "0.78rem", letterSpacing: "0.1em", color: "text.secondary", textTransform: "uppercase !important" }}>Category</Typography>
            <Box component="button" type="button" onClick={() => pickCat("all")} sx={sideLink(cat === "all")}>
              <span>All categories</span>
              <Box component="span" sx={{ fontSize: "0.75rem", color: "text.secondary", fontWeight: 600 }}>{all.length.toLocaleString("en-GB")}</Box>
            </Box>
            {cats.map((c) => (
              <Box key={c.id} component="button" type="button" onClick={() => pickCat(c.id)} sx={sideLink(cat === c.id)}>
                <span>{LABEL_SHORT(c.label)}</span>
                <Box component="span" sx={{ fontSize: "0.75rem", color: "text.secondary", fontWeight: 600 }}>{c.count}</Box>
              </Box>
            ))}
            {seriesList.length > 1 && (
              <Box sx={{ mt: 1.5, pt: 1.5, borderTop: `1px solid ${LINE}` }}>
                <Typography sx={{ px: 1.25, pb: 1, fontWeight: 800, fontSize: "0.78rem", letterSpacing: "0.1em", color: "text.secondary", textTransform: "uppercase !important" }}>Series</Typography>
                <Box component="button" type="button" onClick={() => pickSeries("all")} sx={sideLink(series === "all")}>
                  <span>All series</span>
                </Box>
                {seriesList.map((x) => (
                  <Box key={x.id} component="button" type="button" onClick={() => pickSeries(x.id)} sx={sideLink(series === x.id)}>
                    <span>{LABEL_SHORT(x.label)}</span>
                    <Box component="span" sx={{ fontSize: "0.75rem", color: "text.secondary", fontWeight: 600 }}>{x.count}</Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
          <Box sx={{ bgcolor: "#fff", border: `1px solid ${LINE}`, borderRadius: "10px", p: 1.5 }}>
            <Typography sx={{ px: 1.25, pb: 1, fontWeight: 800, fontSize: "0.78rem", letterSpacing: "0.1em", color: "text.secondary", textTransform: "uppercase !important" }}>Full range by category</Typography>
            {CATEGORIES.map((c) => (
              <Box key={c.id} component={Link} href={c.href} sx={sideLink(false)}>
                <span>{c.label}</span>
                <Box component="span" sx={{ color: "text.secondary" }}>›</Box>
              </Box>
            ))}
          </Box>
          <Box sx={{ bgcolor: BRAND_DARK, color: "#fff", borderRadius: "10px", p: 2 }}>
            <Typography sx={{ fontWeight: 800 }}>Need a quote?</Typography>
            <Typography sx={{ mt: 0.5, fontSize: "0.82rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>Send a part list or BOM and we reply within one working day.</Typography>
            <Box component={Link} href="/contact" sx={{ mt: 1.5, display: "block", textAlign: "center", py: 0.9, borderRadius: "8px", bgcolor: "#fff", color: BRAND_DARK, fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>
              Request a Quote
            </Box>
          </Box>
        </Box>

        {/* Results */}
        <Box sx={{ minWidth: 0 }}>
          {/* Phone: type chips */}
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 0.75, overflowX: "auto", pb: 1.5, mb: 0.5, "&::-webkit-scrollbar": { display: "none" } }}>
            {[{ id: "all", label: "All" }, ...cats].map((c) => (
              <Box key={c.id} component="button" type="button" onClick={() => pickCat(c.id)} sx={{ flexShrink: 0, px: 1.5, py: 0.7, borderRadius: "999px", border: `1px solid ${cat === c.id ? BRAND : LINE}`, bgcolor: cat === c.id ? BRAND : "#fff", color: cat === c.id ? "#fff" : "text.primary", fontFamily: "inherit", fontWeight: 700, fontSize: "0.8rem" }}>
                {c.id === "all" ? "All" : LABEL_SHORT(c.label)}
              </Box>
            ))}
          </Box>

          {/* Toolbar */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5, mb: 2, flexWrap: "wrap" }}>
            <Typography sx={{ fontSize: "0.9rem", color: "text.secondary" }}>
              <Box component="span" sx={{ fontWeight: 800, color: "text.primary" }}>{items.length.toLocaleString("en-GB")}</Box> {items.length === 1 ? "part" : "parts"}
              {catLabel && <> in <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>{seriesLabel ?? catLabel}</Box></>}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              <Box
                component="label"
                sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, px: 1.25, height: 40, border: `1px solid ${pricedOnly ? BRAND : LINE}`, borderRadius: "8px", bgcolor: pricedOnly ? "rgba(0,114,188,0.06)" : "#fff", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", userSelect: "none" }}
              >
                <input type="checkbox" checked={pricedOnly} onChange={(e) => { setPricedOnly(e.target.checked); setShown(PAGE); }} style={{ accentColor: BRAND, width: 16, height: 16 }} />
                Priced online only
              </Box>
              <Select size="small" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products" sx={{ bgcolor: "#fff", borderRadius: "8px", fontSize: "0.85rem", minWidth: 180 }}>
                {Object.entries(SORTS).map(([k, v]) => (
                  <MenuItem key={k} value={k} sx={{ fontSize: "0.88rem" }}>Sort: {v.label}</MenuItem>
                ))}
              </Select>
              <Box sx={{ display: "flex", border: `1px solid ${LINE}`, borderRadius: "8px", bgcolor: "#fff" }}>
                <IconButton size="small" aria-label="Grid view" onClick={() => setView("grid")} sx={{ borderRadius: "8px", color: view === "grid" ? BRAND : "text.secondary" }}>
                  <GridViewIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" aria-label="List view" onClick={() => setView("list")} sx={{ borderRadius: "8px", color: view === "list" ? BRAND : "text.secondary" }}>
                  <ViewListIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {items.length === 0 ? (
            <Box sx={{ bgcolor: "#fff", border: `1px solid ${LINE}`, borderRadius: "10px", p: 4, textAlign: "center" }}>
              <Typography sx={{ fontWeight: 700 }}>No parts match{query ? ` “${query}”` : ""}.</Typography>
              <Typography sx={{ mt: 0.75, color: "text.secondary", fontSize: "0.9rem" }}>
                Try the <Link href="/product-index" style={{ color: BRAND, fontWeight: 600 }}>product index</Link> for every part number, or <Link href="/contact" style={{ color: BRAND, fontWeight: 600 }}>ask us</Link>.
              </Typography>
            </Box>
          ) : view === "grid" ? (
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }, gap: { xs: 1.25, md: 2 } }}>
              {visible.map((it) => (
                <GridCard key={it.id} item={it} />
              ))}
            </Box>
          ) : (
            <Box sx={{ border: `1px solid ${LINE}`, borderRadius: "10px", overflow: "hidden" }}>
              {visible.map((it) => (
                <ListRow key={it.id} item={it} />
              ))}
            </Box>
          )}

          {items.length > visible.length && (
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography sx={{ mb: 1.25, fontSize: "0.85rem", color: "text.secondary" }}>
                Showing {visible.length} of {items.length.toLocaleString("en-GB")}
              </Typography>
              <Button variant="outlined" onClick={() => setShown((n) => n + PAGE * 2)} sx={{ textTransform: "none", fontWeight: 700, borderRadius: "8px", px: 4, borderColor: LINE, color: "text.primary", "&:hover": { borderColor: BRAND, color: BRAND } }}>
                Show more parts
              </Button>
            </Box>
          )}

          {/* Footer of results */}
          <Box sx={{ mt: 3, p: { xs: 2, md: 2.5 }, bgcolor: "#fff", border: `1px solid ${LINE}`, borderRadius: "10px", display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { sm: "center" }, justifyContent: "space-between", gap: 1.5 }}>
            <Box>
              <Typography sx={{ fontWeight: 800 }}>Can’t see the part you need?</Typography>
              <Typography sx={{ fontSize: "0.88rem", color: "text.secondary" }}>Send us the pressure, tube size and connection and we will find the matching HIFLUX part, or quote a special.</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Box component={Link} href="/products" sx={{ px: 2, py: 1, borderRadius: "8px", bgcolor: BRAND, color: "#fff", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none", whiteSpace: "nowrap" }}>
                Browse the full range
              </Box>
              <Box component={Link} href="/contact" sx={{ px: 2, py: 1, borderRadius: "8px", border: `1.5px solid ${LINE}`, color: "text.primary", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none", whiteSpace: "nowrap" }}>
                Request a Quote
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
