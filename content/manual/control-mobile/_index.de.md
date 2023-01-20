---
title: Steuern Sie Ihr Android
weight: 2
---

### Bildschirm und Dateien Ihres Android-Telefons freigeben
------

Ab Version 1.1.9 hat der Android-Client die Funktion zur Freigabe des Bildschirms und des Dateisystems des Telefons hinzugefügt.

- Für die Bildschirmfreigabe ist Android 6 oder höher erforderlich
- Android 10 oder höher ist erforderlich, um den internen Sound des Mobiltelefonsystems zu teilen
- iOS unterstützt noch keine Bildschirmfreigabe


#### **Berechtigungen anfordern und Dienste starten**

Klicken Sie in der unteren Navigationsleiste auf `Bildschirm freigeben`.

Konfigurieren Sie nach Bedarf verschiedene Berechtigungen. Jedes Mal, wenn Sie RustDesk starten, müssen Sie die Berechtigungen „Bildschirmaufnahme“ und „Eingabesteuerung“ erneut anfordern.

![](/docs/en/manual/mobile/images/server_off_en.jpg?width=300px)

| Berechtigung     | Beschreibung                                               |
| --------------- | --------------------------------------------------------- |
| Bildschirmaufnahme | Wenn Sie die Berechtigung zur Freigabe von Bildschirmaufnahmen aktivieren, wird der Überwachungsdienst gleichzeitig mit dem Start des Dienstes aktiviert. |
| Eingabesteuerung* | Legt fest, ob das Steuergerät die Eingaben des Mobiltelefons steuern darf, z. B. die Bedienung des virtuellen Touchscreens mit der Maus. |
| Datei übertragen* | Wenn Sie die Berechtigung zur Dateiübertragung aktivieren, können Sie nach dem Start das Dateisystem des Telefons fernsteuern. |
| Audioaufnahme  | Legt fest, ob die Systemmusik innerhalb des Telefons freigegeben werden soll (nicht der Mikrofoneingang). |

{{% notice note %}}
Das obige * steht für spezielle Berechtigungen. Um solche Berechtigungen zu erhalten, müssen Sie auf die Seite mit den Android-Systemeinstellungen wechseln, um sie manuell zu erhalten. Die Einzelheiten sind wie folgt
{{% /notice %}}

#### **Sondergenehmigung beantragen – Datei**

| Das Anfordern von Android-Dateiberechtigungen führt automatisch zur Seite mit den Systemeinstellungen |
| :---------------: |
| ![](/docs/en/manual/mobile/images/get_file_en.jpg?width=300px) |

#### **Sondergenehmigung beantragen - Mauseingabe**
| Schritt 1 Suchen Sie „Installierte Dienste“ | Schritt 2 Starten Sie RustDesk Input |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/get_input1_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/get_input2_en.jpg?width=300px) |

{{% notice note %}}
Die Systemeinstellungsseite der verschiedenen Anbieter kann unterschiedlich sein, bitte passen Sie sie entsprechend Ihrer Systemseite an
{{% /notice %}}

**Tastenkombinationen für die Fernbedienung der Maus:**

- Klick mit der rechten Maustaste: zurück
- Klick auf das Mausrad: Startseite
- Langes Drücken des Mausrads: zuletzt geöffnete Apps
- Scrollen mit dem Mausrad: vertikales Gleiten simulieren

#### **Dienst starten**

Nach Erhalt der Berechtigung `Bildschirmaufnahme` wird der Dienst automatisch gestartet. Sie können auch auf die Schaltfläche `Dienst starten` klicken, um den Dienst zu starten. Nachdem der Dienst gestartet wurde, kann er Desktop-Steuerungsanfragen von anderen Geräten annehmen.

Wenn die Berechtigung `Datei übertragen` aktiviert ist, kann es auch Dateisteuerungsanfragen von anderen Geräten annehmen.

Nachdem der Dienst gestartet wurde, werden automatisch eine eindeutige ID und ein zufälliges Passwort für dieses Gerät vergeben. Andere Geräte können das Telefon über die ID und das Passwort steuern oder den Eingang einer neuen Anfrage manuell bestätigen.

| Vor dem Start des Dienstes | Nach dem Start des Dienstes |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/server_off_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/server_on_en.jpg?width=300px) |

{{% notice note %}}
1. Wenn Sie auf "Dienst starten" klicken, wird die Berechtigung "Bildschirmaufnahme" standardmäßig aktiviert.
2. Wenn die "Bildschirmaufnahme"-Erlaubnis nicht erteilt wird, können andere Geräte keine Kontrollanfragen stellen.
3. Mit Ausnahme der Berechtigung `Bildschirmaufnahme` wirkt sich das Umschalten anderer Berechtigungen nur auf eine neue und nicht auf die bestehende Verbindung aus. Wenn Sie die Berechtigungen für die bestehende Verbindung ändern müssen, schließen Sie bitte zuerst die aktuelle Verbindung, ändern Sie die Berechtigungen und empfangen Sie dann eine Steuerungsanforderung.
{{% /notice %}}

##### PC

![](/docs/en/manual/mobile/images/android_server_pc_side_en.png?width=700px)

##### Mobiles Endgerät

| Sie können den Dienst jederzeit beenden oder die angegebene Verbindung schließen | Sie können Chats empfangen oder initiieren |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/server_on_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/android_server2_en.jpg?width=300px) |
