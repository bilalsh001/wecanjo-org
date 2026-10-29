// Makes WebP copies of the site's web images without installing anything (Constitution V and VII).
// A local page, opened in headless Microsoft Edge or Google Chrome, encodes each JPEG/PNG web copy
// with the browser's own WebP encoder and posts the result back to this script, which saves it.
// Usage: node tools/make-webp.mjs        (run tools/make-web-images.ps1 first)
// Set BROWSER to a browser executable to choose another Chromium-based browser.
import { createServer } from 'node:http';
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const webDir = join(root, 'images', 'web');
// Photos and logos. The sharing image stays JPEG because social apps expect it; icons stay PNG/ICO.
const sources = readdirSync(webDir).filter((f) => /\.(jpe?g|png)$/i.test(f) && f !== 'og-image.jpg').sort();
const target = (f) => f.replace(/\.(jpe?g|png)$/i, '.webp');
const expected = new Set(sources.map(target));
// Starting quality per file: the Amman band and the phone hero sit under an 82% dark overlay, so they
// can be compressed much harder without any visible difference; the detailed women photo a little
// harder than the rest.
const startQuality = Object.fromEntries(sources.map((f) => [f,
  /^(community|hero-portrait)-/.test(f) ? 0.5 : f.startsWith('women-') ? 0.7 : f.endsWith('.png') ? 0.9 : 0.8]));
const saved = [];

// Runs in the browser: encode each file, stepping the quality down until the WebP is smaller.
const page = `<!doctype html><meta charset="utf-8"><title>WebP copies</title><script type="module">
const files = ${JSON.stringify(sources)};
const startQuality = ${JSON.stringify(startQuality)};
try {
  for (const file of files) {
    const source = await (await fetch('/source/' + file)).blob();
    const bitmap = await createImageBitmap(source);
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    canvas.getContext('2d').drawImage(bitmap, 0, 0);
    let quality = startQuality[file];
    let webp = await canvas.convertToBlob({ type: 'image/webp', quality });
    while (webp.size >= source.size && quality > 0.6) {
      quality = Math.round((quality - 0.1) * 10) / 10;
      webp = await canvas.convertToBlob({ type: 'image/webp', quality });
    }
    if (webp.type !== 'image/webp') throw new Error('this browser cannot encode WebP');
    const name = file.replace(/\\.(jpe?g|png)$/i, '.webp');
    await fetch('/save?name=' + name + '&quality=' + quality + '&size=' + bitmap.width + 'x' + bitmap.height, { method: 'POST', body: webp });
  }
  await fetch('/done', { method: 'POST' });
} catch (error) {
  await fetch('/fail', { method: 'POST', body: String(error) });
}
</script>`;

let browser;
let profile;
function finish(code, message) {
  if (message) console[code ? 'error' : 'log'](message);
  browser?.kill();
  server.close();
  if (profile) setTimeout(() => rmSync(profile, { recursive: true, force: true }), 1000);
  setTimeout(() => process.exit(code), 1200);
}

const server = createServer((req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');
  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(page);
  } else if (req.method === 'GET' && url.pathname.startsWith('/source/') && sources.includes(url.pathname.slice(8))) {
    const file = url.pathname.slice(8);
    res.writeHead(200, { 'Content-Type': file.endsWith('.png') ? 'image/png' : 'image/jpeg' });
    res.end(readFileSync(join(webDir, file)));
  } else if (req.method === 'POST' && url.pathname === '/save' && expected.has(url.searchParams.get('name'))) {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const body = Buffer.concat(chunks);
      if (body.toString('latin1', 0, 4) !== 'RIFF' || body.toString('latin1', 8, 12) !== 'WEBP') {
        res.writeHead(400).end();
        return finish(1, `Not a WebP file: ${url.searchParams.get('name')}`);
      }
      const name = url.searchParams.get('name');
      writeFileSync(join(webDir, name), body);
      saved.push({ name, quality: url.searchParams.get('quality'), size: url.searchParams.get('size'), bytes: body.length });
      res.writeHead(204).end();
    });
  } else if (req.method === 'POST' && url.pathname === '/done') {
    res.writeHead(204).end();
    const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
    console.table(saved.map((s) => {
      const source = sources.find((f) => target(f) === s.name);
      const before = readFileSync(join(webDir, source)).length;
      return { file: s.name, size: s.size, quality: s.quality, webp: kb(s.bytes), [`was (${source.split('.').pop()})`]: kb(before), saved: `${Math.round((1 - s.bytes / before) * 100)}%` };
    }));
    finish(saved.length === expected.size ? 0 : 1, `Wrote ${saved.length} of ${expected.size} WebP copies to images/web/.`);
  } else if (req.method === 'POST' && url.pathname === '/fail') {
    let text = '';
    req.on('data', (c) => { text += c; });
    req.on('end', () => { res.writeHead(204).end(); finish(1, `The browser reported: ${text}`); });
  } else {
    res.writeHead(404).end();
  }
});

server.listen(0, '127.0.0.1', () => {
  const address = `http://127.0.0.1:${server.address().port}/`;
  const candidates = [
    process.env.BROWSER,
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].filter(Boolean);
  const executable = candidates.find((p) => existsSync(p));
  console.log(`Converting ${sources.length} images…`);
  if (!executable) {
    console.log(`No Edge or Chrome found. Open ${address} in a Chromium-based browser to finish.`);
  } else {
    profile = mkdtempSync(join(tmpdir(), 'make-webp-'));
    browser = spawn(executable, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
      '--disable-extensions', `--user-data-dir=${profile}`, address], { stdio: 'ignore' });
    browser.on('error', () => console.log(`Could not start ${executable}. Open ${address} in a Chromium-based browser to finish.`));
  }
  setTimeout(() => finish(1, 'Timed out after 3 minutes.'), 180000);
});
