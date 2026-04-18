---
title: Microsoft 365
weight: 16
description: "Skonfiguruj SMTP OAuth2 (Microsoft 365) w RustDesk Server Pro, aby wysylac e-maile przez Exchange Online."
keywords: ["rustdesk smtp oauth2", "rustdesk smtp microsoft 365", "rustdesk smtp m365", "rustdesk smtp oauth2 microsoft 365", "rustdesk smtp oauth2 m365", "rustdesk server pro smtp oauth2", "rustdesk server pro microsoft 365", "rustdesk server pro m365", "rustdesk server pro smtp oauth2 microsoft 365", "rustdesk server pro smtp oauth2 m365"]
---

Skorzystaj z tego przewodnika, aby skonfigurowac RustDesk Server Pro do wysylania e-maili przez Microsoft 365 Exchange Online z OAuth2.

Ta konfiguracja nadaje sie do wiadomosci z zaproszeniami, e-maili weryfikacji logowania i powiadomien o alarmach polaczenia.

Ogolna konfiguracja SMTP jest opisana w [SMTP](../).

## Jakie Wartosci Wpisac w RustDesk Pro?

| Pole RustDesk Pro | Co wpisac |
| --- | --- |
| From | Adres nadawcy wyswietlany w wychodzacych e-mailach. |
| Mail Account | Adres skrzynki pocztowej, ktorego RustDesk uzywa jako nazwy uzytkownika XOAUTH2 SMTP. |
| OAuth2 Tenant ID | `Directory (tenant) ID` z przegladu aplikacji |
| OAuth2 Client ID | `Application (client) ID` z przegladu aplikacji |
| OAuth2 Client secret | `Value` secretu utworzonego w `Certificates & secrets` |

Ten zrzut ekranu pokazuje, gdzie wpisac te wartosci w RustDesk:
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/21-RustDesk-SMTP-OAuth2-2.png)

## Konfiguracja

Przed rozpoczeciem tej konfiguracji upewnij sie, ze masz:

- RustDesk Server Pro `1.8.1` lub nowszy
- Istniejaca skrzynke Microsoft 365 albo skrzynke, ktora planujesz utworzyc do wysylania poczty, na przyklad `no-reply@contoso.com`
- Konto administratora Microsoft 365, ktore moze nadac admin consent w Microsoft Entra i zarzadzac service principal w Exchange Online

Ta konfiguracja ma trzy czesci:

- Skonfigurowanie w Azure rejestracji aplikacji, client secret, uprawnienia API i admin consent
- Skonfigurowanie w PowerShell service principal Exchange Online, skrzynki i uprawnien
- Skonfigurowanie SMTP OAuth2 w RustDesk i wyslanie testowego e-maila

### 1. Konfiguracja w Azure

1. Zaloguj sie do [portalu Azure](https://portal.azure.com).
1. Wyszukaj i wybierz **App registrations**.
1. W lewym menu wybierz [**App registrations**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps), a nastepnie kliknij **New registration**.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/1-Azure-AppRegistrations.png)
1. Utworz rejestracje aplikacji.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/2-Azure-NewRegistration.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/3-Azure-RegisterAnApp.png)
1. Zanotuj `Directory (tenant) ID` i `Application (client) ID`. Wprowadzisz je pozniej w RustDesk.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/4-Azure-NewApp-Overview.png)
1. Otworz **Certificates & secrets** i utworz nowy client secret.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/5-Azure-NewClientSecret.png)
1. Od razu skopiuj `Value` secretu. Microsoft pokazuje te wartosc tylko raz.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/6-Azure-Secret.png)
1. Otworz **API permissions** i dodaj uprawnienie aplikacyjne SMTP dla Microsoft 365 Exchange Online.
1. Wybierz **Add a permission**.
1. Wybierz **APIs my organization uses** i wyszukaj **Office 365 Exchange Online**.
1. Wybierz **Application permissions**.
1. Wybierz **SMTP.SendAsApp** i zapisz zmiane.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/7-Azure-AddPerms.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/8-Azure-Office365ExchangeOnline.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/9-Azure-SMTP-Send.png)
1. Nadaj admin consent dla dodanego przed chwila uprawnienia.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/10-Azure-Grant-Admin-Constant.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/11-Azure-ApiPermissions.png)

### 2. Konfiguracja w PowerShell

W tej czesci polaczysz sie z Exchange Online, utworzysz service principal, przygotujesz skrzynke i nadasz uprawnienia.

1. Otworz PowerShell jako lokalny administrator.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/12-Powershell-RunAsAdmin.png)
1. Zainstaluj modul Exchange Online i polacz sie przy uzyciu konta administratora tenanta.

```powershell
Install-Module -Name ExchangeOnlineManagement
Import-Module ExchangeOnlineManagement
Connect-ExchangeOnline
```

Jesli chcesz jawnie wskazac konto administratora, mozesz takze uzyc:

```powershell
Connect-ExchangeOnline -UserPrincipalName admin@contoso.com
```

1. W Microsoft Entra **Enterprise applications** znajdz aplikacje i zanotuj jej `Object ID`. Bedzie potrzebny przy tworzeniu service principal Exchange Online.

{{% notice note %}}
`OBJECT_ID` uzywany tutaj musi byc object ID aplikacji z **Enterprise applications**, a nie object ID widocznym na stronie przegladu **App registrations**.
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/15-Powershell-Get-ObjectId.png)

1. Uruchom to polecenie, aby utworzyc service principal Exchange Online dla rejestracji aplikacji. Microsoft opisuje ten krok jako rejestracje service principal aplikacji Microsoft Entra w Exchange Online.

```powershell
New-ServicePrincipal -AppId <APPLICATION_ID> -ObjectId <OBJECT_ID>
```

Jesli to polecenie nie powiedzie sie mimo poprawnego polaczenia z Exchange, sprawdz, czy konto administratora ma uprawnienia do zarzadzania service principal w Exchange Online.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/16-Powershell-New-ServicePrincipal.png)

1. Potwierdz, ze Exchange utworzyl service principal, i zanotuj jego wartosc `Identity` do kolejnych krokow.

```powershell
Get-ServicePrincipal | Format-Table DisplayName,AppId,ObjectId,Identity
```

Uzyj zwroconej tutaj wartosci `Identity` jako `<SERVICE_PRINCIPAL_ID>` w dwoch kolejnych poleceniach nadawania uprawnien.

1. Jesli skrzynka nadawcza jeszcze nie istnieje, mozesz najpierw utworzyc shared mailbox, na przyklad:

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@contoso.com
```

Jesli masz juz skrzynke do wysylki, mozesz pominac ten krok.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/17-Powershell-New-Mailbox.png)

1. Sprawdz, czy `Authenticated SMTP` jest wlaczone dla tenanta i skrzynki nadawczej.

```powershell
Get-TransportConfig | Format-List SmtpClientAuthenticationDisabled
Get-CASMailbox -Identity "no-reply@contoso.com" | Format-List SmtpClientAuthenticationDisabled
```

Jesli nie jest wlaczone, testowe e-maile moga konczyc sie takim bledem:

```text
permanent error (535): 5.7.139 Authentication unsuccessful, SmtpClientAuthentication is disabled for the Tenant. Visit https://aka.ms/smtp_auth_disabled for more information.
```

W razie potrzeby dla ustawienia na poziomie skrzynki uruchom:

```powershell
Set-CASMailbox -Identity "no-reply@contoso.com" -SmtpClientAuthenticationDisabled $false
```

Jesli ustawienie na poziomie tenanta zwroci `True`, zdecyduj zgodnie z polityka organizacji, czy uruchomic:

```powershell
Set-TransportConfig -SmtpClientAuthenticationDisabled $false
```

Jesli ustawienia na poziomie tenanta i skrzynki wygladaja poprawnie, ale ten sam blad `535 5.7.139` nadal wystepuje, sprawdz tez, czy tenant korzysta z Microsoft Entra `Security defaults`. Microsoft Learn podaje, ze gdy `Security defaults` jest wlaczone, SMTP AUTH w Exchange Online jest wylaczone.

Szczegoly polecen znajduja sie w Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission).

1. Nadaj Exchange service principal uprawnienie `FullAccess` do skrzynki, ktorej RustDesk bedzie uzywac do wysylania poczty.

```powershell
Add-MailboxPermission -Identity "no-reply@contoso.com" -User <SERVICE_PRINCIPAL_ID> -AccessRights FullAccess
```

Tutaj uzyj skrzynki, ktora planujesz wpisac w `Mail Account` w RustDesk.

Jesli to polecenie zwroci blad taki jak ponizej:

```text
Write-ErrorMessage : ||The operation couldn't be performed because object 'no-reply@xxx.com' couldn't be found on 'xxx.xxx.PROD.OUTLOOK.COM'.
```

oznacza to, ze wartosc przekazana do `-Identity` nie zostala rozpoznana w Exchange Online jako rzeczywisty obiekt skrzynki pocztowej.

Najpierw potwierdz, ze ta skrzynka rzeczywiscie istnieje w Exchange Online:

```powershell
Get-EXOMailbox -Identity "no-reply@xxx.com" | Format-List DisplayName,PrimarySmtpAddress,RecipientTypeDetails
```

Jesli nie zostanie zwrocona zadna skrzynka, najpierw ja utworz lub potwierdz jej istnienie. Dla adresu nadawcy `no-reply` mozesz utworzyc shared mailbox, na przyklad:

```powershell
New-Mailbox -Shared -Name "No Reply" -Alias no-reply -DisplayName "No Reply" -PrimarySmtpAddress no-reply@xxx.com
```

Jesli skrzynka juz istnieje, upewnij sie, ze wartosc uzyta w `Add-MailboxPermission -Identity ...` to rzeczywisty adres skrzynki, alias albo inna mailbox identity, ktora Exchange potrafi rozpoznac.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/18-Powershell-Add-MailboxPermission.png)

1. Nadaj temu samemu service principal rowniez uprawnienie `SendAs`.

```powershell
Add-RecipientPermission -Identity "no-reply@contoso.com" -Trustee <SERVICE_PRINCIPAL_ID> -AccessRights SendAs -Confirm:$false
```

Ten krok rowniez nalezy do oficjalnej konfiguracji SMTP app-only firmy Microsoft.

### 3. Konfiguracja w RustDesk

Na tym etapie powinienes juz miec:

- adres nadawcy dla `From`
- adres skrzynki dla `Mail Account`
- `Directory (tenant) ID`
- `Application (client) ID`
- `Value` client secret
- potwierdzony service principal Exchange Online, ktory ma juz `FullAccess` i `SendAs` do skrzynki uzywanej w `Mail Account`

RustDesk nie wymaga wpisania `Identity` service principal Exchange, ale przed testem wysylki powyzsze kroki nadawania uprawnien musza byc juz zakonczone.

1. W [konsoli web](../../console/) RustDesk przejdz do **Settings** -> **SMTP**.
1. Wlacz OAuth2 i wybierz **Microsoft 365** jako dostawce.
1. Uzupelnij te pola:

   - `From`
   - `Mail Account`
   - `OAuth2 Tenant ID`
   - `OAuth2 Client ID`
   - `OAuth2 Client secret`

1. Kliknij **Check**, aby zapisac konfiguracje i wyslac testowy e-mail.
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/20-RustDesk-SMTP-OAuth2-1.png)
![](/docs/en/self-host/rustdesk-server-pro/smtp/microsoft-365/images/21-RustDesk-SMTP-OAuth2-2.png)

Jesli testowy e-mail nadal nie dziala, wroc do sekcji PowerShell i ponownie sprawdz Exchange Online service principal, `Authenticated SMTP` oraz uprawnienia skrzynki uzywanej w `Mail Account`.

## Zrodla

- Microsoft Learn: [Authenticate an IMAP, POP or SMTP connection using OAuth](https://learn.microsoft.com/en-us/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth). Zrodlo krokow dotyczacych uprawnien aplikacji Exchange Online i service principal.
- Microsoft Learn: [Enable or disable authenticated client SMTP submission (SMTP AUTH) in Exchange Online](https://learn.microsoft.com/en-us/Exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission). Zrodlo sprawdzania i wlaczania `Authenticated SMTP`.
- Microsoft Learn: [Create shared mailboxes in the Exchange admin center](https://learn.microsoft.com/en-us/exchange/collaboration/shared-mailboxes/create-shared-mailboxes). Zrodlo tworzenia shared mailbox.
