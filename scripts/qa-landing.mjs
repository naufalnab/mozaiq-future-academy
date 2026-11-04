import { spawn } from 'node:child_process';
import { mkdtemp, rm, mkdir, writeFile, readFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';

const phase = process.argv[2] || 'after';
const baseURL = process.env.MOZAIQ_QA_URL || 'http://127.0.0.1:8000/';
const out = path.resolve(process.env.MOZAIQ_QA_OUT || 'docs/qa');
await mkdir(out, { recursive: true });
const profile = await mkdtemp(path.join(os.tmpdir(), 'mozaiq-qa-'));
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new', '--remote-debugging-port=9337', `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', '--disable-gpu', 'about:blank'
], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let ws;
const results = [];
const errors = [];
const failedRequests = [];
try {
  let targets;
  for (let n = 0; n < 50; n++) {
    try { targets = await (await fetch('http://127.0.0.1:9337/json/list')).json(); break; }
    catch { await sleep(100); }
  }
  ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let id = 0;
  const pending = new Map();
  ws.onmessage = e => {
    const d = JSON.parse(e.data);
    if (d.method === 'Runtime.exceptionThrown') errors.push(d.params.exceptionDetails.text);
    if (d.method === 'Network.responseReceived' && d.params.response.status >= 400) failedRequests.push(d.params.response.url);
    if (pending.has(d.id)) {
      const p = pending.get(d.id); pending.delete(d.id);
      d.error ? p.reject(Error(d.error.message)) : p.resolve(d.result);
    }
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const next = ++id; pending.set(next, { resolve, reject });
    ws.send(JSON.stringify({ id: next, method, params }));
  });
  const evaluate = async expression => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw Error(JSON.stringify(r.exceptionDetails));
    return r.result.value;
  };
  const check = (name, value) => { results.push({ name, pass: !!value }); assert.ok(value, name); };
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await send('Page.navigate', { url: baseURL });
  await sleep(1200);
  await evaluate(`localStorage.removeItem('mfa-lang'); document.querySelector('[data-lang="id"]').click()`);
  const screenshot = async (label, width, height) => {
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
    await evaluate(`window.scrollTo(0,0)`); await sleep(150);
    const bounds = await evaluate(`(() => { const r = document.querySelector('#why').getBoundingClientRect(); return {x:0, y:r.top + scrollY, width:innerWidth, height:r.height, scale:1}; })()`);
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: bounds });
    await writeFile(path.join(out, `${phase}-${label}.png`), Buffer.from(shot.data, 'base64'));
  };
  await screenshot('comparison-desktop', 1440, 900);
  await screenshot('comparison-mobile', 390, 844);
  if (phase === 'before') { console.log('Baseline screenshots captured.'); }
  else {
    check('26 programs preserved', await evaluate(`document.querySelectorAll('.program-card').length === 26`));
    check('Four challenges and four solutions', await evaluate(`[...document.querySelectorAll('.comparison-list')].every(l => l.children.length === 4)`));
    check('All local anchors exist', await evaluate(`[...document.querySelectorAll('a[href^="#"]')].every(a => document.getElementById(a.hash.slice(1)))`));
    check('One H1 and no duplicate IDs', await evaluate(`document.querySelectorAll('h1').length === 1 && new Set([...document.querySelectorAll('[id]')].map(e=>e.id)).size === document.querySelectorAll('[id]').length`));
    for (const lang of ['id', 'en']) {
      await evaluate(`document.querySelector('[data-lang="${lang}"]').click()`);
      check(`${lang}: title and metadata translation`, await evaluate(`document.title.includes('${lang === 'en' ? 'School' : 'Sekolah'}') && document.querySelector('meta[property="og:locale"]').content === '${lang === 'en' ? 'en_US' : 'id_ID'}'`));
      check(`${lang}: language and selected state`, await evaluate(`document.documentElement.lang === '${lang}' && [...document.querySelectorAll('[data-lang="${lang}"]')].every(b => b.getAttribute('aria-pressed') === 'true')`));
      for (const width of [320,375,390,428,768,1024,1280,1440,1920]) {
        await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
        await sleep(100);
        const layout = await evaluate(`(() => {
          const sections = [...document.querySelectorAll('main > section, .site-header, .site-footer')];
          const bad = sections.flatMap(s => [...s.querySelectorAll('h1,h2,h3,p,a.button,button,.brand,.nav-links a,.nav-actions,.package-price,.comparison-list li')]).filter(e => {
            const r = e.getBoundingClientRect(); return e.checkVisibility() && r.width && (r.left < -1 || r.right > innerWidth + 1 || e.scrollWidth > e.clientWidth + 2);
          }).map(e => e.className || e.tagName);
          return { width: innerWidth, scrollWidth: document.documentElement.scrollWidth, bad };
        })()`);
        check(`${lang}: ${width}px layout ${JSON.stringify(layout)}`, layout.scrollWidth <= width && layout.bad.length === 0);
        check(`${lang}: ${width}px comparison introduction centered`, await evaluate(`(() => {
          const title = document.querySelector('#why-title').getBoundingClientRect();
          const copy = document.querySelector('#why .section-copy').getBoundingClientRect();
          return Math.abs((title.left + title.width / 2) - (copy.left + copy.width / 2)) < 1;
        })()`));
      }
      await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: false });
      await evaluate(`document.querySelector('.nav-toggle').click()`);
      check(`${lang}: menu opens and focuses first link`, await evaluate(`document.querySelector('.nav-toggle').getAttribute('aria-expanded') === 'true' && document.activeElement === document.querySelector('.mobile-menu a')`));
      await evaluate(`[...document.querySelectorAll('.mobile-menu a,.mobile-menu button')].at(-1).focus()`);
      await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
      check(`${lang}: menu Tab cycles to toggle`, await evaluate(`document.activeElement===document.querySelector('.nav-toggle')`));
      await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
      check(`${lang}: Escape closes and restores focus`, await evaluate(`document.querySelector('.nav-toggle').getAttribute('aria-expanded') === 'false' && document.activeElement === document.querySelector('.nav-toggle')`));
      for (const filter of ['sports','technology','tactical','business','creative']) {
        await evaluate(`document.querySelector('[data-filter="${filter}"]').click()`);
        check(`${lang}: filter ${filter}`, await evaluate(`(() => {const cards=[...document.querySelectorAll('.program-card')].filter(c=>getComputedStyle(c).display!=='none');return cards.length>0 && cards.every(c=>c.dataset.category==='${filter}' || (c.dataset.categories||'').split(' ').includes('${filter}'));})()`));
      }
      await evaluate(`document.querySelector('[data-filter="all"]').click(); document.querySelector('#program-more-btn').click()`);
      check(`${lang}: expand all programs`, await evaluate(`[...document.querySelectorAll('.program-card')].filter(c=>getComputedStyle(c).display!=='none').length === 26`));
      await evaluate(`document.querySelector('#asset-more-btn').click()`);
      check(`${lang}: gallery expands`, await evaluate(`document.querySelector('.asset-gallery').classList.contains('show-all')`));
      await evaluate(`document.querySelector('#asset-more-btn').click()`);
      await evaluate(`document.querySelector('.faq-item').open=false; document.querySelector('.faq-item summary').focus()`);
      await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, text: '\r' });
      await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, text: '\r' });
      await sleep(80);
      check(`${lang}: keyboard FAQ expands`, await evaluate(`document.querySelector('.faq-item').open`));
      await evaluate(`document.querySelector('.faq-item').open=false`);
      for (const anchor of ['why','programs','facilities','how','partnership','contact']) {
        await evaluate(`document.querySelector('.mobile-menu a[href="#${anchor}"]').click()`); await sleep(80);
        check(`${lang}: journey anchor ${anchor}`, await evaluate(`location.hash === '#${anchor}' && document.querySelector('#${anchor}').getBoundingClientRect().top >= document.querySelector('.site-header').getBoundingClientRect().bottom - 2`));
      }
      check(`${lang}: WhatsApp links use configured number and nonempty message`, await evaluate(`[...document.querySelectorAll('a[href*="wa.me/"]')].every(a=>{const u=new URL(a.href);return u.pathname==='/6281225734398' && !!u.searchParams.get('text') && a.target==='_blank' && a.rel.includes('noopener')})`));
    }
    await evaluate(`document.querySelector('[data-lang="id"]').click()`);
    check('All images have alternative text and dimensions', await evaluate(`[...document.images].every(i=>i.hasAttribute('alt') && i.hasAttribute('width') && i.hasAttribute('height'))`));
    // Scroll every section to load lazy imagery and validate local assets over HTTP.
    await evaluate(`(async()=>{for(const s of document.querySelectorAll('main > section')){s.scrollIntoView({behavior:'instant'});await new Promise(r=>setTimeout(r,100));}})()`);
    await sleep(300);
    check('No broken loaded images', await evaluate(`[...document.images].every(i=>!i.complete || i.naturalWidth>0)`));
    const links = await evaluate(`[...new Set([...document.querySelectorAll('[src],a[href]')].map(e=>e.getAttribute('src')||e.getAttribute('href')).filter(u=>u && !u.startsWith('#') && !/^(https?:|mailto:|tel:|data:)/.test(u)))]`);
    for (const link of links) { const r = await fetch(new URL(link, baseURL)); check(`Asset ${link}`, r.ok); }
    // Optional external audit tool is supplied from a temporary location, never shipped.
    if (process.env.MOZAIQ_AXE_PATH) {
      await evaluate(await readFile(process.env.MOZAIQ_AXE_PATH, 'utf8'));
      for (const lang of ['id','en']) {
        await evaluate(`document.querySelector('[data-lang="${lang}"]').click()`);
        for (const width of [390,1440]) {
          await send('Emulation.setDeviceMetricsOverride', {width,height:900,deviceScaleFactor:1,mobile:false});
          const audit = await evaluate(`axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}}).then(r=>({violations:r.violations,incomplete:r.incomplete}))`);
          await writeFile(path.join(out, `axe-${lang}-${width}.json`), JSON.stringify(audit,null,2));
          check(`${lang}: ${width}px axe WCAG A/AA (${audit.violations.map(v=>v.id).join(',')})`,audit.violations.length===0);
        }
      }
    }
    await evaluate(`document.querySelector('[data-lang="en"]').click()`);
    await send('Page.reload'); await sleep(400);
    check('Language preference survives reload', await evaluate(`document.documentElement.lang==='en'`));
    await evaluate(`document.querySelector('[data-lang="id"]').click()`);
    check('No runtime exceptions', errors.length === 0); check('No HTTP asset errors', failedRequests.length === 0);
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
    await send('Page.reload'); await sleep(600);
    await evaluate(`(async()=>{for(const s of document.querySelectorAll('main > section')){s.scrollIntoView({behavior:'instant'});await new Promise(r=>setTimeout(r,100));}})()`);
    await sleep(600);
    check('Motion mode leaves scrolled sections visible', await evaluate(`[...document.querySelectorAll('main > section .section-head')].every(e=>getComputedStyle(e).opacity==='1')`));
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    await send('Page.reload'); await sleep(600);
    for (const lang of ['id','en']) {
      await evaluate(`document.querySelector('[data-lang="${lang}"]').click()`);
      for (const width of [390,1440]) {
        await screenshot(`comparison-${lang}-${width}`, width, 900);
        await send('Emulation.setDeviceMetricsOverride', {width,height:900,deviceScaleFactor:1,mobile:false});
        await evaluate(`window.scrollTo(0,0)`); await sleep(100);
        const shot=await send('Page.captureScreenshot',{format:'png'});
        await writeFile(path.join(out,`after-hero-${lang}-${width}.png`),Buffer.from(shot.data,'base64'));
        if(lang==='id') {
          await evaluate(`(async()=>{for(const s of document.querySelectorAll('main > section')){s.scrollIntoView({behavior:'instant'});await new Promise(r=>setTimeout(r,100));}scrollTo(0,0)})()`);
          const size=await evaluate(`({x:0,y:0,width:innerWidth,height:document.documentElement.scrollHeight,scale:1})`);
          const full=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:size});
          await writeFile(path.join(out,`after-page-${width}.png`),Buffer.from(full.data,'base64'));
        }
      }
    }
    console.log(`${results.length} assertions passed.`);
  }
} catch (error) {
  results.push({ name: error.message, pass: false }); console.error(error); process.exitCode = 1;
} finally {
  await writeFile(path.join(out, `${phase}-results.json`), JSON.stringify({ phase, baseURL, results, errors, failedRequests }, null, 2));
  if (ws) ws.close(); chrome.kill(); await sleep(250); await rm(profile, { recursive: true, force: true });
}
