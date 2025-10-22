---
title: Configurare client
description: "Configurați clienții RustDesk pentru servere self-hosted. Funcții: generator personalizat de client (Pro) pentru aplicații branduite cu logo-ul dvs., configurare manuală, import/export setări și strategii de implementare enterprise."
keywords: ["rustdesk client configuration", "custom client generator", "rustdesk branded client", "rustdesk white label", "rustdesk enterprise deployment", "rustdesk client setup", "custom rustdesk app", "rustdesk pro client", "rustdesk configuration management", "rustdesk corporate branding"]
weight: 300
pre: "<b>2.3. </b>"
---

## Prezentare generală

Există mai multe modalități de a configura clienții RustDesk pentru a folosi propriul server self-hosted; mai jos sunt prezentate câteva dintre ele.

## 1. Generator de client personalizat (doar Pro, plan basic sau plan custom)

Puteți avea propriul nume, logo, iconiță, configurație, semnare digitală și altele.

În prezent sunt suportate: Windows X64, Mac Arm64 / X64, [Linux](https://twitter.com/rustdesk/status/1788905463678951787) și Android Arm64.

[Video](https://twitter.com/rustdesk/status/1769171628426944539)

![](/docs/en/self-host/client-configuration/images/custom-client-qs.png)
![](/docs/en/self-host/client-configuration/images/web_console_custom_client_config.jpeg)

## 2. Configurare manuală

În fereastra principală a clientului RustDesk faceți clic pe butonul Meniu [ &#8942; ] lângă ID-ul dvs., apoi pe `Network`. Puteți debloca acum setările folosind privilegii elevate și seta `ID`, `Relay`, `API` și `Key`. Este important de reținut că acest `Key` este cheia publică folosită pentru criptarea conexiunii, diferită de cheia de licență primită la achiziția versiunii Pro.

![](/docs/en/self-host/client-configuration/images/network-config.png)

Introduceți host-ul sau adresa IP a `hbbs` în câmpul **ID Server** (pe partea locală și pe partea la distanță). Celelalte două adrese pot fi lăsate necompletate; RustDesk le va deduce automat (dacă nu sunt setate special), iar Relay Server se referă la `hbbr` (port 21117).

de ex.

```nolang
hbbs.example.com
```

sau

```nolang
hbbs.example.com:21116
```

### Setarea `Key`

Pentru a stabili o conexiune criptată către serverul dvs. self-hosted, trebuie să introduceți cheia sa publică. Cheia este de obicei generată la prima rulare a `hbbs` și poate fi găsită în fișierul `id_ed25519.pub` din directorul de lucru / folderul de date.

Ca utilizator `Pro` veți putea, de asemenea, să recuperați `Key` din [web console](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/).

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

### Setarea `API Server`

Aceasta este pentru utilizatorii `Pro` doar. Dacă vă puteți autentifica în consola web, dar nu reușiți să vă autentificați în clientul RustDesk, cel mai probabil nu ați setat corect `API Server`.

Dacă API Server nu rulează pe portul implicit `21114` (este posibil să nu fi deschis acest port în firewall dacă veniți din versiunea open source), specificați `API Server` în mod explicit.
de ex. dacă API Server rulează pe portul HTTPS implicit, specificați `API Server` cu `https://hbbs.example.com`.

Dacă încă nu puteți confirma valoarea `API Server`, accesați pagina de bun venit a consolei web; `API Server` este afișat în imaginea de mai sus (în caseta de input cu eticheta `API:`).

## 3. Configurare folosind Import sau Export

1. Folosiți pașii [de mai sus](https://rustdesk.com/docs/en/self-host/client-configuration/#manual-config) pentru a configura clientul RustDesk pe un dispozitiv.
2. Pe mașina respectivă mergeți la Settings → Network și deblocați setările.
3. Click pe `Export Server Config`.
4. Lipiți șirul copiat într-un editor de text (Notepad etc.).
5. Mergeți la noul client, copiați șirul în clipboard.
6. În clientul RustDesk accesați Settings → Network, deblocați și click pe `Import Server Config`.
7. Setările vor fi lipite automat.
8. Click `Apply`.

## 4. Configurare automată

Cea mai simplă modalitate de configurare automată este folosirea scripturilor de implementare găsite [aici](https://rustdesk.com/docs/en/self-host/client-deployment/).

## 5. Import setări din `Pro` prin clipboard

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

https://github.com/rustdesk/rustdesk-server-pro/discussions/372#discussioncomment-10473298

## 6. Folosiți linia de comandă `--config`
`rustdesk.exe --config <config-string>`

Puteți obține șirul de configurare din consola web (apare în imaginea de mai sus) sau din clientul RustDesk la „Settings → Network” ([discuție](https://github.com/rustdesk/rustdesk/discussions/7118)).