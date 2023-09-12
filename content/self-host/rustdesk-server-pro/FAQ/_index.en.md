---
title: FAQ
weight: 600
---

## How can I install with the Simple Install Script?
1. Get your license from [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), check [license](/docs/en/self-host/rustdesk-server-pro/license) page for more details.
2. Spin up a VPS, bare metal or Linux VM.
3. If you want to use DNS and SSL create a DNS name i.e. `rustdesk.yourdomain.com`.
4. Go to [this page](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#install).
5. Copy and paste the command into your Linux terminal.
6. Follow the prompts as they guide you through the install.
7. Once the install is complete go to `https://rustdesk.yourdomain.com` or `http://youripaddress:21114`.
8. Log in with the username `admin` and password `test1234`.
9. Enter your license code purchased in step 1.

## How can I convert from RustDesk Server Open Source to RustDesk Server Pro?
1. Get your license from [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), check [license](/docs/en/self-host/rustdesk-server-pro/license) page for more details.
2. Open TCP port 21114.
3. Log into your RustDesk Server.
4. If you didn't already use DNS and want to use SSL create a DNS name i.e. `rustdesk.yourdomain.com`.
5. Go to [this page](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#convert-from-open-source).
6. Copy and paste the command into your Linux terminal.
7. Follow the prompts as they guide you through the install.
8. Once the install is complete go to `https://rustdesk.yourdomain.com` or `http://youripaddress:21114`.
9. Log in with the username `admin` and password `test1234`.
10. Enter your license code purchased in step 1.

## There is a new version of RustDesk Server Pro out, how can I upgrade?
1. Go to [this page](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/#upgrade).
2. Copy and paste the command into your Linux terminal.
3. Follow the prompts as they guide you through the upgrade.

## I installed with the script, how can I start and stop services?
The services use systemd so can be started and stopped using `sudo systemctl stop|start|restart rustdesk-hbbs|rustdesk-hbbr` e.g. `sudo systemctl restart rustdesk-hbbs`.

## I installed with the script, how can I view the Linux logs?
The logs are stored in /var/log/rustdesk-server, you can view them using `tail /var/log/rustdesk-server/hbbs.log` or `tail /var/log/rustdesk-server/hbbs.error`.

## I installed with the script, how can I check the status of the RustDesk services?
To check the status `sudo systemctl status rustdesk-hbbs|rustdesk-hbbr` e.g. `sudo systemctl status rustdesk-hbbs`.

## How can I change the admin password?
1. Go to `https://rustdesk.yourdomain.com` or `http://youripaddress:21114`.
2. Log in with the username `admin` and password `test1234`.
3. Click on `admin` in the top right hand corner.
4. Click on `Settings`.
5. Enter your new password in the boxes provided.

## How can I move my license to a new server?
Please see [here](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-and-migration).

## Emails aren't working from my VPS
A lot of VPS providers block ports 465 and 25.

A simple way to check is using telnet. To test in the Linux terminal type `telnet your.mailserver.com 25`. On Windows use PowerShell with `Test-NetConnection -ComputerName your.mailserver.com -Port 25`.

Your mail server may not be using port 25. Please make sure you are using the correct ports.

## Can I deploy RustDesk using powershell?
Sure, this script can help, replace `youraddress` and `yourkey` with your address and key for your RustDesk Server Pro Address and Key.
```ps
$ErrorActionPreference= 'silentlycontinue'

$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if($rdver -eq "1.2.1")
{
write-output "RustDesk $rdver is the newest version"

exit
}

If (!(Test-Path C:\Temp)) {
  New-Item -ItemType Directory -Force -Path C:\Temp > null
}

cd C:\Temp

powershell Invoke-WebRequest "https://github.com/rustdesk/rustdesk/releases/download/1.2.1/rustdesk-1.2.1-x86_64.exe" -Outfile "rustdesk.exe"
Start-Process .\rustdesk.exe --silent-install -wait

$ServiceName = 'Rustdesk'
$arrService = Get-Service -Name $ServiceName -ErrorAction SilentlyContinue

if ($arrService -eq $null)
{
    Start-Sleep -seconds 20
}

while ($arrService.Status -ne 'Running')
{
    Start-Service $ServiceName
    Start-Sleep -seconds 5
    $arrService.Refresh()
}
net stop rustdesk

$username = ((Get-WMIObject -ClassName Win32_ComputerSystem).Username).Split('\')[1]
Remove-Item C:\Users\$username\AppData\Roaming\RustDesk\config\RustDesk2.toml
New-Item C:\Users\$username\AppData\Roaming\RustDesk\config\RustDesk2.toml
Set-Content C:\Users\$username\AppData\Roaming\RustDesk\config\RustDesk2.toml "rendezvous_server = 'youraddress' `nnat_type = 1`nserial = 0`n`n[options]`ncustom-rendezvous-server = 'youraddress'`nkey = 'yourkey'`nrelay-server = 'youraddress'`napi-server = 'https://youraddress'"
Remove-Item C:\Windows\ServiceProfiles\LocalService\AppData\Roaming\RustDesk\config\RustDesk2.toml
New-Item C:\Windows\ServiceProfiles\LocalService\AppData\Roaming\RustDesk\config\RustDesk2.toml
Set-Content C:\Windows\ServiceProfiles\LocalService\AppData\Roaming\RustDesk\config\RustDesk2.toml "rendezvous_server = 'youraddress' `nnat_type = 1`nserial = 0`n`n[options]`ncustom-rendezvous-server = 'youraddress'`nkey = 'yourkey'`nrelay-server = 'youraddress'`napi-server = 'https://youraddress'"

net start rustdesk
```

## How can I get RustDesk IDs from agents on my network or using an RMM type system?
On Windows you can use the following PowerShell script:
```ps
$ErrorActionPreference= 'silentlycontinue'

Start-Process "$env:ProgramFiles\RustDesk\RustDesk.exe" --get-id
sleep 2
$rustdesk_id = (get-clipboard)
Write-Output $rustdesk_id
```

## How can I set a persistent password on an agent on my network or using an RMM type system?
On Windows you can use the following PowerShell script:
```ps
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

## Why if I am self hosting is this not free and open source?
1. RustDesk has become a full time job for a number of people, they have lives, wives, jobs and kids which all demands attention and costs money!
2. We want to be here and still making great progress in years to come.
3. The open source version will continue to be open source and we encourage others to make developments in line with the AGPL license.

## I can't connect to devices in different groups, why is this?
This is easily sorted, you need to allow cross-group access.
1. Add new groups.
2. Click `Edit`.
3. Select the relevant groups you want access (it automatically adds them in the corresponding group).

## How can I get configs automatically?
Configs are generated automatically.
1. Download the newest clients from [GitHub](https://github.com/rustdesk/rustdesk/releases/latest).
2. On the main page in the web console click on `Windows EXE`.
3. Fill in the host and API (if different from your config).
4. Click `Submit`.
5. Scan QR Code on Android and rename exe to what has been generated.

## Do you offer hosting for RustDesk Server Pro?
Please get in touch with our [sales](mailto://sales@rustdesk.com) team.

## Is there somewhere I can see video setup guides?
Yes! We have a [YouTube Channel](https://youtube.com/@RustDesk).

## Why are my logs are empty?
Ensure API is set on both the device being controlled and the machine controlling.
On the left hand side click on `Logs`.

## How can I uninstall RustDesk Server Pro?
Run the following commands:
```sh
sudo systemctl stop rustdesk-hbbs.service
sudo systemctl disable rustdesk-hbbs.service
sudo systemctl stop rustdesk-hbbr.service
sudo systemctl disable rustdesk-hbbr.service
sudo systemctl daemon-reload
sudo rm /etc/systemd/system/rustdesk-hbbs.service
sudo rm etc/systemd/system/rustdesk-hbbr.service
sudo rm /usr/bin/hbbs
sudo rm /usr/bin/hbbr
sudo rm -rf /var/lib/rustdesk-server/
sudo rm -rf /var/log/rustdesk-server/
```
If the script installed Nginx then remove using:
```sh
sudo apt remove nginx
```

## How can I remove devices from the device list in the web console?
Disable and then delete will now be available.

## How can I update RustDesk with PowerShell?
```ps
$ErrorActionPreference= 'silentlycontinue'

$rdver = ((Get-ItemProperty  "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\RustDesk\").Version)

if($rdver -eq "1.2.2")
{
write-output "RustDesk $rdver is the newest version."

exit
}

If (!(Test-Path C:\Temp)) {
  New-Item -ItemType Directory -Force -Path C:\Temp > null
}

cd C:\Temp

powershell Invoke-WebRequest "https://github.com/rustdesk/rustdesk/releases/download/1.2.2/rustdesk-1.2.2-x86_64.exe" -Outfile "rustdesk.exe"
Start-Process .\rustdesk.exe --silent-install -wait
```
