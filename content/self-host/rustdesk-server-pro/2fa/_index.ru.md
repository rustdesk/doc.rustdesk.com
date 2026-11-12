---
title: 2FA
weight: 16
description: "Включение двухфакторной аутентификации в RustDesk Server Pro с подтверждением по электронной почте или через TOTP-приложения, например Authy, Microsoft Authenticator или Google Authenticator."
keywords: ["rustdesk 2fa", "rustdesk totp", "rustdesk email verification", "rustdesk authenticator", "rustdesk server pro 2fa"]
---

В этом руководстве описано, как включить двухфакторную аутентификацию в RustDesk Server Pro для лучшей защиты учётных записей.

Двухфакторная аутентификация (2FA) при входе в учётную запись повышает её безопасность.

## Какой способ 2FA выбрать?

| Способ | Кому подходит | Зачем его использовать |
| --- | --- | --- |
| Подтверждение по электронной почте | Простым развёртываниям, где уже настроен SMTP | Проще всего внедрить, если пользователи ещё не пользуются приложениями-аутентификаторами |
| TOTP | Для более надёжной повседневной защиты учётных записей | Безопаснее и привычнее для долговременных учётных записей администраторов и операторов |

## Коротко о 2FA

- RustDesk Server Pro поддерживает подтверждение по электронной почте и TOTP
- Когда включён TOTP, подтверждение входа по почте больше не используется
- При настройке TOTP создаются 6 резервных кодов
- Каждый резервный код можно использовать только один раз
- 2FA с истёкшим сроком продолжает работать, но повторное включение обновляет секрет для большей безопасности

Сейчас веб-консоль поддерживает два вида 2FA:

1. Подтверждение по электронной почте
2. TOTP. Для получения кода нужно стороннее приложение-аутентификатор, например [Authy](https://authy.com), [Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app/) или [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2).

Сначала откройте страницу настроек учётной записи.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/1-settings-account.png)

## Подтверждение по электронной почте

Чтобы включить подтверждение входа по электронной почте:

1. Укажите адрес электронной почты.
2. Включите параметр `Enable email login verification`.
3. Нажмите `Submit`.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-1.png)

При следующем входе RustDesk отправит письмо с кодом подтверждения, а веб-страница перейдёт на страницу подтверждения.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-2.png)

## TOTP

TOTP — широко распространённый способ 2FA, поэтому в веб-консоли RustDesk Server Pro под 2FA понимается именно подтверждение через TOTP.

### Подготовка приложения-аутентификатора

Сначала подготовьте приложение-аутентификатор.
Можно выбрать, например, [Authy](https://authy.com), [Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app/) или [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2).

### Включение 2FA

Если на странице настроек отображается кнопка `Enable 2FA`, значит, 2FA сейчас не включена.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-1.png)

Нажмите кнопку — откроется форма включения 2FA.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-2.png)

Откройте приложение-аутентификатор и добавьте учётную запись, отсканировав QR-код.

Если сканировать QR-код неудобно, можно ввести код вручную.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-3.png)

Добавив учётную запись в приложение-аутентификатор, введите код из него, чтобы включить 2FA.

После успешного включения 2FA RustDesk Server Pro также привяжет к учётной записи 6 **резервных кодов**. С ними можно пройти проверку, даже если приложение-аутентификатор недоступно.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-4.png)

{{% notice note %}}
1. Каждый резервный код можно использовать только один раз.

2. Храните резервные коды в надёжном месте.
{{% /notice %}}

### Подтверждение входа

Когда 2FA включена, подтверждение входа по электронной почте больше не используется — вместо него используется 2FA.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-5.png)

При входе вы будете перенаправлены на страницу подтверждения.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-6.png)

### Изменение настроек

Когда 2FA включена, для изменения настроек учётной записи требуется дополнительное подтверждение 2FA.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-1.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-2.png)

### Состояние 2FA

У 2FA три состояния: не включена, включена и истекла.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-not-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-expired.png)

{{% notice note %}}
После истечения срока 2FA продолжает нормально работать. Это лишь означает, что настройки 2FA давно не менялись (по умолчанию 180 дней). Из соображений безопасности рекомендуем повторно включить 2FA, чтобы обновить секретные данные.
{{% /notice %}}
