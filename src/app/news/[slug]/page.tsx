import { blogs } from "../data/blogs";
import BlogPost from "../components/BlogPost";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd from "@/app/seo/JsonLd";
import { SITE_URL, articleLd } from "@/app/seo/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return {};
  const title = blog.seoTitle ?? blog.title.split(":")[0].trim();
  const description = blog.metaDescription ?? blog.excerpt;
  const url = `https://www.hiflux.uk.com/news/${blog.slug}`;
  const images = blog.heroImage ? [blog.heroImage] : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", siteName: "Hiflux UK", title, description, url, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return notFound();

  // blog.date is a human-readable string (e.g. "August 3, 2026"); fall back
  // to omitting the field entirely if it can't be parsed rather than
  // emitting an invalid ISO date into the schema.
  const parsedDate = new Date(blog.date);
  const datePublished = Number.isNaN(parsedDate.getTime())
    ? undefined
    : parsedDate.toISOString();

  const articleSchema = articleLd({
    headline: blog.title,
    description: blog.excerpt,
    image: blog.heroImage,
    url: `${SITE_URL}/news/${blog.slug}`,
    datePublished,
  });

  return (
    <>
      <JsonLd data={articleSchema} />
      <BlogPost blog={blog} />
    </>
  );
}

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}
