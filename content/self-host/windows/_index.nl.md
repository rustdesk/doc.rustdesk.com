---
title: Windows & pm2 of NSSM
weight: 20
---

## Een kruispunt
Je hebt nu twee keuzes, je kunt pm2 (makkelijker) of NSSM (iets moeilijker) gebruiken om de rustdesk server te starten.
Er zijn enkele voordelen aan het gebruik van NSSM:
- Achterwaartse compatibiliteit met oudere versies van Windows (Windows Server 2008R2/Windows 7 en eerder, hoewel niet getest).
- Ideaal voor Windows Server
- Automatisch starten bij het opstarten van de computer zonder inloggen (de gebruiker die het opstartgegeven heeft aangemaakt, hoeft niet in te loggen om het op te starten).
- Beide systemen draaien als Services.
- Alleenstaand (geen afhankelijkheid van nodejs)

Terwijl de voordelen van pm2 zijn:
- Goed idee als je de server op dezelfde computer draait als je werkcomputer.
- U logt regelmatig in op de gebruiker die de rustdesk opstart invoer heeft aangemaakt
- Gebruiksvriendelijker

## Installeren met NSSM

### NSSM Installeren
Ga naar [download](http://nssm.cc/release/nssm-2.24.zip) en pak NSSM uit, selecteer de juiste
architectuur van uw Windows systeem ( indien x86, gebruik de inhoud van de win32 map, indien x64, gebruik de
inhoud van de win64-map). Het is ook het beste om de bestanden van NSSM in de map
`Program Files\NSSM` (als NSSM als service is gestart, kan het niet meer verplaatst worden uit de map waarin het is geplaatst.
U kunt het dus het beste onderbrengen in de map Program files) van uw installatiestation (meestal station C).
Het is ook raadzaam om het path (zoals `C:\Program Files\NSSM`) toe te voegen aan de path variabele.

### Controleren of NSSM goed is aangemaakt
Als je alles goed hebt gedaan moet de map `C:\Program Files\NSSM` (in dit voorbeeld gebruik ik de C:
schijf, maar je kunt de schijf gebruiken waarop je Windows hebt staan of welk ander path je wilt).
alleen het bestand `nssm.exe` bevatten.

In dit voorbeeld gebruiken we `C:\Program Files\NSSM`.

Open het Commando prompt (CMD) en voer `nssm` uit, als je een help pagina ziet bent je klaar om naar de volgende stap te gaan

### Voer hbbr en hbbs uit
Download de Windows versie van het [serverprogramma] (https://github.com/rustdesk/rustdesk-server/releases).
Unzip het programma naar `C:\Program Files\RustDesk Server` (of waar je maar wilt, zorg ervoor dat
het niet verandert nadat de service is ingesteld). Ga nu terug naar de Command prompt

In dit voorbeeld gebruiken we `C:\Program Files\RustDesk Server`.
```cmd
nssm install "RustDesk hbbs service" "C:\Program Files\RustDesk Server\hbbs.exe" -r 0.0.0.0 -k _
nssm install "RustDesk hbbr Service" "C:\Program Files\RustDesk Server\hbbr.exe" -k _
```
**Merk op:**
- U kunt `RustDesk hbbs service` wijzigen in wat u wenst om de service hbbs te benoemen
- U kunt `RustDesk hbbr service` aanpassen in wat u wenst om hbbr de service te noemen.
- U kunt `C:\Program Files\RustDesk Server\hbbs.exe` veranderen naar waar u de rustdesk bestanden heeft geplaatst.
- U kunt `C:\Program Files\RustDesk Serverhbbr.exe` veranderen naar waar u de rustdesk bestanden hebt geplaatst
- U hebt de optie `-k _` niet nodig, die is optioneel, het is alleen voor een betere beveiliging

**Commando-sjablonen:**

De commando-sjabloon voor het geval u alleen maar wenst te kopieren en plakken, en te bewerken.

```cmd
nssm install <Desired hbbs servicename> <RustDesk hbbs binary path> <RustDesk hbbs arguments>
nssm install <Desired hbbr servicename> <RustDesk hbbr binary path> <RustDesk hbbr arguments>
```

**Start services**
Na een geslaagde installatie van de services moeten ze worden gestart.
```cmd
nssm start <Desired hbbs servicename>
nssm start <Desired hbbr servicename>
```


**Klaar !**

(De bovenstaande methode is getest op Windows Server Core 2022 Standaard).

## of

## Installeren met pm2

### Installeer NodeJs

Ga naar [download](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi) en installeer Node.js.
NodeJs is de runtime-omgeving van pm2, dus u moet NodeJs eerst installeren。

### Installeer pm2

Voer de onderstaande regels in `cmd.exe` in, druk op de <kbd>Enter</kbd> toets voor elke regel, en voer ze regel voor regel uit.

```cmd
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### Voer hbbr en hbbs uit

Download de Windows-versie van het [serverprogramma] (https://github.com/rustdesk/rustdesk-server/releases). Unzip het programma naar de C: drive. Voer de volgende vier commando's uit (let op de `-r` parameter):

```cmd
cd c:\rustdesk-server-windows-x64
pm2 start hbbs.exe -- -r <De host waar hbbr draait>
pm2 start hbbr.exe
pm2 save
```

### Bekijk het logbestand

```cmd
pm2 log hbbr
pm2 log hbbs
```
