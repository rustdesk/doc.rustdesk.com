---
title: Instalacja
weight: 1
---

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

From there, note down the IP/DNS and Key shown at the end of the install and insert those into your client Settings > Network > ID/Relay server `ID server` and `Key` fields, respectively, leaving the other fields blank (see note below).

Następnie zapisz adres IP/DNS i klucz wyświetlone na końcu instalacji i wprowadź je odpowiednio w ustawieniach klienta > Sieć > Serwer identyfikacyjny/serwer przekaźnikowy w polach `Serwer ID` i `Klucz`, pozostawiając pozostałe pola puste (patrz uwaga poniżej).

### Metoda 3.: Zainstaluj własny serwer jako usługę systemd przy użyciu pliku deb dla dystrybucji Debiana

Please [Download](https://github.com/rustdesk/rustdesk-server/releases/latest) deb files yourself and install with `apt-get -f install <filename>.deb` or `dpkg -i <filename>.deb`.

Musiz samodzielnie [pobrać](https://github.com/rustdesk/rustdesk-server/releases/latest) pliki deb i zainstalować je za pomocą polecenia `apt-get -f install <nazwa pliku>.deb` lub `dpkg -i <nazwa pliku>.deb`.

## Skonfiguruj klienta
Sprawdź ten [artykuł](/docs/pl/self-host/client-configuration/#2-ręczna-konfiguracja).
