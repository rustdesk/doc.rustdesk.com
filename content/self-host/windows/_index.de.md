---
title: Windows & pm2 or NSSM
weight: 20
---

## Optionen
Es gibt 2 Möglichkeiten: entweder man nutzt pm2 (einfacher) oder NSSM (etwas komplizierter) um den rustdesk Server zu starten.
Es gibt einige Vorteile bei NSSM:
- Abwärtskompatibilität mit älteren Windows Versionen (Windows Server 2008R2/Windows 7 und früher aber ungetestet).
- Ideal für Windows Server
- Auto start beim Booten ohne Login (Der Nutzer, der den Autostart Eintrag generiert hat, muss nicht eingeloggt sein für den Start).
- Beide Programme laufen als ein Service.
- Standalone (Keine Abhängigkeit auf nodejs)

Die Vorteile von pm2 beinhalten:
- Wenn der Server auf dem normalen PC/Arbeitsstation läuft
- man ist als Nutzer angemeldet
- einfacher einzurichten

## Installation mittels NSSM

### Installation von NSSM
Bitte [lade](http://nssm.cc/release/nssm-2.24.zip) herunter und entpacke NSSM. Nutze die entsprechende Architektur des Windows System (wenn 32 Bit x86 nutze den Inhalt des win32 Ordners, wenn 64 Bit x64 nutze den win64 Ordner). Es ist auch sinnvoll das Programm NSSM unter `Program Files\NSSM` (wenn NSSM als Dienst/Service läuft kann es nicht mehr verschoben werden. Daher ist die Ablage unter Program files sinnvoll) des Installationslaufwerks abzulegen (Im Allgemeinen Laufwerk C:). 
Es ist auch anzuraten den Pfad (wie oben beschrieben `C:\Program Files\NSSM`) zur path Variablen hinzuzufügen. 


### Überprüfen ob NSSM korrekt installiert ist
Wenn alles korrekt ist sollte das Verzeichnis `C:\Program Files\NSSM` (als Beispiel, der gewählte Pfad kann anders sein) nur die Datei `nssm.exe` enthalten. 

Wir nutzen weiter `C:\Program Files\NSSM` in dieser Anleitung

Öffne die Eingabeaufforderung (cmd bzw. Windowstaste + r) und starte `nssm`. Wenn eine Hilfeseite erscheint kann zum nächsten Schritt übergegangen werden

### Starte hbbr und hbbs
Lade die Windows Version des [Serverprogramms](https://github.com/rustdesk/rustdesk-server/releases) herunter.
Entpacke das Programm nach `C:\Program Files\RustDesk Server` (oder wohin gewünscht. Zu beachten ist: nachdem es als Dienst/Service eingerichtet wurde kann es nicht mehr verschoben werden). Jetzt wieder in der Eingabeaufforderung (cmd)

In diesem Beispiel nutzen wir `C:\Program Files\RustDesk Server`
```cmd
nssm install "RustDesk hbbs service" "C:\Program Files\RustDesk Server\hbbs.exe" -r 0.0.0.0 -k _
nssm install "RustDesk hbbr Service" "C:\Program Files\RustDesk Server\hbbr.exe" -k _
```
**Hinweis:**
- Man kann statt `RustDesk hbbs service` einen beliebigen Namen wählen
- Man kann statt `RustDesk hbbr service` einen beliebigen Namen wählen
- Man kann statt `C:\Program Files\RustDesk Server\hbbs.exe` ein anderes Verzeichnis für die Programme nutzen
- Man kann statt `C:\Program Files\RustDesk Server\hbbr.exe` ein anderes Verzeichnis für die Programme nutzen
- Man braucht die `-k _` nicht unbedingt zu nutzen. Diese ist optional, es dient nur der besseren Sicherheit

**Befehlsvorlage:**

Die Befehle zum Copy Pasten:

```cmd
nssm install <Gewünschter hbbs Servicename> <RustDesk hbbs Programmpfad> <RustDesk hbbs Optionen>
nssm install <Gewünschter hbbr Servicename> <RustDesk hbbr Programmpfad> <RustDesk hbbr Optionen>
```

**Start der Dienste/Services**
Nach der Installation können die Dienste folgendermaßen gestartet werden:
```cmd
nssm start <Gewählter hbbs Servicename>
nssm start <Gewählter hbbr Servicename>
```


**Fertig !**

(Die Methoden oben wurden auf einem Windows Server Core 2022 Standard getestet).

## oder

## Installation mittels pm2

### Installation von NodeJs

Bitte [lade](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi) herunter und installiere NodeJS.
NodeJs is die Laufzeitumgebung von pm2, daher muss NodeJs als erstes installliert werden.

### Installation von pm2

Gib die folgenden Befehle in `cmd.exe` ein und drücke <kbd>Enter</kbd> nach jeder Zeile um sie Zeile für Zeile auszuführen.

```cmd
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### Starte hbbr und hbbs

Lade die Windows Version der [Serverprogramme](https://github.com/rustdesk/rustdesk-server/releases) herunter. Entpacke die Programme auf Laufwerk C: . Führe die folgenden 4 Befehle aus (achte darauf den Parameter `-r` anzupassen):

```cmd
cd c:\rustdesk-server-windows-x64
pm2 start hbbs.exe -- -r <Der Host wo hbbr läuft>
pm2 start hbbr.exe 
pm2 save
```

### Die Logs betrachten

```cmd
pm2 log hbbr
pm2 log hbbs
```


[English](/docs/en/self-host/windows)
