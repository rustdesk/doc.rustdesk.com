#!/usr/bin/env node
/**
 * Tells Bing (and the other IndexNow engines) to recrawl rustdesk.com now,
 * instead of waiting for its own schedule. ChatGPT search leans on Bing's
 * index, so this is how a fix reaches AI answers quickly.
 *
 *   node scripts/indexnow.mjs          # the site and the docs
 *   node scripts/indexnow.mjs site     # rustdesk.com only (v3)
 *   node scripts/indexnow.mjs docs     # rustdesk.com/docs only (Hugo)
 *
 * Run it AFTER a deploy: the engines verify the request by fetching the key
 * file from the live site, and judge the pages as they are served. The URL
 * list is read from the live sitemaps for the same reason. The two deploy
 * workflows run it as their last step, each for its own half.
 *
 * The key is the name of the one file v3/public/<32 hex>.txt, published at
 * https://rustdesk.com/<key>.txt. One key covers the whole host, docs
 * included. Google does not take part in IndexNow.
 */
import { readdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const ORIGIN = "https://rustdesk.com";
const SITEMAPS = {
  site: `${ORIGIN}/sitemap-index.xml`,
  docs: `${ORIGIN}/docs/sitemap.xml`,
};

const which = process.argv[2] ?? "all";
if (!["all", "site", "docs"].includes(which)) {
  console.error("usage: indexnow.mjs [all|site|docs]");
  process.exit(2);
}

const keyFile = (await readdir(path.join(ROOT, "v3/public"))).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) {
  console.error("[indexnow] no v3/public/<key>.txt found");
  process.exit(1);
}
const key = keyFile.replace(/\.txt$/, "");
const keyLocation = `${ORIGIN}/${keyFile}`;

const live = await fetch(keyLocation).then((r) => (r.ok ? r.text() : null)).catch(() => null);
if (live?.trim() !== key) {
  console.error(`[indexnow] ${keyLocation} is not live yet. Deploy the site first.`);
  process.exit(1);
}

// Sitemaps that could not be read. An error page must not pass for an empty
// sitemap: that would skip its URLs and still report success.
const failed = [];

/** Every <loc> under a sitemap, following sitemap indexes. */
async function urlsOf(sitemap) {
  let xml;
  try {
    const res = await fetch(sitemap);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    xml = await res.text();
    if (!/<(urlset|sitemapindex)[\s>]/.test(xml)) throw new Error("not a sitemap");
  } catch (err) {
    failed.push(`${sitemap}: ${err.message}`);
    return [];
  }
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  if (!/<sitemapindex/.test(xml)) return locs;
  // One at a time: a burst of parallel fetches trips Cloudflare's timeouts.
  const out = [];
  for (const loc of locs) out.push(...(await urlsOf(loc)));
  return out;
}

const sources = which === "all" ? Object.values(SITEMAPS) : [SITEMAPS[which]];
const found = [];
for (const s of sources) found.push(...(await urlsOf(s)));
const urlList = [...new Set(found)].filter((u) => u.startsWith(`${ORIGIN}/`));
for (const f of failed) console.error(`[indexnow] could not read ${f}`);
if (!urlList.length) {
  console.error("[indexnow] no URLs found, nothing submitted");
  process.exit(1);
}

// One request takes up to 10,000 URLs.
for (let i = 0; i < urlList.length; i += 10000) {
  const batch = urlList.slice(i, i + 10000);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: new URL(ORIGIN).host, key, keyLocation, urlList: batch }),
  });
  // 200 and 202 both mean accepted; 202 is "key validation pending".
  console.log(`[indexnow] ${batch.length} URLs (${which}) submitted: HTTP ${res.status}`);
  if (!res.ok) process.exit(1);
}
// The readable sitemaps went in above; an unreadable one still fails the run.
if (failed.length) process.exit(1);
