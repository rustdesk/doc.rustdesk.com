---
title: Synology DSM 7.2
weight: 20
---
<!-- Dla tłumaczy: Tłumacząc elementy takie jak "przyciski", nie tłumaczcie ich po prostu, ale odwołajcie się do rzeczywistych nazw w interfejsie. -->
Po aktualizacji DSM 7.2 firma Synology zmieniła nazwę pakietu "Docker" na "Container Manager". Pakiet ten posiada nowy interfejs graficzny i zawiera narzędzie "docker-compose", które ułatwia tworzenie kontenerów Docker.

## Obsługiwane modele i wymagania

Container Manager zapewnia obsługę ARM64 dla niektórych modeli z niższej półki, takich jak seria J. Szczegółową listę obsługiwanych modeli można znaleźć na [stronie internetowej Synology](https://www.synology.com/en-us/dsm/packages/ContainerManager).
W większości przypadków nie ma potrzeby instalowania dodatkowej pamięci RAM w celu zainstalowania Dockera i serwra RustDeska.

## 1. Zainstaluj menedżera kontenerów (Docker)

Otwórz "Package Center", wyszukaj i zainstaluj "Container Manager".

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_install_container_manager_though_package_center.png)

## 2. Stwórz folder

Po zainstalowaniu programu "Container Manager" zostanie utworzony folder współdzielony o nazwie `docker`. Umieśćmy w nim dane naszego serwera.

Otwórz File Station, utwórz folder o nazwie `rustdesk-server` (lub dowolnej innej). Następnie utwórz w nim folder o nazwie `data`, tak jak na obrazku.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_create_required_folders.png)

## 3. Stwórz kontener

Otwórz "Container Managera", przejdź do "Project" i naciśnij "Create".

Wpisz nazwę projektu `rustdesk-server` i zmień opcję "Source" z "Upload compose.ym" na "Create compose.yml", a następnie skopiuj poniższą treść do pola.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_creating_project_init.png?v2)

```yaml
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest # Jeśli chcesz zainstalować wersję Pro, zmień to na rustdesk/rustdesk-server-pro:latest.
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: host
    depends_on:
      - hbbr
    restart: always

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest # Jeśli chcesz zainstalować wersję Pro, zmień to na rustdesk/rustdesk-server-pro:latest.
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: host
    restart: always

# Ponieważ używasz trybu hosta Docker
# Na wypadek, gdybyś zapomniał numery portów:
# 21114 TCP dla konsoli webowej, dostępny tylko w wersji Pro
# 21115 TCP dla testu typu NAT
# 21116 TCP dla funkcji przebijania przez NAT
# 21116 UDP dla serwera heartbeat/ID
# 21117 TCP dla przekaźnika
```

Pomiń `Web portal settings`, a następnie zakończ.

## 4. Sprawdź czy działa

Otwórz File Station, w folderze `docker/rustdesk-server/data` powinny znajdować się pliki `id_ed25519` i `id_ed25519.pub`. Możesz je pobrać i otworzyć w dowolnym edytorze tekstowym lub użyć [Synology Text Editor](https://www.synology.com/en-us/dsm/packages/TextEditor). Jest to klucz publiczny potrzebny do klienta RustDeska.

Klucz publiczny będzie wyglądał następująco:

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_viewing_public_key_though_syno_text_editor.png)

Sprawdź [tutaj](/docs/pl/client), aby skonfigurować swojego klienta. Potrzebne są tylko `serwer ID` i `klucz`. `Serwer przekaźnikowy` nie jest potrzebny, ponieważ ustawiliśmy go w `hbbs`, a `hbbs` automatycznie dostarczy te informacje.

## 5. Skonfiguruj przekierowanie portów w routerze

Przejdź do strony administracyjnej routera, znajdź wszystko, co dotyczy `Przekierowania portów` – powinno to znajdować się w ustawieniach `WAN` lub `Zapora sieciowa`.

Jeśli nadal nie możesz znaleźć tego ustawienia, wyszukaj w Google `{marka routera} + przekierowanie portów` lub `{model routera} + przekierowanie portów`. Jeśli to urządzenie pochodzi od twojego dostawcy usług internetowych, zapytaj go o to.

Otwórz następujące wymagane porty:
  * `21114` TCP dla konsoli webowej, dostępnej tylko w wersji Pro
  * `21115` TCP dla testu typu NAT
  * `21116` TCP przebijanie przez NAT (TCP)
  * `21116` UDP heartbeat/serwer ID
  * `21117` TCP serwer przekaźnikowy
