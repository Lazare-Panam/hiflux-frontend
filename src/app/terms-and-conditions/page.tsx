// NOTE: Standard baseline copy grounded in real company details. Have it
// reviewed by legal counsel before relying on it — the structure/routing/SEO is
// production-ready; the wording is a starting point, not vetted legal advice.
import type { Metadata } from "next";
import LegalPageLayout, { type LegalSection } from "../Common/LegalPageLayout";
import { COMPANY } from "../Common/company";

export const metadata: Metadata = {
  title: "Terms & Conditions | Hiflux UK",
  description:
    "The terms and conditions governing your use of the Hiflux UK website and the purchase of products from Hiflux Hydrogen Ltd.",
  alternates: { canonical: "https://www.hiflux.uk.com/terms-and-conditions" },
};

const sections: LegalSection[] = [
  {
    heading: "Introduction",
    body: [
      `These terms and conditions govern your use of this website and your relationship with ${COMPANY.legalName} (“we”, “us”, “our”), a company registered in England and Wales under company number ${COMPANY.companyNumber}. By using this website you accept these terms in full.`,
    ],
  },
  {
    heading: "Use of the website",
    body: [
      "You may use this website for lawful purposes only. You must not use it in any way that causes, or may cause, damage to the site or impairment of its availability, or in any way that is unlawful, fraudulent or harmful.",
    ],
  },
  {
    heading: "Products, pricing and availability",
    body: [
      "We make every effort to ensure product descriptions, specifications and prices shown on the site are accurate. However, specifications and prices may change without notice, and products are subject to availability. Where a product’s correct price differs from the price shown, we will contact you before processing your order.",
    ],
  },
  {
    heading: "Orders and quotations",
    body: [
      "An order or enquiry placed through the site is an offer to purchase. No contract exists until we confirm acceptance of your order. We reserve the right to decline any order.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "All content on this website, including text, images, logos and product data, is owned by or licensed to us and is protected by intellectual property laws. You may not reproduce or redistribute it without our written permission.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, we are not liable for any indirect or consequential loss arising from your use of this website. Nothing in these terms limits liability that cannot be limited under applicable law.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of England and Wales, and any disputes are subject to the exclusive jurisdiction of the courts of England and Wales.",
    ],
  },
  {
    heading: "Contact us",
    body: [
      `Questions about these terms can be sent to sales@hiflux.uk.com or ${COMPANY.legalName}, ${COMPANY.office.lines.join(", ")}.`,
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      lastUpdated="October 2026"
      intro="Please read these terms and conditions carefully before using this website or purchasing our products."
      sections={sections}
    />
  );
}
