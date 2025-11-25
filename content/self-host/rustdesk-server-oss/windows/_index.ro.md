---
title: Windows & PM2 sau NSSM
weight: 20
---

{{% notice note %}}
Politicile de securitate Windows pot fi complicate; dacă acest tutorial nu funcționează pentru tine sau întâmpini conexiuni instabile, mută serverul pe o mașină Linux.
{{% /notice %}}

{{% notice note %}}
Versiunea GUI, `RustDeskServer.setup.exe`, nu mai este întreținută și nu este recomandată.
{{% /notice %}}

## La o răscruce
Acum ai două opțiuni: poți folosi PM2 (mai ușor) sau NSSM (puțin mai dificil) pentru a porni RustDesk Server.
Există câteva avantaje în folosirea NSSM:
- Compatibilitate cu versiuni mai vechi de Windows (Windows Server 2008 R2/Windows 7 și anterioare — neconfirmat).
- Potrivit pentru Windows Server.
- Pornire automată la boot fără autentificare (utilizatorul care a creat intrarea de pornire nu trebuie să se autentifice pentru ca serviciul să pornească).
- Rulează ambele binare ca servicii.
- Independent (fără dependență de Node.js).

Avantajele PM2 includ:
- Recomandat dacă rulezi serverul pe același calculator pe care îl folosești zilnic.
- Te autentifici regulat cu utilizatorul care a creat intrarea de pornire RustDesk.
- Mai prietenos pentru utilizator.

## Instalare folosind NSSM

### Instalare NSSM
Te rog [descarcă](https://github.com/dkxce/NSSM/releases/download/v2.25/NSSM_v2.25.zip) și despachetează NSSM, selectând arhitectura corespunzătoare sistemului tău Windows (dacă e x86 folosește conținutul din folderul `win32`, dacă e x64 folosește `win64`). Este recomandat să muți binarul NSSM în `Program Files\NSSM` (odată pornit ca serviciu, NSSM nu poate fi mutat din directorul în care a fost plasat; este mai bine să-l pui în `Program Files`). De asemenea, este indicat să adaugi calea (de ex. `C:\Program Files\NSSM`) la variabila PATH.

### Verificare instalare NSSM
Dacă totul e corect, folderul `C:\Program Files\NSSM` ar trebui să conțină doar fișierul `nssm.exe` (în exemplul nostru folosim unitatea C:, dar poți folosi orice unitate sau cale dorești).

Deschide Command Prompt și rulează `nssm`; dacă vezi pagina de help, poți continua.

### Rulează hbbr și hbbs
Descarcă versiunea pentru Windows a [RustDesk Server](https://github.com/rustdesk/rustdesk-server/releases). Dezarhivează programul în `C:\Program Files\RustDesk Server` (sau oriunde dorești, doar asigură-te că locația nu se schimbă după instalarea serviciului). Revenind în Command Prompt:

Vom folosi `C:\Program Files\RustDesk Server` în exemplu.
```cmd
nssm install "RustDesk hbbs service" "C:\Program Files\RustDesk Server\hbbs.exe"
nssm install "RustDesk hbbr service" "C:\Program Files\RustDesk Server\hbbr.exe"
```
**Notă:**
- Poți schimba `RustDesk hbbs service` cu orice nume dorești pentru serviciul hbbs
- Poți schimba `RustDesk hbbr service` cu orice nume dorești pentru serviciul hbbr
- Poți schimba `C:\Program Files\RustDesk Server\hbbs.exe` cu locația în care ai plasat binarele RustDesk
- Poți schimba `C:\Program Files\RustDesk Server\hbbr.exe` cu locația în care ai plasat binarele RustDesk

**Template comenzi:**

Modelul de comandă dacă vrei să copiezi și să editezi:

```cmd
nssm install <Nume dorit serviciu hbbs> <Cale binar hbbs> <Argumente hbbs>
nssm install <Nume dorit serviciu hbbr> <Cale binar hbbr> <Argumente hbbr>
```

**Pornește serviciile**

După instalarea serviciilor, pornește-le:
```cmd
nssm start <Nume dorit serviciu hbbs>
nssm start <Nume dorit serviciu hbbr>
```

GATA!

(Metoda de mai sus a fost testată pe Windows Server Core 2022 Standard).

## sau

## Instalare folosind PM2

### Instalare Node.js

Te rog [descarcă](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi) și instalează Node.js. Node.js este mediul de execuție pentru PM2, deci trebuie instalat înainte.

### Instalare PM2

Deschide `cmd.exe` și rulează următoarele comenzi (apăsând Enter după fiecare):

```cmd
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### Rulează hbbr și hbbs

Descarcă versiunea Windows a [RustDesk Server](https://github.com/rustdesk/rustdesk-server/releases). Dezarhivează programul pe unitatea C:. Rulează următoarele comenzi:

```cmd
cd C:\rustdesk-server-windows-x64
pm2 start hbbs.exe
pm2 start hbbr.exe
pm2 save
```

### Vizualizează jurnalele

```cmd
pm2 log hbbr
pm2 log hbbs
```

## Tutoriale alternative
https://pedja.supurovic.net/setting-up-self-hosted-rustdesk-server-on-windows/?lang=lat