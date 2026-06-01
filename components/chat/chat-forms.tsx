"use client";

import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUiStrings } from "@/lib/chat/i18n";
import type { ChatFormType, ServicePriority, ServiceWorkflowState } from "@/lib/chat/types";
import type { UseChatReturn } from "@/hooks/use-chat";

type FormProps = {
  chat: UseChatReturn;
  formType: ChatFormType;
  onSuccess: (message: string, extras?: { quickReplies?: { id: string; label: string; payload: string }[]; workflowState?: ServiceWorkflowState; nextForm?: ChatFormType }) => void;
};

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-muted/60 focus:border-accent-blue/50 focus:outline-none focus:ring-1 focus:ring-accent-blue/50";

export function ChatInlineForm({ chat, formType, onSuccess }: FormProps) {
  const ui = getUiStrings(chat.language);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [lead, setLead] = useState({ firstName: "", lastName: "", email: "", company: "", message: "" });
  const [appointment, setAppointment] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    topic: "",
    notes: "",
  });
  const [escalation, setEscalation] = useState({
    name: "",
    email: "",
    phone: "",
    priority: "normal" as "normal" | "urgent",
    summary: "",
  });
  const [newCustomer, setNewCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    preferredContact: "email",
  });
  const [serviceRequest, setServiceRequest] = useState({
    serviceType: "",
    productName: "",
    issueCategory: "",
    description: "",
    priority: "Medium" as ServicePriority,
    preferredDate: "",
    serviceLocation: "",
  });

  const conversationSummary = chat.messages
    .slice(-12)
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoints: Record<string, string> = {
      show_lead_form: "/api/chat/lead",
      show_appointment_form: "/api/chat/appointment",
      show_escalation_form: "/api/chat/escalate",
      show_new_customer_form: "/api/chat/new-customer",
      show_service_request_form: "/api/chat/service-request",
    };

    const payloads: Record<string, object> = {
      show_lead_form: { ...lead, sessionId: chat.sessionId, language: chat.language, interest: "Chatbot inquiry" },
      show_appointment_form: { ...appointment, sessionId: chat.sessionId, language: chat.language },
      show_escalation_form: {
        ...escalation,
        sessionId: chat.sessionId,
        language: chat.language,
        conversationSummary,
      },
      show_new_customer_form: {
        ...newCustomer,
        sessionId: chat.sessionId,
        language: chat.language,
        workflowState: chat.workflowState,
      },
      show_service_request_form: {
        sessionId: chat.sessionId,
        language: chat.language,
        customer: chat.workflowState?.customer,
        service: serviceRequest,
        conversationSummary,
        workflowState: chat.workflowState,
        confirm: false,
      },
    };

    try {
      const res = await fetch(endpoints[formType], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloads[formType]),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Submission failed.");
        return;
      }

      chat.dismissForm();

      if (data.workflowState) {
        chat.setWorkflowStateFromForm(data.workflowState);
      }

      onSuccess(data.message ?? ui.submitSuccess, {
        quickReplies: data.quickReplies,
        workflowState: data.workflowState,
        nextForm: data.action?.type?.startsWith("show_") ? (data.action.type as ChatFormType) : undefined,
      });
    } catch {
      setError(ui.networkError);
    } finally {
      setLoading(false);
    }
  };

  const titles: Record<string, string> = {
    show_lead_form: ui.leadTitle,
    show_appointment_form: ui.appointmentTitle,
    show_escalation_form: ui.escalationTitle,
    show_new_customer_form: ui.newCustomerTitle,
    show_service_request_form: ui.serviceRequestTitle,
  };

  const submitLabels: Record<string, string> = {
    show_lead_form: ui.leadSubmit,
    show_appointment_form: ui.appointmentSubmit,
    show_escalation_form: ui.escalationSubmit,
    show_new_customer_form: ui.newCustomerSubmit,
    show_service_request_form: ui.serviceRequestSubmit,
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
      <p className="text-xs font-semibold text-accent-cyan">{titles[formType]}</p>

      {formType === "show_lead_form" && (
        <>
          <div className="grid grid-cols-2 gap-2">
            <input className={inputClass} placeholder={ui.firstName} value={lead.firstName} onChange={(e) => setLead({ ...lead, firstName: e.target.value })} required />
            <input className={inputClass} placeholder={ui.lastName} value={lead.lastName} onChange={(e) => setLead({ ...lead, lastName: e.target.value })} required />
          </div>
          <input className={inputClass} type="email" placeholder={ui.email} value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} required />
          <input className={inputClass} placeholder={ui.company} value={lead.company} onChange={(e) => setLead({ ...lead, company: e.target.value })} />
          <textarea className={`${inputClass} min-h-[60px] resize-none`} placeholder={ui.message} value={lead.message} onChange={(e) => setLead({ ...lead, message: e.target.value })} />
        </>
      )}

      {formType === "show_appointment_form" && (
        <>
          <input className={inputClass} placeholder={ui.name} value={appointment.name} onChange={(e) => setAppointment({ ...appointment, name: e.target.value })} required />
          <input className={inputClass} type="email" placeholder={ui.email} value={appointment.email} onChange={(e) => setAppointment({ ...appointment, email: e.target.value })} required />
          <input className={inputClass} type="tel" placeholder={ui.phone} value={appointment.phone} onChange={(e) => setAppointment({ ...appointment, phone: e.target.value })} />
          <div className="grid grid-cols-2 gap-2">
            <input className={inputClass} type="date" value={appointment.date} onChange={(e) => setAppointment({ ...appointment, date: e.target.value })} required />
            <input className={inputClass} type="time" value={appointment.time} onChange={(e) => setAppointment({ ...appointment, time: e.target.value })} required />
          </div>
          <input className={inputClass} placeholder={ui.topic} value={appointment.topic} onChange={(e) => setAppointment({ ...appointment, topic: e.target.value })} required />
          <textarea className={`${inputClass} min-h-[50px] resize-none`} placeholder={ui.notes} value={appointment.notes} onChange={(e) => setAppointment({ ...appointment, notes: e.target.value })} />
        </>
      )}

      {formType === "show_escalation_form" && (
        <>
          <input className={inputClass} placeholder={ui.name} value={escalation.name} onChange={(e) => setEscalation({ ...escalation, name: e.target.value })} required />
          <input className={inputClass} type="email" placeholder={ui.email} value={escalation.email} onChange={(e) => setEscalation({ ...escalation, email: e.target.value })} required />
          <input className={inputClass} type="tel" placeholder={ui.phone} value={escalation.phone} onChange={(e) => setEscalation({ ...escalation, phone: e.target.value })} />
          <select
            className={inputClass}
            value={escalation.priority}
            onChange={(e) => setEscalation({ ...escalation, priority: e.target.value as "normal" | "urgent" })}
          >
            <option value="normal">{ui.priorityNormal}</option>
            <option value="urgent">{ui.priorityUrgent}</option>
          </select>
          <textarea className={`${inputClass} min-h-[60px] resize-none`} placeholder={ui.summary} value={escalation.summary} onChange={(e) => setEscalation({ ...escalation, summary: e.target.value })} required />
        </>
      )}

      {formType === "show_new_customer_form" && (
        <>
          <input className={inputClass} placeholder={ui.name} value={newCustomer.fullName} onChange={(e) => setNewCustomer({ ...newCustomer, fullName: e.target.value })} required />
          <input className={inputClass} placeholder={ui.company} value={newCustomer.company} onChange={(e) => setNewCustomer({ ...newCustomer, company: e.target.value })} />
          <input className={inputClass} type="email" placeholder={ui.email} value={newCustomer.email} onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })} required />
          <input className={inputClass} type="tel" placeholder={ui.phone} value={newCustomer.phone} onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })} required />
          <input className={inputClass} placeholder={ui.location} value={newCustomer.location} onChange={(e) => setNewCustomer({ ...newCustomer, location: e.target.value })} required />
          <select
            className={inputClass}
            value={newCustomer.preferredContact}
            onChange={(e) => setNewCustomer({ ...newCustomer, preferredContact: e.target.value })}
          >
            <option value="email">{ui.contactEmail}</option>
            <option value="phone">{ui.contactPhone}</option>
            <option value="both">{ui.contactBoth}</option>
          </select>
        </>
      )}

      {formType === "show_service_request_form" && (
        <>
          <input className={inputClass} placeholder={ui.serviceType} value={serviceRequest.serviceType} onChange={(e) => setServiceRequest({ ...serviceRequest, serviceType: e.target.value })} required />
          <input className={inputClass} placeholder={ui.productName} value={serviceRequest.productName} onChange={(e) => setServiceRequest({ ...serviceRequest, productName: e.target.value })} />
          <input className={inputClass} placeholder={ui.issueCategory} value={serviceRequest.issueCategory} onChange={(e) => setServiceRequest({ ...serviceRequest, issueCategory: e.target.value })} required />
          <textarea className={`${inputClass} min-h-[60px] resize-none`} placeholder={ui.description} value={serviceRequest.description} onChange={(e) => setServiceRequest({ ...serviceRequest, description: e.target.value })} required />
          <select
            className={inputClass}
            value={serviceRequest.priority}
            onChange={(e) => setServiceRequest({ ...serviceRequest, priority: e.target.value as ServicePriority })}
          >
            <option value="Low">{ui.priorityLow}</option>
            <option value="Medium">{ui.priorityMedium}</option>
            <option value="High">{ui.priorityHigh}</option>
            <option value="Critical">{ui.priorityCritical}</option>
          </select>
          <input className={inputClass} type="date" placeholder={ui.preferredDate} value={serviceRequest.preferredDate} onChange={(e) => setServiceRequest({ ...serviceRequest, preferredDate: e.target.value })} />
          <input className={inputClass} placeholder={ui.serviceLocation} value={serviceRequest.serviceLocation} onChange={(e) => setServiceRequest({ ...serviceRequest, serviceLocation: e.target.value })} required />
        </>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </div>
      )}

      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={loading} className="flex-1">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : submitLabels[formType]}
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={chat.dismissForm}>
          {ui.close}
        </Button>
      </div>
    </form>
  );
}
