import { ServicePage } from "@/components/site/ServicePage";
import { pageMetadata } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";

export const metadata = pageMetadata(servicePages.litigation);

export default function LitigationPage() {
  return <ServicePage service="litigation" />;
}
