---
publishDate: 2026-07-02T14:43:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-tw'
translationKey: 'what-counts-as-a-managed-device'
draft: false
title: 'RustDesk 中什麼算是受管裝置？'
excerpt: '在 RustDesk Server Pro 標準方案中，您設定要存取的每台裝置只計算一次。Customized V2 只計算指派給群組或使用者的裝置；臨時支援的裝置不計入。'
image: ~/assets/images/blog/what-counts-as-a-managed-device-og.webp
category: '定價'
tags: ['RustDesk', '定價', '授權']
author: 'RustDesk Team'
slug: 'what-counts-as-a-managed-device-zh-tw'
faq:
  - question: 'RustDesk 如何計算受管裝置？'
    answer: '在標準方案中，您設定要存取的每台裝置都算一台受管裝置，而且只計算一次——不論有人值守或無人值守，也不論您連線一次還是一千次。Customized V2 的計算方式不同：只有指派給裝置群組或使用者的裝置，才會計入您的授權裝置數。'
  - question: '臨時、一次性支援的裝置怎麼計算？'
    answer: '在 Customized V2 方案中，只有指派給裝置群組或使用者的裝置才算受管裝置。為了臨時支援只連過一次、也從未指派的電腦，不會計入您的授權裝置數，也不會被停用。如果工作大多是臨時支援，Customized V2 會比每個端點都計算的方式更合適。'

metadata:
  description: 'RustDesk 如何計算受管裝置：標準方案將每台可連線的裝置計算一次；Customized V2 則只計算指派給群組或使用者的裝置，臨時支援的裝置不計入。'
  keywords: '什麼算是受管裝置, RustDesk 裝置計算, RustDesk 與 TeamViewer 授權比較, 無人值守與有人值守裝置授權, RustDesk 臨時支援, MSP 遠端支援授權'
---

RustDesk Server Pro 計算的是授權的登入使用者與受管裝置。在標準方案中，**您想存取的每台裝置都算一台受管裝置，而且只計算一次。** **[Customized V2](https://rustdesk.com/pricing#custom2)** 方案的計算方式不同——只計算您指派給群組或使用者的裝置——這也是它適合大量臨時支援工作的原因。

## 簡短答案

在標準方案中，「受管裝置」是指任何您希望能連到的電腦，伺服器對每一台只計算一次。以下因素都不影響計算：

- 裝置是**有人值守**（有人坐在電腦前）還是**無人值守**（無螢幕的伺服器、資訊站或全天候運作的工作站），
- 您會連線**一次**還是**很多次**，
- 存取的頻率高低。

如果您的工作大多是臨時、一次性的支援，下方說明的 **[Customized V2](https://rustdesk.com/pricing#custom2)** 計算方式範圍較窄，正是為這種情況而設計。

## 詳細說明

改變計算方式的是方案。在 **[Customized V2](https://rustdesk.com/pricing#custom2)** 方案中，受管裝置的定義比較窄：只有您**指派給裝置群組或使用者**的裝置，才會計入您的授權裝置數。只為臨時、一次性支援而連線、從未指派的電腦不會被計入，也不會被停用。如果您希望這些未指派的裝置完全不出現在主控台中，可以使用 [`register-device` 用戶端設定](https://rustdesk.com/docs/zh-tw/self-host/client-configuration/advanced-settings/#register-device)控制，這項設定在授權的同時連線數為 2 以上時生效。實務上，這種快速支援工作階段只會顯示一組 ID 與一次性密碼，供單次有人值守的連線使用，因此真正一次性的互動，永遠不需要在您的裝置群中占用固定名額。如果您的工作大多是這種型態，Customized V2 通常更合適——請將您的情境寄到 [sales@rustdesk.com](mailto:sales@rustdesk.com) 洽詢目前的條款，或查看 [rustdesk.com/pricing](https://rustdesk.com/pricing)。

舉例來說，假設一家 [MSP](/zh-tw/blog/rustdesk-for-msps-zh-tw) 有 20 名技術人員，支援約 1,000 台客戶電腦：它必須**同時**滿足兩個授權面向——足夠 20 名技術人員使用的登入使用者，以及足夠涵蓋所有需保持可連線電腦的受管裝置。真正只是一次性支援的端點，則適用上述的 Customized V2 規則；目前的額度請見 [rustdesk.com/pricing](https://rustdesk.com/pricing)。

## 同時連線是另一個授權單位

Server Pro 標準方案（Individual、Basic、Customized）包含無限同時連線；只有 [Customized V2](https://rustdesk.com/pricing#custom2) 授權固定數量。依照 RustDesk 的[同時連線定義](https://github.com/rustdesk/rustdesk/wiki/FAQ#concurrent-connections)，一個同時連線是一台正在進行控制的主控裝置，也就是一個「通道」，而不是每一個向外連線的工作階段分頁：一台技術人員電腦開五個工作階段分頁，只占用一個通道；三台主控電腦同時作業，則占用三個。使用 Customized V2 時，請分別估算登入使用者、受管裝置與通道的數量。

## 誰會問這個問題

任何要把 TeamViewer 或 AnyDesk 的席位數換算成 RustDesk 計算單位的人，都會最先碰到這個定義，因為兩邊的授權單位並非一對一對應。RustDesk 付費方案需要同時涵蓋登入的人員，以及納入管理的裝置。

## 相關問題

- 依使用者與依裝置授權、同時連線，以及 Server Pro 的裝置計算：請見 [RustDesk 價格](https://rustdesk.com/pricing)。
- [從 TeamViewer 轉過來——對 MSP 而言，RustDesk 的價格如何比較？](/zh-tw/blog/rustdesk-vs-teamviewer-zh-tw)

正在估算裝置群規模，卻不確定一次性的支援是否該計入裝置數？請到 [rustdesk.com/pricing](https://rustdesk.com/pricing) 查看目前的條款，或在購買前先詢問我們的團隊。
