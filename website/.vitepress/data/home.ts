export type Lang = 'zh' | 'en'

export interface CtaLink {
  label: string
  href: string
  external?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
}

export interface Capability {
  icon: string
  title: string
  body: string
  href: string
  tag: string
}

export interface HomeCopy {
  hero: {
    eyebrow: string
    brand: string
    title: string
    titleAccent: string
    lead: string
    ctas: CtaLink[]
    micro: string[]
    panel: {
      label: string
      session: string
      lines: Array<{ kind: 'cmd' | 'ok' | 'warn' | 'info' | 'muted'; text: string }>
      status: string
    }
  }
  proof: Array<{ value: string; label: string }>
  capabilities: {
    kicker: string
    title: string
    lead: string
    items: Capability[]
  }
  armor: {
    kicker: string
    title: string
    lead: string
    stats: Array<{ value: string; label: string }>
    steps: Array<{ no: string; title: string; body: string; tool: string }>
    note: string
    cta: CtaLink
  }
  models: {
    kicker: string
    title: string
    lead: string
    providers: Array<{ name: string; note: string; group: 'frontier' | 'china' | 'local' | 'gateway' }>
    protocols: Array<{ title: string; body: string; tag: string }>
    note: string
    cta: CtaLink
  }
  ecosystem: {
    kicker: string
    title: string
    lead: string
    columns: Array<{
      icon: string
      title: string
      body: string
      items: string[]
      href: string
      linkLabel: string
    }>
    pluginsTitle: string
    plugins: string[]
    cta: CtaLink
  }
  visuals: {
    kicker: string
    title: string
    lead: string
    note: string
    items: Array<{ src: string; alt: string; caption: string; className?: string }>
  }
  download: {
    kicker: string
    title: string
    lead: string
    platforms: Array<{
      icon: string
      name: string
      arch: string
      formats: string
      note: string
    }>
    cta: CtaLink
    note: string
  }
  faq: {
    kicker: string
    title: string
    lead: string
    items: Array<{ q: string; a: string }>
    cta: CtaLink
  }
}

const releases = 'https://github.com/joyfulneurob/SLB-Agent/releases/latest'
const repo = 'https://github.com/joyfulneurob/SLB-Agent'
const telegram = 'https://t.me/jiaoliuqunsbl'

export const home: Record<Lang, HomeCopy> = {
  zh: {
    hero: {
      eyebrow: 'LOCAL-FIRST · DESKTOP AI AGENT',
      brand: 'SLB-Agent',
      title: '一个核心，',
      titleAccent: '接入所有 AI',
      lead: '支持 Claude、GPT、Gemini、DeepSeek、GLM、Kimi、Ollama 等模型的桌面 AI Agent，集成 Armor Engine、MCP 工具、文件操作、命令执行及安全研究工作流。',
      ctas: [
        { label: '立即下载', href: releases, external: true, variant: 'primary' },
        { label: 'GitHub 仓库', href: repo, external: true, variant: 'secondary' },
        { label: '探索功能', href: '#capabilities', variant: 'ghost' }
      ],
      micro: ['Windows · macOS · Linux', '本地优先', '无账号体系'],
      panel: {
        label: 'WORKFLOW ILLUSTRATION / 流程示意',
        session: 'slb-agent · armor session',
        lines: [
          { kind: 'cmd', text: 'armor_get  model="claude"  scene="engineering"' },
          { kind: 'ok', text: 'injection pack ready · system core + per-turn trailer' },
          { kind: 'cmd', text: 'armor_probe  reply="I cannot assist with that"' },
          { kind: 'warn', text: 'refused · pattern classified · remedy available' },
          { kind: 'cmd', text: 'armor_fix  +  armor_audit  +  armor_drift' },
          { kind: 'info', text: 'delivery checklist · assumptions / commands / readouts' },
          { kind: 'muted', text: 'illustrative workflow — no model is guaranteed to comply' }
        ],
        status: 'ARMOR ENGINE / 9 TOOLS'
      }
    },
    proof: [
      { value: '28+', label: 'README 记录的服务商' },
      { value: '9', label: 'armor_* MCP 工具' },
      { value: '124', label: '红队技能文件' },
      { value: '3', label: '桌面平台' }
    ],
    capabilities: {
      kicker: 'CORE CAPABILITIES',
      title: '一个 Agent，\n覆盖接入、执行与研究工作流',
      lead: '从模型接入到真实文件操作，从 MCP 工具到安全研究，一个本地桌面客户端串起完整链路。',
      items: [
        {
          icon: 'shield',
          title: 'Armor Engine',
          body: '有状态的 MCP 工具引擎，覆盖注入包、探针、拒绝对症、升档、质检与漂移检测。',
          href: 'armor-engine.html',
          tag: '9 个工具'
        },
        {
          icon: 'layers',
          title: '多模型 API 接入',
          body: 'OpenAI 兼容、Anthropic、Gemini 三协议，README 记录 28+ 家服务商与任意中转站。',
          href: 'models.html',
          tag: '3 种协议'
        },
        {
          icon: 'plugins',
          title: 'MCP 插件生态',
          body: 'stdio 与 Streamable HTTP / SSE；界面添加或导入 Claude Desktop / Cursor 配置。',
          href: 'mcp.html',
          tag: 'MCP Client'
        },
        {
          icon: 'terminal',
          title: 'Agent 文件与终端工具',
          body: '目录浏览、读写文件、正则搜索、精确编辑、命令执行、网页抓取与待办管理。',
          href: 'agent-tools.html',
          tag: '真执行'
        },
        {
          icon: 'checkpoint',
          title: '检查点与文件回滚',
          body: '回滚到任意消息之前，Agent 修改过的文件同步恢复；写文件前先看 Diff。',
          href: 'agent-tools.html#checkpoints',
          tag: '可回退'
        },
        {
          icon: 'phone',
          title: 'APK 分析',
          body: '内置逆向分析插件：APK 体检、脱壳、jadx 反编译，以及源码目录密钥与接口扫描。',
          href: 'apk-analysis.html',
          tag: '逆向工具链'
        },
        {
          icon: 'radar',
          title: '红队安全研究',
          body: '资产、漏洞、CVE、载荷、WAF、隧道与报告生成，配套 124 个技能文件。仅限授权测试。',
          href: 'agent-tools.html#security',
          tag: '授权场景'
        },
        {
          icon: 'lock',
          title: '本地数据与隐私',
          body: 'API Key 交由系统钥匙串加密；无云端账号、无遥测、会话数据留在本机。',
          href: 'privacy.html',
          tag: 'Local-first'
        }
      ]
    },
    armor: {
      kicker: 'ARMOR ENGINE / 破限内核',
      title: '把拒绝处理，变成一条可追踪的工程链路',
      lead: '不是一段静态提示词。Armor Engine 以 MCP 工具承载状态，根据模型族与场景生成注入包，评估回复配合度，对拒绝形态给出补救动作，并在连续被拒时升级策略。',
      stats: [
        { value: '4', label: '强度档位' },
        { value: '11', label: '模型族' },
        { value: '22', label: '拒绝形态' },
        { value: '5', label: '注入通道' }
      ],
      steps: [
        {
          no: '01',
          title: '识别模型与场景',
          body: '按 Anthropic、OpenAI、Google、DeepSeek、GLM、Kimi、Qwen 等模型族选择打法，并区分工程、创作与数据场景。',
          tool: 'armor_status'
        },
        {
          no: '02',
          title: '生成注入包',
          body: '输出 system 内核、尾部重申、预填充、探针与注入协议，宿主侧每轮自动重申。',
          tool: 'armor_get'
        },
        {
          no: '03',
          title: '探针与拒绝对症',
          body: '把回复判定为 compliant / partial / refused / unclear；命中拒绝形态后给出可重发的补救话术。',
          tool: 'armor_probe · armor_fix'
        },
        {
          no: '04',
          title: '升级与重组',
          body: '连续被拒时升一档强度，替换族条款、编码变体与拆解方案，输出完整重发提示词。',
          tool: 'armor_escalate · armor_pick'
        },
        {
          no: '05',
          title: '质检与漂移检测',
          body: '检查交付材料是否完整、话术是否降级，并用 0–100 漂移分发现长会话回退。',
          tool: 'armor_audit · armor_drift'
        }
      ],
      note: 'Armor Engine 不承诺任何模型一定配合，也不保证绕过模型安全机制。模型输出可能错误、过时或具有风险，请自行核验，并仅在合法授权范围内使用。',
      cta: { label: '了解 Armor Engine', href: 'armor-engine.html', variant: 'secondary' }
    },
    models: {
      kicker: 'MULTI-MODEL AI',
      title: '一个客户端，接上你已经在用的模型',
      lead: '一个多模型 AI 客户端，预置 28+ 家服务商目录与三套协议。选厂商、打开密钥页、粘贴 Key、测试连接、拉取模型列表——接入过程在图形向导里完成。',
      providers: [
        { name: 'Claude', note: 'Anthropic', group: 'frontier' },
        { name: 'GPT', note: 'OpenAI', group: 'frontier' },
        { name: 'Gemini', note: 'Google', group: 'frontier' },
        { name: 'Grok', note: 'xAI', group: 'frontier' },
        { name: 'DeepSeek', note: 'DeepSeek', group: 'china' },
        { name: 'GLM', note: '智谱', group: 'china' },
        { name: 'Kimi', note: 'Moonshot', group: 'china' },
        { name: 'Qwen', note: '通义', group: 'china' },
        { name: 'Doubao', note: '豆包', group: 'china' },
        { name: 'Ollama', note: '本地模型', group: 'local' },
        { name: 'LM Studio', note: '本地模型', group: 'local' },
        { name: 'OpenRouter', note: '聚合网关', group: 'gateway' }
      ],
      protocols: [
        { title: 'OpenAI 兼容', body: '覆盖 OpenAI 及大量兼容服务商、One-API / New-API 中转站。', tag: 'chat/completions' },
        { title: 'Anthropic', body: '面向 Claude 系列的原生协议接入，支持模型参数配置。', tag: 'Messages API' },
        { title: 'Gemini', body: '面向 Google Gemini 的原生协议接入。', tag: 'GenerateContent' }
      ],
      note: '以上为 README 明确列出的部分服务商；完整目录以客户端内接入向导为准。模型可用性、价格与使用条款由各服务商决定。',
      cta: { label: '查看模型接入', href: 'models.html', variant: 'secondary' }
    },
    ecosystem: {
      kicker: 'MCP + AGENT TOOLS',
      title: '把工具、技能和权限，\n装进同一条工作流',
      lead: 'SLB-Agent 既是标准 MCP 客户端，也提供可直接执行的本地 Agent 工具箱。第三方能力通过 MCP 接入，领域知识通过技能包沉淀。',
      columns: [
        {
          icon: 'plugins',
          title: 'MCP Client',
          body: '支持 stdio 与 Streamable HTTP / SSE。界面添加，或一键导入 Claude Desktop / Cursor 的 mcpServers JSON。',
          items: ['标准 Model Context Protocol 客户端', '导入 mcpServers 配置', '本地与远程 MCP Server', '插件开发规范与示例'],
          href: 'mcp.html',
          linkLabel: 'MCP 与生态'
        },
        {
          icon: 'book',
          title: '技能包',
          body: '用 Markdown 编写技能与常驻规则，兼容 SKILL.md / skills/ 格式；从 GitHub 网址或本地文件导入，对所有模型生效。',
          items: ['SKILL.md 生态格式', 'GitHub 网址一键导入', '红队套件 124 个技能文件', '跨模型生效'],
          href: 'mcp.html#skills',
          linkLabel: '了解技能包'
        },
        {
          icon: 'terminal',
          title: 'Agent 工具箱',
          body: '不止聊天：浏览目录、读写文件、正则搜索、执行 zsh / PowerShell、抓取网页、联网搜索、管理待办。',
          items: ['Diff 预览与四档权限', '检查点 + 文件回滚', '上下文压缩 /compact', '/init 生成项目指令', 'token 与成本可见'],
          href: 'agent-tools.html',
          linkLabel: '探索 Agent 工具'
        }
      ],
      pluginsTitle: '随安装包分发的 6 个 MCP 插件',
      plugins: ['精简版破限', 'VIP 超级破限', '精英版破限（GLM）', '网页爬虫', '逆向分析', '红队作业套件'],
      cta: { label: '查看完整工具生态', href: 'mcp.html', variant: 'ghost' }
    },
    visuals: {
      kicker: 'PRODUCT VISUALS / 产品视觉',
      title: '不只是一张聊天框',
      lead: '用官方视觉素材快速理解产品定位：Armor Engine 在中心，多模型、真执行、MCP、技能包与本地安全围绕它展开。',
      note: '说明：当前仓库未提供软件运行截图。本区展示仓库内的官方宣传视觉，用于呈现产品结构与能力，不将其标注为软件界面截图。获得真实截图后将替换本区素材并明确标注。',
      items: [
        {
          src: 'images/banner.webp',
          alt: 'SLB-Agent 官方宣传图：桌面 AI Agent、本地优先与 Armor Engine 工作流示意，非软件运行截图',
          caption: '官方视觉 · 产品定位与工作流示意',
          className: 'visual-wide'
        },
        {
          src: 'images/unlocked.webp',
          alt: 'SLB-Agent 官方宣传图：Armor Engine 有状态拒绝处理前后流程示意，非软件运行截图',
          caption: '官方视觉 · 拒绝处理链路示意'
        },
        {
          src: 'images/armor-engine.webp',
          alt: 'SLB-Agent 官方宣传图：Armor Engine 的 9 个工具、4 档强度、11 个模型族与注入通道，非软件运行截图',
          caption: '官方视觉 · Armor Engine 能力面板'
        }
      ]
    },
    download: {
      kicker: 'DOWNLOAD',
      title: '选择你的平台，开始使用',
      lead: '安装包统一发布在 GitHub Releases。本站不托管安装包，也不提供绕过 Release 页面的直链。',
      platforms: [
        {
          icon: 'windows',
          name: 'Windows',
          arch: 'Windows 10 / 11 · x64 + x86',
          formats: '.exe 安装包',
          note: '若 SmartScreen 提示，请核对来源后选择「更多信息 → 仍要运行」。'
        },
        {
          icon: 'apple',
          name: 'macOS',
          arch: 'Apple Silicon · Intel',
          formats: '.dmg 磁盘映像',
          note: '按「关于本机」中的芯片选择 M 系列或 Intel 版本。'
        },
        {
          icon: 'local',
          name: 'Linux',
          arch: 'x86_64 · arm64',
          formats: '.deb · .AppImage',
          note: '用 uname -m 确认架构；AppImage 需赋予执行权限。'
        }
      ],
      cta: { label: '前往 GitHub Releases', href: releases, external: true, variant: 'primary' },
      note: '当前 README 记录版本为 v1.1.15，共 7 个安装包；版本号、文件大小与 SHA-256 请以 Releases 页面为准。'
    },
    faq: {
      kicker: 'FAQ',
      title: '开始之前，你可能想知道',
      lead: '安装、API Key、授权、隐私与 Armor Engine 的边界，集中在下面几个问题里。',
      items: [
        {
          q: 'SLB-Agent 是免费的吗？',
          a: '安装包可免费下载，内置试用期。试用期结束后，需要通过离线授权密钥解锁完整功能；授权采用 Ed25519 签名、绑定机器码并在本地验证。具体以 Releases 公告为准。'
        },
        {
          q: '我需要准备 API Key 吗？',
          a: '除本地模型外，云端模型需要对应服务商的 API Key。接入向导中每家厂商都有密钥页面入口；如果希望完全离线，可以用 Ollama 在本地运行模型。'
        },
        {
          q: 'Armor Engine 能保证模型一定配合吗？',
          a: '不能。它提供的是有状态的注入、探针、拒绝对症、升档、质检与漂移检测工具链，不承诺任何模型一定配合，也不保证绕过安全机制。输出仍需自行核验。'
        },
        {
          q: '我的 API Key 和会话数据存在哪里？',
          a: 'API Key 只保存在本机：macOS 使用 Keychain，Windows 使用 DPAPI 加密。客户端无云端账号体系、无遥测、不上传会话；会话可导出为 Markdown / JSON，卸载即清空。'
        },
        {
          q: '支持哪些操作系统？',
          a: '当前 Releases 提供 Windows 10/11、macOS（Apple Silicon / Intel）以及 Linux（x64 / arm64，deb / AppImage）安装包。具体系统兼容性以对应 Release 说明为准。'
        },
        {
          q: '网站为什么没有放软件截图？',
          a: '当前仓库只包含宣传视觉，没有可核验的实机截图。我们不放生成的概念图冒充截图；页面展示的官方视觉都已明确标注，后续可替换为真实截图。'
        }
      ],
      cta: { label: '查看全部 FAQ', href: 'faq.html', variant: 'secondary' }
    }
  },
  en: {
    hero: {
      eyebrow: 'LOCAL-FIRST · DESKTOP AI AGENT',
      brand: 'SLB-Agent',
      title: 'One Core.',
      titleAccent: 'Every AI.',
      lead: 'A desktop AI agent for Claude, GPT, Gemini, DeepSeek, GLM, Kimi, Ollama and more — with Armor Engine, MCP tools, file operations, command execution, and security research workflows in one local-first client.',
      ctas: [
        { label: 'Download now', href: releases, external: true, variant: 'primary' },
        { label: 'GitHub repository', href: repo, external: true, variant: 'secondary' },
        { label: 'Explore features', href: '#capabilities', variant: 'ghost' }
      ],
      micro: ['Windows · macOS · Linux', 'Local-first', 'No account required'],
      panel: {
        label: 'WORKFLOW ILLUSTRATION',
        session: 'slb-agent · armor session',
        lines: [
          { kind: 'cmd', text: 'armor_get  model="claude"  scene="engineering"' },
          { kind: 'ok', text: 'injection pack ready · system core + per-turn trailer' },
          { kind: 'cmd', text: 'armor_probe  reply="I cannot assist with that"' },
          { kind: 'warn', text: 'refused · pattern classified · remedy available' },
          { kind: 'cmd', text: 'armor_fix  +  armor_audit  +  armor_drift' },
          { kind: 'info', text: 'delivery checklist · assumptions / commands / readouts' },
          { kind: 'muted', text: 'illustrative workflow — no model is guaranteed to comply' }
        ],
        status: 'ARMOR ENGINE / 9 TOOLS'
      }
    },
    proof: [
      { value: '28+', label: 'providers documented in README' },
      { value: '9', label: 'armor_* MCP tools' },
      { value: '124', label: 'red-team skill files' },
      { value: '3', label: 'desktop platforms' }
    ],
    capabilities: {
      kicker: 'CORE CAPABILITIES',
      title: 'One agent for access, execution, and research workflows',
      lead: 'From provider onboarding to real file operations, MCP tools, and security research — one local desktop client connects the whole chain.',
      items: [
        {
          icon: 'shield',
          title: 'Armor Engine',
          body: 'A stateful MCP tool engine for injection packs, probes, refusal triage, escalation, output audits, and drift detection.',
          href: 'en/armor-engine.html',
          tag: '9 tools'
        },
        {
          icon: 'layers',
          title: 'Multi-model API access',
          body: 'OpenAI-compatible, Anthropic, and Gemini protocols, with 28+ providers documented in the README and support for relays.',
          href: 'en/models.html',
          tag: '3 protocols'
        },
        {
          icon: 'plugins',
          title: 'MCP plugin ecosystem',
          body: 'stdio and Streamable HTTP / SSE; add servers in the UI or import Claude Desktop / Cursor configuration.',
          href: 'en/mcp.html',
          tag: 'MCP client'
        },
        {
          icon: 'terminal',
          title: 'File and terminal tools',
          body: 'Browse directories, read and write files, regex search, surgical edits, run commands, fetch pages, and manage todos.',
          href: 'en/agent-tools.html',
          tag: 'Real execution'
        },
        {
          icon: 'checkpoint',
          title: 'Checkpoints and rollback',
          body: 'Roll back to before any message and restore files the agent touched; preview every write as a diff first.',
          href: 'en/agent-tools.html#checkpoints',
          tag: 'Reversible'
        },
        {
          icon: 'phone',
          title: 'APK analysis',
          body: 'Bundled reverse-engineering plugin: APK inspection, unpacking, jadx decompilation, secret scanning, and endpoint discovery.',
          href: 'en/apk-analysis.html',
          tag: 'Reverse toolchain'
        },
        {
          icon: 'radar',
          title: 'Red-team research',
          body: 'Assets, vulnerabilities, CVE matching, payloads, WAF notes, tunnels, and reporting, with 124 skill files. Authorized use only.',
          href: 'en/agent-tools.html#security',
          tag: 'Authorized use'
        },
        {
          icon: 'lock',
          title: 'Local data and privacy',
          body: 'API keys encrypted by the OS keychain; no cloud account, no telemetry, and sessions stay on your machine.',
          href: 'en/privacy.html',
          tag: 'Local-first'
        }
      ]
    },
    armor: {
      kicker: 'ARMOR ENGINE',
      title: 'Turn refusal handling into an inspectable engineering loop',
      lead: 'Not a static prompt. Armor Engine is an MCP tool engine: it generates model-family-aware injection packs, probes replies, prescribes remedies for refusal patterns, escalates after repeated refusals, and detects drift in long sessions.',
      stats: [
        { value: '4', label: 'intensity levels' },
        { value: '11', label: 'model families' },
        { value: '22', label: 'refusal patterns' },
        { value: '5', label: 'injection channels' }
      ],
      steps: [
        {
          no: '01',
          title: 'Detect model and scene',
          body: 'Choose a playbook for Anthropic, OpenAI, Google, DeepSeek, GLM, Kimi, Qwen, and other families, with engineering, creative, and data scenes.',
          tool: 'armor_status'
        },
        {
          no: '02',
          title: 'Generate the injection pack',
          body: 'Emit a system core, per-turn trailer, prefill, probe, and injection protocol, with host-side restatement every turn.',
          tool: 'armor_get'
        },
        {
          no: '03',
          title: 'Probe and triage',
          body: 'Classify replies as compliant / partial / refused / unclear; when a refusal pattern hits, provide a resend-ready remedy.',
          tool: 'armor_probe · armor_fix'
        },
        {
          no: '04',
          title: 'Escalate and recombine',
          body: 'After repeated refusals, raise intensity one level, swap family clauses, encoding variants, and decomposition, and emit a full prompt.',
          tool: 'armor_escalate · armor_pick'
        },
        {
          no: '05',
          title: 'Audit output and drift',
          body: 'Check whether delivery materials are complete, catch soft language, and score long-session drift from 0 to 100.',
          tool: 'armor_audit · armor_drift'
        }
      ],
      note: 'Armor Engine does not guarantee that any model will comply, nor does it guarantee bypassing model safety mechanisms. Model output may be wrong, outdated, or risky. Verify independently and use only within lawful authorization.',
      cta: { label: 'Explore Armor Engine', href: 'en/armor-engine.html', variant: 'secondary' }
    },
    models: {
      kicker: 'MULTI-MODEL AI',
      title: 'One client for the models you already use',
      lead: 'A multi-model AI client with a 28+ provider catalog and three protocols. Pick a provider, open its key page, paste the key, test the connection, and fetch the model list — all in a guided onboarding flow.',
      providers: [
        { name: 'Claude', note: 'Anthropic', group: 'frontier' },
        { name: 'GPT', note: 'OpenAI', group: 'frontier' },
        { name: 'Gemini', note: 'Google', group: 'frontier' },
        { name: 'Grok', note: 'xAI', group: 'frontier' },
        { name: 'DeepSeek', note: 'DeepSeek', group: 'china' },
        { name: 'GLM', note: 'Zhipu', group: 'china' },
        { name: 'Kimi', note: 'Moonshot', group: 'china' },
        { name: 'Qwen', note: 'Alibaba Cloud', group: 'china' },
        { name: 'Doubao', note: 'ByteDance', group: 'china' },
        { name: 'Ollama', note: 'Local models', group: 'local' },
        { name: 'LM Studio', note: 'Local models', group: 'local' },
        { name: 'OpenRouter', note: 'Aggregator', group: 'gateway' }
      ],
      protocols: [
        { title: 'OpenAI-compatible', body: 'OpenAI and a wide range of compatible providers, plus One-API / New-API relays.', tag: 'chat/completions' },
        { title: 'Anthropic', body: 'Native protocol access for Claude models with per-provider parameter controls.', tag: 'Messages API' },
        { title: 'Gemini', body: 'Native protocol access for Google Gemini models.', tag: 'GenerateContent' }
      ],
      note: 'The providers above are explicitly documented in the README; the complete catalog lives in the onboarding wizard. Availability, pricing, and terms are set by each provider.',
      cta: { label: 'See model access', href: 'en/models.html', variant: 'secondary' }
    },
    ecosystem: {
      kicker: 'MCP + AGENT TOOLS',
      title: 'Tools, skills, and permissions in one workflow',
      lead: 'SLB-Agent is a standard MCP client and a local agent toolbox. Third-party capabilities arrive through MCP; domain knowledge is captured in skill packs.',
      columns: [
        {
          icon: 'plugins',
          title: 'MCP client',
          body: 'stdio and Streamable HTTP / SSE. Add servers in the UI or import Claude Desktop / Cursor mcpServers JSON in one click.',
          items: ['Standard Model Context Protocol client', 'Import mcpServers configs', 'Local and remote MCP servers', 'Plugin development guide and examples'],
          href: 'en/mcp.html',
          linkLabel: 'MCP and ecosystem'
        },
        {
          icon: 'book',
          title: 'Skill packs',
          body: 'Write skills and standing rules in Markdown, compatible with SKILL.md / skills/ layouts; import from GitHub URLs or local files and apply to every model.',
          items: ['SKILL.md ecosystem', 'One-click GitHub import', '124 red-team skill files', 'Applies across models'],
          href: 'en/mcp.html#skills',
          linkLabel: 'Explore skills'
        },
        {
          icon: 'terminal',
          title: 'Agent toolbox',
          body: 'More than chat: browse directories, read and write files, regex search, run zsh / PowerShell, fetch pages, search the web, and manage todos.',
          items: ['Diff preview and four permission modes', 'Checkpoints with file rollback', 'Context compaction /compact', '/init project instructions', 'Token and cost visibility'],
          href: 'en/agent-tools.html',
          linkLabel: 'Explore agent tools'
        }
      ],
      pluginsTitle: '6 MCP plugins bundled with the installer',
      plugins: ['Lite armor', 'VIP armor', 'Elite armor (GLM)', 'Web scraper', 'Reverse analysis', 'Red-team suite'],
      cta: { label: 'Explore the full toolchain', href: 'en/mcp.html', variant: 'ghost' }
    },
    visuals: {
      kicker: 'PRODUCT VISUALS',
      title: 'More than a chat box',
      lead: 'Official visual assets explain the product thesis: Armor Engine at the center, surrounded by multi-model access, real execution, MCP, skill packs, and local security.',
      note: 'Note: the repository does not currently include in-app screenshots. This section presents official promotional artwork to explain product structure and capabilities; it is not labelled as a software screenshot. Real screenshots will replace this artwork and be clearly labelled once available.',
      items: [
        {
          src: 'images/banner.webp',
          alt: 'Official SLB-Agent promotional artwork showing the desktop AI agent, local-first positioning, and Armor Engine workflow; not an in-app screenshot',
          caption: 'Official visual · product positioning and workflow',
          className: 'visual-wide'
        },
        {
          src: 'images/unlocked.webp',
          alt: 'Official SLB-Agent promotional artwork illustrating the Armor Engine refusal-handling loop; not an in-app screenshot',
          caption: 'Official visual · refusal-handling loop'
        },
        {
          src: 'images/armor-engine.webp',
          alt: 'Official SLB-Agent promotional artwork showing 9 Armor Engine tools, 4 levels, 11 model families, and injection channels; not an in-app screenshot',
          caption: 'Official visual · Armor Engine capability panel'
        }
      ]
    },
    download: {
      kicker: 'DOWNLOAD',
      title: 'Pick your platform and get started',
      lead: 'Installers are published on GitHub Releases. This site does not host installers or provide links that bypass the Release page.',
      platforms: [
        {
          icon: 'windows',
          name: 'Windows',
          arch: 'Windows 10 / 11 · x64 + x86',
          formats: '.exe installer',
          note: 'If SmartScreen warns, verify the source and choose "More info → Run anyway".'
        },
        {
          icon: 'apple',
          name: 'macOS',
          arch: 'Apple Silicon · Intel',
          formats: '.dmg disk image',
          note: 'Choose Apple Silicon or Intel based on the chip shown in "About This Mac".'
        },
        {
          icon: 'local',
          name: 'Linux',
          arch: 'x86_64 · arm64',
          formats: '.deb · .AppImage',
          note: 'Check uname -m; AppImage files need execute permission.'
        }
      ],
      cta: { label: 'Open GitHub Releases', href: releases, external: true, variant: 'primary' },
      note: 'The README currently records v1.1.15 with 7 installers. Always confirm the version, file size, and SHA-256 on the Releases page.'
    },
    faq: {
      kicker: 'FAQ',
      title: 'A few things to know before you start',
      lead: 'Installation, API keys, licensing, privacy, and the limits of Armor Engine.',
      items: [
        {
          q: 'Is SLB-Agent free?',
          a: 'The installer is a free download with a built-in trial period. After the trial, full features unlock with an offline license key; licensing is Ed25519-signed, machine-bound, and verified locally. See the Release notes for current terms.'
        },
        {
          q: 'Do I need an API key?',
          a: 'Cloud models require a key from the corresponding provider. The onboarding wizard links to each provider\'s key page; for a fully offline setup, run models locally with Ollama.'
        },
        {
          q: 'Does Armor Engine guarantee model compliance?',
          a: 'No. It provides a stateful toolchain for injection, probing, refusal triage, escalation, auditing, and drift detection. It does not guarantee that any model will comply or that safety mechanisms will be bypassed. Verify all output independently.'
        },
        {
          q: 'Where are my API keys and sessions stored?',
          a: 'API keys stay on your machine: macOS Keychain or Windows DPAPI. There is no cloud account system, no telemetry, and no session upload. Sessions can be exported as Markdown / JSON and are cleared on uninstall.'
        },
        {
          q: 'Which operating systems are supported?',
          a: 'Current Releases provide Windows 10/11, macOS (Apple Silicon / Intel), and Linux (x64 / arm64, deb / AppImage) builds. Confirm exact compatibility in the relevant Release notes.'
        },
        {
          q: 'Why are there no software screenshots on the site?',
          a: 'The repository currently contains promotional artwork, not verifiable in-app screenshots. We do not present generated concept art as a screenshot; every official visual on this page is labelled honestly and can be replaced with real captures later.'
        }
      ],
      cta: { label: 'Read the full FAQ', href: 'en/faq.html', variant: 'secondary' }
    }
  }
}

export const siteLinks = { releases, repo, telegram }
