import { blogs } from "../data/blogs";
import BlogPost from "../components/BlogPost";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return {};
  return {
    title: blog.seoTitle ?? blog.title.split(":")[0].trim(),
    description: blog.metaDescription ?? blog.excerpt,
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.heroImage,
    ...(datePublished ? { datePublished } : {}),
    author: {
      "@type": "Organization",
      name: "Hiflux UK",
      url: "https://www.hiflux.uk.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Hiflux UK",
      logo: {
        "@type": "ImageObject",
        url: "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.hiflux.uk.com/news/${blog.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPost blog={blog} />
    </>
  );
}

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}
