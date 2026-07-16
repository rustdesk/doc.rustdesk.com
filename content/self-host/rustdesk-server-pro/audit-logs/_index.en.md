---
title: Audit Logs
weight: 19
description: "Use Audit Logs in the RustDesk Server Pro web console to review connection, file-transfer, console-operation, and alarm events."
keywords: ["rustdesk audit logs", "rustdesk server pro logs", "rustdesk connection logs", "rustdesk file transfer logs", "rustdesk alarm logs", "rustdesk console audit"]
---

Audit Logs in the RustDesk Server Pro web console help administrators review remote-access activity, file-transfer activity, administrative changes, and security alarms.

Open the web console, then go to **Logs** in the left menu. The Logs section includes:

- **Connection**
- **File**
- **Console**
- **Alarm**

## Connection logs

Go to **Logs > Connection** to review remote sessions and related connection types.

Connection logs show:

- **Type**: Remote Desktop, File Transfer, Port Transfer, View Camera, Terminal, or Not Logged In. **Not Logged In** means authentication did not succeed.
- **Controlled Device**: The target device ID and name.
- **Controlling Side**: The controlling user when the controlling side is signed in, plus the controlling device, device name, and IP address.
- **Start Time**, **End Time**, and **Duration**.
- **Authentication**: Primary authentication method, optionally followed by 2FA information.
- **Note**.

![Connection logs page](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/connection-log-page.png)

Supported primary authentication values include:

- Click Confirmation
- One-time Password
- Permanent Password
- Switch Sides

Supported 2FA values include:

- 2FA Code
- Trusted Device

### Connection notes

The controlling side can add a note to a connection in two ways:

- During a remote session, use the **Note** action in the remote menu to add or update the connection note.

![Connection note box](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/note-box.png)

- At the end of a remote session, enable **Settings > General > Other > Ask Note at end of connection** on the controlling side if you want RustDesk to ask for a note when the session ends.

![Connection close note box](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/close-conn-note-box.png)

The note is shown in the **Note** column in **Logs > Connection**. Users who can view the connection log can also use the edit button in the **Note** column to update the note from the web console.

### Disconnect a running connection

If a connection is still running and your account has permission to edit that audit item, the **Action** column shows **Disconnect**. Click it and confirm the operation to terminate the running connection.

![Disconnect confirmation](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/disconnect-confirm.png)

After the connection is disconnected from the web console, the controlling side sees a message that the connection was disconnected from the web console.

![Disconnected by console message](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/disconnected-by-console.png)

## File-transfer logs

Go to **Logs > File** to review file-transfer activity.

![File-transfer logs page](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/file-transfer-logs.png)

File-transfer logs include file operations from both dedicated **File Transfer** sessions and file copy/paste during **Remote Desktop** sessions.

File-transfer logs show:

- **Controlled Device**.
- **Controlling Side**: The controlling device and controlling user when available.
- **Time**.
- **Direction**:
  - Controlled Device -> Controlling Side
  - Controlling Side -> Controlled Device
- **File**: The path on the controlled device.
- **Detail**: File size for a single file, or a file count for multi-file transfers.

For multi-file transfers, click the file count in the **Detail** column to open the detail drawer. When the transfer contains more files than the drawer lists, the drawer shows the 10 largest files by size.

![File-transfer details](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/file-transfer-details.png)

## Alarm logs

Go to **Logs > Alarm** to review security-related events.

![Alarm logs page](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/alarm-logs.png)

Alarm logs show:

- **Type**.
- **From**: For login account alarms, this is the login device. For remote connection alarms, this is the controlling side.
- **Target**: For login account alarms, this is the login account. For remote connection alarms, this is the controlled device.
- **Event Time**.

Remote connection alarm types include:

- Access attempt outside the IP whitelist
- Over 30 consecutive access attempts
- Multiple access attempts within one minute
- Too many consecutive access attempts from a single IPv6 prefix
- Multiple failed Terminal (Run as administrator) login attempts (wrong username/password)
- Multiple simultaneous Terminal (Run as administrator) login attempts
- Session scope violation

Login account alarm types include:

- Over 30 consecutive login attempts
- Multiple login attempts within one minute
- Multiple login attempts within one hour

## Console-operation logs

Go to **Logs > Console** to review actions performed in the web console.

![Console-operation logs page](/docs/en/self-host/rustdesk-server-pro/audit-logs/images/console-logs.png)

Console logs show:

- **Type**.
- **User**: The web-console user who performed the operation.
- **Operation**: The specific action.
- **Time**.
- **Detail**: Extra fields recorded for the operation.

Types include:

- Group Management
- User Management
- Device Management
- Address Book Management
- Admin Roles Management
- Control Roles Management

Tracked operations include user login, user and device changes, disconnecting a device, address book changes, 2FA changes, password reset, admin/control role changes, and so on.

## Log visibility and retention

Log visibility depends on whether the user is an administrator, whether the user has an [Admin Role](/docs/en/self-host/rustdesk-server-pro/admin-role/) with Audit Logs permissions, and the setting in **Settings > Other**.

| User type or setting | Log visibility |
| --- | --- |
| Administrator | Can view all audit logs. |
| Admin Role with **Global > Audit Logs-View** | Can view all audit logs, even when **Only admin can access logs** is enabled. |
| Admin Role with **Individual > Audit Logs-View** | Can view personal audit logs, even when **Only admin can access logs** is enabled. This grants the same personal log scope as a normal non-admin user, but it is not blocked by that setting. |
| Non-admin user without Audit Logs permissions | Can view personal audit logs only when **Only admin can access logs** is disabled. |
| **Settings > Other > Only admin can access logs** enabled | Non-admin users without Audit Logs permissions cannot access audit logs. |

Personal logs include connection and file-transfer records where a device currently assigned to the user is the controlled or controlling device, and records where the user is the controller. For alarm logs, personal logs include records for devices assigned to the user or the user's login account. For console-operation logs, personal logs include records where the user is the operator.

Use **Settings > Other > Log Retention (Days)** to control how long audit logs are kept. Enter `0` to keep all logs indefinitely. Enter a number greater than `0` to automatically delete logs older than the specified number of days. Cleanup runs once per hour.

## Export audit logs

Each log page has **Export as csv** in the toolbar. The exported file follows the current filters on the page and uses the same time values shown in the web console. Each export includes up to 1000 records, but you can use the **Start Time** filter to export all logs in batches.

You can also use an [API token](/docs/en/self-host/rustdesk-server-pro/console/#audits-auditspy) with `audits.py` to query audit logs.
