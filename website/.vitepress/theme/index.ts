import DefaultTheme from 'vitepress/theme-without-fonts'
import type { App } from 'vue'
import Layout from './Layout.vue'
import HomePage from './components/HomePage.vue'
import DetailPage from './components/DetailPage.vue'
import NotFoundPage from './components/NotFoundPage.vue'
import './styles/custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }: { app: App }) {
    app.component('HomePage', HomePage)
    app.component('DetailPage', DetailPage)
    app.component('NotFoundPage', NotFoundPage)
  }
}
