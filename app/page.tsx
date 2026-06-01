import { HeroSection } from "@/components/sections/hero";
import { TrustedBySection } from "@/components/sections/trusted-by";
import { ServicesSection } from "@/components/sections/services";
import { PlatformSection } from "@/components/sections/platform";
import { IndustriesSection } from "@/components/sections/industries";
import { StatsSection } from "@/components/sections/stats";
import { CaseStudiesSection } from "@/components/sections/case-studies";
import { ClientSuccessSection } from "@/components/sections/client-success";
import { DeliveryProcessSection } from "@/components/sections/delivery-process";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { CareersSection } from "@/components/sections/careers";
import { BlogSection } from "@/components/sections/blog";
import { HomepageFaqSection } from "@/components/sections/homepage-faq";
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
      <ClientSuccessSection />
      <DeliveryProcessSection />
      <TestimonialsSection />
      <CareersSection />
      <BlogSection />
      <HomepageFaqSection />
      <ContactSection />
    </>
  );
}
