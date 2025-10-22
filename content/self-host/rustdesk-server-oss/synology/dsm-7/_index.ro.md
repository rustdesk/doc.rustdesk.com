---
title: Synology DSM 7.2
weight: 20
---
<!-- Pentru traducători: Când traduceți elemente din interfață (de ex. "butone"), nu doar traduceți literal, consultați denumirile reale din interfața Synology. -->

După actualizarea la DSM 7.2, Synology și-a redenumit pachetul „Docker” în „Container Manager”. Acesta aduce o interfață nouă și include suport pentru "docker-compose" în GUI, ceea ce facilitează crearea containerelor Docker.

## Modele suportate și cerințe

Container Manager aduce suport ARM64 pentru unele modele mai simple, cum ar fi seria J; pentru lista detaliată a modelelor suportate, verifică [site-ul Synology](https://www.synology.com/en-us/dsm/packages/ContainerManager).
De cele mai multe ori nu va fi necesară instalarea de memorie RAM suplimentară pentru a rula Docker și RustDesk Server.

## 1. Instalează Container Manager (Docker)

Deschide „Package Center”, caută și instalează „Container Manager”.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_install_container_manager_though_package_center.png)

## 2. Creează folderele necesare

După ce ai instalat „Container Manager”, acesta va crea un Shared Folder numit `docker`; vom folosi acest loc pentru datele serverului.

Deschide File Station și creează un folder numit `rustdesk-server` (sau orice denumire preferi). Apoi creează în el un folder numit `data`, exact ca în imagine.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_create_required_folders.png)

## 3. Creează containerul

Deschide Container Manager, mergi la Projects și click pe Create.

Introdu numele proiectului `rustdesk-server` și schimbă Source din "Upload compose.yml" în "Create compose.yml", apoi copiază conținutul de mai jos în casetă.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_creating_project_init.png?v2)

```yaml
services:
	hbbs:
		container_name: hbbs
		image: rustdesk/rustdesk-server:latest # Please change this to rustdesk/rustdesk-server-pro:latest if you want to install Pro.
		command: hbbs
		volumes:
			- ./data:/root
		network_mode: host
		depends_on:
			- hbbr
		restart: always

	hbbr:
		container_name: hbbr
		image: rustdesk/rustdesk-server:latest # Please change this to rustdesk/rustdesk-server-pro:latest if you want to install Pro.
		command: hbbr
		volumes:
			- ./data:/root
		network_mode: host
		restart: always

# Because using docker host mode
# Just in case you forgot the ports:
# 21114 TCP for web console, only available in Pro version
# 21115 TCP for NAT type test
# 21116 TCP TCP hole punching
# 21116 UDP heartbeat/ID server
# 21117 TCP relay
```

Sari peste `Web portal settings`, apoi finalizează (Done).

## 4. Verifică că funcționează

Deschide File Station; în `docker/rustdesk-server/data` ar trebui să vezi fișierele `id_ed25519` și `id_ed25519.pub`. Le poți descărca și deschide cu orice editor de text sau cu [Synology Text Editor](https://www.synology.com/en-us/dsm/packages/TextEditor). Aceasta este cheia publică de care ai nevoie pentru clientul RustDesk.

Cheia publică arată aproximativ așa:

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_viewing_public_key_though_syno_text_editor.png)

Verifică [aici](/docs/en/client) pentru configurarea clientului. Sunt necesare doar câmpurile `ID server` și `Key`. `Relay server` nu este necesar deoarece această informație este furnizată automat de către `hbbs`.

## 5. Configurează port forwarding pe router

Accesează pagina de administrare a routerului, caută setările legate de `Port forwarding`; acestea se găsesc de obicei în secțiunea `WAN` sau `Firewall`.

Dacă nu găsești setarea, caută pe Google `{Nume Router} + port forwarding` sau `{Model Router} + port forwarding`. Dacă routerul a fost furnizat de ISP, întreabă-i pe ei.

Deschide următoarele porturi necesare:
	* `21114` TCP pentru consola web (doar în versiunea Pro)
	* `21115` TCP pentru testul tipului NAT
	* `21116` TCP pentru TCP hole punching
	* `21116` UDP pentru heartbeat/ID server
	* `21117` TCP pentru relay