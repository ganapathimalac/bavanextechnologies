import { FadeIn } from "@/components/motion/fade-in";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { homepageFaqs } from "@/lib/site-pages";

export function HomepageFaqSection() {
  return (
    <section id="faq" className="section-padding">
      <div className="container-max">
        <div className="content-narrow">
          <FadeIn className="text-center">
            <span className="section-eyebrow">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </FadeIn>
          <FadeIn delay={0.1} className="mt-12">
            <FaqAccordion items={homepageFaqs} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
