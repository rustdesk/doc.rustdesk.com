---
title: Admin Role
weight: 17
---

Admin Role allows administrators to delegate partial management permissions to non-administrator users. You can define permissions for global resources (such as strategies, control roles, and custom clients) as well as users and devices within different scopes.

Once an Admin Role is assigned to a user, they will see the corresponding pages and menus in the web console based on their granted permissions.

## Administrators vs Admin Roles

- Only administrators can edit Admin Roles and assign Admin Roles to users.
- Administrators are not restricted by Admin Roles, although Admin Roles can be assigned to administrators.
- Non-admin users cannot edit administrator accounts, even with global User Permissions granted.

## Role Types

Admin Roles come in three types, each with different scope and available permissions.

| Type | Description |
|------|-------------|
| **Global** | Can manage all resources across the entire team |
| **Individual** | Can only manage the user's own devices and audit logs |
| **Group Scoped** | Can manage users and devices within specified groups |

### About Group Scoped

| Selected permissions | Applied to |
|-------|-------------|
| **User Permissions** | Apply to users within the selected user groups |
| **Device Permissions** | Apply to devices from: <ul><li>Selected device groups</li><li>Devices assigned to users within selected user groups</li><li>Unassigned devices (if enabled)</li></ul> |

## Permission Rules

### Any Edit Permission Includes the Corresponding View Permission

Any edit permission automatically includes the corresponding view permission. For example, "Devices Enable/Disable" permission includes "View Devices" permission.

### Edit Permission Does Not Include Assign

Edit permissions for resources (User Groups, Device Groups, Strategies, Control Roles) only allow editing the resources themselves, not assigning them to users or devices.

For example, "Edit Device Groups" permission allows creating and modifying device groups, but to add or remove devices from groups, you need the "Devices Update Group" permission.

### View Permission Does Not Include Members

View permissions for resources (User Groups, Device Groups, Strategies, Control Roles) only allow viewing the resources themselves, not viewing the members within them.

For example, "View Device Groups" permission allows viewing the list of device groups, but to view devices within a group, you need the "View Devices" permission or any device edit permission. If the device permission is global, you can see all devices in the group; if it's group scoped or individual, you can only see devices within your permitted scope.

{{% notice note %}}
Reading devices for address books is not restricted by Admin Roles. The accessible devices peer tab in the client is only controlled by **Settings → Others → Disable retrieving accessible devices** in the console, and is also not restricted by Admin Roles.
{{% /notice %}}

## Console Operations

### Creating a Role

1. Navigate to **Admin Roles** page and click **Create**
2. Enter a **Name** for the role
3. Select a **Type** (for **Group Scoped**, also configure the scope)
4. Select the **Permissions** to grant

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-name.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-permission.png)

### Role Assignment

There are two ways to assign Admin Roles to users:

1. **Users page** → Click **Edit** on a user → Select roles in the **Admin Roles** field
2. **Admin Roles page** → Click the **user count** or **Assign Users** → Add or remove users from the role

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-user-page.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-role-page.png)

{{% notice note %}}
- A user can have multiple Admin Roles assigned. The permissions from all assigned roles are combined (union of all permissions).
{{% /notice %}}

## Permissions Reference

### Global Permissions

| Permission | Description |
|------------|-------------|
| Users-View | Read list information of all users. |
| Users-Create | Directly create non-administrator users. |
| Users-Invite | Invite users via email. |
| Users-Delete | Delete any non-administrator user. Users must be disabled before they can be deleted. |
| Users-Enable/Disable | Enable or disable any non-administrator user. |
| Users-Edit Email | Change the email of any non-administrator user. |
| Users-Edit Password | Change the password of any non-administrator user. |
| Users-Edit Note | Change the note of any non-administrator user. |
| Users-Manage 2FA | Manage login verification for any non-administrator user. Includes enable/disable 2FA enforcement, reset 2FA configuration, disable email login verification. |
| Users-Force Logout | Force logout any non-administrator user from all devices. |
| Users-Update Group | Change any non-admin user's group. |
| Users-Update Strategy | Change any non-admin user's strategy. |
| Users-Update Control Role | Change any non-admin user's control role. |
| Devices-View | Read list information of all devices. |
| Devices-Enable/Disable | Enable or disable any device. |
| Devices-Delete | Delete any device. Devices must be disabled before they can be deleted. |
| Devices-Edit Info | Edit device name, device username (system username of the device, not the RustDesk user), and note for any device. |
| Devices-Assign to User | Assign any device to any user. |
| Devices-Update Group | Change any device's group. |
| Devices-Update Strategy | Change any device's strategy. |
| User Groups-View | Read list information of all user groups. If having Users View permission, can view group members. If having Users Update Group permission, can batch update users' groups here. |
| User Groups-Edit | Create, edit, and delete user groups, does not include updating group members. |
| Device Groups-View | Read list information of all device groups. If having Devices View permission, can view group members. If having Devices Update Group permission, can batch update devices' groups here. |
| Device Groups-Edit | Create, edit, and delete device groups, does not include updating group members. Includes Update Strategy permission. |
| Device Groups-Update Strategy | Change any device group's strategy. |
| Audit Logs-View | Read all logs. Can edit notes. Even when "Only admin can access logs" option is enabled. |
| Audit Logs-Edit | Can disconnect any active connection. |
| Strategies-View | Read any strategy. If having Users View, Devices View, and Device Groups View permissions, can read strategies for users, devices, and device groups. If having Users Update Strategy, Devices Update Strategy, and Device Groups Update Strategy permissions, can batch update corresponding strategies here. |
| Strategies-Edit | Create, edit, and delete strategies, does not include updating strategies for users, devices, and device groups. |
| Control Roles-View | Read any control role. If having Users View permission, can read control roles for users. If having Users Update Control Role permission, can batch update corresponding control roles here. |
| Control Roles-Edit | Create, edit, and delete control roles, does not include updating control roles for users. |
| Custom Clients-View | Read the list of custom clients. Can download compiled custom clients. Cannot read detailed configuration of custom clients. |
| Custom Clients-Edit | Create, edit, and delete custom clients. |

### Individual Permissions

| Permission | Description |
|------------|-------------|
| Devices-View | Read list information of the user's devices. |
| Devices-Enable/Disable | Enable or disable the user's devices. |
| Devices-Delete | Delete the user's devices. Devices must be disabled before they can be deleted. |
| Devices-Edit Info | Edit device name, device username (system username of the device, not the RustDesk user), and note for the user's devices. |
| Devices-Update Strategy | Change strategy of the user's devices. |
| Audit Logs-View | Read personal logs. Can edit notes. Even when "Only admin can access logs" option is enabled. |
| Audit Logs-Edit | Can disconnect personal active connections. |

### Group Scoped Permissions

| Permission | Description |
|------------|-------------|
| Users-View | Read list information of users within selected user groups. |
| Users-Create | Create non-administrator users within selected user groups. |
| Users-Invite | Invite users via email within selected user groups. |
| Users-Delete | Delete non-administrator users within selected user groups. Users must be disabled before they can be deleted. |
| Users-Enable/Disable | Enable or disable non-administrator users within selected user groups. |
| Users-Edit Email | Change the email of non-administrator users within selected user groups. |
| Users-Edit Password | Change the password of non-administrator users within selected user groups. |
| Users-Edit Note | Change the note of non-administrator users within selected user groups. |
| Users-Manage 2FA | Manage login verification for non-administrator users within selected user groups. Includes enable/disable 2FA enforcement, reset 2FA configuration, disable email login verification. |
| Users-Force Logout | Force logout non-administrator users within selected user groups from all devices. |
| Users-Update Strategy | Change the strategy of non-admin users within selected user groups. |
| Users-Update Control Role | Change the control role of non-admin users within selected user groups. |
| Devices-View | Read list information of devices managed by the current role. |
| Devices-Enable/Disable | Enable or disable devices managed by the current role. |
| Devices-Delete | Delete devices managed by the current role. Devices must be disabled before they can be deleted. |
| Devices-Edit Info | Edit device name, device username (system username of the device, not the RustDesk user), and note for devices managed by the current role. |
| Devices-Update Strategy | Change strategy of devices managed by the current role. |