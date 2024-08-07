---
title: Erweiterte Einstellungen
weight: 49
---

## Berechtigungsebenen für Einstellungen

Es gibt vier Arten von Einstellungen:

1. Einstellungen überschreiben in "Web Console → Custom Clients"
2. Standardeinstellungen in "Web Console → Custom Clients"
3. Benutzereinstellungen im RustDesk-Client
4. Strategy-Einstellungen in "Web Console → Strategies"

Die Berechtigungshierarchie für diese Einstellungen ist wie folgt: `Überschreiben > Strategy > Benutzer > Standard`.

## Sicherheitseinstellungen

### access-mode

Legt den Zugriffsmodus (Berechtigungen) für eingehende Verbindungen fest.

**Position**:

1. **Desktop** Einstellungen → Sicherheit → Berechtigungen
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | custom, full, view | custom | `access-mode=custom` |

### enable-keyboard

Aktiviert die Tastatur-/Mauseingabe für eingehende Verbindungen.

**Position**:

1. **Desktop** Einstellungen → Sicherheit → Berechtigungen → Tastatur und Maus aktivieren
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-keyboard=Y` |

### enable-clipboard

Aktiviert das Kopieren und Einfügen für eingehende Verbindungen.

**Position**:

1. **Desktop** Einstellungen → Sicherheit → Berechtigungen → Zwischenablage aktivieren
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-clipboard=Y` |

### enable-file-transfer

Aktiviert das Kopieren und Einfügen von Dateien oder die Dateiübertragung (Sitzung) für eingehende Verbindungen.

**Position**:

1. **Desktop** Einstellungen → Sicherheit → Berechtigungen → Datenübertragung aktivieren
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-file-transfer=Y` |

### enable-audio

Aktiviert die Audioaufzeichnung und die Übertragung zur Gegenstelle.

**Position**:

1. **Desktop** Einstellungen → Sicherheit → Berechtigungen → Audio aktivieren
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-audio=Y` |

### enable-tunnel

Aktiviert die TCP-Tunnelung.

**Position**:

1. **Desktop** Einstellungen → Sicherheit → Berechtigungen → TCP-Tunnelung aktivieren
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-tunnel=Y` |

### enable-remote-restart

Aktiviert den Neustart durch die kontrollierende Seite.

**Position**:

1. **Desktop** Einstellungen → Sicherheit → Berechtigungen → Entfernten Neustart aktivieren
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-remote-restart=Y` |

### enable-record-session

Aktiviert die Aufzeichnung von Sitzungen.

**Position**:

1. **Desktop** Einstellungen → Sicherheit → Berechtigungen → Sitzungsaufzeichnung aktivieren
2. **Mobil** Einstellungen → Bildschirm freigeben → Sitzungsaufzeichnung aktivieren

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-record-session=Y` |

### enable-block-input

Aktiviert auf der kontrollierende Seite die Möglichkeit, die Eingaben anderer Benutzer zu blockieren.

**Position**:

1. **Desktop** Einstellungen → Sicherheit → Berechtigungen → Blockieren von Benutzereingaben aktivieren (nur Windows)
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-block-input=Y` |

### allow-remote-config-modification

Erlaubt der kontrollierenden Seite, die Einstellungen in der kontrollierten RustDesk-Benutzeroberfläche zu ändern.

**Position**:

1. **Desktop** Einstellungen → Sicherheit → Berechtigungen → Änderung der Konfiguration aus der Ferne zulassen
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `allow-remote-config-modification=Y` |

### enable-lan-discovery

Ermöglicht es der LAN-Gegenstelle, mich zu entdecken.

Nach der LAN-Erkennung kann [WOL](https://de.wikipedia.org/wiki/Wake_On_LAN) funktionieren, wenn es lokal unterstützt wird.

**Position**:

1. **Desktop** Einstellungen → Sicherheit → Sicherheit → LAN-Erkennung verbieten
2. **Mobil** Einstellungen → Bildschirm freigeben → LAN-Erkennung verbieten

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| Y | Y, N | Y | `enable-lan-discovery=Y` |

### direct-server

Aktiviert den direkten IP-Zugang.

**Position**:

1. **Desktop** Einstellungen → Sicherheit → Sicherheit → Direkten IP-Zugriff aktivieren
2. **Mobil** Einstellungen → Bildschirm freigeben → Direkter IP-Zugang

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `direct-server=Y` |

### direct-access-port

Direkter IP-Zugangsport.

**Position**:

1. **Desktop** Einstellungen → Sicherheit → Sicherheit → Direkten IP-Zugriff aktivieren → Port (wird nur angezeigt, wenn "Direkten IP-Zugriff aktivieren" verwendet wird)
2. **Mobil** Einstellungen → Bildschirm freigeben → Direkter IP-Zugang

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N |  | 21118 | `direct-access-port=21118` |

### whitelist

Verwendet eine IP-Whitelist.

**Position**:

1. **Desktop** Einstellungen → Sicherheit → Sicherheit → IP-Whitelist verwenden
2. **Mobil** Einstellungen → Bildschirm freigeben → IP-Whitelist verwenden

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | `,` oder `<ip1>,<ip2>,<ip3>` | `,` bedeutet kein Filter | `whitelist=,` |

### allow-auto-disconnect & auto-disconnect-timeout

Schließt eingehende Sitzungen automatisch nach einer gewissen Zeit der Inaktivität des Benutzers.

**Position**:

1. **Desktop** Einstellungen → Sicherheit → Sicherheit → Automatisches Schließen eingehender Sitzungen bei Inaktivität des Benutzers
2. **Mobil** Einstellungen → Bildschirm freigeben → Automatisches Schließen eingehender Sitzungen bei Inaktivität des Benutzers

| Option | Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: | :------: |
| allow-auto-disconnect | N | Y, N | N | `allow-auto-disconnect=Y` |
| auto-disconnect-timeout | N | Timeout in Minuten | 10 | `auto-disconnect-timeout=10` |

### allow-only-conn-window-open

Lässt die Verbindung nur zu, wenn das RustDesk-Fenster geöffnet ist.

**Position**:

1. **Desktop** Einstellungen → Sicherheit → Sicherheit → Verbindung nur zulassen, wenn das RustDesk-Fenster geöffnet ist
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-only-conn-window-open=N` |

### approve-mode

Akzeptiert eingehende Verbindungen mittels Passwort oder durch manuelles Anklicken.

**Position**:

1. **Desktop** Einstellungen → Sicherheit → Passwort → Drop-down-Box
2. **Mobil** Bildschirm freigeben → Drop-down-Menü in der rechten oberen Ecke

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | password, click, password-click | password-click | `approve-mode=password-click` |

### proxy-url

Die Proxy-URL.

Unterstützt derzeit `HTTP` und `SOCKS5`.

**Position**:

1. **Desktop** Einstellungen → Netzwerk → Proxy → SOCKS5/HTTP(S)-Proxy
2. **Mobil**

Beispiele:

1. **HTTP** `proxy-url=http://192.168.0.2:12345`
2. **HTTPS** `proxy-url=https://192.168.0.2:12345`
3. **SOCKS5** `proxy-url=socks5://192.168.0.2:1080`

### proxy-username & proxy-password

Proxy-Benutzername und -Passwort.

**Position**:

1. **Desktop** Einstellungen → Netzwerk → Proxy → SOCKS5/HTTP(S)-Proxy
2. **Mobil**

| Option | Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: | :------: |
| proxy-username | N | | | `proxy-username=user` |
| proxy-password | N | | | `proxy-password=pass` |

## Allgemeine Einstellungen

### theme

Steuert die Farbgebung der Benutzeroberfläche des RustDesk-Clients.

**Position**:

1. **Desktop** Einstellungen → Allgemein → Farbgebung
2. **Mobil** Einstellungen → Einstellungen → Dunkle Farbgebung

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | dark, light, system | system | `theme=system` |

### lang

Steuert die Sprache des RustDesk-Clients.

**Position**:

1. **Desktop** Einstellungen → Allgemein → Sprache
2. **Mobil** Einstellungen → Einstellungen → Sprache

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | default, ar, bg, ... | default | `lang=default` |

Derzeit sind folgende Sprachen verfügbar:

ar, bg, ca, cs, da, de, el, en, eo, es, et, fa, fr, he, hr, hu, id, it, ja, ko, kz, lt, lv, nb, nl, pl, pt, ro, ru, sk, sl, sq, sr, sv, th, tr, uk, vn, zh-cn, zh-tw

Die aktuelle Sprachliste finden Sie im Code unter [LANGS](https://github.com/rustdesk/rustdesk/blob/master/src/lang.rs#L45).

### allow-auto-record-incoming

Eingehende Sitzungen automatisch aufzeichnen.

**Position**:

1. **Desktop** Einstellungen → Allgemein → Aufnahme → Eingehende Sitzungen automatisch aufzeichnen
2. **Mobil** Einstellungen → Aufnahme → Eingehende Sitzungen automatisch aufzeichnen

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-incoming=N` |

### video-save-directory

Das Verzeichnis zum Speichern der aufgenommenen Videos.

**Position**:

1. **Desktop** Einstellungen → Allgemein → Aufnahme → Ausgehend
2. **Mobil** Einstellungen → Aufnahme

Standardwerte:

1. **macOS** ~/Movies/**app_name**
2. **Linux** ~/Videos/**app_name**
3. **Windows** %USERPROFILE%\Videos\\**app_name**
4. **Android** /Storage/emulated/0/**app_name**/ScreenRecord

**Hinweis**: Ersetzen Sie **app_name** durch den Namen der aktuellen Anwendung.

### enable-confirm-closing-tabs

Legt fest, ob vor dem Schließen aller entfernten Registerkarten ein Bestätigungsdialog angezeigt werden soll.

**Position**:

1. **Desktop** Einstellungen → Allgemein → Weitere Einstellungen → Nachfragen, wenn mehrere Tabs geschlossen werden
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-confirm-closing-tabs=Y` |

### enable-abr

Aktiviert die adaptive Bitrate.

**Position**:

1. **Desktop** Einstellungen → Allgemein → Weitere Einstellungen → Bitrate automatisch anpassen
2. **Mobil** Einstellungen → Bildschirm freigeben → Bitrate automatisch anpassen (beta)

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-abr=Y` |

### allow-remove-wallpaper

Entfernt das Hintergrundbild bei eingehenden Sitzungen.

**Position**:

1. **Desktop** Einstellungen → Allgemein → Weitere Einstellungen → Hintergrundbild während eingehender Sitzungen entfernen
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-remove-wallpaper=N` |

### enable-open-new-connections-in-tabs

Steuert, ob eine neue Registerkarte oder ein neues Fenster zum Öffnen einer neuen Verbindung verwendet werden soll.

**Position**:

1. **Desktop** Einstellungen → Allgemein → Weitere Einstellungen → Verbindung in neuem Tab öffnen
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-open-new-connections-in-tabs=Y` |

### allow-always-software-render

Verwendet immer Software-Rendering.

**Position**:

1. **Desktop** Einstellungen → Allgemein → Weitere Einstellungen → Software-Rendering immer verwenden
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-always-software-render=N` |

### allow-linux-headless

Lässt eingehende Verbindungen zu, wenn keine Bildschirme vorhanden sind.

Diese Option erfordert Desktop-Umgebung, Xorg-Server und GDM, siehe [PR 3902](https://github.com/rustdesk/rustdesk/pull/3902).

**Position**:

1. **Desktop** Einstellungen → Allgemein → Weitere Einstellungen → Erlaubt Linux ohne Bildschirm
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-linux-headless=N` |

### enable-hwcodec

Aktiviert den Hardware-Codec, um das Bild flüssiger zu machen.

**Position**:

1. **Desktop**
2. **Mobil** Einstellungen → Hardware-Codec

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-hwcodec=Y` |

### peer-card-ui-type

Steuert die Ansicht der Gegenstellenkarten, einschließlich "Große Kacheln", "Kleine Kacheln" und "Liste".

**Position**:

1. **Desktop** Home → Panel der Gegenstellen → Rastersymbol rechts oben
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | 0, 1, 2 | 0 | `peer-card-ui-type=0` |

**0** Große Kacheln \
**1** Kleine Kacheln \
**2** Liste

### peer-sorting

Steuert die Reihenfolge der Gegenstellenkarten.

**Position**:

1. **Desktop** Home → Panel der Gegenstellen → Rastersymbol rechts oben
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Remote ID, Remote Host, Username | Remote ID | `peer-sorting=Remote ID` |

### sync-ab-with-recent-sessions

Steuert, ob das Adressbuch mit den letzten Sitzungen synchronisiert werden soll.

**Position**:

1. **Desktop** Home → Panel der Gegenstellen → Adressbuch → Tags → Drop-down-Menü → Synchronisation mit den letzten Sitzungen
2. **Mobil** Home → Panel der Gegenstellen → Adressbuch → Tags → Drop-down-Menü → Synchronisation mit den letzten Sitzungen

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-with-recent-sessions=N` |

### sync-ab-tags

Steuert, ob die Adressbuch-Tags sortiert werden sollen.

**Position**:

1. **Desktop** Home → Panel der Gegenstellen → Adressbuch → Tags → Drop-down-Menü → Sortieren nach
2. **Mobil** Home → Panel der Gegenstellen → Adressbuch → Tags → Drop-down-Menü → Sortieren nach

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-tags=N` |

### filter-ab-by-intersection

Filtert das Adressbuch nach Tag-Überschneidungen.

**Vorschau**: [PR #5985](https://github.com/rustdesk/rustdesk/pull/5985)

**Position**:

1. **Desktop** Home → Panel der Gegenstellen → Adressbuch → Tags → Drop-down-Menü → Nach Überschneidungen filtern
2. **Mobil** Home → Panel der Gegenstellen → Adressbuch → Tags → Drop-down-Menü → Nach Überschneidungen filtern

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `filter-ab-by-intersection=N` |

## Anzeigeeinstellungen

### view-only

Mit dieser Option wird die Option "view-only" für jede Gegenstelle nach der ersten Verbindung aktiviert.

Die Option "view-only" in den Einstellungen jeder Gegenstelle steuert dann, ob die Verbindung nur angezeigt wird.

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Weitere Standardeinstellungen → Ansichtsmodus
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Weitere Standardeinstellungen → Ansichtsmodus

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `view-only=Y` |

### show-monitors-toolbar

Steuert, ob Bildschirme in der Symbolleiste angezeigt werden sollen.

![show-monitors-toolbar](/docs/en/self-host/client-configuration/advanced-settings/images/show-monitors-toolbar.png)

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Weitere Standardeinstellungen → Bildschirme in der Symbolleiste anzeigen
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-monitors-toolbar=Y` |

### collapse-toolbar

Steuert, ob die entfernte Symbolleiste nach der Verbindung eingeklappt wird.

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Weitere Standardeinstellungen → Symbolleiste einklappen
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `collapse-toolbar=Y` |

### show-remote-cursor

Mit dieser Option wird die Option "show-remote-cursor" für jede Gegenstelle nach der ersten Verbindung gesetzt.

Die Option "show-remote-cursor" in den Einstellungen jeder Gegenstelle steuert dann, ob der entfernte Cursor auf der entfernten Seite angezeigt wird.

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Weitere Standardeinstellungen → Entfernten Cursor anzeigen
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Weitere Standardeinstellungen → Entfernten Cursor anzeigen

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-remote-cursor=N` |

### follow-remote-cursor

Mit dieser Option wird die Option "follow-remote-cursor" für jede Gegenstelle nach der ersten Verbindung gesetzt.

Dann steuert die Option "follow-remote-cursor" in den Einstellungen jeder Gegenstelle, ob sie dem entfernten Cursor folgt.

**Vorschau**: [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Weitere Standardeinstellungen → Dem entfernten Cursor folgen
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Weitere Standardeinstellungen → Dem entfernten Cursor folgen

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-cursor=Y` |

### follow-remote-window

Mit dieser Option wird die Option "follow-remote-window" für jede Gegenstelle nach der ersten Verbindung gesetzt.

Die Option "follow-remote-window" in den Einstellungen jeder Gegenstelle steuert dann, ob sie dem entfernten Fenster folgen soll.

**Vorschau**: [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Weitere Standardeinstellungen → Dem Fokus des entfernten Fensters folgen
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Weitere Standardeinstellungen → Dem Fokus des entfernten Fensters folgen

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-window=Y` |

### zoom-cursor

Mit dieser Option wird die Option "zoom-cursor" für jede Gegenstelle nach der ersten Verbindung gesetzt.

Die Option "zoom-cursor" in den Einstellungen jeder Gegenstelle steuert dann, ob der Cursor auf der Grundlage des aktuellen Bildmaßstabs skaliert wird.

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Weitere Standardeinstellungen → Cursor vergrößern
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `zoom-cursor=Y` |

### show-quality-monitor

Mit dieser Option wird die Option "show-quality-monitor" für jede Gegenstelle nach der ersten Verbindung gesetzt.

Die Option "show-quality-monitor" in den Einstellungen jeder Gegenstelle steuert dann, ob der Qualitätsmonitor angezeigt werden soll.

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Weitere Standardeinstellungen → Qualitätsüberwachung anzeigen
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Weitere Standardeinstellungen → Qualitätsüberwachung anzeigen

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-quality-monitor=Y` |

### disable-audio

Mit dieser Option wird die Option "disable-audio" für jede Gegenstelle nach der ersten Verbindung gesetzt.

Die Option "disable-audio" in den Einstellungen jeder Gegenstelle steuert dann, ob Ton abgespielt wird.

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Weitere Standardeinstellungen → Stummschalten
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Weitere Standardeinstellungen → Stummschalten

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-audio=Y` |

### enable-file-copy-paste

Mit dieser Option wird die Option "enable-file-copy-paste" für jede Gegenstelle nach der ersten Verbindung gesetzt.

Die Option "enable-file-copy-paste" in den Einstellungen jeder Gegenstelle steuert dann das Kopieren und Einfügen von Dateien in der Verbindung.

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Weitere Standardeinstellungen → Kopieren und Einfügen von Dateien zulassen (nur Windows)
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `enable-file-copy-paste=Y` |

### disable-clipboard

Mit dieser Option wird die Option "disable-clipboard" für jede Gegenstelle nach der ersten Verbindung gesetzt.

Die Option "disable-clipboard" in den Einstellungen jeder Gegenstelle steuert dann, ob das Kopieren und Einfügen von Text möglich ist.

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Weitere Standardeinstellungen → Zwischenablage deaktivieren
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Weitere Standardeinstellungen → Zwischenablage deaktivieren

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-clipboard=Y` |

### lock-after-session-end

Mit dieser Option wird die Option "lock-after-session-end" für jede Gegenstelle nach der ersten Verbindung gesetzt.

Die Option "lock-after-session-end" in den Einstellungen jeder Gegenstelle steuert dann, ob der Rechner der Gegenstelle nach Beendigung der Sitzung gesperrt werden soll.

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Weitere Standardeinstellungen → Nach Sitzungsende sperren
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Weitere Standardeinstellungen → Nach Sitzungsende sperren

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `lock-after-session-end=Y` |

### privacy-mode

Mit dieser Option wird die Option "privacy-mode" für jede Gegenstelle nach der ersten Verbindung gesetzt.

Die Option "privacy-mode" in den Einstellungen jeder Gegenstelle steuert dann, ob nach der Verbindung der Datenschutzmodus verwendet werden soll.

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Weitere Standardeinstellungen → Datenschutzmodus
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Weitere Standardeinstellungen → Datenschutzmodus

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `privacy-mode=Y` |

### touch-mode

Mit dieser Option wird die Option "touch-mode" für jede Gegenstelle nach der ersten Verbindung gesetzt.

Die Option "touch-mode" in den Einstellungen jeder Gegenstelle steuert dann, ob der Touch-Modus oder der Mausmodus verwendet wird.

**Position**:

1. **Desktop**
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Weitere Standardeinstellungen → Touch-Modus

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `touch-mode=Y` |

### i444

Mit dieser Option wird die Option "i444" für jede Gegenstelle nach der ersten Verbindung gesetzt.

Die Option "i444" in den Einstellungen jeder Gegenstelle steuert dann, ob True Color verwendet werden soll.

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Weitere Standardeinstellungen → True Color (4:4:4)
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Weitere Standardeinstellungen → True Color (4:4:4)

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `i444=Y` |

### reverse-mouse-wheel

Mit dieser Option wird die Option "reverse-mouse-wheel" für jede Gegenstelle nach der ersten Verbindung gesetzt.

Die Option "reverse-mouse-wheel" in den Einstellungen jeder Gegenstelle steuert dann, ob das Mausrad rückwärtsgedreht werden soll.

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Weitere Standardeinstellungen → Mausrad rückwärtsdrehen
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Weitere Standardeinstellungen → Mausrad rückwärtsdrehen

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `reverse-mouse-wheel=Y` |

### swap-left-right-mouse

Mit dieser Option wird die Option "swap-left-right-mouse" für jede Gegenstelle nach der ersten Verbindung gesetzt.

Die Option "swap-left-right-mouse" in den Einstellungen jeder Gegenstelle steuert dann, ob die linke und rechte Maustaste getauscht werden soll.

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Weitere Standardeinstellungen → Linke und rechte Maustaste tauschen
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Weitere Standardeinstellungen → Linke und rechte Maustaste tauschen

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `swap-left-right-mouse=Y` |

### displays-as-individual-windows

Mit dieser Option wird die Option "displays-as-individual-windows" für jede Gegenstelle nach der ersten Verbindung gesetzt.

Die Option "displays-as-individual-windows" in den Einstellungen jeder Gegenstelle steuert dann, ob die Anzeigen als einzelne Fenster angezeigt werden sollen.

**Vorschau**: [PR 5945](https://github.com/rustdesk/rustdesk/pull/5945)

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Weitere Standardeinstellungen → Jeden Bildschirm in einem eigenen Fenster anzeigen
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `displays-as-individual-windows=Y` |

### use-all-my-displays-for-the-remote_session

Mit dieser Option wird die Option "use-all-my-displays-for-the-remote_session" für jede Gegenstelle nach der ersten Verbindung gesetzt.

Die Option "use-all-my-displays-for-the-remote_session" in den Einstellungen jeder Gegenstelle steuert dann, ob alle meine Bildschirme für die entfernte Sitzung verwendet werden sollen.

**Vorschau**: [PR 6064](https://github.com/rustdesk/rustdesk/pull/6064)

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Weitere Standardeinstellungen → Alle meine Bildschirme für die Fernsitzung verwenden
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `use-all-my-displays-for-the-remote_session=Y` |

### view-style

Mit dieser Option wird die Option "view-style" für jede Gegenstelle nach der ersten Verbindung gesetzt.

Die Option "view-style" in den Einstellungen jeder Gegenstelle steuert dann den Ansichtsstil.

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Standard-Ansichtsstil
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Standard-Ansichtsstil

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | original, adaptive | original | `view-style=original` |

### scroll-style

Mit dieser Option wird die Option "scroll-style" für jede Gegenstelle nach der ersten Verbindung gesetzt.

Die Option "scroll-style" in den Einstellungen jeder Gegenstelle steuert dann den Scroll-Stil.

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Standard-Scroll-Stil
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | scrollauto, scrollbar | scrollauto | `scroll-style=scrollauto` |

## image-quality

Mit dieser Option wird die Option "image-quality" für jede Gegenstelle nach der ersten Verbindung gesetzt.

Die Option "image-quality" in den Einstellungen jeder Gegenstelle steuert dann die Bildqualität.

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Standard-Bildqualität
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Standard-Bildqualität

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | best, balanced, low, custom | balanced | `image-quality=balanced` |

### custom-image-quality

Mit dieser Option wird die Option "custom-image-quality" für jede Gegenstelle nach der ersten Verbindung gesetzt.

Die Option "custom-image-quality" in den Einstellungen jeder Gegenstelle steuert dann die Bildqualität, wenn "image-quality" auf "custom" eingestellt ist.

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Standard-Bildqualität → Benutzerdefiniert
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Standard-Bildqualität → Benutzerdefiniert

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | [10.0, 2000.0] | 50.0 | `custom-image-quality=50` |

### custom-fps

Mit dieser Option wird die Option "custom-fps" für jede Gegenstelle nach der ersten Verbindung gesetzt.

Die Option "custom-fps" in den Einstellungen jeder Gegenstelle steuert dann die fps, wenn "image-quality" auf "custom" eingestellt ist.

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Standard-Bildqualität → Benutzerdefiniert
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Standard-Bildqualität → Benutzerdefiniert

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | [5, 120] | 30 | `custom-fps=30` |

### codec-preference

Mit dieser Option wird die Option "codec-preference" für jede Gegenstelle nach der ersten Verbindung gesetzt.

Die Option "codec-preference" in den Einstellungen jeder Gegenstelle steuert dann den Codec für die Bilder.

**Position**:

1. **Desktop** Einstellungen → Bildschirm → Standard-Codec
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Standard-Codec

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | auto, vp8, vp9, av1, h264, h265 | auto | `codec-preference=auto` |

**Achtung**: Andere Optionen als "vp8" und "vp9" funktionieren möglicherweise nicht. Dies hängt davon ab, was Ihr Rechner unterstützt.
