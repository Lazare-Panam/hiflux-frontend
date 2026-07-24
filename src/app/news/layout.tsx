import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News',
  description: 'Updates, stories and insights from Your Company.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}