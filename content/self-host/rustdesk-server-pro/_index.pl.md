---
title: Serwer RustDeska Pro
weight: 200
pre: "<b>2.2. </b>"
---

Serwer RustDesk Pro oferuje więcej funkcji w porównaniu z wersją open source.

- Zarządzanie kontami
- [Konsola webowa](https://rustdesk.com/docs/pl/self-host/rustdesk-server-pro/console/)
- [API](https://github.com/rustdesk/rustdesk/wiki/FAQ#api-of-rustdesk-server-pro)
- Integracje: [OIDC](https://rustdesk.com/docs/pl/self-host/rustdesk-server-pro/oidc/), [LDAP](https://rustdesk.com/docs/pl/self-host/rustdesk-server-pro/ldap/), [2FA](https://rustdesk.com/docs/pl/self-host/rustdesk-server-pro/2fa/)
- Książka adresowa
- Zarządzanie logami (połączenia, transfer plików, alarmy itp.)
- Zarządzanie urządzeniami
- [Synchronizacja ustawień bezpieczeństwa](https://rustdesk.com/docs/pl/self-host/rustdesk-server-pro/strategy/)
- [Kontrola dostępu](https://rustdesk.com/docs/pl/self-host/rustdesk-server-pro/permissions/)
- [Wiele serwerów przekaźnikowych](https://rustdesk.com/docs/pl/self-host/rustdesk-server-pro/relay/) (automatyczny wybór najbliższego)
- [Generator niestandardowego klienta](https://rustdesk.com/docs/pl/self-host/client-configuration/#1-generator-klientów-wyłącznie-wersja-Pro-z-planem-podstawowym-lub-dostosowanym)
- WebSocket
- Samodzielny hosting klienta webowego

{{% notice note %}}
Jeśli hostujesz serwer w domu/biurze i nie możesz go połączyć przez publiczny IP/domenę, sprawdź [ten artykuł](https://rustdesk.com/docs/pl/self-host/nat-loopback-issues/).
{{% /notice %}}

{{% notice note %}}
Zalecamy najpierw przeczytać: [Jak działa samodzielnie hostowany serwer?](/docs/pl/self-host/#jak-działa-samodzielnie-hostowany-serwer).
{{% /notice %}}

## Wymagania sprzętowe

Podstawowy VPS wystarczy do większości zastosowań. Oprogramowanie serwera nie jest wymagające pod względem CPU i pamięci. Nasz publiczny serwer ID hostowany na VPS 2 CPU/4 GB obsługuje ponad 1 milion punktów końcowych. Każde połączenie przekaźnikowe zużywa średnio 180 kb/s. 1 rdzeń CPU i 1 GB RAM wystarczą dla 1000 równoczesnych połączeń.

## Przewodniki krok po kroku
[Samodzielny hosting serwera RustDesk Pro w chmurze przez Docker](https://www.linkedin.com/pulse/step-by-step-guide-self-host-rustdesk-server-pro-cloud-montinaro-fwnmf/)

## Instrukcje wideo

[Poradnik dla początkujących](https://www.youtube.com/watch?v=MclmfYR3frk)

[Poradnik dla zaawansowanych](https://youtu.be/gMKFEziajmo)

## Licencja

Licencje dostępne są na https://rustdesk.com/pricing.html. Więcej szczegółów na [stronie licencji](https://rustdesk.com/docs/pl/self-host/rustdesk-server-pro/license/).

## Rozpoczęcie pracy
### 1. Instalacja

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

Więcej szczegółów w dokumentacji [Dockera](/docs/pl/self-host/rustdesk-server-pro/installscript/docker/).

### 2. Wymagane porty

Należy otworzyć porty TCP `21114`-`21119` oraz UDP `21116`. Upewnij się, że są poprawnie skonfigurowane w zaporze sieciowej i mapowaniu portów Dockera.

Więcej informacji o portach [tutaj](/docs/pl/self-host/rustdesk-server-oss/install/#porty).

### 3. Konfiguracja licencji

Dostęp do konsoli webowej: `http://<adres IP serwera>:21114`. Domyślne dane logowania: `admin`/`test1234`. Instrukcja konfiguracji licencji [tutaj](/docs/pl/self-host/rustdesk-server-pro/license/#aktywacja-licencji).

### 4. Konfiguracja HTTPS dla konsoli webowej

> Możesz pominąć ten krok podczas okresu próbnego, ale pamiętaj o zmianie adresu API w kliencie po włączeniu HTTPS

Prosty przewodnik [ręcznej konfiguracji HTTPS](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#ręczna-konfiguracja-https-dla-konsoli-webowej).

### 5. Konfiguracja klienta

https://rustdesk.com/docs/en/self-host/client-configuration/

### 6. Konfiguracja WebSocket

Aby włączyć obsługę klienta webowego lub [desktop/mobilnego](/docs/pl/self-host/client-configuration/advanced-settings/#allow-websocket), dodaj następujące ustawienia do konfiguracji reverse proxy:

https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms

## Aktualizacja serwera

[Przewodnik aktualizacji](https://rustdesk.com/docs/pl/self-host/rustdesk-server-pro/faq/#jak-zaktualizować-RustDesk-Server-Pro-do-nowej-wersji) dla różnych metod instalacji.

## Migracja i backup

Szczegółowy [samouczek migracji](https://github.com/rustdesk/rustdesk-server-pro/discussions/184).

## Migracja licencji

Instrukcje [tutaj](https://rustdesk.com/docs/pl/self-host/rustdesk-server-pro/license/#faktury-odzyskiwanie-licencji-i-migracja).

## Rozszerzenie licencji

[Przewodnik](/docs/pl/self-host/rustdesk-server-pro/license/#odnawianierozszerzanie-licencji) dotyczący rozszerzenia licencji na więcej użytkowników i urządzeń.

## Bezpieczeństwo

https://github.com/rustdesk/rustdesk/discussions/9835
