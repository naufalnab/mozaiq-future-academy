(function () {
  var sourceUrls = {
    id: "../silabus/Untitled%20spreadsheet%20-%20Pertemuan.csv",
    en: "../silabus/AI-syllabus-en.csv"
  };
  var container = document.getElementById("syllabus-content");
  if (!container) return;
  var currentLang = document.documentElement.getAttribute("lang") === "id" ? "id" : "en";
  var datasets = {};

  var phaseSets = { id: [
    {
      id: "fase-1",
      number: "01",
      range: "PERTEMUAN 1–5",
      title: "Fondasi Cerita",
      summary: "Dari memahami proses sampai memiliki storyboard siap produksi.",
      start: 1,
      end: 5
    },
    {
      id: "fase-2",
      number: "02",
      range: "PERTEMUAN 6–9",
      title: "Produksi Visual",
      summary: "Dari rumus prompt sampai rangkaian visual final yang konsisten.",
      start: 6,
      end: 9
    },
    {
      id: "fase-3",
      number: "03",
      range: "PERTEMUAN 10–13",
      title: "Suara & Editing",
      summary: "Mengubah bahan proyek menjadi video yang runtut, jelas, dan hidup.",
      start: 10,
      end: 13
    },
    {
      id: "fase-4",
      number: "04",
      range: "PERTEMUAN 14–16",
      title: "Finalisasi & Showcase",
      summary: "Memastikan karya aman dan berkualitas, lalu berani mempresentasikannya.",
      start: 14,
      end: 16
    }
  ], en: [
    {
      id: "fase-1",
      number: "01",
      range: "MEETINGS 1–5",
      title: "Story Foundations",
      summary: "From understanding the workflow to a production-ready storyboard.",
      start: 1,
      end: 5
    },
    {
      id: "fase-2",
      number: "02",
      range: "MEETINGS 6–9",
      title: "Visual Production",
      summary: "From prompt formulas to a consistent set of final scene visuals.",
      start: 6,
      end: 9
    },
    {
      id: "fase-3",
      number: "03",
      range: "MEETINGS 10–13",
      title: "Voice & Editing",
      summary: "Turning project assets into a clear, engaging, and well-paced video.",
      start: 10,
      end: 13
    },
    {
      id: "fase-4",
      number: "04",
      range: "MEETINGS 14–16",
      title: "Finalization & Showcase",
      summary: "Ensuring quality and safety, then confidently presenting the finished work.",
      start: 14,
      end: 16
    }
  ] };

  var labels = {
    id: {
      meeting: "PERTEMUAN",
      output: "OUTPUT INDIVIDU",
      minute: "mnt",
      error: "Rincian silabus belum dapat dimuat. Silakan muat ulang halaman atau hubungi tim Mozaiq untuk mendapatkan silabus lengkap."
    },
    en: {
      meeting: "MEETING",
      output: "INDIVIDUAL OUTPUT",
      minute: "min",
      error: "The syllabus details could not be loaded. Please refresh the page or contact the Mozaiq team for the complete syllabus."
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
    var labels = {
      "Latihan bareng dengan contoh": "Latihan bersama",
      "Simpan hasil dan refleksi": "Simpan & refleksi",
      "Guided Practice with Example": "Guided Practice",
      "Save Results and Reflection": "Save & Reflect"
    };
    return labels[label] || label;
  }

  function renderSession(session, headers, minutes, lang) {
    var number = Number(session[0]);
    var activities = session.slice(3, 8).map(function (description, index) {
      var columnIndex = index + 3;
      var primary = columnIndex === 6 ? " flow-primary" : "";
      return (
        '<div class="flow-step' + primary + '">' +
          '<span class="flow-time">' + escapeHtml(minutes[columnIndex]) + ' ' + labels[lang].minute + '</span>' +
          '<div><b>' + escapeHtml(shortLabel(headers[columnIndex])) + '</b>' +
          '<p>' + escapeHtml(description) + '</p></div>' +
        '</div>'
      );
    }).join("");

    return (
      '<article class="session-card" id="pertemuan-' + number + '">' +
        '<header class="session-card-head">' +
          '<span class="session-no">' + pad(number) + '</span>' +
          '<div class="session-title-wrap"><p>' + labels[lang].meeting + ' ' + number + '</p><h4>' + escapeHtml(session[1]) + '</h4></div>' +
          '<div class="session-output"><span>' + labels[lang].output + '</span><strong>' + escapeHtml(session[2]) + '</strong></div>' +
        '</header>' +
        '<div class="session-flow">' + activities + '</div>' +
      '</article>'
    );
  }

  function renderSyllabus(rows, lang) {
    var minutes = rows[0];
    var headers = rows[1];
    var sessions = rows.slice(2).filter(function (row) {
      return /^\d+$/.test(row[0]);
    });

    if ((headers[0] !== "Pertemuan" && headers[0] !== "Meeting") || sessions.length !== 16) {
      throw new Error("Struktur silabus tidak sesuai");
    }

    container.innerHTML = phaseSets[lang].map(function (phase) {
      var phaseSessions = sessions.filter(function (session) {
        var number = Number(session[0]);
        return number >= phase.start && number <= phase.end;
      });

      return (
        '<section id="' + phase.id + '" class="syllabus-phase" aria-labelledby="' + phase.id + '-title">' +
          '<header class="phase-header">' +
            '<div class="phase-title-number">' + phase.number + '</div>' +
            '<div><p>' + phase.range + '</p><h3 id="' + phase.id + '-title">' + phase.title + '</h3><span>' + phase.summary + '</span></div>' +
          '</header>' +
          '<div class="session-list">' + phaseSessions.map(function (session) {
            return renderSession(session, headers, minutes, lang);
          }).join("") + '</div>' +
        '</section>'
      );
    }).join("");
  }

  function showLanguage(lang) {
    currentLang = lang === "id" ? "id" : "en";
    if (datasets[currentLang]) renderSyllabus(datasets[currentLang], currentLang);
  }

  document.addEventListener("langchange", function (event) {
    showLanguage(event.detail && event.detail.lang);
  });

  Promise.all(Object.keys(sourceUrls).map(function (lang) {
    return fetch(sourceUrls[lang])
      .then(function (response) {
        if (!response.ok) throw new Error("Silabus tidak dapat dimuat");
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
