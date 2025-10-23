---
title: install.sh
weight: 4
---

{{% notice note %}}
Nu uita să obții licența de la [https://rustdesk.com/pricing/](https://rustdesk.com/pricing/), vezi pagina de [license](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) pentru detalii.

Te rugăm să citești mai întâi ghidul pentru [instalarea OSS](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/) înainte de a rula acest instalator simplu. Acolo găsești detalii tehnice utile.
{{% /notice %}}

## Instalare

Copiază și lipește comanda de mai jos în terminalul tău Linux pentru a instala RustDesk Server Pro.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh | bash`

{{% notice note %}}
Recomand folosirea [imaginii Docker](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/docker/#docker-compose); aceasta simplifică mult implementarea și actualizările. Consumă foarte puține resurse.

Rulează scriptul de instalare din directorul tău home, nu dintr-un director în care nu ai permisiuni de scriere.
{{% /notice %}}

Ce face scriptul:

- Instalează dependențe necesare
- Configurează UFW dacă este disponibil
- Creează directorul de lucru `/var/lib/rustdesk-server` și directorul de log `/var/log/rustdesk-server`
- Instalează executabilele în `/usr/bin`
- Descarcă și extrage serviciile RustDesk Pro în directorul menționat
- Creează servicii systemd pentru `hbbs` și `hbbr` (numele serviciilor: `rustdesk-hbbs.service` și `rustdesk-hbbr.service`)
- Dacă alegi opțiunea Domain, instalează Nginx și Certbot pentru a expune API-ul pe portul `443` (HTTPS) și a obține automat certificat SSL pe portul `80`. Când HTTPS este gata, accesează `https://domeniul-tau` (fără :21114).

{{% notice note %}}
Cum să [configurezi HTTPS pentru consola web manual](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).
{{% /notice %}}

{{% notice note %}}
Dacă serviciul systemd nu pornește, problema poate fi legată de SELinux; vezi secțiunea relevantă din FAQ.
{{% /notice %}}

{{% notice note %}}
Dacă clientul nu poate conecta la server sau nu poți accesa consola web, verifică setările de firewall: https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#firewall
{{% /notice %}}

## Upgrade

Copiază și lipește comanda de mai jos în terminal pentru a actualiza instalarea RustDesk Server Pro; comanda poate fi păstrată local și programată cu cron.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/update.sh | bash`

{{% notice note %}}
Dacă întâmpini probleme cu acest script, inspectează-l și execută pașii manual, unul câte unul.

Rulează scriptul din directorul tău home, nu dintr-un director fără permisiuni de scriere.
{{% /notice %}}

Ce face update.sh:

- Verifică dacă există versiuni noi ale RustDesk Server Pro
- Dacă găsește o versiune nouă, elimină fișierele API vechi și descarcă noile executabile și fișiere API

## Conversie din open source

Pentru a converti o instalare Open Source la Pro, rulează comanda de mai jos în terminal:

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/convertfromos.sh | bash`

{{% notice note %}}
Adaugă regula firewall pentru portul TCP `21114` — acesta este portul suplimentar folosit de consola web și pentru autentificarea utilizatorilor în clientul RustDesk.
{{% /notice %}}

{{% notice note %}}
Dacă întâmpini probleme cu acest script, recomand trecerea la instalarea Docker sau rularea pașilor din script manual, unul câte unul.
{{% /notice %}}

Ce face `convertfromos.sh`:

- Dezactivează și elimină serviciile vechi
- Instalează dependențe necesare
- Configurează UFW dacă este disponibil
- Creează folderul `/var/lib/rustdesk-server` și copiază certificatele acolo
- Șterge `/var/log/rustdesk` și creează `/var/log/rustdesk-server`
- Descarcă și extrage serviciile RustDesk Pro în directorul respectiv
- Creează servicii systemd pentru `hbbs` și `hbbr` (numele serviciilor: `rustdesk-hbbs.service` și `rustdesk-hbbr.service`)
- Dacă alegi Domain, instalează Nginx și Certbot pentru a expune API-ul pe portul `443` (HTTPS) și a obține automat certificat SSL pe portul `80`.