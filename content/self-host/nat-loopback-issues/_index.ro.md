---
title: Probleme NAT Loopback
weight: 500
pre: "<b>2.5. </b>"
---

{{% notice note %}}
Această explicație implică noțiuni complexe de rețea; vă rugăm să ne ajutați să o îmbunătățim pentru lizibilitate.
{{% /notice %}}

Pentru mai multe detalii despre NAT Loopback, consultați pagina [Wikipedia](https://en.m.wikipedia.org/wiki/Network_address_translation#NAT_hairpinning).

Când implementați un server RustDesk pe rețeaua de acasă sau pe orice rețea din spatele unui NAT/firewall, serverul RustDesk și clienții dvs. **TREBUIE** fie:
A: Să folosească adrese IP locale pentru a se accesa reciproc SAU
B: Să folosească un router/firewall care suportă și are activată funcția NAT Loopback.

Este posibil să observați că nu reușiți să vă conectați la server utilizând **IP-ul public** sau **domeniul** (care, în teorie, indică IP-ul public).

## Problema

În acest exemplu urmărim ce se întâmplă când un dispozitiv LAN încearcă să se conecteze la `rustdesk.example.com`. Să presupunem că IP-ul public al routerului este `172.16.16.1`, IP-ul LAN al serverului este `192.168.11.20`, domeniul dorit este `rustdesk.example.com`, iar clientul folosește `192.168.11.2`.

Când configurați un server în spatele NAT-ului routerului, puteți adăuga o regulă de port forwarding în router astfel încât orice mesaje care vin către IP-ul PUBLIC `172.16.16.1` să fie redirecționate către serverul `192.168.11.20`.

Când un dispozitiv din LAN vrea să acceseze internetul, de exemplu un webserver la `8.8.8.8`, trimite cererea ca provenind de la `192.168.11.2` către router. Routerul va intercepta cererea și o va rescrie astfel încât solicitarea către `8.8.8.8` pare că vine de la `172.16.16.1`. Când `8.8.8.8` răspunde la `172.16.16.1`, routerul caută o conexiune anterioară și redirecționează răspunsul înapoi la `192.168.11.2`.

Dacă utilizatorul de la `8.8.8.8` trimite un mesaj către rețeaua noastră folosind `172.16.16.1`, regula de port forwarding va rescrie destinația `172.16.16.1` către serverul `192.168.11.20`, păstrând sursa cererii `8.8.8.8` astfel încât serverul poate răspunde (mai mult sau mai puțin) direct la `8.8.8.8`.

Dacă cineva de la `8.8.8.8` pretinde că trimite mesaje de la `192.168.11.2`, routerul știe că traficul provenit de la `192.168.11.2` este valid doar din interiorul rețelei LAN și va bloca tipic acel trafic.

Problema apare când încercați să faceți loop-back în LAN. Dacă dispozitivul LAN încearcă să se conecteze la `rustdesk.example.com` (adică `172.16.16.1`), routerul are mai multe opțiuni de procesare. Practic a trimis un pachet de pe portul LAN către portul WAN al său, provenind de la `192.168.11.2` și având destinația `172.16.16.1`. Odată ajuns pe portul WAN, acest pachet este, din perspectiva routerului, nedistinct de un pachet trimis din exterior (un potențial atac).

Funcția NAT Loopback va modifica sursa (partea "From 192.168.11.2") mai devreme în proces, astfel încât routerul să folosească tabela NAT pentru a trece pachetele între server și client înapoi în rețea.

Dacă aveți probleme doar când sunteți în LAN, dar lucrurile funcționează normal din exterior, este foarte probabil să aveți o problemă legată de NAT Loopback.


## Soluții

Există trei metode principale de rezolvare.

### 1. Activați NAT Loopback pe router

Puteți configura NAT Loopback pe router, dacă acesta suportă funcția, dar acest lucru necesită cunoștințe de rețelistică. Unele routere nu au această capacitate, deci nu este soluția universală.

{{% notice note %}}
Un articol de la [MikroTik](https://help.mikrotik.com/docs/display/ROS/NAT#NAT-HairpinNAT) explică conceptul foarte bine. Puteți începe de aici.
{{% /notice %}}

### 2. Rulați un server DNS în LAN

Alegeți una din soluțiile populare, de exemplu [AdGuard Home](https://github.com/AdguardTeam/AdGuardHome/wiki/Docker) sau [Pi-hole](https://github.com/pi-hole/docker-pi-hole). Le puteți rula în Docker sau pe aceeași mașină cu serverul RustDesk. Exemplul de mai jos arată pașii generali.

Ambele sunt, în esență, servere DNS cu funcții de blocare a reclamelor, dar puteți dezactiva blocarea dacă nu o doriți.

Mai întâi, indicați domeniul dvs. către IP-ul LAN al serverului RustDesk (ex.: `192.168.11.20`). Apoi, în setările DHCP ale routerului (ATENȚIE: nu în setarea WAN), setați adresa DNS primară la serverul pe care ați instalat AdGuard Home sau Pi-hole. DNS-ul secundar poate fi DNS-ul ISP sau un DNS public (ex. `1.1.1.1` sau `8.8.8.8`).

Exemple practice:
#### AdGuard Home
Dacă doriți să dezactivați funcția de blocare (pentru a evita probleme), folosiți butonul "Disable protection".

![](/docs/en/self-host/nat-loopback-issues/images/adguard_home_disable_protection.png)
<br>

Accesați setarea "DNS rewrites".

![](/docs/en/self-host/nat-loopback-issues/images/adguard_home_click_dns_rewrites.png)
<br>

Click pe "Add DNS rewrite", apoi introduceți domeniul (`domain`) și IP-ul LAN al serverului.

![](/docs/en/self-host/nat-loopback-issues/images/adguard_home_dns_rewrite_dialog.png)

Rezultatul final ar trebui să arate astfel:

![](/docs/en/self-host/nat-loopback-issues/images/adguard_home_dns_rewrite_final_result.png)

***Nu uitați să assignați AdGuard Home ca DNS în DHCP-ul routerului!***
<hr>

#### Pi-hole
Dacă doriți să dezactivați blocarea reclamelor, folosiți opțiunea "Indefinitely" din meniul "Disable Blocking".

![](/docs/en/self-host/nat-loopback-issues/images/pi_hole_disable_blocking.png)

Mergeți la "Local DNS → DNS Records" și adăugați o înregistrare cu domeniul și IP-ul serverului.

![](/docs/en/self-host/nat-loopback-issues/images/pi_hole_local_dns_dns_records.png)

***Nu uitați să assignați Pi-hole ca DNS în DHCP-ul routerului!***

### 3. Adăugați reguli în fișierul hosts

Această metodă este recomandată doar pentru un număr mic de dispozitive. Dacă aveți multe dispozitive, folosiți soluția DNS descrisă mai sus, deoarece altfel va trebui să editați hosts pe fiecare dispozitiv.

{{% notice warning %}}
Dacă folosiți această metodă pe un dispozitiv portabil (de ex. laptop), acesta nu va putea accesa serverul când este în afara rețelei LAN.
{{% /notice %}}

Path-uri pentru diferite sisteme de operare:

#### Windows
```text
C:\Windows\system32\drivers\etc\hosts
```
Puteți edita fișierul cu privilegii elevate sau copia fișierul pe Desktop, edita și apoi copia înapoi la locația originală.

#### macOS
```text
/etc/hosts
```
Puteți folosi `vim` (preinstalat):
```sh
sudo vim /etc/hosts
```

#### Linux
```text
/etc/hosts
```
Puteți folosi `vim` sau `nano`:
```sh
sudo vim /etc/hosts
```

Formatul este același pe toate sistemele. IP-ul pe primul loc, urmat de domeniu; câte o intrare pe linie.

Exemplu:
```text
192.168.11.20   rustdesk.example.com
```