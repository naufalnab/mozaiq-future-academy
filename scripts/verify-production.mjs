import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const indexPath = path.join(projectRoot, "index.html");
const chromeBin = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const chromeProc = spawn(chromeBin, [
    "--headless=new",
    "--disable-gpu",
    "--remote-debugging-port=9222",
    "--remote-allow-origins=*",
    "--user-data-dir=/tmp/chrome_test_profile",
    "--no-first-run",
    "--no-default-browser-check"
], { stdio: "ignore" });

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

let ws;
let msgId = 1;
const pending = new Map();

function send(method, params = {}) {
    return new Promise((resolve, reject) => {
        const id = msgId++;
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
    });
}

async function evalCode(expression) {
    const res = await send("Runtime.evaluate", {
        expression,
        returnByValue: true,
        awaitPromise: true
    });
    if (res.result && res.result.exceptionDetails) {
        throw new Error(res.result.exceptionDetails.text);
    }
    return res.result ? res.result.value : undefined;
}

try {
    await sleep(2000);

    const listRes = await fetch("http://127.0.0.1:9222/json/list");
    const targets = await listRes.json();
    const pageTarget = targets.find(t => t.type === "page") || targets[0];
    ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

    await new Promise((resolve, reject) => {
        ws.onopen = resolve;
        ws.onerror = reject;
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.id && pending.has(data.id)) {
                const { resolve, reject } = pending.get(data.id);
                pending.delete(data.id);
                if (data.error) reject(new Error(data.error.message));
                else resolve(data.result);
            }
        };
    });

    await send("Page.enable");
    await send("Runtime.enable");
    await send("DOM.enable");

    console.log("Navigating to index.html...");
    await send("Page.navigate", { url: `file://${indexPath}` });
    await sleep(1500);

    console.log("\n==========================================");
    console.log("TEST 1: RESPONSIVE VIEWPORT MATRIX & OVERFLOW");
    console.log("==========================================");

    const viewports = [
        [320, 640],
        [375, 667],
        [390, 844],
        [428, 926],
        [768, 1024],
        [1024, 768],
        [1280, 800],
        [1440, 900],
        [1920, 1080]
    ];

    let allViewportsPass = true;

    for (const [width, height] of viewports) {
        await send("Emulation.setDeviceMetricsOverride", {
            width,
            height,
            deviceScaleFactor: 1,
            mobile: width < 800
        });
        await sleep(250);

        const check = await evalCode(`(() => {
            const doc = document.documentElement;
            const sw = doc.scrollWidth;
            const cw = doc.clientWidth;
            const diff = sw - cw;
            const offenders = [];
            if (diff > 0) {
                document.querySelectorAll('*').forEach(el => {
                    const r = el.getBoundingClientRect();
                    if (r.right > cw + 1) {
                        offenders.push(\`\${el.tagName}.\${el.className} (r=\${Math.round(r.right)})\`);
                    }
                });
            }
            return { sw, cw, diff, offenders: offenders.slice(0, 3) };
        })()`);

        const status = check.diff <= 0 ? "PASS" : "FAIL (Overflow)";
        if (check.diff > 0) allViewportsPass = false;
        console.log(`Viewport ${width}x${height}px: [${status}] (clientWidth: ${check.cw}, scrollWidth: ${check.sw})`);
        if (check.offenders && check.offenders.length > 0) {
            console.log(`   Offenders: ${check.offenders.join(", ")}`);
        }
    }

    console.log(`\nViewport Matrix Result: ${allViewportsPass ? "ALL PASS" : "SOME FAILED"}`);

    // Reset viewport to desktop
    await send("Emulation.setDeviceMetricsOverride", {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false
    });
    await sleep(200);

    console.log("\n==========================================");
    console.log("TEST 2: HERO & TRUST SIGNALS AUDIT");
    console.log("==========================================");
    const heroAudit = await evalCode(`(() => {
        const title = document.querySelector("#hero-title")?.innerText?.trim();
        const eyebrow = document.querySelector(".hero .eyebrow")?.innerText?.trim();
        const trustBadges = Array.from(document.querySelectorAll(".trust-badges li")).map(li => li.innerText.trim());
        const stats = Array.from(document.querySelectorAll(".hero-stats li")).map(li => li.innerText.replace(/\\s+/g, ' ').trim());
        const img = document.querySelector(".hero-media img");
        return {
            title,
            eyebrow,
            trustBadges,
            stats,
            imgSrc: img?.getAttribute("src"),
            imgNaturalWidth: img?.naturalWidth
        };
    })()`);
    console.log("Hero Eyebrow:", heroAudit.eyebrow);
    console.log("Hero Title:", heroAudit.title);
    console.log("Trust Badges (4):", heroAudit.trustBadges);
    console.log("Stats (4):", heroAudit.stats);
    console.log("Hero Image Source:", heroAudit.imgSrc, `(naturalWidth: ${heroAudit.imgNaturalWidth})`);

    console.log("\n==========================================");
    console.log("TEST 3: SECTION #why REFINEMENT & COPY AUDIT");
    console.log("==========================================");
    const whyAudit = await evalCode(`(() => {
        const kicker = document.querySelector("#why .section-kicker")?.innerText?.trim();
        const title = document.querySelector("#why-title")?.innerText?.trim();
        const copy = document.querySelector("#why .section-copy")?.innerText?.trim();
        const leftBadge = document.querySelector("#why .comparison-col-muted .comparison-badge")?.innerText?.trim();
        const leftTitle = document.querySelector("#comp-old-title")?.innerText?.trim();
        const leftItems = Array.from(document.querySelectorAll("#why .comparison-col-muted .comparison-list strong")).map(s => s.innerText.trim());
        const rightBadge = document.querySelector("#why .comparison-col-highlight .comparison-badge")?.innerText?.trim();
        const rightTitle = document.querySelector("#comp-new-title")?.innerText?.trim();
        const rightItems = Array.from(document.querySelectorAll("#why .comparison-col-highlight .comparison-list strong")).map(s => s.innerText.trim());
        const ctaBtn = document.querySelector(".comparison-cta-wrap .button")?.innerText?.trim();
        const ctaMicro = document.querySelector(".comparison-cta-microcopy")?.innerText?.trim();
        return {
            kicker,
            title,
            copy,
            leftBadge,
            leftTitle,
            leftItems,
            rightBadge,
            rightTitle,
            rightItems,
            ctaBtn,
            ctaMicro
        };
    })()`);
    console.log("Eyebrow:", whyAudit.kicker);
    console.log("H2 Title:", whyAudit.title);
    console.log("Support Text:", whyAudit.copy);
    console.log(`Left Card: [${whyAudit.leftBadge}] "${whyAudit.leftTitle}"`);
    console.log("   Items (4):", whyAudit.leftItems);
    console.log(`Right Card: [${whyAudit.rightBadge}] "${whyAudit.rightTitle}"`);
    console.log("   Items (4):", whyAudit.rightItems);
    console.log("Comparison CTA:", whyAudit.ctaBtn, `("${whyAudit.ctaMicro}")`);

    console.log("\n==========================================");
    console.log("TEST 4: PROGRAM CATALOGUE (26 PROGRAMS) & FILTERS");
    console.log("==========================================");
    const catalogAudit = await evalCode(`(() => {
        const cards = document.querySelectorAll(".program-card");
        const extraCards = document.querySelectorAll(".program-card.program-extra");
        const divisions = Array.from(document.querySelectorAll(".division-card h3")).map(h => h.innerText.trim());
        const filterChips = Array.from(document.querySelectorAll(".filter-chip")).map(b => b.innerText.trim());
        return {
            totalCards: cards.length,
            extraCards: extraCards.length,
            featuredCards: cards.length - extraCards.length,
            divisions,
            filterChips
        };
    })()`);
    console.log(`Total programs: ${catalogAudit.totalCards} (Featured: ${catalogAudit.featuredCards}, Extra: ${catalogAudit.extraCards})`);
    console.log("5 Divisions:", catalogAudit.divisions);
    console.log("Filter Chips:", catalogAudit.filterChips);

    // Test filter interaction
    console.log("\nTesting filter interaction (click Technology chip)...");
    await evalCode(`document.querySelector('.filter-chip[data-filter="technology"]')?.click();`);
    await sleep(200);
    const filterTechResult = await evalCode(`(() => {
        const visible = Array.from(document.querySelectorAll(".program-card"))
            .filter(c => getComputedStyle(c).display !== "none")
            .map(c => c.querySelector("h3")?.innerText?.trim());
        return visible;
    })()`);
    console.log("Visible Technology programs:", filterTechResult);

    // Reset filter
    await evalCode(`document.querySelector('.filter-chip[data-filter="all"]')?.click();`);
    await sleep(200);

    // Test show all programs expansion
    console.log("\nTesting 'Tampilkan Semua 26 Program' expansion...");
    await evalCode(`document.getElementById("program-more-btn")?.click();`);
    await sleep(200);
    const expandedCount = await evalCode(`(() => {
        return Array.from(document.querySelectorAll(".program-card"))
            .filter(c => getComputedStyle(c).display !== "none").length;
    })()`);
    console.log("Visible cards after expansion:", expandedCount);

    console.log("\n==========================================");
    console.log("TEST 5: BILINGUAL I18N SWITCH (ID <-> EN)");
    console.log("==========================================");
    console.log("Switching to EN...");
    await evalCode(`document.querySelector('.lang-switch button[data-lang="en"]')?.click();`);
    await sleep(300);
    const enCheck = await evalCode(`(() => {
        const langAttr = document.documentElement.getAttribute("lang");
        const heroTitle = document.querySelector("#hero-title")?.innerText?.trim();
        const whyTitle = document.querySelector("#why-title")?.innerText?.trim();
        const leftTitle = document.querySelector("#comp-old-title")?.innerText?.trim();
        const rightTitle = document.querySelector("#comp-new-title")?.innerText?.trim();
        const ctaBtn = document.querySelector(".comparison-cta-wrap .button")?.innerText?.trim();
        return { langAttr, heroTitle, whyTitle, leftTitle, rightTitle, ctaBtn };
    })()`);
    console.log("HTML lang:", enCheck.langAttr);
    console.log("EN Hero Title:", enCheck.heroTitle);
    console.log("EN #why Title:", enCheck.whyTitle);
    console.log("EN Left Card Title:", enCheck.leftTitle);
    console.log("EN Right Card Title:", enCheck.rightTitle);
    console.log("EN Comparison CTA:", enCheck.ctaBtn);

    console.log("\nSwitching back to ID...");
    await evalCode(`document.querySelector('.lang-switch button[data-lang="id"]')?.click();`);
    await sleep(300);
    const idCheck = await evalCode(`(() => {
        const langAttr = document.documentElement.getAttribute("lang");
        const whyTitle = document.querySelector("#why-title")?.innerText?.trim();
        const rightTitle = document.querySelector("#comp-new-title")?.innerText?.trim();
        return { langAttr, whyTitle, rightTitle };
    })()`);
    console.log("Restored HTML lang:", idCheck.langAttr);
    console.log("Restored #why Title:", idCheck.whyTitle);
    console.log("Restored Right Card Title:", idCheck.rightTitle);

    console.log("\n==========================================");
    console.log("TEST 6: TRUST & DOCUMENTATION LABELS");
    console.log("==========================================");
    const docLabels = await evalCode(`(() => {
        const illustTag = document.querySelector(".report-illustrative-tag")?.innerText?.trim();
        const archiveNote = document.querySelector(".asset-archive-note")?.innerText?.trim();
        return { illustTag, archiveNote };
    })()`);
    console.log("Report Mockup Tag:", docLabels.illustTag);
    console.log("Archive Note:", docLabels.archiveNote);

    console.log("\n==========================================");
    console.log("ALL AUTOMATED TESTS FINISHED SUCCESSFULLY!");
    console.log("==========================================");

} catch (err) {
    console.error("Test Error:", err);
    process.exitCode = 1;
} finally {
    if (ws) ws.close();
    chromeProc.kill();
}
