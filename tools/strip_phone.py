"""Remove phone numbers from a PDF before it goes on the public site.

Usage: python strip_phone.py INPUT.pdf OUTPUT.pdf
The text is truly deleted (not just covered), along with the "| " separator in front of it.
Prints what it removed; exits with code 2 if a phone number is still readable afterwards.
"""
import re
import sys

import pymupdf

PHONE = re.compile(r"\(?\d{3}\)?[\s.\-]*\d{3}[\s.\-]*\d{4}")

src, dst = sys.argv[1], sys.argv[2]
doc = pymupdf.open(src)
removed = []
for page in doc:
    for num in sorted(set(PHONE.findall(page.get_text()))):
        # take the "| " separator in front of the number too, when the PDF has one
        hits = page.search_for("| " + num) or page.search_for("|" + num) or page.search_for(num)
        for r in hits:
            page.add_redact_annot(r, fill=(1, 1, 1))
        if hits:
            removed.append(num)
    page.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE)
doc.save(dst, garbage=4, deflate=True)

left_over = [m for p in pymupdf.open(dst) for m in PHONE.findall(p.get_text())]
print("Removed phone number(s):", ", ".join(removed) if removed else "none found")
if left_over:
    print("WARNING: still found", left_over)
    sys.exit(2)
