"""Generate QR codes (PNG + SVG) and a print-ready A4 card sheet for the SIS syllabus pages.

Usage: python3 -I scripts/sis/qr.py   (run from repo root; needs qrcode, pillow, reportlab)
"""
import json, os
import qrcode
import qrcode.image.svg
from qrcode.constants import ERROR_CORRECT_H
from PIL import Image
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.lib.colors import HexColor, white
from reportlab.pdfgen import canvas

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BASE = "https://mozaiqfutureacademy.com/sis/"
OUT = os.path.join(ROOT, "sis", "qr")
os.makedirs(OUT, exist_ok=True)
data = json.load(open(os.path.join(ROOT, "data/sis/syllabi.json"), encoding="utf-8"))
data.update(json.load(open(os.path.join(ROOT, "data/sis/ai.json"), encoding="utf-8")))
ORDER = ["archery", "badminton", "pickleball", "table-tennis", "padel", "floorball", "handball", "flag-football",
         "ultimate-frisbee", "roundnet", "petanque", "swimming", "drone-racing", "magic", "ai", "affiliate-business"]
items = [("all-programs", "All Programs", BASE)] + [(s, data[s]["name"], f"{BASE}{s}/") for s in ORDER]

pngs = {}
for slug, name, url in items:
    qr = qrcode.QRCode(error_correction=ERROR_CORRECT_H, box_size=20, border=4)
    qr.add_data(url); qr.make(fit=True)
    img = qr.make_image(fill_color="#1e1b4b", back_color="white").convert("RGB")
    img.save(os.path.join(OUT, f"{slug}.png"))
    pngs[slug] = img
    svg = qrcode.make(url, image_factory=qrcode.image.svg.SvgPathImage, error_correction=ERROR_CORRECT_H, border=4)
    svg.save(os.path.join(OUT, f"{slug}.svg"))

# A4 sheet, 2x2 A6 cards per page
logo = Image.open(os.path.join(ROOT, "assets/images/brand/logo-128.webp")).convert("RGBA")
W, H = A4
cw, ch = W / 2, H / 2
c = canvas.Canvas(os.path.join(OUT, "MFA-SIS-QR-cards.pdf"), pagesize=A4)
c.setTitle("Mozaiq Future Academy - SIS QR cards")
purple, indigo, gold = HexColor("#6d28d9"), HexColor("#1e1b4b"), HexColor("#d9a441")
for i, (slug, name, url) in enumerate(items):
    if i and i % 4 == 0:
        c.showPage()
    col, row = i % 2, 1 - (i % 4) // 2
    x, y = col * cw, row * ch
    # card
    c.setFillColor(white); c.rect(x, y, cw, ch, fill=1, stroke=0)
    c.setFillColor(indigo); c.rect(x, y + ch - 78, cw, 78, fill=1, stroke=0)
    c.drawImage(ImageReader(logo), x + 18, y + ch - 64, 46, 46, mask="auto")
    c.setFillColor(white); c.setFont("Helvetica-Bold", 13); c.drawString(x + 72, y + ch - 38, "MOZAIQ FUTURE ACADEMY")
    c.setFont("Helvetica", 9); c.setFillColor(gold); c.drawString(x + 72, y + ch - 52, "Surabaya Intercultural School (SIS)")
    c.setFillColor(indigo); c.setFont("Helvetica-Bold", 24 if len(name) < 14 else 20)
    c.drawCentredString(x + cw / 2, y + ch - 112, name)
    qs = 190
    c.drawImage(ImageReader(pngs[slug]), x + (cw - qs) / 2, y + ch - 112 - 14 - qs, qs, qs)
    c.setFillColor(purple); c.setFont("Helvetica-Bold", 12)
    c.drawCentredString(x + cw / 2, y + 70, "Scan for the 10-session syllabus" if slug != "all-programs" else "Scan to see all 16 programs")
    c.setFillColor(HexColor("#475569")); c.setFont("Helvetica", 8.5)
    c.drawCentredString(x + cw / 2, y + 54, "Pindai untuk melihat silabus  |  " + url.replace("https://", ""))
    c.setFillColor(purple); c.rect(x, y, cw, 10, fill=1, stroke=0)
# cut guides
    c.setStrokeColor(HexColor("#cbd5e1")); c.setDash(3, 3); c.rect(x, y, cw, ch, fill=0, stroke=1); c.setDash()
c.save()
print("QR files:", len(items), "-> sis/qr/")
