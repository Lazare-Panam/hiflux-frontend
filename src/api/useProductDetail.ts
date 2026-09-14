import { cache } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "./axiosClient";

export interface ProductDetail {
  id: string;
  catalogId: string;
  name: string;
  description: string;
  image: string;
  specs: Record<string, string>;
  features: string[];
  applications: string[];
  temperature: string;
  relatedProducts: string[];
}

const fetchProductDetail = async (id: string): Promise<ProductDetail> => {
  const { data } = await axiosClient.get(`/api/product/${id}/detail`);
  return data;
};

/**
 * Server-side, request-memoised fetch. axios responses aren't auto-deduped the
 * way Next memoises `fetch`, so `cache` ensures generateMetadata and the page
 * body (and repeated related-product lookups) hit the API only once per request.
 */
export const getProductDetail = cache(fetchProductDetail);

export const useProductDetail = (id: string) => {
  return useQuery({
    queryKey: ["product-detail", id],
    queryFn: () => fetchProductDetail(id),
    enabled: !!id,
  });
};