---
title: Windows Portable Elevation
weight: 49
description: "Documentație RustDesk pentru Windows Portable Elevation. Găsiți ghiduri de instalare, configurare, implementare și depanare."
keywords: ["rustdesk portable elevation", "rustdesk uac", "rustdesk windows admin rights", "rustdesk task manager mouse issue", "rustdesk request elevation"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## Răspuns rapid

Folosește portable elevation atunci când rulezi clientul portabil RustDesk, dar ai totuși nevoie de privilegii de administrator pentru anumite sarcini sau acțiuni pe dispozitivul controlat. Este util când clientul complet nu este instalat, dar suportul remote cu privilegii ridicate rămâne necesar.

## Puncte cheie

- Decide dacă elevarea este necesară la pornire sau doar în timpul sesiunii
- Testează prompturile atât pe partea controlată, cât și pe partea de control
- Explică echipei de suport fluxul de elevare înainte de rollout

<!-- GEO-LOCALIZED-INTRO:END -->

Programele portabile pentru Windows nu au privilegii de administrator, ceea ce poate cauza următoarele probleme:

- Ecranul nu poate fi transmis atunci când fereastra UAC (User Account Control) apare.
- Când apare o fereastră elevată, precum Task Manager, mouse-ul devine nefuncțional.

Prin ridicarea privilegiilor, RustDesk poate crea un proces cu privilegii de administrator la pornire sau în timpul unei sesiuni, permițând realizarea de capturi de ecran și operații cu mouse-ul, evitând astfel problemele de mai sus.

## Ridicare la pornire

Astfel, utilizatorii de la distanță nu trebuie să solicite elevare când se conectează. Există două metode:

* Metoda 1: Schimbați numele programului portabil pentru a include `-qs-` sau `-qs.exe` sau `_qs.exe` (>= 1.4.6), sau terminând cu `qs.exe` (1.2.0 ~ 1.4.5). Faceți clic stânga pentru a rula, apoi apăsați `Accept` în fereastra UAC.

* Metoda 2: Faceți clic dreapta și rulați ca administrator.

## Ridicare la capătul controlat

Capătul controlat poate face direct clic pe `Accept and Elevate` la conectare, sau poate apăsa `Elevate` când este deja conectat.

| Connecting | Connected |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/cm_unauth.jpg) | ![](/docs/en/client/windows/windows-portable-elevation/images/cm_auth.jpg) |

## Solicitarea elevării la capătul care controlează

Din meniul de acțiuni, selectați `Request Elevation`. Dacă utilizatorul de la distanță are drepturi de administrator, alegeți `Ask the remote user for authentication`. Dacă folosește un cont Windows standard, alegeți `Transmit the username and password of administrator` și introduceți numele de utilizator și parola unui administrator pe computerul de pe care vă conectați. Puteți face acest lucru imediat după conectare, înainte de a deschide o aplicație ca administrator. **În ambele cazuri, cineva trebuie să răspundă pe computerul de la distanță la solicitarea UAC pentru RustDesk.**

| Menu | Dialog |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/menu.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/dialog.png) |
| **Wait** | **Success** |
| ![](/docs/en/client/windows/windows-portable-elevation/images/wait.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/success.png) |

### Solicitările UAC pentru aplicații și pentru RustDesk

Rularea unei aplicații ca administrator și elevarea privilegiilor RustDesk declanșează solicitări UAC separate. Dacă solicitarea aplicației este deja afișată atunci când cereți elevarea privilegiilor RustDesk, rugați utilizatorul de la distanță să răspundă mai întâi la solicitarea aplicației.

1. În **solicitarea aplicației** (de exemplu, **Procesor de comenzi Windows**), apăsați **Da** pentru a rula aplicația ca administrator sau **Nu** pentru a anula lansarea.
2. În **solicitarea pentru `rustdesk.exe`**, apăsați **Da** pentru a acorda privilegii de administrator programului RustDesk. Dacă Windows solicită datele de autentificare ale unui administrator, introduceți-le înainte de a confirma.

După ce RustDesk a obținut privilegiile necesare, puteți răspunde la solicitările UAC și puteți folosi butoanele care necesită drepturi de administrator de pe computerul de pe care vă conectați. Dacă utilizatorul de la distanță a anulat lansarea aplicației, acum o puteți redeschide ca administrator.

### Dacă solicitarea UAC pentru RustDesk cere din nou datele de autentificare

RustDesk folosește datele de autentificare transmise pentru a porni un proces auxiliar sub contul de administrator. Când procesul solicită elevarea privilegiilor, Windows aplică politica **Control cont utilizator: comportamentul solicitării de elevare pentru administratori în modul de aprobare de către administrator**. În politica de grup, o găsiți în **Configurare computer → Politici → Setări Windows → Setări de securitate → Politici locale → Opțiuni de securitate**.

Dacă este selectată opțiunea **Se solicită acreditări pe desktopul securizat**, cineva trebuie să introducă datele de autentificare ale unui administrator în fereastra UAC pentru `rustdesk.exe` pe computerul de la distanță, chiar dacă le-ați trimis deja de pe computerul de control. Acest lucru este valabil și dacă solicitați elevarea înainte de a deschide altă aplicație. [Documentația Microsoft privind politicile UAC](https://learn.microsoft.com/en-us/windows/security/application-security/application-control/user-account-control/settings-and-configuration)

## Cum să alegeți

| Scenariu | Metodă |
| :---: | :---: |
| Nu este necesară elevarea | Instalați programul |
| Nu este nimeni disponibil la capătul controlat | Redenumiți<br/>*sau*<br/> Rulați ca administrator |
| Există un utilizator la capătul controlat<br/>*și*<br/> Elevare imediată la conectare<br/>*și*<br/> Conexiune acceptată prin click | Faceți clic `Accept and Elevate` la primirea conexiunii la capătul controlat |
| Există un utilizator la capătul controlat<br/>*și*<br/> Elevare la nevoie | Faceți clic `Elevate` în fereastra de gestionare a conexiunii la capătul controlat<br/>*sau*<br/> Solicitați elevarea de la capătul care controlează |