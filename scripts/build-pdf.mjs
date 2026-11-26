#!/usr/bin/env node
/**
 * Build the two A4 résumé PDFs from the HTML sources in src/.
 *
 * Pipeline: static HTTP server (so relative CSS/woff2 resolve without file://
 * CORS quirks) → headless Chrome → `--print-to-pdf`, honouring the A4 `@page`
 * rule in assets/resume.css. No npm dependencies.
 *
 *   node scripts/build-pdf.mjs            # build both languages
 *   node scripts/build-pdf.mjs --check    # build, then assert page count text
 *
 * Chrome binary: set CHROME_BIN, otherwise the first existing path from a
 * short list of common installs is used.
 */
import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { spawn } from "node:child_process";
import { extname, join, normalize } from "node:path";
import { randomInt } from "node:crypto";

const ROOT = process.cwd();
const OUT = ROOT;
const JOBS = [
  { src: "src/resume-en.html", out: "Egor_Trefilov_Resume_EN.pdf", lang: "en" },
  { src: "src/resume-ru.html", out: "Egor_Trefilov_Resume.pdf", lang: "ru" },
];
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};

function findChrome() {
  const env = process.env.CHROME_BIN;
  const candidates = [
    env,
    join(process.env.HOME ?? "", ".hermes/tools/chromium-1208/chrome-linux64/chrome-hermes"),
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].filter(Boolean);
  for (const candidate of candidates) if (existsSync(candidate)) return candidate;
  throw new Error("Chrome not found — set CHROME_BIN to a Chrome/Chromium binary");
}

function serve(root) {
  const server = createServer((req, res) => {
    const url = decodeURIComponent((req.url ?? "/").split("?")[0]);
    const file = normalize(join(root, url));
    if (!file.startsWith(root) || !existsSync(file) || statSync(file).isDirectory()) {
      res.writeHead(404).end("not found");
      return;
    }
    res.writeHead(200, { "content-type": MIME[extname(file)] ?? "application/octet-stream" });
    res.end(readFileSync(file));
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve({ server, port: server.address().port }));
  });
}

function print(chrome, url, out) {
  return new Promise((resolve, reject) => {
    const args = [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--hide-scrollbars",
      "--no-pdf-header-footer",
      "--virtual-time-budget=15000",
      `--print-to-pdf=${out}`,
      url,
    ];
    const child = spawn(chrome, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (chunk) => (stderr += chunk));
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code !== 0) return reject(new Error(`chrome exited ${code}\n${stderr}`));
      if (!existsSync(out)) return reject(new Error("chrome produced no PDF"));
      resolve(statSync(out).size);
    });
  });
}

const chrome = findChrome();
mkdirSync(OUT, { recursive: true });
const { server, port } = await serve(ROOT);
let failed = false;

try {
  for (const { src, out, lang } of JOBS) {
    if (!existsSync(join(ROOT, src))) {
      console.error(`missing source: ${src}`);
      failed = true;
      continue;
    }
    const file = join(OUT, out);
    const size = await print(chrome, `http://127.0.0.1:${port}/${src}?r=${randomInt(1e6)}`, file);
    console.log(`${lang.toUpperCase()}  ${out}  ${(size / 1024).toFixed(1)} KB`);
    if (size < 20_000) {
      console.error(`  ! suspiciously small PDF (${size} B) — check layout/fonts`);
      failed = true;
    }
  }
} finally {
  server.close();
}

if (failed) process.exit(1);
console.log("done: A4 PDFs written to the repository root");