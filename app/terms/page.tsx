import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/legal-page-content";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for using the ${siteConfig.name} website and digital services.`,
};

export default function TermsPage() {
  return (
    <LegalPageContent
      title="Terms of Service"
      description="Terms and conditions governing use of the Bavanex Technologies website."
      lastUpdated="March 30, 2026"
      sections={[
        {
          title: "1. Agreement",
          paragraphs: [
            `By accessing or using the website of ${siteConfig.name} ("Bavanex"), you agree to these Terms of Service. If you do not agree, please do not use our website.`,
          ],
        },
        {
          title: "2. Use of Website",
          paragraphs: ["You agree to use this website only for lawful purposes. You must not:"],
          list: [
            "Attempt to gain unauthorized access to our systems or data",
            "Transmit malware, spam, or harmful content",
            "Misrepresent your identity or affiliation",
            "Scrape or automate access in a way that impairs site performance",
          ],
        },
        {
          title: "3. Intellectual Property",
          paragraphs: [
            "All content on this website — including text, graphics, logos, software, and design — is owned by Bavanex or its licensors and is protected by intellectual property laws. You may not reproduce or distribute content without prior written permission.",
          ],
        },
        {
          title: "4. Demo Requests & Communications",
          paragraphs: [
            "Submitting a demo request or contact form does not create a binding contract for services. Any engagement will be governed by a separate written agreement between Bavanex and the client.",
          ],
        },
        {
          title: "5. Disclaimer",
          paragraphs: [
            "This website and its content are provided 'as is' for general information purposes. We make reasonable efforts to ensure accuracy but do not warrant that all information is complete or current.",
          ],
        },
        {
          title: "6. Limitation of Liability",
          paragraphs: [
            "To the fullest extent permitted by law, Bavanex shall not be liable for indirect, incidental, or consequential damages arising from your use of this website.",
          ],
        },
        {
          title: "7. Third-Party Links",
          paragraphs: [
            "Our website may contain links to third-party sites. We are not responsible for the content or privacy practices of external websites.",
          ],
        },
        {
          title: "8. Governing Law",
          paragraphs: [
            "These terms are governed by the laws of India, without regard to conflict of law principles, unless mandatory local law requires otherwise.",
          ],
        },
        {
          title: "9. Contact",
          paragraphs: [
            `For questions about these Terms, contact ${siteConfig.email}.`,
          ],
        },
      ]}
    />
  );
}
