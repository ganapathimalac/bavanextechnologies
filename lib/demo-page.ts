import { services, testimonials, technologyPartners } from "./data";

export const demoPageContent = {
  hero: {
    eyebrow: "Request a Demo",
    title: "Experience the Future of Digital Transformation",
    description:
      "See how Bavanex Technologies delivers enterprise AI, cloud, and custom software solutions tailored to your business. Schedule a personalized demo with our experts and discover measurable ROI for your organization.",
    cta: "Request a Free Demo",
    image: "/images/blog-agentic.svg",
    imageAlt: "Bavanex enterprise software dashboard preview",
  },
  whyBook: [
    {
      title: "Personalized Consultation",
      description: "A dedicated solutions architect assesses your goals, stack, and roadmap before the session.",
    },
    {
      title: "Live Product Walkthrough",
      description: "See our platform capabilities in action with scenarios mapped to your industry and use cases.",
    },
    {
      title: "Industry-Specific Solutions",
      description: "Explore accelerators and reference architectures proven in your sector.",
    },
    {
      title: "ROI Assessment",
      description: "Receive a high-level business case with projected efficiency gains and cost savings.",
    },
    {
      title: "Security & Compliance Review",
      description: "Understand our enterprise security posture, data governance, and compliance frameworks.",
    },
    {
      title: "Expert Q&A Session",
      description: "Direct access to senior engineers and delivery leaders for technical and strategic questions.",
    },
  ],
  showcase: {
    title: "Enterprise Platform in Action",
    description: "Unified AI, data, and application capabilities designed for mission-critical workloads.",
    metrics: [
      { label: "Faster deployment", value: "3x" },
      { label: "Model accuracy uplift", value: "+28%" },
      { label: "Ops cost reduction", value: "40%" },
    ],
    features: [
      "Real-time analytics dashboards",
      "AI agent orchestration layer",
      "Secure multi-cloud deployment",
      "Enterprise integration hub",
    ],
    image: "/images/case-banking.svg",
    videoLabel: "Watch 2-min platform overview",
  },
  stats: [
    { value: 100, suffix: "+", label: "Enterprise Clients" },
    { value: 50, suffix: "+", label: "Countries Served" },
    { value: 99.9, suffix: "%", label: "System Uptime", decimals: 1 },
    { value: 10, suffix: "+", label: "Years of Experience" },
  ],
  industries: [
    { name: "Healthcare", icon: "HeartPulse" },
    { name: "Finance", icon: "Landmark" },
    { name: "Manufacturing", icon: "Factory" },
    { name: "Retail", icon: "ShoppingBag" },
    { name: "Education", icon: "GraduationCap" },
    { name: "Logistics", icon: "Truck" },
  ],
  faqs: [
    {
      question: "How long does a demo session typically last?",
      answer:
        "Most sessions run 45–60 minutes, including discovery, live walkthrough, and Q&A. Extended technical deep-dives can be scheduled on request.",
    },
    {
      question: "Who should attend from our organization?",
      answer:
        "We recommend including stakeholders from IT, business operations, and leadership. Technical teams are welcome for architecture and integration discussions.",
    },
    {
      question: "Is the demo tailored to our industry?",
      answer:
        "Yes. We prepare industry-specific scenarios, sample data flows, and relevant case studies before your session.",
    },
    {
      question: "What happens after the demo?",
      answer:
        "You receive a summary with recommended next steps, a high-level ROI outline, and optional proof-of-concept proposal within 2 business days.",
    },
    {
      question: "Is there any cost or commitment?",
      answer:
        "The initial demo is completely free with no obligation. We focus on understanding your needs and demonstrating clear business value.",
    },
    {
      question: "Can you sign an NDA before sharing details?",
      answer:
        "Absolutely. We routinely execute mutual NDAs for enterprise evaluations involving sensitive architecture or data requirements.",
    },
  ],
  finalCta: {
    title: "Ready to Transform Your Business?",
    description:
      "Join hundreds of enterprises worldwide that trust Bavanex to deliver secure, scalable, and intelligent technology solutions.",
    button: "Book Your Demo Today",
  },
  companySizes: [
    "1–50 employees",
    "51–200 employees",
    "201–1,000 employees",
    "1,001–5,000 employees",
    "5,000+ employees",
  ],
  serviceInterests: services.map((s) => s.title),
  clientLogos: technologyPartners,
  successStories: testimonials.map((t, i) => ({
    ...t,
    avatar: `/images/avatar-${i + 1}.svg`,
    metric: ["32% revenue uplift", "45% cost reduction", "3x retention gain"][i],
  })),
};
