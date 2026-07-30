(function () {
  "use strict";

  var whatsappNumber = "6287815892929";
  var storageKey = "mozaiq-bina-bangsa-language";

  var copy = {
    en: {
      title: "Bina Bangsa Archery CCA | Mozaiq Future Academy",
      description:
        "A premium 12-session Archery CCA program designed for Bina Bangsa School Middle and High School students.",
      navOverview: "Overview",
      navCurriculum: "Curriculum",
      navAssessment: "Assessment",
      navKpi: "KPIs",
      navDiscuss: "Discuss Program",
      designedFor: "Designed exclusively for",
      heroEyebrow: "CCA • MIDDLE & HIGH SCHOOL",
      heroTitleLine1: "Focus with purpose.",
      heroTitleLine2: "Aim with confidence.",
      heroLead:
        "A premium, gamified archery program that develops discipline, concentration, physical coordination, and composure—one arrow at a time.",
      exploreJourney: "Explore 12-week journey",
      talkTeam: "Talk to our team",
      statSessions: "curated sessions",
      statSemester: "focused semester",
      statSafety: "safety-first",
      liveScoring: "Live digital scoring",
      competitionFeel: "International competition feel",
      trust1: "Age-appropriate equipment",
      trust2: "Professional coaching",
      trust3: "Progressive skill building",
      trust4: "Tournament finale",
      overviewEyebrow: "PROGRAM OVERVIEW",
      overviewTitle: "Built for growth beyond the target.",
      overviewLead:
        "Students learn more than accuracy. Every session is designed to build calm decision-making, respectful range habits, resilient practice, and the confidence to perform under pressure.",
      objectiveEyebrow: "OUR OBJECTIVE",
      objectiveTitle: "A stronger mind through precise movement.",
      objectiveBody:
        "Develop discipline, focus, and physical coordination through the art of archery while keeping students highly engaged through a premium, gamified learning experience.",
      valueFocus: "Focus",
      valueDiscipline: "Discipline",
      valueCoordination: "Coordination",
      valueConfidence: "Confidence",
      curriculumEyebrow: "12-WEEK SYLLABUS",
      curriculumTitle: "From first stance to final podium.",
      curriculumLead:
        "A clear progression from safety and form to consistency, distance, pressure management, and a formal mini tournament.",
      safetyTitle: "Safety is the non-negotiable first skill.",
      safetyBody:
        "Every game is adapted to venue conditions and coach supervision. Students move only on command; no running, blind shooting, or unsafe release is permitted at the shooting line.",
      assessmentEyebrow: "STUDENT ASSESSMENT",
      assessmentTitle: "Progress measured with purpose.",
      assessmentLead:
        "Grading values safe habits, discipline, and technical progress—not accuracy alone.",
      weightingSystem: "WEIGHTING SYSTEM",
      wholeStudent: "Whole-student progress",
      weightNote:
        "Formative observation happens weekly, with milestone reviews in Week 6 and Week 12.",
      skillRubric: "ARCHERY SKILL RUBRIC",
      clearExpectations: "Clear expectations at every level",
      kpiEyebrow: "PROGRAM SUCCESS METRICS",
      kpiTitle: "Ambition you can measure.",
      kpiLead:
        "Shared indicators give Bina Bangsa School and Mozaiq a clear, transparent view of safety, progress, engagement, and event quality.",
      equipmentEyebrow: "EQUIPMENT STANDARD",
      equipmentTitle: "Prepared for confident, age-appropriate practice.",
      equipmentBody:
        "Standardized recurve bows with teen-appropriate draw weights, carbon arrows, arm guards, finger tabs, chest guards, and clear range markers support safe, consistent learning.",
      contactEyebrow: "NEXT STEP",
      contactTitle: "Let’s shape the range for Bina Bangsa.",
      contactBody:
        "We can align the program with the school calendar, available venue, class size, and event expectations before the semester begins.",
      contactCta: "Discuss implementation",
      footerTagline: "School programs, thoughtfully delivered.",
      mobileCta: "Discuss Program",
      whatsapp:
        "Hello Mozaiq, I would like to discuss the Bina Bangsa School Archery CCA program."
    },
    id: {
      title: "CCA Panahan Bina Bangsa | Mozaiq Future Academy",
      description:
        "Program CCA Panahan premium 12 sesi untuk siswa Middle School dan High School Bina Bangsa School.",
      navOverview: "Ringkasan",
      navCurriculum: "Kurikulum",
      navAssessment: "Penilaian",
      navKpi: "KPI",
      navDiscuss: "Diskusikan Program",
      designedFor: "Dirancang khusus untuk",
      heroEyebrow: "CCA • MIDDLE & HIGH SCHOOL",
      heroTitleLine1: "Fokus dengan tujuan.",
      heroTitleLine2: "Membidik dengan percaya diri.",
      heroLead:
        "Program panahan premium dan gamified yang membangun disiplin, konsentrasi, koordinasi fisik, serta ketenangan—satu anak panah pada satu waktu.",
      exploreJourney: "Lihat perjalanan 12 minggu",
      talkTeam: "Hubungi tim kami",
      statSessions: "sesi terkurasi",
      statSemester: "semester terarah",
      statSafety: "mengutamakan keamanan",
      liveScoring: "Digital scoring langsung",
      competitionFeel: "Nuansa kompetisi internasional",
      trust1: "Peralatan sesuai usia",
      trust2: "Pelatih profesional",
      trust3: "Progres kemampuan bertahap",
      trust4: "Final turnamen",
      overviewEyebrow: "RINGKASAN PROGRAM",
      overviewTitle: "Bertumbuh jauh melampaui target.",
      overviewLead:
        "Siswa belajar lebih dari sekadar akurasi. Setiap sesi membangun pengambilan keputusan yang tenang, kebiasaan aman di lapangan, ketangguhan berlatih, dan kepercayaan diri saat berada di bawah tekanan.",
      objectiveEyebrow: "TUJUAN KAMI",
      objectiveTitle: "Pikiran yang lebih kuat melalui gerakan yang presisi.",
      objectiveBody:
        "Mengembangkan disiplin, fokus, dan koordinasi fisik melalui olahraga panahan dengan pengalaman belajar premium, menyenangkan, dan gamified.",
      valueFocus: "Fokus",
      valueDiscipline: "Disiplin",
      valueCoordination: "Koordinasi",
      valueConfidence: "Percaya Diri",
      curriculumEyebrow: "SILABUS 12 MINGGU",
      curriculumTitle: "Dari kuda-kuda pertama hingga podium final.",
      curriculumLead:
        "Progres yang jelas dari keamanan dan teknik dasar menuju konsistensi, penguasaan jarak, ketenangan di bawah tekanan, dan mini turnamen formal.",
      safetyTitle: "Keamanan adalah kemampuan pertama yang wajib dikuasai.",
      safetyBody:
        "Setiap permainan disesuaikan dengan kondisi lokasi dan pengawasan pelatih. Siswa bergerak hanya sesuai instruksi; tidak ada berlari, menembak dengan mata tertutup, atau pelepasan yang tidak aman di garis tembak.",
      assessmentEyebrow: "PENILAIAN SISWA",
      assessmentTitle: "Progres yang diukur dengan tujuan.",
      assessmentLead:
        "Penilaian menghargai kebiasaan aman, disiplin, dan perkembangan teknik—bukan akurasi semata.",
      weightingSystem: "SISTEM BOBOT",
      wholeStudent: "Perkembangan siswa secara utuh",
      weightNote:
        "Observasi formatif dilakukan setiap minggu, dengan evaluasi milestone pada Minggu 6 dan Minggu 12.",
      skillRubric: "RUBRIK KEMAMPUAN PANAHAN",
      clearExpectations: "Ekspektasi yang jelas di setiap level",
      kpiEyebrow: "METRIK KEBERHASILAN PROGRAM",
      kpiTitle: "Ambisi yang dapat diukur.",
      kpiLead:
        "Indikator bersama memberi Bina Bangsa School dan Mozaiq gambaran transparan tentang keamanan, progres, engagement, dan kualitas acara.",
      equipmentEyebrow: "STANDAR PERALATAN",
      equipmentTitle: "Disiapkan untuk latihan yang aman dan sesuai usia.",
      equipmentBody:
        "Busur recurve standar dengan draw weight sesuai remaja, anak panah karbon, arm guard, finger tab, chest guard, dan penanda lapangan yang jelas mendukung pembelajaran yang aman dan konsisten.",
      contactEyebrow: "LANGKAH SELANJUTNYA",
      contactTitle: "Mari siapkan range terbaik untuk Bina Bangsa.",
      contactBody:
        "Kami dapat menyelaraskan program dengan kalender sekolah, lokasi yang tersedia, jumlah siswa, dan ekspektasi acara sebelum semester dimulai.",
      contactCta: "Diskusikan pelaksanaan",
      footerTagline: "Program sekolah yang dirancang dengan saksama.",
      mobileCta: "Diskusikan Program",
      whatsapp:
        "Halo Mozaiq, saya ingin mendiskusikan program CCA Panahan untuk Bina Bangsa School."
    }
  };

  var premium = {
    en: [
      {
        icon: "A",
        title: "Professional Equipment",
        body: "Standardized recurve bows (15–25 lbs), carbon arrows, and complete personal safety gear."
      },
      {
        icon: "D",
        title: "Digital Scoring",
        body: "Live scores displayed on screen to recreate the rhythm and excitement of international competition."
      },
      {
        icon: "B",
        title: "Achievement Badges",
        body: "Milestone recognition such as First Bullseye, Robin Hood Try, and Flawless Posture."
      },
      {
        icon: "C",
        title: "Professional Coaching",
        body: "Clear, engaging instruction led by certified coaches experienced with secondary-level students."
      }
    ],
    id: [
      {
        icon: "A",
        title: "Peralatan Profesional",
        body: "Busur recurve standar (15–25 lbs), anak panah karbon, dan perlengkapan keselamatan personal yang lengkap."
      },
      {
        icon: "D",
        title: "Digital Scoring",
        body: "Skor langsung ditampilkan di layar untuk menghadirkan ritme dan semangat kompetisi internasional."
      },
      {
        icon: "B",
        title: "Achievement Badges",
        body: "Apresiasi milestone seperti First Bullseye, Robin Hood Try, dan Flawless Posture."
      },
      {
        icon: "C",
        title: "Pelatih Profesional",
        body: "Instruksi yang jelas dan engaging dari pelatih bersertifikat yang berpengalaman menangani siswa secondary."
      }
    ]
  };

  var phases = {
    en: ["Foundation", "Technique", "Consistency", "Performance"],
    id: ["Fondasi", "Teknik", "Konsistensi", "Performa"]
  };

  var phaseColors = ["#2d87aa", "#418a6b", "#c16c40", "#9a6b15"];

  var weeks = {
    en: [
      {
        title: "Introduction & Safety First",
        body: "Equipment, range rules, whistle commands, and a basic eye-dominance check.",
        game: "Balloon Popper",
        gameDetail: "Large close-range targets build early confidence.",
        phase: 0
      },
      {
        title: "The Foundation",
        body: "Stance, posture, T-form, and body alignment using stretch bands before bows.",
        game: "Simon Says: Archery Edition",
        gameDetail: "Fast posture cues sharpen form awareness.",
        phase: 0
      },
      {
        title: "Load & Draw",
        body: "Correct nocking, controlled draw technique, and safe let-down without release.",
        game: "Statue Challenge",
        gameDetail: "Short coach-timed holds build stable form safely.",
        phase: 0
      },
      {
        title: "Anchor & Aim",
        body: "Finding a repeatable anchor point and aiming with the arrow tip or sight.",
        game: "Archery Tic-Tac-Toe",
        gameDetail: "Teams aim at a 3 × 3 grid to make a line.",
        phase: 1
      },
      {
        title: "Release & Follow-Through",
        body: "Relaxed string release and holding the final position until impact.",
        game: "Zombie Invasion",
        gameDetail: "Themed target zones reward accurate placement.",
        phase: 1
      },
      {
        title: "Mid-Semester Evaluation",
        body: "Review of the five fundamentals with individual form correction and feedback.",
        game: "Partner Alignment",
        gameDetail: "Partners use verbal cues and stretch bands—no blind shooting.",
        phase: 1
      },
      {
        title: "Grouping & Consistency",
        body: "Building muscle memory by placing three arrows as close together as possible.",
        game: "Save the Royalty",
        gameDetail: "Hit drawn rope lines while avoiding the central character.",
        phase: 2
      },
      {
        title: "Speed & Control",
        body: "Safe, accurate nocking and shooting within a structured time window.",
        game: "Controlled Archery Relay",
        gameDetail: "Students walk to marked stations and shoot only on whistle.",
        phase: 2
      },
      {
        title: "Distance Mastery",
        body: "Moving back in stages and adjusting aim for a 5–10 metre challenge.",
        game: "Distance Zones",
        gameDetail: "Score designated zones at progressively longer distances.",
        phase: 2
      },
      {
        title: "Focus Under Pressure",
        body: "Managing breathing, technique, and concentration around controlled distractions.",
        game: "Audio Cue Arrows",
        gameDetail: "Release only on the correct coach-controlled sound cue.",
        phase: 3
      },
      {
        title: "Tournament Prep",
        body: "International scoring, shooting-line etiquette, timing, and match rules.",
        game: "Bounty Hunter",
        gameDetail: "Target zones carry surprise point values for strategic play.",
        phase: 3
      },
      {
        title: "The Grand Finale",
        body: "A formal Bina Bangsa Archery Mini Tournament to close the semester.",
        game: "King / Queen of the Range",
        gameDetail: "An elimination bracket, digital scoring, medals, and celebration.",
        phase: 3
      }
    ],
    id: [
      {
        title: "Pengenalan & Utamakan Keamanan",
        body: "Pengenalan peralatan, aturan range, whistle commands, dan tes dominasi mata.",
        game: "Balloon Popper",
        gameDetail: "Target besar dari jarak dekat membangun kepercayaan diri awal.",
        phase: 0
      },
      {
        title: "Fondasi",
        body: "Stance, postur, T-form, dan body alignment dengan stretch band sebelum menggunakan busur.",
        game: "Simon Says: Archery Edition",
        gameDetail: "Instruksi postur cepat mempertajam kesadaran teknik.",
        phase: 0
      },
      {
        title: "Load & Draw",
        body: "Nocking yang tepat, teknik menarik terkontrol, dan let-down aman tanpa melepaskan anak panah.",
        game: "Statue Challenge",
        gameDetail: "Tahan singkat sesuai waktu pelatih untuk membangun form yang stabil.",
        phase: 0
      },
      {
        title: "Anchor & Aim",
        body: "Menemukan anchor point yang konsisten dan membidik menggunakan ujung anak panah atau sight.",
        game: "Archery Tic-Tac-Toe",
        gameDetail: "Tim membidik grid 3 × 3 untuk membentuk satu garis.",
        phase: 1
      },
      {
        title: "Release & Follow-Through",
        body: "Melepaskan tali dengan rileks dan menahan posisi akhir sampai anak panah mengenai target.",
        game: "Zombie Invasion",
        gameDetail: "Zona target tematik memberi poin untuk penempatan yang akurat.",
        phase: 1
      },
      {
        title: "Evaluasi Tengah Semester",
        body: "Review lima teknik dasar dengan koreksi form individual dan umpan balik.",
        game: "Partner Alignment",
        gameDetail: "Partner memakai arahan verbal dan stretch band—tanpa blind shooting.",
        phase: 1
      },
      {
        title: "Grouping & Konsistensi",
        body: "Membangun muscle memory dengan menempatkan tiga anak panah sedekat mungkin.",
        game: "Save the Royalty",
        gameDetail: "Mengenai garis tali tanpa menyentuh karakter di tengah.",
        phase: 2
      },
      {
        title: "Kecepatan & Kontrol",
        body: "Nocking dan menembak secara aman dan akurat dalam batas waktu terstruktur.",
        game: "Controlled Archery Relay",
        gameDetail: "Siswa berjalan ke station dan menembak hanya setelah bunyi peluit.",
        phase: 2
      },
      {
        title: "Penguasaan Jarak",
        body: "Mundur secara bertahap dan menyesuaikan bidikan untuk tantangan 5–10 meter.",
        game: "Distance Zones",
        gameDetail: "Mengumpulkan skor pada zona tertentu dari jarak yang meningkat.",
        phase: 2
      },
      {
        title: "Fokus di Bawah Tekanan",
        body: "Mengelola napas, teknik, dan konsentrasi di tengah distraksi yang terkontrol.",
        game: "Audio Cue Arrows",
        gameDetail: "Melepas anak panah hanya pada cue suara yang dikontrol pelatih.",
        phase: 3
      },
      {
        title: "Persiapan Turnamen",
        body: "Sistem skor internasional, etika shooting line, timing, dan aturan pertandingan.",
        game: "Bounty Hunter",
        gameDetail: "Zona target memiliki nilai kejutan untuk permainan strategis.",
        phase: 3
      },
      {
        title: "The Grand Finale",
        body: "Bina Bangsa Archery Mini Tournament formal sebagai penutup semester.",
        game: "King / Queen of the Range",
        gameDetail: "Bracket eliminasi, digital scoring, medali, dan selebrasi.",
        phase: 3
      }
    ]
  };

  var weights = {
    en: [
      {
        value: 40,
        title: "Technique & Posture",
        detail: "Weekly formative assessment by the head coach.",
        color: "#2d87aa"
      },
      {
        value: 30,
        title: "Attitude & Safety",
        detail: "Range rules, whistle commands, and sportsmanship.",
        color: "#418a6b"
      },
      {
        value: 30,
        title: "Accuracy & Performance",
        detail: "Summative scores from Week 6 and Week 12.",
        color: "#c16c40"
      }
    ],
    id: [
      {
        value: 40,
        title: "Teknik & Postur",
        detail: "Penilaian formatif mingguan oleh head coach.",
        color: "#2d87aa"
      },
      {
        value: 30,
        title: "Sikap & Keamanan",
        detail: "Aturan range, whistle commands, dan sportivitas.",
        color: "#418a6b"
      },
      {
        value: 30,
        title: "Akurasi & Performa",
        detail: "Skor sumatif dari Minggu 6 dan Minggu 12.",
        color: "#c16c40"
      }
    ]
  };

  var rubric = {
    en: {
      head: ["Criteria", "Premium", "Competent", "Novice"],
      rows: [
        [
          "Safety & Etiquette",
          "Always follows rules, helps peers, and shows excellent range awareness.",
          "Follows rules independently without constant reminders.",
          "Needs frequent reminders about basic safety and whistle commands."
        ],
        [
          "Form & Posture",
          "Stable T-form, steady stance, and a consistent anchor every draw.",
          "Good basic posture, with an anchor point that shifts occasionally.",
          "Unstable stance and difficulty holding a consistent anchor."
        ],
        [
          "Release & Follow-Through",
          "Smooth, relaxed release with a composed, held follow-through.",
          "Decent release, but the bow arm sometimes drops too quickly.",
          "Aggressive string plucking or dropping the bow immediately."
        ],
        [
          "Consistency",
          "Arrows form a tight group and regularly reach centre zones.",
          "Arrows consistently reach the target but spread across zones.",
          "Arrows frequently miss the target face."
        ]
      ]
    },
    id: {
      head: ["Kriteria", "Premium", "Kompeten", "Pemula"],
      rows: [
        [
          "Keamanan & Etika",
          "Selalu mengikuti aturan, membantu teman, dan sangat sadar kondisi range.",
          "Mengikuti aturan secara mandiri tanpa pengingat terus-menerus.",
          "Sering perlu diingatkan tentang keamanan dasar dan whistle commands."
        ],
        [
          "Form & Postur",
          "T-form stabil, stance kokoh, dan anchor konsisten di setiap tarikan.",
          "Postur dasar baik, tetapi anchor point sesekali bergeser.",
          "Stance belum stabil dan kesulitan mempertahankan anchor."
        ],
        [
          "Release & Follow-Through",
          "Release halus dan rileks dengan follow-through yang tenang dan ditahan.",
          "Release cukup baik, tetapi bow arm terkadang terlalu cepat turun.",
          "Menarik tali secara agresif atau langsung menurunkan busur."
        ],
        [
          "Konsistensi",
          "Anak panah mengelompok rapat dan rutin mengenai zona tengah.",
          "Anak panah konsisten mengenai target tetapi tersebar di beberapa zona.",
          "Anak panah masih sering melewati target face."
        ]
      ]
    }
  };

  var kpis = {
    en: [
      {
        title: "Safety & Compliance",
        items: [
          ["Zero incidents", "Maintain an injury-free record across all 12 sessions."],
          ["100% mastery", "Every student passes the safety quiz and demonstration by Week 2."]
        ]
      },
      {
        title: "Skill Progression",
        items: [
          ["90% on target", "By Week 6, students consistently reach the target face from 5 metres."],
          ["80% at 10 m", "By Week 10, students successfully adapt to the 10-metre line."]
        ]
      },
      {
        title: "Engagement & Retention",
        items: [
          ["≥ 85% attendance", "Maintain strong average participation throughout the semester."],
          ["≥ 8.5 / 10", "Target average student satisfaction on the final feedback survey."]
        ]
      },
      {
        title: "Event Execution",
        items: [
          ["100% participation", "All attending students actively join the Grand Finale."],
          ["Complete delivery", "Digital scoring, formal bracket, and awards are delivered as planned."]
        ]
      }
    ],
    id: [
      {
        title: "Keamanan & Kepatuhan",
        items: [
          ["Nol insiden", "Menjaga catatan bebas cedera sepanjang 12 sesi."],
          ["100% menguasai", "Setiap siswa lulus kuis dan demonstrasi keamanan pada Minggu 2."]
        ]
      },
      {
        title: "Progres Kemampuan",
        items: [
          ["90% on target", "Pada Minggu 6, siswa konsisten mengenai target face dari jarak 5 meter."],
          ["80% di 10 m", "Pada Minggu 10, siswa berhasil beradaptasi di garis 10 meter."]
        ]
      },
      {
        title: "Engagement & Retensi",
        items: [
          ["≥ 85% kehadiran", "Menjaga rata-rata partisipasi yang tinggi sepanjang semester."],
          ["≥ 8,5 / 10", "Target rata-rata kepuasan siswa pada survei akhir program."]
        ]
      },
      {
        title: "Pelaksanaan Acara",
        items: [
          ["100% berpartisipasi", "Seluruh siswa yang hadir aktif mengikuti Grand Finale."],
          ["Pelaksanaan lengkap", "Digital scoring, bracket formal, dan penghargaan berjalan sesuai rencana."]
        ]
      }
    ]
  };

  var equipment = {
    en: [
      "Recurve bows with varied 15–25 lb draw weights",
      "Carbon arrows and standardized target faces",
      "Arm guards, finger tabs, and chest guards",
      "Tablets and display for live digital scoring"
    ],
    id: [
      "Busur recurve dengan variasi draw weight 15–25 lbs",
      "Anak panah karbon dan target face standar",
      "Arm guard, finger tab, dan chest guard",
      "Tablet dan layar untuk digital scoring langsung"
    ]
  };

  function getPreferredLanguage() {
    try {
      var stored = localStorage.getItem(storageKey);
      return stored === "id" || stored === "en" ? stored : "en";
    } catch (error) {
      return "en";
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderPremium(lang) {
    var target = document.getElementById("premium-grid");
    target.innerHTML = premium[lang]
      .map(function (item, index) {
        return (
          '<article class="premium-card reveal">' +
          '<div class="premium-top"><span class="premium-icon" aria-hidden="true">' +
          escapeHtml(item.icon) +
          '</span><span class="premium-number">0' +
          (index + 2) +
          "</span></div>" +
          "<h3>" +
          escapeHtml(item.title) +
          "</h3><p>" +
          escapeHtml(item.body) +
          "</p></article>"
        );
      })
      .join("");
  }

  function renderPhases(lang) {
    document.getElementById("phase-legend").innerHTML = phases[lang]
      .map(function (phase, index) {
        return (
          '<span class="phase-pill" style="--phase-color:' +
          phaseColors[index] +
          '"><i aria-hidden="true"></i>' +
          escapeHtml(phase) +
          "</span>"
        );
      })
      .join("");
  }

  function renderWeeks(lang) {
    var gameLabel = lang === "id" ? "FUN CHALLENGE" : "FUN CHALLENGE";
    document.getElementById("week-grid").innerHTML = weeks[lang]
      .map(function (week, index) {
        return (
          '<article class="week-card reveal" style="--phase-color:' +
          phaseColors[week.phase] +
          '">' +
          '<div class="week-top"><span class="week-label">' +
          (lang === "id" ? "MINGGU " : "WEEK ") +
          (index + 1) +
          '</span><span class="week-phase">' +
          escapeHtml(phases[lang][week.phase]) +
          "</span></div>" +
          "<h3>" +
          escapeHtml(week.title) +
          "</h3><p>" +
          escapeHtml(week.body) +
          '</p><div class="game-block"><span>' +
          gameLabel +
          "</span><strong>" +
          escapeHtml(week.game) +
          "</strong><p>" +
          escapeHtml(week.gameDetail) +
          "</p></div></article>"
        );
      })
      .join("");
  }

  function renderWeights(lang) {
    document.getElementById("weight-list").innerHTML = weights[lang]
      .map(function (item) {
        return (
          '<div class="weight-item" style="--bar-color:' +
          item.color +
          ";--bar-width:" +
          item.value +
          '%"><div class="weight-topline"><strong>' +
          escapeHtml(item.title) +
          "</strong><span>" +
          item.value +
          '%</span></div><div class="weight-track"><i></i></div><span class="weight-detail">' +
          escapeHtml(item.detail) +
          "</span></div>"
        );
      })
      .join("");
  }

  function renderRubric(lang) {
    document.getElementById("rubric-head").innerHTML =
      "<tr>" +
      rubric[lang].head
        .map(function (item) {
          return "<th>" + escapeHtml(item) + "</th>";
        })
        .join("") +
      "</tr>";

    document.getElementById("rubric-body").innerHTML = rubric[lang].rows
      .map(function (row) {
        return (
          "<tr>" +
          row
            .map(function (item) {
              return "<td>" + escapeHtml(item) + "</td>";
            })
            .join("") +
          "</tr>"
        );
      })
      .join("");
  }

  function renderKpis(lang) {
    document.getElementById("kpi-grid").innerHTML = kpis[lang]
      .map(function (group, index) {
        return (
          '<article class="kpi-card reveal"><span class="kpi-number">0' +
          (index + 1) +
          "</span><h3>" +
          escapeHtml(group.title) +
          "</h3>" +
          group.items
            .map(function (item) {
              return (
                '<div class="kpi-item"><strong>' +
                escapeHtml(item[0]) +
                "</strong><span>" +
                escapeHtml(item[1]) +
                "</span></div>"
              );
            })
            .join("") +
          "</article>"
        );
      })
      .join("");
  }

  function renderEquipment(lang) {
    document.getElementById("equipment-list").innerHTML = equipment[lang]
      .map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      })
      .join("");
  }

  function updateWhatsApp(lang) {
    var url =
      "https://wa.me/" +
      whatsappNumber +
      "?text=" +
      encodeURIComponent(copy[lang].whatsapp);
    document.querySelectorAll(".js-whatsapp").forEach(function (link) {
      link.href = url;
    });
  }

  function observeReveals() {
    var nodes = document.querySelectorAll(".reveal:not(.is-visible)");
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      nodes.forEach(function (node) {
        node.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -28px" }
    );

    nodes.forEach(function (node) {
      observer.observe(node);
    });
  }

  function setLanguage(lang) {
    var strings = copy[lang] || copy.en;
    document.documentElement.lang = lang;
    document.title = strings.title;
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", strings.description);

    document.querySelectorAll("[data-copy]").forEach(function (node) {
      var key = node.getAttribute("data-copy");
      if (strings[key]) node.textContent = strings[key];
    });

    document.querySelectorAll("[data-lang]").forEach(function (button) {
      var active = button.getAttribute("data-lang") === lang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    renderPremium(lang);
    renderPhases(lang);
    renderWeeks(lang);
    renderWeights(lang);
    renderRubric(lang);
    renderKpis(lang);
    renderEquipment(lang);
    updateWhatsApp(lang);
    observeReveals();

    try {
      localStorage.setItem(storageKey, lang);
    } catch (error) {
      // The page remains fully functional when storage is unavailable.
    }
  }

  function setupMenu() {
    var button = document.querySelector(".menu-toggle");
    var menu = document.getElementById("mobile-nav");

    function closeMenu() {
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open navigation");
      menu.hidden = true;
      document.body.classList.remove("menu-open");
    }

    button.addEventListener("click", function () {
      var open = button.getAttribute("aria-expanded") === "true";
      if (open) {
        closeMenu();
      } else {
        button.setAttribute("aria-expanded", "true");
        button.setAttribute("aria-label", "Close navigation");
        menu.hidden = false;
        document.body.classList.add("menu-open");
      }
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1050) closeMenu();
    });
  }

  document.querySelectorAll("[data-lang]").forEach(function (button) {
    button.addEventListener("click", function () {
      setLanguage(button.getAttribute("data-lang"));
    });
  });

  setupMenu();
  setLanguage(getPreferredLanguage());
})();
