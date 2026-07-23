import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const plannerDirectory = path.resolve(testDirectory, "..");
const projectDirectory = path.resolve(plannerDirectory, "../..");
const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "data/default-participants.js",
  "data/training-templates.js",
  "data/handoyo-plan.js"
];

for (const file of requiredFiles) {
  assert.equal(fs.existsSync(path.join(plannerDirectory, file)), true, `${file} harus tersedia`);
}

const html = fs.readFileSync(path.join(plannerDirectory, "index.html"), "utf8");
const css = fs.readFileSync(path.join(plannerDirectory, "styles.css"), "utf8");
const app = fs.readFileSync(path.join(plannerDirectory, "app.js"), "utf8");
const robots = fs.readFileSync(path.join(projectDirectory, "robots.txt"), "utf8");

assert.match(html, /name="robots" content="noindex, nofollow, noarchive, nosnippet"/);
assert.match(html, /data\/training-templates\.js/);
assert.match(html, /data\/handoyo-plan\.js/);
assert.match(html, /data\/default-participants\.js/);
assert.match(html, /app\.js/);
assert.match(css, /@media print/);
assert.match(css, /@media \(max-width: 390px\)/);
assert.match(robots, /Disallow: \/ai\/training-planner\//);
assert.doesNotMatch(app, /\.innerHTML\s*=/);
assert.doesNotMatch(app, /\beval\s*\(/);
assert.doesNotMatch(app, /\bfetch\s*\(/);
assert.match(app, /mozaiq_ai_training_planner_v1/);

const sandbox = { window: {} };
vm.createContext(sandbox);
for (const relativePath of [
  "data/training-templates.js",
  "data/handoyo-plan.js",
  "data/default-participants.js"
]) {
  const source = fs.readFileSync(path.join(plannerDirectory, relativePath), "utf8");
  new vm.Script(source, { filename: relativePath }).runInContext(sandbox);
}

const defaults = sandbox.window.MOZAIQ_TRAINING_DEFAULTS;
assert.equal(defaults.schemaVersion, 1);
assert.equal(defaults.activeParticipantId, "handoyo-kristanto");
assert.equal(defaults.participants.length, 1);
assert.equal(defaults.participants[0].name, "Pak Handoyo Kristanto");
assert.equal(defaults.participants[0].sessions.length, 4);
assert.equal(defaults.participants[0].sessions[0].status, "Planned");
assert.equal(defaults.participants[0].storyboard.length, 0);
assert.equal(defaults.participants[0].homework.length, 1);

const agendaMinutes = defaults.participants[0].sessions[0].agenda.reduce(
  (sum, item) => sum + item.plannedMinutes,
  0
);
assert.equal(agendaMinutes, 90);
assert.equal(defaults.participants[0].sessions[0].agenda.length, 8);
assert.equal(sandbox.window.MOZAIQ_TRAINING_TEMPLATES.length, 7);

for (const file of [
  "app.js",
  "data/training-templates.js",
  "data/handoyo-plan.js",
  "data/default-participants.js"
]) {
  new vm.Script(fs.readFileSync(path.join(plannerDirectory, file), "utf8"), { filename: file });
}

console.log("PASS: struktur, data default, keamanan, route, print, responsive, dan syntax tervalidasi.");
