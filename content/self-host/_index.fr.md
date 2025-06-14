---
title: Auto-hébergement
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

Les ports `21115-21117` ci-dessus sont les ports minimum requis pour que RustDesk fonctionne, ils gèrent les ports de signal et de relais ainsi que la traversée NAT.

Les ports TCP `21118` et `21119` sont les ports WebSocket pour le [client Web RustDesk](https://rustdesk.com/web/), vous avez besoin d'un proxy inverse pour le faire supporter HTTPS, veuillez vous référer à cet [exemple de configuration Nginx](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-the-web-client).

Pour les utilisateurs Pro sans proxy SSL, vous devrez ouvrir le port TCP `21114` pour que l'API fonctionne, ou utiliser un proxy SSL pour ouvrir le port TCP `443`.

{{% children depth="4" showhidden="true" %}}
