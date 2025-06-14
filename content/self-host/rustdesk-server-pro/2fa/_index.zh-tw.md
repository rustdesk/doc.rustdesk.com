---
title: 2FA
weight: 16
---

當登入您的帳戶時，開啟雙因素身份驗證 (2FA) 驗證可以提高帳戶安全性。

我們的網頁控制台目前支援兩種 2FA：

1. 電子郵件驗證
2. TOTP。需要第三方認證應用程式來產生驗證碼，例如 [Authy](https://authy.com)、[Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app/) 和 [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2) 認證應用程式。

您首先需要前往帳戶設定頁面。

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/1-settings-account.png)

### 電子郵件驗證

要啟用登入電子郵件驗證，您需要：

1. 設定電子郵件。
2. 啟用 `啟用電子郵件登入驗證` 選項。
3. 點擊 `提交`。

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-1.png)

當我們下次登入時，RustDesk 將寄送驗證碼電子郵件給我們，網頁也會跳轉到驗證頁面。

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-2.png)

### TOTP

TOTP 是廣泛使用的 2FA 方法，因此在 RustDesk Server Pro 的網頁控制台中，2FA 指的是 TOTP 驗證。

#### 準備認證應用程式

首先，您需要準備一個認證應用程式。
您可以從這些類型中選擇 [Authy](https://authy.com)、[Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app/) 和 [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2) 認證應用程式。

#### 啟用 2FA

當設定頁面顯示 `啟用 2FA` 按鈕時，表示目前尚未啟用 2FA。

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-1.png)

點擊按鈕將彈出表單以啟用 2FA。

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-2.png)

開啟認證應用程式，透過掃描 QR 碼新增帳戶。

如果您不方便掃描 QR 碼，也可以直接在此處輸入代碼。

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-3.png)

在認證應用程式中新增帳戶後，輸入認證應用程式中的驗證碼以開啟 2FA。

成功開啟 2FA 後，RustDesk Server Pro 也會綁定 6 個**備用碼**。這樣即使您無法使用認證應用程式，也可以使用這些**備用碼**通過驗證。

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-4.png)

{{% notice note %}}
1. 這些備用碼只能使用一次。

2. 請將備用碼保存在安全的地方。
{{% /notice %}}

#### 登入驗證

啟用 2FA 後，將不再使用電子郵件登入驗證。我們將改為使用 2FA 登入驗證。

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-5.png)

登入時，您將被重定向到驗證頁面。

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-6.png)

#### 修改設定

啟用 2FA 後，修改帳戶設定需要額外的 2FA 驗證。

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-1.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-2.png)

#### 2FA 狀態

2FA 總共有 3 種狀態：未啟用、已啟用和已過期。

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-not-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-expired.png)

{{% notice note %}}
2FA 過期後仍可正常使用。這只是表示 2FA 設定很長時間沒有更改（預設 180 天）。出於安全考慮，我們建議重新啟用 2FA，這樣密鑰資料就可以更新。
{{% /notice %}}