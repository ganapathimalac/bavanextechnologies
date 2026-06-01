import Link from "next/link";
import { Linkedin, Twitter, Github, Youtube } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { footerLinks, siteConfig } from "@/lib/data";

const social = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  const columns = [
    { title: "Company", links: footerLinks.company },
    { title: "Solutions", links: footerLinks.solutions },
    { title: "Services", links: footerLinks.services },
    { title: "Resources", links: footerLinks.resources },
    { title: "Careers", links: footerLinks.careers },
  ];

  return (
    <footer className="safe-bottom border-t border-white/[0.12] bg-navy-elevated/80">
      <div className="container-max section-padding pb-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-1">
            <Link href="/" aria-label={`${siteConfig.name} home`}>
              <Logo size="sm" showTagline />
            </Link>
            <p className="mt-4 text-sm text-muted">{siteConfig.description.slice(0, 100)}...</p>
            <div className="mt-6 flex gap-3">
              {social.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-muted transition-colors hover:border-accent-blue/50 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold text-white">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            &copy; 2022 {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted sm:justify-end">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
