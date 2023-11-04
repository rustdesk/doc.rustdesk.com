---
title: Android
weight: 4
---

### Remote Control

Enter the ID of the remote device in the home page or select a historical device to verify.
After the verification is successful, you can control remote device.

| Home | Successfully connected |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_en.jpg?width=300px) | ![](/docs/en/client/android/images/connection_en.jpg?width=300px) |

Input control provides two modes: `Mouse mode` and `Touch mode`, which can be switched through the lower toolbar.

| Mouse settings | Mode selection |
| --- | --- |
| ![](/docs/en/client/android/images/touch_mode_icon_en.png?width=300px) | ![](/docs/en/client/android/images/touch_mode_en.jpg?width=300px) |

{{% notice note %}}
In `Mouse mode`,you can also trigger the remote device's `Right Mouse` with a `Two-Finger Tap`
{{% /notice %}}

### File Transfer (Android)

> Requires RustDesk ≥ 1.1.9

In the device list on the home page, select the device.

Long press or tap the menu on the right to select `File Transfer`.

| Home | Successfully connected |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_file_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_connection_en.jpg?width=300px) |

- The initial directory is the Home directory of the device, you can click <i class="fas fa-home"></i> to quickly return to Home.
- Below the title bar is the directory level, you can click the corresponding folder to jump quickly.
- Click <i class="fas fa-arrow-up"></i> to access the parent directory.
- The current absolute path and project statistics will be prompted at the bottom of the list.
- Click `Local` / `Remote` in the title bar to switch pages.

#### How do I transfer files?

1. **Long press** on a file or folder in the list to quickly enter the **multiple selection mode**, which can select multiple items.
2. After selecting the file(s), switch the `Local` / `Remote` page. After switching, you will see the `Paste here?` prompt at the bottom of the screen.
3. Click the paste file icon in the picture to transfer the selected item(s) to the target directory.

| Multi-Select Mode | File Paste |
| --- | --- |
| ![](/docs/en/client/android/images/file_multi_select_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_copy_en.jpg?width=300px) |

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

![](/docs/en/client/android/images/id_setting_en.jpg?width=300px)

### Share screen/files of your Android phone

Starting from version 1.1.9, the Android client has added the functions of sharing the phone screen and sharing the file system of the phone.

- Android 6 and above is required for screen sharing
- Android 10 or above is required to share the internal audio of the mobile phone system
- iOS does not yet support screen sharing

#### Request permissions and start services

Click on `Share Screen` from the bottom navigation bar.

Configure various permissions as needed. Every time you start RustDesk, you need to request "Screen Capture" and "Input Control" permissions again.

![](/docs/en/client/android/images/server_off_en.jpg?width=300px)

| Permissions | Description |
| --- | --- |
| Screen Capture | Whether to enable screen capture sharing permission, the monitoring service will be enabled at the same time as startup |
| Input Control* | Whether to allow the controller to control the input of the mobile phone, such as virtual touch screen operation with the mouse |
| File transfer* | Whether to enable file transfer permission, after startup, you can remotely control the file system of this phone |
| Audio capture  | Whether to share the system music inside the phone (not microphone input) |

{{% notice note %}}
Above * represents special permissions. To obtain such permissions, you need to jump to the Android system settings page to obtain them manually. The details are as follows
{{% /notice %}}

#### Special Permission Request - File

| Requesting Android file permissions will automatically jump to the system settings page |
| :---: |
| ![](/docs/en/client/android/images/get_file_en.jpg?width=300px) |

#### Special Permission Request - mouse input
| Step 1: Find "Installed Services" | Step 2: Start RustDesk Input |
| --- | --- |
| ![](/docs/en/client/android/images/get_input1_en.jpg?width=300px) | ![](/docs/en/client/android/images/get_input2_en.jpg?width=300px) |

{{% notice note %}}
The system setting page of different vendors may be different, please adjust it according to your system page.
{{% /notice %}}

| Remote mouse control shortcuts | Description |
| --- | --- |
| Click the right mouse button | Go back |
| Click the mouse wheel | Home |
| Long press mouse wheel | Recently opened apps |
| Mouse wheel scrolling | Simulate vertical sliding |

#### Start Service

After obtaining the `Screen Capture` permission, the service will be automatically started. You can also click the `Start Service` button to start the service. After the service is started, it can accept desktop control requests from other devices.

If the `File Transfer` permission is enabled, it can also accept file control requests from other devices.

After the service is started, a unique ID and random password will be automatically obtained for this device. Other devices can control the phone through the ID and password, or manually confirm when a new request is received.

| Before starting the service | After starting the service |
| --- | --- |
| ![](/docs/en/client/android/images/server_off_en.jpg?width=300px) | ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) |

{{% notice note %}}
1. Clicking `Start Service` will enable the `Screen Capture` permission by default.
2. When the `Screen Capture` permission is not obtained, other devices cannot issue control requests.
3. Except for the `Screen Capture` permission, the switching of other permissions will only affect the new connection, and will not affect the established connection. If you need to switch permissions for an established connection, please close the current connection first, modify the permissions, and then receive a control request.
{{% /notice %}}

##### PC

![](/docs/en/client/android/images/android_server_pc_side_en.png?width=700px)

##### Mobile terminal

| You can stop the service or close the specified connection at any time | You can receive or initiate chats |
| --- | --- |
| ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) | ![](/docs/en/client/android/images/android_server2_en.jpg?width=300px) |
