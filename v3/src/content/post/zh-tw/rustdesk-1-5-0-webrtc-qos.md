---
publishDate: 2026-10-14T00:00:00Z
lang: zh-tw
translationKey: rustdesk-1-5-0-webrtc-qos
title: 'RustDesk 1.5.0：WebRTC 直接連線與 QoS 改進'
excerpt: 'RustDesk 1.5.0 新增 WebRTC 連線路徑，讓 Web 用戶端能夠直接連線，並調整 QoS 對延遲波動、壅塞與目標影格率恢復的處理。'
image: ~/assets/images/blog/web-client.jpg
category: 發布
slug: rustdesk-1-5-0-webrtc-qos-zh-tw
tags:
  - WebRTC
  - QoS
  - Web 用戶端
  - 發布
---

最近，我們分享了一次實際使用體驗：升級至 1.5.0 後，從另一個大陸存取家中的 Mac，操作比以前更順暢。[原始貼文](https://x.com/rustdesk/status/2110243829978898520)記錄的是這次使用感受。以下說明 1.5.0 在連線方式與畫面傳輸自適應方面的具體改動。

[PR #15684](https://github.com/rustdesk/rustdesk/pull/15684) 導入了 WebRTC Data Channel，讓 ICE 連線嘗試與既有的 TCP、UDP 打洞及 IPv6 直接連線路徑並行進行。當中繼連線已就緒，但直接連線仍在嘗試時，RustDesk 會保留一小段優先等待直接連線的時間；這段時間結束或直接連線嘗試失敗後，仍可使用中繼。這為原先只能透過中繼的部分連線增加了直接連線的機會。

**Web 用戶端也因此具備了直接連線能力。** 以前，瀏覽器中的 RustDesk 工作階段只能經過中繼伺服器；現在，網路條件允許且 ICE 選中直接連線路徑時，工作階段資料可以直接在瀏覽器與遠端裝置之間傳輸，有機會避開中繼路徑的延遲與頻寬限制。透過 TURN 轉送的 WebRTC 連線仍屬於中繼。本次使用 Data Channel 傳輸 RustDesk 通訊協定，畫面的編碼與解碼仍由 RustDesk 處理。

QoS 的改動來自 [PR #16082](https://github.com/rustdesk/rustdesk/pull/16082)。它處理的是舊策略遇到一次慢回覆或短暫停頓就大幅降低影格率，之後又恢復較慢的問題。1.5.0 的調整包括：

- **改善延遲基準。** 從第一次回覆起使用連線本身的低延遲基準，並逐步適應穩定的基準變化，減少對高延遲連線的誤判。
- **先確認一般延遲波動。** 一般的影格率下降需要連續三次異常回覆確認；嚴重的額外延遲與探測逾時仍會更快觸發影格率下降。
- **在條件允許時優先調整位元率。** 在一般壅塞調整中，若已啟用自適應位元率且位元率還能降低，會優先降低位元率，避免僅靠減少影格來因應目標位元率維持不變的編碼器。
- **加快啟動與目標影格率恢復。** 在狀態良好的連線上，連續兩次額外延遲較低的回覆可加速提高啟動目標；壅塞後的兩次良好回覆可恢復之前的目標影格率。如果恢復後很快再次壅塞，控制器會撤回這次恢復。

這些策略使用與畫面共用傳輸路徑的延遲回饋。回饋包含傳輸積壓、網路往返時間與用戶端回覆排程等影響，用於判斷負載變化，並不單獨測量佇列延遲。[1.5.0 QoS 實作](https://github.com/rustdesk/rustdesk/blob/1.5.0/src/server/video_qos.rs)

針對啟動加速的改動，PR 作者比較了該提交與其父提交：在一次本地連線的辦公情境測試中，達到 **60 FPS 目標值**的啟動時間從 **7.99 秒縮短至 2.98 秒**。這衡量的是該項改動在這次測試下，對啟動時目標影格率提升速度的影響。[測試記錄](https://github.com/rustdesk/rustdesk/pull/16082#issuecomment-5597385117)

您可以升級至 [RustDesk 1.5.0](https://github.com/rustdesk/rustdesk/releases/tag/1.5.0)，或在 [Web 用戶端](https://rustdesk.com/web)試用新的連線方式。WebRTC 需要連線雙方與伺服器支援；自架伺服器預設關閉此選項，必須明確啟用 `enable-webrtc=Y`。使用 Server Pro 時，官方文件列出的支援版本為 1.8.7 起，具體設定請參閱[設定說明](https://rustdesk.com/docs/zh-tw/self-host/client-configuration/advanced-settings/#enable-webrtc)。
