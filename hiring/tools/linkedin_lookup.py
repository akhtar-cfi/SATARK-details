#!/usr/bin/env python3
"""LinkedIn profile finder for candidate screening.

Takes a CSV of candidates (Name + context keywords) and emits, per candidate,
ranked web-search URLs that reliably surface LinkedIn profiles without needing
LinkedIn login or scraping (which LinkedIn blocks / disallows).

Method (same one used for the 24-Sep screening pass):
  1. Query pattern A (best precision): "Full Name" <college keyword> <employer keyword> linkedin
  2. Query pattern B (fallback):       "Full Name" site:linkedin.com/in <one keyword>
  3. Judge the hit: college + employer + city must match the PRATIBHA Setu bio.
     Record CONFIRMED (headline matches 2+ bio facts), HIGH-CONF (1 fact), or VERIFY.
  4. Common failure: very common names (Pallavi Verma, Akanksha Singh) — add the
     rarest bio fact (a prize, an NGO, a fest name) to the query, not the city.

Usage:
  python3 linkedin_lookup.py candidates.csv > queries.txt
  # candidates.csv columns: Name, Keywords  (keywords space-separated)

The output is one block per candidate with 2 search URLs to open manually or
feed to a search API. Keep results in the Drive screening sheet, not in git.
"""
import csv
import sys
import urllib.parse


def queries(name: str, keywords: str):
    a = f'"{name}" {keywords} linkedin'
    b = f'"{name}" site:linkedin.com/in {keywords.split()[0] if keywords else ""}'
    for q in (a, b):
        yield "https://www.google.com/search?q=" + urllib.parse.quote(q)


def main(path: str):
    with open(path, newline="") as f:
        for row in csv.DictReader(f):
            name = (row.get("Name") or "").strip().title()
            kw = (row.get("Keywords") or "").strip()
            if not name:
                continue
            print(name)
            for u in queries(name, kw):
                print(" ", u)
            print()


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("usage: linkedin_lookup.py candidates.csv")
    main(sys.argv[1])
