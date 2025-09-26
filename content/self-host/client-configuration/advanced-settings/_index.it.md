---
title: Impostazioni Avanzate
weight: 49
---

Tutte le impostazioni avanzate nei client personalizzati sono coperte qui.

## Livelli di Privilegio per le Impostazioni

Ci sono quattro tipi di impostazioni:

1. Impostazioni di override, nella `Console Web` → `Client Personalizzati`
2. Impostazioni predefinite, nella `Console Web` → `Client Personalizzati`
3. Impostazioni utente, nel client RustDesk
4. Impostazioni strategia, nella `Console Web` → `Strategie`

La gerarchia dei privilegi per queste impostazioni è la seguente: `Override > Strategia > Utente > Predefinito`.

## Impostazioni di Sicurezza

### access-mode

Imposta la modalità di accesso (permessi) per le connessioni in ingresso.

**Posizione**:

1. **Desktop** Impostazioni → Sicurezza → Permessi
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | custom, full, view | custom | `access-mode=custom` |

### enable-keyboard

Abilita l'input di tastiera/mouse per le connessioni in ingresso.

**Posizione**:

1. **Desktop** Impostazioni → Sicurezza → Permessi → Abilita tastiera
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-keyboard=Y` |

### enable-clipboard

Abilita copia e incolla per le connessioni in ingresso.

**Posizione**:

1. **Desktop** Impostazioni → Sicurezza → Permessi → Abilita clipboard
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-clipboard=Y` |

### enable-file-transfer

Abilita copia e incolla di file o trasferimento file (sessione) per le connessioni in ingresso.

**Posizione**:

1. **Desktop** Impostazioni → Sicurezza → Permessi → Abilita trasferimento file
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-file-transfer=Y` |

### enable-camera

Abilita la fotocamera per le connessioni in ingresso.

**Posizione**:

1. **Desktop** Impostazioni → Sicurezza → Permessi → Abilita fotocamera
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-camera=Y` |

### enable-terminal

Abilita il terminale per le connessioni in entrata.

**Posizione**:

**Desktop** Impostazioni → Sicurezza → Autorizzazioni → Abilita terminale

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-terminal=Y` |

### enable-remote-printer

Abilita la stampante remota per le connessioni in ingresso.

**Posizione**:

1. **Windows** Impostazioni → Sicurezza → Permessi → Abilita stampante remota

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-remote-printer=Y` |

### enable-audio

Abilita la registrazione audio e il trasferimento al peer.

**Posizione**:

1. **Desktop** Impostazioni → Sicurezza → Permessi → Abilita audio
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-audio=Y` |

### enable-tunnel

Abilita il tunneling TCP.

**Posizione**:

1. **Desktop** Impostazioni → Sicurezza → Permessi → Abilita tunneling TCP
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-tunnel=Y` |

### enable-remote-restart

Abilita il riavvio dal lato di controllo.

**Posizione**:

1. **Desktop** Impostazioni → Sicurezza → Permessi → Abilita riavvio remoto
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-remote-restart=Y` |

### enable-record-session

Abilita la registrazione delle sessioni.

**Posizione**:

1. **Desktop** Impostazioni → Sicurezza → Permessi → Abilita registrazione sessione
2. **Mobile** Impostazioni → Condividi schermo → Abilita registrazione sessione

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-record-session=Y` |

### enable-block-input

Abilita il lato di controllo per bloccare l'input di altri utenti.

**Posizione**:

1. **Desktop** Impostazioni → Sicurezza → Permessi → Abilita blocco input utente (solo Windows)
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-block-input=Y` |

### allow-remote-config-modification

Consente al lato di controllo di modificare le impostazioni nell'UI RustDesk controllata.

**Posizione**:

1. **Desktop** Impostazioni → Sicurezza → Permessi → Abilita modifica configurazione remota
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-remote-config-modification=Y` |

### enable-lan-discovery

Consente ai peer LAN di scoprirmi.

Dopo la scoperta LAN, [WOL](https://en.wikipedia.org/wiki/Wake-on-LAN) può funzionare se supportato localmente.

**Posizione**:

1. **Desktop** Impostazioni → Sicurezza → Sicurezza → Nega scoperta LAN
2. **Mobile** Impostazioni → Condividi schermo → Nega scoperta LAN

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| Y | Y, N | Y | `enable-lan-discovery=Y` |

### direct-server

Abilita l'accesso IP diretto.

**Posizione**:

1. **Desktop** Impostazioni → Sicurezza → Sicurezza → Abilita accesso IP diretto
2. **Mobile** Impostazioni → Condividi schermo → Accesso IP diretto

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `direct-server=Y` |

### direct-access-port

Porta di accesso IP diretto.

**Posizione**:

1. **Desktop** Impostazioni → Sicurezza → Sicurezza → Porta accesso IP diretto (Mostra se "Abilita accesso IP diretto" è selezionato)
2. **Mobile** Impostazioni → Condividi schermo → Accesso IP diretto

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N |  | 21118 | `direct-access-port=21118` |

### whitelist

Usa whitelist IP.

**Posizione**:

1. **Desktop** Impostazioni → Sicurezza → Sicurezza → Usa whitelist IP
2. **Mobile** Impostazioni → Condividi schermo → Usa whitelist IP

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | `,` o `<ip1>,<ip2>,<ip3>` | `,` significa nessun filtro | `whitelist=,` |

### allow-auto-disconnect & auto-disconnect-timeout

Chiude automaticamente le sessioni in ingresso dopo un periodo di inattività dell'utente.

**Posizione**:

1. **Desktop** Impostazioni → Sicurezza → Sicurezza → Chiudi automaticamente sessioni in ingresso su inattività utente
2. **Mobile** Impostazioni → Condividi schermo → Chiudi automaticamente sessioni in ingresso su inattività utente

| Opzione | Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: | :------: |
| allow-auto-disconnect | N | Y, N | N | `allow-auto-disconnect=Y` |
| auto-disconnect-timeout | N | Timeout in minuti | 10 | `auto-disconnect-timeout=10` |

### allow-only-conn-window-open

Consente la connessione solo se la finestra RustDesk è aperta.

**Posizione**:

1. **Desktop** Impostazioni → Sicurezza → Sicurezza → Consenti connessione solo se la finestra RustDesk è aperta
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-only-conn-window-open=N` |

### approve-mode

Accetta connessioni in ingresso tramite password o clic manuale.

**Posizione**:

1. **Desktop** Impostazioni → Sicurezza → Password → Casella a discesa
2. **Mobile** Condividi schermo → Menu a discesa in alto a destra

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | password, click, password-click | password-click | `approve-mode=password-click` |

### verification-method

Che tipo di password può essere utilizzata, `password temporanea` si riferisce alla password casuale monouso.

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | use-temporary-password, use-permanent-password, use-both-passwords | use-both-passwords | `verification-method=use-permanent-password` |

### temporary-password-length

1. **Desktop** Impostazioni → Sicurezza → Password → Lunghezza password monouso
2. **Mobile** Condividi schermo → Menu a discesa in alto a destra → Lunghezza password monouso

La lunghezza della password temporanea.

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | 6, 8, 10 | 6 | `temporary-password-length=6` |

### proxy-url

L'URL del proxy.

Attualmente supporta `http` e `socks5`.

**Posizione**:

1. **Desktop** Impostazioni → Rete → Proxy → Proxy Socks5/Http(s)
2. **Mobile**

Esempi:

1. **http** `proxy-url=http://192.168.0.2:12345`
2. **https** `proxy-url=https://192.168.0.2:12345`
3. **socks5** `proxy-url=socks5://192.168.0.2:1080`

### proxy-username & proxy-password

Nome utente e password del proxy.

**Posizione**:

1. **Desktop** Impostazioni → Rete → Proxy → Proxy Socks5/Http(s)
2. **Mobile**

| Opzione | Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: | :------: |
| proxy-username | N | | | `proxy-username=user` |
| proxy-password | N | | | `proxy-password=pass` |

## Impostazioni Generali

### theme

Controlla il tema dell'UI del client RustDesk.

**Posizione**:

1. **Desktop** Impostazioni → Generale → Tema
2. **Mobile** Impostazioni → Impostazioni → Tema

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | dark, light, system | system | `theme=system` |

### lang

Controlla la lingua del client RustDesk.

**Posizione**:

1. **Desktop** Impostazioni → Generale → Lingua
2. **Mobile** Impostazioni → Impostazioni → Lingua

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | default, ar, bg, ... | default | `lang=default` |

Le lingue attualmente disponibili sono:

ar, bg, ca, cs, da, de, el, en, eo, es, et, fa, fr, he, hr, hu, id, it, ja, ko, kz, lt, lv, nb, nl, pl, pt, ro, ru, sk, sl, sq, sr, sv, th, tr, uk, vn, zh-cn, zh-tw

Puoi controllare [LANGS](https://github.com/rustdesk/rustdesk/blob/master/src/lang.rs#L45) nel codice per l'elenco delle lingue più recente.

### allow-auto-record-incoming

Registra automaticamente le sessioni in ingresso.

**Posizione**:

1. **Desktop** Impostazioni → Generale → Registrazione → Registra automaticamente sessioni in ingresso
2. **Mobile** Impostazioni → Registrazione → Registra automaticamente sessioni in ingresso

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-incoming=Y` |

### allow-auto-record-outgoing

Registra automaticamente le sessioni in uscita.

**Posizione**:

1. **Desktop** Impostazioni → Generale → Registrazione → Registra automaticamente sessioni in uscita
2. **Mobile** Impostazioni → Registrazione → Registra automaticamente sessioni in uscita

| Installazione richiesta | Valori | Predefinito | Esempio | Versione |
| :------: | :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-outgoing=Y` | >= 1.3.2 |

### video-save-directory

La directory per salvare i video registrati.

**Posizione**:

1. **Desktop** Impostazioni → Generale → Registrazione → Directory salvataggio video
2. **Mobile** Impostazioni → Registrazione

Valori predefiniti:

1. **macOS** ~/Movies/**app_name**
2. **Linux** ~/Videos/**app_name**
3. **Windows** %USERPROFILE%\Videos\\**app_name**
4. **Android** /Storage/emulated/0/**app_name**/ScreenRecord

**Nota**: Sostituisci **app_name** con il nome dell'app corrente.

### enable-confirm-closing-tabs

Controlla se mostrare un dialogo di conferma prima di chiudere tutte le schede remote.

**Posizione**:

1. **Desktop** Impostazioni → Generale → Altro → Conferma prima di chiudere più schede
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-confirm-closing-tabs=Y` |

### enable-abr

Abilita bitrate adattivo.

**Posizione**:

1. **Desktop** Impostazioni → Generale → Altro → Bitrate adattivo
2. **Mobile** Impostazioni → Condividi schermo → Bitrate adattivo (beta)

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-abr=Y` |

### allow-remove-wallpaper

Rimuovi sfondo durante le sessioni in ingresso.

**Posizione**:

1. **Desktop** Impostazioni → Generale → Altro → Rimuovi sfondo durante sessioni in ingresso
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-remove-wallpaper=N` |

### enable-open-new-connections-in-tabs

Controlla se usare una nuova scheda o una nuova finestra per aprire una nuova connessione.

**Posizione**:

1. **Desktop** Impostazioni → Generale → Altro → Apri connessione in nuova scheda
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-open-new-connections-in-tabs=Y` |

### allow-always-software-render

Usa sempre il rendering software.

**Posizione**:

1. **Desktop** Impostazioni → Generale → Altro → Usa sempre rendering software
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-always-software-render=N` |

### allow-linux-headless

Consenti connessione in ingresso se non ci sono display.

Questa opzione richiede ambiente desktop, server Xorg e GDM, vedi [PR 3902](https://github.com/rustdesk/rustdesk/pull/3902).

**Posizione**:

1. **Desktop** Impostazioni → Generale → Altro → Consenti Linux headless
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-linux-headless=N` |

### enable-hwcodec

Abilita codifica hardware per rendere l'immagine più fluida.

**Posizione**:

1. **Desktop**
2. **Mobile** Impostazioni → Codec hardware

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-hwcodec=Y` |

### peer-card-ui-type

Controlla la visualizzazione delle schede peer, include "Tessere grandi", "Tessere piccole" e "Elenco".

**Posizione**:

1. **Desktop** Home → Pannello peer → Icona griglia in alto a destra
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | 0, 1, 2 | 0 | `peer-card-ui-type=0` |

**0** Tessere grandi  
**1** Tessere piccole  
**2** Elenco

### peer-sorting

Controlla l'ordine delle schede peer.

**Posizione**:

1. **Desktop** Home → Pannello peer → Icona ordinamento in alto a destra
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Remote ID, Remote Host, Username | Remote ID | `peer-sorting=Remote ID` |

### sync-ab-with-recent-sessions

Controlla se sincronizzare la rubrica con le sessioni recenti.

**Posizione**:

1. **Desktop** Home → Pannello peer → Rubrica → Tag → Menu a discesa → Sincronizza con sessioni recenti
2. **Mobile** Home → Pannello peer → Rubrica → Tag → Menu a discesa → Sincronizza con sessioni recenti

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-with-recent-sessions=N` |

### sync-ab-tags

Controlla se ordinare i tag della rubrica.

**Posizione**:

1. **Desktop** Home → Pannello peer → Rubrica → Tag → Menu a discesa → Ordina tag
2. **Mobile** Home → Pannello peer → Rubrica → Tag → Menu a discesa → Ordina tag

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-tags=N` |

### filter-ab-by-intersection

Filtra rubrica per intersezione di tag.

**Anteprima**: [PR #5985](https://github.com/rustdesk/rustdesk/pull/5985)

**Posizione**:

1. **Desktop** Home → Pannello peer → Rubrica → Tag → Menu a discesa → Filtra per intersezione
2. **Mobile** Home → Pannello peer → Rubrica → Tag → Menu a discesa → Filtra per intersezione

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `filter-ab-by-intersection=N` |

### use-texture-render

**Posizione**:

**Desktop** Impostazioni → Generale → Altro → Usa rendering texture

Usa il rendering delle texture per rendere le immagini più fluide. Puoi provare a disabilitare questa opzione se riscontri problemi di rendering. Disponibile solo su desktop.

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | linux:Y, macOS:N, win7:N, win10+:Y | `use-texture-render=Y` |

### enable-udp-punch

**Posizione**:

**Desktop** Impostazioni → Generale → Altro → Abilita UDP hole punching
**Mobile** Impostazioni → Abilita UDP hole punching

Disponibile da RustDesk 1.4.1, RustDesk Server Pro 1.6.2

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | Y | `enable-udp-punch=N` |

### enable-ipv6-punch

**Posizione**:

**Desktop** Impostazioni → Generale → Altro → Abilita connessione P2P IPv6
**Mobile** Impostazioni → Generale → Altro → Abilita connessione P2P IPv6

Disponibile da RustDesk 1.4.1, RustDesk Server Pro 1.6.2

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | selfhost:N, altrimenti:Y | `enable-ipv6-punch=N` |

## Impostazioni Display

### view-only

Questa opzione imposterà l'opzione "solo visualizzazione" per ogni peer dopo la prima connessione.

Quindi l'opzione "solo visualizzazione" nelle impostazioni di ogni peer controllerà se la connessione è di sola visualizzazione.

**Posizione**:

1. **Desktop** Impostazioni → Display → Altre opzioni predefinite → Modalità visualizzazione
2. **Mobile** Impostazioni → Impostazioni display → Altre opzioni predefinite → Modalità visualizzazione

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `view-only=Y` |

### show-monitors-toolbar

Controlla se mostrare i monitor nella barra degli strumenti.

![show-monitors-toolbar](/docs/en/self-host/client-configuration/advanced-settings/images/show-monitors-toolbar.png)

**Posizione**:

1. **Desktop** Impostazioni → Display → Altre opzioni predefinite → Mostra barra strumenti monitor
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-monitors-toolbar=Y` |

### collapse-toolbar

Controlla se la barra degli strumenti remota viene compressa dopo la connessione.

**Posizione**:

1. **Desktop** Impostazioni → Display → Altre opzioni predefinite → Comprimi barra strumenti
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `collapse-toolbar=Y` |

### show-remote-cursor

Questa opzione imposterà l'opzione "mostra cursore remoto" per ogni peer dopo la prima connessione.

Quindi l'opzione "mostra cursore remoto" nelle impostazioni di ogni peer controllerà se il cursore remoto viene visualizzato nella pagina di controllo remoto.

**Posizione**:

1. **Desktop** Impostazioni → Display → Altre opzioni predefinite → Mostra cursore remoto
2. **Mobile** Impostazioni → Impostazioni display → Altre opzioni predefinite → Mostra cursore remoto

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-remote-cursor=N` |

### follow-remote-cursor

Questa opzione imposterà l'opzione "segui cursore remoto" per ogni peer dopo la prima connessione.

Quindi l'opzione "segui cursore remoto" nelle impostazioni di ogni peer controllerà se seguire il cursore remoto.

**Anteprima**: [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**Posizione**:

1. **Desktop** Impostazioni → Display → Altre opzioni predefinite → Segui cursore remoto
2. **Mobile** Impostazioni → Impostazioni display → Altre opzioni predefinite → Segui cursore remoto

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-cursor=Y` |

### follow-remote-window

Questa opzione imposterà l'opzione "segui finestra remota" per ogni peer dopo la prima connessione.

Quindi l'opzione "segui finestra remota" nelle impostazioni di ogni peer controllerà se seguire la finestra remota.

**Anteprima**: [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**Posizione**:

1. **Desktop** Impostazioni → Display → Altre opzioni predefinite → Segui focus finestra remota
2. **Mobile** Impostazioni → Impostazioni display → Altre opzioni predefinite → Segui focus finestra remota

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-window=Y` |

### zoom-cursor

Questa opzione imposterà l'opzione "zoom cursore" per ogni peer dopo la prima connessione.

L'opzione "zoom cursore" nelle impostazioni di ogni peer controllerà quindi se il cursore viene ridimensionato in base alla scala dell'immagine corrente.

**Posizione**:

1. **Desktop** Impostazioni → Display → Altre opzioni predefinite → Zoom cursore
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `zoom-cursor=Y` |

### show-quality-monitor

Questa opzione imposterà l'opzione "mostra monitor qualità" per ogni peer dopo la prima connessione.

L'opzione "mostra monitor qualità" nelle impostazioni di ogni peer controllerà quindi se mostrare il monitor della qualità.

**Posizione**:

1. **Desktop** Impostazioni → Display → Altre opzioni predefinite → Mostra monitor qualità
2. **Mobile** Impostazioni → Impostazioni display → Altre opzioni predefinite → Mostra monitor qualità

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-quality-monitor=Y` |

### disable-audio

Questa opzione imposterà l'opzione "disabilita audio" per ogni peer dopo la prima connessione.

L'opzione "disabilita audio" nelle impostazioni di ogni peer controllerà quindi se riprodurre il suono.

**Posizione**:

1. **Desktop** Impostazioni → Display → Altre opzioni predefinite → Muto
2. **Mobile** Impostazioni → Impostazioni display → Altre opzioni predefinite → Muto

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-audio=Y` |

### enable-file-copy-paste

Questa opzione imposterà l'opzione "abilita copia e incolla file" per ogni peer dopo la prima connessione.

L'opzione "abilita copia e incolla file" nelle impostazioni di ogni peer controllerà quindi se abilitare copia e incolla file nella connessione.

**Posizione**:

1. **Desktop** Impostazioni → Display → Altre opzioni predefinite → Abilita copia e incolla file (solo Windows)
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `enable-file-copy-paste=Y` |

### disable-clipboard

Questa opzione imposterà l'opzione "disabilita clipboard" per ogni peer dopo la prima connessione.

L'opzione "disabilita clipboard" nelle impostazioni di ogni peer controllerà quindi se abilitare copia e incolla testo.

**Posizione**:

1. **Desktop** Impostazioni → Display → Altre opzioni predefinite → Disabilita clipboard
2. **Mobile** Impostazioni → Impostazioni display → Altre opzioni predefinite → Disabilita clipboard

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-clipboard=Y` |

### lock-after-session-end

Questa opzione imposterà l'opzione "blocca dopo fine sessione" per ogni peer dopo la prima connessione.

L'opzione "blocca dopo fine sessione" nelle impostazioni di ogni peer controllerà quindi se bloccare la macchina peer dopo la fine della sessione.

**Posizione**:

1. **Desktop** Impostazioni → Display → Altre opzioni predefinite → Blocca dopo fine sessione
2. **Mobile** Impostazioni → Impostazioni display → Altre opzioni predefinite → Blocca dopo fine sessione

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `lock-after-session-end=Y` |

### privacy-mode

Questa opzione imposterà l'opzione "modalità privacy" per ogni peer dopo la prima connessione.

L'opzione "modalità privacy" nelle impostazioni di ogni peer controllerà quindi se usare la modalità privacy dopo la connessione.

**Posizione**:

1. **Desktop** Impostazioni → Display → Altre opzioni predefinite → Modalità privacy
2. **Mobile** Impostazioni → Impostazioni display → Altre opzioni predefinite → Modalità privacy

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `privacy-mode=Y` |

### touch-mode

Questa opzione imposterà l'opzione "modalità touch" per ogni peer dopo la prima connessione.

L'opzione "modalità touch" nelle impostazioni di ogni peer controllerà quindi se usare modalità touch o modalità mouse.

**Posizione**:

1. **Desktop**
2. **Mobile** Impostazioni → Impostazioni display → Altre opzioni predefinite → Modalità touch

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `touch-mode=Y` |

### i444

Questa opzione imposterà l'opzione "i444" per ogni peer dopo la prima connessione.

L'opzione "i444" nelle impostazioni di ogni peer controllerà quindi se usare il colore reale.

**Posizione**:

1. **Desktop** Impostazioni → Display → Altre opzioni predefinite → Colore reale (4:4:4)
2. **Mobile** Impostazioni → Impostazioni display → Altre opzioni predefinite → Colore reale (4:4:4)

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `i444=Y` |

### reverse-mouse-wheel

Questa opzione imposterà l'opzione "inverti rotella mouse" per ogni peer dopo la prima connessione.

L'opzione "inverti rotella mouse" nelle impostazioni di ogni peer controllerà quindi se invertire la rotella del mouse.

**Posizione**:

1. **Desktop** Impostazioni → Display → Altre opzioni predefinite → Inverti rotella mouse
2. **Mobile** Impostazioni → Impostazioni display → Altre opzioni predefinite → Inverti rotella mouse

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `reverse-mouse-wheel=Y` |

### swap-left-right-mouse

Questa opzione imposterà l'opzione "scambia pulsante sinistro-destro mouse" per ogni peer dopo la prima connessione.

L'opzione "scambia pulsante sinistro-destro mouse" nelle impostazioni di ogni peer controllerà quindi se scambiare il pulsante sinistro-destro del mouse.

**Posizione**:

1. **Desktop** Impostazioni → Display → Altre opzioni predefinite → Scambia pulsante sinistro-destro mouse
2. **Mobile** Impostazioni → Impostazioni display → Altre opzioni predefinite → Scambia pulsante sinistro-destro mouse

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `swap-left-right-mouse=Y` |

### displays-as-individual-windows

Questa opzione imposterà l'opzione "display come finestre individuali" per ogni peer dopo la prima connessione.

L'opzione "display come finestre individuali" nelle impostazioni di ogni peer controllerà quindi se mostrare i display come finestre individuali.

**Anteprima**: [PR 5945](https://github.com/rustdesk/rustdesk/pull/5945)

**Posizione**:

1. **Desktop** Impostazioni → Display → Altre opzioni predefinite → Mostra display come finestre individuali
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `displays-as-individual-windows=Y` |

### use-all-my-displays-for-the-remote-session

Questa opzione imposterà l'opzione "use-all-my-displays-for-the-remote-session" per ogni peer dopo la prima connessione.

L'opzione "use-all-my-displays-for-the-remote-session" nelle impostazioni di ogni peer controllerà quindi se utilizzare tutti i miei display per la sessione remota.

**Posizione**:

1. **Desktop** Impostazioni → Display → Altre opzioni predefinite → Usa tutti i miei display per la sessione remota
2. **Mobile** Impostazioni → Impostazioni display → Altre opzioni predefinite → Usa tutti i miei display per la sessione remota

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `use-all-my-displays-for-the-remote-session=Y` |

### view-style

Questa opzione imposterà l'opzione "view-style" per ogni peer dopo la prima connessione.

L'opzione "view-style" nelle impostazioni di ogni peer controllerà quindi lo stile di visualizzazione.

**Posizione**:

1. **Desktop** Impostazioni → Display → Stile visualizzazione predefinito
2. **Mobile** Impostazioni → Impostazioni display → Stile visualizzazione predefinito

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | original, adaptive | original | `view-style=original` |

### scroll-style

Questa opzione imposterà l'opzione "stile scorrimento" per ogni peer dopo la prima connessione.

L'opzione "stile scorrimento" nelle impostazioni di ogni peer controllerà quindi lo stile di scorrimento.

**Posizione**:

1. **Desktop** Impostazioni → Display → Stile scorrimento predefinito
2. **Mobile**

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | scrollauto, scrollbar | scrollauto | `scroll-style=scrollauto` |

### image-quality

Questa opzione imposterà l'opzione "qualità immagine" per ogni peer dopo la prima connessione.

L'opzione "qualità immagine" nelle impostazioni di ogni peer controllerà quindi la qualità dell'immagine.

**Posizione**:

1. **Desktop** Impostazioni → Display → Qualità immagine predefinita
2. **Mobile** Impostazioni → Impostazioni display → Qualità immagine predefinita

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | best, balanced, low, custom | balanced | `image-quality=balanced` |

### custom-image-quality

Questa opzione imposterà l'opzione "qualità immagine personalizzata" per ogni peer dopo la prima connessione.

L'opzione "qualità immagine personalizzata" nelle impostazioni di ogni peer controllerà quindi la qualità dell'immagine se "qualità immagine" è impostata su personalizzata.

**Posizione**:

1. **Desktop** Impostazioni → Display → Qualità immagine predefinita → Personalizzata
2. **Mobile** Impostazioni → Impostazioni display → Qualità immagine predefinita → Personalizzata

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | [10.0, 2000.0] | 50.0 | `custom-image-quality=50` |

### custom-fps

Questa opzione imposterà l'opzione "fps personalizzato" per ogni peer dopo la prima connessione.

L'opzione "fps personalizzato" nelle impostazioni di ogni peer controllerà quindi gli fps se "qualità immagine" è impostata su personalizzata.

**Posizione**:

1. **Desktop** Impostazioni → Display → Qualità immagine predefinita → Personalizzata
2. **Mobile** Impostazioni → Impostazioni display → Qualità immagine predefinita → Personalizzata

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | [5, 120] | 30 | `custom-fps=30` |

### codec-preference

Questa opzione imposterà l'opzione "preferenza codec" per ogni peer dopo la prima connessione.

L'opzione "preferenza codec" nelle impostazioni di ogni peer controllerà quindi il codec per le immagini.

**Attenzione**: le opzioni diverse da "vp8" e "vp9" potrebbero non funzionare. Questo dipende da ciò che la tua macchina supporta.

### terminal-persistent

Questa opzione imposterà l'opzione "terminal-persistent" per ogni peer dopo la prima connessione.

L'opzione "terminal-persistent" nelle impostazioni di ogni peer controllerà quindi se mantenere le sessioni del terminale alla disconnessione.

**Posizione**:

1. **Desktop** Impostazioni → Visualizzazione → Altre opzioni predefinite → Mantieni le sessioni del terminale alla disconnessione
2. **Mobile** Impostazioni → Impostazioni di visualizzazione → Altre opzioni predefinite → Mantieni le sessioni del terminale alla disconnessione

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `terminal-persistent=Y` |

### trackpad-speed

Questa opzione imposterà l'opzione "trackpad-speed" per ogni peer dopo la prima connessione.

L'opzione "trackpad-speed" nelle impostazioni di ogni peer controllerà quindi gli fps se "trackpad-speed" è impostato su personalizzato.

**Posizione**:

1. **Desktop** Impostazioni → Visualizzazione → Velocità predefinita del trackpad
2. **Mobile** Impostazioni → Impostazioni di visualizzazione → Velocità predefinita del trackpad

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | [10, 1000] | 100 | `trackpad-speed=100` |

## Altri

### preset-address-book-name & preset-address-book-tag & preset-address-book-alias & preset-address-book-password & preset-address-book-note

Nome rubrica, tag dispositivo, alias dispositivo, password dispositivo, nota dispositivo preimpostati, https://github.com/rustdesk/rustdesk-server-pro/issues/257.
Puoi impostare preset-address-book-name solo se non vuoi impostare il tag.
Usa un nome e tag rubrica validi nella tua pagina rubrica della console web.

| Opzione | Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: | :------: |
| preset-address-book-name | N | | | `preset-address-book-name=<nome rubrica>` |
| preset-address-book-tag | N | | | `preset-address-book-tag=<nome tag rubrica>` |
| preset-address-book-alias | N | | | `preset-address-book-alias=<alias dispositivo>` |
| preset-address-book-password | N | | | `preset-address-book-password=<password dispositivo>` |
| preset-address-book-note | N | | | `preset-address-book-note=<nota dispositivo>` |

preset-address-book-alias, preset-address-book-password, preset-address-book-note sono disponibili nel client RustDesk >=1.4.3, pro >= 1.6.6.

### disable-group-panel

Disabilita pannello gruppo (accanto al pannello rubrica, è chiamato "Dispositivi accessibili" dalla 1.3.8) sul client RustDesk, https://github.com/rustdesk/rustdesk-server-pro/issues/250.

| Opzione | Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: | :------: |
| disable-group-panel | N | Y, N | N | `disable-group-panel=Y` |

### pre-elevate-service

Elevazione automatica all'esecuzione per Windows portable, https://github.com/rustdesk/rustdesk-server-pro/issues/252.

| Opzione | Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: | :------: |
| pre-elevate-service | N | Y, N | N | `pre-elevate-service=Y` |

### disable-floating-window

Quando il servizio Android si avvia, mostrerà una finestra flottante, che aiuta a prevenire che il sistema termini il servizio RustDesk.

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | N | `disable-floating-window=Y` |

### floating-window-size

Quando il servizio Android si avvia, mostrerà una finestra flottante, che aiuta a prevenire che il sistema termini il servizio RustDesk. Quando la dimensione è inferiore a 120, la finestra flottante sarà difficile da cliccare. Una dimensione molto piccola potrebbe non essere in grado di mantenere il servizio in background su alcuni dispositivi.

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| [32, 320] | 120 | `floating-window-size=120` |

### floating-window-untouchable

Per impostazione predefinita, cliccare sulla finestra flottante farà apparire un menu. Dopo averla impostata come 'intoccabile', cliccare o scorrere passerà attraverso la finestra flottante e sarà trasmesso alla finestra sottostante. Dopo essere stata impostata come 'intoccabile', la posizione della finestra flottante non può essere cambiata, e il sistema potrebbe automaticamente impostare la finestra flottante come semi-trasparente. Tuttavia, questa funzionalità potrebbe non funzionare in un piccolo numero di applicazioni, come l'app GitHub.

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | N | `floating-window-untouchable=Y` |

### floating-window-transparency

Le finestre flottanti Android hanno trasparenza regolabile. Se vuoi abilitare ma nascondere la finestra flottante, puoi impostare la trasparenza a 0, la finestra flottante sarà automaticamente impostata come 'intoccabile' per far passare gli eventi di clic.

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| [0, 10] | 10 | `floating-window-transparency=5` |

### floating-window-svg

Se non è impostata alcuna icona per la finestra flottante Android, mostrerà per impostazione predefinita l'icona RustDesk.
Quando imposti, scrivi il contenuto testuale SVG in una riga, e presta attenzione alle [limitazioni di supporto SVG](https://bigbadaboom.github.io/androidsvg/index.html).

| Predefinito | Esempio |
| :------: | :------: |
| Icona RustDesk | `floating-window-svg=<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1717559129252" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4248" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M950.857143 512c0 242.285714-196.571429 438.857143-438.857143 438.857143S73.142857 754.285714 73.142857 512 269.714286 73.142857 512 73.142857s438.857143 196.571429 438.857143 438.857143z" fill="#1296db" p-id="4249"></path></svg>` |

### keep-screen-on

Questo è per il lato controllato Android. Nota che mantenere lo schermo acceso dipende dalla finestra flottante.

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| never, during-controlled, service-on | during-controlled | `keep-screen-on=never` |

### enable-directx-capture

Questo è per il lato controllato Windows. Se non incontri problemi, si raccomanda di usare le impostazioni predefinite, che danno priorità all'uso di DirectX per gli screenshot invece di usare GDI direttamente.

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | Y | `enable-directx-capture=N` |

### enable-android-software-encoding-half-scale

Questo è per il lato controllato Android. Per impostazione predefinita, quando la risoluzione è maggiore di 1200, la codifica hardware usa la risoluzione originale, mentre la codifica software usa metà risoluzione, poiché la codifica software è più lenta. Questa opzione è usata per impostare se la codifica software dovrebbe essere ridimensionata a metà risoluzione.

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | Y | `enable-android-software-encoding-half-scale=N` |

### allow-remote-cm-modification

Controlla se permettere al lato di controllo di cliccare sulla finestra di gestione connessione per accettare connessioni, cambiare permessi, ecc.

https://github.com/rustdesk/rustdesk/issues/7425

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | N | `allow-remote-cm-modification=Y` |

### remove-preset-password-warning

Controlla se rimuovere l'avviso di sicurezza su GUI quando c'è password preimpostata nel client personalizzato.

https://github.com/rustdesk/rustdesk-server-pro/discussions/286

https://github.com/rustdesk/rustdesk/discussions/7956

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | Y | `remove-preset-password-warning=Y` |

### hide-security-settings / hide-network-settings / hide-server-settings / hide-proxy-settings / hide-websocket-settings / hide-remote-printer-settings

Controlla se nascondere alcune impostazioni. Assicurati che `Disabilita impostazioni` sia spento, altrimenti questi non funzioneranno.

https://github.com/rustdesk/rustdesk-server-pro/issues/263

https://github.com/rustdesk/rustdesk-server-pro/issues/276

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | N | `hide-security-settings=Y` |

### hide-username-on-card

Controlla se mostrare il nome utente nell'elenco dei dispositivi. Perché a volte, il nome utente è troppo lungo, nasconderà le altre informazioni.

https://github.com/rustdesk/rustdesk-server-pro/issues/284#issuecomment-2216521407

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | N | `hide-username-on-card=Y` |

### hide-help-cards

Controlla se mostrare avvisi UAC / permesso su GUI.

https://github.com/rustdesk/rustdesk/issues/8687

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | N | `hide-help-cards=Y` |

### display-name

Cambia il tuo nome visualizzato che sarà mostrato nel popup quando ti connetti al dispositivo remoto. Per impostazione predefinita mostra prima il nome dell'utente loggato, altrimenti mostra il tuo nome utente OS.

https://github.com/rustdesk/rustdesk-server-pro/issues/277

### disable-udp

Controlla se usare solo TCP. Non userà più UDP 21116, TCP 21116 sarà usato invece.

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | N | `disable-udp=Y` |

### preset-user-name / preset-strategy-name / preset-device-group-name / preset-device-username / preset-device-name / preset-note

Assegna utente / strategia / gruppo dispositivo / nome utente dispositivo / nome dispositivo(hostname) / nota al dispositivo. Puoi anche farlo tramite [riga di comando](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/#assign-device-usersgroupsstrategies-to-devices).

https://github.com/rustdesk/rustdesk-server-pro/discussions/304

gruppo dispositivo è disponibile nel client RustDesk >=1.3.8, pro >= 1.5.0

preset-device-username, preset-device-name, preset-note sono disponibili nel client RustDesk >=1.4.3, pro >= 1.6.6.

### default-connect-password

Usi la `password di connessione predefinita` per stabilire connessioni ai dispositivi remoti. Questa password è configurata sul lato di controllo e non deve essere confusa con alcuna [password preimpostata](https://github.com/rustdesk/rustdesk/wiki/FAQ#how-can-we-set-up-a-client-with-a-fixed-password-for-unattended-remote-access) trovata sul client controllato (solo in ingresso).

es. `default-connect-password=abcd1234`

### enable-trusted-devices

Consenti ai dispositivi fidati di saltare la verifica 2FA.

https://github.com/rustdesk/rustdesk/discussions/8513#discussioncomment-10234494

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | Y | `enable-trusted-devices=N` |

### hide-tray

Disabilita l'icona della barra delle applicazioni nel vassoio di sistema.

https://github.com/rustdesk/rustdesk-server-pro/issues/332

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | N | `hide-tray=Y` |

### one-way-clipboard-redirection

Disabilita sincronizzazione clipboard dal lato controllato al lato di controllo, disponibile nel client RustDesk >=1.3.1 (lato controllato)

https://github.com/rustdesk/rustdesk/discussions/7837

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | N | `one-way-clipboard-redirection=Y` |

### one-way-file-transfer

Disabilita trasferimento file dal lato controllato al lato di controllo, disponibile nel client RustDesk >=1.3.1 (lato controllato)

https://github.com/rustdesk/rustdesk/discussions/7837

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | N | `one-way-file-transfer=Y` |

### sync-init-clipboard

Se sincronizzare clipboard iniziale quando si stabilisce la connessione (solo dal lato di controllo al lato controllato), disponibile nel client RustDesk >=1.3.1 (lato di controllo)

https://github.com/rustdesk/rustdesk/discussions/9010

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | N | `sync-init-clipboard=Y` |

### allow-logon-screen-password

Se permettere input password sulla schermata di accesso quando si usa [modalità approvazione solo clic](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#approve-mode), disponibile nel client RustDesk >=1.3.1 (lato controllato)

https://github.com/rustdesk/rustdesk/discussions/9269

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | N | `allow-logon-screen-password=Y` |

### allow-https-21114

Tipicamente, HTTPS usa la porta 443. Quando la porta del server API è erroneamente impostata su 21114, il client RustDesk rimuoverà per impostazione predefinita l'impostazione porta 21114. Impostare l'opzione su Y consente l'uso di 21114 come porta HTTPS. Disponibile nel client RustDesk >=1.3.9.

https://github.com/rustdesk/rustdesk-server-pro/discussions/570

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | N | `allow-https-21114=Y` |

### allow-d3d-render

Il rendering D3D può ottenere FPS alto e ridurre l'uso cpu, ma lo schermo di controllo remoto potrebbe essere nero su alcuni dispositivi. Disponibile nel client RustDesk >=1.3.9, solo windows.

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | N | `allow-d3d-render=Y` |

### allow-hostname-as-id

[Usa hostname come id](https://github.com/rustdesk/rustdesk-server-pro/discussions/483), gli spazi nell'hostname sono sostituiti con '-'. Questo non è garantito al 100% e si verifica solo la prima volta che il client RustDesk viene eseguito (cioè su un client appena installato); se si verifica un conflitto, verrà assegnato un ID casuale.

Disponibile nel client RustDesk versione 1.4.0 e successive.

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | N | `allow-hostname-as-id=Y` |

### allow-websocket

Usa protocollo WebSocket per connettere server e client. Disponibile solo nel client RustDesk >=1.4.0 e server Pro >= 1.5.7. Nota che WebSocket supporta solo connessione relay.

Per far funzionare WebSocket, devi configurare correttamente il tuo proxy inverso, https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | N | `allow-websocket=Y` |

### allow-numeric-one-time-password

Questa opzione abilita o disabilita l'uso di password monouso solo numeriche.
Disponibile solo nel client RustDesk >=1.4.1 e server Pro >= 1.5.9.

**Discussione**: https://github.com/rustdesk/rustdesk-server-pro/discussions/685

**Anteprima**: https://github.com/rustdesk/rustdesk/pull/11846

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | N | `allow-numeric-one-time-password=Y` |

### register-device

Non registrare il dispositivo, non lo vedrai nella pagina dispositivi sulla console web.

**Disponibile solo nel server Pro >= 1.6.0 e richiede [licenza custom2](https://rustdesk.com/pricing#custom2) e numero di connessioni contemporanee >= 2.**

Se `register-device=N`, quanto segue non funzionerà per questo dispositivo.
- Login
- Comando `--assign`
- `preset-address-book-name`, `preset-address-book-tag`, `preset-address-book-alias`, `preset-address-book-password`, `preset-address-book-note` `preset-user-name`, `preset-strategy-name`, `preset-device-group-name`, `preset-device-username`, `preset-device-name`, `preset-note`
- Log di audit
- Strategia

**Discussione**: https://github.com/rustdesk/rustdesk-server-pro/discussions/672 e https://github.com/rustdesk/rustdesk-server-pro/discussions/182

| Valori | Predefinito | Esempio |
| :------: | :------: | :------: |
| Y, N | Y | `register-device=N` |

### main-window-always-on-top

Mantieni sempre la finestra principale in primo piano.

**Discussione**: https://github.com/rustdesk/rustdesk-server-pro/issues/761

Disponibile solo nel client RustDesk 1.4.2.

| Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `main-window-always-on-top=N` |

### relay-server

https://github.com/rustdesk/rustdesk-server-pro/issues/776#issuecomment-3306524913

### disable-discovery-panel

Disabilita il pannello "Rilevato" (accanto al pannello "Preferiti") sul client RustDesk.

| Opzione | Installazione richiesta | Valori | Predefinito | Esempio |
| :------: | :------: | :------: | :------: |
| disable-discovery-panel | N | Y, N | N | `disable-discovery-panel=Y` |
