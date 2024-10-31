---
title: Installation
weight: 10
---

## Installez votre propre serveur à l'aide d'un script d'installation simple d'exécution
Le script est hébergé sur https://github.com/dinger1986/rustdeskinstall, et voici notre support [Discord](https://discord.com/invite/nDceKgxnkV).

Actuellement, le script téléchargera et configurera les serveurs de relais et de signal (HBBR et HBBS), générera des configurations mises à disposition sur une page Web protégée par mot de passe pour un déploiement simple sur les clients.

### Exigences
Vous devez avoir installé Linux, le script est testé avec Centos Linux 7/8, Ubuntu 18/20 et Debian. Un serveur avec 1 CPU, 1 Go de RAM et 10 Go d'espace disque est suffisant pour exécuter Rustdesk.

####  Comment installer le serveur
Veuillez configurer le pare-feu sur votre serveur avant d'exécuter le script.

Assurez-vous d'avoir un accès SSH, et assurez vous que votre pare-feu autorise cet accès.

Exemple: UFW (basé sur Debian) afin d'autoriser une connexion ssh
```
ufw allow 22:22/tcp
```

#### Si vous avez installé UFW, utilisez les commandes suivantes pour configurer le pare-feu :
```
ufw allow 21115:21119/tcp
ufw allow 8000/tcp
ufw allow 21116/udp
sudo ufw enable
```

#### Exécutez les commandes suivantes :
```
wget https://raw.githubusercontent.com/dinger1986/rustdeskinstall/master/install.sh
chmod +x install.sh
./install.sh
```


## Installez votre propre serveur avec Docker(-compose)

### Exigences
Vous devez avoir installé Docker/Podman afin d'exécuter un serveur Rustdesk en tant que conteneur Docker.

### Exemples avec Docker
```bash
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server hbbs
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server hbbr
```
<a name="net-host"></a>

{{% notice note %}}
`--net=host` ne fonctionne que pour **Linux**, ce qui permet à `HBBS` /` HBBR` de voir l'adresse IP publique entrante plutôt que l'adresse IP privée du conteneur (ex. 172.17.0.1).
Si `--net=host` fonctionne , l'option `-p` ne sera pas utile. Pour windows, omettez `sudo` et `--net=host`.

**Veuillez supprimer `--net = host` si vous rencontrez des problèmes de connexion sur votre configuration.**
{{% /notice %}}

### Exemples avec Docker-Compose
Pour exécuter les fichiers docker avec compose.yml comme ci-dessous, vous devez avoir [**docker-compose**] (https://docs.docker.com/compose/) d'installé.

```yaml

networks:
  rustdesk-net:
    external: false

services:
  hbbs:
    container_name: hbbs
    ports:
      - 21115:21115
      - 21116:21116
      - 21116:21116/udp
      - 21118:21118
    image: rustdesk/rustdesk-server:latest
    command: hbbs
    volumes:
      - ./data:/root
    networks:
      - rustdesk-net
    depends_on:
      - hbbr
    restart: unless-stopped

  hbbr:
    container_name: hbbr
    ports:
      - 21117:21117
      - 21119:21119
    image: rustdesk/rustdesk-server:latest
    command: hbbr
    volumes:
      - ./data:/root
    networks:
      - rustdesk-net
    restart: unless-stopped
```


## Configurez votre propre instance de serveur sans utiliser Docker

### ÉTAPE 1 : Téléchargez les logiciels côté serveur

[Télécharger rustdesk-server](https://github.com/rustdesk/rustdesk-server/).

OS Supportés :

- Linux
- Windows

Le tutoriel ci-dessous concerne Linux.

Il y a deux exécutables et un dossier:

- `hbbs` - Le serveur Rendezvous / RustDesk ID/Rendezvous server
- `hbbr` - Le serveur Relais / RustDesk relay server

Ils sont testés sous Centos Linux 7/8 et Ubuntu 18/20.

#### Exigences pour le serveur

Les exigences matérielles sont très faibles. La configuration minimale d'un serveur cloud de base est suffisante et les exigences du CPU et de la mémoire sont minimes. Vous pouvez également utiliser un Raspberry Pi ou quelque chose de similaire. En ce qui concerne le dimensionnement du réseau, si la connexion TCP [hole punching](https://en.wikipedia.org/wiki/TCP_hole_punching) directe échoue, du trafic de relais sera consommé. Le trafic d'une connexion de relais se situe entre 30k et 3m/s (écran 1920x1080) en fonction des paramètres de résolution et de la mise à jour de l'écran. Si ce n'est que pour un usage bureautique, le trafic est d'environ 100k/s.

### ÉTAPE 2 : Exécutez hbbs/hbbr sur votre serveur

#### Option 1
Exécutez hbbs/hbbr sur votre serveur (CentOS ou Ubuntu). Nous vous suggérons d'utiliser [pm2](https://pm2.keymetrics.io/) pour gérer votre service.

```bash
./hbbs
./hbbr
```

#### Option 2 - pm2
Exécutez hbbs/hbbr avec pm2

```bash
pm2 start hbbs
pm2 start hbbr
```

<a name="demo"></a>
{{% notice note %}}
pm2 nécessite Node.js v16+, si vous ne parvenez pas à exécuter pm2 (par exemple, vous ne pouvez pas voir `hbbs`/`hbbr` dans `pm2 list`), veuillez télécharger et installer la version Node.js LTS à partir de https://nodejs.org. Si vous souhaitez que `hbbs`/`hbbr` s'exécute automatiquement après le redémarrage, veuillez vous référer à `pm2 save` et `pm2 startup`. En savoir plus sur [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/). Un autre bon outil pour vos journaux est [pm2-logrotate](https://github.com/keymetrics/pm2-logrotate).

{{% /notice %}}

Par défaut, `hbbs` écoute sur 21115 (TCP) et 21116 (TCP/UDP), 21118 (TCP), et `hbbr` écoute sur 21117 (TCP), 21119 (TCP). Assurez-vous d'ouvrir ces ports dans le pare-feu. **Veuillez noter que 21116 doit être activé à la fois pour TCP et UDP**. 21115 est utilisé pour le test de type NAT, 21116/UDP est utilisé pour l'enregistrement d'ID et le service `heartbeat`, 21116/TCP est utilisé pour le service `TCP hole punching`, 21117 est utilisé pour le service de relais, et 21118 et 21119 sont utilisés pour prendre en charge les clients Web. *Si vous n'avez pas besoin de la prise en charge du client Web (21118, 21119), les ports correspondants peuvent être désactivés.*

- TCP (**21115, 21116, 21117, 21118, 21119**)
- UDP (**21116**)

Si vous voulez choisir un port personnalisé, vous pouvez utiliser l'option `-h` pour accéder à l'aide.


### ÉTAPE 3 : Définissez l'adresse IP hbbs/hbbr côté client

Cliquez sur le bouton Menu [ &#8942; ] à droite de ID comme indiqué ci-dessous, et choisissez "ID/Relay Server".
![](/docs/en/self-host/rustdesk-server-oss/install/images/server-set-menu.png)

Entrez le nom ou l'adresse IP du serveur `hbbs` dans la zone de saisie **ID Server**. Les deux autres adresses peuvent être laissées vides, RustDesk les déduira automatiquement, le serveur relais fera alors référence à `hbbr` (port 21117).
e.g.

```nolang
hbbs.exemple.fr
```

ou

```nolang
hbbs.exemple.fr:21116
```
![](/docs/en/self-host/rustdesk-server-oss/install/images/server-set-window.png)

#### Configuration par suffixe du fichier rustdesk.exe (Windows uniquement)

Remplacez `rustdesk.exe` par rustdesk-`host=<host-ip-or-name>,key=<public-key-string>`.exe, par ex. rustdesk-`host=192.168.1.137,key=xfdsfsd32=32`.exe. Vous pouvez voir le résultat de la configuration dans la fenêtre À propos ci-dessous.

| Menu | Page A propos |
| -- | -- |
![](/docs/en/self-host/rustdesk-server-oss/install/images/aboutmenu.png) | ![](/docs/en/self-host/rustdesk-server-oss/install/images/lic.png) |

<a name="invalidchar"></a>
{{% notice note %}}
S'il y a des caractères dans la clé qui ne peuvent pas être utilisés dans un nom de fichier Windows, veuillez supprimer le fichier `id_ed25519` côté serveur et redémarrer `hbbs`/`hbbr`. Cela entraînera la régénération d'un fichier `id_ed25519.pub`. Vous devrez peut-être répéter ce processus jusqu'à ce que vous obteniez des caractères valides.
{{% /notice %}}

## Clé

Contrairement à l'ancienne version, la clé pour cette version est obligatoire, mais vous n'avez pas besoin de la définir vous-même. Lorsque `hbbs` s'exécute pour la première fois, il génère automatiquement une paire de clés privée et publique chiffrées (respectivement situées dans les fichiers `id_ed25519` et `id_ed25519.pub` du répertoire d'exécution), dont le but principal est le chiffrement des communications.

Si vous n'avez pas rempli la clé `Key:` (avec le contenu du fichier de clé publique `id_ed25519.pub`) à l'étape précédente, cela n'affectera pas la connexion, mais la connexion ne pourra pas être chiffrée.

```bash
cat ./id_ed25519.pub
````

Si vous voulez changer de clé, supprimez les fichiers `id_ed25519` et `id_ed25519.pub` et redémarrez `hbbs`/`hbbr`，`hbbs` générera une nouvelle paire de clés.

{{% notice note %}}
Si vous utilisez docker-compose et que les clés n'existent pas, le démarrage des conteneurs créera des clés différentes dans les dossiers hbbs et hbbr.

Vous pouvez créer des clés manuellement dans hbbs et les copier dans hbbr avant de démarrer les conteneurs.
Ou vous pouvez arrêter le conteneur hbbr et copier les clés de hbbs dans le dossier hbbr, puis redémarrer le conteneur.
{{% /notice %}}
