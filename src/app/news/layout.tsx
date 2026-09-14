import type { Metadata } from 'next';
/**/
export const metadata: Metadata = {
  title: 'High-Pressure Valve News & Insights | Hiflux UK',
  description: 'Updates, stories and insights from Hiflux on high-pressure valves, fittings and hydrogen-ready flow-control engineering.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}