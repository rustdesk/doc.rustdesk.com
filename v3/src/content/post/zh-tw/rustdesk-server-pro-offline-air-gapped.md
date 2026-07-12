---
publishDate: 2026-06-28T16:50:00Z
lang: 'zh-tw'
translationKey: rustdesk-server-pro-offline-air-gapped
draft: false
title: 'RustDesk Server Pro 可以離線或在氣隙環境中運作嗎？'
excerpt: '不行——自架的 RustDesk Server Pro 需要持續對外連線至 rustdesk.com 以驗證授權，因此不支援完全氣隙化的部署。'
image: ~/assets/images/blog/rustdesk-server-pro-offline-air-gapped-og.png
category: '部署'
tags: ['RustDesk', '部署', '自架']
author: 'RustDesk Team'
slug: 'rustdesk-server-pro-offline-air-gapped-zh-tw'
faq:
  - question: 'RustDesk Server Pro 可以離線或在氣隙環境中運作嗎？'
    answer: '不行。已授權的 Server Pro 在運作期間，必須保持一條通往 rustdesk.com 的對外連線以驗證授權，因此完全氣隙化、從不對外連線的部署方式並不受支援。不過，您仍然可以將對外流量限制得非常嚴格，並透過 Proxy 伺服器來轉發連線。'
  - question: 'RustDesk Server Pro 需要永久不中斷的網路連線嗎？'
    answer: '它需要持續對 rustdesk.com 保有對外連線以進行授權驗證，但不需要字面意義上完全不中斷的連線。伺服器大約每天會透過 443 連接埠檢查一次，若檢查失敗，系統會持續重試，直到成功為止，或是大約經過七天後——因此短暫的中斷是可以容忍的，但如果伺服器與 rustdesk.com 斷線的時間超過這段寬限期，授權驗證就會停止。至於遠端連線本身，則是由您自行架設的中繼（relay）伺服器與 ID（rendezvous，會合）伺服器負責媒合。'
  - question: '隔離環境中的 RustDesk Server Pro 部署，需要哪些對外連線存取權限？'
    answer: '請開放伺服器對 rustdesk.com 的對外 HTTPS 連線，用於授權驗證（若您有使用自訂用戶端產生功能，也包含其佈建流程）。系統支援透過 Proxy 伺服器連線，因此網路的其餘部分仍可維持鎖定狀態。確切的網域與連接埠，請以 RustDesk 文件為準。'
  - question: '是否有完全氣隙化的 RustDesk 授權選項？'
    answer: '標準授權產品的設計，並不支援從不對外連線的氣隙環境。如果您有硬性的氣隙需求，請務必在正式導入前，先向 RustDesk 確認您的實際情境。'
metadata:
  description: '自架的 RustDesk Server Pro 可以在氣隙環境中運作嗎？不行——Pro 授權需要持續對外連線至 rustdesk.com，因此不支援完全氣隙化的部署。'
  keywords: 'rustdesk server pro 離線使用, rustdesk 氣隙環境, rustdesk 自架網路連線需求, rustdesk server pro 授權驗證, rustdesk 離線部署, rustdesk 需要連網嗎'
---

不行——自架的 RustDesk Server Pro 部署，設計上並不支援完全離線或氣隙化運作。Pro 授權必須透過對外連線與 rustdesk.com 通訊才能維持有效——無論是在啟用當下，或是伺服器持續運作期間皆然——因此真正「從不對外連線」的網路環境，並不在官方支援的部署模式之內。

## 簡短回答

實際上，這項檢查屬於週期性、而非持續性：伺服器大約每天會透過 443 連接埠與 rustdesk.com 聯繫一次；若檢查失敗，系統會持續重試，直到成功為止，或是大約經過七天後——屆時授權便會停止驗證。這段內建的寬限期意味著，短暫的網路中斷不會立即讓您的部署失效，但長期離線的伺服器則會受到影響。您的 ID 伺服器與中繼服務依然完全由您自行架設；直接連線會在兩端裝置之間直接建立，而透過中繼的連線則會使用您自己的中繼伺服器。您可以將網路限制得非常嚴格：系統支援透過 Proxy 伺服器連線，因此實務上您只需開放必要的對外 HTTPS 路徑，其餘全數鎖定即可。

## 詳細說明

您可以在不使用授權的情況下自架的開源版 RustDesk 伺服器，屬於另一回事；本文所述的需求，專門適用於**已授權的 Server Pro** 功能集。如果您真正在意的是將連線資料保留在自己的基礎架構之內，自架方案本身就已經能達成這個目標——對外連線的需求純粹與授權有關，並不是每一次連線都要透過對方中介。

還有第二種工作流程需要考量：**建置自訂用戶端**。如果您透過 Server Pro 產生具備品牌客製化或預先設定的用戶端，這個產生步驟同樣需要對外連線。請依您目前的版本與方案，確認實際行為。

對於嚴格要求氣隙化的網路而言，這正是關鍵所在。一台*永遠*無法連上 rustdesk.com 的完全隔離伺服器，並不在預設支援的模式之內，因此如果您有硬性的氣隙需求，請務必在正式導入前，先向 RustDesk 確認您的實際情境是否可行。至於更常見的「大部分隔離、嚴格限制對外流量」架構，實務上的建議是：預留一條通往 rustdesk.com 的對外 HTTPS 路徑——無論是直接連線或透過 Proxy——並在撰寫防火牆政策之前，先明確定義好網域、連接埠與核准流程。詳情請參閱 [RustDesk 文件](https://rustdesk.com/docs)，同樣的授權需求，也是為什麼即使[以非 Docker 方式安裝 Server Pro，仍然無法在完全沒有網路連線的情況下運作](https://rustdesk.com/docs/zh-tw/self-host/rustdesk-server-pro/installscript/)的原因。

## 誰會問這個問題

隔離或受監管網路的維運人員，通常在安裝 RustDesk 之前就會提出這個問題——無論是資安團隊，還是服務於高度封閉環境的 [MSP](/zh-tw/blog/rustdesk-for-msps-zh-tw)，皆是如此。他們的網路可能位於嚴格的對外流量防火牆之後，或者單純希望將外部相依性降到最低。了解到授權只需要一條持續的對外連線路徑——僅此而已——就能讓他們制定出精準的防火牆規則，而不必過度開放網路，也不會誤以為產品能在完全真空的環境中運作。

## 相關問題

- 對外連線的網域與連接埠：請參閱 [RustDesk 文件](https://rustdesk.com/docs)。
- [我可以在一般 VM 上以非 Docker 方式安裝 RustDesk Server Pro 嗎？](https://rustdesk.com/docs/zh-tw/self-host/rustdesk-server-pro/installscript/)
- 產生具品牌客製化的用戶端：請參閱 [RustDesk 文件](https://rustdesk.com/docs)。

正在規劃高度封閉或接近氣隙化的部署嗎？在敲定防火牆政策之前，請先至 rustdesk.com 確認最新的連線與授權相關細節。
