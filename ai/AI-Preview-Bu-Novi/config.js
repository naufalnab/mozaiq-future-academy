/**
 * Configuration and Data for AI Creative Media Private Preview
 */
export const previewConfig = {
  participantGrade: "Kelas 5 SD",
  participantCount: 1,
  duration: "45–60 menit",
  locationType: "Private Home Preview",
  deviceAvailable: true,
  wifiAvailable: true,
  interests: ["Menggambar", "Membuat cerita", "Membuat video"],
  complimentary: true,
  projectTheme: "Robot Kecil Menyelamatkan Taman Sekolah",
  noIndex: true,
};

export const slidesData = [
  {
    id: "cover",
    title: "PRIVATE PREVIEW",
    eyebrow: "MOZAIQ FUTURE ACADEMY",
    badge: "AI CREATIVE MEDIA",
    headline: "Dari Satu Ide Menjadi Gambar, Cerita, dan Video",
    supportingSentence: "Pengalaman kreatif untuk mengenal bagaimana sebuah ide dapat dikembangkan menjadi karya dengan bantuan AI.",
    quickFacts: [
      { label: "Kelas", value: "Kelas 5 SD" },
      { label: "Peserta", value: "1 Peserta" },
      { label: "Durasi", value: "45–60 Menit" },
      { label: "Format", value: "Private Home Preview" }
    ],
    presenterNote: "Hari ini kita akan melihat bagaimana satu ide sederhana bisa berkembang menjadi gambar, cerita, dan video."
  },
  {
    id: "apa-yang-akan-dilakukan",
    title: "Apa yang Akan Dilakukan Anak?",
    supportingCopy: "Dalam sesi preview ini, anak akan membuat proyek mini dari ide sederhana hingga melihat bagaimana hasilnya dapat dikembangkan menjadi video.",
    steps: [
      { title: "Ide", description: "Menentukan tokoh, tempat, masalah, dan solusi." },
      { title: "Cerita", description: "Menyusun alur awal, aksi, dan hasil." },
      { title: "Visual AI", description: "Menghasilkan gambar dengan bantuan AI sesuai ide anak." },
      { title: "Video Pendek", description: "Melihat bagaimana gambar dapat dianimasikan atau disusun menjadi video." }
    ],
    callout: "Anak tetap menjadi pemilik ide.",
    subCallout: "AI digunakan sebagai alat bantu untuk mewujudkan kreativitasnya.",
    presenterNote: "Anak tidak hanya mencoba tools. Anak mengikuti proses dari ide sampai karya."
  },
  {
    id: "ai-sebagai-alat-bantu",
    title: "AI Itu Alat Bantu, Bukan Pengganti Ide Anak",
    columns: {
      left: {
        title: "Anak yang Menentukan",
        items: ["ide cerita;", "pilihan tokoh;", "warna dan suasana;", "alur cerita;", "hasil yang ingin dipakai;", "perubahan yang ingin dilakukan."]
      },
      right: {
        title: "AI yang Membantu",
        items: ["membuat alternatif visual;", "menawarkan variasi;", "mempercepat eksplorasi;", "membantu mewujudkan instruksi;", "membantu melihat kemungkinan baru."]
      }
    },
    flow: ["Anak Berpikir", "Anak Memberi Instruksi", "AI Membantu", "Anak Memilih", "Anak Memperbaiki", "Anak Mempresentasikan"],
    quote: "Teknologi membantu prosesnya. Anak tetap mengarahkan karyanya.",
    presenterNote: "AI membantu prosesnya, tetapi ide dan keputusan tetap berasal dari anak."
  },
  {
    id: "contoh-proyek-mini",
    title: "Contoh Proyek Mini",
    projectName: "Robot Kecil Menyelamatkan Taman Sekolah",
    premise: "Seekor robot kecil menemukan taman sekolah yang mulai layu. Ia mencari penyebabnya, memperbaiki sistem penyiram, dan membantu taman kembali hijau.",
    stages: ["Menemukan masalah", "Mencari dan memperbaiki", "Membantu taman kembali hijau"],
    callout: "Anak boleh mengubah tokoh, warna, tempat, maupun jalan ceritanya.",
    presenterNote: "Kita menggunakan proyek sederhana agar anak dapat memahami alurnya tanpa merasa terbebani."
  },
  {
    id: "alur-cerita-3-scene",
    title: "Alur Cerita 3 Scene",
    scenes: [
      { label: "PENEMUAN", title: "Taman Mulai Layu", description: "Robot kecil menemukan tanaman di taman sekolah mulai kering dan layu.", direction: "wide shot; pagi hari; tanaman sedikit kering; robot mengamati taman." },
      { label: "AKSI", title: "Robot Mencari Solusi", description: "Robot memeriksa saluran air dan mencoba memperbaiki sistem penyiram.", direction: "medium shot; robot aktif bekerja; beberapa alat sederhana; cahaya mulai lebih cerah." },
      { label: "HASIL", title: "Taman Kembali Hijau", description: "Air kembali mengalir dan tanaman menjadi segar serta berwarna.", direction: "cinematic wide shot; taman hijau; air menyembur lembut; robot melihat hasil pekerjaannya." }
    ],
    presenterNote: "Cerita yang panjang dapat dibagi menjadi beberapa scene yang lebih mudah dibuat."
  },
  {
    id: "dari-ide-ke-prompt",
    title: "Dari Ide ke Prompt",
    supportingCopy: "Kita membantu AI memahami ide dengan memberikan instruksi yang jelas.",
    formula: "TOKOH + AKSI + TEMPAT + SUASANA",
    questions: ["Siapa tokohnya?", "Sedang melakukan apa?", "Berada di mana?", "Suasananya seperti apa?"],
    exampleAnswers: ["Robot kecil yang ramah", "Memeriksa tanaman yang layu", "Di taman sekolah", "Cerah, penuh warna, dan menyenangkan"],
    basePromptPattern: "{tokoh} checking wilted plants in {tempat}, colorful cinematic 3D animation style, {suasana}, child-friendly environment, detailed background, no text, no logos.",
    chips: {
      tokoh: [
        { label: "Robot kecil", value: "A small friendly robot" },
        { label: "Hewan penolong", value: "A helpful animal" },
        { label: "Kendaraan masa depan", value: "A futuristic vehicle" }
      ],
      tempat: [
        { label: "Taman sekolah", value: "a school garden" },
        { label: "Kota masa depan", value: "a futuristic city" },
        { label: "Hutan penuh warna", value: "a colorful forest" }
      ],
      suasana: [
        { label: "Cerah", value: "bright morning light" },
        { label: "Penuh petualangan", value: "adventurous mood" },
        { label: "Futuristik", value: "neon glowing lights" },
        { label: "Tenang", value: "calm and peaceful lighting" }
      ]
    },
    presenterNote: "Prompt adalah cara kita menjelaskan ide kepada AI dengan lebih jelas."
  },
  {
    id: "contoh-visual-ai",
    title: "Contoh Visual AI",
    supportingCopy: "Satu ide dapat menghasilkan beberapa visual. Anak belajar memilih hasil yang paling sesuai.",
    visuals: ["Versi Penemuan", "Versi Aksi", "Versi Hasil"],
    evaluationQuestions: ["Mana yang paling sesuai dengan ceritanya?", "Apa yang ingin diperbaiki?", "Warnanya sudah tepat?", "Apakah posisi tokohnya sesuai?"],
    callout: "Hasil pertama tidak harus langsung diterima.",
    subCallout: "Anak belajar menilai, memilih, dan memperbaiki.",
    presenterNote: "Anak tidak hanya menerima hasil AI, tetapi belajar mengevaluasi dan memperbaiki."
  },
  {
    id: "dari-gambar-ke-video",
    title: "Dari Gambar ke Video",
    supportingCopy: "Visual dapat dikembangkan menjadi video pendek melalui gerakan, kamera, dan perubahan suasana.",
    aspects: ["Gerakan karakter", "Pergerakan kamera", "Transisi halus", "Perubahan suasana"],
    callout: "Dalam preview, hasil dapat berupa animasi singkat atau contoh scene video.",
    note: "Kecepatan proses dapat bergantung pada generator dan koneksi internet.",
    presenterNote: "Visual kemudian dapat dikembangkan menjadi video dengan gerakan dan arah kamera."
  },
  {
    id: "yang-dilatih-anak",
    title: "Yang Dilatih Anak",
    skills: [
      { title: "Kreativitas dan Imajinasi", description: "Mengembangkan satu ide menjadi cerita." },
      { title: "Storytelling", description: "Menyusun alur yang jelas dan bermakna." },
      { title: "Visual Thinking", description: "Menggambarkan ide dalam bentuk visual." },
      { title: "Prompt Communication", description: "Memberikan instruksi yang lebih jelas." },
      { title: "Pengambilan Keputusan", description: "Memilih hasil dan menentukan arah." },
      { title: "Presentasi", description: "Menjelaskan ide dan hasil karya." }
    ],
    responsibleAI: {
      title: "Penggunaan AI yang Bertanggung Jawab",
      items: ["tidak memasukkan data pribadi;", "memeriksa hasil;", "memilih konten yang aman;", "menggunakan AI untuk karya yang bermanfaat."]
    },
    quote: "Preview bukan ujian. Fokus pada proses, rasa ingin tahu, dan keberanian mencoba.",
    presenterNote: "Fokus kelas bukan hanya hasil akhir, tetapi keterampilan berpikir selama prosesnya."
  },
  {
    id: "program-lengkap-16-pertemuan",
    title: "Program Lengkap 16 Pertemuan",
    supportingCopy: "Preview hari ini adalah pengenalan singkat. Dalam program lengkap, anak mengembangkan proyek video utuh dari ide awal hingga presentasi akhir.",
    phases: [
      { title: "Story Foundations", description: "Ide, tema, karakter, dan pesan." },
      { title: "Storyboard Development", description: "Membuat alur cerita dan storyboard lengkap." },
      { title: "Visual Production", description: "Membuat visual dengan gaya dan karakter yang konsisten." },
      { title: "Video Generation & Editing", description: "Mengubah visual menjadi video dan melakukan editing." },
      { title: "Responsible AI Practice", description: "Menggunakan AI secara aman, sopan, dan bertanggung jawab." },
      { title: "Final Presentation & Showcase", description: "Mempresentasikan hasil dan merefleksikan proses belajar." }
    ],
    finalOutput: "Satu proyek video kreatif karya anak sendiri.",
    endingMessage: "Satu Proyek. Banyak Keterampilan. Pengalaman Belajar yang Berkesan.",
    presenterNote: "Dalam program 16 pertemuan, proses ini dikembangkan menjadi satu proyek utuh."
  }
];
