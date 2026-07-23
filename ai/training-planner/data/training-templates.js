(function () {
  "use strict";

  var templates = [
    {
      id: "ai-marketing-production",
      name: "AI Marketing Production",
      description: "Dari campaign brief hingga workflow produksi konten yang dapat diulang.",
      goals: ["Pembuatan video marketing", "Konten promosi"],
      sessions: [
        {
          number: 1,
          title: "Campaign Strategy dan Video Pertama",
          subtitle: "Membangun workflow konten dari campaign brief hingga draft video.",
          focus: "Campaign brief, hook, script, storyboard, visual, draft video, dan workflow v1."
        },
        {
          number: 2,
          title: "Sistem Visual Produk",
          subtitle: "Membangun bahasa visual produk yang konsisten.",
          focus: "Background, lighting, product placement, adaptasi platform, dan template visual."
        },
        {
          number: 3,
          title: "Batch Content Production",
          subtitle: "Mengubah satu sistem menjadi beberapa konten terencana.",
          focus: "Content pillars, kalender konten, batch ide, script template, dan variasi campaign."
        },
        {
          number: 4,
          title: "Workflow Automation dengan OpenClaw",
          subtitle: "Mendokumentasikan alur kerja dengan titik human approval.",
          focus: "Draft hook, script, asset organization, reminder, dan tracking status."
        }
      ]
    },
    {
      id: "ai-content-creation",
      name: "AI Content Creation",
      description: "Sistem ide, penulisan, visual, dan kalender konten.",
      goals: ["Produksi konten konsisten", "Kalender konten"],
      sessions: []
    },
    {
      id: "ai-business-administration",
      name: "AI for Business Administration",
      description: "Dokumen, ringkasan, komunikasi, dan pekerjaan administratif.",
      goals: ["Efisiensi administrasi", "Standardisasi dokumen"],
      sessions: []
    },
    {
      id: "ai-video-production",
      name: "AI Video Production",
      description: "Script, storyboard, visual, motion, editing, dan evaluasi.",
      goals: ["Video marketing", "Workflow produksi video"],
      sessions: []
    },
    {
      id: "ai-visual-production",
      name: "AI Visual Production",
      description: "Prompt visual, konsistensi produk, dan template brand.",
      goals: ["Visual produk konsisten", "Template brand"],
      sessions: []
    },
    {
      id: "ai-workflow-automation",
      name: "AI Workflow Automation",
      description: "Pemetaan proses, human approval, reminder, dan dokumentasi.",
      goals: ["Workflow terdokumentasi", "Otomasi bertanggung jawab"],
      sessions: []
    },
    {
      id: "custom-program",
      name: "Custom Program",
      description: "Program kosong untuk kebutuhan khusus peserta.",
      goals: [],
      sessions: []
    }
  ];

  window.MOZAIQ_TRAINING_TEMPLATES = templates;
})();
