(function () {

  "use strict";



  /* Platform carousel */

  const platformTrack = document.getElementById("platformTrack");

  const platformDots = document.getElementById("platformDots");

  const platformCards = platformTrack ? [...platformTrack.querySelectorAll(".platform-card")] : [];

  let platformIndex = 0;

  let platformTimer;



  function setPlatformSlide(index) {

    if (!platformCards.length) return;

    platformIndex = (index + platformCards.length) % platformCards.length;

    platformCards.forEach((card, i) => card.classList.toggle("active", i === platformIndex));

    platformDots?.querySelectorAll("button").forEach((dot, i) => dot.classList.toggle("active", i === platformIndex));

  }



  function initPlatformCarousel() {

    if (!platformCards.length || !platformDots) return;

    platformCards.forEach((_, i) => {

      const dot = document.createElement("button");

      dot.type = "button";

      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);

      if (i === 0) dot.classList.add("active");

      dot.addEventListener("click", () => { setPlatformSlide(i); restartPlatformAutoplay(); });

      platformDots.appendChild(dot);

    });

    document.querySelectorAll(".platform .carousel-btn").forEach((btn) => {

      btn.addEventListener("click", () => {

        setPlatformSlide(platformIndex + Number(btn.dataset.dir || 1));

        restartPlatformAutoplay();

      });

    });

    restartPlatformAutoplay();

  }



  function restartPlatformAutoplay() {

    clearInterval(platformTimer);

    platformTimer = setInterval(() => setPlatformSlide(platformIndex + 1), 6000);

  }



  /* Products carousel */

  const productsTrack = document.getElementById("productsTrack");

  const productsDots = document.getElementById("productsDots");

  const productSlides = productsTrack ? [...productsTrack.querySelectorAll(".product-slide")] : [];

  let productsIndex = 0;



  function setProductsSlide(index) {

    if (!productSlides.length) return;

    productsIndex = (index + productSlides.length) % productSlides.length;

    const slide = productSlides[0];

    const gap = 24;

    const offset = productsIndex * (slide.offsetWidth + gap);

    productsTrack.style.transform = `translateX(-${offset}px)`;

    productsDots?.querySelectorAll("button").forEach((dot, i) => dot.classList.toggle("active", i === productsIndex));

  }



  function initProductsCarousel() {

    if (!productSlides.length) return;

    if (productsDots) {

      productSlides.forEach((_, i) => {

        const dot = document.createElement("button");

        dot.type = "button";

        dot.setAttribute("aria-label", `Go to product ${i + 1}`);

        if (i === 0) dot.classList.add("active");

        dot.addEventListener("click", () => setProductsSlide(i));

        productsDots.appendChild(dot);

      });

    }

    document.querySelector(".products-prev")?.addEventListener("click", () => setProductsSlide(productsIndex - 1));

    document.querySelector(".products-next")?.addEventListener("click", () => setProductsSlide(productsIndex + 1));

  }



  /* Blog carousel */

  const blogTrack = document.getElementById("blogTrack");

  const blogCards = blogTrack ? [...blogTrack.querySelectorAll(".blog-card")] : [];

  let blogOffset = 0;



  function slideBlog(direction) {

    if (!blogTrack || !blogCards.length) return;

    const cardWidth = blogCards[0].offsetWidth + 20;

    const maxOffset = Math.max(0, (blogCards.length - 1) * cardWidth);

    blogOffset = Math.min(Math.max(0, blogOffset + direction * cardWidth), maxOffset);

    blogTrack.style.transform = `translateX(-${blogOffset}px)`;

  }



  document.querySelector(".blog-prev")?.addEventListener("click", () => slideBlog(-1));

  document.querySelector(".blog-next")?.addEventListener("click", () => slideBlog(1));



  /* Mega menu & mobile nav */

  const navToggle = document.querySelector(".nav-toggle");

  const mainNav = document.querySelector(".main-nav");



  navToggle?.addEventListener("click", () => {

    const open = mainNav.classList.toggle("open");

    navToggle.setAttribute("aria-expanded", String(open));

  });



  document.querySelectorAll(".nav-item.has-dropdown").forEach((item) => {

    const btn = item.querySelector(".nav-link");

    btn?.addEventListener("click", (e) => {

      if (window.innerWidth <= 1024) {

        e.preventDefault();

        const wasOpen = item.classList.contains("open");

        document.querySelectorAll(".nav-item.has-dropdown.open").forEach((el) => el.classList.remove("open"));

        if (!wasOpen) item.classList.add("open");

        btn.setAttribute("aria-expanded", String(!wasOpen));

      }

    });

    item.addEventListener("mouseenter", () => {

      if (window.innerWidth > 1024) {

        item.classList.add("open");

        btn?.setAttribute("aria-expanded", "true");

      }

    });

    item.addEventListener("mouseleave", () => {

      if (window.innerWidth > 1024) {

        item.classList.remove("open");

        btn?.setAttribute("aria-expanded", "false");

      }

    });

  });



  mainNav?.querySelectorAll("a:not(.nav-link)").forEach((link) => {

    link.addEventListener("click", () => {

      mainNav.classList.remove("open");

      navToggle?.setAttribute("aria-expanded", "false");

    });

  });



  document.addEventListener("click", (e) => {

    if (!e.target.closest(".main-nav") && !e.target.closest(".nav-toggle")) {

      mainNav?.classList.remove("open");

      navToggle?.setAttribute("aria-expanded", "false");

    }

  });



  /* Cookie banner */

  const cookieBanner = document.getElementById("cookieBanner");

  const acceptCookies = document.getElementById("acceptCookies");

  const declineCookies = document.getElementById("declineCookies");

  const cookieKey = "bavanex_cookie_consent";



  function hideCookieBanner() {

    cookieBanner?.classList.remove("visible");

    setTimeout(() => cookieBanner?.classList.add("hidden"), 400);

  }



  if (!localStorage.getItem(cookieKey)) {

    requestAnimationFrame(() => cookieBanner?.classList.add("visible"));

  } else {

    cookieBanner?.classList.add("hidden");

  }



  acceptCookies?.addEventListener("click", () => {

    localStorage.setItem(cookieKey, "accepted");

    hideCookieBanner();

  });



  declineCookies?.addEventListener("click", () => {

    localStorage.setItem(cookieKey, "declined");

    hideCookieBanner();

  });



  document.getElementById("newsletterForm")?.addEventListener("submit", (event) => {

    event.preventDefault();

    const email = event.target.email.value.trim();

    if (!email) return;

    event.target.reset();

    alert("Thanks for subscribing! We'll send AI insights to " + email);

  });



  window.addEventListener("resize", () => {

    blogOffset = 0;

    if (blogTrack) blogTrack.style.transform = "translateX(0)";

    if (productSlides.length) setProductsSlide(productsIndex);

  });



  initPlatformCarousel();

  initProductsCarousel();

})();

