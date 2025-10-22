---
title: Windows Portable Elevation
weight: 49
---

Programele portabile pentru Windows nu au privilegii de administrator, ceea ce poate cauza următoarele probleme:

- Ecranul nu poate fi transmis atunci când fereastra UAC (User Account Control) apare.
- Când apare o fereastră elevată, precum Task Manager, mouse-ul devine nefuncțional.

Prin ridicarea privilegiilor, RustDesk poate crea un proces cu privilegii de administrator la pornire sau în timpul unei sesiuni, permițând realizarea de capturi de ecran și operații cu mouse-ul, evitând astfel problemele de mai sus.

## Ridicare la pornire

Astfel, utilizatorii de la distanță nu trebuie să solicite elevare când se conectează. Există două metode:

* Metoda 1: Schimbați numele programului portabil pentru a include `-qs-` (versiunile 1.2.0, 1.2.1, 1.2.2, 1.2.3 se termină cu `qs.exe`). Faceți clic stânga pentru a rula, apoi apăsați `Accept` în fereastra UAC.

* Metoda 2: Faceți clic dreapta și rulați ca administrator.

## Ridicare la capătul controlat

Capătul controlat poate face direct clic pe `Accept and Elevate` la conectare, sau poate apăsa `Elevate` când este deja conectat.

| Connecting | Connected |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/cm_unauth.jpg) | ![](/docs/en/client/windows/windows-portable-elevation/images/cm_auth.jpg) |

## Solicitarea elevării la capătul care controlează

După selectarea `Request Elevation` din meniul de acțiuni, va apărea următorul dialog. Dacă alegeți `Ask the remote user for authentication`, nu va fi nevoie să introduceți un nume de utilizator și o parolă, dar utilizatorul de la distanță trebuie să aibă drepturi de administrator. Dacă selectați `Transmit the username and password of administrator`, utilizatorul de la distanță trebuie doar să apese Accept în fereastra UAC. După trimiterea cererii, așteptați ca utilizatorul de la distanță să accepte fereastra UAC. La confirmare va apărea un mesaj de succes. Rețineți că **ambele metode necesită ca cineva de la capătul controlat să accepte fereastra UAC**. Prin urmare, dacă nu este nimeni disponibil la celălalt capăt, nu solicitați elevarea de la capătul care controlează.

| Menu | Dialog |
| :---: | :---: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/menu.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/dialog.png) |
| **Wait** | **Success** |
| ![](/docs/en/client/windows/windows-portable-elevation/images/wait.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/success.png) |

## Cum să alegeți

| Scenariu | Metodă |
| :---: | :---: |
| Nu este necesară elevarea | Instalați programul |
| Nu este nimeni disponibil la capătul controlat | Redenumiți<br/>*sau*<br/> Rulați ca administrator |
| Există un utilizator la capătul controlat<br/>*și*<br/> Elevare imediată la conectare<br/>*și*<br/> Conexiune acceptată prin click | Faceți clic `Accept and Elevate` la primirea conexiunii la capătul controlat |
| Există un utilizator la capătul controlat<br/>*și*<br/> Elevare la nevoie | Faceți clic `Elevate` în fereastra de gestionare a conexiunii la capătul controlat<br/>*sau*<br/> Solicitați elevarea de la capătul care controlează |