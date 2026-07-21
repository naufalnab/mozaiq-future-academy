(function () {
  "use strict";

  var pageConfig = {
    contact: {
      whatsappNumber: "6287815892929",
      messages: {
        en: "Hello Mozaiq, I would like to discuss bringing AI Creative Media Academy to my school.",
        id: "Halo Mozaiq, saya ingin mendiskusikan program AI Creative Media Academy untuk sekolah saya.",
      },
    },
    quickInformation: [
      { icon: "graduation-cap", label: { en: "Recommended grade or age", id: "Rekomendasi kelas atau usia" }, value: null },
      { icon: "users-round", label: { en: "Class format", id: "Format kelas" }, value: null },
      {
        icon: "calendar-check",
        label: { en: "Number of meetings", id: "Jumlah pertemuan" },
        value: { en: "16 meetings", id: "16 pertemuan" },
      },
      {
        icon: "clock",
        label: { en: "Meeting duration", id: "Durasi pertemuan" },
        value: { en: "60 minutes each", id: "60 menit per sesi" },
      },
      {
        icon: "trophy",
        label: { en: "Final student output", id: "Hasil akhir siswa" },
        value: { en: "One presentation-ready video", id: "Satu video siap presentasi" },
      },
      { icon: "users", label: { en: "Suggested class size", id: "Saran ukuran kelas" }, value: null },
      { icon: "clipboard-list", label: { en: "Prerequisites", id: "Prasyarat" }, value: null },
      { icon: "messages-square", label: { en: "Language", id: "Bahasa" }, value: null },
      { icon: "handshake", label: { en: "What Mozaiq provides", id: "Yang disediakan Mozaiq" }, value: null },
      { icon: "clipboard-list", label: { en: "What the school prepares", id: "Yang disiapkan sekolah" }, value: null },
    ],
    meetingFlow: [
      {
        minutes: 5,
        color: "#a78bfa",
        title: { en: "Opening", id: "Pembukaan" },
        copy: { en: "Connect the theme to students’ experiences.", id: "Menghubungkan tema dengan pengalaman siswa." },
      },
      {
        minutes: 8,
        color: "#60a5fa",
        title: { en: "Teacher Demo", id: "Demo Guru" },
        copy: { en: "See the process through one clear example.", id: "Melihat proses melalui satu contoh yang jelas." },
      },
      {
        minutes: 7,
        color: "#22d3ee",
        title: { en: "Guided Practice", id: "Latihan Bersama" },
        copy: { en: "Try the concept together with support.", id: "Mencoba konsep bersama dengan pendampingan." },
      },
      {
        minutes: 35,
        color: "#5eead4",
        primary: true,
        title: { en: "Individual Creation", id: "Kreasi Individu" },
        copy: { en: "Build the next part of each student’s project.", id: "Membangun bagian berikutnya dari proyek masing-masing." },
      },
      {
        minutes: 5,
        color: "#eabf54",
        title: { en: "Save & Reflect", id: "Simpan & Refleksi" },
        copy: { en: "Organize files and identify the next improvement.", id: "Merapikan file dan menentukan perbaikan berikutnya." },
      },
    ],
    faqs: [
      {
        question: { en: "Who is this program for?", id: "Untuk siapa program ini?" },
        answer: {
          en: "It is structured as a guided school program for students who will develop one creative media project across 16 meetings.",
          id: "Program ini disusun sebagai program sekolah terpandu bagi siswa untuk mengembangkan satu proyek media kreatif selama 16 pertemuan.",
        },
      },
      {
        question: { en: "Do students need prior AI or editing experience?", id: "Apakah siswa memerlukan pengalaman AI atau editing sebelumnya?" },
        answer: null,
      },
      {
        question: { en: "What equipment is required?", id: "Peralatan apa yang diperlukan?" },
        answer: null,
      },
      {
        question: { en: "How many students can join?", id: "Berapa banyak siswa yang dapat bergabung?" },
        answer: null,
      },
      {
        question: { en: "Who teaches the sessions?", id: "Siapa yang mengajar setiap sesi?" },
        answer: null,
      },
      {
        question: { en: "What will students complete?", id: "Apa yang akan diselesaikan siswa?" },
        answer: {
          en: "Students complete a developed story concept, a structured storyboard, consistent visual scenes, and one presentation-ready video.",
          id: "Siswa menyelesaikan konsep cerita yang matang, storyboard terstruktur, rangkaian visual konsisten, dan satu video siap presentasi.",
        },
      },
      {
        question: { en: "How is responsible AI taught?", id: "Bagaimana penggunaan AI yang bertanggung jawab diajarkan?" },
        answer: {
          en: "Responsible use is integrated into the workflow through teacher-guided review of privacy, safety, accuracy, respectful content, and the final work before sharing.",
          id: "Penggunaan yang bertanggung jawab terintegrasi dalam alur kerja melalui review dengan panduan guru mengenai privasi, keamanan, akurasi, konten yang menghargai, dan karya final sebelum dibagikan.",
        },
      },
      {
        question: { en: "Can the program be adapted to the school schedule?", id: "Apakah program dapat disesuaikan dengan jadwal sekolah?" },
        answer: null,
      },
    ],
    trust: {
      schoolLogos: [],
      testimonials: [],
      teacherProfiles: [],
      studentProjects: [],
      programDocumentation: [],
    },
    metadata: {
      en: {
        title: "AI Creative Media Academy | 16-Meeting School Program",
        description: "A guided 16-meeting school program where students develop a story, create consistent visuals, edit a video, and present one complete AI-assisted project responsibly.",
      },
      id: {
        title: "AI Creative Media Academy | Program Sekolah 16 Pertemuan",
        description: "Program sekolah 16 pertemuan yang membimbing siswa mengembangkan cerita, membuat visual konsisten, menyunting video, dan mempresentasikan satu proyek berbantuan AI secara bertanggung jawab.",
      },
    },
  };

  window.aiProgramConfig = pageConfig;

  var body = document.body;
  var currentLang = document.documentElement.lang === "id" ? "id" : "en";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function localized(value) {
    return value && (value[currentLang] || value.en || value.id) || "";
  }

  function syncMetadata() {
    var metadata = pageConfig.metadata[currentLang];
    document.title = metadata.title;
    var description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", metadata.description);
  }

  function syncLocalizedAttributes() {
    document.querySelectorAll("[data-aria-en]").forEach(function (element) {
      var next = element.getAttribute(currentLang === "id" ? "data-aria-id" : "data-aria-en");
      if (next) element.setAttribute("aria-label", next);
    });

    document.querySelectorAll(".lang-switch button").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-lang") === currentLang ? "true" : "false");
    });

    var menuToggle = document.querySelector(".nav-toggle");
    if (menuToggle) {
      var open = menuToggle.getAttribute("aria-expanded") === "true";
      var key = "data-aria-" + (open ? "close" : "open") + "-" + currentLang;
      menuToggle.setAttribute("aria-label", menuToggle.getAttribute(key));
    }
  }

  function syncWhatsAppLinks() {
    var directUrl = "https://wa.me/" + pageConfig.contact.whatsappNumber;
    var schoolUrl = directUrl + "?text=" + encodeURIComponent(pageConfig.contact.messages[currentLang]);
    document.querySelectorAll("[data-whatsapp]").forEach(function (link) {
      link.href = link.getAttribute("data-whatsapp") === "direct" ? directUrl : schoolUrl;
    });
  }

  function renderQuickInformation() {
    var section = document.getElementById("program-information");
    var grid = document.getElementById("program-information-grid");
    if (!section || !grid) return;
    var validItems = pageConfig.quickInformation.filter(function (item) {
      return item.value && localized(item.value);
    });
    grid.innerHTML = validItems.map(function (item) {
      return '<div class="program-information-item">' +
        '<span class="program-information-icon"><i data-lucide="' + escapeHtml(item.icon) + '" class="icon" aria-hidden="true"></i></span>' +
        '<div><dt>' + escapeHtml(localized(item.label)) + '</dt><dd>' + escapeHtml(localized(item.value)) + '</dd></div>' +
      '</div>';
    }).join("");
    section.hidden = validItems.length === 0;
  }

  function renderMeetingFlow() {
    var list = document.getElementById("meeting-flow");
    var totalElement = document.getElementById("meeting-total");
    if (!list || !totalElement) return;
    var total = pageConfig.meetingFlow.reduce(function (sum, step) { return sum + step.minutes; }, 0);
    totalElement.textContent = String(total);
    list.setAttribute("aria-label", currentLang === "id" ? "Struktur pertemuan " + total + " menit" : total + "-minute meeting structure");
    list.innerHTML = pageConfig.meetingFlow.map(function (step, index) {
      return '<li' + (step.primary ? ' class="is-primary"' : "") + ' style="--step-color:' + step.color + ';--minutes:' + step.minutes + '">' +
        '<span class="timeline-minute">' + step.minutes + ' <small>' + (currentLang === "id" ? "MNT" : "MIN") + '</small></span>' +
        '<span class="timeline-marker">' + String(index + 1).padStart(2, "0") + '</span>' +
        '<div><h3>' + escapeHtml(localized(step.title)) + '</h3><p>' + escapeHtml(localized(step.copy)) + '</p></div>' +
      '</li>';
    }).join("");
  }

  function renderTrustContent() {
    var section = document.getElementById("trust-content");
    var grid = document.getElementById("trust-content-grid");
    if (!section || !grid) return;
    var categoryLabels = {
      schoolLogos: { en: "Schools", id: "Sekolah" },
      testimonials: { en: "Testimonials", id: "Testimoni" },
      teacherProfiles: { en: "Teacher profiles", id: "Profil pengajar" },
      studentProjects: { en: "Student projects", id: "Proyek siswa" },
      programDocumentation: { en: "Program documentation", id: "Dokumentasi program" },
    };
    var groups = Object.keys(pageConfig.trust).filter(function (key) {
      return Array.isArray(pageConfig.trust[key]) && pageConfig.trust[key].length > 0;
    });
    grid.innerHTML = groups.map(function (key) {
      var items = pageConfig.trust[key].map(function (item) {
        var image = item.image || item.logo || item.src;
        var title = item.name || item.title || item.attribution || "";
        var copy = item.quote || item.copy || item.role || "";
        return '<article class="trust-item">' +
          (image ? '<img src="' + escapeHtml(image) + '" alt="' + escapeHtml(item.alt || title) + '" loading="lazy" decoding="async">' : "") +
          (title ? '<strong>' + escapeHtml(title) + '</strong>' : "") +
          (copy ? '<p>' + escapeHtml(copy) + '</p>' : "") +
        '</article>';
      }).join("");
      return '<section class="trust-group" aria-label="' + escapeHtml(localized(categoryLabels[key])) + '"><h3>' + escapeHtml(localized(categoryLabels[key])) + '</h3><div>' + items + '</div></section>';
    }).join("");
    section.hidden = groups.length === 0;
  }

  function renderFaqs() {
    var list = document.getElementById("faq-list");
    if (!list) return;
    list.innerHTML = pageConfig.faqs.filter(function (item) {
      return item.answer && localized(item.question) && localized(item.answer);
    }).map(function (item) {
      return '<details><summary>' + escapeHtml(localized(item.question)) + '</summary><p>' + escapeHtml(localized(item.answer)) + '</p></details>';
    }).join("");
  }

  function refreshIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  var projectTabs = Array.from(document.querySelectorAll("[data-project-tab]"));
  var projectPanels = Array.from(document.querySelectorAll("[data-project-panel]"));
  var activeProjectState = "idea";

  function setProjectState(state, focusTab) {
    if (!projectTabs.some(function (tab) { return tab.getAttribute("data-project-tab") === state; })) return;
    activeProjectState = state;
    projectTabs.forEach(function (tab) {
      var active = tab.getAttribute("data-project-tab") === state;
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
      tab.classList.toggle("is-active", active);
      if (active && focusTab) tab.focus();
    });
    projectPanels.forEach(function (panel) {
      var active = panel.getAttribute("data-project-panel") === state;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
  }

  projectTabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () { setProjectState(tab.getAttribute("data-project-tab"), false); });
    tab.addEventListener("keydown", function (event) {
      if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      var nextIndex = index;
      if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = projectTabs.length - 1;
      else if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (index + 1) % projectTabs.length;
      else nextIndex = (index - 1 + projectTabs.length) % projectTabs.length;
      setProjectState(projectTabs[nextIndex].getAttribute("data-project-tab"), true);
    });
  });

  document.querySelectorAll("[data-project-target]").forEach(function (button) {
    button.addEventListener("click", function () {
      setProjectState(button.getAttribute("data-project-target"), false);
      var preview = document.querySelector(".sample-project-preview");
      if (preview && window.innerWidth < 760) preview.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
    });
  });

  var phaseTabs = Array.from(document.querySelectorAll("[data-phase-tab]"));
  var phasePanels = Array.from(document.querySelectorAll(".syllabus-phase"));
  var openMeetings = new Set();
  var activePhase = "phase-1";

  function phaseRange(phaseId) {
    var number = Number(phaseId.replace("phase-", ""));
    return [[1, 5], [6, 9], [10, 13], [14, 16]][number - 1] || [1, 5];
  }

  function meetingBelongsToPhase(meeting, phaseId) {
    var range = phaseRange(phaseId);
    return meeting >= range[0] && meeting <= range[1];
  }

  function syncMeetingPanels() {
    document.querySelectorAll(".meeting-accordion").forEach(function (article) {
      var meeting = Number(article.getAttribute("data-meeting"));
      var button = article.querySelector(".meeting-toggle");
      var panel = document.getElementById(button.getAttribute("aria-controls"));
      var expanded = openMeetings.has(meeting);
      button.setAttribute("aria-expanded", expanded ? "true" : "false");
      panel.classList.toggle("is-collapsed", !expanded);
      panel.setAttribute("aria-hidden", expanded ? "false" : "true");
      panel.inert = !expanded;
    });
  }

  function updateCurriculumHash(meeting) {
    var hash = "#curriculum/" + activePhase + (meeting ? "/meeting-" + meeting : "");
    history.replaceState(null, "", hash);
  }

  function setActivePhase(phaseId, options) {
    options = options || {};
    if (!phasePanels.some(function (panel) { return panel.id === phaseId; })) return;
    activePhase = phaseId;
    phaseTabs.forEach(function (tab) {
      var active = tab.getAttribute("data-phase-tab") === phaseId;
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
      tab.classList.toggle("is-active", active);
      if (active && options.focusTab) tab.focus();
    });
    phasePanels.forEach(function (panel) { panel.hidden = panel.id !== phaseId; });

    if (options.meeting) {
      openMeetings.clear();
      openMeetings.add(options.meeting);
    } else if (options.openFirst !== false) {
      var range = phaseRange(phaseId);
      openMeetings.clear();
      openMeetings.add(range[0]);
    }
    syncMeetingPanels();
    if (options.updateHash) updateCurriculumHash(options.meeting);
  }

  phaseTabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      setActivePhase(tab.getAttribute("data-phase-tab"), { openFirst: true, updateHash: true });
    });
    tab.addEventListener("keydown", function (event) {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      var nextIndex = index;
      if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = phaseTabs.length - 1;
      else if (event.key === "ArrowRight") nextIndex = (index + 1) % phaseTabs.length;
      else nextIndex = (index - 1 + phaseTabs.length) % phaseTabs.length;
      setActivePhase(phaseTabs[nextIndex].getAttribute("data-phase-tab"), { openFirst: true, updateHash: true, focusTab: true });
    });
  });

  document.getElementById("syllabus-content").addEventListener("click", function (event) {
    var button = event.target.closest(".meeting-toggle");
    if (!button) return;
    var article = button.closest(".meeting-accordion");
    var meeting = Number(article.getAttribute("data-meeting"));
    if (openMeetings.has(meeting)) {
      openMeetings.delete(meeting);
      updateCurriculumHash();
    } else {
      openMeetings.add(meeting);
      updateCurriculumHash(meeting);
    }
    syncMeetingPanels();
  });

  document.querySelectorAll("[data-accordion-action]").forEach(function (button) {
    button.addEventListener("click", function () {
      var range = phaseRange(activePhase);
      if (button.getAttribute("data-accordion-action") === "expand") {
        for (var meeting = range[0]; meeting <= range[1]; meeting += 1) openMeetings.add(meeting);
      } else {
        for (var number = range[0]; number <= range[1]; number += 1) openMeetings.delete(number);
      }
      syncMeetingPanels();
      updateCurriculumHash();
    });
  });

  function applyDeepLink(shouldScroll) {
    var match = window.location.hash.match(/^#curriculum\/phase-([1-4])(?:\/meeting-(\d{1,2}))?$/);
    if (!match) return false;
    var phaseId = "phase-" + match[1];
    var meeting = match[2] ? Number(match[2]) : null;
    if (meeting && !meetingBelongsToPhase(meeting, phaseId)) meeting = null;
    setActivePhase(phaseId, { meeting: meeting, openFirst: !meeting, updateHash: false });
    if (shouldScroll) {
      window.requestAnimationFrame(function () {
        var curriculum = document.getElementById("curriculum");
        curriculum.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
        if (meeting) {
          window.setTimeout(function () {
            var target = document.getElementById("meeting-" + meeting);
            if (target) target.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "center" });
          }, reduceMotion.matches ? 0 : 280);
        }
      });
    }
    return true;
  }

  window.addEventListener("hashchange", function () { applyDeepLink(true); });

  var navSections = ["program", "outcomes", "curriculum", "why-it-matters"];
  var scrollTicking = false;
  function syncNavigationAndChrome() {
    scrollTicking = false;
    var position = window.scrollY + 150;
    var currentSection = navSections[0];
    navSections.forEach(function (id) {
      var section = document.getElementById(id);
      if (section && section.offsetTop <= position) currentSection = id;
    });
    document.querySelectorAll('.nav-links a[href^="#"], .mobile-menu > a[href^="#"]').forEach(function (link) {
      var active = link.getAttribute("href") === "#" + currentSection;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });

    var header = document.querySelector(".ai-header");
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
    var sticky = document.querySelector(".mobile-sticky-cta");
    var hero = document.querySelector(".ai-hero");
    var finalCta = document.getElementById("school-cta");
    var footer = document.querySelector(".site-footer");
    if (sticky && hero && finalCta && footer) {
      var pastHero = window.scrollY > hero.offsetTop + hero.offsetHeight - 120;
      var finalVisible = finalCta.getBoundingClientRect().top < window.innerHeight && finalCta.getBoundingClientRect().bottom > 0;
      var footerVisible = footer.getBoundingClientRect().top < window.innerHeight;
      sticky.classList.toggle("is-visible", window.innerWidth <= 680 && pastHero && !finalVisible && !footerVisible);
    }
  }

  function requestChromeSync() {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(syncNavigationAndChrome);
  }
  window.addEventListener("scroll", requestChromeSync, { passive: true });
  window.addEventListener("resize", requestChromeSync);

  var menuToggle = document.querySelector(".nav-toggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      window.setTimeout(syncLocalizedAttributes, 0);
    });
  }

  function syncLanguage(nextLanguage) {
    currentLang = nextLanguage === "id" ? "id" : "en";
    syncMetadata();
    syncLocalizedAttributes();
    syncWhatsAppLinks();
    renderQuickInformation();
    renderMeetingFlow();
    renderFaqs();
    renderTrustContent();
    refreshIcons();
  }

  document.addEventListener("langchange", function (event) {
    syncLanguage(event.detail && event.detail.lang);
  });

  renderQuickInformation();
  renderMeetingFlow();
  renderFaqs();
  renderTrustContent();
  syncMetadata();
  syncLocalizedAttributes();
  syncWhatsAppLinks();
  setProjectState(activeProjectState, false);
  if (!applyDeepLink(true)) setActivePhase("phase-1", { openFirst: true, updateHash: false });
  body.classList.add("ai-ready");
  refreshIcons();
  syncNavigationAndChrome();
})();
