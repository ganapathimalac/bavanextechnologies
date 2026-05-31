import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sign In",
  description: `Secure sign in to the ${siteConfig.name} enterprise portal.`,
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-premium-bg bg-premium-radial">
      {children}
    </div>
  );
}
