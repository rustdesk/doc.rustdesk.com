---
title: Găzduire proprie
description: "Aflați cum să vă găzduiți propriul server RustDesk. Ghid complet care acoperă instalarea, configurarea și implementarea infrastructurii serverului RustDesk pentru acces remote securizat."
keywords: ["rustdesk self-host", "rustdesk server", "remote desktop server", "self-hosting guide", "rustdesk installation", "hbbs hbbr", "rustdesk pro server"]
weight: 5
pre: "<b>2. </b>"
---

Dacă folosiți RustDesk, ar trebui să aveți propriul server RustDesk; aceste documentații vă vor ghida în proces.

Suportul este disponibil prin [Discord](https://discord.com/invite/nDceKgxnkV) pentru OSS și prin [email](mailto:support@rustdesk.com) pentru Pro.

## Cum funcționează un server self-host?

Din punct de vedere tehnic există două executabile (servere):

- `hbbs` - serverul RustDesk ID (rendezvous / signaling), ascultă pe TCP (`21114` - pentru http doar în Pro, `21115`, `21116`, `21118` pentru websocket) și pe UDP (`21116`)
- `hbbr` - serverul RustDesk relay, ascultă pe TCP (`21117`, `21119` pentru websocket)

Când instalați folosind scriptul de instalare / docker compose / pachet deb, ambele servicii vor fi instalate.

Iată câteva [ilustrații](https://github.com/rustdesk/rustdesk/wiki/How-does-RustDesk-work%3F) despre modul în care clientul RustDesk comunică cu `hbbr` / `hbbs`.

Atâta timp cât RustDesk rulează pe o mașină, aceasta va efectua periodic ping către serverul ID (`hbbs`) pentru a-și anunța adresa IP și portul curent.

Când porniți o conexiune de la calculatorul A către calculatorul B, A contactează serverul ID și solicită comunicarea cu B.

Serverul ID încearcă apoi să conecteze A și B direct între ele folosind hole punching (NAT traversal).

Dacă hole punching eșuează, A va comunica cu B prin intermediul serverului relay (`hbbr`).

În majoritatea cazurilor, hole punching are succes și serverul relay nu este utilizat.

Aici este o discuție despre [Ar trebui să vă găzduiți propriul server rustdesk?](https://www.reddit.com/r/rustdesk/comments/1cr8kfv/should_you_selfhost_a_rustdesk_server/)

## Porturi necesare

Porturile necesare pentru găzduirea unui server RustDesk depind în mare măsură de mediul dvs. și de modul în care doriți să folosiți RustDesk. Exemplele din documentație vor sugera, în general, deschiderea tuturor porturilor indicate.

Porturi de bază: \
TCP `21114-21119` \
UDP `21116`

- TCP `21114`: folosit pentru serverul HTTP API în RustDesk Server Pro.
- TCP `21115`: folosit pentru testul tipului NAT.
- UDP `21116`: folosit pentru înregistrarea dispozitivelor.
- TCP `21116`: folosit pentru înregistrarea dispozitivelor și NAT hole punching.
- TCP `21117`: folosit pentru comunicarea relay.
- TCP `21118`: folosit pentru comunicarea WebSocket.
- TCP `21119`: folosit pentru comunicarea WebSocket.

Porturile `21115`-`21117` sunt minimul necesar pentru funcționarea RustDesk. Acestea gestionează semnalizarea, relay-ul și traversarea NAT.

Pentru o configurație WSS, porturile TCP `21118` și TCP `21119` de obicei nu trebuie expuse extern, deoarece sunt accesate intern de reverse proxy, cum ar fi Nginx. Dacă nu utilizați WebSocket, aceste porturi nu trebuie expuse. Consultați acest [exemplu de configurare Nginx](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms).

Pentru utilizatorii Pro fără un proxy SSL, trebuie să deschideți portul TCP `21114` pentru ca API-ul să funcționeze. Dacă HTTPS (`443`) este configurat pentru server, TCP `21114` nu trebuie expus pe Internet.

RustDesk suportă și un mod de implementare în care doar TCP `443` este expus și toate celelalte porturi sunt închise. Cu această configurație, comunicarea poate funcționa doar prin relay WSS, iar conexiunile directe peer-to-peer nu sunt disponibile.

{{% children depth="4" showhidden="true" %}}
