(function () {
  "use strict";

  var agenda = [
    {
      id: "audit-workflow",
      range: "00–10",
      plannedMinutes: 10,
      title: "Audit Workflow Pak Handoyo",
      activities: [
        "Tools apa yang digunakan?",
        "OpenClaw digunakan untuk apa?",
        "Bagaimana konten Grandivo dibuat?",
        "Siapa yang membuat konten?",
        "Siapa yang mengedit video?",
        "Berapa lama produksi konten?",
        "Di bagian mana proses paling lambat?",
        "Konten dibuat oleh owner atau tim?"
      ],
      output: "Catatan workflow saat ini.",
      completed: false,
      status: "Planned",
      actualMinutes: "",
      notes: ""
    },
    {
      id: "pilih-campaign",
      range: "10–20",
      plannedMinutes: 10,
      title: "Pilih Satu Campaign",
      activities: [
        "Trade-in HP lama ke baru",
        "Promo smartphone",
        "Garansi resmi",
        "Gratis ongkir",
        "Dropship",
        "Product highlight",
        "Tentukan target audiens, masalah, solusi, penawaran, platform, durasi, dan CTA"
      ],
      output: "Satu campaign direction.",
      completed: false,
      status: "Planned",
      actualMinutes: "",
      notes: ""
    },
    {
      id: "hook-script",
      range: "20–35",
      plannedMinutes: 15,
      title: "Membuat Hook dan Script",
      activities: [
        "Membuat hook problem-based",
        "Curiosity hook",
        "Direct offer",
        "Comparison",
        "Transformation",
        "Memilih satu hook",
        "Merevisi script"
      ],
      output: "Hook dan script final.",
      completed: false,
      status: "Planned",
      actualMinutes: "",
      notes: ""
    },
    {
      id: "storyboard",
      range: "35–50",
      plannedMinutes: 15,
      title: "Membuat Storyboard",
      activities: [
        "Membagi script menjadi beberapa scene",
        "Menentukan visual dan teks",
        "Menentukan gerakan dan kamera",
        "Menentukan durasi"
      ],
      output: "Storyboard 3–5 scene.",
      completed: false,
      status: "Planned",
      actualMinutes: "",
      notes: ""
    },
    {
      id: "produksi-visual",
      range: "50–65",
      plannedMinutes: 15,
      title: "Produksi Visual",
      activities: [
        "Menggunakan aset produk asli",
        "Menentukan background dan lighting",
        "Product placement dan brand visibility",
        "Menentukan ruang teks",
        "Merevisi prompt"
      ],
      output: "Satu atau dua key visual.",
      completed: false,
      status: "Planned",
      actualMinutes: "",
      notes: ""
    },
    {
      id: "video-editing",
      range: "65–78",
      plannedMinutes: 13,
      title: "Video dan Editing",
      activities: [
        "Image-to-video",
        "Product movement",
        "Camera push-in",
        "Lighting sweep",
        "Background motion",
        "CTA frame",
        "Editing sederhana"
      ],
      output: "Draft video atau scene yang siap diedit.",
      completed: false,
      status: "Planned",
      actualMinutes: "",
      notes: ""
    },
    {
      id: "business-evaluation",
      range: "78–85",
      plannedMinutes: 7,
      title: "Business Evaluation",
      activities: [
        "Apakah hook dipahami dalam tiga detik?",
        "Apakah produk terlihat jelas?",
        "Apakah klaim akurat?",
        "Apakah sesuai brand?",
        "Apakah CTA jelas?",
        "Apakah workflow dapat dijalankan pegawai?"
      ],
      output: "Daftar revisi.",
      completed: false,
      status: "Planned",
      actualMinutes: "",
      notes: ""
    },
    {
      id: "dokumentasi-workflow",
      range: "85–90",
      plannedMinutes: 5,
      title: "Dokumentasi Workflow",
      activities: ["Rangkum urutan kerja", "Simpan prompt terpilih", "Tentukan homework"],
      output: "Grandivo Video Workflow v1 dan homework.",
      completed: false,
      status: "Planned",
      actualMinutes: "",
      notes: ""
    }
  ];

  var instructorChecklist = [
    "Laptop", "Charger", "Mouse", "Terminal listrik", "Hotspot", "Kuota",
    "Tools sudah login", "Materi offline", "Template campaign", "Storyboard",
    "Generator gambar", "Generator video", "Canva atau editor", "Logo Grandivo",
    "Aset produk", "Prompt backup", "Video fallback", "Informasi pembayaran"
  ].map(function (label, index) {
    return { id: "instructor-" + (index + 1), label: label, completed: false };
  });

  var participantChecklist = [
    "Laptop", "Charger", "Browser terbaru", "Akun AI", "Satu produk atau promo",
    "Informasi harga terbaru", "Target audiens", "Logo", "Foto produk", "CTA",
    "Platform tujuan", "Contoh video referensi"
  ].map(function (label, index) {
    return { id: "participant-" + (index + 1), label: label, completed: false };
  });

  window.MOZAIQ_HANDOYO_PLAN = {
    id: "handoyo-kristanto",
    name: "Pak Handoyo Kristanto",
    role: "Direktur",
    businessName: "Grandivo",
    businessType: "Toko HP & Elektronik",
    businessLocation: "Sidoarjo",
    website: "https://grandivo.com/",
    education: "Teknik Informatika, Universitas Kristen Petra",
    experienceLevel: "Advanced",
    toolsUsed: ["ChatGPT", "OpenClaw"],
    learningFormat: "Offline",
    participantCount: 1,
    sessionDurationMinutes: 90,
    schedule: {
      day: "Kamis",
      time: "19.00–20.30",
      recurrence: "Mingguan",
      nextDate: ""
    },
    mainGoals: ["Pembuatan video marketing", "Konten promosi"],
    currentWorkflow: "",
    mainChallenges: [],
    notes: "",
    programName: "AI Marketing Production",
    templateId: "ai-marketing-production",
    programStatus: "Active",
    currentSession: 1,
    totalSessions: 4,
    needsAssessment: {
      workField: "Retail elektronik dan pemasaran",
      businessType: "Toko HP & Elektronik",
      businessTarget: "Meningkatkan konsistensi dan kecepatan produksi konten promosi.",
      toolsUsed: "ChatGPT, OpenClaw",
      skillLevel: "Advanced",
      currentWorkflow: "",
      workToAccelerate: "Produksi video marketing dan konten promosi",
      biggestObstacle: "Workflow belum terstruktur dan terdokumentasi.",
      desiredResult: "Sistem produksi campaign yang dapat digunakan kembali.",
      marketingPlatforms: "",
      teamMembers: "Owner dan pegawai Grandivo",
      assetAvailability: "Logo dan foto produk tersedia",
      instructorNotes: "",
      problems: [
        {
          problem: "Produksi video marketing masih membutuhkan workflow yang lebih terstruktur.",
          currentProcess: "",
          desiredOutcome: "Membuat proses dari campaign brief sampai draft video lebih cepat dan dapat diulang."
        },
        {
          problem: "Produksi konten promosi perlu lebih konsisten.",
          currentProcess: "",
          desiredOutcome: "Membuat template ide, hook, script, storyboard, dan visual yang bisa digunakan kembali."
        },
        {
          problem: "Workflow AI belum sepenuhnya terdokumentasi untuk tim.",
          currentProcess: "",
          desiredOutcome: "Membuat sistem yang dapat dijalankan oleh owner maupun pegawai."
        }
      ]
    },
    sessions: [
      {
        id: "handoyo-session-1",
        number: 1,
        title: "Campaign Strategy dan Video Marketing Pertama",
        subtitle: "Membangun workflow konten Grandivo dari campaign brief hingga draft video.",
        date: "",
        time: "19.00–20.30",
        durationMinutes: 90,
        objective: "Menyusun satu kampanye Grandivo dan menghasilkan workflow yang dapat digunakan kembali.",
        materials: "Campaign brief, prompt template, aset produk, generator gambar dan video.",
        practice: "Mengembangkan satu campaign dari brief hingga draft visual atau video.",
        deliverables: [
          { id: "campaign-brief", label: "Satu campaign brief", completed: false },
          { id: "hooks", label: "Tiga sampai lima pilihan hook", completed: false },
          { id: "script", label: "Satu script video", completed: false },
          { id: "storyboard", label: "Satu storyboard", completed: false },
          { id: "visual-prompt", label: "Prompt visual", completed: false },
          { id: "video-prompt", label: "Prompt video", completed: false },
          { id: "draft", label: "Satu draft visual atau video", completed: false },
          { id: "workflow", label: "Grandivo Video Workflow v1", completed: false }
        ],
        preparationChecklist: {
          instructor: instructorChecklist,
          participant: participantChecklist
        },
        agenda: agenda,
        notes: "",
        homework: "",
        status: "Planned",
        actualMinutes: "",
        result: "",
        startedAt: null,
        completedAt: null
      },
      {
        id: "handoyo-session-2",
        number: 2,
        title: "Sistem Visual Produk",
        subtitle: "Membangun bahasa visual produk yang konsisten.",
        date: "",
        time: "19.00–20.30",
        durationMinutes: 90,
        objective: "Membuat template visual produk Grandivo yang konsisten dan mudah diadaptasi.",
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
      },
      {
        id: "handoyo-session-3",
        number: 3,
        title: "Batch Content Production",
        subtitle: "Mengubah satu sistem menjadi beberapa konten terencana.",
        date: "",
        time: "19.00–20.30",
        durationMinutes: 90,
        objective: "Menyusun batch ide, script, dan storyboard untuk beberapa campaign.",
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
      },
      {
        id: "handoyo-session-4",
        number: 4,
        title: "Workflow Automation dengan OpenClaw",
        subtitle: "Mendokumentasikan workflow dengan titik human approval.",
        date: "",
        time: "19.00–20.30",
        durationMinutes: 90,
        objective: "Menyusun workflow otomatis yang tetap diawasi manusia.",
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
      }
    ],
    promptTemplates: [
      {
        id: "grandivo-creative-strategist",
        title: "Grandivo Creative Strategist",
        category: "Campaign Strategy",
        purpose: "Mengembangkan hook dan script video vertikal dari satu campaign brief.",
        promptText: "Bertindaklah sebagai creative strategist untuk Grandivo, toko HP dan elektronik di Sidoarjo.\n\nKami ingin membuat video vertikal berdurasi 15 detik mengenai [produk atau promo].\n\nTarget audiens:\n[target audiens]\n\nMasalah utama:\n[masalah]\n\nTujuan:\n[tujuan campaign]\n\nBuat:\n1. Lima pilihan hook maksimal 10 kata.\n2. Script video 15 detik.\n3. Struktur problem–solution–CTA.\n4. Teks layar maksimal 7 kata per scene.\n5. Hindari klaim harga atau benefit yang belum dipastikan.\n6. Gunakan bahasa Indonesia yang natural dan tidak berlebihan.",
        variables: ["produk atau promo", "target audiens", "masalah", "tujuan campaign"],
        participantId: "handoyo-kristanto",
        dateCreated: "2026-07-23",
        lastEdited: "2026-07-23",
        favorite: true
      }
    ],
    campaignBriefs: [
      {
        id: "grandivo-campaign-1",
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
      }
    ],
    storyboard: [],
    practiceResults: [],
    homework: [
      {
        id: "handoyo-homework-1",
        title: "Siapkan Dua Campaign Brief",
        description: "Pilih dua produk atau promo Grandivo. Isi target audiens, masalah, solusi, penawaran, CTA, platform, dan aset yang tersedia.",
        session: 1,
        dueDate: "",
        status: "Not Started",
        participantResponse: "",
        instructorFeedback: ""
      }
    ],
    instructorNotes: [],
    assets: [
      {
        id: "grandivo-logo",
        name: "Logo Grandivo",
        type: "Logo",
        location: "",
        campaign: "",
        session: 1,
        status: "Needed",
        notes: ""
      }
    ],
    activityLog: [
      {
        id: "activity-initial-plan",
        date: "2026-07-23T08:00:00.000Z",
        text: "Program AI Marketing Production dibuat."
      }
    ]
  };
})();
