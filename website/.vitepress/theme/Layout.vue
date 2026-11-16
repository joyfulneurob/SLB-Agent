<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme-without-fonts'
import AmbientBackground from './components/AmbientBackground.vue'
import LangSwitch from './components/LangSwitch.vue'
import SiteFooter from './components/SiteFooter.vue'

let scheduled = false

function syncScrollState() {
  if (scheduled) return
  scheduled = true
  window.requestAnimationFrame(() => {
    const scrolled = window.scrollY > 8
    document.documentElement.classList.toggle('slb-scrolled', scrolled)
    scheduled = false
  })
}

onMounted(() => {
  syncScrollState()
  window.addEventListener('scroll', syncScrollState, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', syncScrollState)
})
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-top>
      <AmbientBackground />
    </template>
    <template #nav-bar-content-after>
      <LangSwitch />
    </template>
    <template #nav-screen-content-after>
      <LangSwitch mobile />
    </template>
    <template #layout-bottom>
      <SiteFooter />
    </template>
  </DefaultTheme.Layout>
</template>
