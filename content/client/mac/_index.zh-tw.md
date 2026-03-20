---
title: Mac
weight: 3
description: "RustDesk 的Mac文檔，提供安裝、設定、部署與疑難排解指南。"
keywords: ["rustdesk mac", "rustdesk macos", "rustdesk mac install", "rustdesk screen recording permission", "rustdesk accessibility permission", "rustdesk mac remote control"]
---

## RustDesk 在 macOS 上需要什麼？

RustDesk 在 macOS 上不只是把應用程式安裝好即可。要正常遠端控制另一台 Mac，通常需要把應用程式放進 `Applications`、允許其執行，並授予 `Accessibility`、`Screen Recording`，某些情況下還要授予 `Input Monitoring` 權限。

## macOS 快速答案

- 從 `.dmg` 安裝到 `Applications`。
- 如果 Gatekeeper 阻止執行，請在系統安全設定中允許該應用程式。
- 為遠端控制授予 `Accessibility` 和 `Screen Recording`。
- 如果鍵盤或滑鼠輸入仍無法使用，再授予 `Input Monitoring`。
- 如果重設權限後仍無效，請重新開機。

## 哪些 macOS 權限最重要？

| 權限 | 作用 |
| --- | --- |
| Accessibility | 允許 RustDesk 控制鍵盤與滑鼠輸入 |
| Screen Recording | 允許 RustDesk 擷取本機畫面 |
| Input Monitoring | 在較新的 macOS 上，當本地輸入擷取仍失敗時需要 |

## 安裝

打開 .dmg 檔案並將 `RustDesk` 拖到 `應用程式`，如下所示。

![](/docs/en/client/mac/images/dmg.png)

確保您已退出所有正在執行的 RustDesk。還要確保退出托盤上顯示的 RustDesk 服務。

![](/docs/en/client/mac/images/tray.png)

## 允許 RustDesk 執行

| 解鎖以變更 | 點擊 "App Store 和已確認的開發者"  |
| ---- | ---- |
|![](/docs/en/client/mac/images/allow2.png)|![](/docs/en/client/mac/images/allow.png)|

## 啟用權限

{{% notice note %}}
由於 macOS 安全政策的更改，我們在本機端擷取輸入的 API 不再工作。您必須在本機 Mac 端啟用「輸入監控」權限。
請按照此說明操作：
[https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923](https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923)。

在版本 1.2.4 中，您可以嘗試使用 `輸入源 2`，點擊工具列上的鍵盤圖示即可看到。
{{% /notice %}}

若要擷取畫面，您需要授予 `RustDesk` **輔助功能**權限和**畫面錄製**權限。RustDesk 將引導您進入設定視窗。

| RustDesk 視窗 | 設定視窗 |
| ---- | ---- |
|![](/docs/en/client/mac/images/acc.png)|![](/docs/en/client/mac/images/acc3.png?v2)|

如果您在設定視窗中啟用了它，但 RustDesk 仍然發出警告。請通過 `-` 按鈕從設定視窗中刪除 `RustDesk`，然後單擊 `+` 按鈕，在 `應用程式` 中選擇 `RustDesk`。

{{% notice note %}}
[https://github.com/rustdesk/rustdesk/issues/3261](https://github.com/rustdesk/rustdesk/issues/3261) <br>
其他無奈的嘗試： <br>
`tccutil reset ScreenCapture com.carriez.RustDesk` <br>
`tccutil reset Accessibility com.carriez.RustDesk` <br>
仍然需要重啟。
{{% /notice %}}

| `-` 和 `+` 按鈕 | 選擇 RustDesk |
| ---- | ---- |
|![](/docs/en/client/mac/images/acc2.png)|![](/docs/en/client/mac/images/add.png?v2)|

請按照上面相似步驟設定**畫面錄製**權限。

![](/docs/en/client/mac/images/screen.png?v2)
