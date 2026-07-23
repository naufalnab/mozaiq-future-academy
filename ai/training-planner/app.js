(function () {
  "use strict";

  var STORAGE_KEY = "mozaiq_ai_training_planner_v1";
  var SCHEMA_VERSION = 1;
  var SAVE_DELAY = 420;
  var SESSION_STATUSES = ["Planned", "In Progress", "Completed", "Rescheduled", "Cancelled"];
  var HOMEWORK_STATUSES = ["Not Started", "In Progress", "Submitted", "Completed"];
  var NOTE_CATEGORIES = [
    "Participant Insight",
    "Business Insight",
    "Technical Skill",
    "Learning Preference",
    "Problem",
    "Follow-up",
    "Next Session",
    "Important"
  ];
  var PROMPT_CATEGORIES = [
    "Campaign Strategy",
    "Hooks",
    "Video Scripts",
    "Storyboards",
    "Product Visuals",
    "Image-to-Video",
    "Captions",
    "Customer Communication",
    "Content Calendar",
    "Workflow Automation"
  ];
  var ASSET_TYPES = [
    "Logo",
    "Product Photo",
    "Video",
    "Brand Reference",
    "Prompt",
    "Storyboard",
    "Canva Link",
    "Google Drive Link",
    "Final Export"
  ];

  var refs = {
    body: document.body,
    main: document.getElementById("main-content"),
    sidebar: document.getElementById("app-sidebar"),
    participantSelector: document.getElementById("participant-selector"),
    autosave: document.getElementById("autosave-status"),
    autosaveWrap: document.querySelector(".autosave-status"),
    topbarParticipant: document.getElementById("topbar-participant"),
    topbarStatus: document.getElementById("topbar-status"),
    topbarProgram: document.getElementById("topbar-program"),
    topbarNextDate: document.getElementById("topbar-next-date"),
    topbarSession: document.getElementById("topbar-session"),
    topbarProgress: document.getElementById("topbar-progress"),
    breadcrumbParticipant: document.getElementById("breadcrumb-participant"),
    breadcrumbSession: document.getElementById("breadcrumb-session"),
    sessionStartLabel: document.getElementById("session-start-label"),
    globalSearch: document.getElementById("global-search"),
    modalLayer: document.getElementById("modal-layer"),
    modal: document.getElementById("modal"),
    modalKicker: document.getElementById("modal-kicker"),
    modalTitle: document.getElementById("modal-title"),
    modalBody: document.getElementById("modal-body"),
    modalFooter: document.getElementById("modal-footer"),
    toastRegion: document.getElementById("toast-region"),
    importFile: document.getElementById("import-file")
  };

  var saveTimer = null;
  var clockTimer = null;
  var lastModalFocus = null;
  var storageReadFailed = false;
  var rawCorruptStorage = "";
  var promptFilters = { search: "", category: "All" };
  var noteFilter = "All";
  var homeworkFilter = "All";
  var promptFilterTimer = null;

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function uid(prefix) {
    var random = Math.random().toString(36).slice(2, 8);
    return (prefix || "item") + "-" + Date.now().toString(36) + "-" + random;
  }

  function slugify(value) {
    return String(value || "participant")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "participant";
  }

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function formatDate(value, includeTime) {
    if (!value) return "Belum ditentukan";
    var parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return String(value);
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: includeTime ? "short" : undefined
    }).format(parsed);
  }

  function formatElapsed(ms) {
    var total = Math.max(0, Math.floor(ms / 1000));
    var hours = Math.floor(total / 3600);
    var minutes = Math.floor((total % 3600) / 60);
    var seconds = total % 60;
    return [hours, minutes, seconds].map(function (part) {
      return String(part).padStart(2, "0");
    }).join(":");
  }

  function text(value) {
    return document.createTextNode(value == null ? "" : String(value));
  }

  function create(tag, className, content) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (content != null) node.textContent = String(content);
    return node;
  }

  function append(parent) {
    Array.prototype.slice.call(arguments, 1).forEach(function (child) {
      if (child == null) return;
      parent.appendChild(typeof child === "string" ? text(child) : child);
    });
    return parent;
  }

  function setAttributes(node, attributes) {
    Object.keys(attributes || {}).forEach(function (key) {
      var value = attributes[key];
      if (value == null || value === false) return;
      if (key === "checked" || key === "selected" || key === "disabled" || key === "required") {
        node[key] = Boolean(value);
      } else if (key.indexOf("data-") === 0 || key.indexOf("aria-") === 0 || key === "role") {
        node.setAttribute(key, String(value));
      } else {
        node[key] = value;
      }
    });
    return node;
  }

  function makeButton(label, action, variant, data) {
    var button = create("button", "button " + (variant || "button--quiet"));
    button.type = "button";
    button.textContent = label;
    if (action) button.dataset.action = action;
    Object.keys(data || {}).forEach(function (key) {
      button.dataset[key] = data[key];
    });
    return button;
  }

  function makeInput(options) {
    var config = options || {};
    var wrapper = create("label", "field" + (config.wide ? " field--wide" : ""));
    var label = create("span", "", config.label || "");
    var input;
    if (config.type === "textarea") {
      input = create("textarea");
      input.rows = config.rows || 4;
    } else if (config.type === "select") {
      input = create("select");
      (config.options || []).forEach(function (optionValue) {
        var option = create("option", "", optionValue.label || optionValue);
        option.value = optionValue.value == null ? optionValue : optionValue.value;
        option.selected = String(option.value) === String(config.value == null ? "" : config.value);
        input.appendChild(option);
      });
    } else {
      input = create("input");
      input.type = config.type || "text";
    }
    if (config.name) input.name = config.name;
    if (config.value != null && config.type !== "select") input.value = config.value;
    if (config.placeholder) input.placeholder = config.placeholder;
    if (config.required) input.required = true;
    if (config.readOnly) input.readOnly = true;
    if (config.min != null) input.min = config.min;
    if (config.max != null) input.max = config.max;
    if (config.step != null) input.step = config.step;
    if (config.autocomplete) input.autocomplete = config.autocomplete;
    Object.keys(config.data || {}).forEach(function (key) {
      input.dataset[key] = config.data[key];
    });
    append(wrapper, label, input);
    if (config.help) wrapper.appendChild(create("small", "", config.help));
    return wrapper;
  }

  function makeCheckbox(label, checked, data) {
    var wrapper = create("label", "check-item");
    var input = create("input");
    input.type = "checkbox";
    input.checked = Boolean(checked);
    Object.keys(data || {}).forEach(function (key) {
      input.dataset[key] = data[key];
    });
    append(wrapper, input, create("span", "", label));
    return wrapper;
  }

  function makeHeading(kicker, title, description, actions) {
    var wrapper = create("header", "view-heading");
    var copy = create("div");
    append(copy, create("span", "section-kicker", kicker), create("h1", "", title));
    if (description) copy.appendChild(create("p", "", description));
    wrapper.appendChild(copy);
    if (actions && actions.length) {
      var actionWrap = create("div", "view-heading__actions");
      actions.forEach(function (action) {
        actionWrap.appendChild(makeButton(action.label, action.action, action.variant, action.data));
      });
      wrapper.appendChild(actionWrap);
    }
    return wrapper;
  }

  function makeCardHeader(title, description, actions) {
    var header = create("header", "card__header");
    var copy = create("div");
    append(copy, create("h2", "", title));
    if (description) copy.appendChild(create("p", "", description));
    header.appendChild(copy);
    if (actions && actions.length) {
      var actionWrap = create("div", "card-actions");
      actions.forEach(function (action) {
        actionWrap.appendChild(makeButton(action.label, action.action, action.variant, action.data));
      });
      header.appendChild(actionWrap);
    }
    return header;
  }

  function makeEmpty(title, description) {
    var empty = create("div", "empty-state");
    var inner = create("div");
    append(
      inner,
      create("span", "", "◇"),
      create("h3", "", title || "Belum ada data pada bagian ini."),
      create("p", "", description || "Tambahkan data untuk mulai menggunakan bagian ini.")
    );
    empty.appendChild(inner);
    return empty;
  }

  function safeDefaults() {
    return clone(window.MOZAIQ_TRAINING_DEFAULTS);
  }

  function normalizeParticipant(participant) {
    var base = clone(window.MOZAIQ_HANDOYO_PLAN);
    var source = participant && typeof participant === "object" ? participant : {};
    var normalized = Object.assign(base, source);
    normalized.schedule = Object.assign(base.schedule, source.schedule || {});
    normalized.needsAssessment = Object.assign(base.needsAssessment, source.needsAssessment || {});
    normalized.needsAssessment.problems = Array.isArray(source.needsAssessment && source.needsAssessment.problems)
      ? source.needsAssessment.problems.slice(0, 3)
      : base.needsAssessment.problems;
    [
      "toolsUsed",
      "mainGoals",
      "mainChallenges",
      "sessions",
      "promptTemplates",
      "campaignBriefs",
      "storyboard",
      "practiceResults",
      "homework",
      "instructorNotes",
      "assets",
      "activityLog"
    ].forEach(function (key) {
      normalized[key] = Array.isArray(source[key]) ? source[key] : base[key];
    });
    normalized.sessions.forEach(function (session, index) {
      session.number = Number(session.number || index + 1);
      session.deliverables = Array.isArray(session.deliverables) ? session.deliverables : [];
      session.agenda = Array.isArray(session.agenda) ? session.agenda : [];
      session.preparationChecklist = session.preparationChecklist || { instructor: [], participant: [] };
      session.preparationChecklist.instructor = Array.isArray(session.preparationChecklist.instructor)
        ? session.preparationChecklist.instructor
        : [];
      session.preparationChecklist.participant = Array.isArray(session.preparationChecklist.participant)
        ? session.preparationChecklist.participant
        : [];
    });
    normalized.totalSessions = normalized.sessions.length || Number(normalized.totalSessions || 0);
    normalized.currentSession = Math.max(1, Math.min(Number(normalized.currentSession || 1), Math.max(1, normalized.totalSessions)));
    return normalized;
  }

  function loadState() {
    var defaults = safeDefaults();
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return defaults;
      var parsed = JSON.parse(stored);
      if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.participants)) {
        throw new Error("Struktur data tidak valid");
      }
      parsed.schemaVersion = SCHEMA_VERSION;
      parsed.participants = parsed.participants.map(normalizeParticipant);
      parsed.settings = Object.assign(defaults.settings, parsed.settings || {});
      parsed.activeView = parsed.activeView || "overview";
      parsed.activeParticipantId = parsed.activeParticipantId || (parsed.participants[0] && parsed.participants[0].id);
      if (!parsed.participants.some(function (participant) { return participant.id === parsed.activeParticipantId; })) {
        parsed.activeParticipantId = parsed.participants[0] ? parsed.participants[0].id : "";
      }
      return parsed;
    } catch (error) {
      storageReadFailed = true;
      rawCorruptStorage = localStorage.getItem(STORAGE_KEY) || "";
      return defaults;
    }
  }

  var state = loadState();

  function activeParticipant() {
    return state.participants.find(function (participant) {
      return participant.id === state.activeParticipantId;
    }) || state.participants[0] || null;
  }

  function activeSession(participant) {
    var person = participant || activeParticipant();
    if (!person || !person.sessions.length) return null;
    return person.sessions.find(function (session) {
      return Number(session.number) === Number(person.currentSession);
    }) || person.sessions[0];
  }

  function getPath(object, path) {
    return String(path || "").split(".").reduce(function (value, key) {
      return value == null ? undefined : value[key];
    }, object);
  }

  function setPath(object, path, value) {
    var keys = String(path || "").split(".");
    var target = object;
    keys.slice(0, -1).forEach(function (key) {
      if (!target[key] || typeof target[key] !== "object") target[key] = {};
      target = target[key];
    });
    target[keys[keys.length - 1]] = value;
  }

  function logActivity(participant, message) {
    if (!participant) return;
    participant.activityLog = Array.isArray(participant.activityLog) ? participant.activityLog : [];
    participant.activityLog.unshift({
      id: uid("activity"),
      date: new Date().toISOString(),
      text: message
    });
    participant.activityLog = participant.activityLog.slice(0, 40);
  }

  function updateAutosave(message, saving) {
    refs.autosave.textContent = message;
    refs.autosaveWrap.classList.toggle("is-saving", Boolean(saving));
  }

  function saveNow() {
    if (storageReadFailed) {
      updateAutosave("Penyimpanan dijeda sampai data rusak ditangani.", false);
      return false;
    }
    try {
      state.schemaVersion = SCHEMA_VERSION;
      state.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      updateAutosave("Semua perubahan telah tersimpan di perangkat ini.", false);
      return true;
    } catch (error) {
      updateAutosave("Penyimpanan gagal. Periksa ruang browser.", false);
      showToast("Data belum dapat disimpan. Ekspor backup sebelum menutup halaman.", "danger");
      return false;
    }
  }

  function scheduleSave() {
    if (storageReadFailed) return;
    updateAutosave("Menyimpan...", true);
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(saveNow, SAVE_DELAY);
  }

  function showToast(message, type) {
    var toast = create("div", "toast" + (type === "danger" ? " toast--danger" : ""));
    toast.setAttribute("role", type === "danger" ? "alert" : "status");
    append(toast, create("span", "toast__icon", type === "danger" ? "!" : "✓"), create("p", "", message));
    var close = create("button", "", "×");
    close.type = "button";
    close.setAttribute("aria-label", "Tutup notifikasi");
    close.addEventListener("click", function () { toast.remove(); });
    toast.appendChild(close);
    refs.toastRegion.appendChild(toast);
    window.setTimeout(function () {
      if (toast.isConnected) toast.remove();
    }, 4200);
  }

  function closeModal() {
    if (refs.modalLayer.hidden) return;
    refs.modalLayer.hidden = true;
    refs.body.classList.remove("modal-open");
    refs.modal.classList.remove("modal--wide");
    refs.modalBody.replaceChildren();
    refs.modalFooter.replaceChildren();
    if (lastModalFocus && document.contains(lastModalFocus)) lastModalFocus.focus();
  }

  function openModal(config) {
    lastModalFocus = document.activeElement;
    refs.modalKicker.textContent = config.kicker || "AI TRAINING PLANNER";
    refs.modalTitle.textContent = config.title || "Dialog";
    refs.modalBody.replaceChildren(config.body || create("div"));
    refs.modalFooter.replaceChildren();
    refs.modal.classList.toggle("modal--wide", Boolean(config.wide));
    (config.actions || []).forEach(function (action) {
      var button = makeButton(action.label, "", action.variant || "button--quiet");
      if (action.disabled) button.disabled = true;
      button.addEventListener("click", function () {
        var result;
        if (typeof action.onClick === "function") result = action.onClick();
        if (action.close !== false && result !== false) closeModal();
      });
      refs.modalFooter.appendChild(button);
    });
    refs.modalLayer.hidden = false;
    refs.body.classList.add("modal-open");
    window.setTimeout(function () {
      var first = refs.modal.querySelector("input:not([type='hidden']), select, textarea, button");
      (first || refs.modal).focus();
    }, 0);
  }

  function confirmAction(title, message, confirmLabel, callback, danger) {
    var body = create("div");
    append(
      body,
      create("div", "notice" + (danger ? " notice--warning" : ""), message)
    );
    openModal({
      title: title,
      body: body,
      actions: [
        { label: "Batal", variant: "button--quiet" },
        {
          label: confirmLabel || "Konfirmasi",
          variant: danger ? "button--danger" : "button--primary",
          onClick: callback
        }
      ]
    });
  }

  function trapModalFocus(event) {
    if (refs.modalLayer.hidden) return;
    if (event.key === "Escape") {
      closeModal();
      return;
    }
    if (event.key !== "Tab") return;
    var focusable = Array.prototype.slice.call(
      refs.modal.querySelectorAll("button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [href]")
    );
    if (!focusable.length) {
      event.preventDefault();
      refs.modal.focus();
      return;
    }
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

  function percentage(done, total) {
    return total ? Math.round((done / total) * 100) : 0;
  }

  function progressStats(participant) {
    var sessions = participant.sessions || [];
    var completedSessions = sessions.filter(function (session) { return session.status === "Completed"; }).length;
    var deliverables = sessions.reduce(function (items, session) {
      return items.concat(session.deliverables || []);
    }, []);
    var completedDeliverables = deliverables.filter(function (item) { return item.completed; }).length;
    var homework = participant.homework || [];
    var completedHomework = homework.filter(function (item) { return item.status === "Completed"; }).length;
    var checklist = sessions.reduce(function (items, session) {
      var preparation = session.preparationChecklist || {};
      return items.concat(preparation.instructor || [], preparation.participant || []);
    }, []);
    var completedChecklist = checklist.filter(function (item) { return item.completed; }).length;
    var values = [
      percentage(completedSessions, Math.max(participant.totalSessions, sessions.length)),
      percentage(completedDeliverables, deliverables.length),
      percentage(completedHomework, homework.length),
      percentage(completedChecklist, checklist.length)
    ];
    return {
      sessions: percentage(completedSessions, Math.max(participant.totalSessions, sessions.length)),
      sessionDone: completedSessions,
      sessionTotal: Math.max(participant.totalSessions, sessions.length),
      deliverables: percentage(completedDeliverables, deliverables.length),
      homework: percentage(completedHomework, homework.length),
      checklist: percentage(completedChecklist, checklist.length),
      program: Math.round(values.reduce(function (sum, value) { return sum + value; }, 0) / values.length)
    };
  }

  function progressBar(label, value, detail) {
    var wrapper = create("div", "progress-block");
    var labelRow = create("div", "progress-label");
    append(labelRow, create("span", "", label), create("strong", "", detail || value + "%"));
    var track = create("div", "progress-track");
    track.setAttribute("role", "progressbar");
    track.setAttribute("aria-label", label);
    track.setAttribute("aria-valuemin", "0");
    track.setAttribute("aria-valuemax", "100");
    track.setAttribute("aria-valuenow", String(value));
    var fill = create("span");
    fill.style.setProperty("--progress", Math.min(100, Math.max(0, value)) + "%");
    track.appendChild(fill);
    append(wrapper, labelRow, track);
    return wrapper;
  }

  function initials(name) {
    return String(name || "P")
      .split(/\s+/)
      .filter(Boolean)
      .slice(-2)
      .map(function (part) { return part.charAt(0).toUpperCase(); })
      .join("");
  }

  function updateParticipantSelector() {
    var selected = state.activeParticipantId;
    refs.participantSelector.replaceChildren();
    state.participants.forEach(function (participant) {
      var option = create("option", "", participant.name || "Peserta tanpa nama");
      option.value = participant.id;
      option.selected = participant.id === selected;
      refs.participantSelector.appendChild(option);
    });
  }

  function updateChrome() {
    var participant = activeParticipant();
    if (!participant) return;
    var session = activeSession(participant);
    var stats = progressStats(participant);
    updateParticipantSelector();
    refs.topbarParticipant.textContent = participant.name || "Peserta tanpa nama";
    refs.topbarStatus.textContent = participant.programStatus || "Active";
    refs.topbarProgram.textContent = participant.programName || "Custom Program";
    refs.topbarNextDate.textContent = participant.schedule.nextDate
      ? formatDate(participant.schedule.nextDate, false) + ", " + participant.schedule.time
      : [participant.schedule.day, participant.schedule.time].filter(Boolean).join(", ") || "Belum dijadwalkan";
    refs.topbarSession.textContent = participant.currentSession + " dari " + participant.totalSessions;
    refs.topbarProgress.textContent = stats.program + "%";
    refs.breadcrumbParticipant.textContent = participant.name || "Peserta";
    refs.breadcrumbSession.textContent = "Session " + participant.currentSession;
    refs.sessionStartLabel.textContent = session && session.status === "In Progress" ? "Lanjutkan Sesi" : "Mulai Sesi";
    document.querySelectorAll(".sidebar-nav [data-view]").forEach(function (button) {
      if (button.dataset.view === state.activeView && !refs.globalSearch.value.trim()) {
        button.setAttribute("aria-current", "page");
      } else {
        button.removeAttribute("aria-current");
      }
    });
    refs.body.classList.toggle("is-compact", Boolean(state.settings && state.settings.compactMode));
  }

  function renderMetrics(participant) {
    var metrics = [
      ["Session", participant.currentSession + " dari " + participant.totalSessions],
      ["Duration", participant.sessionDurationMinutes + " menit"],
      ["Format", participant.learningFormat || "—"],
      ["Participants", String(participant.participantCount || 1)],
      ["Skill level", participant.experienceLevel || "—"],
      ["Status", participant.programStatus || "Active"]
    ];
    var grid = create("section", "metrics-grid");
    grid.setAttribute("aria-label", "Ringkasan metrik program");
    metrics.forEach(function (metric) {
      var card = create("article", "metric-card");
      append(card, create("span", "", metric[0]), create("strong", "", metric[1]));
      grid.appendChild(card);
    });
    return grid;
  }

  function infoRow(label, value) {
    var row = create("div", "info-row");
    append(row, create("span", "", label), create("strong", "", value || "—"));
    return row;
  }

  function renderActivityList(participant) {
    if (!participant.activityLog.length) {
      return makeEmpty("Belum ada aktivitas", "Perubahan penting akan muncul di sini.");
    }
    var list = create("ul", "activity-list");
    participant.activityLog.slice(0, 6).forEach(function (activity) {
      var copy = create("div");
      append(copy, create("p", "", activity.text), create("time", "", formatDate(activity.date, true)));
      var item = create("li");
      append(item, create("span", "", "↗"), copy);
      list.appendChild(item);
    });
    return list;
  }

  function renderOverview() {
    var participant = activeParticipant();
    var session = activeSession(participant);
    var stats = progressStats(participant);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(makeHeading(
      "OVERVIEW",
      "Program Pelatihan " + participant.name.replace(/^Pak\s+/i, "Pak "),
      "Pantau fokus belajar, sesi aktif, hasil kerja, dan langkah berikutnya dalam satu workspace.",
      [
        { label: "Edit Rencana", action: "edit-plan", variant: "button--quiet" },
        { label: "Mulai Sesi", action: "start-session", variant: "button--primary" }
      ]
    ));
    fragment.appendChild(renderMetrics(participant));

    var grid = create("div", "dashboard-grid");
    var primary = create("div", "dashboard-column");
    var secondary = create("div", "dashboard-column");

    var current = create("section", "card card--glow card--accent");
    current.appendChild(makeCardHeader(
      "Current Session",
      "AI Marketing Production Lab",
      [{ label: "Buka Session Planner", action: "go-sessions", variant: "button--quiet" }]
    ));
    if (session) {
      var focus = create("div", "session-focus");
      var copy = create("div");
      append(
        copy,
        create("span", "section-kicker", "SESSION " + session.number + " · " + session.status.toUpperCase()),
        create("h2", "", session.title),
        create("p", "", session.subtitle || session.objective)
      );
      var meta = create("div", "session-focus__meta");
      append(
        meta,
        infoRow("Jadwal", session.date ? formatDate(session.date, false) : participant.schedule.day),
        infoRow("Waktu", session.time || participant.schedule.time),
        infoRow("Durasi", session.durationMinutes + " menit"),
        infoRow("Status", session.status)
      );
      append(focus, copy, meta);
      current.appendChild(focus);
      var deliverablesDone = session.deliverables.filter(function (item) { return item.completed; }).length;
      current.appendChild(progressBar(
        "Deliverables sesi",
        percentage(deliverablesDone, session.deliverables.length),
        deliverablesDone + " dari " + session.deliverables.length + " selesai"
      ));
    } else {
      current.appendChild(makeEmpty("Belum ada sesi", "Buat sesi baru atau gunakan training template."));
    }
    primary.appendChild(current);

    var overview = create("section", "card");
    overview.appendChild(makeCardHeader("Participant Summary", "Profil singkat dan tujuan utama."));
    var summary = create("div", "summary-person");
    var summaryCopy = create("div");
    append(
      summaryCopy,
      create("h3", "", participant.name),
      create("p", "", [participant.role, participant.businessName, participant.businessLocation].filter(Boolean).join(" · "))
    );
    append(
      summary,
      create("span", "avatar", initials(participant.name)),
      summaryCopy,
      makeButton("Edit Profil", "edit-profile", "button--quiet")
    );
    overview.appendChild(summary);
    var goalTitle = create("p", "form-section__label", "Main Goals");
    goalTitle.style.marginTop = "18px";
    overview.appendChild(goalTitle);
    var goals = create("ul", "tag-list");
    (participant.mainGoals.length ? participant.mainGoals : ["Belum ada tujuan"]).forEach(function (goal) {
      goals.appendChild(create("li", "", goal));
    });
    overview.appendChild(goals);
    primary.appendChild(overview);

    var actions = create("section", "card");
    actions.appendChild(makeCardHeader("Quick Actions", "Akses cepat untuk kegiatan instructor."));
    var actionGrid = create("div", "quick-actions");
    [
      ["Mulai Sesi", "start-session", "▶"],
      ["Edit Rencana", "edit-plan", "✎"],
      ["Tambah Catatan", "add-note", "＋"],
      ["Tambah Tugas", "add-homework", "＋"],
      ["Tandai Selesai", "complete-session", "✓"],
      ["Duplikasi Program", "duplicate-participant", "⧉"]
    ].forEach(function (item) {
      var button = create("button", "quick-action");
      button.type = "button";
      button.dataset.action = item[1];
      append(button, create("span", "", item[0]), create("span", "", item[2]));
      actionGrid.appendChild(button);
    });
    actions.appendChild(actionGrid);
    primary.appendChild(actions);

    var progress = create("section", "card");
    progress.appendChild(makeCardHeader("Progress", "Penyelesaian aktivitas, bukan skor kemampuan."));
    append(
      progress,
      progressBar("Program", stats.program),
      progressBar("Sesi", stats.sessions, stats.sessionDone + " dari " + stats.sessionTotal),
      progressBar("Deliverables", stats.deliverables),
      progressBar("Homework", stats.homework)
    );
    var progressNote = create("div", "notice");
    progressNote.style.marginTop = "16px";
    progressNote.appendChild(create("p", "", "Progress menunjukkan penyelesaian aktivitas, bukan skor kecerdasan atau kemampuan peserta."));
    progress.appendChild(progressNote);
    secondary.appendChild(progress);

    var schedule = create("section", "card");
    schedule.appendChild(makeCardHeader("Next Schedule", "Pertemuan berikutnya."));
    append(
      schedule,
      infoRow("Hari", participant.schedule.day),
      infoRow("Waktu", participant.schedule.time),
      infoRow("Frekuensi", participant.schedule.recurrence),
      infoRow("Format", participant.learningFormat)
    );
    secondary.appendChild(schedule);

    var homework = create("section", "card");
    homework.appendChild(makeCardHeader(
      "Current Homework",
      "Tugas aktif peserta.",
      [{ label: "Lihat Semua", action: "go-homework", variant: "button--quiet" }]
    ));
    var currentHomework = participant.homework.find(function (item) { return item.status !== "Completed"; });
    if (currentHomework) {
      var item = create("div", "data-item");
      var itemTop = create("div", "data-item__top");
      append(itemTop, create("h3", "", currentHomework.title), create("span", "small-badge", currentHomework.status));
      append(item, itemTop, create("p", "", currentHomework.description));
      homework.appendChild(item);
    } else {
      homework.appendChild(makeEmpty("Belum ada tugas aktif", "Tambahkan tugas untuk sesi ini."));
    }
    secondary.appendChild(homework);

    var notes = create("section", "card");
    notes.appendChild(makeCardHeader(
      "Latest Notes",
      "Catatan instructor terbaru.",
      [{ label: "Tambah", action: "add-note", variant: "button--quiet" }]
    ));
    if (participant.instructorNotes.length) {
      var note = participant.instructorNotes.slice().sort(function (a, b) {
        return Number(Boolean(b.pinned)) - Number(Boolean(a.pinned));
      })[0];
      var noteItem = create("div", "data-item");
      append(
        noteItem,
        create("span", "section-kicker", note.category.toUpperCase()),
        create("p", "", note.content),
        create("small", "", formatDate(note.date, false))
      );
      notes.appendChild(noteItem);
    } else {
      notes.appendChild(makeEmpty("Belum ada catatan", "Tambahkan insight setelah diskusi atau sesi berlangsung."));
    }
    secondary.appendChild(notes);

    var activity = create("section", "card");
    activity.appendChild(makeCardHeader("Recent Activity", "Riwayat perubahan penting."));
    activity.appendChild(renderActivityList(participant));
    secondary.appendChild(activity);

    append(grid, primary, secondary);
    fragment.appendChild(grid);
    refs.main.replaceChildren(fragment);
  }

  function profileField(label, path, options) {
    var participant = activeParticipant();
    var config = Object.assign({}, options || {}, {
      label: label,
      value: getPath(participant, path),
      data: Object.assign({}, options && options.data || {}, { bind: path })
    });
    if (Array.isArray(config.value)) config.value = config.value.join(", ");
    return makeInput(config);
  }

  function renderProfile() {
    var participant = activeParticipant();
    var fragment = document.createDocumentFragment();
    fragment.appendChild(makeHeading(
      "PARTICIPANT PROFILE",
      "Profil " + participant.name,
      "Informasi peserta dan konfigurasi program. Perubahan tersimpan otomatis di perangkat ini.",
      [{ label: "Duplikasi Program", action: "duplicate-participant", variant: "button--primary" }]
    ));
    var card = create("section", "card");
    card.appendChild(makeCardHeader("Informasi Peserta", "Gunakan data yang relevan untuk perencanaan pelatihan."));
    var form = create("form", "form-grid");
    form.addEventListener("submit", function (event) { event.preventDefault(); saveNow(); showToast("Profil peserta disimpan."); });
    append(
      form,
      profileField("Nama", "name", { required: true, autocomplete: "name" }),
      profileField("Posisi", "role"),
      profileField("Nama usaha", "businessName"),
      profileField("Jenis usaha", "businessType"),
      profileField("Lokasi", "businessLocation"),
      profileField("Website", "website", { type: "url", placeholder: "https://..." }),
      profileField("Pendidikan", "education"),
      profileField("Experience level", "experienceLevel", {
        type: "select",
        options: ["Beginner", "Intermediate", "Advanced"]
      }),
      profileField("Tools used", "toolsUsed", { help: "Pisahkan dengan koma." }),
      profileField("Learning goals", "mainGoals", { help: "Pisahkan dengan koma." }),
      profileField("Format sesi", "learningFormat", {
        type: "select",
        options: ["Offline", "Online", "Hybrid"]
      }),
      profileField("Jumlah peserta", "participantCount", { type: "number", min: 1 }),
      profileField("Durasi sesi (menit)", "sessionDurationMinutes", { type: "number", min: 15, step: 5 }),
      profileField("Hari", "schedule.day"),
      profileField("Waktu", "schedule.time", { placeholder: "19.00–20.30" }),
      profileField("Frekuensi", "schedule.recurrence"),
      profileField("Tanggal pertemuan berikutnya", "schedule.nextDate", { type: "date" }),
      profileField("Total sesi", "totalSessions", { type: "number", min: 1 }),
      profileField("Nama program", "programName"),
      profileField("Status program", "programStatus", {
        type: "select",
        options: ["Active", "Paused", "Completed", "Archived"]
      }),
      profileField("Catatan umum", "notes", { type: "textarea", rows: 5, wide: true })
    );
    var actions = create("div", "form-actions field--wide");
    append(
      actions,
      setAttributes(makeButton("Simpan Sekarang", "", "button--primary"), { type: "submit" }),
      makeButton("Tambah Peserta Baru", "add-participant", "button--quiet")
    );
    form.appendChild(actions);
    card.appendChild(form);
    fragment.appendChild(card);
    refs.main.replaceChildren(fragment);
  }

  function assessmentField(label, path, options) {
    var participant = activeParticipant();
    var assessmentPath = "needsAssessment." + path;
    return makeInput(Object.assign({}, options || {}, {
      label: label,
      value: getPath(participant, assessmentPath),
      data: { bind: assessmentPath }
    }));
  }

  function renderNeeds() {
    var participant = activeParticipant();
    var assessment = participant.needsAssessment;
    var fragment = document.createDocumentFragment();
    fragment.appendChild(makeHeading(
      "NEEDS ASSESSMENT",
      "Pemetaan kebutuhan " + participant.name,
      "Hubungkan tantangan kerja nyata dengan hasil pelatihan yang dapat dipraktikkan."
    ));
    var card = create("section", "card");
    card.appendChild(makeCardHeader("Konteks Bisnis dan Pekerjaan", "Isi bersama peserta saat discovery atau audit workflow."));
    var form = create("div", "form-grid");
    append(
      form,
      assessmentField("Bidang pekerjaan", "workField"),
      assessmentField("Jenis usaha", "businessType"),
      assessmentField("Target bisnis", "businessTarget", { type: "textarea" }),
      assessmentField("Tools yang sudah digunakan", "toolsUsed", { type: "textarea" }),
      assessmentField("Tingkat kemampuan", "skillLevel", {
        type: "select",
        options: ["Beginner", "Intermediate", "Advanced"]
      }),
      assessmentField("Workflow saat ini", "currentWorkflow", { type: "textarea" }),
      assessmentField("Pekerjaan yang ingin dipercepat", "workToAccelerate", { type: "textarea" }),
      assessmentField("Hambatan terbesar", "biggestObstacle", { type: "textarea" }),
      assessmentField("Hasil yang ingin dibuat", "desiredResult", { type: "textarea" }),
      assessmentField("Platform pemasaran", "marketingPlatforms"),
      assessmentField("Anggota tim yang terlibat", "teamMembers"),
      assessmentField("Ketersediaan aset", "assetAvailability"),
      assessmentField("Catatan instructor", "instructorNotes", { type: "textarea", rows: 5, wide: true })
    );
    card.appendChild(form);
    fragment.appendChild(card);

    var problems = create("section", "card");
    problems.style.marginTop = "18px";
    problems.appendChild(makeCardHeader(
      "Three Most Important Problems",
      "Prioritaskan tiga masalah agar setiap sesi tetap fokus."
    ));
    var problemGrid = create("div", "problem-grid");
    assessment.problems.forEach(function (problem, index) {
      var problemCard = create("article", "problem-card");
      problemCard.appendChild(create("span", "problem-card__number", String(index + 1).padStart(2, "0")));
      [
        ["Problem", "problem", "textarea"],
        ["Current Process", "currentProcess", "textarea"],
        ["Desired Outcome", "desiredOutcome", "textarea"]
      ].forEach(function (fieldConfig) {
        problemCard.appendChild(makeInput({
          label: fieldConfig[0],
          type: fieldConfig[2],
          rows: 3,
          value: problem[fieldConfig[1]],
          data: {
            problemIndex: String(index),
            problemField: fieldConfig[1]
          }
        }));
      });
      problemGrid.appendChild(problemCard);
    });
    problems.appendChild(problemGrid);
    fragment.appendChild(problems);
    refs.main.replaceChildren(fragment);
  }

  function sessionField(session, label, path, options) {
    var config = Object.assign({}, options || {}, {
      label: label,
      value: getPath(session, path),
      data: Object.assign({}, options && options.data || {}, { sessionBind: path })
    });
    return makeInput(config);
  }

  function renderTimer(session) {
    var panel = create("div", "timer-panel");
    var running = session && session.status === "In Progress" && session.startedAt;
    append(
      panel,
      create("span", "timer-panel__clock", "◷"),
      append(
        create("div"),
        create("strong", "", running ? "Sesi sedang berlangsung" : "Timer sesi"),
        create("span", "", running ? "Waktu mulai tersimpan dan aman saat refresh." : "Mulai sesi untuk mencatat elapsed time.")
      ),
      create("span", "timer-readout", running ? formatElapsed(Date.now() - new Date(session.startedAt).getTime()) : "00:00:00")
    );
    return panel;
  }

  function renderDeliverables(session) {
    var card = create("section", "card");
    card.appendChild(makeCardHeader("Target Hasil", "Deliverables yang harus selesai pada sesi ini."));
    if (!session.deliverables.length) {
      card.appendChild(makeEmpty("Belum ada deliverables", "Edit sesi untuk menambahkan hasil yang diharapkan."));
      return card;
    }
    var grid = create("div", "deliverable-grid");
    session.deliverables.forEach(function (item) {
      grid.appendChild(makeCheckbox(item.label, item.completed, {
        checklistType: "deliverable",
        itemId: item.id
      }));
    });
    card.appendChild(grid);
    return card;
  }

  function renderTimeline(session) {
    var card = create("section", "card");
    card.appendChild(makeCardHeader("Rundown Interaktif", "Timeline 90 menit dengan waktu aktual dan catatan per agenda."));
    if (!session.agenda.length) {
      card.appendChild(makeEmpty("Belum ada agenda", "Tambahkan rincian agenda saat mengedit sesi."));
      return card;
    }
    var timeline = create("div", "timeline");
    session.agenda.forEach(function (agenda) {
      var agendaCard = create(
        "article",
        "timeline-card" +
          (agenda.completed ? " is-completed" : "") +
          (agenda.status === "In Progress" ? " is-current" : "")
      );
      var timeCol = create("div", "timeline-card__time");
      append(timeCol, text(agenda.range + " MENIT"), create("small", "", agenda.plannedMinutes + " menit rencana"));
      var content = create("div");
      append(content, create("h3", "", agenda.title), create("p", "", "Output: " + agenda.output));
      var details = create("details");
      details.appendChild(create("summary", "", "Lihat aktivitas"));
      var list = create("ul");
      agenda.activities.forEach(function (activity) {
        list.appendChild(create("li", "", activity));
      });
      details.appendChild(list);
      content.appendChild(details);
      var editor = create("div", "timeline-edit");
      editor.appendChild(makeInput({
        label: "Waktu aktual (menit)",
        type: "number",
        min: 0,
        value: agenda.actualMinutes,
        data: { agendaId: agenda.id, agendaField: "actualMinutes" }
      }));
      editor.appendChild(makeInput({
        label: "Catatan",
        type: "textarea",
        rows: 1,
        value: agenda.notes,
        data: { agendaId: agenda.id, agendaField: "notes" }
      }));
      content.appendChild(editor);
      var actions = create("div", "timeline-card__actions");
      var check = makeCheckbox("Selesai", agenda.completed, {
        agendaId: agenda.id,
        agendaComplete: "true"
      });
      check.style.minHeight = "36px";
      check.style.padding = "5px 8px";
      actions.appendChild(check);
      if (!agenda.completed) {
        actions.appendChild(makeButton(
          agenda.status === "In Progress" ? "Berjalan" : "Mulai",
          "start-agenda",
          agenda.status === "In Progress" ? "button--primary" : "button--quiet",
          { agendaId: agenda.id }
        ));
        actions.appendChild(makeButton("Selesai", "finish-agenda", "button--quiet", { agendaId: agenda.id }));
      }
      append(agendaCard, timeCol, content, actions);
      timeline.appendChild(agendaCard);
    });
    card.appendChild(timeline);
    return card;
  }

  function renderCampaignBrief(participant) {
    var campaign = participant.campaignBriefs[0];
    var card = create("section", "card print-campaign");
    card.appendChild(makeCardHeader(
      "Campaign Brief",
      "Editable form untuk mengubah satu ide menjadi arah produksi.",
      [
        { label: "Copy as Text", action: "copy-campaign", variant: "button--quiet" },
        { label: "Print", action: "print-campaign", variant: "button--quiet" }
      ]
    ));
    if (!campaign) {
      card.appendChild(makeEmpty("Belum ada campaign", "Buat campaign brief untuk sesi ini."));
      card.appendChild(makeButton("Tambah Campaign", "add-campaign", "button--primary"));
      return card;
    }
    var fields = [
      ["Nama campaign", "name"],
      ["Produk atau promo", "product"],
      ["Tujuan", "goal", "textarea"],
      ["Platform", "platform"],
      ["Target audiens", "audience", "textarea"],
      ["Masalah audiens", "audienceProblem", "textarea"],
      ["Solusi Grandivo", "solution", "textarea"],
      ["Keunggulan", "advantage", "textarea"],
      ["Penawaran", "offer"],
      ["CTA", "cta"],
      ["Durasi video", "duration"],
      ["Format", "format"],
      ["Gaya visual", "visualStyle"],
      ["Voice-over", "voiceOver", "textarea"],
      ["Teks layar", "onScreenText", "textarea"],
      ["Batasan", "constraints", "textarea"],
      ["Catatan", "notes", "textarea"]
    ];
    var grid = create("div", "campaign-grid");
    fields.forEach(function (fieldConfig) {
      grid.appendChild(makeInput({
        label: fieldConfig[0],
        type: fieldConfig[2] || "text",
        rows: 3,
        wide: ["goal", "constraints", "notes"].indexOf(fieldConfig[1]) >= 0,
        value: campaign[fieldConfig[1]],
        data: {
          campaignId: campaign.id,
          campaignField: fieldConfig[1]
        }
      }));
    });
    card.appendChild(grid);
    var actions = create("div", "form-actions");
    actions.style.marginTop = "16px";
    append(
      actions,
      makeButton("Simpan Campaign", "save-campaign", "button--primary"),
      makeButton("Duplicate Campaign", "duplicate-campaign", "button--quiet"),
      makeButton("Clear", "clear-campaign", "button--danger")
    );
    card.appendChild(actions);
    return card;
  }

  function renderStoryboard(participant) {
    var card = create("section", "card print-storyboard");
    card.appendChild(makeCardHeader(
      "Storyboard Builder",
      "Susun scene tanpa drag-and-drop; tombol urut selalu tersedia.",
      [{ label: "Add Scene", action: "add-scene", variant: "button--primary" }]
    ));
    if (!participant.storyboard.length) {
      card.appendChild(makeEmpty("Storyboard masih kosong", "Tambahkan scene pertama setelah script disepakati."));
      return card;
    }
    var list = create("div", "storyboard-list");
    participant.storyboard.forEach(function (scene, index) {
      var sceneCard = create("article", "storyboard-card");
      var number = create("div", "storyboard-card__number");
      append(number, create("span", "", "SCENE"), create("strong", "", index + 1));
      var content = create("div");
      var grid = create("div", "form-grid");
      [
        ["Duration", "duration"],
        ["Purpose", "purpose"],
        ["Visual", "visual", "textarea"],
        ["Text or voice-over", "text", "textarea"],
        ["Character or product action", "action", "textarea"],
        ["Camera", "camera"],
        ["Transition", "transition"],
        ["Asset status", "assetStatus", "select", ["Needed", "Ready", "In Progress", "Final"]],
        ["Notes", "notes", "textarea"]
      ].forEach(function (fieldConfig) {
        grid.appendChild(makeInput({
          label: fieldConfig[0],
          type: fieldConfig[2] || "text",
          options: fieldConfig[3],
          rows: 2,
          value: scene[fieldConfig[1]] || "",
          data: { sceneId: scene.id, sceneField: fieldConfig[1] }
        }));
      });
      var actions = create("div", "card-actions");
      actions.style.marginTop = "12px";
      append(
        actions,
        makeButton("Move Up", "move-scene-up", "button--quiet", { sceneId: scene.id }),
        makeButton("Move Down", "move-scene-down", "button--quiet", { sceneId: scene.id }),
        makeButton("Duplicate", "duplicate-scene", "button--quiet", { sceneId: scene.id }),
        makeButton("Remove", "remove-scene", "button--danger", { sceneId: scene.id })
      );
      append(content, grid, actions);
      append(sceneCard, number, content);
      list.appendChild(sceneCard);
    });
    card.appendChild(list);
    return card;
  }

  function renderSessionEditor(session) {
    var card = create("section", "card");
    card.appendChild(makeCardHeader("Detail Sesi", "Tujuan, materi, praktik, catatan, dan hasil sesi."));
    var grid = create("div", "form-grid");
    append(
      grid,
      sessionField(session, "Judul", "title", { wide: true }),
      sessionField(session, "Subjudul", "subtitle", { wide: true }),
      sessionField(session, "Tanggal", "date", { type: "date" }),
      sessionField(session, "Jam", "time"),
      sessionField(session, "Durasi (menit)", "durationMinutes", { type: "number", min: 15, step: 5 }),
      sessionField(session, "Status", "status", { type: "select", options: SESSION_STATUSES }),
      sessionField(session, "Tujuan", "objective", { type: "textarea", wide: true }),
      sessionField(session, "Materi", "materials", { type: "textarea" }),
      sessionField(session, "Praktik", "practice", { type: "textarea" }),
      sessionField(session, "Catatan", "notes", { type: "textarea" }),
      sessionField(session, "Homework", "homework", { type: "textarea" }),
      sessionField(session, "Waktu aktual", "actualMinutes", { type: "number", min: 0 }),
      sessionField(session, "Hasil sesi", "result", { type: "textarea", wide: true })
    );
    card.appendChild(grid);
    return card;
  }

  function renderSessions() {
    var participant = activeParticipant();
    var session = activeSession(participant);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(makeHeading(
      "SESSION PLANNER",
      "AI Marketing Production Lab",
      "Kelola sesi, rundown, campaign brief, storyboard, dan hasil praktik dalam satu alur.",
      [{ label: "Tambah Sesi", action: "add-session", variant: "button--primary" }]
    ));
    if (!session) {
      var emptyCard = create("section", "card");
      emptyCard.appendChild(makeEmpty("Belum ada sesi", "Buat sesi baru atau gunakan training template."));
      fragment.appendChild(emptyCard);
      refs.main.replaceChildren(fragment);
      return;
    }
    var layout = create("div", "session-layout");
    var tabs = create("div", "session-tabs");
    tabs.setAttribute("role", "tablist");
    tabs.setAttribute("aria-label", "Pilih sesi");
    participant.sessions.forEach(function (item) {
      var button = create("button");
      button.type = "button";
      button.dataset.action = "select-session";
      button.dataset.sessionNumber = item.number;
      button.setAttribute("role", "tab");
      button.setAttribute("aria-selected", item.number === session.number ? "true" : "false");
      var copy = create("span");
      append(copy, create("strong", "", item.title), create("small", "", item.status));
      append(button, create("span", "session-tab__number", String(item.number).padStart(2, "0")), copy);
      tabs.appendChild(button);
    });

    var content = create("div", "session-content");
    var hero = create("section", "card session-hero");
    append(
      hero,
      create("span", "section-kicker", "SESSION " + session.number + " · " + session.status.toUpperCase()),
      create("h2", "", session.title),
      create("p", "", session.subtitle || session.objective)
    );
    var meta = create("div", "session-meta-grid");
    [
      ["Tanggal", session.date ? formatDate(session.date, false) : participant.schedule.day],
      ["Waktu", session.time],
      ["Durasi", session.durationMinutes + " menit"],
      ["Status", session.status]
    ].forEach(function (item) {
      var box = create("div");
      append(box, create("span", "", item[0]), create("strong", "", item[1] || "—"));
      meta.appendChild(box);
    });
    append(hero, meta, renderTimer(session));
    content.appendChild(hero);
    content.appendChild(renderDeliverables(session));
    content.appendChild(renderTimeline(session));
    content.appendChild(renderCampaignBrief(participant));
    content.appendChild(renderStoryboard(participant));
    content.appendChild(renderSessionEditor(session));
    append(layout, tabs, content);
    fragment.appendChild(layout);
    refs.main.replaceChildren(fragment);
    syncClock();
  }

  function renderRoadmap() {
    var participant = activeParticipant();
    var fragment = document.createDocumentFragment();
    fragment.appendChild(makeHeading(
      "TRAINING ROADMAP",
      "Peta jalan " + participant.programName,
      "Empat tahap pilot yang dapat diedit, dipindahkan, diduplikasi, dan digunakan kembali.",
      [{ label: "Gunakan untuk Peserta Baru", action: "duplicate-participant", variant: "button--primary" }]
    ));
    if (!participant.sessions.length) {
      var empty = create("section", "card");
      empty.appendChild(makeEmpty("Belum ada sesi", "Buat sesi baru atau gunakan training template."));
      fragment.appendChild(empty);
      refs.main.replaceChildren(fragment);
      return;
    }
    var grid = create("section", "roadmap-grid");
    var colors = ["#8b5cf6", "#22d3ee", "#5eead4", "#e7b85c"];
    participant.sessions.forEach(function (session, index) {
      var card = create("article", "roadmap-card" + (session.status === "Completed" ? " is-completed" : ""));
      card.style.setProperty("--roadmap-color", colors[index % colors.length]);
      append(
        card,
        create("span", "roadmap-card__number", "SESSION " + session.number),
        create("h2", "", session.title),
        create("p", "", session.objective || session.subtitle || "Belum ada fokus sesi.")
      );
      var status = create("span", "small-badge", session.status);
      status.style.marginTop = "13px";
      card.appendChild(status);
      var actions = create("div", "card-actions");
      append(
        actions,
        makeButton("Edit", "edit-session", "button--quiet", { sessionId: session.id }),
        makeButton(session.status === "Completed" ? "Buka Lagi" : "Selesai", "toggle-session-complete", "button--quiet", { sessionId: session.id }),
        makeButton("↑", "move-session-up", "button--quiet", { sessionId: session.id }),
        makeButton("↓", "move-session-down", "button--quiet", { sessionId: session.id }),
        makeButton("Duplikasi", "duplicate-session", "button--quiet", { sessionId: session.id })
      );
      card.appendChild(actions);
      grid.appendChild(card);
    });
    fragment.appendChild(grid);
    var fullPrint = create("section", "card print-full-details");
    fullPrint.appendChild(makeCardHeader("Full Program", participant.name + " · " + participant.programName));
    participant.sessions.forEach(function (session) {
      var section = create("article", "data-item");
      append(
        section,
        create("span", "section-kicker", "SESSION " + session.number + " · " + session.status.toUpperCase()),
        create("h3", "", session.title),
        create("p", "", session.objective || session.subtitle || "Belum ada tujuan sesi.")
      );
      var deliverables = create("ul", "clean-list");
      (session.deliverables || []).forEach(function (item) {
        deliverables.appendChild(create("li", "", (item.completed ? "✓ " : "○ ") + item.label));
      });
      if (deliverables.childNodes.length) section.appendChild(deliverables);
      fullPrint.appendChild(section);
    });
    fragment.appendChild(fullPrint);
    refs.main.replaceChildren(fragment);
  }

  function renderPrompts() {
    var participant = activeParticipant();
    var fragment = document.createDocumentFragment();
    fragment.appendChild(makeHeading(
      "PROMPT TEMPLATES",
      "Prompt Template Library",
      "Simpan prompt reusable, variabel, tujuan, dan kategori untuk setiap participant.",
      [{ label: "Tambah Prompt", action: "add-prompt", variant: "button--primary" }]
    ));
    var filter = create("div", "filter-row");
    var search = create("input");
    search.type = "search";
    search.placeholder = "Cari prompt...";
    search.value = promptFilters.search;
    search.dataset.filterPrompts = "search";
    search.setAttribute("aria-label", "Cari prompt");
    var category = create("select");
    category.dataset.filterPrompts = "category";
    category.setAttribute("aria-label", "Filter kategori prompt");
    ["All"].concat(PROMPT_CATEGORIES).forEach(function (value) {
      var option = create("option", "", value === "All" ? "Semua kategori" : value);
      option.value = value;
      option.selected = value === promptFilters.category;
      category.appendChild(option);
    });
    append(filter, search, category);
    fragment.appendChild(filter);
    var query = promptFilters.search.trim().toLowerCase();
    var visible = participant.promptTemplates.filter(function (prompt) {
      var matchesSearch = !query || [prompt.title, prompt.purpose, prompt.promptText, prompt.category]
        .join(" ").toLowerCase().indexOf(query) >= 0;
      var matchesCategory = promptFilters.category === "All" || prompt.category === promptFilters.category;
      return matchesSearch && matchesCategory;
    });
    if (!visible.length) {
      var emptyCard = create("section", "card");
      emptyCard.appendChild(makeEmpty(
        participant.promptTemplates.length ? "Tidak ada prompt yang cocok" : "Belum ada prompt",
        "Ubah filter atau tambahkan prompt reusable pertama."
      ));
      fragment.appendChild(emptyCard);
      refs.main.replaceChildren(fragment);
      return;
    }
    var grid = create("section", "prompt-grid");
    visible.forEach(function (prompt) {
      var card = create("article", "prompt-card");
      var top = create("div", "prompt-card__top");
      var copy = create("div");
      append(
        copy,
        create("span", "section-kicker", prompt.category.toUpperCase()),
        create("h2", "", prompt.title)
      );
      append(top, copy, create("span", "prompt-card__favorite", prompt.favorite ? "★" : "☆"));
      append(
        card,
        top,
        create("p", "prompt-card__purpose", prompt.purpose || "Belum ada tujuan prompt."),
        create("div", "prompt-preview", prompt.promptText)
      );
      if (prompt.variables && prompt.variables.length) {
        var tags = create("ul", "tag-list");
        prompt.variables.forEach(function (variable) { tags.appendChild(create("li", "", "[" + variable + "]")); });
        tags.style.marginTop = "12px";
        card.appendChild(tags);
      }
      var actions = create("div", "card-actions");
      append(
        actions,
        makeButton("Copy", "copy-prompt", "button--primary", { promptId: prompt.id }),
        makeButton("Edit", "edit-prompt", "button--quiet", { promptId: prompt.id }),
        makeButton("Duplicate", "duplicate-prompt", "button--quiet", { promptId: prompt.id }),
        makeButton(prompt.favorite ? "Unfavorite" : "Favorite", "favorite-prompt", "button--quiet", { promptId: prompt.id }),
        makeButton("Delete", "delete-prompt", "button--danger", { promptId: prompt.id })
      );
      card.appendChild(actions);
      grid.appendChild(card);
    });
    fragment.appendChild(grid);
    refs.main.replaceChildren(fragment);
  }

  function renderPractice() {
    var participant = activeParticipant();
    var fragment = document.createDocumentFragment();
    fragment.appendChild(makeHeading(
      "PRACTICE RESULTS",
      "Hasil Praktik " + participant.name,
      "Dokumentasikan hasil yang dibuat tanpa menyimpan file besar di browser.",
      [{ label: "Tambah Hasil", action: "add-practice", variant: "button--primary" }]
    ));
    var card = create("section", "card");
    card.appendChild(makeCardHeader("Practice Results", "Link, lokasi file, catatan, dan status hasil praktik."));
    if (!participant.practiceResults.length) {
      card.appendChild(makeEmpty("Belum ada hasil praktik", "Tambahkan hasil setelah sesi berlangsung."));
    } else {
      var list = create("div", "data-list");
      participant.practiceResults.forEach(function (result) {
        var item = create("article", "data-item");
        var top = create("div", "data-item__top");
        append(top, create("h3", "", result.title), create("span", "small-badge", result.status || "Draft"));
        append(item, top, create("p", "", result.description || "Tidak ada deskripsi."));
        var meta = create("dl");
        [
          ["Sesi", "Session " + result.session],
          ["Lokasi", result.location || "Belum dicatat"]
        ].forEach(function (entry) {
          var row = create("div");
          append(row, create("dt", "", entry[0]), create("dd", "", entry[1]));
          meta.appendChild(row);
        });
        item.appendChild(meta);
        var actions = create("div", "card-actions");
        append(
          actions,
          makeButton("Edit", "edit-practice", "button--quiet", { resultId: result.id }),
          makeButton("Delete", "delete-practice", "button--danger", { resultId: result.id })
        );
        item.appendChild(actions);
        list.appendChild(item);
      });
      card.appendChild(list);
    }
    fragment.appendChild(card);
    refs.main.replaceChildren(fragment);
  }

  function renderHomework() {
    var participant = activeParticipant();
    var fragment = document.createDocumentFragment();
    fragment.appendChild(makeHeading(
      "HOMEWORK",
      "Tugas dan Follow-up",
      "Pantau tugas, respons peserta, serta feedback instructor per sesi.",
      [{ label: "Tambah Tugas", action: "add-homework", variant: "button--primary" }]
    ));
    var filter = create("div", "filter-row");
    var select = create("select");
    select.dataset.filterHomework = "true";
    select.setAttribute("aria-label", "Filter status homework");
    ["All"].concat(HOMEWORK_STATUSES).forEach(function (value) {
      var option = create("option", "", value === "All" ? "Semua status" : value);
      option.value = value;
      option.selected = value === homeworkFilter;
      select.appendChild(option);
    });
    filter.appendChild(select);
    fragment.appendChild(filter);
    var visible = participant.homework.filter(function (item) {
      return homeworkFilter === "All" || item.status === homeworkFilter;
    });
    var card = create("section", "card print-homework");
    card.appendChild(makeCardHeader("Homework List", visible.length + " tugas ditampilkan."));
    if (!visible.length) {
      card.appendChild(makeEmpty("Belum ada tugas untuk sesi ini", "Tambahkan tugas dengan target dan due date yang jelas."));
    } else {
      var list = create("div", "data-list");
      visible.forEach(function (homework) {
        var item = create("article", "data-item");
        var top = create("div", "data-item__top");
        append(top, create("h3", "", homework.title), create("span", "small-badge", homework.status));
        append(item, top, create("p", "", homework.description));
        var meta = create("dl");
        [
          ["Sesi", "Session " + homework.session],
          ["Due date", homework.dueDate ? formatDate(homework.dueDate, false) : "Belum ditentukan"]
        ].forEach(function (entry) {
          var row = create("div");
          append(row, create("dt", "", entry[0]), create("dd", "", entry[1]));
          meta.appendChild(row);
        });
        item.appendChild(meta);
        if (homework.participantResponse) {
          item.appendChild(create("p", "", "Respons: " + homework.participantResponse));
        }
        if (homework.instructorFeedback) {
          item.appendChild(create("p", "", "Feedback: " + homework.instructorFeedback));
        }
        var actions = create("div", "card-actions");
        append(
          actions,
          makeButton("Edit", "edit-homework", "button--quiet", { homeworkId: homework.id }),
          makeButton(
            homework.status === "Completed" ? "Buka Lagi" : "Tandai Selesai",
            "toggle-homework",
            "button--quiet",
            { homeworkId: homework.id }
          ),
          makeButton("Delete", "delete-homework", "button--danger", { homeworkId: homework.id })
        );
        item.appendChild(actions);
        list.appendChild(item);
      });
      card.appendChild(list);
    }
    fragment.appendChild(card);
    refs.main.replaceChildren(fragment);
  }

  function renderNotes() {
    var participant = activeParticipant();
    var fragment = document.createDocumentFragment();
    fragment.appendChild(makeHeading(
      "INSTRUCTOR NOTES",
      "Catatan Instructor",
      "Simpan insight pembelajaran, konteks bisnis, dan follow-up tanpa data rahasia.",
      [{ label: "Tambah Catatan", action: "add-note", variant: "button--primary" }]
    ));
    var filter = create("div", "filter-row");
    var select = create("select");
    select.dataset.filterNotes = "true";
    select.setAttribute("aria-label", "Filter kategori catatan");
    ["All"].concat(NOTE_CATEGORIES).forEach(function (value) {
      var option = create("option", "", value === "All" ? "Semua kategori" : value);
      option.value = value;
      option.selected = value === noteFilter;
      select.appendChild(option);
    });
    filter.appendChild(select);
    fragment.appendChild(filter);
    var visible = participant.instructorNotes
      .filter(function (note) { return noteFilter === "All" || note.category === noteFilter; })
      .slice()
      .sort(function (a, b) {
        return Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) ||
          String(b.date).localeCompare(String(a.date));
      });
    var card = create("section", "card print-notes");
    card.appendChild(makeCardHeader("Notes", visible.length + " catatan ditampilkan."));
    if (!visible.length) {
      card.appendChild(makeEmpty("Belum ada catatan", "Tambahkan insight setelah discovery atau sesi berlangsung."));
    } else {
      var list = create("div", "data-list");
      visible.forEach(function (note) {
        var item = create("article", "data-item");
        var top = create("div", "data-item__top");
        append(
          top,
          create("span", "section-kicker", note.category.toUpperCase()),
          create("span", "prompt-card__favorite", note.pinned ? "★" : "☆")
        );
        append(item, top, create("p", "", note.content));
        var meta = create("dl");
        [
          ["Tanggal", formatDate(note.date, false)],
          ["Sesi", "Session " + note.session]
        ].forEach(function (entry) {
          var row = create("div");
          append(row, create("dt", "", entry[0]), create("dd", "", entry[1]));
          meta.appendChild(row);
        });
        item.appendChild(meta);
        var actions = create("div", "card-actions");
        append(
          actions,
          makeButton("Edit", "edit-note", "button--quiet", { noteId: note.id }),
          makeButton(note.pinned ? "Unpin" : "Pin", "toggle-note-pin", "button--quiet", { noteId: note.id }),
          makeButton("Delete", "delete-note", "button--danger", { noteId: note.id })
        );
        item.appendChild(actions);
        list.appendChild(item);
      });
      card.appendChild(list);
    }
    fragment.appendChild(card);
    refs.main.replaceChildren(fragment);
  }

  function renderPreparation() {
    var participant = activeParticipant();
    var session = activeSession(participant);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(makeHeading(
      "PREPARATION CHECKLIST",
      "Persiapan Session " + participant.currentSession,
      "Checklist tersimpan per sesi, terpisah untuk instructor dan peserta.",
      [{ label: "Tambah Asset", action: "add-asset", variant: "button--primary" }]
    ));
    if (!session) {
      var empty = create("section", "card");
      empty.appendChild(makeEmpty("Belum ada sesi", "Tambahkan sesi sebelum membuat checklist."));
      fragment.appendChild(empty);
      refs.main.replaceChildren(fragment);
      return;
    }
    var grid = create("section", "checklist-grid print-checklist");
    [
      ["Checklist Instructor", "instructor"],
      ["Checklist Peserta", "participant"]
    ].forEach(function (config) {
      var card = create("article", "card");
      var items = session.preparationChecklist[config[1]] || [];
      var done = items.filter(function (item) { return item.completed; }).length;
      card.appendChild(makeCardHeader(config[0], done + " dari " + items.length + " siap."));
      if (!items.length) {
        card.appendChild(makeEmpty("Checklist kosong", "Tambahkan item saat mengedit template sesi."));
      } else {
        var list = create("div", "check-list");
        items.forEach(function (item) {
          list.appendChild(makeCheckbox(item.label, item.completed, {
            checklistType: config[1],
            itemId: item.id
          }));
        });
        card.appendChild(list);
        card.appendChild(progressBar("Kesiapan", percentage(done, items.length)));
      }
      grid.appendChild(card);
    });
    fragment.appendChild(grid);

    var assets = create("section", "card");
    assets.style.marginTop = "18px";
    assets.appendChild(makeCardHeader(
      "Assets Manager",
      "Metadata file dan link saja—file tidak disimpan di aplikasi.",
      [{ label: "Tambah Asset", action: "add-asset", variant: "button--quiet" }]
    ));
    var warning = create("div", "notice notice--warning");
    warning.appendChild(create("p", "", "File tidak disimpan di aplikasi. Simpan file di laptop atau cloud dan masukkan lokasi atau link-nya di sini."));
    assets.appendChild(warning);
    if (!participant.assets.length) {
      assets.appendChild(makeEmpty("Belum ada asset", "Catat lokasi logo, foto produk, storyboard, atau final export."));
    } else {
      var list = create("div", "data-list");
      list.style.marginTop = "16px";
      participant.assets.forEach(function (asset) {
        var item = create("article", "data-item");
        var top = create("div", "data-item__top");
        append(top, create("h3", "", asset.name), create("span", "small-badge", asset.status || "Needed"));
        append(item, top, create("p", "", asset.location || "Lokasi atau link belum dicatat."));
        var meta = create("dl");
        [
          ["Tipe", asset.type],
          ["Sesi", "Session " + asset.session]
        ].forEach(function (entry) {
          var row = create("div");
          append(row, create("dt", "", entry[0]), create("dd", "", entry[1]));
          meta.appendChild(row);
        });
        item.appendChild(meta);
        var actions = create("div", "card-actions");
        append(
          actions,
          makeButton("Edit", "edit-asset", "button--quiet", { assetId: asset.id }),
          makeButton("Delete", "delete-asset", "button--danger", { assetId: asset.id })
        );
        item.appendChild(actions);
        list.appendChild(item);
      });
      assets.appendChild(list);
    }
    fragment.appendChild(assets);
    refs.main.replaceChildren(fragment);
  }

  function renderSettings() {
    var participant = activeParticipant();
    var fragment = document.createDocumentFragment();
    fragment.appendChild(makeHeading(
      "SETTINGS",
      "Data, Backup, dan Preferensi",
      "Kelola data lokal, import, export, print, dan reset dengan aman."
    ));
    var grid = create("section", "settings-grid");

    var dataCard = create("article", "settings-card");
    append(
      dataCard,
      create("h2", "", "Backup dan Portabilitas"),
      create("p", "", "Ekspor data sebelum berpindah browser atau perangkat.")
    );
    var dataActions = create("div", "settings-actions");
    append(
      dataActions,
      makeButton("Export Current Participant", "export-current", "button--quiet"),
      makeButton("Export All Participants", "export-all", "button--quiet"),
      makeButton("Import Participant", "import-participant", "button--quiet"),
      makeButton("Import Full Backup", "import-full", "button--quiet")
    );
    dataCard.appendChild(dataActions);
    grid.appendChild(dataCard);

    var printCard = create("article", "settings-card");
    append(
      printCard,
      create("h2", "", "Print / Save PDF"),
      create("p", "", "Cetak tampilan terpilih melalui dialog print browser.")
    );
    var printActions = create("div", "settings-actions");
    append(
      printActions,
      makeButton("Pilih Bagian dan Print", "print", "button--quiet"),
      makeButton("Print Overview", "print-overview", "button--quiet"),
      makeButton("Print Current Session", "print-session", "button--quiet")
    );
    printCard.appendChild(printActions);
    grid.appendChild(printCard);

    var preferenceCard = create("article", "settings-card");
    append(
      preferenceCard,
      create("h2", "", "Preferensi Tampilan"),
      create("p", "", "Preferensi ini hanya berlaku pada perangkat ini.")
    );
    var compact = makeCheckbox("Gunakan tampilan lebih ringkas", Boolean(state.settings.compactMode), {
      setting: "compactMode"
    });
    preferenceCard.appendChild(compact);
    grid.appendChild(preferenceCard);

    var resetCard = create("article", "settings-card");
    append(
      resetCard,
      create("h2", "", "Reset Data"),
      create("p", "", "Mengembalikan Pak Handoyo dan seluruh template ke kondisi awal.")
    );
    var resetNotice = create("div", "notice notice--warning");
    resetNotice.appendChild(create("p", "", "Reset akan mengganti data planner pada browser ini. Tindakan memerlukan konfirmasi."));
    resetCard.appendChild(resetNotice);
    var resetButton = makeButton("Reset to Default Data", "reset-data", "button--danger");
    resetButton.style.marginTop = "14px";
    resetCard.appendChild(resetButton);
    grid.appendChild(resetCard);

    fragment.appendChild(grid);

    var storage = create("section", "card");
    storage.style.marginTop = "18px";
    storage.appendChild(makeCardHeader("Tentang Penyimpanan Lokal", "Namespace: " + STORAGE_KEY));
    var notice = create("div", "notice");
    notice.appendChild(create("p", "", "Data " + participant.name + " tersimpan di localStorage browser ini, tidak dikirim ke server. Data dapat hilang jika storage browser dihapus, perangkat rusak, atau browser di-reset. Jangan menyimpan password, token, API key, data pelanggan, atau informasi rahasia."));
    storage.appendChild(notice);
    storage.appendChild(infoRow("Schema version", String(state.schemaVersion || SCHEMA_VERSION)));
    storage.appendChild(infoRow("Terakhir diperbarui", formatDate(state.lastUpdated, true)));
    storage.appendChild(infoRow("Jumlah peserta", String(state.participants.length)));
    fragment.appendChild(storage);
    refs.main.replaceChildren(fragment);
  }

  function searchRecords(query) {
    var normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    var results = [];
    state.participants.forEach(function (participant) {
      function add(type, title, description, view) {
        var haystack = [type, title, description, participant.name, participant.businessName].join(" ").toLowerCase();
        if (haystack.indexOf(normalized) >= 0) {
          results.push({
            type: type,
            title: title,
            description: description,
            view: view,
            participantId: participant.id
          });
        }
      }
      add("Participant", participant.name, [participant.role, participant.businessName].filter(Boolean).join(" · "), "profile");
      participant.sessions.forEach(function (session) {
        add("Session", "Session " + session.number + " · " + session.title, session.objective || session.subtitle, "sessions");
      });
      participant.promptTemplates.forEach(function (prompt) {
        add("Prompt", prompt.title, prompt.category + " · " + prompt.purpose, "prompts");
      });
      participant.homework.forEach(function (homework) {
        add("Homework", homework.title, homework.description, "homework");
      });
      participant.instructorNotes.forEach(function (note) {
        add("Note", note.category, note.content, "notes");
      });
      participant.campaignBriefs.forEach(function (campaign) {
        add("Campaign", campaign.name || "Campaign tanpa nama", [campaign.product, campaign.goal].filter(Boolean).join(" · "), "sessions");
      });
    });
    return results.slice(0, 40);
  }

  function renderSearchResults() {
    var query = refs.globalSearch.value.trim();
    if (!query) {
      renderView();
      return;
    }
    var fragment = document.createDocumentFragment();
    fragment.appendChild(makeHeading(
      "GLOBAL SEARCH",
      "Hasil pencarian untuk “" + query + "”",
      "Cari participant, business, session, note, prompt, homework, dan campaign."
    ));
    var results = searchRecords(query);
    var card = create("section", "card");
    card.appendChild(makeCardHeader("Search Results", results.length + " hasil ditemukan."));
    if (!results.length) {
      card.appendChild(makeEmpty("Tidak ada hasil", "Coba kata kunci yang lebih singkat atau berbeda."));
    } else {
      var list = create("div", "search-results");
      results.forEach(function (result) {
        var item = create("article", "search-result");
        var copy = create("div");
        append(copy, create("h3", "", result.title), create("p", "", result.type + " · " + result.description));
        append(
          item,
          create("span", "search-result__icon", "⌕"),
          copy,
          makeButton("Buka", "open-search-result", "button--quiet", {
            participantId: result.participantId,
            targetView: result.view
          })
        );
        list.appendChild(item);
      });
      card.appendChild(list);
    }
    fragment.appendChild(card);
    refs.main.replaceChildren(fragment);
    updateChrome();
  }

  function renderView() {
    updateChrome();
    if (refs.globalSearch.value.trim()) {
      renderSearchResults();
      return;
    }
    window.clearInterval(clockTimer);
    clockTimer = null;
    switch (state.activeView) {
      case "profile":
        renderProfile();
        break;
      case "needs":
        renderNeeds();
        break;
      case "sessions":
        renderSessions();
        break;
      case "roadmap":
        renderRoadmap();
        break;
      case "prompts":
        renderPrompts();
        break;
      case "practice":
        renderPractice();
        break;
      case "homework":
        renderHomework();
        break;
      case "notes":
        renderNotes();
        break;
      case "preparation":
        renderPreparation();
        break;
      case "settings":
        renderSettings();
        break;
      default:
        state.activeView = "overview";
        renderOverview();
    }
    updateChrome();
  }

  function goToView(view) {
    state.activeView = view;
    refs.globalSearch.value = "";
    refs.body.classList.remove("sidebar-open");
    var menuButton = document.querySelector('[data-action="open-sidebar"]');
    if (menuButton) menuButton.setAttribute("aria-expanded", "false");
    scheduleSave();
    renderView();
    refs.main.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function syncClock() {
    window.clearInterval(clockTimer);
    var participant = activeParticipant();
    var session = activeSession(participant);
    if (!session || session.status !== "In Progress" || !session.startedAt) return;
    function update() {
      var readout = document.querySelector(".timer-readout");
      if (readout) readout.textContent = formatElapsed(Date.now() - new Date(session.startedAt).getTime());
    }
    update();
    clockTimer = window.setInterval(update, 1000);
  }

  function uniqueParticipantId(name) {
    var base = slugify(name);
    var candidate = base;
    var counter = 2;
    while (state.participants.some(function (participant) { return participant.id === candidate; })) {
      candidate = base + "-" + counter;
      counter += 1;
    }
    return candidate;
  }

  function cleanDuplicatedPlan(source, profile) {
    var participant = clone(source);
    var oldBusiness = participant.businessName || "";
    participant.id = uniqueParticipantId(profile.name);
    participant.name = profile.name;
    participant.role = profile.role || "";
    participant.businessName = profile.businessName || "";
    participant.businessType = profile.businessType || "";
    participant.businessLocation = profile.businessLocation || "";
    participant.education = profile.education || "";
    participant.experienceLevel = profile.experienceLevel || "Beginner";
    participant.toolsUsed = profile.toolsUsed || [];
    participant.mainGoals = profile.mainGoals || clone(source.mainGoals || []);
    participant.learningFormat = profile.learningFormat || "Offline";
    participant.participantCount = Number(profile.participantCount || 1);
    participant.sessionDurationMinutes = Number(profile.sessionDurationMinutes || source.sessionDurationMinutes || 90);
    participant.totalSessions = Number(profile.totalSessions || source.totalSessions || source.sessions.length || 4);
    participant.schedule = Object.assign({}, participant.schedule || {}, profile.schedule || {});
    participant.currentSession = 1;
    participant.programStatus = "Active";
    participant.notes = "";
    participant.currentWorkflow = "";
    participant.mainChallenges = [];
    participant.practiceResults = [];
    participant.instructorNotes = [];
    participant.assets = [];
    participant.storyboard = [];
    participant.campaignBriefs = (participant.campaignBriefs || []).slice(0, 1).map(function (campaign) {
      return Object.assign({}, campaign, {
        id: uid("campaign"),
        name: "",
        product: "",
        goal: "",
        audience: "",
        audienceProblem: "",
        solution: "",
        advantage: "",
        offer: "",
        cta: "",
        visualStyle: "",
        voiceOver: "",
        onScreenText: "",
        notes: ""
      });
    });
    participant.needsAssessment = clone(participant.needsAssessment || {});
    participant.needsAssessment.currentWorkflow = "";
    participant.needsAssessment.instructorNotes = "";
    participant.needsAssessment.problems = (participant.needsAssessment.problems || []).map(function (problem) {
      return { problem: problem.problem || "", currentProcess: "", desiredOutcome: problem.desiredOutcome || "" };
    });
    participant.sessions = (participant.sessions || []).map(function (session, index) {
      var copied = clone(session);
      copied.id = participant.id + "-session-" + (index + 1);
      copied.number = index + 1;
      copied.status = "Planned";
      copied.startedAt = null;
      copied.completedAt = null;
      copied.actualMinutes = "";
      copied.result = "";
      copied.notes = "";
      copied.homework = "";
      copied.deliverables = (copied.deliverables || []).map(function (item) {
        return Object.assign({}, item, { id: uid("deliverable"), completed: false });
      });
      copied.agenda = (copied.agenda || []).map(function (item) {
        return Object.assign({}, item, {
          id: uid("agenda"),
          completed: false,
          status: "Planned",
          actualMinutes: "",
          notes: ""
        });
      });
      ["instructor", "participant"].forEach(function (type) {
        copied.preparationChecklist[type] = (copied.preparationChecklist[type] || []).map(function (item) {
          return Object.assign({}, item, { id: uid(type), completed: false });
        });
      });
      return copied;
    });
    participant.homework = (participant.homework || []).map(function (item) {
      return Object.assign({}, item, {
        id: uid("homework"),
        status: "Not Started",
        participantResponse: "",
        instructorFeedback: ""
      });
    });
    participant.promptTemplates = (participant.promptTemplates || []).map(function (prompt) {
      var copiedPrompt = Object.assign({}, prompt, {
        id: uid("prompt"),
        participantId: participant.id,
        dateCreated: today(),
        lastEdited: today(),
        favorite: false
      });
      if (oldBusiness && participant.businessName) {
        copiedPrompt.promptText = String(copiedPrompt.promptText || "").split(oldBusiness).join(participant.businessName);
      }
      return copiedPrompt;
    });
    participant.activityLog = [{
      id: uid("activity"),
      date: new Date().toISOString(),
      text: "Program diduplikasi sebagai rencana baru."
    }];
    participant.totalSessions = participant.sessions.length || participant.totalSessions;
    return normalizeParticipant(participant);
  }

  function makeBlankParticipant(profile, template) {
    var base = clone(window.MOZAIQ_HANDOYO_PLAN);
    var emptySource = cleanDuplicatedPlan(base, profile);
    emptySource.programName = template ? template.name : "Custom Program";
    emptySource.templateId = template ? template.id : "custom-program";
    emptySource.mainGoals = profile.mainGoals || (template ? clone(template.goals || []) : []);
    emptySource.needsAssessment = {
      workField: "",
      businessType: profile.businessType || "",
      businessTarget: "",
      toolsUsed: (profile.toolsUsed || []).join(", "),
      skillLevel: profile.experienceLevel || "Beginner",
      currentWorkflow: "",
      workToAccelerate: "",
      biggestObstacle: "",
      desiredResult: "",
      marketingPlatforms: "",
      teamMembers: "",
      assetAvailability: "",
      instructorNotes: "",
      problems: [
        { problem: "", currentProcess: "", desiredOutcome: "" },
        { problem: "", currentProcess: "", desiredOutcome: "" },
        { problem: "", currentProcess: "", desiredOutcome: "" }
      ]
    };
    emptySource.promptTemplates = [];
    emptySource.homework = [];
    emptySource.campaignBriefs = [];
    if (!template || !template.sessions.length) {
      emptySource.sessions = [];
      for (var index = 0; index < Number(profile.totalSessions || 4); index += 1) {
        emptySource.sessions.push({
          id: emptySource.id + "-session-" + (index + 1),
          number: index + 1,
          title: "Session " + (index + 1),
          subtitle: "",
          date: "",
          time: profile.schedule.time || "",
          durationMinutes: Number(profile.sessionDurationMinutes || 90),
          objective: "",
          materials: "",
          practice: "",
          deliverables: [],
          preparationChecklist: { instructor: [], participant: [] },
          agenda: [],
          notes: "",
          homework: "",
          status: "Planned",
          actualMinutes: "",
          result: "",
          startedAt: null,
          completedAt: null
        });
      }
    } else {
      emptySource.sessions = template.sessions.map(function (sessionTemplate, index) {
        return {
          id: emptySource.id + "-session-" + (index + 1),
          number: index + 1,
          title: sessionTemplate.title,
          subtitle: sessionTemplate.subtitle,
          date: "",
          time: profile.schedule.time || "",
          durationMinutes: Number(profile.sessionDurationMinutes || 90),
          objective: sessionTemplate.focus,
          materials: "",
          practice: "",
          deliverables: [],
          preparationChecklist: { instructor: [], participant: [] },
          agenda: [],
          notes: "",
          homework: "",
          status: "Planned",
          actualMinutes: "",
          result: "",
          startedAt: null,
          completedAt: null
        };
      });
    }
    emptySource.totalSessions = emptySource.sessions.length;
    return normalizeParticipant(emptySource);
  }

  function collectParticipantProfile(body) {
    function value(name) {
      var input = body.querySelector('[name="' + name + '"]');
      return input ? input.value.trim() : "";
    }
    return {
      name: value("name"),
      role: value("role"),
      businessName: value("businessName"),
      businessType: value("businessType"),
      businessLocation: value("businessLocation"),
      education: value("education"),
      experienceLevel: value("experienceLevel") || "Beginner",
      toolsUsed: value("toolsUsed").split(",").map(function (item) { return item.trim(); }).filter(Boolean),
      mainGoals: value("mainGoals").split(",").map(function (item) { return item.trim(); }).filter(Boolean),
      learningFormat: value("learningFormat") || "Offline",
      participantCount: Number(value("participantCount") || 1),
      sessionDurationMinutes: Number(value("sessionDurationMinutes") || 90),
      totalSessions: Number(value("totalSessions") || 4),
      schedule: {
        day: value("scheduleDay"),
        time: value("scheduleTime"),
        recurrence: value("scheduleRecurrence") || "Mingguan",
        nextDate: ""
      }
    };
  }

  function openParticipantModal(duplicateOnly) {
    var sourceParticipant = activeParticipant();
    var body = create("div");
    var form = create("div", "form-grid");
    append(
      form,
      makeInput({ label: "Nama", name: "name", required: true, value: duplicateOnly ? "Salinan " + sourceParticipant.name : "" }),
      makeInput({ label: "Posisi", name: "role" }),
      makeInput({ label: "Nama usaha", name: "businessName" }),
      makeInput({ label: "Jenis usaha", name: "businessType" }),
      makeInput({ label: "Lokasi", name: "businessLocation" }),
      makeInput({ label: "Pendidikan", name: "education" }),
      makeInput({ label: "Experience level", name: "experienceLevel", type: "select", options: ["Beginner", "Intermediate", "Advanced"] }),
      makeInput({ label: "Tools used", name: "toolsUsed", help: "Pisahkan dengan koma." }),
      makeInput({ label: "Learning goals", name: "mainGoals", help: "Pisahkan dengan koma." }),
      makeInput({ label: "Session format", name: "learningFormat", type: "select", options: ["Offline", "Online", "Hybrid"] }),
      makeInput({ label: "Participant count", name: "participantCount", type: "number", min: 1, value: 1 }),
      makeInput({ label: "Session duration", name: "sessionDurationMinutes", type: "number", min: 15, step: 5, value: 90 }),
      makeInput({ label: "Schedule day", name: "scheduleDay", value: "Kamis" }),
      makeInput({ label: "Schedule time", name: "scheduleTime", value: "19.00–20.30" }),
      makeInput({ label: "Recurrence", name: "scheduleRecurrence", value: "Mingguan" }),
      makeInput({ label: "Total sessions", name: "totalSessions", type: "number", min: 1, value: 4 })
    );
    body.appendChild(form);
    var strategySection = create("div", "form-section");
    strategySection.appendChild(create("span", "form-section__label", "Struktur rencana"));
    var strategies = create("div", "modal-option-list");
    var options = duplicateOnly
      ? [
          {
            value: "duplicate-current",
            label: "Duplicate Current Plan",
            description: "Salin struktur program aktif tanpa progress, notes pribadi, atau practice result."
          }
        ]
      : [
          { value: "blank", label: "Start Blank Plan", description: "Buat sesi kosong sesuai jumlah pertemuan." },
          { value: "template", label: "Use Training Template", description: "Gunakan struktur dari library template." },
          { value: "duplicate-handoyo", label: "Duplicate Pak Handoyo Plan", description: "Salin program pilot lengkap tanpa progress dan catatan pribadi." },
          { value: "duplicate-current", label: "Duplicate Another Participant", description: "Salin struktur peserta aktif." }
        ];
    options.forEach(function (option, index) {
      var label = create("label", "radio-card");
      var radio = create("input");
      radio.type = "radio";
      radio.name = "planStrategy";
      radio.value = option.value;
      radio.checked = index === 0;
      var copy = create("span");
      append(copy, create("strong", "", option.label), create("small", "", option.description));
      append(label, radio, copy);
      strategies.appendChild(label);
    });
    strategySection.appendChild(strategies);
    if (!duplicateOnly) {
      var templateSelect = makeInput({
        label: "Training Template",
        name: "templateId",
        type: "select",
        value: "ai-marketing-production",
        options: window.MOZAIQ_TRAINING_TEMPLATES.map(function (template) {
          return { label: template.name, value: template.id };
        })
      });
      templateSelect.style.marginTop = "14px";
      strategySection.appendChild(templateSelect);
    }
    body.appendChild(strategySection);
    var privacy = create("div", "notice notice--warning");
    privacy.style.marginTop = "18px";
    privacy.appendChild(create("p", "", "Jangan masukkan password, API key, token, data pelanggan, atau informasi rahasia."));
    body.appendChild(privacy);
    openModal({
      title: duplicateOnly ? "Duplikasi Program" : "Tambah Peserta Baru",
      body: body,
      wide: true,
      actions: [
        { label: "Batal", variant: "button--quiet" },
        {
          label: duplicateOnly ? "Duplikasi Program" : "Simpan Peserta",
          variant: "button--primary",
          onClick: function () {
            var profile = collectParticipantProfile(body);
            if (!profile.name) {
              showToast("Nama peserta wajib diisi.", "danger");
              var nameInput = body.querySelector('[name="name"]');
              if (nameInput) nameInput.focus();
              return false;
            }
            var selectedStrategy = body.querySelector('[name="planStrategy"]:checked');
            var strategy = selectedStrategy ? selectedStrategy.value : "blank";
            var created;
            if (strategy === "duplicate-handoyo") {
              created = cleanDuplicatedPlan(window.MOZAIQ_HANDOYO_PLAN, profile);
            } else if (strategy === "duplicate-current") {
              created = cleanDuplicatedPlan(sourceParticipant, profile);
            } else {
              var templateIdInput = body.querySelector('[name="templateId"]');
              var templateId = templateIdInput ? templateIdInput.value : "custom-program";
              var template = strategy === "template"
                ? window.MOZAIQ_TRAINING_TEMPLATES.find(function (item) { return item.id === templateId; })
                : null;
              created = makeBlankParticipant(profile, template);
            }
            state.participants.push(created);
            state.activeParticipantId = created.id;
            state.activeView = "overview";
            storageReadFailed = false;
            saveNow();
            showToast(duplicateOnly ? "Program berhasil diduplikasi." : "Peserta baru berhasil dibuat.");
            renderView();
          }
        }
      ]
    });
  }

  function modalValue(body, name) {
    var input = body.querySelector('[name="' + name + '"]');
    if (!input) return "";
    if (input.type === "checkbox") return input.checked;
    return input.value.trim();
  }

  function openSessionModal(session) {
    var participant = activeParticipant();
    var existing = Boolean(session);
    var target = session || {
      id: uid("session"),
      number: participant.sessions.length + 1,
      title: "",
      subtitle: "",
      date: "",
      time: participant.schedule.time,
      durationMinutes: participant.sessionDurationMinutes,
      objective: "",
      materials: "",
      practice: "",
      deliverables: [],
      preparationChecklist: { instructor: [], participant: [] },
      agenda: [],
      notes: "",
      homework: "",
      status: "Planned",
      actualMinutes: "",
      result: "",
      startedAt: null,
      completedAt: null
    };
    var body = create("div", "form-grid");
    append(
      body,
      makeInput({ label: "Nomor sesi", name: "number", type: "number", min: 1, value: target.number }),
      makeInput({ label: "Status", name: "status", type: "select", options: SESSION_STATUSES, value: target.status }),
      makeInput({ label: "Judul", name: "title", value: target.title, wide: true, required: true }),
      makeInput({ label: "Subjudul", name: "subtitle", value: target.subtitle, wide: true }),
      makeInput({ label: "Tanggal", name: "date", type: "date", value: target.date }),
      makeInput({ label: "Jam", name: "time", value: target.time }),
      makeInput({ label: "Durasi", name: "durationMinutes", type: "number", min: 15, step: 5, value: target.durationMinutes }),
      makeInput({ label: "Tujuan", name: "objective", type: "textarea", value: target.objective, wide: true }),
      makeInput({ label: "Materi", name: "materials", type: "textarea", value: target.materials }),
      makeInput({ label: "Praktik", name: "practice", type: "textarea", value: target.practice }),
      makeInput({
        label: "Deliverables",
        name: "deliverables",
        type: "textarea",
        value: (target.deliverables || []).map(function (item) { return item.label; }).join("\n"),
        help: "Satu deliverable per baris.",
        wide: true
      })
    );
    openModal({
      title: existing ? "Edit Session " + target.number : "Tambah Sesi",
      body: body,
      wide: true,
      actions: [
        { label: "Batal", variant: "button--quiet" },
        {
          label: existing ? "Simpan Perubahan" : "Tambah Sesi",
          variant: "button--primary",
          onClick: function () {
            var title = modalValue(body, "title");
            if (!title) {
              showToast("Judul sesi wajib diisi.", "danger");
              return false;
            }
            target.number = Number(modalValue(body, "number") || target.number);
            target.status = modalValue(body, "status") || "Planned";
            target.title = title;
            target.subtitle = modalValue(body, "subtitle");
            target.date = modalValue(body, "date");
            target.time = modalValue(body, "time");
            target.durationMinutes = Number(modalValue(body, "durationMinutes") || 90);
            target.objective = modalValue(body, "objective");
            target.materials = modalValue(body, "materials");
            target.practice = modalValue(body, "practice");
            var previous = new Map((target.deliverables || []).map(function (item) { return [item.label, item]; }));
            target.deliverables = modalValue(body, "deliverables").split("\n").map(function (item) {
              return item.trim();
            }).filter(Boolean).map(function (label) {
              return previous.get(label) || { id: uid("deliverable"), label: label, completed: false };
            });
            if (!existing) participant.sessions.push(target);
            participant.sessions.sort(function (a, b) { return a.number - b.number; });
            participant.sessions.forEach(function (item, index) { item.number = index + 1; });
            participant.totalSessions = participant.sessions.length;
            participant.currentSession = Math.min(participant.currentSession, participant.totalSessions);
            logActivity(participant, (existing ? "Session diperbarui: " : "Session baru ditambahkan: ") + target.title);
            scheduleSave();
            showToast(existing ? "Rencana sesi diperbarui." : "Sesi baru ditambahkan.");
            renderView();
          }
        }
      ]
    });
  }

  function openPromptModal(prompt) {
    var participant = activeParticipant();
    var existing = Boolean(prompt);
    var target = prompt || {
      id: uid("prompt"),
      title: "",
      category: "Campaign Strategy",
      purpose: "",
      promptText: "",
      variables: [],
      participantId: participant.id,
      dateCreated: today(),
      lastEdited: today(),
      favorite: false
    };
    var body = create("div", "form-grid");
    append(
      body,
      makeInput({ label: "Title", name: "title", value: target.title, required: true }),
      makeInput({ label: "Category", name: "category", type: "select", options: PROMPT_CATEGORIES, value: target.category }),
      makeInput({ label: "Purpose", name: "purpose", type: "textarea", rows: 3, value: target.purpose, wide: true }),
      makeInput({ label: "Prompt text", name: "promptText", type: "textarea", rows: 12, value: target.promptText, wide: true, required: true }),
      makeInput({ label: "Variables", name: "variables", value: (target.variables || []).join(", "), wide: true, help: "Pisahkan dengan koma." })
    );
    openModal({
      title: existing ? "Edit Prompt" : "Tambah Prompt",
      body: body,
      wide: true,
      actions: [
        { label: "Batal", variant: "button--quiet" },
        {
          label: "Simpan Prompt",
          variant: "button--primary",
          onClick: function () {
            if (!modalValue(body, "title") || !modalValue(body, "promptText")) {
              showToast("Title dan prompt text wajib diisi.", "danger");
              return false;
            }
            target.title = modalValue(body, "title");
            target.category = modalValue(body, "category");
            target.purpose = modalValue(body, "purpose");
            target.promptText = modalValue(body, "promptText");
            target.variables = modalValue(body, "variables").split(",").map(function (item) { return item.trim(); }).filter(Boolean);
            target.lastEdited = today();
            target.participantId = participant.id;
            if (!existing) participant.promptTemplates.unshift(target);
            logActivity(participant, (existing ? "Prompt diperbarui: " : "Prompt ditambahkan: ") + target.title);
            scheduleSave();
            showToast("Prompt berhasil disimpan.");
            renderView();
          }
        }
      ]
    });
  }

  function openHomeworkModal(homework) {
    var participant = activeParticipant();
    var existing = Boolean(homework);
    var target = homework || {
      id: uid("homework"),
      title: "",
      description: "",
      session: participant.currentSession,
      dueDate: "",
      status: "Not Started",
      participantResponse: "",
      instructorFeedback: ""
    };
    var body = create("div", "form-grid");
    append(
      body,
      makeInput({ label: "Title", name: "title", value: target.title, required: true }),
      makeInput({
        label: "Session",
        name: "session",
        type: "select",
        value: target.session,
        options: participant.sessions.map(function (session) {
          return { label: "Session " + session.number, value: String(session.number) };
        })
      }),
      makeInput({ label: "Description", name: "description", type: "textarea", rows: 4, value: target.description, wide: true }),
      makeInput({ label: "Due date", name: "dueDate", type: "date", value: target.dueDate }),
      makeInput({ label: "Status", name: "status", type: "select", options: HOMEWORK_STATUSES, value: target.status }),
      makeInput({ label: "Participant response", name: "participantResponse", type: "textarea", value: target.participantResponse }),
      makeInput({ label: "Instructor feedback", name: "instructorFeedback", type: "textarea", value: target.instructorFeedback })
    );
    openModal({
      title: existing ? "Edit Homework" : "Tambah Homework",
      body: body,
      wide: true,
      actions: [
        { label: "Batal", variant: "button--quiet" },
        {
          label: "Simpan Homework",
          variant: "button--primary",
          onClick: function () {
            if (!modalValue(body, "title")) {
              showToast("Judul tugas wajib diisi.", "danger");
              return false;
            }
            target.title = modalValue(body, "title");
            target.description = modalValue(body, "description");
            target.session = Number(modalValue(body, "session") || participant.currentSession);
            target.dueDate = modalValue(body, "dueDate");
            target.status = modalValue(body, "status") || "Not Started";
            target.participantResponse = modalValue(body, "participantResponse");
            target.instructorFeedback = modalValue(body, "instructorFeedback");
            if (!existing) participant.homework.unshift(target);
            logActivity(participant, (existing ? "Homework diperbarui: " : "Homework ditambahkan: ") + target.title);
            scheduleSave();
            showToast("Homework berhasil disimpan.");
            renderView();
          }
        }
      ]
    });
  }

  function openNoteModal(note) {
    var participant = activeParticipant();
    var existing = Boolean(note);
    var target = note || {
      id: uid("note"),
      date: today(),
      category: "Participant Insight",
      content: "",
      session: participant.currentSession,
      pinned: false,
      participantId: participant.id
    };
    var body = create("div", "form-grid");
    append(
      body,
      makeInput({ label: "Date", name: "date", type: "date", value: target.date }),
      makeInput({ label: "Category", name: "category", type: "select", options: NOTE_CATEGORIES, value: target.category }),
      makeInput({
        label: "Session",
        name: "session",
        type: "select",
        value: target.session,
        options: participant.sessions.map(function (session) {
          return { label: "Session " + session.number, value: String(session.number) };
        })
      }),
      makeInput({ label: "Content", name: "content", type: "textarea", rows: 8, value: target.content, wide: true, required: true })
    );
    var pinned = makeCheckbox("Pin catatan penting", target.pinned, {});
    pinned.classList.add("field--wide");
    pinned.querySelector("input").name = "pinned";
    body.appendChild(pinned);
    openModal({
      title: existing ? "Edit Catatan" : "Tambah Catatan",
      body: body,
      wide: true,
      actions: [
        { label: "Batal", variant: "button--quiet" },
        {
          label: "Simpan Catatan",
          variant: "button--primary",
          onClick: function () {
            if (!modalValue(body, "content")) {
              showToast("Isi catatan wajib diisi.", "danger");
              return false;
            }
            target.date = modalValue(body, "date") || today();
            target.category = modalValue(body, "category");
            target.session = Number(modalValue(body, "session") || participant.currentSession);
            target.content = modalValue(body, "content");
            target.pinned = Boolean(modalValue(body, "pinned"));
            target.participantId = participant.id;
            if (!existing) participant.instructorNotes.unshift(target);
            logActivity(participant, existing ? "Catatan instructor diperbarui." : "Catatan instructor ditambahkan.");
            scheduleSave();
            showToast("Catatan berhasil disimpan.");
            renderView();
          }
        }
      ]
    });
  }

  function openPracticeModal(result) {
    var participant = activeParticipant();
    var existing = Boolean(result);
    var target = result || {
      id: uid("result"),
      title: "",
      description: "",
      session: participant.currentSession,
      location: "",
      status: "Draft",
      createdAt: today()
    };
    var body = create("div", "form-grid");
    append(
      body,
      makeInput({ label: "Title", name: "title", value: target.title, required: true }),
      makeInput({
        label: "Session",
        name: "session",
        type: "select",
        value: target.session,
        options: participant.sessions.map(function (session) {
          return { label: "Session " + session.number, value: String(session.number) };
        })
      }),
      makeInput({ label: "Status", name: "status", type: "select", options: ["Draft", "In Review", "Final"], value: target.status }),
      makeInput({ label: "Local path atau cloud link", name: "location", value: target.location }),
      makeInput({ label: "Description", name: "description", type: "textarea", rows: 6, value: target.description, wide: true })
    );
    openModal({
      title: existing ? "Edit Practice Result" : "Tambah Practice Result",
      body: body,
      wide: true,
      actions: [
        { label: "Batal", variant: "button--quiet" },
        {
          label: "Simpan Hasil",
          variant: "button--primary",
          onClick: function () {
            if (!modalValue(body, "title")) {
              showToast("Title hasil praktik wajib diisi.", "danger");
              return false;
            }
            target.title = modalValue(body, "title");
            target.session = Number(modalValue(body, "session") || participant.currentSession);
            target.status = modalValue(body, "status");
            target.location = modalValue(body, "location");
            target.description = modalValue(body, "description");
            if (!existing) participant.practiceResults.unshift(target);
            logActivity(participant, "Practice result disimpan: " + target.title);
            scheduleSave();
            showToast("Hasil praktik berhasil disimpan.");
            renderView();
          }
        }
      ]
    });
  }

  function openAssetModal(asset) {
    var participant = activeParticipant();
    var existing = Boolean(asset);
    var target = asset || {
      id: uid("asset"),
      name: "",
      type: "Product Photo",
      location: "",
      campaign: "",
      session: participant.currentSession,
      status: "Needed",
      notes: ""
    };
    var body = create("div", "form-grid");
    append(
      body,
      makeInput({ label: "Asset name", name: "name", value: target.name, required: true }),
      makeInput({ label: "Asset type", name: "type", type: "select", options: ASSET_TYPES, value: target.type }),
      makeInput({ label: "Local file path or cloud link", name: "location", value: target.location, wide: true }),
      makeInput({ label: "Campaign", name: "campaign", value: target.campaign }),
      makeInput({
        label: "Session",
        name: "session",
        type: "select",
        value: target.session,
        options: participant.sessions.map(function (session) {
          return { label: "Session " + session.number, value: String(session.number) };
        })
      }),
      makeInput({ label: "Status", name: "status", type: "select", options: ["Needed", "In Progress", "Ready", "Final"], value: target.status }),
      makeInput({ label: "Notes", name: "notes", type: "textarea", rows: 5, value: target.notes, wide: true })
    );
    var warning = create("div", "notice notice--warning field--wide");
    warning.appendChild(create("p", "", "File tidak disimpan di aplikasi. Simpan file di laptop atau cloud dan masukkan lokasi atau link-nya."));
    body.appendChild(warning);
    openModal({
      title: existing ? "Edit Asset" : "Tambah Asset",
      body: body,
      wide: true,
      actions: [
        { label: "Batal", variant: "button--quiet" },
        {
          label: "Simpan Asset",
          variant: "button--primary",
          onClick: function () {
            if (!modalValue(body, "name")) {
              showToast("Nama asset wajib diisi.", "danger");
              return false;
            }
            target.name = modalValue(body, "name");
            target.type = modalValue(body, "type");
            target.location = modalValue(body, "location");
            target.campaign = modalValue(body, "campaign");
            target.session = Number(modalValue(body, "session") || participant.currentSession);
            target.status = modalValue(body, "status");
            target.notes = modalValue(body, "notes");
            if (!existing) participant.assets.unshift(target);
            logActivity(participant, "Asset metadata disimpan: " + target.name);
            scheduleSave();
            showToast("Asset metadata berhasil disimpan.");
            renderView();
          }
        }
      ]
    });
  }

  function downloadJson(filename, payload) {
    try {
      var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var link = create("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(function () { URL.revokeObjectURL(url); }, 0);
      showToast("JSON berhasil diekspor.");
    } catch (error) {
      showToast("JSON tidak dapat diekspor.", "danger");
    }
  }

  function exportCurrent() {
    var participant = activeParticipant();
    downloadJson("mozaiq-training-" + slugify(participant.name) + "-" + today() + ".json", {
      type: "mozaiq-participant",
      schemaVersion: SCHEMA_VERSION,
      exportedAt: new Date().toISOString(),
      participant: clone(participant)
    });
  }

  function exportAll() {
    downloadJson("mozaiq-training-full-backup-" + today() + ".json", {
      type: "mozaiq-full-backup",
      schemaVersion: SCHEMA_VERSION,
      exportedAt: new Date().toISOString(),
      data: clone(state)
    });
  }

  function validateParticipant(value) {
    if (!value || typeof value !== "object") return { valid: false, message: "Data participant bukan object." };
    if (typeof value.id !== "string" || typeof value.name !== "string" || !value.name.trim()) {
      return { valid: false, message: "Participant harus memiliki id dan name." };
    }
    if (!Array.isArray(value.sessions)) return { valid: false, message: "Field sessions harus berupa array." };
    return { valid: true, participant: normalizeParticipant(clone(value)) };
  }

  function handleImportPayload(parsed, requestedType) {
    if (!parsed || typeof parsed !== "object") {
      showToast("Struktur JSON tidak dikenali.", "danger");
      return;
    }
    if (requestedType === "full" || parsed.type === "mozaiq-full-backup") {
      var full = parsed.data || parsed;
      if (!full || !Array.isArray(full.participants) || !full.participants.length) {
        showToast("Full backup tidak memiliki participant yang valid.", "danger");
        return;
      }
      var preview = create("div");
      append(
        preview,
        create("div", "notice", "Backup berisi " + full.participants.length + " participant dan akan mengganti seluruh data lokal."),
        create("p", "", "Participant pertama: " + (full.participants[0].name || "Tanpa nama"))
      );
      openModal({
        title: "Preview Full Backup",
        body: preview,
        actions: [
          { label: "Batal", variant: "button--quiet" },
          {
            label: "Replace Full Data",
            variant: "button--danger",
            onClick: function () {
              state = {
                schemaVersion: SCHEMA_VERSION,
                lastUpdated: new Date().toISOString(),
                activeParticipantId: full.activeParticipantId,
                activeView: "overview",
                participants: full.participants.map(normalizeParticipant),
                settings: Object.assign(safeDefaults().settings, full.settings || {})
              };
              if (!state.participants.some(function (item) { return item.id === state.activeParticipantId; })) {
                state.activeParticipantId = state.participants[0].id;
              }
              storageReadFailed = false;
              saveNow();
              showToast("Full backup berhasil diimpor.");
              renderView();
            }
          }
        ]
      });
      return;
    }
    var candidate = parsed.participant || parsed;
    var validation = validateParticipant(candidate);
    if (!validation.valid) {
      showToast("Import ditolak: " + validation.message, "danger");
      return;
    }
    var incoming = validation.participant;
    var conflict = state.participants.find(function (participant) { return participant.id === incoming.id; });
    var body = create("div");
    append(
      body,
      infoRow("Participant", incoming.name),
      infoRow("Business", incoming.businessName || "—"),
      infoRow("Jumlah sessions", String(incoming.sessions.length)),
      infoRow("Konflik ID", conflict ? "Ya — " + incoming.id : "Tidak")
    );
    var optionsWrap = create("div", "modal-option-list");
    optionsWrap.style.marginTop = "16px";
    var choices = conflict ? [
      ["duplicate", "Duplicate", "Buat ID baru dan pertahankan participant lama."],
      ["replace", "Replace", "Ganti participant yang memiliki ID sama."],
      ["cancel", "Cancel", "Jangan mengubah data."]
    ] : [
      ["add", "Import Participant", "Tambahkan participant ke planner."],
      ["cancel", "Cancel", "Jangan mengubah data."]
    ];
    choices.forEach(function (choice, index) {
      var label = create("label", "radio-card");
      var radio = create("input");
      radio.type = "radio";
      radio.name = "importChoice";
      radio.value = choice[0];
      radio.checked = index === 0;
      var copy = create("span");
      append(copy, create("strong", "", choice[1]), create("small", "", choice[2]));
      append(label, radio, copy);
      optionsWrap.appendChild(label);
    });
    body.appendChild(optionsWrap);
    openModal({
      title: "Preview Import Participant",
      body: body,
      actions: [
        { label: "Batal", variant: "button--quiet" },
        {
          label: "Lanjutkan Import",
          variant: "button--primary",
          onClick: function () {
            var selected = body.querySelector('[name="importChoice"]:checked');
            var choice = selected ? selected.value : "cancel";
            if (choice === "cancel") return;
            if (choice === "duplicate") {
              incoming.id = uniqueParticipantId(incoming.name);
              incoming.promptTemplates.forEach(function (prompt) { prompt.participantId = incoming.id; });
              incoming.instructorNotes.forEach(function (note) { note.participantId = incoming.id; });
              incoming.sessions.forEach(function (session, index) {
                session.id = incoming.id + "-session-" + (index + 1);
              });
              state.participants.push(incoming);
            } else if (choice === "replace") {
              state.participants[state.participants.indexOf(conflict)] = incoming;
            } else {
              state.participants.push(incoming);
            }
            state.activeParticipantId = incoming.id;
            storageReadFailed = false;
            saveNow();
            showToast("Participant berhasil diimpor.");
            renderView();
          }
        }
      ]
    });
  }

  function requestImport(type) {
    refs.importFile.value = "";
    refs.importFile.dataset.importType = type;
    refs.importFile.click();
  }

  function campaignAsText(campaign) {
    var labels = [
      ["Nama campaign", "name"],
      ["Produk atau promo", "product"],
      ["Tujuan", "goal"],
      ["Platform", "platform"],
      ["Target audiens", "audience"],
      ["Masalah audiens", "audienceProblem"],
      ["Solusi", "solution"],
      ["Keunggulan", "advantage"],
      ["Penawaran", "offer"],
      ["CTA", "cta"],
      ["Durasi video", "duration"],
      ["Format", "format"],
      ["Gaya visual", "visualStyle"],
      ["Voice-over", "voiceOver"],
      ["Teks layar", "onScreenText"],
      ["Batasan", "constraints"],
      ["Catatan", "notes"]
    ];
    return labels.map(function (item) {
      return item[0] + ":\n" + (campaign[item[1]] || "—");
    }).join("\n\n");
  }

  function copyText(value, successMessage) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(value).then(function () {
        showToast(successMessage || "Teks berhasil disalin.");
      }).catch(function () {
        fallbackCopy(value, successMessage);
      });
    } else {
      fallbackCopy(value, successMessage);
    }
  }

  function fallbackCopy(value, successMessage) {
    var area = create("textarea");
    area.value = value;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand("copy");
      showToast(successMessage || "Teks berhasil disalin.");
    } catch (error) {
      showToast("Teks tidak dapat disalin otomatis.", "danger");
    }
    area.remove();
  }

  function openPrintModal() {
    var body = create("div", "modal-option-list");
    var scopes = [
      ["overview", "Participant Overview"],
      ["session", "Current Session Plan"],
      ["full", "Full Program"],
      ["campaign", "Campaign Brief"],
      ["storyboard", "Storyboard"],
      ["homework", "Homework"],
      ["notes", "Instructor Notes"],
      ["checklist", "Preparation Checklist"]
    ];
    scopes.forEach(function (scope, index) {
      var label = create("label", "radio-card");
      var radio = create("input");
      radio.type = "radio";
      radio.name = "printScope";
      radio.value = scope[0];
      radio.checked = (state.settings.printScope || "overview") === scope[0] || (!state.settings.printScope && index === 0);
      var copy = create("span");
      append(copy, create("strong", "", scope[1]), create("small", "", "Cetak hanya data participant aktif."));
      append(label, radio, copy);
      body.appendChild(label);
    });
    openModal({
      title: "Print / Save PDF",
      body: body,
      actions: [
        { label: "Batal", variant: "button--quiet" },
        {
          label: "Siapkan Print",
          variant: "button--primary",
          onClick: function () {
            var selected = body.querySelector('[name="printScope"]:checked');
            printScope(selected ? selected.value : "overview");
          }
        }
      ]
    });
  }

  function printScope(scope) {
    var viewMap = {
      overview: "overview",
      session: "sessions",
      full: "roadmap",
      campaign: "sessions",
      storyboard: "sessions",
      homework: "homework",
      notes: "notes",
      checklist: "preparation"
    };
    state.settings.printScope = scope;
    state.activeView = viewMap[scope] || "overview";
    refs.body.dataset.printScope = scope;
    renderView();
    window.setTimeout(function () { window.print(); }, 120);
  }

  function resetData() {
    state = safeDefaults();
    storageReadFailed = false;
    rawCorruptStorage = "";
    saveNow();
    refs.globalSearch.value = "";
    showToast("Data default berhasil dipulihkan.");
    renderView();
  }

  function startCurrentSession() {
    var participant = activeParticipant();
    var session = activeSession(participant);
    if (!session) {
      showToast("Belum ada sesi untuk dimulai.", "danger");
      return;
    }
    if (session.status === "Completed") {
      showToast("Sesi ini sudah selesai. Buka kembali melalui roadmap bila perlu.");
      return;
    }
    if (!session.startedAt) session.startedAt = new Date().toISOString();
    session.status = "In Progress";
    var firstAgenda = session.agenda.find(function (agenda) { return !agenda.completed; });
    if (firstAgenda && !session.agenda.some(function (agenda) { return agenda.status === "In Progress"; })) {
      firstAgenda.status = "In Progress";
    }
    logActivity(participant, "Session " + session.number + " dimulai.");
    scheduleSave();
    state.activeView = "sessions";
    showToast("Sesi dimulai. Waktu mulai tersimpan di perangkat.");
    renderView();
  }

  function completeCurrentSession() {
    var participant = activeParticipant();
    var session = activeSession(participant);
    if (!session) return;
    confirmAction(
      "Tandai Sesi Selesai",
      "Session " + session.number + " akan ditandai Completed. Hasil dan catatan tetap dapat diedit.",
      "Tandai Selesai",
      function () {
        session.status = "Completed";
        session.completedAt = new Date().toISOString();
        if (session.startedAt && !session.actualMinutes) {
          session.actualMinutes = Math.max(1, Math.round((Date.now() - new Date(session.startedAt).getTime()) / 60000));
        }
        session.agenda.forEach(function (agenda) {
          if (agenda.status === "In Progress") agenda.status = "Completed";
        });
        logActivity(participant, "Session " + session.number + " diselesaikan.");
        scheduleSave();
        showToast("Sesi berhasil ditandai selesai.");
        renderView();
      }
    );
  }

  function findSessionById(id) {
    return activeParticipant().sessions.find(function (session) { return session.id === id; });
  }

  function arrayItem(array, id) {
    return (array || []).find(function (item) { return item.id === id; });
  }

  function moveItem(array, id, direction) {
    var index = array.findIndex(function (item) { return item.id === id; });
    var target = index + direction;
    if (index < 0 || target < 0 || target >= array.length) return false;
    var item = array.splice(index, 1)[0];
    array.splice(target, 0, item);
    return true;
  }

  function addScene() {
    var participant = activeParticipant();
    participant.storyboard.push({
      id: uid("scene"),
      duration: "3 detik",
      purpose: "",
      visual: "",
      text: "",
      action: "",
      camera: "",
      transition: "",
      assetStatus: "Needed",
      notes: ""
    });
    logActivity(participant, "Scene storyboard ditambahkan.");
    scheduleSave();
    renderView();
    showToast("Scene baru ditambahkan.");
  }

  function addCampaign() {
    var participant = activeParticipant();
    participant.campaignBriefs.unshift({
      id: uid("campaign"),
      name: "",
      product: "",
      goal: "",
      platform: "",
      audience: "",
      audienceProblem: "",
      solution: "",
      advantage: "",
      offer: "",
      cta: "",
      duration: "15 detik",
      format: "Vertikal 9:16",
      visualStyle: "",
      voiceOver: "",
      onScreenText: "",
      constraints: "Hindari klaim harga atau benefit yang belum dipastikan.",
      notes: ""
    });
    scheduleSave();
    renderView();
  }

  function handleClick(event) {
    var viewButton = event.target.closest("[data-view]");
    if (viewButton) {
      goToView(viewButton.dataset.view);
      return;
    }
    var actionButton = event.target.closest("[data-action]");
    if (!actionButton) return;
    var action = actionButton.dataset.action;
    var participant = activeParticipant();
    var session = activeSession(participant);
    switch (action) {
      case "open-sidebar": {
        refs.body.classList.add("sidebar-open");
        actionButton.setAttribute("aria-expanded", "true");
        var firstNav = refs.sidebar.querySelector("[data-view]");
        if (firstNav) firstNav.focus();
        break;
      }
      case "close-sidebar": {
        refs.body.classList.remove("sidebar-open");
        var menuButton = document.querySelector('[data-action="open-sidebar"]');
        if (menuButton) menuButton.setAttribute("aria-expanded", "false");
        break;
      }
      case "close-modal":
        closeModal();
        break;
      case "add-participant":
        openParticipantModal(false);
        break;
      case "duplicate-participant":
        openParticipantModal(true);
        break;
      case "edit-profile":
        goToView("profile");
        break;
      case "edit-plan":
      case "go-sessions":
        goToView("sessions");
        break;
      case "go-homework":
        goToView("homework");
        break;
      case "start-session":
        startCurrentSession();
        break;
      case "complete-session":
        completeCurrentSession();
        break;
      case "select-session":
        participant.currentSession = Number(actionButton.dataset.sessionNumber);
        scheduleSave();
        renderView();
        break;
      case "add-session":
        openSessionModal(null);
        break;
      case "edit-session":
        openSessionModal(findSessionById(actionButton.dataset.sessionId));
        break;
      case "toggle-session-complete": {
        var toggleSession = findSessionById(actionButton.dataset.sessionId);
        if (!toggleSession) break;
        toggleSession.status = toggleSession.status === "Completed" ? "Planned" : "Completed";
        toggleSession.completedAt = toggleSession.status === "Completed" ? new Date().toISOString() : null;
        logActivity(participant, "Status " + toggleSession.title + " diubah menjadi " + toggleSession.status + ".");
        scheduleSave();
        renderView();
        break;
      }
      case "move-session-up":
      case "move-session-down": {
        var moved = moveItem(participant.sessions, actionButton.dataset.sessionId, action === "move-session-up" ? -1 : 1);
        if (moved) {
          participant.sessions.forEach(function (item, index) { item.number = index + 1; });
          participant.currentSession = Math.min(participant.currentSession, participant.sessions.length);
          scheduleSave();
          renderView();
        }
        break;
      }
      case "duplicate-session": {
        var sourceSession = findSessionById(actionButton.dataset.sessionId);
        if (!sourceSession) break;
        var duplicatedSession = clone(sourceSession);
        duplicatedSession.id = uid("session");
        duplicatedSession.number = participant.sessions.length + 1;
        duplicatedSession.title = sourceSession.title + " — Copy";
        duplicatedSession.status = "Planned";
        duplicatedSession.startedAt = null;
        duplicatedSession.completedAt = null;
        duplicatedSession.actualMinutes = "";
        duplicatedSession.result = "";
        duplicatedSession.notes = "";
        duplicatedSession.deliverables.forEach(function (item) { item.id = uid("deliverable"); item.completed = false; });
        duplicatedSession.agenda.forEach(function (item) {
          item.id = uid("agenda");
          item.completed = false;
          item.status = "Planned";
          item.actualMinutes = "";
          item.notes = "";
        });
        ["instructor", "participant"].forEach(function (type) {
          duplicatedSession.preparationChecklist[type].forEach(function (item) {
            item.id = uid(type);
            item.completed = false;
          });
        });
        participant.sessions.push(duplicatedSession);
        participant.totalSessions = participant.sessions.length;
        scheduleSave();
        showToast("Sesi berhasil diduplikasi.");
        renderView();
        break;
      }
      case "start-agenda": {
        var agenda = arrayItem(session.agenda, actionButton.dataset.agendaId);
        if (!agenda) break;
        session.agenda.forEach(function (item) {
          if (item.status === "In Progress") item.status = item.completed ? "Completed" : "Planned";
        });
        agenda.status = "In Progress";
        if (!session.startedAt) session.startedAt = new Date().toISOString();
        session.status = "In Progress";
        scheduleSave();
        renderView();
        showToast("Agenda “" + agenda.title + "” dimulai.");
        break;
      }
      case "finish-agenda": {
        var finishedAgenda = arrayItem(session.agenda, actionButton.dataset.agendaId);
        if (!finishedAgenda) break;
        finishedAgenda.status = "Completed";
        finishedAgenda.completed = true;
        scheduleSave();
        renderView();
        showToast("Agenda selesai.");
        break;
      }
      case "add-campaign":
        addCampaign();
        break;
      case "save-campaign":
        saveNow();
        logActivity(participant, "Campaign brief disimpan.");
        showToast("Campaign brief berhasil disimpan.");
        break;
      case "copy-campaign":
        if (participant.campaignBriefs[0]) copyText(campaignAsText(participant.campaignBriefs[0]), "Campaign brief disalin.");
        break;
      case "duplicate-campaign": {
        var sourceCampaign = participant.campaignBriefs[0];
        if (!sourceCampaign) break;
        var campaignCopy = clone(sourceCampaign);
        campaignCopy.id = uid("campaign");
        campaignCopy.name = (campaignCopy.name || "Campaign") + " — Copy";
        participant.campaignBriefs.unshift(campaignCopy);
        scheduleSave();
        showToast("Campaign berhasil diduplikasi.");
        renderView();
        break;
      }
      case "clear-campaign":
        confirmAction(
          "Kosongkan Campaign Brief",
          "Seluruh field campaign aktif akan dikosongkan. Tindakan ini tidak dapat diurungkan setelah autosave.",
          "Kosongkan",
          function () {
            var currentCampaign = participant.campaignBriefs[0];
            if (!currentCampaign) return;
            Object.keys(currentCampaign).forEach(function (key) {
              if (key !== "id" && key !== "duration" && key !== "format" && key !== "constraints") currentCampaign[key] = "";
            });
            scheduleSave();
            renderView();
            showToast("Campaign brief dikosongkan.");
          },
          true
        );
        break;
      case "print-campaign":
        printScope("campaign");
        break;
      case "add-scene":
        addScene();
        break;
      case "move-scene-up":
      case "move-scene-down":
        if (moveItem(participant.storyboard, actionButton.dataset.sceneId, action === "move-scene-up" ? -1 : 1)) {
          scheduleSave();
          renderView();
        }
        break;
      case "duplicate-scene": {
        var scene = arrayItem(participant.storyboard, actionButton.dataset.sceneId);
        if (!scene) break;
        var sceneCopy = clone(scene);
        sceneCopy.id = uid("scene");
        var sceneIndex = participant.storyboard.indexOf(scene);
        participant.storyboard.splice(sceneIndex + 1, 0, sceneCopy);
        scheduleSave();
        renderView();
        showToast("Scene berhasil diduplikasi.");
        break;
      }
      case "remove-scene": {
        var removeSceneId = actionButton.dataset.sceneId;
        confirmAction("Hapus Scene", "Scene ini akan dihapus dari storyboard.", "Hapus Scene", function () {
          participant.storyboard = participant.storyboard.filter(function (item) { return item.id !== removeSceneId; });
          scheduleSave();
          renderView();
          showToast("Scene dihapus.");
        }, true);
        break;
      }
      case "add-prompt":
        openPromptModal(null);
        break;
      case "edit-prompt":
        openPromptModal(arrayItem(participant.promptTemplates, actionButton.dataset.promptId));
        break;
      case "copy-prompt": {
        var prompt = arrayItem(participant.promptTemplates, actionButton.dataset.promptId);
        if (prompt) copyText(prompt.promptText, "Prompt berhasil disalin.");
        break;
      }
      case "duplicate-prompt": {
        var promptSource = arrayItem(participant.promptTemplates, actionButton.dataset.promptId);
        if (!promptSource) break;
        var promptCopy = clone(promptSource);
        promptCopy.id = uid("prompt");
        promptCopy.title += " — Copy";
        promptCopy.favorite = false;
        promptCopy.dateCreated = today();
        promptCopy.lastEdited = today();
        participant.promptTemplates.unshift(promptCopy);
        scheduleSave();
        renderView();
        showToast("Prompt berhasil diduplikasi.");
        break;
      }
      case "favorite-prompt": {
        var favoritePrompt = arrayItem(participant.promptTemplates, actionButton.dataset.promptId);
        if (!favoritePrompt) break;
        favoritePrompt.favorite = !favoritePrompt.favorite;
        favoritePrompt.lastEdited = today();
        scheduleSave();
        renderView();
        break;
      }
      case "delete-prompt": {
        var promptId = actionButton.dataset.promptId;
        confirmAction("Hapus Prompt", "Prompt akan dihapus dari library participant aktif.", "Hapus Prompt", function () {
          participant.promptTemplates = participant.promptTemplates.filter(function (item) { return item.id !== promptId; });
          scheduleSave();
          renderView();
          showToast("Prompt dihapus.");
        }, true);
        break;
      }
      case "add-homework":
        openHomeworkModal(null);
        break;
      case "edit-homework":
        openHomeworkModal(arrayItem(participant.homework, actionButton.dataset.homeworkId));
        break;
      case "toggle-homework": {
        var homework = arrayItem(participant.homework, actionButton.dataset.homeworkId);
        if (!homework) break;
        homework.status = homework.status === "Completed" ? "Not Started" : "Completed";
        scheduleSave();
        renderView();
        showToast("Status homework diperbarui.");
        break;
      }
      case "delete-homework": {
        var homeworkId = actionButton.dataset.homeworkId;
        confirmAction("Hapus Homework", "Homework ini akan dihapus dari participant aktif.", "Hapus Homework", function () {
          participant.homework = participant.homework.filter(function (item) { return item.id !== homeworkId; });
          scheduleSave();
          renderView();
          showToast("Homework dihapus.");
        }, true);
        break;
      }
      case "add-note":
        openNoteModal(null);
        break;
      case "edit-note":
        openNoteModal(arrayItem(participant.instructorNotes, actionButton.dataset.noteId));
        break;
      case "toggle-note-pin": {
        var note = arrayItem(participant.instructorNotes, actionButton.dataset.noteId);
        if (!note) break;
        note.pinned = !note.pinned;
        scheduleSave();
        renderView();
        break;
      }
      case "delete-note": {
        var noteId = actionButton.dataset.noteId;
        confirmAction("Hapus Catatan", "Catatan instructor ini akan dihapus.", "Hapus Catatan", function () {
          participant.instructorNotes = participant.instructorNotes.filter(function (item) { return item.id !== noteId; });
          scheduleSave();
          renderView();
          showToast("Catatan dihapus.");
        }, true);
        break;
      }
      case "add-practice":
        openPracticeModal(null);
        break;
      case "edit-practice":
        openPracticeModal(arrayItem(participant.practiceResults, actionButton.dataset.resultId));
        break;
      case "delete-practice": {
        var resultId = actionButton.dataset.resultId;
        confirmAction("Hapus Practice Result", "Metadata hasil praktik ini akan dihapus.", "Hapus Hasil", function () {
          participant.practiceResults = participant.practiceResults.filter(function (item) { return item.id !== resultId; });
          scheduleSave();
          renderView();
          showToast("Hasil praktik dihapus.");
        }, true);
        break;
      }
      case "add-asset":
        openAssetModal(null);
        break;
      case "edit-asset":
        openAssetModal(arrayItem(participant.assets, actionButton.dataset.assetId));
        break;
      case "delete-asset": {
        var assetId = actionButton.dataset.assetId;
        confirmAction("Hapus Asset", "Hanya metadata asset yang dihapus; file asli tidak terpengaruh.", "Hapus Asset", function () {
          participant.assets = participant.assets.filter(function (item) { return item.id !== assetId; });
          scheduleSave();
          renderView();
          showToast("Metadata asset dihapus.");
        }, true);
        break;
      }
      case "export-current":
        exportCurrent();
        break;
      case "export-all":
        exportAll();
        break;
      case "import-participant":
        requestImport("participant");
        break;
      case "import-full":
        requestImport("full");
        break;
      case "print":
        openPrintModal();
        break;
      case "print-overview":
        printScope("overview");
        break;
      case "print-session":
        printScope("session");
        break;
      case "reset-data":
        confirmAction(
          "Reset to Default Data",
          "Seluruh perubahan lokal akan diganti dengan data default Pak Handoyo. Ekspor backup terlebih dahulu bila perlu.",
          "Reset Data",
          resetData,
          true
        );
        break;
      case "fullscreen":
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(function () {
            showToast("Mode fullscreen tidak didukung browser ini.", "danger");
          });
        } else {
          document.exitFullscreen();
        }
        break;
      case "open-search-result":
        state.activeParticipantId = actionButton.dataset.participantId;
        goToView(actionButton.dataset.targetView);
        break;
      default:
        break;
    }
  }

  function inputValue(input) {
    if (input.type === "checkbox") return input.checked;
    if (input.type === "number") return input.value === "" ? "" : Number(input.value);
    return input.value;
  }

  function handleInput(event) {
    var input = event.target;
    var participant = activeParticipant();
    var session = activeSession(participant);
    if (input === refs.globalSearch) {
      renderSearchResults();
      return;
    }
    if (input.dataset.filterPrompts) {
      if (input.dataset.filterPrompts === "search") promptFilters.search = input.value;
      if (input.dataset.filterPrompts === "category") promptFilters.category = input.value;
      var filterType = input.dataset.filterPrompts;
      window.clearTimeout(promptFilterTimer);
      promptFilterTimer = window.setTimeout(function () {
        renderPrompts();
        var next = refs.main.querySelector('[data-filter-prompts="' + filterType + '"]');
        if (next && filterType === "search") {
          next.focus();
          next.setSelectionRange(next.value.length, next.value.length);
        }
      }, filterType === "search" ? 130 : 0);
      return;
    }
    if (input.dataset.filterNotes) {
      noteFilter = input.value;
      renderNotes();
      return;
    }
    if (input.dataset.filterHomework) {
      homeworkFilter = input.value;
      renderHomework();
      return;
    }
    if (input.dataset.bind) {
      var bindValue = inputValue(input);
      if (input.dataset.bind === "toolsUsed" || input.dataset.bind === "mainGoals") {
        bindValue = String(input.value).split(",").map(function (item) { return item.trim(); }).filter(Boolean);
      }
      setPath(participant, input.dataset.bind, bindValue);
      if (input.dataset.bind === "totalSessions") {
        participant.totalSessions = Number(bindValue || participant.sessions.length);
      }
      scheduleSave();
      updateChrome();
      return;
    }
    if (input.dataset.problemIndex != null) {
      var problem = participant.needsAssessment.problems[Number(input.dataset.problemIndex)];
      if (problem) problem[input.dataset.problemField] = input.value;
      scheduleSave();
      return;
    }
    if (input.dataset.sessionBind) {
      setPath(session, input.dataset.sessionBind, inputValue(input));
      if (input.dataset.sessionBind === "status" && input.value === "Completed") {
        session.completedAt = new Date().toISOString();
      }
      scheduleSave();
      updateChrome();
      return;
    }
    if (input.dataset.agendaId && input.dataset.agendaField) {
      var agenda = arrayItem(session.agenda, input.dataset.agendaId);
      if (agenda) agenda[input.dataset.agendaField] = inputValue(input);
      scheduleSave();
      return;
    }
    if (input.dataset.agendaId && input.dataset.agendaComplete) {
      var agendaItem = arrayItem(session.agenda, input.dataset.agendaId);
      if (agendaItem) {
        agendaItem.completed = input.checked;
        agendaItem.status = input.checked ? "Completed" : "Planned";
      }
      scheduleSave();
      updateChrome();
      return;
    }
    if (input.dataset.campaignId) {
      var campaign = arrayItem(participant.campaignBriefs, input.dataset.campaignId);
      if (campaign) campaign[input.dataset.campaignField] = input.value;
      scheduleSave();
      return;
    }
    if (input.dataset.sceneId) {
      var scene = arrayItem(participant.storyboard, input.dataset.sceneId);
      if (scene) scene[input.dataset.sceneField] = input.value;
      scheduleSave();
      return;
    }
    if (input.dataset.checklistType) {
      var collection;
      if (input.dataset.checklistType === "deliverable") {
        collection = session.deliverables;
      } else {
        collection = session.preparationChecklist[input.dataset.checklistType];
      }
      var checklistItem = arrayItem(collection, input.dataset.itemId);
      if (checklistItem) checklistItem.completed = input.checked;
      scheduleSave();
      updateChrome();
      return;
    }
    if (input.dataset.setting) {
      state.settings[input.dataset.setting] = input.checked;
      refs.body.classList.toggle("is-compact", Boolean(state.settings.compactMode));
      scheduleSave();
    }
  }

  function handleParticipantChange() {
    state.activeParticipantId = refs.participantSelector.value;
    state.activeView = "overview";
    refs.globalSearch.value = "";
    scheduleSave();
    renderView();
    showToast("Participant aktif diperbarui.");
  }

  function handleImportFile(event) {
    var file = event.target.files && event.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast("File JSON terlalu besar. Batas import 5 MB.", "danger");
      return;
    }
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      try {
        var parsed = JSON.parse(String(reader.result || ""));
        handleImportPayload(parsed, refs.importFile.dataset.importType || "participant");
      } catch (error) {
        showToast("JSON invalid. Tidak ada data yang diubah.", "danger");
      }
    });
    reader.addEventListener("error", function () {
      showToast("File tidak dapat dibaca.", "danger");
    });
    reader.readAsText(file);
  }

  function openCorruptStorageWarning() {
    var body = create("div");
    var warning = create("div", "notice notice--warning");
    warning.appendChild(create("p", "", "Data localStorage tidak dapat dibaca. Aplikasi memakai data default sementara dan tidak akan menimpa data lama tanpa konfirmasi."));
    body.appendChild(warning);
    body.appendChild(create("p", "", "Anda dapat mengunduh data mentah untuk pemeriksaan, atau reset ke data default."));
    openModal({
      title: "Data Lokal Tidak Dapat Dibaca",
      body: body,
      actions: [
        {
          label: "Unduh Data Mentah",
          variant: "button--quiet",
          close: false,
          onClick: function () {
            var blob = new Blob([rawCorruptStorage], { type: "text/plain" });
            var url = URL.createObjectURL(blob);
            var link = create("a");
            link.href = url;
            link.download = "mozaiq-corrupt-localstorage-" + today() + ".txt";
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
          }
        },
        {
          label: "Reset ke Default",
          variant: "button--danger",
          onClick: resetData
        }
      ]
    });
  }

  function handleKeyboardShortcuts(event) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      refs.globalSearch.focus();
      refs.globalSearch.select();
    }
    trapModalFocus(event);
  }

  function bindEvents() {
    document.addEventListener("click", handleClick);
    document.addEventListener("input", handleInput);
    document.addEventListener("change", handleInput);
    document.addEventListener("keydown", handleKeyboardShortcuts);
    refs.participantSelector.addEventListener("change", handleParticipantChange);
    refs.importFile.addEventListener("change", handleImportFile);
    window.addEventListener("beforeunload", function () {
      if (saveTimer) {
        window.clearTimeout(saveTimer);
        saveNow();
      }
    });
    window.addEventListener("afterprint", function () {
      delete refs.body.dataset.printScope;
    });
  }

  function init() {
    bindEvents();
    renderView();
    if (storageReadFailed) {
      updateAutosave("Penyimpanan dijeda: data lokal perlu diperiksa.", false);
      window.setTimeout(openCorruptStorageWarning, 150);
    } else {
      updateAutosave("Semua perubahan telah tersimpan di perangkat ini.", false);
    }
  }

  init();
})();
