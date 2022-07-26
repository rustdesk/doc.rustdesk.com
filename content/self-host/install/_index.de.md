---
title: Installation
weight: 10
---
## Installiere deinen eigenen Server mithilfe von Docker(-Compose)
### Anforderungen
Du musst Docker/Podman auf deinem System installiert haben um einen rustdesk-server als Docker-Container laufen zu lassen.
### Docker Beispiel-Kommandos
#### Linux/amd64
```bash
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -it --net=host --rm rustdesk/rustdesk-server hbbs -r <relay-server-ip[:port]> 
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -it --net=host --rm rustdesk/rustdesk-server hbbr 
```
#### Linux/arm64v8
<a name="net-host"></a>

{{% notice note %}}
`--net=host` funktioniert ausschließlich auf Linux, es kümmert sich darum dass hbbs und hbbr die wirkliche anfragende IP Adresse sehen und nicht die Container IP (172.17.0.1).
Wenn `--net=host` gut funktioniert werden die `-p` optionen nicht verwendet

**Bitte entferne `--net=host` wenn du Verbindungsprobleme hast!**
{{% /notice %}}

### Docker-Compose Beispiele
Hierfür ist ein installiertes docker-compose erforderlich.
#### Linux/amd64
```yml
version: '3'

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
      - ./hbbs:/root
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
      - ./hbbr:/root
    networks:
      - rustdesk-net
    restart: unless-stopped
```
#### Linux/arm64v8
```yml
version: '3'

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
    image: rustdesk/rustdesk-server:latest-arm64v8
    command: hbbs -r example.com:21117
    volumes:
      - ./hbbs:/root
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
    image: rustdesk/rustdesk-server:latest-arm64v8
    command: hbbr
    volumes:
      - ./hbbr:/root
    networks:
      - rustdesk-net
    restart: unless-stopped
```

## Installiere deine eigene Serverinstanz ohne Docker
### Schritt 1: Lade die Server-Software herunter
[Download](https://github.com/rustdesk/rustdesk-server/).
Verfügbare Plattform-Varianten:
- Linux
- Windows

Diese Anleitung basiert auf dem Linux-Build.
	Es gibt zwei ausführbare Dateien und einen Ordner:
- `hbbs` - RustDesk ID/Rendezvous Server
- `hbbr` - RustDesk Relay Server

Diese werden auf CentOS Linux 7 gebaut, getestet CentOS Linux 7/8 und Ubuntu 18/20 LTS.

#### Server-Vorsaussetzungen
Die Hardware Voraussetzungen sind sehr niedrig, die Minimalkonfiguration eines einfachen VPS ist ausreichend, so sind auch die CPU und Speicher Voraussetzungen minimal. Auch die Nutzung eines Raspberry Pi ist möglich. In Sachen Netzwerkauslastung wird im Falle des Fehlschlagens der TCP-Punch-Hole Verbindung wird der Traffic über den Relay geleitet. Der Traffic einer Relay Connection ist zwischen 30k und 3M pro Sekunde (1920x1080 Auflösung), abhängig von der Auflösung und der Bildwiederholfrequenz. Wenn es nur um normale Büroarbeit geht, sollte sich der Traffic auf etwa 100k/s belaufen.

### Schritt 2: Führe hbbs und hbbr auf dem Server
Starte hbbs und hbbr auf deinem Server (CentOS oder Ubuntu). Wir empfehlen die Nutzung von pm2 zum Managen des Service.
```bash
./hbbs -r <relay-server-ip[:port]>
./hbbr
```

oder starte hbbs/hbbr mit pm2 aus:
```bash
pm2 start hbbs -- -r <relay-server-ip[:port]>
pm2 start hbbr
```

<a name="demo"></a>
{{% notice note %}}
pm2 benötigt nodejs v16+, falls die Ausführung von pm2 fehlschlägt (bspw. tauchen 'hbbs'/'hbbr' in `pm2' list nicht auf), downloade und installiere die nodejs LTS-Version von https://nodejs.org. Wenn du `hbbs`/`hbbr` automatisch starten möchtest beim booten, führe bitte `pm2 save` und `pm2 startup` aus. Mehr über [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/). Ein gutes Tool für Logs ist [pm2-logrotate](https://github.com/keymetrics/pm2-logrotate).

Der `-r` parameter von `hhbs` ist nicht zwingend erforderlich, es ist aber normal keinen relay-Server clientseitig zu konfigurieren. Falls der Standardport 21117 genutzt wird muss kein Port angegeben werden. Der Relay-Server der durch den Client spezifiziert wird hat grundsätzlich eine höhere Priorität als der hier spezifizierte.
{{% /notice %}}

Standardmäßig hört `hbbs` auf den Ports 21115(tcp), 21116(tcp/udp) und 21118(tcp) and `hbbr` hört auf 21117(tcp) und 21119(tcp). Diese Ports müssen in der Firewall geöffnet sein. **Beachte, dass 21116 sowohl für TCP als auch UDP aktiviert sein muss**. 21115 wird genutzt für den NAT Typ Test, 21116/UDP für die ID Registrierung und den Heartbeat Service, 21116/TCP für das TCP Hule Punching und den Verbindungs Service, 21117 für die Relay Services, und 21118 und 21119 für den Support von Webclients. Wenn die Unterstützung von Web Clients nicht benötigt wird können 21118 und 21119 natürlich geschlossen werden.

- TCP(**21115, 21116, 21117, 21118, 21119**)
- UDP(**21116**)

Bitte führ die `-h` Option aus um die Hilfe aufzurufen
<a name="net-host"></a>

{{% notice note %}}
`--net=host` funktioniert ausschließlich auf Linux, es kümmert sich darum dass hbbs und hbbr die wirkliche anfragende IP Adresse sehen und nicht die Container IP (172.17.0.1).
Wenn `--net=host` gut funktioniert werden die `-p` optionen nicht verwendet

**Bitte entferne `--net=host` wenn du Verbindungsprobleme hast!**
{{% /notice %}}

### Schritt 3: Konfiguriere die hbbs/hbbr Adresse im Client
Klicke auf den Menü-Button rechts neben der ID, wie im Screenshot zu sehen, und wähle "ID/Relay Server".

![](/docs/en/self-host/install/images/server-set-menu.png)

Trage dort den Domainnamen oder die IP-Adresse des hbbs-Server ein. Die anderen beiden Adressen und der Key können freigelassen werden, diese werden automatisch ausgemacht.

![](/docs/en/self-host/install/images/server-set-window.png)

### Übergebe die Konfiguration mit dem rustdesk.exe Dateinamen (nur bei Windows)
Ändere den Dateinamen `rustdesk.exe` zu rustdesk-`host=<host-ip-or-name>,key=<public-key>`.exe, z.B. rustdesk-`host=192.168.178.150,key=xdsgdda32=32`.exe. Ob das geklappt hat, kann im About Rustdesk Fenster ausm Screenshot unten geprüft werden.
<a name="invalidchar"></a>
{{% notice note %}}
Sowohl der `host` als auch der `key` müssen gesetzt werden, sonst funktionieren beide nicht.

Falls irgendwelche invaliden Szeichen im key zu finden sind, die nicht in einem Windowsdateinamen sein dürfen, entferne bitte die `id_ed25519` Datei vom Server und starte hbbs und hbbr neu. Daraufhin wird die `id_ed25519.pub` neu generiert. Unter Umständen muss dieser Prozess mehrmals wiederholt werden.
{{% /notice %}}

| Menu | About Page |
| -- | -- |
![](/docs/en/self-host/install/images/aboutmenu.png) | ![](/docs/en/self-host/install/images/lic.png) |

### Key

Im Gegensatz zu Vorgängerversion, ist der Key inzwischen zwingend erforderlich, aber er muss nicht selbst gesetzt werden. Bei der ersten Ausführung von `hbbs` wird ein Keypair von private und public Keys nach ed25519 automatisch erzeugt und abgelegt und anschließend primär für die Kommunikationsverschlüsselung genutzt.


[English](/docs/en/self-host/install)
