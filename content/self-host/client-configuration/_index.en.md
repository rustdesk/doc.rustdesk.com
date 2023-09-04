---
title: Client Configuration
weight: 300
pre: "<b>2.3. </b>"
---

### Overview

There are a number of ways to configure RustDesk clients to use your own self-hosted server, we will cover some below.

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

You can also use the steps from [above](/docs/en/self-host/client-configuration/#setup-using-import-or-export) to export the string then reverse it using [this site](https://string-functions.com/reverse.aspx).

#### Put config in rustdesk.exe file name (Windows only)

Change `rustdesk.exe` to rustdesk-`host=<host-ip-or-name>,key=<public-key-string>`.exe, e.g. rustdesk-`host=192.168.1.137,key=xfdsfsd32=32`.exe. You can see the config result in the About Window below.

<a name="invalidchar"></a>
{{% notice note %}}
You need to set both `host` and `key`, missing either one will not work.

Optionally add a `,` (comma) character after the key, before the `.exe` part as a delimiter, to avoid the key being mangled if Windows or the browser renames the file when downloading duplicated names.

If there are invalid characters in the key which can not be used in a Windows file name, please remove the
`id_ed25519` file from your server and restart `hbbs`/`hbbr`. This will cause the `id_ed25519.pub` file to regenerate. You may need to
repeat this process until you get valid characters.
{{% /notice %}}

### [Hardcoding](/docs/en/self-host/client-configuration/hardcode-settings/)
