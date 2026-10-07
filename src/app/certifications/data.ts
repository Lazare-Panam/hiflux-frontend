// Manufacturer certificates (HIFLUX Co., Ltd.). PDFs are hosted on our blob
// storage; thumbnails in /public/certifications are rendered from them (the
// English page where the certificate has one). Details are transcribed from
// each certificate, so check the PDF before changing any of them.

export const CERT_BASE = "https://pblol2.blob.core.windows.net/hiflux/certification/";

export type CertGroup = "management" | "hydrogen" | "product";

export const CERT_GROUPS: { id: CertGroup | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "management", label: "Management systems" },
  { id: "hydrogen", label: "Hydrogen (KS)" },
  { id: "product", label: "PED & ATEX" },
];

export type Cert = {
  id: string;
  group: CertGroup;
  badge: string;
  /** Short caption for the grid card; `title` is the full name. */
  name: string;
  title: string;
  issuer: string;
  number: string;
  scope: string;
  validity: string;
  file: string;
  image: string;
};

export const CERTIFICATIONS: Cert[] = [
  {
    id: "ks-kgs-23-0003",
    group: "hydrogen",
    badge: "KS",
    name: "KS Certificate: Hydrogen Station Manual Valves",
    title: "KS product certificate: hydrogen station manual valves",
    issuer: "Korea Gas Safety Corporation",
    number: "KGS-23-0003",
    scope:
      "KS B ISO 19880-3:2018 (Hydrogen gas-charging station, Part 3: Valves). Manual valve H70, 1/4\" to 3/4\": HRS-NV20VS04-S, HRS-NV20VS06-S, HRS-NV20VS09-S, HRS-NV20VS12-S",
    validity: "First certified 27 Oct 2023; periodic review due 26 Oct 2026",
    file: "KGS-23-0003.pdf",
    image: "/certifications/KGS-23-0003.webp",
  },
  {
    id: "iso-9001",
    group: "management",
    badge: "ISO 9001",
    name: "ISO 9001 Quality Management",
    title: "Quality management system",
    issuer: "Standard Management Ins. (KAB, IAF)",
    number: "SMI-2410Q",
    scope: "KS Q ISO 9001:2015. Design, development, manufacture and servicing of valves, fittings, tube, nozzles, pumps, pressure regulators and gauges",
    validity: "Valid 4 Apr 2025 to 3 Apr 2028",
    file: "ISO9001.pdf",
    image: "/certifications/ISO9001.webp",
  },
  {
    id: "iso-14001",
    group: "management",
    badge: "ISO 14001",
    name: "ISO 14001 Environmental Management",
    title: "Environmental management system",
    issuer: "Standard Management Ins. (KAB, IAF)",
    number: "SMI-2410E",
    scope: "KS I ISO 14001:2015. Same activities as the ISO 9001 certificate",
    validity: "Valid 4 Apr 2025 to 3 Apr 2028",
    file: "ISO14001.pdf",
    image: "/certifications/ISO14001.webp",
  },
  {
    id: "iso-45001",
    group: "management",
    badge: "ISO 45001",
    name: "ISO 45001 Health & Safety Management",
    title: "Occupational health and safety management system",
    issuer: "Standard Management Ins. (KAB, IAF)",
    number: "SMI-2410O",
    scope: "ISO 45001:2018. Same activities as the ISO 9001 certificate",
    validity: "Valid 4 Apr 2025 to 3 Apr 2028",
    file: "ISO45001.pdf",
    image: "/certifications/ISO45001.webp",
  },
  {
    id: "ped-needle-valve-dn32",
    group: "product",
    badge: "PED",
    name: "PED Module A2: Needle Valve (DN 32)",
    title: "Pressure Equipment Directive 2014/68/EU, Module A2: needle valve (DN 32)",
    issuer: "TÜV NORD Systems (notified body 0045)",
    number: "07/202/9160/Z/0600/18/D/0001",
    scope: "Needle valve (DN 32) only",
    validity: "Signed Hamburg, 15 Feb 2018",
    file: "CE_needlevalveND32.pdf",
    image: "/certifications/CE_needlevalveND32.webp",
  },
  {
    id: "atex-relief-factory-set",
    group: "product",
    badge: "ATEX",
    name: "ATEX: Relief Valve, Factory Set",
    title: "ATEX technical file receipt: relief valve, factory set",
    issuer: "ICIM S.p.A. (notified body 0425)",
    number: "0425 ATEX 004598-00",
    scope: "RV60FSS09, RV45FSS09, RV30FSS09, RV21FSS09, RV11FSS09. Ex II 2D/2G IIC c TX. Acknowledges receipt of the technical file; not a type-examination certificate",
    validity: "Valid to 30 Aug 2031",
    file: "0425-ATEX-004598-FactorySet.pdf",
    image: "/certifications/0425-ATEX-004598-FactorySet.webp",
  },
  {
    id: "atex-relief-field-adjustable",
    group: "product",
    badge: "ATEX",
    name: "ATEX: Relief Valve, Field Adjustable",
    title: "ATEX technical file receipt: relief valve, field adjustable",
    issuer: "ICIM S.p.A. (notified body 0425)",
    number: "0425 ATEX 004599-00",
    scope: "RV10FAS04-1/-2, RV20FAS04-1/-2. Ex II 2D/2G IIC c TX. Acknowledges receipt of the technical file; not a type-examination certificate",
    validity: "Valid to 30 Aug 2031",
    file: "0425-ATEX-004599-fieldadj.pdf",
    image: "/certifications/0425-ATEX-004599-fieldadj.webp",
  },
  {
    id: "atex-relief-proportional",
    group: "product",
    badge: "ATEX",
    name: "ATEX: Relief Valve, Proportional Type",
    title: "ATEX technical file receipt: relief valve, proportional type",
    issuer: "ICIM S.p.A. (notified body 0425)",
    number: "0425 ATEX 004600-00",
    scope: "RV20PPS09, RV15PPS08N. Ex II 2D/2G IIC c TX. Acknowledges receipt of the technical file; not a type-examination certificate",
    validity: "Valid to 30 Aug 2031",
    file: "0425-ATEX-004600-proportionaltype.pdf",
    image: "/certifications/0425-ATEX-004600-proportionaltype.webp",
  },
];
