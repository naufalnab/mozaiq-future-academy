(function () {
  var sourceUrls = {
    id: "../silabus/Untitled%20spreadsheet%20-%20Pertemuan.csv",
    en: "../silabus/AI-syllabus-en.csv"
  };
  var container = document.getElementById("syllabus-content");
  if (!container) return;

  var currentLang = document.documentElement.getAttribute("lang") === "id" ? "id" : "en";
  var datasets = {};
  var openMeetings = new Set([1]);
  var openPhases = new Set(["fase-1"]);
  var activePhase = "fase-1";
  var phaseObserver = null;
  var mobileQuery = window.matchMedia("(max-width: 680px)");

  var phaseSets = {
    en: [
      { id: "fase-1", number: "01", range: "MEETINGS 1–5", title: "Story Foundations", summary: "From a first idea to a production-ready storyboard.", start: 1, end: 5 },
      { id: "fase-2", number: "02", range: "MEETINGS 6–9", title: "Visual Production", summary: "From prompt writing to a consistent set of final scene visuals.", start: 6, end: 9 },
      { id: "fase-3", number: "03", range: "MEETINGS 10–13", title: "Video & Editing", summary: "From voice-over and scene assembly to movement, sound, and text.", start: 10, end: 13 },
      { id: "fase-4", number: "04", range: "MEETINGS 14–16", title: "Finalization & Showcase", summary: "From quality and ethics review to export, presentation, and reflection.", start: 14, end: 16 }
    ],
    id: [
      { id: "fase-1", number: "01", range: "PERTEMUAN 1–5", title: "Fondasi Cerita", summary: "Dari ide pertama hingga storyboard yang siap diproduksi.", start: 1, end: 5 },
      { id: "fase-2", number: "02", range: "PERTEMUAN 6–9", title: "Produksi Visual", summary: "Dari penulisan prompt hingga rangkaian visual final yang konsisten.", start: 6, end: 9 },
      { id: "fase-3", number: "03", range: "PERTEMUAN 10–13", title: "Video & Editing", summary: "Dari voice-over dan penyusunan scene hingga gerak, suara, dan teks.", start: 10, end: 13 },
      { id: "fase-4", number: "04", range: "PERTEMUAN 14–16", title: "Finalisasi & Showcase", summary: "Dari review kualitas dan etika hingga export, presentasi, dan refleksi.", start: 14, end: 16 }
    ]
  };

  var labels = {
    en: {
      meeting: "MEETING",
      output: "INDIVIDUAL OUTPUT",
      minute: "min",
      togglePhase: "Toggle phase",
      toggleMeeting: "Toggle details for meeting",
      error: "The curriculum details could not be loaded. Please refresh the page or contact the Mozaiq team for the complete syllabus.",
      title: "AI Creative Media Academy | 16-Meeting School Program",
      description: "A guided 16-meeting school program where students develop a story, create visual scenes, edit a video, and present one complete AI-assisted final project responsibly."
    },
    id: {
      meeting: "PERTEMUAN",
      output: "HASIL INDIVIDU",
      minute: "mnt",
      togglePhase: "Buka atau tutup fase",
      toggleMeeting: "Buka atau tutup detail pertemuan",
      error: "Rincian kurikulum belum dapat dimuat. Silakan muat ulang halaman atau hubungi tim Mozaiq untuk mendapatkan silabus lengkap.",
      title: "AI Creative Media Academy | Program Sekolah 16 Pertemuan",
      description: "Program sekolah 16 pertemuan yang membimbing siswa mengembangkan cerita, membuat visual, mengedit video, dan mempresentasikan satu proyek final berbantuan AI secara bertanggung jawab."
    }
  };

  function parseCsv(text) {
    var rows = [];
    var row = [];
    var value = "";
    var quoted = false;

    for (var i = 0; i < text.length; i += 1) {
      var char = text[i];
      var next = text[i + 1];

      if (char === '"') {
        if (quoted && next === '"') {
          value += '"';
          i += 1;
        } else {
          quoted = !quoted;
        }
      } else if (char === "," && !quoted) {
        row.push(value.trim());
        value = "";
      } else if ((char === "\n" || char === "\r") && !quoted) {
        if (char === "\r" && next === "\n") i += 1;
        row.push(value.trim());
        if (row.some(function (cell) { return cell !== ""; })) rows.push(row);
        row = [];
        value = "";
      } else {
        value += char;
      }
    }

    if (value !== "" || row.length) {
      row.push(value.trim());
      if (row.some(function (cell) { return cell !== ""; })) rows.push(row);
    }

    return rows;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function pad(number) {
    return String(number).padStart(2, "0");
  }

  function shortLabel(label) {
    var aliases = {
      "Latihan bareng dengan contoh": "Latihan bersama",
      "Simpan hasil dan refleksi": "Simpan & refleksi",
      "Guided Practice with Example": "Guided Practice",
      "Save Results and Reflection": "Save & Reflect"
    };
    return aliases[label] || label;
  }

  function getPhaseById(id) {
    return phaseSets[currentLang].filter(function (phase) { return phase.id === id; })[0];
  }

  function renderDetail(description, header, minute, isPrimary) {
    return (
      '<div class="detail-step' + (isPrimary ? ' is-primary' : '') + '">' +
        '<span class="detail-time">' + escapeHtml(minute) + ' ' + labels[currentLang].minute + '</span>' +
        '<b>' + escapeHtml(shortLabel(header)) + '</b>' +
        '<p>' + escapeHtml(description) + '</p>' +
      '</div>'
    );
  }

  function renderMeeting(session, headers, minutes) {
    var number = Number(session[0]);
    var expanded = openMeetings.has(number);
    var panelId = "meeting-panel-" + number;
    var titleId = "meeting-title-" + number;
    var details = session.slice(3, 8).map(function (description, index) {
      var columnIndex = index + 3;
      return renderDetail(description, headers[columnIndex], minutes[columnIndex], columnIndex === 6);
    }).join("");

    return (
      '<article class="meeting-accordion" data-meeting="' + number + '">' +
        '<h4 class="meeting-heading" id="' + titleId + '">' +
          '<button class="meeting-toggle" type="button" aria-expanded="' + expanded + '" aria-controls="' + panelId + '" aria-label="' + labels[currentLang].toggleMeeting + ' ' + number + '">' +
            '<span class="meeting-number">' + pad(number) + '</span>' +
            '<span class="meeting-title"><small>' + labels[currentLang].meeting + ' ' + number + '</small><strong>' + escapeHtml(session[1]) + '</strong></span>' +
            '<span class="meeting-deliverable"><small>' + labels[currentLang].output + '</small><span>' + escapeHtml(session[2]) + '</span></span>' +
            '<i data-lucide="chevron-down" class="icon" aria-hidden="true"></i>' +
          '</button>' +
        '</h4>' +
        '<div class="meeting-panel" id="' + panelId + '" aria-labelledby="' + titleId + '"' + (expanded ? '' : ' hidden') + '>' +
          '<div class="meeting-details">' + details + '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function renderPhase(phase, sessions, headers, minutes, index) {
    var phasePanelId = phase.id + "-meetings";
    var mobileExpanded = openPhases.has(phase.id);
    return (
      '<section id="' + phase.id + '" class="syllabus-phase" data-phase="' + (index + 1) + '" aria-labelledby="' + phase.id + '-title">' +
        '<header class="phase-collapse">' +
          '<span class="phase-title-number">' + phase.number + '</span>' +
          '<div class="phase-heading-copy"><span>' + phase.range + '</span><h3 id="' + phase.id + '-title">' + phase.title + '</h3><span>' + phase.summary + '</span></div>' +
          '<button class="phase-toggle" type="button" aria-expanded="' + mobileExpanded + '" aria-controls="' + phasePanelId + '" aria-label="' + labels[currentLang].togglePhase + ': ' + phase.title + '"><span class="sr-only">' + labels[currentLang].togglePhase + '</span><i data-lucide="chevron-down" class="icon" aria-hidden="true"></i></button>' +
        '</header>' +
        '<div id="' + phasePanelId + '" class="phase-meetings">' + sessions.map(function (session) {
          return renderMeeting(session, headers, minutes);
        }).join("") + '</div>' +
      '</section>'
    );
  }

  function renderCurriculum(rows) {
    var minutes = rows[0];
    var headers = rows[1];
    var sessions = rows.slice(2).filter(function (row) { return /^\d+$/.test(row[0]); });

    if ((headers[0] !== "Pertemuan" && headers[0] !== "Meeting") || sessions.length !== 16) {
      throw new Error("Invalid curriculum structure");
    }

    container.innerHTML = phaseSets[currentLang].map(function (phase, index) {
      var phaseSessions = sessions.filter(function (session) {
        var number = Number(session[0]);
        return number >= phase.start && number <= phase.end;
      });
      return renderPhase(phase, phaseSessions, headers, minutes, index);
    }).join("");

    syncResponsivePhases();
    setActivePhase(activePhase, false);
    installPhaseObserver();
    if (window.lucide) window.lucide.createIcons();
  }

  function syncMeetingPanels() {
    container.querySelectorAll(".meeting-toggle").forEach(function (button) {
      var meeting = Number(button.closest(".meeting-accordion").getAttribute("data-meeting"));
      var expanded = openMeetings.has(meeting);
      var panel = document.getElementById(button.getAttribute("aria-controls"));
      button.setAttribute("aria-expanded", expanded ? "true" : "false");
      if (panel) panel.hidden = !expanded;
    });
  }

  function ensureFirstMeetingOpen(phaseId) {
    var phase = getPhaseById(phaseId);
    if (!phase) return;
    var hasOpenMeeting = false;
    openMeetings.forEach(function (number) {
      if (number >= phase.start && number <= phase.end) hasOpenMeeting = true;
    });
    if (!hasOpenMeeting) openMeetings.add(phase.start);
    syncMeetingPanels();
  }

  function closeMeetingsOutsidePhase(phaseId) {
    var phase = getPhaseById(phaseId);
    if (!phase) return;
    Array.from(openMeetings).forEach(function (number) {
      if (number < phase.start || number > phase.end) openMeetings.delete(number);
    });
  }

  function syncResponsivePhases() {
    container.querySelectorAll(".syllabus-phase").forEach(function (section) {
      var id = section.id;
      var toggle = section.querySelector(".phase-toggle");
      var expanded = !mobileQuery.matches || openPhases.has(id);
      section.classList.toggle("is-collapsed", !expanded);
      if (toggle) toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
  }

  function setActivePhase(id, openFirstMeeting) {
    if (!getPhaseById(id)) return;
    activePhase = id;
    document.querySelectorAll("[data-phase-link]").forEach(function (link) {
      var active = link.getAttribute("data-phase-link") === id;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
    if (openFirstMeeting) ensureFirstMeetingOpen(id);
  }

  function installPhaseObserver() {
    if (phaseObserver) phaseObserver.disconnect();
    if (!("IntersectionObserver" in window)) return;
    phaseObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActivePhase(entry.target.id, true);
      });
    }, { rootMargin: "-28% 0px -62% 0px", threshold: 0 });
    container.querySelectorAll(".syllabus-phase").forEach(function (phase) {
      phaseObserver.observe(phase);
    });
  }

  function syncMetadata(lang) {
    document.title = labels[lang].title;
    var description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", labels[lang].description);
  }

  function showLanguage(lang) {
    currentLang = lang === "id" ? "id" : "en";
    syncMetadata(currentLang);
    if (datasets[currentLang]) renderCurriculum(datasets[currentLang]);
  }

  container.addEventListener("click", function (event) {
    var meetingButton = event.target.closest(".meeting-toggle");
    if (meetingButton) {
      var article = meetingButton.closest(".meeting-accordion");
      var phaseSection = meetingButton.closest(".syllabus-phase");
      var meeting = Number(article.getAttribute("data-meeting"));
      var opening = !openMeetings.has(meeting);

      if (opening) {
        phaseSection.querySelectorAll(".meeting-accordion").forEach(function (sibling) {
          openMeetings.delete(Number(sibling.getAttribute("data-meeting")));
        });
        openMeetings.add(meeting);
      } else {
        openMeetings.delete(meeting);
      }
      syncMeetingPanels();
      return;
    }

    var phaseButton = event.target.closest(".phase-toggle");
    if (phaseButton && mobileQuery.matches) {
      var section = phaseButton.closest(".syllabus-phase");
      var shouldOpen = !openPhases.has(section.id);
      openPhases.clear();
      if (shouldOpen) {
        openPhases.add(section.id);
        closeMeetingsOutsidePhase(section.id);
        setActivePhase(section.id, true);
      }
      syncResponsivePhases();
    }
  });

  document.querySelectorAll("[data-phase-link]").forEach(function (link) {
    link.addEventListener("click", function () {
      var id = link.getAttribute("data-phase-link");
      openPhases.clear();
      openPhases.add(id);
      if (mobileQuery.matches) closeMeetingsOutsidePhase(id);
      setActivePhase(id, true);
      syncResponsivePhases();
    });
  });

  document.addEventListener("langchange", function (event) {
    showLanguage(event.detail && event.detail.lang);
  });

  if (mobileQuery.addEventListener) mobileQuery.addEventListener("change", syncResponsivePhases);
  else mobileQuery.addListener(syncResponsivePhases);

  Promise.all(Object.keys(sourceUrls).map(function (lang) {
    return fetch(sourceUrls[lang])
      .then(function (response) {
        if (!response.ok) throw new Error("Curriculum could not be loaded");
        return response.text();
      })
      .then(function (text) {
        datasets[lang] = parseCsv(text.replace(/^\uFEFF/, ""));
      });
  }))
    .then(function () {
      showLanguage(currentLang);
    })
    .catch(function () {
      container.innerHTML = '<p class="syllabus-error">' + labels[currentLang].error + '</p>';
    });
})();

(function () {
  var header = document.querySelector(".ai-header");
  var stickyCta = document.querySelector(".mobile-sticky-cta");
  var hero = document.querySelector(".ai-hero");
  var schoolCta = document.getElementById("school-cta");
  var footer = document.querySelector(".site-footer");
  var mobileQuery = window.matchMedia("(max-width: 680px)");

  function syncPageChrome() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
    if (!stickyCta || !hero || !schoolCta || !footer) return;

    var pastHero = window.scrollY > hero.offsetTop + hero.offsetHeight - 120;
    var ctaVisible = schoolCta.getBoundingClientRect().top < window.innerHeight;
    var footerVisible = footer.getBoundingClientRect().top < window.innerHeight;
    stickyCta.classList.toggle("is-visible", mobileQuery.matches && pastHero && !ctaVisible && !footerVisible);
  }

  window.addEventListener("scroll", syncPageChrome, { passive: true });
  window.addEventListener("resize", syncPageChrome);
  if (mobileQuery.addEventListener) mobileQuery.addEventListener("change", syncPageChrome);
  syncPageChrome();
})();
