---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-07-09T08:32:00Z
lang: 'it'
translationKey: 'rustdesk-for-linux'
draft: false
title: 'RustDesk per Linux: il desktop remoto open source'
excerpt: 'Installa ed esegui RustDesk su Linux: .deb, .rpm, Flatpak e AppImage, X11 contro Wayland, accesso headless e non presidiato, e self-hosting del server.'
image: '~/assets/images/blog/rustdesk-for-linux-og.webp'
category: 'Guide'
tags: ['RustDesk', 'Linux', 'Self-hosting']
author: 'RustDesk Team'
slug: 'rustdesk-per-linux-il-desktop-remoto-open-source'
faq:
  - question: 'RustDesk funziona su Wayland?'
    answer: 'Sì. Le build standard di RustDesk catturano i desktop Wayland tramite PipeWire e xdg-desktop-portal in una sessione con utente connesso, anche con più monitor dalla versione 1.4.3. Il portale chiede il consenso alla condivisione dello schermo, e dalla versione 4 del portale la scelta può essere ricordata. Una build di anteprima separata aggiunge l''accesso non presidiato e l''accesso alla schermata di login dopo un riavvio, per sistemi x86_64 basati su Debian/Ubuntu.'
  - question: 'Quale pacchetto devo installare su Linux?'
    answer: 'Usa il .deb su Debian, Ubuntu e Linux Mint, il .rpm su Fedora, RHEL e openSUSE, il Flatpak da Flathub per una build in sandbox e ampiamente compatibile, oppure l''AppImage portatile come alternativa a file singolo. I pacchetti .deb e .rpm registrano e avviano un servizio systemd, così RustDesk resta attivo dopo i riavvii; Flatpak e AppImage non lo fanno per impostazione predefinita.'
  - question: 'Perché la mia macchina Linux headless mostra uno schermo nero?'
    answer: 'Di solito perché la macchina Linux headless non ha un display attivo che RustDesk possa catturare. Senza monitor, spesso lo stack grafico non espone alcuna uscita, quindi la sessione si connette ma mostra uno schermo nero o in attesa dell''immagine. Collega un dummy plug HDMI o DisplayPort, oppure configura un display virtuale come xserver-xorg-video-dummy su X11, poi riconnettiti.'
  - question: 'Posso fare il self-hosting del server RustDesk su Linux?'
    answer: 'Sì. Il server RustDesk (i processi hbbs per ID/rendezvous e hbbr per il relay) è pensato per Linux, e Linux è il modo standard per eseguirlo. RustDesk Server OSS (il server community gratuito) non ha canone di licenza né scadenza, e Server Pro aggiunge una console web, gruppi di dispositivi e un generatore di client personalizzati. Entrambi si installano su una normale VM Linux o su un host bare-metal.'
metadata:
  description: 'RustDesk su Linux dall''inizio alla fine: pacchetti per ogni distribuzione e scheda ARM, cattura Wayland e X11, configurazione headless e server in proprio.'
  keywords: 'RustDesk per Linux, RustDesk Ubuntu, RustDesk Wayland, RustDesk X11, installazione RustDesk Linux'
---

RustDesk è un desktop remoto open source per Linux. Il client e RustDesk Server OSS (il server community gratuito) hanno licenza AGPL, i pacchetti nativi coprono le principali distribuzioni e puoi configurare ogni client sui servizi ID/rendezvous e relay che ospiti tu stesso. Server Pro è un software server self-hosted commerciale e proprietario che aggiunge una console web e la gestione centralizzata. Codice verificabile, un client Linux nativo e un'infrastruttura che puoi ospitare in proprio: ecco perché RustDesk è una risposta frequente quando qualcuno cerca un desktop remoto open source per Linux.

Questa guida spiega come installarlo, l'aspetto che manda in confusione praticamente tutti (X11 contro Wayland), come far funzionare l'accesso non presidiato e headless, e qual è il ruolo del server.

## Installare RustDesk su Linux

RustDesk fornisce pacchetti per tutti i formati di pacchettizzazione Linux più comuni, quindi raramente devi compilare dal sorgente. Scarica la release corrente dalla [pagina delle release di RustDesk su GitHub](https://github.com/rustdesk/rustdesk/releases) oppure dalla [documentazione di installazione per Linux](https://rustdesk.com/docs/it/client/linux/) e scegli il formato adatto alla tua distribuzione.

| Formato  | Ideale per                       | Avvia automaticamente un servizio? | Note                                                                                                        |
| -------- | -------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `.deb`   | Debian, Ubuntu, Linux Mint       | Sì (systemd)                       | `sudo apt install ./rustdesk-*.deb`                                                                         |
| `.rpm`   | Fedora, RHEL/CentOS, openSUSE    | Sì (systemd)                       | `sudo dnf install ./rustdesk-*.rpm`                                                                         |
| Flatpak  | Qualsiasi distro, in sandbox     | No                                 | `flatpak install flathub com.rustdesk.RustDesk` ([Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) |
| AppImage | Qualsiasi distro, portatile      | No                                 | Su Ubuntu recenti può richiedere `libfuse2`; `chmod +x` e poi esegui                                        |
| AUR      | Arch, Manjaro                    | Dipende dal pacchetto              | Mantenuto dalla community (`rustdesk-bin`, `rustdesk-appimage`)                                             |

I pacchetti `.deb` e `.rpm` sono quelli da usare se vuoi che RustDesk giri come servizio in background e resti attivo dopo i riavvii: entrambi registrano e avviano automaticamente un'unità systemd. Il Flatpak (`com.rustdesk.RustDesk` su [Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) è una build in sandbox comoda per l'uso desktop, ma per impostazione predefinita non installa un servizio di sistema. Per una distribuzione che RustDesk non pacchettizza direttamente, prova prima il **Flatpak**: poiché include il proprio runtime, tende a essere l'opzione più compatibile. L'AppImage è un'alternativa portatile a file singolo, ma nella pratica la sua compatibilità è più incostante (ad esempio, su Ubuntu recenti può richiedere `libfuse2`).

Nella pratica RustDesk si usa su Ubuntu, Debian, Fedora, RHEL/CentOS, openSUSE, Arch e NixOS, con build per **x86_64, ARM64 (aarch64) e ARM32 (ARMv7)**, quindi funziona su schede e server ARM oltre che sui normali PC.

## X11 contro Wayland: la parte che conta davvero

È l'aspetto più importante da capire su RustDesk per Linux, perché determina se il controllo remoto funziona subito oppure richiede prima una piccola modifica di configurazione.

**X11 (Xorg): il percorso di cattura più diretto, dove la tua distribuzione lo offre ancora.** Con X11, RustDesk legge direttamente il framebuffer e inietta direttamente l'input, quindi cattura e controllo di mouse e tastiera sono il più diretti possibile e i cambi di monitor vengono rilevati dinamicamente. Molti display manager permettono ancora di scegliere «Xorg»/«X11» da un menu a forma di ingranaggio nella schermata di accesso. Tieni presente, però, che diverse distribuzioni stanno passando al solo Wayland e abbandonando la sessione X11: considera quindi X11 una comodità dove capita di averlo, non una base su cui progettare la tua installazione.

**Wayland: supportato nelle build standard, con un'anteprima per l'accesso non presidiato.** Poiché i compositor Wayland non consentono l'accesso diretto al framebuffer, le build standard di RustDesk catturano lo schermo tramite `xdg-desktop-portal` e [PipeWire](https://deepwiki.com/rustdesk/rustdesk/6.3.1-wayland-support) nella sessione con utente connesso, e iniettano l'input tramite il modulo `uinput` del kernel. RustDesk 1.4.3 (ottobre 2025) [ha aggiunto la condivisione multi-monitor per Wayland](https://ubuntuhandbook.org/index.php/2025/10/rustdesk-released-1-4-3-with-multi-monitor-for-wayland-virtual-mouse/). Un'[anteprima separata per l'accesso non presidiato su Wayland](/it/blog/unattended-remote-access-wayland-it) aggiunge l'accesso non presidiato e l'accesso alla schermata di login dopo un riavvio, per **sistemi x86_64 basati su Debian/Ubuntu**.

- **Consenso all'avvio della condivisione.** Il portale mostra una finestra di dialogo che chiede quale display condividere. È una funzione di sicurezza di Wayland, non un bug di RustDesk: un'app in background non può iniziare a registrare lo schermo di nascosto. Dalla versione 4 il portale supporta un «restore token», quindi il consenso non viene richiesto a ogni connessione.
- **Accesso alla schermata di login.** Le build standard catturano la sessione con utente connesso. Per la schermata di accesso (greeter) dopo un riavvio, usa l'anteprima non presidiata su sistemi x86_64 basati su Debian/Ubuntu, oppure un greeter X11 dove la tua distribuzione lo offre ancora.

Se ti connetti a una macchina Wayland con una build standard e vedi uno schermo nero, di solito il percorso portale/PipeWire non è soddisfatto: la richiesta non è stata accettata, oppure `xdg-desktop-portal` o PipeWire non sono in esecuzione. La nostra guida a [RustDesk «Connesso, in attesa dell'immagine»](/it/blog/rustdesk-connesso-in-attesa-dellimmagine-guida-completa-alla-risoluzione) analizza il caso Wayland.

## Accesso non presidiato su Linux

Per accesso non presidiato si intende la connessione a una macchina senza nessuno seduto davanti: lo scenario classico dell'assistenza remota. Su Linux la procedura è questa:

1. Installa tramite `.deb` o `.rpm`, così il servizio systemd viene registrato, oppure fai clic su **Abilita servizio** (Enable service) nell'app.
2. Imposta una **password permanente** robusta in **Impostazioni → Sicurezza**. La modalità di approvazione predefinita la accetta già; aggiungi la 2FA per le connessioni al dispositivo controllato come secondo fattore. Vedi la [guida alla configurazione dell'accesso non presidiato](/it/blog/accesso-non-presidiato-con-rustdesk-guida-alla-configurazione).
3. Per l'accesso prima del login su Wayland, usa l'[anteprima per l'accesso non presidiato su Wayland](/it/blog/unattended-remote-access-wayland-it) su sistemi x86_64 basati su Debian/Ubuntu, oppure configura il greeter del display manager perché usi X11 dove supportato. Scegliere una sessione desktop X11 influisce solo sulla sessione successiva al login.

## Linux headless: server senza monitor

Un caso d'uso comune su Linux è una macchina senza alcun display collegato: un server domestico, una macchina di laboratorio, una VM. Senza monitor, spesso lo stack grafico non espone alcuna uscita attiva, quindi non c'è un'immagine da catturare e ottieni uno schermo nero.

Due modi per dargli qualcosa da visualizzare:

- **Un dummy plug**: un economico dongle fisico HDMI/DisplayPort «headless» che fa credere alla GPU che sia collegato un monitor.
- **Un driver di display virtuale**: `xserver-xorg-video-dummy` su X11, oppure un'opzione a livello di kernel come VKMS.

## Self-hosting del server RustDesk su Linux

Tutto quanto sopra riguarda il _client_. L'altra metà della storia di RustDesk su Linux è che il **server**, cioè il servizio `hbbs` per ID/rendezvous e il relay `hbbr`, è un'applicazione nativa per Linux, e Linux è il suo ambiente naturale. È questo che ti permette di mantenere la mediazione delle sessioni e il traffico inoltrato su un'infrastruttura di tua proprietà, invece di farli passare dal cloud di un fornitore.

Hai due opzioni. **Server OSS** è gratuito, senza canone di licenza né scadenza, e copre la funzione essenziale di connessione e relay. **RustDesk Server Pro** aggiunge una console web self-hosted, gruppi di dispositivi e una rubrica condivisa e, dal piano Basic in su, anche un generatore di client personalizzati con il tuo marchio e [LDAP/Active Directory e SSO OIDC](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/ldap/). Non sei nemmeno obbligato a usare Docker: vedi [eseguire Server Pro senza Docker](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/installscript/) per un'installazione su una normale VM o su bare metal.

Una nota sul self-hosting: Server OSS e Server Pro li gestisci, aggiorni e proteggi tu. I [requisiti hardware sono molto bassi](https://rustdesk.com/docs/it/self-host/rustdesk-server-oss/install/) (per Server OSS basta un server cloud di base o persino un Raspberry Pi); dimensiona in base ai dispositivi online e al traffico inoltrato dal relay, e assegna a qualcuno aggiornamenti, monitoraggio e backup. I piani a pagamento includono il supporto. (Server Pro verifica inoltre la licenza tramite HTTPS in uscita circa una volta al giorno, quindi deve poter raggiungere rustdesk.com.)

## Per iniziare

Installa il pacchetto per la tua distribuzione, imposta una password permanente per l'accesso non presidiato e, se sei qui per la sovranità dei dati, avvia Server OSS. Per i dettagli aggiornati sui piani il riferimento è [rustdesk.com/pricing](https://rustdesk.com/pricing), mentre [sales@rustdesk.com](mailto:sales@rustdesk.com) può parlarti di Server Pro. Vuoi prima vederlo all'opera? [Guarda RustDesk in azione](https://www.youtube.com/@rustdesk).
