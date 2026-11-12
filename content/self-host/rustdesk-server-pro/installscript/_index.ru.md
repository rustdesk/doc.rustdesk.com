---
title: Установка
weight: 2
description: "Установка RustDesk Server Pro через Docker, сценарии установки для Linux или устаревшим способом для Windows. Начните отсюда, чтобы выбрать подходящий способ развёртывания."
keywords: ["rustdesk server pro install", "rustdesk self-host pro", "rustdesk pro docker", "rustdesk pro linux install", "rustdesk pro windows install"]
---

Начните отсюда, чтобы выбрать подходящий способ установки RustDesk Server Pro; рекомендуемый вариант — Docker.

## Как лучше всего установить RustDesk Server Pro?

Большинству команд лучше всего устанавливать RustDesk Server Pro через Docker: его проще обновлять, а развёртывание легко повторить. Способ с `install.sh` пригодится, если вам нужны системные службы systemd в Linux. Перевод с версии с открытым исходным кодом подходит, если у вас уже работает RustDesk Server и вы хотите перейти на Pro.

## Что нужно перед началом?

- Лицензия RustDesk Server Pro
- Сервер или виртуальная машина с Linux либо компьютер, где уже есть Docker
- Нужные порты RustDesk, открытые в брандмауэре, а также `21114` или `443`, если нужны веб-консоль и API
- Доменное имя (необязательно), если нужен HTTPS на домене

## Какой способ установки выбрать?

| Способ | Кому подходит | Зачем его использовать |
| --- | --- | --- |
| Docker | Большинству новых развёртываний Pro | Самые простые обновления, лёгкий откат и единообразная настройка |
| `install.sh` | Администраторам Linux, которым нужны системные службы | Создаёт службы systemd и при желании настраивает Nginx и Certbot |
| Перевод с версии с открытым исходным кодом | Уже работающим развёртываниям OSS | Переводит установленный RustDesk Server на Pro без установки с нуля |

## Способ 1: Docker (рекомендуется)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

Подробнее см. [Docker](/docs/ru/self-host/rustdesk-server-pro/installscript/docker/).

## Способ 2: install.sh

Используйте приведённый ниже сценарий, только если хорошо знаете Linux. Иначе, если что-то пойдёт не так, можно столкнуться с серьёзными проблемами, причину которых будет трудно найти.

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

Подробнее см. [install.sh](/docs/ru/self-host/rustdesk-server-pro/installscript/script/).

## Перевод с версии с открытым исходным кодом {#convert-from-open-source}

### Docker
Если версия с открытым исходным кодом установлена через Docker, прямого способа перевести её на Pro нет. Нужно запустить новый контейнер с образом Pro. Перед этим сохраните резервную копию закрытого ключа (файл `id_ed25519`, а не `id_ed25519.pub`). Когда новый контейнер будет создан, скопируйте старый файл закрытого ключа `id_ed25519` в рабочую папку нового контейнера и перезапустите контейнер.

### install.sh
Если версия с открытым исходным кодом установлена с помощью install.sh, следуйте [этой инструкции](/docs/ru/self-host/rustdesk-server-pro/installscript/script/#convert-from-open-source).
