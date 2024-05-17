---
title: Installatie
weight: 10
---

## Installeer uw eigen server met een eenvoudig uit te voeren installatiescript
Het script wordt gehost op https://github.com/dinger1986/rustdeskinstall en ondersteund op onze [Discord](https://discord.com/invite/nDceKgxnkV).

Momenteel zal het script de Relay en Signal Servers (hbbr en hbbs) downloaden en instellen, configuraties genereren en deze hosten op een met een wachtwoord beveiligde webpagina voor eenvoudige installatie bij klanten.

### Vereisten
Je moet een werkende linux hebben, het script is getest op CentOS Linux 7/8, Ubuntu 18/20 en Debian. Een server met 1 CPU, 1 GB en 10 GB schijf is voldoende om RustDesk te draaien.

#### Installatie van de server
Stel uw firewall in op uw server voordat u het script uitvoert.

Zorg ervoor dat je toegang hebt via ssh of op een andere manier voordat je de firewall instelt. De voorbeeldcommando's voor UFW (gebaseerd op Debian) zijn:
```
ufw allow proto tcp from YOURIP to any port 22
```

#### Als UFW is ingesteld, gebruik dan de volgende commando's om de firewall te configureren:
```
ufw allow 21115:21119/tcp
ufw allow 8000/tcp
ufw allow 21116/udp
sudo ufw enable
```

#### Voer de volgende commando's uit:
```
wget https://raw.githubusercontent.com/dinger1986/rustdeskinstall/master/install.sh
chmod +x install.sh
./install.sh
```


## Installeer uw eigen server met docker(-compose)

### Vereisten
U moet Docker/Podman installeren om een rustdesk-server als docker container te laten draaien

### Docker voorbeelden
```bash
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server hbbs -r <relay-server-ip[:port]>
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server hbbr
```
<a name="net-host"></a>

{{% notice note %}}
`--net=host` werkt alleen op **Linux**, waardoor `hbbs`/`hbbr` het echte inkomende IP Adres ziet in plaats van het Container IP (172.17.0.1).
Als `--net=host` goed werkt, worden de `-p` opties niet gebruikt. Indien op Windows, laat dan `sudo` en `--net=host` weg.

**Verwijder `--net=host` als u verbindingsproblemen heeft op uw platform.**
{{% /notice %}}

### Docker-Compose voorbeelden
Voor het uitvoeren van de dockerbestanden met de docker-compose.yml zoals hier beschreven heb je [**docker-compose**](https://docs.docker.com/compose/) nodig en werkende.
```yaml

networks:
  rustdesk-net:
    external: false

services:
  hbbs:
    container_name: hbbs
    ports:
      - 21115:21115
      - 21116:21116
      - 21116:21116/udp
      - 21118:21118
    image: rustdesk/rustdesk-server:latest
    command: hbbs -r example.com:21117
    volumes:
      - ./data:/root
    networks:
      - rustdesk-net
    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    ports:
      - 21117:21117
      - 21119:21119
    image: rustdesk/rustdesk-server:latest
    command: hbbr
    volumes:
      - ./data:/root
    networks:
      - rustdesk-net
    restart: unless-stopped
```


## Uw eigen serverinstantie opzetten zonder Docker te gebruiken

### STAP 1 : Server-side software programma's downloaden

[Download](https://github.com/rustdesk/rustdesk-server/).

Platform versies voorzien:

- Linux
- Windows

De onderstaande handleiding is gebaseerd op Linux.

Er zijn twee uitvoerbare bestanden en een map:

- `hbbs` - RustDesk ID/Rendezvous server
- `hbbr` - RustDesk relay server

Ze zijn gemaakt op CentOS Linux 7, getest op CentOS Linux 7/8 en Ubuntu 18/20.

#### Server Vereisten

De hardwarevereisten zijn zeer laag; de minimale configuratie van een basiscloudserver is voldoende, en de CPU- en geheugenvereisten zijn minimaal. U kunt ook een Raspberry Pi of iets dergelijks gebruiken. Wat de netwerkgrootte betreft, als de directe TCP hole punching mislukt, wordt het relaisverkeer verbruikt. Het verkeer van een relaisverbinding ligt tussen 30k-3M/s (1920x1080 scherm), afhankelijk van de resolutie-instellingen en de schermupdate. Als het alleen voor kantoorwerk is, is het verkeer ongeveer 100K/s.

### STAP 2 : Voer hbbs en hbbr uit op uw server

#### Optie 1
Voer hbbs/hbbr uit op uw server (CentOS of Ubuntu). We stellen voor dat u [pm2](https://pm2.keymetrics.io/) gebruikt voor het beheer van uw service.

```bash
./hbbs -r <relay-server-ip[:port]>
./hbbr
```

#### Optie 2 - pm2
Voer hbbs/hbbr uit met pm2

```bash
pm2 start hbbs -- -r <relay-server-ip[:port]>
pm2 start hbbr
```

<a name="demo"></a>
{{% notice note %}}
pm2 vereist Node.js v16+, Als het niet lukt om pm2 te starten (bijv. u kunt `hbbs`/`hbbr` niet zien in `pm2 list`), download en installeer dan de Node.js LTS versie van https://nodejs.org. Als je `hbbs`/`hbbr` automatisch wilt laten draaien na een herstart, kijk dan naar `pm2 save` en `pm2 startup`. Meer over [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/). Een ander goed hulpmiddel voor uw logs is [pm2-logrotate](https://github.com/keymetrics/pm2-logrotate).

De `-r` parameter van `hbbs` is niet verplicht, het is gewoon handig om geen relay server te specificeren aan de gecontroleerde client kant. U hoeft geen poort op te geven als u de standaardpoort 21117 gebruikt. De door de klant opgegeven relaisserver heeft dan een hogere prioriteit.
{{% /notice %}}

Standaard luistert `hbbs` op 21115 (TCP) en 21116 (TCP/UDP), 21118 (TCP), en `hbbr` luistert op 21117 (TCP), 21119 (TCP). Zorg ervoor dat u deze poorten in de firewall opent. **Let op: 21116 moet zowel voor TCP als voor UDP zijn ingeschakeld**. 21115 wordt gebruikt voor de NAT type test, 21116/UDP wordt gebruikt voor de ID registratie en heartbeat service, 21116/TCP wordt gebruikt voor TCP hole punching en connection service, 21117 wordt gebruikt voor de Relay services, en 21118 en 21119 worden gebruikt om web clients te ondersteunen. *Als u geen ondersteuning voor webclients (21118, 21119) nodig hebt, kunnen de corresponderende poorten worden uitgeschakeld.

- TCP (**21115, 21116, 21117, 21118, 21119**)
- UDP (**21116**)

Draai met de `-h` optie om de help te zien als u uw eigen poort wilt kiezen.

### STAP 3 : Stel hbbs/hbbr adres in aan client-zijde

Klik op de knop Menu [ &#8942; ] aan de rechterkant van ID zoals hieronder getoond, en kies "ID/Relay Server".

![](/docs/en/self-host/rustdesk-server-oss/install/images/server-set-menu.png)

Voer de `hbbs` host of het IP-adres in het invoerveld **ID Server** in (lokale kant + externe kant). De andere twee adressen kunt u leeg laten, RustDesk leidt ze automatisch af (als ze niet speciaal zijn ingesteld) en de Relay Server verwijst naar `hbbr` (poort 21117).

bijv.

```nolang
hbbs.example.com
```

of

```nolang
hbbs.example.com:21116
```

![](/docs/en/self-host/rustdesk-server-oss/install/images/server-set-window.png)

#### Zet config in rustdesk.exe bestandsnaam (alleen Windows)

Verander `rustdesk.exe` in rustdesk-`host=<host-ip-or-name>,key=<public-key-string>`.exe, bijv. rustdesk-`host=192.168.1.137,key=xfdsfsd32=32`.exe. U kunt het resultaat van de configuratie zien in het onderstaande Over Venster.

<a name="invalidchar"></a>
{{% notice note %}}
U moet zowel `host` als `key` instellen, het ontbreken van een van beide zal niet werken.

Als er ongeldige tekens in de sleutel staan die niet gebruikt kunnen worden in een Windows bestandsnaam, verwijder dan het
`id_ed25519` bestand van uw server en herstart `hbbs`/`hbbr`. Dit zal ervoor zorgen dat het `id_ed25519.pub` bestand opnieuw gegenereerd wordt. Het kan nodig zijn om
dit proces herhalen tot je geldige karakters krijgt.
{{% /notice %}}

| Menu | Over Pagina |
| -- | -- |
![](/docs/en/self-host/rustdesk-server-oss/install/images/aboutmenu.png) | ![](/docs/en/self-host/rustdesk-server-oss/install/images/lic.png) |

## Sleutel

Anders dan in de oude versie is de sleutel in deze versie verplicht, maar je hoeft hem niet zelf in te stellen. Wanneer `hbbs` voor de eerste keer draait, zal het automatisch een paar versleutelde private en publieke sleutels genereren (respectievelijk te vinden in de `id_ed25519` en `id_ed25519.pub` bestanden in de actieve map), waarvan het belangrijkste doel is om communicatie te versleutelen.

Ials u de `Sleutel:` (de inhoud van het openbare sleutelbestand `id_ed25519.pub`) in de vorige stap niet hebt ingevuld, heeft dit geen invloed op de verbinding, maar kan de verbinding niet worden versleuteld.

```bash
cat ./id_ed25519.pub
````

Als u wilt voorkomen dat gebruikers zonder sleutel niet-versleutelde verbindingen tot stand brengen, voeg dan bijvoorbeeld de `-k _` parameter toe bij het uitvoeren van `hbbs` en `hbbr`:

```bash
./hbbs -r <relay-server-ip[:port]> -k _
./hbbr -k _
```

Als je de sleutel wilt veranderen, verwijder dan de `id_ed25519` en `id_ed25519.pub` bestanden en herstart `hbbs`/`hbbr`，`hbbs` zal een nieuw sleutelpaar genereren.

{{% notice note %}}
Als u docker-compose gebruikt en de sleutels bestaan niet, zal de start van de containers verschillende sleutels aanmaken in de mappen hbbs en hbbr.

U zou handmatig sleutels kunnen aanmaken in hbbs en ze naar hbbr kopieren alvorens de containers te starten.

Of je kunt de hbbr container stoppen en de sleutels van hbbs naar de hbbr map kopieren, en dan de container opnieuw starten.
{{% /notice %}}
