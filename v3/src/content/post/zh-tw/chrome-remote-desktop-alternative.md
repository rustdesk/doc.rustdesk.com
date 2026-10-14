---
publishDate: 2026-07-01T08:14:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-tw'
translationKey: chrome-remote-desktop-alternative
draft: false
title: 'Chrome Remote Desktop 替代方案：自架 RustDesk'
excerpt: '比較由 Google 營運的 Chrome Remote Desktop 與 RustDesk：自架的連線協調與中繼、開放的用戶端、免費的 Server OSS，以及 Pro 的團隊管理功能。'
image: ~/assets/images/blog/chrome-remote-desktop-alternative-og.webp
category: '替代方案'
tags: ['RustDesk', 'Chrome Remote Desktop', '替代方案', '自架']
author: 'RustDesk Team'
slug: 'chrome-remote-desktop-alternative-zh-tw'
faq:
  - question: '有不需要 Google 帳號的 Chrome Remote Desktop 替代方案嗎？'
    answer: '有。指向你自架伺服器的 RustDesk 用戶端以裝置 ID 與密碼連線，不需要 Google 或任何第三方帳號。Server Pro 可以另外加上本機管理的帳號，或串接你自己的身分識別提供者。只有 RustDesk 公用示範伺服器會要求控制端免費登入。Chrome Remote Desktop 則使用 Google 身分，並由 Google 營運連線協調。'
  - question: 'Chrome Remote Desktop 支援檔案傳輸嗎？'
    answer: '支援，但只有基本的上傳與下載。Chrome Remote Desktop 不提供拖放傳輸。RustDesk 在遠端控制之外內建雙向檔案傳輸，技術人員不必離開工作階段或切換到其他工具，就能雙向搬移檔案。'
  - question: 'Chrome Remote Desktop 能提供無人值守存取嗎？'
    answer: '可以。Chrome Remote Desktop 支援以帳號為基礎、受 PIN 碼保護的無人值守存取，前提是目標機器在線上。RustDesk 則使用固定密碼（預設設定即可接受），並需在主機上執行 RustDesk 服務；Server Pro 另外提供這些裝置的集中管理。兩者都無法自行喚醒已關機的電腦。'
  - question: 'RustDesk 跟 Chrome Remote Desktop 一樣免費嗎？'
    answer: '是。RustDesk 用戶端與 RustDesk Server OSS（免費社群伺服器）採用 AGPL 授權且免費，免授權費、沒有到期限制；主機與頻寬由你自行準備。商業、專有的 Server Pro 增加網頁主控台、裝置群組與 LDAP/OIDC SSO 等自架團隊管理功能；詳見 rustdesk.com/pricing。'
metadata:
  description: 'Chrome Remote Desktop 免費又簡單，但會把你綁在 Google 帳號與服務上，也缺少團隊需要的關鍵功能。本文將它與開源、可自架的替代方案 RustDesk 做比較。'
  keywords: 'Chrome Remote Desktop 替代方案, 自架 Chrome Remote Desktop 替代方案, 不需要 Google 帳號的遠端桌面, RustDesk 與 Chrome Remote Desktop 比較'
---

Chrome Remote Desktop 的自架開源替代方案就是 RustDesk：你用 RustDesk Server OSS（免費社群伺服器）自行執行 ID/連線協調與中繼伺服器，也能閱讀用戶端原始碼，而不必把存取權綁在 Google 帳號與 Google 營運的連線協調上。商業版 Server Pro 則在同樣的自架基礎上增加團隊管理功能。

## 為什麼要尋找 Chrome Remote Desktop 的替代方案

[Chrome Remote Desktop](https://support.google.com/chrome/answer/1649523) 是 Google 推出的免費瀏覽器式遠端存取工具。它簡單又快速：安裝一個小型主機程式、登入帳號，幾分鐘內就能從另一台裝置連上你的電腦——這正是一般個人使用情境所需要的。

但只要你的需求超出「窩在沙發上處理自己的筆電」，缺口就會浮現：你被綁在 Google 的身分識別與連線協調上，部分支援團隊需要的功能付之闕如，控制層也無法自架。Google 的[網路指南](https://support.google.com/chrome/a/answer/16364503)說明了其中的分界：連線透過 Google 服務協商，即時工作階段流量則走直連、STUN 或 TURN／中繼路徑，只有 TURN／中繼封包會經過 Google 資料中心。

## Chrome Remote Desktop 做得好的地方

公道地說，[TechRadar 的評測](https://www.techradar.com/reviews/chrome-remote-desktop-review)稱它「完全免費，沒有訂閱制或付費方案」，設定簡單，非常適合個人使用。它能在 Windows、macOS 與 Linux 上執行，不需要洽談授權，也不必自行架設任何東西。如果你只是想用手機查看家裡的電腦，CRD 幾乎不費吹灰之力。

這種簡單正是它的產品定位。但當你要求它做支援團隊或多機環境真正需要的事情時，問題就開始浮現。

## Chrome Remote Desktop 的限制所在

### 缺少的功能：自架控制、裝置管理與團隊工作流程

Google 的說明頁面記載了檔案與應用程式的遠端存取，也讓管理員控制存取與網路行為，但描述的仍是以 Google 帳號為基礎、由 Google 營運連線協調的服務——也就是前言提到的連線協調與中繼分工。換句話說：CRD 應付簡單的存取綽綽有餘，但它不是具備 RustDesk 式裝置群組或自訂品牌的自架支援主控台。

### 無人值守存取與休眠中的機器

CRD 支援受 PIN 碼保護的無人值守存取，但目標機器必須開機、連上網路，並與同一個 Google 帳號關聯。RustDesk 同樣需要主機在線上，且服務正在執行、平台權限已授予。兩者都無法自行喚醒已關機的電腦；RustDesk 文件提到，經過區域網路探索之後，若本地環境支援，網路喚醒（Wake-on-LAN）就可以運作。

### 使用者管理與 Google 帳號的要求

每位參與者都需要 Google 帳號，而共享（非無人值守）工作階段必須有人在場授予存取權。Google Workspace 管理員可以[啟用或停用 CRD，並限制防火牆穿越](https://support.google.com/chrome/a/answer/2799701)，但這與具備裝置群組與範圍化技術人員存取權的自架支援主控台不同——而且如前言所述，Google 仍位於身分識別與工作階段建立的路徑上。（安全性方面的討論，請參閱 [Chrome Remote Desktop 安全嗎？](/zh-tw/blog/is-chrome-remote-desktop-safe-zh-tw)）

## Chrome Remote Desktop 與 RustDesk 一覽比較

|                                                                    | Chrome Remote Desktop                                                                                                    | RustDesk                                                                                                     |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| 費用                                                               | 免費                                                                                                                     | 用戶端與 Server OSS 免費；Server Pro 付費                                                                    |
| 控制層與流量                                                       | Google 身分識別／連線協調；直連、STUN 或經 Google 中繼的媒體流                                                           | [自架](/zh-tw/blog/why-self-host-remote-desktop-software-zh-tw)伺服器角色；直連或經自有中繼的媒體流          |
| 原始碼                                                             | [Chromium remoting 元件公開](https://chromium.googlesource.com/chromium/src/+/main/remoting/)；Google 的服務不提供自架   | 用戶端與 Server OSS 採 AGPL；Server Pro 管理功能為專有                                                       |
| 所需帳號                                                           | 兩端都需要 Google 帳號                                                                                                   | 使用自己的 ID；不需第三方帳號                                                                                |
| 檔案傳輸／傳輸工作流程                                             | 僅支援上傳／下載（不支援拖放）                                                                                           | 內建                                                                                                         |
| [無人值守存取](/zh-tw/blog/rustdesk-unattended-access-setup-zh-tw) | 以帳號／PIN 碼為基礎；目標必須在線上                                                                                     | 固定密碼；服務需執行且已授予作業系統權限；目標必須在線上                                                     |
| 集中管理                                                           | Google 管理原則；沒有由客戶營運的 CRD 控制服務                                                                           | Server Pro 主控台、存取控制、裝置群組與共用通訊錄                                                            |
| 自訂品牌                                                           | 無                                                                                                                       | 自訂品牌用戶端產生器（Basic 方案起）                                                                         |
| 平台                                                               | Windows／macOS／Linux（在 Chrome 內）                                                                                    | Windows／macOS／[Linux](/zh-tw/blog/rustdesk-for-linux-zh-tw)／Android；iOS 控制端 App                       |

## RustDesk 的定位：自架且開源

RustDesk 的區別在於**一條可實際部署的自架伺服器路徑**。[Chromium 公開了 CRD 的 remoting 原始碼](https://chromium.googlesource.com/chromium/src/+/main/remoting/)，但 Google 的連線協調服務無法自架；使用 RustDesk，你可以自行執行 Server OSS 或 Server Pro。

**RustDesk 用戶端與 Server OSS 採用 AGPL 授權**，可以獨立檢視與建置。Server OSS 提供自架的 ID/連線協調與中繼，免授權費、沒有到期限制。**Server Pro 則是商業、專有的自架伺服器軟體**，在你的基礎架構上增加管理功能。直連工作階段在兩端之間傳輸；經中繼的工作階段則走你的中繼伺服器。請連同伺服器位置一起檢視[資料主權方面的影響](/zh-tw/blog/remote-desktop-data-sovereignty-gdpr-zh-tw)。

Server Pro 補上了 CRD 缺少的團隊功能：自架網頁主控台、裝置群組、共用通訊錄，以及依使用者與裝置群組設定的[存取控制](https://rustdesk.com/docs/zh-tw/self-host/rustdesk-server-pro/permissions/)，並自 Basic 方案起提供自訂用戶端產生與 LDAP/OIDC SSO。只要服務正在執行並已授予作業系統權限，固定密碼的無人值守存取就能在 Windows、macOS 與 Linux 主機上運作；Android 主機還需要螢幕擷取同意與輸入權限，並受 OEM 背景執行限制影響，iOS App 則只能當控制端。

## 離開 Google 的雲端，改用你自己的

從 Chrome Remote Desktop 升級，換來的是控制權：連線協調、存取政策與管理資料從 Google 的伺服器移到你營運的伺服器上，搭配可以稽核的用戶端。這份控制權也帶來修補、可用性與復原的責任。

## 不必找業務，直接試用

你可以依自己的條件評估 RustDesk，整個過程都不需要 Google 帳號。Server OSS 可免費執行，免授權費、沒有到期限制；當你需要 Pro 的團隊功能時，[sales@rustdesk.com](mailto:sales@rustdesk.com) 可以告訴你目前的評估條件，[rustdesk.com/pricing](https://rustdesk.com/pricing) 則列出各方案價格。

你可以到 [GitHub](https://github.com/rustdesk/rustdesk) 親自閱讀原始碼，把幾台裝置指向你自己的伺服器，在投入任何資源之前先判斷這些取捨是否適合你。
