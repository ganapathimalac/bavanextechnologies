(function () {
  "use strict";

  const cfg = window.BAVANEX_SITE;
  if (!cfg) return;

  function prefix() {
    const depth = (document.body.dataset.depth || "0") | 0;
    return depth > 0 ? "../".repeat(depth) : "";
  }

  function logoSvg() {
    return `<svg class="logo-mark" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M10 38V10h8c6.5 0 11 4.5 11 10.5S24.5 31 18 31h-4v7H10z" fill="#2b50e6"/>
      <path d="M14 18h4c3 0 5 1.8 5 4.5S21 27 18 27h-4V18z" fill="#fff"/>
      <path d="M26 10h12v28H26V10z" fill="#7b3ff2" opacity=".85"/>
    </svg>`;
  }

  function socialIcon(name) {
    const icons = {
      linkedin: '<path d="M4 4h7v21H4V4zm3.5 3.5a2 2 0 110 4 2 2 0 010-4zM13 9h6.7v2.9h.1c.9-1.7 3.1-3.5 6.4-3.5 6.8 0 8.1 4.5 8.1 10.3V25H24v-7.5c0-1.8 0-4.1-2.5-4.1-2.5 0-2.9 2-2.9 4v7.6H13V9z"/>',
      youtube: '<path d="M21 15.5l8.5 5L21 25.5v-10zM12 6h12c3.3 0 6 2.7 6 6v12c0 3.3-2.7 6-6 6H12c-3.3 0-6-2.7-6-6V12c0-3.3 2.7-6 6-6z"/>',
      twitter: '<path d="M22 11l2.5 3.5L28 11h3l-4.5 5.5L32 25h-3l-3-4-3 4h-3l4.5-6L19 11h3z"/>',
      instagram: '<rect x="6" y="6" width="20" height="20" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="16" cy="16" r="4.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="22" cy="10" r="1.2" fill="currentColor"/>',
      facebook: '<path d="M14 8h4c2.2 0 4 1.8 4 4v3h4l-1 4h-3v9h-4v-9h-3v-4h3v-2c0-3.3 2.7-6 6-6z"/>',
      whatsapp: '<path d="M16 4C9.4 4 4 9.2 4 15.6c0 2.2.6 4.3 1.8 6.1L4 28l6.6-1.7c1.7.9 3.6 1.4 5.4 1.4 6.6 0 12-5.2 12-11.7C28 9.2 22.6 4 16 4zm6.8 16.8c-.3.8-1.5 1.5-2.1 1.6-.5.1-1.2.2-1.9-.1-.4-.2-1-.4-1.7-.8-3-2-4.9-3.3-4.9-6.5 0-1.3.7-2.5 1-2.9.3-.4.7-.5 1-.5h.7c.2 0 .5-.1.7.5l1 2.3c.2.5 0 .8-.2 1.1l-.4.5c-.2.2-.2.4 0 .7.5.9 1.8 2.8 3.9 4 1.1.7 2 1 2.6 1.1.4.1.8 0 1-.4l.8-1.1c.2-.3.5-.3.9-.2l2.3 1.1c.5.2.4.6.3 1z"/>'
    };
    return icons[name] || "";
  }

  function renderNav() {
    const p = prefix();
    return cfg.nav.map((group) => {
      const items = group.items.map((item) =>
        `<a href="${p}${item.href}" class="mega-item">
          <strong>${item.label}</strong>
          <span>${item.desc}</span>
        </a>`
      ).join("");
      return `<li class="nav-item has-dropdown">
        <button class="nav-link" aria-expanded="false">${group.label}</button>
        <div class="mega-menu"><div class="mega-grid">${items}</div></div>
      </li>`;
    }).join("");
  }

  function renderHeader() {
    const p = prefix();
    return `<header class="site-header" id="top">
      <div class="container header-inner">
        <a href="${p}index.html" class="logo" aria-label="Bavanex Technologies home">
          ${logoSvg()}
          <span class="logo-text">
            <strong>Bavanex</strong>
            <small>Technologies</small>
          </span>
        </a>
        <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <nav class="main-nav" aria-label="Primary">
          <ul>${renderNav()}
            <li class="nav-item"><a href="${p}pages/company/blog.html" class="nav-link nav-badge">Blog <span>New</span></a></li>
          </ul>
        </nav>
      </div>
    </header>`;
  }

  function renderFooter() {
    const p = prefix();
    const cols = cfg.nav.map((group) => {
      const links = group.items.map((item) => {
        let label = item.label;
        if (label.startsWith("Bavanex BI ")) label = label.replace("Bavanex BI ", "BI ");
        else if (label.startsWith("Bavanex ")) label = label.replace("Bavanex ", "");
        return `<li><a href="${p}${item.href}">${label}</a></li>`;
      }).join("");
      return `<div><h5>${group.label}</h5><ul>${links}</ul></div>`;
    }).join("");

    const legal = cfg.footer.legal.map((l) =>
      `<a href="${p}${l.href}">${l.label}</a>`
    ).join("");

    const social = cfg.footer.social.map((s) =>
      `<a href="${s.href}" class="social-link" aria-label="${s.label}" target="_blank" rel="noopener">
        <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor">${socialIcon(s.icon)}</svg>
      </a>`
    ).join("");

    return `<footer class="site-footer">
      <div class="container footer-grid">${cols}</div>
      <div class="container footer-bottom">
        <p>Copyright &copy; 2022 Bavanex Technologies. All Rights Reserved</p>
        <div class="footer-legal">${legal}</div>
        <div class="footer-social">${social}</div>
        <div class="footer-lang">English</div>
      </div>
    </footer>
    <div class="cookie-banner" id="cookieBanner" role="dialog" aria-label="Cookie consent">
      <div class="cookie-icon" aria-hidden="true">&#127850;</div>
      <p>Our website use cookies. By continuing, we assume your permission to deploy cookies as detailed in our <a href="${p}pages/legal/cookie-policy.html">Cookie Policy</a>.</p>
      <div class="cookie-actions">
        <button class="btn-text" id="declineCookies">Decline cookies</button>
        <button class="btn btn-primary btn-sm" id="acceptCookies">Accept cookies</button>
      </div>
    </div>`;
  }

  function renderInnerPage(pageId) {
    const page = cfg.pages[pageId];
    if (!page) return "";
    const p = prefix();
    const imgs = window.BAVANEX_IMAGES;
    const heroImg = imgs?.src(pageId) || "";
    const sections = page.sections.map((s) =>
      `<div class="page-block">
        <div class="page-block-text">
          <h2>${s.heading}</h2>
          <p>${s.body}</p>
        </div>
      </div>`
    ).join("");

    const heroVisual = heroImg
      ? `<div class="page-hero-visual"><img src="${heroImg}" alt="${page.title}" loading="eager" decoding="async"></div>`
      : "";

    return `<main class="inner-main">
      <section class="page-hero">
        <div class="container page-hero-grid">
          <div class="page-hero-copy">
            <nav class="breadcrumb" aria-label="Breadcrumb">
              <a href="${p}index.html">Home</a> / <span>${page.category}</span> / <span>${page.title}</span>
            </nav>
            <span class="page-category">${page.category}</span>
            <h1>${page.title}</h1>
            <p class="page-lead">${page.hero}</p>
            <a href="${p}pages/company/contact-us.html" class="btn btn-primary">Get Started</a>
          </div>
          ${heroVisual}
        </div>
      </section>
      <section class="page-content section">
        <div class="container page-grid">${sections}</div>
      </section>
      <section class="cta section">
        <div class="container cta-inner cta-inner-compact">
          <div class="cta-copy">
            <h2>Enhance Your Business with Our Products</h2>
            <p>Bavanex Technologies is defined by consistent delivery of innovation and excellence. Join us on a journey of transformation and growth.</p>
          </div>
          <div class="cta-box">
            <h3>Start for free</h3>
            <p>Increase sales conversions, Reduce admin tasks</p>
            <a href="${p}pages/company/contact-us.html" class="btn btn-primary">Get Started</a>
          </div>
        </div>
      </section>
      <section class="newsletter section">
        <div class="container newsletter-inner">
          <div>
            <h2>Stay ahead with AI insights!</h2>
            <p>Subscribe for our cutting-edge newsletter</p>
          </div>
          <form class="newsletter-form" id="newsletterForm">
            <label class="sr-only" for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Email" required>
            <button type="submit" class="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </main>`;
  }

  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");
  const mainEl = document.getElementById("page-main");

  if (headerEl) headerEl.outerHTML = renderHeader();
  if (footerEl) footerEl.outerHTML = renderFooter();

  const pageId = document.body.dataset.page;
  if (pageId && mainEl) {
    mainEl.innerHTML = renderInnerPage(pageId);
    document.title = `${cfg.pages[pageId].title} | Bavanex Technologies`;
  }
})();
