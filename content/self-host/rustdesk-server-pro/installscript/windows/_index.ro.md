---
title: Instalare Windows (învechit)
weight: 5
---

{{% notice note %}}
Politicile de securitate Windows pot fi complicate; dacă acest tutorial nu funcționează pentru tine sau întâmpini conexiuni instabile, mută serverul pe o mașină Linux.
{{% /notice %}}

{{% notice note %}}
Versiunea GUI, `RustDeskServer.setup.exe`, nu mai este întreținută și nu este recomandată.
{{% /notice %}}

## Instalare

Redistribuibilul Microsoft Visual C++ este necesar pentru a rula RustDesk pe Windows. Îl poți descărca de aici: https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist

1. Obține o licență de la https://rustdesk.com/pricing.html — vezi pagina de [license](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) pentru detalii.
2. Descarcă installer-ul pentru Windows de pe [GitHub](https://github.com/rustdesk/rustdesk-server-pro/releases/latest).
3. Dezarhivează pachetul pentru Windows.
4. Rulează installer-ul și urmează pașii afișați pe ecran. Alternativ, poți instala manual folosind [PM2 sau NSSM](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/windows/).
5. După finalizare, deschide RustDesk Server.
6. Urmează instrucțiunile din interfață pentru configurare.
7. Click pe `Services` și apoi `Start`.
8. După instalare poți accesa `http://adresa-ta-ip:21114`.
9. Autentifică-te cu `admin` / `test1234`.
10. Introdu codul de licență achiziționat la pasul 1.

## Folosirea IIS ca proxy

Asigură-te că `Dynamic Content Compression` este instalat (este o caracteristică IIS care se instalează din Server Roles).
1. Deschide IIS (sau instalează-l).
2. Creează un site nou pentru RustDesk cu binding-urile necesare (ideal port 443) și certificatul corespunzător. Setările de bază pot indica către un director gol. (Dacă folosești site-ul implicit, asigură-te că nu sunt alte fișiere în folder).
3. În IIS instalează [Application Request Routing](https://www.iis.net/downloads/microsoft/application-request-routing) și [URL Rewrite](https://learn.microsoft.com/en-us/iis/extensions/url-rewrite-module/using-the-url-rewrite-module).

## Application Request Routing

1. În consola IIS, deschide Application Request Routing la nivel de server.
2. Mergi la Server Proxy Settings.
3. Activează proxy-ul; poți lăsa celelalte setări la valorile implicite.
4. Salvează setările și treci la pasul URL Rewrite.

## URL Rewrite

1. Selectează site-ul din panoul din stânga și dublu-click pe `URL Rewrite`.
2. Click pe `Add rules`.
3. Creează o regulă nouă de reverse proxy.
4. Configurează adresa locală (portul intern 21114):
	- Inbound Rule – adresa internă RustDesk (21114)
	- Outbound Rules – `From` este adresa internă 21114 și `To` este adresa externă.
	Notă: Nu adăuga `http://` sau `https://` înaintea adreselor — sunt gestionate automat. Asigură-te că adresele sunt accesibile atât intern, cât și extern.

## Compresie

1. Dezactivează `Dynamic Content Compression`.

## Depanare

Dacă primești eroarea 500.52 adaugă variabilele menționate în articolul: [IIS acting as reverse proxy: Where the problems start](https://techcommunity.microsoft.com/t5/iis-support-blog/iis-acting-as-reverse-proxy-where-the-problems-start/ba-p/846259).

Este posibil să fie necesar să schimbi setările SSL la `Require SSL → Ignore`.