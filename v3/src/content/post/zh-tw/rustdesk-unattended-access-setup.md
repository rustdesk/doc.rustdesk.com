---
publishDate: 2026-07-08T11:04:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-tw'
translationKey: rustdesk-unattended-access-setup
draft: false
title: 'RustDesk 無人值守存取：設定指南'
excerpt: '以正確方式設定 RustDesk 無人值守存取：設定固定密碼、以服務方式執行並在開機時啟動，再用預先設定好的用戶端大規模部署。'
image: ~/assets/images/blog/rustdesk-unattended-access-setup-og.webp
category: '部署'
tags: ['RustDesk', '部署', '無人值守存取']
author: 'RustDesk Team'
slug: 'rustdesk-unattended-access-setup-zh-tw'
faq:
  - question: '如何在 RustDesk 中設定無人值守存取？'
    answer: '兩個步驟：在「設定 → 安全」中設定固定密碼，並安裝 RustDesk，讓它的系統服務隨電腦啟動。預設的核准模式已經接受固定密碼；macOS 另需授予螢幕錄製與輔助使用權限。完成這兩步後，就能隨時連到在線上的電腦，包括 Windows 登入畫面，不需要任何人在場。'
  - question: '為什麼使用者登出後，RustDesk 連線就中斷了？'
    answer: '因為 RustDesk 是以可攜式執行檔執行，而不是安裝後的服務。可攜式程式存在於使用者工作階段中，登出時就會停止；未提升權限時，也無法操作 Windows UAC 安全桌面。請安裝 RustDesk 並保持其系統服務啟用，服務的執行與是否有使用者登入無關。有人在場的 Windows 支援，仍可使用可攜式提升權限。'
  - question: '用固定密碼做無人值守存取安全嗎？'
    answer: '安全，只要設定得當。請使用與作業系統登入密碼不同、夠長且獨一無二的固定密碼，在受控裝置上啟用連線雙重驗證，並以 IP 或 ID 允許清單限制可連線的對象；使用 Server Pro 時再加上存取控制。持續更新用戶端並檢視日誌。自架則讓連線協調、中繼與主控台都在您自己營運的伺服器上執行。'
  - question: '可以一次將 RustDesk 無人值守存取部署到多台電腦嗎？'
    answer: '可以。在 Basic 以上的自架方案中，自訂用戶端產生器可以建立一個預先寫入伺服器位址、金鑰與各項設定的安裝程式，終端使用者什麼都不必輸入。用您現有的部署工具推送，每台裝置就會自動安裝服務，並向您的伺服器完成註冊。'
  - question: '無人值守存取在 Windows 登入畫面也能運作嗎？'
    answer: '可以，只要 RustDesk 已安裝為服務。安裝後的服務會在任何使用者登入前隨系統啟動，因此您可以連到登入畫面、完成身分驗證，甚至觸發重新開機後再次連線。可攜式執行檔做不到這一點，因為它只存在於使用者的工作階段中。'

metadata:
  description: '設定 RustDesk 無人值守存取：固定密碼、以服務方式執行並開機自動啟動、Windows／macOS／Linux 各平台注意事項，以及大量裝置的部署方式。'
  keywords: 'RustDesk 無人值守存取, RustDesk 固定密碼, RustDesk 開機自動啟動, RustDesk 服務安裝, RustDesk 無人值守設定, RustDesk 大規模部署, 無人值守遠端存取'
---

無人值守存取，指的是電腦前沒有人時也能連上它——機櫃裡的伺服器、資訊站，或遠在另一座城市的家人電腦。只要備妥兩件事，RustDesk 就能做得很好：**固定密碼**，讓每次連線都不需要有人核准；以及讓 RustDesk **以服務方式執行**，在登入前與登出後都能使用。本指南涵蓋這兩點、各平台的權限，以及如何推廣到整個裝置群。

## 簡短答案

設定**固定密碼**（設定 → 安全），並**將 RustDesk 安裝為系統服務**，讓它隨電腦啟動。預設的核准模式已經接受固定密碼，因此不需要有人點選接受；服務的執行與是否有使用者登入無關，所以隨時都能連線，包括 Windows 登入畫面。macOS 另需授予螢幕錄製與輔助使用權限。若要大規模部署，請產生預先設定好的用戶端，讓每台電腦都自動安裝並連到您的伺服器。

## 步驟 1：設定固定密碼

RustDesk 預設會顯示一組會輪替的一次性密碼，由遠端的人唸給您聽。若要無人值守存取，就要改用固定的憑證：

1. 在要連線的電腦上開啟 RustDesk。
2. 前往**設定 → 安全**（較舊的版本：主畫面上的密碼區域）。
3. 選擇**設定固定密碼**，輸入一組強度足夠且獨一無二的密碼。

預設設定已經接受這組密碼：工作階段可以透過密碼或點選接受，兩種密碼類型也都允許。如果有人把核准模式改成只能點選接受，或把密碼類型改成只用一次性密碼，請改回**只允許透過輸入密碼進行連線**（或**允許輸入密碼或點選接受進行連線**），以及**使用固定密碼**（或**同時使用兩種密碼**）。在集中管理的部署中，對應的[設定鍵](https://rustdesk.com/docs/zh-tw/self-host/client-configuration/advanced-settings/#approve-mode)是 `approve-mode`（預設為 `password-click`）與 `verification-method`（預設為 `use-both-passwords`）。

[RustDesk 用戶端文件](https://rustdesk.com/docs/zh-tw/client/)將這一步視為無人值守存取的核心。有一條規則值得強調：**不要重複使用作業系統的登入密碼**。請為 RustDesk 使用專屬、高強度的密碼，這樣其中一組憑證外洩時，才不會連帶危及另一組。

## 步驟 2：安裝為服務並設定開機啟動

這是大家最常漏掉的一步。可攜式的 `.exe` 或 `.app` 在使用者的工作階段中執行，使用者登出時就會停止；在 Windows 上，未提升權限時也無法操作 UAC 安全桌面（有人在場的支援可以使用[可攜式提升權限](https://rustdesk.com/docs/zh-tw/client/windows/windows-portable-elevation/)）。要真正做到無人值守，RustDesk 必須以背景**系統服務**執行。

- 執行 RustDesk 的**安裝程式**（不是可攜式版本），並完成安裝。
- 在**設定 → 一般**中，確認**服務**正在執行——如果顯示已停止，請按**啟動**。安裝完成後，服務就會隨電腦自動啟動。

RustDesk 以服務執行後，會在任何人登入之前載入，因此可以連到**登入畫面**、遠端完成身分驗證，甚至在沒有人在場的情況下重新開機並再次連線。macOS 與 Linux 還有各自的螢幕擷取與顯示工作階段要求，說明如下。

## 各平台注意事項

| 平台    | 該怎麼做                           | 注意事項                                                                                                                                     |
| ------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Windows | 安裝；保持服務執行（隨電腦啟動）   | 可攜式 exe 會在登出時停止，未提升權限也無法操作 UAC 提示；請使用安裝程式                                                                     |
| macOS   | 安裝、設定固定密碼、授予權限       | 必須授予螢幕錄製與輔助使用權限；登入畫面擷取需要安裝輔助程式                                                                                 |
| Linux   | 安裝服務套件                       | 標準 Wayland 版本擷取已登入的工作階段；[無人值守預覽版](/zh-tw/blog/unattended-remote-access-wayland-zh-tw)加入登入畫面存取（x86_64 Debian/Ubuntu） |
| Android | 設定固定密碼；啟用擷取             | 螢幕必須保持喚醒；需授予螢幕擷取（MediaProjection）同意與輸入權限                                                                            |

### Windows

最簡單的平台。安裝、開啟服務、設定固定密碼，就完成了。由於服務在開機時就會執行，連到登入畫面與重新開機後的無人值守存取，都能如預期運作。

### macOS

macOS 以權限管控螢幕擷取與輸入。安裝完成後，請開啟**系統設定 → 隱私權與安全性**，授予 RustDesk **螢幕錄製**與**輔助使用**兩項權限。若要在*登入視窗*（任何使用者登入之前）存取，必須安裝 RustDesk 的服務／輔助程式，才能在登入前擷取畫面——否則在那裡會看到黑畫面，也就是[黑畫面指南中談到的擷取問題](/zh-tw/blog/rustdesk-connected-waiting-for-image-zh-tw)。

### Linux

安裝 RustDesk，讓它的服務在開機時執行。標準 RustDesk 版本會在已登入的工作階段中，透過 PipeWire 與 `xdg-desktop-portal` 擷取 Wayland 桌面，自 1.4.3 起也包含多螢幕。如果電腦停在登入畫面，另外推出、適用於 **x86_64 Debian/Ubuntu 系統**的 [Wayland 無人值守預覽版](/zh-tw/blog/unattended-remote-access-wayland-zh-tw)，加入了無人值守存取與重新開機後的登入畫面存取。發行版仍提供 X11 登入畫面時，也可以改用它；無螢幕的主機則請加裝假負載插頭或虛擬顯示器。詳情請見〈[RustDesk for Linux](/zh-tw/blog/rustdesk-for-linux-zh-tw)〉。

## 步驟 3：用預先設定好的用戶端大規模部署

手動設定一台電腦沒問題，五十台就不行了。在 **Basic 以上的自架方案**中，網頁主控台的**自訂用戶端產生器**可以建置一個預先寫入您的**伺服器位址、公鑰與各項設定**的安裝程式，終端使用者什麼都不必輸入。搭配您現有的部署工具（群組原則、Intune、MSP 的 RMM 或 Shell 指令碼），每台裝置首次執行時就會安裝服務，並向*您的*伺服器完成註冊。

這正是自架為團隊帶來的效益：整個裝置群都向您營運的 ID/連線協調與中繼伺服器註冊（請見〈[RustDesk 為 MSP 打造](/zh-tw/blog/rustdesk-for-msps-zh-tw)〉）。Server Pro 方案依**登入使用者與受管裝置**授權。標準方案包含無限同時連線；只有 [Customized V2](https://rustdesk.com/pricing#custom2) 授權固定數量的同時連線。請依電腦與管理員的數量編列預算——請見〈[什麼算是受管裝置](/zh-tw/blog/what-counts-as-a-managed-device-zh-tw)〉。網頁主控台請透過反向代理以 [HTTPS](https://rustdesk.com/docs/zh-tw/self-host/rustdesk-server-pro/faq/#手動為-web-控制台設置-https) 提供。

## 做好安全防護

無人值守存取等於一扇常開的門，因此請認真看待憑證：

- **強度足夠且獨一無二的固定密碼**，並定期更換。
- 在受控裝置上啟用**連線雙重驗證**；使用 Server Pro 時再搭配[存取控制](https://rustdesk.com/docs/zh-tw/self-host/rustdesk-server-pro/permissions/)，透過使用者與裝置群組規則決定誰能連到哪些裝置（使用者群組與裝置群組的權限會累加）。共用通訊錄只用來整理項目，並不是存取邊界。[控制角色](https://rustdesk.com/docs/zh-tw/self-host/rustdesk-server-pro/control-role/)則限制技術人員在工作階段內能做的操作。
- **自架伺服器**，讓連線協調、中繼、主控台與儲存的管理資料都在您選擇的基礎架構上執行。RustDesk 用戶端與 Server OSS 採用 AGPL 授權，其身分驗證程式碼可供檢視；Server Pro 則是商業、專有的自架伺服器軟體。

## 真正由您掌控的無人值守存取

把全天候運作的裝置群指向您自己營運的伺服器，這些電腦的常駐存取就由您擁有的硬體來協調，而不是您租用的雲端。既然是長期存取，把這條路徑掌握在自己手中，很值得花這一點設定時間。
