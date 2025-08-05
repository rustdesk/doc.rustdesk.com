---
title: 2FA
weight: 16
---

Po zalogowaniu się na swoje konto włączenie weryfikacji dwuskładnikowej (2FA) może poprawić bezpieczeństwo konta.

Nasza konsola webowa obsługuje obecnie dwa rodzaje uwierzytelniania dwuskładnikowego (2FA):

1. Weryfikacja emailowa
2. TOTP. Do wygenerowania kodu weryfikacyjnego wymagana jest aplikacja uwierzytelniająca, taka jak [Authy](https://authy.com), [Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app/) albo [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2).

Najpierw musisz przejść do strony ustawień konta.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/1-settings-account.png)

## Weryfikacja emailowa

Aby włączyć weryfikację emailową podczas logowania, potrzebujesz:

1. Ustawić adres e-mail.
2. Włącz opcję `Włącz weryfikację logowania za pomocą adresu e-mail`.
3. Naciśnij na `Zatwierdź`.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-1.png)

Kiedy zalogujesz się następnym razem, RustDesk wyśle ci emaila z kodem weryfikacyjnym, a strona internetowa przejdzie do strony weryfikacyjnej.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/2-2fa-email-2.png)

## TOTP

TOTP jest powszechnie stosowaną metodą uwierzytelniania dwuskładnikowego (2FA), dlatego w konsoli internetowej serwera RustDesk Pro termin 2FA odnosi się do weryfikacji TOTP.

### Przygotyuj aplikację uwierzytelniającą

Najpierw należy przygotować aplikację uwierzytelniającą.
Możesz wybrać jedną z następujących aplikacji uwierzytelniających: [Authy](https://authy.com), [Microsoft Authenticator](https://www.microsoft.com/en-us/security/mobile-authenticator-app/) albo [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2).

### Włącz 2FA

Gdy na stronie ustawień wyświetla się przycisk `Włącz 2FA`, oznacza to, że funkcja 2FA nie jest obecnie włączona.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-1.png)

Kliknij przycisk, a pojawi się formularz umożliwiający włączenie uwierzytelniania dwuskładnikowego (2FA).

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-2.png)

Otwórz aplikację uwierzytelniającą i dodaj konto, skanując kod QR.

Jeśli nie możesz zeskanować kodu QR, możesz również wprowadzić kod ręcznie.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-3.png)

Po dodaniu konta w aplikacji uwierzytelniającej wprowadź kod weryfikacyjny w aplikacji uwierzytelniającej, aby włączyć 2FA.

Po pomyślnym włączeniu funkcji 2FA, serwer RustDeska zostanie również powiązany z 6 **kodami zapasowymi**. Dzięki temu będziesz mógł użyć tych **kodów zapasowych** do przejścia weryfikacji, nawet jeśli nie będziesz mógł skorzystać z aplikacji uwierzytelniającej.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-4.png)

{{% notice note %}}
1. Te kody zapasowe możesz wykorzystać tylko raz.

2. Przechowuj kody zapasowe w bezpiecznym miejscu.
{{% /notice %}}

### Weryfikacja logowania

Po włączeniu funkcji 2FA weryfikacja logowania za pomocą emailowa nie będzie już stosowana. Zamiast tego będziemy stosować weryfikację logowania za pomocą funkcji 2FA.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-5.png)

Po zalogowaniu zostaniesz przekierowany na stronę weryfikacyjną.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-enable-login-6.png)

### Modyfikacja ustawień

Po włączeniu funkcji 2FA modyfikacja ustawień konta wymaga dodatkowej weryfikacji 2FA.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-1.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-settings-2.png)

### Stan 2FA

2FA ma łącznie 3 stany: nieaktywny, aktywny i wygasły.

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-not-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-enabled.png)

![](/docs/en/self-host/rustdesk-server-pro/2fa/images/3-2fa-state-expired.png)

{{% notice note %}}
Po wygaśnięciu 2FA nadal można z niego normalnie korzystać. Oznacza to po prostu, że ustawienia 2FA nie były zmieniane przez dłuższy czas (domyślnie 180 dni). Ze względów bezpieczeństwa zalecamy ponowne włączenie 2FA, aby można było zaktualizować tajne dane.
{{% /notice %}}
