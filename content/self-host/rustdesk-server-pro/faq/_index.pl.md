---
title: FAQ
weight: 600
---

## Jak zainstalować za pomocą prostego skryptu instalacyjnego?
1. Uzyskaj licencję ze strony [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html). Więcej szczegółów znajdziesz na stronie [licencji](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/).
2. Przygotuj VPS, serwer fizyczny lub maszynę wirtualną z systemem Linux.
3. Jeśli chcesz użyć DNS i SSL, utwórz nazwę DNS, np. `rustdesk.twojadomena.com`.
4. Przejdź na [tę stronę](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#install).
5. Skopiuj i wklej polecenie do terminala Linux.
6. Postępuj zgodnie z instrukcjami wyświetlanymi podczas instalacji.
7. Po zakończeniu instalacji otwórz `https://rustdesk.twojadomena.com` lub `http://twoj.adres.ip:21114`.
8. Zaloguj się przy użyciu nazwy użytkownika `admin` i hasła `test1234`.
9. Wprowadź kod licencyjny zakupiony w kroku 1.

## Jak przekonwertować serwer RustDesk OSS na wersję Pro?
1. Uzyskaj licencję ze strony [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html). Więcej szczegółów znajdziesz na stronie [licencji](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/).
2. Otwórz port TCP 21114.
3. Zaloguj się do swojego serwera RustDesk.
4. Jeśli nie używałeś DNS i chcesz skorzystać z SSL, utwórz nazwę DNS, np. `rustdesk.twojadomena.com`.
5. Przejdź na [tę stronę](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#convert-from-open-source).
6. Skopiuj i wklej polecenie do terminala Linux.
7. Postępuj zgodnie z instrukcjami wyświetlanymi podczas instalacji.
8. Po zakończeniu instalacji otwórz `https://rustdesk.twojadomena.com` lub `http://twoj.adres.ip:21114`.
9. Zaloguj się przy użyciu nazwy użytkownika `admin` i hasła `test1234`.
10. Wprowadź kod licencyjny zakupiony w kroku 1.

## Jak zaktualizować RustDesk Server Pro do nowej wersji?
Zaleca się wcześniejsze wykonanie kopii zapasowej plików danych (np. plików sqlite3), https://github.com/rustdesk/rustdesk-server-pro/discussions/184#discussioncomment-8013375.

### Jeśli zainstalowano za pomocą skryptu (`install.sh`)
Uruchom [update.sh](/docs/en/self-host/rustdesk-server-pro/installscript/script/#upgrade).

- ### Docker Compose
```
sudo docker compose down
sudo docker compose pull 
sudo docker compose up -d
```
Więcej informacji znajdziesz w [tej dyskusji](https://stackoverflow.com/questions/37685581/how-to-get-docker-compose-to-use-the-latest-image-from-repository).
- ### Docker
```
sudo docker ps
## możesz również użyć <NAZWA KONTENERA>, np. hbbs i hbbr, jeśli postępowałeś zgodnie z instrukcją.
sudo docker stop <ID KONTENERA>
sudo docker rm <ID KONTENERA>
sudo docker rmi <ID OBRAZU>
sudo docker run ..... # tak samo jak podczas instalacji
```

np.:

```
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE                          COMMAND   CREATED          STATUS                         PORTS     NAMES
30822972c220   rustdesk/rustdesk-server-pro   "hbbr"    10 seconds ago   Restarting (1) 2 seconds ago             hbbr
0f3a6f185be3   rustdesk/rustdesk-server-pro   "hbbs"    15 seconds ago   Up 14 seconds                            hbbs
root@hz:~# sudo docker kill hbbr hbbs
hbbr
hbbs
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
root@hz:~# sudo docker rm hbbr hbbs
hbbr
hbbs
root@hz:~# sudo docker rmi rustdesk/rustdesk-server-pro
Untagged: rustdesk/rustdesk-server-pro:latest
Untagged: rustdesk/rustdesk-server-pro@sha256:401b8344323addf777622d0463bd7b964dd18a01599e42e20d8b3818dae71ad2
Deleted: sha256:a3d9d43a3d1dd84b10c39fe0abf7767b18a87819ff0981443ce9e9a52604c889
Deleted: sha256:65ae79ecc0f8b1c8a21085d04af7c8d8f368dd5ad844982d4c7b3ac1f38ba33a
Deleted: sha256:9274a824aef10f2ef106d8f85fbd1905037169cf610951f63dc5109dae4b0825
Deleted: sha256:aa89ac8b57a49f49f041c01b9c0f016060e611cf282e3fda281bc6bebbabaf3f
Deleted: sha256:4af9839016f72586a46f915cae8a5ccf3380ba88a2f79532692d3b1d7020387e
Deleted: sha256:e900a7ffc2fc14fa432cc04823740dcbb78c0aa3508abbbe287ce8b274541ada
Deleted: sha256:503eeab76c11e8316a2a450ef0790d31c5af203309e9c5b44d1bf8a601e6e587
Deleted: sha256:825683356e7dbfcbaabcbf469c9aeb34d36ebeab0308170432b9553e28203116
Deleted: sha256:24a48d4af45bab05d8712fe22abec5761a7781283500e32e34bdff5798c09399
root@hz:~# sudo docker images
REPOSITORY         TAG       IMAGE ID       CREATED        SIZE
rustdesk/makepkg   latest    86a981e2e18f   2 months ago   2.23GB
root@hz:~# sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbs
Unable to find image 'rustdesk/rustdesk-server-pro:latest' locally
latest: Pulling from rustdesk/rustdesk-server-pro
4ce000a43472: Pull complete
1543f88421d3: Pull complete
9b209c1f5a8d: Pull complete
d717f548a400: Pull complete
1e60b98f5660: Pull complete
a86960d9bced: Pull complete
acb361c4bbf6: Pull complete
4f4fb700ef54: Pull complete
Digest: sha256:401b8344323addf777622d0463bd7b964dd18a01599e42e20d8b3818dae71ad2
Status: Downloaded newer image for rustdesk/rustdesk-server-pro:latest
0cc5387efa8d2099c0d8bc657b10ed153a6b642cd7bbcc56a6c82790a6e49b04
root@hz:~# sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbr
4eb9da2dc460810547f6371a1c40a9294750960ef2dbd84168079e267e8f371a
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE                          COMMAND   CREATED         STATUS                                  PORTS     NAMES
4eb9da2dc460   rustdesk/rustdesk-server-pro   "hbbr"    5 seconds ago   Restarting (1) Less than a second ago             hbbr
0cc5387efa8d   rustdesk/rustdesk-server-pro   "hbbs"    8 seconds ago   Up 7 seconds                                      hbbs
root@hz:~# sudo docker images
REPOSITORY                     TAG       IMAGE ID       CREATED        SIZE
rustdesk/rustdesk-server-pro   latest    a3d9d43a3d1d   5 days ago     193MB
rustdesk/makepkg               latest    86a981e2e18f   2 months ago   2.23GB
```

Aby uzyskać więcej szczegółów, sprawdź [to](https://www.cherryservers.com/blog/how-to-update-docker-image).

## Zainstalowałem za pomocą skryptu, jak mogę uruchomić i zatrzymać usługi?
Usługi korzystają z systemd, więc można je uruchomić i zatrzymać za pomocą `sudo systemctl stop|start|restart rustdesk-hbbs|rustdesk-hbbr`, np. `sudo systemctl restart rustdesk-hbbs`.

## Zainstalowałem za pomocą skryptu, jak mogę wyświetlić logi w systemie Linux?
Logi są przechowywane w `/var/log/rustdesk-server`, można je wyświetlić za pomocą `tail /var/log/rustdesk-server/hbbs.log` lub `tail /var/log/rustdesk-server/hbbs.error`.

## Zainstalowałem za pomocą skryptu, jak mogę sprawdzić status usług RustDeska?
Aby sprawdzić status, użyj `sudo systemctl status rustdesk-hbbs|rustdesk-hbbr`, np. `sudo systemctl status rustdesk-hbbs`.

## Jak mogę zmienić hasło administratora?
1. Otwórz `https://rustdesk.yourdomena.com` lub `http://twojadresIP:21114`.
2. Zaloguj się z nazwą użytkownika `admin` i hasłem `test1234`.
3. Kliknij `admin` w prawym górnym rogu.
4. Kliknij `Ustawienia`.
5. Wprowadź nowe hasło w odpowiednich polach.

## Jak mogę przenieść moją licencję na nowy serwer?
Proszę sprawdzić [tutaj](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-and-migration).

## E-maile nie działają z mojego VPS
Wiele dostawców VPS blokuje porty 465 i 25.

Prosty sposób na sprawdzenie to użycie telnet. Aby przetestować w terminalu Linuxa, wpisz `telnet twój.serwer.mailowy.com 25`. W systemie Windows użyj PowerShell z komendą `Test-NetConnection -ComputerName twój.serwer.mailowy.com -Port 25`.

Twój serwer mailowy może nie używać portu 25. Upewnij się, że używasz właściwych portów.

## Czy mogę wdrożyć RustDeska za pomocą PowerShell lub podobnego narzędzia?
Oczywiście, skrypty pomocne przy wdrażaniu znajdziesz [tutaj](https://rustdesk.com/docs/en/self-host/client-deployment/).

## Jak mogę zgłosić błąd?
Proszę zgłaszać przez [GitHuba](https://github.com/rustdesk/rustdesk-server-pro/issues).

## Dlaczego, jeśli hostuję samodzielnie, to nie jest to darmowe i open source?
1. RustDesk stał się pełnoetatową pracą dla wielu osób, które mają życie, żony, prace i dzieci, co wymaga czasu i kosztuje pieniądze!
2. Chcemy być tutaj i nadal robić postępy w nadchodzących latach.
3. Wersja open source nadal będzie open source i zachęcamy innych do rozwoju zgodnie z licencją AGPL.

## Nie mogę połączyć się z urządzeniami w różnych grupach, dlaczego?
To łatwo naprawić, musisz zezwolić na dostęp międzygrupowy.
1. Dodaj nowe grupy.
2. Kliknij `Edytuj`.
3. Wybierz odpowiednie grupy, do których chcesz mieć dostęp (automatycznie dodaje je do odpowiadającej grupy).

## Jak mogę automatycznie uzyskać konfiguracje?
Konfiguracje są generowane automatycznie.
1. Pobierz najnowszych klientów z [GitHuba](https://github.com/rustdesk/rustdesk/releases/latest).
2. Na głównej stronie konsoli webowej kliknij `Windows EXE`.
3. Wprowadź host i API (jeśli różnią się od twojej konfiguracji).
4. Kliknij `Wyślij`.
5. Zeskanuj kod QR na Androidzie i zmień nazwę pliku exe na wygenerowaną.

## Czy oferujecie hosting dla RustDesk Server Pro?
Proszę skontaktować się z naszym zespołem [sprzedaży](mailto://sales@rustdesk.com).

## Czy jest gdzieś dostępny przewodnik wideo?
Tak! Mamy [kanał YouTube](https://youtube.com/@RustDesk).

## Dlaczego moje logi/nazwy urządzeń są puste?
Upewnij się, że API jest poprawnie ustawione na kontrolowanym urządzeniu, https://github.com/rustdesk/rustdesk-server-pro/issues/21#issuecomment-1637935750.

## Jak mogę odinstalować serwer RustDeska Pro?
Uruchom następujące polecenia:
```sh
sudo systemctl stop rustdesk-hbbs.service
sudo systemctl disable rustdesk-hbbs.service
sudo systemctl stop rustdesk-hbbr.service
sudo systemctl disable rustdesk-hbbr.service
sudo systemctl daemon-reload
sudo rm /etc/systemd/system/rustdesk-hbbs.service
sudo rm etc/systemd/system/rustdesk-hbbr.service
sudo rm /usr/bin/hbbs
sudo rm /usr/bin/hbbr
sudo rm -rf /var/lib/rustdesk-server/
sudo rm -rf /var/log/rustdesk-server/
```
Jeśli skrypt zainstalował Nginx, usuń go za pomocą:
```sh
sudo apt remove nginx
```

## Jak mogę usunąć urządzenia z listy urządzeń w konsoli webowej?
Teraz dostępna będzie opcja wyłączenia, a następnie usunięcia.

## Jak mogę zaktualizować RustDeska za pomocą PowerShella?
```ps
$ErrorActionPreference= 'silentlycontinue'

$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if ($rdver -eq "1.2.6")
{
    Write-Output "RustDesk $rdver is the newest version."
    Exit
}

if (!(Test-Path C:\Temp))
{
    New-Item -ItemType Directory -Force -Path C:\Temp > null
}

cd C:\Temp

Invoke-WebRequest "https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.exe" -Outfile "rustdesk.exe"
Start-Process .\rustdesk.exe --silent-install -wait
```

## Błąd `Key mismatch`
Skonfiguruj swojego klienta z [prawidłowym kluczem](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/).

## Błąd `Failed to connect to relay server`
Upewnij się, że `hbbr` jest uruchomiony. Więcej informacji o `hbbr` znajdziesz [tutaj](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/).
Jeśli twój `hbbr` nie działa na tej samej maszynie co `hbbs`, masz wiele serwerów relay lub nie używasz domyślnego portu `21117`, musisz jawnie przekazać tę informację do `hbbs`. Sprawdź [tutaj](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/).

## Resetowanie MFA dla konta administratora
https://github.com/rustdesk/rustdesk/discussions/6576

## Ręczna konfiguracja HTTPS dla konsoli webowej

### 1. Kup nazwę domeny i przypisz ją do adresu IP swojego serwera.
* Kup nazwę domeny u rejestratora takiego jak GoDaddy, Namecheap lub Namesilo.
* Przypisz nazwę domeny do adresu IP swojego serwera poprzez:
    - Panel kontrolny rejestratora domen (zalecane)
    - [Dostawców DNS](https://en.wikipedia.org/wiki/List_of_managed_DNS_providers)

Na przykład, jeśli kupiłeś domenę `example.com` w `Namesilo`, a adres IP twojego serwera to `123.123.123.123`, i chcesz użyć subdomeny `rustdesk.example.com` jako adresu HTTPS konsoli webowej. Otwórz [link](https://www.namesilo.com/account_domains.php), kliknij przycisk z podpowiedzią `Manage dns for the domain`, dodaj rekord `A` z nazwą hosta `rustdesk` i adresem IP twojego serwera.
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-button.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-add-a-record.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-table.png)
* Propagacja DNS może chwilę potrwać. Sprawdź na https://www.whatsmydns.net, czy domena została poprawnie przypisana do adresu IP serwera. Krok 6 wymaga poprawnego wyniku propagacji. W kolejnych krokach zastąp `YOUR_DOMAIN` swoją subdomeną, np. `rustdesk.example.com`.

### 2. Instalacja Nginx
* Debian/Ubuntu: `sudo apt-get install nginx`
* Fedora/CentOS: `sudo dnf install nginx` lub `sudo yum install nginx`
* Arch: `sudo pacman -S install nginx`
* openSUSE: `sudo zypper install nginx`
* Gentoo: `sudo emerge -av nginx`
* Alpine: `sudo apk add --no-cache nginx`

Uruchom `nginx -h`, aby sprawdzić, czy instalacja się powiodła.

### 3. Instalacja Certbot
* Metoda 1: Jeśli masz zainstalowany `snap`, uruchom `sudo snap install certbot --classic`.
* Metoda 2: Użyj `python3-certbot-nginx`, np. `sudo apt-get install python3-certbot-nginx` dla Ubuntu.
* Metoda 3: Jeśli powyższe metody zawiodą, spróbuj zainstalować `certbot-nginx`, np. `sudo yum install certbot-nginx` dla CentOS 7.

Uruchom `certbot -h`, aby sprawdzić, czy instalacja się powiodła.

### 4. Konfiguracja Nginx
Istnieją dwa sposoby:
* Jeśli istnieją katalogi `/etc/nginx/sites-available` i `/etc/nginx/sites-enabled`, zastąp `TWOJA_DOMENA` w poniższej komendzie swoją nazwą domeny i wykonaj ją.
```sh
cat > /etc/nginx/sites-available/rustdesk.conf << EOF
server {
    server_name TWOJA_DOMENA;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```
Następnie uruchom polecenie `sudo ln -s /etc/nginx/sites-available/rustdesk.conf /etc/nginx/sites-enabled/rustdesk.conf`.

Uruchom polecenie `cat /etc/nginx/sites-available/rustdesk.conf`, aby upewnić się, że jego zawartość jest poprawna.

* Jeśli katalogi `/etc/nginx/sites-available` i `/etc/nginx/sites-enabled` nie istnieją, a katalog `/etc/nginx/conf.d` istnieje, zastąp `TWOJA_DOMENA` w poniższym poleceniu swoją nazwą domeny i uruchom je.
```sh
cat > /etc/nginx/conf.d/rustdesk.conf << EOF
server {
    server_name TWOJA_DOMENA;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```
Uruchom polecenie `cat /etc/nginx/conf.d/rustdesk.conf`, aby upewnić się, że jego zawartość jest poprawna.

### 5. Włącz reguły zapory sieciowej dla domeny
Uruchom następujące polecenia:

```sh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw --force reload
```

### 6. Generate SSL certificate
Zastąp `$TWOJA_DOMENA` nazwą swojej domeny, a następnie uruchom
`sudo certbot --nginx --cert-name $TWOJA_DOMENA --key-type ecdsa --renew-by-default --no-eff-email --agree-tos --server https://acme-v02.api.letsencrypt.org/directory -d $TWOJA_DOMENA`.

Jeśli pojawi się monit "Wprowadź adres e-mail (używany do pilnych powiadomień o odnowieniu i bezpieczeństwie)", wprowadź swój adres e-mail.

Ostatecznie zawartość pliku `rustdesk.conf` powinna wyglądać następująco:
```
server {
    server_name TWOJA_DOMENA;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/TWOJA_DOMENA/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/TWOJA_DOMENA/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = TWOJA_DOMENA) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name TWOJA_DOMENA;
    listen 80;
    return 404; # managed by Certbot
}
```

Oto kilka typowych błędów:

* Konsola wyświetla komunikat `Successfully deployed certificate for TWOJA_DOMENA to /etc/nginx/.../default` zamiast `Successfully deployed certificate for TWOJA_DOMENA to /etc/nginx/.../rustdesk.conf`.

Przyczyną może być to, że Certbot nie znajduje pliku `rustdesk.conf`. Możesz spróbować jednego z poniższych rozwiązań:
- Sprawdź wynik kroku 5, uruchom `sudo service nginx restart`.
- Skopiuj konfiguracje serwera `server{...}`, które zawierają `TWOJA_DOMENA` do `rustdesk.conf` i zmień `location{...}` na poniższą treść.

```sh
location / {
    proxy_set_header        X-Real-IP       $remote_addr;
    proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:21114/;
}
```

* `too many certificates (5) already issued for this exact set of domains in the last 168 hours`

Rozwiązanie: Dodaj kolejną nazwę domeny do DNS i zmień `TWOJA_DOMENA` na nią, np. `rustdesk2.example.com`. Następnie powtórz kroki 1, 4 i 6.

* `Error getting validation data`

Rozwiązanie: Problem może być spowodowany zaporą sieciową, zapoznaj się z https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#firewall

Uwaga: Uruchom `sudo service nginx restart`, jeśli ręcznie zmieniałeś plik `rustdesk.conf`.

### 7. Logowanie do strony internetowej
* Otwórz `https://TWOJA_DOMENA` w przeglądarce, zaloguj się przy użyciu domyślnej nazwy użytkownika "admin" i hasła "test1234", a następnie zmień hasło na własne.

### 8. Dodanie obsługi WebSocket Secure (WSS) dla serwera ID i serwera relay, aby umożliwić bezpieczną komunikację na wszystkich platformach.

Dodaj następującą konfigurację do pierwszej sekcji `server` w pliku `/etc/nginx/.../rustdesk.conf`, a następnie zrestartuj usługę `Nginx`.
Klient webowy będzie dostępny pod adresem `https://TWOJA_DOMENA/web`. Niestandardowi klienci mogą używać WebSocket, ustawiając `allow-websocket=Y` w opcjach zaawansowanych. Jeśli używasz niestandardowego klienta z włączonym WebSocket, nie będzie on wykorzystywał TCP/UDP i może łączyć się tylko przez relay (z wyjątkiem połączeń bezpośrednich przez IP). Jeśli używasz tylko tego klienta z WebSocket, serwer może zamknąć porty 21114-21119 i pozostawić otwarty tylko port 443.




```
    location /ws/id {
        proxy_pass http://127.0.0.1:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /ws/relay {
        proxy_pass http://127.0.0.1:21119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }
```

Pełna konfiguracja jest następująca:

```
server {
    server_name TWOJA_DOMENA;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    location /ws/id {
        proxy_pass http://127.0.0.1:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /ws/relay {
        proxy_pass http://127.0.0.1:21119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = TWOJA_DOMENA) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name TWOJA_DOMENA;
    listen 80;
    return 404; # managed by Certbot
}
```

{{% notice note %}}
Jeśli wcześniej wdrożyłeś aplikację dla klientów webowych i chcesz korzystać z niej na wszystkich platformach, musisz dodać `proxy_read_timeout`.
{{% /notice %}}

### 9. Omiń CORS, jeśli korzystasz z publicznego klienta internetowego RustDeska `https://rustdesk.com/web`

Aby ominąć ograniczenia CORS przeglądarek, należy dodać poniższy fragment w sekcji `location /` pliku `/etc/nginx/.../rustdesk.conf`. Pomiń ten krok, jeśli korzystasz z własnego klienta internetowego.

```
        if ($http_origin ~* (https?://(www\.)?rustdesk\.com)) {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
        }
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Content-Length' 0;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            return 204;
        }
```

## SELinux

Jeśli podczas instalacji pojawi się komunikat `Waiting for RustDesk Relay service to become active...`, przyczyną może być SELinux. Możesz spróbować wykonać następujące polecenia:

```sh
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbs'
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbr'
sudo restorecon -v '/usr/bin/hbbs'
sudo restorecon -v '/usr/bin/hbbr'
```

## Firewall

### Zapora chmury
Jeśli korzystasz z chmury AWS/Azure/Google/DigitalOcean, otwórz porty przychodzące UDP (21116) i TCP (21114-21119) w panelu dostawcy chmury.

- [AWS] https://docs.aws.amazon.com/network-firewall/latest/developerguide/getting-started.html
- [Azure] https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview
- [Google] https://cloud.google.com/firewall/docs/firewalls/
- [DigitalOcean] https://docs.digitalocean.com/products/networking/firewalls/

### Zapora serwera lokalnego
RustDesk konfiguruje zaporę za pomocą `ufw`. Może to nie działać na niektórych dystrybucjach jak CentOS 9, możesz spróbować z `firewall-cmd`:

```sh
sudo firewall-cmd --permanent --add-port=21115/tcp
sudo firewall-cmd --permanent --add-port=21116/tcp
sudo firewall-cmd --permanent --add-port=21117/tcp
sudo firewall-cmd --permanent --add-port=21118/tcp
sudo firewall-cmd --permanent --add-port=21119/tcp
sudo firewall-cmd --permanent --add-port=21116/udp
```

Jeżeli używasz IP:

```sh
sudo firewall-cmd --permanent --add-port=21114/tcp
```

Jeżeli używasz DNS/domeny:

```sh
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
```

Po wykonaniu powyższych czynności uruchom `sudo firewall-cmd --reload`, aby przeładować zaporę.

## Po zmianie hasła administratora w konsoli webowej nie mogę się zalogować. Czy istnieje prosty sposób na zresetowanie hasła?
1. Upewnij się, że masz zainstalowane `rustdesk-utils`. Jeśli nie, możesz je pobrać [tutaj](https://github.com/rustdesk/rustdesk-server-pro). Polecenie należy wykonać z folderu, w którym znajduje się baza danych, czyli `/var/lib/rustdesk-server`.
2. Polecenie to `rustdesk-utils set_password nazwa_użytkownika hasło`. Jeśli zadziała, wyświetli się komunikat *Done*.

Dostępne są również inne polecenia: `genkeypair`, `validatekeypair [klucz publiczny] [klucz prywatny]`, `doctor [rustdesk-server]`, `reset_email_verification` oraz `reset_2fa_verification`, które można użyć z `rustdesk-utils`.

https://github.com/rustdesk/rustdesk-server-pro/discussions/183

## Dodanie certyfikatu głównego CA do kontenera Docker (dla problemów z TLS przy SMTP, OIDC itp.)
https://github.com/rustdesk/rustdesk-server-pro/issues/99#issuecomment-2235014703
