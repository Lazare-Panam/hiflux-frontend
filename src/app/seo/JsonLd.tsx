import { serializeJsonLd } from "./schema";

/**
 * Renders a JSON-LD <script> tag with XSS-safe serialisation (escapes `<`).
 * A native <script> is correct here — JSON-LD is data, not executable code, so
 * next/script is not used (see Next.js JSON-LD guide).
 */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
