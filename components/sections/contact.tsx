"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, MapPin, Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/fade-in";
import { siteConfig } from "@/lib/data";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
};

const initialForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  message: "",
};

const chennaiOffice =
  siteConfig.offices.find((office) => office.city === "Chennai") ??
  siteConfig.offices[siteConfig.offices.length - 1];

export function ContactSection() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      router.push("/thank-you?type=contact");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding surface-section">
      <div className="container-max">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Contact</span>
          <h2 className="section-title">Let&apos;s Transform Your Business</h2>
          <p className="section-lead">
            Ready to harness the power of AI? Get in touch with our team of experts.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-start">
          <FadeIn direction="left" className="lg:sticky lg:top-28 lg:self-start">
            <Card className="h-full">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {error && (
                      <div
                        role="alert"
                        className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200"
                      >
                        <AlertCircle size={18} className="mt-0.5 shrink-0" />
                        {error}
                      </div>
                    )}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="mb-1.5 block text-sm text-muted">
                          First Name
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-accent-blue/50 focus:outline-none focus:ring-1 focus:ring-accent-blue/50"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="mb-1.5 block text-sm text-muted">
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-accent-blue/50 focus:outline-none focus:ring-1 focus:ring-accent-blue/50"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm text-muted">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-accent-blue/50 focus:outline-none focus:ring-1 focus:ring-accent-blue/50"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="mb-1.5 block text-sm text-muted">
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-accent-blue/50 focus:outline-none focus:ring-1 focus:ring-accent-blue/50"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-sm text-muted">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        required
                        minLength={10}
                        className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-accent-blue/50 focus:outline-none focus:ring-1 focus:ring-accent-blue/50"
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg" disabled={loading}>
                      {loading ? "Sending..." : "Send Message"} {!loading && <Send size={16} />}
                    </Button>
                  </form>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-blue/20 text-accent-blue">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="font-medium text-white">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-muted hover:text-accent-cyan transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-cyan/20 text-accent-cyan">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="font-medium text-white">Phone</p>
                  <a href={`tel:${siteConfig.phone}`} className="text-muted hover:text-accent-cyan transition-colors">
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              <div>
                <p className="mb-4 font-medium text-white">Office Locations</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {siteConfig.offices.map((office) => (
                    <div key={office.city} className="flex items-start gap-3 rounded-lg border border-white/10 p-4">
                      <MapPin size={16} className="mt-0.5 shrink-0 text-accent-purple" />
                      <div className="min-w-0">
                        <p className="font-medium text-white">{office.city}</p>
                        <p className="text-sm leading-snug text-muted">{office.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 sm:col-span-2">
                <iframe
                  title="Bavanex Technologies Office Location"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(chennaiOffice.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  className="aspect-[16/10] h-56 w-full grayscale invert opacity-80 sm:h-64"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
