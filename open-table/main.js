(function () {
    if (window.lucide) window.lucide.createIcons();

    // Require the Google Form on the first visit to this device.
    (function () {
        var gate = document.getElementById("registration-gate");
        var confirm = document.getElementById("registration-confirm");
        var submit = document.getElementById("registration-submit");
        var storageKey = "mfa-open-table-registration-complete-v2";
        if (!gate || !confirm || !submit) return;

        var completed = false;
        try { completed = localStorage.getItem(storageKey) === "true"; } catch (e) { /* ignore */ }

        if (completed) {
            gate.hidden = true;
        } else {
            document.body.classList.add("is-registration-locked");
            window.setTimeout(function () { confirm.focus(); }, 0);
        }

        confirm.addEventListener("change", function () {
            submit.disabled = !confirm.checked;
        });

        submit.addEventListener("click", function () {
            if (!confirm.checked) return;
            try { localStorage.setItem(storageKey, "true"); } catch (e) { /* ignore */ }
            gate.hidden = true;
            document.body.classList.remove("is-registration-locked");
            var programSection = document.getElementById("pilih-program");
            if (programSection) programSection.setAttribute("tabindex", "-1");
        });
    })();

    var whatsappNumber = "6281225734398";
    var selected = new Set();
    var cards = document.querySelectorAll(".program-card");
    var selectedCount = document.getElementById("selected-count");
    var selectedNames = document.getElementById("selected-names");
    var whatsappCta = document.getElementById("whatsapp-cta");
    var modal = document.getElementById("syllabus-modal");
    var modalImage = document.getElementById("modal-image");
    var modalSelect = document.getElementById("modal-select");
    var modalHeaderProgram = document.getElementById("modal-header-program");
    var sessionToggle = document.getElementById("session-toggle");
    var sessionPanel = document.getElementById("session-panel");
    var noteToggle = document.getElementById("note-toggle");
    var notePanel = document.getElementById("note-panel");
    var videoShowAll = document.getElementById("video-show-all");
    var videoExtraLinks = document.getElementById("video-extra-links");
    var featuredVideoGrid = document.getElementById("featured-video-grid");
    var modalPhases = document.getElementById("modal-phases");
    var currentProgramKey = null;
    var lastFocused = null;
    var currentLanguage = "en";
    var programWorks = {
        ai: [
            "https://youtu.be/Jx7dhu8TVrU",
            "https://youtube.com/shorts/OIuj-fMf4S0",
            "https://youtube.com/shorts/NUgvyFAlHk4",
            "https://youtube.com/shorts/I2YRz7n96uw",
            "https://youtube.com/shorts/d-WRyGARsm8",
            "https://youtube.com/shorts/W0mASn2pfK0",
            "https://youtube.com/shorts/rpx_umueWio",
            "https://youtube.com/shorts/f93PBgDXNI4"
        ]
    };

    var translations = {
        en: {
            pageTitle: "Elyon Open Table | Mozaiq Future Academy",
            pageDescription: "Explore six extracurricular programs from Mozaiq Future Academy for Elyon Christian School students.",
            "gate.kicker": "BEFORE CHOOSING A PROGRAM",
            "gate.title": "Get to know us first",
            "gate.intro": "Fill in the short form below so the Mozaiq team can follow up after the open table.",
            "gate.fieldsLabel": "Information needed",
            "gate.parent": "Parent name",
            "gate.student": "Student name",
            "gate.grade": "Grade",
            "gate.interest": "Program interest",
            "gate.formTitle": "Parent information and extracurricular preferences form",
            "gate.confirm": "I have completed and submitted the Google Form.",
            "gate.continue": "Continue to program choices",
            "gate.note": "Your information is saved in the Mozaiq Future Academy Google Form. The form also asks for a WhatsApp number so our team can contact you.",
            "gate.fallback": "Open the Google Form in a new tab",
            "language.aria": "Choose language",
            "brand.aria": "Back to Mozaiq Future Academy website",
            "header.context": "Open Table",
            "hero.eyebrow": "OPEN TABLE • Elyon",
            "hero.title": "Find an extracurricular program that makes your child excited to learn",
            "hero.lead": "Choose one of 6 programs and explore the activities.",
            "hero.count": "Programs to Explore",
            "program.kicker": "CHOOSE A PROGRAM",
            "program.title": "Explore the programs",
            "program.hint": "Tap a card to view details.",
            "program.gridLabel": "Six extracurricular programs",
            "card.detail": "View details <span aria-hidden=\"true\">→</span>",
            "card.archery.category": "SPORTS",
            "card.archery.name": "Archery",
            "card.archery.tagline": "Focus <i aria-hidden=\"true\">•</i> Discipline",
            "card.archery.aria": "View Archery details",
            "card.archery.alt": "Students practicing archery in the Mozaiq Archery program",
            "card.floorball.category": "SPORTS",
            "card.floorball.name": "Floorball",
            "card.floorball.tagline": "Play <i aria-hidden=\"true\">•</i> Teamwork",
            "card.floorball.aria": "View Floorball details",
            "card.floorball.alt": "Students playing floorball in the Mozaiq Floorball program",
            "card.ai.category": "TECHNOLOGY",
            "card.ai.name": "AI Creative Media",
            "card.ai.tagline": "Create <i aria-hidden=\"true\">•</i> Imagine",
            "card.ai.aria": "View AI Creative Media details",
            "card.ai.alt": "Students learning artificial intelligence in the AI Creative Media program",
            "card.affiliate.category": "DIGITAL BUSINESS",
            "card.affiliate.name": "Affiliate Business",
            "card.affiliate.tagline": "Create <i aria-hidden=\"true\">•</i> Communicate",
            "card.affiliate.aria": "View Affiliate Business details",
            "card.affiliate.alt": "Students learning digital business in the Affiliate Business program",
            "card.drone.category": "TECHNOLOGY",
            "card.drone.name": "Drone Academy",
            "card.drone.tagline": "Fly <i aria-hidden=\"true\">•</i> Innovate",
            "card.drone.aria": "View Drone Academy details",
            "card.drone.alt": "Students operating a drone in the Drone Academy program",
            "card.magic.category": "CREATIVE",
            "card.magic.name": "Magic Class",
            "card.magic.tagline": "Create <i aria-hidden=\"true\">•</i> Perform",
            "card.magic.aria": "View Magic Class details",
            "card.magic.alt": "Magic props and performance from the Magic Class program",
            "selection.label": "Program selection",
            "selection.emptyCount": "No program selected",
            "selection.emptyHint": "Tap a card to add a program.",
            "selection.one": "1 program selected",
            "selection.many": "{count} programs selected",
            "selection.whatsapp": "Send via WhatsApp",
            "footer.school": "Elyon Christian School",
            "modal.close": "Close program details",
            "modal.back": "All Programs",
            "modal.outcomes": "What your child will learn",
            "modal.values": "VALUES WE BUILD",
            "modal.roadmap": "LEARNING JOURNEY",
            "modal.sessionsTitle": "Four stages of learning",
            "modal.sessionDuration": "1 session / week",
            "modal.sessionDetails": "View details of all sessions",
            "modal.safetyKicker": "SAFETY & GUIDANCE",
            "modal.safetyTitle": "Safe & Guided",
            "modal.additionalInfo": "Additional program information",
            "modal.select": "Choose Program",
            "modal.remove": "Remove from selection",
            "modal.whatsapp": "Ask via WhatsApp",
            "modal.examplesKicker": "FEATURED WORK",
            "modal.examplesTitle": "See student work examples",
            "modal.watchExample": "Student work example {count}",
            "modal.showAllExamples": "View all {count} examples",
            "modal.hideAllExamples": "Hide extra examples"
        },
        id: {
            pageTitle: "Open Table Elyon | Mozaiq Future Academy",
            pageDescription: "Temukan enam pilihan ekstrakurikuler Mozaiq Future Academy untuk siswa Elyon Christian School.",
            "gate.kicker": "SEBELUM MEMILIH PROGRAM",
            "gate.title": "Kenalan dulu dengan kami",
            "gate.intro": "Isi data singkat berikut agar tim Mozaiq dapat membantu menghubungi Bapak/Ibu setelah open table.",
            "gate.fieldsLabel": "Data yang diperlukan",
            "gate.parent": "Nama orang tua",
            "gate.student": "Nama siswa",
            "gate.grade": "Kelas",
            "gate.interest": "Minat program",
            "gate.formTitle": "Formulir data orang tua dan pilihan ekstrakurikuler",
            "gate.confirm": "Saya sudah mengisi dan mengirim Google Form.",
            "gate.continue": "Lanjut ke pilihan program",
            "gate.note": "Data tersimpan di Google Form Mozaiq Future Academy. Form juga meminta nomor WhatsApp agar tim kami dapat menghubungi Bapak/Ibu.",
            "gate.fallback": "Buka Google Form di tab baru",
            "language.aria": "Pilih bahasa",
            "brand.aria": "Kembali ke website Mozaiq Future Academy",
            "header.context": "Open Table",
            "hero.eyebrow": "OPEN TABLE • Elyon",
            "hero.title": "Temukan ekskul yang membuat anak antusias belajar",
            "hero.lead": "Pilih salah satu dari 6 program dan lihat detail kegiatannya.",
            "hero.count": "Program Pilihan",
            "program.kicker": "PILIH PROGRAM",
            "program.title": "Program untuk dijelajahi",
            "program.hint": "Tekan kartu untuk melihat detail.",
            "program.gridLabel": "Enam program ekstrakurikuler",
            "card.detail": "Lihat detail <span aria-hidden=\"true\">→</span>",
            "card.archery.category": "OLAHRAGA",
            "card.archery.name": "Archery",
            "card.archery.tagline": "Focus <i aria-hidden=\"true\">•</i> Discipline",
            "card.archery.aria": "Lihat detail Archery",
            "card.archery.alt": "Siswa berlatih panahan dalam program Archery Mozaiq",
            "card.floorball.category": "OLAHRAGA",
            "card.floorball.name": "Floorball",
            "card.floorball.tagline": "Play <i aria-hidden=\"true\">•</i> Teamwork",
            "card.floorball.aria": "Lihat detail Floorball",
            "card.floorball.alt": "Siswa bermain floorball dalam program Floorball Mozaiq",
            "card.ai.category": "TEKNOLOGI",
            "card.ai.name": "AI Creative Media",
            "card.ai.tagline": "Create <i aria-hidden=\"true\">•</i> Imagine",
            "card.ai.aria": "Lihat detail AI Creative Media",
            "card.ai.alt": "Siswa belajar kecerdasan buatan dalam program AI Creative Media",
            "card.affiliate.category": "BISNIS DIGITAL",
            "card.affiliate.name": "Affiliate Business",
            "card.affiliate.tagline": "Create <i aria-hidden=\"true\">•</i> Communicate",
            "card.affiliate.aria": "Lihat detail Affiliate Business",
            "card.affiliate.alt": "Siswa belajar bisnis digital dalam program Affiliate Business",
            "card.drone.category": "TEKNOLOGI",
            "card.drone.name": "Drone Academy",
            "card.drone.tagline": "Fly <i aria-hidden=\"true\">•</i> Innovate",
            "card.drone.aria": "Lihat detail Drone Academy",
            "card.drone.alt": "Siswa mengoperasikan drone dalam program Drone Academy",
            "card.magic.category": "KREATIF",
            "card.magic.name": "Magic Class",
            "card.magic.tagline": "Create <i aria-hidden=\"true\">•</i> Perform",
            "card.magic.aria": "Lihat detail Magic Class",
            "card.magic.alt": "Perlengkapan dan pertunjukan sulap dalam program Magic Class",
            "selection.label": "Pilihan program",
            "selection.emptyCount": "Belum ada pilihan",
            "selection.emptyHint": "Pilih kartu untuk menambahkan program.",
            "selection.one": "1 program dipilih",
            "selection.many": "{count} program dipilih",
            "selection.whatsapp": "Kirim via WhatsApp",
            "footer.school": "Elyon Christian School",
            "modal.close": "Tutup detail program",
            "modal.back": "Semua Program",
            "modal.outcomes": "Anak akan belajar",
            "modal.values": "NILAI YANG DIBANGUN",
            "modal.roadmap": "PERJALANAN BELAJAR",
            "modal.sessionsTitle": "Empat tahap pembelajaran",
            "modal.sessionDuration": "1 sesi / minggu",
            "modal.sessionDetails": "Lihat rincian seluruh sesi",
            "modal.safetyKicker": "KEAMANAN & PENDAMPINGAN",
            "modal.safetyTitle": "Aman & Terarah",
            "modal.additionalInfo": "Informasi tambahan program",
            "modal.select": "Pilih Program",
            "modal.remove": "Hapus dari pilihan",
            "modal.whatsapp": "Tanya via WhatsApp",
            "modal.examplesKicker": "CONTOH KARYA UNGGULAN",
            "modal.examplesTitle": "Lihat contoh karya",
            "modal.watchExample": "Contoh karya {count}",
            "modal.showAllExamples": "Lihat semua {count} contoh",
            "modal.hideAllExamples": "Sembunyikan contoh tambahan"
        },
        zh: {
            pageTitle: "Elyon 开放体验日 | Mozaiq Future Academy",
            pageDescription: "探索 Mozaiq Future Academy 为 Elyon Christian School 学生准备的六项课外活动课程。",
            "gate.kicker": "选择课程前",
            "gate.title": "先了解我们",
            "gate.intro": "请填写以下简短表格，方便 Mozaiq 团队在开放体验日后与您联系。",
            "gate.fieldsLabel": "所需信息",
            "gate.parent": "家长姓名",
            "gate.student": "学生姓名",
            "gate.grade": "年级",
            "gate.interest": "感兴趣的课程",
            "gate.formTitle": "家长信息及课外活动偏好表",
            "gate.confirm": "我已填写并提交 Google 表单。",
            "gate.continue": "继续选择课程",
            "gate.note": "您的信息会保存于 Mozaiq Future Academy 的 Google 表单中。表单也会收集 WhatsApp 号码，方便我们的团队与您联系。",
            "gate.fallback": "在新标签页打开 Google 表单",
            "language.aria": "选择语言",
            "brand.aria": "返回 Mozaiq Future Academy 网站",
            "header.context": "开放体验日",
            "hero.eyebrow": "开放体验日 • Elyon",
            "hero.title": "寻找让孩子充满学习热情的课外活动",
            "hero.lead": "选择 6 项课程中的一项，探索丰富的活动内容。",
            "hero.count": "可探索课程",
            "program.kicker": "选择课程",
            "program.title": "探索课程",
            "program.hint": "点击卡片查看详情。",
            "program.gridLabel": "六项课外活动课程",
            "card.detail": "查看详情 <span aria-hidden=\"true\">→</span>",
            "card.archery.category": "体育",
            "card.archery.name": "射箭",
            "card.archery.tagline": "专注 <i aria-hidden=\"true\">•</i> 纪律",
            "card.archery.aria": "查看射箭课程详情",
            "card.archery.alt": "学生参加 Mozaiq 射箭课程的练习",
            "card.floorball.category": "体育",
            "card.floorball.name": "地板球",
            "card.floorball.tagline": "乐趣 <i aria-hidden=\"true\">•</i> 团队合作",
            "card.floorball.aria": "查看地板球课程详情",
            "card.floorball.alt": "学生参加 Mozaiq 地板球课程的活动",
            "card.ai.category": "科技",
            "card.ai.name": "AI 创意媒体",
            "card.ai.tagline": "创作 <i aria-hidden=\"true\">•</i> 想象",
            "card.ai.aria": "查看 AI 创意媒体课程详情",
            "card.ai.alt": "学生在 AI 创意媒体课程中学习人工智能",
            "card.affiliate.category": "数字商业",
            "card.affiliate.name": "联盟营销",
            "card.affiliate.tagline": "创作 <i aria-hidden=\"true\">•</i> 沟通",
            "card.affiliate.aria": "查看联盟营销课程详情",
            "card.affiliate.alt": "学生在联盟营销课程中学习数字商业",
            "card.drone.category": "科技",
            "card.drone.name": "无人机学院",
            "card.drone.tagline": "飞行 <i aria-hidden=\"true\">•</i> 创新",
            "card.drone.aria": "查看无人机学院课程详情",
            "card.drone.alt": "学生在无人机学院课程中操作无人机",
            "card.magic.category": "创意",
            "card.magic.name": "魔术课",
            "card.magic.tagline": "创作 <i aria-hidden=\"true\">•</i> 表演",
            "card.magic.aria": "查看魔术课详情",
            "card.magic.alt": "魔术课中的道具与表演",
            "selection.label": "课程选择",
            "selection.emptyCount": "尚未选择课程",
            "selection.emptyHint": "点击卡片添加课程。",
            "selection.one": "已选择 1 项课程",
            "selection.many": "已选择 {count} 项课程",
            "selection.whatsapp": "通过 WhatsApp 发送",
            "footer.school": "Elyon Christian School",
            "modal.close": "关闭课程详情",
            "modal.back": "全部课程",
            "modal.outcomes": "孩子将学到什么",
            "modal.values": "培养的价值观",
            "modal.roadmap": "学习历程",
            "modal.sessionsTitle": "四个学习阶段",
            "modal.sessionDuration": "每周 1 节课",
            "modal.sessionDetails": "查看全部课程安排",
            "modal.safetyKicker": "安全与指导",
            "modal.safetyTitle": "安全且有指导",
            "modal.additionalInfo": "课程补充信息",
            "modal.select": "选择课程",
            "modal.remove": "从选择中移除",
            "modal.whatsapp": "通过 WhatsApp 咨询",
            "modal.examplesKicker": "精选作品",
            "modal.examplesTitle": "查看学生作品示例",
            "modal.watchExample": "学生作品示例 {count}",
            "modal.showAllExamples": "查看全部 {count} 个示例",
            "modal.hideAllExamples": "隐藏其他示例"
        }
    };

    var programs = {
        archery: {
            name: "Archery",
            kicker: "PREMIUM ARCHERY ACADEMY",
            summary: "Program panahan yang aman, menyenangkan, dan sesuai usia untuk membangun fokus, koordinasi, disiplin, serta rasa percaya diri.",
            meta: ["Grade 1–2", "Usia 6–8 tahun", "16 sesi", "60 menit / sesi"],
            outcomes: ["Mengenal olahraga panahan dengan aman", "Melatih fokus, koordinasi mata-tangan, dan keseimbangan", "Memasang perlengkapan dan memahami aturan keselamatan", "Mengenal posisi tubuh, teknik membidik, dan menembak jarak pendek", "Mengikuti mini competition dengan percaya diri"],
            values: ["Focus", "Discipline", "Respect", "Teamwork", "Confidence", "Fun Learning"],
            note: "Setiap sesi terdiri dari greeting, fun warm up, main lesson, fun challenge, dan reflection.",
            sessions: [
                ["Welcome to Archery", "Mengenal busur, anak panah, target, safety line, dan coach commands."],
                ["Safety First", "Zona aman, cara membawa busur, cara berdiri, dan mengikuti instruksi coach."],
                ["Grip", "Hand position, finger position, dan cara memegang busur dengan benar."],
                ["Stance", "Mengenal square stance dan menjaga keseimbangan tubuh."],
                ["Anchor Position", "Latihan menarik tali dengan aman tanpa anak panah."],
                ["Aiming", "Belajar membidik target besar dari jarak 3 meter."],
                ["First Arrow", "Mulai menembak dari jarak 3 meter melalui 5 Arrow Challenge."],
                ["Fun Shooting Day", "Mini station dengan balloon target, animal target, dan color target."],
                ["Focus Challenge", "Target lebih kecil dan permainan Beat Your Score."],
                ["Team Shooting", "Latihan relay shooting dalam dua tim."],
                ["Moving Target", "Mengenal target berpindah melalui permainan papan warna."],
                ["Treasure Hunt", "Berburu poin melalui misi dan target yang menyenangkan."],
                ["Target Mission", "Menyelesaikan misi target merah, biru, dan hijau."],
                ["Confidence Shooting", "Setiap siswa tampil dan menembak secara mandiri."],
                ["Practice Competition", "Latihan mini tournament dengan aturan sederhana."],
                ["Graduation Day", "Mini competition dan perayaan pencapaian siswa."]
            ]
        },
        floorball: {
            name: "Floorball",
            kicker: "PREMIUM FLOORBALL ACADEMY",
            summary: "Olahraga tim dengan pendekatan Play • Learn • Grow untuk meningkatkan motorik, koordinasi, teamwork, respect, dan confidence.",
            meta: ["Grade 1–2", "Usia 6–8 tahun", "16 sesi", "60 menit / sesi"],
            outcomes: ["Mengenal floorball, stick, bola, gawang, dan keselamatan", "Memegang stick, menggiring, mengoper, serta menerima bola", "Menembak ke gawang dan bermain mini game", "Bekerja sama dan berkomunikasi dalam tim", "Mengenal sportivitas dan bermain tanpa foul"],
            values: ["Teamwork", "Respect", "Never Give Up", "Sportsmanship", "Confidence", "Discipline"],
            note: "Struktur latihan meliputi opening, fun warm up, skill development, fun game, dan reflection.",
            sessions: [
                ["Welcome to Floorball", "Mengenal floorball, stick, ball, goal, dan safety melalui Treasure Ball."],
                ["Holding The Stick", "Cara memegang stick, Stick Balance, dan berjalan dengan bola."],
                ["Basic Dribbling", "Menggiring bola melewati cone dan Who Is Fastest? challenge."],
                ["Direction Change", "Belajar berbelok kanan-kiri melalui permainan Traffic Light."],
                ["Passing", "Short pass, partner passing, dan Pass Relay."],
                ["Receiving", "Menghentikan bola dan menerima umpan dari teman."],
                ["Shooting", "Teknik push shot dan latihan target goal."],
                ["Fun Target", "Bowling Goal, Animal Goal, dan Balloon Goal."],
                ["Obstacle Dribble", "Menggiring bola melalui cone, tunnel, dan gate."],
                ["Passing Challenge", "Passing sambil bergerak dan membangun komunikasi."],
                ["Teamwork Day", "Mini match 2 vs 2 dan belajar kerja sama."],
                ["Attack The Goal", "Mengenal cara masuk ke area lawan dan menyerang gawang."],
                ["Defending", "Belajar mengambil bola tanpa melakukan foul."],
                ["Mini Match", "Pertandingan 3 vs 3 dengan aturan sederhana."],
                ["Practice Competition", "Round robin untuk melatih sportivitas dan strategi."],
                ["Graduation Festival", "Mini tournament, Parents vs Kids, medali, sertifikat, dan foto."]
            ]
        },
        ai: {
            name: "AI Creative Media",
            kicker: "AI CREATIVE MEDIA ACADEMY",
            summary: "Siswa mengarahkan AI untuk mengubah ide menjadi karya yang bermakna: dari storytelling, voice over, scene visual, hingga video pendek yang siap dipresentasikan.",
            meta: ["Grade 4–6", "16 sesi", "1 sesi / minggu", "Final: AI Expo Day"],
            outcomes: ["Memahami kemampuan, keterbatasan, dan etika penggunaan AI", "Menulis prompt dengan konteks, karakter, tujuan, dan instruksi yang jelas", "Membuat naskah, voice direction, dan style instruction", "Menghasilkan voice over, visual, animasi, sound effect, dan subtitle melalui workflow terarah", "Bekerja dalam tim dan menjelaskan keputusan kreatif serta batasan AI"],
            values: ["Integrity", "Responsibility", "Creativity", "Collaboration", "Stewardship"],
            note: "Akun dan proses generate dilakukan melalui pendampingan guru/sekolah/orang tua. Siswa tidak perlu mengunggah data pribadi ke AI publik.",
            sessions: [
                ["What is AI?", "AI Detective Quiz: membedakan ide, keputusan manusia, dan bantuan AI."],
                ["Responsible AI & Digital Ethics", "Membuat AI Promise tentang keamanan, kejujuran, privasi, dan verifikasi."],
                ["Story Idea & Audience", "Memilih topik yang bermanfaat dan menentukan target penonton."],
                ["Script with AI", "Membuat naskah video 30–60 detik dengan hook, karakter, dan penutup."],
                ["Voice Direction & Style Instruction", "Membuat Voice Card berisi karakter, emosi, gaya bicara, pacing, dan jeda."],
                ["AI Voice Over", "Teacher-guided Google AI Studio Multi-speaker: membuat dan membandingkan dua take."],
                ["Audio Lab", "Audacity: memisahkan dialog, memotong audio, mengatur volume, mencoba pitch, dan export MP3."],
                ["Scene Breakdown: Dunia + Makna", "Memecah naskah menjadi 4–8 scene pendek dengan dunia visual dan makna emosional."],
                ["Visual Story & Prompt Formula", "Membuat Style Bible: karakter, dunia, benda, lighting, komposisi, dan negative prompt."],
                ["AI Image Generation", "Teacher-guided Google Flow: membuat visual per scene dan memilih hasil paling sesuai."],
                ["Image to Video & Transition", "Teacher-guided Dreamina AI / BytePlus: membuat motion, camera movement, dan transisi."],
                ["Sound Effect & Ambience", "Membuat atau memilih SFX, ambience, dan layering audio yang mendukung scene."],
                ["Edit in Canva", "Menjadikan voice over sebagai backbone, menyusun video 9:16, speed video, dan subtitle."],
                ["Thumbnail, Caption & Responsible Sharing", "Membuat thumbnail, caption audiens, dan rencana publikasi yang aman."],
                ["Final Project & Peer Review", "Menyelesaikan video tim, memberi feedback, memperbaiki karya, dan menyiapkan presentasi."],
                ["AI Expo Day", "Parents Exhibition: menampilkan video dan menjelaskan workflow, tools, serta etika AI."]
            ]
        },
        affiliate: {
            name: "Affiliate Business",
            kicker: "AFFILIATE BUSINESS ACADEMY",
            summary: "Simulasi Young Digital Entrepreneur yang mengenalkan kewirausahaan digital secara bertanggung jawab dan sesuai usia.",
            meta: ["Grade 5–6", "16 sesi", "Content creation", "Simulasi proyek"],
            outcomes: ["Memahami mindset entrepreneur dan konsep affiliate", "Membuat konten dan personal branding sederhana", "Mengenal customer persona dan product matching", "Berlatih komunikasi serta sales pitch", "Memahami etika promosi dan literasi finansial dasar"],
            values: ["Creativity", "Communication", "Teamwork", "Responsibility", "Entrepreneurial Mindset"],
            note: "Seluruh aktivitas berbentuk simulasi pembelajaran. Akun, transaksi, atau komisi nyata hanya dilakukan dengan persetujuan orang tua dan mengikuti kebijakan sekolah.",
            sessions: [
                ["What is Business?", "Business Game untuk mengenal dasar kegiatan bisnis."],
                ["Entrepreneur Mindset", "Membuat Dream Board tentang tujuan dan ide siswa."],
                ["What is Affiliate?", "Product Matching melalui simulasi sederhana."],
                ["Know Your Customer", "Membuat customer persona."],
                ["Content Creation", "Photo Challenge untuk belajar membuat konten."],
                ["Basic Canva", "Membuat poster digital."],
                ["Video Content", "Membuat short video."],
                ["Storytelling", "Menyusun product story yang menarik."],
                ["Communication Skill", "Berlatih sales pitch."],
                ["Personal Branding", "Membuat profile card."],
                ["Digital Ethics", "Membahas studi kasus promosi digital."],
                ["Money Management", "Membuat simple budget."],
                ["Business Challenge", "Mengerjakan group project."],
                ["Marketing Day", "Presentasi hasil ide dan konten."],
                ["Business Expo Preparation", "Mendesain booth untuk expo."],
                ["Young Entrepreneur Expo", "Showcase karya kepada orang tua."]
            ]
        },
        drone: {
            name: "Drone Academy",
            kicker: "DRONE ACADEMY",
            summary: "Program teknologi yang menggabungkan keselamatan, STEM, kreativitas, inovasi, dan tanggung jawab melalui pengalaman menerbangkan drone.",
            meta: ["Grade 4–6", "16 sesi", "STEM & aviation", "Parents Demo Day"],
            outcomes: ["Mengenal teknologi, bagian, dan fungsi drone", "Menerbangkan drone dengan aman", "Menguasai take off, landing, hover, dan pola terbang dasar", "Mengambil foto udara dan video sederhana", "Menyelesaikan obstacle course dan mission challenge"],
            values: ["Safety", "Technology", "Creativity", "Innovation", "Responsibility"],
            note: "Peralatan pendukung meliputi DJI Neo, DJI Mini, landing pad, safety cone, FPV simulator, tablet, laptop, dan battery station.",
            sessions: [
                ["Introduction to Drone", "Mengenal drone dan membuat Know Your Drone."],
                ["Drone Safety", "Safety Challenge dan aturan keselamatan penerbangan."],
                ["Parts of Drone", "Assembly Quiz tentang bagian-bagian drone."],
                ["Take Off & Landing", "Landing Mission untuk menguasai lepas landas dan mendarat."],
                ["Hovering", "Balance Challenge untuk menjaga drone tetap stabil."],
                ["Forward & Backward", "Flying Maze untuk mengontrol arah maju-mundur."],
                ["Left & Right", "Control Challenge untuk mengasah orientasi."],
                ["Square Flight", "Square Mission dengan pola terbang persegi."],
                ["Circle Flight", "Circle Challenge dengan pola terbang melingkar."],
                ["Photography", "Mengambil foto udara terbaik."],
                ["Videography", "Membuat short video dari udara."],
                ["Obstacle Course", "Drone Race melalui jalur rintangan."],
                ["Precision Landing", "Landing Contest dengan target pendaratan."],
                ["Mission Rescue", "Team Mission untuk menyelesaikan skenario misi."],
                ["Mini Competition", "Drone Skill Contest."],
                ["Drone Showcase", "Parents Demo Day untuk menampilkan keterampilan siswa."]
            ]
        },
        magic: {
            name: "Magic Class",
            kicker: "MAGIC CLASS",
            summary: "Perjalanan dari dasar hingga panggung profesional melalui seni sulap, dengan penekanan pada koordinasi, komunikasi, kreativitas, etika, dan keberanian tampil.",
            meta: ["16 sesi", "60 menit / sesi", "Close-up magic", "Final gala show"],
            outcomes: ["Mengenal etika pesulap dan pentingnya menjaga rahasia", "Melatih fine motor coordination dan hand flexibility", "Mengembangkan misdirection, storytelling, dan komunikasi", "Menyusun rangkaian trik menjadi pertunjukan", "Membangun kepercayaan diri dan mengatasi stage fright"],
            values: ["Magician's Ethics", "Coordination", "Creativity", "Communication", "Confidence"],
            note: "Setiap sesi memiliki 10 menit teori, sejarah, dan etika, lalu 50 menit praktik, drilling, serta feedback.",
            sessions: [
                ["Basic Rubber Band Magic", "Crazy Domino's Band dan pengenalan Magician's Code."],
                ["Mentalism & Crayon Prediction", "Misdirection, membaca bahasa tubuh, dan komunikasi meyakinkan."],
                ["Basic Number Magic", "Mathematical magic dan presentasi yang terasa seperti sulap."],
                ["Coin Magic – Part 1", "Classic Palm, Finger Palm, dan coin vanish."],
                ["Coin Magic – Part 2", "Coin Through Table dan timing kedua tangan."],
                ["Banknote Magic – Part 1", "Transformasi banknote dengan teknik lipatan rahasia."],
                ["Banknote Magic – Part 2", "Pen Through Bill dan spectator management."],
                ["Mini Show", "Pertunjukan awal dan evaluasi kepercayaan diri."],
                ["Rope Magic – Part 1", "Secret slip knot dan ilusi tali melewati tubuh dengan aman."],
                ["Rope Magic – Part 2", "Cut and Restored Rope serta storytelling rhythm."],
                ["Rope Magic – Part 3", "Professor's Nightmare dan closing narrative."],
                ["Card Magic – Part 1", "Mechanic's Grip, shuffle, dan self-working card tricks."],
                ["Card Magic – Part 2", "Card control dan visual card change."],
                ["Card Magic – Part 3", "Ambitious Card Routine dan menyusun cohesive performance."],
                ["Thumb Tip Gimmick", "Menyembunyikan thumb tip dan vanish-reproduce silk."],
                ["Final Gala Show & Graduation", "Pertunjukan 3–5 menit dengan kostum, narasi, dan feedback."]
            ]
        }
    };

    var programCategories = {
        en: {
            archery: "Sports Program",
            floorball: "Sports Program",
            ai: "Creative Technology Program",
            affiliate: "Digital Business Program",
            drone: "Technology & Aviation Program",
            magic: "Creative Performance Program"
        },
        id: {
            archery: "PROGRAM OLAHRAGA",
            floorball: "PROGRAM OLAHRAGA",
            ai: "PROGRAM TEKNOLOGI KREATIF",
            affiliate: "PROGRAM BISNIS DIGITAL",
            drone: "PROGRAM TEKNOLOGI & PENERBANGAN",
            magic: "PROGRAM KREATIF & PERTUNJUKAN"
        },
        zh: {
            archery: "体育课程",
            floorball: "体育课程",
            ai: "创意科技课程",
            affiliate: "数字商业课程",
            drone: "科技与航空课程",
            magic: "创意表演课程"
        }
    };

    var safetyNotes = {
        en: {
            archery: "Equipment and shooting practice are supervised by trained coaches.",
            floorball: "Training follows coach guidance, safe play, and sportsmanship rules.",
            ai: "AI activities are guided. Students do not need to upload personal data to public AI services.",
            affiliate: "Activities are simulations. Real accounts or transactions require parent approval.",
            drone: "Every flight is supervised and follows clear equipment and safety rules.",
            magic: "Practice follows magician ethics, safe handling, and coach guidance."
        },
        id: {
            archery: "Peralatan dan latihan menembak didampingi coach terlatih.",
            floorball: "Latihan mengikuti arahan coach, aturan bermain aman, dan sportivitas.",
            ai: "Aktivitas AI dilakukan dengan pendampingan. Siswa tidak perlu mengunggah data pribadi ke layanan AI publik.",
            affiliate: "Aktivitas berbentuk simulasi. Akun atau transaksi nyata memerlukan persetujuan orang tua.",
            drone: "Setiap penerbangan didampingi dan mengikuti aturan alat serta keselamatan.",
            magic: "Latihan mengikuti etika pesulap, penggunaan alat yang aman, dan arahan coach."
        },
        zh: {
            archery: "器材和射击练习均由经过培训的教练指导。",
            floorball: "训练遵循教练指导、安全比赛规则和体育精神。",
            ai: "AI 活动均有指导。学生无需将个人资料上传到公共 AI 服务。",
            affiliate: "活动均为模拟学习。真实账号或交易需要家长同意。",
            drone: "每次飞行均有指导，并遵循明确的器材和安全规则。",
            magic: "练习遵循魔术师伦理、安全使用器材和教练指导。"
        }
    };

    var phaseLabels = {
        en: [
            { name: "Explore", range: "Sessions 1–4" },
            { name: "Create", range: "Sessions 5–8" },
            { name: "Produce", range: "Sessions 9–13" },
            { name: "Showcase", range: "Sessions 14–16" }
        ],
        id: [
            { name: "Explore", range: "Sesi 1–4" },
            { name: "Create", range: "Sesi 5–8" },
            { name: "Produce", range: "Sesi 9–13" },
            { name: "Showcase", range: "Sesi 14–16" }
        ],
        zh: [
            { name: "探索", range: "第 1–4 节" },
            { name: "创作", range: "第 5–8 节" },
            { name: "制作", range: "第 9–13 节" },
            { name: "展示", range: "第 14–16 节" }
        ]
    };

    var phaseDescriptions = {
        en: {
            archery: ["Learn safety, equipment, stance, and aiming.", "Build shooting skills through fun challenges and target practice.", "Develop focus, teamwork, and mission-solving through varied targets.", "Build confidence through independent shooting and a mini competition."],
            floorball: ["Learn the equipment, safe play, dribbling, and direction changes.", "Build passing, receiving, shooting, and ball control.", "Develop teamwork, attack, defence, and match skills.", "Practise competition, sportsmanship, and a graduation festival."],
            ai: ["Explore AI, responsible use, story ideas, and audiences.", "Create voice direction, voice-over, audio, and scene breakdowns.", "Produce visuals, video, transitions, sound effects, and edits.", "Prepare thumbnails, captions, the final project, peer review, and AI Expo Day."],
            affiliate: ["Explore business, entrepreneurship, affiliate concepts, and customers.", "Create content, posters, videos, stories, and a personal brand.", "Practise communication, ethics, money management, and a business challenge.", "Prepare marketing work and showcase the young entrepreneur project."],
            drone: ["Explore drone technology, parts, and safe flight rules.", "Create basic flight patterns through control and mission challenges.", "Produce aerial photos, videos, and obstacle-course missions.", "Showcase skills through a mini competition and Parents Demo Day."],
            magic: ["Explore magician ethics, mentalism, numbers, and coin magic.", "Create routines with banknotes, rope, storytelling, and a mini show.", "Produce card routines and build performance technique.", "Showcase a complete performance at the final gala and graduation."]
        },
        id: {
            archery: ["Mengenal keselamatan, peralatan, posisi tubuh, dan cara membidik.", "Membangun keterampilan menembak melalui tantangan dan latihan target.", "Melatih fokus, teamwork, dan penyelesaian misi dengan berbagai target.", "Membangun kepercayaan diri melalui latihan mandiri dan mini competition."],
            floorball: ["Mengenal alat, bermain aman, menggiring bola, dan berganti arah.", "Membangun kemampuan passing, receiving, shooting, dan kontrol bola.", "Melatih teamwork, serangan, pertahanan, dan keterampilan pertandingan.", "Berlatih kompetisi, sportivitas, dan graduation festival."],
            ai: ["Mengenal AI, penggunaan yang bertanggung jawab, ide cerita, dan audiens.", "Membuat voice direction, voice-over, audio, dan scene breakdown.", "Membuat visual, video, transisi, sound effect, dan editing.", "Menyiapkan thumbnail, caption, final project, peer review, dan AI Expo Day."],
            affiliate: ["Mengenal bisnis, entrepreneurship, affiliate, dan customer.", "Membuat konten, poster, video, storytelling, dan personal branding.", "Berlatih komunikasi, etika, pengelolaan uang, dan business challenge.", "Menyiapkan marketing dan showcase proyek young entrepreneur."],
            drone: ["Mengenal teknologi drone, bagian alat, dan aturan penerbangan aman.", "Membuat pola penerbangan dasar melalui tantangan kontrol dan misi.", "Menghasilkan foto, video udara, dan menyelesaikan obstacle course.", "Menampilkan keterampilan melalui mini competition dan Parents Demo Day."],
            magic: ["Mengenal etika pesulap, mentalism, number magic, dan coin magic.", "Membuat rutinitas banknote, rope, storytelling, dan mini show.", "Membuat card routine dan mengembangkan teknik pertunjukan.", "Menampilkan pertunjukan lengkap pada final gala dan graduation."]
        },
        zh: {
            archery: ["认识安全规则、器材、站姿和瞄准方法。", "通过挑战和目标练习培养射击技能。", "通过不同目标训练专注、团队合作和任务解决能力。", "通过独立练习和迷你比赛建立自信。"],
            floorball: ["认识器材，学习安全比赛、带球和改变方向。", "培养传球、接球、射门和控球能力。", "训练团队合作、进攻、防守和比赛技能。", "练习比赛、体育精神并参加毕业嘉年华。"],
            ai: ["探索 AI、负责任的使用方式、故事想法和目标受众。", "创作配音指导、配音、音频和场景拆解。", "制作视觉、视频、转场、音效并进行剪辑。", "准备缩略图、文案、最终项目、同伴互评和 AI 创意展。"],
            affiliate: ["探索商业、创业、联盟营销概念和客户。", "创作内容、海报、视频、故事并建立个人品牌。", "练习沟通、伦理、资金管理和商业挑战。", "准备营销作品并展示青年创业者项目。"],
            drone: ["探索无人机技术、部件和安全飞行规则。", "通过控制和任务挑战创作基础飞行路线。", "制作航拍照片、视频并完成障碍赛道任务。", "通过迷你比赛和家长展示日展示技能。"],
            magic: ["探索魔术师伦理、心灵魔术、数字魔术和硬币魔术。", "使用钞票、绳子和讲故事创作魔术流程，并完成迷你演出。", "制作纸牌魔术流程并发展表演技巧。", "在期末 gala 演出和毕业典礼展示完整表演。"]
        }
    };

    var englishPrograms = {
        archery: {
            summary: "A safe, age-appropriate archery program that builds focus, coordination, discipline, and confidence.",
            meta: ["Grades 1–2", "Ages 6–8", "16 sessions", "60 min / session"],
            outcomes: ["Learn the fundamentals of archery safely", "Build focus, hand-eye coordination, and balance", "Set up equipment and follow safety rules", "Practice stance, aiming, and short-distance shooting", "Take part in a mini competition with confidence"],
            values: ["Focus", "Discipline", "Respect", "Teamwork", "Confidence", "Fun Learning"],
            note: "Each session includes a greeting, fun warm-up, main lesson, challenge, and reflection.",
            sessions: [
                ["Welcome to Archery", "Learn about the bow, arrows, target, safety line, and coach commands."],
                ["Safety First", "Practice the safe zone, carrying a bow, stance, and following coach instructions."],
                ["Grip", "Learn the correct hand and finger positions for holding the bow."],
                ["Stance", "Learn the square stance and how to keep your body balanced."],
                ["Anchor Position", "Practice drawing the string safely without an arrow."],
                ["Aiming", "Aim at a large target from a three-meter distance."],
                ["First Arrow", "Start shooting from three meters through a five-arrow challenge."],
                ["Fun Shooting Day", "Try balloon, animal, and colour target stations."],
                ["Focus Challenge", "Aim at smaller targets and play Beat Your Score."],
                ["Team Shooting", "Practice relay shooting in two teams."],
                ["Moving Target", "Meet moving targets through a colourful board game."],
                ["Treasure Hunt", "Collect points through fun target missions."],
                ["Target Mission", "Complete red, blue, and green target missions."],
                ["Confidence Shooting", "Shoot independently and present your progress."],
                ["Practice Competition", "Train for a mini tournament with simple rules."],
                ["Graduation Day", "Celebrate student achievements with a mini competition."]
            ]
        },
        floorball: {
            summary: "A fun team sport that develops motor skills, coordination, agility, teamwork, decision-making, and sportsmanship.",
            meta: ["Grades 1–2", "Ages 6–8", "16 sessions", "60 min / session"],
            outcomes: ["Learn about the floorball stick, ball, goal, and safety", "Dribble, pass, receive, and control the ball", "Shoot at the goal and play mini games", "Communicate and work together as a team", "Practice sportsmanship and fair play"],
            values: ["Teamwork", "Respect", "Never Give Up", "Sportsmanship", "Confidence", "Discipline"],
            note: "Each session includes an opening, fun warm-up, skill development, fun game, and reflection.",
            sessions: [
                ["Welcome to Floorball", "Discover the stick, ball, goal, and safety through Treasure Ball."],
                ["Holding The Stick", "Learn stick grip, Stick Balance, and walking with the ball."],
                ["Basic Dribbling", "Dribble through cones in a Who Is Fastest? challenge."],
                ["Direction Change", "Change direction through the Traffic Light game."],
                ["Passing", "Practice short passes, partner passing, and Pass Relay."],
                ["Receiving", "Stop the ball and receive passes from a teammate."],
                ["Shooting", "Learn the push shot and practise goal targets."],
                ["Fun Target", "Play Bowling Goal, Animal Goal, and Balloon Goal."],
                ["Obstacle Dribble", "Dribble through cones, tunnels, and gates."],
                ["Passing Challenge", "Pass while moving and build team communication."],
                ["Teamwork Day", "Play a 2 vs 2 mini match and learn to cooperate."],
                ["Attack The Goal", "Learn how to enter the opponent area and attack the goal."],
                ["Defending", "Learn to win the ball without committing a foul."],
                ["Mini Match", "Play a 3 vs 3 match with simple rules."],
                ["Practice Competition", "Play a round robin to practise strategy and sportsmanship."],
                ["Graduation Festival", "Enjoy a mini tournament, Parents vs Kids, medals, certificates, and photos."]
            ]
        },
        ai: {
            summary: "Students direct AI to turn ideas into meaningful stories, voice overs, visuals, and short videos through a structured and ethical creative workflow.",
            meta: ["Grades 4–6", "16 sessions", "1 session / week", "Final: AI Expo Day"],
            outcomes: ["Understand the capabilities, limits, and ethics of AI", "Write prompts with clear context, characters, goals, and instructions", "Create scripts, voice direction, and style instructions", "Produce voice overs, visuals, animation, sound effects, and subtitles through a guided workflow", "Work in a team and explain creative decisions and AI limitations"],
            values: ["Integrity", "Responsibility", "Creativity", "Collaboration", "Stewardship"],
            note: "Accounts and generation are guided by teachers, schools, or parents. Students do not need to upload personal data to public AI tools.",
            sessions: [
                ["What is AI?", "Use AI Detective Quiz to separate human ideas, decisions, and AI assistance."],
                ["Responsible AI & Digital Ethics", "Create an AI Promise about safety, honesty, privacy, and verification."],
                ["Story Idea & Audience", "Choose a useful topic and define the target audience."],
                ["Script with AI", "Create a 30–60 second video script with a hook, character, and ending."],
                ["Voice Direction & Style Instruction", "Create a Voice Card with character, emotion, style, pacing, and pauses."],
                ["AI Voice Over", "Use a teacher-guided multi-speaker workflow to compare two voice takes."],
                ["Audio Lab", "Edit dialogue, volume, pitch, and export an MP3 in Audacity."],
                ["Scene Breakdown: World + Meaning", "Break the script into 4–8 short scenes with visual and emotional meaning."],
                ["Visual Story & Prompt Formula", "Build a Style Bible for characters, worlds, objects, lighting, composition, and negative prompts."],
                ["AI Image Generation", "Generate a visual for each scene with teacher guidance and choose the best results."],
                ["Image to Video & Transition", "Create motion, camera movement, and transitions with teacher-guided tools."],
                ["Sound Effect & Ambience", "Choose sound effects, ambience, and audio layers that support each scene."],
                ["Edit in Canva", "Build a 9:16 video around the voice over, speed, and subtitles."],
                ["Thumbnail, Caption & Responsible Sharing", "Create a thumbnail, audience caption, and safe publishing plan."],
                ["Final Project & Peer Review", "Complete the team video, give feedback, revise, and prepare a presentation."],
                ["AI Expo Day", "Present the video and explain the workflow, tools, and AI ethics."]
            ]
        },
        affiliate: {
            summary: "A responsible, age-appropriate Young Digital Entrepreneur simulation that introduces students to digital entrepreneurship.",
            meta: ["Grades 5–6", "16 sessions", "Content creation", "Project simulation"],
            outcomes: ["Understand the entrepreneur mindset and affiliate concepts", "Create simple content and personal branding", "Learn customer personas and product matching", "Practise communication and sales pitches", "Understand promotional ethics and basic financial literacy"],
            values: ["Creativity", "Communication", "Teamwork", "Responsibility", "Entrepreneurial Mindset"],
            note: "All activities are learning simulations. Real accounts, transactions, or commissions require parent approval and must follow school policies.",
            sessions: [
                ["What is Business?", "Play a Business Game to learn the basics of business activity."],
                ["Entrepreneur Mindset", "Create a Dream Board around goals and student ideas."],
                ["What is Affiliate?", "Learn product matching through a simple simulation."],
                ["Know Your Customer", "Create a customer persona."],
                ["Content Creation", "Use a Photo Challenge to practise creating content."],
                ["Basic Canva", "Design a digital poster."],
                ["Video Content", "Create a short video."],
                ["Storytelling", "Build an engaging product story."],
                ["Communication Skill", "Practise a sales pitch."],
                ["Personal Branding", "Create a profile card."],
                ["Digital Ethics", "Discuss digital promotion case studies."],
                ["Money Management", "Create a simple budget."],
                ["Business Challenge", "Complete a group project."],
                ["Marketing Day", "Present the idea and content."],
                ["Business Expo Preparation", "Design a booth for the expo."],
                ["Young Entrepreneur Expo", "Showcase the work to parents."]
            ]
        },
        drone: {
            summary: "A technology program combining safety, STEM, creativity, innovation, and responsibility through hands-on drone flight experiences.",
            meta: ["Grades 4–6", "16 sessions", "STEM & aviation", "Parents Demo Day"],
            outcomes: ["Understand drone technology, parts, and functions", "Fly a drone safely", "Master take-off, landing, hovering, and basic flight patterns", "Capture simple aerial photos and videos", "Complete obstacle courses and mission challenges"],
            values: ["Safety", "Technology", "Creativity", "Innovation", "Responsibility"],
            note: "Supporting equipment includes DJI Neo, DJI Mini, landing pads, safety cones, an FPV simulator, tablets, laptops, and a battery station.",
            sessions: [
                ["Introduction to Drone", "Discover drones and create a Know Your Drone guide."],
                ["Drone Safety", "Complete a Safety Challenge and learn flight safety rules."],
                ["Parts of Drone", "Test your knowledge with an Assembly Quiz."],
                ["Take Off & Landing", "Master take-off and landing through a Landing Mission."],
                ["Hovering", "Keep the drone stable through a Balance Challenge."],
                ["Forward & Backward", "Control forward and backward movement in a Flying Maze."],
                ["Left & Right", "Build orientation through a Control Challenge."],
                ["Square Flight", "Complete a square flight mission."],
                ["Circle Flight", "Practise a circular flight pattern."],
                ["Photography", "Capture the best aerial photo."],
                ["Videography", "Create a short video from the air."],
                ["Obstacle Course", "Race a drone through an obstacle course."],
                ["Precision Landing", "Compete in a precision landing contest."],
                ["Mission Rescue", "Work as a team to complete a rescue scenario."],
                ["Mini Competition", "Take part in a Drone Skill Contest."],
                ["Drone Showcase", "Showcase your skills during Parents Demo Day."]
            ]
        },
        magic: {
            summary: "A journey from the basics to the professional stage through magic, building coordination, communication, creativity, ethics, and performance confidence.",
            meta: ["16 sessions", "60 min / session", "Close-up magic", "Final gala show"],
            outcomes: ["Learn magician ethics and the importance of protecting secrets", "Build fine motor coordination and hand flexibility", "Develop misdirection, storytelling, and communication", "Turn individual tricks into a performance", "Build confidence and overcome stage fright"],
            values: ["Magician's Ethics", "Coordination", "Creativity", "Communication", "Confidence"],
            note: "Each session includes 10 minutes of theory, history, and ethics, followed by 50 minutes of practice, drilling, and feedback.",
            sessions: [
                ["Basic Rubber Band Magic", "Learn Crazy Domino's Band and the Magician's Code."],
                ["Mentalism & Crayon Prediction", "Explore misdirection, body language, and convincing communication."],
                ["Basic Number Magic", "Use mathematical magic and presentation to create wonder."],
                ["Coin Magic – Part 1", "Learn Classic Palm, Finger Palm, and coin vanish."],
                ["Coin Magic – Part 2", "Practise Coin Through Table and two-hand timing."],
                ["Banknote Magic – Part 1", "Transform a banknote using secret folds."],
                ["Banknote Magic – Part 2", "Learn Pen Through Bill and spectator management."],
                ["Mini Show", "Perform an early show and reflect on confidence."],
                ["Rope Magic – Part 1", "Learn a secret slip knot and safe rope illusions."],
                ["Rope Magic – Part 2", "Practise Cut and Restored Rope with storytelling rhythm."],
                ["Rope Magic – Part 3", "Perform Professor's Nightmare with a clear closing story."],
                ["Card Magic – Part 1", "Learn Mechanic's Grip, shuffles, and self-working card tricks."],
                ["Card Magic – Part 2", "Practise card control and a visual card change."],
                ["Card Magic – Part 3", "Build an Ambitious Card Routine and a cohesive performance."],
                ["Thumb Tip Gimmick", "Learn to conceal a thumb tip and vanish and reproduce a silk."],
                ["Final Gala Show & Graduation", "Perform a 3–5 minute show with costume, narration, and feedback."]
            ]
        }
    };

    var chinesePrograms = {
        archery: {
            name: "射箭",
            summary: "一项安全、适合年龄的射箭课程，帮助孩子培养专注力、协调性、纪律性和自信心。",
            meta: ["1–2 年级", "6–8 岁", "16 节课", "每节 60 分钟"],
            outcomes: ["安全学习射箭基础", "培养专注力、手眼协调和身体平衡", "正确准备器材并遵守安全规则", "练习站姿、瞄准和短距离射击", "自信参加迷你比赛"],
            values: ["专注", "纪律", "尊重", "团队合作", "自信", "快乐学习"],
            note: "每节课包括问候、趣味热身、主要课程、挑战活动和回顾。",
            sessions: [
                ["认识射箭", "认识弓、箭、靶子、安全线以及教练指令。"],
                ["安全第一", "学习安全区域、携弓方式、站姿和遵循教练指示。"],
                ["握弓", "学习正确的手部和手指位置。"],
                ["站姿", "学习正方形站姿并保持身体平衡。"],
                ["锚点姿势", "在不搭箭的情况下安全练习拉弦。"],
                ["瞄准", "从 3 米距离瞄准大型靶子。"],
                ["第一支箭", "通过五箭挑战，开始从 3 米距离射击。"],
                ["趣味射击日", "体验气球靶、动物靶和彩色靶等活动。"],
                ["专注挑战", "瞄准更小的目标并参与超越自己得分的游戏。"],
                ["团队射击", "两队进行接力射击练习。"],
                ["移动靶", "通过彩色棋盘游戏认识移动目标。"],
                ["寻宝活动", "通过有趣的目标任务收集分数。"],
                ["目标任务", "完成红色、蓝色和绿色目标任务。"],
                ["自信射击", "独立完成射击并展示自己的进步。"],
                ["模拟比赛", "按照简单规则练习迷你锦标赛。"],
                ["毕业日", "通过迷你比赛庆祝学生的学习成果。"]
            ]
        },
        floorball: {
            name: "地板球",
            summary: "一项充满乐趣的团队运动，培养运动能力、协调性、敏捷性、团队合作、判断力和体育精神。",
            meta: ["1–2 年级", "6–8 岁", "16 节课", "每节 60 分钟"],
            outcomes: ["认识地板球球杆、球、球门和安全规则", "练习带球、传球、接球和控球", "练习射门并参与迷你游戏", "在团队中沟通与合作", "学习体育精神和公平比赛"],
            values: ["团队合作", "尊重", "永不放弃", "体育精神", "自信", "纪律"],
            note: "每节课包括开场、趣味热身、技能训练、趣味游戏和回顾。",
            sessions: [
                ["认识地板球", "通过寻球游戏认识球杆、球、球门和安全规则。"],
                ["握杆", "学习握杆、杆上平衡以及带球行走。"],
                ["基础带球", "在最快者挑战中绕过锥桶带球。"],
                ["改变方向", "通过红绿灯游戏练习改变方向。"],
                ["传球", "练习短传、双人传球和传球接力。"],
                ["接球", "停球并接住队友的传球。"],
                ["射门", "学习推射并练习瞄准球门。"],
                ["趣味目标", "体验保龄球门、动物球门和气球球门。"],
                ["障碍带球", "绕过锥桶、隧道和球门带球。"],
                ["传球挑战", "边移动边传球，培养团队沟通。"],
                ["团队合作日", "进行 2 对 2 迷你比赛并学习合作。"],
                ["进攻球门", "学习进入对方区域并发起进攻。"],
                ["防守", "学习在不犯规的情况下抢回球权。"],
                ["迷你比赛", "按照简单规则进行 3 对 3 比赛。"],
                ["模拟比赛", "通过循环赛练习策略和体育精神。"],
                ["毕业嘉年华", "参加迷你锦标赛、家长对孩子比赛，并获得奖牌、证书和照片。"]
            ]
        },
        ai: {
            name: "AI 创意媒体",
            summary: "孩子将学习引导 AI，把想法变成有意义的故事、配音、视觉作品和短视频，完成结构清晰且负责任的创作流程。",
            meta: ["4–6 年级", "16 节课", "每周 1 节课", "结课：AI 创意展"],
            outcomes: ["了解 AI 的能力、局限和使用伦理", "编写包含清晰背景、角色、目标和指令的提示词", "创作脚本、配音指导和风格说明", "通过指导流程制作配音、视觉、动画、音效和字幕", "团队协作，并说明创作决定和 AI 的局限"],
            values: ["诚信", "责任", "创造力", "协作", "善用资源"],
            note: "账号和生成过程由教师、学校或家长指导。学生无需将个人资料上传到公共 AI 工具。",
            sessions: [
                ["什么是 AI？", "通过 AI 侦探问答区分人类想法、人类决定和 AI 协助。"],
                ["负责任的 AI 与数字伦理", "围绕安全、诚实、隐私和验证制定 AI 承诺。"],
                ["故事想法与受众", "选择有益的主题并确定目标观众。"],
                ["使用 AI 创作脚本", "制作包含吸引点、角色和结尾的 30–60 秒视频脚本。"],
                ["配音指导与风格说明", "制作包含角色、情绪、风格、节奏和停顿的配音卡。"],
                ["AI 配音", "在教师指导下使用多人配音流程，比较两种配音版本。"],
                ["音频实验室", "在 Audacity 中编辑对白、音量和音高，并导出 MP3。"],
                ["场景拆解：世界与意义", "将脚本拆分为 4–8 个短场景，明确视觉和情绪意义。"],
                ["视觉故事与提示词公式", "为角色、世界、物品、灯光、构图和负面提示词制作风格手册。"],
                ["AI 图像生成", "在教师指导下为每个场景生成视觉，并选出最合适的结果。"],
                ["图像转视频与转场", "使用教师指导的工具制作运动、镜头移动和转场。"],
                ["音效与环境声", "选择支持场景的音效、环境声和音频层。"],
                ["在 Canva 中剪辑", "围绕配音制作 9:16 视频，调整速度并添加字幕。"],
                ["缩略图、文案与负责任分享", "制作缩略图、面向观众的文案和安全发布计划。"],
                ["最终项目与同伴互评", "完成团队视频，给予反馈、修改作品并准备展示。"],
                ["AI 创意展", "展示视频，并说明创作流程、工具和 AI 伦理。"]
            ]
        },
        affiliate: {
            name: "联盟营销",
            summary: "通过负责任且适合年龄的青年数字创业模拟，让学生认识数字创业的基本概念。",
            meta: ["5–6 年级", "16 节课", "内容创作", "项目模拟"],
            outcomes: ["理解创业者思维和联盟营销概念", "创作简单内容并建立个人品牌", "学习客户画像和产品匹配", "练习沟通和销售演讲", "理解推广伦理和基础财务素养"],
            values: ["创造力", "沟通", "团队合作", "责任", "创业者思维"],
            note: "所有活动均为学习模拟。真实账号、交易或佣金需要家长同意，并遵守学校政策。",
            sessions: [
                ["什么是商业？", "通过商业游戏认识商业活动的基础。"],
                ["创业者思维", "围绕目标和学生想法制作梦想板。"],
                ["什么是联盟营销？", "通过简单模拟学习产品匹配。"],
                ["了解你的客户", "制作客户画像。"],
                ["内容创作", "通过照片挑战练习创作内容。"],
                ["Canva 基础", "设计数字海报。"],
                ["视频内容", "制作短视频。"],
                ["讲故事", "构思有吸引力的产品故事。"],
                ["沟通技巧", "练习销售演讲。"],
                ["个人品牌", "制作个人资料卡。"],
                ["数字伦理", "讨论数字推广案例。"],
                ["资金管理", "制作简单预算。"],
                ["商业挑战", "完成团队项目。"],
                ["营销日", "展示想法和内容。"],
                ["商业展准备", "为展览设计摊位。"],
                ["青年创业者展", "向家长展示作品。"]
            ]
        },
        drone: {
            name: "无人机学院",
            summary: "通过亲手操作无人机，将安全、STEM、创造力、创新和责任融合在科技学习体验中。",
            meta: ["4–6 年级", "16 节课", "STEM 与航空", "家长展示日"],
            outcomes: ["了解无人机技术、部件和功能", "安全地驾驶无人机", "掌握起飞、降落、悬停和基础飞行路线", "拍摄简单的航拍照片和视频", "完成障碍赛道和任务挑战"],
            values: ["安全", "科技", "创造力", "创新", "责任"],
            note: "配套设备包括 DJI Neo、DJI Mini、降落垫、安全锥、FPV 模拟器、平板电脑、笔记本电脑和电池站。",
            sessions: [
                ["无人机入门", "认识无人机并制作无人机知识指南。"],
                ["无人机安全", "完成安全挑战并学习飞行安全规则。"],
                ["无人机部件", "通过装配问答检验对无人机部件的认识。"],
                ["起飞与降落", "通过降落任务掌握起飞和降落。"],
                ["悬停", "通过平衡挑战让无人机保持稳定。"],
                ["前进与后退", "在飞行迷宫中控制前进和后退。"],
                ["左与右", "通过控制挑战培养方向感。"],
                ["方形飞行", "完成方形路线飞行任务。"],
                ["圆形飞行", "练习圆形飞行路线。"],
                ["摄影", "拍摄最佳航拍照片。"],
                ["摄像", "从空中制作短视频。"],
                ["障碍赛道", "驾驶无人机穿越障碍赛道。"],
                ["精准降落", "参加精准降落挑战赛。"],
                ["救援任务", "团队合作完成救援情境任务。"],
                ["迷你比赛", "参加无人机技能挑战赛。"],
                ["无人机展示", "在家长展示日中展示飞行技能。"]
            ]
        },
        magic: {
            name: "魔术课",
            summary: "从基础走向舞台，通过魔术培养协调性、沟通力、创造力、职业伦理和表演自信。",
            meta: ["16 节课", "每节 60 分钟", "近景魔术", "期末 gala 演出"],
            outcomes: ["学习魔术师伦理以及保护秘密的重要性", "培养精细动作协调和手部灵活性", "发展误导、讲故事和沟通能力", "将单个技巧编排成完整表演", "建立自信并克服舞台紧张"],
            values: ["魔术师伦理", "协调", "创造力", "沟通", "自信"],
            note: "每节课包括 10 分钟理论、历史和伦理学习，以及 50 分钟练习、重复训练和反馈。",
            sessions: [
                ["基础橡皮筋魔术", "学习 Crazy Domino's Band 和魔术师守则。"],
                ["心灵魔术与蜡笔预言", "探索误导、肢体语言和有说服力的沟通。"],
                ["基础数字魔术", "运用数学魔术和演示创造惊喜。"],
                ["硬币魔术 – 第一部分", "学习 Classic Palm、Finger Palm 和硬币消失。"],
                ["硬币魔术 – 第二部分", "练习硬币穿桌和双手配合。"],
                ["钞票魔术 – 第一部分", "通过秘密折法改变钞票形态。"],
                ["钞票魔术 – 第二部分", "学习笔穿钞票和观众管理。"],
                ["迷你演出", "完成第一次演出并回顾自信心。"],
                ["绳子魔术 – 第一部分", "学习秘密活结和安全的绳子幻术。"],
                ["绳子魔术 – 第二部分", "练习剪绳复原术和故事节奏。"],
                ["绳子魔术 – 第三部分", "用清晰的结尾故事表演 Professor's Nightmare。"],
                ["纸牌魔术 – 第一部分", "学习 Mechanic's Grip、洗牌和自动完成的纸牌技巧。"],
                ["纸牌魔术 – 第二部分", "练习控牌和视觉变牌。"],
                ["纸牌魔术 – 第三部分", "编排 Ambitious Card Routine，建立完整表演。"],
                ["拇指套道具", "学习隐藏拇指套，以及丝巾消失与再现。"],
                ["期末 gala 演出与毕业", "穿着服装完成 3–5 分钟的表演，并加入旁白和反馈。"]
            ]
        }
    };

    function getProgramCopy(key) {
        var baseProgram = programs[key];
        if (!baseProgram) return null;
        if (currentLanguage === "en" && englishPrograms[key]) {
            return Object.assign({}, baseProgram, englishPrograms[key]);
        }
        if (currentLanguage === "zh" && chinesePrograms[key]) {
            return Object.assign({}, baseProgram, chinesePrograms[key]);
        }
        return baseProgram;
    }

    function waUrl(programNames) {
        var message;
        if (currentLanguage === "en") {
            message = "Hello Mozaiq, I am a parent of an Elyon Christian School student. I am interested in: " + programNames.join(", ");
        } else if (currentLanguage === "zh") {
            message = "您好 Mozaiq，我是 Elyon Christian School 学生的家长。我对以下课程感兴趣：" + programNames.join("、");
        } else {
            message = "Halo Mozaiq, saya orang tua siswa Elyon Christian School. Saya tertarik dengan program: " + programNames.join(", ");
        }
        return "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
    }

    function t(key) {
        return translations[currentLanguage][key] || translations.en[key] || key;
    }

    function applyLanguage(nextLanguage) {
        currentLanguage = nextLanguage === "id" || nextLanguage === "zh" ? nextLanguage : "en";
        document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : currentLanguage;
        document.title = t("pageTitle");
        var description = document.querySelector('meta[name="description"]');
        if (description) description.setAttribute("content", t("pageDescription"));

        document.querySelectorAll("[data-i18n]").forEach(function (node) {
            node.innerHTML = t(node.getAttribute("data-i18n"));
        });
        document.querySelectorAll("[data-i18n-aria]").forEach(function (node) {
            node.setAttribute("aria-label", t(node.getAttribute("data-i18n-aria")));
        });
        document.querySelectorAll("[data-i18n-alt]").forEach(function (node) {
            node.setAttribute("alt", t(node.getAttribute("data-i18n-alt")));
        });
        document.querySelectorAll("[data-i18n-title]").forEach(function (node) {
            node.setAttribute("title", t(node.getAttribute("data-i18n-title")));
        });
        document.querySelectorAll("[data-lang]").forEach(function (button) {
            var active = button.getAttribute("data-lang") === currentLanguage;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", active ? "true" : "false");
        });

        try { localStorage.setItem("mfa-open-table-language", currentLanguage); } catch (e) { /* ignore */ }

        if (currentProgramKey && !modal.hidden) {
            renderModal(currentProgramKey);
        } else {
            updateSelection();
        }
    }

    function updateSelection() {
        var names = Array.from(selected).map(function (key) { return getProgramCopy(key).name; });
        var count = names.length;

        if (!count) {
            selectedCount.textContent = t("selection.emptyCount");
            selectedNames.textContent = t("selection.emptyHint");
            whatsappCta.classList.add("is-disabled");
            whatsappCta.setAttribute("aria-disabled", "true");
            whatsappCta.removeAttribute("href");
        } else {
            selectedCount.textContent = t(count === 1 ? "selection.one" : "selection.many").replace("{count}", count);
            selectedNames.textContent = names.join(" • ");
            whatsappCta.classList.remove("is-disabled");
            whatsappCta.setAttribute("aria-disabled", "false");
            whatsappCta.setAttribute("href", waUrl(names));
        }

        cards.forEach(function (card) {
            var isSelected = selected.has(card.getAttribute("data-program"));
            card.classList.toggle("is-selected", isSelected);
            card.setAttribute("aria-pressed", isSelected ? "true" : "false");
        });

        if (currentProgramKey && modalSelect) {
            var currentIsSelected = selected.has(currentProgramKey);
            modalSelect.classList.toggle("is-selected", currentIsSelected);
            modalSelect.setAttribute("aria-pressed", currentIsSelected ? "true" : "false");
            modalSelect.querySelector("span").textContent = t(currentIsSelected ? "modal.remove" : "modal.select");
        }
    }

    function toggleSelection(key) {
        if (selected.has(key)) {
            selected.delete(key);
        } else {
            selected.add(key);
        }
        updateSelection();
    }

    cards.forEach(function (card) {
        card.addEventListener("click", function () {
            lastFocused = card;
            currentProgramKey = card.getAttribute("data-program");
            resetModalDetails();
            renderModal(currentProgramKey);
            modal.hidden = false;
            document.body.style.overflow = "hidden";
            modal.querySelector(".modal-close").focus();
        });
    });

    whatsappCta.addEventListener("click", function (event) {
        if (!selected.size) event.preventDefault();
    });

    function renderVideoExamples(key) {
        var section = document.getElementById("modal-videos");
        if (!section || !featuredVideoGrid || !videoExtraLinks || !videoShowAll) return;
        var works = programWorks[key] || [];

        if (!works.length) {
            section.hidden = true;
            featuredVideoGrid.innerHTML = "";
            videoExtraLinks.innerHTML = "";
            return;
        }

        section.hidden = false;
        featuredVideoGrid.innerHTML = works.slice(0, 1).map(function (url, index) {
            var label = t("modal.watchExample").replace("{count}", String(index + 1).padStart(2, "0"));
            var featuredClass = index === 0 ? " is-featured" : "";
            return "<a class=\"video-example-card" + featuredClass + "\" href=\"" + url + "\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"" + label + "\"><span class=\"video-preview\"><span class=\"video-play\">▶</span><span class=\"video-platform\">YouTube Short</span></span><span class=\"video-card-copy\"><strong>" + label + "</strong><span aria-hidden=\"true\">↗</span></span></a>";
        }).join("");
        videoExtraLinks.innerHTML = works.slice(1).map(function (url, index) {
            var number = index + 2;
            var label = t("modal.watchExample").replace("{count}", String(number).padStart(2, "0"));
            return "<a class=\"video-extra-link\" href=\"" + url + "\" target=\"_blank\" rel=\"noopener noreferrer\"><span>" + label + "</span><span aria-hidden=\"true\">↗</span></a>";
        }).join("");
        videoExtraLinks.hidden = true;
        videoShowAll.hidden = false;
        videoShowAll.setAttribute("aria-expanded", "false");
        videoShowAll.querySelector("span").textContent = t("modal.showAllExamples").replace("{count}", works.length);
    }

    function renderPhases(key) {
        if (!modalPhases) return;
        var labels = phaseLabels[currentLanguage];
        var descriptions = phaseDescriptions[currentLanguage][key] || phaseDescriptions.en[key];
        modalPhases.innerHTML = labels.map(function (phase, index) {
            return "<article class=\"phase-card\"><span class=\"phase-number\">0" + (index + 1) + "</span><div><strong>" + phase.name + "</strong><small>" + phase.range + "</small><p>" + descriptions[index] + "</p></div></article>";
        }).join("");
    }

    function setAccordion(toggle, panel, isOpen) {
        if (!toggle || !panel) return;
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        toggle.classList.toggle("is-open", isOpen);
        panel.hidden = !isOpen;
    }

    function resetModalDetails() {
        setAccordion(sessionToggle, sessionPanel, false);
        setAccordion(noteToggle, notePanel, false);
        if (videoExtraLinks && videoShowAll) {
            videoExtraLinks.hidden = true;
            videoShowAll.setAttribute("aria-expanded", "false");
        }
    }

    function renderModal(key) {
        var program = getProgramCopy(key);
        if (!program) return;

        var cardImage = document.querySelector('.program-card[data-program="' + key + '"] .program-image');
        if (cardImage && modalImage) {
            modalImage.src = cardImage.currentSrc || cardImage.src;
            modalImage.alt = cardImage.alt;
        }

        document.getElementById("modal-kicker").textContent = programCategories[currentLanguage][key];
        if (modalHeaderProgram) modalHeaderProgram.textContent = program.name;
        document.getElementById("modal-title").textContent = program.name;
        document.getElementById("modal-summary").textContent = program.summary;
        document.getElementById("modal-meta").innerHTML = program.meta.map(function (item) { return "<span>" + item + "</span>"; }).join("");
        document.getElementById("modal-outcomes").innerHTML = program.outcomes.slice(0, 4).map(function (item) { return "<li>" + item + "</li>"; }).join("");
        document.getElementById("modal-values").innerHTML = program.values.map(function (item) { return "<span class=\"value-chip\">" + item + "</span>"; }).join("");
        document.getElementById("modal-sessions").innerHTML = program.sessions.map(function (session, index) {
            return "<article class=\"session-item\"><span class=\"session-number\">" + String(index + 1).padStart(2, "0") + "</span><span><strong>" + session[0] + "</strong><small>" + session[1] + "</small></span></article>";
        }).join("");
        document.getElementById("modal-note").textContent = safetyNotes[currentLanguage][key];
        document.getElementById("modal-full-note").textContent = program.note;
        renderVideoExamples(key);
        renderPhases(key);
        document.getElementById("modal-whatsapp").setAttribute("href", waUrl([program.name]));
        updateSelection();
    }

    function closeModal() {
        modal.hidden = true;
        document.body.style.overflow = "";
        if (lastFocused) lastFocused.focus();
    }

    if (modalSelect) {
        modalSelect.addEventListener("click", function () {
            if (currentProgramKey) toggleSelection(currentProgramKey);
        });
    }

    if (sessionToggle) {
        sessionToggle.addEventListener("click", function () {
            setAccordion(sessionToggle, sessionPanel, sessionPanel.hidden);
        });
    }

    if (noteToggle) {
        noteToggle.addEventListener("click", function () {
            setAccordion(noteToggle, notePanel, notePanel.hidden);
        });
    }

    if (videoShowAll) {
        videoShowAll.addEventListener("click", function () {
            var isOpen = videoShowAll.getAttribute("aria-expanded") === "true";
            var works = programWorks[currentProgramKey] || [];
            videoExtraLinks.hidden = isOpen;
            videoShowAll.setAttribute("aria-expanded", isOpen ? "false" : "true");
            videoShowAll.querySelector("span").textContent = t(isOpen ? "modal.showAllExamples" : "modal.hideAllExamples").replace("{count}", works.length);
        });
    }

    modal.querySelectorAll("[data-close-modal]").forEach(function (node) {
        node.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !modal.hidden) closeModal();
    });

    document.querySelectorAll("[data-lang]").forEach(function (button) {
        button.addEventListener("click", function () {
            applyLanguage(button.getAttribute("data-lang"));
        });
    });

    var savedLanguage = null;
    try { savedLanguage = localStorage.getItem("mfa-open-table-language"); } catch (e) { /* ignore */ }
    applyLanguage(savedLanguage === "id" || savedLanguage === "zh" ? savedLanguage : "en");
})();
