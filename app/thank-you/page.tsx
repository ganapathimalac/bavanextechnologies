import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for contacting Bavanex Technologies.",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ type?: string }> };

const messages: Record<string, { title: string; body: string }> = {
  demo: {
    title: "Demo Request Received",
    body: "Our team will confirm your demo session within one business day. Check your email for updates.",
  },
  contact: {
    title: "Message Sent Successfully",
    body: "Thank you for reaching out. A member of our team will respond within 24 hours.",
  },
  default: {
    title: "Thank You",
    body: "We have received your submission and will be in touch shortly.",
  },
};

export default async function ThankYouPage({ searchParams }: Props) {
  const params = await searchParams;
  const type = params.type ?? "default";
  const content = messages[type] ?? messages.default;

  return (
    <section className="flex min-h-[70vh] items-center section-padding pt-28">
      <div className="container-max">
        <div className="content-focus text-center">
        <FadeIn>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold text-white sm:text-4xl">{content.title}</h1>
          <p className="mt-4 text-lg text-muted">{content.body}</p>
          <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted">
            <Mail className="h-4 w-4" />
            {siteConfig.email}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/">
              <Button variant="secondary" className="w-full sm:w-auto">
                Back to Home
              </Button>
            </Link>
            <Link href="/resources">
              <Button className="w-full sm:w-auto">
                Explore Resources <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </FadeIn>
        </div>
      </div>
    </section>
  );
}
