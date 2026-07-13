---
publishDate: 2026-07-02T14:43:00Z
lang: 'zh-tw'
translationKey: 'what-counts-as-a-managed-device'
draft: false
title: 'RustDesk 的「受管理裝置」如何計算？'
excerpt: '在 RustDesk 標準方案中，您設定要存取的每部裝置只會計算一次。Customized V2 方案則僅計算已指派至群組或使用者的裝置；臨時（ad-hoc）連線的裝置不計入。'
image: ~/assets/images/blog/what-counts-as-a-managed-device-og.webp
category: '定價'
tags: ['RustDesk', '定價', '授權']
author: 'RustDesk Team'
slug: 'what-counts-as-a-managed-device-zh-tw'
faq:
  - question: 'RustDesk 如何計算受管理裝置？'
    answer: '在標準方案中，您設定要存取的每部裝置都只會計為一部受管理裝置，且僅計算一次——無論是有人值守還是無人值守，無論您連線一次還是連線上千次。Customized V2 的計算方式不同：只有指派給裝置群組或使用者的裝置，才會計入您的授權裝置數量。'
  - question: '臨時、一次性支援的裝置如何計算？'
    answer: '在 Customized V2 方案中，只有指派給裝置群組或使用者的裝置才會計為受管理裝置。若您僅為臨時支援連線一次、且從未指派該裝置，則不會計入您的授權裝置數量，也不會被停用。對於以臨時支援為主的工作型態，Customized V2 會比逐一計算每個端點更加合適。'

metadata:
  description: 'RustDesk 如何計算受管理裝置：標準方案會將每部可存取的裝置計算一次；Customized V2 方案則僅計算已指派給群組或使用者的裝置。'
  keywords: '受管理裝置定義, RustDesk 裝置計算方式, RustDesk 與 TeamViewer 授權比較, 無人值守與有人值守裝置授權, RustDesk 臨時支援, MSP 遠端支援授權'
---

如果您是從 TeamViewer 的按席位（per-seat）計費模式轉換過來，RustDesk 標準方案的計算規則會讓您耳目一新：**只要是您想存取的裝置，就計為一部受管理裝置，且只計算一次。** **[Customized V2](https://rustdesk.com/pricing#custom2)** 方案的計算方式則不同——只有您指派給群組或使用者的裝置才會被計算——這也是它特別適合大量臨時支援工作的原因。

## 簡短回答

在標準方案中，「受管理裝置」是指任何您希望能夠存取的機器，伺服器會將每一部裝置只計算一次。以下因素都不影響計算結果：

- 該裝置是**有人值守**（有人坐在裝置前）還是**無人值守**（無螢幕的伺服器、資訊站，或全天候運作的工作站），
- 您會連線**一次**還是**多次**，
- 您存取該裝置的頻率高低。

如果您的工作大多屬於臨時性、一次性的支援，下方介紹的 **[Customized V2](https://rustdesk.com/pricing#custom2)** 方案採用較窄的計算範圍，正是為這種情況所設計。

## 詳細說明

真正會改變計算方式的是方案本身。在 **[Customized V2](https://rustdesk.com/pricing#custom2)** 方案中，「受管理裝置」的定義較為狹窄：只有您**指派給裝置群組或使用者**的裝置，才會計入您的授權裝置數量。僅用於臨時、一次性支援、且從未被指派的機器不會被計入，也不會被停用。如果您希望這些未指派的裝置完全不出現在主控台中，可以透過 [`register-device` 用戶端設定](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#register-device) 來控制，該設定會在授權的同時連線數達到 2 或以上時生效。實務上，這類快速支援工作階段只會顯示一組 ID 與一次性密碼，用於單一有人值守連線，因此真正的一次性互動永遠不需要在您的裝置清單中占用固定名額。如果您的工作大多屬於這種情況，Customized V2 通常會是更合適的選擇——請將您的使用情境寄至 [sales@rustdesk.com](mailto:sales@rustdesk.com) 以取得目前的條款，或查看 [rustdesk.com/pricing](https://rustdesk.com/pricing)。

舉例來說，假設某家 [MSP](/zh-tw/blog/rustdesk-for-msps-zh-tw) 擁有 20 名技術人員，負責支援大約 1,000 部客戶機器：該公司需要同時滿足**兩個**授權維度——足夠讓 20 名技術人員登入的使用者數量，以及足夠涵蓋所有需要保持可連線機器的受管理裝置數量。對於真正只是一次性支援請求的端點，則適用上述 Customized V2 的計算規則；目前的方案額度請參閱 [rustdesk.com/pricing](https://rustdesk.com/pricing)。

## 誰會問這個問題

任何試圖將 TeamViewer 或 AnyDesk 的席位數量換算成 RustDesk 計算單位的人，都會最先遇到這項定義，因為兩者的授權單位並非一對一對應。RustDesk 的付費方案需要同時具備足夠的容量，涵蓋登入使用者與受管理裝置這兩個面向。

## 相關問題

- 按使用者還是按裝置授權、同時連線，以及 Server Pro 部署的裝置計算：請參閱 [RustDesk 定價](https://rustdesk.com/pricing)。
- [從 TeamViewer 轉換過來——對 MSP 而言，RustDesk 的價格比較如何？](/zh-tw/blog/rustdesk-vs-teamviewer-zh-tw)

正在評估裝置規模，卻不確定一次性支援請求是否該計入裝置數量？請至 [rustdesk.com/pricing](https://rustdesk.com/pricing) 查看目前的條款，或在購買前先詢問我們的團隊。
