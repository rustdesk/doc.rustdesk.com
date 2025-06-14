---
title: 自架伺服器
weight: 5
pre: "<b>2. </b>"
---

如果您想要和我們聊聊關於[自架 RustDesk 伺服器](https://github.com/rustdesk/rustdesk-server)的事，請加入我們的 [Discord](https://discord.com/invite/nDceKgxnkV) 伺服器。

支援服務可透過我們的 [Discord](https://discord.com/invite/nDceKgxnkV) 獲得開源版本的協助，以及透過[Email](mailto:support@rustdesk.com)獲得專業版支援。

## 基本設置

https://rustdesk.com/docs/zh-tw/self-host/rustdesk-server-oss/install/#set-up-your-own-server-instance-manually

## 所需的連結埠

自行架設的 RustDesk 伺服器所需的連結埠主要取決於您的環境以及您想要使用 RustDesk 做什麼。在文件中展示的範例通常會建議打開所有埠號。

核心連結埠：\
TCP `21115-21117` \
UDP `21116`

上述是 RustDesk 運作所需的最小埠號，這些連結埠處理訊號和中繼，以及 NAT 穿透。

此外，如果您想使用 [RustDesk 網頁客戶端](https://rustdesk.com/docs/en/dev/build/web/)，可以開放 TCP 埠號 `21118` 和 `21119`。

對於沒有 SSL Proxy 的專業用戶，您將需要開放 TCP 埠號 `21114` 以使 API 能夠運作，或者使用 SSL Proxy 則開放 TCP 連結埠 `443`。

## 測試連結埠是否開放

要檢查連結埠是否已開放且運作正常，您可以使用 PowerShell 的 `test-netconnection domain.com -p 21115` 指令或者使用 [CanYouSeeMe.org](https://canyouseeme.org/) 網站。


{{% children depth="3" showhidden="true" %}}
