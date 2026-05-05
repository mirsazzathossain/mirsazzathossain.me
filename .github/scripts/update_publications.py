"""
Weekly Scholar sync: rebuilds publications.json from Google Scholar and writes
aggregate Scholar stats. Uses free rotating proxies to bypass GitHub Actions IP blocks.
Hand-managed display fields belong in src/data/publications.override.json.
"""

import json
import os
import time
from datetime import date
from pathlib import Path

from scholarly import ProxyGenerator, scholarly

AUTHOR_ID = os.environ["SCHOLAR_AUTHOR_ID"]
DATA_FILE = Path(__file__).parents[2] / "src" / "data" / "publications.json"
STATS_FILE = Path(__file__).parents[2] / "src" / "data" / "scholar_stats.json"
TODAY = date.today().isoformat()


def setup_proxy():
    pg = ProxyGenerator()
    ok = pg.FreeProxies()
    if ok:
        scholarly.use_proxy(pg)
        print("Free proxy active.")
    else:
        print("WARNING: No free proxy found, proceeding without proxy.")


def short_id(author_pub_id: str) -> str:
    return author_pub_id.split(":")[-1] if ":" in author_pub_id else author_pub_id


def make_entry(pub: dict) -> dict:
    bib = pub.get("bib", {})
    authors_raw = bib.get("author", "")
    authors = [
        {"name": a.strip().rstrip(",")}
        for a in authors_raw.split(" and ")
        if a.strip()
    ]
    entry = {
        "id": short_id(pub.get("author_pub_id", "")),
        "type": "inproceedings" if bib.get("booktitle") else "article",
        "title": bib.get("title", ""),
        "authors": authors,
        "year": int(bib["pub_year"]) if bib.get("pub_year") else None,
        "venue": bib.get("booktitle") or bib.get("journal") or "",
        "citation_count": pub.get("num_citations", 0),
        "citation_updated": TODAY,
    }

    optional_fields = {
        "pages": bib.get("pages"),
        "volume": bib.get("volume"),
        "issue": bib.get("number"),
        "abstract": bib.get("abstract"),
        "url": pub.get("pub_url"),
        "pdf": pub.get("eprint_url"),
    }
    for key, value in optional_fields.items():
        if value:
            entry[key] = value

    return entry


def main():
    setup_proxy()

    print(f"Fetching Scholar profile {AUTHOR_ID} ...")
    author = scholarly.search_author_id(AUTHOR_ID)
    author = scholarly.fill(
        author,
        sections=["basics", "citations", "counts", "publications"],
    )

    publications = []
    for pub in author["publications"]:
        if not pub.get("author_pub_id"):
            continue
        sid = short_id(pub["author_pub_id"])
        print(f"  fetching {sid} ...")
        try:
            filled = scholarly.fill(pub)
            time.sleep(1)
        except Exception as e:
            print(f"    fill failed: {e}")
            filled = pub
        publications.append(make_entry(filled))

    stats_changed = write_stats(author, publications)

    current = None
    if DATA_FILE.exists():
        with DATA_FILE.open() as f:
            current = json.load(f)

    if current != publications:
        with DATA_FILE.open("w") as f:
            json.dump(publications, f, indent=2, ensure_ascii=False)
            f.write("\n")
        print("Saved fresh Scholar publications.json")
    else:
        print("No publication changes.")

    if stats_changed:
        print("Saved updated scholar_stats.json")


def calculate_h_index(citation_counts: list[int]) -> int:
    h_index = 0
    for index, count in enumerate(sorted(citation_counts, reverse=True), start=1):
        if count >= index:
            h_index = index
        else:
            break
    return h_index


def write_stats(author: dict, publications: list[dict]) -> bool:
    citation_counts = [
        int(publication.get("citation_count") or 0)
        for publication in publications
    ]
    fallback_total = sum(citation_counts)
    fallback_h_index = calculate_h_index(citation_counts)
    fallback_i10_index = sum(1 for count in citation_counts if count >= 10)

    stats = {
        "paper_count": len(publications),
        "total_citations": author.get("citedby") or fallback_total,
        "h_index": author.get("hindex") or fallback_h_index,
        "h_index_5y": author.get("hindex5y") or fallback_h_index,
        "i10_index": author.get("i10index") or fallback_i10_index,
        "cites_per_year": author.get("cites_per_year", {}),
        "updated": TODAY,
    }

    current = None
    if STATS_FILE.exists():
        with STATS_FILE.open() as f:
            current = json.load(f)

    if current == stats:
        return False

    with STATS_FILE.open("w") as f:
        json.dump(stats, f, indent=2, ensure_ascii=False)
        f.write("\n")

    return True


if __name__ == "__main__":
    main()
