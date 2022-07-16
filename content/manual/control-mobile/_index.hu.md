---
title: Android eszköz kezelése
weight: 2
---

### Képernyő és fájlmegosztás az Android eszközöről
------

Az 1.1.9es verziótól kezdve, a RustDesk android kliens támogatja a telefon képernyőjének, és fájlrendszerének megosztását távolról.

- Minimum Android 6 szükséges a kijelző megosztásához
- Minimum Android 10 szükséges ahhoz hogy meglehessen osztani az eszköz audióját
- Az IOS cliens még nem támogatja a kijelzőmegosztást


#### **Jogok, szolgáltatás**

Nyomj a `Képernyőmegosztás` opcióra lent a navigációs sornál

Állítsd be azokat a jogokat, amelyeket engedélyezni szeretnél. Minden alkalommal amikor elindítod a RustDesk-et, újra engedélyezned kell a képernyőmegosztás, és input kontrol jogokat.

![](/docs/en/manual/mobile/images/server_off_en.jpg?width=300px)

| Jog     | Leírás                                             |
| --------------- | --------------------------------------------------------- |
| Képernyőmegosztás | Engedélyezi a RustDesk applikáció számára hogy megossza a kijelződet, a monitoring szolgáltatás indításkor fog elindulni |
| Input Kontrol* | Engedélyezi a telefonod kezelését a távoli félnek például egy egér használatával, amit a telefon egy virtuális touchscreen operációnak fog érzékelni |
| Fájl Transzfer* | Engedélyezi a fájl transzfert a távoli eszköznek, vagyis a távoli fél tölthet le, és telepíthet fel fájlokat a telefonra |
| Audio capture  | Engedélyezi a telefon audiójának megosztását (Nem mikrofon.) |

{{% notice note %}}
Minden ami fent * al van jelölve, speciális jogokat igényel. Ezeket a jogokat az Android rendszer beállításaiban tudod megadni. 
{{% /notice %}}

#### **Specális jogok beállítása - Fájltranszfer**

| Az ENGEDÉLYEZÉS gombra kattintva az Android rendszer automatikusan a rendszerbeállításokhoz kell hogy navigáljon |
| :---------------: |
| ![](/docs/en/manual/mobile/images/get_file_en.jpg?width=300px) |

#### **Specális jogok beállítása - Input Kontrol**
| Első lépés: Keresd meg a "Telepített Szolgáltatások" menüpontot | Második lépés: Engedélyezd, vagy indítsd el a RustDesk inputot |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/get_input1_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/get_input2_en.jpg?width=300px) |

{{% notice note %}}
A rendszerbeállítások oldal szolgáltatótól és modeltől változó, kérlek próbáld a saját eszközödön megkeresni, ha a példaképek nem egyeznek a te eszközöddel
{{% /notice %}}

**Távoli engér kezelési gesztusok:**

- Jobblick: Vissza
- Görgö click: Asztal/Home
- Görgö hosszanti nyomása: Mostanában megnyitott alkalmazások
- Görgő görgetése: Vertikális csúszás szimulálása

#### **Szolgáltatás elindítása**

Miután engedélyezted a `képernyőrögzítés` jogot, a szolgáltatás automatikusan elindul majd. Alternatívaként, a `szolgáltatás indítása` gombot is megnyomhatod hogy elindítsd a szolgáltatást. Miután a szolgáltatás elindult, az eszközöd készen áll képernyőkezelési kéréseket fogadni.

Ha a `fájl transzfer` jog is adva van, akkor az eszköz fájlokat és képes fogadni más eszközöktől.

Miután a szolgáltatás elindult, egy egyedi IDt és egy random jelszót kap majd az eszköz. Más eszközök irányíthatják az eszközözed a fent említett ID és jelszó kombinációval, vagy akár manuálisan is elfogadhatsz egy kérést, jelszó nélkül a másik eszközön.

| Mielőtt a szolgáltatás elindult | Miután a szolgáltatás elindult |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/server_off_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/server_on_en.jpg?width=300px) |

{{% notice note %}}.
1. Ha elindítod a szolgáltatást, az alapból kérni fogja a képernyőfelvételi jogot.s.
2. Amikor a képernypőfelvételi jog nincs megadva, más eszközök nem küldhetnek kérést az eszköz felé.
3. A képernyőfelvételi jogon kívül, a többi jog engedélyezése és visszavonása csak az új kapcsolatokat fogja majd befolyásolni, viszont a már kapcsolódott eszközöket nem. Ha egy már kapcsolódott eszözzel kell jogokat módosítanod, akkor elsőnek zárd be a jelenlegi kapcsolatot, módosítsd a jogokat, majd kérvényezz újat.
{{% /notice %}}

##### PC

![](/docs/en/manual/mobile/images/android_server_pc_side_en.png?width=700px)

##### Mobil terminál

| Akármikor megállíthatod a szolgáltatást, vagy bezárhatsz egy specifikus kapcsolatot | Küldhetsz, vagy kaphatsz üzenetetek a chaten keresztül |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/server_on_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/android_server2_en.jpg?width=300px) |