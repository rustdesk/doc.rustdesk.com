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

### Log in

The default port of the web console is 21114. Enter `http://<hbbs host>:21114` in the browser to enter the console page, as shown in the following figure. The default administrator username/password is admin/test1234:

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-login.png)

If you need HTTPS support, please install a web server such as `Nginx` or use `IIS` for Windows.

After logging in please be sure to change the password, select `Settings` in the account menu in the upper right corner to enter the password modification page, as shown in the following figure. You can also create another administrator account and delete this one. You'd better enable email login verification.

<a name=console-home></a>
![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

Non-administrator users can also login to browse their device and logs, change their user settings.

### Automatic Configs
By Clicking on `Windows EXE` you will be able to get the configs for your own RustDesk Server Pro, this will help configure your clients.

For Windows clients, you can leave out the custom server configuration and put the configuration information in the `rustdesk.exe` filename instead. As shown above, please go to the console welcome page and click on `Windows EXE`. **Client ≥ 1.1.9 required.**

You can use this in conjunction with [client config](https://rustdesk.com/docs/en/self-host/client-configuration/) and [deployment scripts](https://rustdesk.com/docs/en/self-host/client-deployment/) to setup your clients.

### Creating a new user other than the default `admin` user
1. Click on `Users` on the left hand menu.
2. Create another account with `administrator` enabled.
3. Log in with the new administrative account.
4. Delete the `admin` on `Users` page.

### Creating a new user
1. Click on `Users` on the left hand menu.
2. Create a new user.
3. Select what group they should be in (if you need to add new groups please keep reading).

### Add a new Group
1. Click on `Groups` on the left hand menu.
2. Create a new group.
3. Once created you can allow groups access each other, Click `Edit`.
4. Select the relevant groups you want access (it automatically adds them in the corresponding group).

### Setting up multiple relay servers
1. Go to `Settings` on the left hand menu.
2. Click on `Relay` on the submenu.
3. Click `+` next to `Relay Servers`.
4. Enter the Relay server DNS address or IP address in the box which now shows and press <kbd>Enter</kbd>.
5. If you have more than one Relay server you can keep clicking `+` and adapt the Geo settings is required (remember and copy your key to the other servers).

### Set or change the license
1. Go to `Settings` on the left hand menu.
2. Click on `License` on the submenu.
3. Click `Edit` and paste in your license code.
4. Click `OK`.

### Viewing Logs
On the left hand side click on `Logs`.

### Setup Emails
Gmail in this example

1. Go to `Settings` on the left hand menu.
2. Click on `SMTP` on the submenu.
3. Enter the SMTP address `smtp.gmail.com`.
4. Enter the Port 587 in `SMTP Port`.
5. Enter the Gmail account i.e. `myrustdeskserver@gmail.com` in `Mail Account`.
6. Enter your password (you might need an app password).
7. Enter your Gmail account i.e. `myrustdeskserver@gmail.com` in `From`.
8. Click `Check` to save.

### Assign Device Users and Groups to Devices
The User is the RustDesk User logged in on the device or assigned to the device by clicking `Edit` next to the device, click in the `User` box and drop-down to select your user, this will auto assign the group based on the group the user as been assigned to.

This can also be done via the API at command line on deployment or later by calling the RustDesk executable followed by `--assign --token <generatedtoken> --user_name <username>`. You need to go to "Settings → Tokens → Create" and create a token with Device permissions first to do this. An example of this on windows would be `"C:\Program Files\RustDesk\rustdesk.exe" --assign --token <generatedtoken> --user_name <newuser>`.

### Searching for a device
1. Go to Devices.
2. In the Device Name Search Field type in the name and click `Query` or hit <kbd>Enter</kbd>.
3. To use a wildcard add `%` at the start, end or both of the search term.
