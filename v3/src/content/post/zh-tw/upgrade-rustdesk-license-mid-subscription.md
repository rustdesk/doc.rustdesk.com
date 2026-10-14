---
publishDate: 2026-07-03T09:40:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-tw'
translationKey: 'upgrade-rustdesk-license-mid-subscription'
draft: false
title: '訂閱期間升級 RustDesk 授權：運作方式'
excerpt: '在訂閱期間為 RustDesk Server Pro 增加使用者或裝置：了解新的一年到期日、剩餘已付期間的折抵，以及如何重新整理授權以套用新額度。'
image: ~/assets/images/blog/upgrade-rustdesk-license-mid-subscription-og.webp
category: '定價'
tags: ['RustDesk', '定價', '授權']
author: 'RustDesk Team'
slug: 'upgrade-rustdesk-license-mid-subscription-zh-tw'
faq:
  - question: '可以在訂閱期間升級 RustDesk 授權嗎？'
    answer: '可以。您可以隨時透過自助入口網站升級使用者或受管裝置。升級會把到期日延長為自升級日起一整年，並折抵目前授權剩餘的已付價值。在網頁主控台重新整理同一組授權，新額度就會立即套用；否則會在約 24 小時內自動套用。'
  - question: 'RustDesk 授權升級如何計價？'
    answer: 'RustDesk Server Pro 升級會把授權延長為自升級日起一整年，並折抵目前授權剩餘的已付價值。新增的使用者或裝置以一整年計費；原有容量只就超出舊到期日的延長期間計費。官方 Wiki FAQ 有完整的試算範例，自助入口網站也會在付款前顯示總金額。'
  - question: '升級授權後，為什麼新的裝置沒有出現？'
    answer: '新額度會在 Server Pro 下次檢查授權時，於約 24 小時內自動套用。若要立即套用，請在 Server Pro 網頁主控台重新整理授權：點選「編輯」，不變更金鑰直接按「確定」。重新整理會立刻取得更新後的授權內容，授權金鑰維持不變。'
  - question: '如何在網頁主控台重新整理授權？'
    answer: '付款後，開啟 Server Pro 網頁主控台的授權設定，點選「編輯」，不變更金鑰直接按「確定」。這會取得更新後的授權內容，授權金鑰維持不變。若不重新整理，新額度會在下次定期授權檢查時，於約 24 小時內自動套用。'
  - question: '要去哪裡購買升級或續約授權？'
    answer: '請使用 rustdesk.com/self-host/account/ 的自助授權入口網站，並以購買授權時在付款頁面使用的電子郵件地址登入；如果不記得是哪個電子郵件地址，請聯絡 support@rustdesk.com。入口網站也保存您的發票與續約紀錄。'
  - question: '可以在訂閱期間降級或減少席位嗎？'
    answer: 'RustDesk Server Pro 授權的降級與減少席位，需透過 RustDesk 團隊處理：請將授權使用的電子郵件與所需的變更寄到 sales@rustdesk.com。rustdesk.com/self-host/account/ 的自助入口網站則負責可隨時購買的升級，以及續約與發票。'

metadata:
  description: '在訂閱期間升級 RustDesk Server Pro：新的一年到期日如何計算、剩餘已付價值怎麼折抵、官方試算範例，以及重新整理授權的步驟。'
  keywords: '訂閱期間升級 RustDesk 授權, RustDesk 授權增加裝置, RustDesk 授權升級費用, 增加 RustDesk 受管裝置, RustDesk 網頁主控台重新整理授權, RustDesk 依使用者與裝置授權'
---

您可以在訂閱期間升級 RustDesk Server Pro 授權，增加[受管裝置](/zh-tw/blog/what-counts-as-a-managed-device-zh-tw)或登入使用者。依照[官方升級規則](https://github.com/rustdesk/rustdesk/wiki/FAQ#renew--upgrade-license)，到期日會延長為自升級日起一整年。計算方式會折抵目前授權剩餘的已付價值：新增容量以十二個月計費，原有容量則就超出原到期日的延長期間計費。這並不是單純以剩餘天數計算新增使用者或裝置的費用。

## 如何升級

請在[自助授權入口網站](https://rustdesk.com/self-host/account/)進行升級。以首次購買授權時在付款頁面使用的電子郵件登入；如果不記得是哪個電子郵件，請寄信至 [support@rustdesk.com](mailto:support@rustdesk.com)。續約與下載發票也都在同一個入口網站。

付款後，請在[網頁主控台](https://rustdesk.com/docs/zh-tw/self-host/rustdesk-server-pro/license/#刷新許可證)重新整理授權：點選**編輯**（Edit），不變更金鑰直接按**確定**（OK）。新額度會立即套用；若不重新整理，則會在下次定期授權檢查時，於約 24 小時內自動套用。原有的授權金鑰會保留。

例如，[官方試算範例](https://github.com/rustdesk/rustdesk/wiki/FAQ#is-it-over-charge-in-upgrade)說明了一筆在 2025 年 8 月 14 日進行的升級，原授權於 2026 年 3 月 12 日到期。增加 100 台裝置後，到期日移至 2026 年 8 月 14 日：新增的裝置以一年計費，原有的 10 位使用者與 800 台裝置則就約五個月的延長期間計費。這個範例說明的是計算方法，而非目前費率；實際購買請以入口網站顯示的總額與[目前價格](https://rustdesk.com/pricing)為準。

## 誰會問這個問題

通常是成長帶來的問題：當初依照當時裝置規模購買授權的管理員或 [MSP](/zh-tw/blog/rustdesk-for-msps-zh-tw)，如今在年度中途要導入新的端點、人員或客戶據點。背後的疑慮通常有兩個：訂閱期間是否真的能擴充，以及費用是否公平。

## 相關問題

- [RustDesk 如何計算使用者與受管裝置，以及依使用者與依裝置授權的差異](/zh-tw/blog/what-counts-as-a-managed-device-zh-tw)
- 在網頁主控台重新整理授權：請參閱 [RustDesk 文件](https://rustdesk.com/docs/zh-tw/)。

部署規模在成長嗎？團隊需要更多容量時，隨時都能從[自助入口網站](https://rustdesk.com/self-host/account/)升級。
