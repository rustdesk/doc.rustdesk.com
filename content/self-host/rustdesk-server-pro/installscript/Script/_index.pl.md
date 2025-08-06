---
title: install.sh
weight: 4
---

{{% notice note %}}
Nie zapomnij uzyskać licencji na [https://rustdesk.com/pricing/](https://rustdesk.com/pricing/). Więcej szczegółów znajdziesz na stronie [licencji](https://rustdesk.com/docs/pl/self-host/rustdesk-server-pro/license/).

Przed wykonaniem tej prostej instalacji zaleca się zapoznanie z [instalacją OSS](https://rustdesk.com/docs/pl/self-host/rustdesk-server-oss/install/). Znajdziesz tam więcej szczegółów technicznych.
{{% /notice %}}

## Instalacja

Skopiuj i wklej poniższą komendę w terminalu Linuxa, aby zainstalować serwer RustDeska Pro.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh | bash`

{{% notice note %}}
Zalecam użycie [obrazu Dockera](https://rustdesk.com/docs/pl/self-host/rustdesk-server-pro/installscript/docker/#docker-compose), który znacznie upraszcza proces wdrażania i aktualizacji rozwiązania. Zużycie zasobów jest bardzo niskie.

Pamiętaj, aby uruchomić powyższą komendę w katalogu domowym, a nie w katalogu, w którym nie masz uprawnień do zapisu.
{{% /notice %}}

Co robi skrypt:

- Instaluje wymagane zależności
- Konfiguruje zaporę UFW (jeśli dostępna)
- Tworzy katalog roboczy `/var/lib/rustdesk-server` i katalog logów `/var/log/rustdesk-server`
- Instaluje pliki wykonywalne w `/usr/bin`
- Pobiera i wypakowuje usługi RustDeska Pro do powyższego katalogu
- Tworzy usługi systemd dla hbbs i hbbr (nazwy usług to `rustdesk-hbbs.service` i `rustdesk-hbbr.service`)
- W przypadku wybrania domeny instaluje Nginx i Certbot, umożliwiając dostęp do API na porcie `443` (HTTPS) oraz uzyskanie certyfikatu SSL przez port `80` (automatycznie odnawiany). Po skonfigurowaniu HTTPS należy korzystać z adresu `https://twojadomena.com` zamiast `https://twojadomena.com:21114`.

{{% notice note %}}
Jak [ręcznie skonfigurować HTTPS dla konsoli webowej](https://rustdesk.com/docs/pl/self-host/rustdesk-server-pro/faq/#ręczna-konfiguracja-https-dla-konsoli-webowej).
{{% /notice %}}

{{% notice note %}}
Jeśli usługa systemd nie uruchamia się, problem może być związany z SELinux. Sprawdź [tę sekcję](https://rustdesk.com/docs/pl/self-host/rustdesk-server-pro/faq/#selinux).
{{% /notice %}}

{{% notice note %}}
Jeśli klient nie może połączyć się z serwerem lub nie masz dostępu do konsoli webowej, sprawdź [tę sekcję](https://rustdesk.com/docs/pl/self-host/rustdesk-server-pro/faq/#firewall).
{{% /notice %}}

## Aktualizacja

Skopiuj i wklej poniższą komendę w terminalu Linux, aby zaktualizować istniejącą instalację RustDesk Server Pro. Skrypt można też zapisać lokalnie i zaplanować przez cron.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/update.sh | bash`

{{% notice note %}}
W przypadku problemów ze skryptem zaleca się przejrzenie go i wykonanie kroków ręcznie, jeden po drugim.

Pamiętaj, aby uruchomić powyższą komendę w katalogu domowym, a nie w katalogu, w którym nie masz uprawnień do zapisu.
{{% /notice %}}

Co robi skrypt:

- Sprawdza dostępność nowych wersji serwera RustDesk Pro
- W przypadku znalezienia nowej wersji usuwa pliki API i pobiera nowe pliki wykonywalne oraz API

## Konwersja z wersji open source

Skopiuj i wklej poniższą komendę w terminalu Linux, aby przekonwertować serwer RustDeska na serwer RustDeska Pro.

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/convertfromos.sh | bash`

{{% notice note %}}
Dodaj port TCP `21114` do swojej zapory - jest to dodatkowy port dla konsoli webowej i logowania użytkowników w kliencie RustDesk.
{{% /notice %}}

{{% notice note %}}
W przypadku problemów ze skryptem zaleca się przejście na instalację Dockerową lub ręczne wykonanie kroków ze skryptu.
{{% /notice %}}

Co robi skrypt:

- Wyłącza i usuwa stare usługi
- Instaluje wymagane zależności
- Konfiguruje zaporę UFW (jeśli dostępna)
- Tworzy folder `/var/lib/rustdesk-server` i kopiuje do niego certyfikaty
- Usuwa `/var/log/rustdesk` i tworzy `/var/log/rustdesk-server`
- Pobiera i wypakowuje usługi RustDeska Pro
- Tworzy usługi systemd dla hbbs i hbbr
- W przypadku wybrania domeny instaluje Nginx i Certbot w ramach obsługi HTTPS
