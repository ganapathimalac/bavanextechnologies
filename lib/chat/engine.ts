import { careers, platformFeatures, services, siteConfig } from "@/lib/data";
import { chatFaqs } from "./faqs";
import { getDefaultQuickReplies } from "./i18n";
import type { ChatHistoryItem, ChatLanguage, ChatResponse, QuickReply } from "./types";

const intentPatterns: Record<string, RegExp[]> = {
  greeting: [
    /^(hi|hello|hey|good morning|good afternoon|good evening|greetings|howdy)\b/i,
    /^(bonjour|salut|hallo|hoi|guten tag|namaste|vanakkam)\b/i,
  ],
  thanks: [/^(thanks|thank you|thx|appreciate|merci|danke|bedankt)\b/i],
  goodbye: [/^(bye|goodbye|see you|talk later|au revoir|tot ziens|tschüss)\b/i],
  contact: [
    /\b(contact|email|phone|call|address|office|location|reach|where are you)\b/i,
    /\b(coordonnées|telefoon|adres|kontakt|standort)\b/i,
  ],
  services: [
    /\b(services|offerings|what do you do|capabilities|solutions)\b/i,
    /\b(machine learning|ml|ai|data engineering|generative|automation|devops|cloud)\b/i,
  ],
  demo: [/\b(demo|trial|consultation|proposal|quote|project|partnership)\b/i],
  appointment: [/\b(appointment|schedule|book|meeting|calendar|consultation call)\b/i],
  escalation: [
    /\b(human|agent|representative|person|real person|support team|callback|escalate)\b/i,
    /\b(speak to|talk to|connect me|live agent)\b/i,
  ],
  faq: [/\b(faq|frequently asked|common questions|help topics)\b/i],
  careers: [/\b(career|job|hiring|position|vacancy|join|work at)\b/i],
  platform: [/\b(platform|features|predictive|agentic|knowledge engine)\b/i],
};

const serviceKeywords: Record<string, string[]> = {
  "ai-machine-learning": ["machine learning", "ml", "deep learning", "computer vision", "nlp", "neural"],
  "data-engineering-analytics": ["data engineering", "data lake", "analytics", "warehouse", "etl", "streaming"],
  "generative-ai": ["generative", "llm", "gpt", "rag", "chatbot", "copilot"],
  "cloud-devops": ["cloud", "devops", "kubernetes", "ci/cd", "terraform", "azure", "aws"],
  "product-engineering": ["product engineering", "full stack", "application development", "mobile app"],
  "intelligent-automation": ["automation", "rpa", "workflow", "agentic workflow", "idp"],
  "enterprise-applications": ["erp", "crm", "enterprise application", "sap", "salesforce"],
  "digital-transformation": ["digital transformation", "modernization", "transformation"],
};

function normalize(text: string) {
  return text.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

function matchesAny(text: string, patterns: RegExp[]) {
  return patterns.some((p) => p.test(text));
}

function scoreFaq(text: string) {
  let best: { id: string; score: number } | null = null;
  for (const faq of chatFaqs) {
    let score = 0;
    for (const kw of faq.keywords) {
      if (text.includes(kw)) score += kw.split(" ").length + 2;
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { id: faq.id, score };
    }
  }
  return best;
}

function findService(text: string) {
  let best: (typeof services)[0] | null = null;
  let bestScore = 0;
  for (const service of services) {
    let score = 0;
    const keywords = serviceKeywords[service.slug] ?? [];
    if (text.includes(service.slug.replace(/-/g, " "))) score += 5;
    for (const kw of keywords) {
      if (text.includes(kw)) score += kw.split(" ").length;
    }
    if (text.includes(service.title.toLowerCase())) score += 4;
    if (score > bestScore) {
      bestScore = score;
      best = service;
    }
  }
  return bestScore >= 2 ? best : null;
}

function contactMessage(lang: ChatLanguage): string {
  const offices = siteConfig.offices
    .map((o) => `• **${o.city}:** ${o.address}`)
    .join("\n");
  const templates: Record<ChatLanguage, string> = {
    en: `Here's how to reach **${siteConfig.name}**:\n\n📧 **Email:** ${siteConfig.email}\n📞 **Phone:** ${siteConfig.phone}\n\n**Offices:**\n${offices}\n\nYou can also use our contact form on the homepage.`,
    fr: `Contactez **${siteConfig.name}** :\n\n📧 ${siteConfig.email}\n📞 ${siteConfig.phone}\n\n**Bureaux :**\n${offices}`,
    nl: `Neem contact op met **${siteConfig.name}**:\n\n📧 ${siteConfig.email}\n📞 ${siteConfig.phone}\n\n**Kantoren:**\n${offices}`,
    de: `Kontakt zu **${siteConfig.name}**:\n\n📧 ${siteConfig.email}\n📞 ${siteConfig.phone}\n\n**Standorte:**\n${offices}`,
    ta: `**${siteConfig.name}** contact:\n\n📧 ${siteConfig.email}\n📞 ${siteConfig.phone}\n\n**Offices:**\n${offices}`,
    hi: `**${siteConfig.name}** contact:\n\n📧 ${siteConfig.email}\n📞 ${siteConfig.phone}\n\n**Offices:**\n${offices}`,
  };
  return templates[lang] ?? templates.en;
}

function servicesOverview(lang: ChatLanguage): string {
  const list = services.map((s) => `• **${s.title}** — ${s.description}`).join("\n");
  const intro: Record<ChatLanguage, string> = {
    en: "We offer eight core enterprise AI & technology services:\n\n",
    fr: "Nous proposons huit services enterprise IA & technologie :\n\n",
    nl: "Wij bieden acht enterprise AI & technology diensten:\n\n",
    de: "Wir bieten acht Enterprise-KI- und Technologie-Services:\n\n",
    ta: "Our core services:\n\n",
    hi: "Our core services:\n\n",
  };
  return (intro[lang] ?? intro.en) + list + "\n\nAsk about any service for more details, or visit /services.";
}

function greetingMessage(lang: ChatLanguage): string {
  const msgs: Record<ChatLanguage, string> = {
    en: "Hello! 👋 Great to meet you. I'm here 24/7 to help with services, support, scheduling, and more. What would you like to explore?",
    fr: "Bonjour ! 👋 Ravi de vous aider 24h/24. Services, support, rendez-vous — que souhaitez-vous savoir ?",
    nl: "Hallo! 👋 Fijn dat u er bent. Ik help u 24/7 met diensten, support en afspraken. Waarmee kan ik helpen?",
    de: "Hallo! 👋 Schön, Sie kennenzulernen. Ich helfe Ihnen rund um die Uhr. Wobei kann ich helfen?",
    ta: "Hello! 👋 How can I help you today?",
    hi: "Hello! 👋 How can I help you today?",
  };
  return msgs[lang] ?? msgs.en;
}

function faqListMessage(lang: ChatLanguage): string {
  const titles = chatFaqs.map((f) => `• ${f.answers[lang]?.split(".")[0] ?? f.answers.en.split(".")[0]}.`).join("\n");
  return `Here are topics I can help with:\n\n${titles}\n\nAsk me anything, or pick a quick reply below.`;
}

export function processChatMessage(
  message: string,
  language: ChatLanguage = "en",
  _history: ChatHistoryItem[] = []
): ChatResponse {
  const text = normalize(message);
  const quickReplies = getDefaultQuickReplies(language);

  if (!text) {
    return { message: greetingMessage(language), quickReplies, intent: "greeting" };
  }

  if (matchesAny(text, intentPatterns.greeting)) {
    return { message: greetingMessage(language), quickReplies, intent: "greeting" };
  }

  if (matchesAny(text, intentPatterns.thanks)) {
    return {
      message: "You're welcome! Is there anything else I can help you with today?",
      quickReplies,
      intent: "thanks",
    };
  }

  if (matchesAny(text, intentPatterns.goodbye)) {
    return {
      message: "Thank you for chatting with Bavanex! Feel free to return anytime — we're here 24/7. Have a great day! 👋",
      intent: "goodbye",
    };
  }

  if (matchesAny(text, intentPatterns.escalation)) {
    return {
      message:
        "I'll connect you with a human support representative. Please share your details below and a team member will reach out promptly — typically within a few hours for urgent requests.",
      action: { type: "show_escalation_form" },
      quickReplies: [{ id: "contact", label: "Contact Info", payload: "What are your contact details?" }],
      intent: "escalation",
    };
  }

  if (matchesAny(text, intentPatterns.appointment)) {
    return {
      message:
        "I'd be happy to help schedule a consultation with our team. Please fill in your preferred date and time below.",
      action: { type: "show_appointment_form" },
      intent: "appointment",
    };
  }

  if (matchesAny(text, intentPatterns.demo)) {
    return {
      message:
        "Excellent! Let's get you connected with our solutions team. Share a few details and we'll prepare a tailored demo for your needs.",
      action: { type: "show_lead_form" },
      quickReplies: [
        { id: "services", label: "View Services", payload: "Tell me about your services" },
        { id: "contact", label: "Contact Info", payload: "What are your contact details?" },
      ],
      intent: "lead",
    };
  }

  if (matchesAny(text, intentPatterns.contact)) {
    return {
      message: contactMessage(language),
      quickReplies,
      action: { type: "link", href: "/#contact", label: "Open contact form" },
      intent: "contact",
    };
  }

  if (matchesAny(text, intentPatterns.careers)) {
    const positions = careers.positions.map((p) => `• **${p.title}** — ${p.location} (${p.type})`).join("\n");
    return {
      message: `We're growing our team! Open positions:\n\n${positions}\n\nVisit the Careers section on our homepage or share your interest and we'll follow up.`,
      quickReplies: [{ id: "lead", label: "Share Interest", payload: "I am interested in career opportunities" }],
      intent: "careers",
    };
  }

  if (matchesAny(text, intentPatterns.faq)) {
    return { message: faqListMessage(language), quickReplies, intent: "faq" };
  }

  if (matchesAny(text, intentPatterns.platform)) {
    const features = platformFeatures.map((f) => `• **${f.title}** — ${f.description}`).join("\n");
    return {
      message: `Our AI platform capabilities:\n\n${features}`,
      quickReplies,
      intent: "platform",
    };
  }

  const faqMatch = scoreFaq(text);
  if (faqMatch && faqMatch.score >= 3) {
    const faq = chatFaqs.find((f) => f.id === faqMatch.id)!;
    return {
      message: faq.answers[language] ?? faq.answers.en,
      quickReplies,
      intent: "faq",
    };
  }

  const service = findService(text);
  if (service || matchesAny(text, intentPatterns.services)) {
    if (service) {
      const caps = service.capabilities.slice(0, 4).map((c) => `• ${c}`).join("\n");
      return {
        message: `**${service.title}**\n\n${service.overview}\n\n**Key capabilities:**\n${caps}\n\nLearn more: /services/${service.slug}`,
        quickReplies: [
          { id: "demo", label: "Request Demo", payload: "I would like to request a demo" },
          { id: "all-services", label: "All Services", payload: "Tell me about your services" },
        ],
        action: { type: "link", href: `/services/${service.slug}`, label: service.title },
        intent: "service_detail",
      };
    }
    return { message: servicesOverview(language), quickReplies, intent: "services" };
  }

  // Contextual follow-up from history
  const lastAssistant = [..._history].reverse().find((h) => h.role === "assistant");
  if (lastAssistant?.content.includes("pricing") && text.length > 3) {
    return {
      message: "I'd love to help with pricing. Share your project details below and our team will prepare a custom proposal.",
      action: { type: "show_lead_form" },
      intent: "lead",
    };
  }

  return {
    message:
      "I want to make sure I help you correctly. You can ask about our **services**, **contact info**, **careers**, **appointments**, or request to **speak with a human agent**. What would you like to know?",
    quickReplies,
    intent: "fallback",
  };
}

export function buildFileAcknowledgment(fileName: string, language: ChatLanguage): ChatResponse {
  const msgs: Record<ChatLanguage, string> = {
    en: `Thanks for sharing **${fileName}**. Our team will review it. In the meantime, tell me how I can assist you.`,
    fr: `Merci pour **${fileName}**. Notre équipe l'examinera. Comment puis-je vous aider ?`,
    nl: `Bedankt voor **${fileName}**. Ons team bekijkt het. Hoe kan ik verder helpen?`,
    de: `Danke für **${fileName}**. Unser Team wird es prüfen. Wie kann ich weiterhelfen?`,
    ta: `Thanks for **${fileName}**. How else can I help?`,
    hi: `Thanks for **${fileName}**. How else can I help?`,
  };
  return {
    message: msgs[language] ?? msgs.en,
    quickReplies: getDefaultQuickReplies(language),
    intent: "file_received",
  };
}

export function sanitizeHistory(history: unknown, maxItems = 12): ChatHistoryItem[] {
  if (!Array.isArray(history)) return [];
  return history
    .filter(
      (item): item is ChatHistoryItem =>
        typeof item === "object" &&
        item !== null &&
        "role" in item &&
        "content" in item &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string"
    )
    .slice(-maxItems);
}

export function createQuickReplies(replies: QuickReply[]): QuickReply[] {
  return replies.slice(0, 6);
}
