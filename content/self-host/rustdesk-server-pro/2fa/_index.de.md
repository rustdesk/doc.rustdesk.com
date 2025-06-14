---
title: 2FA
weight: 16
---

Wenn Sie sich bei Ihrem Konto anmelden, können Sie die Verifizierung durch die Zwei-Faktor-Authentifizierung (2FA) aktivieren, um die Sicherheit Ihres Kontos zu erhöhen.

Unsere Webkonsole unterstützt derzeit zwei Arten von 2FA:

1. E-Mail-Überprüfung
2. TOTP. Eine Authentifizierungs-App eines Drittanbieters ist erforderlich, um den Verifizierungscode zu generieren, z. B. [Authy](https://authy.com), [Microsoft Authenticator](https://www.microsoft.com/de-de/security/mobile-authenticator-app/) and [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=de).

Zuerst müssen Sie die Seite mit den Kontoeinstellungen aufrufen.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/1-settings-account.png)

## E-Mail-Überprüfung

Um die E-Mail-Überprüfung für die Anmeldung zu aktivieren, müssen Sie:

1. E-Mail-Adresse eingeben.
2. Aktivieren Sie die Option `E-Mail-Anmeldebestätigung aktivieren`.
3. Klicken Sie auf `Senden`.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-1.png)

Wenn wir uns das nächste Mal anmelden, schickt uns RustDesk eine E-Mail mit einem Verifizierungscode. Die Webseite wird ebenfalls auf die Verifizierungsseite springen.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-2.png)

## TOTP

TOTP ist eine weit verbreitete 2FA-Methode, daher bezieht sich 2FA in der Webkonsole von RustDesk Server Pro auf die TOTP-Verifizierung.

### Authentifizierungs-App vorbereiten

Zunächst müssen Sie eine Authentifizierungs-App vorbereiten.
Sie können zwischen den Authentifizierungs-Apps [Authy](https://authy.com), [Microsoft Authenticator](https://www.microsoft.com/de-de/security/mobile-authenticator-app/) and [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=de) wählen.

### 2FA aktivieren

Wenn die Schaltfläche `2FA aktivieren` auf der Einstellungsseite angezeigt wird, bedeutet dies, dass 2FA derzeit nicht aktiviert ist.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-1.png)

Klicken Sie auf die Schaltfläche und es wird ein Formular zur Aktivierung von 2FA angezeigt.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-2.png)

Öffnen Sie die Authenticator-App und fügen Sie ein Konto hinzu, indem Sie den QR-Code scannen.

Wenn Sie nicht in der Lage sind, den QR-Code zu scannen, können Sie den Code auch direkt eingeben.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-3.png)

Nachdem Sie das Konto in der Authenticator-App hinzugefügt haben, geben Sie den Verifizierungscode in der Authenticator-App ein, um 2FA zu aktivieren.

Nachdem 2FA erfolgreich aktiviert wurde, wird RustDesk Server Pro auch an 6 **Backup-Codes** gebunden sein. Sie können diese **Backup-Codes** verwenden, um die Verifizierung auch dann zu bestehen, wenn Sie nicht in der Lage sind, die Authentifikator-App zu verwenden.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-4.png)

{{% notice note %}}
1. Diese Backup-Codes können nur einmal verwendet werden.

2. Bitte bewahren Sie die Backup-Codes an einem sicheren Ort auf.
{{% /notice %}}

### Überprüfung der Anmeldung

Wenn 2FA aktiviert ist, wird die E-Mail-Anmeldebestätigung nicht mehr verwendet. Stattdessen wird die 2FA-Anmeldebestätigung verwendet.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-5.png)

Wenn Sie sich anmelden, werden Sie zur Verifizierungsseite weitergeleitet.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-6.png)

### Einstellungen ändern

Wenn 2FA aktiviert ist, erfordert die Änderung von Kontoeinstellungen eine zusätzliche 2FA-Verifizierung.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-1.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-2.png)

### 2FA-Status

2FA hat insgesamt 3 Zustände: nicht aktiviert, aktiviert und abgelaufen.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-not-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-expired.png)

{{% notice note %}}
2FA kann auch nach Ablauf der Gültigkeit noch normal verwendet werden. Es bedeutet nur, dass die 2FA-Einstellungen über einen längeren Zeitraum nicht geändert wurden (Standardwert 180 Tage). Aus Sicherheitsgründen empfehlen wir, 2FA erneut zu aktivieren, damit die geheimen Daten aktualisiert werden können.
{{% /notice %}}
