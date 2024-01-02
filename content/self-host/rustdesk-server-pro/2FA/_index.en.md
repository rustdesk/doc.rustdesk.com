---
title: 2FA
weight: 16
---

When logging in to your account, turning on Two-Factor Authentication (2FA) verification can improve account security.

Our web console currently supports two kinds of 2FA:

1. Email verification.
2. TOTP. A third-party authentication app is required to generate the verification code, such as [Authy](https://authy.com/), [Microsoft](https://www.microsoft.com/en-us/security/mobile-authenticator-app/ ), [Google](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2/) authentication app.

**Note**: If you log in using OIDC authorization, 2FA verification will no longer be required.

You first need to go to the account settings page.

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/1-settings-account.png)

### Email verification

To enable email verification for login, you need:

1. Set email.
2. Enable the "Enable email login verification" option.

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/2-2fa-email-1.png)

When we log in next time, RustDesk will send us a verification code email, and the web page will also jump to the verification page.

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/2-2fa-email-2.png)


### TOTP

TOTP is a widely used 2FA method, so in the web console of RustDesk Server Pro, 2FA refers to TOTP verification.

#### Prepare authentication app

First, you need to prepare an authentication app.
You can choose from these types [Authy](https://authy.com/), [Microsoft](https://www.microsoft.com/en-us/security/mobile-authenticator-app/), [Google ](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2/) authentication app.

#### Enable 2FA

When the "Enable 2FA" button is displayed on the settings page, it means that 2FA is not currently enabled.

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/3-2fa-enable-1.png)


Click the button and a form will pop up to enable 2FA.

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/3-2fa-enable-2.png)


Open the authenticator app, add an account by scanning the QR code.

If you are inconvenient to scan the QR code, you can also enter the code here directly.

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/3-2fa-enable-3.png)

After adding the account in the authenticator app, enter the verification code in the authenticator app to turn on 2FA.

After 2FA is successfully turned on, RustDesk Server Pro will also be bound to 10 **backup codes**. So that you can use these **bacoup codes** to pass the verification even if you are unable to use the authenticator app.

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/3-2fa-enable-4.png)


**Note**:

1. These backup codes can only be used once.
2. Please keep the backup codes in a safe place.

#### Login verification

Enable the "Enable 2FA login verification" option on the settings page.

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/3-2fa-enable-login-5.png)


When logging in, you will be redirected to the verification page.

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/3-2fa-enable-login-6.png)


#### Modify settings

After turning on 2FA, modifying account settings requires additional 2FA verification.

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/3-2fa-settings-1.png)


![](/docs/en/self-host/rustdesk-server-pro/2FA/images/3-2fa-settings-2.png)


#### 2FA state

2FA has a total of 3 states: not enabled, enabled and expired.

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/3-2fa-state-not-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/3-2fa-state-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2FA/images/3-2fa-state-expired.png)

**Note**: 2FA can still be used normally after it expires. It just means that the 2FA settings haven't been changed for a long time (default 180 days). For security reasons, we recommend re-enabling 2FA, so the secret data can been updated.
