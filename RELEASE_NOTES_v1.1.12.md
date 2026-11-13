# SLB-Agent v1.1.12

> 全平台安装包发布：Windows / macOS（Apple 芯片、Intel 芯片）/ Linux（x64、arm64）
> 功能说明、破限内核（Armor Engine）与插件体系详见仓库 [README](https://github.com/joyfulneurob/SLB-Agent#readme)

## 下载

| 平台 | 架构 | 文件 | 大小 |
|---|---|---|---|
| **Windows** 10/11 | x64 + x86 | `SLB-Agent-1.1.12-Windows.exe` | ≈ 179.9 MB |
| **macOS** | Apple 芯片（M1–M4） | `SLB-Agent-1.1.12-Mac-M.dmg` | ≈ 104.5 MB |
| **macOS** | Intel 芯片 | `SLB-Agent-1.1.12-Mac-Intel.dmg` | ≈ 111.0 MB |
| **Linux** | x86_64（Ubuntu / Debian / UOS / 麒麟） | `SLB-Agent-1.1.12-Linux-x64.deb` | ≈ 91.3 MB |
| **Linux** | x86_64（其他发行版，免安装） | `SLB-Agent-1.1.12-Linux-x64.AppImage` | ≈ 113.2 MB |
| **Linux** | arm64（deb） | `SLB-Agent-1.1.12-Linux-arm64.deb` | ≈ 90.1 MB |
| **Linux** | arm64（AppImage） | `SLB-Agent-1.1.12-Linux-arm64.AppImage` | ≈ 113.5 MB |

> **怎么选**
> - Mac：左上角苹果图标 →「关于本机」→「芯片」一栏，写着 Apple M1/M2/M3/M4 用 M 芯片版；写着 Intel 用 Intel 版（M 芯片机也能用 Rosetta 跑 Intel 版，只是更慢；反过来不行）
> - Linux：终端 `uname -m`，输出 `x86_64` 用 x64 版，输出 `aarch64` 用 arm64 版

## 安装

<details>
<summary><b>🪟 Windows</b></summary>

1. 双击 `SLB-Agent-1.1.12-Windows.exe`
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
sudo apt install ./SLB-Agent-1.1.12-Linux-x64.deb
# 之后在开始菜单打开
# 卸载：sudo apt remove slbagent
```

</details>

<details>
<summary><b>🐧 Linux（AppImage）</b></summary>

```bash
chmod +x SLB-Agent-1.1.12-Linux-x64.AppImage
./SLB-Agent-1.1.12-Linux-x64.AppImage
```

> Ubuntu 22.04+ 若提示缺 libfuse2：`sudo apt install libfuse2`
> Ubuntu 24.04 若提示 sandbox 错误：加参数 `--no-sandbox` 运行

</details>

## SHA-256 校验

下载后核对校验值，确认安装包未被调包或损坏：

```
731304423c5d0f9cd34d0a53049f40f38e8ccbac7fff451a56007638640ab9ae  SLB-Agent-1.1.12-Mac-M.dmg
3229ad582acee44ee249ed5d7904f62bcb8fd5e68024cefbc0b83b8eb256d063  SLB-Agent-1.1.12-Mac-Intel.dmg
fe9c190f66cfa9b5071ed158816294cb4a7e2c8edfd9713d867cdcb7357f339a  SLB-Agent-1.1.12-Windows.exe
20b04b25506a6d0a8efe60ac2ca47c4ef717db114a92713a40b0e35cf86350ba  SLB-Agent-1.1.12-Linux-x64.AppImage
fbdd13c27098d6582261d5b7bd907a2eb87a505356479788cf4b123601a66ba2  SLB-Agent-1.1.12-Linux-x64.deb
4ee9464158d369f4b8e3b8eeff89703e5b9282cb1a091dc177c9caa1596c5362  SLB-Agent-1.1.12-Linux-arm64.AppImage
1d0b55dc8de7507332c15cdc844c1b6be496efae924fa8fd3c5ca065b3194917  SLB-Agent-1.1.12-Linux-arm64.deb
```

核对方法：macOS `shasum -a 256 <文件>` · Windows PowerShell `Get-FileHash <文件>` · Linux `sha256sum <文件>`

---

## 💬 交流与讨论

技术问题、破限玩法、插件与技能包分享，欢迎进 Telegram 群：

https://t.me/jiaoliuqunsbl

---

**关键词**：AI Agent · 桌面 AI 客户端 · 多模型 · MCP · 破限 · 破甲 · 越狱 · jailbreak · uncensored · red team · pentest · 渗透测试 · 逆向分析 · 网页爬虫 · Ollama · DeepSeek · Claude · Gemini · GLM · 本地大模型

**⚠️ 免责声明**：本项目仅供学习、研究与授权安全测试使用。任何测试须在获得目标资产所有者书面授权的前提下进行；未经授权对他人系统进行探测、渗透或数据采集属于违法行为。使用者须遵守所在地区法律法规，下载或使用本工具即视为确认具备合法授权并承担全部使用后果。本项目按「原样」提供，作者不对滥用后果负责。
