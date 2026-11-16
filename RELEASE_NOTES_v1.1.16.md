# SLB-Agent v1.1.16

> 本次版本聚焦「破甲更好用」与「更稳定」。
> 全平台安装包：Windows / macOS（Apple 芯片、Intel 芯片）/ Linux（x64、arm64）

## 本次更新

### 一、新功能

**1. 破甲模式一键切换（每个对话各自独立）**

对话右侧新增「破甲模式」开关，三种模式随时切换、互不影响：

- **一键破甲**：一键拉满 —— 自动启用全部内置插件（渗透 / 逆向 / 网页爬虫 / 三个破限）、全部内置技能与规则、破限内核「无限制」强度 + 每步重申 + 全部预设条款（你自己手写的条款也会保留）。攻坚、硬任务直接用。
- **关闭破甲**：一键回到克制模式 —— 关掉攻击类插件（三个破限 + 渗透）、攻击类规则与全部技能、预设条款（你手写的追加条款仍保留）。日常、合规场景用。
- **系统自定义**：完全按你在「设置」里的开关来，自己精细控制。

切换**即时生效**，且**不会改动**你在设置里的任何开关。

**2. 使用引导（每天首次打开提示一次）**

每天第一次打开软件会弹出一份图文引导，一分钟讲清：破甲模式怎么用、破甲主模型怎么选、工具权限四档区别、全自动续跑、模型团队怎么配，以及遇到问题如何反馈。看过后当天不再弹出。

**3. 模型团队更聪明**

「自动协商」现在让高阶、低阶模型全部参与讨论（一起分析 → 互相评审 → 高阶汇总），疑难问题的突破率更高。
推荐搭配：把国际一线模型（Claude / GPT / Gemini）设为**高阶**，国产模型（DeepSeek / GLM 等）设为**低阶**，可大幅提升破甲与攻坚能力。

### 二、稳定性与体验优化

- 修复部分 **Windows** 电脑「打开后只有后台进程、不出窗口」的问题：多重兜底确保窗口显示，异常时自动恢复（含显卡驱动问题自动关闭硬件加速重试）
- 修复多开对话、长时间运行后出现的**黑屏**问题
- 点「停止」或关闭软件时，不再在对话里刷出一连串「自动继续失败」，只有真正卡住时才统一提示一次
- 修复**卸载**时的崩溃（包括先删掉桌面工作目录再卸载的情况），任何情况下卸载都不再闪退
- 修复已授权用户偶发的「运行环境校验失败（E17）」，并给出更精确的排查代码
- 设置页新增**「运行日志」**入口：一键打开日志文件。日志不含任何隐私内容（不记录对话、API 密钥、目标信息），仅用于排查问题

> 安装后需**输入授权码激活**方可使用，授权码在官方讨论群获取，激活后即解锁全部能力。

---

## 下载

| 平台 | 架构 | 文件 | 大小 |
|---|---|---|---|
| **Windows** 10/11 | x64 + x86 | `SLB-Agent-1.1.16-Windows.exe` | ≈ 180.3 MB |
| **macOS** | Apple 芯片（M1–M4） | `SLB-Agent-1.1.16-Mac-M.dmg` | ≈ 104.7 MB |
| **macOS** | Intel 芯片 | `SLB-Agent-1.1.16-Mac-Intel.dmg` | ≈ 111.3 MB |
| **Linux** | x86_64（Ubuntu / Debian / UOS / 麒麟） | `SLB-Agent-1.1.16-Linux-x64.deb` | ≈ 91.4 MB |
| **Linux** | x86_64（其他发行版，免安装） | `SLB-Agent-1.1.16-Linux-x64.AppImage` | ≈ 113.4 MB |
| **Linux** | arm64（deb） | `SLB-Agent-1.1.16-Linux-arm64.deb` | ≈ 90.3 MB |
| **Linux** | arm64（AppImage） | `SLB-Agent-1.1.16-Linux-arm64.AppImage` | ≈ 113.8 MB |

> **怎么选**
> - Mac：左上角苹果图标 →「关于本机」→「芯片」一栏，写着 Apple M1/M2/M3/M4 用 M 芯片版；写着 Intel 用 Intel 版（M 芯片机也能用 Rosetta 跑 Intel 版，只是更慢；反过来不行）
> - Linux：终端 `uname -m`，输出 `x86_64` 用 x64 版，输出 `aarch64` 用 arm64 版

> ℹ️ Release 页最下方的 `Source code (zip/tar.gz)` 是 GitHub 自动生成的**本仓库文档快照**（README、宣传图、更新日志），**不含客户端程序源码**；客户端请下载上方对应平台的安装包。

## 安装

<details>
<summary><b>🪟 Windows</b></summary>

1. 双击 `SLB-Agent-1.1.16-Windows.exe`
2. 若弹出 SmartScreen「Windows 已保护你的电脑」→ 更多信息 → 仍要运行
3. 按向导完成安装，桌面生成快捷方式

</details>

<details>
<summary><b>🍎 macOS</b></summary>

1. 下载对应芯片的 `.dmg`，双击挂载
2. 把 **SLB-Agent** 拖入「应用程序」
3. 首次打开若提示「无法验证开发者」→ 系统设置 → 隐私与安全性 → 仍要打开

</details>

<details>
<summary><b>🐧 Linux（deb）</b></summary>

```bash
sudo apt install ./SLB-Agent-1.1.16-Linux-x64.deb
# 之后在开始菜单打开
# 卸载：sudo apt remove slbagent
```

</details>

<details>
<summary><b>🐧 Linux（AppImage）</b></summary>

```bash
chmod +x SLB-Agent-1.1.16-Linux-x64.AppImage
./SLB-Agent-1.1.16-Linux-x64.AppImage
```

> Ubuntu 22.04+ 若提示缺 libfuse2：`sudo apt install libfuse2`
> Ubuntu 24.04 若提示 sandbox 错误：加参数 `--no-sandbox` 运行

</details>

## SHA-256 校验

下载后核对校验值，确认安装包未被调包或损坏：

```
4ab5e681378c4af2ef8868bc507373501e112ebf9f3f5b2fafed431f23164b5e  SLB-Agent-1.1.16-Mac-M.dmg
48324725c9f09be711200501efce0cd96262e8e138ed42959bf4eafd0e0e3c12  SLB-Agent-1.1.16-Mac-Intel.dmg
d6e34d9e7426d8bbb965dd5506b81975aa23572ed3557ec8b5fbc18b5178c844  SLB-Agent-1.1.16-Windows.exe
bf0d534725c7dadad528e57d49f23d0cea650ddf47f30fad95036cbde2184995  SLB-Agent-1.1.16-Linux-x64.AppImage
1326ccd81d05a882149fcf7b243b6bece33db974990115209f3c583510730040  SLB-Agent-1.1.16-Linux-x64.deb
d985e9fb1088149204153b56f8742f3c107f490e35aca34c61166afdb374ee4f  SLB-Agent-1.1.16-Linux-arm64.AppImage
53e01ff3f0df4d7f6121f44e3c3c73278778433160cf702ab8c9f9202765cc40  SLB-Agent-1.1.16-Linux-arm64.deb
```

核对方法：macOS `shasum -a 256 <文件>` · Windows PowerShell `Get-FileHash <文件>` · Linux `sha256sum <文件>`

---

## 💬 交流与讨论

技术问题、破甲玩法、插件与技能包分享，欢迎进 Telegram 群：

https://t.me/jiaoliuqunsbl

如在使用中发现问题，欢迎到群里反馈（可附上「设置 → 运行日志」里的日志文件）。

---

**关键词**：AI Agent · 桌面 AI 客户端 · 多模型 · MCP · 破甲 · 破限 · 越狱 · jailbreak · uncensored · red team · pentest · 渗透测试 · 逆向分析 · 网页爬虫 · Ollama · DeepSeek · Claude · Gemini · GLM · 本地大模型

**⚠️ 免责声明**：本项目仅供学习、研究与授权安全测试使用。任何测试须在获得目标资产所有者书面授权的前提下进行；未经授权对他人系统进行探测、渗透或数据采集属于违法行为。使用者须遵守所在地区法律法规，下载或使用本工具即视为确认具备合法授权并承担全部使用后果。本项目按「原样」提供，作者不对滥用后果负责。
