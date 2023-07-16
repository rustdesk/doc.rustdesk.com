---
title: FAQ
weight: 600
---

## How Do I install with the Simple Install Script?
1. Get your license from [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), check [license](/docs/en/self-host/pro/license) page for more details.
2. Spin up a VPS, bare metal or linux VM.
3. If you want to use DNS and SSL create a DNS name ie `rustdesk.yourdomain.com`.
4. Go to [this page](https://rustdesk.com/docs/en/self-host/pro/installscript/#install).
5. Copy and paste the command into your linux terminal.
6. Follow the prompts as they guide you through the install.
7. Once the install is complete go to `https://rustdesk.yourdomain.com` or `http://youripaddress:21114`.
8. Log in with the username `admin` and password `test1234`.
9. Enter your license code purchased in step 1.

## How Do I convert from RustDesk Server Opensource to RustDesk Server Pro?
1. Get your license from [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), check [license](/docs/en/self-host/pro/license) page for more details.
2. Open port 21114 TCP.
3. Log into your RustDesk Server.
4. If you didnt already use DNS and want to use SSL create a DNS name ie `rustdesk.yourdomain.com`.
5. Go to [this page](https://rustdesk.com/docs/en/self-host/pro/installscript/#convert-from-open-source).
6. Copy and paste the command into your linux terminal.
7. Follow the prompts as they guide you through the install.
8. Once the install is complete go to `https://rustdesk.yourdomain.com` or `http://youripaddress:21114`.
9. Log in with the username `admin` and password `test1234`.
10. Enter your license code purchased in step 1.

## There is a new version of RustDesk Server Pro out, how do I upgrade?
1. Go to [this page](https://rustdesk.com/docs/en/self-host/pro/installscript/#upgrade).
2. Copy and paste the command into your linux terminal.
3. Follow the prompts as they guide you through the upgrade.

## I installed with the scripts how do I start and stop services?
The services use systemd so can be started and stopped using `sudo systemctl stop|start|restart rustdesk-hbbs|rustdesk-hbbr` eg `sudo systemctl restart rustdesk-hbbs`

##  I installed with the scripts how do I view the linux logs
The logs are stored in /var/log/rustdesk-server/, you can view them using `tail /var/log/rustdesk-server/hbbs.log` or `tail /var/log/rustdesk-server/hbbs.error`.

## I installed with the scripts how do I check the status of the RustDesk services
To check the status `sudo systemctl status rustdesk-hbbs|rustdesk-hbbr` eg `sudo systemctl status rustdesk-hbbs`

## How I install RustDesk Server Pro on Windows?
1. Get your license from [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), check [license](/docs/en/self-host/pro/license) page for more details.
2. Download the the windows installer from [github](https://github.com/rustdesk/rustdesk-server-pro/releases/latest).
3. Unzip the windows installer.
4. Run the Installer and follow the steps on screen.
5. Once its completed open RustDeskServer .
6. Follow the prompts as they guide you through the install.
7. Click `Services` and then `Start`
8. Once the install is complete go to `http://youripaddress:21114`.
9. Log in with the username `admin` and password `test1234`.
10. Enter your license code purchased in step 1.

## How do I change the admin password?
1. Go to `https://rustdesk.yourdomain.com` or `http://youripaddress:21114`.
2. Log in with the username `admin` and password `test1234`.
3. Click on `admin` in the top right hand corner.
4. Click on `Settings`.
5. Enter your new password in the boxes provided.

## How do I delete the default `admin` user?
1. Create another account with `administrator` enabled
2. Log in with the new administrative account
3. Delete the `admin` on `Users` page

## How do I setup my relay servers?
1. Go to `Settings` on the left hand menu.
2. Click on `Relay` on the sub-menu.
3. Click `+` next to `Relay Servers`.
4. Enter the Relay server DNS address or IP address in the box which now shows and press Enter.
5. If you have more than one Relay server you can keep clicking `+` and adapt the Geo settings is required (remember and copy your key to the other servers).

## How do I set or change the license?
1. Go to `Settings` on the left hand menu.
2. Click on `License` on the sub-menu.
3. Click `Edit` and paste in your license code.
4. Click `Ok`.

## I want to move my license to a new server
[Please see here](https://rustdesk.com/docs/en/self-host/pro/license/#invoices-and-migration)

## How do I view the logs?
On the left hand side click on `Logs`.

## How do I setup Emails?
Gmail in this example

1. Go to `Settings` on the left hand menu.
2. Click on `SMTP` on the sub-menu.
3. Enter the SMTP address `smtp.gmail.com`.
4. Enter the Port 587 in ¬SMTP Port`.
5. Enter the gmail account ie `myrustdeskserver@gmail.com` in `Mail Account`
6. Enter your password (you might need an app password).
7. Enter your gmail account ie `myrustdeskserver@gmail.com` in `From `.
8. Click `Check` to save.

## Email's arent working from my VPS
Alot of VPS providers block ports 465 and 25.

A simple way to check is is using telnet to test in the linux terminal type `telnet your.mailserver.com 25` on windows use `Test-NetConnection -ComputerName your.mailserver.com -Port 25`

Your mail server might not us port 25 please make sure you use the correct ports.

## How can I get RustDesk IDs from agents on my network or using an RMM type systen?
Run the following command elevated to SYSTEM   `"c:\Program Files\RustDesk\RustDesk.exe" --get-id`

## How can I set a persistent password on an agent on my network or using an RMM type system?
On Windows you can use the following powershell script:
```
$ErrorActionPreference= 'silentlycontinue'

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
Use a proxy like nginx, the simple install script has one, its really simple [[https://github.com/dinger1986/rustdesk-server-pro](https://github.com/rustdesk/rustdesk-server-pro)/blob/493ad90daf8815c3052ff4d0d4aa9cc07e411efa/install.sh#L252](this is how we did it).

Similar configs should work with Traefikv2, HAProxy, Apache Proxy and Cloudflare Tunnel.

## How do I file a bug report?
Please file via [https://github.com/rustdesk/rustdesk-server-pro/issues](GitHub)
