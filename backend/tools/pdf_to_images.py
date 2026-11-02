"""
pdf_to_images.py
Converts a PDF to a list of base64-encoded JPEG images.
Called by the Node.js backend via child_process.spawn.

Usage:
    python3 pdf_to_images.py <pdf_path>

Prints to stdout:
    { "pages": ["<base64>", "<base64>", ...] }
"""

import sys
import json
import base64
import io
from pdf2image import convert_from_path

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No PDF path provided"}))
        sys.exit(1)

    pdf_path = sys.argv[1]

    try:
        images = convert_from_path(pdf_path, dpi=200)
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

    pages = []
    for img in images:
        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=85)
        b64 = base64.b64encode(buf.getvalue()).decode("utf-8")
        pages.append(b64)

    # Print JSON to stdout — Node reads this
    print(json.dumps({"pages": pages}))

if __name__ == "__main__":
    main()