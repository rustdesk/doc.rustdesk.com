---
title: Docker
weight: 7
---

> Iată un alt tutorial bun: [Construirea propriului tău Remote Desktop: RustDesk Self-Hosted on Cloud cu Docker (Hetzner)](https://www.linkedin.com/pulse/building-your-own-remote-desktop-solution-rustdesk-cloud-montinaro-bv94f)

## Instalează propriul server cu Docker

### Cerințe
Trebuie să ai instalat Docker/Podman pentru a rula rustdesk-server ca un container Docker. Dacă nu ești sigur, instalează Docker urmând acest [ghid](https://docs.docker.com/engine/install) pentru a te asigura că ai cea mai recentă versiune!

Asigură-te că deschizi următoarele porturi în firewall:
- `hbbs`:
	- `21114` (TCP): folosit pentru consola web, disponibil doar în versiunea `Pro`.
	- `21115` (TCP): folosit pentru testul tipului NAT.
	- `21116` (TCP/UDP): **Reține că `21116` trebuie activat atât pentru TCP, cât și pentru UDP.** `21116/UDP` este folosit pentru înregistrarea ID-ului și serviciul de heartbeat. `21116/TCP` este folosit pentru TCP hole punching și serviciul de conectare.
	- `21118` (TCP): folosit pentru a suporta clienții web.
- `hbbr`:
	- `21117` (TCP): folosit pentru serviciile Relay.
	- `21119` (TCP): folosit pentru a suporta clienții web.

*Dacă nu ai nevoie de suport pentru clienți web, porturile corespunzătoare `21118`, `21119` pot fi dezactivate.*

### Exemple Docker

```sh
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server hbbr
```
<a name="net-host"></a>

{{% notice note %}}
`--net=host` funcționează doar pe **Linux**, ceea ce face ca `hbbs`/`hbbr` să vadă adresa IP reală de intrare în locul adresei IP a containerului (172.17.0.1).
Dacă `--net=host` funcționează corect, opțiunile `-p` nu se folosesc. Pe Windows, omite `sudo` și `--net=host`.

**Te rugăm să elimini `--net=host` dacă ai probleme de conectivitate pe platforma ta.**
{{% /notice %}}

{{% notice note %}}
Dacă nu poți vedea jurnalele cu `-td`, le poți vizualiza cu `docker logs hbbs`. Sau poți rula cu `-it`; în acest caz `hbbs/hbbr` nu vor rula în modul daemon.
{{% /notice %}}

### Exemple Docker Compose
Pentru a rula fișierele Docker cu `compose.yml` așa cum sunt descrise aici, trebuie să ai instalat [Docker Compose](https://docs.docker.com/compose/).

```yaml
services:
	hbbs:
		container_name: hbbs
		image: rustdesk/rustdesk-server:latest
		command: hbbs
		volumes:
			- ./data:/root
		network_mode: "host"

		depends_on:
			- hbbr
		restart: unless-stopped

	hbbr:
		container_name: hbbr
		image: rustdesk/rustdesk-server:latest
		command: hbbr
		volumes:
			- ./data:/root
		network_mode: "host"
		restart: unless-stopped
```

Dacă trebuie să faci modificări de configurare, de exemplu să setezi ALWAYS_USE_RELAY=Y, poți folosi variabile de mediu în `docker-compose.yml`:

```yaml
services:
	hbbs:
		container_name: hbbs
		image: rustdesk/rustdesk-server:latest
		environment:
			- ALWAYS_USE_RELAY=Y
		command: hbbs
		volumes:
			- ./data:/root
		network_mode: "host"

		depends_on:
			- hbbr
		restart: unless-stopped

	hbbr:
		container_name: hbbr
		image: rustdesk/rustdesk-server:latest
		command: hbbr
		volumes:
			- ./data:/root
		network_mode: "host"
		restart: unless-stopped
```

### Exemple Podman Quadlet

Dacă dorești să rulezi containerele cu Podman ca serviciu systemd poți folosi aceste configurații Quadlet de exemplu:

```ini
[Container]
AutoUpdate=registry
Image=rustdesk/rustdesk-server:latest
Exec=hbbs
Volume=/path/to/rustdesk-server/data:/root
Network=host

[Service]
Restart=always

[Install]
WantedBy=default.target
```

sau

```ini
[Container]
AutoUpdate=registry
Image=rustdesk/rustdesk-server:latest
Exec=hbbr
Volume=/path/to/rustdesk-server/data:/root
Network=host

[Service]
Restart=always

[Install]
WantedBy=default.target
```