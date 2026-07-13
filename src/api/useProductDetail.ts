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

export const useProductDetail = (id: string) => {
  return useQuery({
    queryKey: ["product-detail", id],
    queryFn: () => fetchProductDetail(id),
    enabled: !!id,
  });
};