---
title: Docker
weight: 3
---

## Docker Compose (Recomandat)

Cu Docker Compose TREBUIE să folosești `network_mode: "host"` pentru a te asigura că licențierea funcționează. Instalează Docker urmând acest [ghid](https://docs.docker.com/engine/install) pentru a avea cea mai recentă versiune.

Copiază conținutul de mai jos în `compose.yml`.

```yaml
services:
	hbbs:
		container_name: hbbs
		image: docker.io/rustdesk/rustdesk-server-pro:latest
		command: hbbs
		volumes:
			- ./data:/root
		network_mode: "host"

		depends_on:
			- hbbr
		restart: unless-stopped

	hbbr:
		container_name: hbbr
		image: docker.io/rustdesk/rustdesk-server-pro:latest
		command: hbbr
		volumes:
			- ./data:/root
		network_mode: "host"
		restart: unless-stopped
```

Apoi rulează `sudo docker compose up -d` sau `podman-compose up -d`.

> Pentru `podman-compose` pe Debian/Ubuntu: `sudo apt install podman-compose`.

{{% notice note %}}
Cum să [configurezi HTTPS pentru consola web manual](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).
{{% /notice %}}

## Comenzi Docker

Instalează Docker urmând acest [ghid](https://docs.docker.com/engine/install) pentru a fi la zi.

Sau poți instala Docker cu o singură comandă:

```
bash <(wget -qO- https://get.docker.com)
```

Rulează comenzile de mai jos (imaginea s6 poate necesita `./data:/data` în loc de `./data:/root`):

```sh
sudo docker image pull rustdesk/rustdesk-server-pro
sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
Exemplele de mai sus folosesc `sudo` și `--net=host`; acestea nu funcționează pe Windows — elimină-le pe Windows și, dacă renunți la `--net=host`, verifică instrucțiunile de mai jos pentru maparea porturilor.
{{% /notice %}}

Pentru sisteme unde nu poți folosi `--net=host`, poți mapa explicit porturile:

```sh
macaddrhbbs=$(echo -n A0-62-2F; dd bs=1 count=3 if=/dev/random 2>/dev/null |hexdump -v -e '/1 "-%02X"')
sudo docker run --name hbbs -p 21114:21114 -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v ./data:/root -td --mac-address="$macaddrhbbs" --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbs
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v ./data:/root -td --restart unless-stopped docker.io/rustdesk/rustdesk-server-pro hbbr
```

{{% notice note %}}
Cum să [configurezi HTTPS pentru consola web manual](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).
{{% /notice %}}

Dacă întâmpini probleme cu SELinux pe Fedora, vezi acest [issue](https://github.com/rustdesk/rustdesk-server/issues/230).