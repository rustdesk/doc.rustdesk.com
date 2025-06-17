---
title: 授權
weight: 15
---

## 購買授權

請從 [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html) 獲取您的許可證，在Stripe結帳頁面輸入有效的電子郵件地址。付款成功完成後，許可證（以及單獨郵件中的發票）將發送到您的電子郵件。

![](/docs/en/self-host/rustdesk-server-pro/license/images/stripe.jpg)

## 設定授權

您將須在網頁控制台（`http://<rustdesk-server-pro-ip>:21114`）輸入授權，或稍後變更授權。

| 設定授權 | 變更授權 |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/set.png) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/change.png) |

## 續期/升級許可證

續期/升級許可證可以通過[自助許可證門戶](https://rustdesk.com/self-host/account/)找到，如下所述，使用您購買許可證時使用的電子郵件登錄。

| 帶有續期/升級操作的許可證頁面 | 升級窗口 |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/renew.jpg?v2) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/upgrade.png) |

支付後，請按照[下面的方法](/docs/en/self-host/rustdesk-server-pro/license/#refresh-license)刷新許可證以激活它。

### 刷新許可證
支付後，您需要進入網頁控制台手動激活，如下所示。只需點擊`編輯`，然後點擊`確定`，無需編輯任何內容，因為您的許可證密鑰保持不變。

![](/docs/en/self-host/rustdesk-server-pro/license/images/updatelic.jpg)

## 發票、許可證檢索和遷移

許可證只能在一台機器上使用（僅限hbbs，hbbr不需要許可證），如果您想要遷移到其他機器、檢索您的許可證或下載發票，請訪問[https://rustdesk.com/self-host/account/](https://rustdesk.com/self-host/account/)。使用在Stripe結帳時使用的電子郵件地址登錄，解綁您要遷移的舊機器，如下所示，當您在新伺服器的網頁控制台中設置許可證時，它將自動分配許可證並在控制台中註冊。

![](/docs/en/self-host/rustdesk-server-pro/license/images/unbind.jpg)

## 代理
如果您的伺服器無法直接訪問互聯網以驗證許可證，您可以添加代理，例如`proxy=http://username:password@example.com:8080 ./hbbs`。

或者，您可以將`proxy=http://username:password@example.com:8080`添加到工作目錄（`id_ed25519` / `db.sqlite3`文件所在的位置）下的`.env`文件中。

`http`可以替換為`https`或`socks5`。如果沒有`username` / `password` / `port`，可以使用`proxy=http://example.com`。
