import { structuredData } from "@/lib/seo";
import type { ServicePageKey } from "@/lib/service-pages";

export function StructuredData({ service }: { service?: ServicePageKey }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData(service)).replace(
          /</g,
          "\\u003c",
        ),
      }}
    />
  );
}
