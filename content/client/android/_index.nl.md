---
title: Beheer uw Android 
weight: 4
---

### Deel scherm/bestanden van uw Android-telefoon
------

Vanaf versie 1.1.9 heeft de Android-client de functies toegevoegd voor het delen van het telefoonscherm en het delen van het bestandssysteem van de telefoon.

- Android 6 en hoger is vereist voor scherm delen
- Android 10 of hoger is vereist om de interne audio van het mobiele telefoonsysteem te delen
- iOS ondersteunt nog geen schermdeling


#### **Toestemming vragen en services starten**

Klik op `Scherm delen` in de onderste navigatiebalk

Configureer verschillende toestemmingen als dat nodig is. Elke keer dat u RustDesk opstart, moet u de toestemmingen " Schermopname" en "Invoercontrole" opnieuw aanvragen.

![](images/server_off_en.jpg?width=300px)

| Toestemmingen     | Beschrijving                                               |
| --------------- | --------------------------------------------------------- |
| Schermopname | Of de toestemming voor het delen van schermopnamen moet worden ingeschakeld, de monitoring service zal tegelijk met het opstarten worden ingeschakeld. |
| Invoercontrole* | Of de controller de invoer van de mobiele telefoon mag besturen, zoals virtuele touchscreenbediening met de muis |
| Bestandsoverdracht* | Of u toestemming geeft voor bestandsoverdracht, na het opstarten kunt u het bestandssysteem van deze telefoon op afstand bedienen. |
| Audio-opname  | Of de systeemmuziek in de telefoon moet worden gedeeld (geen microfooningang) |

{{% notice note %}}
Boven * staat voor speciale toestemmingen. Om dergelijke toestemmingen te verkrijgen, moet u naar de Android-systeeminstellingenpagina gaan om ze handmatig te verkrijgen. De details zijn als volgt
{{% /notice %}}

#### **Speciaal Verzoek om Toestemming - Bestand**

| Het aanvragen van Android bestandstoestemmingen zal automatisch naar de systeeminstellingen pagina springen |
| :---------------: |
| ![](images/get_file_en.jpg?width=300px) |

#### **Special Permission Request - mouse input**
| Stap 1 Zoek " Installeerde Services " | Stap 2 Start RustDesk Invoer |
| --------------- | -------------------------------------------------------- |
| ![](images/get_input1_en.jpg?width=300px) | ![](images/get_input2_en.jpg?width=300px) |

{{% notice note %}}
De systeeminstellingspagina van verschillende leveranciers kan verschillen, pas deze aan volgens uw systeempagina.
{{% /notice %}}

**Sneltoetsen voor muisbesturing op afstand:**

- Klik de rechter muisknop: ga terug
- Klik met het muiswiel: Home
- Lang indrukken muiswiel: onlangs geopende apps
- Scrollen met muiswiel: simuleren verticaal schuiven

#### **Start service**

Na het verkrijgen van de `schermopname` toestemming, wordt de service automatisch gestart. U kunt ook op de `Start service` knop klikken om de service te starten. Nadat de service is gestart, kan het bureaublad besturingsverzoeken van andere apparaten accepteren.

Als de toestemming `bestandsoverdracht` is ingeschakeld, kan het ook verzoeken om bestandsbeheer van andere apparaten accepteren.

Nadat de service is gestart, wordt automatisch een uniek ID en een willekeurig wachtwoord voor dit apparaat verkregen. Andere apparaten kunnen het toestel bedienen via het ID en het wachtwoord, of handmatig bevestigen wanneer een nieuw verzoek wordt ontvangen.

| Voordat de service start | Na de start van de service |
| --------------- | -------------------------------------------------------- |
| ![](images/server_off_en.jpg?width=300px) | ![](images/server_on_en.jpg?width=300px) |

{{% notice note %}}
1. Door op `Start Service` te klikken wordt de `Schermopname` standaard ingeschakeld.
2. Wanneer de "schermopname" toestemming niet is verkregen, kunnen andere apparaten geen controleverzoeken doen.
3. Met uitzondering van de `schermopname` toestemming, zal het wijzigen van andere toestemmingen alleen gevolgen hebben voor de nieuwe verbinding, en niet voor de bestaande verbinding. Als u de toestemmingen voor een opgezette verbinding moet wijzigen, sluit dan eerst de huidige verbinding, wijzig de toestemmingen en ontvang dan een controleverzoek.
{{% /notice %}}

##### PC

![](images/android_server_pc_side_en.png?width=700px)

##### Mobiele terminal

| U kunt de service op elk moment stoppen of de opgegeven verbinding sluiten. | U kunt chats ontvangen of starten |
| --------------- | -------------------------------------------------------- |
| ![](images/server_on_en.jpg?width=300px) | ![](images/android_server2_en.jpg?width=300px) |