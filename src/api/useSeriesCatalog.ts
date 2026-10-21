import { useQuery } from "@tanstack/react-query";
import axiosClient from "./axiosClient";

// Re-exported for existing importers; defined in a plain module so server
// components (the product-page redirect) can use it too.
export { SERIES_BRIDGE } from "./seriesBridge";
export type { SeriesBridge } from "./seriesBridge";

// --- Shapes returned by the SQL-backed SeriesProduct API (Hiflux.API) ---

export interface SeriesCertificate {
  label: string;
  url: string;
}

export interface SeriesCategory {
  categoryId: number;
  name: string;
  catalogUrl?: string | null;
  cadUrl?: string | null;
  description?: string | null;
  bodyMaterial?: string | null;
  seatMaterial?: string | null;
  design?: string | null;
  temperatureRange?: string | null;
  approvals?: string | null;
  datasheetUrl?: string | null;
  keyFeatures: string[];
  certificates: SeriesCertificate[];
}

export interface ConfiguratorValue {
  value: string;
  available: boolean;
}

export interface ConfiguratorOption {
  filterId: number;
  name: string;
  sortOrder: number;
  values: ConfiguratorValue[];
}

export interface ResolvedProduct {
  productId: number;
  partNumber: string;
  productStatus: string;
  familyDescription?: string | null;
  detailDescription?: string | null;
  imageUrl?: string | null;
  price?: number | null;
  specs: { filter: string; value: string }[];
}

export interface ConfiguratorState {
  options: ConfiguratorOption[];
  matchCount: number;
  totalCount: number;
  resolved: ResolvedProduct | null;
  imageUrl?: string | null;
}

export const fetchSeriesCategories = async (): Promise<SeriesCategory[]> => {
  const { data } = await axiosClient.get<SeriesCategory[]>(
    `/api/SeriesProduct/categories`,
  );
  return data;
};

export const useSeriesCategory = (categoryId: string) =>
  useQuery({
    queryKey: ["series-category", categoryId],
    queryFn: async () => {
      const cats = await fetchSeriesCategories();
      return cats.find((c) => String(c.categoryId) === categoryId) ?? null;
    },
    enabled: !!categoryId,
  });

// --- Server-side configurator (no full product download) ---

export const fetchConfiguratorState = async (
  categoryId: string,
  selection: Record<string, string>,
): Promise<ConfiguratorState> => {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(selection))
    params.append(`filters[${k}]`, v);
  const qs = params.toString();
  const { data } = await axiosClient.get<ConfiguratorState>(
    `/api/SeriesProduct/categories/${categoryId}/configure${qs ? `?${qs}` : ""}`,
  );
  return data;
};

export const useSeriesConfigurator = (
  categoryId: string,
  selection: Record<string, string>,
) =>
  useQuery({
    queryKey: ["series-configurator", categoryId, selection],
    queryFn: () => fetchConfiguratorState(categoryId, selection),
    enabled: !!categoryId,
    // Keep the previous options on screen while the next selection resolves,
    // so the buttons don't flash/empty between clicks.
    placeholderData: (prev) => prev,
  });
