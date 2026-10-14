---
publishDate: 2026-07-05T19:40:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-tw'
translationKey: 'rustdesk-for-msps'
draft: false
title: 'RustDesk 為 MSP 打造：單一自架、可自訂品牌的工具'
excerpt: '比較如何把 TeamViewer、AnyDesk 與 ScreenConnect 整合到單一自架、可自訂品牌的遠端支援平台。'
image: '~/assets/images/blog/rustdesk-for-msps-og.webp'
category: '指南'
tags: ['RustDesk', 'MSP', '自架']
author: 'RustDesk Team'
slug: 'rustdesk-for-msps-zh-tw'
faq:
  - question: 'RustDesk 能整合 MSP 手上的多套遠端支援工具嗎？'
    answer: '可以，就遠端控制與支援而言。RustDesk Server Pro 讓 MSP 以一個自架主控台取代多套主控台與合約，自 Basic 方案起提供品牌用戶端，並有依使用者與裝置群組設定的存取控制，標準方案還包含無限同時連線。請先試行你所依賴的 PSA／RMM 整合。'
  - question: 'RustDesk 對 MSP 如何授權？'
    answer: '依登入使用者（你的技術人員）與受管裝置（你支援的機器）付費，標準方案包含無限同時連線，多位技術人員可以同時進行工作階段，不必購買通道。只有 Customized V2 授權固定數量的同時連線；詳情請見 rustdesk.com/pricing。'
  - question: '可以為 RustDesk 用戶端做白牌或加上自己的品牌嗎？'
    answer: '可以。RustDesk Server Pro 內建自訂用戶端產生器，自 Basic 方案起提供，能建置帶有你自己的名稱、標誌、圖示與伺服器設定的用戶端。你的客戶安裝的是帶有你的品牌、連到你的伺服器的工具，而不是廠商品牌的下載檔。'
  - question: 'RustDesk 是自架的嗎？伺服器由誰維運？'
    answer: '是。RustDesk Server Pro 採自架模式：MSP 在自己的地端主機或 VPS 上執行 ID/連線協調伺服器、中繼、網頁主控台與儲存的管理資料，並負責修補、監控、備份與憑證。RustDesk Server OSS（免費的社群伺服器）則提供 ID/連線協調與中繼，但沒有 Pro 的管理功能。'
  - question: 'MSP 該如何開始評估 RustDesk？'
    answer: '先在測試虛擬機上架設 RustDesk Server OSS（免費的社群伺服器）：它沒有授權費，也沒有使用期限，技術人員可以在付費前先驗證具代表性的支援工作流程。等團隊需要網頁主控台、品牌用戶端或存取控制時，再加上 Server Pro，並來信 sales@rustdesk.com 洽詢目前的評估條款。'

metadata:
  description: 'RustDesk 為 MSP 打造：可自架的 ScreenConnect／TeamViewer 替代方案，提供品牌用戶端、存取控制，標準方案並包含無限同時連線。'
  keywords: 'RustDesk MSP, MSP 自架遠端支援, MSP 白牌遠端桌面, MSP 遠端支援工具, 依技術人員計費的遠端桌面授權'
---

大多數 MSP 並不是想再找一套遠端支援工具，而是想要*少*幾套：這裡一個雲端遠端支援席位，那裡一套按技術人員計費的工具，再加上一款處理臨時工作的獨立快速支援工具，每一套都有自己的主控台、合約與續約。RustDesk 用一套自架、可自訂品牌的平台取代這一堆工具；在淘汰任何工具之前，請先試行技術人員依賴的 PSA／RMM 整合與端點工作流程。

本指南說明 RustDesk 的開放原始碼用戶端、自架伺服器選項、商業版 Pro 集中管理、品牌客製，以及適用於 MSP 工作流程的授權方式。

## 遠端存取服務由你自己營運

RustDesk Server Pro 採**自架**模式：ID/連線協調、中繼、主控台與儲存的管理資料都由你的團隊營運。RustDesk 的用戶端與 RustDesk Server OSS（免費的社群伺服器）採用 **[AGPL 授權](https://github.com/rustdesk/rustdesk)**；Server Pro 則是商業、專有的自架伺服器軟體。當客戶的資安審查問到「這個代理程式在我們的端點上做什麼？」時，你可以直接拿出用戶端原始碼，而不是一個封閉的執行檔；伺服器端服務在哪裡執行，也由你決定。

以下是單一自架平台與 MSP 想整合掉的那一堆工具的對照：

|                      | 各自獨立的雲端遠端支援工具 | RustDesk Server Pro                                                                         |
| -------------------- | -------------------------- | ------------------------------------------------------------------------------------------- |
| 需要管理的主控台     | 每套工具各一個             | 單一自架主控台                                                                              |
| 用戶端品牌           | 依產品與方案而定           | 自 Basic 方案起提供自訂品牌用戶端產生器                                                     |
| 部署位置             | 廠商雲端                   | 自架（地端或你的 VPS）                                                                      |
| 原始碼               | 依產品而定，通常是專有軟體 | 可稽核的 AGPL 用戶端                                                                        |
| 授權的同時連線／通道 | 依方案而定的額度           | 標準方案無限制；[Customized V2](https://rustdesk.com/pricing#custom2) 有授權額度            |
| 授權計算基礎         | 按席位／按通道             | [依登入使用者 + 受管裝置](https://rustdesk.com/pricing)                                     |

確切的方案等級與目前價格，請見 [rustdesk.com/pricing](https://rustdesk.com/pricing)。

## 依方案而定的同時連線

你付費的對象是授權的登入使用者（通常是技術人員）與受管裝置。標準方案包含無限同時連線，所以在一次故障事件中，三位工程師同時處理三個不同的客戶據點，也只是平常的一天，而不是要另外計費的事件。如果你過去一直在分配同時工作階段，或讓團隊配合通道數量排班，在標準方案上這個限制就消失了。

只有 [Customized V2](https://rustdesk.com/pricing#custom2) 授權固定數量的同時連線。依照 RustDesk 的[同時連線定義](https://github.com/rustdesk/rustdesk/wiki/FAQ#concurrent-connections)，一個同時連線就是一台正在進行控制的主控裝置，也就是一個「通道」：一台技術人員電腦開五個工作階段分頁，只占用一個通道；三台技術人員電腦同時作業，則占用三個。Customized V2 也只把指派給使用者或裝置群組的裝置算作受管裝置，因此臨時支援的機器既不計入，也不會被停用；請見〈[什麼算是受管裝置](/zh-tw/blog/what-counts-as-a-managed-device-zh-tw)〉。

## 打造品牌，並加上存取控制

Server Pro 為 MSP 提供自架網頁主控台與三種各自獨立的控制。[存取控制](https://rustdesk.com/docs/zh-tw/self-host/rustdesk-server-pro/permissions/)透過使用者與裝置群組規則，決定哪些技術人員能連到哪些裝置；每台裝置隸屬於一個裝置群組，使用者群組與裝置群組的權限會累加。共用通訊錄為技術人員整理項目，但它不是存取邊界。[控制角色](https://rustdesk.com/docs/zh-tw/self-host/rustdesk-server-pro/control-role/)限制技術人員在工作階段內能做的操作。自訂用戶端產生器與 LDAP/OIDC SSO 從 Basic 方案起提供。

品牌用戶端之所以重要，是因為你的客戶安裝的工具帶有你的名稱、標誌與伺服器設定，而不是廠商的。存取控制則讓你把每位技術人員限定在他所負責客戶據點的裝置群組內。

## 掌控伺服器端資料的位置

自架讓 MSP 決定 ID/連線協調、中繼、主控台與儲存的裝置資料在哪裡執行、由誰營運，這往往是受監管產業客戶的決定性因素。但這是一項部署控制，不是合規認證：直接連線的工作階段仍在端點之間傳輸，因此請依照〈[遠端桌面資料主權與 GDPR](/zh-tw/blog/remote-desktop-data-sovereignty-gdpr-zh-tw)〉的說明，盤點端點位置與路由。

## 依你自己的方式實際測試

今天就能評估 RustDesk，不必先預約會議：

- **在閒置的虛擬機上架設 Server OSS。** 它沒有授權費，也沒有使用期限，你可以在花任何一毛錢之前，先驗證真實的客戶工作流程。
- **需要品牌與存取控制時，** 請到 [rustdesk.com/pricing](https://rustdesk.com/pricing) 比較各方案，並洽詢 [sales@rustdesk.com](mailto:sales@rustdesk.com) 目前適用的評估條款。
- **沒時間架測試環境？** 先看看 RustDesk 的實際操作，或到 [RustDesk YouTube 頻道](https://www.youtube.com/@rustdesk)瀏覽操作教學。

隨著客戶群成長，你可以[**隨時升級**](/zh-tw/blog/upgrade-rustdesk-license-mid-subscription-zh-tw)：升級會把授權延長為自升級日起一整年，並折抵剩餘的已付價值。請從 [rustdesk.com/pricing](https://rustdesk.com/pricing) 開始。
