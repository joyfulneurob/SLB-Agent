<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import AppIcon from './AppIcon.vue'
import LangSwitch from './LangSwitch.vue'

const { lang } = useData()
const isEnglish = computed(() => lang.value.startsWith('en'))
const year = new Date().getFullYear()

const copy = computed(() =>
  isEnglish.value
    ? {
        blurb:
          'A local-first desktop AI agent with multi-model access, MCP tools, real execution, and the Armor Engine toolchain.',
        product: 'Product',
        resources: 'Resources',
        project: 'Project',
        productLinks: [
          ['Armor Engine', '/en/armor-engine.html'],
          ['Multi-model access', '/en/models.html'],
          ['MCP & ecosystem', '/en/mcp.html'],
          ['Agent tools', '/en/agent-tools.html'],
          ['APK analysis', '/en/apk-analysis.html']
        ],
        resourceLinks: [
          ['Download', '/en/download.html'],
          ['Documentation', '/en/docs.html'],
          ['FAQ', '/en/faq.html'],
          ['GitHub Releases', 'https://github.com/joyfulneurob/SLB-Agent/releases/latest']
        ],
        projectLinks: [
          ['GitHub repository', 'https://github.com/joyfulneurob/SLB-Agent'],
          ['GitHub Issues', 'https://github.com/joyfulneurob/SLB-Agent/issues'],
          ['Telegram community', 'https://t.me/jiaoliuqunsbl']
        ],
        legalLinks: [
          ['Privacy', '/en/privacy.html'],
          ['Terms & safety', '/en/terms.html']
        ],
        token: 'LOCAL-FIRST · MULTI-MODEL · MCP',
        disclaimer:
          'SLB-Agent and its bundled security tools are for lawful research and authorized testing. Armor Engine does not guarantee model compliance or bypass model safety mechanisms. Verify all model output.',
        built: 'Official website. Installers are distributed only via GitHub Releases.'
      }
    : {
        blurb:
          '本地优先的桌面 AI Agent，支持多模型接入、MCP 工具、真实执行与 Armor Engine 工具链。',
        product: '产品',
        resources: '资源',
        project: '项目',
        productLinks: [
          ['Armor Engine', '/armor-engine.html'],
          ['多模型接入', '/models.html'],
          ['MCP 与生态', '/mcp.html'],
          ['Agent 工具', '/agent-tools.html'],
          ['APK 分析', '/apk-analysis.html']
        ],
        resourceLinks: [
          ['下载', '/download.html'],
          ['文档', '/docs.html'],
          ['FAQ', '/faq.html'],
          ['GitHub Releases', 'https://github.com/joyfulneurob/SLB-Agent/releases/latest']
        ],
        projectLinks: [
          ['GitHub 仓库', 'https://github.com/joyfulneurob/SLB-Agent'],
          ['GitHub Issues', 'https://github.com/joyfulneurob/SLB-Agent/issues'],
          ['Telegram 交流群', 'https://t.me/jiaoliuqunsbl']
        ],
        legalLinks: [
          ['隐私说明', '/privacy.html'],
          ['使用条款与安全边界', '/terms.html']
        ],
        token: 'LOCAL-FIRST · MULTI-MODEL · MCP',
        disclaimer:
          'SLB-Agent 及内置安全工具仅限合法研究与授权测试。Armor Engine 不保证模型配合，也不保证绕过模型安全机制；请自行核验模型输出。',
        built: '官方网站。安装包仅通过 GitHub Releases 分发。'
      }
)

function link(href: string): string {
  if (/^https?:\/\//.test(href)) return href
  return withBase(href)
}
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="footer-logo" :href="withBase(isEnglish ? '/en/' : '/')">
            <img
              :src="withBase('/images/logo-256.webp')"
              alt=""
              width="40"
              height="40"
              loading="lazy"
              data-decorative="true"
            />
            <span>
              <strong>SLB-Agent</strong>
              <small>{{ copy.token }}</small>
            </span>
          </a>
          <p>{{ copy.blurb }}</p>
          <div class="footer-social">
            <a
              href="https://github.com/joyfulneurob/SLB-Agent"
              target="_blank"
              rel="noopener"
              aria-label="SLB-Agent on GitHub"
            >
              <AppIcon name="github" :size="18" />
              <span>GitHub</span>
            </a>
            <a
              href="https://t.me/jiaoliuqunsbl"
              target="_blank"
              rel="noopener"
              aria-label="SLB-Agent Telegram community"
            >
              <AppIcon name="telegram" :size="18" />
              <span>Telegram</span>
            </a>
          </div>
        </div>

        <nav class="footer-col" aria-label="Product links">
          <h2>{{ copy.product }}</h2>
          <a v-for="[label, href] in copy.productLinks" :key="href" :href="link(href)">{{ label }}</a>
        </nav>

        <nav class="footer-col" aria-label="Resource links">
          <h2>{{ copy.resources }}</h2>
          <a
            v-for="[label, href] in copy.resourceLinks"
            :key="href"
            :href="link(href)"
            :target="/^https?:/.test(href) ? '_blank' : undefined"
            :rel="/^https?:/.test(href) ? 'noopener' : undefined"
          >
            {{ label }}
            <AppIcon v-if="/^https?:/.test(href)" name="external" :size="12" />
          </a>
        </nav>

        <nav class="footer-col" aria-label="Project links">
          <h2>{{ copy.project }}</h2>
          <a
            v-for="[label, href] in copy.projectLinks"
            :key="href"
            :href="href"
            target="_blank"
            rel="noopener"
          >
            {{ label }}
            <AppIcon name="external" :size="12" />
          </a>
          <a v-for="[label, href] in copy.legalLinks" :key="href" :href="link(href)">{{ label }}</a>
        </nav>
      </div>

      <div class="footer-disclaimer">
        <p>{{ copy.disclaimer }}</p>
      </div>

      <div class="footer-bottom">
        <p>© {{ year }} SLB-Agent. {{ copy.built }}</p>
        <LangSwitch />
      </div>
    </div>
  </footer>
</template>
