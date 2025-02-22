---
title: Windows Install
weight: 4
---

{{% notice note %}}
Windows security policy is tricky, if this tutorial does not work for you, or you encounter unstable connection, please migrate to a Linux server.
{{% /notice %}}

{{% notice note %}}
The GUI version, `RustDeskServer.setup.exe` has not been maintained any more, not recommended.
{{% /notice %}}

### Install

1. Get your license from [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), check [license](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) page for more details.
2. Download the the Windows installer from [GitHub](https://github.com/rustdesk/rustdesk-server-pro/releases/latest).
3. Unzip the Windows installer.
4. Run the Installer and follow the steps on screen. Or manually install with [PM2 or NSSM](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/windows/).
5. Once its completed open RustDesk Server.
6. Follow the prompts as they guide you through the install.
7. Click `Services` and then `Start`.
8. Once the install is complete go to `http://youripaddress:21114`.
9. Log in with the username `admin` and password `test1234`.
10. Enter your license code purchased in step 1.

### Use IIS as Proxy

Please ensure `Dynamic Content Compression` is installed (this is an IIS Feature which can be installed with Server Roles).
1. Open IIS (Or install it).
2. Create a new website for RustDesk with the bindings (Ideally 443) and relevant certificate. Basic settings should point this to a blank folder. (If you use the default site, make sure there are no other files in the folder).
3. On IIS, install [Application Request Routing](https://www.iis.net/downloads/microsoft/application-request-routing) and [URL Rewrite](https://learn.microsoft.com/en-us/iis/extensions/url-rewrite-module/using-the-url-rewrite-module).

### Application Request Routing

1. Under the IIS Server Host open Application Request Routing.
2. Go to Server Proxy Settings.
3. Enable proxy and all settings will appear, you can leave them as the defaults.
4. Save the settings and we can go to the next step: URL Rewrite.

### URL Rewrite

1. Open the site on IIS on the left pane and double-click on URL Rewrite.
2. Click `Add rules`.
3. Set up a new reverse proxy rule.
4. Setup the local address (the 21114 address) \
Inbound Rule – the RustDesk internal 21114 address \
Outbound Rules – `From` is the RustDesk internal 21114 address and `To` is the external address. \
Note: No http / https before the addresses – they are automatically handled. Also, ensure all the addresses are accessible both internally and externally.

### Compression

1. Disable `Dynamic Content Compression`.

### Troubleshooting

If you have an error 500.52 add the mentioned variables: [IIS acting as reverse proxy: Where the problems start](https://techcommunity.microsoft.com/t5/iis-support-blog/iis-acting-as-reverse-proxy-where-the-problems-start/ba-p/846259).

You maybe need to change your SSL Settings to "Require SSL → Ignore".
