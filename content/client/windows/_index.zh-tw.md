---
title: Windows
weight: 4
description: "RustDesk 的Windows文檔，提供安裝、設定、部署與疑難排解指南。"
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