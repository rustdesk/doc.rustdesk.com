---
title: "RustDesk 文件"
type: docs
breadcrumbs: false
weight: 1
description: "RustDesk 的RustDesk 文件文檔，提供安裝、設定、部署與疑難排解指南。"
keywords: ["rustdesk", "remote desktop", "open source", "self-host", "documentation", "remote access", "VNC alternative", "teamviewer alternative"]
---

RustDesk 是一個功能完整的開源遠端控制替代方案，支援自託管和安全性，設定簡單。您完全控制自己的資料，無需擔心安全問題。客戶端是開源的，您可以選擇在我們的[網站](https://rustdesk.com)上購買功能完整的**專業伺服器**，或使用基於我們**專業伺服器**的基礎免費開源伺服器。

## 應該選擇哪條 RustDesk 路徑？

| 需求 | 最佳起點 |
| --- | --- |
| 作為終端使用者或管理員使用 RustDesk | [客戶端](/docs/zh-tw/client/) |
| 自建免費開源伺服器 | [RustDesk Server OSS](/docs/zh-tw/self-host/rustdesk-server-oss/) |
| 需要 Web 控制台、SSO 與企業級控制的自建部署 | [RustDesk Server Pro](/docs/zh-tw/self-host/rustdesk-server-pro/) |
| 從原始碼建置或封裝 RustDesk | [開發](/docs/zh-tw/dev/) |

## 功能特性
- 支援 Windows、macOS、Linux、iOS、Android、Web。
- 支援 VP8 / VP9 / AV1 軟體編解碼器，以及 H264 / H265 硬體編解碼器。
- 擁有您的資料，輕鬆在您的基礎設施上建立自託管解決方案。
- 基於 NaCl 的端到端加密 P2P 連接。
- Windows 無需管理員權限或安裝，可按需在本地或遠端提升權限。
- 我們喜歡保持簡單，並將努力在可能的地方變得更簡單。

## GitHub 儲存庫
- **主客戶端儲存庫**: https://github.com/rustdesk/rustdesk
- **開源伺服器儲存庫**: https://github.com/rustdesk/rustdesk-server
- **專業伺服器儲存庫**: https://github.com/rustdesk/rustdesk-server-pro
- **文件儲存庫**: https://github.com/rustdesk/doc.rustdesk.com

{{% children depth="4" showhidden="true" %}}
