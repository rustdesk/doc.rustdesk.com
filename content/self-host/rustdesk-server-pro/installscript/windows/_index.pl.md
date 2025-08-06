---
title: Instalacja na Windowsie (przestarzałe)
weight: 5
---

{{% notice note %}}
Polityka bezpieczeństwa Windows może być problematyczna. Jeśli ten poradnik nie działa lub występują niestabilne połączenia, zaleca się migrację na serwer Linux.
{{% /notice %}}

{{% notice note %}}
Wersja z GUI, `RustDeskServer.setup.exe`, nie jest już rozwijana i nie jest zalecana.
{{% /notice %}}

## Instalacja

Do działania RustDesk na Windowsie wymagane jest Microsoft Visual C++ Redistributable. Można je pobrać [tutaj](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist).

1. Uzyskaj licencję na [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html). Więcej szczegółów na stronie [licencji](https://rustdesk.com/docs/pl/self-host/rustdesk-server-pro/license/).
2. Pobierz instalator Windows z [GitHub](https://github.com/rustdesk/rustdesk-server-pro/releases/latest).
3. Wypakuj instalator.
4. Uruchom instalator i postępuj zgodnie z instrukcjami. Alternatywnie możesz zainstalować ręcznie używając [PM2 lub NSSM](https://rustdesk.com/docs/pl/self-host/rustdesk-server-oss/windows/).
5. Po zakończeniu instalacji otwórz RustDesk Server.
6. Postępuj zgodnie z wyświetlanymi instrukcjami.
7. Kliknij `Services`, a następnie `Start`.
8. Po zakończeniu instalacji przejdź do `http://twojadresip:21114`.
9. Zaloguj się używając nazwy użytkownika `admin` i hasła `test1234`.
10. Wprowadź kod licencji zakupiony w kroku 1.

## Użycie IIS jako proxy

Upewnij się, że `Dynamic Content Compression` jest zainstalowane (to funkcja IIS, którą można zainstalować przez Role serwera).

1. Otwórz IIS (lub zainstaluj go).
2. Utwórz nową witrynę dla RustDeska z powiązaniami (najlepiej 443) i odpowiednim certyfikatem. Podstawowe ustawienia powinny wskazywać na pusty folder.
3. W IIS zainstaluj [Application Request Routing](https://www.iis.net/downloads/microsoft/application-request-routing) i [URL Rewrite](https://learn.microsoft.com/en-us/iis/extensions/url-rewrite-module/using-the-url-rewrite-module).

## Application Request Routing

1. W panelu hosta IIS otwórz Application Request Routing.
2. Przejdź do Server Proxy Settings.
3. Włącz proxy i pozostaw domyślne ustawienia.
4. Zapisz ustawienia i przejdź do URL Rewrite.

## URL Rewrite

1. Otwórz witrynę w IIS i kliknij dwukrotnie URL Rewrite.
2. Kliknij `Add rules`.
3. Skonfiguruj nową regułę reverse proxy.
4. Ustaw lokalny adres (adres 21114) \
Reguła przychodząca - wewnętrzny adres RustDeska 21114 \
Reguły wychodzące - `From` to wewnętrzny adres RustDeska 21114, `To` to adres zewnętrzny. \
Uwaga: Nie dodawaj http/https przed adresami - są obsługiwane automatycznie. Upewnij się, że wszystkie adresy są dostępne zarówno wewnętrznie, jak i zewnętrznie.

## Kompresja

1. Wyłącz `Dynamic Content Compression`.

## Rozwiązywanie problemów

W przypadku błędu 500.52 dodaj wymienione zmienne: [IIS działający jako odwrotny serwer proxy: gdzie zaczynają się problemy](https://techcommunity.microsoft.com/t5/iis-support-blog/iis-acting-as-reverse-proxy-where-the-problems-start/ba-p/846259).

Może być konieczna zmiana ustawień SSL na "Require SSL → Ignore".
