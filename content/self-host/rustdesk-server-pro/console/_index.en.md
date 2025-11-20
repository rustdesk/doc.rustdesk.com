---
title: Web Console
weight: 10
description: "Use the RustDesk Server Pro web console to manage devices, users, permissions, logs, and other administrative settings from port 21114."
keywords: ["rustdesk web console", "rustdesk server pro console", "rustdesk port 21114", "rustdesk device management", "rustdesk admin console"]
---

The RustDesk Server Pro web console is the main administrative interface for managing devices, users, permissions, and logs.

The web console is integrated in the RustDesk server Pro, serviced by the `21114` port.

## What is the RustDesk Server Pro web console?

The web console is the main control plane for a self-hosted RustDesk Server Pro deployment. It is where administrators manage users, devices, groups, permissions, strategies, relay settings, SMTP, tokens, and custom clients.

## First admin checklist

1. Log in to the web console on port `21114`.
2. Change the default `admin` password immediately.
3. Enter the license if it has not been activated yet.
4. Configure SMTP if you want invitations and email verification.
5. Create additional admin or delegated accounts instead of relying on the default account.
6. Configure relay, strategies, and client settings before broader rollout.

## What can you do in the web console?

- Manage users, user groups, and administrator access
- Manage devices, device groups, and assignment
- Configure access rules, strategies, control roles, and admin roles
- View logs and active sessions
- Manage SMTP, relay, tokens, and other server settings
- Generate custom client builds and config payloads

Features:

- Browse devices
- Add/modify users and user groups
- Modify device access permissions
- Browse device connection logs and the other logs
- Update settings
- Manage client settings sync strategies
- Manage shared address books
- Generate custom client build

## Log in

The default port of the web console is 21114. Enter `http://<server ip>:21114` in the browser to enter the console page, as shown in the following figure. The default administrator username/password is `admin`/`test1234`:

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-login.png)

If you need HTTPS support, please install a web server such as `Nginx` or use `IIS` for Windows.

After logging in please be sure to change the password, select `Settings` in the account menu in the upper right corner to enter the password modification page, as shown in the following figure. You can also create another administrator account and delete this one. You'd better enable email login verification.

<a name=console-home></a>
![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

Non-administrator users can also login to browse their device and logs, change their user settings.

## Automatic Configs
By Clicking on `Windows EXE` you will be able to get the configs for your own RustDesk Server Pro, this will help configure your clients.

For Windows clients, you can leave out the custom server configuration and put the configuration information in the `rustdesk.exe` filename instead. As shown above, please go to the console welcome page and click on `Windows EXE`. **Client ≥ 1.1.9 required.**

You can use this in conjunction with [client config](https://rustdesk.com/docs/en/self-host/client-configuration/) and [deployment scripts](https://rustdesk.com/docs/en/self-host/client-deployment/) to setup your clients.

## Creating a new user other than the default `admin` user

{{% notice note %}}
The `Individual` plan does not have this feature.
{{% /notice %}}

1. Click on `Users` on the left hand menu.
2. Create another account with `administrator` enabled.
3. Log in with the new administrative account.
4. Delete the `admin` on `Users` page.

## Creating a new user
1. Click on `Users` on the left hand menu.
2. Create a new user.
3. Select what group they should be in (if you need to add new groups please keep reading).

## Add a new Group
1. Click on `Groups` on the left hand menu.
2. Create a new group.
3. Once created you can allow groups access each other, Click `Edit`.
4. Select the relevant groups you want access (it automatically adds them in the corresponding group).

## Setting up multiple relay servers
1. Go to `Settings` on the left hand menu.
2. Click on `Relay` on the submenu.
3. Click `+` next to `Relay Servers`.
4. Enter the Relay server DNS address or IP address in the box which now shows and press <kbd>Enter</kbd>.
5. If you have more than one Relay server you can keep clicking `+` and adapt the Geo settings is required (remember and copy your key to the other servers).

## Set or change the license
1. Go to `Settings` on the left hand menu.
2. Click on `License` on the submenu.
3. Click `Edit` and paste in your license code.
4. Click `OK`.

## Viewing Logs
On the left hand side click on `Logs`. The console lists the connection, file-transfer, alarm, and console-operation (audit) logs; you can also query and export them through the `audits.py` API.

Server Pro includes **built-in audit-log rotation**, so these audit logs are bounded rather than growing indefinitely — helpful for storage-limitation and data-retention requirements.

## Setup Emails
Gmail in this example

1. Go to `Settings` on the left hand menu.
2. Click on `SMTP` on the submenu.
3. Enter the SMTP address `smtp.gmail.com`.
4. Enter the Port 587 in `SMTP Port`.
5. Enter the Gmail account i.e. `myrustdeskserver@gmail.com` in `Mail Account`.
6. Enter your password (you might need an app password).
7. Enter your Gmail account i.e. `myrustdeskserver@gmail.com` in `From`.
8. Click `Check` to save.

## Assign Device Users/Strategies/Device Groups to Devices via Web Console

The User is the RustDesk User logged in on the device or assigned to the device by clicking **Edit** next to the device, click in the **User** box and drop-down to select your user.  
You can also batch assign devices to a user by clicking **More → Assign Devices** in the **User List**.

To add a device to a device group, you can click **Edit** next to the device in the **Device List** and change the **Group**, or go to the **Device Groups** list, click on a device group name, and adjust the devices within that group.

To assign a strategy to a device, hover over the right side of the **Strategy** list and click **Edit Devices**, **Edit Users**, or **Edit Device Groups** in the menu to add the corresponding devices, user devices, or device group devices to the selected strategy.

---

## API Token

You must first go to **Settings → Tokens → Create** and create a token with the required permissions: **Device, Audit Log, User, Group, Strategy, Address Book, Admin Role, Control Role**.

Once created, you can use these tokens via **command line** or **Python CLI** to perform actions with the corresponding permissions.

### Assign via Token from Command Line

You can also perform assignments using the RustDesk executable with the `--assign` parameter.  
This allows assigning users, strategies, address books, or device groups to a device directly from the command line.

**Example:**  

```bash
"C:\Program Files\RustDesk\rustdesk.exe" --assign --token <generatedtoken> --user_name <username>
```

Supported Parameters

| Parameter                               | Description                             | RustDesk Server Pro | RustDesk Client |
| --------------------------------------- | --------------------------------------- | ------------------- | --------------- |
| `--user_name <username>`                | Assign a user to the device             |                     |                 |
| `--strategy_name <strategyname>`        | Assign a strategy to the device         |                     |                 |
| `--address_book_name <addressbookname>` | Assign device to an address book        |                     |                 |
| `--address_book_tag <addressbooktag>`   | Assign with address book tag            |                     |                 |
| `--address_book_alias <alias>`          | Assign with address book alias          | 1.5.8               | 1.4.1           |
| `--address_book_password <password>`    | Set password for the address book entry | 1.6.6               | 1.4.3           |
| `--address_book_note <note>`            | Set note for the address book entry     | 1.6.6               | 1.4.3           |
| `--device_group_name <devicegroupname>` | Assign device to a device group         |                     |                 |
| `--note <note>`                         | Add note to the device                  | 1.6.6               | 1.4.3           |
| `--device_username <device_username>`   | Set the device username                 | 1.6.6               | 1.4.3           |
| `--device_name <device_name>`           | Set the device name                     | 1.6.6               | 1.4.3           |
| [`--deploy`](/docs/en/self-host/client-deployment/#explicit-deployment-for-new-devices) | Register a new device when **Require deployment for new devices** is enabled. Requires an API token with **Devices** permission set to **Read and write**. | 1.8.3 | 1.4.7 |

The command line on Windows does not have output by default. To get output, please run like this, `"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | more` or `"C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | Out-String`, see [here](https://github.com/rustdesk/rustdesk/discussions/6377#discussioncomment-8094952).

### Python CLI Management Tools

#### Users Management (`users.py`)

**Show help:**  
`./users.py -h`

**View users:**  
`./users.py --url <url> --token <token> view [--name <username>] [--group_name <group_name>]`

**Filters:**  
- `--name`: username (fuzzy search)
- `--group_name`: user group (exact match)

**Example:**  
`./users.py --url https://example.com --token <token> view --group_name Default`

**Basic operations:**

- **Disable user:**  
  `./users.py --url <url> --token <token> disable --name testuser`

- **Enable user:**  
  `./users.py --url <url> --token <token> enable --name testuser`

- **Delete user:**  
  `./users.py --url <url> --token <token> delete --name testuser`

**User creation and invitation:**

- **Create new user:**  
  `./users.py --url <url> --token <token> new --name username --password 'password123' --group_name Default [--email user@example.com] [--note "note"]`
  
  Required: `--name`, `--password`, `--group_name`  
  Optional: `--email`, `--note`

- **Invite user by email:**  
  `./users.py --url <url> --token <token> invite --email user@example.com --name username --group_name Default [--note "note"]`
  
  Required: `--email`, `--name`, `--group_name`  
  Optional: `--note`

**2FA and security operations:**

- **Enable 2FA enforcement:**  
  `./users.py --url <url> --token <token> enable-2fa-enforce --name username --web-console-url <console_url>`
  
  Required: `--web-console-url`

- **Disable 2FA enforcement:**  
  `./users.py --url <url> --token <token> disable-2fa-enforce --name username [--web-console-url <console_url>]`
  
  Optional: `--web-console-url`

- **Reset 2FA:**  
  `./users.py --url <url> --token <token> reset-2fa --name username`

- **Disable email verification:**  
  `./users.py --url <url> --token <token> disable-email-verification --name username`

- **Force logout:**  
  `./users.py --url <url> --token <token> force-logout --name username`

**Notes:**
- When operating on multiple users (matched by filters), you will be prompted for confirmation
- If no users match the filter, it will display "Found 0 users"

---

#### User Groups Management (`user-groups.py`)

**Show help:**  
`./user-groups.py -h`

**View user groups:**  
`./user-groups.py --url <url> --token <token> view [--name <group_name>]`

**Example:**  
`./user-groups.py --url https://example.com --token <token> view --name "Sales Team"`

**Group operations:**

- **Create user group:**  
  `./user-groups.py --url <url> --token <token> add --name "GroupName" [--note "description"] [--accessed-from '<json>'] [--access-to '<json>']`
  
  Example with access control:  
  `./user-groups.py --url <url> --token <token> add --name "Engineering" --accessed-from '[{"type":0,"name":"Managers"}]' --access-to '[{"type":1,"name":"DevServers"}]'`

- **Update user group:**  
  `./user-groups.py --url <url> --token <token> update --name "GroupName" [--new-name "NewName"] [--note "new note"] [--accessed-from '<json>'] [--access-to '<json>']`

- **Delete user group:**  
  `./user-groups.py --url <url> --token <token> delete --name "GroupName"`
  
  Supports comma-separated names: `--name "Group1,Group2,Group3"`

**User management in groups:**

- **View users in group:**  
  `./user-groups.py --url <url> --token <token> view-users [--name <group_name>] [--user-name <username>]`
  
  Filters:
  - `--name`: group name (exact match, optional)
  - `--user-name`: username (fuzzy search, optional)
  
  Example:  
  `./user-groups.py --url <url> --token <token> view-users --name Default --user-name john`

- **Add users to group:**  
  `./user-groups.py --url <url> --token <token> add-users --name "GroupName" --users "user1,user2,user3"`

**Access control parameters:**

- `--accessed-from`: JSON array defining who can access this user group
  - Type 0 = User Group (e.g., `[{"type":0,"name":"Admins"}]`)
  - Type 2 = User (e.g., `[{"type":2,"name":"john"}]`)

- `--access-to`: JSON array defining what this user group can access
  - Type 0 = User Group (e.g., `[{"type":0,"name":"Support"}]`)
  - Type 1 = Device Group (e.g., `[{"type":1,"name":"Servers"}]`)

**Permission requirements:**
- `view/add/update/delete/add-users` commands require **User Group Permission**
- `view-users` command requires **User Permission**

---

#### Admin Roles Management (`admin-roles.py`)

The token must belong to a full administrator and have **Admin Role** read or read/write permission. Commands that resolve user names or list role members also require **User** read permission.

**View roles:**

```bash
# List roles, optionally filtered by exact name or type
./admin-roles.py --url <url> --token <token> view [--name <role_name>] [--type global|individual|group]

# View one role by GUID
./admin-roles.py --url <url> --token <token> view --guid <role_guid>
```

**Create a role:**

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

The role type cannot be changed after creation. `--permissions` accepts comma-separated permission names, decimal IDs, or `0x`-prefixed IDs, and the formats can be mixed. For example, `users.view,513,0x0203` is equivalent to `257,513,515`. The server rejects permissions that are not valid for the selected role type.

The `view` command converts known permission IDs back to the names below. An ID unknown to the script is preserved as a number so permissions added by a newer server are not hidden.

| Area | Permissions | Valid role types |
| --- | --- | --- |
| Users | `users.view` (`257`); `users.create` (`259`); `users.invite` (`260`); `users.delete` (`261`); `users.enable_disable` (`262`); `users.edit_email` (`263`); `users.edit_password` (`264`); `users.edit_note` (`265`); `users.manage_2fa` (`266`); `users.force_logout` (`267`); `users.change_strategy` (`269`); `users.change_control_role` (`270`); `users.edit_display_name` (`271`) | global, group |
| Users | `users.change_group` (`268`) | global |
| Devices | `devices.view` (`513`) | global, group |
| Devices | `devices.enable_disable` (`515`); `devices.delete` (`516`); `devices.edit_info` (`517`); `devices.change_strategy` (`520`) | global, individual, group |
| Devices | `devices.assign_to_user` (`518`); `devices.change_group` (`519`) | global |
| User groups | `user_groups.view` (`769`); `user_groups.edit` (`770`) | global |
| Device groups | `device_groups.view` (`1025`); `device_groups.edit` (`1026`); `device_groups.change_strategy` (`1027`) | global |
| Audits | `audits.view` (`1281`); `audits.edit` (`1282`) | global, individual |
| Strategies | `strategies.view` (`1537`); `strategies.edit` (`1538`) | global |
| Custom clients | `custom_clients.view` (`1793`); `custom_clients.edit` (`1794`) | global |
| Control roles | `control_roles.view` (`2049`); `control_roles.edit` (`2050`) | global |

**Update or delete a role:**

```bash
./admin-roles.py --url <url> --token <token> update --name "Support Admin" \
  [--new-name "Helpdesk Admin"] [--note "new note"] [--permissions "users.view,devices.view"] \
  [--user-groups "Support"] [--device-groups "Servers"] [--unassigned|--no-unassigned]

./admin-roles.py --url <url> --token <token> delete --name "Support Admin"
```

Pass an empty value to clear `--note`, `--permissions`, `--user-groups`, or `--device-groups`, for example `--permissions ""`.

**Manage role members:**

```bash
./admin-roles.py --url <url> --token <token> view-users --name "Support Admin"
./admin-roles.py --url <url> --token <token> add-users --name "Support Admin" --users "user1,user2"
./admin-roles.py --url <url> --token <token> remove-users --name "Support Admin" --users "user1,user2"
```

Role targets and users can also be supplied by GUID. User names and GUIDs can be mixed in `--users`.

---

#### Control Roles Management (`control-roles.py`)

The token needs **Control Role** read or read/write permission. Commands that resolve user names or list role members also require **User** read permission.

**View roles:**

```bash
./control-roles.py --url <url> --token <token> view [--name <role_name>] [--status enabled|disabled]
./control-roles.py --url <url> --token <token> view --guid <role_guid>
```

**Create, update, delete, enable, or disable a role:**

```bash
./control-roles.py --url <url> --token <token> add --name "Contractors" [--note "Restricted access"]
./control-roles.py --url <url> --token <token> update --name "Contractors" [--new-name "Vendors"] [--note "new note"]
./control-roles.py --url <url> --token <token> delete --name "Contractors"
./control-roles.py --url <url> --token <token> enable --name "Contractors"
./control-roles.py --url <url> --token <token> disable --name "Contractors"
```

New roles created by this script do not include control permissions. Configure them in the web console before assigning users. Control-permission definitions are not managed or displayed by this script.

**Manage role members:**

```bash
./control-roles.py --url <url> --token <token> view-users --name "Contractors"
./control-roles.py --url <url> --token <token> assign-users --name "Contractors" --users "user1,user2"
./control-roles.py --url <url> --token <token> remove-users --users "user1,user2"
```

Role targets and users can also be supplied by GUID. `remove-users` clears each user's current control role, so it does not take `--name` or `--guid`. For the reserved `Default` role, `view-users` lists explicit assignments only; users without a control-role assignment also inherit `Default`. The reserved `Not Logged` role cannot be assigned to users, and reserved roles cannot be renamed, given a note, or deleted.

---

#### Device Groups Management (`device-groups.py`)

**Show help:**  
`./device-groups.py -h`

**View device groups:**  
`./device-groups.py --url <url> --token <token> view [--name <group_name>]`

**Example:**  
`./device-groups.py --url https://example.com --token <token> view`

**Group operations:**

- **Create device group:**  
  `./device-groups.py --url <url> --token <token> add --name "GroupName" [--note "description"] [--accessed-from '<json>']`
  
  Example:  
  `./device-groups.py --url <url> --token <token> add --name "Production" --accessed-from '[{"type":0,"name":"Admins"}]'`

- **Update device group:**  
  `./device-groups.py --url <url> --token <token> update --name "GroupName" [--new-name "NewName"] [--note "new note"] [--accessed-from '<json>']`

- **Delete device group:**  
  `./device-groups.py --url <url> --token <token> delete --name "GroupName"`
  
  Supports comma-separated names: `--name "Group1,Group2,Group3"`

**Device management in groups:**

- **View devices in group:**  
  `./device-groups.py --url <url> --token <token> view-devices [filters]`
  
  Available filters:
  - `--name`: device group name (exact match)
  - `--id`: device ID (fuzzy search)
  - `--device-name`: device name (fuzzy search)
  - `--user-name`: user name/owner (fuzzy search)
  - `--device-username`: logged-in username on device (fuzzy search)
  
  Examples:  
  ```bash
  # View all devices in a group
  ./device-groups.py --url <url> --token <token> view-devices --name Production
  
  # Search by device name
  ./device-groups.py --url <url> --token <token> view-devices --device-name server
  
  # Combine filters
  ./device-groups.py --url <url> --token <token> view-devices --name Production --user-name john
  ```

- **Add devices to group:**  
  `./device-groups.py --url <url> --token <token> add-devices --name "GroupName" --ids "deviceid1,deviceid2"`

- **Remove devices from group:**  
  `./device-groups.py --url <url> --token <token> remove-devices --name "GroupName" --ids "deviceid1,deviceid2"`

**Access control parameter:**

- `--accessed-from`: JSON array defining who can access this device group
  - Type 0 = User Group (e.g., `[{"type":0,"name":"Engineers"}]`)
  - Type 2 = User (e.g., `[{"type":2,"name":"admin"}]`)

**Permission requirements:**
- `view/add/update/delete/add-devices/remove-devices` commands require **Device Group Permission**
- `view-devices` command requires **Device Permission**

---

#### Devices Management (`devices.py`)

**Show help:**  
`./devices.py -h`

**View devices:**  
`./devices.py --url <url> --token <token> view [--id <device_id>] [--device_name <device_name>] [--user_name <user_name>] [--group_name <group_name>] [--device_group_name <device_group_name>] [--offline_days <days>]`

**Filters:**  
`--id`: device ID  
`--device_name`: device name  
`--user_name`: assigned user  
`--group_name`: user group  
`--device_group_name`: device group  
`--offline_days`: days offline

**Example:**  
`./devices.py --url https://example.com --token <token> view --user_name mike`

**Operations:**  
view can be replaced with `enable`, `disable`, `delete`, or `assign`.

**Example (assign device):**  
`./devices.py --url https://example.com --token <token> assign --device_name PC01 --assign_to user_name=mike`

---

#### Address Book Management (`ab.py`)

**Show help:**  
`./ab.py -h`

**View shared address books:**  
`./ab.py --url <url> --token <token> view-ab [--ab-name <address_book_name>]`

**Get personal address book GUID:**  
`./ab.py --url <url> --token <token> get-personal-ab`

**Add a shared address book:**  
`./ab.py --url <url> --token <token> add-ab --ab-name <name> [--note <note>] [--password <password>]`

**Update or delete a shared address book:**  
`./ab.py --url <url> --token <token> update-ab --ab-guid <guid> [--ab-update-name <new_name>] [--note <note>]`  
`./ab.py --url <url> --token <token> delete-ab --ab-guid <guid>`

**View peers in an address book:**  
`./ab.py --url <url> --token <token> view-peer --ab-guid <guid> [--peer-id <peer_id>] [--alias <alias>]`

**Add, update, or delete a peer:**  
`./ab.py --url <url> --token <token> add-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]`  
`./ab.py --url <url> --token <token> update-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]`  
`./ab.py --url <url> --token <token> delete-peer --ab-guid <guid> --peer-id <peer_id>`

**Tags management:**  
`./ab.py --url <url> --token <token> view-tag --ab-guid <guid>`  
`./ab.py --url <url> --token <token> add-tag --ab-guid <guid> --tag-name <name> [--tag-color 0xFF00FF00]`  
`./ab.py --url <url> --token <token> update-tag --ab-guid <guid> --tag-name <name> --tag-color 0xFFFF0000`  
`./ab.py --url <url> --token <token> delete-tag --ab-guid <guid> --tag-name <name>`

**Access rules management:**  
`./ab.py --url <url> --token <token> view-rule --ab-guid <guid>`  
`./ab.py --url <url> --token <token> add-rule --ab-guid <guid> [--rule-type user|group|everyone] [--rule-user <user>] [--rule-group <group>] --rule-permission ro|rw|full`  
`./ab.py --url <url> --token <token> update-rule --rule-guid <rule_guid> --rule-permission rw`  
`./ab.py --url <url> --token <token> delete-rule --rule-guid <rule_guid>`

**Example (add read-only rule for user "mike"):**  
`./ab.py --url https://example.com --token <token> add-rule --ab-guid <guid> --rule-user mike --rule-permission ro`

---

#### Strategies Management (`strategies.py`)

**Show help:**  
`./strategies.py -h`

**List all strategies:**  
`./strategies.py --url <url> --token <token> list`

**View a specific strategy:**  
```bash
# By name
./strategies.py --url <url> --token <token> view --name "Default"

# By GUID
./strategies.py --url <url> --token <token> view --guid "01983006-fcca-7c12-9a91-b1df483c6073"
```

**Enable or disable a strategy:**  
```bash
./strategies.py --url <url> --token <token> enable --name "StrategyName"
./strategies.py --url <url> --token <token> disable --name "StrategyName"
```

**Assign strategy to devices, users, or device groups:**  
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

**Unassign strategy:**  
```bash
# Unassign from devices
./strategies.py --url <url> --token <token> unassign --peers "1849118658,1337348840"

# Unassign from users
./strategies.py --url <url> --token <token> unassign --users "admin"

# Unassign from device groups
./strategies.py --url <url> --token <token> unassign --device-groups "device_group1"
```

**Notes:**
- The script supports both names and GUIDs for users and device groups
- Device IDs are automatically converted to GUIDs
- All assign/unassign operations can target multiple resources at once

**Permission requirements:**
- `list/view/enable/disable/assign/unassign` commands require **Strategy Permission**
- `--peers` requires **Device Permission:r** (for ID to GUID lookup)
- `--users` requires **User Permission:r** (for username to GUID lookup)
- `--device-groups` requires **Device Group Permission:r** (for name to GUID lookup)

---

#### Audits (`audits.py`)

**Show help:**  
`./audits.py -h`

**View connection audits:**  
`./audits.py --url <url> --token <token> view-conn [--remote <peer_id>] [--conn-type <type>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]`

**View file audits:**  
`./audits.py --url <url> --token <token> view-file [--remote <peer_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]`

**View alarm audits:**  
`./audits.py --url <url> --token <token> view-alarm [--device <device_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]`

**View console audits:**  
`./audits.py --url <url> --token <token> view-console [--operator <username>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]`

**Filters:**  
`--remote`: Peer ID (for connection or file audits)  
`--conn-type`: 0=Remote Desktop, 1=File Transfer, 2=Port Transfer, 3=View Camera, 4=Terminal  
`--device`: Device ID (for alarm audits)  
`--operator`: Operator username (for console audits)  
`--created-at`: Local time filter, e.g., "2025-09-16 14:15:57"  
`--days-ago`: Filter records newer than given days ago  
`--page-size` / `--current`: Pagination

**Example:**  
`./audits.py --url https://example.com --token <token> view-conn --remote 123456789 --days-ago 7`


## Searching for a device
1. Go to Devices.
2. In the Device Name Search Field type in the name and click `Query` or hit <kbd>Enter</kbd>.
3. To use a wildcard add `%` at the start, end or both of the search term.
