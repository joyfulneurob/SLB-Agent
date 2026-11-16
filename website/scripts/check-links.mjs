import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, '.vitepress', 'dist')
const BASE = '/SLB-Agent/'
const SITE_ORIGIN = 'https://joyfulneurob.github.io'

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? walk(path) : [path]
  })
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function attrs(tag) {
  const result = {}
  const pattern = /([\w:-]+)\s*=\s*["']([^"']*)["']/g
  let match
  while ((match = pattern.exec(tag))) result[match[1].toLowerCase()] = decodeEntities(match[2])
  return result
}

function collectIds(html) {
  const ids = new Set()
  for (const match of html.matchAll(/\sid=["']([^"']+)["']/g)) ids.add(match[1])
  return ids
}

function resolveOutputPath(urlPath) {
  if (!urlPath.startsWith(BASE)) return null
  let pathname = urlPath.slice(BASE.length)
  pathname = decodeURIComponent(pathname)
  if (pathname === '' || pathname.endsWith('/')) pathname += 'index.html'
  return join(dist, pathname)
}

export function checkLinks() {
  if (!existsSync(dist)) {
    console.error(`Build directory not found: ${dist}`)
    process.exit(1)
  }

  const htmlFiles = walk(dist).filter((file) => file.endsWith('.html'))
  const htmlDocs = new Map()
  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8')
    htmlDocs.set(file, { html, ids: collectIds(html) })
  }

  const failures = []
  let checked = 0
  let external = 0

  for (const [file, { html, ids }] of htmlDocs) {
    const pageUrl = SITE_ORIGIN + BASE + relative(dist, file).replaceAll('\\', '/')
    const tags = html.match(/<(?:a|link|img|script|source|video|audio|iframe)\b[^>]*>/gi) || []

    for (const tag of tags) {
      const parsed = attrs(tag)
      const target = parsed.href || parsed.src
      if (!target) continue
      if (/^(?:https?:)?\/\//i.test(target) || /^(?:mailto:|tel:|data:|javascript:)/i.test(target)) {
        external += 1
        continue
      }
      if (target.startsWith('#')) {
        checked += 1
        const id = target.slice(1)
        if (id && !ids.has(id)) {
          failures.push(`${relative(dist, file)} → missing anchor ${target}`)
        }
        continue
      }
      if (!target.startsWith('/') && !target.startsWith('.')) {
        // VitePress emits relative URLs only for assets if misconfigured.
        failures.push(`${relative(dist, file)} → relative URL is not allowed under a Pages base: ${target}`)
        continue
      }

      checked += 1
      let resolved
      try {
        resolved = new URL(target, pageUrl)
      } catch {
        failures.push(`${relative(dist, file)} → invalid URL ${target}`)
        continue
      }

      if (resolved.origin !== SITE_ORIGIN) {
        external += 1
        continue
      }

      const filePath = resolveOutputPath(resolved.pathname)
      if (!filePath) {
        failures.push(`${relative(dist, file)} → URL missing ${BASE} prefix: ${target}`)
        continue
      }
      if (!existsSync(filePath) || !statSync(filePath).isFile()) {
        failures.push(`${relative(dist, file)} → missing target ${target}`)
        continue
      }

      if (resolved.hash && extname(filePath) === '.html') {
        const targetDoc = htmlDocs.get(filePath)
        if (targetDoc && !targetDoc.ids.has(decodeURIComponent(resolved.hash.slice(1)))) {
          failures.push(`${relative(dist, file)} → missing anchor ${target}`)
        }
      }
    }
  }

  return { failures, checked, external, htmlFiles: htmlFiles.length }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = checkLinks()
  if (result.failures.length) {
    console.error(`Link check failed: ${result.failures.length} issue(s)\n`)
    result.failures.forEach((failure) => console.error(`- ${failure}`))
    process.exit(1)
  }
  console.log(
    `Link check passed: ${result.checked} internal references, ${result.external} external references, ${result.htmlFiles} HTML pages.`
  )
}
