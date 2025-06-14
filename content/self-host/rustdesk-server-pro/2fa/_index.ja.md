---
title: 2FA
weight: 16
---

アカウントにログインする際に、二要素認証（2FA）検証を有効にすることでアカウントのセキュリティを向上させることができます。

Webコンソールは現在2種類の2FAをサポートしています：

1. メール検証
2. TOTP。検証コードを生成するために、[Authy](https://authy.com)、[Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app/)、[Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2)などのサードパーティ認証アプリが必要です。

まずアカウント設定ページに移動する必要があります。

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/1-settings-account.png)

## メール検証

ログインのメール検証を有効にするには、以下が必要です：

1. メールを設定する。
2. `メールログイン検証を有効にする`オプションを有効にする。
3. `送信`をクリックする。

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-1.png)

次回ログインするとき、RustDeskは検証コードメールを送信し、Webページも検証ページにジャンプします。

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-2.png)

## TOTP

TOTPは広く使用されている2FA方法なので、RustDesk Server ProのWebコンソールでは、2FAはTOTP検証を指します。

### 認証アプリの準備

まず、認証アプリを準備する必要があります。
[Authy](https://authy.com)、[Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app/)、[Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2)などの認証アプリから選択できます。

### 2FAを有効にする

設定ページに`2FAを有効にする`ボタンが表示されている場合、現在2FAが有効になっていないことを意味します。

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-1.png)

ボタンをクリックすると、2FAを有効にするためのフォームがポップアップします。

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-2.png)

認証アプリを開き、QRコードをスキャンしてアカウントを追加します。

QRコードをスキャンするのが不便な場合は、ここで直接コードを入力することもできます。

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-3.png)

認証アプリでアカウントを追加した後、認証アプリの検証コードを入力して2FAを有効にします。

2FAが正常に有効になった後、RustDesk Server Proは6つの**バックアップコード**にもバインドされます。これにより、認証アプリを使用できない場合でも、これらの**バックアップコード**を使用して検証を通過できます。

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-4.png)

{{% notice note %}}
1. これらのバックアップコードは一度しか使用できません。

2. バックアップコードを安全な場所に保管してください。
{{% /notice %}}

### ログイン検証

2FAが有効になると、メールログイン検証は使用されなくなります。代わりに2FAログイン検証を使用します。

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-5.png)

ログイン時、検証ページにリダイレクトされます。

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-6.png)

### 設定の変更

2FAが有効になっている場合、アカウント設定の変更には追加の2FA検証が必要です。

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-1.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-2.png)

### 2FAの状態

2FAには合計3つの状態があります：有効でない、有効、期限切れ。

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-not-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-expired.png)

{{% notice note %}}
2FAは期限が切れても正常に使用できます。これは単に2FA設定が長期間変更されていない（デフォルトで180日）ことを意味します。セキュリティ上の理由から、2FAを再有効化して秘密データを更新することをお勧めします。
{{% /notice %}}