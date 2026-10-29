// Downloads the self-hosted brand fonts and their licenses (Node built-ins only).
// Usage: node tools/fetch-fonts.mjs
// Fonts come from Google Fonts; each family's SIL Open Font License comes from the
// official google/fonts repository. Prints the matching @font-face rules for styles.css.
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const outDir = 'fonts';
const cssUrl = 'https://fonts.googleapis.com/css2?' + [
  'family=EB+Garamond:ital,wght@0,400..800;1,400..800',
  'family=Manrope:wght@200..800',
  'family=Amiri:wght@400',
  'family=IBM+Plex+Sans+Arabic:wght@400;600',
].join('&') + '&display=swap';
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';

const wanted = [
  { family: 'EB Garamond', style: 'normal', subset: 'latin', file: 'eb-garamond-latin.woff2' },
  { family: 'EB Garamond', style: 'italic', subset: 'latin', file: 'eb-garamond-italic-latin.woff2' },
  { family: 'Manrope', style: 'normal', subset: 'latin', file: 'manrope-latin.woff2' },
  { family: 'Amiri', style: 'normal', weight: '400', subset: 'arabic', file: 'amiri-400-arabic.woff2' },
  { family: 'IBM Plex Sans Arabic', style: 'normal', weight: '400', subset: 'arabic', file: 'ibm-plex-sans-arabic-400-arabic.woff2' },
  { family: 'IBM Plex Sans Arabic', style: 'normal', weight: '600', subset: 'arabic', file: 'ibm-plex-sans-arabic-600-arabic.woff2' },
];
const licenses = {
  'OFL-eb-garamond.txt': 'https://raw.githubusercontent.com/google/fonts/main/ofl/ebgaramond/OFL.txt',
  'OFL-manrope.txt': 'https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt',
  'OFL-amiri.txt': 'https://raw.githubusercontent.com/google/fonts/main/ofl/amiri/OFL.txt',
  'OFL-ibm-plex-sans-arabic.txt': 'https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexsansarabic/OFL.txt',
};

async function get(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res;
}

const css = await (await get(cssUrl, { headers: { 'User-Agent': userAgent } })).text();
const faces = [...css.matchAll(/\/\*\s*([\w-]+)\s*\*\/\s*@font-face\s*\{([^}]*)\}/g)].map(([, subset, body]) => {
  const prop = (name) => (body.match(new RegExp(`${name}:\\s*([^;]+);`)) || [])[1]?.trim();
  return {
    subset,
    family: prop('font-family')?.replace(/['"]/g, ''),
    style: prop('font-style'),
    weight: prop('font-weight'),
    url: (body.match(/url\(([^)]+)\)/) || [])[1],
    range: prop('unicode-range'),
  };
});

await mkdir(outDir, { recursive: true });
const rules = [];
let missing = 0;
for (const want of wanted) {
  const face = faces.find((f) => f.family === want.family && f.style === want.style && f.subset === want.subset
    && (!want.weight || f.weight === want.weight));
  if (!face) {
    console.error(`MISSING ${want.family} ${want.style} ${want.weight || ''} ${want.subset}`);
    missing++;
    continue;
  }
  const data = Buffer.from(await (await get(face.url)).arrayBuffer());
  await writeFile(join(outDir, want.file), data);
  console.log(`${want.file.padEnd(42)} ${(data.length / 1024).toFixed(1).padStart(6)} KB`);
  rules.push(`@font-face {\n  font-family: '${face.family}';\n  font-style: ${face.style};\n  font-weight: ${face.weight};\n  font-display: swap;\n  src: url('/fonts/${want.file}') format('woff2');\n  unicode-range: ${face.range};\n}`);
}
for (const [file, url] of Object.entries(licenses)) {
  await writeFile(join(outDir, file), await (await get(url)).text());
  console.log(`${file.padEnd(42)} license saved`);
}

console.log('\n/* @font-face rules for styles.css */\n' + rules.join('\n\n'));
if (missing) process.exit(1);
