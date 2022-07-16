---
title: Mobile 
weight: 1
---

### Távoli irányítás

Írd be az ID-jét a távoli masinának az asztal oldalon, vagy pedig válaszz ki egy korábbi eszközt amelyhez csatlakoztál. Miután a hitelesítés sikeresen végbement, kontrolálhatod majd a távoli eszközt.

| Asztal | Sikeres kapcsolódás |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/connection_home_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/connection_en.jpg?width=300px) |

Az input kontrol két módot biztosít; `egér mód`, és `érintő mód`. Ezek között a módok között a lenti eszköztárban váltogathatsz.

| Egérbeállítások | Mód váltó menü |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/touch_mode_icon_en.png?width=300px) | ![](/docs/en/manual/mobile/images/touch_mode_en.jpg?width=300px) |

{{% notice note %}}
`Egér módban` a távoli eszköz jobb clickjét is elérheted távolról, ehhez˙`kettőször` kell tappintanod a kijelzőre.
{{% /notice %}}

### Fájl Transzfer (Android)

> Minimum RustDesk 1.1.9+

Az eszközlistában az asztal oldalon, válaszd ki az eszközt.

Sokáig nyomd az eszköz nevét, vagy pedig tappints a menüre, és válaszd ki a `Fájl Transzfer` opciót.

| Asztal | Sikeres kapcsolódás |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/connection_home_file_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/file_connection_en.jpg?width=300px) |

- Az alap mappa az eszköz Home mappája, a <i class="fas fa-home"></i> ikonra nyomva gyorsan visszatérhetsz ide akár mikor.
- Below the title bar is the directory level, you can click the corresponding folder to jump quickly.
- A címsor alatt található a mappák rendszere, egy mappába tappintással navigálhatsz.
- Click <i class="fas fa-arrow-up"></i> to access the parent directory.
- Kattints a <i class="fas fa-arrow-up"></i> iconra, hogy elérd az előző mappát.
- A jelenlegi teljes, abszolút elérési útvonal és a projekt statisztika elérhető lesz a lista alpján.
- Nyomj a `Lokális` / `Távoli` opciókra hogy válts a felek mappái között.
 
#### Hogyan transzferelek fájlokat?

1. **Hosszan nyomd** a kijelzőt egy fájlon vagy mappán a listában, hogy gyorsan belépj a `többválasztós módba`, ahol több fájlt is kijelölhetsz.
2. Miután kiválasztottad a fájlt, vagy fájlokat, válts a `lokális` / `távoli` oldalakon. Miután váltottál, a RustDesk felajánlja majd a `Másolás ide?` opciót a kijelző alján.
3. Nyomj a vágólap iconra hogy a kijelölt fájlt vagy fájlokat transzfereld a kiválasztott célmappába.

| `többválasztós mód` | `Fájl másolás` |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/file_multi_select_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/file_copy_en.jpg?width=300px) |

### ID/Relay szerver beállítása

1. Nyomj a `Settings` opcióra a lenti navigációs sorból.
2. Nyomj az `ID/Relay Szerver` opcióra.
3. Írd be az ID szerver hostnevét/IP címét az `IP Cím` sorba. Hagyd a `Relay Szerver` és az `API Szerver` opciókat üresen, majd pedig írd be a publikus kulcsodat a `Kulcs` sorba. (opcionális, titkosításhoz szükséges). Nyomj az **OK** opcióra hogy elmentsd a beállításaidat. A RustDesk automatikusan váltani fog az előbb meghatározott szerverre.

A RustDesket beállíthatod azzal is, hogy scannelsz egy QR kódot. Hogy generálj egyet, használd a következő formációt: (változtasd meg a `host` és `key` értékeket a sajátodra)

```nolang
config={"host": "xxx", "key": "xxx"}
```
Ezután menj egy [Online QR Kód Generátorhoz](https://www.qr-code-generator.com/) és másold be a fenti kódot.

A lenti kép Androidon készült, ha IOS eszközöd van, kérlek checkeld a jobb felső menut az asztalon.

![](/docs/en/manual/mobile/images/id_setting_en.jpg?width=300px)

Ha self-hostolni szeretnél egy RustDesk szervert, kérlek nézd meg a részleteket a [self-host](/docs/hu/self-host/) dokumentációs oldalon.
