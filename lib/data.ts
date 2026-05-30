export const siteConfig = {
  name: "Bavanex Technologies",
  tagline: "AI-Powered Enterprise Intelligence",
  description:
    "Build, automate, and scale enterprise solutions using cutting-edge AI, Machine Learning, Data Engineering, and Intelligent Automation.",
  email: "hello@bavanex.com",
  phone: "+1 (555) 234-8900",
  offices: [
    { city: "San Francisco", address: "100 Market Street, Suite 400" },
    { city: "New York", address: "350 Fifth Avenue, Floor 12" },
    { city: "Bangalore", address: "Embassy Tech Village, Block C" },
  ],
};

export const navLinks = [
  { label: "Solutions", href: "/solutions" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/#industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/#careers" },
  { label: "Contact", href: "/#contact" },
];

export const trustedLogos = [
  "Microsoft", "Amazon", "Google", "IBM", "Oracle",
  "Salesforce", "Deloitte", "Accenture", "McKinsey", "PwC",
];

export const services = [
  {
    slug: "ai-machine-learning",
    icon: "Brain",
    category: "Artificial Intelligence",
    title: "Artificial Intelligence & Machine Learning",
    description: "Custom ML models, deep learning pipelines, and AI strategy for enterprise-scale intelligence.",
    overview:
      "We design and deploy production-grade machine learning systems that transform raw data into predictive intelligence. From computer vision to NLP and recommendation engines, our AI teams partner with you from proof-of-concept through enterprise rollout.",
    capabilities: [
      "Custom model development (classification, regression, forecasting)",
      "Deep learning & neural network architecture design",
      "MLOps pipelines with automated training and deployment",
      "Computer vision and natural language processing",
      "AI strategy consulting and roadmap development",
      "Model monitoring, drift detection, and retraining",
    ],
    benefits: [
      "Accelerate decision-making with data-driven predictions",
      "Reduce operational costs through intelligent automation",
      "Scale AI initiatives with enterprise MLOps infrastructure",
      "Achieve measurable ROI within the first two quarters",
    ],
    useCases: [
      "Fraud detection and risk scoring in financial services",
      "Predictive maintenance for manufacturing equipment",
      "Personalized recommendations in retail and e-commerce",
      "Clinical decision support in healthcare",
    ],
    relatedIndustries: ["Banking", "Healthcare", "Retail", "Manufacturing"],
    image: "/images/blog-ml.jpg",
  },
  {
    slug: "data-engineering-analytics",
    icon: "Database",
    category: "Data Engineering",
    title: "Data Engineering & Analytics",
    description: "Modern data lakes, real-time streaming, and analytics platforms that turn raw data into insights.",
    overview:
      "Our data engineering practice builds the foundation for every AI initiative — unified, governed, and real-time data platforms that power analytics at scale. We architect cloud-native data lakes, streaming pipelines, and self-service BI environments.",
    capabilities: [
      "Cloud data lake and warehouse architecture (Snowflake, Databricks, BigQuery)",
      "Real-time streaming with Kafka, Flink, and Spark",
      "ETL/ELT pipeline design and orchestration",
      "Data governance, cataloging, and quality frameworks",
      "Executive dashboards and self-service analytics",
      "Data mesh and federated governance models",
    ],
    benefits: [
      "Single source of truth across the enterprise",
      "Real-time visibility into business operations",
      "Reduced data silos and integration complexity",
      "Faster time-to-insight for business teams",
    ],
    useCases: [
      "Unified customer data platform for 360° views",
      "Real-time supply chain visibility dashboards",
      "Regulatory reporting and compliance analytics",
      "IoT sensor data ingestion and processing",
    ],
    relatedIndustries: ["Banking", "Logistics", "Telecom", "Pharma"],
    image: "/images/solutions-platform.jpg",
  },
  {
    slug: "generative-ai",
    icon: "Sparkles",
    category: "Generative AI",
    title: "Generative AI Solutions",
    description: "LLM integration, RAG systems, and generative workflows tailored to your business domain.",
    overview:
      "Harness the power of large language models safely and at scale. We build domain-specific generative AI applications — from intelligent document processing to conversational agents — with robust guardrails, RAG architectures, and enterprise security.",
    capabilities: [
      "LLM integration (GPT, Claude, Llama, custom fine-tuned models)",
      "Retrieval-Augmented Generation (RAG) systems",
      "Enterprise chatbots and virtual assistants",
      "Document intelligence and automated summarization",
      "Prompt engineering and evaluation frameworks",
      "Responsible AI guardrails and content filtering",
    ],
    benefits: [
      "Automate knowledge work and document-heavy processes",
      "Empower employees with AI copilots and assistants",
      "Maintain data privacy with on-premise or VPC deployments",
      "Measure and optimize generative AI ROI continuously",
    ],
    useCases: [
      "Legal contract analysis and clause extraction",
      "Customer support automation with human handoff",
      "Internal knowledge base Q&A for employees",
      "Marketing content generation with brand compliance",
    ],
    relatedIndustries: ["Banking", "Insurance", "Pharma", "Retail"],
    image: "/images/blog-genai.jpg",
  },
  {
    slug: "cloud-devops",
    icon: "Cloud",
    category: "Cloud Infrastructure",
    title: "Cloud & DevOps",
    description: "Cloud-native architecture, CI/CD pipelines, and infrastructure automation at scale.",
    overview:
      "We help enterprises migrate, modernize, and optimize cloud infrastructure on AWS, Azure, and GCP. Our DevOps engineers implement infrastructure-as-code, automated CI/CD, and observability stacks that keep AI workloads running reliably at scale.",
    capabilities: [
      "Cloud migration and multi-cloud strategy",
      "Kubernetes orchestration and containerization",
      "Infrastructure as Code (Terraform, Pulumi, CloudFormation)",
      "CI/CD pipeline design and GitOps workflows",
      "Site reliability engineering and incident response",
      "Cost optimization and FinOps practices",
    ],
    benefits: [
      "99.9%+ uptime for mission-critical AI workloads",
      "Faster release cycles with automated deployments",
      "Reduced cloud spend through right-sizing and optimization",
      "Security and compliance built into every layer",
    ],
    useCases: [
      "ML model serving on Kubernetes at scale",
      "Legacy application cloud migration",
      "Multi-region disaster recovery architecture",
      "Automated compliance scanning in CI/CD pipelines",
    ],
    relatedIndustries: ["Telecom", "Banking", "Manufacturing", "Healthcare"],
    image: "/images/hero-bg.jpg",
  },
  {
    slug: "product-engineering",
    icon: "Code2",
    category: "Product Engineering",
    title: "Product Engineering",
    description: "Full-stack development of AI-powered products from concept to production deployment.",
    overview:
      "Our product engineering teams build AI-native applications from the ground up — combining elegant UX with robust backend systems. We follow agile methodologies to deliver MVPs quickly and iterate based on real user feedback and business metrics.",
    capabilities: [
      "Full-stack web and mobile application development",
      "AI feature integration into existing products",
      "Microservices and API-first architecture",
      "UX/UI design for enterprise and consumer products",
      "Quality assurance and automated testing",
      "Product discovery and technical feasibility assessments",
    ],
    benefits: [
      "Ship AI-powered products faster with experienced teams",
      "Scalable architecture that grows with your user base",
      "Seamless integration with existing enterprise systems",
      "Continuous delivery with measurable product metrics",
    ],
    useCases: [
      "AI-powered SaaS platform development",
      "Mobile apps with on-device ML capabilities",
      "Internal tools and workflow applications",
      "API marketplaces and developer platforms",
    ],
    relatedIndustries: ["Retail", "Healthcare", "Banking", "Logistics"],
    image: "/images/about-team.jpg",
  },
  {
    slug: "intelligent-automation",
    icon: "Workflow",
    category: "Intelligent Automation",
    title: "Intelligent Automation",
    description: "RPA, agentic workflows, and process automation that eliminate manual bottlenecks.",
    overview:
      "Go beyond traditional RPA with intelligent automation powered by AI. We orchestrate complex business processes using agentic workflows, decision engines, and human-in-the-loop systems that adapt to changing conditions autonomously.",
    capabilities: [
      "Robotic Process Automation (RPA) design and deployment",
      "Agentic AI workflow orchestration",
      "Business process mining and optimization",
      "Intelligent document processing (IDP)",
      "Human-in-the-loop approval workflows",
      "Integration with ERP, CRM, and legacy systems",
    ],
    benefits: [
      "Eliminate repetitive manual tasks across departments",
      "Reduce processing errors by up to 95%",
      "Free teams to focus on high-value strategic work",
      "Achieve ROI within 3–6 months of deployment",
    ],
    useCases: [
      "Invoice processing and accounts payable automation",
      "Employee onboarding workflow automation",
      "Claims processing in insurance",
      "Order fulfillment and inventory reconciliation",
    ],
    relatedIndustries: ["Insurance", "Banking", "Manufacturing", "Logistics"],
    image: "/images/blog-agentic.jpg",
  },
  {
    slug: "enterprise-applications",
    icon: "Building2",
    category: "Enterprise Applications",
    title: "Enterprise Applications",
    description: "Custom ERP, CRM, and business applications integrated with AI capabilities.",
    overview:
      "We build and modernize enterprise applications that serve as the operational backbone of your organization. Every application we deliver is designed with AI-ready architecture, enabling intelligent features from day one or as a seamless future upgrade.",
    capabilities: [
      "Custom ERP, CRM, and HCM application development",
      "Legacy system modernization and API enablement",
      "Salesforce, SAP, and Oracle integration",
      "Role-based access control and enterprise security",
      "Workflow engines and approval management",
      "AI copilot integration into business applications",
    ],
    benefits: [
      "Unified business operations on a single platform",
      "Reduced licensing costs with custom-fit solutions",
      "AI capabilities embedded where teams work daily",
      "Compliance-ready audit trails and reporting",
    ],
    useCases: [
      "Custom CRM with AI lead scoring",
      "Field service management mobile apps",
      "Vendor and procurement management portals",
      "Employee self-service HR platforms",
    ],
    relatedIndustries: ["Manufacturing", "Retail", "Healthcare", "Pharma"],
    image: "/images/case-supply.jpg",
  },
  {
    slug: "digital-transformation",
    icon: "RefreshCw",
    category: "Digital Transformation",
    title: "Digital Transformation",
    description: "End-to-end modernization strategies that align technology with business outcomes.",
    overview:
      "Digital transformation is more than technology — it's a strategic shift in how your organization operates. We guide enterprises through comprehensive modernization programs that combine cloud, AI, data, and process redesign to deliver lasting competitive advantage.",
    capabilities: [
      "Digital maturity assessment and roadmap planning",
      "Change management and organizational alignment",
      "Legacy modernization and cloud migration programs",
      "AI adoption strategy and center of excellence setup",
      "Process re-engineering and operating model design",
      "Program management and executive stakeholder alignment",
    ],
    benefits: [
      "Clear transformation roadmap tied to business KPIs",
      "Reduced risk with phased, measurable milestones",
      "Cross-functional alignment between IT and business",
      "Sustainable innovation culture beyond the program",
    ],
    useCases: [
      "Enterprise-wide cloud and AI modernization",
      "Post-merger technology integration",
      "Regulatory-driven digital compliance programs",
      "Customer experience transformation initiatives",
    ],
    relatedIndustries: ["Banking", "Insurance", "Healthcare", "Telecom"],
    image: "/images/case-banking.jpg",
  },
];

export const platformFeatures = [
  {
    title: "Predictive Analytics",
    description: "Forecast trends, demand, and risks with ML-powered predictive models.",
  },
  {
    title: "Intelligent Decision Making",
    description: "AI-driven recommendations that optimize business decisions in real time.",
  },
  {
    title: "No-Code AI Builder",
    description: "Empower teams to build AI workflows without writing a single line of code.",
  },
  {
    title: "Workflow Automation",
    description: "Orchestrate complex business processes with intelligent automation engines.",
  },
  {
    title: "Agentic AI Systems",
    description: "Autonomous AI agents that plan, execute, and adapt to achieve business goals.",
  },
  {
    title: "Enterprise Knowledge Engine",
    description: "Unified knowledge graph connecting all your enterprise data and documents.",
  },
];

export const industries = [
  { name: "Healthcare", icon: "HeartPulse" },
  { name: "Pharma", icon: "Pill" },
  { name: "Banking", icon: "Landmark" },
  { name: "Retail", icon: "ShoppingBag" },
  { name: "Manufacturing", icon: "Factory" },
  { name: "Telecom", icon: "Radio" },
  { name: "Insurance", icon: "Shield" },
  { name: "Logistics", icon: "Truck" },
];

export const stats = [
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 100, suffix: "+", label: "Enterprise Clients" },
  { value: 98, suffix: "%", label: "Customer Satisfaction" },
  { value: 50, suffix: "M+", label: "Data Points Processed Daily" },
];

export const caseStudies = [
  {
    slug: "revenue-optimization-ai",
    title: "Revenue Optimization using AI",
    industry: "Retail",
    result: "32% increase in revenue through AI-driven pricing and demand forecasting.",
    image: "/images/case-retail.jpg",
    client: "RetailMax International",
    duration: "6 months",
    summary:
      "RetailMax partnered with Bavanex to deploy a dynamic pricing engine powered by machine learning, transforming how they respond to market demand across 2,000+ SKUs.",
    challenge:
      "Static pricing models failed to capture real-time demand signals, leading to margin erosion and lost revenue during peak seasons.",
    solution:
      "We built a predictive pricing platform integrating POS data, competitor intelligence, and weather patterns into a unified ML pipeline with automated price recommendations.",
    outcomes: [
      "32% revenue increase in targeted categories",
      "18% improvement in gross margin",
      "Real-time pricing updates across 500+ stores",
      "Reduced manual pricing workload by 85%",
    ],
  },
  {
    slug: "supply-chain-forecasting",
    title: "Supply Chain Forecasting",
    industry: "Manufacturing",
    result: "45% reduction in inventory costs with predictive supply chain analytics.",
    image: "/images/case-supply.jpg",
    client: "Apex Manufacturing Group",
    duration: "8 months",
    summary:
      "Apex Manufacturing needed end-to-end visibility across a complex global supply chain. Bavanex delivered a predictive analytics platform that optimized inventory levels and reduced waste.",
    challenge:
      "Fragmented data across ERP, warehouse, and logistics systems caused overstocking and frequent stockouts, costing millions annually.",
    solution:
      "We implemented a cloud-native data lake with real-time demand forecasting models, supplier risk scoring, and automated reorder triggers integrated with their SAP environment.",
    outcomes: [
      "45% reduction in inventory holding costs",
      "92% forecast accuracy at SKU level",
      "30% decrease in stockout incidents",
      "Unified dashboard for 12 global warehouses",
    ],
  },
  {
    slug: "customer-intelligence-platform",
    title: "Customer Intelligence Platform",
    industry: "Banking",
    result: "3x improvement in customer retention with unified AI-powered insights.",
    image: "/images/case-banking.jpg",
    client: "Global Finance Corp",
    duration: "10 months",
    summary:
      "Global Finance Corp engaged Bavanex to unify customer data silos and deploy AI-driven personalization across their retail banking division serving 5M+ customers.",
    challenge:
      "Customer data was scattered across legacy CRM, mobile app, and branch systems, preventing personalized engagement and increasing churn.",
    solution:
      "We delivered a Customer 360 platform with real-time segmentation, churn prediction models, and next-best-action recommendations powered by our Enterprise Knowledge Engine.",
    outcomes: [
      "3x improvement in customer retention rates",
      "40% increase in cross-sell conversion",
      "Unified view of 5M+ customer profiles",
      "Sub-200ms recommendation latency",
    ],
  },
];

export const testimonials = [
  {
    quote: "Bavanex transformed our data infrastructure and delivered AI solutions that exceeded every KPI we set.",
    name: "Sarah Chen",
    role: "CTO",
    company: "Global Finance Corp",
    avatar: "/images/avatar-1.jpg",
  },
  {
    quote: "Their agentic AI platform reduced our operational costs by 40% within the first quarter of deployment.",
    name: "Michael Rodriguez",
    role: "VP of Operations",
    company: "HealthTech Solutions",
    avatar: "/images/avatar-2.jpg",
  },
  {
    quote: "The no-code AI builder empowered our teams to innovate without waiting on engineering resources.",
    name: "Priya Sharma",
    role: "Head of Digital",
    company: "RetailMax International",
    avatar: "/images/avatar-3.jpg",
  },
];

export const careers = {
  positions: [
    { title: "Senior ML Engineer", location: "San Francisco / Remote", type: "Full-time" },
    { title: "Data Platform Architect", location: "New York / Remote", type: "Full-time" },
    { title: "AI Product Manager", location: "Bangalore / Hybrid", type: "Full-time" },
    { title: "DevOps Engineer", location: "Remote", type: "Full-time" },
  ],
  culture: [
    "Innovation-first mindset",
    "Remote-friendly culture",
    "Continuous learning budget",
    "Diverse & inclusive teams",
  ],
  benefits: [
    "Competitive compensation",
    "Health & wellness programs",
    "Equity participation",
    "Flexible PTO",
  ],
};

export const blogPosts = [
  {
    slug: "future-of-agentic-ai",
    title: "The Future of Agentic AI in Enterprise",
    excerpt: "How autonomous AI agents are reshaping business operations and decision-making.",
    date: "May 28, 2026",
    category: "AI Trends",
    image: "/images/blog-agentic.jpg",
    content: [
      "Agentic AI represents the next frontier in enterprise automation. Unlike traditional rule-based systems, agentic agents can plan, reason, and adapt to achieve complex business objectives autonomously.",
      "At Bavanex, we are seeing enterprises deploy agentic systems for customer support triage, supply chain optimization, and compliance monitoring — with measurable ROI within the first quarter.",
      "The key to success lies in robust guardrails, human-in-the-loop oversight, and integration with existing enterprise knowledge bases.",
    ],
  },
  {
    slug: "scalable-ml-pipelines",
    title: "Building Scalable ML Pipelines",
    excerpt: "Best practices for production-grade machine learning infrastructure.",
    date: "May 22, 2026",
    category: "Engineering",
    image: "/images/blog-ml.jpg",
    content: [
      "Production ML requires more than accurate models — it demands reliable data pipelines, monitoring, and reproducible deployment workflows.",
      "We recommend a modular architecture: feature stores for consistency, experiment tracking for reproducibility, and automated retraining triggers based on data drift detection.",
      "Teams that adopt MLOps practices early reduce time-to-production by 60% and cut model maintenance costs significantly.",
    ],
  },
  {
    slug: "generative-ai-roi",
    title: "Generative AI ROI: A Practical Guide",
    excerpt: "Measuring and maximizing return on investment from generative AI initiatives.",
    date: "May 15, 2026",
    category: "Strategy",
    image: "/images/blog-genai.jpg",
    content: [
      "Generative AI investments must be tied to concrete business outcomes — not technology for its own sake. Start with high-impact, low-risk use cases like document processing and customer support augmentation.",
      "Measure ROI across three dimensions: time saved, quality improved, and revenue generated. Our clients typically see 3-5x returns within 12 months when focusing on workflow automation.",
      "Build a center of excellence to scale learnings across departments and avoid fragmented, redundant AI initiatives.",
    ],
  },
];

export const aboutContent = {
  mission:
    "To empower enterprises worldwide with AI-powered intelligence that drives measurable business transformation.",
  vision:
    "A world where every organization can harness the full potential of artificial intelligence to innovate, compete, and thrive.",
  values: [
    { title: "Innovation", description: "We push boundaries and embrace emerging technologies to deliver cutting-edge solutions." },
    { title: "Integrity", description: "We build trust through transparency, ethical AI practices, and accountable partnerships." },
    { title: "Excellence", description: "We hold ourselves to the highest standards in engineering, design, and client delivery." },
    { title: "Impact", description: "We measure success by the tangible outcomes we create for our clients and their customers." },
  ],
  leadership: [
    { name: "Rajesh Kumar", role: "CEO & Co-Founder", bio: "Former VP of AI at a Fortune 100 company with 20+ years in enterprise technology." },
    { name: "Emily Watson", role: "CTO & Co-Founder", bio: "PhD in Machine Learning, previously led data science teams at Google and Databricks." },
    { name: "David Okonkwo", role: "Chief Revenue Officer", bio: "Scaled three enterprise SaaS companies from Series A to IPO." },
    { name: "Ananya Patel", role: "VP of Engineering", bio: "Architect of large-scale AI platforms serving millions of users globally." },
  ],
  image: "/images/about-team.jpg",
};

export const solutionsContent = {
  hero: {
    title: "Enterprise AI Solutions Built for Scale",
    description:
      "From predictive analytics to agentic AI, our platform and services help you move from experimentation to enterprise-wide impact.",
  },
  pillars: [
    {
      title: "Bavanex Intelligence Platform",
      description: "A unified AI operating system for data ingestion, model deployment, workflow automation, and enterprise knowledge management.",
      features: ["Real-time analytics", "No-code AI builder", "Agent orchestration", "Enterprise security"],
    },
    {
      title: "Industry Solutions",
      description: "Pre-built AI accelerators tailored for healthcare, finance, retail, manufacturing, and more — deploy in weeks, not months.",
      features: ["Regulatory compliance", "Domain-specific models", "Pre-built integrations", "Rapid deployment"],
    },
    {
      title: "Managed AI Services",
      description: "End-to-end AI operations from strategy and build to monitoring and continuous optimization by our expert team.",
      features: ["24/7 monitoring", "Model retraining", "Performance SLAs", "Dedicated team"],
    },
  ],
  image: "/images/solutions-platform.jpg",
};

export const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Leadership", href: "/about#leadership" },
    { label: "Partners", href: "/about#partners" },
    { label: "News", href: "/#blog" },
  ],
  solutions: [
    { label: "AI Platform", href: "/solutions" },
    { label: "Predictive Analytics", href: "/solutions#platform" },
    { label: "Agentic AI", href: "/solutions#platform" },
    { label: "Knowledge Engine", href: "/solutions#platform" },
  ],
  services: [
    { label: "Machine Learning", href: "/services/ai-machine-learning" },
    { label: "Data Engineering", href: "/services/data-engineering-analytics" },
    { label: "Generative AI", href: "/services/generative-ai" },
    { label: "Automation", href: "/services/intelligent-automation" },
  ],
  resources: [
    { label: "Blog", href: "/#blog" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Documentation", href: "/solutions" },
    { label: "Webinars", href: "/#blog" },
  ],
  careers: [
    { label: "Open Positions", href: "/#careers" },
    { label: "Culture", href: "/#careers" },
    { label: "Benefits", href: "/#careers" },
    { label: "Apply Now", href: "/#contact" },
  ],
};

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
