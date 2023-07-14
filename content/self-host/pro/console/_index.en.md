---
title: Web Console
weight: 10
---

Features:

- Add/modify users and user groups
- Modify device access permissions
- Browse device connection logs and the other logs
- Update settings
- Manage client settings sync strategies

## Log in

As mentioned earlier, the default port of the web console is 21114. Enter `http://<hbbs host>:21114` in the browser to enter the console page, as shown in the following figure (hbbs runs on the ip 192.168.1.143 server):
![](/docs/en/self-host/pro/console/images/console-login.png)

If you need https support, please install a web server such as `Nginx`.

The default administrator username/password is admin/test1234, please be sure to change the password after logging in, select "Settings" in the account menu in the upper right corner to enter the password modification page, as shown in the following figure. You can also create another administrator account and delete this one. You'd better enable email login verification.
<a name=console-home></a>
![](/docs/en/self-host/pro/console/images/console-home.png?v2)

Non-administrator users can also login to browser their device and logs, change their user settings.

## Windows EXE

For Windows clients, you can leave out the custom server configuration and put the configuration information in the `RustDesk.exe` filename instead. As shown above, please go to the console welcome page and click on `Windows EXE`. **`Client >=1.1.9 Required`**。