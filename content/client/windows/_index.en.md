---
title: Windows
weight: 1
---

Install from our [GitHub](github.com/rustdesk/rustdesk)

### Put config in rustdesk.exe file name (Windows only)

Change `rustdesk.exe` to rustdesk-`host=<host-ip-or-name>,key=<public-key-string>`.exe, e.g. rustdesk-`host=192.168.1.137,key=xfdsfsd32=32`.exe. You can see the config result in the About Window below.

<a name="invalidchar"></a>
{{% notice note %}}
You need to set both `host` and `key`, missing either one will not work.

Optionally add a `,` (comma) character after the key, before the `.exe` part as a delimiter, to avoid the key being mangled if Windows or the browser renames the file when downloading duplicated names.

If there are invalid characters in the key which can not be used in a Windows file name, please remove the
`id_ed25519` file from your server and restart `hbbs`/`hbbr`. This will cause the `id_ed25519.pub` file to regenerate. You may need to
repeat this process until you get valid characters.
{{% /notice %}}
