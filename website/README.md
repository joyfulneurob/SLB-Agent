# SLB-Agent 官方网站

中英双语官方网站，使用 VitePress + Vue 3 + TypeScript 构建，通过 GitHub Actions 部署到 GitHub Pages。

- 中文站点：<https://joyfulneurob.github.io/SLB-Agent/>
- 英文站点：<https://joyfulneurob.github.io/SLB-Agent/en/>
- 最新下载：<https://github.com/joyfulneurob/SLB-Agent/releases/latest>
- Sitemap：<https://joyfulneurob.github.io/SLB-Agent/sitemap.xml>

## 技术栈与约束

- VitePress 1.6、Vue 3、TypeScript
- 静态部署，无服务器、无数据库、无密钥
- GitHub Pages 项目子路径：`/SLB-Agent/`
- 中文为默认语言，英文位于 `/en/`
- `cleanUrls: false`：GitHub Pages 不提供无扩展名重写，页面 URL 统一使用 `.html`
- 页面内容来源于仓库现有 `README.md`、`README_EN.md`、`RELEASE_NOTES_v1.1.15.md` 与 `docs/images/`
- 不修改仓库根目录 README、客户端源码、安装包、Release 或 `docs/images/`

## 目录结构

```text
website/
├── .vitepress/
│   ├── config.mts              # i18n、导航、canonical、hreflang、OG、结构化数据
│   ├── data/
│   │   ├── home.ts             # 首页中英文文案与数据
│   │   └── details.ts          # 10 个详情页的中英文内容
│   └── theme/
│       ├── index.ts            # 自定义主题入口
│       ├── Layout.vue          # 固定导航、语言切换、全局页脚
│       ├── components/         # HomePage、DetailPage、SiteFooter、LangSwitch、AppIcon
│       └── styles/custom.css   # 设计系统、明暗主题、响应式与动效
├── public/
│   ├── images/                 # 从 docs/images 优化的 WebP、favicon、社交卡片
│   └── robots.txt
├── scripts/
│   ├── build.mjs               # 一次 Node 进程完成 VitePress 构建 + postbuild
│   ├── routes.mjs              # 中英文页面注册表（sitemap 与校验的唯一来源）
│   ├── postbuild.mjs           # 生成 sitemap.xml、robots.txt、.nojekyll
│   ├── check-links.mjs         # 内部链接与锚点检查
│   └── verify-site.mjs         # SEO、canonical、hreflang、图片 alt、sitemap 校验
├── index.md
├── armor-engine.md
├── models.md
├── mcp.md
├── agent-tools.md
├── apk-analysis.md
├── download.md
├── docs.md
├── faq.md
├── privacy.md
├── terms.md
└── en/                         # 上述页面的一一对应英文版本
```

## 本地开发

要求 Node.js LTS（建议 22 或更新）与 npm。

```bash
cd website
npm ci
npm run dev
```

VitePress 会启动本地开发服务器。访问终端输出的 URL，并确认路径包含 `/SLB-Agent/`。

## 生产构建与校验

```bash
cd website
npm ci
npm run build
npm run verify
```

`npm run build` 执行 `scripts/build.mjs`，在一次 Node 进程中完成两件事：

1. 调用 VitePress 生成静态站点到 `website/.vitepress/dist`
2. 运行 `scripts/postbuild.mjs` 生成 `sitemap.xml`、`robots.txt` 和 `.nojekyll`

`npm run verify` 检查：

- 22 个中英文页面是否全部存在
- 每页是否有唯一 Title、Meta Description、单个 H1 和 H2 结构
- canonical 是否使用正确的 `/SLB-Agent/` 前缀
- `zh-CN`、`en`、`x-default` hreflang 是否互相对应
- OG / Twitter Card 是否存在且 URL 正确
- 图片是否都有非空 alt
- 所有内部链接、静态资源与锚点是否存在
- sitemap 是否只包含真实页面，且每页都有三条 hreflang
- robots.txt、404 noindex、`.nojekyll` 是否存在

只检查链接可运行：

```bash
npm run check:links
```

> `check:links` 与 `verify` 需要先完成生产构建。

## GitHub Pages 自动部署

工作流：`.github/workflows/deploy-pages.yml`

触发条件：

- push 到 `main`
- 在 Actions 页面手动 `workflow_dispatch`

工作流使用：

- Node.js `lts/*`
- `npm ci` + `npm run build`
- `actions/configure-pages@v5`
- `actions/upload-pages-artifact@v3`
- `actions/deploy-pages@v4`
- `pages: write`、`id-token: write` 权限
- `concurrency: pages`，不会并发覆盖部署
- 构建目录 `website/.vitepress/dist`

### 首次部署步骤

1. 在仓库 **Settings → Pages → Build and deployment** 中，把 **Source** 设为 **GitHub Actions**。
2. 合并/推送到 `main`，或在 **Actions → Deploy website to GitHub Pages → Run workflow** 手动运行。
3. 等待 build 与 deploy 两个 job 成功。
4. 打开 <https://joyfulneurob.github.io/SLB-Agent/>，确认：
   - 中文首页 `/SLB-Agent/`
   - 英文首页 `/SLB-Agent/en/`
   - 下载页 `/SLB-Agent/download.html`
   - `sitemap.xml` 与 `robots.txt` 可访问

如果仓库原本使用 “Deploy from a branch”，请先切换为 GitHub Actions，避免旧分支部署覆盖新站点。仓库当前没有其他 Pages 工作流。

工作流不包含任何密钥。Google 验证使用 **Repository Variables**，不是 Secret。

## Google Search Console 配置

### 方式一：Meta Tag（推荐）

1. 打开 [Google Search Console](https://search.google.com/search-console/)。
2. 添加 **URL prefix** 资源：`https://joyfulneurob.github.io/SLB-Agent/`。
3. 选择 **HTML tag** 验证，复制 `content="..."` 中的值。
4. 在 GitHub 仓库 **Settings → Secrets and variables → Actions → Variables** 新建变量：
   - Name: `GOOGLE_SITE_VERIFICATION`
   - Value: 上一步的 content 值
5. 重新运行 Pages 工作流。构建时会在所有页面注入：

```html
<meta name="google-site-verification" content="..." />
```

6. 回到 Search Console 点击验证。

### 方式二：HTML 文件

在仓库 Variables 中增加：

- `GOOGLE_SITE_VERIFICATION_HTML_FILENAME`：例如 `google1234567890abcdef.html`
- `GOOGLE_SITE_VERIFICATION_HTML_CONTENT`：Search Console 提供的完整 HTML 内容

重新构建后，`postbuild.mjs` 会把文件写入站点根目录：

`https://joyfulneurob.github.io/SLB-Agent/google1234567890abcdef.html`

### 提交 Sitemap

在 Search Console → **Sitemaps** 提交：

```text
https://joyfulneurob.github.io/SLB-Agent/sitemap.xml
```

Bing Webmaster Tools 可以直接导入 Search Console，或单独提交同一 Sitemap。

### 验证后建议

- 用 **URL Inspection** 请求收录首页、Armor Engine、下载页、英文首页。
- 在 **Page indexing** 查看是否有 “Duplicate, Google chose different canonical” 或 hreflang 报错。
- Sitemap 只包含真实存在的 22 个 URL，不含 404。
- 如果自定义域名或仓库名变化，必须同步修改 `website/.vitepress/config.mts`、`website/scripts/routes.mjs` 和 `public/robots.txt` 中的站点路径。

## SEO 实现位置

| 需求 | 实现 |
|---|---|
| 独立 Title / Description | 每个 `.md` 的 frontmatter |
| canonical | `.vitepress/config.mts` 的 `transformHead` |
| hreflang | 同一处，按 `zh-CN` / `en` / `x-default` 成对生成 |
| Open Graph / Twitter Card | `transformHead` + 全局 `head` |
| 结构化数据 | 首页 `SoftwareApplication` / `WebSite`，FAQ 页 `FAQPage` |
| sitemap.xml | `scripts/postbuild.mjs` + `scripts/routes.mjs` |
| robots.txt | `public/robots.txt` 和 postbuild 双重保证 |
| 404 noindex | `transformHead` |
| 图片 alt | 首页视觉素材和所有图片均提供描述性 alt |
| 移动端 | 自定义响应式断点，390px 宽度无水平滚动 |
| 可访问性 | 语义化标题、键盘可操作控件、焦点样式、`prefers-reduced-motion` |

## 更新网站

### 修改文案

- 首页：`website/.vitepress/data/home.ts`
- 详情页：`website/.vitepress/data/details.ts`
- 页面 Title / Description：对应的 `website/*.md` 或 `website/en/*.md` frontmatter
- 导航与页脚：`website/.vitepress/config.mts`、`website/.vitepress/theme/components/SiteFooter.vue`

修改后运行：

```bash
cd website
npm run build
npm run verify
```

### 替换图片

1. 把新图片放入 `website/public/images/`
2. 在 `home.ts` 的 `visuals.items` 中更新 `src`、`alt`、`caption`
3. 保持 alt 描述真实内容，不要把概念图标注为软件截图
4. 如需社交分享图，更新 `public/images/social-card.jpg`（建议 1200×630）

### 新增页面

1. 新建中文 `website/foo.md` 与英文 `website/en/foo.md`
2. 两个文件都写独立 frontmatter：

```yaml
---
layout: page
title: "页面标题 | SLB-Agent"
description: "唯一描述"
---
<DetailPage id="foo" />
```

3. 在 `.vitepress/data/details.ts` 增加 `foo` 的中英文内容
4. 在 `scripts/routes.mjs` 的 `pagePairs` 增加一对路径
5. 在 `.vitepress/config.mts` 导航与 `SiteFooter.vue` 中加入入口
6. 运行 `npm run build && npm run verify`

只添加 `.md` 而忘记更新 `routes.mjs`，`verify` 会报告未注册页面，sitemap 也不会包含它。

### 升级 VitePress

```bash
cd website
npm update vitepress vue
npm run build
npm run verify
```

提交前检查 `package-lock.json` 变化与构建结果。

## 素材与准确性说明

- 首页视觉区使用 `docs/images/` 中的官方宣传素材，并明确标注为 **官方视觉 / 非软件运行截图**。
- 仓库目前没有可核验的实机截图，因此没有用生成的概念图冒充软件截图。
- 文案只使用 README / Release Notes 已记录的能力，不引用未经复核的成功率数据。
- 涉及 Armor Engine、红队、APK 逆向和越权测试的内容均写明授权边界与免责声明。
- 仓库根 README、`README_EN.md`、Release Notes、`docs/images`、安装包与 Release 均未改动。

## 常见问题

**构建后页面样式 404？**  
确认 `base` 为 `/SLB-Agent/`，并通过 `npm run build` 而不是直接打开 `dist/index.html`。静态资源使用绝对 base 路径，必须通过 HTTP 服务器访问。

**GitHub Pages 显示 404？**  
确认 Settings → Pages 的 Source 是 GitHub Actions；检查 deploy job 的 `page_url`；确认 `website/.vitepress/dist` 已完整上传。

**英文页面 canonical 指向中文？**  
检查 `.vitepress/config.mts` 的 `localeAlternates`，并运行 `npm run verify`。

**Google 验证失败？**  
确认 Repository Variable 名称完全为 `GOOGLE_SITE_VERIFICATION`，重新运行工作流后查看页面源码中是否存在 meta 标签。

## License

网站源码与文档遵循仓库根目录的 MIT License。SLB-Agent 客户端及其内置组件另有授权与使用条款。
