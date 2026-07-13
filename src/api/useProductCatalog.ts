import { useQuery } from "@tanstack/react-query";
import axiosClient from "./axiosClient";

export enum ProductType {
  ProductListing = 0,
  Grid = 1,
}
export interface CtaLink {
  label: string;
  link: string;
}

export interface SeoInfo {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

export interface HeroInfo {
  overline?: string;
  title?: string;
  titleAccent?: string;
  subtitle?: string;
  bannerImage?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
}

export interface IntroInfo {
  heading?: string;
  paragraphs?: string[];
}

export interface KeyFeaturesInfo {
  heading?: string;
  subtext?: string;
  items?: string[];
}

export interface CtaInfo {
  heading?: string;
  text?: string;
  emailCta?: CtaLink;
  quoteCta?: CtaLink;
}

export interface ProductItem {
  image: string | undefined;
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  thumbnailImage: string;
  type: ProductType;
  tag?: string;
  materialBadge?: string;
  specs?: Record<string, string>;
  features?: string[];
}

export interface ProductCatalog {
  id: string;
  type: ProductType;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerImage: string;
  products: ProductItem[];
  seo?: SeoInfo;
  hero?: HeroInfo;
  marquee?: string[];
  intro?: IntroInfo;
  productsSectionLabel?: string;
  productsHeading?: string;
  productsSubtext?: string;
  keyFeatures?: KeyFeaturesInfo;
  cta?: CtaInfo;
}

export const fetchCatalog = async (id: string): Promise<ProductCatalog> => {
  const { data } = await axiosClient.get(`/api/product/${id}`);
  return data;
};

export const useProductCatalog = (id: string) => {
  return useQuery({
    queryKey: ["catalog", id],
    queryFn: () => fetchCatalog(id),
    enabled: !!id,
  });
};
