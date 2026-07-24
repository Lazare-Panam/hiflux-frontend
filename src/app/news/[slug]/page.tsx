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
    title: blog.title.split(":")[0].trim(),
    description: blog.excerpt,
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
  return <BlogPost blog={blog} />;
}

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}
