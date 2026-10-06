import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-url";
import { servicePages } from "@/lib/service-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", ...Object.values(servicePages).map(({ path }) => path)].map(
    (path) => ({ url: absoluteUrl(path) }),
  );
}
