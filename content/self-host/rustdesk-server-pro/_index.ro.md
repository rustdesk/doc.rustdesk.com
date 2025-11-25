---
title: RustDesk Server Pro
description: "Complete guide to RustDesk Server Pro - the premium self-hosted remote desktop solution. Features enterprise authentication (OIDC, LDAP, 2FA), web console, API access, and advanced security controls for professional deployment."
keywords: ["rustdesk server pro", "rustdesk pro server", "remote desktop server", "enterprise remote access", "rustdesk professional", "self-hosted rdp", "rustdesk enterprise", "remote desktop solution", "rustdesk licensing", "rustdesk web console"]
weight: 200
pre: "<b>2.2. </b>"
---

RustDesk Server Pro oferă mai multe funcționalități comparativ cu versiunea open source.

- Conturi
- [Consolă web](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/)
- [API](https://github.com/rustdesk/rustdesk/wiki/FAQ#api-of-rustdesk-server-pro)
- [OIDC](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/oidc/), [LDAP](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/ldap/), [2FA](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/2fa/)
- Agendă de adrese
- Management jurnale (conexiuni, transfer fișiere, alarme etc.)
- Management dispozitive
- [Sincronizare setări de securitate](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/strategy/)
- [Control acces](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/permissions/)
- [Multiple servere relay](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/) (selectează automat cel mai apropiat relay)
- [Generator client personalizat](https://rustdesk.com/docs/en/self-host/client-configuration/#1-custom-client-generator-pro-only)
- WebSocket
- Client web self-host

{{% notice note %}}
Dacă ai construit propriul server acasă sau la birou și nu te poți conecta printr-un IP/domeniu public, verifică [acest articol](https://rustdesk.com/docs/en/self-host/nat-loopback-issues/).
{{% /notice %}}

{{% notice note %}}
Recomandăm lecturarea acestei pagini înainte de a continua: [Cum funcționează serverul self-hosted?](/docs/en/self-host/#how-does-self-hosted-server-work).
{{% /notice %}}

## Cerințe hardware

Un VPS la nivel minim este suficient pentru majoritatea cazurilor. Software-ul serverului nu este intensiv în CPU sau memorie. Serverul nostru public pentru ID găzduit pe un Vultr 2 CPU/4 GB deservește peste 1 milion de endpoint-uri. Fiecare conexiune relay consumă în medie 180 KB pe secundă. 1 nucleu CPU și 1 GB RAM sunt suficiente pentru a susține 1000 de conexiuni relay concurente.

## Articole/tutoriale
[Ghid pas cu pas: Self-Host RustDesk Server Pro în cloud cu Docker pentru acces securizat](https://www.linkedin.com/pulse/step-by-step-guide-self-host-rustdesk-server-pro-cloud-montinaro-fwnmf/)

## Tutoriale video

[Ghid pentru începători: Self-Host RustDesk Server Pro pentru utilizatori Linux începători](https://www.youtube.com/watch?v=MclmfYR3frk)

[Ghid rapid: Self-Host RustDesk Server Pro pentru utilizatori Linux avansați](https://youtu.be/gMKFEziajmo)


## Licență

Poți obține o licență de la https://rustdesk.com/pricing.html; verifică pagina de [licențiere](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/) pentru detalii.

## Începe
### 1. Instalare

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

Pentru mai multe detalii, verifică [Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/).

### 2. Porturi necesare

Trebuie să ai porturile `21114`-`21119` TCP și `21116` UDP deschise; asigură-te că acestea sunt configurate în regulile firewall-ului și în mapările Docker.

Mai multe informații despre aceste porturi sunt disponibile [aici](/docs/en/self-host/rustdesk-server-oss/install/#ports).

### 3. Setează licența

Deschide consola web la `http://<adresa-serverului>:21114`, [autentifică-te](/docs/en/self-host/rustdesk-server-pro/console/#log-in) folosind credențialele implicite `admin`/`test1234`. Urmează [acest ghid](/docs/en/self-host/rustdesk-server-pro/license/#set-license) pentru a introduce licența.

### 4. Configurează HTTPS pentru consola web

> Poți sări peste acest pas în perioada de testare dacă nu dorești HTTPS, dar amintește-ți să schimbi adresa API a clientului după instalarea HTTPS.

Iată un tutorial simplu pentru [configurare HTTPS manuală](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).

### 5. Configurează clientul să folosească serverul self-hosted

https://rustdesk.com/docs/en/self-host/client-configuration/

### 6. Configurează WebSocket

Pentru a activa clientul web sau pentru ca [clientul desktop/mobile](/docs/en/self-host/client-configuration/advanced-settings/#allow-websocket) să funcționeze corect cu WebSocket, adaugă următoarele setări în configurația reverse proxy-ului tău.

https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms


## Upgrade server

Acest [ghid](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#there-is-a-new-version-of-rustdesk-server-pro-out-how-can-i-upgrade) explică cum să faci upgrade pentru RustDesk Server Pro între versiuni și acoperă diferite metode de instalare.

## Migrare pe un host nou și backup/restore

Aici este un [tutorial detaliat](https://github.com/rustdesk/rustdesk-server-pro/discussions/184).

## Migrare licență

Urmărește acest [ghid](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-license-retrieval-and-migration) pentru migrarea licenței.

## Upgrade licență

Urmărește [acest ghid](/docs/en/self-host/rustdesk-server-pro/license/#renewupgrade-license) pentru a-ți upgrada licența pentru mai mulți utilizatori sau dispozitive.

## Despre securitate

https://github.com/rustdesk/rustdesk/discussions/9835