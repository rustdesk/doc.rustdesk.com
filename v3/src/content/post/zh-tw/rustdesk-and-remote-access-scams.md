---
publishDate: 2026-07-06T12:36:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-tw'
translationKey: 'rustdesk-and-remote-access-scams'
draft: false
title: 'RustDesk 與遠端存取詐騙：我們正在採取的措施'
excerpt: '為什麼 RustDesk 退出 Google Play、加入警告與公共伺服器登入要求，以及使用者如何以密碼、雙重驗證（2FA）與 IP 及 ID 允許清單強化受控裝置。'
image: '~/assets/images/blog/rustdesk-and-remote-access-scams-og.webp'
category: '安全'
tags: ['RustDesk', '安全', '詐騙']
author: 'RustDesk Team'
slug: "rustdesk-and-remote-access-scams-zh-tw"
faq:
  - question: 'RustDesk 是詐騙軟體嗎？'
    answer: '不是。RustDesk 是合法的開放原始碼遠端存取軟體。不過，和其他遠端桌面工具一樣，詐騙者若說服某人安裝它、啟動服務並授予存取權，它就可能遭到濫用。RustDesk 公開發布詐騙警告，並加入發布通路與公共伺服器的限制來減少這類濫用，但沒有任何遠端存取產品能讓社交工程完全失效。'
  - question: '為什麼在 Google Play 上找不到 RustDesk？'
    answer: 'RustDesk 於 2023 年 9 月主動將 Android 應用程式從 Google Play 下架，以防止更多針對使用者的詐騙。Android 版本仍可從 RustDesk 官方 GitHub 發布頁與 F-Droid 取得。請只從您自行查證過的來源下載，不要使用不請自來的來電者傳給您的連結。'
  - question: '為什麼 RustDesk 公共伺服器需要登入？'
    answer: 'RustDesk 表示，由於詐騙與殭屍網路濫用持續發生，目前公共伺服器要求控制端登入。透過支援的第三方身分提供者登入是免費的。公共伺服器的用途是展示與測試，不適合正式營運或處理敏感工作；需要自行營運基礎架構與政策的組織，仍可選擇自架。'
  - question: '該如何保護接受 RustDesk 連線的裝置？'
    answer: '請在受控裝置上設定強度足夠且獨一無二的固定密碼，啟用用戶端的 TOTP 連線雙重驗證（2FA），並在控制端位址或 CIDR 範圍可預測時使用 IP 允許清單。自 RustDesk 1.5.0 起，還可以用 ID 允許清單限制哪些 RustDesk ID 能連線。信任裝置的例外請維持在最小範圍。這些防護層能降低密碼與網路來源方面的風險，但如果有人刻意把密碼、當下的 2FA 驗證碼或手動核准交給詐騙者，就無法提供保護。'
metadata:
  description: 'RustDesk 如何因應遠端存取詐騙：公開警告、退出 Google Play、公共伺服器登入要求、受控裝置雙重驗證（2FA），以及 IP 與 ID 允許清單。'
  keywords: 'RustDesk 詐騙, RustDesk 是詐騙嗎, RustDesk Google Play, RustDesk 需要登入, RustDesk 2FA, RustDesk IP 白名單, RustDesk ID 白名單, 遠端存取詐騙防範'
---

RustDesk 是合法的開放原始碼遠端存取軟體，但合法的軟體同樣可能遭到濫用。詐騙者可以打電話給受害者，捏造緊急問題，說服對方安裝遠端控制工具並授予存取權。RustDesk 無法置身於這種風險之外，而透過欺騙取得的「同意」，也不是加密能解決的問題。

我們的因應方式，是在這條路徑上的多個環節加入警告與阻力：我們的網站、Android 受控裝置的操作流程、主要的發布通路，以及公共伺服器。這些措施同樣會為合法使用者帶來不便。本文說明我們做了什麼、為什麼這麼做，以及仍然存在的限制。

## RustDesk 針對遠端存取詐騙採取了哪些措施？

| 措施                    | 因應的情境                                       | 代價或限制                                          |
| ----------------------- | ------------------------------------------------ | --------------------------------------------------- |
| 網站與用戶端警告        | 有人被不明來電者指示安裝 RustDesk                | 警告仍可能被忽略                                    |
| 主動從 Google Play 下架 | 透過熟悉的應用程式商店，輕易完成詐騙導向的安裝   | 合法 Android 使用者失去商店曝光與 Play 自動更新     |
| 公共伺服器要求登入      | 匿名利用共用基礎架構進行詐騙與殭屍網路濫用       | 合法使用者必須登入，部分既有工作流程因此受到影響    |
| 受控裝置安全控制項      | 密碼遭竊、網路暴露範圍過大，以及無人值守存取風險 | 必須正確設定才有效，也無法防範使用者自願洩露資訊    |

這些都是降低風險的措施，並不代表 RustDesk 能完全杜絕詐騙。

## 潛在受害者可能看到警告的位置

[RustDesk 支援頁面](https://rustdesk.com/support)一開頭就是直接的詐騙警告：如果您正在和不認識、不信任的人通話，而對方要求您安裝 RustDesk，請立即停止。[RustDesk GitHub 儲存庫](https://github.com/rustdesk/rustdesk)也附有濫用聲明，反對未經授權的存取、控制與侵犯隱私。

透過 [GitHub Releases](https://github.com/rustdesk/rustdesk/releases) 發布的官方 Android 用戶端內，同樣有這項警告。在尚未登入、即將被控制的 Android 裝置上點按**啟動服務**時，螢幕擷取服務啟動前會先跳出警告，告訴受不明且不可信來電者指示的使用者：請停止操作並掛斷電話。官方版本會設定倒數計時，時間到了使用者才能繼續。[目前的受控端流程](https://github.com/rustdesk/rustdesk/blob/6c578292e8ebbbec708b76986ba8c4bc7c509747/flutter/lib/mobile/pages/server_page.dart#L244-L421)與[英文警告文字](https://github.com/rustdesk/rustdesk/blob/6c578292e8ebbbec708b76986ba8c4bc7c509747/src/lang/en.rs#L192-L194)都可以在開放原始碼儲存庫中查看。

警告出現的位置很重要。一般的安全頁面或許能觸及正在研究產品的人；出現在**啟動服務**這一步的警告，則是在 Android 傳入工作階段即將成立的那一刻，觸及當事人本人。但即使如此，它也無法強迫對方去懷疑一位說服力十足的來電者。

## 為什麼 RustDesk 不在 Google Play 上架

2023 年 9 月 3 日，RustDesk 官方 X 帳號發文表示：[「我們已暫時將 RustDesk 從 Google Play 下架，以防止更多針對使用者的詐騙。」](https://x.com/rustdesk/status/1698372220379349421)這則連結與內容也保留在已回覆的 [GitHub Discussion #5660](https://github.com/rustdesk/rustdesk/discussions/5660) 中，而目前的 RustDesk [常見問題也說明，專案是因為詐騙問題而自行從 Google Play 下架](https://github.com/rustdesk/rustdesk/wiki/FAQ#apple--google-store)。

因此，RustDesk **目前沒有透過 Google Play 發布**。這並不是說 Android 用戶端是惡意軟體，也不是說每個安裝它的人都有風險，而是一項發布決策，目的是減少詐騙話術中常用的一條途徑。

這項取捨確實有代價：退出 Google Play，合法使用者就少了商店曝光、熟悉的安裝方式與商店自動更新。目前的 Android 版本可從 [RustDesk 官方 GitHub 發布頁](https://github.com/rustdesk/rustdesk/releases)與 [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/) 取得。請自行確認下載來源，不要安裝不請自來的「客服」來電者傳給您的 APK 下載連結。我們的 [Android 與 iOS 指南](/zh-tw/blog/rustdesk-remote-control-android-ios-zh-tw)列出了目前的行動裝置功能與安裝來源。

## 為什麼公共伺服器需要登入

RustDesk 目前的[公共伺服器登入指南](https://github.com/rustdesk/rustdesk/wiki/Login-required-for-public-server)指出，由於詐騙與殭屍網路濫用持續發生，控制端必須登入。登入免費，使用 Google 或 GitHub 等支援的第三方身分提供者；公共伺服器不提供另外的使用者名稱與密碼登入。該指南目前表示只有控制端需要登入。

這項規定多了一道身分驗證步驟，也取消了對 RustDesk 展示與測試用基礎架構的部分匿名存取。它不適用於私有的 RustDesk 伺服器，也無法阻止改用其他基礎架構或建立新身分的詐騙者。

這項措施也確實造成困擾。在一則[關於新登入錯誤的 Reddit 討論](https://www.reddit.com/r/rustdesk/comments/1sm91xv/getting_this_error_when_trying_to_connect_anyone/)中，有些合法使用者表示，在弄懂並完成登入步驟之前，一度連不上自家或家人的裝置；也有人反對綁定第三方身分。這些留言無法證明這項限制對詐騙者有沒有效，但確實記錄了它的實際運作成本。會增加阻力的防濫用措施，就應該坦白承認這項代價。

## 如何保護受控的 RustDesk 裝置？

平台層級的限制只是其中一層防護。受控裝置的擁有者或管理員，也應該縮小能連線的對象，並降低憑證遭竊時可能造成的損害。

### 1. 設定強度足夠且獨一無二的固定密碼

若要使用[無人值守存取](/zh-tw/blog/rustdesk-unattended-access-setup-zh-tw)，請在受控裝置的 RustDesk 安全設定中，設定一組**強度足夠且獨一無二的固定密碼**。不要重複使用作業系統登入密碼、電子郵件密碼，或其他服務用過的密碼。若密碼可能已經外洩，請立即更換。

若是有人在現場的支援情境，可行時請優先使用臨時的一次性密碼，或要求明確點選接受。強度足夠的固定密碼能降低被猜中、撞庫攻擊與密碼重複使用的風險，但如果受害者親口把密碼唸給來電者聽，這道防線就沒有用。

### 2. 在受控裝置上啟用雙重驗證（2FA）

RustDesk 為受控裝置的傳入連線提供 TOTP 雙重驗證（2FA）。在要接受連線的裝置上開啟安全設定，啟用 **2FA**（介面上的「啟用二步驟驗證」），用驗證器應用程式掃描 QR Code，再輸入六位數驗證碼完成設定。

啟用後，只輸入正確的連線密碼還不夠：控制端還必須提供當下有效的六位數 TOTP 驗證碼，受控裝置才會授權工作階段。這項功能當初就是專為[無人值守存取的 2FA](https://github.com/rustdesk/rustdesk/commit/44e6b7dbb0125dc0c288c19a16a944b5d605852b) 而推出，其 [TOTP 實作也已公開](https://github.com/rustdesk/rustdesk/blob/master/src/auth_2fa.rs)。

RustDesk 可以選擇信任某台控制端裝置，之後就略過 2FA 提示。若要維持最嚴格的行為，請不要啟用這項略過機制。如果有使用，請定期檢查信任裝置清單，移除已遺失、已汰換、共用或不再獲得授權的裝置。

2FA 能防範密碼被猜中、重複使用或外洩的情況，但如果有人把密碼和當下的驗證碼一起交給詐騙者，它就無法提供保護。

### 3. 用 IP 允許清單限制傳入連線

RustDesk 介面稱這項功能為 **IP 白名單**。說得更明確一點，它就是一份 IP 允許清單：來源位址不在清單內的連線，受控裝置會在密碼與 2FA 驗證之前就直接拒絕。

設定位置：

- **桌面受控裝置：** **設定 → 安全 → 安全 → 只允許白名單上的 IP 進行連線**
- **行動受控裝置：** **設定 → 螢幕分享 → 只允許白名單上的 IP 進行連線**

此設定接受個別的 IPv4 或 IPv6 位址，以及 CIDR 範圍。CIDR 由網路位址加上前綴長度組成，前綴表示前面有多少位元是固定的：前綴越大，允許的範圍就越小。

- `203.0.113.10` 或 `203.0.113.10/32`：單一 IPv4 位址。
- `203.0.113.0/24`：256 個 IPv4 位址，從 `203.0.113.0` 到 `203.0.113.255`。
- `2001:db8::10/128`：單一 IPv6 位址。
- `2001:db8:1234::/64`：一個 IPv6 子網路。

以上都是文件專用的範例範圍，請勿原封不動照抄，請輸入您實際的控制端位址或網路。多筆項目之間可用逗號、分號、空格或換行分隔。RustDesk 在[進階用戶端設定參考文件](https://rustdesk.com/docs/zh-tw/self-host/client-configuration/advanced-settings/#whitelist)中說明了此設定，[受控端的檢查邏輯也可以在原始碼中查看](https://github.com/rustdesk/rustdesk/blob/1.5.0/src/server/connection.rs#L1410-L1437)。

請使用實務上可行的最小範圍。固定的辦公室對外位址與已知的 VPN 範圍很適合；動態的住家位址與經常移動的控制端則不適合。請先確認在您的 NAT、VPN、直接連線或中繼拓撲中，RustDesk 實際看到的來源位址是什麼，並在關閉目前可用的工作階段之前，先用另一個工作階段測試新規則。位址或 CIDR 一旦設錯，可能把合法的支援人員擋在門外。

允許清單只會縮小連線可能的來源範圍，無法取代密碼或 2FA，也無法阻止已經在允許網路內操作的惡意控制端。

### 4. 限制可連線的 RustDesk ID

自 RustDesk 1.5.0 起，受控裝置也可以只接受清單中 RustDesk ID 的連線。介面稱這項功能為 **ID 白名單**。對於網路位址會變動、但控制端裝置是固定已知的支援團隊，在 IP 允許清單不切實際時，這項功能特別適合。

設定位置：

- **桌面受控裝置：** **設定 → 安全 → 安全 → 只允許白名單上的 ID 進行連線**
- **行動受控裝置：** **設定 → 螢幕分享 → 只允許白名單上的 ID 進行連線**

請輸入獲准控制這台裝置的各裝置 RustDesk ID。和 IP 清單一樣，多筆項目之間可用逗號、分號、空格或換行分隔。比對時不分大小寫，並支援兩種萬用字元：

- `123456789`：單一 ID。
- `12345678?`：`?` 恰好符合一個字元，因此會允許所有以 `12345678` 開頭、長度為九個字元的 ID。
- `support-*`：`*` 可符合任意數量的字元，適合控制端使用同一前綴自訂 ID 的情況。

這些同樣只是範例值。此設定在[進階用戶端設定參考文件](https://rustdesk.com/docs/zh-tw/self-host/client-configuration/advanced-settings/#id-whitelist)中名為 `id-whitelist`，管理員可以在自訂用戶端中預先設定，[其檢查邏輯也可以在原始碼中查看](https://github.com/rustdesk/rustdesk/blob/1.5.0/src/server/connection.rs#L1439-L1467)。

這項檢查在控制端送出登入請求時執行，早於密碼或 2FA 驗證碼的核對。工作階段雙方互換角色時（這個動作原本不需要密碼），也同樣會檢查。若同時設定了 IP 允許清單，連線必須兩者都通過。遭拒絕的控制端會看到「您的 ID 已被對方封鎖」（Your ID is blocked by the peer），而且嘗試次數有頻率限制，因此無法快速試探出哪些 ID 在清單內。

也請了解它的限制。ID 是由發起連線的用戶端自行回報，並不能證明身分，經過修改的用戶端可以冒用清單內的 ID；RustDesk 也在此設定旁顯示了這項提醒。這份清單的作用，是讓 ID 不在清單上的一般用戶端，在進入密碼提示之前就被拒於門外。在管理員已預先設定清單的裝置上，即使來電者說服使用者唸出 ID 與密碼，對方用標準用戶端從清單外的 ID 仍然連不進來。請繼續保留強密碼與 2FA，並在關閉目前可用的工作階段之前，先用另一個工作階段測試清單：一個打錯的字，就可能把合法的支援人員擋在門外。

## 這些措施做不到的事

警告、商店下架、登入要求、強密碼、2FA，以及 IP 與 ID 允許清單，每一項都能減少攻擊者的部分可乘之機，但沒有一項能消除社交工程這個核心風險：人仍然可能被說服而核准存取，或把每一道驗證因素都交出去。

自架也無法讓濫用絕跡。它讓組織掌控自己的 RustDesk 伺服器與政策，但詐騙者同樣可以架設私有基礎架構，或散布經過修改的用戶端。RustDesk 公共伺服器的限制只適用於公共伺服器；自架部署依照其營運者自行設定的政策運作。

如果有不明來電者要您安裝 RustDesk、啟動服務、提供密碼、說出 2FA 驗證碼，或打開網路銀行網站，請立即停止。我們這篇不針對特定廠商的[遠端桌面詐騙辨識、預防與事後處理指南](/zh-tw/blog/avoid-remote-desktop-scams-zh-tw)，說明了有哪些警訊，以及萬一已經授予存取權時該怎麼做。

在這件事上，「負責任」不是靠單一設定或一句善意聲明就能做到，而是一項持續的工作：提醒使用者、在濫用情況需要時接受隨之而來的不便、提供技術控制、清楚記錄其限制，並隨著攻擊者手法改變而不斷調整因應方式。
