import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/legal-page-content";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Cookie Policy for ${siteConfig.name} — how we use cookies and similar technologies.`,
};

export default function CookiesPage() {
  return (
    <LegalPageContent
      title="Cookie Policy"
      description="How Bavanex Technologies uses cookies and similar tracking technologies."
      lastUpdated="March 30, 2026"
      sections={[
        {
          title: "1. What Are Cookies",
          paragraphs: [
            "Cookies are small text files stored on your device when you visit a website. They help websites function properly and can improve your experience.",
          ],
        },
        {
          title: "2. Cookies We Use",
          paragraphs: ["We may use the following types of cookies:"],
          list: [
            "Essential cookies — required for site functionality and security",
            "Preference cookies — remember language or chat session settings (e.g. localStorage for chat history)",
            "Analytics cookies — help us understand how visitors use our site (if enabled)",
          ],
        },
        {
          title: "3. Managing Cookies",
          paragraphs: [
            "You can control cookies through your browser settings. Disabling essential cookies may affect website functionality.",
          ],
        },
        {
          title: "4. Updates",
          paragraphs: [
            "We may update this Cookie Policy periodically. Please review this page for the latest information.",
          ],
        },
        {
          title: "5. Contact",
          paragraphs: [
            `Questions? Email ${siteConfig.email}. See also our Privacy Policy for how we handle personal data.`,
          ],
        },
      ]}
    />
  );
}
