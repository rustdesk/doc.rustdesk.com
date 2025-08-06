---
title: Konfiguracja serwerów przekaźnikowych
weight: 17
---

## RustDesk Pro - Instalacja dodatkowych serwerów relay z geolokalizacją przy użyciu Dockera

{{% notice note %}}
[Podstawowa instalacja](https://rustdesk.com/docs/pl/self-host/rustdesk-server-pro/installscript/) automatycznie tworzy serwer relay (proces `hbbr`) na tej samej maszynie - nie trzeba go konfigurować osobno.

Jeśli chcesz dodać kolejny serwer relay na innej maszynie, uruchom `hbbr` zgodnie z [instrukcją instalacji OSS](https://rustdesk.com/docs/pl/self-host/rustdesk-server-oss/install/). Plik `hbbr` znajdziesz w:
- `rustdesk-server-linux-amd64.tar.gz`
- `rustdesk-server-hbbr_<wersja>-<arch>.deb` 
- `rustdesk-server-windows-x86_64.tar.gz`
- lub w obrazie Dockera (`sudo docker run ... rustdesk/rustdesk-server-pro hbbr`)

`hbbr` nie wymaga licencji i jest identyczny jak w wersji open source.
{{% /notice %}}

Możesz uruchomić wiele serwerów relay na całym świecie i wykorzystywać automatyczną geolokalizację, aby łączyć się z najbliższym serwerem - zapewnia to szybsze połączenia z zdalnymi komputerami. Proces `hbbs` automatycznie sprawdza dostępność serwerów relay co kilka sekund i wybiera tylko te aktywne.

{{% notice note %}}
Znany problem: https://github.com/rustdesk/rustdesk/discussions/7934
{{% /notice %}}

> Będziesz potrzebować pary kluczy prywatnych `id_ed25519` i `id_ed25519.pub`.

1 - Jeśli docker jest już zainstalowany, połącz się z serwerem przez SSH i utwórz wolumin dla hbbr.

```
# docker volume create hbbr
```

Wolumin hbbr powinien znajdować się w `/var/lib/docker/volumes/hbbr/_data`.

2 - Skopiuj parę kluczy prywatnych do lokalizacji woluminu. W tym przypadku użyjemy SCP do skopiowania plików.

Polecenie to `scp <ścieżka/nazwa pliku> nazwa użytkownika@serwer:</ścieżka docelowa>`.

```
# scp id_ed25519 root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
# scp id_ed25519.pub root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
```

3 - Wdróż kontener hbbr przy użyciu utworzonego wcześniej woluminu. Wolumin ten zawiera parę kluczy prywatnych niezbędnych do uruchomienia prywatnego serwera przekaźnikowego.

```
# sudo docker run --name hbbr -v hbbr:/root -td --net=host rustdesk/rustdesk-server hbbr -k _
```

4 - Sprawdź logi działania, aby upewnić się, że hbbr działa przy użyciu twojej pary kluczy.

```
# docker logs hbbr

INFO [src/common.rs:121] **Private key comes from id_ed25519**
NFO [src/relay_server.rs:581] Key: XXXXXXXXXXXXXXXXXXXXX
INFO [src/relay_server.rs:60] #blacklist(blacklist.txt): 0
INFO [src/relay_server.rs:75] #blocklist(blocklist.txt): 0
INFO [src/relay_server.rs:81] Listening on tcp :21117
```

W zależności od systemu operacyjnego możesz chcieć zablokować/zezwolić na adresy IP za pomocą zapory sieciowej.

W naszym przypadku, korzystając z systemu Ubuntu, chcemy zezwolić na wszystkie połączenia TCP z portami 21117 i 21119.

```
# sudo ufw allow proto tcp from any to any port 21117,21119
```

**Włącz zaporę sieciową**
```
# sudo ufw enable
```

**Sprawdź stan**
```
# ufw status

Status: active

To                         Action      From
--                         ------      ----
21117,21119/tcp            ALLOW       Anywhere
21117,21119/tcp (v6)       ALLOW       Anywhere (v6)
```

## Konfiguracja geolokalizacji w RustDesku Pro przez konsolę webową

### Rejestracja i pobranie bazy danych GeoLite2 City

Aby korzystać z geolokalizacji, hbbs wymaga dostępu do bazy danych MaxMind GeoLite2 City. Baza jest darmowa - wystarczy zarejestrować się, aby pobrać plik i uzyskać klucz API.

1. Załóż konto na [stronie MaxMind](https://www.maxmind.com/en/account/login) (jeśli go nie masz)
2. Przejdź do `Download Databases` i pobierz GeoLite2 City (wybierz plik gzip)
3. Po rozpakowaniu otrzymasz plik z rozszerzeniem `.mmdb`

<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/e14318fb-ec52-463c-af77-d08c9479c1b5">

**Lokalizacja pliku:**
- Dla instalacji skryptem na Linux: `/var/lib/rustdesk-server/`
- Dla Dockera: w woluminie mapowanym do `/root`

### Automatyzacja aktualizacji (serwery Linux)

Bazę należy regularnie aktualizować. Można to zautomatyzować przez cron, wykorzystując klucz API:

1. W panelu MaxMind przejdź do `Manage License Keys`
2. Wygeneruj nowy klucz licencyjny

<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/632aeb33-4f5d-4a31-9010-38e01c22d3c9">
<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/3e178174-5fbf-46b7-a335-01f77125dfad">

Proces pobierania można zautomatyzować na kilka sposobów ([dokumentacja](https://dev.maxmind.com/geoip/updating-databases)). Poniższe polecenie można dodać do crontaba (zastąp `{Your Access Key}` swoim kluczem API):

```
/usr/bin/curl -L --silent 'https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key={Your Access Key}&suffix=tar.gz' | /bin/tar -C '/var/lib/rustdesk-server/' -xvz --keep-newer-files --strip-components=1 --wildcards '*GeoLite2-City.mmdb'
```

### Zmiana ustawień w konsoli webowej RustDesk Pro

Dodaj adresy IP lub nazwy DNS swoich serwerów przekaźnikowych (DNS jest obsługiwane od wersji 1.1.11) w sekcji `Serwery przekaźnikowe`. **Port nie jest wymagany, jawnie używany jest port `21117`.** <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/c4452ba4-5e1d-437a-ae1d-fc0070bfa26c">

Dodaj nadpisanie geolokalizacji, wprowadzając adres IP serwera oraz współrzędne, w których serwer jest zlokalizowany. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/41c558e3-423b-4296-90d3-cb0769f4a369">

Kliknij `Reload Geo`, a Twoja lista powinna wyglądać podobnie do tej. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/5a0d39a9-4fec-46b4-a7a2-7ed38b6baeb7">

Aby potwierdzić wyniki, sprawdź logi hbbs po kliknięciu `Reload Geo`. Powinieneś zobaczyć komunikat pokazujący adresy IP serwerów przekaźnikowych i ich współrzędne.

> Jeśli używasz RustDeska Pro na maszynie z systemem Linux, użyj polecenia `RUST_LOG=debug ./hbbs`, aby wyświetlić logi. Jeśli korzystasz z kontenera Dockerowego, użyj `docker logs hbbs`.

```
RUST_LOG=debug ./hbbs

INFO [src/common.rs:130] GEOIP_FILE: ./GeoLite2-City.mmdb
INFO [src/common.rs:159] override 1xx.xxx.xxx.x7: -1.xx 5x.xxx
[src/common.rs:159] override 1xx.xxx.xxx.xx8: -3.xxx 5x.xxxx
[src/common.rs:159] override 7xx.xxx.xxxx.xx1: 6.xxx 5x.xxxx
GEOIP_FILE loaded, #overrides 3
INFO [src/common.rs:119] relay-servers=["1xx.xxx.xxx.x7", "1xx.xxx.xxx.xx8", "7xx.xxx.xxx.xx1"]
NFO [src/rendezvous_server.rs:1467] parsed relay servers: [("1xx.xxxx.xxx.xx7", Some((-1x, xxx))), ("1xx.xxx.xxx.xx8", Some((-3x, xxx))), ("7xx.xxx.xxx.xx1", Some((6x, xxx)))]
```

Możesz również potwierdzić żądania przekaźnika bezpośrednio na swoich instancjach hbbr, po prostu sprawdzając logi kontenera.

```
# docker logs hbbr

INFO [src/relay_server.rs:436] Relayrequest 0593e64e-4fe8-4a59-a94f-b3420ab043eb from [::ffff:100.100.123.233]:52038 got paired
INFO [src/relay_server.rs:442] Both are raw
```
