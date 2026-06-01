import { NextResponse } from "next/server";
import { notifySupportEmail, validateEmail, validatePhone, validateRequired } from "@/lib/chat/integrations";

type DemoPayload = {
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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<DemoPayload>;

    const fullName = body.fullName?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();
    const company = body.company?.trim();
    const jobTitle = body.jobTitle?.trim();
    const companySize = body.companySize?.trim();
    const serviceInterest = body.serviceInterest?.trim();
    const preferredDate = body.preferredDate?.trim();
    const preferredTime = body.preferredTime?.trim();
    const projectRequirements = body.projectRequirements?.trim() ?? "";

    const errors = [
      validateRequired(fullName, "Full name"),
      validateEmail(email),
      validatePhone(phone),
      validateRequired(company, "Company name"),
      validateRequired(jobTitle, "Job title"),
      validateRequired(companySize, "Company size"),
      validateRequired(serviceInterest, "Service interest"),
      validateRequired(preferredDate, "Preferred demo date"),
      validateRequired(preferredTime, "Preferred demo time"),
      !body.gdprConsent ? "You must accept the privacy policy to continue." : null,
    ].filter(Boolean);

    if (errors.length) {
      return NextResponse.json({ error: errors[0] }, { status: 400 });
    }

    if (projectRequirements.length > 0 && projectRequirements.length < 10) {
      return NextResponse.json(
        { error: "Project requirements must be at least 10 characters if provided." },
        { status: 400 }
      );
    }

    const submission = {
      type: "demo_request",
      fullName: fullName!,
      email: email!,
      phone: phone!,
      company: company!,
      jobTitle: jobTitle!,
      companySize: companySize!,
      serviceInterest: serviceInterest!,
      preferredDate: preferredDate!,
      preferredTime: preferredTime!,
      projectRequirements,
      submittedAt: new Date().toISOString(),
    };

    await notifySupportEmail("New demo request", submission);

    return NextResponse.json({
      success: true,
      message:
        "Thank you! Your demo request has been received. Our team will confirm your session within one business day.",
    });
  } catch {
    return NextResponse.json({ error: "Unable to submit your demo request. Please try again." }, { status: 500 });
  }
}
