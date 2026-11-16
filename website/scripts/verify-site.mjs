import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { checkLinks } from './check-links.mjs'
import { BASE, SITE_ORIGIN, canonicalFor, expectedFiles, routes as expectedRoutes } from './routes.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, '.vitepress', 'dist')
const SITE = SITE_ORIGIN

const failures = []
const warnings = []

function fail(message) {
  failures.push(message)
}

function decode(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function attrs(tag) {
  const result = {}
  const pattern = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g
  let match
  while ((match = pattern.exec(tag))) result[match[1].toLowerCase()] = decode(match[2] ?? match[3] ?? '')
  return result
}

function metaContent(html, attr, key) {
  for (const tag of html.match(/<meta\b[^>]*>/gi) || []) {
    const parsed = attrs(tag)
    if (parsed[attr.toLowerCase()] === key) return parsed.content || ''
  }
  return ''
}

function linkHref(html, relValue) {
  return (html.match(/<link\b[^>]*>/gi) || [])
    .map(attrs)
    .filter((parsed) => parsed.rel?.split(/\s+/).includes(relValue))
    .map((parsed) => parsed.href || '')
}

function hreflangHref(html, value) {
  for (const tag of html.match(/<link\b[^>]*>/gi) || []) {
    const parsed = attrs(tag)
    if (parsed.rel?.split(/\s+/).includes('alternate') && parsed.hreflang === value) {
      return parsed.href || ''
    }
  }
  return ''
}

function outputFor(route) {
  return join(dist, route === '' || route.endsWith('/') ? `${route}index.html` : route)
}

if (!existsSync(dist)) {
  console.error(`Build directory not found: ${dist}`)
  process.exit(1)
}

const titles = new Map()
const descriptions = new Map()

for (const route of expectedRoutes) {
  const file = outputFor(route)
  if (!existsSync(file)) {
    fail(`Missing page output: ${route || '/'}`)
    continue
  }
  const html = readFileSync(file, 'utf8')
  const label = route || 'index.html'
  const title = decode(html.match(/<title>([^<]*)<\/title>/i)?.[1] || '').trim()
  const description = metaContent(html, 'name', 'description')
  const canonical = linkHref(html, 'canonical')[0] || ''
  const h1s = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) || []
  const htmlLang = html.match(/<html[^>]*lang=["']([^"']+)["']/i)?.[1] || ''
  const expectedCanonical = canonicalFor(route)
  const isEnglish = route.startsWith('en/')

  if (!title) fail(`${label}: missing <title>`)
  if (!description) fail(`${label}: missing meta description`)
  if (description.length < 50) warnings.push(`${label}: meta description is short (${description.length} chars)`)
  if (!canonical) fail(`${label}: missing canonical`)
  if (canonical !== expectedCanonical) {
    fail(`${label}: canonical ${canonical} does not match ${expectedCanonical}`)
  }
  if (!canonical.startsWith(`${SITE}${BASE}`)) fail(`${label}: canonical lacks the Pages base prefix`)
  if (h1s.length !== 1) fail(`${label}: expected exactly one H1, found ${h1s.length}`)
  if ((html.match(/<h2\b/gi) || []).length === 0) fail(`${label}: no H2 headings`)
  if (htmlLang !== (isEnglish ? 'en-US' : 'zh-CN')) {
    fail(`${label}: expected html lang ${isEnglish ? 'en-US' : 'zh-CN'}, found ${htmlLang}`)
  }

  if (titles.has(title)) fail(`${label}: duplicate title also used by ${titles.get(title)}`)
  else titles.set(title, label)
  if (descriptions.has(description)) fail(`${label}: duplicate description also used by ${descriptions.get(description)}`)
  else descriptions.set(description, label)

  const zhHref = hreflangHref(html, 'zh-CN')
  const enHref = hreflangHref(html, 'en')
  const defaultHref = hreflangHref(html, 'x-default')
  if (!zhHref || !enHref || !defaultHref) fail(`${label}: missing hreflang set`)
  if (zhHref && !zhHref.startsWith(`${SITE}${BASE}`)) fail(`${label}: zh-CN hreflang lacks base prefix`)
  if (enHref && !enHref.startsWith(`${SITE}${BASE}`)) fail(`${label}: en hreflang lacks base prefix`)
  if (defaultHref !== zhHref) fail(`${label}: x-default should point to the Chinese page`)

  const ogUrl = metaContent(html, 'property', 'og:url')
  const ogImage = metaContent(html, 'property', 'og:image')
  const twitterCard = metaContent(html, 'name', 'twitter:card')
  if (ogUrl !== canonical) fail(`${label}: og:url does not match canonical`)
  if (!ogImage.startsWith(`${SITE}${BASE}`)) fail(`${label}: og:image lacks the Pages base prefix`)
  if (twitterCard !== 'summary_large_image') fail(`${label}: twitter:card is not summary_large_image`)
  if (!metaContent(html, 'property', 'og:title')) fail(`${label}: missing og:title`)
  if (!metaContent(html, 'property', 'og:description')) fail(`${label}: missing og:description`)

  for (const img of html.match(/<img\b[^>]*>/gi) || []) {
    const altMatch = img.match(/\balt\b(?:\s*=\s*(?:"([^"]*)"|'([^']*)'))?/i)
    const altValue = altMatch ? (altMatch[1] ?? altMatch[2] ?? '') : null
    const decorative =
      /\bdata-decorative=["']true["']/i.test(img) ||
      /\bclass=["'][^"']*(?:VPImage|logo)[^"']*["']/i.test(img)
    if (altValue === null || (altValue.trim() === '' && !decorative)) {
      fail(`${label}: image without meaningful alt: ${img.slice(0, 120)}`)
    }
  }

  if (/(?:localhost|127\.0\.0\.1|\[::1\])/i.test(html)) fail(`${label}: contains a localhost URL`)
  if (/\bkeywords\s*=/i.test(html) && /<meta\b[^>]*name=["']keywords["']/i.test(html)) {
    warnings.push(`${label}: contains a meta keywords tag`)
  }
}

const notFound = join(dist, '404.html')
if (!existsSync(notFound)) {
  fail('Missing 404.html')
} else {
  const html = readFileSync(notFound, 'utf8')
  if (!/noindex/i.test(html)) fail('404.html must include a noindex robots meta tag')
  if (linkHref(html, 'canonical').length) fail('404.html must not declare a canonical URL')
  if (titles.has(decode(html.match(/<title>([^<]*)<\/title>/i)?.[1] || '').trim())) {
    // No failure: the 404 title may reuse the brand. Not part of the sitemap.
  }
}

const sitemapPath = join(dist, 'sitemap.xml')
if (!existsSync(sitemapPath)) {
  fail('Missing sitemap.xml')
} else {
  const sitemap = readFileSync(sitemapPath, 'utf8')
  const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decode(match[1]))
  if (locs.length !== expectedRoutes.length) {
    fail(`Sitemap has ${locs.length} URLs; expected ${expectedRoutes.length}`)
  }
  if (new Set(locs).size !== locs.length) fail('Sitemap contains duplicate URLs')
  if (locs.some((loc) => loc.includes('404'))) fail('Sitemap must not include 404')
  for (const route of expectedRoutes) {
    const expected = canonicalFor(route)
    if (!locs.includes(expected)) fail(`Sitemap is missing ${expected}`)
  }
  const alternateCount = (sitemap.match(/hreflang=/g) || []).length
  if (alternateCount !== expectedRoutes.length * 3) {
    fail(`Sitemap expected ${expectedRoutes.length * 3} hreflang links, found ${alternateCount}`)
  }
}

const robotsPath = join(dist, 'robots.txt')
if (!existsSync(robotsPath)) {
  fail('Missing robots.txt')
} else {
  const robots = readFileSync(robotsPath, 'utf8')
  if (!robots.includes(`Sitemap: ${SITE}${BASE}sitemap.xml`)) {
    fail('robots.txt does not reference the canonical sitemap URL')
  }
  if (!/User-agent:\s*\*/i.test(robots)) fail('robots.txt is missing a User-agent rule')
}

for (const required of ['.nojekyll', 'images/social-card.jpg', 'images/logo-256.webp', 'images/banner.webp']) {
  if (!existsSync(join(dist, required))) fail(`Missing build asset: ${required}`)
}

const linkResult = checkLinks()
failures.push(...linkResult.failures)

// Guard against generated pages accidentally omitted from the sitemap.
const expectedFileSet = new Set(expectedFiles)
const allHtml = readdirSync(dist, { recursive: true })
  .filter((file) => typeof file === 'string' && file.endsWith('.html'))
  .map((file) => file.replaceAll('\\', '/'))
const unexpected = allHtml.filter((file) => file !== '404.html' && !expectedFileSet.has(file))
if (unexpected.length) {
  warnings.push(`HTML pages not in the expected route registry: ${unexpected.join(', ')}`)
}

if (warnings.length) {
  console.warn(`Verification warnings (${warnings.length}):`)
  warnings.forEach((warning) => console.warn(`- ${warning}`))
}

if (failures.length) {
  console.error(`Verification failed: ${failures.length} issue(s)\n`)
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log(
  `Verification passed: ${expectedRoutes.length} bilingual pages, ${titles.size} unique titles, ${descriptions.size} unique descriptions.`
)
console.log(
  `Links: ${linkResult.checked} internal references checked; ${linkResult.external} external references skipped.`
)
console.log('SEO: canonical, hreflang, OG/Twitter, sitemap, robots, 404 noindex, and image alts all valid.')
