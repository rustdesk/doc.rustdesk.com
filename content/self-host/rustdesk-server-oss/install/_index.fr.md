---
title: Installation
weight: 1
---

## Tutoriels vidéo
Il existe de nombreux tutoriels vidéo sur YouTube, https://github.com/rustdesk/rustdesk/wiki/FAQ#video-tutorials.

## Exigences du serveur
Les exigences matérielles sont très faibles ; la configuration minimale d'un serveur cloud de base est suffisante, et les exigences en CPU et mémoire sont minimales. Vous pouvez également utiliser un Raspberry Pi ou quelque chose de similaire. Concernant la taille du réseau, si la connexion directe par perçage TCP échoue, le trafic de relais sera consommé. Le trafic d'une connexion relais se situe entre 30 K/s et 3 M/s (écran 1920x1080) selon les paramètres de résolution et de mise à jour de l'écran. S'il s'agit uniquement d'une demande de travail de bureau, le trafic est d'environ 100 K/s.

## Pare-feu
Si vous avez UFW installé, utilisez les commandes suivantes pour configurer le pare-feu :
```
ufw allow 21114:21119/tcp
ufw allow 21116/udp
sudo ufw enable
```

## Installation
### Méthode 1 : Docker (Recommandé)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/oss.yml -O compose.yml
sudo docker compose up -d
```

Pour plus de détails, veuillez consulter [Docker](/docs/en/self-host/rustdesk-server-oss/docker/).

### Méthode 2 : Installer votre propre serveur en tant que service systemd à l'aide d'un script d'installation simple
Le script est hébergé sur [Techahold](https://github.com/techahold/rustdeskinstall) et pris en charge sur notre [Discord](https://discord.com/invite/nDceKgxnkV).

Actuellement, le script téléchargera et configurera les serveurs de relais et de signal (hbbr et hbbs), générera des configurations et les hébergera sur une page Web protégée par mot de passe pour un déploiement simple sur les clients.

Exécutez les commandes suivantes :
```
wget https://raw.githubusercontent.com/techahold/rustdeskinstall/master/install.sh
chmod +x install.sh
./install.sh
```

Il y a aussi un script de mise à jour sur le dépôt de [Techahold](https://github.com/techahold/rustdeskinstall).

À partir de là, notez l'IP/DNS et la clé affichés à la fin de l'installation et insérez-les dans les champs `Serveur ID` et `Clé` de Paramètres > Réseau > Serveur ID/Relais du client, respectivement, en laissant les autres champs vides (voir note ci-dessous).

### Méthode 3 : Installer votre propre serveur en tant que service systemd en utilisant un fichier deb pour les distributions debian

Veuillez [télécharger](https://github.com/rustdesk/rustdesk-server/releases/latest) les fichiers deb vous-même et les installer avec `apt-get -f install <filename>.deb` ou `dpkg -i <filename>.deb`.

## Configurer le client
Veuillez consulter [ceci](/docs/en/self-host/client-configuration/#2-manual-config).
