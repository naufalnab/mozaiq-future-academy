"""Build the SIS syllabus pages: /sis/index.html and /sis/<slug>/index.html.

Usage: python3 -I scripts/sis/build.py   (run from repo root; reads data/sis/syllabi.json)
"""
import html, json, os, re

BASE = "https://mozaiqfutureacademy.com"
WA = "6281225734398"
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
IMG = {
    "badminton": "badminton-001", "pickleball": "pickle-ball-001", "table-tennis": "pingpong-001",
    "archery": "archery-001", "petanque": "petanque-001", "handball": "handball-001",
    "affiliate-business": "affiliate-001", "swimming": "renang-001", "roundnet": "roundnet-001",
    "flag-football": "flag-football-001", "padel": "padel-001", "magic": "sulap-001",
    "drone-racing": "drone-001", "ai": "AI-001", "ultimate-frisbee": "ultimate-frisbee-001", "floorball": "floor-ball-001",
}
ORDER = ["archery", "badminton", "pickleball", "table-tennis", "padel", "floorball", "handball", "flag-football",
         "ultimate-frisbee", "roundnet", "petanque", "swimming", "drone-racing", "magic", "ai", "affiliate-business"]
SMALL = {"and", "of", "to", "the", "in", "a", "for", "on", "with", "vs"}
LATE = re.compile(r"equipment|learning outcome|safety|assessment|required|expected|learning target|digital ethics|milestone|summary|final", re.I)

e = html.escape


def nice(t):
    if t.isupper() or (t.upper() == t):
        words = t.title().split(" ")
        t = " ".join(w.lower() if i and w.lower() in SMALL else w for i, w in enumerate(words))
        t = re.sub(r"\bAi\b", "AI", t)
    return t


def bi(en, id_):
    return f'<span data-l="en">{en}</span><span data-l="id">{id_}</span>'


def render_blocks(blocks):
    out = []
    for b in blocks:
        t = b["t"]
        if t == "p":
            out.append(f"<p>{e(b['text'])}</p>")
        elif t in ("label", "h2", "h3"):
            out.append(f'<h4 class="lbl">{e(nice(b["text"]))}</h4>')
        elif t in ("ul", "ol"):
            out.append(f"<{t}>" + "".join(f"<li>{e(i)}</li>" for i in b["items"]) + f"</{t}>")
        elif t == "table":
            rows = b["rows"]
            if not rows:
                continue
            head, body = rows[0], rows[1:]
            def cell(c, tag):
                return f"<{tag}>" + "<br>".join(e(x) for x in c) + f"</{tag}>"
            out.append('<div class="tbl"><table><thead><tr>' + "".join(cell(c, "th") for c in head) +
                       "</tr></thead><tbody>" + "".join("<tr>" + "".join(cell(c, "td") for c in r) + "</tr>" for r in body) +
                       "</tbody></table></div>")
    return "\n".join(out)


def slugify(t):
    return re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")


HEAD = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#1e1b4b">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{img}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png">
<link rel="stylesheet" href="/sis/sis.css">
</head>
<body>
<header class="top"><div class="wrap bar">
<a class="brand" href="/sis/"><img src="/assets/images/brand/logo-128.webp" alt="" width="40" height="40"><span><strong>MOZAIQ</strong><small>Future Academy &middot; SIS</small></span></a>
<div class="lang" role="group" aria-label="Language"><button data-set="en" aria-pressed="true">EN</button><button data-set="id" aria-pressed="false">ID</button></div>
</div></header>
"""
FOOT = """<footer class="foot"><div class="wrap"><p>&copy; Mozaiq Future Academy &middot; Surabaya Intercultural School (SIS)</p><p><a href="/">mozaiqfutureacademy.com</a></p></div></footer>
<script src="/sis/sis.js"></script>
</body></html>
"""


def wa_link(name):
    from urllib.parse import quote
    return f"https://wa.me/{WA}?text=" + quote(f"Hello Mozaiq, I would like to know more about the {name} program at SIS.")


def build_program(d, prev, nxt):
    slug, name = d["slug"], d["name"]
    url = f"{BASE}/sis/{slug}/"
    img = f"/assets/images/programs/{IMG[slug]}.webp"
    desc = f"{name} Academy at Surabaya Intercultural School: 10-session syllabus, objectives, equipment and safety, by Mozaiq Future Academy."
    secs = d["sections"]
    first_late = next((i for i, s in enumerate(secs) if LATE.search(s["title"])), len(secs))

    def sec_html(s):
        return (f'<section class="card" id="{slugify(nice(s["title"]))}"><h2>{e(nice(s["title"]))}</h2>'
                f'{render_blocks(s["blocks"])}</section>')

    sessions = ['<section class="card" id="sessions"><div class="sh"><h2>' + bi("10-Session Syllabus", "Silabus 10 Sesi") +
                '</h2><button class="expand" type="button" data-expand>' + bi("Expand all", "Buka semua") + "</button></div>"]
    for s in d["sessions"]:
        sessions.append(f'<details class="ses"><summary><b>{s["n"]:02d}</b><span>{e(nice(s["title"]))}</span></summary>'
                        f'<div class="sbody">{render_blocks(s["blocks"])}</div></details>')
    sessions.append("</section>")

    body = [sec_html(s) for s in secs[:first_late]] + ["\n".join(sessions)] + [sec_html(s) for s in secs[first_late:]]
    nav = [("sessions", bi("Sessions", "Sesi"))] + [(slugify(nice(s["title"])), e(nice(s["title"]))) for s in secs]
    nav_html = "".join(f'<a href="#{a}">{t}</a>' for a, t in nav)

    page = HEAD.format(title=f"{name} Academy · SIS Syllabus | Mozaiq Future Academy", desc=e(desc), url=url, img=BASE + img)
    page += f"""<main>
<section class="hero" style="--img:url({img})"><div class="wrap">
<a class="crumb" href="/sis/">&larr; {bi("All programs", "Semua program")}</a>
<p class="eyebrow">Surabaya Intercultural School</p>
<h1>{e(name)} Academy</h1>
<div class="chips"><span>{bi("10 sessions", "10 sesi")}</span><span>{bi("55 min / session", "55 menit / sesi")}</span><span>15:15&ndash;16:10</span><span>{bi("Beginner friendly", "Ramah pemula")}</span></div>
<a class="btn" href="{wa_link(name)}" target="_blank" rel="noopener">{bi("Ask about enrolment", "Tanya pendaftaran")} &rarr;</a>
</div></section>
<nav class="jump" aria-label="Sections"><div class="wrap">{nav_html}</div></nav>
<div class="wrap content">
{chr(10).join(body)}
<section class="card cta"><h2>{bi("Interested in " + e(name) + "?", "Tertarik dengan " + e(name) + "?")}</h2>
<p>{bi("Talk to the Mozaiq team about schedules and registration.", "Hubungi tim Mozaiq untuk jadwal dan pendaftaran.")}</p>
<a class="btn" href="{wa_link(name)}" target="_blank" rel="noopener">WhatsApp Mozaiq</a></section>
<div class="pn"><a href="/sis/{prev['slug']}/">&larr; {e(prev['name'])}</a><a href="/sis/">{bi("All programs", "Semua program")}</a><a href="/sis/{nxt['slug']}/">{e(nxt['name'])} &rarr;</a></div>
</div></main>
""" + FOOT
    return page


def build_hub(data):
    cards = []
    for slug in ORDER:
        d = data[slug]
        cards.append(f'<a class="pc" href="/sis/{slug}/"><img src="/assets/images/programs/{IMG[slug]}.webp" alt="" loading="lazy" width="480" height="320">'
                     f'<div><h3>{e(d["name"])}</h3><p>{bi("10 sessions · 55 min", "10 sesi · 55 menit")}</p><span class="go">{bi("View syllabus", "Lihat silabus")} &rarr;</span></div></a>')
    page = HEAD.format(title="SIS Extracurricular Syllabus | Mozaiq Future Academy",
                       desc="Explore the 10-session syllabus of every Mozaiq Future Academy extracurricular at Surabaya Intercultural School.",
                       url=f"{BASE}/sis/", img=f"{BASE}/assets/images/12-eskul.png")
    page += f"""<main>
<section class="hero hub"><div class="wrap">
<p class="eyebrow">Surabaya Intercultural School</p>
<h1>{bi("Choose your extracurricular", "Pilih ekstrakurikuler")}</h1>
<p class="lead">{bi("Tap a program to read its full 10-session syllabus, what students learn, equipment and safety.", "Ketuk program untuk membaca silabus 10 sesi, apa yang dipelajari siswa, perlengkapan, dan keselamatan.")}</p>
<div class="chips"><span>{bi("16 programs", "16 program")}</span><span>{bi("10 sessions each", "10 sesi per program")}</span><span>15:15&ndash;16:10</span></div>
</div></section>
<div class="wrap content"><div class="grid">{''.join(cards)}</div></div></main>
""" + FOOT
    return page


def main():
    data = json.load(open(os.path.join(ROOT, "data/sis/syllabi.json"), encoding="utf-8"))
    data.update(json.load(open(os.path.join(ROOT, "data/sis/ai.json"), encoding="utf-8")))
    assert set(data) == set(ORDER), set(data) ^ set(ORDER)
    for i, slug in enumerate(ORDER):
        prev, nxt = data[ORDER[i - 1]], data[ORDER[(i + 1) % len(ORDER)]]
        out = os.path.join(ROOT, "sis", slug)
        os.makedirs(out, exist_ok=True)
        open(os.path.join(out, "index.html"), "w", encoding="utf-8").write(build_program(data[slug], prev, nxt))
    open(os.path.join(ROOT, "sis", "index.html"), "w", encoding="utf-8").write(build_hub(data))
    print("built", len(ORDER), "program pages + hub")


main()
