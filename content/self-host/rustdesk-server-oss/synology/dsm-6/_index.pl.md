---
title: Synology DSM 6
weight: 22
---

> Alternatywny, aktualny samouczek od strony trzeciej znajduje się [tutaj](https://mariushosting.com/how-to-install-rustdesk-on-your-synology-nas/).

Ten samouczek oparty jest na najnowszych wersjach DSM v6 i v7.

{{% notice note %}}
Po aktualizacji DSM 7.2 program Docker został zaktualizowany do nowej wersji „Container Manager”. Zapoznaj się z [tym artykułem](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7).
{{% /notice %}}

## Zainstaluj Dockera

| Open Package Center | Zainstaluj Dockera |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/package-manager.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/docker.png) |

## Zainstaluj serwer RustDeska

| Wyszukaj rustdesk-server w rejestrze Docker i zainstaluj, klikając dwukrotnie | Po zainstalowaniu obrazu rustdesk-server, kliknij dwukrotnie, aby utworzyć kontener |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/pull-rustdesk-server.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/rustdesk-server-installed.png) |

## Stwórz kontener hbbs

Jak wspomniano powyżej, kliknij dwukrotnie obraz rustdesk-server, aby utworzyć nowy kontener, i nadaj mu nazwę `hbbs`.
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbs.png)

Naciśnij na powyższe `Zaawansowane ustawienia`.

- Włącz `Włącz auto-restart`.
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/auto-restart.png)

- Włącz opcję `Użyj tej samej sieci co host Dockera`. Więcej informacji na temat sieci hosta można znaleźć [tutaj](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/docker/#net-host).
![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/host-net.png)

- Zamontuj katalog hosta (np. `/home/rustdesk/`) do `/root`, hbbs wygeneruje w tym katalogu kilka plików (bazy danych i pliki `key`), które muszą być zachowane po ponownym uruchomieniu systemu.

| Punkt montowania | Pliki wygenerowane w katalogu hosta |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/mount.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/mounted-dir.png) |

- Ustaw polecenie
{{% notice note %}}
System operacyjny Synology jest oparty na Debianie, więc host net (--net=host) działa poprawnie, nie musimy mapować portów za pomocą opcji `-p`.

{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbs-cmd.png?v3)

- Gotowe

## Create hbbr container

Please repeat above `hbbs` steps, but name the container `hbbr` and command (for Set Command Step) should be `hbbr`.

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/hbbr-config.png)

## Kontenery hbbr/hbbs

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/containers.png)

| Kliknij dwukrotnie na kontener i sprawdź logi | Sieć kontenerów |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/log.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-6/images/network-types.png) |

## Pobierz swój Klucz

Przed użyciem File Station przejdź do folderu setup, pobierz plik `id_ed25519.pub` i otwórz go w edytorze tekstowym, aby uzyskać dostęp do swojego klucza.
