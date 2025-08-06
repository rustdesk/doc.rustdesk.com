---
title: Samodzielne hostowanie
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

Powyższy zakres `21115-21117` to minimum portów potrzebnych RustDeskowi do działania. To one zajmują się sygnalizowaniem i przekazywaniem oraz przechodzeniem przez NAT.

Porty TCP `21118` i `21119` są portami WebSocketów dla [klienta webowego RustDeska](https://rustdesk.com/web/). Potrzebujesz wstecznego proxy, jeżeli chcesz używać HTTPS - zobacz [przykładową konfigurację Nginxa](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-the-web-client).

Użytkownicy Pro bez proxy SSL będą potrzebowali otworzyć port TCP `21114` żeby API było w stanie funckjonować - alternatywnie użyj proxy SSL i otwórz port `443`. 

{{% children depth="4" showhidden="true" %}}
