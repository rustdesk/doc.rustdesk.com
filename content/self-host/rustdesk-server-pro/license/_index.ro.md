
---
title: Licență
weight: 15
---

## Cumpărați o licență

Vă rugăm să achiziționați licența de la [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html) și să introduceți o adresă de e‑mail validă în pagina de checkout Stripe. Licența (și factura într‑un e‑mail separat) vă vor fi trimise pe e‑mail după finalizarea cu succes a plății.

![](/docs/ro/self-host/rustdesk-server-pro/license/images/stripe.jpg)

## Setați licența

Vi se va solicita să introduceți licența în consola web (`http://<rustdesk-server-pro-ip>:21114`) sau o puteți modifica ulterior.

| Setați licența | Schimbați licența |
| --- | --- |
| ![](/docs/ro/self-host/rustdesk-server-pro/license/images/set.png) | ![](/docs/ro/self-host/rustdesk-server-pro/license/images/change.png) |

## Reînnoirea/actualizarea licenței

Opțiunile pentru reînnoire sau upgrade ale licenței se găsesc în portalul self‑service de licențe: [https://rustdesk.com/self-host/account/](https://rustdesk.com/self-host/account/). Autentificați‑vă cu e‑mailul folosit la achiziție, așa cum se arată în imaginea de mai sus.

| Pagina licenței cu acțiuni de reînnoire/upgrade | Fereastra de upgrade |
| --- | --- |
| ![](/docs/ro/self-host/rustdesk-server-pro/license/images/renew.jpg?v2) | ![](/docs/ro/self-host/rustdesk-server-pro/license/images/upgrade.png) |

După efectuarea plății, reîmprospătați licența [așa cum e descris mai jos](/docs/ro/self-host/rustdesk-server-pro/license/#refresh-license) pentru a o activa.

### Reîmprospătarea licenței
După plată, trebuie să accesați consola web pentru a o activa manual, așa cum e prezentat mai jos. Faceți click pe `Edit`, apoi pe `OK` — nu e nevoie să modificați nimic, cheia de licență rămâne aceeași.

![](/docs/ro/self-host/rustdesk-server-pro/license/images/updatelic.jpg)

## Facturi, recuperare licență și migrare

Licența poate fi utilizată pe o singură mașină (doar pentru `hbbs`; `hbbr` nu necesită licență). Dacă doriți să migrați licența pe altă mașină, să recuperați licența sau să descărcați facturi, accesați [https://rustdesk.com/self-host/account/](https://rustdesk.com/self-host/account/). Autentificați‑vă cu adresa de e‑mail folosită la checkout‑ul Stripe, dezlegați (unbind) mașina veche din care doriți să migrați, așa cum se arată mai jos — când setați licența în consola web a noului server, aceasta va fi atribuită și înregistrată automat în consolă.

![](/docs/ro/self-host/rustdesk-server-pro/license/images/unbind.jpg)

## Proxy

Dacă serverul dvs. nu poate accesa internetul pentru a verifica licența direct, puteți adăuga un proxy, de ex.: `proxy=http://username:password@example.com:8080 ./hbbs`.

> Alternativ, puteți adăuga `proxy=http://username:password@example.com:8080` în fișierul `.env` din directorul de lucru (unde se află fișierele `id_ed25519` / `db.sqlite3`).

`http` poate fi înlocuit cu `https` sau `socks5`. Dacă nu există `username` / `password` / `port`, se poate folosi `proxy=http://example.com`.