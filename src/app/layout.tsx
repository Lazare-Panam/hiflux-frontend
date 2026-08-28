import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import ThemeRegistry from "@/theme/ThemeRegistry";
import QueryProvider from "@/theme/QueryProvider";
import Navbar from "./Common/Navbar/Navbar";
import Script from "next/script";
import Footer from "./Common/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Hiflux UK",
  description: "Hiflux UK manufactures high-pressure valves, fittings, tubing and hydrogen-ready flow-control components rated up to 150,000 psi for industrial, energy and research applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable}`}
    >
      <head>
        <script
          data-cfasync="false"
          type="text/javascript"
          src="https://cdn.seoplatform.io/injector.js?websiteId=28611"
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "y5wirsyo68");
      `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Hiflux UK",
              url: "https://www.hiflux.uk.com",
              logo: "https://pblol2.blob.core.windows.net/valvenok-images/products/hiflux/logo.png",
              description:
                "Hiflux UK manufactures high-pressure valves, fittings, tubing and hydrogen-ready flow-control components rated up to 150,000 psi for industrial, energy and research applications.",
              email: "sales@hiflux.uk.com",
              telephone: "+44 7369 243459",
              address: {
                "@type": "PostalAddress",
                addressCountry: "GB",
              },
              memberOf: {
                "@type": "Organization",
                name: "Hydrogen Energy Association",
                url: "https://ukhea.co.uk/",
              },
            }),
          }}
        />
      </head>
      <body>
        <QueryProvider>
          <ThemeRegistry>
            {" "}
            <Navbar />
            {children}
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-VES6DYGCYH"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-VES6DYGCYH');
  `}
            </Script>
            <Footer />
          </ThemeRegistry>
        </QueryProvider>
      </body>
    </html>
  );
}
