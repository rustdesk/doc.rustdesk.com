---
title: Întrebări frecvente (FAQ)
description: "Întrebări frecvente despre instalarea, configurarea, licențierea, depanarea și migrarea RustDesk Server Pro. Găsește răspunsuri la probleme comune, configurare SSL, gestionare baze de date și proceduri de upgrade."
keywords: ["rustdesk server pro faq", "rustdesk pro help", "rustdesk installation help", "rustdesk troubleshooting", "rustdesk server setup", "rustdesk license issues", "rustdesk ssl configuration", "rustdesk migration guide", "rustdesk pro support", "rustdesk server questions"]
weight: 600
---

## Cum instalez folosind Simple Install Script?
1. Obține o licență de la https://rustdesk.com/pricing.html — vezi pagina de [license](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) pentru detalii.
2. Pornește un VPS, un server fizic sau o mașină virtuală Linux.
3. Dacă vrei să folosești DNS și SSL, creează un nume DNS, ex. `rustdesk.domeniultau.com`.
4. Urmează instrucțiunile de pe această pagină: https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#install.
5. Copiază și lipește comanda în terminalul Linux.
6. Urmează pașii interactivi din script.
7. După instalare poți accesa `https://rustdesk.domeniultau.com` sau `http://adresa-ip:21114`.
8. Autentifică-te cu `admin` / `test1234`.
9. Introdu codul de licență achiziționat la pasul 1.

## Cum convertesc RustDesk Server Open Source în RustDesk Server Pro?
1. Obține o licență de la https://rustdesk.com/pricing.html și consultă pagina de [license](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/).
2. Deschide portul TCP 21114 în firewall.
3. Autentifică-te pe serverul RustDesk existent.
4. Dacă nu ai folosit DNS și dorești SSL, configurează un nume DNS, ex. `rustdesk.domeniultau.com`.
5. Urmează instrucțiunile de pe această pagină: https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#convert-from-open-source.
6. Rulează comanda recomandată în terminal.
7. Urmează pașii interactivi.
8. După finalizare accesează `https://rustdesk.domeniultau.com` sau `http://adresa-ip:21114`.
9. Autentifică-te cu `admin` / `test1234`.
10. Introdu codul de licență.

## A apărut o versiune nouă de RustDesk Server Pro — cum fac upgrade?
E recomandat să faci backup la fișierele de date (ex. fișiere sqlite3) înainte: https://github.com/rustdesk/rustdesk-server-pro/discussions/184#discussioncomment-8013375.

- Dacă ai instalat cu script (`install.sh`)
  - Rulează [update.sh](/docs/en/self-host/rustdesk-server-pro/installscript/script/#upgrade).

- Docker Compose

```sh
sudo docker compose down
sudo docker compose pull
sudo docker compose up -d
```

Comportamentul poate depinde de versiunea Docker Compose; vezi și discuțiile aferente pentru detalii.

- Docker (fără compose)

```sh
sudo docker ps
# poți folosi și <CONTAINER NAME>, de ex. `hbbs` și `hbbr` dacă ai urmat manualul nostru
sudo docker stop <CONTAINER ID>
sudo docker rm <CONTAINER ID>
sudo docker rmi <IMAGE ID>
sudo docker run ..... # la fel ca în instalarea inițială
```

Exemplu de flux:

```sh
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
... (output truncated)
root@hz:~# sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbs
root@hz:~# sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbr
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE                          COMMAND   CREATED         STATUS                                  PORTS     NAMES
4eb9da2dc460   rustdesk/rustdesk-server-pro   "hbbr"    5 seconds ago   Restarting (1) Less than a second ago             hbbr
0cc5387efa8d   rustdesk/rustdesk-server-pro   "hbbs"    8 seconds ago   Up 7 seconds                                      hbbs
```

Pentru mai multe detalii vezi și: https://www.cherryservers.com/blog/how-to-update-docker-image

## Am instalat cu script — cum pornesc/oprim serviciile?
Serviciile sunt gestionate cu systemd, poți folosi:
`sudo systemctl stop|start|restart rustdesk-hbbs rustdesk-hbbr`, ex: `sudo systemctl restart rustdesk-hbbs`.

## Unde găsesc jurnalele (logs) pe Linux când am instalat cu script?
Jurnalele se află în `/var/log/rustdesk-server`. Le poți citi cu `tail /var/log/rustdesk-server/hbbs.log` sau `tail /var/log/rustdesk-server/hbbs.error`.

## Cum verific statusul serviciilor RustDesk instalate cu script?
Rulează: `sudo systemctl status rustdesk-hbbs` sau `sudo systemctl status rustdesk-hbbr`.

## Cum schimb parola de admin?
1. Deschide `https://rustdesk.domeniultau.com` sau `http://adresa-ip:21114`.
2. Autentifică-te cu `admin` / `test1234`.
3. Click pe `admin` (colțul din dreapta sus).
4. Click pe `Settings`.
5. Completează noile parole în câmpurile afișate.

## Cum mut licența pe un alt server?
Urmărește pașii descriși aici: https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-and-migration

## E-mail-urile nu funcționează de pe VPS
Mulți furnizori VPS blochează porturile 465 și 25.

Verificare simplă: în Linux folosește `telnet your.mailserver.com 25`. Pe Windows PowerShell: `Test-NetConnection -ComputerName your.mailserver.com -Port 25`.

Asigură-te că folosești porturile corecte pentru serverul tău de mail.

## Pot face deployment folosind PowerShell sau altceva similar?
Da — găsești scripturi utile aici: https://rustdesk.com/docs/en/self-host/client-deployment/

## Cum raportez un bug?
Deschide un issue pe GitHub: https://github.com/rustdesk/rustdesk-server-pro/issues

## De ce RustDesk Server Pro nu este gratuit dacă îl găzduiesc singur?
1. RustDesk a devenit un loc de muncă cu normă întreagă pentru mai multe persoane; menținerea proiectului costă timp și bani.
2. Dorim să continuăm dezvoltarea pe termen lung.
3. Versiunea open source rămâne open source și încurajăm contribuțiile în conformitate cu licența AGPL.

## Nu mă pot conecta la dispozitive din grupuri diferite — de ce?
Trebuie să permiți acces cross-group (între grupuri):
1. Adaugă grupurile necesare.
2. Click `Edit`.
3. Selectează grupurile cărora dorești să le permiți acces (se adaugă automat în grupul corespunzător).

## Cum obțin configurații automat?
1. Descarcă cei mai noi clienți de pe GitHub: https://github.com/rustdesk/rustdesk/releases/latest
2. În consola web, pe pagina principală, click pe `Windows EXE`.
3. Completează host și API (dacă sunt diferite).
4. Click `Submit`.
5. Scanează QR code pe Android și redenumește .exe conform indicațiilor.

## Oferiți găzduire pentru RustDesk Server Pro?
Contactează echipa de [vânzări](mailto://sales@rustdesk.com).

## Există ghiduri video?
Da — canalul nostru YouTube: https://youtube.com/@RustDesk

## De ce apar jurnalele sau numele dispozitivelor goale?
Asigură-te că API-ul este configurat corect pe dispozitivul controlat: https://github.com/rustdesk/rustdesk-server-pro/issues/21#issuecomment-1637935750

## Cum dezinstalez RustDesk Server Pro?
Rulează următoarele comenzi:
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

Dacă scriptul a instalat Nginx, îl poți elimina cu:
```sh
sudo apt remove nginx
```

## Cum elimin dispozitive din lista de dispozitive din consola web?
Mai întâi dezactivează dispozitivul, apoi opțiunea de ștergere va fi disponibilă.

## Cum actualizez RustDesk pe Windows cu PowerShell?
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

## Eroare `Key mismatch`
Configurează clientul cu cheia corectă: https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/

## Eroare `Failed to connect to relay server`
Asigură-te că `hbbr` rulează. Mai multe informații despre `hbbr` găsești aici: https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/.
Dacă `hbbr` nu rulează pe aceeași mașină ca `hbbs`, ai multiple servere relay sau folosești un port diferit de 21117, trebuie să-i spui explicit lui `hbbs` despre acesta. Vezi: https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/.

## Resetare MFA pentru contul Admin
https://github.com/rustdesk/rustdesk/discussions/6576

## Configurare manuală HTTPS pentru consola web

### 1. Cumpără un nume de domeniu și pointează-l către IP-ul serverului
 - Cumpără un domeniu de la un registrar (GoDaddy, Namecheap, Namesilo etc.).
 - Configurează înregistrarea A în panoul registrarului sau la providerul DNS pentru a indica IP-ul serverului.

Exemplu: dacă domeniul tău este `example.com` și IP-ul serverului este `123.123.123.123`, folosește subdomeniul `rustdesk.example.com`. Urmează pașii din panoul Namesilo pentru a adăuga o înregistrare A.
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-button.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-add-a-record.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-table.png)

Verifică propagarea DNS pe https://www.whatsmydns.net. Înlocuiește `YOUR_DOMAIN` cu subdomeniul tău, ex. `rustdesk.example.com`.

### 2. Instalează Nginx
 - Debian/Ubuntu: `sudo apt-get install nginx`
 - Fedora/CentOS: `sudo dnf install nginx` sau `sudo yum install nginx`
 - Arch: `sudo pacman -S nginx`
 - openSUSE: `sudo zypper install nginx`
 - Gentoo: `sudo emerge -av nginx`
 - Alpine: `sudo apk add --no-cache nginx`

Verifică cu `nginx -h`.

### 3. Instalează Certbot
 - Metoda 1: dacă ai `snap`, rulează `sudo snap install certbot --classic`.
 - Metoda 2: instalează `python3-certbot-nginx`, ex. `sudo apt-get install python3-certbot-nginx`.
 - Metoda 3: folosește pachetul `certbot-nginx` din managerul distro-ului.

Verifică cu `certbot -h`.

### 4. Configurează Nginx
Există două opțiuni:

 - Dacă există `/etc/nginx/sites-available` și `/etc/nginx/sites-enabled`, creează fișierul:

```sh
cat > /etc/nginx/sites-available/rustdesk.conf << EOF
server {
	server_name YOUR_DOMAIN;
	location / {
		proxy_set_header        X-Real-IP       \$remote_addr;
		proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
		proxy_pass http://127.0.0.1:21114/;
	}
}
EOF

sudo ln -s /etc/nginx/sites-available/rustdesk.conf /etc/nginx/sites-enabled/rustdesk.conf
```

 - Dacă nu există `sites-available`/`sites-enabled` dar există `/etc/nginx/conf.d`, creează:

```sh
cat > /etc/nginx/conf.d/rustdesk.conf << EOF
server {
	server_name YOUR_DOMAIN;
	location / {
		proxy_set_header        X-Real-IP       \$remote_addr;
		proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
		proxy_pass http://127.0.0.1:21114/;
	}
}
EOF
```

Verifică conținutul fișierului creat.

### 5. Permite porturile firewall pentru domeniu

```sh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw --force reload
```

### 6. Generează certificatul SSL
Înlocuiește `$YOUR_DOMAIN` cu domeniul tău și rulează:

```sh
sudo certbot --nginx --cert-name $YOUR_DOMAIN --key-type ecdsa --renew-by-default --no-eff-email --agree-tos --server https://acme-v02.api.letsencrypt.org/directory -d $YOUR_DOMAIN
```

Dacă cere email, introdu adresa ta.

Fișierul `rustdesk.conf` ar trebui să conțină setările SSL generate de Certbot.

Erori frecvente și soluții:
- Mesajul `Successfully deployed certificate for YOUR_DOMAIN to /etc/nginx/.../default` în loc de `.../rustdesk.conf`: Certbot nu găsește fișierul; repornește nginx sau copiază blocul `server{...}` în `rustdesk.conf` și asigură-te că `location` conține proxy_pass către 127.0.0.1:21114.
- `too many certificates (5) already issued for this exact set of domains in the last 168 hours`: folosește un alt subdomeniu temporar și reia pașii.
- `Error getting validation data`: verifică firewall-ul.

Rulează `sudo service nginx restart` dacă modifici manual `rustdesk.conf`.

### 7. Autentificare în web
 - Deschide `https://YOUR_DOMAIN` în browser, autentifică-te cu `admin` / `test1234` și schimbă parola.

### 8. Adaugă suport WebSocket securizat (WSS) pentru id server și relay

Adaugă următoarele în primul bloc `server` din fișierul `rustdesk.conf`, apoi repornește Nginx. Clientul web va fi accesibil la `https://YOUR_DOMAIN/web`. Clienții personalizați pot folosi WebSocket activând `allow-websocket=Y` în opțiuni avansate. Atenție: clienții WebSocket folosiți exclusiv vor folosi relay și nu TCP/UDP direct (cu excepția conexiunilor IP directe). Dacă folosești doar clienți WebSocket, poți închide porturile 21114–21119 și păstra doar 443 deschis.

```nginx
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

{{% notice note %}}
Dacă ai implementat anterior pentru clienți web și vrei să-l folosești pe toate platformele, trebuie să adaugi `proxy_read_timeout`.
{{% /notice %}}

### 9. Bypass CORS dacă folosești clientul web public `https://rustdesk.com/web`

Adaugă următorul cod în secțiunea `location /` din `rustdesk.conf` pentru a ocoli restricțiile CORS ale browserului. Sare peste acest pas dacă folosești clientul tău web.

```nginx
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

If `Waiting for RustDesk Relay service to become active...` appears when install, it may be caused by SELinux. You can try the following commands:

```sh
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbs'
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbr'
sudo restorecon -v '/usr/bin/hbbs'
sudo restorecon -v '/usr/bin/hbbr'
```

## Firewall

### Firewall în cloud
Dacă rulezi pe AWS/Azure/Google/DigitalOcean, deschide inbound UDP (21116) și TCP (21114-21119) în consola furnizorului cloud.

- [AWS] https://docs.aws.amazon.com/network-firewall/latest/developerguide/getting-started.html
- [Azure] https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview
- [Google] https://cloud.google.com/firewall/docs/firewalls
- [DigitalOcean] https://docs.digitalocean.com/products/networking/firewalls/

### Firewall pe server on-premise
Scriptul RustDesk folosește `ufw`. Pe unele distribuții (ex. CentOS 9) poți utiliza `firewall-cmd`:

```sh
sudo firewall-cmd --permanent --add-port=21115/tcp
sudo firewall-cmd --permanent --add-port=21116/tcp
sudo firewall-cmd --permanent --add-port=21117/tcp
sudo firewall-cmd --permanent --add-port=21118/tcp
sudo firewall-cmd --permanent --add-port=21119/tcp
sudo firewall-cmd --permanent --add-port=21116/udp
```

Pentru IP direct:

```sh
sudo firewall-cmd --permanent --add-port=21114/tcp
```

Pentru DNS/Domeniu:

```sh
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
```

După aceea rulează `sudo firewall-cmd --reload`.

## Am schimbat parola de admin în consolă și nu mă pot autentifica — există o resetare simplă?
1. Asigură-te că ai `rustdesk-utils` instalat (https://github.com/rustdesk/rustdesk-server-pro) și execută comanda din directorul unde se află baza de date, ex. `/var/lib/rustdesk-server`.
2. Comanda este `rustdesk-utils set_password username password`. Dacă s-a efectuat cu succes va afișa *Done*.

Există și alte comenzi utile în `rustdesk-utils`: `genkeypair`, `validatekeypair [public key] [secret key]`, `doctor [rustdesk-server]`, `reset_email_verification` și `reset_2fa_verification`.

https://github.com/rustdesk/rustdesk-server-pro/discussions/183

## Adăugarea certificatului root CA în containerul Docker (pentru eșec TLS cu SMTP, OIDC etc.)
https://github.com/rustdesk/rustdesk-server-pro/issues/99#issuecomment-2235014703