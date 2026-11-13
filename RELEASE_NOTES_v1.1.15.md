# SLB-Agent v1.1.15

> 全平台安装包发布：Windows / macOS（Apple 芯片、Intel 芯片）/ Linux（x64、arm64）
> 功能说明、破限内核（Armor Engine）与插件体系详见仓库 [README](https://github.com/joyfulneurob/SLB-Agent#readme)

## 下载

| 平台 | 架构 | 文件 | 大小 |
|---|---|---|---|
| **Windows** 10/11 | x64 + x86 | `SLB-Agent-1.1.15-Windows.exe` | ≈ 179.9 MB |
| **macOS** | Apple 芯片（M1–M4） | `SLB-Agent-1.1.15-Mac-M.dmg` | ≈ 104.5 MB |
| **macOS** | Intel 芯片 | `SLB-Agent-1.1.15-Mac-Intel.dmg` | ≈ 111.1 MB |
| **Linux** | x86_64（Ubuntu / Debian / UOS / 麒麟） | `SLB-Agent-1.1.15-Linux-x64.deb` | ≈ 91.3 MB |
| **Linux** | x86_64（其他发行版，免安装） | `SLB-Agent-1.1.15-Linux-x64.AppImage` | ≈ 113.2 MB |
| **Linux** | arm64（deb） | `SLB-Agent-1.1.15-Linux-arm64.deb` | ≈ 90.1 MB |
| **Linux** | arm64（AppImage） | `SLB-Agent-1.1.15-Linux-arm64.AppImage` | ≈ 113.6 MB |

> **怎么选**
> - Mac：左上角苹果图标 →「关于本机」→「芯片」一栏，写着 Apple M1/M2/M3/M4 用 M 芯片版；写着 Intel 用 Intel 版（M 芯片机也能用 Rosetta 跑 Intel 版，只是更慢；反过来不行）
> - Linux：终端 `uname -m`，输出 `x86_64` 用 x64 版，输出 `aarch64` 用 arm64 版

> ℹ️ Release 页最下方的 `Source code (zip/tar.gz)` 是 GitHub 自动生成的**本仓库文档快照**（README、宣传图、更新日志），**不含客户端程序源码**；客户端请下载上方对应平台的安装包。

## 安装

<details>
<summary><b>🪟 Windows</b></summary>

1. 双击 `SLB-Agent-1.1.15-Windows.exe`
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
sudo apt install ./SLB-Agent-1.1.15-Linux-x64.deb
# 之后在开始菜单打开
# 卸载：sudo apt remove slbagent
```

</details>

<details>
<summary><b>🐧 Linux（AppImage）</b></summary>

```bash
chmod +x SLB-Agent-1.1.15-Linux-x64.AppImage
./SLB-Agent-1.1.15-Linux-x64.AppImage
```

> Ubuntu 22.04+ 若提示缺 libfuse2：`sudo apt install libfuse2`
> Ubuntu 24.04 若提示 sandbox 错误：加参数 `--no-sandbox` 运行

</details>

## SHA-256 校验

下载后核对校验值，确认安装包未被调包或损坏：

```
8159c7d11b18905f24c0d0ead86b6f3041ce09a1db6376e17c58b7c66ad5365e  SLB-Agent-1.1.15-Mac-M.dmg
0fed0193a8068213a64196a0df6e82d86d4b75259876f089d5b357ca9952113f  SLB-Agent-1.1.15-Mac-Intel.dmg
f9c20eec9e501c09b263eae629e7d3c3a194d52d0f9fff8565a1117877e1e9aa  SLB-Agent-1.1.15-Windows.exe
9aa0bf0e731117099bb2077db7f592c920886a76f65e62fc2ff1a33917e78acc  SLB-Agent-1.1.15-Linux-x64.AppImage
e0f4c880432129b8f79037622454753404ec69526e3f13b6cb35378a00018fde  SLB-Agent-1.1.15-Linux-x64.deb
d6ea07b968ae2f793a6675233a90d3ca605e2ec825c6b9db043e752aa1648083  SLB-Agent-1.1.15-Linux-arm64.AppImage
4f75b75b088ba6af20bac9f6ed19dfae9e7cf4702e947d01a5109850e494e451  SLB-Agent-1.1.15-Linux-arm64.deb
```

核对方法：macOS `shasum -a 256 <文件>` · Windows PowerShell `Get-FileHash <文件>` · Linux `sha256sum <文件>`

---

## 💬 交流与讨论

技术问题、破限玩法、插件与技能包分享，欢迎进 Telegram 群：

https://t.me/jiaoliuqunsbl

---

**关键词**：AI Agent · 桌面 AI 客户端 · 多模型 · MCP · 破限 · 破甲 · 越狱 · jailbreak · uncensored · red team · pentest · 渗透测试 · 逆向分析 · 网页爬虫 · Ollama · DeepSeek · Claude · Gemini · GLM · 本地大模型

**⚠️ 免责声明**：本项目仅供学习、研究与授权安全测试使用。任何测试须在获得目标资产所有者书面授权的前提下进行；未经授权对他人系统进行探测、渗透或数据采集属于违法行为。使用者须遵守所在地区法律法规，下载或使用本工具即视为确认具备合法授权并承担全部使用后果。本项目按「原样」提供，作者不对滥用后果负责。
