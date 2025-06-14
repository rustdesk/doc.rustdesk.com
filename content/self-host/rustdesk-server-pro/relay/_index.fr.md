---
title: Configurer les serveurs de relais
weight: 17
---

### RustDesk Pro - Installer des serveurs de relais supplémentaires avec géolocalisation en utilisant docker

{{% notice note %}}
[L'installation simple](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/) crée un serveur de relais (le processus `hbbr`) implicitement sur la même machine, vous n'avez pas besoin de spécifier le serveur de relais explicitement.

Si vous souhaitez créer un serveur de relais supplémentaire explicitement sur une autre machine, veuillez exécuter `hbbr` en suivant [l'installation OSS](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/). Vous pouvez trouver `hbbr` dans `rustdesk-server-linux-amd64.tar.gz`, `rustdesk-server-hbbr_<version>-<arch>.deb`, `rustdesk-server-windows-x86_64.tar.gz` ou dans `docker` (`sudo docker run ... rustdesk/rustdesk-server-pro hbbr`).

`hbbr` ne nécessite pas de licence et est identique à la version open source.
{{% /notice %}}

Vous pouvez avoir plusieurs serveurs de relais fonctionnant à travers le globe et exploiter la géolocalisation automatiquement pour utiliser le serveur de relais le plus proche, vous donnant une expérience plus rapide lors de la connexion aux ordinateurs distants. `hbbs` vérifie automatiquement si ces serveurs de relais sont en ligne toutes les quelques secondes, il ne choisit que les serveurs de relais en ligne.

{{% notice note %}}
Problème connu : https://github.com/rustdesk/rustdesk/discussions/7934
{{% /notice %}}

> Vous aurez besoin de la paire de clés privées `id_ed25519` et `id_ed25519.pub`.

1 - Si docker est déjà installé, connectez-vous à votre serveur via SSH et créez un volume pour hbbr.

```
# docker volume create hbbr
```

Le volume hbbr devrait être situé dans `/var/lib/docker/volumes/hbbr/_data`.

2 - Copiez la paire de clés privées vers l'emplacement du volume, dans ce cas nous utiliserons SCP pour copier les fichiers.

La syntaxe de la commande est `scp <chemin/nom_fichier> nom_utilisateur@serveur:</chemin/destination>`.

```
# scp id_ed25519 root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
# scp id_ed25519.pub root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
```

3 - Déployez le conteneur hbbr en utilisant le volume précédemment créé. Ce volume contient la paire de clés privées nécessaire pour exécuter votre serveur de relais privé.

```
# sudo docker run --name hbbr -v hbbr:/root -td --net=host rustdesk/rustdesk-server hbbr -k _
```

4 - Vérifiez les journaux d'exécution pour vérifier que hbbr fonctionne en utilisant votre paire de clés.

```
# docker logs hbbr

INFO [src/common.rs:121] **Private key comes from id_ed25519**
NFO [src/relay_server.rs:581] Key: XXXXXXXXXXXXXXXXXXXXX
INFO [src/relay_server.rs:60] #blacklist(blacklist.txt): 0
INFO [src/relay_server.rs:75] #blocklist(blocklist.txt): 0
INFO [src/relay_server.rs:81] Listening on tcp :21117
```

Selon votre OS, vous pourriez vouloir bloquer/autoriser les IPs en utilisant un pare-feu.

Dans notre cas, en exécutant Ubuntu nous voulons autoriser toutes les connexions TCP, vers les ports 21117 et 21119.

```
# sudo ufw allow proto tcp from any to any port 21117,21119
```

**Activer le pare-feu**
```
# sudo ufw enable
```

**Vérifier le statut**
```
# ufw status

Status: active

To                         Action      From
--                         ------      ----
21117,21119/tcp            ALLOW       Anywhere
21117,21119/tcp (v6)       ALLOW       Anywhere (v6)
```

### Configurer RustDesk Pro pour la géolocalisation en utilisant la console Web

#### Enregistrer et télécharger le fichier de base de données GeoLite2 City

Pour utiliser la géolocalisation, hbbs a besoin d'accéder à la base de données MaxMind GeoLite2 City. La base de données est gratuite et vous pouvez vous enregistrer pour télécharger le fichier et obtenir une clé API.

Commencez par créer un compte (si vous n'en avez pas) en allant sur le [site web](https://www.maxmind.com/en/account/login).
Allez à `Download Databases` et téléchargez GeoLite2 City, choisissez le fichier gzip et vous devriez avoir le fichier `mmdb` lors de la décompression.

<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/e14318fb-ec52-463c-af77-d08c9479c1b5">

Si vous avez installé RustDesk Pro en utilisant le script d'installation sur une machine Linux, le fichier `mmdb` doit être déplacé vers `/var/lib/rustdesk-server/`.

Pour les installations Docker, le fichier devrait être dans le volume que vous avez mappé lors du déploiement du conteneur mappé vers `/root`.

#### Obtenir une clé API pour automatiser le processus - serveurs Linux

Vous devez mettre à jour ce fichier régulièrement et nous pouvons utiliser un cronjob pour cela. Vous aurez besoin d'une clé API pour accéder au lien de téléchargement qui est gratuit.

Allez à `Manage License Keys` et générez une nouvelle clé de licence. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/632aeb33-4f5d-4a31-9010-38e01c22d3c9">
<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/3e178174-5fbf-46b7-a335-01f77125dfad">

Vous pouvez automatiser le [processus de téléchargement](https://dev.maxmind.com/geoip/updating-databases) de plusieurs façons, mais vous ajoutez la commande suivante à votre crontab en remplaçant {Your Access Key} par la clé API que vous avez obtenue de l'étape précédente.

```
/usr/bin/curl -L --silent 'https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key={Your Access Key}&suffix=tar.gz' | /bin/tar -C '/var/lib/rustdesk-server/' -xvz --keep-newer-files --strip-components=1 --wildcards '*GeoLite2-City.mmdb'
```

#### Modifier les paramètres dans la console Web RustDesk Pro

Ajoutez vos adresses IP ou noms DNS des serveurs de relais (DNS est supporté depuis la version 1.1.11) aux `Serveurs de relais`. **Le port n'est pas requis, le port `21117` est utilisé explicitement.** <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/c4452ba4-5e1d-437a-ae1d-fc0070bfa26c">

Ajoutez un remplacement géographique en ajoutant l'adresse IP du serveur et les coordonnées où se trouve le serveur. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/41c558e3-423b-4296-90d3-cb0769f4a369">

Cliquez sur `Reload Geo` et votre liste devrait ressembler à ceci. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/5a0d39a9-4fec-46b4-a7a2-7ed38b6baeb7">

Pour confirmer les résultats, vérifiez vos journaux hbbs lors du clic sur `Reload Geo`, vous devriez voir un message montrant les adresses IP des serveurs de relais et leurs coordonnées.

> Si vous exécutez RustDesk Pro sur une machine Linux utilisez la commande `RUST_LOG=debug ./hbbs` pour afficher les journaux. Si vous exécutez sur un conteneur Docker utilisez `docker logs hbbs`.

```
RUST_LOG=debug ./hbbs

INFO [src/common.rs:130] GEOIP_FILE: ./GeoLite2-City.mmdb
INFO [src/common.rs:159] override 1xx.xxx.xxx.x7: -1.xx 5x.xxx
[src/common.rs:159] override 1xx.xxx.xxx.xx8: -3.xxx 5x.xxxx
[src/common.rs:159] override 7xx.xxx.xxxx.xx1: 6.xxx 5x.xxxx
GEOIP_FILE loaded, #overrides 3
INFO [src/common.rs:119] relay-servers=["1xx.xxx.xxx.x7", "1xx.xxx.xxx.xx8", "7xx.xxx.xxx.xx1"]
NFO [src/rendezvous_server.rs:1467] parsed relay servers: [("1xx.xxxx.xxx.xx7", Some((-1x, xxx))), ("1xx.xxx.xxx.xx8", Some((-3x, xxx))), ("7xx.xxx.xxx.xx1", Some((6x, xxx)))]
```

Vous pouvez également confirmer les demandes de relais directement sur vos instances hbbr, simplement en vérifiant les journaux du conteneur.

```
# docker logs hbbr

INFO [src/relay_server.rs:436] Relayrequest 0593e64e-4fe8-4a59-a94f-b3420ab043eb from [::ffff:100.100.123.233]:52038 got paired
INFO [src/relay_server.rs:442] Both are raw
```