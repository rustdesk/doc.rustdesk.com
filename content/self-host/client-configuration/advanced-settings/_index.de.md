---
title: Erweiterte Einstellungen
weight: 49
---

Alle erweiterten Einstellungen in benutzerdefinierten Clients werden hier behandelt.

## Berechtigungsebenen für Einstellungen

Es gibt vier Arten von Einstellungen:

1. Überschreibungseinstellungen, in `Web Console` → `Custom Clients`
2. Standardeinstellungen, in `Web Console` → `Custom Clients`
3. Benutzereinstellungen, im RustDesk-Client
4. Strategieeinstellungen, in `Web Console` → `Strategies`

Die Hierarchie der Berechtigung für diese Einstellungen ist wie folgt: `Überschreibung > Strategie > Benutzer > Standard`.

## Sicherheitseinstellungen

### access-mode

Setzt den Zugriffsmodus (Berechtigungen) für eingehende Verbindungen.

**Ort**:

1. **Desktop** Einstellungen → Sicherheit → Berechtigungen
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | custom, full, view | custom | `access-mode=custom` |

### enable-keyboard

Aktiviert Tastatur-/Maus-Eingabe für eingehende Verbindungen.

**Ort**:

1. **Desktop** Einstellungen → Sicherheit → Berechtigungen → Tastatur aktivieren
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-keyboard=Y` |

### enable-clipboard

Aktiviert Kopieren und Einfügen für eingehende Verbindungen.

**Ort**:

1. **Desktop** Einstellungen → Sicherheit → Berechtigungen → Zwischenablage aktivieren
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-clipboard=Y` |

### enable-file-transfer

Aktiviert Dateikopieren und -einfügen oder Dateiübertragung (Sitzung) für eingehende Verbindungen.

**Ort**:

1. **Desktop** Einstellungen → Sicherheit → Berechtigungen → Dateiübertragung aktivieren
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-file-transfer=Y` |

### enable-camera

Aktiviert Kamera für eingehende Verbindungen.

**Ort**:

1. **Desktop** Einstellungen → Sicherheit → Berechtigungen → Kamera aktivieren
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-camera=Y` |

### enable-terminal

Terminal für eingehende Verbindungen aktivieren.

**Speicherort**:

**Desktop** Einstellungen → Sicherheit → Berechtigungen → Terminal aktivieren

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-terminal=Y` |

### enable-remote-printer

Entfernten Drucker für eingehende Verbindungen aktivieren.

**Ort**:

1. **Windows** Einstellungen → Sicherheit → Berechtigungen → Remote-Drucker aktivieren

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-remote-printer=Y` |

### enable-audio

Aktiviert Audioaufzeichnung und -übertragung zum Peer.

**Ort**:

1. **Desktop** Einstellungen → Sicherheit → Berechtigungen → Audio aktivieren
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-audio=Y` |

### enable-tunnel

Aktiviert TCP-Tunneling.

**Ort**:

1. **Desktop** Einstellungen → Sicherheit → Berechtigungen → TCP-Tunneling aktivieren
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-tunnel=Y` |

### enable-remote-restart

Aktiviert Neustart durch die Steuerungsseite.

**Ort**:

1. **Desktop** Einstellungen → Sicherheit → Berechtigungen → Remote-Neustart aktivieren
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-remote-restart=Y` |

### enable-record-session

Ermöglicht das Aufzeichnen von Sitzungen.

**Ort**:

1. **Desktop** Einstellungen → Sicherheit → Berechtigungen → Sitzungsaufzeichnung aktivieren
2. **Mobil** Einstellungen → Bildschirm teilen → Sitzungsaufzeichnung aktivieren

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-record-session=Y` |

### enable-block-input

Ermöglicht der Steuerungsseite, die Eingabe anderer Benutzer zu blockieren.

**Ort**:

1. **Desktop** Einstellungen → Sicherheit → Berechtigungen → Benutzereingabe blockieren aktivieren (nur Windows)
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-block-input=Y` |

### allow-remote-config-modification

Erlaubt der Steuerungsseite, die Einstellungen in der gesteuerten RustDesk-Benutzeroberfläche zu ändern.

**Ort**:

1. **Desktop** Einstellungen → Sicherheit → Berechtigungen → Remote-Konfigurationsänderung aktivieren
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-remote-config-modification=Y` |

### enable-lan-discovery

Erlaubt LAN-Peers, mich zu entdecken.

Nach der LAN-Erkennung kann [WOL](https://en.wikipedia.org/wiki/Wake-on-LAN) funktionieren, wenn es lokal unterstützt wird.

**Ort**:

1. **Desktop** Einstellungen → Sicherheit → Sicherheit → LAN-Erkennung verweigern
2. **Mobil** Einstellungen → Bildschirm teilen → LAN-Erkennung verweigern

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| Y | Y, N | Y | `enable-lan-discovery=Y` |

### direct-server

Aktiviert direkten IP-Zugriff.

**Ort**:

1. **Desktop** Einstellungen → Sicherheit → Sicherheit → Direkten IP-Zugriff aktivieren
2. **Mobil** Einstellungen → Bildschirm teilen → Direkter IP-Zugriff

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `direct-server=Y` |

### direct-access-port

Port für direkten IP-Zugriff.

**Ort**:

1. **Desktop** Einstellungen → Sicherheit → Sicherheit → Port für direkten IP-Zugriff (Anzeigen wenn "Direkten IP-Zugriff aktivieren" aktiviert ist)
2. **Mobil** Einstellungen → Bildschirm teilen → Direkter IP-Zugriff

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N |  | 21118 | `direct-access-port=21118` |

### whitelist

IP-Whitelist verwenden.

**Ort**:

1. **Desktop** Einstellungen → Sicherheit → Sicherheit → IP-Whitelist verwenden
2. **Mobil** Einstellungen → Bildschirm teilen → IP-Whitelist verwenden

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | `,` oder `<ip1>,<ip2>,<ip3>` | `,` bedeutet kein Filter | `whitelist=,` |

### allow-auto-disconnect & auto-disconnect-timeout

Eingehende Sitzungen nach einer Zeit der Benutzerinaktivität automatisch schließen.

**Ort**:

1. **Desktop** Einstellungen → Sicherheit → Sicherheit → Eingehende Sitzungen bei Benutzerinaktivität automatisch schließen
2. **Mobil** Einstellungen → Bildschirm teilen → Eingehende Sitzungen bei Benutzerinaktivität automatisch schließen

| Option | Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: | :------: |
| allow-auto-disconnect | N | Y, N | N | `allow-auto-disconnect=Y` |
| auto-disconnect-timeout | N | Timeout in Minuten | 10 | `auto-disconnect-timeout=10` |

### allow-only-conn-window-open

Verbindung nur zulassen, wenn das RustDesk-Fenster geöffnet ist.

**Ort**:

1. **Desktop** Einstellungen → Sicherheit → Sicherheit → Verbindung nur zulassen, wenn das RustDesk-Fenster geöffnet ist
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-only-conn-window-open=N` |

### approve-mode

Eingehende Verbindungen über Passwort oder manuellen Klick akzeptieren.

**Ort**:

1. **Desktop** Einstellungen → Sicherheit → Passwort → Dropdown-Box
2. **Mobil** Bildschirm teilen → Dropdown-Menü oben rechts

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | password, click, password-click | password-click | `approve-mode=password-click` |

### verification-method

Welche Art von Passwort verwendet werden kann, `temporäres Passwort` bezieht sich auf das einmalige Zufallspasswort.

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | use-temporary-password, use-permanent-password, use-both-passwords | use-both-passwords | `verification-method=use-permanent-password` |

### temporary-password-length

1. **Desktop** Einstellungen → Sicherheit → Passwort → Einmalpasswortlänge
2. **Mobil** Bildschirm freigeben → Dropdown-Menü oben rechts → Einmalpasswortlänge

Die Länge des temporären Passworts.

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | 6, 8, 10 | 6 | `temporary-password-length=6` |

### proxy-url

Die Proxy-URL.

Unterstützt derzeit `http` und `socks5`.

**Ort**:

1. **Desktop** Einstellungen → Netzwerk → Proxy → Socks5/Http(s)-Proxy
2. **Mobil**

Beispiele:

1. **http** `proxy-url=http://192.168.0.2:12345`
2. **https** `proxy-url=https://192.168.0.2:12345`
3. **socks5** `proxy-url=socks5://192.168.0.2:1080`

### proxy-username & proxy-password

Proxy-Benutzername und -Passwort.

**Ort**:

1. **Desktop** Einstellungen → Netzwerk → Proxy → Socks5/Http(s)-Proxy
2. **Mobil**

| Option | Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: | :------: |
| proxy-username | N | | | `proxy-username=user` |
| proxy-password | N | | | `proxy-password=pass` |

## Allgemeine Einstellungen

### theme

Steuert das UI-Theme des RustDesk-Clients.

**Ort**:

1. **Desktop** Einstellungen → Allgemein → Theme
2. **Mobil** Einstellungen → Einstellungen → Theme

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | dark, light, system | system | `theme=system` |

### lang

Steuert die Sprache des RustDesk-Clients.

**Ort**:

1. **Desktop** Einstellungen → Allgemein → Sprache
2. **Mobil** Einstellungen → Einstellungen → Sprache

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | default, ar, bg, ... | default | `lang=default` |

Derzeit verfügbare Sprachen sind:

ar, bg, ca, cs, da, de, el, en, eo, es, et, fa, fr, he, hr, hu, id, it, ja, ko, kz, lt, lv, nb, nl, pl, pt, ro, ru, sk, sl, sq, sr, sv, th, tr, uk, vn, zh-cn, zh-tw

Sie können [LANGS](https://github.com/rustdesk/rustdesk/blob/master/src/lang.rs#L45) im Code für die neueste Sprachliste überprüfen.

### allow-auto-record-incoming

Eingehende Sitzungen automatisch aufzeichnen.

**Ort**:

1. **Desktop** Einstellungen → Allgemein → Aufzeichnung → Eingehende Sitzungen automatisch aufzeichnen
2. **Mobil** Einstellungen → Aufzeichnung → Eingehende Sitzungen automatisch aufzeichnen

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-incoming=Y` |

### allow-auto-record-outgoing

Ausgehende Sitzungen automatisch aufzeichnen.

**Ort**:

1. **Desktop** Einstellungen → Allgemein → Aufzeichnung → Ausgehende Sitzungen automatisch aufzeichnen
2. **Mobil** Einstellungen → Aufzeichnung → Ausgehende Sitzungen automatisch aufzeichnen

| Installation erforderlich | Werte | Standard | Beispiel | Version |
| :------: | :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-outgoing=Y` | >= 1.3.2 |

### video-save-directory

Das Verzeichnis zum Speichern aufgezeichneter Videos.

**Ort**:

1. **Desktop** Einstellungen → Allgemein → Aufzeichnung → Video-Speicherverzeichnis
2. **Mobil** Einstellungen → Aufzeichnung

Standardwerte:

1. **macOS** ~/Movies/**app_name**
2. **Linux** ~/Videos/**app_name**
3. **Windows** %USERPROFILE%\Videos\\**app_name**
4. **Android** /Storage/emulated/0/**app_name**/ScreenRecord

**Hinweis**: Ersetzen Sie **app_name** durch den aktuellen App-Namen.

### enable-confirm-closing-tabs

Steuert, ob ein Bestätigungsdialog vor dem Schließen aller Remote-Tabs angezeigt wird.

**Ort**:

1. **Desktop** Einstellungen → Allgemein → Sonstiges → Vor dem Schließen mehrerer Tabs bestätigen
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-confirm-closing-tabs=Y` |

### enable-abr

Adaptive Bitrate aktivieren.

**Ort**:

1. **Desktop** Einstellungen → Allgemein → Sonstiges → Adaptive Bitrate
2. **Mobil** Einstellungen → Bildschirm teilen → Adaptive Bitrate (Beta)

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-abr=Y` |

### allow-remove-wallpaper

Hintergrundbild während eingehender Sitzungen entfernen.

**Ort**:

1. **Desktop** Einstellungen → Allgemein → Sonstiges → Hintergrundbild während eingehender Sitzungen entfernen
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-remove-wallpaper=N` |

### enable-open-new-connections-in-tabs

Steuert, ob ein neuer Tab oder ein neues Fenster zum Öffnen einer neuen Verbindung verwendet wird.

**Ort**:

1. **Desktop** Einstellungen → Allgemein → Sonstiges → Verbindung in neuem Tab öffnen
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-open-new-connections-in-tabs=Y` |

### allow-always-software-render

Immer Software-Rendering verwenden.

**Ort**:

1. **Desktop** Einstellungen → Allgemein → Sonstiges → Immer Software-Rendering verwenden
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-always-software-render=N` |

### allow-linux-headless

Eingehende Verbindung zulassen, wenn keine Displays vorhanden sind.

Diese Option erfordert eine Desktop-Umgebung, Xorg-Server und GDM, siehe [PR 3902](https://github.com/rustdesk/rustdesk/pull/3902).

**Ort**:

1. **Desktop** Einstellungen → Allgemein → Sonstiges → Linux headless zulassen
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-linux-headless=N` |

### enable-hwcodec

Hardware-Kodierung aktivieren, um das Bild flüssiger zu machen.

**Ort**:

1. **Desktop**
2. **Mobil** Einstellungen → Hardware-Codec

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-hwcodec=Y` |

### peer-card-ui-type

Steuert die Ansicht der Peer-Karten, umfasst "Große Kacheln", "Kleine Kacheln" und "Liste".

**Ort**:

1. **Desktop** Startseite → Peer-Panel → Raster-Symbol oben rechts
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | 0, 1, 2 | 0 | `peer-card-ui-type=0` |

**0** Große Kacheln  
**1** Kleine Kacheln  
**2** Liste

### peer-sorting

Steuert die Reihenfolge der Peer-Karten.

**Ort**:

1. **Desktop** Startseite → Peer-Panel → Sortier-Symbol oben rechts
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Remote ID, Remote Host, Username | Remote ID | `peer-sorting=Remote ID` |

### sync-ab-with-recent-sessions

Steuert, ob das Adressbuch mit den letzten Sitzungen synchronisiert wird.

**Ort**:

1. **Desktop** Startseite → Peer-Panel → Adressbuch → Tags → Dropdown-Menü → Mit letzten Sitzungen synchronisieren
2. **Mobil** Startseite → Peer-Panel → Adressbuch → Tags → Dropdown-Menü → Mit letzten Sitzungen synchronisieren

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-with-recent-sessions=N` |

### sync-ab-tags

Steuert, ob die Adressbuch-Tags sortiert werden.

**Ort**:

1. **Desktop** Startseite → Peer-Panel → Adressbuch → Tags → Dropdown-Menü → Tags sortieren
2. **Mobil** Startseite → Peer-Panel → Adressbuch → Tags → Dropdown-Menü → Tags sortieren

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-tags=N` |

### filter-ab-by-intersection

Adressbuch nach Tag-Schnittpunkt filtern.

**Vorschau**: [PR #5985](https://github.com/rustdesk/rustdesk/pull/5985)

**Ort**:

1. **Desktop** Startseite → Peer-Panel → Adressbuch → Tags → Dropdown-Menü → Nach Schnittpunkt filtern
2. **Mobil** Startseite → Peer-Panel → Adressbuch → Tags → Dropdown-Menü → Nach Schnittpunkt filtern

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `filter-ab-by-intersection=N` |

### use-texture-render

**Speicherort**:

**Desktop** Einstellungen → Allgemein → Sonstiges → Textur-Rendering verwenden

Verwenden Sie Textur-Rendering, um die Bilder flüssiger zu machen. Sie können versuchen, diese Option zu deaktivieren, wenn Sie auf Rendering-Probleme stoßen. Nur auf dem Desktop verfügbar.

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | linux:Y, macOS:N, win7:N, win10+:Y | `use-texture-render=Y` |

### enable-udp-punch

**Speicherort**:

**Desktop** Einstellungen → Allgemein → Sonstiges → UDP-Hole-Punching aktivieren
**Mobil** Einstellungen → UDP-Hole-Punching aktivieren

Verfügbar seit RustDesk 1.4.1, RustDesk Server Pro 1.6.2

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | Y | `enable-udp-punch=N` |

### enable-ipv6-punch

**Speicherort**:

**Desktop** Einstellungen → Allgemein → Sonstiges → IPv6-P2P-Verbindung aktivieren
**Mobil** Einstellungen → Allgemein → Sonstiges → IPv6-P2P-Verbindung aktivieren

Verfügbar seit RustDesk 1.4.1, RustDesk Server Pro 1.6.2

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | selfhost:N, sonst:Y | `enable-ipv6-punch=N` |

## Anzeigeeinstellungen

### view-only

Diese Option setzt die "Nur-Ansicht"-Option für jeden Peer nach der ersten Verbindung.

Dann steuert die "Nur-Ansicht"-Option in den Einstellungen jedes Peers, ob die Verbindung nur zur Ansicht dient.

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Andere Standardoptionen → Ansichtsmodus
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Andere Standardoptionen → Ansichtsmodus

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `view-only=Y` |

### show-monitors-toolbar

Steuert, ob Monitore in der Symbolleiste angezeigt werden.

![show-monitors-toolbar](/docs/en/self-host/client-configuration/advanced-settings/images/show-monitors-toolbar.png)

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Andere Standardoptionen → Monitor-Symbolleiste anzeigen
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-monitors-toolbar=Y` |

### collapse-toolbar

Steuert, ob die Remote-Symbolleiste nach dem Verbinden eingeklappt wird.

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Andere Standardoptionen → Symbolleiste einklappen
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `collapse-toolbar=Y` |

### show-remote-cursor

Diese Option setzt die "Remote-Cursor anzeigen"-Option für jeden Peer nach der ersten Verbindung.

Dann steuert die "Remote-Cursor anzeigen"-Option in den Einstellungen jedes Peers, ob der Remote-Cursor auf der Remote-Control-Seite angezeigt wird.

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Andere Standardoptionen → Remote-Cursor anzeigen
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Andere Standardoptionen → Remote-Cursor anzeigen

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-remote-cursor=N` |

### follow-remote-cursor

Diese Option setzt die "Remote-Cursor folgen"-Option für jeden Peer nach der ersten Verbindung.

Dann steuert die "Remote-Cursor folgen"-Option in den Einstellungen jedes Peers, ob dem Remote-Cursor gefolgt wird.

**Vorschau**: [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Andere Standardoptionen → Remote-Cursor folgen
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Andere Standardoptionen → Remote-Cursor folgen

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-cursor=Y` |

### follow-remote-window

Diese Option setzt die "Remote-Fenster folgen"-Option für jeden Peer nach der ersten Verbindung.

Dann steuert die "Remote-Fenster folgen"-Option in den Einstellungen jedes Peers, ob dem Remote-Fenster gefolgt wird.

**Vorschau**: [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Andere Standardoptionen → Remote-Fensterfokus folgen
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Andere Standardoptionen → Remote-Fensterfokus folgen

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-window=Y` |

### zoom-cursor

Diese Option setzt die "Cursor zoomen"-Option für jeden Peer nach der ersten Verbindung.

Die "Cursor zoomen"-Option in den Einstellungen jedes Peers steuert dann, ob der Cursor basierend auf der aktuellen Bildskalierung skaliert wird.

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Andere Standardoptionen → Cursor zoomen
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `zoom-cursor=Y` |

### show-quality-monitor

Diese Option setzt die "Qualitätsmonitor anzeigen"-Option für jeden Peer nach der ersten Verbindung.

Die "Qualitätsmonitor anzeigen"-Option in den Einstellungen jedes Peers steuert dann, ob der Qualitätsmonitor angezeigt wird.

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Andere Standardoptionen → Qualitätsmonitor anzeigen
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Andere Standardoptionen → Qualitätsmonitor anzeigen

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-quality-monitor=Y` |

### disable-audio

Diese Option setzt die "Audio deaktivieren"-Option für jeden Peer nach der ersten Verbindung.

Die "Audio deaktivieren"-Option in den Einstellungen jedes Peers steuert dann, ob Ton wiedergegeben wird.

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Andere Standardoptionen → Stumm
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Andere Standardoptionen → Stumm

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-audio=Y` |

### enable-file-copy-paste

Diese Option setzt die "Dateikopieren und -einfügen aktivieren"-Option für jeden Peer nach der ersten Verbindung.

Die "Dateikopieren und -einfügen aktivieren"-Option in den Einstellungen jedes Peers steuert dann, ob Dateikopieren und -einfügen in der Verbindung aktiviert wird.

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Andere Standardoptionen → Dateikopieren und -einfügen aktivieren (nur Windows)
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `enable-file-copy-paste=Y` |

### disable-clipboard

Diese Option setzt die "Zwischenablage deaktivieren"-Option für jeden Peer nach der ersten Verbindung.

Die "Zwischenablage deaktivieren"-Option in den Einstellungen jedes Peers steuert dann, ob Textkopieren und -einfügen aktiviert wird.

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Andere Standardoptionen → Zwischenablage deaktivieren
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Andere Standardoptionen → Zwischenablage deaktivieren

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-clipboard=Y` |

### lock-after-session-end

Diese Option setzt die "Nach Sitzungsende sperren"-Option für jeden Peer nach der ersten Verbindung.

Die "Nach Sitzungsende sperren"-Option in den Einstellungen jedes Peers steuert dann, ob die Peer-Maschine nach dem Ende der Sitzung gesperrt wird.

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Andere Standardoptionen → Nach Sitzungsende sperren
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Andere Standardoptionen → Nach Sitzungsende sperren

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `lock-after-session-end=Y` |

### privacy-mode

Diese Option setzt die "Datenschutzmodus"-Option für jeden Peer nach der ersten Verbindung.

Die "Datenschutzmodus"-Option in den Einstellungen jedes Peers steuert dann, ob der Datenschutzmodus nach dem Verbinden verwendet wird.

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Andere Standardoptionen → Datenschutzmodus
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Andere Standardoptionen → Datenschutzmodus

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `privacy-mode=Y` |

### i444

Diese Option setzt die "i444"-Option für jeden Peer nach der ersten Verbindung.

Die "i444"-Option in den Einstellungen jedes Peers steuert dann, ob echte Farben verwendet werden.

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Andere Standardoptionen → Echte Farben (4:4:4)
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Andere Standardoptionen → Echte Farben (4:4:4)

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `i444=Y` |

### reverse-mouse-wheel

Diese Option setzt die "Mausrad umkehren"-Option für jeden Peer nach der ersten Verbindung.

Die "Mausrad umkehren"-Option in den Einstellungen jedes Peers steuert dann, ob das Mausrad umgekehrt wird.

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Andere Standardoptionen → Mausrad umkehren
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Andere Standardoptionen → Mausrad umkehren

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `reverse-mouse-wheel=Y` |

### swap-left-right-mouse

Diese Option setzt die "Linke-rechte Maustaste vertauschen"-Option für jeden Peer nach der ersten Verbindung.

Die "Linke-rechte Maustaste vertauschen"-Option in den Einstellungen jedes Peers steuert dann, ob die linke und rechte Maustaste vertauscht werden.

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Andere Standardoptionen → Linke-rechte Maustaste vertauschen
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Andere Standardoptionen → Linke-rechte Maustaste vertauschen

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `swap-left-right-mouse=Y` |

### displays-as-individual-windows

Diese Option setzt die "Displays als einzelne Fenster anzeigen"-Option für jeden Peer nach der ersten Verbindung.

Die "Displays als einzelne Fenster anzeigen"-Option in den Einstellungen jedes Peers steuert dann, ob Displays als einzelne Fenster angezeigt werden.

**Vorschau**: [PR 5945](https://github.com/rustdesk/rustdesk/pull/5945)

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Andere Standardoptionen → Displays als einzelne Fenster anzeigen
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `displays-as-individual-windows=Y` |

### use-all-my-displays-for-the-remote-session

Diese Option setzt die Option „use-all-my-displays-for-the-remote-session“ für jeden Peer nach der ersten Verbindung.

Die Option „use-all-my-displays-for-the-remote-session“ in den Einstellungen jedes Peers steuert dann, ob alle meine Anzeigen für die Remote-Sitzung verwendet werden.

**Speicherort**:

1. **Desktop** Einstellungen → Anzeige → Andere Standardoptionen → Alle meine Anzeigen für die Remote-Sitzung verwenden
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Andere Standardoptionen → Alle meine Anzeigen für die Remote-Sitzung verwenden

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `use-all-my-displays-for-the-remote-session=Y` |

### view-style

Diese Option setzt die "Ansichtsstil"-Option für jeden Peer nach der ersten Verbindung.

Die "Ansichtsstil"-Option in den Einstellungen jedes Peers steuert dann den Ansichtsstil.

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Standard-Ansichtsstil
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Standard-Ansichtsstil

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | original, adaptive | original | `view-style=original` |

### scroll-style

Diese Option setzt die "Scroll-Stil"-Option für jeden Peer nach der ersten Verbindung.

Die "Scroll-Stil"-Option in den Einstellungen jedes Peers steuert dann den Scroll-Stil.

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Standard-Scroll-Stil
2. **Mobil**

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | scrollauto, scrollbar, scrolledge | scrollauto | `scroll-style=scrollauto` |

**Hinweis**: Die `scrolledge`-Option ist ab RustDesk 1.4.4 verfügbar.

### edge-scroll-edge-thickness

Diese Option steuert die Randdicke, wenn `scroll-style` auf `scrolledge` gesetzt ist. Die Randdicke bestimmt die Größe des scrollbaren Bereichs an den Bildschirmrändern.

Diese Option ist nur wirksam, wenn `scroll-style=scrolledge`.

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Randscroll-Randdicke

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | 20-150 | 100 | `edge-scroll-edge-thickness=100` |

**Hinweis**: Diese Option ist ab RustDesk 1.4.4 verfügbar.

### image-quality

Diese Option setzt die "Bildqualität"-Option für jeden Peer nach der ersten Verbindung.

Die "Bildqualität"-Option in den Einstellungen jedes Peers steuert dann die Bildqualität.

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Standard-Bildqualität
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Standard-Bildqualität

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | best, balanced, low, custom | balanced | `image-quality=balanced` |

### custom-image-quality

Diese Option setzt die "Benutzerdefinierte Bildqualität"-Option für jeden Peer nach der ersten Verbindung.

Die "Benutzerdefinierte Bildqualität"-Option in den Einstellungen jedes Peers steuert dann die Bildqualität, wenn "image-quality" auf custom gesetzt ist.

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Standard-Bildqualität → Benutzerdefiniert
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Standard-Bildqualität → Benutzerdefiniert

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | [10.0, 2000.0] | 50.0 | `custom-image-quality=50` |

### custom-fps

Diese Option setzt die "Benutzerdefinierte FPS"-Option für jeden Peer nach der ersten Verbindung.

Die "Benutzerdefinierte FPS"-Option in den Einstellungen jedes Peers steuert dann die FPS, wenn "image-quality" auf custom gesetzt ist.

**Ort**:

1. **Desktop** Einstellungen → Anzeige → Standard-Bildqualität → Benutzerdefiniert
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Standard-Bildqualität → Benutzerdefiniert

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | [5, 120] | 30 | `custom-fps=30` |

### codec-preference

Diese Option setzt die "Codec-Präferenz"-Option für jeden Peer nach der ersten Verbindung.

Die "Codec-Präferenz"-Option in den Einstellungen jedes Peers steuert dann den Codec für das Bild.

**Achtung**: Andere Optionen als „vp8“ und „vp9“ funktionieren möglicherweise nicht. Dies hängt davon ab, was Ihr Gerät unterstützt.

### terminal-persistent

Diese Option setzt die Option „terminal-persistent“ für jeden Peer nach der ersten Verbindung.

Die Option „terminal-persistent“ in den Einstellungen jedes Peers steuert dann, ob Terminalsitzungen bei Verbindungsabbruch beibehalten werden.

**Speicherort**:

1. **Desktop** Einstellungen → Anzeige → Andere Standardoptionen → Terminalsitzungen bei Verbindungsabbruch beibehalten
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Andere Standardoptionen → Terminalsitzungen bei Verbindungsabbruch beibehalten

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `terminal-persistent=Y` |

### trackpad-speed

Diese Option setzt die Option „trackpad-speed“ für jeden Peer nach der ersten Verbindung.

Die Option „trackpad-speed“ in den Einstellungen jedes Peers steuert dann die FPS, wenn „trackpad-speed“ auf benutzerdefiniert eingestellt ist.

**Speicherort**:

1. **Desktop** Einstellungen → Anzeige → Standard-Trackpad-Geschwindigkeit
2. **Mobil** Einstellungen → Anzeigeeinstellungen → Standard-Trackpad-Geschwindigkeit

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | [10, 1000] | 100 | `trackpad-speed=100` |

## Sonstiges

### preset-address-book-name & preset-address-book-tag & preset-address-book-alias & preset-address-book-password & preset-address-book-note

Voreingestellter Adressbuchname, Geräte-Tag, Geräte-Alias, Geräte-Passwort, Geräte-Notiz, https://github.com/rustdesk/rustdesk-server-pro/issues/257.
Sie können nur preset-address-book-name setzen, wenn Sie keinen Tag setzen möchten.
Bitte verwenden Sie gültige Adressbuchnamen und -tags auf Ihrer Adressbuchseite der Web-Konsole.

| Option | Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: | :------: |
| preset-address-book-name | N | | | `preset-address-book-name=<Adressbuchname>` |
| preset-address-book-tag | N | | | `preset-address-book-tag=<Adressbuch-Tag-Name>` |
| preset-address-book-alias | N | | | `preset-address-book-alias=<Geräte-Alias>` |
| preset-address-book-password | N | | | `preset-address-book-password=<Geräte-Passwort>` |
| preset-address-book-note | N | | | `preset-address-book-note=<Geräte-Notiz>` |

preset-address-book-alias, preset-address-book-password, preset-address-book-note sind verfügbar in RustDesk-Client >=1.4.3, Pro >= 1.6.6.

### disable-group-panel

Gruppenbereich (neben dem Adressbuchbereich, seit 1.3.8 "Zugängliche Geräte" genannt) im RustDesk-Client deaktivieren, https://github.com/rustdesk/rustdesk-server-pro/issues/250.

| Option | Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: | :------: |
| disable-group-panel | N | Y, N | N | `disable-group-panel=Y` |

### pre-elevate-service

Automatische Rechteerweiterung beim Start für Windows Portable, https://github.com/rustdesk/rustdesk-server-pro/issues/252.

| Option | Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: | :------: |
| pre-elevate-service | N | Y, N | N | `pre-elevate-service=Y` |

### disable-floating-window

Wenn der Android-Service startet, zeigt er ein schwebendes Fenster an, das hilft zu verhindern, dass das System den RustDesk-Service beendet.

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `disable-floating-window=Y` |

### floating-window-size

Wenn der Android-Service startet, zeigt er ein schwebendes Fenster an, das hilft zu verhindern, dass das System den RustDesk-Service beendet. Wenn die Größe weniger als 120 beträgt, wird das schwebende Fenster schwer anklickbar sein. Eine sehr kleine Größe kann möglicherweise nicht den Hintergrunddienst auf einigen Geräten aufrechterhalten.

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| [32, 320] | 120 | `floating-window-size=120` |

### floating-window-untouchable

Standardmäßig öffnet ein Klick auf das schwebende Fenster ein Menü. Nach der Einstellung auf 'untouchable' werden Klicks oder Wischbewegungen durch das schwebende Fenster hindurchgehen und an das darunterliegende Fenster übertragen. Nach der Einstellung auf 'untouchable' kann die Position des schwebenden Fensters nicht geändert werden, und das System kann das schwebende Fenster automatisch halbtransparent setzen. Diese Funktion funktioniert jedoch möglicherweise nicht in einer kleinen Anzahl von Anwendungen, wie der GitHub-App.

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `floating-window-untouchable=Y` |

### floating-window-transparency

Android-schwebende Fenster haben einstellbare Transparenz. Wenn Sie das schwebende Fenster aktivieren, aber verstecken möchten, können Sie die Transparenz auf 0 setzen, das schwebende Fenster wird automatisch auf 'untouchable' gesetzt, um Klick-Events durchzulassen.

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| [0, 10] | 10 | `floating-window-transparency=5` |

### floating-window-svg

Wenn für das Android-schwebende Fenster kein Icon gesetzt ist, wird standardmäßig das RustDesk-Icon angezeigt.
Beim Setzen schreiben Sie bitte den Textinhalt von SVG in eine Zeile und beachten Sie die [SVG-Unterstützungsbeschränkungen](https://bigbadaboom.github.io/androidsvg/index.html).

| Standard | Beispiel |
| :------: | :------: |
| RustDesk-Icon | `floating-window-svg=<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1717559129252" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4248" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M950.857143 512c0 242.285714-196.571429 438.857143-438.857143 438.857143S73.142857 754.285714 73.142857 512 269.714286 73.142857 512 73.142857s438.857143 196.571429 438.857143 438.857143z" fill="#1296db" p-id="4249"></path></svg>` |

### keep-screen-on

Dies ist für die Android-gesteuerte Seite. Beachten Sie, dass das Bildschirm-Ein-Halten vom schwebenden Fenster abhängt.

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| never, during-controlled, service-on | during-controlled | `keep-screen-on=never` |

### enable-directx-capture

Dies ist für die Windows-gesteuerte Seite. Wenn Sie keine Probleme haben, wird empfohlen, die Standardeinstellungen zu verwenden, die DirectX für Screenshots priorisieren, anstatt GDI direkt zu verwenden.

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | Y | `enable-directx-capture=N` |

### enable-android-software-encoding-half-scale

Dies ist für die Android-gesteuerte Seite. Standardmäßig, wenn die Auflösung größer als 1200 ist, verwendet Hardware-Kodierung die ursprüngliche Auflösung, während Software-Kodierung die halbe Auflösung verwendet, da Software-Kodierung langsamer ist. Diese Option wird verwendet, um zu setzen, ob Software-Kodierung auf die halbe Auflösung skaliert werden soll.

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | Y | `enable-android-software-encoding-half-scale=N` |

### allow-remote-cm-modification

Steuert, ob die Steuerungsseite auf das Verbindungsverwaltungsfenster klicken darf, um Verbindungen zu akzeptieren, Berechtigungen zu ändern usw.

https://github.com/rustdesk/rustdesk/issues/7425

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `allow-remote-cm-modification=Y` |

### remove-preset-password-warning

Steuert, ob die Sicherheitswarnung auf der GUI entfernt wird, wenn im benutzerdefinierten Client ein voreingestelltes Passwort vorhanden ist.

https://github.com/rustdesk/rustdesk-server-pro/discussions/286

https://github.com/rustdesk/rustdesk/discussions/7956

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | Y | `remove-preset-password-warning=Y` |

### hide-security-settings / hide-network-settings / hide-server-settings / hide-proxy-settings / hide-websocket-settings / hide-remote-printer-settings

Steuert, ob einige Einstellungen ausgeblendet werden. Bitte stellen Sie sicher, dass `Einstellungen deaktivieren` ausgeschaltet ist, sonst funktionieren diese nicht.

https://github.com/rustdesk/rustdesk-server-pro/issues/263

https://github.com/rustdesk/rustdesk-server-pro/issues/276

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `hide-security-settings=Y` |

### hide-username-on-card

Steuert, ob der Benutzername in der Geräteliste angezeigt wird. Weil manchmal der Benutzername zu lang ist, werden die anderen Informationen ausgeblendet.

https://github.com/rustdesk/rustdesk-server-pro/issues/284#issuecomment-2216521407

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `hide-username-on-card=Y` |

### hide-help-cards

Steuert, ob UAC / Berechtigungswarnungen auf der GUI angezeigt werden.

https://github.com/rustdesk/rustdesk/issues/8687

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `hide-help-cards=Y` |

### display-name

Ändern Sie Ihren Anzeigenamen, der im Popup angezeigt wird, wenn Sie sich mit einem Remote-Gerät verbinden. Standardmäßig wird zuerst der Name des angemeldeten Benutzers angezeigt, andernfalls wird Ihr OS-Benutzername angezeigt.

https://github.com/rustdesk/rustdesk-server-pro/issues/277

### disable-udp

Steuert, ob nur TCP verwendet wird. Es wird UDP 21116 nicht mehr verwenden, stattdessen wird TCP 21116 verwendet.

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `disable-udp=Y` |

### preset-user-name / preset-strategy-name / preset-device-group-name / preset-device-username / preset-device-name / preset-note

Weisen Sie Benutzer / Strategie / Gerätegruppe / Geräte-Benutzername / Geräte-Name(Hostname) / Notiz dem Gerät zu. Sie können dies auch über die [Befehlszeile](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/#assign-device-usersgroupsstrategies-to-devices) tun.

https://github.com/rustdesk/rustdesk-server-pro/discussions/304

Gerätegruppe ist verfügbar in RustDesk-Client >=1.3.8, Pro >= 1.5.0

preset-device-username, preset-device-name, preset-note sind verfügbar in RustDesk-Client >=1.4.3, Pro >= 1.6.6.

### default-connect-password

Sie verwenden das `Standard-Verbindungspasswort`, um Verbindungen zu Remote-Geräten herzustellen. Dieses Passwort wird auf der Steuerungsseite konfiguriert und sollte nicht mit einem [voreingestellten Passwort](https://github.com/rustdesk/rustdesk/wiki/FAQ#how-can-we-set-up-a-client-with-a-fixed-password-for-unattended-remote-access) verwechselt werden, das auf dem gesteuerten (nur eingehenden) Client zu finden ist.

z.B. `default-connect-password=abcd1234`

### enable-trusted-devices

Erlauben Sie vertrauenswürdigen Geräten, die 2FA-Verifizierung zu überspringen.

https://github.com/rustdesk/rustdesk/discussions/8513#discussioncomment-10234494

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | Y | `enable-trusted-devices=N` |

### hide-tray

Deaktivieren Sie das Tray-Icon in der Systemleiste.

https://github.com/rustdesk/rustdesk-server-pro/issues/332

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `hide-tray=Y` |

### one-way-clipboard-redirection

Zwischenablage-Synchronisation von der gesteuerten Seite zur Steuerungsseite deaktivieren, verfügbar in RustDesk-Client >=1.3.1 (gesteuerte Seite)

https://github.com/rustdesk/rustdesk/discussions/7837

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `one-way-clipboard-redirection=Y` |

### one-way-file-transfer

Dateiübertragung von der gesteuerten Seite zur Steuerungsseite deaktivieren, verfügbar in RustDesk-Client >=1.3.1 (gesteuerte Seite)

https://github.com/rustdesk/rustdesk/discussions/7837

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `one-way-file-transfer=Y` |

### sync-init-clipboard

Ob die initiale Zwischenablage beim Herstellen der Verbindung synchronisiert wird (nur von der Steuerungsseite zur gesteuerten Seite), verfügbar in RustDesk-Client >=1.3.1 (Steuerungsseite)

https://github.com/rustdesk/rustdesk/discussions/9010

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `sync-init-clipboard=Y` |

### allow-logon-screen-password

Ob Passworteingabe auf dem Anmeldebildschirm erlaubt ist, wenn [Nur-Klick-Genehmigungsmodus](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#approve-mode) verwendet wird, verfügbar in RustDesk-Client >=1.3.1 (gesteuerte Seite)

https://github.com/rustdesk/rustdesk/discussions/9269

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `allow-logon-screen-password=Y` |

### allow-https-21114

Normalerweise verwendet HTTPS Port 443. Wenn der Port des API-Servers fälschlicherweise auf 21114 gesetzt ist, entfernt der RustDesk-Client standardmäßig die 21114-Port-Einstellung. Das Setzen der Option auf Y erlaubt die Verwendung von 21114 als HTTPS-Port. Verfügbar in RustDesk-Client >=1.3.9.

https://github.com/rustdesk/rustdesk-server-pro/discussions/570

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `allow-https-21114=Y` |

### allow-d3d-render

D3D-Rendering kann hohe FPS erreichen und die CPU-Nutzung reduzieren, aber der Remote-Control-Bildschirm kann auf einigen Geräten schwarz sein. Verfügbar in RustDesk-Client >=1.3.9, nur Windows.

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `allow-d3d-render=Y` |

### allow-hostname-as-id

[Hostname als ID verwenden](https://github.com/rustdesk/rustdesk-server-pro/discussions/483), Leerzeichen im Hostname werden durch '-' ersetzt. Dies ist nicht 100% garantiert und tritt nur beim ersten Ausführen des RustDesk-Clients auf (d.h. bei einem neu installierten Client); wenn ein Konflikt auftritt, wird eine zufällige ID zugewiesen.

Verfügbar in RustDesk-Client Version 1.4.0 und später.

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `allow-hostname-as-id=Y` |

### allow-websocket

WebSocket-Protokoll zur Verbindung von Server und Client verwenden. Nur verfügbar in RustDesk-Client >=1.4.0 und Pro-Server >= 1.5.7. Beachten Sie, dass WebSocket nur Relay-Verbindungen unterstützt.

Um WebSocket zum Laufen zu bringen, müssen Sie Ihren Reverse-Proxy korrekt konfigurieren, https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms

**Standort**:

**Desktop** Einstellungen → Netzwerk → Websocket verwenden
**Mobil** Einstellungen → Websocket verwenden

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `allow-websocket=Y` |

### allow-numeric-one-time-password

Diese Option aktiviert oder deaktiviert die Verwendung von rein numerischen Einmal-Passwörtern.
Nur verfügbar in RustDesk-Client >=1.4.1 und Pro-Server >= 1.5.9.

**Diskussion**: https://github.com/rustdesk/rustdesk-server-pro/discussions/685

**Vorschau**: https://github.com/rustdesk/rustdesk/pull/11846

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `allow-numeric-one-time-password=Y` |

### register-device

Das Gerät nicht registrieren, Sie werden es nicht auf der Geräteseite in der Web-Konsole sehen.

**Nur verfügbar in Pro-Server >= 1.6.0 und erfordert [custom2-Lizenz](https://rustdesk.com/pricing#custom2) und Anzahl gleichzeitiger Verbindungen >= 2.**

Wenn `register-device=N`, funktioniert das Folgende nicht für dieses Gerät.
- Anmelden
- `--assign`-Befehl
- `preset-address-book-name`, `preset-address-book-tag`, `preset-address-book-alias`, `preset-address-book-password`, `preset-address-book-note` `preset-user-name`, `preset-strategy-name`, `preset-device-group-name`, `preset-device-username`, `preset-device-name`, `preset-note`
- Audit-Logs
- Strategie

**Diskussion**: https://github.com/rustdesk/rustdesk-server-pro/discussions/672 und https://github.com/rustdesk/rustdesk-server-pro/discussions/182

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | Y | `register-device=N` |

### main-window-always-on-top

Hauptfenster immer im Vordergrund halten.

**Diskussion**: https://github.com/rustdesk/rustdesk-server-pro/issues/761

Nur in RustDesk-Client 1.4.2 verfügbar.

| Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `main-window-always-on-top=N` |

### relay-server

https://github.com/rustdesk/rustdesk-server-pro/issues/776#issuecomment-3306524913

### disable-discovery-panel

Deaktivieren Sie das Panel "Entdeckt" (neben dem Panel "Favoriten") im RustDesk-Client.

| Option | Installation erforderlich | Werte | Standard | Beispiel |
| :------: | :------: | :------: | :------: | :------: |
| disable-discovery-panel | N | Y, N | N | `disable-discovery-panel=Y` |

### touch-mode

Steuert, ob während Fernsteuerungssitzungen der Touch‑Modus oder der Maus‑Modus verwendet wird.

#### Unterschiede im Verhalten nach Version

##### RustDesk (steuernde Seite) < 1.4.3

Nach der ersten Verbindung setzt diese Option die Einstellung "touch-mode" für jeden Peer. Danach bestimmen die individuellen Einstellungen jedes Peers, ob Touch‑ oder Maus‑Modus verwendet wird.

**Ort**:

1. **Desktop**
2. **Mobile** Einstellungen → Anzeige → Weitere Standard‑Optionen → Touch‑Modus

##### RustDesk (steuernde Seite) >= 1.4.3

Diese Option steuert einheitlich, ob alle Peer‑Geräte den Touch‑Modus oder den Maus‑Modus verwenden und überschreibt damit die individuellen Geräteeinstellungen.

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `touch-mode=Y` |

### show-virtual-mouse

https://github.com/rustdesk/rustdesk/pull/12911

Steuert die Anzeige der virtuellen Maus beim Modus mobil → Desktop.

**Ort**:

1. **Desktop**
2. **Mobile** Fernsitzung → untere Navigationsleiste → Gesten‑Hilfe

Verfügbar seit RustDesk 1.4.3

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `show-virtual-mouse=Y` |

**Hinweis**: Diese Option sollte in **Default settings** und nicht in **Override settings** konfiguriert werden.

### show-virtual-joystick

https://github.com/rustdesk/rustdesk/pull/12911

Steuert die Anzeige des virtuellen Joysticks beim Modus mobil → Desktop.

Diese Option erfordert, dass **show-virtual-mouse** aktiviert ist.

**Ort**:

1. **Desktop**
2. **Mobile** Fernsitzung → untere Navigationsleiste → Gesten‑Hilfe

Verfügbar seit RustDesk 1.4.3

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `show-virtual-joystick=Y` |

**Hinweis**: Diese Option sollte in **Default settings** und nicht in **Override settings** konfiguriert werden.

### allow-insecure-tls-fallback

Standardmäßig überprüft RustDesk das Serverzertifikat für Protokolle, die TLS verwenden.

Mit dieser Option aktiviert, fällt RustDesk bei Überprüfungsfehlern auf das Überspringen des Überprüfungsschritts zurück und fährt fort.

**Standort**:

**Desktop** Einstellungen → Netzwerk → Unsicheren TLS-Fallback zulassen
**Mobil** Einstellungen → Unsicheren TLS-Fallback zulassen

Verfügbar seit RustDesk 1.4.4

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `allow-insecure-tls-fallback=Y` |

### disable-change-permanent-password

Deaktiviert die Möglichkeit, das permanente Passwort zu ändern. Wenn aktiviert, können Benutzer das permanente Passwort weder über die Benutzeroberfläche noch über die Befehlszeile festlegen oder ändern.

Verfügbar seit RustDesk 1.4.5

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `disable-change-permanent-password=Y` |

### disable-change-id

Deaktiviert die Möglichkeit, die Geräte-ID zu ändern. Wenn aktiviert, können Benutzer die ID weder über die Benutzeroberfläche noch über die Befehlszeile ändern.

Verfügbar seit RustDesk 1.4.5

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `disable-change-id=Y` |

### disable-unlock-pin

Deaktiviert die Verwendung der PIN zum Entsperren der Einstellungen. Wenn aktiviert, müssen Benutzer Systemadministratorrechte verwenden, um die Einstellungen zu entsperren, auch wenn eine PIN festgelegt wurde.

Verfügbar seit RustDesk 1.4.5

| Werte | Standard | Beispiel |
| :------: | :------: | :------: |
| Y, N | N | `disable-unlock-pin=Y` |
