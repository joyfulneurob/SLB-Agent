<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { home } from '../../data/home'
import AppIcon from './AppIcon.vue'

const { lang } = useData()
const currentLang = computed(() => (lang.value.startsWith('en') ? 'en' : 'zh'))
const copy = computed(() => home[currentLang.value])
const activeStep = ref(0)
const root = ref<HTMLElement>()
let observer: IntersectionObserver | undefined

function resolveHref(href: string, external?: boolean): string {
  if (external || /^https?:\/\//.test(href) || href.startsWith('#')) return href
  return withBase(`/${href.replace(/^\.?\//, '')}`)
}

function isExternal(href: string, external?: boolean): boolean {
  return Boolean(external || /^https?:\/\//.test(href))
}

onMounted(() => {
  const nodes = root.value?.querySelectorAll<HTMLElement>('.reveal')
  if (!nodes?.length) return
  if (!('IntersectionObserver' in window)) {
    nodes.forEach((node) => node.classList.add('is-visible'))
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  )
  nodes.forEach((node) => observer?.observe(node))
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <main ref="root" class="home-page">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-grid-lines" aria-hidden="true"></div>
      <div class="hero-glow hero-glow-a" aria-hidden="true"></div>
      <div class="hero-glow hero-glow-b" aria-hidden="true"></div>

      <div class="slb-container hero-inner">
        <div class="hero-copy">
          <p class="eyebrow hero-eyebrow">
            <span class="eyebrow-dot"></span>
            {{ copy.hero.eyebrow }}
          </p>
          <h1 id="hero-title" class="hero-title">
            <span class="hero-brand">{{ copy.hero.brand }}<span class="hero-brand-dash"> —&nbsp;</span></span>
            <span class="hero-headline">
              {{ copy.hero.title }}<br />
              <em>{{ copy.hero.titleAccent }}</em>
            </span>
          </h1>
          <p class="hero-lead">{{ copy.hero.lead }}</p>

          <div class="hero-actions">
            <a
              v-for="cta in copy.hero.ctas"
              :key="cta.label"
              class="button"
              :class="`button-${cta.variant || 'secondary'}`"
              :href="resolveHref(cta.href, cta.external)"
              :target="isExternal(cta.href, cta.external) ? '_blank' : undefined"
              :rel="isExternal(cta.href, cta.external) ? 'noopener' : undefined"
            >
              {{ cta.label }}
              <AppIcon
                :name="cta.variant === 'primary' ? 'download' : isExternal(cta.href, cta.external) ? 'external' : 'arrow'"
                :size="17"
              />
            </a>
          </div>

          <ul class="hero-micro" aria-label="Platform and privacy highlights">
            <li v-for="item in copy.hero.micro" :key="item">
              <AppIcon name="check" :size="14" />
              {{ item }}
            </li>
          </ul>
        </div>

        <div class="hero-visual">
          <div class="orbit orbit-one" aria-hidden="true"></div>
          <div class="orbit orbit-two" aria-hidden="true"></div>
          <div class="hero-panel">
            <div class="panel-topbar">
              <span class="window-dots" aria-hidden="true"><i></i><i></i><i></i></span>
              <span class="panel-session">{{ copy.hero.panel.session }}</span>
              <span class="panel-status"><i></i>{{ copy.hero.panel.status }}</span>
            </div>
            <div class="panel-body">
              <div class="panel-label">{{ copy.hero.panel.label }}</div>
              <div
                v-for="(line, index) in copy.hero.panel.lines"
                :key="line.text"
                class="panel-line"
                :class="`line-${line.kind}`"
                :style="{ '--delay': `${index * 90}ms` }"
              >
                <span class="line-mark" aria-hidden="true">{{
                  line.kind === 'cmd' ? '$' : line.kind === 'ok' ? '✓' : line.kind === 'warn' ? '!' : '›'
                }}</span>
                <span>{{ line.text }}</span>
              </div>
              <div class="panel-cursor" aria-hidden="true"><span></span></div>
            </div>
            <div class="panel-footer">
              <span>armor_get</span>
              <span>armor_probe</span>
              <span>armor_fix</span>
              <span>armor_audit</span>
              <span>armor_drift</span>
            </div>
          </div>

          <div class="hero-float-card float-bottom">
            <AppIcon name="lock" :size="16" />
            <span>{{ currentLang === 'en' ? 'No telemetry' : '无遥测' }}<small>LOCAL-FIRST</small></span>
          </div>
        </div>
      </div>
    </section>

    <section class="proof-strip" aria-label="At a glance">
      <div class="slb-container proof-grid">
        <div v-for="item in copy.proof" :key="item.label" class="proof-item">
          <strong>{{ item.value }}</strong>
          <span>{{ item.label }}</span>
        </div>
        <p class="proof-disclaimer">
          {{
            currentLang === 'en'
              ? 'Figures reflect capabilities documented in the repository README. Availability depends on your build, plan, and configuration.'
              : '数字对应仓库 README 记录的产品能力；实际可用范围取决于安装版本、授权与配置。'
          }}
        </p>
      </div>
    </section>

    <section id="capabilities" class="section capabilities-section" aria-labelledby="capabilities-title">
      <div class="slb-container">
        <header class="section-heading split-heading reveal">
          <div>
            <p class="eyebrow">{{ copy.capabilities.kicker }}</p>
            <h2 id="capabilities-title">{{ copy.capabilities.title }}</h2>
          </div>
          <p>{{ copy.capabilities.lead }}</p>
        </header>

        <div class="capability-grid">
          <a
            v-for="(item, index) in copy.capabilities.items"
            :key="item.title"
            class="capability-card reveal"
            :href="resolveHref(item.href)"
            :style="{ '--delay': `${(index % 4) * 60}ms` }"
          >
            <span class="capability-icon"><AppIcon :name="item.icon" :size="22" /></span>
            <span class="capability-tag">{{ item.tag }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.body }}</p>
            <span class="capability-link">
              {{ currentLang === 'en' ? 'Learn more' : '查看详情' }}
              <AppIcon name="arrow" :size="15" />
            </span>
          </a>
        </div>
      </div>
    </section>

    <section class="section armor-section" aria-labelledby="armor-title">
      <div class="armor-bg" aria-hidden="true"></div>
      <div class="slb-container armor-layout">
        <div class="armor-copy reveal">
          <p class="eyebrow">{{ copy.armor.kicker }}</p>
          <h2 id="armor-title">{{ copy.armor.title }}</h2>
          <p class="armor-lead">{{ copy.armor.lead }}</p>

          <div class="armor-stats">
            <div v-for="stat in copy.armor.stats" :key="stat.label">
              <strong>{{ stat.value }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>

          <a class="text-link" :href="resolveHref(copy.armor.cta.href)">
            {{ copy.armor.cta.label }}
            <AppIcon name="arrow" :size="16" />
          </a>
        </div>

        <div class="armor-demo reveal">
          <div class="armor-demo-head">
            <span class="panel-label">ARMOR WORKFLOW / INTERACTIVE</span>
            <span class="live-pill"><i></i>5 stages</span>
          </div>
          <div class="armor-step-tabs" role="group" aria-label="Armor Engine workflow stages">
            <button
              v-for="(step, index) in copy.armor.steps"
              :key="step.no"
              type="button"
              :aria-pressed="activeStep === index"
              :class="{ active: activeStep === index }"
              @click="activeStep = index"
              @mouseenter="activeStep = index"
              @focus="activeStep = index"
            >
              <span>{{ step.no }}</span>
              {{ step.title }}
            </button>
          </div>
          <div class="armor-readout" aria-live="polite" :aria-label="copy.armor.steps[activeStep].title">
            <div class="readout-kicker">{{ copy.armor.steps[activeStep].tool }}</div>
            <h3>{{ copy.armor.steps[activeStep].title }}</h3>
            <p>{{ copy.armor.steps[activeStep].body }}</p>
            <div class="readout-progress" aria-hidden="true">
              <span
                v-for="(_, index) in copy.armor.steps"
                :key="index"
                :class="{ active: index <= activeStep }"
              ></span>
            </div>
          </div>
          <div class="armor-note">
            <AppIcon name="check" :size="16" />
            <p>{{ copy.armor.note }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="models" class="section models-section" aria-labelledby="models-title">
      <div class="slb-container">
        <header class="section-heading split-heading reveal">
          <div>
            <p class="eyebrow">{{ copy.models.kicker }}</p>
            <h2 id="models-title">{{ copy.models.title }}</h2>
          </div>
          <p>{{ copy.models.lead }}</p>
        </header>

        <div class="models-layout">
          <div class="protocol-stack reveal">
            <article v-for="protocol in copy.models.protocols" :key="protocol.title" class="protocol-card">
              <div>
                <span class="protocol-tag">{{ protocol.tag }}</span>
                <h3>{{ protocol.title }}</h3>
                <p>{{ protocol.body }}</p>
              </div>
              <span class="protocol-arrow" aria-hidden="true"><AppIcon name="arrow" :size="17" /></span>
            </article>
            <p class="models-note">{{ copy.models.note }}</p>
          </div>

          <div class="provider-board reveal">
            <div class="provider-board-head">
              <span>{{ currentLang === 'en' ? 'PROVIDER MATRIX' : '服务商矩阵' }}</span>
              <span>28+</span>
            </div>
            <div class="provider-grid">
              <div
                v-for="provider in copy.models.providers"
                :key="provider.name"
                class="provider-chip"
                :data-group="provider.group"
              >
                <span class="provider-dot"></span>
                <span>
                  <strong>{{ provider.name }}</strong>
                  <small>{{ provider.note }}</small>
                </span>
              </div>
            </div>
            <div class="provider-board-foot">
              <AppIcon name="globe" :size="14" />
              {{
                currentLang === 'en'
                  ? 'Any OpenAI-compatible relay can be added as a custom provider.'
                  : '任意 OpenAI 兼容中转站可作为自定义服务接入。'
              }}
            </div>
          </div>
        </div>

        <div class="section-cta-row reveal">
          <a class="button button-secondary" :href="resolveHref(copy.models.cta.href)">
            {{ copy.models.cta.label }}
            <AppIcon name="arrow" :size="16" />
          </a>
        </div>
      </div>
    </section>

    <section class="section ecosystem-section" aria-labelledby="ecosystem-title">
      <div class="slb-container">
        <header class="section-heading centered reveal">
          <p class="eyebrow">{{ copy.ecosystem.kicker }}</p>
          <h2 id="ecosystem-title">{{ copy.ecosystem.title }}</h2>
          <p>{{ copy.ecosystem.lead }}</p>
        </header>

        <div class="ecosystem-grid">
          <article
            v-for="(column, index) in copy.ecosystem.columns"
            :key="column.title"
            class="ecosystem-card reveal"
            :style="{ '--delay': `${index * 80}ms` }"
          >
            <span class="ecosystem-icon"><AppIcon :name="column.icon" :size="23" /></span>
            <h3>{{ column.title }}</h3>
            <p>{{ column.body }}</p>
            <ul>
              <li v-for="item in column.items" :key="item">
                <AppIcon name="check" :size="14" />
                {{ item }}
              </li>
            </ul>
            <a class="text-link" :href="resolveHref(column.href)">
              {{ column.linkLabel }}
              <AppIcon name="arrow" :size="15" />
            </a>
          </article>
        </div>

        <div class="plugin-strip reveal">
          <div class="plugin-strip-label">
            <AppIcon name="plugins" :size="18" />
            <span>{{ copy.ecosystem.pluginsTitle }}</span>
          </div>
          <div class="plugin-pills">
            <span v-for="plugin in copy.ecosystem.plugins" :key="plugin">{{ plugin }}</span>
          </div>
          <a class="text-link" :href="resolveHref(copy.ecosystem.cta.href)">
            {{ copy.ecosystem.cta.label }}
            <AppIcon name="arrow" :size="15" />
          </a>
        </div>
      </div>
    </section>

    <section id="visuals" class="section visuals-section" aria-labelledby="visuals-title">
      <div class="slb-container">
        <header class="section-heading split-heading reveal">
          <div>
            <p class="eyebrow">{{ copy.visuals.kicker }}</p>
            <h2 id="visuals-title">{{ copy.visuals.title }}</h2>
          </div>
          <p>{{ copy.visuals.lead }}</p>
        </header>

        <div class="visual-grid">
          <figure
            v-for="(item, index) in copy.visuals.items"
            :key="item.src"
            class="visual-card reveal"
            :class="item.className"
            :style="{ '--delay': `${index * 70}ms` }"
          >
            <div class="visual-media">
              <img
                :src="withBase(`/${item.src}`)"
                :alt="item.alt"
                :width="item.className === 'visual-wide' ? 1600 : 1600"
                :height="item.className === 'visual-wide' ? 800 : 950"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption>{{ item.caption }}</figcaption>
          </figure>
        </div>
        <p class="visual-note reveal">
          <span aria-hidden="true">i</span>
          {{ copy.visuals.note }}
        </p>
      </div>
    </section>

    <section id="download" class="section download-section" aria-labelledby="download-title">
      <div class="download-glow" aria-hidden="true"></div>
      <div class="slb-container">
        <header class="section-heading centered reveal">
          <p class="eyebrow">{{ copy.download.kicker }}</p>
          <h2 id="download-title">{{ copy.download.title }}</h2>
          <p>{{ copy.download.lead }}</p>
        </header>

        <div class="download-grid">
          <article
            v-for="(platform, index) in copy.download.platforms"
            :key="platform.name"
            class="download-card reveal"
            :style="{ '--delay': `${index * 70}ms` }"
          >
            <div class="download-card-top">
              <span class="download-icon"><AppIcon :name="platform.icon" :size="26" /></span>
              <span class="download-index">0{{ index + 1 }}</span>
            </div>
            <h3>{{ platform.name }}</h3>
            <p class="download-arch">{{ platform.arch }}</p>
            <p class="download-format">{{ platform.formats }}</p>
            <p class="download-note">{{ platform.note }}</p>
          </article>
        </div>

        <div class="download-action reveal">
          <a
            class="button button-primary button-large"
            :href="copy.download.cta.href"
            target="_blank"
            rel="noopener"
          >
            {{ copy.download.cta.label }}
            <AppIcon name="external" :size="17" />
          </a>
          <p>{{ copy.download.note }}</p>
        </div>
      </div>
    </section>

    <section id="faq" class="section faq-section" aria-labelledby="faq-title">
      <div class="slb-container">
        <header class="section-heading split-heading reveal">
          <div>
            <p class="eyebrow">{{ copy.faq.kicker }}</p>
            <h2 id="faq-title">{{ copy.faq.title }}</h2>
          </div>
          <p>{{ copy.faq.lead }}</p>
        </header>

        <div class="faq-layout">
          <div class="faq-list reveal">
            <details v-for="(item, index) in copy.faq.items" :key="item.q" class="faq-item">
              <summary>
                <span class="faq-number">0{{ index + 1 }}</span>
                <span class="faq-question">{{ item.q }}</span>
                <span class="faq-toggle" aria-hidden="true"></span>
              </summary>
              <div class="faq-answer"><p>{{ item.a }}</p></div>
            </details>
          </div>

          <div class="faq-aside reveal">
            <div class="faq-aside-mark"><AppIcon name="radar" :size="30" /></div>
            <h3>{{ currentLang === 'en' ? 'Need more detail?' : '还有更多问题？' }}</h3>
            <p>
              {{
                currentLang === 'en'
                  ? 'The full FAQ covers installation, licensing, privacy, and safety boundaries. The documentation has a troubleshooting table.'
                  : '完整 FAQ 覆盖安装、授权、隐私与安全边界；文档页提供常见故障排查表。'
              }}
            </p>
            <a class="button button-secondary" :href="resolveHref(copy.faq.cta.href)">
              {{ copy.faq.cta.label }}
              <AppIcon name="arrow" :size="16" />
            </a>
            <div class="faq-aside-links">
              <a href="https://github.com/joyfulneurob/SLB-Agent/issues" target="_blank" rel="noopener">
                <AppIcon name="github" :size="16" />
                GitHub Issues
              </a>
              <a href="https://t.me/jiaoliuqunsbl" target="_blank" rel="noopener">
                <AppIcon name="telegram" :size="16" />
                Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
