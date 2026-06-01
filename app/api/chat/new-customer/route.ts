import { NextResponse } from "next/server";
import { registerNewCustomer } from "@/lib/chat/service-flow";
import {
  syncNewCustomerRegistration,
  validateEmail,
  validatePhone,
  validateRequired,
} from "@/lib/chat/integrations";
import type { ChatLanguage, NewCustomerPayload, ServiceWorkflowState } from "@/lib/chat/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<NewCustomerPayload> & {
      workflowState?: ServiceWorkflowState;
    };
    const sessionId = body.sessionId?.trim() || crypto.randomUUID();
    const fullName = body.fullName?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();
    const company = body.company?.trim() ?? "";
    const location = body.location?.trim();
    const preferredContact = body.preferredContact?.trim() ?? "email";
    const language = (body.language ?? "en") as ChatLanguage;

    const errors = [
      validateRequired(fullName, "Full name"),
      validateEmail(email),
      validatePhone(phone),
      validateRequired(location, "Location"),
    ].filter(Boolean);

    if (errors.length) {
      return NextResponse.json({ error: errors[0] }, { status: 400 });
    }

    const customer = registerNewCustomer({
      fullName: fullName!,
      email: email!,
      phone: phone!,
      company,
      location: location!,
      preferredContact,
    });

    await syncNewCustomerRegistration(
      {
        customerRef: customer.id,
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        company: customer.company,
        location: customer.location,
        preferredContact,
        language,
      },
      sessionId
    );

    const workflowState: ServiceWorkflowState = {
      ...(body.workflowState ?? { step: "service_collect", validationAttempts: 0 }),
      step: "service_collect",
      customerType: "new",
      customer,
    };

    return NextResponse.json({
      success: true,
      message: `Thank you, **${customer.fullName}**! Your customer profile has been created.\n\n**Customer Reference Number:** ${customer.id}\n\nPlease describe your service request below.`,
      customerRef: customer.id,
      workflowState,
      action: { type: "show_service_request_form" },
    });
  } catch {
    return NextResponse.json({ error: "Unable to register your profile." }, { status: 500 });
  }
}
