<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import AppIcon from './AppIcon.vue'

const { lang } = useData()
const pathWantsEnglish = ref(false)
const isEnglish = computed(() => pathWantsEnglish.value || lang.value.startsWith('en'))

onMounted(() => {
  pathWantsEnglish.value = window.location.pathname.startsWith(withBase('/en/'))
})
</script>

<template>
  <main class="not-found-page">
    <div class="slb-container">
      <p class="eyebrow">404 / NOT FOUND</p>
      <h1>{{ isEnglish ? 'This page drifted out of context.' : '这个页面不在上下文里。' }}</h1>
      <p>
        {{
          isEnglish
            ? 'The address may have changed, or the page never existed. Start again from the home page or jump to the download page.'
            : '地址可能已经变化，或者这个页面从未存在。可以回到首页，或直接前往下载页。'
        }}
      </p>
      <div class="not-found-actions">
        <a class="button button-primary" :href="withBase(isEnglish ? '/en/' : '/')">
          {{ isEnglish ? 'Back home' : '返回首页' }}
          <AppIcon name="arrow" :size="16" />
        </a>
        <a class="button button-secondary" :href="withBase(isEnglish ? '/en/download.html' : '/download.html')">
          {{ isEnglish ? 'Download' : '下载' }}
          <AppIcon name="download" :size="16" />
        </a>
      </div>
      <p class="not-found-links">
        <a :href="withBase(isEnglish ? '/en/docs.html' : '/docs.html')">{{ isEnglish ? 'Documentation' : '文档' }}</a>
        <span aria-hidden="true">·</span>
        <a :href="withBase(isEnglish ? '/en/faq.html' : '/faq.html')">FAQ</a>
        <span aria-hidden="true">·</span>
        <a href="https://github.com/joyfulneurob/SLB-Agent">GitHub</a>
      </p>
    </div>
  </main>
</template>
