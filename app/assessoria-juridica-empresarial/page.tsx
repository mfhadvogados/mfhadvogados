import { ServicePage } from "@/components/site/ServicePage";
import { pageMetadata } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";

export const metadata = pageMetadata(servicePages.business);

export default function BusinessPage() {
  return <ServicePage service="business" />;
}
