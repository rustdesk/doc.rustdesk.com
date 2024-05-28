---
title: Windows und PM2 oder NSSM
weight: 20
---

{{% notice note %}}
Die Sicherheitsrichtlinien von Windows sind knifflig. Wenn diese Anleitung bei Ihnen nicht funktioniert oder Sie eine instabile Verbindung feststellen, wechseln Sie bitte zu einem Linux-Server.
{{% /notice %}}

{{% notice note %}}
Die GUI-Version `RustDeskServer.setup.exe` wird nicht mehr gepflegt und nicht empfohlen.
{{% /notice %}}

### Optionen
Sie haben nun zwei Möglichkeiten, Sie können entweder PM2 (einfacher) oder NSSM (etwas schwieriger) verwenden, um den RustDesk-Server zu starten.
Die Verwendung von NSSM hat einige Vorteile:
- Abwärtskompatibilität mit älteren Windows-Versionen (Windows Server 2008 R2/Windows 7 und früher, obwohl nicht getestet).
- Ideal für Windows-Server
- Automatischer Start beim Booten ohne Anmeldung (Der Benutzer, der den Starteintrag erstellt hat, muss sich nicht anmelden, damit es startet).
- Beide Binärdateien werden als Dienste ausgeführt.
- Eigenständig (keine Abhängigkeit von Node.js)

Die Vorteile von PM2 sind unter anderem:
- Eine gute Idee, wenn Sie den Server auf demselben Computer wie Ihren Hauptarbeitsrechner betreiben.
- Sie melden sich regelmäßig mit dem Benutzer an, der den RustDesk-Starteintrag erstellt hat.
- Mehr Benutzerfreundlichkeit

### Installation mit NSSM

#### NSSM installieren
Bitte laden Sie [NSSM](https://github.com/dkxce/NSSM/releases/download/v2.25/NSSM_v2.25.zip) herunter, extrahieren Sie es und wählen Sie die entsprechende
Architektur für Ihr Windows-System (für x86 verwenden Sie den Inhalt des win32-Ordners, für x64 den
Inhalt des win64-Ordners). Es ist auch sinnvoll, die Binärdatei von NSSM nach `Program Files\NSSM` zu verschieben.
Wenn NSSM einmal als Dienst gestartet wurde, kann es nicht mehr aus dem Ordner verschoben werden, in dem es abgelegt wurde.
Daher ist es am besten, sie im Ordner `Program Files` Ihres Installationslaufwerks (in der Regel das Laufwerk C:) zu verstauen.
Es ist auch ratsam, den Pfad (z. B. `C:\Program Files\NSSM`) in die Pfadvariable aufzunehmen.

#### Prüfen, ob NSSM korrekt installiert ist
Wenn Sie alles richtig gemacht haben, sollte der Ordner `C:\Program Files\NSSM`
(in diesem Beispiel Laufwerk C:, der Pfad ist aber frei wählbar)
nur die Datei `nssm.exe` enthalten.

In diesem Beispiel wird `C:\Program Files\NSSM` verwendet.

Öffnen Sie die Eingabeaufforderung und führen Sie `nssm` aus. Wenn Sie eine Hilfeseite sehen, können Sie mit dem nächsten Schritt fortfahren.

#### hbbr und hbbs ausführen
Laden Sie die Windows-Version von [RustDesk Server](https://github.com/rustdesk/rustdesk-server/releases) herunter.
Entpacken Sie das Programm nach `C:\Program Files\RustDesk Server` oder wo immer Sie wollen. Stellen Sie nur sicher,
dass sich der Ort nach der Installation des Dienstes nicht ändert. Gehen Sie nun zurück zur Eingabeaufforderung.

In diesem Beispiel wird `C:\Program Files\RustDesk Server` verwendet.
```cmd
nssm install "RustDesk hbbs service" "C:\Program Files\RustDesk Server\hbbs.exe"
nssm install "RustDesk hbbr service" "C:\Program Files\RustDesk Server\hbbr.exe"
```
**Hinweise:**
- Sie können `RustDesk hbbs service` in einen beliebigen Namen für den Dienst hbbs ändern.
- Sie können `RustDesk hbbr service` in einen beliebigen Namen für den Dienst hbbr ändern.
- Sie können `C:\Programme\RustDesk Server\hbbs.exe` in den Ort ändern, an dem Sie die RustDesk-Binärdateien abgelegt haben.
- Sie können `C:\Programme\RustDesk Server\hbbr.exe` in den Ort ändern, an dem Sie die RustDesk-Binärdateien abgelegt haben.

**Befehlsvorlagen:**

Die Befehlsvorlage ist für den Fall, dass Sie nur kopieren, einfügen und bearbeiten möchten.

```cmd
nssm install <Gewünschter hbbs-Dienstname> <RustDesk hbbs-Programmpfad> <RustDesk hbbs-Parameter>
nssm install <Gewünschter hbbr-Dienstname> <RustDesk hbbr-Programmpfad> <RustDesk hbbr-Parameter>
```

**Dienste starten**

Nach erfolgreicher Installation der Dienste müssen diese gestartet werden.
```cmd
nssm start <Gewünschter hbbs-Dienstname>
nssm start <Gewünschter hbbr-Dienstname>
```

**Fertig!**

(Die obige Methode wurde auf einem Windows Server Core 2022 Standard getestet).

### oder

### Installation mit PM2

#### Node.js installieren

Bitte Node.js [herunterladen](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi) und installieren.
Node.js ist die Laufzeitumgebung von PM2, Sie müssen also zuerst Node.js installieren.

#### PM2 installieren

Öffnen Sie die Eingabeaufforderung und führen Sie Zeile für Zeile mit <kbd>Enter</kbd> aus.

```cmd
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

#### hbbr und hbbs ausführen

Laden Sie die Windows-Version von [RustDesk Server](https://github.com/rustdesk/rustdesk-server/releases) herunter. Entpacken Sie das Programm auf Laufwerk C:. Führen Sie die folgenden vier Befehle aus:

```cmd
cd C:\rustdesk-server-windows-x64
pm2 start hbbs.exe
pm2 start hbbr.exe
pm2 save
```

#### Protokoll anzeigen

```cmd
pm2 log hbbr
pm2 log hbbs
```

### Alternative Anleitungen
https://pedja.supurovic.net/setting-up-self-hosted-rustdesk-server-on-windows/?lang=lat
