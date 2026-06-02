(function () {
    var motionImport = import("https://esm.sh/framer-motion@12.40.0/dom");

    motionImport.then(function (motion) {
        var animate = motion.animate;
        var inView = motion.inView;
        var scroll = motion.scroll;
        var stagger = motion.stagger;

        if (!animate || !inView || !stagger) return;

        bootMotion(animate, inView, scroll, stagger);
    }).catch(function () {
        // Keep the static site fully usable if the CDN is unavailable.
    });
})();

function bootMotion(animate, inView, scroll, stagger) {
var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var root = document.documentElement;

root.classList.add("motion-enhanced");

function $$(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
}

function isVisible(element) {
    var style = window.getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden" && element.getClientRects().length > 0;
}

function markForReveal(element) {
    if (!element || element.dataset.motionReveal === "true") return;
    element.dataset.motionReveal = "true";
    element.style.opacity = "0";
    element.style.filter = "blur(8px)";
}

function revealElements(elements, delayStep) {
    var visible = elements.filter(function (element) {
        return isVisible(element) && element.dataset.motionShown !== "true";
    });

    if (!visible.length) return;

    visible.forEach(function (element) {
        element.dataset.motionShown = "true";
    });

    animate(visible, {
        opacity: [0, 1],
        y: [24, 0],
        filter: ["blur(8px)", "blur(0px)"]
    }, {
        duration: 0.64,
        ease: [0.22, 1, 0.36, 1],
        delay: stagger(delayStep || 0.055)
    });
}

function installScrollProgress() {
    var progress = document.createElement("div");
    progress.className = "motion-progress";
    progress.setAttribute("aria-hidden", "true");
    document.body.prepend(progress);

    function updateProgress(value) {
        progress.style.transform = "scaleX(" + value + ")";
    }

    try {
        scroll(function (value) {
            updateProgress(value);
        });
    } catch (error) {
        function updateFallback() {
            var max = document.documentElement.scrollHeight - window.innerHeight;
            updateProgress(max > 0 ? window.scrollY / max : 0);
        }

        window.addEventListener("scroll", updateFallback, { passive: true });
        window.addEventListener("resize", updateFallback);
        updateFallback();
    }
}

function installHeaderState() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    function syncHeader() {
        header.classList.toggle("is-scrolled", window.scrollY > 18);
    }

    window.addEventListener("scroll", syncHeader, { passive: true });
    syncHeader();
}

function animateHero() {
    var heroItems = [
        document.querySelector(".hero .eyebrow"),
        document.querySelector("#hero-title"),
        document.querySelector(".hero-lead"),
        document.querySelector(".hero .actions"),
        document.querySelector(".hero-microcopy"),
        document.querySelector(".hero-stats"),
        document.querySelector(".hero-media")
    ].filter(Boolean);

    animate(heroItems, {
        y: [22, 0],
        filter: ["blur(5px)", "blur(0px)"]
    }, {
        duration: 0.74,
        ease: [0.22, 1, 0.36, 1],
        delay: stagger(0.075, { startDelay: 0.04 })
    });

    var brandMark = document.querySelector(".brand-mark");
    if (brandMark) {
        animate(brandMark, {
            scale: [0.92, 1],
            rotate: [-4, 0]
        }, {
            duration: 0.62,
            ease: [0.22, 1, 0.36, 1]
        });
    }
}

function installHeroParallax() {
    var hero = document.querySelector(".hero");
    var image = document.querySelector(".hero-media img");
    if (!hero || !image) return;

    var ticking = false;

    function update() {
        ticking = false;
        if (window.innerWidth <= 860) {
            image.style.removeProperty("--hero-image-shift");
            return;
        }

        var rect = hero.getBoundingClientRect();
        var progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
        image.style.setProperty("--hero-image-shift", Math.round(progress * 22) + "px");
    }

    function requestUpdate() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();
}

function installRevealAnimations() {
    var singleRevealSelector = [
        ".section-head",
        ".section-cta",
        ".fit-panel",
        ".contact-intro",
        ".contact-card"
    ].join(", ");

    $$(singleRevealSelector).forEach(function (element) {
        markForReveal(element);
        inView(element, function () {
            revealElements([element]);
        }, { amount: 0.22, margin: "0px 0px -12% 0px" });
    });

    [
        [".problem-grid", ".problem-card"],
        [".outcome-grid", ".outcome-card"],
        [".benefit-grid", ".benefit-card"],
        [".steps-grid", ".step-card"],
        [".safety-grid", ".safety-item"],
        [".division-grid", ".division-card"],
        [".program-grid", ".program-card"],
        [".asset-gallery", ".asset-card"],
        [".package-grid", ".package-card"],
        [".faq-list", ".faq-item"],
        [".social-grid", ".social-link"],
        [".contact-list", "li"],
        [".footer-social", "a"]
    ].forEach(function (group) {
        var container = document.querySelector(group[0]);
        if (!container) return;

        var items = $$(group[1], container);
        items.forEach(markForReveal);

        inView(container, function () {
            revealElements(items);
        }, { amount: 0.18, margin: "0px 0px -12% 0px" });
    });

    installRevealSync();
}

function installRevealSync() {
    var ticking = false;

    function isNearViewport(element) {
        var rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight * 0.88 && rect.bottom > window.innerHeight * 0.08;
    }

    function syncVisibleReveals() {
        ticking = false;
        revealElements($$('[data-motion-reveal="true"]').filter(isNearViewport), 0.035);
    }

    function requestSync() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(syncVisibleReveals);
    }

    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);
    window.setTimeout(syncVisibleReveals, 120);
}

function installDynamicReveal() {
    var triggers = ["#program-more-btn", "#asset-more-btn", ".filter-chip"].join(", ");

    document.addEventListener("click", function (event) {
        if (!event.target.closest(triggers)) return;

        window.setTimeout(function () {
            revealElements($$(".program-card, .asset-card"), 0.04);
        }, 40);
    });
}

function installPressMotion() {
    var interactive = $$([".button",
        ".nav-cta",
        ".mobile-cta",
        ".social-link",
        ".footer-social a",
        ".wa-float",
        ".nav-toggle",
        ".lang-switch button"
    ].join(", "));

    interactive.forEach(function (element) {
        element.addEventListener("pointerdown", function () {
            animate(element, { scale: 0.97 }, { duration: 0.12, ease: "easeOut" });
        });

        ["pointerup", "pointerleave", "blur"].forEach(function (eventName) {
            element.addEventListener(eventName, function () {
                animate(element, { scale: 1 }, { duration: 0.18, ease: [0.22, 1, 0.36, 1] });
            });
        });
    });
}

if (!reduceMotion) {
    installScrollProgress();
    installHeaderState();
    animateHero();
    installHeroParallax();
    installRevealAnimations();
    installDynamicReveal();
    installPressMotion();
} else {
    installHeaderState();
}
}
