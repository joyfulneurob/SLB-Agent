<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import AppIcon from './AppIcon.vue'

const props = withDefaults(defineProps<{ mobile?: boolean }>(), { mobile: false })
const { page, lang } = useData()

const isEnglish = computed(() => lang.value.startsWith('en'))
const label = computed(() => (isEnglish.value ? '中文' : 'English'))
const ariaLabel = computed(() =>
  isEnglish.value ? '切换到中文网站' : 'Switch to the English website'
)
const targetHreflang = computed(() => (isEnglish.value ? 'zh-CN' : 'en'))

const href = computed(() => {
  const relativePath = page.value.relativePath || 'index.md'
  if (relativePath === '404.md') {
    return withBase(isEnglish.value ? '/' : '/en/')
  }
  if (relativePath === 'index.md') return withBase('/en/')
  if (relativePath === 'en/index.md') return withBase('/')

  if (relativePath.startsWith('en/')) {
    return withBase(`/${relativePath.slice(3).replace(/\.md$/, '.html')}`)
  }
  return withBase(`/en/${relativePath.replace(/\.md$/, '.html')}`)
})
</script>

<template>
  <a
    class="lang-switch"
    :class="{ 'lang-switch-mobile': props.mobile }"
    :href="href"
    :aria-label="ariaLabel"
    :title="ariaLabel"
    :hreflang="targetHreflang"
  >
    <AppIcon name="globe" :size="15" />
    <span>{{ label }}</span>
  </a>
</template>

<style scoped>
.lang-switch {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  margin-left: 10px;
  padding: 0 11px;
  border: 1px solid var(--slb-line);
  border-radius: 999px;
  color: var(--slb-text-2);
  background: color-mix(in srgb, var(--slb-surface) 65%, transparent);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.lang-switch:hover {
  color: var(--slb-text);
  border-color: color-mix(in srgb, var(--slb-violet) 45%, transparent);
  background: color-mix(in srgb, var(--slb-violet) 10%, transparent);
}

.lang-switch-mobile {
  width: 100%;
  height: 44px;
  margin: 16px 0 0;
  justify-content: center;
  font-size: 14px;
}
</style>
