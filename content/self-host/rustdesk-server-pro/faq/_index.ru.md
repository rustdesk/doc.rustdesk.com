---
title: Частые вопросы
description: "Частые вопросы об установке, настройке, лицензировании, устранении неполадок и переносе RustDesk Server Pro. Ответы на распространённые вопросы о настройке, SSL, управлении базой данных и обновлении."
keywords: ["rustdesk server pro faq", "rustdesk pro help", "rustdesk installation help", "rustdesk troubleshooting", "rustdesk server setup", "rustdesk license issues", "rustdesk ssl configuration", "rustdesk migration guide", "rustdesk pro support", "rustdesk server questions"]
weight: 600
---

## Коротко о RustDesk Server Pro

Здесь собраны самые частые задачи RustDesk Server Pro: установка, переход с OSS, обновления, перенос лицензии, журналы, проблемы с SMTP и с управлением устройствами. Если вы начинаете с нуля, начните с [руководства по установке](/docs/ru/self-host/rustdesk-server-pro/installscript/). Если сервер уже работает, чаще всего дальше нужны страницы [Лицензия](/docs/ru/self-host/rustdesk-server-pro/license/), [SMTP](/docs/ru/self-host/rustdesk-server-pro/smtp/) и [Развёртывание клиентов](/docs/ru/self-host/client-deployment/).

{{% notice note %}}
Помощь в устранении неполадок: [«connected, waiting for image»](https://rustdesk.com/blog/rustdesk-connected-waiting-for-image) (статья на английском языке).
{{% /notice %}}

## Какую страницу открыть для каждой частой задачи?

| Задача | Подходящая страница |
| --- | --- |
| Установить новый сервер Pro | [Установка](/docs/ru/self-host/rustdesk-server-pro/installscript/) |
| Установить Pro через Docker | [Установка через Docker](/docs/ru/self-host/rustdesk-server-pro/installscript/docker/) |
| Перейти с OSS на Pro | [Установка](/docs/ru/self-host/rustdesk-server-pro/installscript/#convert-from-open-source) |
| Купить или перенести лицензию | [Лицензия](/docs/ru/self-host/rustdesk-server-pro/license/) |
| Настроить уведомления по электронной почте | [SMTP](/docs/ru/self-host/rustdesk-server-pro/smtp/) |
| Настроить SSO или вход через систему учётных записей | [OIDC](/docs/ru/self-host/rustdesk-server-pro/oidc/) или [LDAP](/docs/ru/self-host/rustdesk-server-pro/ldap/) |
| Массово развернуть клиенты | [Развёртывание клиентов](/docs/ru/self-host/client-deployment/) |

## Как установить сервер простым сценарием установки?
1. Приобретите лицензию на [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), подробнее см. страницу [Лицензия](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/license/).
2. Подготовьте VPS, выделенный сервер или виртуальную машину с Linux.
3. Если хотите использовать DNS и SSL, создайте DNS-имя, например `rustdesk.yourdomain.com`.
4. Откройте [эту страницу](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/installscript/#method-2-installsh).
5. Скопируйте команду и вставьте её в терминал Linux.
6. Следуйте подсказкам мастера установки.
7. Когда установка завершится, откройте `https://rustdesk.yourdomain.com` или `http://youripaddress:21114`.
8. Войдите с именем пользователя `admin` и паролем `test1234`.
9. Введите код лицензии, купленной на шаге 1.

## Как перейти с RustDesk Server Open Source на RustDesk Server Pro?
1. Приобретите лицензию на [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), подробнее см. страницу [Лицензия](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/license/).
2. Откройте порт TCP 21114.
3. Войдите на сервер RustDesk.
4. Если вы ещё не используете DNS и хотите SSL, создайте DNS-имя, например `rustdesk.yourdomain.com`.
5. Откройте [эту страницу](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/installscript/#convert-from-open-source).
6. Скопируйте команду и вставьте её в терминал Linux.
7. Следуйте подсказкам мастера установки.
8. Когда установка завершится, откройте `https://rustdesk.yourdomain.com` или `http://youripaddress:21114`.
9. Войдите с именем пользователя `admin` и паролем `test1234`.
10. Введите код лицензии, купленной на шаге 1.

## Вышла новая версия RustDesk Server Pro. Как обновиться? {#there-is-a-new-version-of-rustdesk-server-pro-out-how-can-i-upgrade}
Сначала лучше сделать резервную копию файлов данных (файлов sqlite3 и т. д.), https://github.com/rustdesk/rustdesk-server-pro/discussions/184#discussioncomment-8013375.
- ### Если вы устанавливали сценарием (`install.sh`)
Запустите [update.sh](/docs/ru/self-host/rustdesk-server-pro/installscript/script/#upgrade).
- ### Docker Compose
```
sudo docker compose down
sudo docker compose pull 
sudo docker compose up -d
```
Но это зависит от версии Docker, подробнее см. [это обсуждение](https://stackoverflow.com/questions/37685581/how-to-get-docker-compose-to-use-the-latest-image-from-repository).
- ### Docker
```
sudo docker ps
## you can also use <CONTAINER NAME>, e.g. `hbbs` and `hbbr` if you follow our manual.
sudo docker stop <CONTAINER ID>
sudo docker rm <CONTAINER ID>
sudo docker rmi <IMAGE ID>
sudo docker run ..... # same as you installed it before
```

Например:

```
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE                          COMMAND   CREATED          STATUS                         PORTS     NAMES
30822972c220   rustdesk/rustdesk-server-pro   "hbbr"    10 seconds ago   Restarting (1) 2 seconds ago             hbbr
0f3a6f185be3   rustdesk/rustdesk-server-pro   "hbbs"    15 seconds ago   Up 14 seconds                            hbbs
root@hz:~# sudo docker kill hbbr hbbs
hbbr
hbbs
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
root@hz:~# sudo docker rm hbbr hbbs
hbbr
hbbs
root@hz:~# sudo docker rmi rustdesk/rustdesk-server-pro
Untagged: rustdesk/rustdesk-server-pro:latest
Untagged: rustdesk/rustdesk-server-pro@sha256:401b8344323addf777622d0463bd7b964dd18a01599e42e20d8b3818dae71ad2
Deleted: sha256:a3d9d43a3d1dd84b10c39fe0abf7767b18a87819ff0981443ce9e9a52604c889
Deleted: sha256:65ae79ecc0f8b1c8a21085d04af7c8d8f368dd5ad844982d4c7b3ac1f38ba33a
Deleted: sha256:9274a824aef10f2ef106d8f85fbd1905037169cf610951f63dc5109dae4b0825
Deleted: sha256:aa89ac8b57a49f49f041c01b9c0f016060e611cf282e3fda281bc6bebbabaf3f
Deleted: sha256:4af9839016f72586a46f915cae8a5ccf3380ba88a2f79532692d3b1d7020387e
Deleted: sha256:e900a7ffc2fc14fa432cc04823740dcbb78c0aa3508abbbe287ce8b274541ada
Deleted: sha256:503eeab76c11e8316a2a450ef0790d31c5af203309e9c5b44d1bf8a601e6e587
Deleted: sha256:825683356e7dbfcbaabcbf469c9aeb34d36ebeab0308170432b9553e28203116
Deleted: sha256:24a48d4af45bab05d8712fe22abec5761a7781283500e32e34bdff5798c09399
root@hz:~# sudo docker images
REPOSITORY         TAG       IMAGE ID       CREATED        SIZE
rustdesk/makepkg   latest    86a981e2e18f   2 months ago   2.23GB
root@hz:~# sudo docker run --name hbbs -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbs
Unable to find image 'rustdesk/rustdesk-server-pro:latest' locally
latest: Pulling from rustdesk/rustdesk-server-pro
4ce000a43472: Pull complete
1543f88421d3: Pull complete
9b209c1f5a8d: Pull complete
d717f548a400: Pull complete
1e60b98f5660: Pull complete
a86960d9bced: Pull complete
acb361c4bbf6: Pull complete
4f4fb700ef54: Pull complete
Digest: sha256:401b8344323addf777622d0463bd7b964dd18a01599e42e20d8b3818dae71ad2
Status: Downloaded newer image for rustdesk/rustdesk-server-pro:latest
0cc5387efa8d2099c0d8bc657b10ed153a6b642cd7bbcc56a6c82790a6e49b04
root@hz:~# sudo docker run --name hbbr -v ./data:/root -td --net=host --restart unless-stopped rustdesk/rustdesk-server-pro hbbr
4eb9da2dc460810547f6371a1c40a9294750960ef2dbd84168079e267e8f371a
root@hz:~# sudo docker ps
CONTAINER ID   IMAGE                          COMMAND   CREATED         STATUS                                  PORTS     NAMES
4eb9da2dc460   rustdesk/rustdesk-server-pro   "hbbr"    5 seconds ago   Restarting (1) Less than a second ago             hbbr
0cc5387efa8d   rustdesk/rustdesk-server-pro   "hbbs"    8 seconds ago   Up 7 seconds                                      hbbs
root@hz:~# sudo docker images
REPOSITORY                     TAG       IMAGE ID       CREATED        SIZE
rustdesk/rustdesk-server-pro   latest    a3d9d43a3d1d   5 days ago     193MB
rustdesk/makepkg               latest    86a981e2e18f   2 months ago   2.23GB
```

Подробнее см. [здесь](https://www.cherryservers.com/blog/how-to-update-docker-image).

## Я устанавливал сценарием. Как запускать и останавливать службы?
Службы работают через systemd, поэтому их можно запускать и останавливать командой `sudo systemctl stop|start|restart rustdesk-hbbs|rustdesk-hbbr`, например `sudo systemctl restart rustdesk-hbbs`.

## Я устанавливал сценарием. Как посмотреть журналы в Linux?
Журналы хранятся в `/var/log/rustdesk-server`, посмотреть их можно командами `tail /var/log/rustdesk-server/hbbs.log` или `tail /var/log/rustdesk-server/hbbs.error`.

## Я устанавливал сценарием. Как проверить состояние служб RustDesk?
Состояние проверяется командой `sudo systemctl status rustdesk-hbbs|rustdesk-hbbr`, например `sudo systemctl status rustdesk-hbbs`.

## Как сменить пароль администратора?
1. Откройте `https://rustdesk.yourdomain.com` или `http://youripaddress:21114`.
2. Войдите с именем пользователя `admin` и паролем `test1234`.
3. Нажмите `admin` в правом верхнем углу.
4. Нажмите `Settings`.
5. Введите новый пароль в соответствующие поля.

## Как перенести лицензию на новый сервер?
См. [здесь](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/license/#invoices-and-migration).

## С моего VPS не отправляется почта
Многие VPS-провайдеры блокируют порты 465 и 25.

Проще всего проверить это с помощью telnet. В терминале Linux введите `telnet your.mailserver.com 25`. В Windows используйте PowerShell: `Test-NetConnection -ComputerName your.mailserver.com -Port 25`.

Ваш почтовый сервер может работать не на порту 25. Убедитесь, что используете правильные порты.

## Можно ли развернуть RustDesk с помощью PowerShell или чего-то подобного?
Конечно, сценарии для развёртывания можно найти [здесь](https://rustdesk.com/docs/ru/self-host/client-deployment/).

## Как сообщить об ошибке?
Создайте обращение на [GitHub](https://github.com/rustdesk/rustdesk-server-pro/issues).

## Почему при размещении на собственном сервере это не бесплатно и не с открытым исходным кодом?
1. RustDesk стал основной работой для нескольких человек, а у них есть жизнь, семьи, работа и дети, которые требуют внимания и денег!
2. Мы хотим продолжать работать и делать серьёзные успехи ещё много лет.
3. Версия с открытым исходным кодом останется открытой, и мы призываем других развивать её в соответствии с лицензией AGPL.

## Не могу подключиться к устройствам из других групп. Почему?
Это легко исправить: нужно разрешить доступ между группами.
1. Добавьте новые группы.
2. Нажмите `Edit`.
3. Выберите группы, которым нужен доступ (они автоматически добавятся в соответствующую группу).

## Как получить конфигурацию автоматически?
Конфигурации создаются автоматически.
1. Скачайте последние версии клиентов с [GitHub](https://github.com/rustdesk/rustdesk/releases/latest).
2. На главной странице веб-консоли нажмите `Windows EXE`.
3. Заполните хост и API (если они отличаются от вашей конфигурации).
4. Нажмите `Submit`.
5. Отсканируйте QR-код на Android и переименуйте exe-файл так, как было сгенерировано.

## Предлагаете ли вы хостинг RustDesk Server Pro?
Свяжитесь с нашим [отделом продаж](mailto://sales@rustdesk.com).

## Есть ли где-нибудь видеоинструкции по настройке?
Да, у нас есть [YouTube-канал](https://youtube.com/@RustDesk).

## Почему журналы и имена устройств пустые?
Убедитесь, что на управляемом устройстве правильно указан API, https://github.com/rustdesk/rustdesk-server-pro/issues/21#issuecomment-1637935750.

## Как удалить RustDesk Server Pro?
Выполните следующие команды:
```sh
sudo systemctl stop rustdesk-hbbs.service
sudo systemctl disable rustdesk-hbbs.service
sudo systemctl stop rustdesk-hbbr.service
sudo systemctl disable rustdesk-hbbr.service
sudo systemctl daemon-reload
sudo rm /etc/systemd/system/rustdesk-hbbs.service
sudo rm /etc/systemd/system/rustdesk-hbbr.service
sudo rm /usr/bin/hbbs
sudo rm /usr/bin/hbbr
sudo rm -rf /var/lib/rustdesk-server/
sudo rm -rf /var/log/rustdesk-server/
```
Если сценарий устанавливал Nginx, удалите его так:
```sh
sudo apt remove nginx
```

## Как удалить устройства из списка устройств в веб-консоли?
Отключите устройство — после этого станет доступно удаление.

## Как обновить RustDesk с помощью PowerShell?
```ps
$ErrorActionPreference= 'silentlycontinue'

$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if ($rdver -eq "1.2.6")
{
    Write-Output "RustDesk $rdver is the newest version."
    Exit
}

if (!(Test-Path C:\Temp))
{
    New-Item -ItemType Directory -Force -Path C:\Temp > null
}

cd C:\Temp

Invoke-WebRequest "https://github.com/rustdesk/rustdesk/releases/download/1.2.6/rustdesk-1.2.6-x86_64.exe" -Outfile "rustdesk.exe"
Start-Process .\rustdesk.exe --silent-install -wait
```

## Ошибка `Key mismatch`
Настройте клиент с [правильным ключом](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/relay/).

## Ошибка `Failed to connect to relay server`
Убедитесь, что `hbbr` запущен. Подробнее о `hbbr` см. [здесь](https://rustdesk.com/docs/ru/self-host/rustdesk-server-oss/install/).
Если `hbbr` работает не на том же компьютере, что `hbbs`, у вас несколько ретрансляторов или он работает не на порту по умолчанию `21117`, это нужно явно указать `hbbs`. См. [здесь](https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/relay/).

## Сброс MFA для учётной записи администратора
https://github.com/rustdesk/rustdesk/discussions/6576

## Ручная настройка HTTPS для веб-консоли {#set-up-https-for-web-console-manually}

### 1. Купите доменное имя и направьте его на IP-адрес сервера.
* Купите доменное имя у регистратора, например GoDaddy, Namecheap или Namesilo.
* Направьте доменное имя на IP-адрес сервера одним из способов:
    - В панели управления регистратора домена (рекомендуется)
    - Через [DNS-провайдеров](https://en.wikipedia.org/wiki/List_of_managed_DNS_providers)

Например, если вы купили домен `example.com` у `Namesilo`, IP-адрес вашего сервера — `123.123.123.123`, и вы хотите использовать поддомен `rustdesk.example.com` как адрес веб-консоли с HTTPS. Откройте [эту ссылку](https://www.namesilo.com/account_domains.php), нажмите кнопку с подсказкой `Manage dns for the domain` и добавьте запись `A` с именем хоста `rustdesk` и IP-адресом вашего сервера.
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-button.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-add-a-record.png)
![](/docs/en/self-host/rustdesk-server-pro/faq/images/namesilo-dns-table.png)
* Изменения DNS вступают в силу не сразу; откройте https://www.whatsmydns.net и проверьте, указывает ли доменное имя на IP-адрес сервера. От правильного результата зависит шаг 6. В следующих шагах замените `YOUR_DOMAIN` на свой поддомен, например `rustdesk.example.com`.

### 2. Установите Nginx
* Debian/Ubuntu: `sudo apt-get install nginx`
* Fedora/CentOS: `sudo dnf install nginx` или `sudo yum install nginx`
* Arch: `sudo pacman -S install nginx`
* openSUSE: `sudo zypper install nginx`
* Gentoo: `sudo emerge -av nginx`
* Appine: `sudo apk add --no-cache nginx`

Выполните `nginx -h`, чтобы проверить, что установка прошла успешно.

### 3. Установите Certbot
* Способ 1: если установлен `snap`, выполните `sudo snap install certbot --classic`.
* Способ 2: используйте `python3-certbot-nginx`, например `sudo apt-get install python3-certbot-nginx` в Ubuntu.
* Способ 3: если два способа выше не сработали, попробуйте установить `certbot-nginx`, например `sudo yum install certbot-nginx` в CentOS 7.

Выполните `certbot -h`, чтобы проверить, что установка прошла успешно.

### 4. Настройте Nginx
Есть два варианта:
* Если существуют папки `/etc/nginx/sites-available` и `/etc/nginx/sites-enabled`, замените `YOUR_DOMAIN` в следующей команде на своё доменное имя и выполните её.
```sh
cat > /etc/nginx/sites-available/rustdesk.conf << EOF
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```
Затем выполните `sudo ln -s /etc/nginx/sites-available/rustdesk.conf /etc/nginx/sites-enabled/rustdesk.conf`.

Выполните `cat /etc/nginx/sites-available/rustdesk.conf`, чтобы убедиться, что содержимое файла верное.

* Если папок `/etc/nginx/sites-available` и `/etc/nginx/sites-enabled` нет, но есть папка `/etc/nginx/conf.d`, замените `YOUR_DOMAIN` в следующей команде на своё доменное имя и выполните её.
```sh
cat > /etc/nginx/conf.d/rustdesk.conf << EOF
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       \$remote_addr;
        proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }
}
EOF
```
Выполните `cat /etc/nginx/conf.d/rustdesk.conf`, чтобы убедиться, что содержимое файла верное.

### 5. Откройте порты в брандмауэре для домена
Выполните следующие команды:

```sh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw --force reload
```

### 6. Получите SSL-сертификат
Замените `$YOUR_DOMAIN` на своё доменное имя и выполните
`sudo certbot --nginx --cert-name $YOUR_DOMAIN --key-type ecdsa --renew-by-default --no-eff-email --agree-tos --server https://acme-v02.api.letsencrypt.org/directory -d $YOUR_DOMAIN`.

Если появится запрос `Enter email address (used for urgent renewal and security notices)`, введите свой адрес электронной почты.

В итоге содержимое `rustdesk.conf` должно быть таким:
```
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = YOUR_DOMAIN) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name YOUR_DOMAIN;
    listen 80;
    return 404; # managed by Certbot
}
```

Частые ошибки:

* Консоль выводит `Successfully deployed certificate for YOUR_DOMAIN to /etc/nginx/.../default`, а не `Successfully deployed certificate for YOUR_DOMAIN to /etc/nginx/.../rustdesk.conf`.

Возможно, Certbot не находит файл `rustdesk.conf`. Попробуйте одно из решений:
- Проверьте результат шага 5 и выполните `sudo service nginx restart`.
- Скопируйте в `rustdesk.conf` блоки `server{...}`, содержащие `YOUR_DOMAIN`, и замените `location{...}` на следующее содержимое.

```sh
location / {
    proxy_set_header        X-Real-IP       $remote_addr;
    proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:21114/;
}
```

* `too many certificates (5) already issued for this exact set of domains in the last 168 hours`

Решение: добавьте в DNS другое доменное имя и замените `YOUR_DOMAIN` на него, например `rustdesk2.example.com`. Затем повторите шаги 1, 4 и 6.

* `Error getting validation data`

Решение: возможно, дело в брандмауэре, см. https://rustdesk.com/docs/ru/self-host/rustdesk-server-pro/faq/#firewall

Внимание: если вы изменили `rustdesk.conf` вручную, выполните `sudo service nginx restart`.

### 7. Войдите на веб-страницу
* Откройте в браузере `https://YOUR_DOMAIN`, войдите с именем пользователя по умолчанию «admin» и паролем «test1234», затем смените пароль на свой.

### 8. Добавьте поддержку WebSocket Secure (WSS) для сервера ID и ретранслятора, чтобы защищённая связь работала на всех платформах. {#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms}

Добавьте следующую конфигурацию в первый блок `server` файла `/etc/nginx/.../rustdesk.conf` и перезапустите службу `Nginx`. 
Веб-клиент будет доступен по адресу `https://YOUR_DOMAIN/web`. Собственные клиенты могут использовать WebSocket, если задать `allow-websocket=Y` в расширенных настройках. Собственный клиент с включённым WebSocket не использует TCP/UDP и может подключаться только через ретранслятор (кроме прямых подключений по IP). Если используется только такой клиент с WebSocket, на сервере можно закрыть порты с 21114 по 21119 и оставить открытым только порт 443.




```
    location /ws/id {
        proxy_pass http://127.0.0.1:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /ws/relay {
        proxy_pass http://127.0.0.1:21119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }
```

Полная конфигурация:

```
server {
    server_name YOUR_DOMAIN;
    location / {
        proxy_set_header        X-Real-IP       $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:21114/;
    }

    location /ws/id {
        proxy_pass http://127.0.0.1:21118;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /ws/relay {
        proxy_pass http://127.0.0.1:21119;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = YOUR_DOMAIN) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name YOUR_DOMAIN;
    listen 80;
    return 404; # managed by Certbot
}
```

{{% notice note %}}
Если вы ранее уже настраивали сервер для веб-клиентов и хотите использовать его на всех платформах, нужно добавить `proxy_read_timeout`.
{{% /notice %}}

### 9. Обход CORS при использовании публичного веб-клиента RustDesk `https://rustdesk.com/web`

Чтобы обойти ограничения CORS в браузерах, добавьте следующее в блок `location /` файла `/etc/nginx/.../rustdesk.conf`. Если вы используете собственный веб-клиент, пропустите этот шаг.

```
        if ($http_origin ~* (https?://(www\.)?rustdesk\.com)) {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
        }
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Content-Length' 0;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            return 204;
        }
```

## SELinux

Если при установке появляется `Waiting for RustDesk Relay service to become active...`, причиной может быть SELinux. Попробуйте следующие команды:

```sh
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbs'
sudo semanage fcontext -a -t NetworkManager_dispatcher_exec_t 'hbbr'
sudo restorecon -v '/usr/bin/hbbs'
sudo restorecon -v '/usr/bin/hbbr'
```

## Брандмауэр {#firewall}

### Брандмауэр в облаке
Если сервер работает в облаке AWS/Azure/Google/DigitalOcean, откройте входящие порты UDP (21116) и TCP (21114-21119) в панели управления облачного провайдера.

- [AWS] https://docs.aws.amazon.com/network-firewall/latest/developerguide/getting-started.html
- [Azure] https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview
- [Google] https://cloud.google.com/firewall/docs/firewalls
- [DigitalOcean] https://docs.digitalocean.com/products/networking/firewalls/

### Брандмауэр на локальном сервере
RustDesk настраивает брандмауэр через `ufw`. В некоторых дистрибутивах, например CentOS 9, это может не работать; попробуйте `firewall-cmd`:

```sh
sudo firewall-cmd --permanent --add-port=21115/tcp
sudo firewall-cmd --permanent --add-port=21116/tcp
sudo firewall-cmd --permanent --add-port=21117/tcp
sudo firewall-cmd --permanent --add-port=21118/tcp
sudo firewall-cmd --permanent --add-port=21119/tcp
sudo firewall-cmd --permanent --add-port=21116/udp
```

Если вы используете IP-адрес:

```sh
sudo firewall-cmd --permanent --add-port=21114/tcp
```

Если вы используете DNS/домен:

```sh
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
```

После этого выполните `sudo firewall-cmd --reload`, чтобы перезагрузить брандмауэр.

## После смены пароля администратора в веб-консоли не получается войти. Есть ли простой способ сбросить пароль?
1. Убедитесь, что установлен `rustdesk-utils`. Если нет, его можно скачать [здесь](https://github.com/rustdesk/rustdesk-server-pro). Команду нужно выполнять из папки, где находится база данных, то есть `/var/lib/rustdesk-server`.
2. Команда: `rustdesk-utils set_password username password`. Если всё прошло успешно, будет выведено *Done*.

С `rustdesk-utils` можно также использовать команды `genkeypair`, `validatekeypair [public key] [secret key]`, `doctor [rustdesk-server]`, `reset_email_verification` и `reset_2fa_verification`.

https://github.com/rustdesk/rustdesk-server-pro/discussions/183

## Добавление корневого сертификата УЦ в контейнер Docker (при ошибках TLS с SMTP, OIDC и т. д.)
https://github.com/rustdesk/rustdesk-server-pro/issues/99#issuecomment-2235014703
