---
title: install.sh
weight: 4
---

{{% notice note %}}
N'oubliez pas d'obtenir votre licence depuis [https://rustdesk.com/pricing/](https://rustdesk.com/pricing/), consultez la page [licence](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) pour plus de détails.

Veuillez d'abord lire [Installation OSS](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/) avant de faire cette installation simple. Vous pouvez y connaître plus de détails sous-jacents.
{{% /notice %}}

### Installer

Copiez et collez la commande ci-dessus dans votre terminal Linux pour installer RustDesk Server Pro.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh | bash`

{{% notice note %}}
Je recommande d'utiliser [l'image Docker](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/docker/#docker-compose) ; cela simplifie grandement le processus de déploiement de la solution ainsi que sa mise à jour. La consommation de ressources est très faible.

Et veuillez exécuter ce qui précède dans votre répertoire home plutôt que dans un répertoire où vous n'avez pas d'autorisation d'écriture.
{{% /notice %}}

Ce qu'il fait :

- Installer certaines dépendances
- Configurer le pare-feu UFW s'il est disponible
- Créer un répertoire de travail `/var/lib/rustdesk-server` et un répertoire de logs `/var/log/rustdesk-server`
- Installer les exécutables dans `/usr/bin`
- Télécharger et extraire les Services RustDesk Pro dans le dossier ci-dessus
- Créer des services systemd pour hbbs et hbbr (noms de services `rustdesk-hbbs.service` et `rustdesk-hbbr.service`)
- Si vous choisissez Domaine, il installera Nginx et Certbot, permettant à l'API d'être disponible sur le port `443` (HTTPS) et d'obtenir un certificat SSL sur le port `80`, il est automatiquement renouvelé. Quand le https est prêt, veuillez accéder avec `https://votredomaine.com` plutôt que `https://votredomaine.com:21114`.

{{% notice note %}}
Comment [configurer HTTPS pour la console web manuellement](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).
{{% /notice %}}

{{% notice note %}}
Si le service systemd échoue à démarrer, c'est probablement lié à SELinux, veuillez vérifier [ceci](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#selinux).
{{% /notice %}}

{{% notice note %}}
Si votre client ne peut pas se connecter à votre serveur ou si vous ne pouvez pas accéder à la console web, veuillez vérifier [ceci](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#firewall).
{{% /notice %}}

### Mettre à jour

Copiez et collez la commande ci-dessus dans votre terminal Linux pour mettre à jour votre installation existante de RustDesk Server Pro, cela pourrait aussi être sauvegardé localement et programmé avec cron.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/update.sh | bash`

{{% notice note %}}
Si vous rencontrez des problèmes avec ce script, je suggère de parcourir le script et d'exécuter les étapes manuellement, une par une.

Et veuillez exécuter ce qui précède dans votre répertoire home plutôt que dans un répertoire où vous n'avez pas d'autorisation d'écriture.
{{% /notice %}}

Ce qu'il fait :

- Vérifie les nouvelles versions de RustDesk Server Pro
- S'il trouve une nouvelle version, il supprime les fichiers API et télécharge de nouveaux exécutables et fichiers API

### Convertir depuis l'open source

Copiez et collez la commande ci-dessus dans votre terminal Linux pour convertir de RustDesk Server vers RustDesk Server Pro.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/convertfromos.sh | bash`

{{% notice note %}}
Veuillez ajouter le port TCP `21114` à votre pare-feu, c'est un port supplémentaire pour la console web et la connexion utilisateur dans le client RustDesk.
{{% /notice %}}

{{% notice note %}}
Je suggérerais de passer à une installation Docker si vous rencontrez des problèmes avec ce script. Alternativement, vous pouvez parcourir le script et exécuter les étapes manuellement, une par une.
{{% /notice %}}

Ce qu'il fait :

- Désactive et supprime les anciens services
- Installer certaines dépendances
- Configurer le pare-feu UFW s'il est disponible
- Créer un dossier `/var/lib/rustdesk-server` et copier les certificats ici
- Supprimer `/var/log/rustdesk` et créer `/var/log/rustdesk-server`
- Télécharger et extraire les Services RustDesk Pro dans le dossier ci-dessus
- Créer des services systemd pour hbbs et hbbr (noms de services rustdesk-hbbs.service et rustdesk-hbbr.service)
- Si vous choisissez Domaine, il installera Nginx et Certbot, permettant à l'API d'être disponible sur le port 443 (HTTPS) et d'obtenir un certificat SSL sur le port 80, il est automatiquement renouvelé