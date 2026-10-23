// NOTE: Standard baseline copy grounded in real company details and the site's
// actual data use (contact form, Microsoft Clarity + Google Analytics). Have it
// reviewed by legal counsel before relying on it — the structure/routing/SEO is
// production-ready; the wording is a starting point, not vetted legal advice.
import type { Metadata } from "next";
import LegalPageLayout, { type LegalSection } from "../Common/LegalPageLayout";
import { COMPANY } from "../Common/company";

export const metadata: Metadata = {
  title: "Privacy Policy | Hiflux UK",
  description:
    "How Hiflux Hydrogen Ltd collects, uses and protects your personal data in line with UK GDPR and the Data Protection Act 2018.",
  alternates: { canonical: "https://www.hiflux.uk.com/privacy-policy" },
};

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      `This website is operated by ${COMPANY.legalName} (“we”, “us”, “our”), a company registered in England and Wales under company number ${COMPANY.companyNumber}, with its registered office at ${COMPANY.registeredOffice}. We are the data controller responsible for your personal data.`,
    ],
  },
  {
    heading: "Information we collect",
    body: [
      "When you contact us through our enquiry form, request a quote, or place an order, we collect the details you provide — typically your name, email address, telephone number, company and the content of your message.",
      "We also collect limited technical and usage information automatically when you browse the site, such as pages visited and interactions, through the analytics tools described in our Cookie Policy.",
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "We use your information to respond to your enquiries, prepare quotations, process and fulfil orders, provide customer support, and improve our website and services. We rely on your consent, our legitimate business interests, and — where you place an order — the performance of a contract with you.",
    ],
  },
  {
    heading: "Cookies and analytics",
    body: [
      "We use cookies and similar technologies, including Microsoft Clarity and Google Analytics, to understand how visitors use the site. You can control these through your browser settings. See our Cookie Policy for details.",
    ],
  },
  {
    heading: "Sharing your information",
    body: [
      "We do not sell your personal data. We share it only with service providers who help us run our business — for example cloud hosting and email delivery (Microsoft Azure) and analytics providers — and where required by law. These providers process data on our behalf under appropriate agreements.",
    ],
  },
  {
    heading: "Data retention",
    body: [
      "We keep personal data only for as long as necessary to fulfil the purposes for which it was collected, including to meet legal, accounting or reporting requirements.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Under UK GDPR you have the right to access, correct, erase, restrict or object to the processing of your personal data, and the right to data portability. To exercise any of these rights, contact us using the details below. You also have the right to lodge a complaint with the Information Commissioner’s Office (ICO) at ico.org.uk.",
    ],
  },
  {
    heading: "Contact us",
    body: [
      `If you have any questions about this policy or how we handle your data, email us at sales@hiflux.uk.com or write to ${COMPANY.legalName}, ${COMPANY.office.lines.join(", ")}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="October 2026"
      intro={`This Privacy Policy explains how ${COMPANY.legalName} collects, uses and protects your personal data when you use this website or contact us.`}
      sections={sections}
    />
  );
}
