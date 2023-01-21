---
title: Handy 
weight: 1
---

### Fernsteuerung

Geben Sie die ID des entfernten Geräts auf der Startseite ein oder wählen Sie ein historisches Gerät zur Überprüfung aus. 
Nach erfolgreicher Überprüfung können Sie das entfernte Gerät steuern.

| Startfenster | Erfolgreich verbunden |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/connection_home_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/connection_en.jpg?width=300px) |

Die Eingabesteuerung bietet zwei Modi: `Mausmodus` und `Touch-Modus`, die über die untere Symbolleiste umgeschaltet werden können.

| Mauseinstellungen | Modusauswahl |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/touch_mode_icon_en.png?width=300px) | ![](/docs/en/manual/mobile/images/touch_mode_en.jpg?width=300px) |

{{% notice note %}}
Im `Mausmodus` können Sie die `Rechte Maus` des entfernten Geräts mit einem `Zwei-Finger-Tipp` auslösen.
{{% /notice %}}

### Dateiübertragung (Android)

> Benötigt RustDesk 1.1.9+

Wählen Sie in der Geräteliste auf der Startseite das Gerät aus.

Drücken Sie lange oder tippen Sie zur Auswahl rechts auf das Menü `Datei übertragen`.

| Startfenster | Erfolgreich verbunden |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/connection_home_file_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/file_connection_en.jpg?width=300px) |

- Das Ausgangsverzeichnis ist das Home-Verzeichnis des Geräts, Sie können auf <i class="fas fa-home"></i> klicken, um schnell nach Hause zurückzukehren.
- Unter der Titelleiste befindet sich die Verzeichnisebene, Sie können auf den entsprechenden Ordner klicken, um schnell zu springen.
- Klicken Sie <i class="fas fa-arrow-up"></i>, um auf das übergeordnete Verzeichnis zuzugreifen.
- Der aktuelle absolute Pfad und die Projektstatistik werden am Ende der Liste angezeigt.
- Klicken Sie `Lokal` / `Entfernt` in der Titelleiste, um die Seiten zu wechseln.

#### Wie übertrage ich Dateien?

1. **Drücken Sie lange** auf eine Datei oder einen Ordner in der Liste, um schnell in den **Mehrfachauswahlmodus** zu wechseln, mit dem Sie mehrere Elemente auswählen können.
2. Wechseln Sie nach Auswahl der Datei(en) die Seite `Lokal` / `Entfernt`. Nach dem Umschalten sehen Sie am unteren Rand des Bildschirms die Aufforderung `Hier einfügen?`.
3. Klicken Sie auf das Symbol zum Einfügen von Dateien im Bild, um die ausgewählten Elemente in das Zielverzeichnis zu übertragen.

| Mehrfachauswahlmodus | Datei einfügen |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/file_multi_select_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/file_copy_en.jpg?width=300px) |

### ID/Relay-Server einstellen

1. Klicken Sie `Einstellungen` in der unteren Navigationsleiste.
2. Klicken Sie `ID/Relay-Server`.
3. Geben Sie den Hostnamen oder die IP-Adresse Ihres ID-Servers in das Feld `ID-Server` ein. Lassen Sie `Relay-Server` sowie `API-Server` leer und geben Sie Ihren öffentlichen Schlüssel (optional, für die Verschlüsselung erforderlich) in das Feld `Key` ein. Drücken Sie **OK**, um Ihre Einstellungen zu speichern. Es wird automatisch auf den angegebenen Server umgeschaltet.

Sie können ihn auch durch Scannen eines QR-Codes konfigurieren. Um den QR-Code zu erzeugen, verwenden Sie das folgende Format (ändern Sie die Werte `host` und `key` in Ihre eigenen Werte):

```nolang
config={"host": "xxx", "key": "xxx"}
```

Gehen Sie dann online zu einem [QR-Code-Generator](https://www.qr-code-generator.com/) und fügen Sie den obigen Code ein.

Das folgende Bild ist ein Screenshot von Android. Wenn es sich um iOS handelt, überprüfen Sie bitte das Menü oben rechts auf der Startseite.

![](/docs/en/manual/mobile/images/id_setting_en.jpg?width=300px)

Einzelheiten zum Selbst-Host-Server finden Sie unter [Selbst-Host](/docs/de/self-host/).
