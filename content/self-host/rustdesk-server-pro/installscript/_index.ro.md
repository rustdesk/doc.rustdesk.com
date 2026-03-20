---
title: Instalare
weight: 2
description: "Documentație RustDesk pentru Instalare. Găsiți ghiduri de instalare, configurare, implementare și depanare."
keywords: ["rustdesk server pro install", "rustdesk self-host pro", "rustdesk pro docker", "rustdesk pro linux install", "rustdesk pro windows install"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## Răspuns rapid

Pentru majoritatea echipelor, Docker este cea mai bună metodă de a instala RustDesk Server Pro, deoarece face upgrade-urile și rollback-ul mai simple. Folosește `install.sh` dacă vrei servicii Linux native sau calea de conversie dacă rulezi deja OSS.

## Puncte cheie

- O licență RustDesk Server Pro
- Un server Linux, o mașină virtuală sau un host cu Docker disponibil
- Porturile necesare, plus `21114` sau `443` pentru consola web și API
- DNS opțional dacă vrei HTTPS pe un domeniu

<!-- GEO-LOCALIZED-INTRO:END -->

## Metoda 1: Docker (Recomandat)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

Pentru mai multe detalii, verifică [Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/).

## Metoda 2: install.sh

Dacă ești confortabil cu Linux, poți folosi scriptul de mai jos. În caz contrar, dacă scriptul eșuează este posibil să întâmpini probleme dificile de diagnosticat.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

Pentru mai multe detalii, verifică [install.sh](/docs/en/self-host/rustdesk-server-pro/installscript/script/).

## Conversie din versiunea open source

### Docker
Dacă ai instalat versiunea open-source folosind Docker, nu există o metodă directă de conversie in-place. Va trebui să rulezi un container nou cu imaginea Pro. Înainte de asta, fă backup la cheia ta privată (fișierul `id_ed25519`, nu `id_ed25519.pub`). După configurarea noului container, copiază fișierul privat `id_ed25519` în directorul de lucru al noului container și repornește containerul.

### install.sh
Dacă ai instalat versiunea open-source folosind `install.sh`, urmează pașii de pe această pagină: /docs/en/self-host/rustdesk-server-pro/installscript/script/#convert-from-open-source