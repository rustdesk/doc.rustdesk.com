---
title: Настройка ретрансляторов
weight: 17
description: "Добавление дополнительных ретрансляторов RustDesk в развёртывание Server Pro и использование геолокации, чтобы направлять соединения через ближайший доступный hbbr."
keywords: ["rustdesk relay server", "rustdesk hbbr", "rustdesk geolocation relay", "rustdesk additional relay", "rustdesk server pro relay"]
---

В этом руководстве описано, как добавить в RustDesk Server Pro дополнительные ретрансляторы и улучшить работу в разных регионах с помощью маршрутизации с учётом геолокации.

## Когда нужны дополнительные ретрансляторы?

Дополнительные ретрансляторы нужны, когда пользователи подключаются друг к другу из разных регионов и прямая пробивка NAT срабатывает не всегда. Дополнительные узлы `hbbr` позволяют RustDesk направлять трафик через более близкий регион, что снижает задержку и улучшает качество сеанса, когда без ретранслятора не обойтись.

## Порядок настройки ретранслятора

1. Разверните дополнительный ретранслятор `hbbr` в нужном регионе.
2. Задайте на `hbbr` переменную окружения `KEY` со значением открытого ключа из `id_ed25519.pub` или скопируйте `id_ed25519` и `id_ed25519.pub` на сервер ретранслятора.
3. Откройте порты TCP `21117` и `21119`.
4. Добавьте имена хостов или IP-адреса новых ретрансляторов в веб-консоли RustDesk Pro.
5. Установите на `hbbs` базу данных MaxMind GeoLite2 City.
6. Перезагрузите настройки геолокации и убедитесь, что новый ретранслятор появился в журналах.

## Как установить дополнительные ретрансляторы с Docker

{{% notice note %}}
[Простая установка](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/installscript/) неявно создаёт ретранслятор (процесс `hbbr`) на том же компьютере, указывать ретранслятор явно не нужно.

Если вы хотите явно создать дополнительный ретранслятор на другом компьютере, запустите `hbbr`, следуя [установке OSS](https://rustdesk.com/docs/ru/self-host/rustdesk-server-oss/install/). `hbbr` есть в `rustdesk-server-linux-amd64.tar.gz`, `rustdesk-server-hbbr_<version>-<arch>.deb`, `rustdesk-server-windows-x86_64.tar.gz` или в `docker` (`sudo docker run ... rustdesk/rustdesk-server-pro hbbr`).

`hbbr` не требует лицензии и ничем не отличается от версии с открытым исходным кодом.
{{% /notice %}}

Можно запустить несколько ретрансляторов по всему миру и автоматически использовать ближайший из них с помощью геолокации, чтобы подключение к удалённым компьютерам работало быстрее. `hbbs` каждые несколько секунд автоматически проверяет, доступны ли эти ретрансляторы, и выбирает только доступные.

{{% notice note %}}
Известная проблема: https://github.com/rustdesk/rustdesk/discussions/7934
{{% /notice %}}

> Задайте на `hbbr` переменную окружения `KEY` со значением открытого ключа из `id_ed25519.pub` или скопируйте `id_ed25519` и `id_ed25519.pub` на сервер ретранслятора.

### Docker Compose

Дополнительному ретранслятору нужен только `hbbr`; `hbbs` и `depends_on` не требуются. Выберите один из способов задать ключ:

- Оставьте раздел `environment` и задайте в `KEY` содержимое `id_ed25519.pub`, как показано ниже.
- Удалите раздел `environment` целиком и положите `id_ed25519` и `id_ed25519.pub` в `./data`.

Создайте файл `compose.yml` со следующим содержимым.

```yaml
services:
  hbbr:
    container_name: hbbr
    image: docker.io/rustdesk/rustdesk-server-pro:latest
    environment:
      KEY: "<PUBLIC_KEY>"
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: "host"
    restart: unless-stopped
```

### Docker

#### Ключ через переменную окружения

Задайте в `KEY` содержимое `id_ed25519.pub`.

```bash
# sudo docker run --name hbbr -e KEY="<PUBLIC_KEY>" -td --net=host rustdesk/rustdesk-server-pro hbbr
```

#### Файлы ключей

В примере ниже для Docker используется способ с файлами ключей.

1 - Если Docker уже установлен, подключитесь к серверу по SSH и создайте том для hbbr.

```
# docker volume create hbbr
```

Том hbbr должен находиться в `/var/lib/docker/volumes/hbbr/_data`.

2 - Скопируйте пару закрытого и открытого ключей в расположение тома; в этом примере файлы копируются через SCP.

Синтаксис команды: `scp <path/filename> username@server:</destination/path>`.

```
# scp id_ed25519 root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
# scp id_ed25519.pub root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
```

3 - Разверните контейнер hbbr с созданным ранее томом. В этом томе лежит пара ключей, необходимая для работы вашего частного ретранслятора.

```
# sudo docker run --name hbbr -v hbbr:/root -td --net=host rustdesk/rustdesk-server-pro hbbr
```

Образ `rustdesk/rustdesk-server` по-прежнему принимает `-k <KEY>`. Чтобы использовать подключённый файл ключа, запустите его с `-k _`:

```bash
# sudo docker run --name hbbr -v hbbr:/root -td --net=host rustdesk/rustdesk-server hbbr -k _
```

Здесь `_` — специальное значение, а не сам ключ. Оно указывает `hbbr` загрузить или создать `id_ed25519`, вычислить из него открытый ключ и проверять им запросы к ретранслятору. RustDesk Server Pro до версии 1.8.6 тоже принимал `-k _` для загрузки `id_ed25519`.

Начиная с RustDesk Server Pro 1.8.6 параметр `-k` у `hbbr` устарел и игнорируется. Если `KEY` не задан, `hbbr` вычисляет открытый ключ из `id_ed25519` или читает его из `id_ed25519.pub`, если файла закрытого ключа нет. Если нет ни одного из файлов, `hbbr` работает в режиме публичного ретранслятора.

4 - Проверьте журнал работы, чтобы убедиться, что hbbr использует вашу пару ключей.

```
# docker logs hbbr

INFO [src/common.rs:121] **Private key comes from id_ed25519**
NFO [src/relay_server.rs:581] Key: XXXXXXXXXXXXXXXXXXXXX
INFO [src/relay_server.rs:60] #blacklist(blacklist.txt): 0
INFO [src/relay_server.rs:75] #blocklist(blocklist.txt): 0
INFO [src/relay_server.rs:81] Listening on tcp :21117
```

В зависимости от ОС может понадобиться разрешить или заблокировать IP-адреса в брандмауэре.

В нашем случае на Ubuntu нужно разрешить любые TCP-подключения к портам 21117 и 21119.

```
# sudo ufw allow proto tcp from any to any port 21117,21119
```

**Включите брандмауэр**
```
# sudo ufw enable
```

**Проверьте состояние**
```
# ufw status

Status: active

To                         Action      From
--                         ------      ----
21117,21119/tcp            ALLOW       Anywhere
21117,21119/tcp (v6)       ALLOW       Anywhere (v6)
```

## Как настроить геолокацию в веб-консоли

### Регистрация и загрузка файла базы данных GeoLite2 City

Для геолокации hbbs нужен доступ к базе данных MaxMind GeoLite2 City. База бесплатная: нужно зарегистрироваться, чтобы скачать файл и получить API-ключ.

Сначала создайте учётную запись (если её нет) на [сайте](https://www.maxmind.com/en/account/login).
Откройте `Download Databases` и скачайте GeoLite2 City, выбрав файл gzip; после распаковки у вас будет файл `mmdb`.

<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/e14318fb-ec52-463c-af77-d08c9479c1b5">

Если вы установили RustDesk Pro сценарием установки на компьютере с Linux, файл `mmdb` нужно переместить в `/var/lib/rustdesk-server/`.

При установке в Docker файл должен находиться в томе, который при развёртывании контейнера подключён к `/root`.

### API-ключ для автоматизации — серверы Linux

Этот файл нужно регулярно обновлять, и для этого можно использовать задание cron. Для доступа к ссылке на скачивание нужен бесплатный API-ключ.

Откройте `Manage License Keys` и создайте новый лицензионный ключ. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/632aeb33-4f5d-4a31-9010-38e01c22d3c9">
<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/3e178174-5fbf-46b7-a335-01f77125dfad">

[Загрузку можно автоматизировать](https://dev.maxmind.com/geoip/updating-databases) несколькими способами; например, добавьте следующую команду в crontab, заменив {Your Access Key} на API-ключ, полученный на предыдущем шаге.

```
/usr/bin/curl -L --silent 'https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key={Your Access Key}&suffix=tar.gz' | /bin/tar -C '/var/lib/rustdesk-server/' -xvz --keep-newer-files --strip-components=1 --wildcards '*GeoLite2-City.mmdb'
```

### Изменение настроек в веб-консоли RustDesk Pro

Добавьте IP-адреса или DNS-имена ретрансляторов (DNS поддерживается начиная с версии 1.1.11) в `Relay Servers`. **Порт указывать не нужно, всегда используется порт `21117`.** <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/c4452ba4-5e1d-437a-ae1d-fc0070bfa26c">

Добавьте переопределение геолокации (Geo Override), указав IP-адрес сервера и координаты, где он находится. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/41c558e3-423b-4296-90d3-cb0769f4a369">

Нажмите `Reload Geo` — список должен выглядеть примерно так. <br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/5a0d39a9-4fec-46b4-a7a2-7ed38b6baeb7">

Чтобы проверить результат, посмотрите журнал hbbs после нажатия `Reload Geo`: там должно появиться сообщение с IP-адресами ретрансляторов и их координатами.

> Если RustDesk Pro работает на компьютере с Linux, для просмотра журнала используйте команду `RUST_LOG=debug ./hbbs`. Если он работает в контейнере Docker, используйте `docker logs hbbs`.

```
RUST_LOG=debug ./hbbs

INFO [src/common.rs:130] GEOIP_FILE: ./GeoLite2-City.mmdb
INFO [src/common.rs:159] override 1xx.xxx.xxx.x7: -1.xx 5x.xxx
[src/common.rs:159] override 1xx.xxx.xxx.xx8: -3.xxx 5x.xxxx
[src/common.rs:159] override 7xx.xxx.xxxx.xx1: 6.xxx 5x.xxxx
GEOIP_FILE loaded, #overrides 3
INFO [src/common.rs:119] relay-servers=["1xx.xxx.xxx.x7", "1xx.xxx.xxx.xx8", "7xx.xxx.xxx.xx1"]
NFO [src/rendezvous_server.rs:1467] parsed relay servers: [("1xx.xxxx.xxx.xx7", Some((-1x, xxx))), ("1xx.xxx.xxx.xx8", Some((-3x, xxx))), ("7xx.xxx.xxx.xx1", Some((6x, xxx)))]
```

Запросы к ретранслятору можно проверить и прямо на узлах hbbr, просто посмотрев журналы контейнера.

```
# docker logs hbbr

INFO [src/relay_server.rs:436] Relayrequest 0593e64e-4fe8-4a59-a94f-b3420ab043eb from [::ffff:100.100.123.233]:52038 got paired
INFO [src/relay_server.rs:442] Both are raw
```
