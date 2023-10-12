---
title: RustDesk-Client
weight: 2
pre: "<b>1. </b>"
---

### Einführung
Der RustDesk-Client wird auf Geräten verwendet, um sich mit unserem RustDesk-Server zu verbinden, entweder Open Source oder Pro. Er kann von [GitHub](https://github.com/rustdesk/rustdesk/releases/latest) heruntergeladen werden.

### Unterstützte Plattformen
- Microsoft Windows
- macOS
- Debian-Ableger (Ubuntu, Mint usw.)
- Redhat-Ableger (Centos, Rocky usw.)
- Arch/Manjaro
- openSUSE
- AppImage / Flatpak
- Android
- iOS (keine Unterstützung bei der Kontrolle)
- Web (1.1.9 Beta)

### Installation

#### Windows

Laden Sie die Exe von GitHub herunter und installieren Sie sie.

Zur stillen Installation rufen Sie die Installations-EXE mit `--silent-install` auf.

#### macOS

Laden Sie die DMG-Datei von GitHub herunter. Weitere Informationen finden Sie auf der [macOS-Seite](/docs/de/client/mac/).

Öffnen Sie die DMG-Datei und ziehen Sie `RustDesk` auf `Applications`.

Erlauben Sie die Ausführung von RustDesk.

Aktivieren Sie die angeforderten Berechtigungen und folgen Sie den Aufforderungen auf der linken Seite von RustDesk, um die Einrichtung abzuschließen.

#### Linux

Bitte beachten Sie die unten stehenden Anweisungen zur Installation für die verschiedenen Linux-Varianten, alle Installationsprogramme befinden sich auf GitHub.

#### Debian-Ableger (≥ 16)

```sh
# Bitte ignorieren Sie den falschen Bericht zur Festplattennutzung
sudo apt install -fy ./rustdesk-<version>.deb
```

#### CentOS/Fedora (≥ 18)

```sh
sudo yum localinstall ./rustdesk-<version>.rpm
```

#### Arch/Manjaro

```sh
sudo pacman -U ./rustdesk-<version>.pkg.tar.zst
```

#### openSUSE (≥ Leap 15.0)

```sh
sudo zypper install --allow-unsigned-rpm ./rustdesk-<version>-suse.rpm
```
#### Android
Installieren Sie die APK von unserem GitHub. Weitere Informationen finden Sie auf der [Android-Seite](/docs/de/client/android/).

#### iOS (iPhone, iPad)
Laden Sie die App aus dem [App Store](https://apps.apple.com/de/app/rustdesk-remote-desktop/id1581225015) herunter.

### Benutzung
Nach der Installation (oder der Ausführung als temporäre Datei) stellt RustDesk eine Verbindung zu den öffentlichen Servern her. Am unteren Rand erscheint die Meldung (1) "Bereit, für eine schnellere Verbindung richten Sie bitte Ihren eigenen Server ein.". Oben links sehen Sie Ihre (2) ID, Ihr (3) Einmalpasswort und rechts ein (4) Feld, mit dem Sie sich mit einem anderen Computer verbinden können, wenn Sie dessen ID kennen.

![image](/docs/en/client/images/client.png)

Um auf die Einstellungen zuzugreifen, klicken Sie auf die (5) Menü-Schaltfläche [ &#8942; ] rechts neben ID.

Unter Einstellungen finden Sie:
- Allgemein - Vermittlungsdienst, Farbgebung, Hardware-Codec, Audioeingabegerät, Aufnahme und Sprache
- Sicherheit - Genehmigungen für jemanden, der die Kontrolle übernimmt, Passwort-Optionen und die Möglichkeit, Ihre ID und die erweiterten Sicherheitseinstellungen zu ändern
- Netzwerk - Legen Sie hier Ihre eigenen Servereinstellungen und den Proxy fest
- Anzeige - Steuerung der Anzeigeeinstellungen für Fernsitzungen und andere Standardoptionen, Synchronisierung der Zwischenablage usw.
- Konto - Dies kann in Verbindung mit dem Pro-Server verwendet werden, um sich bei der API anzumelden
- Über - Zeigt Informationen über die Software an.

### RustDesk konfigurieren
Es gibt eine Reihe von Möglichkeiten, RustDesk zu konfigurieren.

Am einfachsten ist es, mit RustDesk Server Pro eine verschlüsselte Konfigurationszeichenkette zu erhalten, die in Verbindung mit `--config` verwendet werden kann, um Einstellungen zu importieren. Um dies zu tun:
1. Öffnen Sie die Befehlszeile des Betriebssystems, in dem Sie RustDesk installiert haben, d. h. `C:\Program Files\RustDesk` unter Windows, `/usr/bin` unter Linux.
2. Verwenden Sie den Befehl `rustdesk.exe --config ihre-verschlüsselte-zeichenkette`, z. B. `rustdesk.exe --config 9JSPSvJzNrBDasJjNSdXOVVBlERDlleoNWZzIHcOJiOikXZr8mcw5yazVGZ0NXdy5CdyciojI0N3boJye`.

Sie können einen Client manuell einrichten. Um dies zu tun:
1. Klicken Sie auf Einstellungen.
2. Klicken Sie auf Netzwerk.
3. Klicken Sie auf Netzwerkeinstellungen entsperren.
4. Geben Sie Ihre ID, Ihren Relay-Server, API (bei Verwendung von Pro-Servern) und Ihren Schlüssel ein.

![image](/docs/en/client/images/network-settings.png)

Wenn Sie einen Client manuell einrichten, können Sie die Datei `RustDesk2.toml` (im Benutzerordner) abrufen und `--import-config` auf ähnliche Weise wie im obigen Beispiel verwenden.

### Befehlszeilenparameter
- `--password` kann verwendet werden, um ein dauerhaftes Passwort festzulegen.
- `--get-id` kann verwendet werden, um die ID abzurufen.
- `--set-id` kann zum Festlegen einer ID verwendet werden. Bitte beachten Sie, dass IDs mit einem Buchstaben beginnen sollten.
- `--silent-install` kann verwendet werden, um RustDesk im Stillen unter Windows zu installieren.

Zusätzliche erweiterte Parameter finden Sie [hier](https://github.com/rustdesk/rustdesk/blob/bdc5cded221af9697eb29aa30babce75e987fcc9/src/core_main.rs#L242).

{{% children depth="1" showhidden="true" %}}
