const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PAGE_MAP = {
  "pages/products/bavanex-precog.html": "bavanex-precog",
  "pages/products/bavanex-cart.html": "bavanex-cart",
  "pages/products/bavanex-quest.html": "bavanex-quest",
  "pages/products/bavanex-video.html": "bavanex-video",
  "pages/products/bavanex-funnel.html": "bavanex-funnel",
  "pages/platform/bi-for-businesses.html": "bi-for-businesses",
  "pages/platform/bi-technology.html": "bi-technology",
  "pages/platform/bi-design-studio.html": "bi-design-studio",
  "pages/solutions/marketing.html": "marketing",
  "pages/solutions/sales.html": "sales",
  "pages/solutions/technology.html": "technology",
  "pages/services/cloud-engineering.html": "cloud-engineering",
  "pages/services/data-analytics.html": "data-analytics",
  "pages/services/ai-machine-learning.html": "ai-machine-learning",
  "pages/services/product-development.html": "product-development",
  "pages/services/api-enablement.html": "api-enablement",
  "pages/customers/businesses.html": "businesses",
  "pages/customers/consumers.html": "consumers",
  "pages/industries/industries.html": "industries",
  "pages/industries/bavanex-care.html": "bavanex-care",
  "pages/company/about-us.html": "about-us",
  "pages/company/bavanex-india.html": "bavanex-india",
  "pages/company/careers.html": "careers",
  "pages/company/contact-us.html": "contact-us",
  "pages/company/help-center.html": "help-center",
  "pages/company/blog.html": "blog",
  "pages/legal/privacy-policy.html": "privacy-policy",
  "pages/legal/cookie-policy.html": "cookie-policy",
  "pages/legal/terms-and-conditions.html": "terms-and-conditions"
};

const OLD_PAGES = [
  "pages/products/predigle-precog.html",
  "pages/products/predigle-cart.html",
  "pages/products/predigle-quest.html",
  "pages/products/predigle-video.html",
  "pages/products/predigle-funnel.html",
  "pages/platform/pi-for-businesses.html",
  "pages/platform/pi-technology.html",
  "pages/platform/pi-design-studio.html",
  "pages/industries/espercare.html",
  "pages/company/predigle-india.html"
];

function depthOf(relPath) {
  return relPath.split("/").length - 1;
}

function template(relPath, pageId) {
  const depth = depthOf(relPath);
  const prefix = "../".repeat(depth);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bavanex Technologies</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${prefix}css/styles.css">
  <link rel="icon" href="${prefix}assets/favicon.svg" type="image/svg+xml">
</head>
<body data-page="${pageId}" data-depth="${depth}">
  <div id="site-header"></div>
  <div id="page-main"></div>
  <div id="site-footer"></div>
  <script src="${prefix}js/images.js"></script>
  <script src="${prefix}js/site-config.js"></script>
  <script src="${prefix}js/layout.js"></script>
  <script src="${prefix}js/main.js"></script>
</body>
</html>
`;
}

for (const rel of OLD_PAGES) {
  const full = path.join(ROOT, rel);
  if (fs.existsSync(full)) {
    fs.unlinkSync(full);
    console.log("Removed", rel);
  }
}

for (const [relPath, pageId] of Object.entries(PAGE_MAP)) {
  const fullPath = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, template(relPath, pageId));
  console.log("Created", relPath);
}

console.log("Done:", Object.keys(PAGE_MAP).length, "pages");
