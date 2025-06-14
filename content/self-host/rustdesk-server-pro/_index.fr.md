---
title: RustDesk Server Pro
weight: 200
pre: "<b>2.2. </b>"
---

RustDesk Server Pro a plus de fonctionnalités par rapport à la version open source.

- Compte
- [Console web](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/)
- [API](https://github.com/rustdesk/rustdesk/wiki/FAQ#api-of-rustdesk-server-pro)
- [OIDC](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/oidc/), [LDAP](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/ldap/), [2FA](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/2fa/)
- Carnet d'adresses
- Gestion des journaux (Connexion, transfert de fichiers, alarme, etc.)
- Gestion des appareils
- [Synchronisation des paramètres de sécurité](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/strategy/)
- [Contrôle d'accès](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/permissions/)
- [Serveurs relais multiples](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/) (sélectionne automatiquement votre relais le plus proche)
- [Générateur de client personnalisé](https://rustdesk.com/docs/en/self-host/client-configuration/#1-custom-client-generator-pro-only)
- WebSocket
- Auto-hébergement du client web

{{% notice note %}}
Si vous construisez votre propre serveur à la maison/au bureau, et ne pouvez pas vous y connecter via IP/domaine publique, veuillez consulter [cet article](https://rustdesk.com/docs/en/self-host/nat-loopback-issues/).
{{% /notice %}}

{{% notice note %}}
Nous recommandons de lire ceci en premier avant de continuer, [Comment fonctionne un serveur auto-hébergé ?](/docs/en/self-host/#how-does-self-hosted-server-work).
{{% /notice %}}

# Exigences matérielles

Le VPS de niveau le plus bas est suffisant pour vos cas d'usage. Le logiciel serveur n'est pas intensif en CPU et en mémoire. Notre serveur ID public hébergé sur un serveur Vultr 2 CPU/4 GB sert plus de 1,0 million de points de terminaison. Chaque connexion relais consomme en moyenne 180 ko par seconde. 1 cœur CPU et 1 Go de RAM suffisent pour supporter 1000 connexions relais simultanées.

# Tutoriels d'articles
[Guide étape par étape : Auto-héberger RustDesk Server Pro sur le cloud via Docker pour un accès distant sécurisé](https://www.linkedin.com/pulse/step-by-step-guide-self-host-rustdesk-server-pro-cloud-montinaro-fwnmf/)

# Tutoriels vidéo

[Guide du débutant : Auto-héberger RustDesk Server Pro pour un utilisateur Linux novice](https://www.youtube.com/watch?v=MclmfYR3frk)

[Guide rapide : Auto-héberger RustDesk Server Pro pour un utilisateur Linux avancé](https://youtu.be/gMKFEziajmo)


# Licence

Vous pouvez obtenir une licence depuis https://rustdesk.com/pricing.html, consultez la page [licence](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) pour plus de détails.

# Commencer
## 1. Installation

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

Pour plus de détails, veuillez consulter [Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/).

## 2. Ports requis

Vous devez ouvrir les ports `21114`-`21119` TCP et `21116` UDP, veuillez vous assurer que ces ports sont configurés lorsque vous définissez les règles de pare-feu et le mappage de ports Docker.

Plus d'informations sur ces ports, veuillez consulter [ici](/docs/en/self-host/rustdesk-server-oss/install/#ports).

## 3. Définir la licence

Ouvrez votre console web en accédant à `http://<ip du serveur>:21114`, [connectez-vous](/docs/en/self-host/rustdesk-server-pro/console/#log-in) en utilisant les identifiants par défaut admin/test1234 `admin`/`test1234`. Suivez [ce guide](/docs/en/self-host/rustdesk-server-pro/license/#set-license) pour définir la licence.

## 4. Configuration HTTPS pour la console web

> Vous pouvez ignorer cette étape si vous ne voulez pas utiliser HTTPS pendant l'essai, mais n'oubliez pas de changer l'adresse API du client après avoir configuré HTTPS

Voici un tutoriel simple de [configuration HTTPS manuelle](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).

## 5. Configurer le client pour utiliser le serveur auto-hébergé

https://rustdesk.com/docs/en/self-host/client-configuration/

## 6. Configurer WebSocket

Pour permettre au client web ou au [client bureau/mobile](/docs/en/self-host/client-configuration/advanced-settings/#allow-websocket) de fonctionner correctement avec WebSocket, vous devez ajouter les paramètres suivants à votre configuration de proxy inverse.

https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms


# Mettre à niveau le serveur

Ce [guide](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#there-is-a-new-version-of-rustdesk-server-pro-out-how-can-i-upgrade) couvre comment mettre à niveau RustDesk Server Pro depuis une version inférieure, en abordant différentes méthodes d'installation.

# Migrer vers un nouveau hôte et sauvegarder/restaurer

Voici un [tutoriel](https://github.com/rustdesk/rustdesk-server-pro/discussions/184) détaillé.

# Migrer la licence

Veuillez suivre ce [guide](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-license-retrieval-and-migration).

# Mettre à niveau la licence

Suivez [ce guide](/docs/en/self-host/rustdesk-server-pro/license/#renewupgrade-license) pour mettre à niveau votre licence pour plus d'utilisateurs et d'appareils à tout moment.

# À propos de la sécurité

https://github.com/rustdesk/rustdesk/discussions/9835