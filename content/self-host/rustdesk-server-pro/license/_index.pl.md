---
title: Licencja
weight: 15
---

## Zakup licencji

Licencję można nabyć na stronie [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html). W formularzu Stripe podaj poprawny adres e-mail. Licencja (oraz faktura w osobnej wiadomości) zostanie wysłana na podany adres e-mail po udanej płatności.

![](/docs/en/self-host/rustdesk-server-pro/license/images/stripe.jpg)

## Aktywacja licencji

Licencję należy wprowadzić w konsoli webowej (`http://<adres-ip-serwera-rustdeska-pro>:21114`) podczas pierwszej konfiguracji lub później.

| Ustawianie licencji | Zmiana licencji |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/set.png) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/change.png) |

## Odnawianie/rozszerzanie licencji

Opcje odnawiania i rozszerzania licencji dostępne są w [portalu samoobsługowym](https://rustdesk.com/self-host/account/). Zaloguj się przy użyciu adresu e-mail użytego przy zakupie licencji.

| Strona licencji z opcjami | Okno rozszerzenia |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/renew.jpg?v2) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/upgrade.png) |

Po dokonaniu płatności należy odświeżyć licencję [jak poniżej](/docs/pl/self-host/rustdesk-server-pro/license/#odświeżanie-licencji) aby ją aktywować.

### Odświeżanie licencji
Po płatności należy ręcznie aktywować licencję w konsoli webowej. Kliknij `Edytuj`, następnie `OK` - nie trzeba wprowadzać żadnych zmian, ponieważ klucz licencji pozostaje taki sam.

![](/docs/en/self-host/rustdesk-server-pro/license/images/updatelic.jpg)

## Faktury, odzyskiwanie licencji i migracja

Licencja może być używana tylko na jednej maszynie (dotyczy tylko hbbs, hbbr nie wymaga licencji). Aby zmigrować licencję na inną maszynę, odzyskać licencję lub pobrać faktury, odwiedź [https://rustdesk.com/self-host/account/](https://rustdesk.com/self-host/account/). Zaloguj się adresem e-mail użytym w Stripe, odłącz starą maszynę jak poniżej. Po wprowadzeniu licencji w nowym serwerze, licencja zostanie automatycznie przypisana.

![](/docs/en/self-host/rustdesk-server-pro/license/images/unbind.jpg)

## Proxy
Jeśli serwer nie ma bezpośredniego dostępu do internetu w celu weryfikacji licencji, można skonfigurować proxy, np. `proxy=http://użytkownik:hasło@przykład.com:8080 ./hbbs`.

Alternatywnie można dodać `proxy=http://użytkownik:hasło@przykład.com:8080` do pliku `.env` w katalogu roboczym (gdzie znajdują się pliki `id_ed25519` / `db.sqlite3`).

`http` można zastąpić `https` lub `socks5`. Jeśli nie ma `użytkownika` / `hasła` / `portu`, można użyć `proxy=http://przykład.com`.