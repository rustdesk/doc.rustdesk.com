---
title: Konfiguracja klienta
weight: 300
pre: "<b>2.3. </b>"
---

## Zarys

Istnieje kilka sposobów na konfigurację klientów RustDeska tak, żeby używały twojego samodzielnie hostowanego serwera. Kilka z nich opisujemy poniżej.

## 1. Generator klientów (wyłącznie wersja Pro, z planem podstawowym lub dostosowanym)

Klient może zawierać twoją nazwę, logo, ikonę, konfigurację, być podpisanym - i więcej.

Aktualnie wspierane są: Windows x64, Mac ARM64 / x64, [Linux](https://twitter.com/rustdesk/status/1788905463678951787) oraz Android ARM64.

[Nagranie](https://twitter.com/rustdesk/status/1769171628426944539)

![](/docs/en/self-host/client-configuration/images/custom-client-qs.png)
![](/docs/en/self-host/client-configuration/images/web_console_custom_client_config.jpeg)

## 2. Ręczna konfiguracja

W głównym panelu klienta RustDesk naciśnij na przycisk Menu [ &#8942; ] znajdujący się obok twojego ID. Następnie naciśnij na Sieć. Teraz możesz odblokować ustawienia używając podniesionych uprawnień i ustaw twoje `ID`, `Serwer przekaźnikowy`, `API` i `Klucz`. Istotne jest to, że `Klucz` to klucz publiczny używany do szyfrowania połączenia, nie jest to ten sam klucz, którego używałeś do aktywacji wersji Pro.

![](/docs/en/self-host/client-configuration/images/network-config.png)

Wprowadź adres serwera `hbbs` w polu tekstowym **Serwer ID**. Dwa inne adresy mogą być puste, RustDesk automatycznie je wydedukuje (jeżeli nie zostały wpisane). Serwer przekaźnikowy tyczy się serwera `hbbr` (port `21117`).

np.

```nolang
hbbs.przyklad.pl
```

lub

```nolang
hbbs.przyklad.pl:21116
```

### Ustaw `Klucz`

W celu ustanowienia szyfrowanego połączenia do twojego serwera, musisz wprowadzić jego klucz publiczny. Klucz ten jest zazwyczaj generowany przy pierwszym uruchomieniu programu `hbbs` i może zostać znaleziony w pliku `id_ed25519.pub` w katalogu roboczym / folderze "data".

Jako użytkownik `Pro` będziesz w stanie odczytać `Klucz` z [konsoli webowej](https://rustdesk.com/docs/pl/self-host/rustdesk-server-pro/console/).

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

### Ustaw `Serwer API`

Ta sekcja jest wyłącznie dla użytkowników `Pro`. W przypadku gdy możesz zalogować się do konsoli webowej, ale nie do klienta RustDeska, prawdopodobnie nieprawidłowo ustawiłeś wartość `Serwer API`.

Jeżeli twój serwer API nie jest uruchomiony na domyślnym porcie `21114` (nie potrzebujesz zezwalać na ruch do tego portu w firewallu, jeżeli używasz wersji open source), musisz wyraźnie wprowadzić wartość `Serwer API`.
Przykładowo: twój serwer API działa na domyślnym porcie HTTPS, w takim wypadku w `Serwer API` musisz wpisać `https://hbbs.przyklad.pl`.

Jeżeli dalej nie możesz stwierdzić wartości `Serwera API`, przejdź do strony powitalnej konsoli webowej. Wartość `Serwer API` będzie pokazana w powyższym zdjęciu (Pole tekstowe z etykietą `API:`).

## 3. Skonfiguruj używając importu albo eksportu

1. Użyj [powyższych](https://rustdesk.com/docs/pl/self-host/client-configuration/#ręczna-konfiguracja) kroków żeby skonfigurować klienta RustDeska na urządzeniu.
2. Korzystając z urządzenia przejdź do Ustawień - Sieć i odblokuj.
3. Naciśnij na `Eksportuj konfigurację serwera`.
4. Wklej skopiowany ciąg znaków w Notatnik (lub coś podobnego).
5. Przejdź do nowego klienta, skopiuj powyższy ciąg znaków do schowka.
6. Przejdź do Ustawień - Sieć w kliencie RustDeska, odblokuj i naciśnij `Importuj konfigurację serwera`.
7. Aplikacja automatycznie wklei ustawienia.
8. Naciśnij `Zatwierdź`.

## 4. Konfiguracja automatyczna

Najłatwiejszym sposobem na automatyczną konfigurację są skrypty wdrożeniowe możliwe do znalezienia [tutaj](https://rustdesk.com/docs/pl/self-host/client-deployment/).

## 5. Zaimportuj konfigurację z wersji `Pro` poprzez schowek

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

https://github.com/rustdesk/rustdesk-server-pro/discussions/372#discussioncomment-10473298

## 6. Używając parametru linii poleceń `--config`
`rustdesk.exe --config <config-string>`

Możesz uzyskać ciąg konfiguracyjny z konsoli webowej (widoczny na powyższym obrazku) lub z klienta RustDesk w sekcji "Ustawienia → Sieć" ([tutaj](https://github.com/rustdesk/rustdesk/discussions/7118) znajduje się dyskusja na ten temat).
