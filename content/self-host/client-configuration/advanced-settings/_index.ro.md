---
title: Setări avansate
weight: 49
---

Toate setările avansate pentru clienții personalizați sunt descrise aici.

## Niveluri de privilegii pentru setări

Există patru tipuri de setări:

1. Setări Override, în `Web Console` → `Custom Clients`
2. Setări implicite (Default), în `Web Console` → `Custom Clients`
3. Setări ale utilizatorului, în clientul RustDesk
4. Setări de strategie (Strategy), în `Web Console` → `Strategies`

ierarhia privilegiilor pentru aceste setări este: `Override > Strategy > User > Default`.

## Setări de securitate

### access-mode

Setează modul de acces (permisiunile) pentru conexiunile primite.

**Locație**:

1. **Desktop** Settings → Security → Permissions
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | custom, full, view | custom | `access-mode=custom` |

### enable-keyboard

Activează tastatura / mouse pentru conexiunile primite.

**Locație**:

1. **Desktop** Settings → Security → Permissions → Enable keyboard
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-keyboard=Y` |

### enable-clipboard

Activează copierea și lipirea (clipboard) pentru conexiunile primite.

**Locație**:

1. **Desktop** Settings → Security → Permissions → Enable clipboard
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-clipboard=Y` |

### enable-file-transfer

Activează copierea/lipirea de fișiere sau transferul de fișiere (în sesiune) pentru conexiunile primite.

**Locație**:

1. **Desktop** Settings → Security → Permissions → Enable file transfer
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-file-transfer=Y` |


### enable-camera

Activează camera pentru conexiunile primite.

**Locație**:

1. **Desktop** Settings → Security → Permissions → Enable camera
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-camera=Y` |

### enable-terminal

Activează terminalul pentru conexiunile primite.

**Locație**:

**Desktop** Settings → Security → Permissions → Enable terminal

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-terminal=Y` |

### enable-remote-printer

Activează imprimanta la distanță pentru conexiunile primite.

**Locație**:

1. **Windows** Settings → Security → Permissions → Enable remote printer

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-remote-printer=Y` |

### enable-audio

Activează înregistrarea audio și transmiterea către peer.

**Locație**:

1. **Desktop** Settings → Security → Permissions → Enable audio
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-audio=Y` |

### enable-tunnel

Activează tunneling TCP.

**Locație**:

1. **Desktop** Settings → Security → Permissions → Enable TCP tunneling
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-tunnel=Y` |

### enable-remote-restart

Activează repornirea de la distanță de către partea care controlează.

**Locație**:

1. **Desktop** Settings → Security → Permissions → Enable remote restart
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-remote-restart=Y` |

### enable-record-session

Activează înregistrarea sesiunilor.

**Locație**:

1. **Desktop** Settings → Security → Permissions → Enable recording session
2. **Mobile** Settings → Share screen → Enable recording session

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-record-session=Y` |

### enable-block-input

Permite părții care controlează blocarea input-ului altor utilizatori.

**Locație**:

1. **Desktop** Settings → Security → Permissions → Enable blocking user input (Windows only)
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-block-input=Y` |

### allow-remote-config-modification

Permite părții care controlează să modifice setările în UI-ul RustDesk al părții controlate.

**Locație**:

1. **Desktop** Settings → Security → Permissions → Enable remote configuration modification
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-remote-config-modification=Y` |

### enable-lan-discovery

Permite descoperirea în LAN.

După descoperirea LAN, [WOL](https://en.wikipedia.org/wiki/Wake-on-LAN) poate funcționa dacă este suportat local.

**Locație**:

1. **Desktop** Settings → Security → Security → Deny LAN discovery
2. **Mobile** Settings → Share screen → Deny LAN discovery

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| Y | Y, N | Y | `enable-lan-discovery=Y` |

### direct-server

Activează accesul direct prin IP.

**Locație**:

1. **Desktop** Settings → Security → Security → Enable direct IP access
2. **Mobile** Settings → Share screen → Direct IP access

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `direct-server=Y` |

### direct-access-port

Portul pentru acces direct prin IP.

**Locație**:

1. **Desktop** Settings → Security → Security → Direct IP access port (Show if "Enable direct IP access" is checked)
2. **Mobile** Settings → Share screen → Direct IP access

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N |  | 21118 | `direct-access-port=21118` |

### whitelist

Folosește whitelist pentru IP-uri.

**Locație**:

1. **Desktop** Settings → Security → Security → Use IP Whitelisting
2. **Mobile** Settings → Share screen → Use IP Whitelisting

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | `,` or `<ip1>,<ip2>,<ip3>` | `,` means no filter | `whitelist=,` |

### allow-auto-disconnect & auto-disconnect-timeout

Închide automat sesiunile primite după o perioadă de inactivitate a utilizatorului.

**Locație**:

1. **Desktop** Settings → Security → Security → Automatically close incoming sessions on user inactivity
2. **Mobile** Settings → Share screen → Automatically close incoming sessions on user inactivity

| Option | Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: | :------: |
| allow-auto-disconnect | N | Y, N | N | `allow-auto-disconnect=Y` |
| auto-disconnect-timeout | N | Timeout in minutes | 10 | `auto-disconnect-timeout=10` |

### allow-only-conn-window-open

Permite conexiunea doar dacă fereastra RustDesk este deschisă.

**Locație**:

1. **Desktop** Settings → Security → Security → Only allow connection if RustDesk window is open
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-only-conn-window-open=N` |

### approve-mode

Acceptă conexiunile primite prin parolă sau prin click manual.

**Locație**:

1. **Desktop** Settings → Security → Password → Dropdown box
2. **Mobile** Share screen → Dropdown menu on right-up corner

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | password, click, password-click | password-click | `approve-mode=password-click` |

### verification-method

Tipul de parolă care poate fi folosit; `temporary password` se referă la parola temporară/one-time.

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | use-temporary-password, use-permanent-password, use-both-passwords | use-both-passwords | `verification-method=use-permanent-password` |

### temporary-password-length

1. **Desktop** Settings → Security → Password → One-time password length
2. **Mobile** Share screen → Dropdown menu on right-up corner → One-time password length

Lungimea parolei temporare.

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | 6, 8, 10 | `temporary-password-length=6` |

### proxy-url

URL-ul proxy-ului.

În prezent sunt suportate `http` și `socks5`.

**Locație**:

1. **Desktop** Settings → Network → Proxy → Socks5/Http(s) proxy
2. **Mobile**

Exemple:

1. **http** `proxy-url=http://192.168.0.2:12345`
2. **https** `proxy-url=https://192.168.0.2:12345`
3. **socks5** `proxy-url=socks5://192.168.0.2:1080`

### proxy-username & proxy-password

Utilizator și parolă pentru proxy.

**Locație**:

1. **Desktop** Settings → Network → Proxy → Socks5/Http(s) proxy
2. **Mobile**

| Option | Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: | :------: |
| proxy-username | N | | | `proxy-username=user` |
| proxy-password | N | | | `proxy-password=pass` |

## Setări generale

### theme

Controlează tema UI a clientului RustDesk.

**Locație**:

1. **Desktop** Settings → General → Theme
2. **Mobile** Settings → Settings → Theme

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | dark, light, system | system | `theme=system` |

### lang

Controlează limba clientului RustDesk.

**Locație**:

1. **Desktop** Settings → General → Language
2. **Mobile** Settings → Settings → Language

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | default, ar, bg, ... | default | `lang=default` |

Limbile disponibile în prezent sunt:

ar, bg, ca, cs, da, de, el, en, eo, es, et, fa, fr, he, hr, hu, id, it, ja, ko, kz, lt, lv, nb, nl, pl, pt, ro, ru, sk, sl, sq, sr, sv, th, tr, uk, vn, zh-cn, zh-tw

Puteți verifica [LANGS](https://github.com/rustdesk/rustdesk/blob/master/src/lang.rs#L45) din cod pentru lista actualizată de limbi.

### allow-auto-record-incoming

Înregistrează automat sesiunile primite.

**Locație**:

1. **Desktop** Settings → General → Recording → Automatically record incoming sessions
2. **Mobile** Settings → Recording → Automatically record incoming sessions

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-incoming=Y` |

### allow-auto-record-outgoing

Înregistrează automat sesiunile inițiate.

**Locație**:

1. **Desktop** Settings → General → Recording → Automatically record outgoing sessions
2. **Mobile** Settings → Recording → Automatically record outgoing sessions

| Install required | Values | Default | Example | Version |
| :------: | :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-outgoing=Y` | >= 1.3.2 |

### video-save-directory

Directorul în care sunt salvate videoclipurile înregistrate.

**Locație**:

1. **Desktop** Settings → General → Recording → Video save directory
2. **Mobile** Settings → Recording

Valori implicite:

1. **macOS** ~/Movies/**app_name**
2. **Linux** ~/Videos/**app_name**
3. **Windows** %USERPROFILE%\Videos\\**app_name**
4. **Android** /Storage/emulated/0/**app_name**/ScreenRecord

**Notă**: Înlocuiți **app_name** cu numele aplicației curente.

### enable-confirm-closing-tabs

Controlează afișarea unui dialog de confirmare înainte de a închide toate tab-urile remote.

**Locație**:

1. **Desktop** Settings → General → Other → Confirm before closing multiple tabs
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-confirm-closing-tabs=Y` |

### enable-abr

Activează bitrate adaptiv.

**Locație**:

1. **Desktop** Settings → General → Other → Adaptive bitrate
2. **Mobile** Settings → Share screen → Adaptive bitrate (beta)

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-abr=Y` |

### allow-remove-wallpaper

Elimină wallpaper-ul în timpul sesiunilor primite.

**Locație**:

1. **Desktop** Settings → General → Other → Remove wallpaper during incoming sessions
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-remove-wallpaper=N` |

### enable-open-new-connections-in-tabs

Controlează dacă o conexiune nouă se deschide într-un tab sau într-o fereastră nouă.

**Locație**:

1. **Desktop** Settings → General → Other → Open connection in new tab
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-open-new-connections-in-tabs=Y` |

### allow-always-software-render

Folosește întotdeauna rendering software.

**Locație**:

1. **Desktop** Settings → General → Other → Always use software rendering
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-always-software-render=N` |

### allow-linux-headless

Permite conexiuni primite dacă nu există display-uri (headless).

Această opțiune necesită mediu desktop, server Xorg și GDM, vezi [PR 3902](https://github.com/rustdesk/rustdesk/pull/3902).

**Locație**:

1. **Desktop** Settings → General → Other → Allow Linux headless
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-linux-headless=N` |

### enable-hwcodec

Activează encodarea hardware pentru a face imaginea mai fluidă.

**Locație**:

1. **Desktop**
2. **Mobile** Settings → Hardware codec

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-hwcodec=Y` |

### peer-card-ui-type

Controlează modul de afișare al cardurilor pentru peer (Big tiles, Small tiles, List).

**Locație**:

1. **Desktop** Home → Peer panel → Right top grid icon
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | 0, 1, 2 | 0 | `peer-card-ui-type=0` |

**0** Big tiles  
**1** Small tiles  
**2** List

### peer-sorting

Controlează ordonarea cardurilor peer.

**Locație**:

1. **Desktop** Home → Peer panel → Right top sort icon
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Remote ID, Remote Host, Username | Remote ID | `peer-sorting=Remote ID` |

### sync-ab-with-recent-sessions

Sincronizează agenda cu sesiunile recente.

**Locație**:

1. **Desktop** Home → Peer panel → Address book → Tags → Dropdown menu → Sync with recent sessions
2. **Mobile** Home → Peer panel → Address book → Tags → Dropdown menu → Sync with recent sessions

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-with-recent-sessions=N` |

### sync-ab-tags

Controlează sortarea tag-urilor din agenda.

**Locație**:

1. **Desktop** Home → Peer panel → Address book → Tags → Dropdown menu → Sort tags
2. **Mobile** Home → Peer panel → Address book → Tags → Dropdown menu → Sort tags

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-tags=N` |

### filter-ab-by-intersection

Filtrează agenda după intersecția tag-urilor.

**Preview**: [PR #5985](https://github.com/rustdesk/rustdesk/pull/5985)

**Locație**:

1. **Desktop** Home → Peer panel → Address book → Tags → Dropdown menu → Filter by intersection
2. **Mobile** Home → Peer panel → Address book → Tags → Dropdown menu → Filter by intersection

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `filter-ab-by-intersection=N` |

### use-texture-render

**Locație**:

**Desktop** Settings → General → Other → Use texture render

Folosiți redarea pe texturi pentru imagini mai line. Dacă întâmpinați probleme de redare, încercați dezactivarea acestei opțiuni. Disponibil doar pe desktop.

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | linux:Y, macOS:N, win7:N, win10+:Y | `use-texture-render=Y` |

### enable-udp-punch

**Locație**:

**Desktop** Settings → General → Other → Enable UDP hole punching
**Mobile** Settings → Enable UDP hole punching

Disponibil din RustDesk 1.4.1, RustDesk Server Pro 1.6.2

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | Y | `enable-udp-punch=N` |

### enable-ipv6-punch

**Locație**:

**Desktop** Settings → General → Other → Enable IPv6 P2P connection
**Mobile** Settings → General → Other → Enable IPv6 P2P connection

Disponibil din RustDesk 1.4.1, RustDesk Server Pro 1.6.2

| Values | Default | Example |
| :------: | :------: | :------: |
| Y, N | selfhost:N, otherwise:Y | `enable-ipv6-punch=N` |

## Setări de afișare

### view-only

Această opțiune va seta modul "view-only" pentru fiecare peer după prima conexiune.

Apoi opțiunea "view-only" din setările fiecărui peer va controla dacă conexiunea este doar vizualizare.

**Locație**:

1. **Desktop** Settings → Display → Other default options → View mode
2. **Mobile** Settings → Display settings → Other default options → View mode

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `view-only=Y` |

### show-monitors-toolbar

Controlează afișarea monitorelor în bara de instrumente.

![show-monitors-toolbar](/docs/en/self-host/client-configuration/advanced-settings/images/show-monitors-toolbar.png)

**Locație**:

1. **Desktop** Settings → Display → Other default options → Show monitors toolbar
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-monitors-toolbar=Y` |

### collapse-toolbar

Controlează dacă bara de instrumente remote este restrânsă după conectare.

**Locație**:

1. **Desktop** Settings → Display → Other default options → Collapse toolbar
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `collapse-toolbar=Y` |

### show-remote-cursor

Această opțiune va seta opțiunea "show-remote-cursor" pentru fiecare peer după prima conexiune.

Apoi setarea "show-remote-cursor" din setările fiecărui peer va controla afișarea cursorului la distanță.

**Locație**:

1. **Desktop** Settings → Display → Other default options → Show remote cursor
2. **Mobile** Settings → Display settings → Other default options → Show remote cursor

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-remote-cursor=N` |

### follow-remote-cursor

Această opțiune va seta opțiunea "follow-remote-cursor" pentru fiecare peer după prima conexiune.

Apoi setarea "follow-remote-cursor" din setările fiecărui peer va controla urmărirea cursorului la distanță.

**Preview**: [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**Locație**:

1. **Desktop** Settings → Display → Other default options → Follow remote cursor
2. **Mobile** Settings → Display settings → Other default options → Follow remote cursor

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-cursor=Y` |

### follow-remote-window

Această opțiune va seta opțiunea "follow-remote-window" pentru fiecare peer după prima conexiune.

Apoi setarea "follow-remote-window" din setările fiecărui peer va controla urmărirea ferestrei la distanță.

**Preview**: [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**Locație**:

1. **Desktop** Settings → Display → Other default options → Follow remote window focus
2. **Mobile** Settings → Display settings → Other default options → Follow remote window focus

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-window=Y` |

### zoom-cursor

Această opțiune va seta opțiunea "zoom-cursor" pentru fiecare peer după prima conexiune.

Setarea "zoom-cursor" din setările fiecărui peer va controla dacă cursorul este scalat în funcție de scala imaginii.

**Locație**:

1. **Desktop** Settings → Display → Other default options → Zoom cursor
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `zoom-cursor=Y` |

### show-quality-monitor

Această opțiune va seta opțiunea "show-quality-monitor" pentru fiecare peer după prima conexiune.

Setarea din fiecare peer va controla afișarea monitorului de calitate.

**Locație**:

1. **Desktop** Settings → Display → Other default options → Show quality monitor
2. **Mobile** Settings → Display settings → Other default options → Show quality monitor

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-quality-monitor=Y` |

### disable-audio

Această opțiune va seta opțiunea "disable-audio" pentru fiecare peer după prima conexiune.

Setarea din fiecare peer va controla redarea sunetului.

**Locație**:

1. **Desktop** Settings → Display → Other default options → Mute
2. **Mobile** Settings → Display settings → Other default options → Mute

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-audio=Y` |

### enable-file-copy-paste

Această opțiune va seta opțiunea "enable-file-copy-paste" pentru fiecare peer după prima conexiune.

Setarea din fiecare peer va controla posibilitatea de copiere și lipire de fișiere în conexiune.

**Locație**:

1. **Desktop** Settings → Display → Other default options → Enable file copy and paste (Windows only)
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `enable-file-copy-paste=Y` |

### disable-clipboard

Această opțiune va seta opțiunea "disable-clipboard" pentru fiecare peer după prima conexiune.

Setarea din fiecare peer va controla dacă este activată copierea și lipirea de text.

**Locație**:

1. **Desktop** Settings → Display → Other default options → Disable clipboard
2. **Mobile** Settings → Display settings → Other default options → Disable clipboard

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-clipboard=Y` |

### lock-after-session-end

Această opțiune va seta opțiunea "lock-after-session-end" pentru fiecare peer după prima conexiune.

Setarea din fiecare peer va controla dacă mașina peer este blocată după terminarea sesiunii.

**Locație**:

1. **Desktop** Settings → Display → Other default options → Lock after session end
2. **Mobile** Settings → Display settings → Other default options → Lock after session end

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `lock-after-session-end=Y` |

### privacy-mode

Această opțiune va seta opțiunea "privacy-mode" pentru fiecare peer după prima conexiune.

Setarea din fiecare peer va controla utilizarea modului de confidențialitate după conectare.

**Locație**:

1. **Desktop** Settings → Display → Other default options → Privacy mode
2. **Mobile** Settings → Display settings → Other default options → Privacy mode

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `privacy-mode=Y` |

### i444

Această opțiune va seta opțiunea "i444" pentru fiecare peer după prima conexiune.

Setarea din fiecare peer va controla utilizarea culorii reale (true color).

**Locație**:

1. **Desktop** Settings → Display → Other default options → True color (4:4:4)
2. **Mobile** Settings → Display settings → Other default options → True color (4:4:4)

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `i444=Y` |

### reverse-mouse-wheel

Această opțiune va seta opțiunea "reverse-mouse-wheel" pentru fiecare peer după prima conexiune.

Setarea din fiecare peer va controla inversarea rolului rotiței mouse-ului.

**Locație**:

1. **Desktop** Settings → Display → Other default options → Reverse mouse wheel
2. **Mobile** Settings → Display settings → Other default options → Reverse mouse wheel

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `reverse-mouse-wheel=Y` |

### swap-left-right-mouse

Această opțiune va seta opțiunea "swap-left-right-mouse" pentru fiecare peer după prima conexiune.

Setarea din fiecare peer va controla schimbarea butoanelor stânga-dreapta ale mouse-ului.

**Locație**:

1. **Desktop** Settings → Display → Other default options → Swap left-right mouse button
2. **Mobile** Settings → Display settings → Other default options → Swap left-right mouse button

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `swap-left-right-mouse=Y` |

### displays-as-individual-windows

Această opțiune va seta opțiunea "displays-as-individual-windows" pentru fiecare peer după prima conexiune.

Setarea din fiecare peer va controla afișarea display-urilor ca ferestre individuale.

**Preview**: [PR 5945](https://github.com/rustdesk/rustdesk/pull/5945)

**Locație**:

1. **Desktop** Settings → Display → Other default options → Show displays as individual windows
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `displays-as-individual-windows=Y` |

### use-all-my-displays-for-the-remote-session

Această opțiune va seta opțiunea "use-all-my-displays-for-the-remote-session" pentru fiecare peer după prima conexiune.

Setarea din fiecare peer va controla utilizarea tuturor display-urilor pentru sesiunea remote.

**Preview**: [PR 6064](https://github.com/rustdesk/rustdesk/pull/6064)

**Locație**:

1. **Desktop** Settings → Display → Other default options → Use all my displays for the remote session
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `use-all-my-displays-for-the-remote-session=Y` |

### view-style

Această opțiune va seta opțiunea "view-style" pentru fiecare peer după prima conexiune.

Setarea din fiecare peer va controla stilul de vizualizare.

**Locație**:

1. **Desktop** Settings → Display → Default view style
2. **Mobile** Settings → Display settings → Default view style

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | original, adaptive | original | `view-style=original` |

### scroll-style

Această opțiune va seta opțiunea "scroll-style" pentru fiecare peer după prima conexiune.

Setarea din fiecare peer va controla stilul de derulare.

**Locație**:

1. **Desktop** Settings → Display → Default scroll style
2. **Mobile**

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | scrollauto, scrollbar, scrolledge | scrollauto | `scroll-style=scrollauto` |

**Notă**: Opțiunea `scrolledge` este disponibilă începând cu RustDesk 1.4.4.

### edge-scroll-edge-thickness

Această opțiune controlează grosimea marginii când `scroll-style` este setat pe `scrolledge`. Grosimea marginii determină dimensiunea zonei derulabile la marginile ecranului.

Această opțiune este efectivă doar când `scroll-style=scrolledge`.

**Locație**:

1. **Desktop** Settings → Display → Edge scroll edge thickness

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | 20-150 | 100 | `edge-scroll-edge-thickness=100` |

**Notă**: Această opțiune este disponibilă începând cu RustDesk 1.4.4.

### image-quality

Această opțiune va seta opțiunea "image-quality" pentru fiecare peer după prima conexiune.

Setarea din fiecare peer va controla calitatea imaginii.

**Locație**:

1. **Desktop** Settings → Display → Default image quality
2. **Mobile** Settings → Display settings → Default image quality

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | best, balanced, low, custom | balanced | `image-quality=balanced` |

### custom-image-quality

Această opțiune va seta opțiunea "custom-image-quality" pentru fiecare peer după prima conexiune.

Setarea din fiecare peer va controla calitatea imaginii când `image-quality` e setat pe `custom`.

**Locație**:

1. **Desktop** Settings → Display → Default image quality → Custom
2. **Mobile** Settings → Display settings → Default image quality → Custom

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | [10.0, 2000.0] | 50.0 | `custom-image-quality=50` |

### custom-fps

Această opțiune va seta opțiunea "custom-fps" pentru fiecare peer după prima conexiune.

Setarea din fiecare peer va controla fps când `image-quality` e setat pe `custom`.

**Locație**:

1. **Desktop** Settings → Display → Default image quality → Custom
2. **Mobile** Settings → Display settings → Default image quality → Custom

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | [5, 120] | 30 | `custom-fps=30` |

### codec-preference

Această opțiune va seta opțiunea "codec-preference" pentru fiecare peer după prima conexiune.

Setarea din fiecare peer va controla codec-ul pentru imagini.

**Locație**:

1. **Desktop** Settings → Display → Default codec
2. **Mobile** Settings → Display settings → Default codec

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | auto, vp8, vp9, av1, h264, h265 | auto | `codec-preference=auto` |

**Atenție**: Opțiunile în afară de "vp8" și "vp9" pot să nu funcționeze. Depinde de suportul mașinii.

### terminal-persistent

Această opțiune va seta opțiunea "terminal-persistent" pentru fiecare peer după prima conexiune.

Setarea din fiecare peer va controla păstrarea sesiunilor terminal după deconectare.

**Locație**:

1. **Desktop** Settings → Display → Other default options → Keep terminal sessions on disconnect
2. **Mobile** Settings → Display settings → Other default options → Keep terminal sessions on disconnect

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `terminal-persistent=Y` |

### trackpad-speed

Această opțiune va seta opțiunea "trackpad-speed" pentru fiecare peer după prima conexiune.

Setarea din fiecare peer va controla viteza trackpad-ului implicit.

**Locație**:

1. **Desktop** Settings → Display → Default trackpad speed
2. **Mobile** Settings → Display settings → Default trackpad speed

| Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: |
| N | [10, 1000] | 100 | `trackpad-speed=100` |

## Alte setări

### preset-address-book-name & preset-address-book-tag & preset-address-book-alias & preset-address-book-password & preset-address-book-note

Setează numele prestabilit al agendei (address book), tag-ul dispozitivului, alias-ul dispozitivului, parola dispozitivului și nota dispozitivului. Vezi https://github.com/rustdesk/rustdesk-server-pro/issues/257.
Puteți seta `preset-address-book-name` doar dacă nu doriți să setați tag.
Folosiți un nume și tag valide pe pagina de address book din consola web.

| Option | Install required | Values | Default | Example |
| :------: | :------: | :------: | :------: | :------: |
| preset-address-book-name | N | | | `preset-address-book-name=<address book name>` |
| preset-address-book-tag | N | | | `preset-address-book-tag=<address book tag name>` |
| preset-address-book-alias | N | | | `preset-address-book-alias=<device alias>` |
| preset-address-book-password | N | | | `preset-address-book-password=<device password>` |
| preset-address-book-note | N | | | `preset-address-book-note=<device note>` |

preset-address-book-alias, preset-address-book-password, preset-address-book-note sunt disponibile în clientul RustDesk >=1.4.3, pro >= 1.6.6.

### disable-group-panel

Dezactivează panoul de grup (lângă panoul cărții de adrese, este numit "Dispozitive accesibile" din versiunea 1.3.8) pe clientul RustDesk, https://github.com/rustdesk/rustdesk-server-pro/issues/250.

| Opțiune | Instalare necesară | Valori | Implicit | Exemplu |
| :------: | :------: | :------: | :------: | :------: |
| disable-group-panel | N | Y, N | N | `disable-group-panel=Y` |

### pre-elevate-service

Elevare automată la rulare pentru Windows portabil, https://github.com/rustdesk/rustdesk-server-pro/issues/252.

| Opțiune | Instalare necesară | Valori | Implicit | Exemplu |
| :------: | :------: | :------: | :------: | :------: |
| pre-elevate-service | N | Y, N | N | `pre-elevate-service=Y` |

### disable-floating-window

Când serviciul Android pornește, va afișa o fereastră flotantă, care ajută la prevenirea uciderii serviciului RustDesk de către sistem.

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `disable-floating-window=Y` |

### floating-window-size

Când serviciul Android pornește, va afișa o fereastră flotantă, care ajută la prevenirea uciderii serviciului RustDesk de către sistem. Când dimensiunea este mai mică de 120, fereastra flotantă va fi dificil de apăsat. O dimensiune foarte mică poate să nu poată menține serviciul în fundal pe unele dispozitive.

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| [32, 320] | 120 | `floating-window-size=120` |

### floating-window-untouchable

În mod implicit, apăsarea pe fereastra flotantă va deschide un meniu. După setarea la 'untouchable', apăsarea sau glisarea va trece prin fereastra flotantă și va fi transmisă ferestrei de dedesubt. După setarea la 'untouchable', poziția ferestrei flotante nu poate fi modificată, iar sistemul poate seta automat fereastra flotantă să fie semi-transparentă. Cu toate acestea, această funcție poate să nu funcționeze într-un număr mic de aplicații, cum ar fi aplicația GitHub.

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `floating-window-untouchable=Y` |

### floating-window-transparency

Ferestrele flotante Android au transparență reglabilă. Dacă doriți să activați dar să ascundeți fereastra flotantă, puteți seta transparența la 0, fereastra flotantă va fi setată automat la 'untouchable' pentru a permite trecerea evenimentelor de clic.

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| [0, 10] | 10 | `floating-window-transparency=5` |

### floating-window-svg

Dacă nu este setată o pictogramă pentru fereastra flotantă Android, va afișa în mod implicit pictograma RustDesk.
La setare, vă rugăm să scrieți conținutul text al SVG pe o singură linie și să acordați atenție [limitărilor suportului SVG](https://bigbadaboom.github.io/androidsvg/index.html).

| Implicit | Exemplu |
| :------: | :------: |
| Pictogramă RustDesk | `floating-window-svg=<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1717559129252" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4248" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M950.857143 512c0 242.285714-196.571429 438.857143-438.857143 438.857143S73.142857 754.285714 73.142857 512 269.714286 73.142857 512 73.142857s438.857143 196.571429 438.857143 438.857143z" fill="#1296db" p-id="4249"></path></svg>` |

### keep-screen-on

Aceasta este pentru partea controlată Android. Rețineți că menținerea ecranului aprins depinde de fereastra flotantă.

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| never, during-controlled, service-on | during-controlled | `keep-screen-on=never` |

### enable-directx-capture

Aceasta este pentru partea controlată Windows. Dacă nu întâmpinați probleme, se recomandă utilizarea setărilor implicite, care prioritizează utilizarea DirectX pentru capturi de ecran în loc de utilizarea directă a GDI.

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | Y | `enable-directx-capture=N` |

### enable-android-software-encoding-half-scale

Aceasta este pentru partea controlată Android. În mod implicit, când rezoluția este mai mare de 1200, codificarea hardware folosește rezoluția originală, în timp ce codificarea software folosește jumătate din rezoluție, deoarece codificarea software este mai lentă. Această opțiune este utilizată pentru a seta dacă codificarea software ar trebui scalată la jumătate din rezoluție.

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | Y | `enable-android-software-encoding-half-scale=N` |

### allow-remote-cm-modification

Controlează dacă se permite părții de control să facă clic pe fereastra de gestionare a conexiunii pentru a accepta conexiuni, schimba permisiuni, etc.

https://github.com/rustdesk/rustdesk/issues/7425

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `allow-remote-cm-modification=Y` |

### remove-preset-password-warning

Controlează dacă se elimină avertismentul de securitate din GUI când există o parolă presetată în clientul personalizat.

https://github.com/rustdesk/rustdesk-server-pro/discussions/286

https://github.com/rustdesk/rustdesk/discussions/7956

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | Y | `remove-preset-password-warning=Y` |

### hide-security-settings / hide-network-settings / hide-server-settings / hide-proxy-settings / hide-websocket-settings / hide-remote-printer-settings

Controlează dacă se ascund unele setări. Vă rugăm să vă asigurați că `Disable settings` este dezactivat, altfel acestea nu vor funcționa.

https://github.com/rustdesk/rustdesk-server-pro/issues/263

https://github.com/rustdesk/rustdesk-server-pro/issues/276

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `hide-security-settings=Y` |

### hide-username-on-card

Controlează dacă se afișează numele de utilizator în lista de dispozitive. Pentru că uneori, numele de utilizator este prea lung, va ascunde celelalte informații.

https://github.com/rustdesk/rustdesk-server-pro/issues/284#issuecomment-2216521407

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `hide-username-on-card=Y` |

### hide-help-cards

Controlează dacă se afișează avertismentele UAC / permisiuni în GUI.

https://github.com/rustdesk/rustdesk/issues/8687

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `hide-help-cards=Y` |

### display-name

Schimbă numele de afișare care va fi afișat în pop-up când vă conectați la un dispozitiv la distanță. În mod implicit, afișează mai întâi numele utilizatorului conectat, altfel afișează numele de utilizator al sistemului de operare.

https://github.com/rustdesk/rustdesk-server-pro/issues/277

### disable-udp

Controlează dacă se utilizează doar TCP. Nu va mai folosi UDP 21116, TCP 21116 va fi folosit în schimb.

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `disable-udp=Y` |

### preset-user-name / preset-strategy-name / preset-device-group-name / preset-device-username / preset-device-name / preset-note

Atribuie utilizator / strategie / grup de dispozitive / nume de utilizator dispozitiv / nume-dispozitiv(hostname) / notă la dispozitiv. Puteți face acest lucru și prin [linia de comandă](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/#assign-device-usersgroupsstrategies-to-devices).

https://github.com/rustdesk/rustdesk-server-pro/discussions/304

grupul de dispozitive este disponibil în clientul RustDesk >=1.3.8, pro >= 1.5.0

preset-device-username, preset-device-name, preset-note sunt disponibile în clientul RustDesk >=1.4.3, pro >= 1.6.6.

### default-connect-password

Utilizați `parola de conexiune implicită` pentru a stabili conexiuni la dispozitive la distanță. Această parolă este configurată pe partea de control și nu trebuie confundată cu nicio [parolă presetată](https://github.com/rustdesk/rustdesk/wiki/FAQ#how-can-we-set-up-a-client-with-a-fixed-password-for-unattended-remote-access) găsită pe clientul controlat (doar primire).

ex. `default-connect-password=abcd1234`

### enable-trusted-devices

Permite dispozitivelor de încredere să omită verificarea 2FA.

https://github.com/rustdesk/rustdesk/discussions/8513#discussioncomment-10234494

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | Y | `enable-trusted-devices=N` |

### hide-tray

Dezactivează pictograma din bara de sistem (systray).

https://github.com/rustdesk/rustdesk-server-pro/issues/332

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `hide-tray=Y` |

### one-way-clipboard-redirection

Dezactivează sincronizarea clipboard-ului de la partea controlată la partea de control, disponibil în clientul RustDesk >=1.3.1 (partea controlată)

https://github.com/rustdesk/rustdesk/discussions/7837

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `one-way-clipboard-redirection=Y` |

### one-way-file-transfer

Dezactivează transferul de fișiere de la partea controlată la partea de control, disponibil în clientul RustDesk >=1.3.1 (partea controlată)

https://github.com/rustdesk/rustdesk/discussions/7837

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `one-way-file-transfer=Y` |


### sync-init-clipboard

Dacă se sincronizează clipboard-ul inițial la stabilirea conexiunii (doar de la partea de control la partea controlată), disponibil în clientul RustDesk >=1.3.1 (partea de control)

https://github.com/rustdesk/rustdesk/discussions/9010

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `sync-init-clipboard=Y` |

### allow-logon-screen-password

Dacă se permite introducerea parolei pe ecranul de logare când se folosește [modul de aprobare doar prin clic](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#approve-mode), disponibil în clientul RustDesk >=1.3.1 (partea controlată)

https://github.com/rustdesk/rustdesk/discussions/9269

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `allow-logon-screen-password=Y` |

### allow-https-21114

De obicei, HTTPS folosește portul 443. Când portul serverului API este setat greșit la 21114, clientul RustDesk va elimina setarea portului 21114 în mod implicit. Setarea opțiunii la Y permite utilizarea 21114 ca port HTTPS. Disponibil în clientul RustDesk >=1.3.9.

https://github.com/rustdesk/rustdesk-server-pro/discussions/570

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `allow-https-21114=Y` |

### allow-d3d-render

Redarea D3D poate obține FPS mare și reduce utilizarea CPU, dar ecranul de control la distanță poate fi negru pe unele dispozitive. Disponibil în clientul RustDesk >=1.3.9, doar Windows.

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `allow-d3d-render=Y` |

### allow-hostname-as-id

[Folosește hostname ca id](https://github.com/rustdesk/rustdesk-server-pro/discussions/483), spațiile din hostname sunt înlocuite cu '-'. Acest lucru nu este garantat 100% și se întâmplă doar prima dată când este rulat clientul RustDesk (adică pe un client nou instalat); dacă apare un conflict, va fi atribuit un ID aleatoriu.

Disponibil în clientul RustDesk versiunea 1.4.0 și ulterioară.

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `allow-hostname-as-id=Y` |

### allow-websocket

Folosește protocolul WebSocket pentru a conecta serverul și clientul. Disponibil doar în clientul RustDesk >=1.4.0 și serverul Pro >= 1.5.7. Rețineți că WebSocket suportă doar conexiuni relay.

Pentru a face WebSocket să funcționeze, trebuie să configurați corect proxy-ul reverse, https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms

**Locație**:

**Desktop** Setări → Rețea → Folosește Websocket
**Mobil** Setări → Folosește Websocket

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `allow-websocket=Y` |

### allow-numeric-one-time-password

Această opțiune activează sau dezactivează utilizarea parolelor unice doar numerice.
Disponibilă doar în clientul RustDesk >=1.4.1 și serverul Pro >= 1.5.9.

**Discuție**: https://github.com/rustdesk/rustdesk-server-pro/discussions/685

**Previzualizare**: https://github.com/rustdesk/rustdesk/pull/11846

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `allow-numeric-one-time-password=Y` |

### register-device

Nu înregistrați dispozitivul, nu îl veți vedea în pagina de dispozitive din consola web.

**Disponibil doar în serverul Pro >= 1.6.0 și necesită [licență custom2](https://rustdesk.com/pricing#custom2) și număr de conexiuni simultane >= 2.**

Dacă `register-device=N`, următoarele nu vor funcționa pentru acest dispozitiv.
- Autentificare
- comanda `--assign`
- `preset-address-book-name`, `preset-address-book-tag`, `preset-address-book-alias`, `preset-address-book-password`, `preset-address-book-note` `preset-user-name`, `preset-strategy-name`, `preset-device-group-name`, `preset-device-username`, `preset-device-name`, `preset-note`
- Jurnale de audit
- Strategie

**Discuție**: https://github.com/rustdesk/rustdesk-server-pro/discussions/672 și https://github.com/rustdesk/rustdesk-server-pro/discussions/182

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | Y | `register-device=N` |

### main-window-always-on-top

Menține întotdeauna fereastra principală deasupra.

**Discuție**: https://github.com/rustdesk/rustdesk-server-pro/issues/761

Disponibil doar în clientul RustDesk 1.4.2.

| Instalare necesară | Valori | Implicit | Exemplu |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `main-window-always-on-top=N` |

### relay-server

https://github.com/rustdesk/rustdesk-server-pro/issues/776#issuecomment-3306524913

### disable-discovery-panel

Dezactivează panoul `Discovered` (lângă panoul `Favorites`) pe clientul RustDesk

| Opțiune | Instalare necesară | Valori | Implicit | Exemplu |
| :------: | :------: | :------: | :------: | :------: |
| disable-discovery-panel | N | Y, N | N | `disable-discovery-panel=Y` |

### touch-mode

Controlează dacă se utilizează modul tactil sau modul mouse în timpul sesiunilor de control la distanță.

#### Diferențe de comportament în funcție de versiune

##### RustDesk (Partea de control) < 1.4.3

După prima conexiune, această opțiune setează setarea "touch-mode" pentru fiecare peer. Ulterior, setările individuale ale fiecărui peer determină dacă se utilizează modul tactil sau modul mouse.

**Locație**:

1. **Desktop**
2. **Mobil** Setări → Setări afișare → Alte opțiuni implicite → Mod tactil

##### RustDesk (Partea de control) >= 1.4.3

Această opțiune controlează uniform dacă toate dispozitivele peer folosesc modul tactil sau modul mouse, suprascriind setările individuale ale dispozitivelor.

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `touch-mode=Y` |

### show-virtual-mouse

https://github.com/rustdesk/rustdesk/pull/12911

Controlează afișarea mouse-ului virtual când mobil -> desktop.

**Locație**:

1. **Desktop**
2. **Mobil** Sesiune la distanță -> bară de navigare de jos -> asistent gesturi

Disponibil din RustDesk 1.4.3

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `show-virtual-mouse=Y` |

**Notă**: Această opțiune ar trebui configurată în **Default settings** în loc de **Override settings**.

### show-virtual-joystick

https://github.com/rustdesk/rustdesk/pull/12911

Controlează afișarea joystick-ului virtual când mobil -> desktop.

Această opțiune necesită ca **show-virtual-mouse** să fie activat.

**Locație**:

1. **Desktop**
2. **Mobil** Sesiune la distanță -> bară de navigare de jos -> asistent gesturi

Disponibil din RustDesk 1.4.3

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `show-virtual-joystick=Y` |

**Notă**: Această opțiune ar trebui configurată în **Default settings** în loc de **Override settings**.

### allow-insecure-tls-fallback

În mod implicit, RustDesk verifică certificatul serverului pentru protocoalele care folosesc TLS.

Cu această opțiune activată, RustDesk va reveni la omiterea pasului de verificare și va continua în caz de eșec al verificării.

**Locație**:

**Desktop** Setări → Rețea → Permite revenirea la TLS nesigur
**Mobil** Setări → Permite revenirea la TLS nesigur

Disponibil din RustDesk 1.4.4

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `allow-insecure-tls-fallback=Y` |

### disable-change-permanent-password

Dezactivează posibilitatea de a schimba parola permanentă. Când este activat, utilizatorii nu pot seta sau modifica parola permanentă prin interfața utilizator sau linia de comandă.

Disponibil din RustDesk 1.4.5

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `disable-change-permanent-password=Y` |

### disable-change-id

Dezactivează posibilitatea de a schimba ID-ul dispozitivului. Când este activat, utilizatorii nu pot schimba ID-ul prin interfața utilizator sau linia de comandă.

Disponibil din RustDesk 1.4.5

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `disable-change-id=Y` |

### disable-unlock-pin

Dezactivează utilizarea PIN-ului pentru deblocarea setărilor. Când este activat, utilizatorii trebuie să utilizeze privilegii de administrator de sistem pentru a debloca setările, chiar dacă a fost setat un PIN.

Disponibil din RustDesk 1.4.5

| Valori | Implicit | Exemplu |
| :------: | :------: | :------: |
| Y, N | N | `disable-unlock-pin=Y` |
