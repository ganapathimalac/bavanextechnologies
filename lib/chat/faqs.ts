import type { ChatLanguage } from "./types";

export type FaqEntry = {
  id: string;
  keywords: string[];
  answers: Record<ChatLanguage, string>;
};

export const chatFaqs: FaqEntry[] = [
  {
    id: "what-is-bavanex",
    keywords: ["what is bavanex", "who are you", "about company", "about bavanex"],
    answers: {
      en: "Bavanex Technologies is a technology-driven software company specializing in custom software development, cloud solutions, AI-powered applications, and digital transformation services.",
      fr: "Bavanex Technologies est une entreprise d'intelligence d'entreprise alimentée par l'IA. Nous aidons les organisations à créer, automatiser et développer des solutions grâce à l'IA, au Machine Learning et à l'automatisation intelligente.",
      nl: "Bavanex Technologies is een AI-gedreven enterprise intelligence bedrijf. Wij helpen organisaties oplossingen bouwen, automatiseren en schalen met AI, Machine Learning en intelligente automatisering.",
      de: "Bavanex Technologies ist ein KI-gestütztes Enterprise-Intelligence-Unternehmen. Wir helfen Organisationen, Lösungen mit KI, Machine Learning und intelligenter Automatisierung zu entwickeln und zu skalieren.",
      ta: "Bavanex Technologies என்பது AI-இயங்கும் enterprise intelligence நிறுவனம். AI, Machine Learning, Data Engineering மூலம் வணிகத் தீர்வுகளை உருவாக்க உதவுகிறோம்.",
      hi: "Bavanex Technologies एक AI-संचालित enterprise intelligence कंपनी है। हम AI, Machine Learning और Intelligent Automation के साथ व्यवसाय समाधान बनाने में मदद करते हैं।",
    },
  },
  {
    id: "response-time",
    keywords: ["response time", "how fast", "how long", "wait time", "reply time"],
    answers: {
      en: "I'm available 24/7 for instant answers. For custom proposals or complex inquiries, our team typically responds within 24 business hours.",
      fr: "Je suis disponible 24h/24 et 7j/7 pour des réponses instantanées. Pour les propositions personnalisées, notre équipe répond généralement sous 24 heures ouvrables.",
      nl: "Ik ben 24/7 beschikbaar voor directe antwoorden. Voor maatwerk voorstellen reageert ons team meestal binnen 24 werkuren.",
      de: "Ich bin rund um die Uhr für sofortige Antworten verfügbar. Für individuelle Angebote antwortet unser Team in der Regel innerhalb von 24 Geschäftsstunden.",
      ta: "நான் 24/7 உடனடி பதில்களுக்கு கிடைக்கிறேன். தனிப்பயன் விசாரணைகளுக்கு எங்கள் குழு பொதுவாக 24 மணி நேரத்தில் பதிலளிக்கும்.",
      hi: "मैं 24/7 तत्काल उत्तरों के लिए उपलब्ध हूँ। कस्टम पूछताछ के लिए हमारी टीम आ usually 24 घंटे में जवाब देती है।",
    },
  },
  {
    id: "industries",
    keywords: ["industries", "sectors", "which industry", "healthcare", "banking", "retail"],
    answers: {
      en: "We serve Healthcare, Pharma, Banking, Insurance, Retail, Manufacturing, Logistics, Telecom, and more. Visit our Industries section or ask about a specific sector.",
      fr: "Nous servons la santé, la pharma, la banque, l'assurance, le retail, la manufacturing, la logistique, les télécoms et plus encore.",
      nl: "Wij bedienen healthcare, pharma, banking, insurance, retail, manufacturing, logistics, telecom en meer.",
      de: "Wir bedienen Healthcare, Pharma, Banking, Insurance, Retail, Manufacturing, Logistics, Telecom und mehr.",
      ta: "Healthcare, Pharma, Banking, Insurance, Retail, Manufacturing, Logistics, Telecom உள்ளிட்ட துறைகளில் நாங்கள் சேவை செய்கிறோம்.",
      hi: "हम Healthcare, Pharma, Banking, Insurance, Retail, Manufacturing, Logistics, Telecom और अन्य क्षेत्रों में सेवा देते हैं।",
    },
  },
  {
    id: "pricing",
    keywords: ["pricing", "cost", "price", "how much", "budget", "quote"],
    answers: {
      en: "Pricing depends on scope, timeline, and technology stack. I can connect you with our team for a tailored proposal — would you like to share your project details?",
      fr: "Les tarifs dépendent de la portée et du calendrier. Je peux vous mettre en relation avec notre équipe pour une proposition sur mesure.",
      nl: "Prijzen hangen af van scope en planning. Ik kan u doorverbinden met ons team voor een voorstel op maat.",
      de: "Die Preise hängen von Umfang und Zeitplan ab. Ich kann Sie mit unserem Team für ein individuelles Angebot verbinden.",
      ta: "விலை நீங்கள் தேர்ந்தெடுக்கும் scope மற்றும் timeline-ஐப் பொறுத்தது. தனிப்பயன் proposal-க்கு உங்கள் விவரங்களைப் பகிரலாம்.",
      hi: "मूल्य scope और timeline पर निर्भर करता है। कस्टम proposal के लिए मैं आपको हमारी टीम से जोड़ सकता हूँ।",
    },
  },
  {
    id: "security",
    keywords: ["security", "privacy", "gdpr", "data protection", "secure", "compliance"],
    answers: {
      en: "We follow enterprise-grade security practices including encryption, role-based access, audit trails, and GDPR-aligned data handling. Sensitive data shared in chat is processed securely and never sold to third parties.",
      fr: "Nous appliquons des pratiques de sécurité de niveau entreprise, y compris le chiffrement et la conformité RGPD.",
      nl: "Wij volgen enterprise-grade beveiliging, encryptie en GDPR-conforme gegevensverwerking.",
      de: "Wir folgen Enterprise-Sicherheitsstandards inklusive Verschlüsselung und DSGVO-konformer Datenverarbeitung.",
      ta: "Encryption, access control மற்றும் GDPR-இணக்க data handling உள்ள enterprise-grade security நாங்கள் பின்பற்றுகிறோம்.",
      hi: "हम encryption, access control और GDPR-aligned data handling सहित enterprise-grade security अपनाते हैं।",
    },
  },
  {
    id: "careers",
    keywords: ["jobs", "careers", "hiring", "open positions", "work with you", "join"],
    answers: {
      en: "We're hiring! Current openings include Senior ML Engineer, Data Platform Architect, AI Product Manager, and DevOps Engineer. Roles are based in Chennai/Hybrid or Remote. Visit the Careers section on our homepage.",
      fr: "Nous recrutons ! Postes ouverts : Senior ML Engineer, Data Platform Architect, AI Product Manager, DevOps Engineer.",
      nl: "We werven! Open posities: Senior ML Engineer, Data Platform Architect, AI Product Manager, DevOps Engineer.",
      de: "Wir stellen ein! Offene Stellen: Senior ML Engineer, Data Platform Architect, AI Product Manager, DevOps Engineer.",
      ta: "நாங்கள் ஆட்சேர்க்கை செய்கிறோம்! Senior ML Engineer, Data Platform Architect, AI Product Manager, DevOps Engineer பதவிகள் உள்ளன.",
      hi: "हम hiring कर रहे हैं! Senior ML Engineer, Data Platform Architect, AI Product Manager, DevOps Engineer positions उपलब्ध हैं।",
    },
  },
];
