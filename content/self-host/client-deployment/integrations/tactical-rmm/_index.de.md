---
title: Tactical RMM
weight: 100
---

## Um Tactical RMM mit RustDesk zu verwenden, müssen Sie Folgendes tun

1. Installieren Sie Ihren eigenen Tactical RMM-Server, folgen Sie den [offiziellen Dokumenten](https://docs.tacticalrmm.com/) und öffnen Sie Ports.
2. Erstellen Sie die folgenden PowerShell-Skripte.
3. Erstellen Sie eine [URL-Aktion](https://docs.tacticalrmm.com/functions/url_actions/).
4. Erstellen Sie [benutzerdefinierte Felder](https://docs.tacticalrmm.com/functions/custom_fields/) für die RustDesk-ID und das Passwort.
5. Erstellen Sie [Sammelaufgaben](https://docs.tacticalrmm.com/functions/automated_tasks/#collector-tasks).

## Installationsskript zum Ersetzen von IPADDRESS und KEY
```ps
$ErrorActionPreference= 'silentlycontinue'

If (!(Test-Path C:\Temp)) {
  New-Item -ItemType Directory -Force -Path C:\Temp > null
}

cd C:\Temp

Invoke-WebRequest "https://github.com/rustdesk/rustdesk/releases/download/1.2.2/rustdesk-1.2.2-x86_64.exe" -Outfile "rustdesk.exe"
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
Set-Content C:\Users\$username\AppData\Roaming\RustDesk\config\RustDesk2.toml "rendezvous_server = 'IPADDRESS' `nnat_type = 1`nserial = 0`n`n[options]`ncustom-rendezvous-server = 'IPADDRESS'`nkey = 'KEY='`nrelay-server = 'IPADDRESS'`napi-server = 'https://IPADDRESS'"
Remove-Item C:\Windows\ServiceProfiles\LocalService\AppData\Roaming\RustDesk\config\RustDesk2.toml
New-Item C:\Windows\ServiceProfiles\LocalService\AppData\Roaming\RustDesk\config\RustDesk2.toml
Set-Content C:\Windows\ServiceProfiles\LocalService\AppData\Roaming\RustDesk\config\RustDesk2.toml "rendezvous_server = 'IPADDRESS' `nnat_type = 1`nserial = 0`n`n[options]`ncustom-rendezvous-server = 'IPADDRESS'`nkey = 'KEY='`nrelay-server = 'IPADDRESS'`napi-server = 'https://IPADDRESS'"

net start rustdesk
```

## RustDesk ID abfragen (Sammelskript benötigt benutzerdefiniertes Agent-Feld)

```ps
$ErrorActionPreference= 'silentlycontinue'

cd $env:ProgramFiles\RustDesk\
.\RustDesk.exe --get-id | out-host
```

## Erstellen Sie ein Skript, das als Prüfung verwendet werden soll

```
$ErrorActionPreference= 'silentlycontinue'

$confirmation_file = "C:\program files\RustDesk\rdrunonce.txt"

if ([System.IO.File]::Exists($confirmation_file)) {
    echo "Confirmation file exists"
	exit 0
}
else
{
    echo "Confirmation file doesn't exists"
	exit 1
}

```

## RustDesk Passwort setzen und abfragen (Sammelskript benötigt benutzerdefiniertes Agent-Feld)
```
$ErrorActionPreference= 'silentlycontinue'

$confirmation_file = "C:\program files\RustDesk\rdrunonce.txt"

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
        
New-Item $confirmation_file > null

```

## RustDesk URL-Aktion
```
rustdesk://connection/new/{{agent.rustdeskid}}?password={{agent.rustdeskpwd}}
```

## Benutzerdefinierte Agent-Felder hinzufügen
`rustdeskid Type = Text` </br>
`rustdeskpwd Type = Text`
