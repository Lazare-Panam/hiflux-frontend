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

export const useProductVariants = (id: string) => {
  return useQuery({
    queryKey: ["variants", id],
    queryFn: () => fetchVariants(id),
    enabled: !!id,
  });
};