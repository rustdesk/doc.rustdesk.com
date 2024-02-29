---
title: Synology
weight: 22
---

Это руководство основано на последней DSM v6.

### Установка Docker

Откройте менеджер пакетов и установите Docker

|             |                                                   |
| --------------- | -------------------------------------------------------- |
![](/docs/en/self-host/rustdesk-server-oss/synology/images/package-manager.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/images/docker.png)


### Установка RustDesk Server

| Найдите rustdesk-server в реестре Docker и установите двойным кликом мыши |   Установленный образ rustdesk-server rustdesk-server                                     |
| --------------- | -------------------------------------------------------- |
![](/docs/en/self-host/rustdesk-server-oss/synology/images/pull-rustdesk-server.png) | ![](/docs/en/self-host/rustdesk-server-oss/synology/images/rustdesk-server-installed.png)


### Создание контейнера hbbs

Дважды нажмите на образ rustdesk-server чтобы создать контейнер, установите контейнеру имя `hbbs`.
![](/docs/en/self-host/rustdesk-server-oss/synology/images/hbbs.png) 

Нажмите "Advanced Settings".

- Включите автоперезапуск
![](/docs/en/self-host/rustdesk-server-oss/synology/images/auto-restart.png) 

- Включите опцию "Use the same network as Docker host", [подробности](/docs/en/self-host/install/#net-host)
![](/docs/en/self-host/rustdesk-server-oss/synology/images/host-net.png) 

- Смонтируйте папку хоста (например `Shared/test/`) в `/root`, hbbs создаст файлы в папке
| Монтирование | Созданные файлы |
|-- | -- |
![](/docs/en/self-host/rustdesk-server-oss/synology/images/mount.png?width=500px) | ![](/docs/en/self-host/rustdesk-server-oss/synology/images/mounted-dir.png?width=300px) 

- Установите запускаемую команду
{{% notice note %}}
Операционная система Synology основана на основана на Debian, так что параметр (--net=host) работает нормально.

Адрес `192.168.16.98` использован для демонстрации. Установите публичный адрес вместо него.

{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-oss/synology/images/hbbs-cmd.png?v2) 

- Готово
  
![](/docs/en/self-host/rustdesk-server-oss/synology/images/hbbs-config.png) 

### Создание контейнера hbbr

Произведите те-же действия, что и в случае hbbs, но измените имя контейнера на `hbbr` и запускаемую команду на `hbbr`.

![](/docs/en/self-host/rustdesk-server-oss/synology/images/hbbr-config.png) 

### Контейнеры hbbr/hbbs

![](/docs/en/self-host/rustdesk-server-oss/synology/images/containers.png?width=500px)


| Двойной клик на контейнер чтобы перейти в журнал | Проверьте, чтобы hbbs/hbbr использовали сеть хоста |
|-- | -- |
![](/docs/en/self-host/rustdesk-server-oss/synology/images/log.png?width=500px) | ![](/docs/en/self-host/rustdesk-server-oss/synology/images/network-types.png?width=500px)
