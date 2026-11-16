<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { getDetailPage } from '../../data/details'
import AppIcon from './AppIcon.vue'

const props = defineProps<{ id: string }>()
const { lang } = useData()
const currentLang = computed(() => (lang.value.startsWith('en') ? 'en' : 'zh'))
const isEnglish = computed(() => currentLang.value === 'en')
const pageCopy = computed(() => getDetailPage(props.id, currentLang.value))
const root = ref<HTMLElement>()
let observer: IntersectionObserver | undefined

function resolveHref(href: string): string {
  if (/^https?:\/\//.test(href) || href.startsWith('#')) return href
  return withBase(`/${href.replace(/^\.?\//, '')}`)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderInline(value: string): string {
  let html = escapeHtml(value)
  html = html.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener">$1</a>'
  )
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  return html
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
    { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
  )
  nodes.forEach((node) => observer?.observe(node))
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <main ref="root" class="detail-page">
    <header class="detail-hero">
      <div class="detail-grid-lines" aria-hidden="true"></div>
      <div class="detail-glow" aria-hidden="true"></div>
      <div class="slb-container">
        <nav class="breadcrumbs" :aria-label="isEnglish ? 'Breadcrumb' : '面包屑导航'">
          <a :href="withBase(isEnglish ? '/en/' : '/')">{{ isEnglish ? 'Home' : '首页' }}</a>
          <span aria-hidden="true">/</span>
          <span>{{ pageCopy.eyebrow.split('/')[0].trim() }}</span>
        </nav>

        <p class="eyebrow">{{ pageCopy.eyebrow }}</p>
        <h1>{{ pageCopy.title }}</h1>
        <p class="detail-lead">{{ pageCopy.lead }}</p>

        <ul v-if="pageCopy.meta?.length" class="detail-meta">
          <li v-for="item in pageCopy.meta" :key="item">{{ item }}</li>
        </ul>

        <div v-if="pageCopy.ctas?.length" class="detail-actions">
          <a
            v-for="cta in pageCopy.ctas"
            :key="cta.label"
            class="button"
            :class="`button-${cta.variant || 'secondary'}`"
            :href="resolveHref(cta.href)"
            :target="/^https?:\/\//.test(cta.href) ? '_blank' : undefined"
            :rel="/^https?:\/\//.test(cta.href) ? 'noopener' : undefined"
          >
            {{ cta.label }}
            <AppIcon
              :name="/^https?:\/\//.test(cta.href) ? 'external' : 'arrow'"
              :size="16"
            />
          </a>
        </div>
      </div>
    </header>

    <div class="slb-container detail-layout">
      <nav class="detail-toc" :aria-label="isEnglish ? 'On this page' : '本页目录'">
        <p>{{ isEnglish ? 'On this page' : '本页目录' }}</p>
        <a v-for="(section, index) in pageCopy.sections" :key="section.id" :href="`#${section.id}`">
          <span>0{{ index + 1 }}</span>
          {{ section.title }}
        </a>
        <a v-if="pageCopy.closing" href="#page-next">
          <span>→</span>
          {{ isEnglish ? 'Next step' : '下一步' }}
        </a>
      </nav>

      <div class="detail-content">
        <section
          v-for="(section, sectionIndex) in pageCopy.sections"
          :id="section.id"
          :key="section.id"
          class="detail-section reveal"
        >
          <header class="detail-section-head">
            <span class="section-index">0{{ sectionIndex + 1 }}</span>
            <div>
              <p v-if="section.kicker" class="eyebrow">{{ section.kicker }}</p>
              <h2>{{ section.title }}</h2>
              <p v-if="section.lead" class="section-lead">{{ section.lead }}</p>
            </div>
          </header>

          <template v-for="(block, blockIndex) in section.blocks" :key="blockIndex">
            <div v-if="block.type === 'cards'" class="feature-grid" :data-columns="block.columns || 3">
              <component
                :is="item.href ? 'a' : 'div'"
                v-for="item in block.items"
                :key="item.title"
                class="feature-card"
                :class="{ 'feature-card-link': Boolean(item.href) }"
                :href="item.href ? resolveHref(item.href) : undefined"
              >
                <span v-if="item.icon" class="feature-icon"><AppIcon :name="item.icon" :size="21" /></span>
                <h3>{{ item.title }}</h3>
                <p>{{ item.body }}</p>
                <div v-if="item.tags?.length" class="feature-tags">
                  <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
                </div>
                <span v-if="item.linkLabel" class="feature-link">
                  {{ item.linkLabel }}
                  <AppIcon name="arrow" :size="14" />
                </span>
              </component>
            </div>

            <ol v-else-if="block.type === 'steps'" class="step-list">
              <li v-for="step in block.items" :key="step.title">
                <span class="step-number">{{ step.no || '→' }}</span>
                <div>
                  <h3>{{ step.title }}</h3>
                  <p>{{ step.body }}</p>
                  <code v-if="step.tool" class="step-tool">{{ step.tool }}</code>
                </div>
              </li>
            </ol>

            <figure v-else-if="block.type === 'table'" class="table-wrap">
              <figcaption v-if="block.table.caption">{{ block.table.caption }}</figcaption>
              <div class="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th v-for="header in block.table.headers" :key="header" scope="col">{{ header }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, rowIndex) in block.table.rows" :key="rowIndex">
                      <td
                        v-for="(cell, cellIndex) in row"
                        :key="cellIndex"
                        v-html="renderInline(cell)"
                      ></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </figure>

            <div v-else-if="block.type === 'prose'" class="prose-block">
              <p v-for="paragraph in block.paragraphs" :key="paragraph">{{ paragraph }}</p>
              <ul v-if="block.bullets?.length">
                <li v-for="bullet in block.bullets" :key="bullet">{{ bullet }}</li>
              </ul>
              <pre v-if="block.code"><code>{{ block.code }}</code></pre>
            </div>

            <div
              v-else-if="block.type === 'notice'"
              class="notice"
              :class="`notice-${block.tone || 'info'}`"
              role="note"
            >
              <span class="notice-icon"><AppIcon :name="block.tone === 'warn' ? 'radar' : 'check'" :size="18" /></span>
              <div>
                <h3>{{ block.title }}</h3>
                <p>{{ block.body }}</p>
              </div>
            </div>

            <div v-else-if="block.type === 'faq'" class="detail-faq">
              <details v-for="(item, index) in block.items" :key="item.q" class="faq-item">
                <summary>
                  <span class="faq-number">0{{ index + 1 }}</span>
                  <span class="faq-question">{{ item.q }}</span>
                  <span class="faq-toggle" aria-hidden="true"></span>
                </summary>
                <div class="faq-answer"><p>{{ item.a }}</p></div>
              </details>
            </div>

            <div v-else-if="block.type === 'links'" class="link-grid">
              <a
                v-for="item in block.items"
                :key="item.href"
                class="resource-link"
                :href="item.href"
                :target="item.external ? '_blank' : undefined"
                :rel="item.external ? 'noopener' : undefined"
              >
                <span>
                  <strong>{{ item.title }}</strong>
                  <small>{{ item.body }}</small>
                </span>
                <AppIcon :name="item.external ? 'external' : 'arrow'" :size="16" />
              </a>
            </div>
          </template>
        </section>

        <section v-if="pageCopy.closing" id="page-next" class="closing-cta reveal">
          <div>
            <p class="eyebrow">{{ pageCopy.closing.kicker || 'NEXT' }}</p>
            <h2>{{ pageCopy.closing.title }}</h2>
            <p>{{ pageCopy.closing.body }}</p>
          </div>
          <div class="closing-actions">
            <a
              v-for="cta in pageCopy.closing.ctas"
              :key="cta.label"
              class="button"
              :class="`button-${cta.variant || 'secondary'}`"
              :href="resolveHref(cta.href)"
              :target="/^https?:\/\//.test(cta.href) ? '_blank' : undefined"
              :rel="/^https?:\/\//.test(cta.href) ? 'noopener' : undefined"
            >
              {{ cta.label }}
              <AppIcon :name="/^https?:\/\//.test(cta.href) ? 'external' : 'arrow'" :size="16" />
            </a>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>
