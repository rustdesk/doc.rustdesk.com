---
publishDate: 2026-07-07T18:21:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-tw'
translationKey: why-self-host-remote-desktop-software
draft: false
title: '為什麼要自架遠端桌面軟體'
excerpt: '離開 TeamViewer 與 AnyDesk 的團隊為什麼選擇自架遠端桌面：伺服器在哪裡執行、由誰營運、要為什麼付費，都由您決定。'
image: ~/assets/images/blog/why-self-host-remote-desktop-software-og.webp
category: '指南'
tags: ['RustDesk', '自架']
author: RustDesk Team
slug: 'why-self-host-remote-desktop-software-zh-tw'
faq:
  - question: '自架遠端桌面軟體是什麼意思？'
    answer: '自架遠端桌面軟體，是指在您掌控的基礎架構上執行連線伺服器（RustDesk 的 ID/連線協調服務）與備援用的中繼伺服器，而不是使用廠商的雲端。使用 RustDesk Server Pro 時，網頁主控台與裝置資料也放在那裡；直接連線的工作階段則仍在端點之間傳輸。'
  - question: '自架 RustDesk 伺服器實際上要做哪些事？'
    answer: '一台小型 Linux 主機、幾個開放的連接埠，加上例行維護。準備一台虛擬機，為原生 RustDesk 用戶端開放 TCP 21115-21117 與 UDP 21116，將 Server Pro 主控台與 API 放在連接埠 443 的 HTTPS 後方，並排定已實際測試過還原的備份。之後的持續工作是修補、監控、中繼容量與憑證更新。'
  - question: '自架有助於資料落地與 GDPR 合規嗎？'
    answer: '有。自架 RustDesk 讓您決定 ID/連線協調、中繼、主控台與裝置資料在哪裡執行、由誰營運，這正是資料落地規範所關注的掌控權。但這是一項部署控制，不是合規認證：直接連線的工作階段仍在端點之間傳輸，因此是否符合 GDPR，也取決於路由、資料保留與您整體的合規計畫。'
  - question: '自架適合每個團隊嗎？'
    answer: '不是每個團隊都適合，但對於已經自行營運基礎架構、希望掌控遠端存取伺服器的大多數團隊都很合適。RustDesk Server OSS（免費的社群伺服器）沒有授權費，RustDesk Server Pro 則再加上網頁主控台、存取控制與 SSO。完全不想營運任何伺服器的團隊，比較適合使用代管服務。'

metadata:
  description: '自架遠端桌面的理由：伺服器在哪裡執行、由誰營運，都由您決定。並以 RustDesk Server OSS 與 Server Pro 為實例，說明實際需要做哪些事。'
  keywords: '為什麼要自架遠端桌面, 自架遠端桌面的優點, 地端遠端存取, 不經廠商雲端的遠端桌面'
---

多數遠端桌面工具只有一種銷售方式：雲端訂閱，由廠商的伺服器協調工作階段，並在直接路徑失敗時負責中繼。自架則把這些角色移到您掌控的基礎架構上：用戶端透過您的 ID/連線協調伺服器協調連線，可行時直接連線，否則改走您的中繼伺服器。本文以 RustDesk Server OSS（免費的社群伺服器）與 Server Pro 為具體實例，說明自架的理由。

## 「自架遠端桌面」實際上代表什麼

純雲端便利的代價，是您的裝置清單、連線中繼資料，有時甚至連工作階段流量，都會經過第三方——取決於對方的服務可用性、受制於對方的定價，也承擔對方的資安狀況。

自架把這一切反過來。使用 RustDesk 時，ID/連線協調與中繼服務由您的團隊營運，Server Pro 還會把網頁主控台與儲存的裝置資料放在您的基礎架構上。直接連線的工作階段在端點之間傳輸；經中繼的工作階段則使用您的中繼伺服器。RustDesk 的**用戶端與 Server OSS 採用 [AGPL 授權](https://github.com/rustdesk/rustdesk)**；**Server Pro 則是商業、專有的自架伺服器軟體**。

## 純雲端 vs 自架一覽比較

|                        | 典型的純雲端工具                         | 自架（RustDesk Server Pro）                                                                                                  |
| ---------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 工作階段在哪裡協調     | 廠商的雲端                               | 您的地端主機或 VPS                                                                                                           |
| 資料落地               | 由廠商掌控                               | 伺服器端服務在您掌控的基礎架構上執行；[端點之間的路徑仍須留意](/zh-tw/blog/remote-desktop-data-sovereignty-gdpr-zh-tw)       |
| 授權的同時連線／通道   | 依方案而定的額度                         | 標準方案無限制；Customized V2 有授權額度                                                                                     |
| 計價模式               | 依產品而定的使用者、端點與連線額度       | [登入使用者加上受管裝置](https://rustdesk.com/pricing)；Customized V2 另外授權同時連線數                                     |
| 原始碼                 | 依產品而定，通常是專有軟體               | 可稽核的 AGPL 用戶端                                                                                                         |
| 服務中斷取決於         | 廠商的服務可用性                         | 您自己的維運                                                                                                                 |
| 由誰營運伺服器         | 廠商                                     | 您                                                                                                                           |

自架並不會讓您犧牲功能。對 [MSP](/zh-tw/blog/rustdesk-for-msps-zh-tw) 與內部 IT 而言，Server Pro 提供自架網頁主控台與依使用者及裝置群組設定的[存取控制](https://rustdesk.com/docs/zh-tw/self-host/rustdesk-server-pro/permissions/)，並自 Basic 方案起提供自訂用戶端產生器與 [LDAP/OIDC SSO](https://rustdesk.com/docs/zh-tw/self-host/rustdesk-server-pro/ldap/)。也不會讓您犧牲規模：RustDesk 的公共伺服器於 2026 年 7 月 7 日，在一台 12 核心、32 GB 記憶體的主機上記錄到超過兩百萬個線上端點（內部遙測資料），而[大規模裝置群規劃指南](/zh-tw/blog/rustdesk-scale-50000-200000-devices-zh-tw)則說明了 Server Pro 需要驗證的項目。

## 營運伺服器實際上要做什麼

掌控權伴隨著維運工作：一次性的設定，加上例行的維護。具體清單如下：

- **準備主機。** RustDesk 的硬體需求不高，一台規格普通的 Linux 虛擬機——地端主機或平價 VPS 都可以——就能執行 ID/連線協調與中繼服務。請依裝置數量，以及有多少流量最後會走中繼而非點對點，來決定主機規格。
- **只開放您會用到的連接埠。** 原生 RustDesk 用戶端需要 **TCP 21115-21117 與 UDP 21116**，用於 NAT 測試、連線服務、註冊、心跳與中繼。請勿對外開放整個 21114-21119 範圍。TCP 21118-21119 是 WebSocket 後端，TCP 21114 則是 Pro 的 HTTP API／主控台後端。由 HTTPS/WSS 反向代理負責 Pro API 與 WebSocket 服務時，這部分流量只需對外開放 TCP 443，並讓 21114 與 21118-21119 只在內部可連。如果同時有原生用戶端連線，公開的 443 並不能取代原生用戶端所需的核心連接埠。請見[官方連接埠說明](https://rustdesk.com/docs/zh-tw/self-host/)。
- **設定 TLS。** 在反向代理上終止 HTTPS 與 WSS，讓帳密、API 呼叫與瀏覽器用戶端的流量都走公開的 TCP 443，而不是直接暴露純 HTTP 的主控台／API 或原始的 WebSocket 後端。
- **備份。** 伺服器上存放著您的裝置清單、使用者帳號、通訊錄與存取規則。請排定備份——並實際測試能否從備份還原。
- **維持修補節奏。** 新的伺服器版本會陸續推出，底層作業系統也由您負責。請決定由誰套用更新、多久更新一次。
- **監控。** 協調服務現在是您自己的，因此可用性、磁碟與中繼吞吐量都要自己監看，警示與復原也由您負責。

對已經在維運 Linux 伺服器的團隊來說，這些都不是什麼特別的工作。指定負責人，排好更新、備份、憑證更新與還原測試的時程，伺服器就能像其他例行基礎架構一樣運作。

## 如何評估自架

- **從 Server OSS 開始。** 今天下午就能部署，檢視程式碼，想用多久就用多久：沒有授權費，也沒有使用期限，只需負擔自己的主機與頻寬。
- **需要 Pro 的功能？** 目前的方案價格請見 [rustdesk.com/pricing](https://rustdesk.com/pricing)，也可以洽詢 [sales@rustdesk.com](mailto:sales@rustdesk.com)，了解目前有哪些評估方式。
- **想先看再裝？** [RustDesk YouTube 頻道](https://www.youtube.com/@rustdesk)上有完整的影片示範。

如果是價格調整、封閉的程式碼或廠商的雲端讓您開始尋找替代方案，自架是結構性的解法，而不是折扣：伺服器在哪裡執行、由誰營運，都由您決定。對已經在營運基礎架構的團隊來說，這只是下一步，而不是一大躍進；先用 Server OSS 試行，依尖峰工作階段規劃中繼容量，等工作流程穩定了，再把整個裝置群移過來。
