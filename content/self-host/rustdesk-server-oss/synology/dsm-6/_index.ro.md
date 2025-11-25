---
title: Synology DSM 6
weight: 22
---

> Un tutorial alternatiu și actualizat de la terți este disponibil [aici](https://mariushosting.com/how-to-install-rustdesk-on-your-synology-nas/).

Acest tutorial se bazează pe versiunile DSM v6 și v7.

{{% notice note %}}
După actualizarea la DSM 7.2, Docker a fost înlocuit cu noul „Container Manager”; te rugăm să consulți [acest articol](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7) în schimb.
{{% /notice %}}

## Instalare Docker

| Deschide Package Center | Instalează Docker |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/package-manager.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/docker.png) |

## Instalare RustDesk Server

| Caută rustdesk-server în registrul Docker și instalează făcând dublu click | Imaginea rustdesk-server instalată, dublu click pentru a crea containerul rustdesk-server |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/pull-rustdesk-server.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/rustdesk-server-installed.png) |

## Creare container hbbs

După cum s-a menționat mai sus, fă dublu click pe imaginea rustdesk-server pentru a crea un container nou și setează-i numele `hbbs`.
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbs.png)

Click pe `Advanced Settings` din imaginea de mai sus.

- Activează `Enable auto-restart`.
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/auto-restart.png)

- Activează `Use the same network as Docker Host`. Pentru mai multe detalii despre host net, verifică [acest ghid](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/docker/#net-host).
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/host-net.png)

- Montează un director de pe gazdă (de exemplu `/home/rustdesk/`) la `/root`; hbbs va genera fișiere (baza de date și fișiere `key`) în acest director care trebuie păstrate persistent peste reporniri.

| Mount | Fișiere generate în directorul gazdă |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/mount.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/mounted-dir.png) |

- Setează comanda
{{% notice note %}}
Sistemul de operare al Synology este bazat pe Debian, deci host net (`--net=host`) funcționează corect; nu este necesar să mapăm porturi cu opțiunea `-p`.

{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbs-cmd.png?v3)

- Gata

## Creare container hbbr

Repetă pașii de mai sus pentru `hbbs`, dar denumește containerul `hbbr` iar comanda pentru pasul Set Command trebuie să fie `hbbr`.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbr-config.png)

## Containerele hbbr/hbbs

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/containers.png)

| Dublu click pe container și verifică jurnalul | Confirmă că hbbs/hbbr folosesc rețeaua host |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/log.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/network-types.png) |

## Recuperează-ți Key-ul

Accesează folderul montat folosind File Station, descarcă `id_ed25519.pub` și deschide-l cu un editor de text pentru a obține cheia ta.