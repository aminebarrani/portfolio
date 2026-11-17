// Emulates GitHub Pages static serving: dist under a URL prefix.
// `vite preview` always serves dist at root, so it cannot preview a base-path build.
import http from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { resolve, join, extname } from 'node:path'

const BASE = process.argv[2] || '/'
const PORT = Number(process.argv[3] || 4173)
const ROOT = resolve('dist')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
}

http
  .createServer((req, res) => {
    const url = decodeURIComponent(new URL(req.url, 'http://x').pathname)
    if (!url.startsWith(BASE)) {
      res.writeHead(404).end('Not found')
      return
    }
    let file = join(ROOT, url.slice(BASE.length))
    if (!file.startsWith(ROOT)) {
      res.writeHead(403).end('Forbidden')
      return
    }
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html')
    if (!existsSync(file)) {
      res.writeHead(404).end('Not found')
      return
    }
    res.writeHead(200, { 'Content-Type': MIME[extname(file).toLowerCase()] || 'application/octet-stream' })
    createReadStream(file).pipe(res)
  })
  .listen(PORT, () => console.log(`Serving dist at http://localhost:${PORT}${BASE}`))