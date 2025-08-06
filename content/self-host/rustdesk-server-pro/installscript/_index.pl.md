---
title: Instalacja
weight: 2
---

## Metoda 1: Docker (zalecana)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

Więcej szczegółów znajdziesz w dokumentacji [Dockera](/docs/en/self-host/rustdesk-server-pro/installscript/docker/).

## Metoda 2: install.sh

Jeśli jesteś biegły w systemie Linux, możesz użyć poniższego skryptu. W przeciwnym razie, w przypadku niepowodzenia, możesz napotkać poważne problemy, a ustalenie przyczyny może być trudne.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

Więcej szczegółów znajdziesz w dokumentacji [install.sh](/docs/en/self-host/rustdesk-server-pro/installscript/script/).

## Konwersja z wersji open source

### Docker
Jeśli używasz wersji open source zainstalowanej przez Docker, nie ma bezpośredniej metody konwersji. Zamiast tego musisz uruchomić nowy kontener z obrazem Pro. Przed wykonaniem tej czynności wykonaj kopię zapasową klucza prywatnego (pliku `id_ed25519`, a nie `id_ed25519.pub`). Po skonfigurowaniu nowego kontenera skopiuj stary plik klucza prywatnego `id_ed25519` do katalogu roboczego nowego kontenera, a następnie zrestartuj kontener.

### install.sh
Jeśli używasz wersji open source zainstalowanej przez install.sh, postępuj zgodnie z [tymi instrukcjami](/docs/en/self-host/rustdesk-server-pro/installscript/script/#convert-from-open-source).
