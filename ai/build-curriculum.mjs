import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(currentDir, "..");
const indexPath = path.join(currentDir, "index.html");
const sources = {
  en: path.join(rootDir, "silabus", "AI-syllabus-en.csv"),
  id: path.join(rootDir, "silabus", "Untitled spreadsheet - Pertemuan.csv"),
};

const phases = [
  {
    id: "phase-1",
    number: "01",
    start: 1,
    end: 5,
    title: { en: "Story Foundations", id: "Fondasi Cerita" },
    goal: {
      en: "Turn an initial idea into a clear story plan that is ready for production.",
      id: "Mengubah ide awal menjadi rencana cerita yang jelas dan siap diproduksi.",
    },
    output: {
      en: "A developed concept, short script, and structured storyboard.",
      id: "Konsep matang, naskah pendek, dan storyboard terstruktur.",
    },
  },
  {
    id: "phase-2",
    number: "02",
    start: 6,
    end: 9,
    title: { en: "Visual Production", id: "Produksi Visual" },
    goal: {
      en: "Write effective prompts and refine a coherent visual set for every scene.",
      id: "Menulis prompt yang efektif dan menyempurnakan rangkaian visual yang konsisten untuk setiap scene.",
    },
    output: {
      en: "Complete prompts and selected final visuals for every scene.",
      id: "Prompt lengkap dan visual final terpilih untuk setiap scene.",
    },
  },
  {
    id: "phase-3",
    number: "03",
    start: 10,
    end: 13,
    title: { en: "Video & Editing", id: "Video & Editing" },
    goal: {
      en: "Combine narration, visuals, movement, sound, and text into a coherent edit.",
      id: "Menggabungkan narasi, visual, gerak, suara, dan teks menjadi edit yang utuh.",
    },
    output: {
      en: "A near-final video with narration, transitions, sound, and text.",
      id: "Video hampir final dengan narasi, transisi, suara, dan teks.",
    },
  },
  {
    id: "phase-4",
    number: "04",
    start: 14,
    end: 16,
    title: { en: "Finalization & Showcase", id: "Finalisasi & Showcase" },
    goal: {
      en: "Review quality and responsible use, then prepare the work to be shared.",
      id: "Meninjau kualitas dan penggunaan yang bertanggung jawab, lalu menyiapkan karya untuk dibagikan.",
    },
    output: {
      en: "A presentation-ready final video and a personal reflection.",
      id: "Video final siap presentasi dan refleksi pribadi.",
    },
  },
];

const flowLabels = [
  { en: "Opening", id: "Pembukaan", minutes: 5 },
  { en: "Teacher Demo", id: "Demo Guru", minutes: 8 },
  { en: "Guided Practice", id: "Latihan Bersama", minutes: 7 },
  { en: "Individual Creation", id: "Kreasi Individu", minutes: 35 },
  { en: "Save & Reflect", id: "Simpan & Refleksi", minutes: 5 },
];

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const next = text[index + 1];
    if (character === '"') {
      if (quoted && next === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      row.push(cell.trim());
      cell = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && next === "\n") index += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += character;
    }
  }
  if (cell || row.length) {
    row.push(cell.trim());
    if (row.some(Boolean)) rows.push(row);
  }
  return rows;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function translatedTag(tag, className, en, id, extra = "") {
  return `<${tag}${className ? ` class="${className}"` : ""}${extra} data-en="${escapeHtml(en)}" data-id="${escapeHtml(id)}">${escapeHtml(en)}</${tag}>`;
}

const datasets = Object.fromEntries(
  Object.entries(sources).map(([locale, source]) => {
    const rows = parseCsv(fs.readFileSync(source, "utf8").replace(/^\uFEFF/, ""));
    const meetings = rows.slice(2).filter((row) => /^\d+$/.test(row[0]));
    if (meetings.length !== 16) throw new Error(`${source} must contain exactly 16 meetings.`);
    return [locale, meetings];
  }),
);

function renderMeeting(number) {
  const en = datasets.en[number - 1];
  const id = datasets.id[number - 1];
  const panelId = `meeting-${number}-panel`;
  const headingId = `meeting-${number}-heading`;
  const detailRows = flowLabels.map((label, detailIndex) => {
    const cellIndex = detailIndex + 3;
    return `
                    <li${detailIndex === 3 ? ' class="is-primary"' : ""}>
                      <span class="detail-time">${label.minutes} ${translatedTag("small", "", "min", "mnt")}</span>
                      ${translatedTag("strong", "", label.en, label.id)}
                      ${translatedTag("p", "", en[cellIndex], id[cellIndex])}
                    </li>`;
  }).join("");

  return `
              <article class="meeting-accordion" id="meeting-${number}" data-meeting="${number}">
                <h4 id="${headingId}" class="meeting-heading">
                  <button class="meeting-toggle" type="button" aria-expanded="true" aria-controls="${panelId}">
                    <span class="meeting-number">${String(number).padStart(2, "0")}</span>
                    <span class="meeting-title">
                      ${translatedTag("small", "", `Meeting ${number} · Primary focus`, `Pertemuan ${number} · Fokus utama`)}
                      ${translatedTag("strong", "", en[1], id[1])}
                    </span>
                    <span class="meeting-deliverable">
                      ${translatedTag("small", "", "Individual output", "Hasil individu")}
                      ${translatedTag("span", "", en[2], id[2])}
                    </span>
                    <span class="meeting-chevron" aria-hidden="true">⌄</span>
                  </button>
                </h4>
                <div id="${panelId}" class="meeting-panel" role="region" aria-labelledby="${headingId}">
                  <div class="meeting-panel-inner">
                    <ol class="meeting-details" aria-label="Meeting time allocation">${detailRows}
                    </ol>
                    <p class="meeting-expected"><span data-en="Expected output" data-id="Hasil yang diharapkan">Expected output</span> · ${translatedTag("strong", "", en[2], id[2])}</p>
                  </div>
                </div>
              </article>`;
}

function renderPhase(phase) {
  const meetings = Array.from(
    { length: phase.end - phase.start + 1 },
    (_, index) => renderMeeting(phase.start + index),
  ).join("");
  const count = phase.end - phase.start + 1;
  return `
          <section id="${phase.id}" class="syllabus-phase" data-phase="${Number(phase.number)}" role="tabpanel" aria-labelledby="${phase.id}-tab">
            <div class="phase-summary">
              <span class="phase-title-number">${phase.number}</span>
              <div>
                <p><span data-en="${count} meetings" data-id="${count} pertemuan">${count} meetings</span></p>
                ${translatedTag("h3", "", phase.title.en, phase.title.id)}
              </div>
              <dl>
                <div><dt data-en="Phase goal" data-id="Tujuan fase">Phase goal</dt>${translatedTag("dd", "", phase.goal.en, phase.goal.id)}</div>
                <div><dt data-en="Phase output" data-id="Hasil fase">Phase output</dt>${translatedTag("dd", "", phase.output.en, phase.output.id)}</div>
              </dl>
            </div>
            <div class="phase-meetings">${meetings}
            </div>
          </section>`;
}

const startMarker = "<!-- CURRICULUM:START -->";
const endMarker = "<!-- CURRICULUM:END -->";
const index = fs.readFileSync(indexPath, "utf8");
const start = index.indexOf(startMarker);
const end = index.indexOf(endMarker);
if (start === -1 || end === -1 || end < start) throw new Error("Curriculum markers were not found in ai/index.html.");

const rendered = phases.map(renderPhase).join("\n");
const nextIndex = `${index.slice(0, start + startMarker.length)}\n${rendered}\n          ${index.slice(end)}`;
fs.writeFileSync(indexPath, nextIndex);
console.log("Rendered 16 bilingual meetings into ai/index.html.");
