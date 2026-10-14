---
title: Windows
weight: 4
description: "在 Windows 上安裝與部署 RustDesk 的完整指南：用戶端初始設定、使用 MSI 安裝套件向大量電腦派送、靜默安裝參數與常用選項，以及可攜版如何取得管理員權限，協助 IT 團隊在企業內快速推廣 RustDesk 遠端桌面，省去逐台手動安裝。"
keywords: ["rustdesk windows", "rustdesk windows install", "rustdesk msi", "rustdesk silent install", "rustdesk portable elevation", "rustdesk windows deployment"]
---

## 應該選擇哪個 Windows 指南？

| 需求 | 最佳指南 |
| --- | --- |
| 標準 Windows 客戶端安裝 | [Windows](/docs/zh-tw/client/windows/) |
| 受控部署、靜默安裝或封裝 | [MSI](/docs/zh-tw/client/windows/msi/) |
| 可攜模式下需要提權支援 | [Windows Portable Elevation](/docs/zh-tw/client/windows/windows-portable-elevation/) |

## Windows 快速答案

- 大多數終端使用者使用標準安裝程式即可。
- 企業批量部署或腳本安裝請使用 MSI 指南。
- 需要在可攜模式下處理管理員提權時使用 portable elevation。
- 如果你在自建伺服器，也應搭配 [客戶端部署](/docs/zh-tw/self-host/client-deployment/) 設定服務端下發配置。

{{% children depth="3" showhidden="true" %}}