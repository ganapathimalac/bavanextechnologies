import { caseStudies, siteConfig, technologyPartners } from "./data";

export const deliveryProcess = [
  {
    step: "01",
    title: "Discover",
    description: "Stakeholder workshops, requirements analysis, and success metrics definition.",
  },
  {
    step: "02",
    title: "Design",
    description: "Solution architecture, UX flows, security review, and delivery roadmap.",
  },
  {
    step: "03",
    title: "Develop",
    description: "Agile sprints with continuous integration, code review, and quality gates.",
  },
  {
    step: "04",
    title: "Deploy",
    description: "Cloud-native rollout on Azure with monitoring, documentation, and handover.",
  },
  {
    step: "05",
    title: "Optimize",
    description: "Performance tuning, model retraining, and ongoing support SLAs.",
  },
];

export const serviceFaqs = [
  {
    question: "How long does a typical engagement take?",
    answer:
      "Discovery and MVP delivery typically range from 8–16 weeks depending on scope. Enterprise rollouts may extend to 6–12 months with phased delivery.",
  },
  {
    question: "Do you work with existing systems and data?",
    answer:
      "Yes. We integrate with ERP, CRM, data warehouses, and legacy platforms. Our teams specialize in hybrid and cloud migration scenarios.",
  },
  {
    question: "What industries do you serve?",
    answer:
      "We serve healthcare, finance, manufacturing, retail, logistics, telecom, and insurance with domain-specific accelerators.",
  },
  {
    question: "How is project pricing structured?",
    answer:
      "We offer fixed-scope projects, time-and-materials, and managed services retainers. See our Pricing page for engagement models.",
  },
  {
    question: "Where are your teams located?",
    answer:
      "Bavanex operates from Belgium, Netherlands, Serbia, and Chennai with hybrid and remote delivery models for global clients.",
  },
];

export const homepageFaqs = [
  {
    question: "What services does Bavanex Technologies provide?",
    answer:
      "We deliver custom software development, cloud solutions, AI/ML, data engineering, generative AI, intelligent automation, and digital transformation for enterprise clients.",
  },
  {
    question: "How do I request a demo or consultation?",
    answer:
      "Visit our Request a Demo page to schedule a personalized session, or use the contact form on the homepage. Our team responds within one business day.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We follow GDPR-aligned practices, encrypt data in transit and at rest, and host on Microsoft Azure with enterprise security controls. See our Trust Center for details.",
  },
  {
    question: "Do you offer ongoing support after delivery?",
    answer:
      "Yes. We provide managed services, SLAs, monitoring, and continuous optimization packages tailored to your operational needs.",
  },
];

export const clientTestimonials = caseStudies.map((study) => ({
  quote: study.summary,
  industry: study.industry,
  result: study.result,
  href: `/case-studies/${study.slug}`,
}));

export const trustContent = {
  hero: {
    title: "Trust & Security Center",
    description:
      "Enterprise-grade security, privacy, and compliance practices for every engagement.",
  },
  pillars: [
    {
      title: "Data Protection",
      description: "GDPR-aligned privacy practices with encryption in transit (TLS 1.2+) and at rest.",
      items: ["Privacy by design", "Data minimization", "Access controls", "Audit logging"],
    },
    {
      title: "Cloud Security",
      description: "Applications hosted on Microsoft Azure with hardened infrastructure and monitoring.",
      items: ["Azure App Service", "Network isolation", "Automated backups", "Incident response"],
    },
    {
      title: "Secure Development",
      description: "Security integrated into every phase of our software delivery lifecycle.",
      items: ["Code review", "Dependency scanning", "Secrets management", "Pen-test readiness"],
    },
    {
      title: "Compliance Ready",
      description: "Frameworks and documentation to support your regulatory requirements.",
      items: ["GDPR", "ISO 27001 aligned practices", "SOC 2 readiness support", "NDA on request"],
    },
  ],
  certifications: [
    { name: "GDPR Compliant Practices", status: "Active" },
    { name: "Azure Cloud Hosting", status: "Active" },
    { name: "ISO 27001 Alignment", status: "In progress" },
    { name: "SOC 2 Type II", status: "Roadmap" },
  ],
};

export const pricingContent = {
  hero: {
    title: "Engagement Models",
    description: "Flexible commercial models designed for enterprise software and AI projects.",
  },
  models: [
    {
      name: "Fixed Scope",
      bestFor: "Well-defined projects with clear deliverables",
      features: ["Fixed timeline & budget", "Milestone-based delivery", "Change control process", "Acceptance criteria"],
      cta: "Request a Quote",
    },
    {
      name: "Time & Materials",
      bestFor: "Evolving requirements and discovery phases",
      features: ["Flexible scope", "Weekly sprint cadence", "Transparent reporting", "Scale team up/down"],
      cta: "Discuss Your Project",
      highlighted: true,
    },
    {
      name: "Managed Services",
      bestFor: "Ongoing operations, support, and optimization",
      features: ["24/7 monitoring options", "SLA-backed support", "Continuous improvement", "Dedicated team"],
      cta: "Talk to Sales",
    },
  ],
  note: "All engagements begin with a discovery phase. Final pricing depends on scope, complexity, and timeline.",
};

export const integrationsContent = {
  hero: {
    title: "Integrations & Technology Stack",
    description: "We connect your systems with modern cloud, data, and AI platforms.",
  },
  categories: [
    {
      title: "Cloud Platforms",
      items: ["Microsoft Azure", "Amazon AWS", "Google Cloud Platform"],
    },
    {
      title: "Data & Analytics",
      items: ["Snowflake", "Databricks", "PostgreSQL", "Apache Kafka", "Power BI"],
    },
    {
      title: "AI & ML",
      items: ["OpenAI", "Azure OpenAI", "LangChain", "Hugging Face", "MLflow"],
    },
    {
      title: "Enterprise Systems",
      items: ["SAP", "Salesforce", "Microsoft Dynamics", "ServiceNow", "REST/GraphQL APIs"],
    },
    {
      title: "DevOps & Engineering",
      items: ["Kubernetes", "Docker", "GitHub Actions", "Terraform", "Node.js", "Python", "React"],
    },
  ],
};

export const resourcesContent = {
  hero: {
    title: "Resources",
    description: "Insights, case studies, and guides to help you plan your digital transformation.",
  },
  items: [
    { type: "Case Study", title: "Revenue Optimization using AI", href: "/case-studies/revenue-optimization-ai" },
    { type: "Case Study", title: "Supply Chain Forecasting", href: "/case-studies/supply-chain-forecasting" },
    { type: "Case Study", title: "Customer Intelligence Platform", href: "/case-studies/customer-intelligence-platform" },
    { type: "Blog", title: "The Future of Agentic AI in Enterprise", href: "/blog/future-of-agentic-ai" },
    { type: "Blog", title: "Building Scalable ML Pipelines", href: "/blog/scalable-ml-pipelines" },
    { type: "Blog", title: "Generative AI ROI Framework", href: "/blog/generative-ai-roi" },
    { type: "Guide", title: "Request a Demo", href: "/request-demo" },
    { type: "Trust", title: "Security & Compliance Overview", href: "/trust" },
  ],
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bavanextechnologies.com",
  logo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://bavanextechnologies.com"}/images/bavanex-logo-full.png`,
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  sameAs: [],
  areaServed: ["BE", "NL", "RS", "IN", "EU"],
  knowsAbout: technologyPartners,
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bavanextechnologies.com",
  potentialAction: {
    "@type": "SearchAction",
    target: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://bavanextechnologies.com"}/resources?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};
