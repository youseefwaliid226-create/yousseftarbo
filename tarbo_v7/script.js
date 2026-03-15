/* ============================================================
   YOUSSEF TARBO — script.js  v6
   Unified portfolio (video + images) | Full EN/AR switcher
   ============================================================ */

const WA_NUMBER = "201559531916";
const INITIAL_LOAD = 12;
let currentIndex = 0;
let currentLang = "en";

// ── All portfolio images ─────────────────────────────────────
const portfolioImages = [
  "images/portfolio_new1.jpeg",
  "images/portfolio_new2.jpeg",
  "images/0000000000.jpg",
  "images/10152.jpg",
  "images/120.jpg",
  "images/2010.jpg",
  "images/8108.jpg",
  "images/8144.jpg",
  "images/portfolio_07.jpeg",
  "images/portfolio_08.jpeg",
  "images/portfolio_09.jpeg",
  "images/portfolio_10.jpeg",
  "images/portfolio_11.jpeg",
  "images/portfolio_12.jpeg",
  "images/portfolio_13.jpeg",
  "images/portfolio_14.jpeg",
  "images/portfolio_15.jpeg",
  "images/portfolio_16.jpeg",
  "images/portfolio_17.jpeg",
  "images/portfolio_18.jpeg",
  "images/portfolio_19.jpeg",
  "images/portfolio_20.jpeg",
  "images/portfolio_21.jpeg",
  "images/portfolio_22.jpeg",
  "images/portfolio_23.jpeg",
  "images/portfolio_24.jpeg",
  "images/portfolio_25.jpeg",
  "images/portfolio_26.jpeg",
  "images/portfolio_27.jpeg",
  "images/portfolio_28.jpeg",
  "images/portfolio_29.jpeg",
  "images/portfolio_30.jpeg",
  "images/portfolio_31.jpeg",
  "images/portfolio_32.jpeg",
  "images/portfolio_33.jpeg",
  "images/portfolio_34.jpeg",
  "images/portfolio_35.jpeg",
  "images/portfolio_36.jpeg",
  "images/portfolio_37.jpeg",
  "images/portfolio_38.jpeg",
  "images/portfolio_39.jpeg",
  "images/portfolio_40.jpeg",
  "images/portfolio_41.jpeg",
];

// ── Build image portfolio item ───────────────────────────────
function buildImageItem(imgSrc) {
  const imageName = imgSrc.split("/").pop();
  const waMsg = encodeURIComponent(
    currentLang === "ar"
      ? `مرحباً يوسف طربو، أرغب في الاستفسار عن هذا العمل: ${imageName}`
      : `Hello Youssef Tarbo, I am inquiring about this specific design: ${imageName}`
  );
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;
  const inquireLabel = currentLang === "ar" ? "استفسر الآن" : "Inquire Now";
  const item = document.createElement("div");
  item.className = "portfolio-item reveal";
  item.innerHTML = `
    <img src="${imgSrc}" alt="Youssef Tarbo Portfolio" loading="lazy" />
    <div class="portfolio-overlay">
      <a href="${waUrl}" target="_blank" rel="noopener" class="portfolio-wa-btn">
        <div class="portfolio-wa-icon"><i class="fab fa-whatsapp"></i></div>
        <span>${inquireLabel}</span>
      </a>
    </div>`;
  return item;
}

// ── Build video card for dedicated Videos section ────────────
const videoFiles = ["video.mp4"];

function buildVideoCard(videoSrc, index) {
  const waMsg = encodeURIComponent(
    currentLang === "ar"
      ? `مرحباً يوسف طربو، أرغب في الاستفسار عن الفيديو الترويجي رقم ${index + 1}.`
      : `Hello Youssef Tarbo, I am inquiring about promotional video #${index + 1}.`
  );
  const waUrl       = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;
  const playLabel   = currentLang === "ar" ? "تشغيل الفيديو" : "Play Video";
  const badgeLabel  = currentLang === "ar" ? "فيديو ترويجي"  : "Promo Video";
  const inquireLabel = currentLang === "ar" ? "استفسر الآن"  : "Inquire Now";
  const videoId  = `vc-video-${index}`;
  const overlayId = `vc-overlay-${index}`;
  const btnId    = `vc-play-${index}`;

  const card = document.createElement("div");
  card.className = "video-card reveal";
  card.innerHTML = `
    <div class="video-card-inner">
      <video playsinline preload="metadata" id="${videoId}">
        <source src="${videoSrc}" type="video/mp4" />
      </video>
      <div class="vc-badge"><i class="fas fa-play-circle"></i> ${badgeLabel}</div>
      <div class="video-card-overlay" id="${overlayId}">
        <button class="vc-play-btn" id="${btnId}" aria-label="${playLabel}">
          <div class="vc-play-icon"><i class="fas fa-play"></i></div>
          <span class="vc-play-label">${playLabel}</span>
        </button>
        <a href="${waUrl}" target="_blank" rel="noopener" class="vc-wa-btn">
          <i class="fab fa-whatsapp"></i> ${inquireLabel}
        </a>
      </div>
    </div>`;

  setTimeout(() => {
    const vid     = document.getElementById(videoId);
    const overlay = document.getElementById(overlayId);
    const playBtn = document.getElementById(btnId);
    if (vid && playBtn) {
      playBtn.addEventListener("click", (e) => {
        e.preventDefault();
        overlay.classList.add("hidden");
        vid.play();
      });
      vid.addEventListener("pause",  () => overlay.classList.remove("hidden"));
      vid.addEventListener("ended",  () => overlay.classList.remove("hidden"));
    }
  }, 100);

  return card;
}

// ── Load portfolio image items ───────────────────────────────
function loadPortfolioItems(count) {
  const grid = document.getElementById("portfolioGrid");
  const end  = Math.min(currentIndex + count, portfolioImages.length);
  for (let i = currentIndex; i < end; i++) {
    grid.appendChild(buildImageItem(portfolioImages[i]));
  }
  currentIndex = end;
  if (currentIndex >= portfolioImages.length) {
    const btn = document.getElementById("loadMoreBtn");
    if (btn) btn.style.display = "none";
  }
  setTimeout(observeReveal, 50);
}

// ── Init image-only portfolio ────────────────────────────────
function initPortfolio() {
  const grid = document.getElementById("portfolioGrid");
  if (!grid) return;
  grid.innerHTML = "";
  currentIndex = 0;
  loadPortfolioItems(INITIAL_LOAD);
  const btn = document.getElementById("loadMoreBtn");
  if (btn) btn.style.display = currentIndex < portfolioImages.length ? "" : "none";
}

// ── Init dedicated Videos section ───────────────────────────
function initVideos() {
  const grid = document.getElementById("videosGrid");
  if (!grid) return;
  grid.innerHTML = "";
  videoFiles.forEach((src, i) => grid.appendChild(buildVideoCard(src, i)));
  setTimeout(observeReveal, 50);
}

// ── Load More ────────────────────────────────────────────────
// (wired inside DOMContentLoaded below)

// ── Navbar scroll ────────────────────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

// ── Mobile nav ───────────────────────────────────────────────
const navToggle = document.getElementById("navToggle");
const navMobile = document.getElementById("navMobile");
navToggle.addEventListener("click", () => {
  navMobile.classList.toggle("open");
  const spans = navToggle.querySelectorAll("span");
  const isOpen = navMobile.classList.contains("open");
  spans[0].style.transform = isOpen ? "rotate(45deg) translate(5px,5px)" : "";
  spans[1].style.opacity   = isOpen ? "0" : "";
  spans[2].style.transform = isOpen ? "rotate(-45deg) translate(5px,-5px)" : "";
});
document.querySelectorAll(".nav-mobile a").forEach(link => {
  link.addEventListener("click", () => {
    navMobile.classList.remove("open");
    navToggle.querySelectorAll("span").forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
  });
});

// ── Scroll Reveal ────────────────────────────────────────────
function observeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.06, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal:not(.visible)").forEach(el => observer.observe(el));
}
function initReveal() {
  [".about-text",".about-card",".service-item",".info-block",".contact-form",".footer-brand",".footer-links",".footer-contact"]
    .forEach(sel => {
      document.querySelectorAll(sel).forEach((el, i) => {
        el.classList.add("reveal");
        if (i === 1) el.classList.add("reveal-delay-1");
        if (i === 2) el.classList.add("reveal-delay-2");
        if (i === 3) el.classList.add("reveal-delay-3");
      });
    });
  observeReveal();
}

// ── Active nav highlight ─────────────────────────────────────
const sections  = document.querySelectorAll("section[id]");
const navLinks  = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 120) current = sec.id; });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute("href") === `#${current}` ? "var(--accent)" : "";
  });
});

// ── Contact Form → WhatsApp ──────────────────────────────────
function sendToWhatsApp() {
  const name    = document.getElementById("nameInput").value.trim();
  const phone   = document.getElementById("phoneInput").value.trim();
  const message = document.getElementById("messageInput").value.trim();
  let valid = true;

  ["name","phone","message"].forEach(f => {
    document.getElementById(`${f}Input`).classList.remove("error");
    document.getElementById(`${f}Error`).textContent = "";
  });

  const isAr = currentLang === "ar";
  if (!name || name.length < 2) {
    document.getElementById("nameInput").classList.add("error");
    document.getElementById("nameError").textContent = isAr ? "يرجى إدخال اسمك الكامل." : "Please enter your full name.";
    valid = false;
  }
  if (!phone || phone.replace(/\D/g,"").length < 8) {
    document.getElementById("phoneInput").classList.add("error");
    document.getElementById("phoneError").textContent = isAr ? "يرجى إدخال رقم هاتف صحيح." : "Please enter a valid phone number.";
    valid = false;
  }
  if (!message || message.length < 10) {
    document.getElementById("messageInput").classList.add("error");
    document.getElementById("messageError").textContent = isAr ? "يرجى وصف مشروعك (10 أحرف على الأقل)." : "Please describe your project (at least 10 characters).";
    valid = false;
  }
  if (!valid) return;

  const fullMsg = isAr
    ? `مرحباً يوسف طربو! 👋\n\n📛 الاسم: ${name}\n📞 الهاتف: ${phone}\n\n💬 الرسالة:\n${message}`
    : `Hello Youssef Tarbo! 👋\n\n📛 Name: ${name}\n📞 Phone: ${phone}\n\n💬 Message:\n${message}`;

  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(fullMsg)}`, "_blank");

  const btn = document.getElementById("sendBtn");
  const orig = btn.innerHTML;
  btn.innerHTML = `<i class="fas fa-check"></i> ${isAr ? "تم الإرسال!" : "Sent!"}`;
  btn.style.background = "var(--wa)";
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = orig; btn.style.background = ""; btn.disabled = false;
    document.getElementById("nameInput").value    = "";
    document.getElementById("phoneInput").value   = "";
    document.getElementById("messageInput").value = "";
  }, 3000);
}

// ── Language Switcher (EN ↔ AR, full RTL) ───────────────────
(function () {
  function applyLang(lang) {
    currentLang = lang;
    const isAr  = lang === "ar";

    // Flip HTML dir + lang
    document.documentElement.setAttribute("dir",  isAr ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);

    // Swap all [data-en] / [data-ar] text content
    document.querySelectorAll("[data-en]").forEach(el => {
      const val = isAr ? el.getAttribute("data-ar") : el.getAttribute("data-en");
      if (val === null || val === "") return;
      if (el.children.length === 0) {
        el.textContent = val;
      } else {
        // Element has child nodes (e.g. <span class="accent">) — update only text nodes
        el.childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) node.textContent = "";
        });
        el.insertAdjacentText("afterbegin", val + " ");
      }
    });

    // Update input placeholders
    document.querySelectorAll("[data-placeholder-en]").forEach(el => {
      el.placeholder = isAr
        ? (el.getAttribute("data-placeholder-ar") || "")
        : (el.getAttribute("data-placeholder-en") || "");
    });

    // Toggle button state
    document.querySelector(".lang-en").classList.toggle("active", !isAr);
    document.querySelector(".lang-ar").classList.toggle("active",  isAr);

    // Re-render portfolio and videos so WA messages and labels switch language
    initPortfolio();
    initVideos();

    // Re-trigger scroll reveal for new items
    setTimeout(observeReveal, 100);
  }

  document.getElementById("langToggle").addEventListener("click", () => {
    applyLang(currentLang === "en" ? "ar" : "en");
  });
})();

// ── Init ─────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initPortfolio();
  initVideos();
  initReveal();
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) loadMoreBtn.addEventListener("click", () => loadPortfolioItems(9));
});
