---
title: Self-hosting
description: "Impara come auto-ospitare il tuo server RustDesk. Guida completa che copre installazione, configurazione e distribuzione dell'infrastruttura server RustDesk per accesso sicuro al desktop remoto."
keywords: ["rustdesk self-hosting", "server rustdesk", "server desktop remoto", "guida self-hosting", "installazione rustdesk", "hbbs hbbr", "server rustdesk pro"]
weight: 5
pre: "<b>2. </b>"
---

Se stai usando RustDesk dovresti avere il tuo server RustDesk, questi documenti ti aiuteranno nel tuo viaggio con RustDesk.

Il supporto è disponibile tramite il nostro [Discord](https://discord.com/invite/nDceKgxnkV) per OSS e via [email](mailto:support@rustdesk.com) per Pro.

## Come funziona il server self-hosted?

Tecnicamente ci sono due eseguibili (server):

- `hbbs` - Server ID RustDesk (rendezvous / segnalazione), ascolta su TCP (`21114` - per http solo in Pro, `21115`, `21116`, `21118` per web socket) e UDP (`21116`)
- `hbbr` - Server relay RustDesk, ascolta su TCP (`21117`, `21119` per web socket)

Quando installi tramite script di installazione / docker compose / deb, entrambi i servizi saranno installati.

Qui ci sono le [illustrazioni](https://github.com/rustdesk/rustdesk/wiki/How-does-RustDesk-work%3F) di come il client RustDesk comunica con `hbbr` / `hbbs`.

Finché RustDesk è in esecuzione su una macchina, la macchina fa costantemente ping al server ID (`hbbs`) per rendere noti il suo indirizzo IP e porta attuali.

Quando avvii una connessione dal computer A al computer B, il computer A contatta il server ID e richiede di comunicare con il computer B.

Il server ID tenta quindi di connettere A e B direttamente tra loro usando il hole punching.

Se il hole punching fallisce, A comunicherà con B tramite il server relay (`hbbr`).

Nella maggior parte dei casi, il hole punching ha successo e il server relay non viene mai utilizzato.

Ecco una discussione su [Dovresti self-hostare un server rustdesk?](https://www.reddit.com/r/rustdesk/comments/1cr8kfv/should_you_selfhost_a_rustdesk_server/)

## Porte Richieste

Le porte richieste per il self-hosting del server RustDesk dipendono largamente dal tuo ambiente e da cosa vuoi fare con RustDesk. Gli esempi mostrati nella documentazione avranno generalmente tutte le porte suggerite da aprire.

Porte Principali: \
TCP `21114-21119` \
UDP `21116`

- TCP `21114`: Usata per il server API HTTP in RustDesk Server Pro.
- TCP `21115`: Usata per il test del tipo NAT.
- UDP `21116`: Usata per la registrazione dei dispositivi.
- TCP `21116`: Usata per la registrazione dei dispositivi e il NAT hole punching.
- TCP `21117`: Usata per la comunicazione relay.
- TCP `21118`: Usata per la comunicazione WebSocket.
- TCP `21119`: Usata per la comunicazione WebSocket.

Le porte `21115`-`21117` sono le porte minime richieste per far funzionare RustDesk. Gestiscono segnalazione, relay e attraversamento NAT.

Per una configurazione WSS, le porte TCP `21118` e TCP `21119` di solito non devono essere esposte esternamente perché vengono usate internamente dal reverse proxy, come Nginx. Se non usi WebSocket, queste porte non devono essere esposte. Fai riferimento a questa [configurazione di esempio Nginx](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms).

Per gli utenti Pro senza un proxy SSL, devi aprire la porta TCP `21114` perché l'API funzioni. Se HTTPS (`443`) è configurato per il server, TCP `21114` non deve essere esposto a Internet.

RustDesk supporta anche una modalità di distribuzione in cui è esposto solo TCP `443` e tutte le altre porte sono chiuse. Con questa configurazione, la comunicazione può funzionare solo tramite relay WSS e le connessioni peer-to-peer dirette non sono disponibili.

{{% children depth="4" showhidden="true" %}}
