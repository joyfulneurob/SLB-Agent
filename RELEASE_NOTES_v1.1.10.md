# SLB-Agent v1.1.10

> 全平台安装包发布：Windows / macOS（Apple 芯片、Intel 芯片）/ Linux（x64、arm64）
> 功能说明、破限内核（Armor Engine）与插件体系详见仓库 [README](https://github.com/joyfulneurob/SLB-Agent#readme)

## 下载

| 平台 | 架构 | 文件 | 大小 |
|---|---|---|---|
| **Windows** 10/11 | x64 + x86 | `SLB-Agent-1.1.10-Windows.exe` | ≈ 179.8 MB |
| **macOS** | Apple 芯片（M1–M4） | `SLB-Agent-1.1.10-Mac-M.dmg` | ≈ 104.4 MB |
| **macOS** | Intel 芯片 | `SLB-Agent-1.1.10-Mac-Intel.dmg` | ≈ 111.0 MB |
| **Linux** | x86_64（Ubuntu / Debian / UOS / 麒麟） | `SLB-Agent-1.1.10-Linux-x64.deb` | ≈ 91.2 MB |
| **Linux** | x86_64（其他发行版，免安装） | `SLB-Agent-1.1.10-Linux-x64.AppImage` | ≈ 113.1 MB |
| **Linux** | arm64（deb） | `SLB-Agent-1.1.10-Linux-arm64.deb` | ≈ 90.0 MB |
| **Linux** | arm64（AppImage） | `SLB-Agent-1.1.10-Linux-arm64.AppImage` | ≈ 113.5 MB |

> **怎么选**
> - Mac：左上角苹果图标 →「关于本机」→「芯片」一栏，写着 Apple M1/M2/M3/M4 用 M 芯片版；写着 Intel 用 Intel 版（M 芯片机也能用 Rosetta 跑 Intel 版，只是更慢；反过来不行）
> - Linux：终端 `uname -m`，输出 `x86_64` 用 x64 版，输出 `aarch64` 用 arm64 版

## 安装

<details>
<summary><b>🪟 Windows</b></summary>

1. 双击 `SLB-Agent-1.1.10-Windows.exe`
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
sudo apt install ./SLB-Agent-1.1.10-Linux-x64.deb
# 之后在开始菜单打开
# 卸载：sudo apt remove slbagent
```

</details>

<details>
<summary><b>🐧 Linux（AppImage）</b></summary>

```bash
chmod +x SLB-Agent-1.1.10-Linux-x64.AppImage
./SLB-Agent-1.1.10-Linux-x64.AppImage
```

> Ubuntu 22.04+ 若提示缺 libfuse2：`sudo apt install libfuse2`
> Ubuntu 24.04 若提示 sandbox 错误：加参数 `--no-sandbox` 运行

</details>

## SHA-256 校验

下载后核对校验值，确认安装包未被调包或损坏：

```
5edbe73fb5438a0a4ca78c6304067515bbcd6f1142dc95f9909d6b5f4948f7da  SLB-Agent-1.1.10-Mac-M.dmg
af0ff763c8450a6fc9f7d3eafa69dff07bdf2dc0fd1d47424de9560db695bbd9  SLB-Agent-1.1.10-Mac-Intel.dmg
cb86ca85f4d6b4c7c03d777fa967d0ecdac3d43dbe51c081c8903b902cd7f485  SLB-Agent-1.1.10-Windows.exe
1d7de17be23b9bac5ab122a9525e00b6c4cca14a5ca943f25399123cbdb2d22c  SLB-Agent-1.1.10-Linux-x64.AppImage
a784b81e45634b6f895a9fe81dd510a4939e73acb331b31cebfd56ae402d52fb  SLB-Agent-1.1.10-Linux-x64.deb
084e803d8cde8b4ebc3c1785a49cb3277790cbaa5cb11755a81d70a5ac16f5b4  SLB-Agent-1.1.10-Linux-arm64.AppImage
4a054465762b244725aacaf3787ca32a68984dba9c92151e204fa284b3a2dd03  SLB-Agent-1.1.10-Linux-arm64.deb
```

核对方法：macOS `shasum -a 256 <文件>` · Windows PowerShell `Get-FileHash <文件>` · Linux `sha256sum <文件>`

---

## 💬 交流与讨论

技术问题、破限玩法、插件与技能包分享，欢迎进 Telegram 群：

https://t.me/jiaoliuqunsbl

---

**关键词**：AI Agent · 桌面 AI 客户端 · 多模型 · MCP · 破限 · 破甲 · 越狱 · jailbreak · uncensored · red team · pentest · 渗透测试 · 逆向分析 · 网页爬虫 · Ollama · DeepSeek · Claude · Gemini · GLM · 本地大模型

**⚠️ 免责声明**：本项目仅供学习、研究与授权安全测试使用。任何测试须在获得目标资产所有者书面授权的前提下进行；未经授权对他人系统进行探测、渗透或数据采集属于违法行为。使用者须遵守所在地区法律法规，下载或使用本工具即视为确认具备合法授权并承担全部使用后果。本项目按「原样」提供，作者不对滥用后果负责。
