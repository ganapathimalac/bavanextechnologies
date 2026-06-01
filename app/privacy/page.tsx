import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/legal-page-content";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name} — how we collect, use, and protect your personal data.`,
};

export default function PrivacyPage() {
  return (
    <LegalPageContent
      title="Privacy Policy"
      description="How Bavanex Technologies collects, uses, and protects your personal information."
      lastUpdated="March 30, 2026"
      sections={[
        {
          title: "1. Introduction",
          paragraphs: [
            `${siteConfig.name} ("Bavanex", "we", "us") respects your privacy and is committed to protecting personal data in accordance with applicable data protection laws, including the General Data Protection Regulation (GDPR) where applicable.`,
            "This Privacy Policy explains what information we collect when you visit our website, request a demo, use our chatbot, or contact us, and how we use that information.",
          ],
        },
        {
          title: "2. Information We Collect",
          paragraphs: ["We may collect the following categories of information:"],
          list: [
            "Contact details: name, email address, phone number, company name, job title",
            "Business information: company size, service interests, project requirements",
            "Communication data: messages sent via contact forms, demo requests, or chatbot",
            "Technical data: IP address, browser type, device information, and usage analytics",
            "Cookies and similar technologies as described in our Cookie Policy",
          ],
        },
        {
          title: "3. How We Use Your Information",
          paragraphs: ["We use personal data to:"],
          list: [
            "Respond to demo requests, inquiries, and support tickets",
            "Provide and improve our website and services",
            "Send service-related communications you have requested",
            "Comply with legal obligations and protect our legitimate business interests",
            "Analyze website usage to improve user experience",
          ],
        },
        {
          title: "4. Legal Basis for Processing (GDPR)",
          paragraphs: [
            "Where GDPR applies, we process personal data based on: your consent (e.g. form submissions), performance of a contract or pre-contractual steps, legitimate interests (e.g. improving our services), or legal obligations.",
          ],
        },
        {
          title: "5. Data Sharing",
          paragraphs: [
            "We do not sell your personal data. We may share information with trusted service providers (e.g. email hosting, cloud infrastructure such as Microsoft Azure) solely to operate our business, subject to appropriate safeguards.",
          ],
        },
        {
          title: "6. Data Retention",
          paragraphs: [
            "We retain personal data only as long as necessary for the purposes described in this policy, unless a longer retention period is required by law.",
          ],
        },
        {
          title: "7. Your Rights",
          paragraphs: ["Depending on your location, you may have the right to:"],
          list: [
            "Access, correct, or delete your personal data",
            "Object to or restrict certain processing",
            "Withdraw consent where processing is consent-based",
            "Lodge a complaint with a supervisory authority",
          ],
        },
        {
          title: "8. Security",
          paragraphs: [
            "We implement appropriate technical and organizational measures to protect personal data, including encrypted connections (HTTPS) and secure cloud hosting.",
          ],
        },
        {
          title: "9. Changes",
          paragraphs: [
            "We may update this Privacy Policy from time to time. The 'Last updated' date at the top of this page indicates when it was last revised.",
          ],
        },
      ]}
    />
  );
}
