---
title: Веб-консоль
weight: 10
description: "Веб-консоль RustDesk Server Pro на порту 21114: управление устройствами, пользователями, разрешениями, журналами и другими административными настройками."
keywords: ["rustdesk web console", "rustdesk server pro console", "rustdesk port 21114", "rustdesk device management", "rustdesk admin console"]
---

Веб-консоль RustDesk Server Pro — основной интерфейс администрирования для управления устройствами, пользователями, разрешениями и журналами.

Веб-консоль встроена в RustDesk Server Pro и работает на порту `21114`.

## Что такое веб-консоль RustDesk Server Pro?

Веб-консоль — основная панель управления собственным сервером RustDesk Server Pro. В ней администраторы управляют пользователями, устройствами, группами, разрешениями, стратегиями, настройками ретрансляторов, SMTP, токенами и собственными клиентами.

## Первые шаги администратора

1. Войдите в веб-консоль на порту `21114`.
2. Сразу смените пароль учётной записи `admin` по умолчанию.
3. Введите лицензию, если она ещё не активирована.
4. Настройте SMTP, если нужны приглашения и подтверждение по электронной почте.
5. Создайте дополнительные учётные записи администраторов или с делегированными правами, а не пользуйтесь только учётной записью по умолчанию.
6. Настройте ретрансляторы, стратегии и параметры клиентов до широкого развёртывания.

## Что можно делать в веб-консоли?

- Управлять пользователями, группами пользователей и правами администраторов
- Управлять устройствами, группами устройств и их назначением
- Настраивать правила доступа, стратегии, роли управления и роли администраторов
- Просматривать журналы и активные сеансы
- Управлять SMTP, ретрансляторами, токенами и другими настройками сервера
- Создавать сборки собственных клиентов и данные конфигурации

Возможности:

- Просмотр устройств
- Добавление и изменение пользователей и групп пользователей
- Изменение разрешений доступа к устройствам
- Просмотр журналов подключений устройств и других журналов
- Изменение настроек
- Управление стратегиями синхронизации настроек клиентов
- Управление общими адресными книгами
- Создание сборок собственного клиента

## Вход {#log-in}

Порт веб-консоли по умолчанию — 21114. Введите в браузере `http://<server ip>:21114`, чтобы открыть страницу консоли, как показано на рисунке ниже. Имя пользователя и пароль администратора по умолчанию — `admin`/`test1234`:

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-login.png)

Если нужна поддержка HTTPS, установите веб-сервер, например `Nginx`, или используйте `IIS` в Windows.

После входа обязательно смените пароль: выберите `Settings` в меню учётной записи в правом верхнем углу, чтобы перейти на страницу смены пароля, как показано на рисунке ниже. Можно также создать другую учётную запись администратора и удалить эту. Желательно включить подтверждение входа по электронной почте.

<a name=console-home></a>
![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

Пользователи без прав администратора тоже могут входить в консоль, чтобы просматривать свои устройства и журналы и менять свои настройки.

## Автоматическая настройка
Нажав `Windows EXE`, вы получите конфигурацию для своего RustDesk Server Pro, которая поможет настроить клиенты.

Для клиентов Windows можно не задавать собственный сервер в настройках, а поместить сведения о конфигурации в имя файла `rustdesk.exe`. Для этого, как показано выше, откройте приветственную страницу консоли и нажмите `Windows EXE`. **Нужен клиент ≥ 1.1.9.**

Это можно использовать вместе с [настройкой клиентов](https://rustdesk.com/docs/ru/self-host/client-configuration/) и [сценариями развёртывания](https://rustdesk.com/docs/ru/self-host/client-deployment/) для настройки клиентов.

## Создание нового пользователя вместо `admin` по умолчанию

{{% notice note %}}
В тарифе `Individual` этой функции нет.
{{% /notice %}}

1. Нажмите `Users` в меню слева.
2. Создайте ещё одну учётную запись с включённым `administrator`.
3. Войдите под новой учётной записью администратора.
4. Удалите `admin` на странице `Users`.

## Создание нового пользователя
1. Нажмите `Users` в меню слева.
2. Создайте нового пользователя.
3. Выберите, в какой группе он должен быть (если нужно добавить новые группы, читайте дальше).

## Добавление новой группы
1. Нажмите `Groups` в меню слева.
2. Создайте новую группу.
3. После создания можно разрешить группам доступ друг к другу: нажмите `Edit`.
4. Выберите группы, которым нужен доступ (они автоматически добавятся в соответствующую группу).

## Настройка нескольких ретрансляторов
1. Откройте `Settings` в меню слева.
2. Нажмите `Relay` в подменю.
3. Нажмите `+` рядом с `Relay Servers`.
4. Введите DNS-адрес или IP-адрес ретранслятора в появившееся поле и нажмите <kbd>Enter</kbd>.
5. Если ретрансляторов несколько, нажимайте `+` дальше и при необходимости настройте геолокацию (не забудьте скопировать ключ на другие серверы).

## Установка или смена лицензии
1. Откройте `Settings` в меню слева.
2. Нажмите `License` в подменю.
3. Нажмите `Edit` и вставьте код лицензии.
4. Нажмите `OK`.

## Просмотр журналов
Слева нажмите `Logs`. Консоль показывает журналы подключений, передачи файлов, тревог и действий в консоли (аудит); их также можно запрашивать и экспортировать через API с помощью `audits.py`.

Server Pro поддерживает **настраиваемый срок хранения журналов аудита** в **Settings > Other > Log Retention (Days)**. Значение `0` хранит журналы бессрочно; положительное значение удаляет записи старше указанного числа дней, очистка выполняется раз в час. Задайте срок в соответствии со своей политикой хранения, а экспортированными копиями и резервными копиями управляйте отдельно. См. [видимость и хранение журналов](/docs/ru/self-host/rustdesk-server-pro/audit-logs/#log-visibility-and-retention).

## Настройка почты
В этом примере используется Gmail

1. Откройте `Settings` в меню слева.
2. Нажмите `SMTP` в подменю.
3. Введите адрес SMTP `smtp.gmail.com`.
4. Введите порт 587 в поле `SMTP Port`.
5. Введите учётную запись Gmail, например `myrustdeskserver@gmail.com`, в поле `Mail Account`.
6. Введите пароль (может понадобиться пароль приложения).
7. Введите учётную запись Gmail, например `myrustdeskserver@gmail.com`, в поле `From`.
8. Нажмите `Check`, чтобы сохранить.

<a name="assign-device-usersgroupsstrategies-to-devices"></a>

## Назначение устройствам пользователей, стратегий и групп устройств через веб-консоль

Пользователь — это пользователь RustDesk, вошедший на устройстве или назначенный устройству: нажмите **Edit** рядом с устройством, щёлкните поле **User** и выберите пользователя в раскрывающемся списке.  
Можно также массово назначить устройства пользователю: нажмите **More → Assign Devices** в **User List**.

Чтобы добавить устройство в группу устройств, нажмите **Edit** рядом с устройством в **Device List** и измените **Group** или откройте список **Device Groups**, нажмите на название группы устройств и измените состав устройств в ней.

Чтобы назначить устройству стратегию, наведите курсор на правую часть списка **Strategy** и выберите в меню **Edit Devices**, **Edit Users** или **Edit Device Groups**, чтобы добавить к выбранной стратегии соответствующие устройства, устройства пользователей или устройства групп устройств.

---

## API-токен {#api-token}

Сначала откройте **Settings → Tokens → Create** и создайте токен с нужными разрешениями: **Device, Audit Log, User, Group, Strategy, Address Book, Admin Role, Control Role**.

После создания токены можно использовать из **командной строки** или **Python CLI**, чтобы выполнять действия с соответствующими разрешениями.

### Назначение с помощью токена из командной строки

Назначения можно выполнять и исполняемым файлом RustDesk с параметром `--assign`.  
Так можно назначить устройству пользователя, стратегию, адресную книгу или группу устройств прямо из командной строки.

**Пример:**  

```bash
"C:\Program Files\RustDesk\rustdesk.exe" --assign --token <generatedtoken> --user_name <username>
```

Поддерживаемые параметры

| Параметр                               | Описание                             | RustDesk Server Pro | Клиент RustDesk |
| --------------------------------------- | --------------------------------------- | ------------------- | --------------- |
| `--user_name <username>`                | Назначить устройству пользователя             |                     |                 |
| `--strategy_name <strategyname>`        | Назначить устройству стратегию         |                     |                 |
| `--address_book_name <addressbookname>` | Добавить устройство в адресную книгу        |                     |                 |
| `--address_book_tag <addressbooktag>`   | Назначить с меткой адресной книги            |                     |                 |
| `--address_book_alias <alias>`          | Назначить с псевдонимом в адресной книге          | 1.5.8               | 1.4.1           |
| `--address_book_password <password>`    | Задать пароль для записи в адресной книге | 1.6.6               | 1.4.3           |
| `--address_book_note <note>`            | Задать заметку для записи в адресной книге     | 1.6.6               | 1.4.3           |
| `--device_group_name <devicegroupname>` | Добавить устройство в группу устройств         |                     |                 |
| `--note <note>`                         | Добавить заметку к устройству                  | 1.6.6               | 1.4.3           |
| `--device_username <device_username>`   | Задать имя пользователя устройства                 | 1.6.6               | 1.4.3           |
| `--device_name <device_name>`           | Задать имя устройства                     | 1.6.6               | 1.4.3           |
| [`--deploy`](/docs/ru/self-host/client-deployment/#explicit-deployment-for-new-devices) | Зарегистрировать новое устройство, когда включено **Require deployment for new devices**. Нужен API-токен с разрешением **Devices** со значением **Read and write**. | 1.8.3 | 1.4.7 |

В Windows командная строка по умолчанию ничего не выводит. Чтобы увидеть вывод, запускайте так: `"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | more` или `"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | Out-String`, см. [здесь](https://github.com/rustdesk/rustdesk/discussions/6377#discussioncomment-8094952).

### Инструменты управления на Python (CLI)

#### Управление пользователями (`users.py`)

**Справка:**  
`./users.py -h`

**Просмотр пользователей:**  
`./users.py --url <url> --token <token> view [--name <username>] [--group_name <group_name>]`

**Фильтры:**  
- `--name`: имя пользователя (нечёткий поиск)
- `--group_name`: группа пользователей (точное совпадение)

**Пример:**  
`./users.py --url https://example.com --token <token> view --group_name Default`

**Основные операции:**

- **Отключить пользователя:**  
  `./users.py --url <url> --token <token> disable --name testuser`

- **Включить пользователя:**  
  `./users.py --url <url> --token <token> enable --name testuser`

- **Удалить пользователя:**  
  `./users.py --url <url> --token <token> delete --name testuser`

**Создание и приглашение пользователей:**

- **Создать нового пользователя:**  
  `./users.py --url <url> --token <token> new --name username --password 'password123' --group_name Default [--email user@example.com] [--note "note"]`
  
  Обязательные: `--name`, `--password`, `--group_name`  
  Необязательные: `--email`, `--note`

- **Пригласить пользователя по электронной почте:**  
  `./users.py --url <url> --token <token> invite --email user@example.com --name username --group_name Default [--note "note"]`
  
  Обязательные: `--email`, `--name`, `--group_name`  
  Необязательный: `--note`

**2FA и операции безопасности:**

- **Включить обязательную 2FA:**  
  `./users.py --url <url> --token <token> enable-2fa-enforce --name username --web-console-url <console_url>`
  
  Обязательный: `--web-console-url`

- **Отключить обязательную 2FA:**  
  `./users.py --url <url> --token <token> disable-2fa-enforce --name username [--web-console-url <console_url>]`
  
  Необязательный: `--web-console-url`

- **Сбросить 2FA:**  
  `./users.py --url <url> --token <token> reset-2fa --name username`

- **Отключить подтверждение по электронной почте:**  
  `./users.py --url <url> --token <token> disable-email-verification --name username`

- **Принудительный выход:**  
  `./users.py --url <url> --token <token> force-logout --name username`

**Примечания:**
- При операциях с несколькими пользователями (найденными по фильтрам) будет запрошено подтверждение
- Если по фильтру не найдено ни одного пользователя, будет выведено «Found 0 users»

---

#### Управление группами пользователей (`user-groups.py`)

**Справка:**  
`./user-groups.py -h`

**Просмотр групп пользователей:**  
`./user-groups.py --url <url> --token <token> view [--name <group_name>]`

**Пример:**  
`./user-groups.py --url https://example.com --token <token> view --name "Sales Team"`

**Операции с группами:**

- **Создать группу пользователей:**  
  `./user-groups.py --url <url> --token <token> add --name "GroupName" [--note "description"] [--accessed-from '<json>'] [--access-to '<json>']`
  
  Пример с контролем доступа:  
  `./user-groups.py --url <url> --token <token> add --name "Engineering" --accessed-from '[{"type":0,"name":"Managers"}]' --access-to '[{"type":1,"name":"DevServers"}]'`

- **Изменить группу пользователей:**  
  `./user-groups.py --url <url> --token <token> update --name "GroupName" [--new-name "NewName"] [--note "new note"] [--accessed-from '<json>'] [--access-to '<json>']`

- **Удалить группу пользователей:**  
  `./user-groups.py --url <url> --token <token> delete --name "GroupName"`
  
  Можно указать несколько имён через запятую: `--name "Group1,Group2,Group3"`

**Управление пользователями в группах:**

- **Просмотр пользователей в группе:**  
  `./user-groups.py --url <url> --token <token> view-users [--name <group_name>] [--user-name <username>]`
  
  Фильтры:
  - `--name`: название группы (точное совпадение, необязательно)
  - `--user-name`: имя пользователя (нечёткий поиск, необязательно)
  
  Пример:  
  `./user-groups.py --url <url> --token <token> view-users --name Default --user-name john`

- **Добавить пользователей в группу:**  
  `./user-groups.py --url <url> --token <token> add-users --name "GroupName" --users "user1,user2,user3"`

**Параметры контроля доступа:**

- `--accessed-from`: массив JSON, определяющий, кто имеет доступ к этой группе пользователей
  - Тип 0 = группа пользователей (например, `[{"type":0,"name":"Admins"}]`)
  - Тип 2 = пользователь (например, `[{"type":2,"name":"john"}]`)

- `--access-to`: массив JSON, определяющий, к чему имеет доступ эта группа пользователей
  - Тип 0 = группа пользователей (например, `[{"type":0,"name":"Support"}]`)
  - Тип 1 = группа устройств (например, `[{"type":1,"name":"Servers"}]`)

**Необходимые разрешения:**
- Для команд `view/add/update/delete/add-users` нужно **разрешение на группы пользователей**
- Для команды `view-users` нужно **разрешение на пользователей**

---

#### Управление ролями администраторов (`admin-roles.py`)

Токен должен принадлежать полноправному администратору и иметь разрешение **Admin Role** на чтение или чтение и запись. Командам, которые разрешают имена пользователей или выводят участников роли, нужно также разрешение **User** на чтение.

**Просмотр ролей:**

```bash
# List roles, optionally filtered by exact name or type
./admin-roles.py --url <url> --token <token> view [--name <role_name>] [--type global|individual|group]

# View one role by GUID
./admin-roles.py --url <url> --token <token> view --guid <role_guid>
```

**Создание роли:**

```bash
# Global role
./admin-roles.py --url <url> --token <token> add \
  --name "Support Admin" --type global \
  --permissions "users.view,devices.view,audits.view" --note "Read-only support"

# Group-scoped role
./admin-roles.py --url <url> --token <token> add \
  --name "Support Scope" --type group \
  --permissions "users.view,devices.view,devices.enable_disable" \
  --user-groups "Support" --device-groups "Servers" --unassigned
```

Тип роли после создания изменить нельзя. `--permissions` принимает имена разрешений через запятую, десятичные идентификаторы или идентификаторы с префиксом `0x`, форматы можно смешивать. Например, `users.view,513,0x0203` равнозначно `257,513,515`. Сервер отклоняет разрешения, недопустимые для выбранного типа роли.

Команда `view` преобразует известные идентификаторы разрешений обратно в имена ниже. Неизвестный сценарию идентификатор сохраняется как число, чтобы разрешения, добавленные в более новой версии сервера, не терялись.

| Область | Разрешения | Допустимые типы ролей |
| --- | --- | --- |
| Пользователи | `users.view` (`257`); `users.create` (`259`); `users.invite` (`260`); `users.delete` (`261`); `users.enable_disable` (`262`); `users.edit_email` (`263`); `users.edit_password` (`264`); `users.edit_note` (`265`); `users.manage_2fa` (`266`); `users.force_logout` (`267`); `users.change_strategy` (`269`); `users.change_control_role` (`270`); `users.edit_display_name` (`271`) | global, group |
| Пользователи | `users.change_group` (`268`) | global |
| Устройства | `devices.view` (`513`) | global, group |
| Устройства | `devices.enable_disable` (`515`); `devices.delete` (`516`); `devices.edit_info` (`517`); `devices.change_strategy` (`520`) | global, individual, group |
| Устройства | `devices.assign_to_user` (`518`); `devices.change_group` (`519`) | global |
| Группы пользователей | `user_groups.view` (`769`); `user_groups.edit` (`770`) | global |
| Группы устройств | `device_groups.view` (`1025`); `device_groups.edit` (`1026`); `device_groups.change_strategy` (`1027`) | global |
| Аудит | `audits.view` (`1281`); `audits.edit` (`1282`) | global, individual |
| Стратегии | `strategies.view` (`1537`); `strategies.edit` (`1538`) | global |
| Собственные клиенты | `custom_clients.view` (`1793`); `custom_clients.edit` (`1794`) | global |
| Роли управления | `control_roles.view` (`2049`); `control_roles.edit` (`2050`) | global |

**Изменение или удаление роли:**

```bash
./admin-roles.py --url <url> --token <token> update --name "Support Admin" \
  [--new-name "Helpdesk Admin"] [--note "new note"] [--permissions "users.view,devices.view"] \
  [--user-groups "Support"] [--device-groups "Servers"] [--unassigned|--no-unassigned]

./admin-roles.py --url <url> --token <token> delete --name "Support Admin"
```

Чтобы очистить `--note`, `--permissions`, `--user-groups` или `--device-groups`, передайте пустое значение, например `--permissions ""`.

**Управление участниками роли:**

```bash
./admin-roles.py --url <url> --token <token> view-users --name "Support Admin"
./admin-roles.py --url <url> --token <token> add-users --name "Support Admin" --users "user1,user2"
./admin-roles.py --url <url> --token <token> remove-users --name "Support Admin" --users "user1,user2"
```

Роли и пользователей можно также указывать по GUID. В `--users` имена пользователей и GUID можно смешивать.

---

#### Управление ролями управления (`control-roles.py`)

Токену нужно разрешение **Control Role** на чтение или чтение и запись. Командам, которые разрешают имена пользователей или выводят участников роли, нужно также разрешение **User** на чтение.

**Просмотр ролей:**

```bash
./control-roles.py --url <url> --token <token> view [--name <role_name>] [--status enabled|disabled]
./control-roles.py --url <url> --token <token> view --guid <role_guid>
```

**Создание, изменение, удаление, включение и отключение роли:**

```bash
./control-roles.py --url <url> --token <token> add --name "Contractors" [--note "Restricted access"]
./control-roles.py --url <url> --token <token> update --name "Contractors" [--new-name "Vendors"] [--note "new note"]
./control-roles.py --url <url> --token <token> delete --name "Contractors"
./control-roles.py --url <url> --token <token> enable --name "Contractors"
./control-roles.py --url <url> --token <token> disable --name "Contractors"
```

Роли, созданные этим сценарием, не содержат разрешений управления. Настройте их в веб-консоли, прежде чем назначать пользователей. Определения разрешений управления этот сценарий не изменяет и не показывает.

**Управление участниками роли:**

```bash
./control-roles.py --url <url> --token <token> view-users --name "Contractors"
./control-roles.py --url <url> --token <token> assign-users --name "Contractors" --users "user1,user2"
./control-roles.py --url <url> --token <token> remove-users --users "user1,user2"
```

Роли и пользователей можно также указывать по GUID. `remove-users` снимает с каждого пользователя его текущую роль управления, поэтому не принимает `--name` и `--guid`. Для зарезервированной роли `Default` команда `view-users` выводит только явные назначения; пользователи без назначенной роли управления тоже получают `Default`. Зарезервированную роль `Not Logged` нельзя назначить пользователям, а зарезервированные роли нельзя переименовать, снабдить заметкой или удалить.

---

#### Управление группами устройств (`device-groups.py`)

**Справка:**  
`./device-groups.py -h`

**Просмотр групп устройств:**  
`./device-groups.py --url <url> --token <token> view [--name <group_name>]`

**Пример:**  
`./device-groups.py --url https://example.com --token <token> view`

**Операции с группами:**

- **Создать группу устройств:**  
  `./device-groups.py --url <url> --token <token> add --name "GroupName" [--note "description"] [--accessed-from '<json>']`
  
  Пример:  
  `./device-groups.py --url <url> --token <token> add --name "Production" --accessed-from '[{"type":0,"name":"Admins"}]'`

- **Изменить группу устройств:**  
  `./device-groups.py --url <url> --token <token> update --name "GroupName" [--new-name "NewName"] [--note "new note"] [--accessed-from '<json>']`

- **Удалить группу устройств:**  
  `./device-groups.py --url <url> --token <token> delete --name "GroupName"`
  
  Можно указать несколько имён через запятую: `--name "Group1,Group2,Group3"`

**Управление устройствами в группах:**

- **Просмотр устройств в группе:**  
  `./device-groups.py --url <url> --token <token> view-devices [filters]`
  
  Доступные фильтры:
  - `--name`: название группы устройств (точное совпадение)
  - `--id`: ID устройства (нечёткий поиск)
  - `--device-name`: имя устройства (нечёткий поиск)
  - `--user-name`: имя пользователя или владельца (нечёткий поиск)
  - `--device-username`: имя пользователя, вошедшего на устройстве (нечёткий поиск)
  
  Примеры:  
  ```bash
  # View all devices in a group
  ./device-groups.py --url <url> --token <token> view-devices --name Production
  
  # Search by device name
  ./device-groups.py --url <url> --token <token> view-devices --device-name server
  
  # Combine filters
  ./device-groups.py --url <url> --token <token> view-devices --name Production --user-name john
  ```

- **Добавить устройства в группу:**  
  `./device-groups.py --url <url> --token <token> add-devices --name "GroupName" --ids "deviceid1,deviceid2"`

- **Удалить устройства из группы:**  
  `./device-groups.py --url <url> --token <token> remove-devices --name "GroupName" --ids "deviceid1,deviceid2"`

**Параметр контроля доступа:**

- `--accessed-from`: массив JSON, определяющий, кто имеет доступ к этой группе устройств
  - Тип 0 = группа пользователей (например, `[{"type":0,"name":"Engineers"}]`)
  - Тип 2 = пользователь (например, `[{"type":2,"name":"admin"}]`)

**Необходимые разрешения:**
- Для команд `view/add/update/delete/add-devices/remove-devices` нужно **разрешение на группы устройств**
- Для команды `view-devices` нужно **разрешение на устройства**

---

#### Управление устройствами (`devices.py`)

**Справка:**  
`./devices.py -h`

**Просмотр устройств:**  
`./devices.py --url <url> --token <token> view [--id <device_id>] [--device_name <device_name>] [--user_name <user_name>] [--group_name <group_name>] [--device_group_name <device_group_name>] [--offline_days <days>]`

**Фильтры:**  
`--id`: ID устройства  
`--device_name`: имя устройства  
`--user_name`: назначенный пользователь  
`--group_name`: группа пользователей  
`--device_group_name`: группа устройств  
`--offline_days`: число дней не в сети

**Пример:**  
`./devices.py --url https://example.com --token <token> view --user_name mike`

**Операции:**  
вместо view можно указать `enable`, `disable`, `delete` или `assign`.

**Пример (назначение устройства):**  
`./devices.py --url https://example.com --token <token> assign --device_name PC01 --assign_to user_name=mike`

---

#### Управление адресными книгами (`ab.py`)

**Справка:**  
`./ab.py -h`

**Просмотр общих адресных книг:**  
`./ab.py --url <url> --token <token> view-ab [--ab-name <address_book_name>]`

**Получение GUID личной адресной книги:**  
`./ab.py --url <url> --token <token> get-personal-ab`

**Добавление общей адресной книги:**  
`./ab.py --url <url> --token <token> add-ab --ab-name <name> [--note <note>] [--password <password>]`

**Изменение или удаление общей адресной книги:**  
`./ab.py --url <url> --token <token> update-ab --ab-guid <guid> [--ab-update-name <new_name>] [--note <note>]`  
`./ab.py --url <url> --token <token> delete-ab --ab-guid <guid>`

**Просмотр устройств в адресной книге:**  
`./ab.py --url <url> --token <token> view-peer --ab-guid <guid> [--peer-id <peer_id>] [--alias <alias>]`

**Добавление, изменение или удаление устройства:**  
`./ab.py --url <url> --token <token> add-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]`  
`./ab.py --url <url> --token <token> update-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]`  
`./ab.py --url <url> --token <token> delete-peer --ab-guid <guid> --peer-id <peer_id>`

**Управление метками:**  
`./ab.py --url <url> --token <token> view-tag --ab-guid <guid>`  
`./ab.py --url <url> --token <token> add-tag --ab-guid <guid> --tag-name <name> [--tag-color 0xFF00FF00]`  
`./ab.py --url <url> --token <token> update-tag --ab-guid <guid> --tag-name <name> --tag-color 0xFFFF0000`  
`./ab.py --url <url> --token <token> delete-tag --ab-guid <guid> --tag-name <name>`

**Управление правилами доступа:**  
`./ab.py --url <url> --token <token> view-rule --ab-guid <guid>`  
`./ab.py --url <url> --token <token> add-rule --ab-guid <guid> [--rule-type user|group|everyone] [--rule-user <user>] [--rule-group <group>] --rule-permission ro|rw|full`  
`./ab.py --url <url> --token <token> update-rule --rule-guid <rule_guid> --rule-permission rw`  
`./ab.py --url <url> --token <token> delete-rule --rule-guid <rule_guid>`

**Пример (правило только для чтения для пользователя «mike»):**  
`./ab.py --url https://example.com --token <token> add-rule --ab-guid <guid> --rule-user mike --rule-permission ro`

---

#### Управление стратегиями (`strategies.py`)

**Справка:**  
`./strategies.py -h`

**Список всех стратегий:**  
`./strategies.py --url <url> --token <token> list`

**Просмотр конкретной стратегии:**  
```bash
# By name
./strategies.py --url <url> --token <token> view --name "Default"

# By GUID
./strategies.py --url <url> --token <token> view --guid "01983006-fcca-7c12-9a91-b1df483c6073"
```

**Включение и отключение стратегии:**  
```bash
./strategies.py --url <url> --token <token> enable --name "StrategyName"
./strategies.py --url <url> --token <token> disable --name "StrategyName"
```

**Назначение стратегии устройствам, пользователям или группам устройств:**  
```bash
# Assign to devices (by device ID)
./strategies.py --url <url> --token <token> assign --name "Default" --peers "1849118658,1337348840"

# Assign to users (by username)
./strategies.py --url <url> --token <token> assign --name "Default" --users "admin,user1"

# Assign to device groups (by group name)
./strategies.py --url <url> --token <token> assign --name "Default" --device-groups "device_group1,Production"

# Mixed assignment
./strategies.py --url <url> --token <token> assign \
  --name "Default" \
  --peers "1849118658" \
  --users "admin" \
  --device-groups "device_group1"
```

**Снятие стратегии:**  
```bash
# Unassign from devices
./strategies.py --url <url> --token <token> unassign --peers "1849118658,1337348840"

# Unassign from users
./strategies.py --url <url> --token <token> unassign --users "admin"

# Unassign from device groups
./strategies.py --url <url> --token <token> unassign --device-groups "device_group1"
```

**Примечания:**
- Сценарий принимает и имена, и GUID пользователей и групп устройств
- ID устройств автоматически преобразуются в GUID
- Все операции назначения и снятия могут выполняться сразу для нескольких ресурсов

**Необходимые разрешения:**
- Для команд `list/view/enable/disable/assign/unassign` нужно **разрешение на стратегии**
- Для `--peers` нужно **разрешение на устройства:r** (для преобразования ID в GUID)
- Для `--users` нужно **разрешение на пользователей:r** (для преобразования имени пользователя в GUID)
- Для `--device-groups` нужно **разрешение на группы устройств:r** (для преобразования названия в GUID)

---

#### Аудит (`audits.py`) {#audits-auditspy}

**Справка:**  
`./audits.py -h`

**Просмотр журнала подключений:**  
`./audits.py --url <url> --token <token> view-conn [--remote <peer_id>] [--conn-type <type>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]`

**Просмотр журнала файлов:**  
`./audits.py --url <url> --token <token> view-file [--remote <peer_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]`

**Просмотр журнала тревог:**  
`./audits.py --url <url> --token <token> view-alarm [--device <device_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]`

**Просмотр журнала действий в консоли:**  
`./audits.py --url <url> --token <token> view-console [--operator <username>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]`

**Фильтры:**  
`--remote`: ID устройства (для журналов подключений и файлов)  
`--conn-type`: 0=удалённый рабочий стол, 1=передача файлов, 2=передача портов, 3=просмотр камеры, 4=терминал  
`--device`: ID устройства (для журнала тревог)  
`--operator`: имя пользователя, выполнившего действие (для журнала действий в консоли)  
`--created-at`: фильтр по местному времени, например "2025-09-16 14:15:57"  
`--days-ago`: записи новее указанного числа дней  
`--page-size` / `--current`: постраничный вывод

**Пример:**  
`./audits.py --url https://example.com --token <token> view-conn --remote 123456789 --days-ago 7`


## Поиск устройства
1. Откройте Devices.
2. Введите имя в поле поиска по имени устройства и нажмите `Query` или <kbd>Enter</kbd>.
3. Для поиска по шаблону добавьте `%` в начало, в конец или с обеих сторон поискового запроса.
