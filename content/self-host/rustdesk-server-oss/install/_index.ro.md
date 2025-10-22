---
title: Instalare
weight: 1
---

## Tutoriale video
Există multe tutoriale video pe YouTube: https://github.com/rustdesk/rustdesk/wiki/FAQ#video-tutorials.

## Cerințe server
Cerințele hardware sunt foarte mici; o configurație minimă a unui server cloud de bază este suficientă, iar cerințele de CPU și memorie sunt minime. Poți folosi, de asemenea, un Raspberry Pi sau ceva similar. În ceea ce privește consumul de rețea, dacă conexiunea directă prin TCP hole punching eșuează, traficul va trece prin relay. Traficul unei conexiuni relay variază între 30 K/s și 3 M/s (ecran 1920x1080), în funcție de setările de rezoluție și de actualizarea ecranului. Dacă este folosit doar pentru activități de birou, traficul este în jur de 100 K/s.

## Firewall
Dacă ai UFW instalat, folosește următoarele comenzi pentru a configura firewall-ul:
```
ufw allow 21114:21119/tcp
ufw allow 21116/udp
sudo ufw enable
```

## Instalare
### Metoda 1: Docker (Recomandat)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/oss.yml -O compose.yml
sudo docker compose up -d
```

Pentru mai multe detalii, verifică [Docker](/docs/en/self-host/rustdesk-server-oss/docker/).

### Metoda 2: Instalează propriul server ca serviciu systemd folosind un script de instalare ușor de rulat
Scriptul este găzduit la [Techahold](https://github.com/techahold/rustdeskinstall) și este susținut în comunitatea noastră de pe [Discord](https://discord.com/invite/nDceKgxnkV).

În prezent, scriptul va descărca și configura serverele Relay și Signal (hbbr și hbbs), va genera configurațiile și le va găzdui pe o pagină web protejată prin parolă pentru o implementare simplă către clienți.

Rulează următoarele comenzi:
```
wget https://raw.githubusercontent.com/techahold/rustdeskinstall/master/install.sh
chmod +x install.sh
./install.sh
```

Există, de asemenea, un script de actualizare în repository-ul [Techahold](https://github.com/techahold/rustdeskinstall).

După instalare, notează IP/DNS și Key afișate la final și introdu-le în client la Settings > Network > câmpurile `ID server` și `Key`, lăsând celelalte câmpuri necompletate (vezi nota de mai jos).

### Metoda 3: Instalează propriul server ca serviciu systemd folosind pachet .deb pentru distribuții Debian

Te rog [descarcă](https://github.com/rustdesk/rustdesk-server/releases/latest) fișierele .deb și instalează-le cu `apt-get -f install <filename>.deb` sau `dpkg -i <filename>.deb`.

## Configurează clientul
Te rog verifică [această pagină](/docs/en/self-host/client-configuration/#2-manual-config).