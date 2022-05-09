---
title: Synology
weight: 22
---

Это руководство основано на последней DSM v6.

### Установка Docker

Откройте менеджер пакетов и установите Docker

|             |                                                   |
| --------------- | -------------------------------------------------------- |
![](/docs/en/self-host/synogy/images/package-manager.png) | ![](/docs/en/self-host/synogy/images/docker.png)


### Установка RustDesk Server

| Найдите rustdesk-server в реестре Docker и установите двойным кликом мыши |   Установленный образ rustdesk-server rustdesk-server                                     |
| --------------- | -------------------------------------------------------- |
![](/docs/en/self-host/synogy/images/pull-rustdesk-server.png) | ![](/docs/en/self-host/synogy/images/rustdesk-server-installed.png)


### Создание контейнера hbbs

Дважды нажмите на образ rustdesk-server чтобы создать контейнер, установите контейнеру имя `hbbs`.
![](/docs/en/self-host/synogy/images/hbbs.png) 

Нажмите "Advanced Settings".

- Включите автоперезапуск
![](/docs/en/self-host/synogy/images/auto-restart.png) 

- Включите опцию "Use the same network as Docker host", [подробности](/docs/en/self-host/install/#net-host)
![](/docs/en/self-host/synogy/images/host-net.png) 

- Смонтируйте папку хоста (например `Shared/test/`) в `/root`, hbbs создаст файлы в папке
| Монтирование | Созданные файлы |
|-- | -- |
![](/docs/en/self-host/synogy/images/mount.png?width=500px) | ![](/docs/en/self-host/synogy/images/mounted-dir.png?width=300px) 

- Установите запускаемую команду
{{% notice note %}}
Операционная система Synology основана на основана на Debian, так что параметр (--net=host) работает нормально.

Адрес `192.168.16.98` использован для демонстрации. Установите публичный адрес вместо него.

Параметр `demo` используется для пробного периода. Используйте зарегистрированный email вместо него. `demo` может быть использован до старта продаж дицензий.
{{% /notice %}}

![](/docs/en/self-host/synogy/images/hbbs-cmd.png) 

- Готово
  
![](/docs/en/self-host/synogy/images/hbbs-config.png) 

### Создание контейнера hbbr

Произведите те-же действия, что и в случае hbbs, но измените имя контейнера на `hbbr` и запускаемую команду на `hbbr -m demo`.

![](/docs/en/self-host/synogy/images/hbbr-config.png) 

### Контейнеры hbbr/hbbs

![](/docs/en/self-host/synogy/images/containers.png?width=500px)


| Двойной клик на контейнер чтобы перейти в журнал | Проверьте, чтобы hbbs/hbbr использовали сеть хоста |
|-- | -- |
![](/docs/en/self-host/synogy/images/log.png?width=500px) | ![](/docs/en/self-host/synogy/images/network-types.png?width=500px)

### Тестирование

Чтобы проверить правильность установки, зайдите на Web-консоль. Измените `192.168.16.98` на фактический адрес хранилища Synology. Имя пользователя и пароль по умолчанию: `admin`/`test1234`.

![](/docs/en/self-host/synogy/images/console.png?width=500px)

Обязательно измените пароль администратора после первого входа.

| | |
|- | -|
![](/docs/en/self-host/synogy/images/go-to-settings.png?width=500px) | ![](/docs/en/self-host/synogy/images/change-password.png?width=500px)