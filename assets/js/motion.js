(function () {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var root = document.documentElement;

    root.classList.add("motion-enhanced");

    function $$(selector, scope) {
        return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
    }

    function installScrollProgress() {
        var progress = document.createElement("div");
        progress.className = "motion-progress";
        progress.setAttribute("aria-hidden", "true");
        document.body.prepend(progress);

        function update() {
            var max = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
        }

        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        update();
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

    function prepareReveal(element) {
        if (!element || element.dataset.motionReveal === "true") return;
        element.dataset.motionReveal = "true";
        element.style.opacity = "0";
        element.style.transform = "translateY(18px)";
        element.style.filter = "blur(6px)";
    }

    function reveal(element) {
        if (!element || element.dataset.motionShown === "true") return;
        element.dataset.motionShown = "true";
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
        element.style.filter = "blur(0)";
    }

    function installRevealAnimations() {
        if (!("IntersectionObserver" in window) || reduceMotion) return;

        var groups = [
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
        ];

        var items = $$(".section-head, .section-cta, .fit-panel, .contact-intro, .contact-card");
        groups.forEach(function (group) {
            var container = document.querySelector(group[0]);
            if (container) items = items.concat($$(group[1], container));
        });

        items.forEach(prepareReveal);

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    reveal(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });

        items.forEach(function (item) {
            observer.observe(item);
        });
    }

    if (!reduceMotion) installScrollProgress();
    installHeaderState();
    installRevealAnimations();
})();
