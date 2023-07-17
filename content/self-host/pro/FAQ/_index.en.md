---
title: FAQ
weight: 600
---

## How can I install with the Simple Install Script?
1. Get your license from [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), check [license](/docs/en/self-host/pro/license) page for more details.
2. Spin up a VPS, bare metal or Linux VM.
3. If you want to use DNS and SSL create a DNS name i.e. `rustdesk.yourdomain.com`.
4. Go to [this page](https://rustdesk.com/docs/en/self-host/pro/installscript/#install).
5. Copy and paste the command into your Linux terminal.
6. Follow the prompts as they guide you through the install.
7. Once the install is complete go to `https://rustdesk.yourdomain.com` or `http://youripaddress:21114`.
8. Log in with the username `admin` and password `test1234`.
9. Enter your license code purchased in step 1.

## How can I convert from RustDesk Server Open Source to RustDesk Server Pro?
1. Get your license from [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), check [license](/docs/en/self-host/pro/license) page for more details.
2. Open TCP port 21114.
3. Log into your RustDesk Server.
4. If you didn't already use DNS and want to use SSL create a DNS name i.e. `rustdesk.yourdomain.com`.
5. Go to [this page](https://rustdesk.com/docs/en/self-host/pro/installscript/#convert-from-open-source).
6. Copy and paste the command into your Linux terminal.
7. Follow the prompts as they guide you through the install.
8. Once the install is complete go to `https://rustdesk.yourdomain.com` or `http://youripaddress:21114`.
9. Log in with the username `admin` and password `test1234`.
10. Enter your license code purchased in step 1.

## There is a new version of RustDesk Server Pro out, how can I upgrade?
1. Go to [this page](https://rustdesk.com/docs/en/self-host/pro/installscript/#upgrade).
2. Copy and paste the command into your Linux terminal.
3. Follow the prompts as they guide you through the upgrade.

## I installed with the scripts, how can I start and stop services?
The services use systemd so can be started and stopped using `sudo systemctl stop|start|restart rustdesk-hbbs|rustdesk-hbbr` e.g. `sudo systemctl restart rustdesk-hbbs`.

## I installed with the scripts, how can I view the Linux logs?
The logs are stored in /var/log/rustdesk-server, you can view them using `tail /var/log/rustdesk-server/hbbs.log` or `tail /var/log/rustdesk-server/hbbs.error`.

## I installed with the scripts, how can I check the status of the RustDesk services?
To check the status `sudo systemctl status rustdesk-hbbs|rustdesk-hbbr` e.g. `sudo systemctl status rustdesk-hbbs`.

## How can I install RustDesk Server Pro on Windows?
1. Get your license from [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), check [license](/docs/en/self-host/pro/license) page for more details.
2. Download the the windows installer from [GitHub](https://github.com/rustdesk/rustdesk-server-pro/releases/latest).
3. Unzip the windows installer.
4. Run the Installer and follow the steps on screen.
5. Once its completed open RustDeskServer.
6. Follow the prompts as they guide you through the install.
7. Click `Services` and then `Start`.
8. Once the install is complete go to `http://youripaddress:21114`.
9. Log in with the username `admin` and password `test1234`.
10. Enter your license code purchased in step 1.

## How can I change the admin password?
1. Go to `https://rustdesk.yourdomain.com` or `http://youripaddress:21114`.
2. Log in with the username `admin` and password `test1234`.
3. Click on `admin` in the top right hand corner.
4. Click on `Settings`.
5. Enter your new password in the boxes provided.

## How can I delete the default `admin` user?
1. Create another account with `administrator` enabled.
2. Log in with the new administrative account.
3. Delete the `admin` on `Users` page.

## How can I setup my relay servers?
1. Go to `Settings` on the left hand menu.
2. Click on `Relay` on the sub-menu.
3. Click `+` next to `Relay Servers`.
4. Enter the Relay server DNS address or IP address in the box which now shows and press Enter.
5. If you have more than one Relay server you can keep clicking `+` and adapt the Geo settings is required (remember and copy your key to the other servers).

## How can I set or change the license?
1. Go to `Settings` on the left hand menu.
2. Click on `License` on the sub-menu.
3. Click `Edit` and paste in your license code.
4. Click `OK`.

## How can I move my license to a new server?
Please see [here](https://rustdesk.com/docs/en/self-host/pro/license/#invoices-and-migration).

## How can I view the logs?
On the left hand side click on `Logs`.

## How can I setup Emails?
Gmail in this example

1. Go to `Settings` on the left hand menu.
2. Click on `SMTP` on the sub-menu.
3. Enter the SMTP address `smtp.gmail.com`.
4. Enter the Port 587 in `SMTP Port`.
5. Enter the Gmail account i.e. `myrustdeskserver@gmail.com` in `Mail Account`.
6. Enter your password (you might need an app password).
7. Enter your Gmail account i.e. `myrustdeskserver@gmail.com` in `From `.
8. Click `Check` to save.

## Emails aren't working from my VPS
A lot of VPS providers block ports 465 and 25.

A simple way to check is using telnet. To test in the Linux terminal type `telnet your.mailserver.com 25`. On Windows use PowerShell with `Test-NetConnection -ComputerName your.mailserver.com -Port 25`.

Your mail server may not be using port 25. Please make sure you are using the correct ports.

## How can I get RustDesk IDs from agents on my network or using an RMM type system?
Run the following command elevated to SYSTEM: `"C:\Program Files\RustDesk\RustDesk.exe" --get-id`

## How can I set a persistent password on an agent on my network or using an RMM type system?
On Windows you can use the following PowerShell script:
```
$ErrorActionPreference = 'silentlycontinue'

net stop rustdesk > null
$ProcessActive = Get-Process rustdesk -ErrorAction SilentlyContinue
if($ProcessActive -ne $null)
{
stop-process -ProcessName rustdesk -Force
}

$rustdesk_pw = (-join ((65..90) + (97..122) | Get-Random -Count 12 | % {[char]$_}))
Start-Process "$env:ProgramFiles\RustDesk\RustDesk.exe" "--password $rustdesk_pw" -wait
Write-Output $rustdesk_pw

net start rustdesk > null
```

## I have installed RustDesk Server Pro manually but the API web console isn't behind SSL, how can I secure this?
Use a proxy like Nginx, the simple install script has one, it's really simple. [This is how we do it](https://github.com/rustdesk/rustdesk-server-pro/blob/493ad90daf8815c3052ff4d0d4aa9cc07e411efa/install.sh#L252).

Similar configs should work with Traefik v2, HAProxy, Apache Proxy and Cloudflare Tunnel.

## How can I file a bug report?
Please file via [GitHub](https://github.com/rustdesk/rustdesk-server-pro/issues).

## How can I get a trial?
Please get in touch with our [sales](mailto://sales@rustdesk.com) team.

## Why if I am self hosting is this not free and open source?
1. RustDesk has become a full time job for a number of people, they have lives, wives, jobs and kids which all demands attention and costs money!
2. We want to be here and still making great progress in years to come.
3. The open source version will continue to be open source and we encourage others to make developments in line with the AGPL license.

## Do you offer hosting for RustDesk Server Pro?
Please get in touch with our [sales](mailto://sales@rustdesk.com) team.

## Is there somewhere I can see video setup guides?
Yes! We have a [YouTube Channel](https://youtube.com/@RustDesk).
