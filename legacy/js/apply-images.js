(function () {
  "use strict";

  const img = window.BAVANEX_IMAGES;
  if (!img) return;

  function setImg(selector, files, alt) {
    document.querySelectorAll(selector).forEach((el, i) => {
      const file = Array.isArray(files) ? files[i] : files;
      if (!file) return;
      const src = img.resolve(file);
      if (el.tagName === "IMG") {
        el.src = src;
        if (alt) el.alt = alt;
      } else {
        el.style.backgroundImage = `url('${src}')`;
      }
    });
  }

  setImg(".hero-visual img", img.hero, "Bavanex Technologies AI-powered enterprise platform");
  setImg(".platform-visual img", img.platform);
  setImg(".product-slide-visual img", img.products);
  setImg(".science-image", img.science);
  setImg(".blog-image", img.blog);
  setImg(".cta-visual img", img.cta, "Bavanex Technologies team collaborating");

  document.querySelectorAll(".platform-visual img").forEach((el, i) => {
    const titles = ["BI Design Studio workspace", "BI Technology analytics dashboard", "BI for Business intelligence"];
    el.alt = titles[i] || "Bavanex platform";
  });

  document.querySelectorAll(".product-slide-visual img").forEach((el, i) => {
    const titles = ["Bavanex Video production", "Bavanex Cart retail analytics", "Bavanex Precog AI engine", "Bavanex Quest team collaboration"];
    el.alt = titles[i] || "Bavanex product";
  });

  document.querySelectorAll(".blog-image").forEach((el, i) => {
    const titles = [
      "B2B sales strategy",
      "Business intelligence dashboard",
      "Modern digital surveys",
      "Bavanex Precog AI",
      "Agile project management",
      "Chandrayaan-3 space mission",
      "AI in healthcare"
    ];
    el.setAttribute("role", "img");
    el.setAttribute("aria-label", titles[i] || "Blog article");
  });
})();
