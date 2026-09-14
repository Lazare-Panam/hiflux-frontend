import { cache } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "./axiosClient";

export interface ProductSeriesVariants {
  id: string;
  name: string;
  thumbnailImage: string;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  specs: Record<string, string>;
}

const fetchVariants = async (id: string): Promise<ProductSeriesVariants> => {
  const { data } = await axiosClient.get(`/api/product/${id}/variants`);
  return data;
};

/** Server-side, request-memoised variants fetch (dedupes generateMetadata + page body). */
export const getProductVariants = cache(fetchVariants);

export const useProductVariants = (id: string) => {
  return useQuery({
    queryKey: ["variants", id],
    queryFn: () => fetchVariants(id),
    enabled: !!id,
  });
};