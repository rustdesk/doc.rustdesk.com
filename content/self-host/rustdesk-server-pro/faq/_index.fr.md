---
title: FAQ
weight: 600
---

## Comment puis-je installer avec le script d'installation simple ?
1. Obtenez votre licence depuis [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), consultez la page [licence](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) pour plus de détails.
2. Lancez un VPS, un serveur dédié ou une VM Linux.
3. Si vous voulez utiliser DNS et SSL, créez un nom DNS par exemple `rustdesk.yourdomain.com`.
4. [Cette page](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#install).
5. Copiez et collez la commande dans votre terminal Linux.
6. Suivez les invites qui vous guident à travers l'installation.
7. Une fois l'installation terminée, allez sur `https://rustdesk.yourdomain.com` ou `http://youripaddress:21114`.
8. Connectez-vous avec le nom d'utilisateur `admin` et le mot de passe `test1234`.
9. Entrez votre code de licence acheté à l'étape 1.

## Comment puis-je convertir de RustDesk Server Open Source vers RustDesk Server Pro ?
1. Obtenez votre licence depuis [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), consultez la page [licence](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) pour plus de détails.
2. Ouvrez le port TCP 21114.
3. Connectez-vous à votre serveur RustDesk.
4. Si vous n'utilisez pas déjà DNS et voulez utiliser SSL, créez un nom DNS par exemple `rustdesk.yourdomain.com`.
5. [Cette page](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#convert-from-open-source).
6. Copiez et collez la commande dans votre terminal Linux.
7. Suivez les invites qui vous guident à travers l'installation.
8. Une fois l'installation terminée, allez sur `https://rustdesk.yourdomain.com` ou `http://youripaddress:21114`.
9. Connectez-vous avec le nom d'utilisateur `admin` et le mot de passe `test1234`.
10. Entrez votre code de licence acheté à l'étape 1.

## Il y a une nouvelle version de RustDesk Server Pro, comment puis-je la mettre à jour ?
Vous feriez mieux de sauvegarder les fichiers de données (fichiers sqlite3, etc.) d'abord, https://github.com/rustdesk/rustdesk-server-pro/discussions/184#discussioncomment-8013375.
- ### Si vous avez installé avec le script (`install.sh`)
Veuillez exécuter [update.sh](/docs/en/self-host/rustdesk-server-pro/installscript/script/#upgrade).
- ### Docker Compose
```
sudo docker compose down
sudo docker compose pull 
sudo docker compose up -d
```
Mais cela dépend de votre version de docker, pour plus de discussion, consultez [ceci](https://stackoverflow.com/questions/37685581/how-to-get-docker-compose-to-use-the-latest-image-from-repository).
- ### Docker
```
sudo docker ps
# vous pouvez également utiliser <NOM DU CONTENEUR>, par exemple `hbbs` et `hbbr` si vous suivez notre manuel.
sudo docker stop <ID DU CONTENEUR>
sudo docker rm <ID DU CONTENEUR>
sudo docker rmi <ID DE L'IMAGE>
sudo docker run ..... # identique à la façon dont vous l'avez installé avant
```

par exemple

```
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE                          COMMAND   CREATED          STATUS                         PORTS     NAMES
30822972c220   rustdesk/rustdesk-server-pro   "hbbr"    10 seconds ago   Restarting (1) 2 seconds ago             hbbr
0f3a6f185be3   rustdesk/rustdesk-server-pro   "hbbs"    15 seconds ago   Up 14 seconds                            hbbs
root@hz:~# sudo docker kill hbbr hbbs
hbbr
hbbs
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
root@hz:~# sudo docker rm hbbr hbbs
hbbr
hbbs
root@hz:~# sudo docker rmi rustdesk/rustdesk-server-pro
Untagged: rustdesk/rustdesk-server-pro:latest
Untagged: rustdesk/rustdesk-server-pro@sha256:401b8344323addf777622d0463bd7b964dd18a01599e42e20d8b3818dae71ad2
Deleted: sha256:a3d9d43a3d1dd84b10c39fe0abf7767b18a87819ff0981443ce9e9a52604c889
Deleted: sha256:65ae79ecc0f8b1c8a21085d04af7c8d8f368dd5ad844982d4c7b3ac1f38ba33a
Deleted: sha256:9274a824aef10f2ef106d8f85fbd1905037169cf610951f63dc5109dae4b0825
Deleted: sha256:aa89ac8b57a49f49f041c01b9c0f016060e611cf282e3fda281bc6bebbabaf3f
Deleted: sha256:4af9839016f72586a46f915cae8a5ccf3380ba88a2f79532692d3b1d7020387e
Deleted: sha256:e900a7ffc2fc14fa432cc04823740dcbb78c0aa3508abbbe287ce8b274541ada
Deleted: sha256:503eeab76c11e8316a2a450ef0790d31c5af203309e9c5b44d1bf8a601e6e587
Deleted: sha256:825683356e7dbfcbaabcbf469c9aeb34d36ebeab0308170432b9553e28203116
Deleted: sha256:24a48d4af45bab05d8712fe22abec5761a7781283500e32e34bdff5798c09399
root@hz:~# sudo docker images
REPOSITORY         TAG       IMAGE ID       CREATED        SIZE
rustdesk/makepkg   latest    86a981e2e18f   2 months ago   2.23GB
root@hz:~# sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbs
Unable to find image 'rustdesk/rustdesk-server-pro:latest' locally
latest: Pulling from rustdesk/rustdesk-server-pro
4ce000a43472: Pull complete
1543f88421d3: Pull complete
9b209c1f5a8d: Pull complete
d717f548a400: Pull complete
1e60b98f5660: Pull complete
a86960d9bced: Pull complete
acb361c4bbf6: Pull complete
4f4fb700ef54: Pull complete
Digest: sha256:401b8344323addf777622d0463bd7b964dd18a01599e42e20d8b3818dae71ad2
Status: Downloaded newer image for rustdesk/rustdesk-server-pro:latest
0cc5387efa8d2099c0d8bc657b10ed153a6b642cd7bbcc56a6c82790a6e49b04
root@hz:~# sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbr
4eb9da2dc460810547f6371a1c40a9294750960ef2dbd84168079e267e8f371a
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE                          COMMAND   CREATED         STATUS                                  PORTS     NAMES
4eb9da2dc460   rustdesk/rustdesk-server-pro   "hbbr"    5 seconds ago   Restarting (1) Less than a second ago             hbbr
0cc5387efa8d   rustdesk/rustdesk-server-pro   "hbbs"    8 seconds ago   Up 7 seconds                                      hbbs
root@hz:~# sudo docker images
REPOSITORY                     TAG       IMAGE ID       CREATED        SIZE
rustdesk/rustdesk-server-pro   latest    a3d9d43a3d1d   5 days ago     193MB
rustdesk/makepkg               latest    86a981e2e18f   2 months ago   2.23GB
```

Pour plus de détails, consultez [ceci](https://www.cherryservers.com/blog/how-to-update-docker-image).

## J'ai installé avec le script, comment puis-je démarrer et arrêter les services ?
Les services utilisent systemd et peuvent être démarrés et arrêtés en utilisant `sudo systemctl stop|start|restart rustdesk-hbbs|rustdesk-hbbr` par exemple `sudo systemctl restart rustdesk-hbbs`.

## J'ai installé avec le script, comment puis-je voir les journaux Linux ?
Les journaux sont stockés dans `/var/log/rustdesk-server`, vous pouvez les voir en utilisant `tail /var/log/rustdesk-server/hbbs.log` ou `tail /var/log/rustdesk-server/hbbs.error`.

## J'ai installé avec le script, comment puis-je vérifier le statut des services RustDesk ?
Pour vérifier le statut `sudo systemctl status rustdesk-hbbs|rustdesk-hbbr` par exemple `sudo systemctl status rustdesk-hbbs`.

## Comment puis-je changer le mot de passe admin ?
1. Allez sur `https://rustdesk.yourdomain.com` ou `http://youripaddress:21114`.
2. Connectez-vous avec le nom d'utilisateur `admin` et le mot de passe `test1234`.
3. Cliquez sur `admin` dans le coin supérieur droit.
4. Cliquez sur `Paramètres`.
5. Entrez votre nouveau mot de passe dans les cases fournies.

## Comment puis-je transférer ma licence vers un nouveau serveur ?
Veuillez voir [ici](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-and-migration).

## Les emails ne fonctionnent pas depuis mon VPS
Beaucoup de fournisseurs VPS bloquent les ports 465 et 25.

Un moyen simple de vérifier est d'utiliser telnet. Pour tester dans le terminal Linux, tapez `telnet your.mailserver.com 25`. Sous Windows, utilisez PowerShell avec `Test-NetConnection -ComputerName your.mailserver.com -Port 25`.

Votre serveur de messagerie peut ne pas utiliser le port 25. Assurez-vous d'utiliser les bons ports.

## Puis-je déployer RustDesk en utilisant PowerShell ou similaire ?
Bien sûr, vous pouvez trouver des scripts pour aider au déploiement [ici](https://rustdesk.com/docs/en/self-host/client-deployment/).

## Comment puis-je signaler un bug ?
Veuillez le signaler via [GitHub](https://github.com/rustdesk/rustdesk-server-pro/issues).

## Pourquoi si je m'auto-héberge, ce n'est pas gratuit et open source ?
1. RustDesk est devenu un travail à temps plein pour un certain nombre de personnes, elles ont des vies, des épouses, des emplois et des enfants qui demandent tous de l'attention et coûtent de l'argent !
2. Nous voulons être là et continuer à faire de grands progrès dans les années à venir.
3. La version open source continuera d'être open source et nous encourageons les autres à faire des développements conformément à la licence AGPL.

## Je ne peux pas me connecter aux appareils dans différents groupes, pourquoi ?
C'est facilement résolu, vous devez autoriser l'accès inter-groupes.
1. Ajoutez de nouveaux groupes.
2. Cliquez sur `Modifier`.
3. Sélectionnez les groupes pertinents auxquels vous voulez accès (cela les ajoute automatiquement dans le groupe correspondant).

## Comment puis-je obtenir des configurations automatiquement ?
Les configurations sont générées automatiquement.
1. Téléchargez les derniers clients depuis [GitHub](https://github.com/rustdesk/rustdesk/releases/latest).
2. Sur la page principale de la console web, cliquez sur `Windows EXE`.
3. Remplissez l'hôte et l'API (si différent de votre configuration).
4. Cliquez sur `Soumettre`.
5. Scannez le code QR sur Android et renommez l'exe selon ce qui a été généré.

## Offrez-vous de l'hébergement pour RustDesk Server Pro ?
Veuillez contacter notre équipe [commerciale](mailto://sales@rustdesk.com).

## Y a-t-il un endroit où je peux voir des guides vidéo de configuration ?
Oui ! Nous avons une [chaîne YouTube](https://youtube.com/@RustDesk).

## Pourquoi mes journaux / noms d'appareils sont-ils vides ?
Assurez-vous que l'API est correctement configurée sur l'appareil contrôlé, https://github.com/rustdesk/rustdesk-server-pro/issues/21#issuecomment-1637935750.

## Comment puis-je désinstaller RustDesk Server Pro ?
Exécutez les commandes suivantes :
```sh
sudo systemctl stop rustdesk-hbbs.service
sudo systemctl disable rustdesk-hbbs.service
sudo systemctl stop rustdesk-hbbr.service
sudo systemctl disable rustdesk-hbbr.service
sudo systemctl daemon-reload
sudo rm /etc/systemd/system/rustdesk-hbbs.service
sudo rm etc/systemd/system/rustdesk-hbbr.service
sudo rm /usr/bin/hbbs
sudo rm /usr/bin/hbbr
sudo rm -rf /var/lib/rustdesk-server/
sudo rm -rf /var/log/rustdesk-server/
```
Si le script a installé Nginx, supprimez-le en utilisant :
```sh
sudo apt remove nginx
```

## Comment puis-je supprimer des appareils de la liste d'appareils dans la console web ?
Désactivez puis supprimez sera maintenant disponible.

## Comment puis-je mettre à jour RustDesk avec PowerShell ?
```ps
$ErrorActionPreference= 'silentlycontinue'

$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if ($rdver -eq "1.2.6")
{
    Write-Output "RustDesk $rdver is the newest version."
    Exit
}

if (!(Test-Path C:\Temp))
{
    New-Item -ItemType Directory -Force -Path C:\Temp > null
}

cd C:\Temp

Invoke-WebRequest "https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.exe" -Outfile "rustdesk.exe"
Start-Process .\rustdesk.exe --silent-install -wait
```

## Erreur `Key mismatch`
Veuillez configurer votre client avec la [bonne clé](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/).

## Erreur `Failed to connect to relay server`
Assurez-vous que `hbbr` fonctionne. Plus d'informations sur `hbbr`, vous pouvez les trouver [ici](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/).
Si votre `hbbr` ne fonctionne pas sur la même machine que `hbbs`, ou si vous avez plusieurs serveurs relais, ou si vous ne l'exécutez pas sur le port par défaut `21117`, vous devez le dire explicitement à `hbbs`. Veuillez vérifier [ici](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/).

## Réinitialiser MFA pour le compte Admin
https://github.com/rustdesk/rustdesk/discussions/6576

## Configurer HTTPS pour la console web manuellement

### 1. Acheter un nom de domaine et le résoudre vers l'adresse IP de votre serveur.
* Achetez un nom de domaine chez un registraire de domaines comme GoDaddy, Namecheap, ou Namesilo.
* Résolvez le nom de domaine vers l'adresse IP de votre serveur avec l'un des éléments suivants :
    - Le panneau de contrôle de votre registraire de domaines (recommandé)
    - [Fournisseurs DNS](https://en.wikipedia.org/wiki/List_of_managed_DNS_providers)

Par exemple, si vous achetez un nom de domaine `example.com` de `Namesilo` et que l'adresse IP de votre serveur est `123.123.123.123`, vous voulez utiliser le sous-domaine `rustdesk.example.com` comme adresse de votre console web HTTPS. Vous devez ouvrir [le lien](https://www.namesilo.com/account_domains.php), cliquer sur le bouton avec l'info-bulle `Manage dns for the domain`, ajouter un enregistrement `A` avec le nom d'hôte `rustdesk` et l'adresse IP de votre serveur.
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-button.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-add-a-record.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-table.png)
* Il faut du temps pour que le DNS prenne effet, https://www.whatsmydns.net et vérifiez si le nom de domaine a été résolu vers l'adresse IP de votre serveur. L'étape 6 dépend du résultat de résolution correct. Dans les étapes suivantes, remplacez `<YOUR_DOMAIN>` par votre sous-domaine, par exemple `rustdesk.example.com`.

### 2. Installer Nginx
* Debian/Ubuntu : `sudo apt-get install nginx`
* Fedora/CentOS : `sudo dnf install nginx` ou `sudo yum install nginx`
* Arch : `sudo pacman -S install nginx`
* openSUSE : `sudo zypper install nginx`
* Gentoo : `sudo emerge -av nginx`
* Alpine : `sudo apk add --no-cache nginx`

Exécutez `nginx -h` pour vérifier s'il a été installé avec succès.

### 3. Installer Certbot
* Méthode 1 : Si `snap` est installé, exécutez `sudo snap install certbot --classic`.
* Méthode 2 : Utilisez `python3-certbot-nginx` à la place, par exemple `sudo apt-get install python3-certbot-nginx` pour Ubuntu.
* Méthode 3 : Si les deux méthodes ci-dessus ont échoué, essayez d'installer `certbot-nginx`, par exemple `sudo yum install certbot-nginx` pour CentOS 7.

Exécutez `certbot -h` pour vérifier s'il a été installé avec succès.

### 4. Configurer Nginx
Il y a deux façons :
* Si les répertoires `/etc/nginx/sites-available` et `/etc/nginx/sites-enabled` existent, remplacez `<YOUR_DOMAIN>` de la commande suivante par votre nom de domaine et exécutez-la.
```sh
cat > /etc/nginx/sites-available/rustdesk.conf << EOF
server {
    server_name <YOUR_DOMAIN>;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```
Puis exécutez `sudo ln -s /etc/nginx/sites-available/rustdesk.conf /etc/nginx/sites-enabled/rustdesk.conf`.

Exécutez `cat /etc/nginx/sites-available/rustdesk.conf` pour vous assurer que son contenu est correct.

* Si les répertoires `/etc/nginx/sites-available` et `/etc/nginx/sites-enabled` n'existent pas et que le répertoire `/etc/nginx/conf.d` existe, remplacez `<YOUR_DOMAIN>` de la commande suivante par votre nom de domaine et exécutez-la.
```sh
cat > /etc/nginx/conf.d/rustdesk.conf << EOF
server {
    server_name <YOUR_DOMAIN>;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```
Exécutez `cat /etc/nginx/conf.d/rustdesk.conf` pour vous assurer que son contenu est correct.

### 5. Activer les règles de pare-feu pour le domaine
Exécutez les commandes suivantes :

```sh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw --force reload
```

### 6. Générer le certificat SSL
Remplacez `$YOUR_DOMAIN` par votre nom de domaine, puis exécutez
`sudo certbot --nginx --cert-name $YOUR_DOMAIN --key-type ecdsa --renew-by-default --no-eff-email --agree-tos --server https://acme-v02.api.letsencrypt.org/directory -d $YOUR_DOMAIN`.

S'il vous demande `Enter email address (used for urgent renewal and security notices)`, entrez votre adresse email.

Finalement, le contenu de `rustdesk.conf` devrait ressembler à ceci :
```
server {
    server_name <YOUR_DOMAIN>;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/<YOUR_DOMAIN>/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/<YOUR_DOMAIN>/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = <YOUR_DOMAIN>) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name <YOUR_DOMAIN>;
    listen 80;
    return 404; # managed by Certbot
}
```

Voici quelques erreurs courantes :

* La console affiche `Successfully deployed certificate for <YOUR_DOMAIN> to /etc/nginx/.../default` plutôt que `Successfully deployed certificate for <YOUR_DOMAIN> to /etc/nginx/.../rustdesk.conf`.

La raison peut être que Certbot ne trouve pas le fichier `rustdesk.conf`, vous pouvez essayer l'une des solutions suivantes :
- Vérifiez le résultat de l'étape 5, exécutez `sudo service nginx restart`.
- Copiez les configurations de serveur `server{...}` qui contiennent `<YOUR_DOMAIN>` vers `rustdesk.conf`, et changez `location{...}` vers le contenu ci-dessous.

```sh
location / {
    proxy_set_header        X-Real-IP       $remote_addr;
    proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:21114/;
}
```

* `too many certificates (5) already issued for this exact set of domains in the last 168 hours`

Solution : Ajoutez un autre nom de domaine au DNS et changez `<YOUR_DOMAIN>` vers celui-ci, par exemple `rustdesk2.example.com`. Puis répétez les étapes 1, 4, 6.

* `Error getting validation data`

Solution : cela peut être causé par le pare-feu, veuillez vous référer à https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#firewall

Notice : Exécutez `sudo service nginx restart` si vous changez le `rustdesk.conf` manuellement.

### 7. Se connecter à la page web
* Ouvrez `https://<YOUR_DOMAIN>` dans le navigateur, connectez-vous en utilisant le nom d'utilisateur par défaut "admin" et le mot de passe "test1234", puis changez le mot de passe vers le vôtre.

### 8. Ajouter le support WebSocket Secure (WSS) pour le serveur d'identifiant et le serveur relais pour activer la communication sécurisée pour toutes les plateformes.

Ajoutez la configuration suivante à la première section `server` du fichier `/etc/nginx/.../rustdesk.conf`, puis redémarrez le service `Nginx`.
Le client web peut être accédé via `https://<YOUR_DOMAIN>/web`. Les clients personnalisés peuvent utiliser WebSocket en définissant `allow-websocket=Y` dans les options avancées. Si le client personnalisé avec WebSocket activé est utilisé, il n'utilisera pas TCP/UDP et ne pourra se connecter que par un relais (sauf pour les connexions IP directes). Si seul ce client activé WebSocket est utilisé, le serveur peut fermer les ports 21114 à 21119 et ne garder que le port 443 ouvert.

```
    location /ws/id {
        proxy_pass http://127.0.0.1:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /ws/relay {
        proxy_pass http://127.0.0.1:21119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }
```

La configuration complète est

```
server {
    server_name <YOUR_DOMAIN>;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    location /ws/id {
        proxy_pass http://127.0.0.1:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /ws/relay {
        proxy_pass http://127.0.0.1:21119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/<YOUR_DOMAIN>/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/<YOUR_DOMAIN>/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = <YOUR_DOMAIN>) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name <YOUR_DOMAIN>;
    listen 80;
    return 404; # managed by Certbot
}
```

{{% notice note %}}
Si vous avez précédemment déployé pour les clients web et voulez l'utiliser sur toutes les plateformes, vous devez ajouter `proxy_read_timeout`.
{{% /notice %}}

### 9. Contourner CORS si vous utilisez le client web public RustDesk `https://rustdesk.com/web`

Vous devez ajouter ce qui suit dans la section `location /` du `/etc/nginx/.../rustdesk.conf` pour contourner la limitation CORS des navigateurs. Sautez cette étape si vous utilisez votre propre client web.

```
        if ($http_origin ~* (https?://(www\.)?rustdesk\.com)) {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
        }
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Content-Length' 0;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            return 204;
        }
```

## SELinux

Si `Waiting for RustDesk Relay service to become active...` apparaît lors de l'installation, cela peut être causé par SELinux. Vous pouvez essayer les commandes suivantes :

```sh
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbs'
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbr'
sudo restorecon -v '/usr/bin/hbbs'
sudo restorecon -v '/usr/bin/hbbr'
```

## Pare-feu

### Pare-feu cloud
Si vous exécutez sur AWS/Azure/Google/DigitalOcean cloud, veuillez ouvrir les ports entrants UDP (21116) et TCP (21114-21119) sur le tableau de bord du fournisseur cloud.

- [AWS] https://docs.aws.amazon.com/network-firewall/latest/developerguide/getting-started.html
- [Azure] https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview
- [Google] https://cloud.google.com/firewall/docs/firewalls
- [DigitalOcean] https://docs.digitalocean.com/products/networking/firewalls/

### Pare-feu du serveur sur site
RustDesk configure le pare-feu avec `ufw`. Cela peut ne pas fonctionner sur certaines distributions comme CentOS 9, vous pouvez essayer avec `firewall-cmd` :

```sh
sudo firewall-cmd --permanent --add-port=21115/tcp
sudo firewall-cmd --permanent --add-port=21116/tcp
sudo firewall-cmd --permanent --add-port=21117/tcp
sudo firewall-cmd --permanent --add-port=21118/tcp
sudo firewall-cmd --permanent --add-port=21119/tcp
sudo firewall-cmd --permanent --add-port=21116/udp
```

Si vous utilisez IP :

```sh
sudo firewall-cmd --permanent --add-port=21114/tcp
```

Si vous utilisez DNS/Domaine :

```sh
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
```

Après ce qui précède, exécutez `sudo firewall-cmd --reload` pour recharger le pare-feu.

## Après avoir changé le mot de passe admin dans la console web, je ne peux pas me connecter. Y a-t-il un moyen simple de réinitialiser le mot de passe ?
1. Assurez-vous d'avoir `rustdesk-utils` installé. Si non, vous pouvez l'obtenir [ici](https://github.com/rustdesk/rustdesk-server-pro). Vous devez également exécuter la commande depuis le dossier où se trouve la base de données, c'est-à-dire `/var/lib/rustdesk-server`.
2. La commande est `rustdesk-utils set_password username password`. Si ça marche, elle dira *Done*.

Vous avez également les autres commandes suivantes `genkeypair`, `validatekeypair [public key] [secret key]`, `doctor [rustdesk-server]`, `reset_email_verification` et `reset_2fa_verification` qui peuvent être utilisées avec `rustdesk-utils`.

https://github.com/rustdesk/rustdesk-server-pro/discussions/183

## Ajouter le certificat CA racine dans le conteneur Docker (pour l'échec TLS avec SMTP, OIDC etc.)
https://github.com/rustdesk/rustdesk-server-pro/issues/99#issuecomment-2235014703