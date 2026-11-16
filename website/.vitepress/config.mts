import { defineConfig } from 'vitepress'
import type { HeadConfig } from 'vitepress'
import { detailPages } from './data/details'

const SITE_ORIGIN = 'https://joyfulneurob.github.io'
const BASE = '/SLB-Agent/'
const SITE_NAME = 'SLB-Agent'
const REPO = 'https://github.com/joyfulneurob/SLB-Agent'
const RELEASES = `${REPO}/releases/latest`
const TELEGRAM = 'https://t.me/jiaoliuqunsbl'
const SOCIAL_IMAGE = `${SITE_ORIGIN}${BASE}images/social-card.jpg`
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim() || ''

const githubIcon = {
  svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .7a11.3 11.3 0 0 0-3.57 22.02c.57.1.78-.25.78-.55v-2.15c-3.17.69-3.84-1.35-3.84-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.66 1.24 3.31.95.1-.74.4-1.24.72-1.53-2.53-.29-5.2-1.27-5.2-5.64 0-1.25.45-2.27 1.17-3.07-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.14 1.17a10.9 10.9 0 0 1 5.72 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.23 2.74.11 3.03.73.8 1.17 1.82 1.17 3.07 0 4.38-2.68 5.35-5.22 5.63.41.35.77 1.05.77 2.12v3.14c0 .3.2.66.79.55A11.3 11.3 0 0 0 12 .7Z"/></svg>'
}

const telegramIcon = {
  svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.9 3.4c.4-1.5-.6-2.2-1.8-1.7L2.4 9.1c-1.3.5-1.3 1.3-.2 1.6l4.6 1.4 1.8 5.5c.2.6.4.8 1.1.8.6 0 .9-.3 1.2-.7l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.8-.9l3-14.7ZM9.3 13.1l9.2-5.8c.4-.3.8-.1.5.2l-7.4 6.7-.3 3.2-2-4.3Z"/></svg>'
}

function cleanRoute(relativePath: string): string {
  if (relativePath === 'index.md') return ''
  if (relativePath === 'en/index.md') return 'en/'
  return relativePath.replace(/\.md$/, '.html')
}

function absolute(route: string): string {
  return `${SITE_ORIGIN}${BASE}${route}`
}

function localeAlternates(relativePath: string) {
  const isEnglish = relativePath.startsWith('en/')
  const zhRoute = isEnglish ? relativePath.slice(3) : relativePath
  const enRoute = isEnglish ? relativePath : `en/${relativePath}`
  return {
    zh: absolute(cleanRoute(zhRoute)),
    en: absolute(cleanRoute(enRoute))
  }
}

const sharedHead: HeadConfig[] = [
  ['meta', { name: 'theme-color', content: '#060812' }],
  ['meta', { name: 'color-scheme', content: 'dark light' }],
  ['meta', { name: 'format-detection', content: 'telephone=no' }],
  ['meta', { name: 'author', content: 'SLB-Agent Team' }],
  ['meta', { name: 'application-name', content: SITE_NAME }],
  ['link', { rel: 'icon', type: 'image/png', href: `${BASE}images/favicon-96.png` }],
  ['link', { rel: 'apple-touch-icon', href: `${BASE}images/apple-touch-icon.png` }],
  ['link', { rel: 'preload', as: 'image', href: `${BASE}images/logo-256.webp`, type: 'image/webp' }],
  ['meta', { property: 'og:site_name', content: SITE_NAME }],
  ['meta', { property: 'og:image', content: SOCIAL_IMAGE }],
  ['meta', { property: 'og:image:type', content: 'image/jpeg' }],
  ['meta', { property: 'og:image:width', content: '1200' }],
  ['meta', { property: 'og:image:height', content: '630' }],
  ['meta', { property: 'og:image:alt', content: 'SLB-Agent — One Core. Every AI.' }],
  ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ['meta', { name: 'twitter:image', content: SOCIAL_IMAGE }],
  ['meta', { name: 'twitter:image:alt', content: 'SLB-Agent — One Core. Every AI.' }]
]

if (googleVerification) {
  sharedHead.push(['meta', { name: 'google-site-verification', content: googleVerification }])
}

function structuredData(relativePath: string): HeadConfig[] {
  if (relativePath === 'index.md' || relativePath === 'en/index.md') {
    const isEn = relativePath.startsWith('en/')
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          name: SITE_NAME,
          url: absolute(isEn ? 'en/' : ''),
          inLanguage: isEn ? 'en' : 'zh-CN'
        },
        {
          '@type': 'SoftwareApplication',
          name: SITE_NAME,
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Windows, macOS, Linux',
          description: isEn
            ? 'A local-first desktop AI agent with multi-model access, MCP tools, real file and command execution, and the Armor Engine toolchain.'
            : '本地优先的桌面 AI Agent，支持多模型接入、MCP 工具、真实文件与命令执行，以及 Armor Engine 工具链。',
          downloadUrl: RELEASES,
          codeRepository: REPO,
          license: `${REPO}/blob/main/LICENSE`
        }
      ]
    }
    return [['script', { type: 'application/ld+json' }, JSON.stringify(data)]]
  }

  if (relativePath === 'faq.md' || relativePath === 'en/faq.md') {
    const isEn = relativePath.startsWith('en/')
    const items = detailPages.faq[isEn ? 'en' : 'zh'].sections.flatMap((section) =>
      section.blocks.flatMap((block) => (block.type === 'faq' ? block.items : []))
    )
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: isEn ? 'en' : 'zh-CN',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a }
      }))
    }
    return [['script', { type: 'application/ld+json' }, JSON.stringify(data)]]
  }

  return []
}

export default defineConfig({
  lang: 'zh-CN',
  title: SITE_NAME,
  titleTemplate: false,
  description:
    'SLB-Agent 是本地优先的桌面 AI Agent，支持 Claude、GPT、Gemini、DeepSeek、GLM、Kimi、Ollama 等模型，集成 Armor Engine、MCP 工具、文件操作、命令执行与安全研究工作流。',
  base: BASE,
  srcExclude: ['README.md'],
  cleanUrls: false,
  appearance: 'dark',
  head: sharedHead,
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: SITE_NAME,
      description:
        'SLB-Agent 是本地优先的桌面 AI Agent，支持多模型接入、MCP 工具、文件与命令执行、APK 分析与安全研究工作流。',
      themeConfig: {
        nav: [
          {
            text: '产品',
            items: [
              { text: 'Armor Engine', link: '/armor-engine.html' },
              { text: '多模型接入', link: '/models.html' },
              { text: 'MCP 与生态', link: '/mcp.html' },
              { text: 'Agent 工具', link: '/agent-tools.html' },
              { text: 'APK 分析', link: '/apk-analysis.html' }
            ]
          },
          { text: '下载', link: '/download.html' },
          { text: '文档', link: '/docs.html' },
          { text: 'FAQ', link: '/faq.html' }
        ],
        darkModeSwitchLabel: '切换明暗模式',
        lightModeSwitchTitle: '切换到亮色模式',
        darkModeSwitchTitle: '切换到暗色模式',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '回到顶部',
        outlineTitle: '本页目录',
        docFooter: { prev: '上一页', next: '下一页' }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: SITE_NAME,
      description:
        'SLB-Agent is a local-first desktop AI agent with multi-model access, MCP tools, file and command execution, APK analysis, and security research workflows.',
      themeConfig: {
        nav: [
          {
            text: 'Product',
            items: [
              { text: 'Armor Engine', link: '/en/armor-engine.html' },
              { text: 'Multi-model access', link: '/en/models.html' },
              { text: 'MCP & ecosystem', link: '/en/mcp.html' },
              { text: 'Agent tools', link: '/en/agent-tools.html' },
              { text: 'APK analysis', link: '/en/apk-analysis.html' }
            ]
          },
          { text: 'Download', link: '/en/download.html' },
          { text: 'Docs', link: '/en/docs.html' },
          { text: 'FAQ', link: '/en/faq.html' }
        ],
        darkModeSwitchLabel: 'Toggle color mode',
        lightModeSwitchTitle: 'Switch to light mode',
        darkModeSwitchTitle: 'Switch to dark mode',
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Return to top',
        outlineTitle: 'On this page',
        docFooter: { prev: 'Previous', next: 'Next' }
      }
    }
  },
  themeConfig: {
    logo: {
      src: '/images/logo-256.webp',
      alt: ''
    },
    siteTitle: SITE_NAME,
    socialLinks: [
      { icon: githubIcon, link: REPO, ariaLabel: 'GitHub' },
      { icon: telegramIcon, link: TELEGRAM, ariaLabel: 'Telegram' }
    ],
    externalLinkIcon: true,
    outline: { level: [2, 3] }
  },
  transformHead({ pageData }) {
    const relativePath = pageData.relativePath
    if (relativePath === '404.md') {
      return [['meta', { name: 'robots', content: 'noindex, follow' }]]
    }

    const canonical = absolute(cleanRoute(relativePath))
    const alternates = localeAlternates(relativePath)
    const isEnglish = relativePath.startsWith('en/')
    const title = pageData.title || SITE_NAME
    const description =
      pageData.frontmatter.description ||
      (isEnglish
        ? 'A local-first desktop AI agent with multi-model access, MCP tools, real execution, and the Armor Engine toolchain.'
        : '本地优先的桌面 AI Agent，支持多模型接入、MCP 工具、真实执行与 Armor Engine 工具链。')

    const tags: HeadConfig[] = [
      ['link', { rel: 'canonical', href: canonical }],
      ['link', { rel: 'alternate', hreflang: 'zh-CN', href: alternates.zh }],
      ['link', { rel: 'alternate', hreflang: 'en', href: alternates.en }],
      ['link', { rel: 'alternate', hreflang: 'x-default', href: alternates.zh }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonical }],
      ['meta', { property: 'og:locale', content: isEnglish ? 'en_US' : 'zh_CN' }],
      ['meta', { property: 'og:locale:alternate', content: isEnglish ? 'zh_CN' : 'en_US' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:url', content: canonical }]
    ]

    return [...tags, ...structuredData(relativePath)]
  },
  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' }
  },
  vite: {
    build: {
      target: 'es2020'
    }
  }
})
