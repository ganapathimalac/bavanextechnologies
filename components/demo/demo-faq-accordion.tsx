import { FaqAccordion } from "@/components/shared/faq-accordion";
import { demoPageContent } from "@/lib/demo-page";

export function DemoFaqAccordion() {
  return <FaqAccordion items={demoPageContent.faqs} />;
}
