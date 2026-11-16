export const SITE_ORIGIN = 'https://joyfulneurob.github.io'
export const BASE = '/SLB-Agent/'

/**
 * Add a bilingual page by adding one pair here. Both page files must exist:
 *   <zh>.md and <en>.md  (omit .md from the paths below).
 * Keep the pair list in sync with the navbar and theme data.
 */
export const pagePairs = Object.freeze([
  { zh: '', en: 'en/' },
  { zh: 'armor-engine.html', en: 'en/armor-engine.html' },
  { zh: 'models.html', en: 'en/models.html' },
  { zh: 'mcp.html', en: 'en/mcp.html' },
  { zh: 'agent-tools.html', en: 'en/agent-tools.html' },
  { zh: 'apk-analysis.html', en: 'en/apk-analysis.html' },
  { zh: 'download.html', en: 'en/download.html' },
  { zh: 'docs.html', en: 'en/docs.html' },
  { zh: 'faq.html', en: 'en/faq.html' },
  { zh: 'privacy.html', en: 'en/privacy.html' },
  { zh: 'terms.html', en: 'en/terms.html' }
])

export const routes = Object.freeze(pagePairs.flatMap((pair) => [pair.zh, pair.en]))

export const expectedFiles = Object.freeze(
  routes.map((route) => (route === '' || route.endsWith('/') ? `${route}index.html` : route))
)

export function canonicalFor(route) {
  return `${SITE_ORIGIN}${BASE}${route}`
}
