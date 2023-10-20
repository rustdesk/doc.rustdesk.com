---
title: Client Configuration
weight: 300
pre: "<b>2.3. </b>"
---

### Overview

There are a number of ways to configure RustDesk Clients to use your own self-hosted server, we will cover some below.

### Manual Config

In the main RustDesk Client home click on the Menu button [ &#8942; ] next to your ID then click on Network, you can now unlock the settings using elevated privileges and set your ID, Relay, API and Keys.

![image](/docs/en/self-host/client-configuration/images/network-config.png)

Enter the `hbbs` host or IP Address in the **ID Server** input box (local side + remote side). The other two addresses can be left blank, RustDesk will automatically deduce (if not specially set), and the Relay Server refers to `hbbr` (port 21117).

e.g.

```nolang
hbbs.example.com
```

or

```nolang
hbbs.example.com:21116
```

### Set `Key`

As a `Pro` user you will be able to retrieve the key from the [web console](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/), or you can find it in `id_ed25519.pub` file under your working directory.

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

#### Set `API server`
This is for `Pro` user only. When you can log in on web console, but fail to log in on RustDesk client, it probably you have not set `API serer` correctly.

If your API server does not run on default `21114` port, please specify `API Server` explicitly.
e.g. your API server runs on default https port, please specify `API Server` with `https://hbbs.example.com`.

If you still can not confirm the value of `API server`, please go to the welcome page of web console, the `API server` is shown in above picture (The input box with `API:` label).

### Setup Using Import or Export

1. Use the steps [above](/docs/en/self-host/client-configuration/#manual-config) to configure RustDesk Client on a Device.
2. Using the above machine go to Settings then Network and unlock.
3. Click on `Export Server Config`.
4. Paste the copied string into Notepad or similar.
5. Go to new client, copy the above to clipboard.
6. Go to Settings then Network in RustDesk Client, unlock and click `Import Server Config`.
7. It will automatically paste the settings in.
8. Click `Apply`.

### Automatic Config

The easiest way to setup automatically is using deployment scripts found [here](https://rustdesk.com/docs/en/self-host/client-deployment/).

You can fix the Password is required and use a reverse Base64 string in the format `{"host":"HOSTADDRESS","key":"HOSTKEY","api":"http://HOSTADDRESS:21114"}` to automatically configure the clients, this is available automatically with RustDesk Server Pro via the console.

You can also use the steps from [above](/docs/en/self-host/client-configuration/#setup-using-import-or-export) to export the string, remove any `=` at the start or end of the string. Restart RustDesk Client if settings don't show.

#### Put config in rustdesk.exe file name (Windows only)

Change `rustdesk.exe` to rustdesk-`host=<host-ip-or-name>,key=<public-key-string>`.exe, e.g. rustdesk-`host=192.168.1.137,key=xfdsfsd32=32`.exe. You can see the config result in the About Window below.

As a `Pro` user you will be able to retrieve the whole encrypted string from the [web console](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/) then download and rename the RustDesk Client exe, you can upload this somewhere easy for your customers to use.

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

<a name="invalidchar"></a>
{{% notice note %}}
You need to set both `host` and `key`, missing either one will not work.

Optionally add a `,` (comma) character after the key, before the `.exe` part as a delimiter, to avoid the key being mangled if Windows or the browser renames the file when downloading duplicated names.

If there are invalid characters in the key which can not be used in a Windows file name, please remove the
`id_ed25519` file from your server and restart `hbbs`/`hbbr`. This will cause the `id_ed25519.pub` file to regenerate. You may need to
repeat this process until you get valid characters.
{{% /notice %}}


### [Hardcoding](/docs/en/self-host/client-configuration/hardcode-settings/)

### Logging your user in (RustDesk Server Pro)
To sign in with RustDesk Server Pro, ensure your client is setup correctly, click on `Settings` and click `Account` and then `Login`, enter username and password and then Login.

### Taking Control of other machines
Before Taking Control when using with RustDesk Server Pro ensure you are logged in.

After that you can enter the client ID and password of the machine you want to take control of and click `Connect`.

### Address book (RustDesk Server Pro)
To add devices to your address book, after you have connected to a device they will be in your recent sessions, next to the device you can now click the Menu button [ &#8942; ] and add to your address book, if you have saved the password and set permanent passwords on the client this will also be synced across devices you log in to to allow access from anywhere.

You can add and assign Tags in your address book to help organize devices as well as search for them.

### Group (RustDesk Server Pro)
By default once signed in all devices connected to your RustDesk Server Pro will show up in group, (you will still need the passwords for unattended access but all devices are now there), it will show any other users in your group and if you assign cross group access in the web console it will show users in those groups as well https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/#add-new-groups.

If you would like to add devices to your own address book, you can click on the Menu button [ &#8942; ] next to the device and click `Add to address book`.
