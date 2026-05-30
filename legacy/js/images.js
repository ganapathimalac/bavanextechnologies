window.BAVANEX_IMAGES = {
  resolve(filename) {
    const depth = (document.body?.dataset?.depth || "0") | 0;
    const prefix = depth > 0 ? "../".repeat(depth) : "";
    return `${prefix}assets/images/${filename}`;
  },

  hero: "hero.jpg",
  science: "science.jpg",
  cta: "cta-team.jpg",

  platform: [
    "platform-design-studio.jpg",
    "platform-technology.jpg",
    "platform-business.jpg"
  ],

  products: [
    "product-video.jpg",
    "product-cart.jpg",
    "ai-neural.jpg",
    "product-quest.jpg"
  ],

  blog: [
    "blog-sales.jpg",
    "blog-dashboard.jpg",
    "blog-surveys.jpg",
    "blog-precog.jpg",
    "blog-agile.jpg",
    "blog-space.jpg",
    "healthcare.jpg"
  ],

  pages: {
    "bavanex-precog": "ai-neural.jpg",
    "bavanex-cart": "product-cart.jpg",
    "bavanex-quest": "product-quest.jpg",
    "bavanex-video": "product-video.jpg",
    "bavanex-funnel": "platform-technology.jpg",
    "bi-for-businesses": "skyline-business.jpg",
    "bi-technology": "circuit-tech.jpg",
    "bi-design-studio": "platform-design-studio.jpg",
    marketing: "marketing.jpg",
    sales: "blog-sales.jpg",
    technology: "technology-chip.jpg",
    "cloud-engineering": "cloud-earth.jpg",
    "data-analytics": "platform-technology.jpg",
    "ai-machine-learning": "ai-neural.jpg",
    "product-development": "coding.jpg",
    "api-enablement": "api-code.jpg",
    businesses: "skyline-business.jpg",
    consumers: "team-office.jpg",
    industries: "workspace.jpg",
    "bavanex-care": "healthcare.jpg",
    "about-us": "cta-team.jpg",
    "bavanex-india": "office-india.jpg",
    careers: "team-office.jpg",
    "contact-us": "contact-phone.jpg",
    "help-center": "help-support.jpg",
    blog: "blog-writing.jpg",
    "privacy-policy": "privacy-security.jpg",
    "cookie-policy": "science.jpg",
    "terms-and-conditions": "legal-documents.jpg"
  },

  src(pageId) {
    const file = this.pages[pageId];
    return file ? this.resolve(file) : "";
  },

  file(name) {
    return this.resolve(name);
  }
};
