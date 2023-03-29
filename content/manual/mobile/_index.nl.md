---
title: Mobiel 
weight: 1
---

### Afstandsbediening

Voer de ID van het externe apparaat in op de startpagina of selecteer een apparaat uit historie om te controleren.
Nadat de verificatie geslaagd is, kunt u het apparaat op afstand bedienen.

| Home | Met succes verbonden |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/connection_home_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/connection_en.jpg?width=300px) |

Invoercontrole biedt twee modi: `muismodus` en `aanraakmodus`, die via de onderste werkbalk kunnen worden omgeschakeld.

| Muisinstellingen | Mode selectie |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/touch_mode_icon_en.png?width=300px) | ![](/docs/en/manual/mobile/images/touch_mode_en.jpg?width=300px) |

{{% notice note %}}
In `muismode` kunt u ook de rechtermuis van het apparaat activeren met een `tik met twee vingers`.
{{% /notice %}}

### Bestandsoverdracht (Android)

> Vereist RustDesk 1.1.9+

Selecteer het apparaat in de apparatenlijst op de startpagina.

Druk lang op of tik op het menu aan de rechterkant om `Bestandsoverdracht` te selecteren.

| Home | Met succes verbonden |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/connection_home_file_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/file_connection_en.jpg?width=300px) |

- De oorspronkelijke map is de Home-map van het apparaat, u kunt op <i class="fas fa-home"></i> klikken om snel terug te keren naar Home.
- Onder de titelbalk staat het mapniveau, u kunt op de betreffende map klikken om snel te schakelen.
- Klik op <i class="fas fa-arrow-up"></i> om de bovenliggende map te openen.
- Het huidige absolute path en de projectstatistieken worden onderaan de lijst weergegeven.
- Klik op `Lokaal` / `Afstand` in de titelbalk om van pagina te wisselen.

#### Hoe zet ik bestanden over?

1. **Lang drukken** op een bestand of map in de lijst om snel naar de **meervoudige selectiemodus** te gaan, waarmee meerdere items kunnen worden geselecteerd.
2. Na het selecteren van het/de bestand(en), schakel de `lokaal` / `afstand` pagina. Na het wisselen ziet u de `Plak hier?` prompt onderaan het scherm.
3. Click the paste file icon in the picture to transfer the selected item(s) to the target directory.

| Multi-Selectie Mode | Bestand Plakken |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/file_multi_select_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/file_copy_en.jpg?width=300px) |

### Stel ID/Relay Server in

1. Klik op `Instellingen` in de onderste navigatiebalk.
2. Klik `ID/Relay Server`.
3. Voer uw ID Server hostnaam/IP adres in het `ID Server` veld in. Laat `Relay Server` en `API Server` leeg, en voer uw publieke sleutel in (optioneel, vereist voor encryptie) in het `Key` veld. Druk op **OK** om uw instellingen op te slaan. Er wordt automatisch overgeschakeld naar de opgegeven server.

U kunt het ook configureren door een QR-code te scannen. Om de QR-code te genereren gebruikt u het volgende formaat (verander de waarden `host` en `key` in uw eigen waarden):

```nolang
config={"host": "xxx", "key": "xxx"}
```

Ga dan naar een [Online QR Code Generator](https://www.qr-code-generator.com/) en plak de bovenstaande code erin.

De afbeelding hieronder is een screenshot van Android. Als het iOS is, controleer dan het menu rechtsboven op de startpagina.

![](/docs/en/manual/mobile/images/id_setting_en.jpg?width=300px)

Voor details over de zelf-host server, zie [zelf-host](/docs/nl/self-host/).
