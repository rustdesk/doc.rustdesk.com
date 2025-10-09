---
title: Zaawansowane ustawienia
weight: 49
---

Wszystkie zaawansowane ustawienia w niestandardowych klientach zostały omówione tutaj.

## Poziomy uprawnień dla ustawień

Istnieją cztery rodzaje ustawień:

1. Nadpisy ustawień w `Konsola webowa` → `Niestandardowe klienty`
2. Ustawienia domyślne, w `Konsola webowa` → `Niestandardowe klienty`
3. Ustawienia użytkownika, w kliencie RustDeska
4. Ustawienia strategii, w `Konsola webowa` → `Strategie`

Hierarchia uprawnień dla tych ustawień jest następująca: `Nadpisy > Strategia > Użytkownika > Domyślne`

## Ustawienia zabezpieczeń

### access-mode

Ustaw tryb dostępu (uprawnienia) dla połączeń przychodzących.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Zabezpieczenia → Uprawnienia
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | custom, full, view | custom | `access-mode=custom` |

### enable-keyboard

Włącz obsługę klawiatury/myszy dla połączeń przychodzących.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Zabezpieczenia → Uprawnienia → Włącz klawiaturę
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-keyboard=Y` |

### enable-clipboard

Włącz kopiowanie i wklejanie dla połączeń przychodzących.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Zabezpieczenia → Uprawnienia → Włącz schowek
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-clipboard=Y` |

### enable-file-transfer

Włącz kopiowanie i wklejanie plików lub transfer plików (sesja) dla połączeń przychodzących.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Zabezpieczenia → Uprawnienia → Włącz transfer plików
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-file-transfer=Y` |


### enable-camera

Włącz kamerę dla połączeń przychodzących.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Zabezpieczenia → Uprawnienia → Włącz aparat (kamerę)
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-camera=Y` |

### enable-terminal

Włącz terminal dla połączeń przychodzących.

**Lokalizacja**:

**K. stacjonarny** Ustawienia → Zabezpieczenia → Uprawnienia → Włącz terminal

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-terminal=Y` |

### enable-remote-printer

Włącz zdalną drukarkę dla połączeń przychodzących.

**Lokalizacja**:

1. **Windows** Ustawienia → Zabezpieczenia → Uprawnienia → Włącz zdalną drukarkę

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-remote-printer=Y` |

### enable-audio

Włącz nagrywanie dźwięku i przesyłanie do partnera.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Zabezpieczenia → Uprawnienia → Włącz dźwięk
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-audio=Y` |

### enable-tunnel

Włącz tunelowanie TCP.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Zabezpieczenia → Uprawnienia → Włącz tunelowanie TCP
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-tunnel=Y` |

### enable-remote-restart

Włącz ponowne uruchamianie przez stronę sterującą.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Zabezpieczenia → Uprawnienia → Włącz zdalny restart
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-remote-restart=Y` |

### enable-record-session

Włącz nagrywanie sesji.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Zabezpieczenia → Uprawnienia → Włącz nagrywanie sesji
2. **Smartfon** Ustawienia → Udostępnianie ekranu → Włącz nagrywanie sesji

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-record-session=Y` |

### enable-block-input

Zezwól stronie kontrolowanej na blokowanie wejścia innych użytkowników.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Zabezpieczenia → Uprawnienia → Włącz blokowanie wejścia (Windows only)
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-block-input=Y` |

### allow-remote-config-modification

Zezwól stronie kontrolującej na zmianę ustawień w kontrolowanym interfejsie RustDeska.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Zabezpieczenia → Uprawnienia → Włącz zdalną modyfikację konfiguracji
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-remote-config-modification=Y` |

### enable-lan-discovery

Pozwala innym użytkownikom sieci LAN na wykrywanie mnie.

Po wykryciu sieci LAN funkcja [WOL](https://pl.wikipedia.org/wiki/Wake_on_LAN) może działać, jeśli jest obsługiwana lokalnie.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Zabezpieczenia → Zabezpieczenia → Odmów wykrywania w sieci LAN
2. **Smartfon** Ustawienia → Udostępnianie ekranu → Odmów wykrywania w sieci LAN

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| Y | Y, N | Y | `enable-lan-discovery=Y` |

### direct-server

Włącz bezpośredni dostęp poprzez adres IP.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Zabezpieczenia → Zabezpieczenia → Włącz bezpośredni dostęp przez IP
2. **Smartfon** Ustawienia → Udostępnianie ekranu → Bezpośredni dostęp przez IP

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `direct-server=Y` |

### direct-access-port

Port bezpośredniego dostępu poprzez IP.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Zabezpieczenia → Zabezpieczenia → Port bezpośredniego dostępu IP (pokazane jeśli "Włącz bezpośredni dostęp poprzez adres IP" jest zaznaczone)
2. **Smartfon** Ustawienia → Udostępnianie ekranu → Bezpośredni dostęp przez IP

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N |  | 21118 | `direct-access-port=21118` |

### whitelist

Użyj białej listy adresów IP.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Zabezpieczenia → Zabezpieczenia → Użyj białej listy adresów IP
2. **Smartfon** Ustawienia → Udostępnianie ekranu → Użyj białej listy adresów IP

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | `,` lub `<ip1>,<ip2>,<ip3>` | `,` oznacza brak filtru | `whitelist=,` |

### allow-auto-disconnect i auto-disconnect-timeout

Automatycznie zamykaj sesje przychodzące po okresie braku aktywności użytkownika.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Zabezpieczenia → Zabezpieczenia → Automatycznie zamykaj sesje przychodzące w przypadku braku aktywności użytkownika
2. **Smartfon** Ustawienia → Udostępnianie ekranu → Automatycznie zamykaj sesje przychodzące w przypadku braku aktywności użytkownika

| Option | Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: | :------: |
| allow-auto-disconnect | N | Y, N | N | `allow-auto-disconnect=Y` |
| auto-disconnect-timeout | N | Timeout in minutes | 10 | `auto-disconnect-timeout=10` |

### allow-only-conn-window-open

Zezwól na połączenie tylko wtedy, gdy okno RustDeska jest otwarte.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Zabezpieczenia → Zabezpieczenia → Zezwól na połączenie tylko wtedy, gdy okno RustDeska jest otwarte
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-only-conn-window-open=N` |

### approve-mode

Akceptuj połączenia przychodzące za pomocą hasła lub ręcznego kliknięcia.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Zabezpieczenia → Hasło → Rozwijane menu
2. **Smartfon** Udostępnianie ekranu → Rozwijane menu w prawym górnym rogu

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | password, click, password-click | password-click | `approve-mode=password-click` |

### verification-method

Jakiego rodzaju hasło można użyć? `Hasło tymczasowe` odnosi się do jednorazowego hasła losowego.

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | use-temporary-password, use-permanent-password, use-both-passwords | use-both-passwords | `verification-method=use-permanent-password` |

### temporary-password-length

1. **K. stacjonarny** Ustawienia → Zabezpieczenia → Hasło → Długość hasła jednorazowego
2. **Smartfon** Udostępnianie ekranu → Rozwijane menu w prawym górnym rogu → Długość hasła jednorazowego

Długość tymczasowego hasła.

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | 6, 8, 10 | `temporary-password-length=6` |

### proxy-url

Adres URL serwera proxy.

Obecnie obsługiwane są protokoły `http` i `socks5`.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Sieć → Proxy → Proxy Socks5/Http(s)
2. **Smartfon**

Przykłady:

1. **http** `proxy-url=http://192.168.0.2:12345`
2. **https** `proxy-url=https://192.168.0.2:12345`
3. **socks5** `proxy-url=socks5://192.168.0.2:1080`

### proxy-username & proxy-password

Nazwa użytkownika i hasło serwera proxy.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Sieć → Proxy → Proxy Socks5/Http(s)
2. **Smartfon**

| Option | Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: | :------: |
| proxy-username | N | | | `proxy-username=user` |
| proxy-password | N | | | `proxy-password=pass` |

## Ustawienia ogólne

### theme

Kontroluje motyw interfejsu klienta RustDeska.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Ogólne → Motyw
2. **Smartfon** Ustawienia → Ustawienia → Motyw

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | dark, light, system | system | `theme=system` |

### lang

Kontroluje język klienta RustDeska.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Ogólne → Język
2. **Smartfon** Ustawienia → Ustawienia → Język

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | default, ar, bg, ... | default | `lang=default` |

Obecnie dostępne języki to:

ar, bg, ca, cs, da, de, el, en, eo, es, et, fa, fr, he, hr, hu, id, it, ja, ko, kz, lt, lv, nb, nl, pl, pt, ro, ru, sk, sl, sq, sr, sv, th, tr, uk, vn, zh-cn, zh-tw

Najnowszą listę języków można sprawdzić w kodzie [LANGS](https://github.com/rustdesk/rustdesk/blob/master/src/lang.rs#L45).

### allow-auto-record-incoming

Automatycznie nagrywaj przychodzące sesje.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Ogólne → Nagrywanie → Automatycznie nagrywaj przychodzące sesje
2. **Smartfon** Ustawienia → Nagrywanie → Automatycznie nagrywaj przychodzące sesje

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-incoming=Y` |

### allow-auto-record-outgoing

Automatycznie nagrywaj sesje wychodzące.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Ogólne → Nagrywanie → Automatycznie nagrywaj sesje wychodzące
2. **Smartfon** Ustawienia → Nagrywanie → Automatycznie nagrywaj sesje wychodzące

| Wymagana instalacja | Wartości | Domyślne | Przykład | Version |
| :------: | :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-outgoing=Y` | >= 1.3.2 |

### video-save-directory

Katalog, w którym zapisywane są nagrane filmy.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Ogólne → Nagrywanie → Katalog zapisu filmów
2. **Smartfon** Ustawienia → Nagrywanie

Domyślne wartości:

1. **macOS** ~/Movies/**app_name**
2. **Linux** ~/Videos/**app_name**
3. **Windows** %USERPROFILE%\Videos\\**app_name**
4. **Android** /Storage/emulated/0/**app_name**/ScreenRecord

**Notka**: **app_name** oznacza aktualną nazwę aplikacji.

### enable-confirm-closing-tabs

Kontroluje, czy przed zamknięciem wszystkich zdalnych kart ma być wyświetlane okno dialogowe z potwierdzeniem.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Ogólne → Inne → Potwierdź przed zamknięciem wielu kart
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-confirm-closing-tabs=Y` |

### enable-abr

Włącz adaptacyjną szybkość transmisji bitów.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Ogólne → Inne → Adaptacyjną szybkość transmisji bitów
2. **Smartfon** Ustawienia → Udostępnianie ekranu → Adaptacyjną szybkość transmisji bitów (beta)

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-abr=Y` |

### allow-remove-wallpaper

Usuń tapetę podczas sesji przychodzących.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Ogólne → Inne → Usuń tapetę podczas sesji przychodzących
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-remove-wallpaper=N` |

### enable-open-new-connections-in-tabs

Kontroluje, czy do otwarcia nowego połączenia ma zostać użyta nowa karta, czy nowe okno.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Ogólne → Inne → Otwórz połączenie w nowej karcie
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-open-new-connections-in-tabs=Y` |

### allow-always-software-render

Zawsze używaj renderowania programowego.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Ogólne → Inne → Zawsze używaj renderowania programowego
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-always-software-render=N` |

### allow-linux-headless

Zezwól na połączenia przychodzące, jeśli nie ma wyświetlaczy.

Ta opcja wymaga środowiska graficznego, serwera Xorg i GDM, zobacz [PR 3902](https://github.com/rustdesk/rustdesk/pull/3902).

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Ogólne → Inne → Zezwól na obsługę Linuxa bez monitora
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-linux-headless=N` |

### enable-hwcodec

Włącz kodowanie sprzętowe, aby obraz był płynniejszy.

**Lokalizacja**:

1. **K. stacjonarny**
2. **Smartfon** Ustawienia → Kodowanie sprzętowe

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-hwcodec=Y` |

### peer-card-ui-type

Kontroluje widok kart partnerów, obejmuje opcje "Duże kafelki", "Małe kafelki" i "Lista".

**Lokalizacja**:

1. **K. stacjonarny** Strona główna → Panel partnerów → Ikona siatki w prawym górnym rogu
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | 0, 1, 2 | 0 | `peer-card-ui-type=0` |

**0** Duże kafelki
**1** Małe kafelki 
**2** Lista

### peer-sorting

Kontroluje kolejność kart partnerów.

**Lokalizacja**:

1. **K. stacjonarny** Strona główna → Panel partnerów → Ikona sortowania w prawym górnym rogu
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Remote ID, Remote Host, Username | Remote ID | `peer-sorting=Remote ID` |

### sync-ab-with-recent-sessions

Kontroluje, czy synchronizować książkę adresową z ostatnimi sesjami.

**Lokalizacja**:

1. **K. stacjonarny** Strona główna → Panel partnerów → Książka adresowa → Tagi → Menu rozwijane → Synchronizuj z ostatnimi sesjami
2. **Smartfon** Strona główna → Panel partnerów → Książka adresowa → Tagi → Menu rozwijane → Synchronizuj z ostatnimi sesjami

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-with-recent-sessions=N` |

### sync-ab-tags

Kontroluje, czy sortować tagi w książce adresowej.

**Lokalizacja**:

1. **K. stacjonarny** Strona główna → Panel partnerów → Książka adresowa → Tagi → Menu rozwijane → Sortuj tagi
2. **Smartfon** Strona główna → Panel partnerów → Książka adresowa → Tagi → Menu rozwijane → Sortuj tagi

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-tags=N` |

### filter-ab-by-intersection

Filtruj książkę adresową według przecięcia tagów.

**Podgląd**: [PR #5985](https://github.com/rustdesk/rustdesk/pull/5985)

**Lokalizacja**:

1. **K. stacjonarny** Strona główna → Panel partnerów → Książka adresowa → Tagi → Menu rozwijane → Filtruj według przecięcia
2. **Smartfon** Strona główna → Panel partnerów → Książka adresowa → Tagi → Menu rozwijane → Filtruj według przecięcia

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `filter-ab-by-intersection=N` |

### use-texture-render

**Lokalizacja**:

**K. stacjonarny** Ustawienia → Ogólne → Inne → Użyj renderowania tekstury

Użyj renderowania tekstur, aby uzyskać płynniejsze obrazy. Jeśli napotkasz problemy z renderowaniem, możesz wyłączyć tę opcję. Dostępne tylko na komputerach stacjonarnych.

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | linux:Y, macOS:N, win7:N, win10+:Y | `use-texture-render=Y` |

### enable-udp-punch

**Lokalizacja**:

**K. stacjonarny** Ustawienia → Ogólne → Inne → Włącz funkcję przebijania prez NAT (p. UDP)
**Smartfon** Settings → Włącz funkcję przebijania prez NAT (p. UDP)

Dostępne od wersji RustDesk 1.4.1, RustDesk w wersji Pro od 1.6.2

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | Y | `enable-udp-punch=N` |

### enable-ipv6-punch

**Lokalizacja**:

**K. stacjonarny** Ustawienia → Ogólne → Inne → Włącz połączenie IPv6 P2P
**Smartfon** Ustawienia → Ogólne → Inne → Włącz połączenie IPv6 P2P

Dostępne od wersji RustDesk 1.4.1, RustDesk w wersji Pro od 1.6.2

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | selfhost:N, otherwise:Y | `enable-ipv6-punch=N` |

## Ustawienia wyświetlania

### view-only

Ta opcja ustawi opcję "tylko do przeglądania" dla każdego partnera po pierwszym połączeniu.

Wówczas opcja "tylko do przeglądania" w ustawieniach każdego z partnerów będzie kontrolować, czy połączenie jest tylko do przeglądania.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Inne domyślne opcje → Tryb wyświetlania
2. **Smartfon** Ustawienia → Ustawienia wyświetlania → Inne domyślne opcje → Tryb wyświetlania

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `view-only=Y` |

### show-monitors-toolbar

Kontroluje, czy monitory mają być wyświetlane na pasku narzędzi.

![show-monitors-toolbar](/docs/en/self-host/client-configuration/advanced-settings/images/show-monitors-toolbar.png)

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Inne domyślne opcje → Pokaż pasek narzędzi monitorów
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-monitors-toolbar=Y` |

### collapse-toolbar

Kontroluje, czy pasek narzędzi zdalnego sterowania zostanie zwinięty po nawiązaniu połączenia.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Inne domyślne opcje → Zwiń pasek narzędzi
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `collapse-toolbar=Y` |

### show-remote-cursor

Ta opcja ustawi opcję "show-remote-cursor" dla każdego partnera po pierwszym połączeniu.

Wówczas opcja "pokaż kursor zdalny" w ustawieniach każdego z partnerów będzie kontrolować, czy kursor zdalny jest wyświetlany na stronie zdalnego sterowania.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Inne domyślne opcje → Pokaż zdalny kursor
2. **Smartfon** Ustawienia → Ustawienia wyświetlania → Inne domyślne opcje → Pokaż zdalny kursor

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-remote-cursor=N` |

### follow-remote-cursor

Ta opcja ustawi opcję "follow-remote-cursor" dla każdego partnera po pierwszym połączeniu.

Wówczas opcja "follow-remote-cursor" w ustawieniach każdego z partnerów będzie kontrolować, czy należy śledzić kursor zdalny.

**Podgląd**: [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Inne domyślne opcje → Śledź kursor zdalny
2. **Smartfon** Ustawienia → Ustawienia wyświetlania → Inne domyślne opcje → Śledź kursor zdalny

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-cursor=Y` |

### follow-remote-window

Ta opcja ustawi opcję "follow-remote-window" dla każdego partnera po pierwszym połączeniu.

Wówczas opcja "follow-remote-window" w ustawieniach każdego z partnerów będzie kontrolować, czy należy śledzić okno zdalne.

**Podgląd**: [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Inne domyślne opcje → Śledź fokus okna zdalnego
2. **Smartfon** Ustawienia → Ustawienia wyświetlania → Inne domyślne opcje → Śledź fokus okna zdalnego

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-window=Y` |

### zoom-cursor

Ta opcja ustawi opcję "zoom-cursor" dla każdego partnera po pierwszym połączeniu.

Opcja "zoom-cursor" w ustawieniach każdego partnera będzie wtedy kontrolować, czy kursor jest skalowany w oparciu o aktualną skalę obrazu.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Inne domyślne opcje → Zoom kursora
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `zoom-cursor=Y` |

### show-quality-monitor

Ta opcja ustawi opcję "show-quality-monitor" dla każdego partnera po pierwszym połączeniu.

Opcja "pokaż monitor jakości" w ustawieniach każdego z partnerów będzie wtedy kontrolować, czy wyświetlać monitor jakości.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Inne domyślne opcje → Wyświetlaj monitor jakości
2. **Smartfon** Ustawienia → Ustawienia wyświetlania → Inne domyślne opcje → Wyświetlaj monitor jakości

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-quality-monitor=Y` |

### disable-audio

Ta opcja ustawi opcję "disable-audio" dla każdego partnera po pierwszym połączeniu.

Opcja "wyłącz dźwięk" w ustawieniach każdego z partnerów będzie wtedy decydować o tym, czy dźwięk będzie odtwarzany.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Inne domyślne opcje → Wycisz
2. **Smartfon** Ustawienia → Ustawienia wyświetlania → Inne domyślne opcje → Wycisz

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-audio=Y` |

### enable-file-copy-paste

Ta opcja ustawi opcję "enable-file-copy-paste" dla każdego partnera po pierwszym połączeniu.

Opcja "enable-file-copy-paste" w ustawieniach każdego z partnerów będzie wtedy kontrolować włączenie funkcji kopiowania i wklejania plików w połączeniu.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Inne domyślne opcje → Włącz kopiowanie i wklejanie plików (tylko Windows)
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `enable-file-copy-paste=Y` |

### disable-clipboard

Ta opcja ustawi opcję "disable-clipboard" dla każdego partnera po pierwszym połączeniu.

Opcja "disable-clipboard" w ustawieniach każdego partnera będzie wtedy decydować o tym, czy włączyć kopiowanie i wklejanie tekstu.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Inne domyślne opcje → Wyłącz schowek
2. **Smartfon** Ustawienia → Ustawienia wyświetlania → Inne domyślne opcje → Wyłącz schowek

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-clipboard=Y` |

### lock-after-session-end

Ta opcja ustawi opcję "lock-after-session-end" dla każdego partnera po pierwszym połączeniu.

Opcja "lock-after-session-end" w ustawieniach każdego partnera będzie wtedy kontrolować, czy urządzenie partnera ma zostać zablokowane po zakończeniu sesji.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Inne domyślne opcje → Zablokuj po zakończeniu sesji
2. **Smartfon** Ustawienia → Ustawienia wyświetlania → Inne domyślne opcje → Zablokuj po zakończeniu sesji

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `lock-after-session-end=Y` |

### privacy-mode

Ta opcja ustawi opcję "privacy-mode" dla każdego peer po pierwszym połączeniu.

Opcja "privacy-mode" w ustawieniach każdego z partnerów będzie wtedy decydować o tym, czy po nawiązaniu połączenia zostanie włączony tryb prywatności.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Inne domyślne opcje → Tryb prywatności
2. **Smartfon** Ustawienia → Ustawienia wyświetlania → Inne domyślne opcje → Tryb prywatności

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `privacy-mode=Y` |

### i444

Ta opcja ustawi opcję "i444" dla każdego partnera po pierwszym połączeniu.

Opcja "i444" w ustawieniach każdego z partnerów będzie wtedy kontrolować, czy używać prawdziwych kolorów.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Inne domyślne opcje → True color (4:4:4)
2. **Smartfon** Ustawienia → Ustawienia wyświetlania → Inne domyślne opcje → True color (4:4:4)

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `i444=Y` |

### reverse-mouse-wheel

Ta opcja ustawi opcję "reverse-mouse-wheel" dla każdego partnera po pierwszym połączeniu.

Opcja "reverse-mouse-wheel" w ustawieniach każdego partnera będzie wtedy kontrolować, czy kółko myszy ma działać odwrotnie.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Inne domyślne opcje → Odwrócenie działania kółka myszy
2. **Smartfon** Ustawienia → Ustawienia wyświetlania → Inne domyślne opcje → Odwrócenie działania kółka myszy

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `reverse-mouse-wheel=Y` |

### swap-left-right-mouse

Ta opcja ustawi opcję "swap-left-right-mouse" dla każdego partnera po pierwszym połączeniu.

Opcja "swap-left-right-mouse" w ustawieniach każdego partnera pozwoli ci zdecydować, czy chcesz zamienić lewy i prawy przycisk myszy.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Inne domyślne opcje → Zamień lewy i prawy przycisk myszy
2. **Smartfon** Ustawienia → Ustawienia wyświetlania → Inne domyślne opcje → Zamień lewy i prawy przycisk myszy

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `swap-left-right-mouse=Y` |

### displays-as-individual-windows

Ta opcja ustawi opcję "displays-as-individual-windows" dla każdego partnera po pierwszym połączeniu.

Opcja "displays-as-individual-windows" w ustawieniach każdego z partnerów będzie wtedy decydować o tym, czy wyświetlać ekrany jako osobne okna.

**Podgląd**: [PR 5945](https://github.com/rustdesk/rustdesk/pull/5945)

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Inne domyślne opcje → Wyświetlaj ekrany jako osobne okna
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `displays-as-individual-windows=Y` |

### use-all-my-displays-for-the-remote-session

Ta opcja ustawi opcję "use-all-my-displays-for-the-remote-session" dla każdego partnera po pierwszym połączeniu.

Opcja "use-all-my-displays-for-the-remote_session" w ustawieniach każdego z partnerów będzie wtedy kontrolować, czy wszystkie twoje wyświetlacze mają być używane do sesji zdalnej.

**Podgląd**: [PR 6064](https://github.com/rustdesk/rustdesk/pull/6064)

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Inne domyślne opcje → Użyj wszystkich moich wyświetlaczy do sesji zdalnej
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `use-all-my-displays-for-the-remote-session=Y` |

### view-style

Ta opcja ustawi opcję "view-style" dla każdego partnera po pierwszym połączeniu.

Opcja "view-style" w ustawieniach każdego partnera będzie wtedy kontrolować styl widoku.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Domyślny styl widoku
2. **Smartfon** Ustawienia → Ustawienia wyświetlania → Domyślny styl widoku

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | original, adaptive | original | `view-style=original` |

### scroll-style

Ta opcja ustawi opcję "scroll-style" dla każdego partnera po pierwszym połączeniu.

Opcja "scroll-style" w ustawieniach każdego partnera będzie wtedy kontrolować styl przewijania.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Domyślny styl przewijania
2. **Smartfon**

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | scrollauto, scrollbar | scrollauto | `scroll-style=scrollauto` |

### image-quality

Ta opcja ustawi opcję "image-quality" dla każdego partnera po pierwszym połączeniu.

Opcja "image-quality" w ustawieniach każdego partnera będzie wtedy kontrolować jakość obrazu.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Domyślna jakość obrazu
2. **Smartfon** Ustawienia → Ustawienia wyświetlania → Domyślna jakość obrazu

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | best, balanced, low, custom | balanced | `image-quality=balanced` |

### custom-image-quality

Ta opcja ustawi opcję "custom-image-quality" dla każdego partnera po pierwszym połączeniu.

Opcja "custom-image-quality" w ustawieniach każdego partnera będzie wtedy kontrolować jakość obrazu, jeśli opcja "image-quality" jest ustawiona na custom.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Domyślna jakość obrazu → Niestandardowa
2. **Smartfon** Ustawienia → Ustawienia wyświetlania → Domyślna jakość obrazu → Niestandardowa

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | [10.0, 2000.0] | 50.0 | `custom-image-quality=50` |

### custom-fps

Ta opcja ustawi opcję "custom-fps" dla każdego partnera po pierwszym połączeniu.

Opcja "custom-fps" w ustawieniach każdego partnera będzie wtedy kontrolować liczbę klatek na sekundę, jeśli opcja "image-quality" jest ustawiona na custom.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Domyślna jakość obrazu → Niestandardowa
2. **Smartfon** Ustawienia → Ustawienia wyświetlania → Domyślna jakość obrazu → Niestandardowa

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | [5, 120] | 30 | `custom-fps=30` |

### codec-preference

Ta opcja ustawi opcję "codec-preference" dla każdego partnera po pierwszym połączeniu.

Opcja "codec-preference" w ustawieniach każdego partnera będzie wtedy kontrolować kodek dla obrazów.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Domyślny kodek
2. **Smartfon** Ustawienia → Ustawienia wyświetlania → Domyślny kodek

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | auto, vp8, vp9, av1, h264, h265 | auto | `codec-preference=auto` |

**Uwaga**: Opcje inne niż "vp8" i "vp9" mogą nie działać. Zależy to od tego, co obsługuje twoje urządzenie.

### terminal-persistent

Ta opcja ustawi opcję "terminal-persistent" dla każdego partnera po pierwszym połączeniu.

Opcja "terminal-persistent" w ustawieniach każdego partnera będzie wtedy kontrolować, czy sesje terminalowe mają być utrzymywane po rozłączeniu.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Inne domyślne opcje → Zachowaj sesje terminala po rozłączeniu
2. **Smartfon** Ustawienia → Ustawienia wyświetlania → Inne domyślne opcje → Zachowaj sesje terminala po rozłączeniu

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `terminal-persistent=Y` |

### trackpad-speed

Ta opcja ustawi opcję "trackpad-speed" dla każdego partnera po pierwszym połączeniu.

Opcja "trackpad-speed" w ustawieniach każdego partnera będzie wtedy kontrolować liczbę klatek na sekundę, jeśli "trackpad-speed" jest ustawiony na niestandardowy.

**Lokalizacja**:

1. **K. stacjonarny** Ustawienia → Wyświetlanie → Domyślna prędkość trackpada
2. **Smartfon** Ustawienia → Ustawienia wyświetlania → Domyślna prędkość trackpada

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | [10, 1000] | 100 | `trackpad-speed=100` |

## Inne

### preset-address-book-name & preset-address-book-tag

Nazwa i tag wstępnie ustawionej książki adresowej, https://github.com/rustdesk/rustdesk-server-pro/issues/257.
Wartość preset-address-book-name można ustawić tylko wtedy, gdy nie chcesz ustawiać tagu.
Użyj prawidłowej nazwy książki adresowej i tagu na stronie książki adresowej konsoli webowej.

| Option | Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: | :------: |
| preset-address-book-name | N | | | `preset-address-book-name=<nazwa książki adresowej>` |
| preset-address-book-tag | N | | | `preset-address-book-tag=<nazwa tagu książki adresowej>` |

### disable-group-panel

Wyłącz panel grupowy (obok panelu książki adresowej, od wersji 1.3.8 nazywa się "Dostępne urządzenia") w kliencie RustDeska, https://github.com/rustdesk/rustdesk-server-pro/issues/250.

| Option | Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: | :------: |
| disable-group-panel | N | Y, N | N | `disable-group-panel=Y` |

### pre-elevate-service

Automatyczne podnoszenie podczas uruchamiania dla systemu Windows, https://github.com/rustdesk/rustdesk-server-pro/issues/252.

| Option | Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: | :------: |
| pre-elevate-service | N | Y, N | N | `pre-elevate-service=Y` |

### disable-floating-window

Po uruchomieniu usługi Android wyświetli się okno pływające, które zapobiega zamknięciu usługi RustDeska przez system.

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | N | `disable-floating-window=Y` |

### floating-window-size

Po uruchomieniu usługi Android wyświetli się okno pływające, które zapobiega zamknięciu usługi RustDeska przez system. Gdy rozmiar okna jest mniejszy niż 120, trudno będzie je kliknąć. Bardzo mały rozmiar może uniemożliwić utrzymanie usługi w tle na niektórych urządzeniach.

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| [32, 320] | 120 | `floating-window-size=120` |

### floating-window-untouchable

Domyślnie kliknięcie na okno pływające spowoduje wyświetlenie menu. Po ustawieniu opcji "niedotykalne" kliknięcie lub przesunięcie palcem spowoduje przejście przez okno pływające i zostanie przekazane do okna znajdującego się pod spodem. Po ustawieniu opcji "niedotykalne" pozycja okna pływającego nie może zostać zmieniona, a system może automatycznie ustawić okno pływające jako półprzezroczyste. Jednak ta funkcja może nie działać w niewielkiej liczbie aplikacji, takich jak aplikacja GitHub.

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | N | `floating-window-untouchable=Y` |

### floating-window-transparency

Okna pływające w systemie Android mają regulowaną przezroczystość. Jeśli chcesz włączyć okno pływające, ale je ukryć, możesz ustawić przezroczystość na 0. Okno pływające zostanie automatycznie ustawione jako 'niedotykalne', aby przepuszczać zdarzenia kliknięcia.

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| [0, 10] | 10 | `floating-window-transparency=5` |

### floating-window-svg

Jeśli nie ustawiono ikony dla pływającego okna systemu Android, domyślnie wyświetlana będzie ikona RustDeska.
Podczas ustawiania należy wpisać treść tekstową SVG w jednym wierszu i zwrócić uwagę na [ograniczenia obsługi SVG](https://bigbadaboom.github.io/androidsvg/index.html).

| Domyślnie | Przykład |
| :------: | :------: |
| Ikona RustDeska | `floating-window-svg=<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1717559129252" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4248" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M950.857143 512c0 242.285714-196.571429 438.857143-438.857143 438.857143S73.142857 754.285714 73.142857 512 269.714286 73.142857 512 73.142857s438.857143 196.571429 438.857143 438.857143z" fill="#1296db" p-id="4249"></path></svg>` |

### keep-screen-on

Dotyczy to kontrolowanego Androida. Należy pamiętać, że utrzymanie ekranu w stanie włączonym zależy od okna pływającego.

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| never, during-controlled, service-on | during-controlled | `keep-screen-on=never` |

### enable-directx-capture

Dotyczy to kontrolowanego Windowsa. Jeśli nie napotkasz żadnych problemów, zaleca się korzystanie z ustawień domyślnych, które priorytetowo traktują użycie DirectX do tworzenia zrzutów ekranu zamiast bezpośredniego użycia GDI.

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | Y | `enable-directx-capture=N` |

### enable-android-software-encoding-half-scale

Dotyczy to kontrolowanego Androida. Domyślnie, gdy rozdzielczość jest większa niż 1200, kodowanie sprzętowe wykorzystuje oryginalną rozdzielczość, natomiast kodowanie programowe wykorzystuje połowę rozdzielczości, ponieważ kodowanie programowe jest wolniejsze. Ta opcja służy do ustawienia, czy kodowanie programowe powinno być skalowane do połowy rozdzielczości.

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | Y | `enable-android-software-encoding-half-scale=N` |

### allow-remote-cm-modification

Kontroluje, czy strona kontrolująca może klikać okno zarządzania połączeniami w celu akceptowania połączeń, zmiany uprawnień itp.

https://github.com/rustdesk/rustdesk/issues/7425

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | N | `allow-remote-cm-modification=Y` |

### remove-preset-password-warning

Kontroluje, czy usunąć ostrzeżenie dotyczące bezpieczeństwa w GUI, gdy w niestandardowym kliencie istnieje wstępnie ustawione hasło.

https://github.com/rustdesk/rustdesk-server-pro/discussions/286

https://github.com/rustdesk/rustdesk/discussions/7956

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | Y | `remove-preset-password-warning=Y` |

### hide-security-settings / hide-network-settings / hide-server-settings / hide-proxy-settings / hide-websocket-settings / hide-remote-printer-settings

Kontroluje, czy ukrywać niektóre ustawienia. Upewnij się, że opcja `Wyłącz ustawienia` jest wyłączona, w przeciwnym razie nie będą one działać.

https://github.com/rustdesk/rustdesk-server-pro/issues/263

https://github.com/rustdesk/rustdesk-server-pro/issues/276

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | N | `hide-security-settings=Y` |

### hide-username-on-card

Kontroluje, czy wyświetlać nazwę użytkownika na liście urządzeń. Ponieważ czasami nazwa użytkownika jest zbyt długa, może zasłaniać inne informacje.

https://github.com/rustdesk/rustdesk-server-pro/issues/284#issuecomment-2216521407

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | N | `hide-username-on-card=Y` |

### hide-help-cards

Kontroluje, czy wyświetlać ostrzeżenia UAC / ostrzeżenia o uprawnienieniach w GUI.

https://github.com/rustdesk/rustdesk/issues/8687

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | N | `hide-help-cards=Y` |

### display-name

Zmień swoją nazwę wyświetlaną, która będzie widoczna w oknie podręcznym po połączeniu się z urządzeniem zdalnym. Domyślnie wyświetlana jest najpierw nazwa użytkownika logującego się, w przeciwnym razie wyświetlana jest nazwa użytkownika systemu operacyjnego.

https://github.com/rustdesk/rustdesk-server-pro/issues/277

### disable-udp

Kontroluje, czy używać wyłącznie protokołu TCP. Nie będzie już używać protokołu UDP 21116, zamiast tego zostanie użyty protokół TCP 21116.

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | N | `disable-udp=Y` |

### preset-user-name / preset-strategy-name / preset-device-group-name

Przypisz użytkownika / strategię / grupę urządzeń do urządzenia. Możesz to również zrobić za pomocą [wiersza poleceń](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/#assign-device-usersgroupsstrategies-to-devices).

https://github.com/rustdesk/rustdesk-server-pro/discussions/304

funkcja grup urządzeń jest dostępna w klientach RustDeska >=1.3.8, pro >= 1.5.0

### default-connect-password

Używasz `domyślnego hasła połączenia`, żeby połączyć się z urządzeniami zdalnymi. Hasło to jest konfigurowane po stronie kontrolującej i nie należy go mylić z żadnym [hasłem domyślnym](https://github.com/rustdesk/rustdesk/wiki/FAQ#how-can-we-set-up-a-client-with-a-fixed-password-for-unattended-remote-access) znajdującym się na kliencie kontrolowanym (tylko przychodzącym).
np. `default-connect-password=abcd1234`

### enable-trusted-devices

Zezwól zaufanym urządzeniom na pominięcie weryfikacji 2FA.

https://github.com/rustdesk/rustdesk/discussions/8513#discussioncomment-10234494

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | Y | `enable-trusted-devices=N` |

### hide-tray

Wyłącz ikonę w zasobniku systemowym.

https://github.com/rustdesk/rustdesk-server-pro/issues/332

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | N | `hide-tray=Y` |

### one-way-clipboard-redirection

Wyłącz synchronizację schowka ze strony kontrolowanej do strony kontrolującej, dostępne w kliencie RustDeska >=1.3.1 (strona kontrolowana)

https://github.com/rustdesk/rustdesk/discussions/7837

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | N | `one-way-clipboard-redirection=Y` |

### one-way-file-transfer

Wyłącz transfer plików ze strony kontrolowanej do strony kontrolującej, dostępne w kliencie RustDeska >=1.3.1 (strona kontrolowana)

https://github.com/rustdesk/rustdesk/discussions/7837

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | N | `one-way-file-transfer=Y` |


### sync-init-clipboard

Jeśli synchronizujesz początkowy schowek podczas nawiązywania połączenia (tylko od strony kontrolującej do strony kontrolowanej), dostępne w kliencie RustDeska >=1.3.1 (strona kontrolująca)

https://github.com/rustdesk/rustdesk/discussions/9010

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | N | `sync-init-clipboard=Y` |

### allow-logon-screen-password

Jeśli zezwolisz na wprowadzanie hasła na ekranie logowania podczas korzystania z trybu zatwierdzania wyłącznie kliknięciem (https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#approve-mode), dostępnego w kliencie RustDeska >=1.3.1 (strona kontrolowana).

https://github.com/rustdesk/rustdesk/discussions/9269

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | N | `allow-logon-screen-password=Y` |

### allow-https-21114

Zazwyczaj protokół HTTPS korzysta z portu 443. Jeśli port serwera API zostanie błędnie ustawiony na 21114, klient RustDesak domyślnie usunie ustawienie portu 21114. Ustawienie opcji na Y pozwala na użycie portu 21114 jako portu HTTPS. Dostępne w kliencie RustDeska >=1.3.9.

https://github.com/rustdesk/rustdesk-server-pro/discussions/570

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | N | `allow-https-21114=Y` |

### allow-d3d-render

Renderowanie D3D pozwala uzyskać wysoką liczbę klatek na sekundę i zmniejszyć obciążenie procesora, ale na niektórych urządzeniach ekran zdalnego sterowania może być czarny. Dostępne w kliencie RustDeska >=1.3.9, tylko dla systemu Windows.

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | N | `allow-d3d-render=Y` |

### allow-hostname-as-id

[Użyj nazwy hosta jako identyfikatora] (https://github.com/rustdesk/rustdesk-server-pro/discussions/483), spacje w nazwie hosta są zastępowane znakiem „-”. Nie jest to gwarantowane w 100% i ma miejsce tylko przy pierwszym uruchomieniu klienta RustDeska (tj. na nowo zainstalowanym kliencie); w przypadku konfliktu zostanie przypisany losowy identyfikator.

Dostępne w kliencie RustDeska w wersji 1.4.0 i nowszych.

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | N | `allow-hostname-as-id=Y` |

### allow-websocket

Użyj protokołu WebSocket do połączenia serwera i klienta. Dostępne tylko w kliencie RustDeska >=1.4.0 i serwerze Pro >= 1.5.7. Należy pamiętać, że WebSocket obsługuje tylko połączenia przekaźnikowe.

Aby WebSocket działał poprawnie, należy odpowiednio skonfigurować zwrotny serwer proxy, https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | N | `allow-websocket=Y` |

### allow-numeric-one-time-password

Ta opcja włącza lub wyłącza użycie jednorazowych haseł składających się wyłącznie z cyfr.
Dostępna tylko w kliencie RustDeska >=1.4.1 i serwerze Pro >= 1.5.9.

**Dyskusja**: https://github.com/rustdesk/rustdesk-server-pro/discussions/685

**Podgląd**: https://github.com/rustdesk/rustdesk/pull/11846

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | N | `allow-numeric-one-time-password=Y` |

### register-device

Nie rejestruj urządzenia, nie będzie ono widoczne na stronie urządzeń w konsoli webowej.

**Dostępne tylko w serwerze Pro >= 1.6.0 i wymaga [licencji custom2](https://rustdesk.com/pricing#custom2) oraz liczby jednoczesnych połączeń >= 2.**

Jeśli `register-device=N`, poniższe nie będzie działać dla tego urządzenia.
- Logowanie się
- Polecenie `--assign`
- `preset-address-book-name`, `--preset-address-book-tag`, `preset-user-name`, `preset-strategy-name`, `preset-device-group-name`
- Dzienniki audytowe
- Strategie

**Dyskusje**: https://github.com/rustdesk/rustdesk-server-pro/discussions/672 i https://github.com/rustdesk/rustdesk-server-pro/discussions/182

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | Y | `register-device=N` |

### main-window-always-on-top

Zawsze trzymaj główne okno na wierzchu.

**Dyskusja**: https://github.com/rustdesk/rustdesk-server-pro/issues/761

Dostępne tylko w kliencie RustDesk 1.4.2.

| Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `main-window-always-on-top=N` |

### relay-server

https://github.com/rustdesk/rustdesk-server-pro/issues/776#issuecomment-3306524913

### disable-discovery-panel

Wyłącz panel "Odkryte" (obok panelu "Ulubione") w kliencie RustDesk.

| Opcja | Wymagana instalacja | Wartości | Domyślne | Przykład |
| :------: | :------: | :------: | :------: | :------: |
| disable-discovery-panel | N | Y, N | N | `disable-discovery-panel=Y` |

### touch-mode

Kontroluje, czy podczas sesji zdalnego sterowania używany jest tryb dotykowy czy tryb myszy.

#### Różnice w zachowaniu w zależności od wersji

##### RustDesk (strona kontrolująca) < 1.4.3

Po pierwszym połączeniu ta opcja ustawia parametr "touch-mode" dla każdego peer. Następnie indywidualne ustawienia każdego peer decydują o użyciu trybu dotykowego lub trybu myszy.

**Lokalizacja**:

1. **Desktop**
2. **Mobile** Ustawienia → Ekran → Inne domyślne opcje → Tryb dotyku

##### RustDesk (strona kontrolująca) >= 1.4.3

Opcja ta jednolicie kontroluje, czy wszystkie urządzenia peer używają trybu dotykowego czy trybu myszy, nadpisując indywidualne ustawienia urządzeń.

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | N | `touch-mode=Y` |

### show-virtual-mouse

https://github.com/rustdesk/rustdesk/pull/12911

Kontroluje wyświetlanie wirtualnego kursora przy trybie mobile → desktop.

**Lokalizacja**:

1. **Desktop**
2. **Mobile** Sesja zdalna → dolny pasek nawigacji → pomocnik gestów

Dostępne od RustDesk 1.4.3

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | N | `show-virtual-mouse=Y` |

**Uwaga**: Opcja ta powinna być skonfigurowana w **Default settings**, a nie w **Override settings**.

### show-virtual-joystick

https://github.com/rustdesk/rustdesk/pull/12911

Kontroluje wyświetlanie wirtualnego joysticka przy trybie mobile → desktop.

Opcja ta wymaga, aby **show-virtual-mouse** był włączony.

**Lokalizacja**:

1. **Desktop**
2. **Mobile** Sesja zdalna → dolny pasek nawigacji → pomocnik gestów

Dostępne od RustDesk 1.4.3

| Wartości | Domyślnie | Przykład |
| :------: | :------: | :------: |
| Y, N | N | `show-virtual-joystick=Y` |

**Uwaga**: Opcja ta powinna być skonfigurowana w **Default settings**, a nie w **Override settings**.
