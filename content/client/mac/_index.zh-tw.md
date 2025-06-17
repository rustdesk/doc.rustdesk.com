---
title: Mac
weight: 3
---

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
