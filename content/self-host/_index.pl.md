---
title: Samodzielne hostowanie
description: "Naucz się jak samodzielnie hostować własny serwer RustDesk. Kompletny przewodnik obejmujący instalację, konfigurację i wdrożenie infrastruktury serwera RustDesk dla bezpiecznego dostępu do zdalnego pulpitu."
keywords: ["rustdesk samodzielne hostowanie", "serwer rustdesk", "serwer zdalnego pulpitu", "przewodnik samodzielnego hostowania", "instalacja rustdesk", "hbbs hbbr", "serwer rustdesk pro"]
weight: 5
pre: "<b>2. </b>"
---

Jeżeli używasz RustDeska powinieneś mieć własny serwer RustDeska. Ta dokumentacja pomoże ci w twojej podróży z RustDeskiem.

Wsparcie jest udzielane na naszym [Discordzie](https://discord.com/invite/nDceKgxnkV) dla wersji OSS i [mailowo](mailto:support@rustdesk.com) dla wersji Pro.

## Jak działa samodzielnie hostowany serwer?

Technicznie są dwa pliki wykonywalne (serwery):

- `hbbs` - Serwer ID RustDeska (rendezvous / sygnalizujący), nasłuchuje na TCP (`21114` - HTTP wyłącznie w wersji Pro, `21115`, `21116`, `21118` w ramach web socketów) i UDP (`21116`)
- `hbbr` - Serwer przekaźnikowy RustDeska, nasłuchuje na TCP (`21117`, `21119` w ramach web socketów)

Kiedy zainstalujesz serwer poprzez skrypt instalacyjny / docker compose / pakiet deb, dwie usługi zostaną zainstalowane.

Stworzyliśmy [ilustracje](https://github.com/rustdesk/rustdesk/wiki/How-does-RustDesk-work%3F) przedstawiające to jak klient RustDeska komunikuje się z `hbbr` / `hbbs`.

Dopóki RustDesk działa na komputerze, będzie on stale pingował serwer ID (`hbbs`), aby przekazać serwerowi swój aktualny adres IP i port. 

Kiedy nawiązujesz połączenie z komputera A do komputera B, komputer A kontaktuje się z serwerem ID i żąda rozpoczęcia komunikacji z komputerem B.

Następnie serwer ID podejmuje próbę bezpośredniego połączenia pomiędzy A i B używając przebijania się przez NAT (_hole punching_).

Jeżeli hole punching się nie powiedzie, komputer A będzie komunikował się z B poprzez serwer przekaźnikowy (`hbbr`).

W większości przypadków hole punching przechodzi pomyślnie i serwer przekaźnikowy nie jest w ogóle używany.

Tutaj znajdziesz dyskuję na temat [Czy powinieneś samodzielnie hostować serwer rustdeska?](https://www.reddit.com/r/rustdesk/comments/1cr8kfv/should_you_selfhost_a_rustdesk_server/)

## Wymagane porty

Lista wymaganych portów dla samodzielnie hostowanego serwera RustDesk zależy głównie od tego, co chcesz robić z RustDeskiem. Pokazane przykłady w dokumentacji będą zawierały porty sugerowane do otwarcia.

Główne porty: \
TCP `21114-21119` \
UDP `21116`

- TCP `21114`: używany przez serwer HTTP API w RustDesk Server Pro.
- TCP `21115`: używany do testu typu NAT.
- UDP `21116`: używany do rejestracji urządzeń.
- TCP `21116`: używany do rejestracji urządzeń i NAT hole punching.
- TCP `21117`: używany do komunikacji relay.
- TCP `21118`: używany do komunikacji WebSocket.
- TCP `21119`: używany do komunikacji WebSocket.

Porty `21115`-`21117` to minimum portów potrzebnych RustDeskowi do działania. Obsługują sygnalizację, relay i przechodzenie przez NAT.

Przy konfiguracji WSS porty TCP `21118` i TCP `21119` zwykle nie muszą być wystawione na zewnątrz, ponieważ są używane wewnętrznie przez reverse proxy, takie jak Nginx. Jeśli nie używasz WebSocket, tych portów nie trzeba wystawiać. Zobacz [przykładową konfigurację Nginxa](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms).

Użytkownicy Pro bez proxy SSL muszą otworzyć port TCP `21114`, aby API działało. Jeśli HTTPS (`443`) jest skonfigurowany dla serwera, TCP `21114` nie musi być wystawiony do Internetu.

RustDesk obsługuje też tryb wdrożenia, w którym wystawiony jest tylko TCP `443`, a wszystkie pozostałe porty są zamknięte. W tej konfiguracji komunikacja może działać tylko przez relay WSS, a bezpośrednie połączenia peer-to-peer nie są dostępne.

{{% children depth="4" showhidden="true" %}}
