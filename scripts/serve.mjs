import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { BASE_PATH } from '../site.config.mjs'
const root = resolve('out')
const mime = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.wasm': 'application/wasm',
  '.woff2': 'font/woff2',
  '.webp': 'image/webp',
}
createServer(async (req, res) => {
  try {
    // Serve out/ under BASE_PATH only, as GitHub Pages does for a project site, so a
    // URL that forgot the base path 404s here instead of only in production.
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    if (BASE_PATH && pathname === '/') {
      res.writeHead(302, { Location: BASE_PATH + '/' })
      return res.end()
    }
    if (BASE_PATH && pathname !== BASE_PATH && !pathname.startsWith(BASE_PATH + '/'))
      throw Error('Outside the base path')
    let path = resolve(root, '.' + pathname.slice(BASE_PATH.length))
    if (path !== root && !path.startsWith(root + sep)) throw Error('Forbidden')
    if ((await stat(path)).isDirectory()) path = resolve(path, 'index.html')
    const data = await readFile(path)
    res.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream' })
    res.end(data)
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.end(await readFile(resolve(root, '404.html')).catch(() => Buffer.from('Not found')))
  }
}).listen(Number(process.env.PORT || 4173), '127.0.0.1', () =>
  console.log(`Static site on http://127.0.0.1:${process.env.PORT || 4173}${BASE_PATH}/`),
)
