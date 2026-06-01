import { FadeIn } from "@/components/motion/fade-in";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { homepageFaqs } from "@/lib/site-pages";

export function HomepageFaqSection() {
  return (
    <section id="faq" className="section-padding">
      <div className="container-max max-w-3xl">
        <FadeIn className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent-blue">FAQ</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
        </FadeIn>
        <FadeIn delay={0.1} className="mt-12">
          <FaqAccordion items={homepageFaqs} />
        </FadeIn>
      </div>
    </section>
  );
}
