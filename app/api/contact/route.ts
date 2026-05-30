import { NextResponse } from "next/server";

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  message: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;
    const firstName = body.firstName?.trim();
    const lastName = body.lastName?.trim();
    const email = body.email?.trim();
    const company = body.company?.trim() ?? "";
    const message = body.message?.trim();

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "First name, last name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters." },
        { status: 400 }
      );
    }

    const submission = {
      id: crypto.randomUUID(),
      firstName,
      lastName,
      email,
      company,
      message,
      submittedAt: new Date().toISOString(),
    };

    // Log for development; replace with Resend/SendGrid/CRM integration in production
    console.info("[Contact Form]", JSON.stringify(submission));

    return NextResponse.json({
      success: true,
      message: "Thank you! Our team will respond within 24 hours.",
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to process your request. Please try again." },
      { status: 500 }
    );
  }
}
