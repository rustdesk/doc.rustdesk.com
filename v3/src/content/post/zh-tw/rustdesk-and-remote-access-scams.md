---
publishDate: 2026-07-06T12:36:00Z
lang: 'zh-tw'
translationKey: 'rustdesk-and-remote-access-scams'
draft: false
title: 'RustDesk 與遠端存取詐騙：我們正在採取的措施'
excerpt: '為什麼 RustDesk 退出 Google Play、新增警告與公共伺服器登入要求，以及使用者如何透過密碼、雙因素驗證（2FA）與 IP 允許清單強化受控裝置的安全性。'
image: '~/assets/images/blog/rustdesk-and-remote-access-scams-og.webp'
category: '安全'
tags: ['RustDesk', '安全', '詐騙']
author: 'RustDesk Team'
slug: "rustdesk-and-remote-access-scams-zh-tw"
faq:
  - question: 'RustDesk 是詐騙軟體嗎？'
    answer: '不是。RustDesk 是合法的開放原始碼遠端存取軟體。不過，就像其他遠端桌面工具一樣，當詐騙者說服某人安裝軟體、啟動服務並授予存取權限時，它仍可能遭到濫用。RustDesk 發布了詐騙警告，並新增了發布通路與公共伺服器的限制措施以降低此類濫用，但沒有任何遠端存取產品能徹底杜絕社交工程手法。'
  - question: '為什麼 RustDesk 無法在 Google Play 上取得？'
    answer: 'RustDesk 於 2023 年 9 月主動將其 Android 應用程式從 Google Play 下架，以防止使用者持續遭受詐騙攻擊。Android 版本仍可透過 RustDesk 官方 GitHub 發布頁與 F-Droid 取得。請務必只從您自行查證過的來源下載，切勿使用未經請求的來電者所傳送的連結。'
  - question: '為什麼 RustDesk 公共伺服器需要登入？'
    answer: 'RustDesk 表示，由於持續發生詐騙與殭屍網路濫用情況，目前在其公共伺服器上，控制端必須登入。透過支援的第三方身分提供者登入是免費的。公共伺服器的用途是展示與測試，而非正式營運或處理敏感工作；如需自行管理基礎架構與政策，組織仍可選擇自架伺服器（self-hosting）。'
  - question: '我該如何保護接受 RustDesk 連線的裝置？'
    answer: '在受控裝置上設定強度足夠且獨一無二的永久密碼，啟用用戶端的 TOTP 連線雙因素驗證（2FA），並在您的控制端位址或 CIDR 範圍可預測時，使用其 IP 允許清單功能。同時將信任裝置的例外情況控制在最小範圍內。這些防護層級能降低密碼與網路來源方面的風險，但如果有人刻意將密碼、當下的 2FA 驗證碼或手動核准提供給詐騙者，這些機制便無法提供保護。'
metadata:
  description: 'RustDesk 如何因應遠端存取詐騙：公開警告、Google Play 下架、公共伺服器登入要求、受控裝置雙因素驗證（2FA），以及 CIDR IP 允許清單。'
  keywords: 'RustDesk 詐騙, RustDesk 是詐騙嗎, RustDesk Google Play, RustDesk 需要登入, RustDesk 雙因素驗證, RustDesk IP 白名單, 遠端存取詐騙防範'
---

RustDesk 是合法的開放原始碼遠端存取軟體，但合法的軟體同樣可能遭到濫用。詐騙者可以打電話給受害者，捏造緊急問題，說服對方安裝遠端控制工具並授予存取權限。RustDesk 同樣無法自外於這種風險，而加密技術也無法彌補透過欺騙手段取得的「同意」。

我們的因應方式，是在這個過程中的多個環節加入警告與阻力：包括我們的網站、Android 受控裝置流程、主要發布通路，以及公共伺服器。這些措施同時也會為合法使用者帶來不便。本文將說明我們做了什麼、為何這麼做，以及這些措施的極限何在。

## RustDesk 針對遠端存取詐騙採取了哪些措施？

| 措施                    | 因應的情境                                       | 代價或限制                                              |
| ----------------------- | ------------------------------------------------ | ------------------------------------------------------- |
| 網站與用戶端警告        | 遭不明來電者指示安裝 RustDesk 的使用者           | 警告仍可能被忽略                                        |
| 主動從 Google Play 下架 | 透過熟悉的應用程式商店輕易完成詐騙導向的安裝     | 合法 Android 使用者失去商店曝光機會與 Play 自動更新功能 |
| 公共伺服器要求登入      | 利用共用基礎架構進行匿名詐騙與殭屍網路濫用       | 合法使用者必須登入，部分既有工作流程因此受到影響        |
| 受控裝置安全控制項      | 密碼遭竊、網路暴露範圍過大，以及無人值守存取風險 | 必須正確設定才有效，且無法防範使用者自願洩露資訊        |

這些都是降低風險的措施，而非宣稱 RustDesk 能完全杜絕詐騙。

## 潛在受害者可能看到警告的位置

[RustDesk 支援頁面](https://rustdesk.com/support)一開頭就直接列出詐騙警告，告訴那些正在與不認識、不信任的人通話，並被要求安裝 RustDesk 的人：請立即停止。[RustDesk GitHub 儲存庫](https://github.com/rustdesk/rustdesk)也附上了一份關於未經授權存取、控制與侵犯隱私的濫用聲明。

透過 [GitHub Releases](https://github.com/rustdesk/rustdesk/releases) 發布的官方 Android 用戶端內部，同樣附有這項警告。在尚未登入、即將作為受控端的 Android 裝置上，點按 **Start service** 時，會在螢幕擷取服務啟動前跳出警告，告訴受到不明且不受信任的來電者指示的使用者：請停止操作並掛斷電話。官方版本會在使用者可以繼續操作前設有倒數計時。無論是[目前的受控端流程](https://github.com/rustdesk/rustdesk/blob/6c578292e8ebbbec708b76986ba8c4bc7c509747/flutter/lib/mobile/pages/server_page.dart#L244-L421)，還是[英文警告文字](https://github.com/rustdesk/rustdesk/blob/6c578292e8ebbbec708b76986ba8c4bc7c509747/src/lang/en.rs#L192-L194)，皆可在開放原始碼儲存庫中查看。

警告出現的位置很重要。一般的安全頁面或許能觸及正在研究產品的人；而出現在 **Start service** 當下的警告，則是在 Android 連線即將成立的那一刻觸及當事人。但即使如此，也無法強迫對方對一位極具說服力的來電者產生懷疑。

## 為什麼 RustDesk 不在 Google Play 上架

2023 年 9 月 3 日，RustDesk 官方 X 帳號發文表示：[「我們已暫時將 RustDesk 從 Google Play 下架，以防止使用者持續遭受詐騙攻擊。」](https://x.com/rustdesk/status/1698372220379349421)這則連結與內容也保留在已回覆的 [GitHub Discussion #5660](https://github.com/rustdesk/rustdesk/discussions/5660) 討論中，而目前的 RustDesk [常見問答也指出，該專案是因為詐騙問題而自行從 Google Play 下架](https://github.com/rustdesk/rustdesk/wiki/FAQ#apple--google-store)。

因此，RustDesk **目前並未透過 Google Play 發布**。這並不是在宣稱 Android 用戶端是惡意軟體，也不是說每個安裝它的人都身處風險之中，而是一項發布決策，目的在於減少詐騙指示中常被利用的一條途徑。

這項取捨確實存在代價：退出 Google Play 會讓合法使用者失去商店曝光機會、熟悉的安裝方式，以及自動商店更新功能。目前的 Android 版本可透過 [RustDesk 官方 GitHub 發布頁](https://github.com/rustdesk/rustdesk/releases)與 [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/) 取得。請自行查證下載來源，切勿安裝不請自來、自稱「客服」來電者所提供連結中的 APK 檔案。我們的 [Android 與 iOS 指南](/zh-tw/blog/rustdesk-remote-control-android-ios-zh-tw) 列出了目前的行動裝置功能與安裝來源。

## 為什麼公共伺服器需要登入

RustDesk 目前的[公共伺服器登入指南](https://github.com/rustdesk/rustdesk/wiki/Login-required-for-public-server)指出，由於持續發生詐騙與殭屍網路濫用情況，控制端必須登入。登入是免費的，並透過 Google 或 GitHub 等支援的第三方身分提供者進行；公共伺服器並未提供獨立的使用者名稱與密碼登入方式。該指南目前表示，只有控制端需要登入。

這項變更增加了一道身分驗證程序，同時也取消了對 RustDesk 展示與測試用基礎架構的部分匿名存取權限。此規定並不適用於私有的 RustDesk 伺服器，也無法阻止使用其他基礎架構或建立新身分的詐騙者。

這項措施也確實造成了一些困擾。在一則[關於新登入錯誤的 Reddit 討論](https://www.reddit.com/r/rustdesk/comments/1sm91xv/getting_this_error_when_trying_to_connect_anyone/)中，部分合法使用者反映，在理解並完成登入步驟之前，一度無法連上自家或家人的裝置；也有人反對綁定第三方身分。這些留言並不能證明此限制措施對詐騙者是否有效，但確實記錄了其實際運作成本。任何會增加使用阻力的防濫用措施，都應該坦誠承認這項代價。

## 如何保護受控的 RustDesk 裝置？

平台層級的限制只是其中一道防線。受控裝置的擁有者或管理員，也應該進一步縮小能夠連線的對象範圍，並降低憑證一旦遭竊後可能造成的損害。

### 1. 設定強度足夠且獨一無二的永久密碼

若要設定[無人值守存取](/zh-tw/blog/rustdesk-unattended-access-setup-zh-tw)，請在受控裝置的 RustDesk 安全性設定中，設定一組**強度足夠且獨一無二的永久密碼**。切勿重複使用作業系統登入密碼、電子郵件密碼，或其他服務所用的密碼。若密碼可能已經外洩，應立即更改。

若是有人在場的支援情境，建議盡可能改用臨時一次性密碼，或要求明確點按核准。強度足夠的永久密碼可以降低被猜出、憑證填充攻擊，以及密碼重複使用等風險，但如果受害者親口將密碼唸給來電者聽，這道防線就毫無用處。

### 2. 在受控裝置上啟用雙因素驗證（2FA）

RustDesk 針對受控裝置的傳入連線，提供了 TOTP 雙因素驗證（2FA）功能。在將要接受連線的裝置上，開啟其安全性設定，啟用 **2FA**，使用驗證器應用程式掃描 QR Code，並輸入六位數驗證碼以確認設定完成。

啟用之後，光是輸入正確的連線密碼並不足夠：控制端還必須提供當下有效的六位數 TOTP 驗證碼，受控裝置才會授權該工作階段。此功能當初是專門作為[無人值守存取的 2FA](https://github.com/rustdesk/rustdesk/commit/44e6b7dbb0125dc0c288c19a16a944b5d605852b) 而推出的，其 [TOTP 實作方式已公開](https://github.com/rustdesk/rustdesk/blob/master/src/auth_2fa.rs)。

RustDesk 可以選擇信任特定控制端裝置，之後便略過 2FA 提示。若要維持最嚴格的安全性，請保持此略過機制為停用狀態。若您確實使用此功能，請定期檢查信任裝置清單，並移除已遺失、已更換、共用中或不再獲得授權的裝置。

2FA 能夠防範密碼遭猜出、重複使用或外洩的情況，但如果有人把密碼與當下的驗證碼一併提供給詐騙者，這項機制便無法提供保護。

### 3. 使用 IP 允許清單限制傳入連線

RustDesk 介面將此功能稱為 **IP Whitelisting**。以說明性的角度來看，這其實就是一份 IP 允許清單：受控裝置會在密碼與 2FA 驗證之前，先拒絕來源位址不在設定清單內的連線。

設定位置如下：

- **桌面受控裝置：** **Settings → Security → Security → Use IP Whitelisting**
- **行動受控裝置：** **Settings → Share screen → Use IP Whitelisting**

此設定接受個別的 IPv4 或 IPv6 位址，以及 CIDR 範圍。CIDR 是將網路位址與前綴長度結合而成：前綴數字代表有多少個前導位元是固定的：前綴數字越大，允許的範圍就越小。

- `203.0.113.10` 或 `203.0.113.10/32`：單一 IPv4 位址。
- `203.0.113.0/24`：256 個 IPv4 位址，範圍從 `203.0.113.0` 到 `203.0.113.255`。
- `2001:db8::10/128`：單一 IPv6 位址。
- `2001:db8:1234::/64`：單一 IPv6 子網路。

以上僅為文件範例範圍，請勿原封不動地複製使用，務必輸入您實際的控制端位址或網路範圍。多筆項目之間可以用逗號、分號、空格或換行分隔。RustDesk 在其[進階用戶端設定參考文件](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#whitelist)中記錄了此設定，[受控端的強制執行邏輯也可在原始碼中查看](https://github.com/rustdesk/rustdesk/blob/master/src/server/connection.rs#L1347-L1374)。

請盡量使用實務上可行的最小範圍。固定的辦公室對外位址與已知的 VPN 範圍是不錯的選擇；動態的住家位址與漫遊控制端則不適合。請先確認在您的 NAT、VPN、直連或中繼拓撲中，RustDesk 實際看到的來源位址為何，並在關閉目前的工作階段之前，先用另一個工作階段測試新規則是否生效。位址或 CIDR 設定錯誤，可能會將合法的支援人員擋在門外。

允許清單只能縮小連線可能的來源範圍，無法取代密碼或 2FA，也無法阻止已經在允許範圍內的網路中運作的惡意控制端。

## 這些措施無法做到的事

警告、商店下架、登入要求、強密碼、2FA，以及 IP 允許清單，每一項都能消除攻擊者的一部分可乘之機，但沒有一項能消除社交工程這個核心風險：一個人仍然可能被說服去核准存取，或洩露每一項驗證因素。

自架伺服器（self-hosting）同樣無法讓濫用行為絕跡。它讓組織能夠掌控自己的 RustDesk 伺服器與政策，但詐騙者同樣可以架設私有基礎架構，或散布經過修改的用戶端。切勿誤以為 RustDesk 公共伺服器的限制措施，會自動延伸適用於每一個自架部署環境。

如果有不明來電者要求您安裝 RustDesk、啟動服務、分享密碼、透露 2FA 驗證碼，或開啟網路銀行網站，請立即停止。我們這篇不偏袒特定廠商的[遠端桌面詐騙辨識、預防與復原指南](/zh-tw/blog/avoid-remote-desktop-scams-zh-tw)，說明了警訊有哪些，以及萬一已經授予存取權限時該怎麼辦。

在這件事上，「負責任」並不是靠單一設定選項或一句善意聲明就能達成的，而是一項持續進行的工作：提醒使用者、在濫用行為確實需要時願意接受隨之而來的不便、提供技術性控制措施、清楚記載其限制，並隨著攻擊者手法的演變而不斷調整因應方式。
