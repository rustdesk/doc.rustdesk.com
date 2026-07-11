---
title: Address Book
weight: 201
description: "Use Address Book in RustDesk Server Pro to save remote devices, share device lists, organize devices with tags, and connect from the RustDesk client with shared passwords."
keywords: ["rustdesk address book", "rustdesk server pro address book", "rustdesk shared address book", "rustdesk device tags", "rustdesk shared password"]
---

Address Book lets users save RustDesk device IDs, organize them with tags, share device lists, and connect from the RustDesk client with saved passwords.

## Quick answers

- **My address book** is private to the signed-in user. Remembered manually entered passwords are saved in **My address book** and can be synced across the user's devices.
- **Shared** address books can be shared with specific users, user groups, or every user.
- A shared address book can store an address book level password, and each device entry can store a device level password. When the device level password is not set, the address book level password is used.
- Tags can be used to filter devices in the web console and in the RustDesk client.

## One-click connection with a shared address book

Use a shared address book when users need to connect without manually entering the remote password every time.

1. Create or open a shared address book. Optionally set an **address book level password** on the address book.

2. Click the address book name to open the devices page. Click **Import**, select devices to import into the address book, and click **Save** at the bottom to save the selected devices. Or click **Add** to add a device by ID, using an IP address as the ID for direct IP access. Optionally set a **device level password** on individual device entries.

3. Share the address book with specific users, user groups, or every user.

4. The user signs in to the RustDesk client and opens the **Address book** tab.

5. The user selects the shared address book and clicks the device card.

![Click a shared address book device card in the client](/docs/en/self-host/rustdesk-server-pro/address-book/images/click-peer-card.png)

{{% notice warning %}}
The shared password is used only when connecting from the corresponding shared address book, either by clicking the device card or using its dropdown menu. It is not used from another device tab, the **Connect** button next to the ID input box, or another shared address book.
{{% /notice %}}

## Shared address book permissions

| Permission | What users can do |
| --- | --- |
| **Read-only** | Can view devices and tags, and can use password. |
| **Read/Write** | Can edit devices and tags. |
| **Full Control** | Can re-share, delete or rename the address book. |

When multiple rules match the same user, priority is:

1. User
2. Group
3. Everyone

For example, if **Everyone** is Read-only but a specific user is Full Control, that user gets Full Control permission.

![Share address book permissions](/docs/en/self-host/rustdesk-server-pro/address-book/images/share-list.png)

![Shared address book permission in the web console](/docs/en/self-host/rustdesk-server-pro/address-book/images/user1-permission.png)

## Web console

### Create or edit a shared address book

In **Address Book > Shared**, create a shared address book with a name, optional note, and optional **Default Shared Password**. This is the address book level password.

![Create shared address book with default shared password](/docs/en/self-host/rustdesk-server-pro/address-book/images/create-shared-address-book.png)

### Add devices and passwords

Devices can be added manually by ID or imported from the Server Pro device list. For each entry, you can set an alias, tags, note, and, for shared address books, a device level password.

![Add device to shared address book](/docs/en/self-host/rustdesk-server-pro/address-book/images/import-device.png)

![Devices](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-addressbook-devices.png)

![Edit device to shared address book](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-edit-device.png)

### Tags and filtering

Tags organize and filter devices. `Untagged` filters devices without tags. With **Filter by intersection** on, only devices matching all selected tags are shown.

### Recycle bin

Deleting a device from an address book moves the entry to that address book's recycle bin. It does not delete the device from RustDesk Server Pro.

## Shared password behavior

| Password level | Priority |
| --- | --- |
| Device level password | Used first when the device entry has a password. |
| Address book level password | Used when the device entry has no password. |

If neither password is set, the user connects normally and may need to enter the password manually. In the web console, password columns show only whether a password is set.

## RustDesk client

After sign-in, use the address book selector to switch between **My address book** and shared address books. For shared address books, the client shows the current user's permission.

![RustDesk client address book selector](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-selector.png)

![readonly address book](/docs/en/self-host/rustdesk-server-pro/address-book/images/read-only-address-book.png)

### Edit from the client

Users with write permission can add IDs, add tags, edit aliases, edit tags, edit notes, set shared passwords, or remove entries.

![Address book device menu 1 in RustDesk client](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu1.png)

![RustDesk client Add ID](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-add-id.png)

![Address book device menu 2 in RustDesk client](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu2.png)

![RustDesk client Change Password](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-change-password.png)

## Deployment presets

RustDesk client configuration can preset address book assignment:

- `preset-address-book-name`
- `preset-address-book-tag`
- `preset-address-book-alias`
- `preset-address-book-password`
- `preset-address-book-note`

`preset-address-book-alias`, `preset-address-book-password`, and `preset-address-book-note` require RustDesk client 1.4.3 or later and RustDesk Server Pro 1.6.6 or later.

For more details, see [advanced client configuration](/docs/en/self-host/client-configuration/advanced-settings/#preset-address-book-name--preset-address-book-tag--preset-address-book-alias--preset-address-book-password--preset-address-book-note).

## Related settings

| Setting | Where | Effect |
| --- | --- | --- |
| **Allow non-admin to share address books to other groups** | **Settings > Others** | Allows non-admin users to share address books to other user groups. |
| **Disable address book** | **Custom Client** | Hides or disables Address Book in the generated custom client. |

## Troubleshooting

### Wrong Password

The password saved in a shared address book is used by the controlling RustDesk client. It is not set on the controlled device. Set the controlled device's password on that device in **Settings > Security > Password**.

To use the shared password, connect from the corresponding shared address book by clicking the device card. Connecting from another address book, another device tab, or the **Connect** button next to the ID input box does not use this address book's shared password.
