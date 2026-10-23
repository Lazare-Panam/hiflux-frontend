// NOTE: Copy grounded in the cookies the site actually loads (Microsoft Clarity,
// Google Analytics G-VES6DYGCYH). Have it reviewed by legal counsel before
// relying on it — the structure/routing/SEO is production-ready; the wording is
// a starting point, not vetted legal advice.
import type { Metadata } from "next";
import LegalPageLayout, { type LegalSection } from "../Common/LegalPageLayout";
import { COMPANY } from "../Common/company";

export const metadata: Metadata = {
  title: "Cookie Policy | Hiflux UK",
  description:
    "How Hiflux UK uses cookies and similar technologies, including Microsoft Clarity and Google Analytics, and how you can manage them.",
  alternates: { canonical: "https://www.hiflux.uk.com/cookie-policy" },
};

const sections: LegalSection[] = [
  {
    heading: "What are cookies?",
    body: [
      "Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, to improve performance, and to provide information to the site’s owners about how the site is used.",
    ],
  },
  {
    heading: "Cookies we use",
    body: [
      "Essential cookies keep the site working, including features such as your shopping cart.",
      "Analytics cookies help us understand how visitors use the site so we can improve it. We use Microsoft Clarity (session analytics and heatmaps) and Google Analytics (aggregated traffic measurement). These set their own cookies and may collect usage data in line with their respective privacy policies.",
    ],
  },
  {
    heading: "Managing cookies",
    body: [
      "You can accept or reject cookies through your browser settings, and delete cookies already stored. Blocking some cookies may affect how parts of the site function. For guidance on managing cookies, see your browser’s help pages or aboutcookies.org.",
    ],
  },
  {
    heading: "Contact us",
    body: [
      `If you have any questions about our use of cookies, email sales@hiflux.uk.com or write to ${COMPANY.legalName}, ${COMPANY.office.lines.join(", ")}.`,
    ],
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      lastUpdated="October 2026"
      intro="This Cookie Policy explains how we use cookies and similar technologies on this website."
      sections={sections}
    />
  );
}
