"use client";

import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUiStrings } from "@/lib/chat/i18n";
import type { ChatFormType } from "@/lib/chat/types";
import type { UseChatReturn } from "@/hooks/use-chat";

type FormProps = {
  chat: UseChatReturn;
  formType: ChatFormType;
  onSuccess: (message: string) => void;
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

  const conversationSummary = chat.messages
    .slice(-8)
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
      onSuccess(data.message ?? ui.submitSuccess);
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
  };

  const submitLabels: Record<string, string> = {
    show_lead_form: ui.leadSubmit,
    show_appointment_form: ui.appointmentSubmit,
    show_escalation_form: ui.escalationSubmit,
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
