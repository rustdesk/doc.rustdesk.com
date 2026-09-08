---
title: Auto-hébergement
description: "Apprenez à auto-héberger votre propre serveur RustDesk. Guide complet couvrant l'installation, la configuration et le déploiement de l'infrastructure serveur RustDesk pour un accès sécurisé au bureau à distance."
keywords: ["rustdesk auto-hébergement", "serveur rustdesk", "serveur bureau à distance", "guide auto-hébergement", "installation rustdesk", "hbbs hbbr", "serveur rustdesk pro"]
weight: 5
pre: "<b>2. </b>"
---

Si vous utilisez RustDesk, vous devriez avoir votre propre serveur RustDesk. Ces documents vous aideront dans votre parcours RustDesk.

Le support est disponible via notre [Discord](https://discord.com/invite/nDceKgxnkV) pour l'OSS et par [email](mailto:support@rustdesk.com) pour la version Pro.

## Comment fonctionne un serveur auto-hébergé ?

Il y a techniquement deux exécutables (serveurs) :

- `hbbs` - Serveur d'ID RustDesk (rendez-vous / signalisation), écoute sur TCP (`21114` - pour http en Pro seulement, `21115`, `21116`, `21118` pour web socket) et UDP (`21116`)
- `hbbr` - Serveur relais RustDesk, écoute sur TCP (`21117`, `21119` pour web socket)

Lorsque vous installez via un script d'installation / docker compose / deb, les deux services seront installés.

Voici des [illustrations](https://github.com/rustdesk/rustdesk/wiki/How-does-RustDesk-work%3F) de la façon dont le client RustDesk communique avec `hbbr` / `hbbs`.

Tant que RustDesk fonctionne sur une machine, la machine ping constamment le serveur d'ID (`hbbs`) pour faire connaître son adresse IP et son port actuels.

Lorsque vous démarrez une connexion de l'ordinateur A vers l'ordinateur B, l'ordinateur A contacte le serveur d'ID et demande à communiquer avec l'ordinateur B.

Le serveur d'ID tente alors de connecter A et B directement l'un à l'autre en utilisant le hole punching.

Si le hole punching échoue, A communiquera avec B via le serveur relais (`hbbr`).

Dans la majorité des cas, le hole punching réussit et le serveur relais n'est jamais utilisé.

Voici une discussion sur [Devriez-vous auto-héberger un serveur rustdesk ?](https://www.reddit.com/r/rustdesk/comments/1cr8kfv/should_you_selfhost_a_rustdesk_server/)

## Ports requis

Les ports requis pour l'auto-hébergement du serveur RustDesk dépendent largement de votre environnement et de ce que vous voulez faire avec RustDesk. Les exemples montrés dans la documentation auront généralement tous les ports suggérés à ouvrir.

Ports principaux : \
TCP `21114-21119` \
UDP `21116`

- TCP `21114` : utilisé pour le serveur API HTTP dans RustDesk Server Pro.
- TCP `21115` : utilisé pour le test du type NAT.
- UDP `21116` : utilisé pour l'enregistrement des appareils.
- TCP `21116` : utilisé pour l'enregistrement des appareils et le NAT hole punching.
- TCP `21117` : utilisé pour la communication relais.
- TCP `21118` : utilisé pour la communication WebSocket.
- TCP `21119` : utilisé pour la communication WebSocket.

Les ports `21115`-`21117` sont les ports minimum requis pour que RustDesk fonctionne. Ils gèrent la signalisation, le relais et la traversée NAT.

Pour une configuration WSS, les ports TCP `21118` et TCP `21119` n'ont généralement pas besoin d'être exposés à l'extérieur, car ils sont utilisés en interne par le proxy inverse, tel que Nginx. Si vous n'utilisez pas WebSocket, ces ports n'ont pas besoin d'être exposés. Veuillez vous référer à cet [exemple de configuration Nginx](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms).

Pour les utilisateurs Pro sans proxy SSL, vous devez ouvrir le port TCP `21114` pour que l'API fonctionne. Si HTTPS (`443`) est configuré pour le serveur, TCP `21114` n'a pas besoin d'être exposé à Internet.

RustDesk prend également en charge un mode de déploiement où seul TCP `443` est exposé et tous les autres ports sont fermés. Avec cette configuration, la communication ne peut fonctionner que via le relais WSS, et les connexions directes pair-à-pair ne sont pas disponibles.

{{% children depth="4" showhidden="true" %}}
