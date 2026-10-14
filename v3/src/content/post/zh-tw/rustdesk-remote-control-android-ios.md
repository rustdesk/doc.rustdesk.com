---
publishDate: 2026-07-07T17:09:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-tw'
translationKey: 'rustdesk-remote-control-android-ios'
draft: false
title: 'RustDesk Android 與 iOS 遠端控制：哪些功能真正可用'
excerpt: 'RustDesk 可以遠端控制 Android 手機，也能把 Android、iPhone 與 iPad 變成操作電腦的控制端。iOS 應用程式僅能作為控制端。'
image: '~/assets/images/blog/rustdesk-remote-control-android-ios-og.webp'
category: '指南'
tags: ['RustDesk', '行動裝置']
author: 'RustDesk Team'
slug: 'rustdesk-remote-control-android-ios-zh-tw'
faq:
  - question: '可以用 RustDesk 遠端控制 Android 手機嗎？'
    answer: '可以。在 Android 裝置上啟動 RustDesk 的螢幕擷取服務（需要在螢幕上同意提示），並啟用 RustDesk Input 無障礙服務，遠端的點按與滑動才能注入。螢幕分享需要 Android 6 以上版本；分享裝置內部的系統音訊則需要 Android 10 以上版本。部分手機廠商會限制側載應用程式使用無障礙功能，因此可能需要先允許受限制的設定。'
  - question: 'RustDesk 可以控制 iPhone 或 iPad 嗎？'
    answer: '不行。RustDesk iOS/iPadOS 應用程式僅能作為控制端：可以用 iPhone 或 iPad 控制 Windows、macOS、Linux 與 Android 裝置。RustDesk 未實作 iOS 受控端、畫面分享或遠端輸入。部分其他廠商提供有人在場的 iOS 畫面檢視，Apple 也在 FaceTime 通話中提供需經同意的遠端控制。'
  - question: '可以用手機控制我的電腦嗎？'
    answer: '可以。Android 與 iOS 版 RustDesk 應用程式都是完整的控制端：以 ID 連到 Windows、macOS 或 Linux 電腦，再用螢幕上的觸控板或滑鼠模式與軟體鍵盤操作。部分剪貼簿、檔案傳輸與特殊按鍵的操作方式因行動作業系統而異。用手機控制電腦，是行動裝置最可靠的使用情境。'
  - question: 'RustDesk 的行動應用程式是開放原始碼嗎？'
    answer: '是。行動版用戶端與桌面版用戶端共用同一套 AGPL 開放原始碼程式碼庫。Android 版本可從 RustDesk 官方 GitHub 發布頁與 F-Droid 取得，套件名稱為 com.carriez.flutter_hbb；iOS 控制端可從 Apple App Store 取得。RustDesk 目前沒有透過 Google Play 發布。'
  - question: '可以把 Android 裝置設定成無人值守控制嗎？'
    answer: '部分可以。RustDesk 能以前景通知讓擷取服務持續運作，並在開機時重新啟動，但螢幕擷取需要同意、鎖定畫面無法輸入，以及重新開機後必須手動解鎖，都讓真正的 Android 無人值守控制並不可靠。請把 Android 控制視為有人在場的支援，而不是設定好就能放著不管的存取方式。'
metadata:
  description: 'RustDesk 在 Android 與 iOS 上能做什麼：遠端控制 Android、用任一行動應用程式操作桌面電腦，以及為什麼 iPhone 與 iPad 版只能作為控制端。'
  keywords: 'RustDesk Android iOS 遠端控制, 用 RustDesk 遠端控制手機, RustDesk Android 受控端, 遠端控制 Android, RustDesk iOS, 遠端控制 iPhone, RustDesk 行動應用程式'
---

RustDesk 在裝置擁有者授予螢幕擷取與輸入權限後，確實能控制 Android 裝置，而兩款行動應用程式也都是操作電腦的絕佳*控制端*。iOS 應用程式僅能作為控制端：RustDesk 未實作 iOS 受控端或畫面分享，所以無法用 RustDesk 遠端連進 iPhone 或 iPad。本指南說明哪些可行、哪些不行，以及背後的原因，讓你依照實際能力來規劃。

兩款行動應用程式共用 AGPL 授權的 RustDesk 用戶端程式碼庫；RustDesk Server OSS（免費的社群伺服器）同樣採用 AGPL 授權，Server Pro 則是商業、專有的自架伺服器軟體。Android 版本可從 [RustDesk 官方 GitHub 發布頁](https://github.com/rustdesk/rustdesk/releases)與 [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/) 取得，套件名稱為 `com.carriez.flutter_hbb`，支援的裝置範圍很廣——提供 arm64、arm32 與 x86_64 版本，以及通用 APK；iOS 控制端則在 App Store 上架。RustDesk [目前沒有透過 Google Play 發布](/zh-tw/blog/rustdesk-and-remote-access-scams-zh-tw)：為了因應詐騙濫用，RustDesk 主動下架了 Android 應用程式。程式碼庫相同，可稽核的核心也相同。

## 重點一覽表

| 情境                                           | 是否支援？ | 備註                              |
| ---------------------------------------------- | ---------- | --------------------------------- |
| **從** Android 控制 Windows／macOS／Linux 電腦 | 是         | 完整控制端；觸控板或滑鼠模式      |
| **從** iPhone／iPad 控制電腦                   | 是         | 完整控制端；觸控板或滑鼠模式      |
| 控制 **Android 裝置**（作為受控端）            | 是         | 需要螢幕擷取同意＋無障礙服務      |
| 用 RustDesk 控制 **iOS 裝置**                  | **否**     | RustDesk iOS 是控制端應用程式     |
| 用 RustDesk 遠端檢視 iOS 畫面                  | **否**     | RustDesk 未實作傳入的畫面檢視     |

接下來就是每一列背後的細節。

## 把手機當成控制端（簡單的部分）

這是「裝了就能用」的使用情境。在 Android 或 iOS 裝置上安裝 RustDesk，它就成為任何 RustDesk 主機的完整控制端——你的 Windows 桌機、你的 [Mac](https://rustdesk.com/docs/zh-tw/client/mac/)、你的 [Linux 電腦](/zh-tw/blog/rustdesk-for-linux-zh-tw)。輸入目標 ID 與密碼，就能看到遠端畫面，並使用螢幕上的觸控板、滑鼠模式與軟體鍵盤。部分剪貼簿、檔案與特殊按鍵的操作方式因行動作業系統而異。手機端不需要任何特別設定，因為你只是在*送出*控制，而不是被控制。

如果你的工作是「不論人在哪裡都要修好電腦」，裝了 RustDesk 的手機確實是很好用的工具。

## 控制 Android 裝置（作為受控端）

RustDesk 可以把 Android 手機或平板變成可被控制的主機。螢幕擷取與遠端輸入使用不同的 Android 服務，兩者都需要設定。

**螢幕擷取。** RustDesk 使用 Android 的 `MediaProjection` API 擷取畫面。在應用程式中點按**啟動服務**時，Android 會顯示同意提示，要求授予螢幕錄製權限——這個對話框是必要的，無法在背景略過。螢幕分享需要 **Android 6 以上版本**；擷取手機的**內部系統音訊**則需要 **Android 10 以上版本**。在授予擷取權限之前，任何傳入連線都看不到畫面。

**遠端輸入。** 看得到畫面不等於能控制畫面。為了注入點按、滑動與按鍵事件，RustDesk 會註冊一個名為 **RustDesk Input** 的 [`AccessibilityService`](https://deepwiki.com/rustdesk/rustdesk/6.5-mobile-platforms)（無障礙服務），需要在**設定 → 無障礙設定**中啟用。它會把遠端的滑鼠與手勢事件轉換成 Android 手勢，也能觸發返回、主畫面與最近使用的應用程式等系統操作。

**維持運作。** RustDesk 會保留一則前景服務通知，並可選擇顯示浮動視窗，避免 Android 終止擷取程序；它也能在開機時重新啟動服務。

接下來是限制，因為 Android 的安全模式確實帶來了實質限制：

- **啟動擷取需要同意。** 必須有人（或事先核准）接受螢幕錄製提示。
- **鎖定畫面會擋住輸入。** Android 不允許無障礙服務在安全鎖定畫面上輸入，因此裝置一旦鎖定，通常就無法遠端輸入解鎖碼——這項限制也有[實際使用者記錄下來](https://blog.wirelessmoves.com/2025/10/remote-android-support-with-rustdesk-part-1.html)。
- **重新開機後需要手動解鎖。** 裝置重新啟動後，通常必須有人親自解鎖，控制才能恢復。
- **手機廠商的限制。** 在某些廠商的系統上，側載應用程式的 **RustDesk Input** 無障礙開關會呈現灰色，直到你允許「受限制的設定」為止（長按應用程式圖示 → 應用程式資訊 → 允許受限制的設定）。部分廠商積極的電池管理機制也可能終止背景服務。

實務上的結論是：Android 控制非常適合**有人在場的支援**——協助手上正拿著手機的人——而**設定好就放著不管**的無人值守存取，則是桌面主機最擅長的工作，因為行動作業系統會限制長時間的背景存取。請依工作選擇合適的平台。（桌面裝置請參考[無人值守存取設定指南](/zh-tw/blog/rustdesk-unattended-access-setup-zh-tw)，那才是真正的無人值守設定。）

## iOS：RustDesk 控制端、畫面檢視與輸入控制

**RustDesk for iOS 是控制端，不是受控端。** 你可以用它控制支援的電腦或 Android 裝置。RustDesk 未實作傳入的 iOS 畫面檢視與輸入控制，相關討論見 [iOS 受控端功能請求](https://github.com/rustdesk/rustdesk/discussions/4839)。

其他廠商採用不同的做法。Apple 的廣播 API 允許由使用者發起的螢幕分享，而 [AnyDesk 文件說明 iOS/iPadOS 12 以上版本支援傳入的遠端檢視](https://support.anydesk.com/docs/anydesk-for-ios-ipados-tvos)，但不含遠端輸入控制。技術人員看著畫面、由擁有者自己點按，和直接控制裝置是不同的工作流程。

Apple 也在 [FaceTime 中提供需經同意的遠端控制](https://support.apple.com/guide/iphone/request-give-remote-control-a-facetime-call-iph5d70f34a3/ios)，但有裝置、地區與作業系統的條件限制。如果你的支援流程需要檢視 iPhone 畫面，請使用實作了該流程的工具；若是要用 iPhone 或 iPad 控制電腦，RustDesk 控制端應用程式就是最合適的選擇。

## 關於隱私與自架

由於行動應用程式是開放原始碼，並與桌面用戶端使用相同的通訊協定，你可以讓它們連到自己的[自架 RustDesk 伺服器](/zh-tw/blog/why-self-host-remote-desktop-software-zh-tw)，而不是公共網路——行動工作階段就由你掌控的基礎設施協調，連 ID 也不例外。對於會碰到個人裝置的遠端支援流程，這種資料主權的考量比平常更重要。

取捨一如既往：伺服器要由你自己營運與保護——包括更新、監控、備份與容量規劃——而對許多團隊來說，把工作階段資料留在自己的地盤上非常值得。

## 立即開始

從[官方 GitHub 發布頁](https://github.com/rustdesk/rustdesk/releases)下載 Android 版本，或從 [F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/) 安裝套件。RustDesk [目前沒有透過 Google Play 發布](/zh-tw/blog/rustdesk-and-remote-access-scams-zh-tw)；iOS 控制端則持續在 Apple App Store 提供。要控制手機，那支手機必須是 Android——接受螢幕擷取提示，並啟用 RustDesk Input 無障礙服務。要用手機控制電腦，兩款行動應用程式都能直接使用。目前的方案請見 [rustdesk.com/pricing](https://rustdesk.com/pricing)，Server Pro 相關問題可以洽詢 [sales@rustdesk.com](mailto:sales@rustdesk.com)。想先看看實際運作？[觀看 RustDesk 操作示範](https://www.youtube.com/@rustdesk)。
