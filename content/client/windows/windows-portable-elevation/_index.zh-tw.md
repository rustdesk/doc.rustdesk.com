---
title: Windows 便攜式提權
weight: 49
description: "RustDesk 的Windows 便攜式提權文檔，提供安裝、設定、部署與疑難排解指南。"
keywords: ["rustdesk portable elevation", "rustdesk uac", "rustdesk windows admin rights", "rustdesk task manager mouse issue", "rustdesk request elevation"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## 快速回答

當您執行可攜版 RustDesk 客戶端，但仍需要管理員權限來執行特定任務或在被控端進行高權限操作時，應使用可攜提權。它適合未安裝完整客戶端、但仍需要高權限遠端支援的場景。

## 關鍵重點

- 先決定是啟動時就提權，還是僅在工作階段中提權
- 同時測試被控端與控制端的提權提示
- 在大規模部署前先向支援團隊說明提權流程

<!-- GEO-LOCALIZED-INTRO:END -->

Windows 便攜式程式沒有管理員權限，這可能導致以下問題：

- 當 UAC（使用者帳戶控制）視窗彈出時無法傳輸螢幕。
- 當提升的視窗（如工作管理員）彈出時，滑鼠變得無回應。

透過提升權限，RustDesk 可以在啟動或工作階段期間建立具有管理員權限的程序，使其能夠執行螢幕截圖和滑鼠操作，從而避免上述問題。

## 啟動時提權

這樣，遠端使用者在連線時無需請求提權。有兩種方法：

* 方法 1：將便攜式程式的名稱更改為包含 `-qs-` 或 `-qs.exe` 或 `_qs.exe`（>= 1.4.6），或以 `qs.exe` 結尾（1.2.0 ~ 1.4.5）。點擊滑鼠左鍵執行，在 UAC 視窗中點擊 `接受`。

* 方法 2：右鍵點擊並以管理員身分執行。

## 在被控端提權

被控端可以在連線時直接點擊 `接受並提權`，或在已連線時點擊 `提權`。

| 連線中 | 已連線 |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/cm_unauth.jpg) | ![](/docs/en/client/windows/windows-portable-elevation/images/cm_auth.jpg) |

## 在控制端請求提權

在控制端的動作選單中選擇 `請求提權`。若被控端使用者具有系統管理員權限，可選擇 `要求遠端使用者進行驗證`。若對方使用 Windows 標準帳戶，請選擇 `傳輸管理員的使用者名稱和密碼`，並在控制端輸入系統管理員認證。連線後即可提出要求，無須等到以系統管理員身分開啟應用程式時才操作。**兩種方式都需要有人在被控端處理 RustDesk 的 UAC 提示。**

| 選單 | 對話方塊 |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/menu.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/dialog.png) |
| **等待** | **成功** |
| ![](/docs/en/client/windows/windows-portable-elevation/images/wait.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/success.png) |

### 應用程式與 RustDesk 的 UAC 提示

以系統管理員身分執行應用程式和提升 RustDesk 權限會分別觸發 UAC 提示。若要求提升 RustDesk 權限時，畫面上已出現應用程式的提示，請被控端使用者先處理該提示。

1. 在**應用程式的提示**（例如「Windows 命令處理器」）中，按一下**是**即可以系統管理員身分執行，或按一下**否**取消。
2. 在 **`rustdesk.exe` 的提示**中，按一下**是**以提升 RustDesk 權限。若 Windows 要求輸入系統管理員認證，請先輸入再確認。

提升權限後，您可以從控制端操作 UAC 視窗，並按下需要系統管理員權限的按鈕。若被控端使用者剛才取消了啟動，您現在可以重新以系統管理員身分開啟該應用程式。

### RustDesk 的 UAC 提示再次要求輸入認證

RustDesk 會使用控制端傳送的認證，以系統管理員帳戶啟動輔助處理程序。當該處理程序要求提升權限時，Windows 會套用**使用者帳戶控制：系統管理員核准模式中系統管理員之提高權限提示的行為**原則。您可以在群組原則的**電腦設定 → 原則 → Windows 設定 → 安全性設定 → 本機原則 → 安全性選項**中找到這項原則。

若設定為**在安全桌面上提示輸入認證**，即使控制端已傳送認證，仍需有人在被控端的 `rustdesk.exe` UAC 視窗中再次輸入系統管理員認證。即使在開啟其他應用程式前先要求提升權限，也會出現這項提示。[Microsoft UAC 原則文件](https://learn.microsoft.com/zh-tw/windows/security/application-security/application-control/user-account-control/settings-and-configuration)

## 如何選擇

| 場景 | 方法 |
| :---: | :---: |
| 不需要提權 | 安裝程式 |
| 被控端沒有使用者可用 | 重新命名<br/>*或*<br/> 以管理員身分執行 |
| 被控端有使用者可用<br/>*且*<br/> 連線時立即提權<br/>*且*<br/> 點擊接受連線 | 在被控端接收連線時點擊 `接受並提權` |
| 被控端有使用者可用<br/>*且*<br/> 根據需要提權 | 在被控端的連線管理視窗點擊 `提權`<br/>*或*<br/> 在控制端請求提權 |
