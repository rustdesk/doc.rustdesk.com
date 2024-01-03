---
title: 2FA
weight: 16
---

登录账户时，开启 Two-Factor Authentication(2FA) 验证，能够提高账户安全性。

我们的 web console 目前支持两种 2FA:

1. 邮件验证。
2. TOTP。需要第三方 authentication app 生成验证码，如 [Authy](https://authy.com/), [Microsoft](https://www.microsoft.com/en-us/security/mobile-authenticator-app/), [Google](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2/) authentication app 。

**注**：如使用 OIDC 授权登录，不会再要求 2FA 验证。


开启 邮件验证 或者 TOTP 验证，您都需要进入账户设置页面。

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/1-settings-account.png)

### 邮件验证

开启登录的邮件验证，需要：

1. 设置邮件
2. 启用 "Enable email login verification" 选项。

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/2-2fa-email-1.png)

当我们下次登录时，RustDesk 就会向我们发送验证码邮件，web 页面也会跳转到验证页。

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/2-2fa-email-2.png)


### TOTP

TOTP 是广泛使用的 2FA 方式，因此在 RustDesk Server Pro 的 web console 中，2FA 就是指 TOTP 验证。

#### 准备 authentication app

首先，您需要准备一个 authentication app。
您可以选这几种 [Authy](https://authy.com/), [Microsoft](https://www.microsoft.com/en-us/security/mobile-authenticator-app/), [Google](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2/) authentication app 。

#### 开启 2FA

当设置页显示 "Enable 2FA" 的按钮时，说明 2FA 当前未开启。

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/3-2fa-enable-1.png)


点击按钮，弹出开启 2FA 的弹窗。

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/3-2fa-enable-2.png)


打开 authenticator app ，通过扫描二维码添加账户。

如果您不方便扫描二维码，您还可以直接输入此处的码。

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/3-2fa-enable-3.png)

authenticator app 添加账户后，输入 authenticator app 中的验证码，即可开启 2FA。

2FA 开启成功后，RustDesk Server Pro 同时会绑定 10 个**备用码**。以便您无法使用 authenticator app 时，也能用这些**备用码**通过验证。

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/3-2fa-enable-4.png)


**注**：

1. 这些备用码只能使用一次。
2. 请把备用码保管在安全的地方。

#### 登录验证

在设置页，开启 "Enable 2FA login verification" 选项。

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/3-2fa-enable-login-5.png)


登录时，会跳转验证页

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/3-2fa-enable-login-6.png)


#### 修改设置

开启 2FA 后，修改账户设置，需要额外的 2FA 验证。

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/3-2fa-settings-1.png)


![](/docs/en/self-host/rustdesk-server-pro/2FA/images/3-2fa-settings-2.png)


#### 状态

2FA 一共有3个状态：未启用， 已启用 和 过期。

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/3-2fa-state-not-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/3-2fa-state-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/3-2fa-state-expired.png)

**注**：2FA 显示过期后，仍然可以正常使用。只是 2FA 设置已有一段时间未改变（默认180天）。为安全起见，我们建议重新启用 2FA ，已更新 2FA 数据。
