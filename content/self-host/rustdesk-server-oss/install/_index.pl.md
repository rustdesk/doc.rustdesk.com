---
title: Instalacja
weight: 1
description: "Dokumentacja RustDesk dotycząca Instalacja. Zawiera instrukcje instalacji, konfiguracji, wdrażania i rozwiązywania problemów."
keywords: ["rustdesk server install", "install rustdesk server oss", "rustdesk docker install", "rustdesk server firewall ports", "rustdesk hbbs hbbr install", "rustdesk self-host install"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## Szybka odpowiedź

W większości nowych wdrożeń RustDesk Server OSS najszybszą ścieżką jest Docker. Z natywnej instalacji Linuksa warto skorzystać tylko wtedy, gdy naprawdę potrzebujesz usług systemowych albo ręcznie utrzymywanej konfiguracji hosta.

## Najważniejsze punkty

- Klienci potrzebują wartości `ID Server`
- Klienci potrzebują publicznego serwerowego `Key`
- `API Server` jest potrzebny tylko przy korzystaniu z funkcji Pro

<!-- GEO-LOCALIZED-INTRO:END -->

## Poradniki wideo
Na YouTubie znajduje się wiele poradników, https://github.com/rustdesk/rustdesk/wiki/FAQ#video-tutorials.

## Wymagania sprzętowe
Wymagania sprzętowe są bardzo niskie; wystarczy podstawowa konfiguracja serwera w chmurze, a wymagania dotyczące procesora i pamięci są minimalne. Można również użyć Raspberry Pi lub podobnego urządzenia. Jeśli chodzi o rozmiar sieci, w przypadku niepowodzenia bezpośredniego połączenia przebijania się przez NAT (TCP), użyty zostanie ruch przekaźnikowy. Ruch połączenia przekaźnikowego wynosi od 30 K/s do 3 M/s (ekran 1920x1080) w zależności od ustawień rozdzielczości i aktualizacji ekranu. Jeśli jest to tylko do celów pracy biurowej, ruch wynosi około 100 K/s.

## Zapora sieciowa
Jeśli masz zainstalowany program UFW, użyj następujących poleceń, aby skonfigurować zaporę sieciowa:
```
ufw allow 21114:21119/tcp
ufw allow 21116/udp
sudo ufw enable
```

{{% notice warning %}}
Gdy WebSocket jest włączony (porty `21118`/`21119` są otwarte dla [klienta webowego](https://rustdesk.com/web/)), `hbbs`/`hbbr` ufają nagłówkom `X-Real-IP` / `X-Forwarded-For` przychodzących połączeń WebSocket, aby ustalić prawdziwy adres IP klienta — dzięki temu adres IP klienta nie jest tracony, gdy ruch WebSocket przechodzi przez reverse proxy ([WSS](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms)). Nagłówki te nie są weryfikowane, więc każdy, kto może bezpośrednio połączyć się z `21118`/`21119`, może sfałszować dowolny adres IP za pomocą spreparowanych nagłówków, omijając ograniczanie liczby żądań i blokady oparte na IP oraz fałszując adresy IP zapisywane w logach.

Jeżeli używasz klienta webowego, udostępniaj porty WebSocket wyłącznie przez reverse proxy, które samo ustawia `X-Real-IP`, i ogranicz regułami zapory dostęp do `21118`/`21119` tak, aby mogło się z nimi łączyć tylko reverse proxy. Jeżeli nie używasz klienta webowego, pozostaw porty `21118` i `21119` zamknięte.
{{% /notice %}}

## Instalacja
### Metoda 1.: Docker (zalecana)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/oss.yml -O compose.yml
sudo docker compose up -d
```

Po więcej szczegółów, sprawdź [Docker](/docs/pl/self-host/rustdesk-server-oss/docker/).

### Metoda 2.: Zainstaluj własny serwer jako usługę systemd za pomocą prostego skryptu instalacyjnego
Skrypt jest hostowany na koncie [Techaholda](https://github.com/techahold/rustdeskinstall) i wspierany na naszym [Discordzie](https://discord.com/invite/nDceKgxnkV).

Obecnie skrypt pobiera i konfiguruje serwery przekaźnikowe i sygnałowe (hbbr i hbbs), generuje konfiguracje i umieszcza je na stronie internetowej chronionej hasłem, aby ułatwić wdrażanie u klientów.

Wykonaj następujące polecenia:
```
wget https://raw.githubusercontent.com/techahold/rustdeskinstall/master/install.sh
chmod +x install.sh
./install.sh
```

W repozytorium [Techaholda](https://github.com/techahold/rustdeskinstall) znajduje się również skrypt aktualizacyjny.

Następnie zapisz adres IP/DNS i klucz wyświetlone na końcu instalacji i wprowadź je odpowiednio w ustawieniach klienta > Sieć > Serwer identyfikacyjny/serwer przekaźnikowy w polach `Serwer ID` i `Klucz`, pozostawiając pozostałe pola puste (patrz uwaga poniżej).

### Metoda 3.: Zainstaluj własny serwer jako usługę systemd przy użyciu pliku deb dla dystrybucji Debiana

Musisz samodzielnie [pobrać](https://github.com/rustdesk/rustdesk-server/releases/latest) pliki deb i zainstalować je za pomocą polecenia `apt-get -f install <nazwa pliku>.deb` lub `dpkg -i <nazwa pliku>.deb`.

## Skonfiguruj klienta
Sprawdź ten [artykuł](/docs/pl/self-host/client-configuration/#2-ręczna-konfiguracja).
