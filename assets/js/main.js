// Render Lucide icons once the library is available.
if (window.lucide) {
    window.lucide.createIcons();
}

// Set current year in the footer.
var yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Track current language so other features (e.g. show-more button) stay in sync.
var currentLang = document.documentElement.getAttribute("data-default-lang") || "id";

// Language switch. Pages can choose their own default and storage key.
(function () {
    var DEFAULT_LANG = document.documentElement.getAttribute("data-default-lang") || "id";
    var STORAGE_KEY = document.documentElement.getAttribute("data-lang-storage") || "mfa-lang";
    var translatable = document.querySelectorAll("[data-en]");

    // Cache the original Indonesian markup so we can switch back losslessly.
    translatable.forEach(function (el) {
        if (!el.hasAttribute("data-id")) el.setAttribute("data-id", el.innerHTML);
    });

    function applyLang(lang) {
        var toEnglish = lang === "en";
        currentLang = lang;

        translatable.forEach(function (el) {
            // Skip elements whose label is managed dynamically elsewhere.
            if (el.hasAttribute("data-dynamic-label")) return;
            var html = el.getAttribute(toEnglish ? "data-en" : "data-id");
            if (el.matches(".faq-item summary") && html.indexOf("faq-icon") === -1) {
                html += '<i data-lucide="plus" class="icon faq-icon" aria-hidden="true"></i>';
            }
            el.innerHTML = html;
        });

        document.documentElement.setAttribute("lang", toEnglish ? "en" : "id");

        document.querySelectorAll(".lang-switch button").forEach(function (btn) {
            btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
        });

        // Let dependent features refresh their own labels.
        document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));

        if (window.lucide) window.lucide.createIcons();

        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    }

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
        btn.addEventListener("click", function () {
            applyLang(btn.getAttribute("data-lang"));
        });
    });

    var saved = DEFAULT_LANG;
    try { saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; } catch (e) { /* ignore */ }
    if (saved !== "en" && saved !== "id") saved = DEFAULT_LANG;
    applyLang(saved);
})();

// Mobile menu toggle.
(function () {
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.querySelector(".mobile-menu");
    if (!toggle || !menu) return;

    function closeMenu(returnFocus) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        if (returnFocus) toggle.focus();
    }

    toggle.addEventListener("click", function () {
        var isOpen = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            closeMenu(false);
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && menu.classList.contains("is-open")) {
            closeMenu(true);
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 860 && menu.classList.contains("is-open")) {
            closeMenu(false);
        }
    });
})();

// Program category filter + mobile "show more" expansion.
(function () {
    var grid = document.querySelector(".program-grid");
    var chips = document.querySelectorAll(".filter-chip");
    var cards = document.querySelectorAll(".program-card");
    var moreBtn = document.getElementById("program-more-btn");
    if (!grid || !chips.length || !cards.length) return;

    var expanded = false;

    function updateMoreLabel() {
        if (!moreBtn) return;
        var labelSpan = moreBtn.querySelector("span");
        var en = currentLang === "en";
        var key = expanded
            ? (en ? "data-less-en" : "data-less")
            : (en ? "data-more-en" : "data-more");
        if (labelSpan) labelSpan.textContent = moreBtn.getAttribute(key);
    }

    chips.forEach(function (chip) {
        chip.addEventListener("click", function () {
            var filter = chip.getAttribute("data-filter");

            chips.forEach(function (c) { c.classList.remove("is-active"); });
            chip.classList.add("is-active");

            cards.forEach(function (card) {
                var match = filter === "all" || card.getAttribute("data-category") === filter;
                card.classList.toggle("is-hidden", !match);
            });

            if (filter === "all") {
                // Restore the featured-only view on mobile.
                expanded = false;
                grid.classList.remove("show-all");
                if (moreBtn) {
                    moreBtn.style.display = "";
                    updateMoreLabel();
                }
            } else {
                // A specific category reveals all of its matching cards.
                grid.classList.add("show-all");
                if (moreBtn) moreBtn.style.display = "none";
            }
        });
    });

    if (moreBtn) {
        // The span carries data-en, so mark it dynamic to avoid double management.
        var labelSpan = moreBtn.querySelector("span");
        if (labelSpan) labelSpan.setAttribute("data-dynamic-label", "true");

        moreBtn.addEventListener("click", function () {
            expanded = !expanded;
            grid.classList.toggle("show-all", expanded);
            updateMoreLabel();
        });

        document.addEventListener("langchange", updateMoreLabel);
        updateMoreLabel();
    }
})();

// Documentation gallery "show more" expansion.
(function () {
    var gallery = document.querySelector(".asset-gallery");
    var moreBtn = document.getElementById("asset-more-btn");
    if (!gallery || !moreBtn) return;

    var expanded = false;

    function updateMoreLabel() {
        var labelSpan = moreBtn.querySelector("span");
        var en = currentLang === "en";
        var key = expanded
            ? (en ? "data-less-en" : "data-less")
            : (en ? "data-more-en" : "data-more");
        if (labelSpan) labelSpan.textContent = moreBtn.getAttribute(key);
    }

    var labelSpan = moreBtn.querySelector("span");
    if (labelSpan) labelSpan.setAttribute("data-dynamic-label", "true");

    moreBtn.addEventListener("click", function () {
        expanded = !expanded;
        gallery.classList.toggle("show-all", expanded);
        updateMoreLabel();
    });

    document.addEventListener("langchange", updateMoreLabel);
    updateMoreLabel();
})();

// Hide the floating WhatsApp button where it could cover important content.
(function () {
    var waFloat = document.querySelector(".wa-float");
    var footer = document.querySelector(".site-footer");
    var hero = document.querySelector(".hero");
    if (!waFloat || !footer || !("IntersectionObserver" in window)) return;

    var mobileQuery = window.matchMedia("(max-width: 680px)");
    var hidden = {
        footer: false,
        hero: false
    };

    function syncVisibility() {
        waFloat.classList.toggle("is-hidden", hidden.footer || (hidden.hero && mobileQuery.matches));
    }

    var footerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            hidden.footer = entry.isIntersecting;
            syncVisibility();
        });
    }, { threshold: 0.05 });

    footerObserver.observe(footer);

    if (hero) {
        var heroObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                hidden.hero = entry.isIntersecting;
                syncVisibility();
            });
        }, { threshold: 0.05 });

        heroObserver.observe(hero);
    }

    if (mobileQuery.addEventListener) {
        mobileQuery.addEventListener("change", syncVisibility);
    }

    syncVisibility();
})();

// Scrollspy: highlight the nav link for the section currently in view.
(function () {
    var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!navLinks.length) return;

    var sections = [];
    navLinks.forEach(function (link) {
        var id = link.getAttribute("href").slice(1);
        var section = document.getElementById(id);
        if (section) sections.push({ link: link, section: section });
    });
    if (!sections.length) return;

    function update() {
        var pos = window.scrollY + 140;
        var current = sections[0];
        for (var i = 0; i < sections.length; i++) {
            if (sections[i].section.offsetTop <= pos) current = sections[i];
        }
        navLinks.forEach(function (l) { l.classList.remove("is-active"); });
        current.link.classList.add("is-active");
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
})();
