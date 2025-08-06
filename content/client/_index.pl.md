---
title: Klient RustDesk
weight: 2
pre: "<b>1. </b>"
---

## Wstęp
Klient służy do łączenia przez nasz serwer RustDeska (open source lub wersji Pro), który jest dostępny do pobrania na [GitHubie](https://github.com/rustdesk/rustdesk/releases/latest).

## Wspierane platformy
- Microsoft Windows
- macOS
- Pochodne Debiana (Ubuntu ≥ 16, Linux Mint, itd.)
- Pochodne Red Hata (CentOS, Fedora ≥ 18, Rocky Linux, etc.)
- Arch Linux/Manjaro
- openSUSE
- NixOS
- AppImage / Flatpak
- Android
- iOS (brak wsparcia dla bycia sterowanym)
- przeglądarki

## Instalacja

### Windows

Pobierz exe z GitHuba i zainstaluj.

Aby zainstalować w trybie cichym, wywołaj instalkę z parametrem `--silent-install`.

### macOS

Pobierz plik dmg z GitHuba. Więcej informacji znajdziesz na [stronie dedykowanej macOSowi](https://rustdesk.com/docs/en/client/mac/).

Otwórz plik dmg i przeciągnij `RustDesk` do `Aplikacji`.

Zezwól RustDeskowi na uruchomienie.

Zezwól na żądane uprawnienia i postępuj zgodnie z instrukcjami wyświetlanymi po lewej stronie RustDeska, aby zakończyć instalację.

### Linux

Zobacz poniższe instrukcje aby zainstalować na różnych dystrybucjach Linuxa (instalatory są dostępne na GitHubie oraz w repozytoriach dystrybucji).

#### Pochodne Debiana

```sh
# zignoruj błędny raport zużycia miejsca na dysku
sudo apt install -fy ./rustdesk-<version>.deb
```

#### Pochodne Red Hata

```sh
sudo yum localinstall ./rustdesk-<version>.rpm
```

#### Arch Linux/Manjaro

```sh
sudo pacman -U ./rustdesk-<version>.pkg.tar.zst
```

#### openSUSE (≥ Leap 15.0)

```sh
sudo zypper install --allow-unsigned-rpm ./rustdesk-<version>-suse.rpm
```

#### Nix / NixOS (≥ 22.05)

Tymczasowo wejdź w shella z `rustdesk`iem gotowym do uruchomienia:

```sh
nix shell nixpkgs#rustdesk
```

Zainstaluj w profilu bieżącego użytkownika:

```sh
nix profile install nixpkgs#rustdesk
```

Aby zainstalować systemowo w NixOSie wykonaj, `nixos-rebuild switch --flake /etc/nixos` po edycji `configuration.nix`:

```
  environment.systemPackages = with pkgs; [
    ...
    rustdesk
  ];
```

### Android

Zainstaluj apk z naszego GitHuba. Więcej informacji możesz znaleźć na [stronie dedykowanej Androidowi](https://rustdesk.com/docs/en/client/android/).

### iOS (iPhone, iPad)

Pobierz aplikację z [App Store'u](https://apps.apple.com/us/app/rustdesk-remote-desktop/id1581225015).

## Użycie

Po instalacji (albo uruchomieniu jako tymczasowy plik wykonwyalny) RustDesk połączy się z publicznymi serwerami. Na dole pojawi się komunikat (1) "Gotowy, Do szybszego połączenia, skonfiguruj swój właśny serwer". W lewym gównym rogu zobaczysz swoje (2) ID, (3) jednorazowe hasło, a po prawej (4) pole tekstowe do wpisania ID komputera, z którym chcesz się połączyć.

<!-- TODO: Add Polish version image -->
![](/docs/en/client/images/client.png)

Aby zobaczyć ustawienia, naciśnij na (5) przycisk Menu [ &#8942; ] z prawej strony ID.

W ustawieniach znajdziesz:
- Ogólne - Sterowanie usługą, Motyw, Kodek sprzętowy, Audio, Nagrywanie i Język
- Zabezpieczenia - Uprawnienia dla osoby przejmującej kontrolę, Opcje hasła, możliwość zmiany ID oraz zaawansowane ustawienia zabezpieczeń
- Sieć - Tutaj możesz ustawić własne ustawienia serwera i proxy.
- Wyświetlanie - Kontroluj ustawienia wyświetlania dla zdalnych sesji i inne domyślne opcje, synchronizację schowka itd.
- Konto - Można to wykorzystać w połączeniu z serwerem profesjonalnym do logowania się do API.
- O aplikacji - Wyświetla informacje o oprogramowaniu.

## Konfigurowanie RustDeska
Jest wiele sposobów na konfigurowanie RustDeska.

Najłatwiejszym sposobem jest używanie serwera profesjonalnego RustDeska, za pomocą którego możesz otrzymać zaszyfrowany string konfiguracyjny. Może on być używany w połączeniu z `--config` w celu zaimportowania ustawień. Aby to zrobić:
1. Uruchom wiersz poleceń w miejscu gdzie RustDesk jest zainstalowany, np.: `C:\Program Files\RustDesk` na Windowsie, `/usr/bin` na Linuxie.
2. Użyj polecenia `rustdesk.exe --config twoj-zaszyfrowany-string` np. `rustdesk.exe --config 9JSPSvJzNrBDasJjNSdXOVVBlERDlleoNWZzIHcOJiOikXZr8mcw5yazVGZ0NXdy5CdyciojI0N3boJye`.

Możesz także ręcznie skonfigurować klienta. Aby to zrobić:
1. Naciśnij na Ustawienia.
2. Kliknij na Sieć.
3. Kliknij na Odblokuj ustawienia sieciowe.
4. Wprowadź swoje ID,  Relay, API (jeżeli korzystasz z serwera pro) oraz swój klucz.

<!-- TODO: Add Polish version image -->
![](/docs/en/client/images/network-settings.png)

Jeżeli ręcznie skonfigurujesz klienta, możesz uzyskać plik `RustDesk2.toml` (z katalogu użytkownika) i użyć opcji `--import-config` w podobny sposób jak w powyższym przykładzie.

## Parametry wiersza poleceń
- `--password` może zostać użyte do ustawienia stałego hasła.
- `--get-id` może zostać użyte do pozyskania ID.
- `--set-id` może zostać użyte do ustawienia ID - pamiętaj, że ID musi zaczynać się od litery.
- `--silent-install` może zostać użyte do instalacji RustDeska na Windowsie w trybie cichym.

Dodatkowe zaawansowane parametry mogą zostać znalezione [tutaj](https://github.com/rustdesk/rustdesk/blob/bdc5cded221af9697eb29aa30babce75e987fcc9/src/core_main.rs#L242).

{{% children depth="3" showhidden="true" %}}
