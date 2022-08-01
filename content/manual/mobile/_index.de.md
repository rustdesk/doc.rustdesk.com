---
title: Mobile 
weight: 1
---

### Fernbedienung

Geben Sie die ID des Remote-Geräts auf der Startseite ein oder wählen Sie ein historisches Gerät zur Überprüfung aus. 
Nach erfolgreicher Überprüfung können Sie das Remote-Gerät steuern.

| Startfenster | Erfolgreich verbunden |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/connection_home_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/connection_en.jpg?width=300px) |

Die Eingabesteuerung bietet zwei Modi:: `mouse mode` und `touch mode`, die über die untere Symbolleiste umgeschaltet werden kann.

| Mauseinstellungen | Modusauswahl |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/touch_mode_icon_en.png?width=300px) | ![](/docs/en/manual/mobile/images/touch_mode_en.jpg?width=300px) |

{{% notice note %}}
Im `mouse mode`, können Sie auch die des Maus des Remote-Geräts auslösen `Right Mouse` mit ein `Zwei-Finger Tap`
{{% /notice %}}

### Dateiübertragung (Android)

> Benötigt RustDesk 1.1.9+

Wählen Sie in der Geräteliste auf der Startseite das Gerät aus.

Drücken Sie lange oder tippen Sie zur Auswahl auf das Menü rechts `Datei übertragen`

| Startfenster | Erfolgreich verbunden |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/connection_home_file_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/file_connection_en.jpg?width=300px) |

- das Ausgangsverzeichnis ist das Home-Verzeichnis des Geräts, Sie können darauf klicken <i class="fas fa-home"></i> um schnell nach Hause zurückzukehren.
- Unterhalb der Titelleiste befindet sich die Verzeichnisebene, Sie können auf den entsprechenden Ordner klicken, um schnell zu springen.
- Klick <i class="fas fa-arrow-up"></i> um auf das übergeordnete Verzeichnis zuzugreifen.
- Der aktuelle absolute Pfad und die Projektstatistik werden am Ende der Liste angezeigt.
- Klick `Lokaler` / `Entfernter` in der Titelleiste, um die Seiten zu wechseln.

#### Wie übertrage ich Dateien?

1. **Drücken Sie lange** auf eine Datei oder einen Ordner in der Liste, um schnell in den **Mehrfachauswahlmodus**, zu wechseln, der mehrere Elemente auswählen kann.
2. Schalten Sie nach Auswahl der Datei(en) den `Lokaler` / `Entfernter` Seite. Nach dem Umschalten sehen Sie die `Hier einfügen?` Eingabeaufforderung unten auf dem Bildschirm.
3. Klicken Sie auf das Symbol zum Einfügen von Dateien im Bild, um die ausgewählten Elemente in das Zielverzeichnis zu übertragen.

| Mehrfachauswahlmodus | Datei einfügen |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/file_multi_select_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/file_copy_en.jpg?width=300px) |

### ID/Verbindungsserver einstellen

1. Klick `Einstellungen` in der unteren Navigationsleiste.
2. Klick `ID/Verbindungsserver`.
3. Geben Sie den Hostnamen/die IP-Adresse Ihres ID-Servers in das ein `ID Server` Feld. Lassen Sie `Verbindungsserver` und `API Server` leer, nd geben Sie Ihren öffentlichen Schlüssel (optional, für die Verschlüsselung erforderlich) in das `Key` Feld ein. Drücken Sie  **OK** um Ihre Einstellungen zu speichern. Es wird automatisch auf den angegebenen Server umgeschaltet.

Sie können es auch konfigurieren, indem Sie einen QR-Code scannen. Verwenden Sie zum Generieren des QR-Codes das folgende Format (ändern Sie die Werte `host` und den eigenen `key`):

```nolang
config={"host": "xxx", "key": "xxx"}
```

Dann gehen Sie zu einem [Online QR Code Generator](https://www.qr-code-generator.com/) und fügen Sie den obigen Code ein.

Das folgende Bild ist ein Screenshot von Android. Wenn es sich um iOS handelt, überprüfen Sie bitte das Menü oben rechts auf der Startseite.

![](/docs/en/manual/mobile/images/id_setting_en.jpg?width=300px)

Einzelheiten zum Self-Host-Server finden Sie unter [selbst-hosten](/docs/de/self-host/)
