---
title: Synology DSM 6
weight: 22
---

Это руководство основано на последней DSM v6.

### Установка Docker

Откройте менеджер пакетов и установите Docker

|             |                                                   |
| --------------- | -------------------------------------------------------- |
![](images/package-manager.png) | ![](images/docker.png)


### Установка RustDesk Server

| Найдите rustdesk-server в реестре Docker и установите двойным кликом мыши |   Установленный образ rustdesk-server rustdesk-server                                     |
| --------------- | -------------------------------------------------------- |
![](images/pull-rustdesk-server.png) | ![](images/rustdesk-server-installed.png)


### Создание контейнера hbbs

Дважды нажмите на образ rustdesk-server чтобы создать контейнер, установите контейнеру имя `hbbs`.
![](images/hbbs.png) 

Нажмите "Advanced Settings".

- Включите автоперезапуск
![](images/auto-restart.png) 

- Включите опцию "Use the same network as Docker host", [подробности](/docs/en/self-host/install/#net-host)
![](images/host-net.png) 

- Смонтируйте папку хоста (например `Shared/test/`) в `/root`, hbbs создаст файлы в папке
| Монтирование | Созданные файлы |
|-- | -- |
![](images/mount.png?width=500px) | ![](images/mounted-dir.png?width=300px) 

- Установите запускаемую команду
{{% notice note %}}
Операционная система Synology основана на основана на Debian, так что параметр (--net=host) работает нормально.

Адрес `192.168.16.98` использован для демонстрации. Установите публичный адрес вместо него.

{{% /notice %}}

![](images/hbbs-cmd.png?v3) 

- Готово
  
![](images/hbbs-config.png) 

### Создание контейнера hbbr

Произведите те-же действия, что и в случае hbbs, но измените имя контейнера на `hbbr` и запускаемую команду на `hbbr`.

![](images/hbbr-config.png) 

### Контейнеры hbbr/hbbs

![](images/containers.png?width=500px)


| Двойной клик на контейнер чтобы перейти в журнал | Проверьте, чтобы hbbs/hbbr использовали сеть хоста |
|-- | -- |
![](images/log.png?width=500px) | ![](images/network-types.png?width=500px)
