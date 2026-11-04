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
    var labelled = document.querySelectorAll("[data-en-label]");
    labelled.forEach(function (el) {
        el.setAttribute("data-id-label", el.getAttribute("aria-label"));
    });

    var metadata = document.querySelectorAll("[data-en-content]");
    metadata.forEach(function (el) {
        el.setAttribute("data-id-content", el.getAttribute("content"));
    });

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
            // Keep the initial Indonesian DOM intact; only rebuild changed text.
            if (el.innerHTML !== html) el.innerHTML = html;
        });

        document.documentElement.setAttribute("lang", toEnglish ? "en" : "id");
        metadata.forEach(function (el) {
            el.setAttribute("content", el.getAttribute(toEnglish ? "data-en-content" : "data-id-content"));
        });
        labelled.forEach(function (el) {
            el.setAttribute("aria-label", el.getAttribute(toEnglish ? "data-en-label" : "data-id-label"));
        });

        document.querySelectorAll(".lang-switch button").forEach(function (btn) {
            btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
            btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === lang));
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
        if (isOpen) {
            var firstFocusable = menu.querySelector('a, button:not([disabled])');
            if (firstFocusable) firstFocusable.focus();
        }
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

        if (event.key === "Tab" && menu.classList.contains("is-open")) {
            var focusable = Array.from(menu.querySelectorAll('a, button:not([disabled])'));
            focusable.unshift(toggle);
            if (!focusable.length) return;
            var first = focusable[0];
            var last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 1200 && menu.classList.contains("is-open")) {
            closeMenu(false);
        }
    });
})();

// Program category filter + desktop/mobile "show more" expansion.
(function () {
    var grid = document.querySelector(".program-grid");
    var chips = document.querySelectorAll(".filter-chip");
    var divisionCards = document.querySelectorAll(".division-card[data-division-filter]");
    var cards = document.querySelectorAll(".program-card");
    var moreBtn = document.getElementById("program-more-btn");
    if (!grid || !chips.length || !cards.length) return;

    var expanded = false;
    var activeFilter = "all";

    function updateMoreLabel() {
        if (!moreBtn) return;
        moreBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
        moreBtn.classList.toggle("is-expanded", expanded);
        var labelSpan = moreBtn.querySelector("span");
        var en = currentLang === "en";
        var key = expanded
            ? (en ? "data-less-en" : "data-less")
            : (en ? "data-more-en" : "data-more");
        if (labelSpan) labelSpan.textContent = moreBtn.getAttribute(key);
    }

    function matchesCategory(card, filter) {
        if (filter === "all") return true;
        var primary = card.getAttribute("data-category");
        if (primary === filter) return true;
        var extra = card.getAttribute("data-categories");
        if (!extra) return false;
        return extra.split(/\s+/).indexOf(filter) !== -1;
    }

    function applyFilter(filter, scrollToFilter) {
        activeFilter = filter;

        chips.forEach(function (c) {
            c.classList.toggle("is-active", c.getAttribute("data-filter") === filter);
            c.setAttribute("aria-pressed", String(c.getAttribute("data-filter") === filter));
        });

        divisionCards.forEach(function (d) {
            d.classList.toggle("is-active", d.getAttribute("data-division-filter") === filter);
            d.setAttribute("aria-pressed", String(d.getAttribute("data-division-filter") === filter));
        });

        cards.forEach(function (card) {
            var match = matchesCategory(card, filter);
            card.classList.toggle("is-hidden", !match);
        });

        if (filter === "all") {
            expanded = false;
            grid.classList.remove("show-all");
            if (moreBtn) {
                moreBtn.style.display = "";
                updateMoreLabel();
            }
        } else {
            grid.classList.add("show-all");
            if (moreBtn) moreBtn.style.display = "none";
        }

        if (scrollToFilter) {
            var filterBar = document.querySelector(".program-filter-bar");
            if (filterBar) {
                filterBar.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
            }
        }
    }

    chips.forEach(function (chip) {
        chip.addEventListener("click", function () {
            applyFilter(chip.getAttribute("data-filter"), false);
        });
    });

    divisionCards.forEach(function (divCard) {
        divCard.addEventListener("click", function () {
            var targetFilter = divCard.getAttribute("data-division-filter");
            var nextFilter = activeFilter === targetFilter ? "all" : targetFilter;
            applyFilter(nextFilter, true);
        });
        divCard.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                divCard.click();
            }
        });
    });

    if (moreBtn) {
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
    applyFilter("all", false);
})();

// Documentation gallery "show more" expansion.
(function () {
    var gallery = document.querySelector(".asset-gallery");
    var moreBtn = document.getElementById("asset-more-btn");
    if (!gallery || !moreBtn) return;

    var expanded = false;

    function updateMoreLabel() {
        moreBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
        moreBtn.classList.toggle("is-expanded", expanded);
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
        hero: false,
        comparison: false
    };

    function syncVisibility() {
        waFloat.classList.toggle("is-hidden", hidden.footer || ((hidden.hero || hidden.comparison) && mobileQuery.matches));
    }

    var footerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            hidden.footer = entry.isIntersecting;
            syncVisibility();
        });
    }, { threshold: 0.05 });

    footerObserver.observe(footer);

    var comparison = document.getElementById("why");
    if (comparison) {
        var comparisonObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                hidden.comparison = entry.isIntersecting;
                syncVisibility();
            });
        });
        comparisonObserver.observe(comparison);
    }

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
        var current = null;
        for (var i = 0; i < sections.length; i++) {
            if (sections[i].section.offsetTop <= pos) current = sections[i];
        }
        navLinks.forEach(function (l) {
            l.classList.remove("is-active");
            l.removeAttribute("aria-current");
        });
        if (current) {
            current.link.classList.add("is-active");
            current.link.setAttribute("aria-current", "location");
        }
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
})();
