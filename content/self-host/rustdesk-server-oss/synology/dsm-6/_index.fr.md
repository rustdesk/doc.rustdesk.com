---
title: Synology DSM 6
weight: 22
---

> Un tutoriel alternatif à jour de tiers est [ici](https://mariushosting.com/how-to-install-rustdesk-on-your-synology-nas/).

Ce tutoriel est basé sur les dernières versions DSM v6 et v7.

{{% notice note %}}
Après la mise à jour DSM 7.2, Docker a été mis à niveau vers le nouveau "Container Manager", veuillez vérifier [cet article](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7) à la place.
{{% /notice %}}

## Installer Docker

| Ouvrir le Centre de Paquets | Installer Docker |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/package-manager.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/docker.png) |

## Installer RustDesk Server

| Rechercher rustdesk-server dans le registre Docker et installer en double-cliquant | Image rustdesk-server installée, double-cliquer pour créer le conteneur rustdesk-server |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/pull-rustdesk-server.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/rustdesk-server-installed.png) |

## Créer le conteneur hbbs

Comme mentionné ci-dessus, double-cliquez sur l'image rustdesk-server pour créer un nouveau conteneur, définissez le nom sur `hbbs`.
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbs.png)

Cliquez sur `Paramètres Avancés` ci-dessus.

- Activez `Activer le redémarrage automatique`.
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/auto-restart.png)

- Activez `Utiliser le même réseau que l'Hôte Docker`. Pour plus d'infos sur host net, veuillez [vérifier](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/docker/#net-host).
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/host-net.png)

- Montez un répertoire hôte (ex. `/home/rustdesk/`) vers `/root`, hbbs va générer quelques fichiers (base de données et fichiers `key`) dans ce répertoire qui doivent persister à travers les redémarrages.

| Monter | Fichiers générés dans le répertoire hôte |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/mount.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/mounted-dir.png) |

- Définir la commande
{{% notice note %}}
L'OS de Synology est basé sur Debian, donc host net (--net=host) fonctionne bien, nous n'avons pas besoin de mapper les ports avec l'option `-p`.

{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbs-cmd.png?v3)

- Terminé

## Créer le conteneur hbbr

Veuillez répéter les étapes `hbbs` ci-dessus, mais nommez le conteneur `hbbr` et la commande (pour l'Étape Définir Commande) devrait être `hbbr`.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbr-config.png)

## conteneurs hbbr/hbbs

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/containers.png)

| Double-cliquez sur le conteneur et vérifiez le log | Double confirmez que hbbs/hbbr utilisent le réseau hôte |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/log.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/network-types.png) |

## Récupérer votre Clé

Naviguez vers le dossier configuré précédemment en utilisant File Station, téléchargez `id_ed25519.pub` et ouvrez-le avec un éditeur de texte pour voir votre clé.