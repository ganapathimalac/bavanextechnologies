import { HeroSection } from "@/components/sections/hero";
import { TrustedBySection } from "@/components/sections/trusted-by";
import { ServicesSection } from "@/components/sections/services";
import { PlatformSection } from "@/components/sections/platform";
import { IndustriesSection } from "@/components/sections/industries";
import { StatsSection } from "@/components/sections/stats";
import { CaseStudiesSection } from "@/components/sections/case-studies";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { CareersSection } from "@/components/sections/careers";
import { BlogSection } from "@/components/sections/blog";
import { ContactSection } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <ServicesSection />
      <PlatformSection />
      <IndustriesSection />
      <StatsSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <CareersSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
