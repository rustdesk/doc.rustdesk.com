---
title: Azure
weight: 16
---

## Instrukcja wideo

[https://www.youtube.com/watch?v=izGxSmifURI](https://www.youtube.com/watch?v=izGxSmifURI)

## Konfiguracja

1. Zaloguj się do [portalu Azure](https://portal.azure.com).
2. Wyszukaj i wybierz **Microsoft Entra ID**.
3. W lewym menu wybierz [**Rejestracje aplikacji**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps), kliknij **Nowa rejestracja**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/1-Azure-NewRegistration.png)
4. W konsoli RustDeska Pro przejdź do strony **Ustawienia**, kliknij moduł **OIDC**. Skopiuj **URL zwrotny**. **Uwaga**: **URL zwrotny** nie jest edytowalny, część `Ścieżka` jest stała i wynosi `api/oidc/callback`, a część `Protokół://Host:Port` pochodzi z adresu aktualnej strony. Jeśli otworzyłeś konsolę przez `http://localhost:8000/<ścieżka>`, to **URL zwrotny** to `http://localhost:8000/api/oidc/callback`. Jeśli przez `https://192.168.0.1:8000/<ścieżka>`, to **URL zwrotny** to `https://192.168.0.1:8000/api/oidc/callback`. Ponieważ Azure wymaga `https://` lub `http://localhost`, wybierz odpowiedni adres do otwarcia konsoli RustDeska Pro.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/12-RustDesk-Callback.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register-RecirectURIs-Restrictions.png)
5. Wprowadź **Nazwę**, wybierz **Obsługiwane typy kont** i wklej **URI przekierowania** z RustDeska Pro.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register.png)
6. W RustDeska Pro kliknij **Nowy dostawca uwierzytelniania**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/3-RustDesk-NewAuthProvider.png)
7. W Azure wybierz aplikację, kliknij **Przegląd** i skopiuj **Identyfikator aplikacji (klienta)**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/4-Azure-ClientID.png)
8. W RustDeska Pro wklej **Identyfikator klienta**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/5-RustDesk-ClientID.png)
9. W Azure przejdź do **Certyfikaty i wpisy tajne**, utwórz nowy lub wybierz istniejący wpis tajny klienta.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/6-Azure-NewOrSelectClientSecret.png)
10. W Azure skopiuj wartość wpisu tajnego klienta. **Uwaga**: Ta wartość jest widoczna tylko podczas pierwszego tworzenia. Po opuszczeniu strony nie będzie już widoczna. Zachowaj tę wartość w bezpiecznym miejscu.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/7-Azure-CopySecretValue.png)
11. W RustDeska Pro wklej wartość wpisu tajnego klienta.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/8-RustDesk-FillClientSecret.png)
12. W RustDeska Pro wypełnij pole **Wystawca** wartością `https://login.microsoftonline.com/<Identyfikator katalogu (dzierżawy)>/v2.0`. Zastąp `Identyfikator katalogu (dzierżawy)` swoim **Identyfikatorem katalogu (dzierżawy)**. **Identyfikator katalogu (dzierżawy)** znajduje się w panelu **Przegląd** aplikacji w Azure.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/9-RustDesk-Issuer.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/10-Azure-TenantID.png)
13. W Azure wybierz menu **Uwierzytelnianie**. Skonfiguruj autoryzację, wybierając **Tokeny identyfikatorów (używane dla przepływów niejawnych i hybrydowych)**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/11-Azure-Auth.png)

## Materiały referencyjne

- [Konfiguracja dostawcy OpenID Connect z Azure AD](https://learn.microsoft.com/en-us/power-pages/security/authentication/openid-settings)
- [OpenID Connect na platformie tożsamości Microsoft](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc)
