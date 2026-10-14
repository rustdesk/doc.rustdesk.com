#!/usr/bin/env node
/**
 * Brings every page's meta description into 120-160 characters, after the
 * site is built. Used by both builds: the Hugo docs (public/) and the Astro
 * site (v3/dist/).
 *
 *   node scripts/fit-meta-descriptions.mjs <built-site-dir> [--check]
 *
 * Why after the build: Bing Webmaster Tools flags descriptions that are too
 * short (in practice anything under roughly 90 characters; it asks for
 * 150-160) and it counts characters, so most Chinese, Japanese and Korean
 * pages fail even when they read fine. Hand-written descriptions stay the
 * source: this only steps in when one is out of range, so fixing the front
 * matter or page metadata is always the better fix.
 *
 * - Too short: append the page's own opening sentences, taken from its
 *   <article> (or <main>), until the text reaches the range.
 * - Too long: cut at the last sentence end that fits, else at a clause or
 *   word boundary with an ellipsis.
 *
 * og:description and twitter:description follow when they carried the same
 * text. --check reports without writing; --diff also prints each change.
 */
import { readdir, readFile, writeFile, lstat } from "node:fs/promises";
import path from "node:path";

const MIN = 120;
const MAX = 160;

const [root, flag] = process.argv.slice(2);
if (!root) {
  console.error("usage: fit-meta-descriptions.mjs <built-site-dir> [--check]");
  process.exit(2);
}
const DIFF = flag === "--diff";
const CHECK = flag === "--check" || DIFF;

/** Characters as Bing counts them: code points, not UTF-16 units. */
const len = (s) => [...s].length;
const cut = (s, n) => [...s].slice(0, n).join("");

const CJK = /[\u3000-\u303f\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af\uf900-\ufaff\uff00-\uffef]/;
// Chinese and Japanese run sentences together; Korean spaces them like English.
const UNSPACED = /[\u3000-\u303f\u3040-\u30ff\u3400-\u9fff\uf900-\ufaff\uff00-\uffef]/;
const SENTENCE_END = /[.!?。！？]$/;

const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");

const encode = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const clean = (s) =>
  decode(s.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .replace(/\s+([.,;:!?。，、；：！？)）])/g, "$1") // "see <a>SMTP</a>." leaves "SMTP ."
    .trim();

/** The page's own prose: paragraphs of the first <article>, else <main>. */
function paragraphs(html) {
  const body =
    html.match(/<article[\s>][\s\S]*?<\/article>/)?.[0] ??
    html.match(/<main[\s>][\s\S]*?<\/main>/)?.[0] ??
    "";
  const prose = body.replace(
    /<(script|style|pre|table|nav|header|footer|aside|figure|svg)[\s>][\s\S]*?<\/\1>/g,
    " ",
  );
  // The opening paragraphs summarise; deeper ones are steps and caveats.
  return [...prose.matchAll(/<p[\s>][\s\S]*?<\/p>/g)]
    .slice(0, 8)
    .map((m) => clean(m[0]))
    .filter((p) => !/['"]\s*\+|\{\{|\$\{/.test(p)) // template residue
    .filter((p) => !/·/.test(p) || len(p) > 80) // "Jul 3 · RustDesk Team · 5 min read"
    .filter((p) => (CJK.test(p) ? len(p) >= 15 : len(p) >= 40));
}

// A full stop ends a sentence only before whitespace, so "18.04" and "1.2.0"
// stay whole.
const sentences = (text) =>
  text
    .split(/(?<=[.!?]["'”’)）]?)\s+|(?<=[。！？])/)
    .map((s) => s.trim())
    .filter(Boolean);

/** Worth quoting: prose, not a command, a link or a lead-in to a list. */
const quotable = (s) =>
  SENTENCE_END.test(s) &&
  (UNSPACED.test(s) ? len(s) >= 10 : len(s) >= 25) &&
  !/https?:|www\.|[`$<>{}=|\\]|\.\/|--|\b\w+\.(sh|exe|msi|yml|toml|json)\b/i.test(s) &&
  !/[:：]$/.test(s) &&
  !/^\d+[.)、]/.test(s) &&
  !/following|below|as follows|以下|下面|下列|次の|다음|folgende|suivant|siguiente|seguinte|seguente|poniższ|următo/i.test(s);

/** Close enough to say the same thing twice. */
function overlaps(a, b) {
  const grams = (s) => {
    const t = s.toLowerCase().replace(/\s+/g, "");
    const out = new Set();
    for (let i = 0; i < t.length - 2; i++) out.add(t.slice(i, i + 3));
    return out;
  };
  const A = grams(a);
  const B = grams(b);
  if (!A.size || !B.size) return false;
  let shared = 0;
  for (const g of B) if (A.has(g)) shared++;
  return shared / B.size > 0.5;
}

function shorten(text) {
  if (len(text) <= MAX) return text;
  const head = cut(text, MAX);
  // A whole sentence that still clears the minimum reads best.
  const ends = [...head.matchAll(/[.!?。！？](?=\s|$)|[。！？]/g)].map((m) => m.index + 1);
  const sentenceEnd = ends.filter((i) => len(head.slice(0, i)) >= MIN).at(-1);
  if (sentenceEnd) return head.slice(0, sentenceEnd).trim();
  // Otherwise a clause or a word, with an ellipsis.
  const room = cut(text, MAX - 1);
  const breaks = [...room.matchAll(/[,;:，、；：]|\s/g)].map((m) => m.index);
  const at = breaks.filter((i) => len(room.slice(0, i)) >= MIN - 20).at(-1);
  const body = (at ? room.slice(0, at) : room).replace(/[\s,;:，、；：—–-]+$/, "");
  return `${body}…`;
}

function extend(text, paras) {
  let out = text.trim();
  let overflow = null;
  const join = (a, b) => {
    const ended = SENTENCE_END.test(a) ? a : `${a}${UNSPACED.test(a.at(-1)) ? "。" : "."}`;
    // No space after a full-width stop, or between two Chinese/Japanese sentences.
    return /[。！？]$/.test(ended) || (UNSPACED.test(ended.at(-1)) && UNSPACED.test(b[0]))
      ? `${ended}${b}`
      : `${ended} ${b}`;
  };
  // Whole sentences first, in page order. One that would overflow is skipped
  // for the next, so the result ends on a full stop wherever possible.
  for (const s of paras.flatMap(sentences).filter(quotable)) {
    if (len(out) >= MIN) break;
    if (overlaps(out, s) || overlaps(s, out)) continue;
    const joined = join(out, s);
    if (len(joined) <= MAX) out = joined;
    else overflow ??= joined;
  }
  if (len(out) < MIN && overflow) out = shorten(overflow);
  return out;
}

export function fit(description, html) {
  const d = description.replace(/\s+/g, " ").trim();
  if (len(d) > MAX) return shorten(d);
  if (len(d) < MIN) return extend(d, paragraphs(html));
  return d;
}

// ------------------------------------------------------------------ the walk

const META = /<meta\s[^>]*>/gi;
const attr = (tag, name) =>
  tag.match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"))?.slice(1).find((v) => v !== undefined);

function setContent(tag, value) {
  const encoded = `content="${encode(value)}"`;
  return tag.replace(/\scontent=(?:"[^"]*"|'[^']*'|[^\s>]+)/i, ` ${encoded}`);
}

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir)) {
    const p = path.join(dir, entry);
    const st = await lstat(p);
    if (st.isSymbolicLink()) continue; // web client, self-host docs: not ours to rewrite
    if (st.isDirectory()) yield* htmlFiles(p);
    else if (entry.endsWith(".html")) yield p;
  }
}

const stats = { pages: 0, inRange: 0, extended: 0, shortened: 0, stillShort: [], missing: 0 };

for await (const file of htmlFiles(root)) {
  const html = await readFile(file, "utf8");
  if (/http-equiv=["']?refresh/i.test(html)) continue; // redirect stubs
  const tags = html.match(META) ?? [];
  const main = tags.find((t) => (attr(t, "name") ?? "").toLowerCase() === "description");
  if (!main) {
    stats.missing++;
    continue;
  }
  stats.pages++;
  const before = decode(attr(main, "content") ?? "");
  const after = fit(before, html);
  if (after === before.replace(/\s+/g, " ").trim()) {
    if (len(after) >= MIN && len(after) <= MAX) stats.inRange++;
    else stats.stillShort.push(`${len(after)} ${path.relative(root, file)}`);
    continue;
  }
  if (len(after) > len(before)) stats.extended++;
  else stats.shortened++;
  if (len(after) < MIN) stats.stillShort.push(`${len(after)} ${path.relative(root, file)}`);
  if (DIFF) console.log(`\n${path.relative(root, file)}\n  - ${len(before)} ${before}\n  + ${len(after)} ${after}`);
  if (CHECK) continue;

  const updated = html.replace(META, (tag) => {
    const key = (attr(tag, "name") ?? attr(tag, "property") ?? "").toLowerCase();
    if (!["description", "og:description", "twitter:description"].includes(key)) return tag;
    if (key !== "description" && decode(attr(tag, "content") ?? "") !== before) return tag;
    return setContent(tag, after);
  });
  await writeFile(file, updated);
}

console.log(
  `[meta] ${stats.pages} pages: ${stats.inRange} already ${MIN}-${MAX}, ` +
    `${stats.extended} extended, ${stats.shortened} shortened, ` +
    `${stats.stillShort.length} still out of range, ${stats.missing} without a description` +
    (CHECK ? " (check only, nothing written)" : ""),
);
for (const line of stats.stillShort) console.log(`  ${line}`);
