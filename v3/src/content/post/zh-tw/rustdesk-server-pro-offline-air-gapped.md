---
publishDate: 2026-06-28T16:50:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'zh-tw'
translationKey: rustdesk-server-pro-offline-air-gapped
draft: false
title: 'RustDesk Server Pro 可以離線或在實體隔離環境中運作嗎？'
excerpt: '不行——自架的 RustDesk Server Pro 必須持續對外連到 rustdesk.com 驗證授權，因此不支援完全實體隔離的部署。'
image: ~/assets/images/blog/rustdesk-server-pro-offline-air-gapped-og.webp
category: '部署'
tags: ['RustDesk', '部署', '自架']
author: 'RustDesk Team'
slug: 'rustdesk-server-pro-offline-air-gapped-zh-tw'
faq:
  - question: 'RustDesk Server Pro 可以離線或在實體隔離環境中運作嗎？'
    answer: '不行。RustDesk Server Pro 大約每天一次透過對外 HTTPS（連接埠 443）向 rustdesk.com 檢查授權，檢查失敗時會持續重試約 7 天，因此永久實體隔離的 Pro 部署不在標準授權模式之內。Server Pro 支援透過 Proxy 連線。RustDesk Server OSS（免費的社群伺服器）則沒有授權檢查。'
  - question: 'RustDesk Server Pro 需要永久不中斷的網路連線嗎？'
    answer: '需要持續能對外連到 rustdesk.com 以驗證授權，但不需要完全不中斷。伺服器大約每天透過連接埠 443 檢查一次，若檢查失敗，會持續重試，直到成功或約七天過去；所以短暫斷線可以容忍，但與 rustdesk.com 斷線超過這段寬限期，授權就無法通過驗證。遠端工作階段本身則由您自架的中繼與 ID（連線協調）伺服器協調。'
  - question: '隔離環境中的 RustDesk Server Pro 部署需要哪些對外連線？'
    answer: '請允許伺服器以 HTTPS 對外連到 rustdesk.com 進行授權驗證；如果要產生品牌用戶端，也要允許連到自訂用戶端建置服務。Server Pro 支援 Proxy，因此網路的其他部分可以維持封鎖。其他需要規劃的對外流程，還包括用戶端更新與您串接的任何外部身分提供者。'
  - question: 'RustDesk 有完全實體隔離的授權選項嗎？'
    answer: '沒有。標準的 RustDesk Server Pro 授權需要定期線上驗證。RustDesk Server OSS（免費的社群伺服器）沒有授權檢查：其 ID/連線協調與中繼服務可以在隔離網路內執行，但沒有 Pro 網頁主控台與管理功能。若 Pro 有嚴格的實體隔離需求，請將您的情境寄到 sales@rustdesk.com。'
metadata:
  description: '自架的 RustDesk Server Pro 能在實體隔離環境中運作嗎？不行——Pro 授權需要持續對外連到 rustdesk.com，因此不支援完全實體隔離的部署。'
  keywords: 'rustdesk server pro 離線, rustdesk 實體隔離, rustdesk 氣隙環境, rustdesk 自架網路需求, rustdesk server pro 授權檢查, rustdesk 離線部署, rustdesk 需要網路嗎'
---

不行——自架的 RustDesk Server Pro 部署，並不是設計來完全離線或在實體隔離環境中運作的。Pro 授權必須透過對外連線連到 rustdesk.com 才能維持有效——啟用時如此，伺服器運作期間也持續如此——因此完全隔離的網路不在支援的模式之內。

## 簡短答案

[官方授權檢查 FAQ](https://github.com/rustdesk/rustdesk/wiki/FAQ#how-often-does-pro-check-license) 說明了定期驗證的方式：伺服器大約每天透過連接埠 443 連到 rustdesk.com 一次，檢查失敗時會持續重試，直到成功或約七天過去——之後授權就無法通過驗證。這段內建的寬限期代表短暫的網路中斷不會立刻讓部署失效，但永久離線的伺服器就會。您的 ID 與中繼服務仍然自架；直接連線的工作階段在端點之間傳輸，經中繼的工作階段則使用您的中繼伺服器。Server Pro 支援 Proxy，因此您可以只開放必要的對外 HTTPS 路徑，把網路的其他部分封鎖起來。

## 詳細說明

這項要求適用於 **Server Pro**。**RustDesk Server OSS**（免費的社群伺服器）沒有授權檢查。RustDesk 的用戶端與 Server OSS 採用 AGPL 授權；Server Pro 則是商業、專有的自架伺服器軟體。在隔離網路中，用戶端與本地的 ID／中繼服務仍需要可用的路由、正確的金鑰與平台權限。經 ID 協商的直接連線工作階段在端點之間傳輸；經中繼的工作階段則使用您的伺服器。只要用戶端帶有您伺服器的公鑰，以 ID 建立的工作階段就是端對端加密；而 [IP 直接連線不加密](https://github.com/rustdesk/rustdesk/wiki/FAQ)，因此無法取代正確設定的 ID 連線。

還有一個流程要納入考量：**建置自訂用戶端**。如果您從 Server Pro 產生品牌或預先設定好的用戶端，建置會在 RustDesk 的建置服務上執行，因此同樣需要對外連線。提交的設定會在建置完成後刪除，安裝程式也會在大約一天後自動移除，所以請下載下來，存放在您自己的儲存庫中。

對嚴格實體隔離的網路來說，這是決定性的細節：*永遠*連不到 rustdesk.com 的伺服器不在預設模式之內，因此如果您有硬性的實體隔離需求，請在投入之前先向 RustDesk 確認您的實際情境。至於更常見的「大致隔離、嚴格限制對外流量」架構，請預留一條連到 rustdesk.com 的對外 HTTPS 路徑——直接連線或透過 Proxy 皆可——並在撰寫防火牆政策前，先定義好確切的網域、連接埠與核准流程。請參閱 [RustDesk 文件](https://rustdesk.com/docs/zh-tw/)；也正因為同樣的授權要求，[即使不使用 Docker 安裝，Server Pro 也無法在完全沒有網路的情況下執行](https://rustdesk.com/docs/zh-tw/self-host/rustdesk-server-pro/installscript/)。

## 盤點所有對外相依性

服務封閉環境的資安團隊與 [MSP](/zh-tw/blog/rustdesk-for-msps-zh-tw)，通常在安裝 RustDesk 之前就會問這個問題。Server Pro 的對外清單很短：以 HTTPS 連到 rustdesk.com 的授權驗證、產生品牌用戶端時的自訂用戶端建置服務、用戶端更新、郵件伺服器位於網路外時的 SMTP，以及您串接的任何外部身分提供者。ID/連線協調伺服器、中繼與主控台都在您的網路內執行，因此只需要精確的防火牆規則，不必過度開放網路。

## 相關問題

- 對外連線的網域與連接埠：請參閱 [RustDesk 文件](https://rustdesk.com/docs/zh-tw/)。
- [可以在一般 VM 上不使用 Docker 安裝 RustDesk Server Pro 嗎？](https://rustdesk.com/docs/zh-tw/self-host/rustdesk-server-pro/installscript/)
- 產生自訂品牌用戶端：請參閱 [RustDesk 文件](https://rustdesk.com/docs/zh-tw/)。

正在規劃高度封閉或接近實體隔離的部署嗎？請開放授權路徑與您實際使用的對外流程，其他一律留在內部；如果需求是永久實體隔離，請來信 [sales@rustdesk.com](mailto:sales@rustdesk.com)。
