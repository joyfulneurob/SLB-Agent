import { existsSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BASE, SITE_ORIGIN, pagePairs, routes } from './routes.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, '.vitepress', 'dist')
const SITE = SITE_ORIGIN

const missing = []
for (const route of routes) {
  const file = join(dist, route === '' || route.endsWith('/') ? `${route}index.html` : route)
  if (!existsSync(file)) missing.push(file)
}
if (missing.length) {
  console.error('Build output is missing expected pages:')
  for (const file of missing) console.error(`- ${file}`)
  process.exit(1)
}

const today = new Date().toISOString().slice(0, 10)

function url(route) {
  return `${SITE}${BASE}${route}`
}

const entries = []
for (const route of pagePairs) {
  const zh = url(route.zh)
  const en = url(route.en)
  const alternates = [
    `<xhtml:link rel="alternate" hreflang="zh-CN" href="${zh}"/>`,
    `<xhtml:link rel="alternate" hreflang="en" href="${en}"/>`,
    `<xhtml:link rel="alternate" hreflang="x-default" href="${zh}"/>`
  ].join('')
  entries.push(
    `  <url><loc>${zh}</loc><lastmod>${today}</lastmod>${alternates}</url>`,
    `  <url><loc>${en}</loc><lastmod>${today}</lastmod>${alternates}</url>`
  )
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`
writeFileSync(join(dist, 'sitemap.xml'), sitemap, 'utf8')

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}${BASE}sitemap.xml
`
writeFileSync(join(dist, 'robots.txt'), robots, 'utf8')
writeFileSync(join(dist, '.nojekyll'), '', 'utf8')

// Optional HTML-file verification for Search Console. The meta tag is the
// default; this escape hatch avoids hand-editing the build output.
const verificationFile = process.env.GOOGLE_SITE_VERIFICATION_HTML_FILENAME?.trim()
const verificationContent = process.env.GOOGLE_SITE_VERIFICATION_HTML_CONTENT
if (verificationFile || verificationContent) {
  if (!/^google[a-zA-Z0-9_-]+\.html$/.test(verificationFile || '')) {
    console.error('GOOGLE_SITE_VERIFICATION_HTML_FILENAME must look like googleXXXX.html')
    process.exit(1)
  }
  if (!verificationContent) {
    console.error('GOOGLE_SITE_VERIFICATION_HTML_CONTENT is required with a verification file name')
    process.exit(1)
  }
  writeFileSync(join(dist, verificationFile), verificationContent, 'utf8')
}

const sizes = ['sitemap.xml', 'robots.txt'].map((file) => {
  const bytes = statSync(join(dist, file)).size
  return `${file} (${bytes} bytes)`
})

console.log(`Postbuild SEO artifacts written: ${sizes.join(', ')}`)
console.log(`Sitemap URLs: ${pagePairs.length * 2} (${pagePairs.length} bilingual pairs, no 404)`)
console.log('GitHub Pages .nojekyll marker created.')
