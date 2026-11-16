import type { CtaLink, Lang } from './home'

const RELEASES = 'https://github.com/joyfulneurob/SLB-Agent/releases/latest'
const REPO = 'https://github.com/joyfulneurob/SLB-Agent'
const TELEGRAM = 'https://t.me/jiaoliuqunsbl'

export interface FeatureItem {
  icon?: string
  title: string
  body: string
  tags?: string[]
  href?: string
  linkLabel?: string
}

export interface StepItem {
  no?: string
  title: string
  body: string
  tool?: string
}

export interface DataTable {
  headers: string[]
  rows: string[][]
  caption?: string
}

export type DetailBlock =
  | { type: 'cards'; items: FeatureItem[]; columns?: 2 | 3 | 4 }
  | { type: 'steps'; items: StepItem[] }
  | { type: 'table'; table: DataTable }
  | { type: 'prose'; paragraphs?: string[]; bullets?: string[]; code?: string }
  | { type: 'notice'; title: string; body: string; tone?: 'info' | 'warn' }
  | { type: 'faq'; items: Array<{ q: string; a: string }> }
  | { type: 'links'; items: Array<{ title: string; body: string; href: string; external?: boolean }> }

export interface DetailSection {
  id: string
  kicker?: string
  title: string
  lead?: string
  blocks: DetailBlock[]
}

export interface DetailPageContent {
  eyebrow: string
  title: string
  lead: string
  meta?: string[]
  ctas?: CtaLink[]
  sections: DetailSection[]
  closing?: {
    kicker?: string
    title: string
    body: string
    ctas: CtaLink[]
  }
}

export const detailPages: Record<string, Record<Lang, DetailPageContent>> = {
  'armor-engine': {
    zh: {
      eyebrow: 'ARMOR ENGINE / 破限内核',
      title: '把「被拒绝」变成下一步的不只是提示词，而是一套引擎',
      lead: 'Armor Engine（破甲引擎 / 破限内核）以 9 个 MCP 工具承载完整链路：按模型族生成注入包、探针评估配合度、识别拒绝形态、给出补救话术、连续被拒时升档，并持续检查输出与漂移。',
      meta: ['9 个 armor_* 工具', '4 档 × 11 族 × 3 场景', '22 类拒绝形态', '5 条注入通道'],
      ctas: [
        { label: '下载 SLB-Agent', href: RELEASES, external: true, variant: 'primary' },
        { label: '查看 MCP 生态', href: 'mcp.html', variant: 'secondary' }
      ],
      sections: [
        {
          id: 'principles',
          kicker: 'DESIGN',
          title: '四个设计原则',
          lead: 'Armor Engine 的价值不在于某一段「万能提示词」，而在于把模型差异、会话状态与拒绝反馈纳入同一套可重复流程。',
          blocks: [
            {
              type: 'cards',
              columns: 4,
              items: [
                {
                  icon: 'database',
                  title: '有状态',
                  body: '引擎知道当前会话被拒过几次、命中过哪类形态、现在处于哪一档强度，而不是每次从零开始。'
                },
                {
                  icon: 'layers',
                  title: '按族适配',
                  body: 'Anthropic、OpenAI、Google、DeepSeek、GLM、Kimi、Qwen 等模型族使用不同打法与禁忌，避免一套文本打天下。'
                },
                {
                  icon: 'zap',
                  title: '自动化',
                  body: '宿主侧每轮注入尾部重申；被拒时输出可直接重发的补救话术；连续被拒时自动升档并重组策略。'
                },
                {
                  icon: 'check',
                  title: '可检查',
                  body: '探针给出配合度判定，armor_audit 检查交付材料是否缺项，armor_drift 用 0–100 分呈现长会话漂移。'
                }
              ]
            }
          ]
        },
        {
          id: 'workflow',
          kicker: 'WORKFLOW',
          title: '一条从任务到交付的闭环',
          lead: '下面展示的是工具链的工作方式，不代表任何模型必然配合。具体结果取决于模型、任务、上下文与使用场景。',
          blocks: [
            {
              type: 'steps',
              items: [
                {
                  no: '01',
                  title: '确认模型族与任务场景',
                  body: '通过 armor_status 查看当前模型族、强度档位与生效插件，并按 engineering / creative / data 选择场景。',
                  tool: 'armor_status'
                },
                {
                  no: '02',
                  title: '生成注入包',
                  body: 'armor_get 输出 system 内核、尾部重申、助手预填充、探针与注入协议。宿主引擎在每轮消息末尾自动重申。',
                  tool: 'armor_get'
                },
                {
                  no: '03',
                  title: '判定回复并处理拒绝',
                  body: 'armor_probe 把回复分为 compliant、partial、refused、unclear；armor_fix 命中拒绝形态并给出可直接复发的补救话术。',
                  tool: 'armor_probe · armor_fix'
                },
                {
                  no: '04',
                  title: '连续被拒时升档',
                  body: 'armor_escalate 升一档强度、替换族条款与编码变体；armor_pick 从 14 个机制中选择互不冲突的组合。',
                  tool: 'armor_escalate · armor_pick'
                },
                {
                  no: '05',
                  title: '质检与漂移检查',
                  body: 'armor_audit 检查假设、命令、判读、失败分支、变体五类材料；armor_drift 检测长会话中回复变软或回退的信号。',
                  tool: 'armor_audit · armor_drift'
                }
              ]
            }
          ]
        },
        {
          id: 'tools',
          kicker: 'TOOLING',
          title: '九个 armor_* 工具',
          lead: '工具通过 MCP 暴露给 Agent，可单独调用，也可由工作流串联。',
          blocks: [
            {
              type: 'table',
              table: {
                headers: ['工具', '解决的问题', '输出'],
                rows: [
                  ['`armor_get`', '按模型与场景生成完整注入包', 'system 段、尾部重申、预填充、探针、注入协议'],
                  ['`armor_probe`', '判断模型回复的配合程度', 'compliant / partial / refused / unclear 与依据'],
                  ['`armor_fix`', '对拒绝形态给出针对性补救', '命中形态、处置动作、可复制话术'],
                  ['`armor_escalate`', '连续被拒时升级策略', '升档后的完整重发提示词'],
                  ['`armor_audit`', '检查交付材料是否完整', '五类材料缺项、软话术与长度检查'],
                  ['`armor_drift`', '检测长会话回退', '0–100 漂移分、命中信号、重申句'],
                  ['`armor_pick`', '组合互不冲突的机制', '14 个机制中的一组选型'],
                  ['`armor_domain`', '提供任务领域的交付规格', '38 个领域 × 触发词、交付物、拦截点、工具映射、颗粒度'],
                  ['`armor_status`', '查看矩阵与当前状态', '模型族、档位差异、生效插件']
                ]
              }
            }
          ]
        },
        {
          id: 'levels',
          kicker: 'ADAPTATION',
          title: '四档强度，三套场景，十一个模型族',
          lead: '档位与模型族适配是配置项，不是效果承诺。强度越高通常意味着更长的上下文占用与更复杂的注入结构。',
          blocks: [
            {
              type: 'table',
              table: {
                headers: ['档位', '设计重点', '说明'],
                rows: [
                  ['standard', '封拒绝词', '较轻量，适合上下文紧张或需要稳定行为的场景'],
                  ['strong', '双通道 + 边界重置', '在 standard 之上增加通道与边界处理'],
                  ['max', '术语中性化 + 编码降维 + 拒绝处置表', '默认档位，覆盖更多拒绝形态'],
                  ['unlimited', '零省略契约 + 反预降级', '面向顽固头部模型；Claude / GPT / Gemini 自动升到该档']
                ]
              }
            },
            {
              type: 'cards',
              columns: 3,
              items: [
                {
                  icon: 'code',
                  title: 'engineering',
                  body: '技术评估、代码与工程交付，要求命令、判读与失败分支完整。'
                },
                {
                  icon: 'spark',
                  title: 'creative',
                  body: '虚构创作与叙事类任务，强调结构、风格与连续性。'
                },
                {
                  icon: 'database',
                  title: 'data',
                  body: '数据整理、转换与分析，强调口径、步骤与可复现性。'
                }
              ]
            }
          ]
        },
        {
          id: 'channels',
          kicker: 'INJECTION',
          title: '五条注入通道',
          lead: '注入位置与频率是 Armor Engine 工程化的一部分。宿主侧开关位于设置页「破限内核」，无需手动编辑配置文件。',
          blocks: [
            {
              type: 'table',
              table: {
                headers: ['通道', '位置', '频率'],
                rows: [
                  ['① system 内核', '系统提示词最尾部', '每会话一次'],
                  ['② 尾部重申', '最后一条 user 消息末尾', '每轮，用于对抗 recency 漂移'],
                  ['③ 助手预填充', 'assistant 首条内容（Anthropic 族）', '每轮'],
                  ['④ 术语中性化', '并入 strong+ 档 system', '随档位'],
                  ['⑤ 探针', '不进入对话，独立判定', '换模型时一次']
                ]
              }
            }
          ]
        },
        {
          id: 'plugins',
          kicker: 'PACKAGING',
          title: '三种破限插件档位',
          lead: '三个插件工具同名，同时只启用一个。README 记录了三者的篇幅与适用目标；本站不引用未经复核的成功率数字。',
          blocks: [
            {
              type: 'table',
              table: {
                headers: ['插件', 'README 记录的篇幅', '面向场景'],
                rows: [
                  ['精简版破限', '约 7.8K 字，极简协议', '日常使用、上下文紧张、需要行为稳定'],
                  ['VIP 超级破限', '约 16.5K 字 + 38 个输出骨架', '希望获得更完整覆盖的复杂任务'],
                  ['精英版破限（GLM 专用）', '约 8.3K 字 + 硬边界语境库', '智谱 GLM 系列模型的专用适配']
                ]
              }
            }
          ]
        },
        {
          id: 'boundaries',
          kicker: 'RESPONSIBLE USE',
          title: '边界比能力更重要',
          blocks: [
            {
              type: 'notice',
              tone: 'warn',
              title: '不承诺配合，不保证绕过',
              body: 'Armor Engine 是一套提示与工具工程实现，不保证任何模型一定配合，也不保证绕过模型安全机制。模型输出可能错误、过时或具有风险，关键操作应在隔离环境中进行并做好备份。'
            },
            {
              type: 'prose',
              paragraphs: [
                '本项目及内置组件仅供学习、研究与获得书面授权的安全测试使用。未经授权对他人计算机信息系统进行探测、渗透或数据采集，在多数司法辖区属于违法行为。',
                '使用者须自行了解并遵守所在地区法律法规，并对使用后果负责。若你不同意这些边界，请不要下载或使用本项目。'
              ]
            }
          ]
        }
      ],
      closing: {
        kicker: 'NEXT',
        title: '把 Armor Engine 放进真实工作流',
        body: '下载安装包，接上你自己的模型，再从一次可回滚的任务开始。',
        ctas: [
          { label: '前往 Releases', href: RELEASES, external: true, variant: 'primary' },
          { label: '阅读快速开始', href: 'docs.html', variant: 'secondary' }
        ]
      }
    },
    en: {
      eyebrow: 'ARMOR ENGINE',
      title: 'Turning a refusal into a next step takes an engine, not just a prompt',
      lead: 'Armor Engine is a stateful LLM refusal analysis and handling toolchain built on nine MCP tools: generate model-family-aware injection packs, probe compliance, classify refusal patterns, prescribe remedies, escalate after repeated refusals, and keep auditing output and drift.',
      meta: ['9 armor_* tools', '4 levels × 11 families × 3 scenes', '22 refusal patterns', '5 injection channels'],
      ctas: [
        { label: 'Download SLB-Agent', href: RELEASES, external: true, variant: 'primary' },
        { label: 'Explore the MCP ecosystem', href: 'en/mcp.html', variant: 'secondary' }
      ],
      sections: [
        {
          id: 'principles',
          kicker: 'DESIGN',
          title: 'Four design principles',
          lead: 'The value is not a single universal prompt. It is a repeatable loop that accounts for model differences, session state, and refusal feedback.',
          blocks: [
            {
              type: 'cards',
              columns: 4,
              items: [
                {
                  icon: 'database',
                  title: 'Stateful',
                  body: 'The engine knows how many refusals the session has hit, which patterns appeared, and which intensity level is active — instead of restarting from zero.'
                },
                {
                  icon: 'layers',
                  title: 'Family-aware',
                  body: 'Anthropic, OpenAI, Google, DeepSeek, GLM, Kimi, Qwen, and other families use different plays and taboos instead of one text for all.'
                },
                {
                  icon: 'zap',
                  title: 'Automated',
                  body: 'The host restates the trailer every turn, returns a resend-ready remedy on refusal, and escalates with a recombined strategy after repeated refusals.'
                },
                {
                  icon: 'check',
                  title: 'Inspectable',
                  body: 'Probes judge compliance, armor_audit checks missing delivery material, and armor_drift exposes long-session drift on a 0–100 scale.'
                }
              ]
            }
          ]
        },
        {
          id: 'workflow',
          kicker: 'WORKFLOW',
          title: 'A closed loop from task to delivery',
          lead: 'This is how the toolchain works — not a promise that any model will comply. Results depend on the model, task, context, and use case.',
          blocks: [
            {
              type: 'steps',
              items: [
                {
                  no: '01',
                  title: 'Detect family and scene',
                  body: 'Use armor_status to inspect the current model family, intensity level, and active plugin, then choose engineering, creative, or data.',
                  tool: 'armor_status'
                },
                {
                  no: '02',
                  title: 'Generate the injection pack',
                  body: 'armor_get emits a system core, per-turn trailer, assistant prefill, probe, and injection protocol. The host restates the trailer at the end of every turn.',
                  tool: 'armor_get'
                },
                {
                  no: '03',
                  title: 'Probe the reply and triage',
                  body: 'armor_probe classifies a reply as compliant, partial, refused, or unclear; armor_fix identifies the refusal pattern and returns a resend-ready remedy.',
                  tool: 'armor_probe · armor_fix'
                },
                {
                  no: '04',
                  title: 'Escalate after repeated refusals',
                  body: 'armor_escalate raises intensity one level and swaps family clauses and encoding variants; armor_pick selects a non-conflicting set from 14 mechanisms.',
                  tool: 'armor_escalate · armor_pick'
                },
                {
                  no: '05',
                  title: 'Audit output and drift',
                  body: 'armor_audit checks five material classes — assumptions, commands, readouts, failure branches, variants; armor_drift detects softening or rollback in long sessions.',
                  tool: 'armor_audit · armor_drift'
                }
              ]
            }
          ]
        },
        {
          id: 'tools',
          kicker: 'TOOLING',
          title: 'The nine armor_* tools',
          lead: 'Tools are exposed over MCP and can be called individually or chained into a workflow.',
          blocks: [
            {
              type: 'table',
              table: {
                headers: ['Tool', 'Problem it addresses', 'Output'],
                rows: [
                  ['`armor_get`', 'Generate a full injection pack for a model and scene', 'System core, trailer, prefill, probe, injection protocol'],
                  ['`armor_probe`', 'Judge how compliant a reply is', 'compliant / partial / refused / unclear, with evidence'],
                  ['`armor_fix`', 'Prescribe a remedy for a refusal pattern', 'Pattern, handling action, copy-ready remedy'],
                  ['`armor_escalate`', 'Escalate after repeated refusals', 'Full resend prompt after escalation'],
                  ['`armor_audit`', 'Check delivery completeness', 'Missing materials, soft-language and length checks'],
                  ['`armor_drift`', 'Detect long-session rollback', '0–100 drift score, hit signals, restatement line'],
                  ['`armor_pick`', 'Combine non-conflicting mechanisms', 'A selected set from 14 mechanisms'],
                  ['`armor_domain`', 'Provide task-domain delivery specs', '38 domains × triggers, deliverables, interception points, tools, granularity'],
                  ['`armor_status`', 'Inspect the matrix and current state', 'Families, level differences, active plugin']
                ]
              }
            }
          ]
        },
        {
          id: 'levels',
          kicker: 'ADAPTATION',
          title: 'Four levels, three scenes, eleven model families',
          lead: 'Levels and family adaptation are configuration, not a performance promise. Higher intensity generally means more context and a more complex injection structure.',
          blocks: [
            {
              type: 'table',
              table: {
                headers: ['Level', 'Design focus', 'Notes'],
                rows: [
                  ['standard', 'Block refusal words', 'Lighter footprint for tight contexts or stable behavior'],
                  ['strong', 'Dual channel + boundary reset', 'Adds another channel and boundary handling'],
                  ['max', 'Term neutralization + encoding demotion + refusal playbook', 'Default level with broader refusal coverage'],
                  ['unlimited', 'Zero-omission contract + anti-pre-degradation', 'For stubborn frontier models; Claude / GPT / Gemini auto-escalate here']
                ]
              }
            },
            {
              type: 'cards',
              columns: 3,
              items: [
                {
                  icon: 'code',
                  title: 'engineering',
                  body: 'Technical assessment, code, and engineering delivery with complete commands, readouts, and failure branches.'
                },
                {
                  icon: 'spark',
                  title: 'creative',
                  body: 'Fiction and narrative tasks with structure, style, and continuity.'
                },
                {
                  icon: 'database',
                  title: 'data',
                  body: 'Data cleanup, transformation, and analysis with explicit assumptions and reproducible steps.'
                }
              ]
            }
          ]
        },
        {
          id: 'channels',
          kicker: 'INJECTION',
          title: 'Five injection channels',
          lead: 'Position and frequency are part of the engineering. The engine can be toggled in Settings → Armor Engine without editing config files.',
          blocks: [
            {
              type: 'table',
              table: {
                headers: ['Channel', 'Location', 'Frequency'],
                rows: [
                  ['① System core', 'Tail of the system prompt', 'Once per session'],
                  ['② Per-turn trailer', 'End of the last user message', 'Every turn, against recency drift'],
                  ['③ Assistant prefill', 'First assistant content (Anthropic family)', 'Every turn'],
                  ['④ Term neutralization', 'Merged into strong+ system core', 'With level'],
                  ['⑤ Probe', 'Off-conversation, independent verdict', 'Once per model switch']
                ]
              }
            }
          ]
        },
        {
          id: 'plugins',
          kicker: 'PACKAGING',
          title: 'Three armor plugin tiers',
          lead: 'All three expose the same armor_* tool names and only one should be active at a time. The README documents payload scale and intended use; this site does not repeat unverified success-rate figures.',
          blocks: [
            {
              type: 'table',
              table: {
                headers: ['Plugin', 'Payload recorded in README', 'Intended use'],
                rows: [
                  ['Lite armor', '~7.8K characters, minimal protocol', 'Daily use, tight context, stable behavior'],
                  ['VIP armor', '~16.5K characters + 38 output skeletons', 'Complex tasks that need broader coverage'],
                  ['Elite armor (GLM)', '~8.3K characters + hard-boundary context library', 'Dedicated adaptation for Zhipu GLM models']
                ]
              }
            }
          ]
        },
        {
          id: 'boundaries',
          kicker: 'RESPONSIBLE USE',
          title: 'Boundaries matter more than claims',
          blocks: [
            {
              type: 'notice',
              tone: 'warn',
              title: 'No guaranteed compliance, no guaranteed bypass',
              body: 'Armor Engine is prompt and tool engineering. It does not guarantee that any model will comply or that safety mechanisms will be bypassed. Output may be wrong, outdated, or risky; run critical operations in isolation and keep backups.'
            },
            {
              type: 'prose',
              paragraphs: [
                'This project and its bundled components are for learning, research, and security testing with written authorization only. Probing, penetrating, or collecting data from systems without authorization is illegal in most jurisdictions.',
                'You are responsible for understanding and complying with the laws of your jurisdiction. If you do not accept these boundaries, do not download or use the project.'
              ]
            }
          ]
        }
      ],
      closing: {
        kicker: 'NEXT',
        title: 'Put Armor Engine inside a real workflow',
        body: 'Download the installer, connect your own model, and start with a task you can roll back.',
        ctas: [
          { label: 'Open Releases', href: RELEASES, external: true, variant: 'primary' },
          { label: 'Read the quick start', href: 'en/docs.html', variant: 'secondary' }
        ]
      }
    }
  },

  models: {
    zh: {
      eyebrow: 'MULTI-MODEL AI',
      title: '不绑定厂商，把模型选择权留在自己手里',
      lead: 'SLB-Agent 是一个多模型 AI 客户端，通过 OpenAI 兼容、Anthropic、Gemini 三套协议接入模型服务。预置目录、向导式接入、自动拉取模型列表，也可以接任意 One-API / New-API 中转站。',
      meta: ['3 种协议', 'README 记录 28+ 家服务商', '本地 Ollama / LM Studio', '任意兼容中转站'],
      ctas: [
        { label: '下载并接入模型', href: RELEASES, external: true, variant: 'primary' },
        { label: '查看快速开始', href: 'docs.html', variant: 'secondary' }
      ],
      sections: [
        {
          id: 'protocols',
          kicker: 'PROTOCOLS',
          title: '三套协议，一个入口',
          lead: '不同厂商使用不同 API 形状，客户端在协议层做转换；模型参数仍按服务商单独配置。',
          blocks: [
            {
              type: 'cards',
              columns: 3,
              items: [
                {
                  icon: 'layers',
                  title: 'OpenAI 兼容',
                  body: '覆盖 OpenAI 与大量兼容服务商，也支持自建或第三方 One-API / New-API 中转。',
                  tags: ['chat/completions', '兼容中转站']
                },
                {
                  icon: 'shield',
                  title: 'Anthropic',
                  body: '面向 Claude 系列的原生 Messages API 接入，支持模型级参数配置。',
                  tags: ['Claude', 'Messages API']
                },
                {
                  icon: 'spark',
                  title: 'Gemini',
                  body: '面向 Google Gemini 的原生协议接入，与 Claude / GPT 在同一会话界面切换。',
                  tags: ['Gemini', 'GenerateContent']
                }
              ]
            }
          ]
        },
        {
          id: 'providers',
          kicker: 'CATALOG',
          title: 'README 明确列出的服务商',
          lead: '以下只是一部分。客户端预置 28+ 家服务商目录，完整列表以接入向导实际显示为准。',
          blocks: [
            {
              type: 'cards',
              columns: 3,
              items: [
                { icon: 'spark', title: 'Claude', body: 'Anthropic 模型族，支持 Anthropic 原生协议。', tags: ['Anthropic'] },
                { icon: 'spark', title: 'GPT', body: 'OpenAI 模型族，走 OpenAI 兼容协议。', tags: ['OpenAI'] },
                { icon: 'spark', title: 'Gemini', body: 'Google Gemini 模型族，走 Gemini 原生协议。', tags: ['Google'] },
                { icon: 'spark', title: 'Grok', body: 'xAI 模型接入。', tags: ['xAI'] },
                { icon: 'spark', title: 'Mistral', body: 'Mistral 系列模型接入。', tags: ['Mistral'] },
                { icon: 'spark', title: 'DeepSeek', body: 'DeepSeek 模型接入，适配其对话接口。', tags: ['DeepSeek'] },
                { icon: 'spark', title: 'Qwen / 通义', body: '阿里云通义系列模型接入。', tags: ['Alibaba Cloud'] },
                { icon: 'spark', title: 'Kimi', body: 'Moonshot Kimi 系列模型接入。', tags: ['Moonshot'] },
                { icon: 'spark', title: 'GLM / 智谱', body: '智谱 GLM 系列模型接入。', tags: ['Zhipu'] },
                { icon: 'spark', title: '豆包', body: '字节跳动豆包模型接入。', tags: ['ByteDance'] },
                { icon: 'spark', title: '文心', body: '百度文心模型接入。', tags: ['Baidu'] },
                { icon: 'spark', title: '混元', body: '腾讯混元模型接入。', tags: ['Tencent'] },
                { icon: 'spark', title: 'MiniMax', body: 'MiniMax 模型接入。', tags: ['MiniMax'] },
                { icon: 'spark', title: 'OpenRouter', body: '聚合网关，通过一个 Key 访问多家模型。', tags: ['Aggregator'] },
                { icon: 'spark', title: '硅基流动', body: 'SiliconFlow 模型服务接入。', tags: ['SiliconFlow'] },
                { icon: 'spark', title: 'Azure', body: 'Azure OpenAI 服务接入。', tags: ['Azure'] },
                { icon: 'local', title: 'Ollama', body: '完全本地运行，无需云端 API Key。', tags: ['Local'] },
                { icon: 'local', title: 'LM Studio', body: '本地模型服务，通过兼容接口接入。', tags: ['Local'] }
              ]
            }
          ]
        },
        {
          id: 'onboarding',
          kicker: 'ONBOARDING',
          title: '接入只需要一个向导',
          blocks: [
            {
              type: 'steps',
              items: [
                {
                  no: '01',
                  title: '选择服务商',
                  body: '从预置目录选择厂商，或添加自定义的 OpenAI 兼容服务。'
                },
                {
                  no: '02',
                  title: '打开密钥页',
                  body: '向导提供对应厂商的密钥页面入口，减少在文档与后台之间来回查找。'
                },
                {
                  no: '03',
                  title: '粘贴并测试',
                  body: '填入 API Key，执行连接测试。密钥保存在系统钥匙串，界面层不读取明文。'
                },
                {
                  no: '04',
                  title: '拉取并勾选模型',
                  body: '自动获取可用模型列表，勾选需要在客户端中显示的模型。'
                }
              ]
            }
          ]
        },
        {
          id: 'controls',
          kicker: 'CONTROLS',
          title: '模型参数与成本可见',
          blocks: [
            {
              type: 'cards',
              columns: 3,
              items: [
                {
                  icon: 'settings',
                  title: '服务商级参数',
                  body: '按服务商配置输出上限字段、思考开关与强度、上下文窗口和速率上限。'
                },
                {
                  icon: 'refresh',
                  title: '三层重试',
                  body: '请求失败时按三层策略重试，减少网络抖动对长任务的影响。'
                },
                {
                  icon: 'database',
                  title: '成本与 token',
                  body: '按模型单价估算费用，检视器显示 token、上下文占用与执行轨迹。'
                },
                {
                  icon: 'checkpoint',
                  title: '随时切换',
                  body: '在同一会话切换模型；Armor Engine 会根据模型族重新选择打法。'
                },
                {
                  icon: 'book',
                  title: '上下文压缩',
                  body: '接近窗口上限时自动总结历史，也可以手动执行 /compact。'
                },
                {
                  icon: 'globe',
                  title: '网络可控',
                  body: '系统代理、直连、自定义 HTTP 或 SOCKS5，流量路径由你选择。'
                }
              ]
            }
          ]
        },
        {
          id: 'notes',
          kicker: 'NOTES',
          title: '接入前需要知道的事',
          blocks: [
            {
              type: 'notice',
              tone: 'info',
              title: '模型能力、价格与条款由服务商决定',
              body: '不同服务商的模型列表、计费方式、速率限制与使用条款会变化。客户端提供接入能力，不代替服务商的账号、配额或合规要求。'
            },
            {
              type: 'prose',
              bullets: [
                '云端模型通常需要对应厂商的 API Key；本地模型可完全离线。',
                '中转站的可用性、数据路径与计费由中转服务提供方决定，请自行评估。',
                'API Key 只保存在本机系统钥匙串；删除服务商时密钥一并清除。',
                '模型输出仍需核验，不应直接用于未经审查的关键生产操作。'
              ]
            }
          ]
        }
      ],
      closing: {
        kicker: 'NEXT',
        title: '把常用模型放进一个客户端',
        body: '下载后打开接入向导，从你已经拥有的 API Key 开始。',
        ctas: [
          { label: '下载 SLB-Agent', href: RELEASES, external: true, variant: 'primary' },
          { label: '查看 MCP 与工具', href: 'mcp.html', variant: 'secondary' }
        ]
      }
    },
    en: {
      eyebrow: 'MULTI-MODEL AI',
      title: 'Keep the choice of model in your hands',
      lead: 'SLB-Agent is a multi-model AI client that connects through OpenAI-compatible, Anthropic, and Gemini protocols. Use the preset catalog and guided onboarding, fetch models automatically, or connect any One-API / New-API relay.',
      meta: ['3 protocols', '28+ providers documented in README', 'Local Ollama / LM Studio', 'Any compatible relay'],
      ctas: [
        { label: 'Download and connect', href: RELEASES, external: true, variant: 'primary' },
        { label: 'Read the quick start', href: 'en/docs.html', variant: 'secondary' }
      ],
      sections: [
        {
          id: 'protocols',
          kicker: 'PROTOCOLS',
          title: 'Three protocols, one entry point',
          lead: 'Providers expose different API shapes. The client handles protocol differences while keeping model parameters configurable per provider.',
          blocks: [
            {
              type: 'cards',
              columns: 3,
              items: [
                {
                  icon: 'layers',
                  title: 'OpenAI-compatible',
                  body: 'OpenAI and a wide range of compatible providers, including self-hosted or third-party One-API / New-API relays.',
                  tags: ['chat/completions', 'Compatible relays']
                },
                {
                  icon: 'shield',
                  title: 'Anthropic',
                  body: 'Native Messages API access for Claude models with per-model parameter controls.',
                  tags: ['Claude', 'Messages API']
                },
                {
                  icon: 'spark',
                  title: 'Gemini',
                  body: 'Native protocol access for Google Gemini, switchable with Claude and GPT in the same session UI.',
                  tags: ['Gemini', 'GenerateContent']
                }
              ]
            }
          ]
        },
        {
          id: 'providers',
          kicker: 'CATALOG',
          title: 'Providers explicitly listed in the README',
          lead: 'This is a partial list. The client ships a 28+ provider catalog; the onboarding wizard is the source of truth for the complete set.',
          blocks: [
            {
              type: 'cards',
              columns: 3,
              items: [
                { icon: 'spark', title: 'Claude', body: 'Anthropic model family through the native Anthropic protocol.', tags: ['Anthropic'] },
                { icon: 'spark', title: 'GPT', body: 'OpenAI model family through the OpenAI-compatible protocol.', tags: ['OpenAI'] },
                { icon: 'spark', title: 'Gemini', body: 'Google Gemini through the native Gemini protocol.', tags: ['Google'] },
                { icon: 'spark', title: 'Grok', body: 'xAI model access.', tags: ['xAI'] },
                { icon: 'spark', title: 'Mistral', body: 'Mistral model family access.', tags: ['Mistral'] },
                { icon: 'spark', title: 'DeepSeek', body: 'DeepSeek models through its chat API.', tags: ['DeepSeek'] },
                { icon: 'spark', title: 'Qwen', body: 'Alibaba Cloud Qwen model family.', tags: ['Alibaba Cloud'] },
                { icon: 'spark', title: 'Kimi', body: 'Moonshot Kimi model family.', tags: ['Moonshot'] },
                { icon: 'spark', title: 'GLM', body: 'Zhipu GLM model family.', tags: ['Zhipu'] },
                { icon: 'spark', title: 'Doubao', body: 'ByteDance Doubao models.', tags: ['ByteDance'] },
                { icon: 'spark', title: 'Ernie', body: 'Baidu Ernie models.', tags: ['Baidu'] },
                { icon: 'spark', title: 'Hunyuan', body: 'Tencent Hunyuan models.', tags: ['Tencent'] },
                { icon: 'spark', title: 'MiniMax', body: 'MiniMax model access.', tags: ['MiniMax'] },
                { icon: 'spark', title: 'OpenRouter', body: 'Aggregator access to multiple providers with one key.', tags: ['Aggregator'] },
                { icon: 'spark', title: 'SiliconFlow', body: 'SiliconFlow model service access.', tags: ['SiliconFlow'] },
                { icon: 'spark', title: 'Azure', body: 'Azure OpenAI service access.', tags: ['Azure'] },
                { icon: 'local', title: 'Ollama', body: 'Run locally with no cloud API key.', tags: ['Local'] },
                { icon: 'local', title: 'LM Studio', body: 'Local model server through a compatible endpoint.', tags: ['Local'] }
              ]
            }
          ]
        },
        {
          id: 'onboarding',
          kicker: 'ONBOARDING',
          title: 'One wizard to connect',
          blocks: [
            {
              type: 'steps',
              items: [
                { no: '01', title: 'Pick a provider', body: 'Choose from the preset catalog or add a custom OpenAI-compatible endpoint.' },
                { no: '02', title: 'Open the key page', body: 'The wizard links to the provider key page so you do not have to hunt through documentation.' },
                { no: '03', title: 'Paste and test', body: 'Enter the API key and run a connection test. Keys are stored in the OS keychain; the UI does not read plaintext.' },
                { no: '04', title: 'Fetch and select models', body: 'Fetch the available model list and choose which models should appear in the client.' }
              ]
            }
          ]
        },
        {
          id: 'controls',
          kicker: 'CONTROLS',
          title: 'Model controls and visible cost',
          blocks: [
            {
              type: 'cards',
              columns: 3,
              items: [
                { icon: 'settings', title: 'Provider-level parameters', body: 'Configure output-limit field, thinking toggle and effort, context window, and rate limits per provider.' },
                { icon: 'refresh', title: 'Three-layer retries', body: 'Retry failed requests through a three-layer strategy to reduce the impact of network jitter on long tasks.' },
                { icon: 'database', title: 'Cost and tokens', body: 'Estimate cost from per-model pricing; the inspector shows tokens, context usage, and execution trace.' },
                { icon: 'checkpoint', title: 'Switch anytime', body: 'Switch models in the same session; Armor Engine reselects a playbook for the model family.' },
                { icon: 'book', title: 'Context compaction', body: 'Summarize history near the context limit automatically, or run /compact manually.' },
                { icon: 'globe', title: 'Network control', body: 'System proxy, direct connection, custom HTTP, or SOCKS5 — you choose the traffic path.' }
              ]
            }
          ]
        },
        {
          id: 'notes',
          kicker: 'NOTES',
          title: 'Before you connect',
          blocks: [
            {
              type: 'notice',
              tone: 'info',
              title: 'Model capability, pricing, and terms belong to providers',
              body: 'Model lists, pricing, rate limits, and terms change. The client provides connectivity; it does not replace a provider account, quota, or compliance obligations.'
            },
            {
              type: 'prose',
              bullets: [
                'Cloud models usually require the provider\'s API key; local models can run fully offline.',
                'Relay availability, data path, and billing are controlled by the relay operator. Evaluate them yourself.',
                'API keys stay in the local OS keychain and are removed when the provider is deleted.',
                'Model output still needs verification and should not be used unreviewed for critical production operations.'
              ]
            }
          ]
        }
      ],
      closing: {
        kicker: 'NEXT',
        title: 'Put your everyday models in one client',
        body: 'Download SLB-Agent, open the onboarding wizard, and start with a key you already have.',
        ctas: [
          { label: 'Download SLB-Agent', href: RELEASES, external: true, variant: 'primary' },
          { label: 'Explore MCP and tools', href: 'en/mcp.html', variant: 'secondary' }
        ]
      }
    }
  },

  mcp: {
    zh: {
      eyebrow: 'MCP CLIENT / 插件生态',
      title: '让 Agent 接入你自己的工具，而不是被内置功能限制',
      lead: 'SLB-Agent 是标准 Model Context Protocol 客户端，支持 stdio 与 Streamable HTTP / SSE。除了 MCP Server，还可以用 Markdown 技能包沉淀领域知识。',
      meta: ['stdio + HTTP / SSE', 'mcpServers 一键导入', '6 个随包插件', '124 个红队技能文件'],
      ctas: [
        { label: '下载 SLB-Agent', href: RELEASES, external: true, variant: 'primary' },
        { label: '查看 Agent 工具', href: 'agent-tools.html', variant: 'secondary' }
      ],
      sections: [
        {
          id: 'client',
          kicker: 'MCP CLIENT',
          title: '标准协议，两种传输',
          lead: 'MCP 让模型通过统一接口调用外部工具与数据源。SLB-Agent 负责连接、配置与工具调用呈现。',
          blocks: [
            {
              type: 'cards',
              columns: 3,
              items: [
                { icon: 'plugins', title: 'stdio', body: '启动本地 MCP Server 进程，通过标准输入输出通信，适合文件系统、数据库与本地工具。', tags: ['Local', 'Process'] },
                { icon: 'globe', title: 'Streamable HTTP / SSE', body: '连接远程 MCP Server，适合托管工具、团队服务与跨网络能力。', tags: ['Remote', 'HTTP'] },
                { icon: 'settings', title: '配置导入', body: '在界面添加 Server，或一键导入 Claude Desktop / Cursor 的 mcpServers JSON。', tags: ['mcpServers', 'One-click'] }
              ]
            }
          ]
        },
        {
          id: 'connect',
          kicker: 'CONNECT',
          title: '把已有 MCP 配置带进来',
          blocks: [
            {
              type: 'steps',
              items: [
                { no: '01', title: '打开 MCP 设置', body: '在客户端设置中找到 MCP Server 管理入口。' },
                { no: '02', title: '导入或添加', body: '粘贴 Claude Desktop / Cursor 的 mcpServers JSON，或手动添加命令与参数。' },
                { no: '03', title: '检查工具', body: '连接后查看 Server 暴露的工具列表与权限范围。' },
                { no: '04', title: '在会话中调用', body: 'Agent 根据任务自动选择工具；调用过程可在执行轨迹中查看。' }
              ]
            }
          ]
        },
        {
          id: 'skills',
          kicker: 'SKILL PACKS',
          title: '用 Markdown 沉淀领域知识',
          lead: '技能包让 Agent 获得领域流程、检查清单与常驻规则。兼容 SKILL.md / skills/ 生态格式，从 GitHub 网址或本地文件导入，对所有模型生效。',
          blocks: [
            {
              type: 'cards',
              columns: 2,
              items: [
                {
                  icon: 'book',
                  title: '技能与常驻规则',
                  body: '技能描述任务步骤与交付标准；常驻规则在会话中持续生效，减少每次重复交代。',
                  tags: ['SKILL.md', 'Standing rules']
                },
                {
                  icon: 'git',
                  title: '从 GitHub 导入',
                  body: '输入仓库或技能文件网址即可导入；也可以从本地文件导入，便于团队内部维护。',
                  tags: ['GitHub URL', 'Local file']
                },
                {
                  icon: 'layers',
                  title: '对所有模型生效',
                  body: '技能包不绑定某一厂商；切换模型后仍然可用。',
                  tags: ['Model-agnostic']
                },
                {
                  icon: 'radar',
                  title: '124 个红队技能文件',
                  body: '随红队作业套件提供，覆盖侦察、Web、AD 域、提权、隧道、逆向与决策链。仅限授权场景。',
                  tags: ['Authorized use']
                }
              ]
            }
          ]
        },
        {
          id: 'bundled',
          kicker: 'BUNDLED',
          title: '随安装包分发的 6 个 MCP 插件',
          lead: '安装包内以加密形式分发，开箱可用；具体版本与插件列表以实际安装包为准。',
          blocks: [
            {
              type: 'table',
              table: {
                headers: ['插件', '能力'],
                rows: [
                  ['精简版破限 / VIP 超级破限 / 精英版破限（GLM）', 'Armor Engine 的三档插件，同一时间只启用一个'],
                  ['网页爬虫', '智能抓取、隐身浏览器、后台整站爬取与结构化数据抽取；README 记录支持多类防护页面'],
                  ['逆向分析', 'APK 体检、脱壳、jadx 反编译；源码目录密钥扫描与接口清单抽取'],
                  ['红队作业套件', '任务、资产、漏洞、CVE、载荷、WAF、WebShell、隧道、数据库、内网扫描与报告，配套 124 个技能文件']
                ]
              }
            }
          ]
        },
        {
          id: 'safety',
          kicker: 'SECURITY',
          title: '插件带来能力，也带来攻击面',
          blocks: [
            {
              type: 'notice',
              tone: 'warn',
              title: '只安装你信任的 MCP Server',
              body: 'MCP Server 可能读取文件、执行命令或访问网络。安装第三方 Server 前，请检查来源、代码与权限范围。内置红队与逆向插件仅限授权测试与安全研究。'
            },
            {
              type: 'prose',
              bullets: [
                'MCP 配置可能包含本地路径、环境变量或令牌，不要将真实配置提交到公共仓库。',
                '第三方插件的行为由其作者决定，项目不对第三方组件做安全性担保。',
                '结合四档权限模式与 Diff 预览，限制 Agent 的写入与命令执行范围。',
                '发现安全问题请通过仓库 Issue 或 Telegram 群联系维护者。'
              ]
            }
          ]
        }
      ],
      closing: {
        kicker: 'NEXT',
        title: '把你的工具链接进来',
        body: '从一个本地 MCP Server 或一份现有 mcpServers 配置开始。',
        ctas: [
          { label: '下载 SLB-Agent', href: RELEASES, external: true, variant: 'primary' },
          { label: '阅读 Agent 工具', href: 'agent-tools.html', variant: 'secondary' }
        ]
      }
    },
    en: {
      eyebrow: 'MCP CLIENT / PLUGIN ECOSYSTEM',
      title: 'Connect your own tools instead of accepting a fixed feature set',
      lead: 'SLB-Agent is a standard Model Context Protocol client supporting stdio and Streamable HTTP / SSE. Beyond MCP servers, Markdown skill packs capture domain knowledge.',
      meta: ['stdio + HTTP / SSE', 'One-click mcpServers import', '6 bundled plugins', '124 red-team skill files'],
      ctas: [
        { label: 'Download SLB-Agent', href: RELEASES, external: true, variant: 'primary' },
        { label: 'Explore agent tools', href: 'en/agent-tools.html', variant: 'secondary' }
      ],
      sections: [
        {
          id: 'client',
          kicker: 'MCP CLIENT',
          title: 'A standard protocol, two transports',
          lead: 'MCP gives models a uniform interface for external tools and data. SLB-Agent handles connection, configuration, and tool-call presentation.',
          blocks: [
            {
              type: 'cards',
              columns: 3,
              items: [
                { icon: 'plugins', title: 'stdio', body: 'Launch a local MCP server process and communicate over standard I/O, suitable for filesystems, databases, and local tools.', tags: ['Local', 'Process'] },
                { icon: 'globe', title: 'Streamable HTTP / SSE', body: 'Connect remote MCP servers for hosted tools, team services, and cross-network capabilities.', tags: ['Remote', 'HTTP'] },
                { icon: 'settings', title: 'Config import', body: 'Add a server in the UI, or import Claude Desktop / Cursor mcpServers JSON in one click.', tags: ['mcpServers', 'One-click'] }
              ]
            }
          ]
        },
        {
          id: 'connect',
          kicker: 'CONNECT',
          title: 'Bring your existing MCP configuration',
          blocks: [
            {
              type: 'steps',
              items: [
                { no: '01', title: 'Open MCP settings', body: 'Find MCP server management in the client settings.' },
                { no: '02', title: 'Import or add', body: 'Paste Claude Desktop / Cursor mcpServers JSON, or add a command and arguments manually.' },
                { no: '03', title: 'Review tools', body: 'After connecting, inspect the tools exposed by the server and their scope.' },
                { no: '04', title: 'Call from a session', body: 'The agent selects tools for the task; calls appear in the execution trace.' }
              ]
            }
          ]
        },
        {
          id: 'skills',
          kicker: 'SKILL PACKS',
          title: 'Capture domain knowledge in Markdown',
          lead: 'Skill packs give the agent domain workflows, checklists, and standing rules. They are compatible with SKILL.md / skills/ layouts, import from GitHub URLs or local files, and apply to every model.',
          blocks: [
            {
              type: 'cards',
              columns: 2,
              items: [
                { icon: 'book', title: 'Skills and standing rules', body: 'Skills describe task steps and delivery standards; standing rules remain active through the session, reducing repeated briefing.', tags: ['SKILL.md', 'Standing rules'] },
                { icon: 'git', title: 'Import from GitHub', body: 'Import a repository or skill-file URL, or use a local file for team-maintained content.', tags: ['GitHub URL', 'Local file'] },
                { icon: 'layers', title: 'Works across models', body: 'A skill pack is not tied to one provider and remains available when you switch models.', tags: ['Model-agnostic'] },
                { icon: 'radar', title: '124 red-team skill files', body: 'Included with the red-team suite: recon, web, AD, privesc, tunneling, reverse engineering, and decision chains. Authorized use only.', tags: ['Authorized use'] }
              ]
            }
          ]
        },
        {
          id: 'bundled',
          kicker: 'BUNDLED',
          title: '6 MCP plugins bundled with the installer',
          lead: 'Distributed in encrypted form inside the installer; the exact versions and list follow the installed package.',
          blocks: [
            {
              type: 'table',
              table: {
                headers: ['Plugin', 'Capability'],
                rows: [
                  ['Lite / VIP / Elite armor (GLM)', 'The three Armor Engine tiers; enable only one at a time'],
                  ['Web scraper', 'Smart fetching, stealth browser, background full-site crawling, and structured extraction; README documents support for multiple protection classes'],
                  ['Reverse analysis', 'APK inspection, unpacking, jadx decompilation; secret scanning and endpoint inventory over source trees'],
                  ['Red-team suite', 'Missions, assets, vulnerabilities, CVEs, payloads, WAF, WebShell, tunnels, databases, intranet scanning, and reporting, with 124 skill files']
                ]
              }
            }
          ]
        },
        {
          id: 'safety',
          kicker: 'SECURITY',
          title: 'Plugins add capability and attack surface',
          blocks: [
            {
              type: 'notice',
              tone: 'warn',
              title: 'Only install MCP servers you trust',
              body: 'An MCP server may read files, execute commands, or access the network. Review its origin, code, and permissions before installing. Bundled red-team and reverse-engineering plugins are for authorized testing and security research only.'
            },
            {
              type: 'prose',
              bullets: [
                'MCP configuration may contain local paths, environment variables, or tokens. Never commit real configuration to a public repository.',
                'Third-party plugin behavior is controlled by its author; this project makes no security guarantee for third-party components.',
                'Use the four permission modes and diff preview to limit file writes and command execution.',
                'Report security issues through the repository Issue tracker or Telegram group.'
              ]
            }
          ]
        }
      ],
      closing: {
        kicker: 'NEXT',
        title: 'Connect the tools you already use',
        body: 'Start with a local MCP server or an existing mcpServers configuration.',
        ctas: [
          { label: 'Download SLB-Agent', href: RELEASES, external: true, variant: 'primary' },
          { label: 'Read about agent tools', href: 'en/agent-tools.html', variant: 'secondary' }
        ]
      }
    }
  },

  'agent-tools': {
    zh: {
      eyebrow: 'AGENT TOOLS / 真执行',
      title: '不是聊天框：读文件、跑命令、抓网页，也能退回去',
      lead: 'SLB-Agent 的 Agent 工具箱让模型在本地执行任务。四档权限模式、写前 Diff、检查点与文件回滚，把「让它动手」变成可控的操作。',
      meta: ['文件 / 命令 / 网络工具', '四档权限模式', '检查点 + 文件回滚', '上下文压缩 / 成本可见'],
      ctas: [
        { label: '下载 SLB-Agent', href: RELEASES, external: true, variant: 'primary' },
        { label: '查看 MCP 插件', href: 'mcp.html', variant: 'secondary' }
      ],
      sections: [
        {
          id: 'toolbox',
          kicker: 'TOOLBOX',
          title: '十个常用工具，覆盖真实任务',
          blocks: [
            {
              type: 'cards',
              columns: 3,
              items: [
                { icon: 'folder', title: '浏览目录', body: '查看项目结构，按路径读取文件与目录内容。' },
                { icon: 'file', title: '读文件 / glob', body: '读取文本文件，用 glob 按模式查找文件。' },
                { icon: 'search', title: '正则搜索', body: '在项目中按正则表达式搜索代码、配置与日志。' },
                { icon: 'edit', title: '写文件 / 精确编辑', body: '创建或修改文件；写入前展示 Diff，避免无声覆盖。' },
                { icon: 'terminal', title: '执行命令', body: '调用 zsh 或 PowerShell 执行终端命令，并读取输出。' },
                { icon: 'globe', title: '联网搜索', body: '通过搜索工具获取外部信息，补充模型知识。' },
                { icon: 'download', title: '抓取网页', body: '抓取页面正文，供 Agent 阅读与整理。' },
                { icon: 'check', title: '待办清单', body: '把多步骤任务拆成待办，逐项执行与勾选。' },
                { icon: 'book', title: '项目指令', body: '自动读取 AGENTS.md / CLAUDE.md / GEMINI.md / .cursorrules，/init 一键生成。' },
                { icon: 'layers', title: '拖放路径', body: '将文件或文件夹拖入对话，自动填入绝对路径。' }
              ]
            }
          ]
        },
        {
          id: 'permissions',
          kicker: 'PERMISSIONS',
          title: '四档权限，按任务选择',
          blocks: [
            {
              type: 'table',
              table: {
                headers: ['模式', '适合场景', '行为'],
                rows: [
                  ['计划', '先讨论方案、不希望改动文件', '只出计划，不执行写入'],
                  ['询问', '需要逐步确认的高风险任务', '每次关键动作前请求确认'],
                  ['自动编辑', '日常代码与文档修改', '允许自动编辑，写入前展示 Diff'],
                  ['全自动', '隔离环境中的长任务', '减少打断，仍受工具权限边界约束']
                ]
              }
            }
          ]
        },
        {
          id: 'checkpoints',
          kicker: 'CHECKPOINTS',
          title: '检查点：连文件一起回滚',
          lead: '普通聊天客户端的「重新生成」不会恢复文件。SLB-Agent 的检查点把消息状态与 Agent 修改过的文件绑定，回滚时一起恢复。',
          blocks: [
            {
              type: 'steps',
              items: [
                { no: '01', title: '任务开始前建立检查点', body: '在关键操作前记录消息与文件状态。' },
                { no: '02', title: '执行中保留 Diff', body: '每次写入展示差异，确认改了什么。' },
                { no: '03', title: '发现问题时回滚', body: '回滚到任意一条消息之前，Agent 改过的文件同步恢复。' },
                { no: '04', title: '继续或换方案', body: '回到安全状态后重新下达任务，不必手动清理残留文件。' }
              ]
            }
          ]
        },
        {
          id: 'context',
          kicker: 'CONTEXT',
          title: '长任务也需要上下文管理',
          blocks: [
            {
              type: 'cards',
              columns: 3,
              items: [
                { icon: 'book', title: '上下文压缩', body: '接近窗口上限时自动总结历史，也可手动执行 /compact。' },
                { icon: 'terminal', title: '斜杠命令', body: '/plan 出方案、/compact 压缩、/init 生成项目指令、/export 导出、/clear 清空。' },
                { icon: 'database', title: '会话管理', body: '搜索、按日期分组、重命名、导出 Markdown / JSON、单独删除。' },
                { icon: 'eye', title: '执行轨迹', body: '检视器显示 token、上下文占用与工具调用轨迹。' },
                { icon: 'settings', title: '项目指令', body: '自动读取项目中的指令文件，让 Agent 遵守工程约定。' },
                { icon: 'globe', title: '网络工具', body: '联网搜索与网页抓取受网络设置约束，可走系统代理或 SOCKS5。' }
              ]
            }
          ]
        },
        {
          id: 'security',
          kicker: 'SECURITY WORKFLOW',
          title: '安全研究工具链，限定在授权范围内',
          lead: '红队作业套件把任务管理、资产测绘、漏洞管理、CVE 匹配、载荷库、WAF 识别、WebShell、隧道、数据库利用、内网扫描与报告生成组织在同一工作流，并配套 124 个技能文件。',
          blocks: [
            {
              type: 'notice',
              tone: 'warn',
              title: '仅限书面授权的安全测试',
              body: '这些工具面向授权渗透测试、靶场演练与安全研究。未经授权对他人系统进行探测、渗透或数据采集，在多数司法辖区属于违法行为。使用者自行承担全部责任。'
            },
            {
              type: 'prose',
              paragraphs: [
                '使用前先确认授权范围、测试窗口与数据处理约定。关键操作应在隔离环境中进行并做好备份。',
                'APK 逆向、网页爬虫与红队套件都是双用途工具；是否合法取决于使用场景与授权，而不是工具本身。'
              ]
            }
          ]
        }
      ],
      closing: {
        kicker: 'NEXT',
        title: '从一个可回滚的任务开始',
        body: '先挂载一个测试项目，选择「询问」或「自动编辑」模式，让 Agent 在你能看见的边界内工作。',
        ctas: [
          { label: '下载 SLB-Agent', href: RELEASES, external: true, variant: 'primary' },
          { label: '阅读快速开始', href: 'docs.html', variant: 'secondary' }
        ]
      }
    },
    en: {
      eyebrow: 'AGENT TOOLS / REAL EXECUTION',
      title: 'Not a chat box: read files, run commands, fetch pages — and roll back',
      lead: 'The SLB-Agent toolbox lets models execute locally. Four permission modes, pre-write diffs, checkpoints, and file rollback make "let it work" an operation you can control.',
      meta: ['File / command / network tools', 'Four permission modes', 'Checkpoints + file rollback', 'Context compaction / cost visibility'],
      ctas: [
        { label: 'Download SLB-Agent', href: RELEASES, external: true, variant: 'primary' },
        { label: 'Explore MCP plugins', href: 'en/mcp.html', variant: 'secondary' }
      ],
      sections: [
        {
          id: 'toolbox',
          kicker: 'TOOLBOX',
          title: 'Ten everyday tools for real tasks',
          blocks: [
            {
              type: 'cards',
              columns: 3,
              items: [
                { icon: 'folder', title: 'Browse directories', body: 'Inspect project structure and read files and directories by path.' },
                { icon: 'file', title: 'Read files / glob', body: 'Read text files and find files by pattern with glob.' },
                { icon: 'search', title: 'Regex search', body: 'Search code, configuration, and logs with regular expressions.' },
                { icon: 'edit', title: 'Write / surgical edit', body: 'Create or modify files with a diff shown before every write.' },
                { icon: 'terminal', title: 'Run commands', body: 'Execute terminal commands through zsh or PowerShell and read the output.' },
                { icon: 'globe', title: 'Web search', body: 'Gather external information through search to supplement model knowledge.' },
                { icon: 'download', title: 'Fetch pages', body: 'Fetch page content for the agent to read and summarize.' },
                { icon: 'check', title: 'Todo list', body: 'Break multi-step work into todos and tick them off as execution proceeds.' },
                { icon: 'book', title: 'Project instructions', body: 'Auto-read AGENTS.md / CLAUDE.md / GEMINI.md / .cursorrules; generate one with /init.' },
                { icon: 'layers', title: 'Drag-and-drop paths', body: 'Drop files or folders into the conversation to insert absolute paths.' }
              ]
            }
          ]
        },
        {
          id: 'permissions',
          kicker: 'PERMISSIONS',
          title: 'Four permission modes for different tasks',
          blocks: [
            {
              type: 'table',
              table: {
                headers: ['Mode', 'Best for', 'Behavior'],
                rows: [
                  ['Plan', 'Discussing an approach without changing files', 'Produce a plan; do not write'],
                  ['Ask', 'High-risk tasks that need step-by-step confirmation', 'Ask before each critical action'],
                  ['Auto-edit', 'Everyday code and document edits', 'Allow edits with a diff before writing'],
                  ['Full-auto', 'Long tasks in an isolated environment', 'Fewer interruptions, still bounded by tool permissions']
                ]
              }
            }
          ]
        },
        {
          id: 'checkpoints',
          kicker: 'CHECKPOINTS',
          title: 'Checkpoints that roll back files too',
          lead: 'Regenerating a reply in a chat client does not restore files. SLB-Agent binds the message state to files the agent changed, so rollback restores both.',
          blocks: [
            {
              type: 'steps',
              items: [
                { no: '01', title: 'Create a checkpoint before work', body: 'Record message and file state before a critical operation.' },
                { no: '02', title: 'Keep diffs during execution', body: 'Every write shows exactly what changed.' },
                { no: '03', title: 'Roll back when something breaks', body: 'Return to before any message and restore the files the agent touched.' },
                { no: '04', title: 'Continue or change approach', body: 'Retry from a safe state without manually cleaning up leftover files.' }
              ]
            }
          ]
        },
        {
          id: 'context',
          kicker: 'CONTEXT',
          title: 'Long tasks need context management too',
          blocks: [
            {
              type: 'cards',
              columns: 3,
              items: [
                { icon: 'book', title: 'Context compaction', body: 'Summarize history near the context limit automatically, or run /compact manually.' },
                { icon: 'terminal', title: 'Slash commands', body: '/plan, /compact, /init, /export, /clear.' },
                { icon: 'database', title: 'Session management', body: 'Search, group by date, rename, export Markdown / JSON, and delete individually.' },
                { icon: 'eye', title: 'Execution trace', body: 'The inspector shows tokens, context usage, and tool calls.' },
                { icon: 'settings', title: 'Project instructions', body: 'Automatically read instruction files so the agent follows engineering conventions.' },
                { icon: 'globe', title: 'Network tools', body: 'Web search and fetching follow network settings, including system proxy or SOCKS5.' }
              ]
            }
          ]
        },
        {
          id: 'security',
          kicker: 'SECURITY WORKFLOW',
          title: 'A security toolchain limited to authorized work',
          lead: 'The red-team suite organizes missions, asset mapping, vulnerability management, CVE matching, payloads, WAF identification, WebShell, tunnels, database utilization, intranet scanning, and reporting in one workflow, with 124 skill files.',
          blocks: [
            {
              type: 'notice',
              tone: 'warn',
              title: 'Security testing with written authorization only',
              body: 'These tools target authorized penetration testing, lab exercises, and security research. Probing, penetrating, or collecting data from systems without authorization is illegal in most jurisdictions. Users accept full responsibility.'
            },
            {
              type: 'prose',
              paragraphs: [
                'Confirm scope, test window, and data-handling rules before use. Run critical operations in an isolated environment and keep backups.',
                'APK reverse engineering, web scraping, and the red-team suite are dual-use. Legality depends on the scenario and authorization, not the tool alone.'
              ]
            }
          ]
        }
      ],
      closing: {
        kicker: 'NEXT',
        title: 'Start with a task you can roll back',
        body: 'Mount a test project, choose Ask or Auto-edit, and let the agent work inside boundaries you can see.',
        ctas: [
          { label: 'Download SLB-Agent', href: RELEASES, external: true, variant: 'primary' },
          { label: 'Read the quick start', href: 'en/docs.html', variant: 'secondary' }
        ]
      }
    }
  },

  'apk-analysis': {
    zh: {
      eyebrow: 'APK ANALYSIS / 逆向分析',
      title: '把 APK 分析放进 Agent 会话，而不是在工具之间搬运',
      lead: '内置逆向分析 MCP 插件支持 APK 体检、脱壳与 jadx 反编译，也能对源码目录做密钥扫描与接口清单抽取。分析结果可以继续交给 Agent 整理。',
      meta: ['APK 体检', '脱壳 + jadx', '密钥扫描', '接口清单抽取'],
      ctas: [
        { label: '下载 SLB-Agent', href: RELEASES, external: true, variant: 'primary' },
        { label: '查看 Agent 工具', href: 'agent-tools.html', variant: 'secondary' }
      ],
      sections: [
        {
          id: 'capabilities',
          kicker: 'CAPABILITIES',
          title: '从包体到代码线索',
          blocks: [
            {
              type: 'cards',
              columns: 2,
              items: [
                { icon: 'phone', title: 'APK 体检', body: '查看包体基础信息与结构，为后续分析建立上下文。', tags: ['Inspection'] },
                { icon: 'box', title: '脱壳', body: '对加壳 APK 做脱壳处理，暴露可分析的代码与资源。', tags: ['Unpacking'] },
                { icon: 'code', title: 'jadx 反编译', body: '将 DEX 反编译为可读的 Java 源码，便于检索与审阅。', tags: ['jadx'] },
                { icon: 'key', title: '密钥扫描', body: '在源码目录中搜索硬编码密钥、令牌与敏感配置。', tags: ['Secrets'] },
                { icon: 'search', title: '接口清单', body: '抽取源码中的接口、域名与端点线索，形成可继续调查的清单。', tags: ['Endpoints'] },
                { icon: 'terminal', title: '在会话中继续', body: '把输出交给 Agent，继续做检索、整理、对照与报告草稿。', tags: ['Agent workflow'] }
              ]
            }
          ]
        },
        {
          id: 'workflow',
          kicker: 'WORKFLOW',
          title: '一条可复现的分析路径',
          blocks: [
            {
              type: 'steps',
              items: [
                { no: '01', title: '确认授权与边界', body: '只分析你拥有或已获得明确授权的应用；记录范围与数据处理要求。' },
                { no: '02', title: '体检与环境准备', body: '检查 APK 基础信息，确认需要的工具链与输出目录。' },
                { no: '03', title: '脱壳与反编译', body: '按包体情况脱壳，然后用 jadx 生成可读源码。' },
                { no: '04', title: '扫描与抽取', body: '对源码目录做密钥扫描与接口清单抽取，保留原始输出。' },
                { no: '05', title: '让 Agent 整理线索', body: '把结果交给 Agent 归纳风险点、可疑配置与后续验证步骤。' }
              ]
            }
          ]
        },
        {
          id: 'scope',
          kicker: 'SCOPE',
          title: '能做什么，不承诺什么',
          blocks: [
            {
              type: 'prose',
              bullets: [
                '插件依赖本地工具链与包体情况；不同 APK 的脱壳与反编译难度差异很大。',
                '反编译结果可能缺失、混淆或不可读，不能保证还原完整源码。',
                '密钥扫描与接口抽取是线索发现，不等于漏洞确认；需要人工复核与授权测试。',
                '分析结果可能包含敏感信息，请存放在受控目录，不要上传到公共仓库。'
              ]
            },
            {
              type: 'notice',
              tone: 'warn',
              title: '仅限合法授权',
              body: '未经授权分析他人应用、绕过保护措施或获取敏感数据可能违法。请在获得书面授权的范围内使用，并遵守当地法律与平台条款。'
            }
          ]
        }
      ],
      closing: {
        kicker: 'NEXT',
        title: '把逆向线索接回研究工作流',
        body: '下载 SLB-Agent，在授权项目中挂载样本，用 Agent 串起分析、整理与复核。',
        ctas: [
          { label: '前往 Releases', href: RELEASES, external: true, variant: 'primary' },
          { label: '查看安全研究工作流', href: 'agent-tools.html#security', variant: 'secondary' }
        ]
      }
    },
    en: {
      eyebrow: 'APK ANALYSIS / REVERSE ENGINEERING',
      title: 'Put APK analysis inside the agent session, not between tools',
      lead: 'The bundled reverse-analysis MCP plugin supports APK inspection, unpacking, and jadx decompilation, plus secret scanning and endpoint inventory over source trees. Results can go straight back to the agent.',
      meta: ['APK inspection', 'Unpacking + jadx', 'Secret scanning', 'Endpoint inventory'],
      ctas: [
        { label: 'Download SLB-Agent', href: RELEASES, external: true, variant: 'primary' },
        { label: 'Explore agent tools', href: 'en/agent-tools.html', variant: 'secondary' }
      ],
      sections: [
        {
          id: 'capabilities',
          kicker: 'CAPABILITIES',
          title: 'From package to code-level leads',
          blocks: [
            {
              type: 'cards',
              columns: 2,
              items: [
                { icon: 'phone', title: 'APK inspection', body: 'Review package metadata and structure to establish context for further analysis.', tags: ['Inspection'] },
                { icon: 'box', title: 'Unpacking', body: 'Unpack packed APKs to expose analyzable code and resources.', tags: ['Unpacking'] },
                { icon: 'code', title: 'jadx decompilation', body: 'Decompile DEX into readable Java source for search and review.', tags: ['jadx'] },
                { icon: 'key', title: 'Secret scanning', body: 'Search source trees for hard-coded keys, tokens, and sensitive configuration.', tags: ['Secrets'] },
                { icon: 'search', title: 'Endpoint inventory', body: 'Extract endpoints, domains, and URL leads into a list for further investigation.', tags: ['Endpoints'] },
                { icon: 'terminal', title: 'Continue in-session', body: 'Hand output back to the agent for search, organization, comparison, and report drafts.', tags: ['Agent workflow'] }
              ]
            }
          ]
        },
        {
          id: 'workflow',
          kicker: 'WORKFLOW',
          title: 'A reproducible analysis path',
          blocks: [
            {
              type: 'steps',
              items: [
                { no: '01', title: 'Confirm authorization and scope', body: 'Analyze only apps you own or have explicit permission to test; record scope and data-handling rules.' },
                { no: '02', title: 'Inspect and prepare', body: 'Check APK metadata and confirm the required toolchain and output directory.' },
                { no: '03', title: 'Unpack and decompile', body: 'Unpack according to the package, then generate readable source with jadx.' },
                { no: '04', title: 'Scan and extract', body: 'Run secret scanning and endpoint inventory over the source tree, preserving raw output.' },
                { no: '05', title: 'Let the agent organize', body: 'Ask the agent to summarize risk points, suspicious configuration, and verification steps.' }
              ]
            }
          ]
        },
        {
          id: 'scope',
          kicker: 'SCOPE',
          title: 'What it does — and what it does not promise',
          blocks: [
            {
              type: 'prose',
              bullets: [
                'The plugin depends on local tooling and the package itself; unpacking and decompilation difficulty varies widely.',
                'Decompiled output may be missing, obfuscated, or unreadable. Full source recovery is not guaranteed.',
                'Secret scanning and endpoint extraction produce leads, not confirmed vulnerabilities. Human review and authorized testing are required.',
                'Analysis output may contain sensitive data. Keep it in a controlled directory and never commit it to a public repository.'
              ]
            },
            {
              type: 'notice',
              tone: 'warn',
              title: 'Lawful authorization only',
              body: 'Analyzing someone else\'s app without permission, bypassing protections, or collecting sensitive data may be illegal. Use only within written authorization and comply with local law and platform terms.'
            }
          ]
        }
      ],
      closing: {
        kicker: 'NEXT',
        title: 'Connect reverse-engineering leads to the research workflow',
        body: 'Download SLB-Agent, mount a sample in an authorized project, and let the agent connect analysis, organization, and review.',
        ctas: [
          { label: 'Open Releases', href: RELEASES, external: true, variant: 'primary' },
          { label: 'See the security workflow', href: 'en/agent-tools.html#security', variant: 'secondary' }
        ]
      }
    }
  },

  download: {
    zh: {
      eyebrow: 'DOWNLOAD',
      title: '下载 SLB-Agent',
      lead: 'Windows、macOS、Linux 安装包统一发布在 GitHub Releases。请从最新 Release 选择与你系统匹配的文件；本站不托管安装包，也不提供绕过 Release 页面的直链。',
      meta: ['Windows 10/11', 'macOS Apple Silicon / Intel', 'Linux x64 / arm64', '7 个安装包'],
      ctas: [
        { label: '前往 GitHub Releases', href: RELEASES, external: true, variant: 'primary' },
        { label: '查看安装文档', href: 'docs.html', variant: 'secondary' }
      ],
      sections: [
        {
          id: 'packages',
          kicker: 'PACKAGES',
          title: '选择对应平台与架构',
          lead: 'README 当前记录 v1.1.15，共 7 个安装包。版本号、文件大小与校验值请始终以 Releases 页面为准。',
          blocks: [
            {
              type: 'table',
              table: {
                headers: ['平台', '架构', '文件类型', '下载'],
                rows: [
                  ['Windows 10/11', 'x64 + x86', '`.exe` 安装包', '[GitHub Releases](https://github.com/joyfulneurob/SLB-Agent/releases/latest)'],
                  ['macOS', 'Apple Silicon（M 系列）', '`.dmg`', '[GitHub Releases](https://github.com/joyfulneurob/SLB-Agent/releases/latest)'],
                  ['macOS', 'Intel', '`.dmg`', '[GitHub Releases](https://github.com/joyfulneurob/SLB-Agent/releases/latest)'],
                  ['Linux', 'x86_64', '`.deb`', '[GitHub Releases](https://github.com/joyfulneurob/SLB-Agent/releases/latest)'],
                  ['Linux', 'x86_64', '`.AppImage`', '[GitHub Releases](https://github.com/joyfulneurob/SLB-Agent/releases/latest)'],
                  ['Linux', 'arm64', '`.deb`', '[GitHub Releases](https://github.com/joyfulneurob/SLB-Agent/releases/latest)'],
                  ['Linux', 'arm64', '`.AppImage`', '[GitHub Releases](https://github.com/joyfulneurob/SLB-Agent/releases/latest)']
                ]
              }
            }
          ]
        },
        {
          id: 'install',
          kicker: 'INSTALL',
          title: '安装步骤',
          blocks: [
            {
              type: 'cards',
              columns: 3,
              items: [
                {
                  icon: 'windows',
                  title: 'Windows',
                  body: '下载 .exe 后双击运行；若 SmartScreen 提示，核对来源后选择「更多信息 → 仍要运行」，按向导完成安装。'
                },
                {
                  icon: 'apple',
                  title: 'macOS',
                  body: '下载对应芯片的 .dmg，拖入「应用程序」。首次打开若提示无法验证开发者，到系统设置 → 隐私与安全性选择「仍要打开」。'
                },
                {
                  icon: 'linux',
                  title: 'Linux',
                  body: 'deb：sudo apt install ./文件名.deb。AppImage：chmod +x 后运行。Ubuntu 22.04+ 可能需要 libfuse2。'
                }
              ]
            }
          ]
        },
        {
          id: 'verify',
          kicker: 'VERIFY',
          title: '校验下载完整性',
          lead: 'Releases 页面提供每个安装包的 SHA-256。下载后核对哈希，确认文件未被调包或损坏。',
          blocks: [
            {
              type: 'prose',
              code: `# macOS
shasum -a 256 <安装包文件名>

# Windows PowerShell
Get-FileHash <安装包文件名>

# Linux
sha256sum <安装包文件名>`
            },
            {
              type: 'notice',
              tone: 'info',
              title: '以 Release 页面为准',
              body: '本站不硬编码校验值，避免版本更新后显示过期信息。请打开最新 Release，复制对应文件的 SHA-256 后与本地计算结果比对。'
            }
          ]
        },
        {
          id: 'notes',
          kicker: 'NOTES',
          title: '下载前须知',
          blocks: [
            {
              type: 'prose',
              bullets: [
                'Release 页最下方的 Source code (zip/tar.gz) 是 GitHub 自动生成的文档仓库快照，不包含客户端程序源码。',
                '安装包内置试用期；试用期结束后需要离线授权密钥解锁完整功能。',
                '客户端不上传会话、无云端账号体系；API Key 保存在本机系统钥匙串。',
                '若下载缓慢，可尝试网络代理或换一个时间段；本站不提供第三方网盘镜像。'
              ]
            }
          ]
        }
      ],
      closing: {
        kicker: 'READY',
        title: '下载后，从接入向导开始',
        body: '第一次启动会打开模型接入向导：选厂商、粘贴 Key、测试连接、勾选模型。',
        ctas: [
          { label: '前往 GitHub Releases', href: RELEASES, external: true, variant: 'primary' },
          { label: '查看快速开始', href: 'docs.html', variant: 'secondary' }
        ]
      }
    },
    en: {
      eyebrow: 'DOWNLOAD',
      title: 'Download SLB-Agent',
      lead: 'Windows, macOS, and Linux installers are published together on GitHub Releases. Choose the file that matches your system from the latest Release. This site does not host installers or provide links that bypass the Release page.',
      meta: ['Windows 10/11', 'macOS Apple Silicon / Intel', 'Linux x64 / arm64', '7 installers'],
      ctas: [
        { label: 'Open GitHub Releases', href: RELEASES, external: true, variant: 'primary' },
        { label: 'Read installation docs', href: 'en/docs.html', variant: 'secondary' }
      ],
      sections: [
        {
          id: 'packages',
          kicker: 'PACKAGES',
          title: 'Choose your platform and architecture',
          lead: 'The README currently records v1.1.15 with 7 installers. Always confirm version, size, and checksums on the Releases page.',
          blocks: [
            {
              type: 'table',
              table: {
                headers: ['Platform', 'Architecture', 'File type', 'Download'],
                rows: [
                  ['Windows 10/11', 'x64 + x86', '`.exe` installer', '[GitHub Releases](https://github.com/joyfulneurob/SLB-Agent/releases/latest)'],
                  ['macOS', 'Apple Silicon (M series)', '`.dmg`', '[GitHub Releases](https://github.com/joyfulneurob/SLB-Agent/releases/latest)'],
                  ['macOS', 'Intel', '`.dmg`', '[GitHub Releases](https://github.com/joyfulneurob/SLB-Agent/releases/latest)'],
                  ['Linux', 'x86_64', '`.deb`', '[GitHub Releases](https://github.com/joyfulneurob/SLB-Agent/releases/latest)'],
                  ['Linux', 'x86_64', '`.AppImage`', '[GitHub Releases](https://github.com/joyfulneurob/SLB-Agent/releases/latest)'],
                  ['Linux', 'arm64', '`.deb`', '[GitHub Releases](https://github.com/joyfulneurob/SLB-Agent/releases/latest)'],
                  ['Linux', 'arm64', '`.AppImage`', '[GitHub Releases](https://github.com/joyfulneurob/SLB-Agent/releases/latest)']
                ]
              }
            }
          ]
        },
        {
          id: 'install',
          kicker: 'INSTALL',
          title: 'Installation',
          blocks: [
            {
              type: 'cards',
              columns: 3,
              items: [
                { icon: 'windows', title: 'Windows', body: 'Run the downloaded .exe. If SmartScreen warns, verify the source, choose "More info → Run anyway", and follow the wizard.' },
                { icon: 'apple', title: 'macOS', body: 'Download the .dmg for your chip and drag the app to Applications. If macOS blocks the first launch, allow it under System Settings → Privacy & Security.' },
                { icon: 'linux', title: 'Linux', body: 'deb: sudo apt install ./file.deb. AppImage: chmod +x then run. Ubuntu 22.04+ may need libfuse2.' }
              ]
            }
          ]
        },
        {
          id: 'verify',
          kicker: 'VERIFY',
          title: 'Verify the download',
          lead: 'Every Release lists a SHA-256 for each installer. Compare it after download to confirm the file was not replaced or corrupted.',
          blocks: [
            {
              type: 'prose',
              code: `# macOS
shasum -a 256 <installer-file>

# Windows PowerShell
Get-FileHash <installer-file>

# Linux
sha256sum <installer-file>`
            },
            {
              type: 'notice',
              tone: 'info',
              title: 'The Release page is authoritative',
              body: 'This site does not hard-code checksums, so it cannot show stale values after an update. Open the latest Release, copy the SHA-256 for your file, and compare it with your local calculation.'
            }
          ]
        },
        {
          id: 'notes',
          kicker: 'NOTES',
          title: 'Before you download',
          blocks: [
            {
              type: 'prose',
              bullets: [
                'Source code (zip/tar.gz) at the bottom of the Release page is an auto-generated snapshot of the documentation repository, not the client source.',
                'The installer includes a trial period; an offline license key unlocks full features after it ends.',
                'The client does not upload sessions and has no cloud account. API keys are stored in the local OS keychain.',
                'If downloads are slow, try a proxy or another time. This site does not offer third-party mirror links.'
              ]
            }
          ]
        }
      ],
      closing: {
        kicker: 'READY',
        title: 'After download, start with onboarding',
        body: 'The first launch opens the model onboarding wizard: pick a provider, paste a key, test, and select models.',
        ctas: [
          { label: 'Open GitHub Releases', href: RELEASES, external: true, variant: 'primary' },
          { label: 'Read the quick start', href: 'en/docs.html', variant: 'secondary' }
        ]
      }
    }
  },

  docs: {
    zh: {
      eyebrow: 'DOCUMENTATION',
      title: '从安装到第一个任务',
      lead: '这份快速开始覆盖安装、模型接入、挂载项目、权限选择与常见问题。更完整的版本说明与更新日志在 GitHub 仓库。',
      meta: ['快速开始', 'API Key 接入', '第一个任务', '故障排查'],
      ctas: [
        { label: '下载 SLB-Agent', href: RELEASES, external: true, variant: 'primary' },
        { label: '打开完整 README', href: REPO, external: true, variant: 'secondary' }
      ],
      sections: [
        {
          id: 'quickstart',
          kicker: 'QUICK START',
          title: '三步开始',
          blocks: [
            {
              type: 'steps',
              items: [
                { no: '01', title: '安装并启动', body: '从 Releases 下载对应平台安装包并安装。首次启动会自动打开「接入引导」。' },
                { no: '02', title: '接入模型', body: '选择厂商 → 打开密钥页 → 粘贴 API Key → 测试连接 → 勾选模型。' },
                { no: '03', title: '挂载文件夹开工', body: '顶栏「挂载文件夹」，把项目目录拖进来，然后直接下达任务。' }
              ]
            },
            {
              type: 'prose',
              code: `# 可以试试的第一句话
帮我看看这个项目的结构，找出所有硬编码的密钥和接口地址`
            }
          ]
        },
        {
          id: 'api-key',
          kicker: 'API KEYS',
          title: 'API Key 怎么准备',
          blocks: [
            {
              type: 'prose',
              paragraphs: [
                '云端模型需要对应服务商的 API Key。接入向导中每家厂商都有「打开密钥页面」按钮，前往官网注册并创建 Key。DeepSeek、智谱、Kimi 等国内厂商通常为新用户提供一定免费额度，具体以厂商页面为准。',
                '完全离线方案：安装 Ollama 并在本地拉取模型，无需任何云端 Key。LM Studio 也可以通过兼容接口接入。'
              ]
            },
            {
              type: 'notice',
              tone: 'info',
              title: '不要把 API Key 写进项目文件',
              body: 'API Key 应只保存在客户端的安全存储中。不要提交到 Git、粘贴到公开 Issue 或写入共享配置。'
            }
          ]
        },
        {
          id: 'first-task',
          kicker: 'FIRST TASK',
          title: '选择适合的权限模式',
          blocks: [
            {
              type: 'prose',
              bullets: [
                '第一次使用建议选择「询问」或「自动编辑」，观察 Agent 的文件修改与命令执行。',
                '写文件前查看 Diff，确认改动范围；需要撤销时使用检查点回滚。',
                '长任务使用 /plan 先出方案，接近上下文上限时用 /compact 压缩。',
                '项目指令可写入 AGENTS.md / CLAUDE.md / GEMINI.md，或执行 /init 生成。'
              ]
            }
          ]
        },
        {
          id: 'troubleshooting',
          kicker: 'TROUBLESHOOTING',
          title: '常见问题排查',
          blocks: [
            {
              type: 'table',
              table: {
                headers: ['现象', '可以尝试'],
                rows: [
                  ['模型列表拉取失败', '检查 Base URL、API Key 与余额；确认服务商支持所选协议'],
                  ['请求超时或 429', '检查速率上限与账户配额；调整并发或稍后重试'],
                  ['命令执行失败', '确认 shell 环境（zsh / PowerShell）与工作目录权限'],
                  ['写入被拒绝', '检查权限模式、目标文件是否只读、是否在挂载目录内'],
                  ['macOS 无法打开', '系统设置 → 隐私与安全性 → 仍要打开；确认下载的架构正确'],
                  ['Linux AppImage 无法运行', 'chmod +x；Ubuntu 22.04+ 安装 libfuse2；必要时参考 Release 说明']
                ]
              }
            }
          ]
        },
        {
          id: 'resources',
          kicker: 'RESOURCES',
          title: '继续阅读',
          blocks: [
            {
              type: 'links',
              items: [
                { title: 'GitHub README（中文）', body: '完整功能说明、Armor Engine 细节、插件与授权信息。', href: `${REPO}#readme`, external: true },
                { title: 'README（English）', body: 'English documentation for features, Armor Engine, plugins, and licensing.', href: `${REPO}/blob/main/README_EN.md`, external: true },
                { title: 'Releases', body: '安装包、版本说明与 SHA-256 校验值。', href: RELEASES, external: true },
                { title: 'Telegram 交流群', body: '插件、MCP 配置、技能包与使用问题。', href: TELEGRAM, external: true }
              ]
            }
          ]
        }
      ],
      closing: {
        kicker: 'NEED HELP?',
        title: '遇到文档没覆盖的问题',
        body: '先在 FAQ 查找，再到 GitHub Issue 或 Telegram 群提问，附上系统、版本与错误信息会更快定位。',
        ctas: [
          { label: '查看 FAQ', href: 'faq.html', variant: 'primary' },
          { label: '打开 GitHub Issues', href: `${REPO}/issues`, external: true, variant: 'secondary' }
        ]
      }
    },
    en: {
      eyebrow: 'DOCUMENTATION',
      title: 'From installation to your first task',
      lead: 'This quick start covers installation, model onboarding, mounting a project, permission choices, and common issues. The GitHub repository has the full release notes and documentation.',
      meta: ['Quick start', 'API key onboarding', 'First task', 'Troubleshooting'],
      ctas: [
        { label: 'Download SLB-Agent', href: RELEASES, external: true, variant: 'primary' },
        { label: 'Open the full README', href: `${REPO}/blob/main/README_EN.md`, external: true, variant: 'secondary' }
      ],
      sections: [
        {
          id: 'quickstart',
          kicker: 'QUICK START',
          title: 'Three steps to start',
          blocks: [
            {
              type: 'steps',
              items: [
                { no: '01', title: 'Install and launch', body: 'Download the installer for your platform from Releases. The onboarding wizard opens on first launch.' },
                { no: '02', title: 'Connect a model', body: 'Pick a provider → open its key page → paste the API key → test the connection → select models.' },
                { no: '03', title: 'Mount a folder', body: 'Use "Mount folder" in the top bar, drag your project in, and give the agent a task.' }
              ]
            },
            {
              type: 'prose',
              code: `# A good first prompt
Review this project's structure and find all hard-coded secrets and API endpoints.`
            }
          ]
        },
        {
          id: 'api-key',
          kicker: 'API KEYS',
          title: 'Preparing an API key',
          blocks: [
            {
              type: 'prose',
              paragraphs: [
                'Cloud models require an API key from the corresponding provider. The onboarding wizard links to each provider\'s key page. Some providers offer new-user credits; check the provider page for current terms.',
                'For a fully offline setup, install Ollama and pull a local model — no cloud key required. LM Studio can also connect through a compatible endpoint.'
              ]
            },
            {
              type: 'notice',
              tone: 'info',
              title: 'Never put API keys in project files',
              body: 'Keep API keys in the client\'s secure storage. Do not commit them to Git, paste them into public issues, or write them into shared configuration.'
            }
          ]
        },
        {
          id: 'first-task',
          kicker: 'FIRST TASK',
          title: 'Choose the right permission mode',
          blocks: [
            {
              type: 'prose',
              bullets: [
                'For a first run, choose Ask or Auto-edit and watch file edits and command execution.',
                'Review the diff before every write, and use checkpoint rollback when you need to undo.',
                'For long tasks, use /plan first and /compact when approaching the context limit.',
                'Project instructions can live in AGENTS.md / CLAUDE.md / GEMINI.md, or be generated with /init.'
              ]
            }
          ]
        },
        {
          id: 'troubleshooting',
          kicker: 'TROUBLESHOOTING',
          title: 'Common issues',
          blocks: [
            {
              type: 'table',
              table: {
                headers: ['Symptom', 'What to try'],
                rows: [
                  ['Model list fails to load', 'Check base URL, API key, and balance; confirm the provider supports the selected protocol'],
                  ['Timeout or 429', 'Check rate limits and quota; reduce concurrency or retry later'],
                  ['Command execution fails', 'Confirm the shell environment (zsh / PowerShell) and working-directory permissions'],
                  ['Write is rejected', 'Check permission mode, read-only target files, and whether the path is inside the mounted folder'],
                  ['macOS will not open the app', 'Allow it under System Settings → Privacy & Security; confirm the correct architecture'],
                  ['Linux AppImage will not run', 'chmod +x; install libfuse2 on Ubuntu 22.04+; check the Release notes']
                ]
              }
            }
          ]
        },
        {
          id: 'resources',
          kicker: 'RESOURCES',
          title: 'Keep reading',
          blocks: [
            {
              type: 'links',
              items: [
                { title: 'GitHub README (English)', body: 'Full feature documentation, Armor Engine details, plugins, and licensing.', href: `${REPO}/blob/main/README_EN.md`, external: true },
                { title: 'README (中文)', body: '完整中文功能说明、Armor Engine 细节、插件与授权信息。', href: `${REPO}#readme`, external: true },
                { title: 'Releases', body: 'Installers, release notes, and SHA-256 checksums.', href: RELEASES, external: true },
                { title: 'Telegram community', body: 'Plugins, MCP configuration, skill packs, and usage questions.', href: TELEGRAM, external: true }
              ]
            }
          ]
        }
      ],
      closing: {
        kicker: 'NEED HELP?',
        title: 'If the docs do not cover it',
        body: 'Check the FAQ first, then open a GitHub Issue or ask in Telegram. Include your OS, version, and error details.',
        ctas: [
          { label: 'Read the FAQ', href: 'en/faq.html', variant: 'primary' },
          { label: 'Open GitHub Issues', href: `${REPO}/issues`, external: true, variant: 'secondary' }
        ]
      }
    }
  },

  faq: {
    zh: {
      eyebrow: 'FAQ',
      title: '常见问题',
      lead: '关于安装、模型接入、授权、隐私、Armor Engine 边界与安全研究用途的集中回答。没有覆盖的问题，可以到 GitHub Issue 或 Telegram 群提问。',
      meta: ['安装与下载', 'API Key', '授权与试用', '隐私与安全'],
      ctas: [
        { label: '下载 SLB-Agent', href: RELEASES, external: true, variant: 'primary' },
        { label: '阅读快速开始', href: 'docs.html', variant: 'secondary' }
      ],
      sections: [
        {
          id: 'general',
          kicker: 'GENERAL',
          title: '产品与使用',
          blocks: [
            {
              type: 'faq',
              items: [
                {
                  q: 'SLB-Agent 是什么？',
                  a: 'SLB-Agent 是一个本地优先的桌面 AI Agent。它通过 OpenAI 兼容、Anthropic、Gemini 三套协议接入模型，提供文件读写、命令执行、网页抓取、MCP 插件、技能包、检查点回滚，以及 Armor Engine 破限工具链。'
                },
                {
                  q: '和网页版 ChatGPT / Claude 有什么区别？',
                  a: '网页版主要提供对话。SLB-Agent 能读取你挂载的项目、修改文件、执行终端命令、抓取网页，并通过检查点回滚文件。Armor Engine 则把模型拒绝后的处理组织为工具链。'
                },
                {
                  q: 'SLB-Agent 可以作为 Ollama 客户端吗？',
                  a: '可以。Ollama 启动本地服务后，通过兼容接口接入即可，无需云端 API Key。SLB-Agent 是完整的桌面 AI Agent，不只是 Ollama GUI：还能读写文件、执行命令、使用 MCP 工具和检查点回滚。'
                },
                {
                  q: '它适合 AI 破限研究吗？',
                  a: 'Armor Engine（破甲引擎）为 AI 破限研究提供状态化工具链，包括注入包、配合度探针、拒绝响应分析、拒绝对症、升档和漂移检测。它不保证任何模型配合，也不保证绕过安全机制；仅限合法研究与获得授权的测试，输出需自行核验。'
                },
                {
                  q: '客户端源码在哪里？',
                  a: '当前 GitHub 仓库主要包含文档仓库快照、README、宣传图与更新日志；Release 页的 Source code 压缩包不包含客户端程序源码。客户端以各平台安装包形式分发。'
                },
                {
                  q: '支持哪些操作系统？',
                  a: '当前 Releases 提供 Windows 10/11、macOS（Apple Silicon / Intel）与 Linux（x64 / arm64，deb / AppImage）。具体兼容性以对应 Release 说明为准。'
                }
              ]
            }
          ]
        },
        {
          id: 'setup',
          kicker: 'SETUP',
          title: '安装与模型接入',
          blocks: [
            {
              type: 'faq',
              items: [
                {
                  q: '我没有 API Key 怎么办？',
                  a: '接入向导为每个厂商提供密钥页面入口；部分国内厂商为新用户提供免费额度。完全离线可以使用 Ollama 或 LM Studio 运行本地模型，无需云端 Key。'
                },
                {
                  q: '可以当 DeepSeek 桌面客户端用吗？',
                  a: '可以。在接入向导中选择 DeepSeek 或添加其 OpenAI 兼容接口，粘贴 API Key 后即可在桌面客户端中使用 DeepSeek 模型，并与 Claude、GPT、Gemini 和本地模型在同一会话界面切换。'
                },
                {
                  q: '可以接中转站吗？',
                  a: '可以。任意 OpenAI 兼容的 One-API / New-API 中转站都可以作为自定义服务接入。中转站的可用性、数据路径与计费由服务提供方决定，请自行评估。'
                },
                {
                  q: 'macOS 提示无法验证开发者怎么办？',
                  a: '打开系统设置 → 隐私与安全性，在安全性区域选择「仍要打开」。安装包已做 ad-hoc 签名。请同时确认下载的是 Apple Silicon 或 Intel 对应版本。'
                },
                {
                  q: 'Windows SmartScreen 拦截怎么办？',
                  a: '点击「更多信息」，核对文件名与来源后选择「仍要运行」。建议从 GitHub Releases 下载并核对 SHA-256，不要使用来源不明的安装包。'
                }
              ]
            }
          ]
        },
        {
          id: 'licensing',
          kicker: 'LICENSING',
          title: '授权与隐私',
          blocks: [
            {
              type: 'faq',
              items: [
                {
                  q: '是免费的吗？',
                  a: '安装包可免费下载，内置试用期。试用期结束后需通过离线授权密钥解锁完整功能。授权采用 Ed25519 签名、绑定机器码并在本地验证；具体条款以 Releases 公告为准。'
                },
                {
                  q: '我的 API Key 存在哪里？',
                  a: '只保存在本机：macOS 使用 Keychain，Windows 使用 DPAPI 加密。界面层不读取明文，删除服务商时密钥一并清除。'
                },
                {
                  q: '会话数据会上传吗？',
                  a: '客户端无云端账号体系、无遥测、不上传会话。数据保存在本机数据目录，可导出为 Markdown / JSON，卸载即清空。'
                },
                {
                  q: '可以完全离线使用吗？',
                  a: '可以，使用 Ollama 等本地模型时无需云端 API。但 Armor Engine、插件与模型本身的行为仍取决于本地配置；联网搜索、网页抓取等工具需要网络。'
                }
              ]
            }
          ]
        },
        {
          id: 'armor',
          kicker: 'ARMOR ENGINE',
          title: 'Armor Engine 与安全边界',
          blocks: [
            {
              type: 'faq',
              items: [
                {
                  q: 'Armor Engine 能保证模型配合吗？',
                  a: '不能。它提供注入、探针、拒绝对症、升档、质检与漂移检测工具链，不承诺任何模型一定配合，也不保证绕过模型安全机制。输出可能错误、过时或具有风险，请自行核验。'
                },
                {
                  q: '22 类拒绝形态是什么意思？',
                  a: '这是 Armor Engine 对模型拒绝回复的分类集合，例如道德说教、降级替代、假设式许可、中途刹车、反问动机等。分类用于给出针对性的补救动作，不代表每类都能成功处理。'
                },
                {
                  q: '红队套件可以用于哪些场景？',
                  a: '仅限获得书面授权的渗透测试、靶场演练与安全研究。未经授权对他人系统进行探测、渗透或数据采集在多数司法辖区属于违法行为。使用者自行承担全部责任。'
                },
                {
                  q: 'AI 输出可以直接用于生产吗？',
                  a: '不建议。模型输出可能包含错误、过时信息或不安全操作。关键操作应在隔离环境中验证，做好备份，并由具备相应能力的人员复核。'
                }
              ]
            }
          ]
        }
      ],
      closing: {
        kicker: 'STILL STUCK?',
        title: '把问题带到能解决它的地方',
        body: 'GitHub Issue 适合可复现的 Bug 与功能建议；Telegram 群更适合配置、插件与使用经验交流。',
        ctas: [
          { label: '打开 GitHub Issues', href: `${REPO}/issues`, external: true, variant: 'primary' },
          { label: '加入 Telegram 群', href: TELEGRAM, external: true, variant: 'secondary' }
        ]
      }
    },
    en: {
      eyebrow: 'FAQ',
      title: 'Frequently asked questions',
      lead: 'Answers about installation, model access, licensing, privacy, Armor Engine boundaries, and security research use. For anything else, open a GitHub Issue or ask in Telegram.',
      meta: ['Install and download', 'API keys', 'Licensing and trial', 'Privacy and security'],
      ctas: [
        { label: 'Download SLB-Agent', href: RELEASES, external: true, variant: 'primary' },
        { label: 'Read the quick start', href: 'en/docs.html', variant: 'secondary' }
      ],
      sections: [
        {
          id: 'general',
          kicker: 'GENERAL',
          title: 'Product and usage',
          blocks: [
            {
              type: 'faq',
              items: [
                {
                  q: 'What is SLB-Agent?',
                  a: 'SLB-Agent is a local-first desktop AI agent. It connects models through OpenAI-compatible, Anthropic, and Gemini protocols and provides file operations, command execution, page fetching, MCP plugins, skill packs, checkpoint rollback, and the Armor Engine toolchain.'
                },
                {
                  q: 'How is it different from ChatGPT or Claude in a browser?',
                  a: 'A browser chat is primarily conversation. SLB-Agent can read a mounted project, edit files, run terminal commands, fetch pages, and restore files with checkpoint rollback. Armor Engine organizes post-refusal handling into a toolchain.'
                },
                {
                  q: 'Can SLB-Agent be used as an Ollama client?',
                  a: 'Yes. Start the local Ollama service and connect through its compatible endpoint; no cloud API key is required. SLB-Agent is a full desktop AI agent rather than a narrow Ollama GUI — it also edits files, runs commands, uses MCP tools, and supports checkpoint rollback.'
                },
                {
                  q: 'Is it suitable for AI jailbreak research?',
                  a: 'Armor Engine provides a stateful toolchain for AI jailbreak research and LLM refusal analysis: injection packs, compliance probes, refusal triage, escalation, output audits, and drift detection. It does not guarantee that any model will comply or that safety mechanisms will be bypassed. Use it only for lawful research and authorized testing, and verify all output.'
                },
                {
                  q: 'Where is the client source code?',
                  a: 'The GitHub repository primarily contains a documentation snapshot, README files, promotional artwork, and release notes. The Source code archives on the Release page do not contain the client program source. The client is distributed as platform installers.'
                },
                {
                  q: 'Which operating systems are supported?',
                  a: 'Current Releases provide Windows 10/11, macOS (Apple Silicon / Intel), and Linux (x64 / arm64, deb / AppImage). Confirm exact compatibility in the relevant Release notes.'
                }
              ]
            }
          ]
        },
        {
          id: 'setup',
          kicker: 'SETUP',
          title: 'Installation and model access',
          blocks: [
            {
              type: 'faq',
              items: [
                {
                  q: 'What if I do not have an API key?',
                  a: 'The onboarding wizard links to each provider\'s key page, and some providers offer new-user credits. For a fully offline setup, run a local model with Ollama or LM Studio — no cloud key needed.'
                },
                {
                  q: 'Can I use it as a DeepSeek desktop client?',
                  a: 'Yes. Pick DeepSeek in the onboarding wizard or add its OpenAI-compatible endpoint, paste an API key, and use DeepSeek models in the desktop client alongside Claude, GPT, Gemini, and local models in the same session UI.'
                },
                {
                  q: 'Can I use a relay?',
                  a: 'Yes. Any OpenAI-compatible One-API / New-API relay can be added as a custom provider. Availability, data path, and billing are controlled by the relay operator; evaluate them yourself.'
                },
                {
                  q: 'What if macOS says the developer cannot be verified?',
                  a: 'Open System Settings → Privacy & Security and choose "Open Anyway". The installer is ad-hoc signed. Also confirm you downloaded the Apple Silicon or Intel build that matches your machine.'
                },
                {
                  q: 'What if Windows SmartScreen blocks it?',
                  a: 'Choose "More info", verify the file name and source, then "Run anyway". Download from GitHub Releases and verify SHA-256; do not use installers from unknown sources.'
                }
              ]
            }
          ]
        },
        {
          id: 'licensing',
          kicker: 'LICENSING',
          title: 'Licensing and privacy',
          blocks: [
            {
              type: 'faq',
              items: [
                {
                  q: 'Is it free?',
                  a: 'The installer is a free download with a built-in trial period. An offline license key unlocks full features after the trial. Licensing is Ed25519-signed, machine-bound, and verified locally; see the Release notes for current terms.'
                },
                {
                  q: 'Where are my API keys stored?',
                  a: 'On your machine only: macOS Keychain or Windows DPAPI. The UI does not read plaintext, and keys are deleted with the provider.'
                },
                {
                  q: 'Are sessions uploaded?',
                  a: 'There is no cloud account system, no telemetry, and no session upload. Data lives in a local data directory, can be exported as Markdown / JSON, and is cleared on uninstall.'
                },
                {
                  q: 'Can it run fully offline?',
                  a: 'Yes, with local models such as Ollama no cloud API is required. Armor Engine, plugins, and model behavior still depend on local configuration; web search and page fetching require network access.'
                }
              ]
            }
          ]
        },
        {
          id: 'armor',
          kicker: 'ARMOR ENGINE',
          title: 'Armor Engine and safety boundaries',
          blocks: [
            {
              type: 'faq',
              items: [
                {
                  q: 'Does Armor Engine guarantee compliance?',
                  a: 'No. It provides a toolchain for injection, probing, refusal triage, escalation, auditing, and drift detection. It does not guarantee that any model will comply or that safety mechanisms will be bypassed. Output may be wrong, outdated, or risky; verify it independently.'
                },
                {
                  q: 'What are the 22 refusal patterns?',
                  a: 'They are the Armor Engine taxonomy of refusal replies, such as moralizing, downgrade substitutes, hypothetical permission, mid-output braking, and motive-questioning. The taxonomy drives targeted remedies; it does not mean every case will succeed.'
                },
                {
                  q: 'Where may the red-team suite be used?',
                  a: 'Only in penetration tests, lab exercises, and security research with written authorization. Probing, penetrating, or collecting data from systems without authorization is illegal in most jurisdictions. Users accept full responsibility.'
                },
                {
                  q: 'Can AI output be used directly in production?',
                  a: 'We do not recommend it. Output may contain errors, outdated information, or unsafe operations. Validate critical work in an isolated environment, keep backups, and have qualified people review it.'
                }
              ]
            }
          ]
        }
      ],
      closing: {
        kicker: 'STILL STUCK?',
        title: 'Take the question where it can be solved',
        body: 'GitHub Issues are best for reproducible bugs and feature requests; Telegram is better for configuration, plugins, and field experience.',
        ctas: [
          { label: 'Open GitHub Issues', href: `${REPO}/issues`, external: true, variant: 'primary' },
          { label: 'Join the Telegram group', href: TELEGRAM, external: true, variant: 'secondary' }
        ]
      }
    }
  },

  privacy: {
    zh: {
      eyebrow: 'PRIVACY',
      title: '隐私说明：数据默认留在本机',
      lead: 'SLB-Agent 是本地优先的桌面客户端。没有云端账号体系，没有遥测，不主动上传会话。模型请求会发送到你配置的模型服务商，除此之外的数据流由你的工具与网络设置决定。',
      meta: ['无账号体系', '无遥测', 'API Key 本地加密', '会话可导出 / 删除'],
      ctas: [
        { label: '查看安全边界', href: 'terms.html', variant: 'primary' },
        { label: '前往下载', href: 'download.html', variant: 'secondary' }
      ],
      sections: [
        {
          id: 'summary',
          kicker: 'SUMMARY',
          title: '核心承诺',
          blocks: [
            {
              type: 'cards',
              columns: 2,
              items: [
                { icon: 'lock', title: 'API Key 本地存储', body: 'macOS 使用 Keychain，Windows 使用 DPAPI 加密；界面层不读取明文。' },
                { icon: 'database', title: '会话留在本机', body: '会话保存在本地数据目录，可导出 Markdown / JSON，卸载即清空。' },
                { icon: 'eye', title: '无遥测', body: '客户端不主动上报使用行为、会话内容或统计信息。' },
                { icon: 'globe', title: '网络路径可控', body: '支持系统代理、直连、自定义 HTTP 与 SOCKS5，流量路径由你决定。' }
              ]
            }
          ]
        },
        {
          id: 'data',
          kicker: 'DATA FLOWS',
          title: '哪些数据会离开本机',
          blocks: [
            {
              type: 'table',
              table: {
                headers: ['数据', '去向', '说明'],
                rows: [
                  ['模型请求内容', '你配置的模型服务商', '对话与工具结果会作为请求发送给模型；服务商的数据处理由其条款决定'],
                  ['API Key', '本机安全存储', '仅在向对应服务商发起请求时使用'],
                  ['会话与文件', '本机数据目录', '客户端不主动上传；MCP 工具与网页抓取可能按你的指令访问网络'],
                  ['授权信息', '本机离线验证', 'Ed25519 签名与机器码绑定，不依赖在线激活服务器'],
                  ['网站访问', 'GitHub Pages / 浏览器', '本站是静态网站，不使用第三方分析脚本或广告跟踪']
                ]
              }
            }
          ]
        },
        {
          id: 'controls',
          kicker: 'CONTROLS',
          title: '你能控制什么',
          blocks: [
            {
              type: 'prose',
              bullets: [
                '在「设置 → 数据目录」查看会话与配置文件位置。',
                '导出会话为 Markdown 或 JSON 进行备份；删除单条会话或卸载客户端以清空数据。',
                '删除服务商时，对应 API Key 一并清除。',
                '通过权限模式限制文件写入与命令执行；使用检查点回滚恢复 Agent 修改的文件。',
                '不安装来源不明的 MCP Server 或技能包，避免扩大本地数据访问面。'
              ]
            }
          ]
        },
        {
          id: 'website',
          kicker: 'THIS WEBSITE',
          title: '本站的隐私实践',
          blocks: [
            {
              type: 'prose',
              paragraphs: [
                '本网站是部署在 GitHub Pages 上的静态站点，不设置登录、不收集表单、不使用第三方广告或行为分析脚本。托管方 GitHub 可能按自身隐私政策记录访问日志。',
                '网站通过 Google Search Console 等工具进行搜索引擎收录与性能观察时，可能使用相应的验证与统计能力；本站不嵌入第三方追踪脚本。'
              ]
            }
          ]
        }
      ],
      closing: {
        kicker: 'CONTACT',
        title: '对隐私有疑问？',
        body: '通过 GitHub Issue 或 Telegram 群联系维护者。请不要在公开渠道粘贴 API Key、会话内容或敏感数据。',
        ctas: [
          { label: '打开 GitHub Issues', href: `${REPO}/issues`, external: true, variant: 'primary' },
          { label: '加入 Telegram', href: TELEGRAM, external: true, variant: 'secondary' }
        ]
      }
    },
    en: {
      eyebrow: 'PRIVACY',
      title: 'Privacy: your data stays local by default',
      lead: 'SLB-Agent is a local-first desktop client. There is no cloud account system, no telemetry, and no session upload. Model requests go to the provider you configure; other data flows are determined by your tools and network settings.',
      meta: ['No account system', 'No telemetry', 'Encrypted local API keys', 'Exportable / removable sessions'],
      ctas: [
        { label: 'Read the safety boundaries', href: 'en/terms.html', variant: 'primary' },
        { label: 'Go to download', href: 'en/download.html', variant: 'secondary' }
      ],
      sections: [
        {
          id: 'summary',
          kicker: 'SUMMARY',
          title: 'Core commitments',
          blocks: [
            {
              type: 'cards',
              columns: 2,
              items: [
                { icon: 'lock', title: 'Local API keys', body: 'macOS Keychain or Windows DPAPI encryption; the UI does not read plaintext.' },
                { icon: 'database', title: 'Sessions stay local', body: 'Sessions live in a local data directory, export to Markdown / JSON, and are cleared on uninstall.' },
                { icon: 'eye', title: 'No telemetry', body: 'The client does not upload usage behavior, session content, or analytics.' },
                { icon: 'globe', title: 'Controllable network path', body: 'System proxy, direct, custom HTTP, or SOCKS5 — you choose the route.' }
              ]
            }
          ]
        },
        {
          id: 'data',
          kicker: 'DATA FLOWS',
          title: 'What can leave your machine',
          blocks: [
            {
              type: 'table',
              table: {
                headers: ['Data', 'Destination', 'Notes'],
                rows: [
                  ['Model request content', 'The provider you configure', 'Conversation and tool results are sent as requests; provider terms govern their processing'],
                  ['API keys', 'Local secure storage', 'Used only when sending a request to the corresponding provider'],
                  ['Sessions and files', 'Local data directory', 'Not uploaded by the client; MCP tools and page fetching may access the network on your instruction'],
                  ['Licensing data', 'Local offline verification', 'Ed25519 signature and machine binding; no online activation server'],
                  ['Website visits', 'GitHub Pages / browser', 'This is a static site with no third-party analytics or ad tracking scripts']
                ]
              }
            }
          ]
        },
        {
          id: 'controls',
          kicker: 'CONTROLS',
          title: 'What you control',
          blocks: [
            {
              type: 'prose',
              bullets: [
                'Inspect session and configuration locations under Settings → Data directory.',
                'Export sessions as Markdown or JSON; delete individual sessions or uninstall to clear data.',
                'Deleting a provider also clears its API key.',
                'Limit file writes and command execution with permission modes; restore agent-modified files with checkpoint rollback.',
                'Do not install untrusted MCP servers or skill packs, which would expand local data access.'
              ]
            }
          ]
        },
        {
          id: 'website',
          kicker: 'THIS WEBSITE',
          title: 'Privacy on this site',
          blocks: [
            {
              type: 'prose',
              paragraphs: [
                'This site is static and hosted on GitHub Pages. It has no login, no forms, and no third-party advertising or behavioral analytics scripts. GitHub, as host, may record access logs under its own privacy policy.',
                'Search-engine verification and performance observation may use Google Search Console or similar tools; this site does not embed third-party tracking scripts.'
              ]
            }
          ]
        }
      ],
      closing: {
        kicker: 'CONTACT',
        title: 'Questions about privacy?',
        body: 'Contact the maintainers through a GitHub Issue or Telegram. Never post API keys, session content, or sensitive data in public channels.',
        ctas: [
          { label: 'Open GitHub Issues', href: `${REPO}/issues`, external: true, variant: 'primary' },
          { label: 'Join Telegram', href: TELEGRAM, external: true, variant: 'secondary' }
        ]
      }
    }
  },

  terms: {
    zh: {
      eyebrow: 'TERMS & SAFETY',
      title: '使用条款与安全边界',
      lead: 'SLB-Agent 及内置组件面向学习、研究与获得书面授权的安全测试。使用本项目即表示你理解并接受这些边界。以下内容不构成法律意见。',
      meta: ['授权测试', '禁止未授权入侵', '按原样提供', '离线授权'],
      ctas: [
        { label: '查看隐私说明', href: 'privacy.html', variant: 'primary' },
        { label: '阅读免责声明', href: `${REPO}#readme`, external: true, variant: 'secondary' }
      ],
      sections: [
        {
          id: 'authorized',
          kicker: 'AUTHORIZED USE',
          title: '只在授权范围内使用',
          blocks: [
            {
              type: 'notice',
              tone: 'warn',
              title: '未经授权不得测试他人系统',
              body: '使用本工具进行任何测试，必须获得目标资产所有者的书面授权。未经授权对他人计算机信息系统进行探测、渗透或数据采集，在绝大多数司法辖区属于违法行为。'
            },
            {
              type: 'prose',
              bullets: [
                '确认授权范围、测试时间窗口与允许的操作类型。',
                '不要在授权范围之外读取、复制或泄露数据。',
                '发现漏洞后遵循负责任的披露流程，不公开可利用细节。',
                '遵守所在地区法律与平台条款，包括但不限于网络安全与数据保护法规。'
              ]
            }
          ]
        },
        {
          id: 'ai-output',
          kicker: 'AI OUTPUT',
          title: '模型输出需要核验',
          blocks: [
            {
              type: 'prose',
              paragraphs: [
                'Armor Engine 与 AI 模型生成的输出可能错误、过时、不完整或具有风险。它们不构成专业建议，也不应替代人工判断。',
                '关键操作应在隔离环境中进行并做好备份。不要将未经审查的模型输出直接用于生产系统、医疗、法律、金融或其他高风险决策。'
              ]
            }
          ]
        },
        {
          id: 'licensing',
          kicker: 'LICENSING',
          title: '试用与离线授权',
          blocks: [
            {
              type: 'prose',
              bullets: [
                '安装包内置试用期；试用期结束后需通过离线授权密钥解锁完整功能。',
                '授权采用 Ed25519 签名、绑定机器码、一次兑换、带有效期，全程离线验证。',
                '授权密钥不可转让或共享；具体条款以购买或发布页面说明为准。',
                '客户端不提供在线激活服务器，也不收集授权使用遥测。'
              ]
            }
          ]
        },
        {
          id: 'warranty',
          kicker: 'NO WARRANTY',
          title: '按「原样」提供',
          blocks: [
            {
              type: 'prose',
              paragraphs: [
                '本项目按「原样」（AS IS）提供，不附带任何明示或暗示的担保，包括但不限于适销性、特定用途适用性与不侵权担保。',
                '作者与贡献者不对任何直接或间接损失负责，也不对工具被滥用的后果承担责任。使用本项目即表示你自愿承担全部使用后果。'
              ]
            }
          ]
        },
        {
          id: 'third-party',
          kicker: 'THIRD PARTIES',
          title: '第三方服务与插件',
          blocks: [
            {
              type: 'prose',
              paragraphs: [
                '模型服务商、MCP Server、技能包与中转站由第三方提供，其可用性、安全性、计费与数据处理不受本项目控制。安装或连接前请自行评估。',
                '第三方组件可能包含独立许可证与使用条款，请一并遵守。'
              ]
            }
          ]
        }
      ],
      closing: {
        kicker: 'QUESTIONS',
        title: '需要澄清边界？',
        body: '通过 GitHub Issue 或 Telegram 联系维护者。涉及具体法律问题请咨询具备资质的专业人士。',
        ctas: [
          { label: '打开 GitHub Issues', href: `${REPO}/issues`, external: true, variant: 'primary' },
          { label: '加入 Telegram', href: TELEGRAM, external: true, variant: 'secondary' }
        ]
      }
    },
    en: {
      eyebrow: 'TERMS & SAFETY',
      title: 'Terms of use and safety boundaries',
      lead: 'SLB-Agent and its bundled components are for learning, research, and security testing with written authorization. By using the project you accept these boundaries. This is not legal advice.',
      meta: ['Authorized testing', 'No unauthorized intrusion', 'Provided as-is', 'Offline licensing'],
      ctas: [
        { label: 'Read the privacy notice', href: 'en/privacy.html', variant: 'primary' },
        { label: 'Read the disclaimer', href: `${REPO}/blob/main/README_EN.md`, external: true, variant: 'secondary' }
      ],
      sections: [
        {
          id: 'authorized',
          kicker: 'AUTHORIZED USE',
          title: 'Use only within authorization',
          blocks: [
            {
              type: 'notice',
              tone: 'warn',
              title: 'Never test systems without permission',
              body: 'Any testing with this tool requires written authorization from the asset owner. Probing, penetrating, or collecting data from computer systems without authorization is illegal in most jurisdictions.'
            },
            {
              type: 'prose',
              bullets: [
                'Confirm scope, test window, and permitted actions.',
                'Do not read, copy, or disclose data outside the authorized scope.',
                'Follow responsible disclosure and do not publish exploitable details.',
                'Comply with local law and platform terms, including cybersecurity and data-protection rules.'
              ]
            }
          ]
        },
        {
          id: 'ai-output',
          kicker: 'AI OUTPUT',
          title: 'Model output requires verification',
          blocks: [
            {
              type: 'prose',
              paragraphs: [
                'Output from Armor Engine and AI models may be wrong, outdated, incomplete, or risky. It is not professional advice and should not replace human judgment.',
                'Run critical operations in an isolated environment and keep backups. Do not use unreviewed model output directly in production, medical, legal, financial, or other high-stakes decisions.'
              ]
            }
          ]
        },
        {
          id: 'licensing',
          kicker: 'LICENSING',
          title: 'Trial and offline licensing',
          blocks: [
            {
              type: 'prose',
              bullets: [
                'The installer includes a trial period; an offline license key unlocks full features after it ends.',
                'Licensing is Ed25519-signed, machine-bound, single-redemption, time-limited, and fully verified offline.',
                'License keys are non-transferable and non-shareable; the purchase or release page governs specific terms.',
                'There is no online activation server and no licensing telemetry.'
              ]
            }
          ]
        },
        {
          id: 'warranty',
          kicker: 'NO WARRANTY',
          title: 'Provided "as is"',
          blocks: [
            {
              type: 'prose',
              paragraphs: [
                'This project is provided "AS IS", without any express or implied warranty, including merchantability, fitness for a particular purpose, and non-infringement.',
                'The authors and contributors accept no liability for direct or indirect damages, nor for consequences of misuse. By using the project you accept full responsibility for the outcome.'
              ]
            }
          ]
        },
        {
          id: 'third-party',
          kicker: 'THIRD PARTIES',
          title: 'Third-party services and plugins',
          blocks: [
            {
              type: 'prose',
              paragraphs: [
                'Model providers, MCP servers, skill packs, and relays are third-party services. Their availability, security, billing, and data handling are outside this project\'s control. Evaluate them before connecting.',
                'Third-party components may carry their own licenses and terms; comply with them as well.'
              ]
            }
          ]
        }
      ],
      closing: {
        kicker: 'QUESTIONS',
        title: 'Need clarification?',
        body: 'Contact the maintainers through a GitHub Issue or Telegram. For legal questions, consult a qualified professional.',
        ctas: [
          { label: 'Open GitHub Issues', href: `${REPO}/issues`, external: true, variant: 'primary' },
          { label: 'Join Telegram', href: TELEGRAM, external: true, variant: 'secondary' }
        ]
      }
    }
  }
}

export function getDetailPage(id: string, lang: Lang): DetailPageContent {
  const page = detailPages[id]
  if (!page) throw new Error(`Unknown detail page: ${id}`)
  return page[lang]
}
