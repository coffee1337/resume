<div align="center">

# Egor Trefilov — Résumé

**Python Backend & AI Automation Developer** · Nizhny Novgorod, UTC+3

[![English PDF](https://img.shields.io/badge/Download-English_PDF-141110?style=flat-square&color=c4562a&logo=adobeacrobatreader&logoColor=f3efe8)](https://coffee1337.github.io/resume/Egor_Trefilov_Resume_EN.pdf)
[![Russian PDF](https://img.shields.io/badge/Download-Russian_PDF-141110?style=flat-square&color=c4562a&logo=adobeacrobatreader&logoColor=f3efe8)](https://coffee1337.github.io/resume/Egor_Trefilov_Resume.pdf)

[Portfolio](https://coffee1337.github.io) · [GitHub](https://github.com/coffee1337) · [LinkedIn](https://www.linkedin.com/in/coffee1337/) · [Telegram](https://t.me/cooffeek1337)

</div>

---

Two A4 résumés, generated from HTML sources by a dependency-free script and committed as build artifacts:

| File | Language | Format |
|---|---|---|
| [`Egor_Trefilov_Resume_EN.pdf`](./Egor_Trefilov_Resume_EN.pdf) | English | 2 × A4, selectable text, clickable links |
| [`Egor_Trefilov_Resume.pdf`](./Egor_Trefilov_Resume.pdf) | Russian | 2 × A4, selectable text, clickable links |

## Profile

Python backend developer building services that hold up outside a demo: FastAPI APIs, PostgreSQL schemas
with versioned Alembic migrations, cookie-auth sessions, background workers and Docker deployment.
LLM/RAG integration with retrieval over the product's own content, per-user quotas and token/cost
accounting. ML / Computer Vision R&D: a physics-based synthetic radar PPI generator plus a YOLO11s
detector trained on a dataset registered with Rospatent (`#2026624059`).

**Experience**

- `Python Backend & AI Automation Developer — Independent / Freelance` · Aug 2025 — Present
- `ML / Computer Vision R&D Intern — Radio-Engineering Research Institute` · 2026

**Education** — NGIEU (Nizhny Novgorod State Engineering and Economic University), B.Sc. in Informatics and
Computer Engineering (09.03.01), *Artificial Intelligence Systems*, 3rd year, 2024 — 2028.

## Projects on this résumé

| Project | Stack | Link |
|---|---|---|
| AI Python Mentor | Python, FastAPI, PostgreSQL, SQLAlchemy, Alembic, Next.js, Docker, RAG | [Case study](https://coffee1337.github.io/projects/ai-python-mentor/) |
| RadarPPI-MTD | Python, PyTorch, YOLO11s, OpenCV, NumPy, ByteTrack | [Case study](https://coffee1337.github.io/projects/radar-ppi-mtd/) |
| portfolio-analytics | Python, FastAPI, SQLAlchemy 2.0, PostgreSQL, React 19, TypeScript, Docker | [Case study](https://coffee1337.github.io/projects/portfolio-analytics/) |
| NGIE University App | Flutter, Dart, Riverpod, Drift, SQLite, Kotlin, Swift, WidgetKit | [Case study](https://coffee1337.github.io/projects/ngie/) |
| TransactionMonitor | C#, .NET 8, WinUI 3, SQL Server | [Case study](https://coffee1337.github.io/projects/transaction-monitor/) |
| Neural A* Heuristic | Python, PyTorch, NumPy, A*, Docker | [Case study](https://coffee1337.github.io/projects/neural-astar/) |

## Certifications & registered IP (7 entries)

Registered database — **No. 2026624059**, `RadarPPI-MTD`, Rospatent (FIPS), Aug 2026, rightholder NGIEU,
11.8 GB (`Radar PPI Generator v1.0.0`):

[FIPS registry](https://new.fips.ru/registers-doc-view/fips_servlet?DB=DB&DocNumber=2026624059&TypeFile=html) ·
[Certificate PDF](https://coffee1337.github.io/certificates/ru2026624059-certificate.pdf) ·
[Abstract PDF](https://coffee1337.github.io/certificates/ru2026624059-abstract.pdf)

| Credential | Issuer | Issued |
|---|---|---|
| Generative AI Professional Certificate by Snowflake | Snowflake | Nov 2026 |
| Docker Foundations Professional Certificate | Docker, Inc. | Oct 2026 |
| Microsoft Azure Essentials Professional Certificate | Microsoft | Oct 2026 |
| Career Essentials in GitHub Professional Certificate | GitHub | Oct 2026 |
| Building AI Agents with Snowflake | LinkedIn Learning · Snowflake | Nov 2026 |
| AWS Certified AI Practitioner (AIF-C01) Cert Prep | LinkedIn Learning | Oct 2026 |

Every row in the PDFs links to the issuer's verification page.

## Rebuild the PDFs

```bash
node scripts/build-pdf.mjs                                     # both PDFs → repository root
CHROME_BIN=/usr/bin/google-chrome node scripts/build-pdf.mjs   # explicit Chrome/Chromium
```

The script serves the repository over a throwaway local HTTP server (so relative CSS and WOFF2 resolve
without `file://` CORS quirks), then drives headless Chrome with `--print-to-pdf`. The A4 page size,
13/14 mm margins and the light print palette come from `assets/resume.css`. No npm packages are involved.

```text
src/resume-en.html      # English layout (edit this, not the PDF)
src/resume-ru.html      # Russian layout
assets/resume.css       # shared A4 stylesheet + @font-face rules
assets/fonts/*.woff2    # Onest + JetBrains Mono (OFL) — no system-font fallback
scripts/build-pdf.mjs   # headless-Chrome build
```

After editing either source, rebuild and copy the results into the portfolio site
(`coffee1337.github.io/public/resume/`) — or run `npm run sync:resume` there, which pulls both PDFs
from this repository.

Fonts are vendored (Onest 400/600, JetBrains Mono 400/500, SIL Open Font License 1.1) so both PDFs render
identically on any machine; see `assets/fonts/OFL-NOTICE.md`.

## License

MIT — see [LICENSE](./LICENSE).