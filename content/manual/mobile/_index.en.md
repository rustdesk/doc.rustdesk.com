---
title: Mobile
weight: 1
---

### Remote Control

Enter the ID of the remote device in the home page or select a historical device to verify.
After the verification is successful, you can control remote device.

| Home | Successfully connected |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/connection_home_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/connection_en.jpg?width=300px) |

Input control provides two modes: `mouse mode` and `touch mode`, which can be switched through the lower toolbar.

| Mouse settings | Mode selection |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/touch_mode_icon_en.png?width=300px) | ![](/docs/en/manual/mobile/images/touch_mode_en.jpg?width=300px) |

{{% notice note %}}
In `mouse mode`,you can also trigger the remote device's `Right Mouse` with a `Two-Finger Tap`
{{% /notice %}}

### File Transfer (Android)

> Requires RustDesk 1.1.9+

In the device list on the home page, select the device.

Long press or tap the menu on the right to select `File Transfer`

| Home | Successfully connected |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/connection_home_file_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/file_connection_en.jpg?width=300px) |

- The initial directory is the Home directory of the device, you can click <i class="fas fa-home"></i> to quickly return to Home.
- Below the title bar is the directory level, you can click the corresponding folder to jump quickly.
- Click <i class="fas fa-arrow-up"></i> to access the parent directory.
- The current absolute path and project statistics will be prompted at the bottom of the list.
- Click `Local` / `Remote` in the title bar to switch pages.

#### How do I transfer files?

1. **Long press** on a file or folder in the list to quickly enter the **multiple selection mode**, which can select multiple items.
2. After selecting the file(s), switch the `local` / `remote` page. After switching, you will see the `Paste here?` prompt at the bottom of the screen.
3. Click the paste file icon in the picture to transfer the selected item(s) to the target directory.

| Multi-Select Mode | File Paste |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/file_multi_select_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/file_copy_en.jpg?width=300px) |

### Set ID/Relay Server

1. Click `Settings` on the bottom navigation bar.
2. Click `ID/Relay Server`.
3. Enter your ID Server hostname/IP Address in the `ID Server` field. Leave `Relay Server` and `API Server` blank, and enter your public key (optional, required for encryption) in the `Key` field. Press **OK** to save your settings. It will automatically switch to the specified server.

You can also configure it by scanning a QR Code. To generate the QR Code, use the following format (change the `host` and `key` values to your own):

```nolang
config={"host": "xxx", "key": "xxx"}
```

Then go to an [Online QR Code Generator](https://www.qr-code-generator.com/) and paste in the code above.

The picture below is a screenshot of Android. If it is iOS, please check top-right menu on the home page.

![](/docs/en/manual/mobile/images/id_setting_en.jpg?width=300px)

For details of self-host server, please refer to [self-host](/docs/en/self-host/)
