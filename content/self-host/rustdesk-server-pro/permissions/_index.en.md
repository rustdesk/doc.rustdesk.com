---
title: Access Control
weight: 16
description: "Configure device access control in RustDesk Server Pro by assigning devices to users or groups and defining who can reach which managed devices."
keywords: ["rustdesk access control", "rustdesk device permissions", "rustdesk user group access", "rustdesk server pro permissions", "rustdesk device assignment"]
---

Use Access Control to decide which users or groups can connect to which devices in RustDesk Server Pro.

## Device access permissions

The device can be assigned to either a single user, a single device group, or both.

When the device is assigned to a user, it can be accessed by that user, a user group, or through appropriate cross-user-group settings.

When the device is assigned to a device group, it can be accessed via appropriate cross-user-device-group settings.

There are three ways to assign a device to a user:
- Via console device page
- Log in to the specified user account on the client side
- Assign command line
  
There are two ways to assign a device to a device group:
- Via console device page
- Assign command line

The following two situations will prevent the device from being accessed:
- Make device `disable` in console devices page
- Make user `disable` in console user page

## User Group Access Settings

Please go to group page in the web console, click on `Edit` to edit cross group settings as below.

Your modifications to `Access with other groups` take effect immediately without requiring you to click the `OK` button.

Both `Can access to` and `Can be accessed from` serve almost the same function, we provide both options for your convenience. However, this may cause some confusion.

{{% notice note %}}
The user and group assigned to the controlling side are determined by the user who logs in, rather than the user who is assigned from the web console. We designed it this way because certain controlling sides do not have a device ID, such as the iOS client and web client.
{{% /notice %}}

![](/docs/en/self-host/rustdesk-server-pro/permissions/images/crossgrp.png)

## Device Group Access Settings

Device groups provide another way to manage access permissions. Here are the key rules:

1. A device can only be added to one device group
2. You can set access permissions for users or user groups to device groups. These permissions are cumulative with user group access permissions - meaning access is granted if either the user group permissions or device group permissions allow it
3. When an unassigned device is added to a device group, it is no longer considered "unassigned"

{{% notice note %}}
Device group feature requires RustDesk client >= 1.3.8 and RustDesk Server Pro >= 1.5.0
{{% /notice %}}
