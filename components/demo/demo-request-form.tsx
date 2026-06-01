"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Calendar, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { demoPageContent } from "@/lib/demo-page";
import { cn } from "@/lib/utils";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  companySize: string;
  serviceInterest: string;
  preferredDate: string;
  preferredTime: string;
  projectRequirements: string;
  gdprConsent: boolean;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  jobTitle: "",
  companySize: "",
  serviceInterest: "",
  preferredDate: "",
  preferredTime: "",
  projectRequirements: "",
  gdprConsent: false,
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-muted/60 transition-colors focus:border-accent-blue/50 focus:outline-none focus:ring-1 focus:ring-accent-blue/50";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateField(name: keyof FormState, value: string | boolean): string | null {
  switch (name) {
    case "fullName":
      return !String(value).trim() ? "Full name is required." : null;
    case "email":
      if (!String(value).trim()) return "Business email is required.";
      return isValidEmail(String(value)) ? null : "Enter a valid email address.";
    case "phone": {
      const digits = String(value).replace(/\D/g, "");
      if (!digits) return "Phone number is required.";
      return digits.length >= 8 && digits.length <= 15 ? null : "Enter a valid phone number.";
    }
    case "company":
      return !String(value).trim() ? "Company name is required." : null;
    case "jobTitle":
      return !String(value).trim() ? "Job title is required." : null;
    case "companySize":
      return !String(value).trim() ? "Select company size." : null;
    case "serviceInterest":
      return !String(value).trim() ? "Select a service interest." : null;
    case "preferredDate":
      return !String(value).trim() ? "Preferred date is required." : null;
    case "preferredTime":
      return !String(value).trim() ? "Preferred time is required." : null;
    case "projectRequirements":
      if (String(value).trim().length > 0 && String(value).trim().length < 10) {
        return "Please provide at least 10 characters.";
      }
      return null;
    case "gdprConsent":
      return value ? null : "You must accept the privacy policy.";
    default:
      return null;
  }
}

export function DemoRequestForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateField = (name: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err ?? undefined }));
    }
    if (submitError) setSubmitError(null);
  };

  const handleBlur = (name: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, form[name]);
    setErrors((prev) => ({ ...prev, [name]: err ?? undefined }));
  };

  const validateAll = () => {
    const next: FieldErrors = {};
    (Object.keys(form) as (keyof FormState)[]).forEach((key) => {
      const err = validateField(key, form[key]);
      if (err) next[key] = err;
    });
    setErrors(next);
    setTouched(Object.fromEntries(Object.keys(form).map((k) => [k, true])) as Partial<Record<keyof FormState, boolean>>);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setLoading(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? "Submission failed.");
        return;
      }
      router.push("/thank-you?type=demo");
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const field = (name: keyof FormState, label: string, node: React.ReactNode) => (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-white/90">
        {label}
      </label>
      {node}
      {errors[name] && touched[name] && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-300" role="alert">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8" noValidate aria-label="Request a demo form">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-blue/20 text-accent-cyan">
          <Calendar className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-white sm:text-2xl">Schedule Your Demo</h2>
          <p className="text-sm text-muted">Complete the form and our team will reach out shortly.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {field("fullName", "Full Name *", (
          <input
            id="fullName"
            name="fullName"
            className={cn(inputClass, errors.fullName && touched.fullName && "border-red-500/50")}
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName")}
            autoComplete="name"
            required
          />
        ))}
        {field("email", "Business Email *", (
          <input
            id="email"
            name="email"
            type="email"
            className={cn(inputClass, errors.email && touched.email && "border-red-500/50")}
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            autoComplete="email"
            required
          />
        ))}
        {field("phone", "Phone Number *", (
          <input
            id="phone"
            name="phone"
            type="tel"
            className={cn(inputClass, errors.phone && touched.phone && "border-red-500/50")}
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            autoComplete="tel"
            required
          />
        ))}
        {field("company", "Company Name *", (
          <input
            id="company"
            name="company"
            className={cn(inputClass, errors.company && touched.company && "border-red-500/50")}
            value={form.company}
            onChange={(e) => updateField("company", e.target.value)}
            onBlur={() => handleBlur("company")}
            autoComplete="organization"
            required
          />
        ))}
        {field("jobTitle", "Job Title *", (
          <input
            id="jobTitle"
            name="jobTitle"
            className={cn(inputClass, errors.jobTitle && touched.jobTitle && "border-red-500/50")}
            value={form.jobTitle}
            onChange={(e) => updateField("jobTitle", e.target.value)}
            onBlur={() => handleBlur("jobTitle")}
            autoComplete="organization-title"
            required
          />
        ))}
        {field("companySize", "Company Size *", (
          <select
            id="companySize"
            name="companySize"
            className={cn(inputClass, errors.companySize && touched.companySize && "border-red-500/50")}
            value={form.companySize}
            onChange={(e) => updateField("companySize", e.target.value)}
            onBlur={() => handleBlur("companySize")}
            required
          >
            <option value="">Select size</option>
            {demoPageContent.companySizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        ))}
        <div className="sm:col-span-2">
          {field("serviceInterest", "Service / Product Interest *", (
            <select
              id="serviceInterest"
              name="serviceInterest"
              className={cn(inputClass, errors.serviceInterest && touched.serviceInterest && "border-red-500/50")}
              value={form.serviceInterest}
              onChange={(e) => updateField("serviceInterest", e.target.value)}
              onBlur={() => handleBlur("serviceInterest")}
              required
            >
              <option value="">Select a service</option>
              {demoPageContent.serviceInterests.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          ))}
        </div>
        {field("preferredDate", "Preferred Demo Date *", (
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            className={cn(inputClass, errors.preferredDate && touched.preferredDate && "border-red-500/50")}
            value={form.preferredDate}
            onChange={(e) => updateField("preferredDate", e.target.value)}
            onBlur={() => handleBlur("preferredDate")}
            min={new Date().toISOString().split("T")[0]}
            required
          />
        ))}
        {field("preferredTime", "Preferred Demo Time *", (
          <input
            id="preferredTime"
            name="preferredTime"
            type="time"
            className={cn(inputClass, errors.preferredTime && touched.preferredTime && "border-red-500/50")}
            value={form.preferredTime}
            onChange={(e) => updateField("preferredTime", e.target.value)}
            onBlur={() => handleBlur("preferredTime")}
            required
          />
        ))}
        <div className="sm:col-span-2">
          {field("projectRequirements", "Project Requirements", (
            <textarea
              id="projectRequirements"
              name="projectRequirements"
              rows={4}
              className={cn(inputClass, "min-h-[100px] resize-none", errors.projectRequirements && touched.projectRequirements && "border-red-500/50")}
              placeholder="Tell us about your goals, timeline, and technical environment..."
              value={form.projectRequirements}
              onChange={(e) => updateField("projectRequirements", e.target.value)}
              onBlur={() => handleBlur("projectRequirements")}
            />
          ))}
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          checked={form.gdprConsent}
          onChange={(e) => updateField("gdprConsent", e.target.checked)}
          onBlur={() => handleBlur("gdprConsent")}
          className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 accent-accent-blue"
          required
        />
        <span>
          I agree to the processing of my data in accordance with the{" "}
          <a href="/privacy" className="text-accent-cyan hover:text-white">
            Privacy Policy
          </a>
          . Bavanex will use this information to schedule and conduct the demo.
        </span>
      </label>
      {errors.gdprConsent && touched.gdprConsent && (
        <p className="mt-2 flex items-center gap-1 text-xs text-red-300" role="alert">
          <AlertCircle className="h-3.5 w-3.5" />
          {errors.gdprConsent}
        </p>
      )}

      {submitError && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300" role="alert">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {submitError}
        </div>
      )}

      <Button type="submit" size="lg" className="mt-6 w-full min-h-[52px] sm:w-auto" disabled={loading}>
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Schedule My Demo"}
      </Button>

      <p className="mt-4 flex items-center gap-2 text-xs text-muted">
        <Shield className="h-3.5 w-3.5 text-accent-cyan" />
        Your information is encrypted and never shared with third parties.
      </p>
    </form>
  );
}
