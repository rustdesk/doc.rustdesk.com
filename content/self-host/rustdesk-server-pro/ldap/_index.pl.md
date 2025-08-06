---
title: LDAP
weight: 17
---

## Konfiguracja
Przejdź do strony ustawień `LDAP` jak pokazano poniżej.

![](/docs/en/self-host/rustdesk-server-pro/ldap/images/ldap.png)

- **Host LDAP:** Nazwa hosta lub adres IP serwera LDAP. Np. `ldap.przyklad.com` lub `192.0.2.1`.

- **Port LDAP:** Numer portu, na którym nasłuchuje serwer LDAP. Domyślny port dla LDAP to `389`, a dla LDAPS (LDAP przez SSL) to `636`.

- **DN bazowy:** Punkt początkowy dla wyszukiwania LDAP. Np. dc=przyklad,dc=com.

- **Zakres:** Określa zakres wyszukiwania w katalogu LDAP. Może to być one (tylko wpisy bezpośrednio pod DN bazowym) lub sub (wszystkie wpisy poniżej DN bazowego).

- **DN/Powierzanie użytkownika bind:** Nazwa użytkownika i hasło konta usługowego używane do uwierzytelniania innych użytkowników w LDAP. Zwykle w formacie DN, np. `cn=admin,dc=przyklad,dc=com`.

- **Filtr:** Filtr wyszukiwania dla zapytań LDAP. Np. `(objectClass=person)` lub `(&(wiek=28)(!(imie=Jan)))`.

- **Atrybut nazwy użytkownika:** Atrybut zawierający nazwę użytkownika. Np. `uid` lub `sAMAccountName`. Domyślnie używane są `uid` i `cn`. Więcej w [tej dyskusji](https://github.com/rustdesk/rustdesk-server-pro/issues/140#issuecomment-1916804393).

- **StartTLS:** Określa czy użyć StartTLS do zabezpieczenia połączenia.

- **NoTLSVerify:** Określa czy pominąć weryfikację certyfikatu TLS. Zaleca się pozostawienie false (weryfikacja włączona) chyba że wiesz co robisz.

## Jak to działa?
- Jak działają logowania przez LDAP? Czy trzeba najpierw utworzyć użytkownika?
  > RustDesk tworzy użytkownika przy pierwszym logowaniu
- Jak sprawdzić czy LDAP działa (najlepiej jakieś polecenie do testowania)?
  > Po przesłaniu konfiguracji, system połączy się z serwerem LDAP używając podanego binddn/hasła i zweryfikuje działanie.
- Jak zmienić lokalnych użytkowników na LDAP?
  > Jeszcze nie
- Czy obsługiwane są grupy LDAP?
  > Jeszcze nie
