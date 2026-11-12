---
title: Windows и PM2 или NSSM
weight: 20
description: "Запуск RustDesk Server OSS в Windows с помощью PM2 или NSSM. Плюсы и минусы каждого варианта, настройка служб и команды для просмотра журналов hbbs и hbbr в Windows."
keywords: ["rustdesk server windows", "rustdesk pm2", "rustdesk nssm", "rustdesk hbbs windows", "rustdesk hbbr windows", "rustdesk self-host windows"]
---

В этом руководстве описано, как запустить RustDesk Server OSS в Windows с помощью PM2 или NSSM — в зависимости от того, нужна ли вам более простая настройка на уровне пользователя или управление через службы Windows.

## Стоит ли запускать RustDesk Server OSS в Windows?

RustDesk Server OSS можно запустить в Windows, но для большинства рабочих развёртываний Linux остаётся более надёжным выбором. Windows подойдёт командам, которые уже обслуживают Windows Server и понимают, как устроены службы, но для долгосрочной работы собственного сервера такой вариант обычно менее стабилен.

## PM2 или NSSM

| Способ | Кому подходит | Зачем его использовать |
| --- | --- | --- |
| NSSM | Выделенным серверам Windows Server | Работает как службы Windows и запускается без входа пользователя в систему |
| PM2 | Компьютерам Windows, на которых также работают люди, или для более простого обслуживания | Удобнее, если вы уже используете Node.js и регулярно входите на этот компьютер |

## Порядок развёртывания в Windows

1. Скачайте исполняемые файлы RustDesk Server для Windows.
2. Решите, что вам больше подходит: NSSM или PM2.
3. Установите выбранный диспетчер процессов.
4. Зарегистрируйте и запустите `hbbs` и `hbbr`.
5. Откройте нужные порты в брандмауэре и убедитесь, что оба процесса стабильно работают.

{{% notice note %}}
Политики безопасности Windows бывают непредсказуемы. Если это руководство вам не помогло или соединение нестабильно, перенесите сервер на Linux.
{{% /notice %}}

{{% notice note %}}
Версия с графическим интерфейсом, `RustDeskServer.setup.exe`, больше не поддерживается и не рекомендуется.
{{% /notice %}}

## Развилка
Есть два варианта запуска сервера RustDesk: PM2 (проще) или NSSM (чуть сложнее).
Преимущества NSSM:
- Совместимость со старыми версиями Windows (Windows Server 2008 R2/Windows 7 и более ранними, хотя это не проверялось).
- Идеально подходит для Windows Server
- Автоматический запуск при загрузке без входа в систему (пользователю, создавшему запись автозапуска, не нужно входить в систему, чтобы сервер запустился).
- Оба исполняемых файла работают как службы.
- Независимость (не нужен Node.js)

Преимущества PM2:
- Хороший вариант, если сервер работает на том же компьютере, что и ваш основной рабочий
- Подходит, если вы регулярно входите в систему под пользователем, который создал запись автозапуска RustDesk
- Проще в использовании

## Установка с помощью NSSM

### Установка NSSM
[Скачайте](https://github.com/dkxce/NSSM/releases/download/v2.25/NSSM_v2.25.zip) и распакуйте NSSM, выбрав архитектуру,
подходящую для вашей Windows (для x86 используйте содержимое папки win32, для x64 — содержимое
папки win64). Также рекомендуется переместить исполняемый файл NSSM в папку
`Program Files\NSSM` на диске, где установлена система (обычно диск C:): после запуска в качестве службы NSSM нельзя
переместить из папки, в которой он находится, поэтому лучше сразу убрать его в `Program Files`.
Также желательно добавить путь (например, `C:\Program Files\NSSM`) в переменную PATH.

### Проверка установки NSSM
Если всё сделано правильно, в папке `C:\Program Files\NSSM` (в этом примере используется диск C:,
но вы можете использовать диск, на котором установлена Windows, или любой другой путь)
должен быть только файл `nssm.exe`.

В этом примере используется `C:\Program Files\NSSM`.

Откройте командную строку и выполните `nssm`. Если появилась справка, можно переходить к следующему шагу.

### Запуск hbbr и hbbs
Скачайте версию [RustDesk Server](https://github.com/rustdesk/rustdesk-server/releases) для Windows.
Распакуйте программу в `C:\Program Files\RustDesk Server` (или в любое другое место, только убедитесь, что
путь не изменится после установки службы). Теперь вернитесь в командную строку.

В этом примере используется `C:\Program Files\RustDesk Server`.
```cmd
nssm install "RustDesk hbbs service" "C:\Program Files\RustDesk Server\hbbs.exe"
nssm install "RustDesk hbbr service" "C:\Program Files\RustDesk Server\hbbr.exe"
```
**Примечание:**
- `RustDesk hbbs service` можно заменить любым именем службы hbbs
- `RustDesk hbbr service` можно заменить любым именем службы hbbr
- `C:\Program Files\RustDesk Server\hbbs.exe` можно заменить путём, куда вы положили исполняемые файлы RustDesk
- `C:\Program Files\RustDesk Server\hbbr.exe` можно заменить путём, куда вы положили исполняемые файлы RustDesk

**Шаблоны команд:**

Шаблон команд, если вы хотите просто скопировать, вставить и отредактировать.

```cmd
nssm install <Desired hbbs servicename> <RustDesk hbbs binary path> <RustDesk hbbs arguments>
nssm install <Desired hbbr servicename> <RustDesk hbbr binary path> <RustDesk hbbr arguments>
```

**Запуск служб**

После успешной установки службы нужно запустить.
```cmd
nssm start <Desired hbbs servicename>
nssm start <Desired hbbr servicename>
```

**Готово!**

(Этот способ проверен на Windows Server Core 2022 Standard.)

## или

## Установка с помощью PM2

### Установка Node.js

[Скачайте](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi) и установите Node.js.
Node.js — среда выполнения для PM2, поэтому сначала нужно установить Node.js.

### Установка PM2

Введите следующие команды в `cmd.exe` по одной строке, нажимая <kbd>Enter</kbd> после каждой.

```cmd
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### Запуск hbbr и hbbs

Скачайте версию [RustDesk Server](https://github.com/rustdesk/rustdesk-server/releases) для Windows. Распакуйте программу на диск C: и выполните следующие четыре команды:

```cmd
cd C:\rustdesk-server-windows-x64
pm2 start hbbs.exe
pm2 start hbbr.exe
pm2 save
```

### Просмотр журнала

```cmd
pm2 log hbbr
pm2 log hbbs
```

## Другие руководства
https://pedja.supurovic.net/setting-up-self-hosted-rustdesk-server-on-windows/?lang=lat
