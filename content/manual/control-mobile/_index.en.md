---
title: Control your Android 
weight: 2
---

### Share screen/files of your Android phone
------

Starting from version 1.1.9, the Android client has added the functions of sharing the phone screen and sharing the file system of the phone.

- Android 6 and above is required for screen sharing
- Android 10 or above is required to share the internal audio of the mobile phone system
- iOS does not yet support screen sharing


#### **Request permissions and start services**

Click on `Share Screen` from the bottom navigation bar

Configure various permissions as needed. Every time you start RustDesk, you need to request "Screen Capture" and "Input Control" permissions again.

![](/docs/en/manual/mobile/images/server_page_zh.jpg?width=300px)

| Permissions     | Description                                               |
| --------------- | --------------------------------------------------------- |
| Screen Capture | Whether to enable screen capture sharing permission, the monitoring service will be enabled at the same time as startup |
| Input Control* | Whether to allow the controller to control the input of the mobile phone, such as virtual touch screen operation with the mouse |
| File transfer* | Whether to enable file transfer permission, after startup, you can remotely control the file system of this phone |
| Audio capture  | Whether to share the system music inside the phone (not microphone input) |

{{% notice note %}}
Above * represents special permissions. To obtain such permissions, you need to jump to the Android system settings page to obtain them manually. The details are as follows
{{% /notice %}}

#### **Special Permission Request- File**

| Requesting Android file permissions will automatically jump to the system settings page |
| :---------------: |
| ![](/docs/en/manual/mobile/images/get_file_zh.jpg?width=300px) |

#### **Special Permission Request - mouse input**
| Step 1 Find "Installed Services" | Step 2 Start RustDesk Input |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/get_input1_zh.png?width=300px) | ![](/docs/en/manual/mobile/images/get_input2_zh.jpg?width=300px) |

{{% notice note %}}
The system setting page of different vendors may be different, please adjust it according to your system page
{{% /notice %}}

**Remote mouse control shortcuts:**

- Click the right mouse button: go back
- Click the mouse wheel: Home
- Long press mouse wheel: recently opened apps
- Mouse wheel scrolling: simulate vertical sliding

#### **Start service**

After obtaining the `screen capture` permission, the service will be automatically started. You can also click the `Start service` button to start the service. After the service is started, it can accept desktop control requests from other devices.

If the `file transfer` permission is enabled, it can also accept file control requests from other devices.

After the service is started, a unique ID and random password will be automatically obtained for this device. Other devices can control the phone through the ID and password, or manually confirm when a new request is received.

| Before starting the service | After starting the service |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/server_off_zh.jpg?width=300px) | ![](/docs/en/manual/mobile/images/server_on_zh.jpg?width=300px) |

{{% notice note %}}
1. Clicking `Start Service` will enable the `Screen capture` permission by default.
2. When the `screen capture` permission is not obtained, other devices cannot issue control requests.
3. Except for the `screen capture` permission, the switching of other permissions will only affect the new connection, and will not affect the established connection. If you need to switch permissions for an established connection, please close the current connection first, modify the permissions, and then receive a control request.
{{% /notice %}}

**PC:**

![](/docs/en/manual/mobile/images/android_server_pc_side_zh.png?width=700px)

**Mobile terminal:**
| You can stop the service or close the specified connection at any time | You can receive or initiate chats |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/android_server1_zh.jpg?width=300px) | ![](/docs/en/manual/mobile/images/android_server2_zh.jpg?width=300px) |