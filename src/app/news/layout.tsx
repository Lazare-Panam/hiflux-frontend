// Metadata lives on news/page.tsx and news/[slug]/page.tsx so each page gets
// its own canonical and social tags.

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}