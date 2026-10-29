// Local preview server for the website (Node built-ins only).
// Usage: node tools/preview-server.js [site folder] [port]
// Like GitHub Pages, it compresses text files with gzip, so local measurements match the live site.
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const root = path.resolve(process.argv[2] || '.');
const port = Number(process.argv[3] || 5500);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

http.createServer((req, res) => {
  let rel;
  try {
    rel = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400);
    return res.end('Bad request');
  }
  let file = path.join(root, rel);
  if (file !== root && !file.startsWith(root + path.sep)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }
  fs.stat(file, (statErr, stat) => {
    if (!statErr && stat.isDirectory()) {
      if (!rel.endsWith('/')) {
        res.writeHead(301, { Location: rel + '/' });
        return res.end();
      }
      file = path.join(file, 'index.html');
    }
    fs.readFile(file, (readErr, data) => {
      if (readErr) {
        console.log(`404 ${rel}`);
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Not found');
      }
      const type = types[path.extname(file).toLowerCase()] || 'application/octet-stream';
      const headers = { 'Content-Type': type, 'Cache-Control': 'no-store', Vary: 'Accept-Encoding' };
      if (/^(text\/|application\/(json|manifest\+json|xml)|image\/svg)/.test(type) && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
        data = zlib.gzipSync(data);
        headers['Content-Encoding'] = 'gzip';
      }
      res.writeHead(200, headers);
      res.end(data);
    });
  });
}).listen(port, '127.0.0.1', () => console.log(`Serving ${root} at http://localhost:${port}/`));
