"use client";

import { useState } from "react";
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

export function ContactSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
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

      setSubmitted(true);
      setForm(initialForm);
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
          <span className="text-sm font-semibold uppercase tracking-widest text-accent-blue">
            Contact
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Let&apos;s Transform Your Business
          </h2>
          <p className="mt-4 text-muted">
            Ready to harness the power of AI? Get in touch with our team of experts.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <FadeIn direction="left">
            <Card>
              <CardContent className="p-8">
                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-blue/20 text-accent-blue">
                      <Send size={28} />
                    </div>
                    <h3 className="text-xl font-semibold">Thank you!</h3>
                    <p className="mt-2 text-muted">We&apos;ll be in touch within 24 hours.</p>
                    <Button
                      variant="secondary"
                      className="mt-6"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
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
                )}
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
                <div className="space-y-4">
                  {siteConfig.offices.map((office) => (
                    <div key={office.city} className="flex items-start gap-3 rounded-lg border border-white/10 p-4">
                      <MapPin size={16} className="mt-0.5 shrink-0 text-accent-purple" />
                      <div>
                        <p className="font-medium text-white">{office.city}</p>
                        <p className="text-sm text-muted">{office.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10">
                <iframe
                  title="Bavanex Technologies Office Location"
                  src="https://maps.google.com/maps?q=San+Francisco+CA&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="h-64 w-full grayscale invert opacity-80"
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
