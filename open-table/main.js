(function () {
    if (window.lucide) window.lucide.createIcons();

    var whatsappNumber = "6281225734398";
    var selected = new Set();
    var cards = document.querySelectorAll(".program-card");
    var selectedCount = document.getElementById("selected-count");
    var selectedNames = document.getElementById("selected-names");
    var whatsappCta = document.getElementById("whatsapp-cta");
    var modal = document.getElementById("syllabus-modal");
    var lastFocused = null;

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
            name: "AI Academy",
            kicker: "AI ACADEMY",
            summary: "Siswa belajar menggunakan AI secara etis untuk membuat karya, memecahkan masalah, dan mengembangkan pola pikir future-ready.",
            meta: ["Grade 3–6", "16 sesi", "Prompt engineering", "Proyek kreatif"],
            outcomes: ["Menggunakan AI secara etis dan bertanggung jawab", "Membuat prompt yang baik", "Membuat gambar, presentasi, video, voice project, dan animasi", "Menggunakan AI untuk storytelling dan school projects", "Berani mempresentasikan final project dalam AI Expo"],
            values: ["Digital Ethics", "Creativity", "Innovation", "Critical Thinking", "Collaboration"],
            note: "Tools yang diperkenalkan antara lain ChatGPT, Canva AI, Gamma, D-ID / HeyGen sebagai demonstrasi, image creator, dan Google Workspace.",
            sessions: [
                ["What is AI?", "AI Quiz untuk mengenal konsep dasar kecerdasan buatan."],
                ["Prompt Engineering", "Membuat prompt yang jelas dan efektif."],
                ["AI Storytelling", "Membangun story book dengan bantuan AI."],
                ["AI Image", "Membuat poster menggunakan AI image tools."],
                ["AI Presentation", "Menyusun slide presentasi dengan bantuan AI."],
                ["AI Mind Map", "Brainstorming dan membuat mind map."],
                ["AI Video", "Membuat greeting video sederhana."],
                ["AI Voice", "Mengerjakan voice project dengan etika penggunaan."],
                ["AI for School", "Membuat homework assistant dan memahami batasan etis."],
                ["AI Design", "Membuat flyer untuk sebuah ide atau kegiatan."],
                ["AI Animation", "Membuat short animation."],
                ["AI Business Idea", "Mengembangkan business canvas sederhana."],
                ["AI Collaboration", "Menyelesaikan team project secara kolaboratif."],
                ["AI Showcase Prep", "Menyiapkan materi dan latihan presentasi."],
                ["Final Project", "Menyelesaikan dan mendemokan karya pilihan."],
                ["AI Expo Day", "Parents Exhibition untuk menampilkan hasil belajar."]
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

    function waUrl(programNames) {
        var message = "Halo Mozaiq, saya orang tua siswa SD Elyon Christian School. Saya tertarik dengan program: " + programNames.join(", ");
        return "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
    }

    function updateSelection() {
        var names = Array.from(selected).map(function (key) { return programs[key].name; });
        var count = names.length;

        if (!count) {
            selectedCount.textContent = "Belum ada program dipilih";
            selectedNames.textContent = "Pilih satu atau beberapa program di bawah.";
            whatsappCta.classList.add("is-disabled");
            whatsappCta.setAttribute("aria-disabled", "true");
            whatsappCta.removeAttribute("href");
        } else {
            selectedCount.textContent = count + (count === 1 ? " program dipilih" : " program dipilih");
            selectedNames.textContent = names.join(" • ");
            whatsappCta.classList.remove("is-disabled");
            whatsappCta.setAttribute("aria-disabled", "false");
            whatsappCta.setAttribute("href", waUrl(names));
        }
    }

    cards.forEach(function (card) {
        var key = card.getAttribute("data-program");
        var selectButton = card.querySelector(".select-button");

        selectButton.addEventListener("click", function () {
            if (selected.has(key)) {
                selected.delete(key);
            } else {
                selected.add(key);
            }
            var isSelected = selected.has(key);
            card.classList.toggle("is-selected", isSelected);
            selectButton.setAttribute("aria-pressed", isSelected ? "true" : "false");
            updateSelection();
        });
    });

    whatsappCta.addEventListener("click", function (event) {
        if (!selected.size) event.preventDefault();
    });

    function renderModal(key) {
        var program = programs[key];
        if (!program) return;

        document.getElementById("modal-kicker").textContent = program.kicker;
        document.getElementById("modal-title").textContent = program.name;
        document.getElementById("modal-summary").textContent = program.summary;
        document.getElementById("modal-meta").innerHTML = program.meta.map(function (item) { return "<span>" + item + "</span>"; }).join("");
        document.getElementById("modal-outcomes").innerHTML = program.outcomes.map(function (item) { return "<li>" + item + "</li>"; }).join("");
        document.getElementById("modal-values").innerHTML = program.values.map(function (item) { return "<li>" + item + "</li>"; }).join("");
        document.getElementById("modal-sessions").innerHTML = program.sessions.map(function (session, index) {
            return "<article class=\"session-item\"><span class=\"session-number\">" + String(index + 1).padStart(2, "0") + "</span><span><strong>" + session[0] + "</strong><small>" + session[1] + "</small></span></article>";
        }).join("");
        document.getElementById("modal-note").textContent = program.note;
        document.getElementById("modal-whatsapp").setAttribute("href", waUrl([program.name]));
    }

    function closeModal() {
        modal.hidden = true;
        document.body.style.overflow = "";
        if (lastFocused) lastFocused.focus();
    }

    document.querySelectorAll("[data-details]").forEach(function (button) {
        button.addEventListener("click", function () {
            lastFocused = button;
            renderModal(button.getAttribute("data-details"));
            modal.hidden = false;
            document.body.style.overflow = "hidden";
            modal.querySelector(".modal-close").focus();
        });
    });

    modal.querySelectorAll("[data-close-modal]").forEach(function (node) {
        node.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !modal.hidden) closeModal();
    });

    updateSelection();
})();
