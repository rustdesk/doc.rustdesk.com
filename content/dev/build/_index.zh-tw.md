---
title: 編譯
weight: 1
description: "RustDesk 的編譯文檔，提供安裝、設定、部署與疑難排解指南。"
keywords: ["build rustdesk", "rustdesk source build", "rustdesk packaging", "rustdesk contributor build guide"]
---

關於包裝桌面版本，請查看 [build.py](https://github.com/rustdesk/rustdesk/blob/master/build.py) 。

## 建置部分包含什麼？

建置部分涵蓋 Linux、Windows 與 macOS 的桌面貢獻者環境。請依平台選擇對應指南，完成依賴安裝、`vcpkg` 設定、Rust 工具鏈準備以及最終建置或封裝。

## 應該選擇哪個建置指南？

| 平台 | 指南 |
| --- | --- |
| Linux | [Linux](/docs/zh-tw/dev/build/linux/) |
| Windows | [Windows](/docs/zh-tw/dev/build/windows/) |
| macOS | [macOS](/docs/zh-tw/dev/build/osx/) |
| Windows 疑難排解 | [Windows FAQ](/docs/zh-tw/dev/build/faq/) |

{{% children depth="3" showhidden="true" %}}
