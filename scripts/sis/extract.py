"""Extract the SIS syllabus .docx files into data/sis/syllabi.json.

Usage: python3 -I scripts/sis/extract.py <folder-with-docx> <output.json>

The docs share a clean style system (Heading 1 = section, Heading 2/3 = session or
sub-heading, List Bullet/Number = lists, bold Normal = labels), so one generic walker
covers all of them. Internal-only sections (assessment sheets, coaching notes, contact
info) are dropped because this content is shown to parents.
"""
import glob, json, os, re, sys
from docx import Document
from docx.table import Table
from docx.text.paragraph import Paragraph

SESSION_RE = re.compile(r"^session\s*0?(\d+)\s*[-–—:|]\s*(.+)$", re.I)
NUM_PREFIX = re.compile(r"^\d+\.\s*")
SKIP_SECTION = re.compile(
    r"sheet|progress record|student progress|coaching|delivery|operational|contact|identity|"
    r"achievement|philosophy|success indicator|venue|facility requirement|administration|"
    r"engagement strategy|class management|recommendation|implementation|approval|provider|completion statement", re.I)

# file number -> (slug, display name)
PROGRAMS = {
    "26": ("badminton", "Badminton"),
    "27": ("pickleball", "Pickleball"),
    "28": ("table-tennis", "Table Tennis"),
    "29": ("archery", "Archery"),
    "30": ("petanque", "Petanque"),
    "31": ("handball", "Handball"),
    "32": ("affiliate-business", "Affiliate Business"),
    "33": ("swimming", "Swimming"),
    "34": ("roundnet", "Roundnet"),
    "35": ("flag-football", "Flag Football"),
    "36": ("padel", "Padel"),
    "37": ("magic", "Magic"),
    "38": ("drone-racing", "Drone Racing"),
    "39": ("ultimate-frisbee", "Ultimate Frisbee"),
    "40": ("floorball", "Floorball"),
}


def clean(t):
    return re.sub(r"\s+", " ", t.replace(" ", " ")).strip()


def para_bold(p):
    runs = [r for r in p.runs if r.text.strip()]
    return bool(runs) and all(r.bold for r in runs)


def table_rows(tbl):
    rows = []
    for r in tbl.rows:
        cells, seen = [], set()
        for c in r.cells:
            if id(c._tc) in seen:
                continue
            seen.add(id(c._tc))
            cells.append([clean(p.text) for p in c.paragraphs if clean(p.text)])
        if any(cells):
            rows.append(cells)
    return rows


def blocks_of(doc):
    """Yield (kind, payload) in document order."""
    for el in doc.element.body.iterchildren():
        if el.tag.endswith("}p"):
            p = Paragraph(el, doc)
            t = clean(p.text)
            if not t:
                continue
            s = p.style.name
            if s.startswith("Heading"):
                yield ("h" + s.split()[-1], t)
            elif s == "List Bullet":
                yield ("li", t)
            elif s == "List Number":
                yield ("oli", t)
            elif para_bold(p) and len(t) < 90:
                yield ("label", t)
            else:
                yield ("p", t)
        elif el.tag.endswith("}tbl"):
            yield ("table", table_rows(Table(el, doc)))


def group(items):
    """Merge consecutive li / oli into ul / ol blocks."""
    out = []
    for kind, v in items:
        if kind in ("li", "oli"):
            k = "ul" if kind == "li" else "ol"
            if out and out[-1]["t"] == k:
                out[-1]["items"].append(v)
            else:
                out.append({"t": k, "items": [v]})
        elif kind == "table":
            out.append({"t": "table", "rows": v})
        else:
            out.append({"t": kind, "text": v})
    return out


def parse(path):
    doc = Document(path)
    cover, sections, sessions = [], [], []
    cur_sec, cur_ses, buf = None, None, []

    def flush():
        nonlocal buf
        blocks = group(buf)
        if cur_ses is not None:
            cur_ses["blocks"] = blocks
        elif cur_sec is not None:
            cur_sec["blocks"].extend(blocks)
        buf = []

    for kind, v in blocks_of(doc):
        if kind.startswith("h") or (kind == "label" and isinstance(v, str) and SESSION_RE.match(v)):
            m = SESSION_RE.match(v) if isinstance(v, str) else None
            if m:
                flush()
                cur_ses = {"n": int(m.group(1)), "title": clean(m.group(2)).title() if m.group(2).isupper() else clean(m.group(2)), "blocks": []}
                sessions.append(cur_ses)
                continue
            if kind == "h1":
                flush()
                cur_ses = None
                cur_sec = {"title": NUM_PREFIX.sub("", v), "blocks": []}
                sections.append(cur_sec)
                continue
            buf.append(("label", v))  # h2/h3 that is not a session -> sub-heading label
            continue
        if cur_sec is None and cur_ses is None:
            cover.append(v if isinstance(v, str) else "")
            continue
        buf.append((kind, v))
    flush()

    keep = []
    for s in sections:
        if SKIP_SECTION.search(s["title"]) or not s["blocks"]:
            continue
        keep.append(s)
    # session sub-blocks sometimes end with a table of the next section; fine.
    return {"cover": [c for c in cover if c], "sections": keep, "sessions": sorted(sessions, key=lambda x: x["n"])}


def main():
    src, out = sys.argv[1], sys.argv[2]
    result = {}
    for f in sorted(glob.glob(os.path.join(src, "0000*.docx"))):
        num = os.path.basename(f)[6:8]
        if num not in PROGRAMS:
            continue
        slug, name = PROGRAMS[num]
        d = parse(f)
        d.update(slug=slug, name=name, source=os.path.basename(f))
        result[slug] = d
        print(f"{slug:20} sections={len(d['sections'])} sessions={len(d['sessions'])} "
              f"[{', '.join(s['title'][:18] for s in d['sections'])}]")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w", encoding="utf-8") as fh:
        json.dump(result, fh, ensure_ascii=False, indent=1)


main()
