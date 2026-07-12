---
publishDate: 2026-07-09T08:32:00Z
lang: 'it'
translationKey: 'rustdesk-for-linux'
draft: false
title: 'RustDesk per Linux: il desktop remoto open source'
excerpt: 'Installa ed esegui RustDesk su Linux: .deb, .rpm, Flatpak e AppImage, X11 contro Wayland, accesso headless e non presidiato, e self-hosting del server.'
image: '~/assets/images/blog/rustdesk-for-linux-og.png'
category: 'Guide'
tags: ['RustDesk', 'Linux', 'Self-hosting']
author: 'RustDesk Team'
slug: 'rustdesk-per-linux-il-desktop-remoto-open-source'
faq:
  - question: 'RustDesk funziona su Wayland?'
    answer: "Sì — RustDesk offre uno dei supporti Wayland più solidi tra tutti gli strumenti di desktop remoto, inclusa la condivisione multi-monitor aggiunta nella versione 1.4.3. Su Wayland cattura lo schermo tramite PipeWire e il portale desktop XDG, che mostra una finestra di dialogo per il consenso in cui scegliere quale display condividere — nella maggior parte dei casi la scelta viene ricordata, quindi non ti verrà richiesta di nuovo — e funziona all'interno della sessione grafica attiva in cui hai già effettuato l'accesso. Questo passaggio di consenso è una caratteristica di sicurezza propria di Wayland, condivisa da tutte le app di condivisione dello schermo. Per macchine che richiedono l'accesso prima del login o completamente non presidiato, oggi si usa la configurazione headless con display virtuale (oppure una sessione X11 dove una distribuzione la offre ancora, dato che diverse stanno passando a Wayland esclusivamente); il supporto completo alla cattura Wayland non presidiata è in fase di sviluppo attivo (vedi github.com/rustdesk/rustdesk/pull/15420)."
  - question: 'Quale pacchetto devo installare su Linux?'
    answer: "Usa il .deb su Debian, Ubuntu e Linux Mint, il .rpm su Fedora, RHEL e openSUSE, il Flatpak da Flathub per una build sandboxed e ampiamente compatibile, oppure l'AppImage portatile come alternativa a file singolo. I pacchetti .deb e .rpm registrano e avviano un servizio systemd, così RustDesk sopravvive ai riavvii; Flatpak e AppImage non lo fanno per impostazione predefinita."
  - question: 'Perché la mia macchina Linux headless mostra uno schermo nero?'
    answer: "Senza un monitor collegato, X o Wayland non allocano mai un framebuffer, quindi non c'è nulla che RustDesk possa catturare e il visualizzatore mostra uno schermo nero o in attesa dell'immagine. Collega un dummy plug HDMI/DisplayPort, configura un display virtuale come xserver-xorg-video-dummy o VKMS, oppure attiva la modalità headless opzionale di RustDesk per Linux in modo che un display virtuale venga creato automaticamente."
  - question: 'Posso eseguire il self-hosting del server RustDesk su Linux?'
    answer: 'Sì. Il server RustDesk (i processi hbbs per ID/rendezvous e hbbr per il relay) è progettato per Linux ed è il modo standard per eseguirlo. Il server community open source gratuito funziona a tempo indeterminato senza alcun costo, mentre Server Pro aggiunge una console web, gruppi di dispositivi e un generatore di client personalizzati. Entrambi si installano su una normale VM Linux o su un host bare-metal.'
metadata:
  description: "RustDesk su Linux, dall'inizio alla fine: scelta del pacchetto per ogni distribuzione e scheda ARM, cattura Wayland e X11, configurazione headless ed esecuzione del proprio server."
  keywords: 'RustDesk per Linux, RustDesk Ubuntu, RustDesk Wayland, RustDesk X11, installazione RustDesk Linux'
---

Gli utenti Linux non hanno mai avuto una vasta scelta di buoni strumenti di desktop remoto, e quelli esistenti sono perlopiù prodotti commerciali closed source oppure stack VNC ormai datati. RustDesk si colloca in una posizione diversa: è un client di desktop remoto open source con licenza AGPL, funziona nativamente su tutte le principali distribuzioni e può essere puntato verso un server che ospiti tu stesso. Questa combinazione — codice verificabile, client nativo per Linux e infrastruttura self-hostable — è il motivo per cui RustDesk è diventato una delle risposte di riferimento quando si cerca un desktop remoto open source per Linux.

Questa guida illustra come installarlo, l'aspetto che manda in confusione praticamente tutti (X11 contro Wayland), come ottenere l'accesso non presidiato e headless, e dove si inserisce il server in tutto questo.

## Installare RustDesk su Linux

RustDesk fornisce pacchetti per tutti i formati di packaging Linux più comuni, quindi raramente è necessario compilare dal sorgente. Scarica la release corrente dalla [pagina delle release di RustDesk su GitHub](https://github.com/rustdesk/rustdesk/releases) oppure dalla [documentazione di installazione per Linux](https://rustdesk.com/docs/en/client/linux/) e scegli il formato adatto alla tua distribuzione.

| Formato  | Ideale per                    | Avvia automaticamente un servizio? | Note                                                                                                        |
| -------- | ----------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `.deb`   | Debian, Ubuntu, Linux Mint    | Sì (systemd)                       | `sudo apt install ./rustdesk-*.deb`                                                                         |
| `.rpm`   | Fedora, RHEL/CentOS, openSUSE | Sì (systemd)                       | `sudo dnf install ./rustdesk-*.rpm`                                                                         |
| Flatpak  | Qualsiasi distro, sandboxed   | No                                 | `flatpak install flathub com.rustdesk.RustDesk` ([Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) |
| AppImage | Qualsiasi distro, portatile   | No                                 | Potrebbe richiedere `libfuse2` su Ubuntu recenti; `chmod +x` poi esegui                                     |
| AUR      | Arch, Manjaro                 | Dipende dal pacchetto              | Mantenuto dalla community (`rustdesk-bin`, `rustdesk-appimage`)                                             |

I pacchetti `.deb` e `.rpm` sono quelli da usare se vuoi che RustDesk funzioni come servizio in background che sopravvive ai riavvii — entrambi registrano e avviano automaticamente un'unità systemd. Il Flatpak (`com.rustdesk.RustDesk` su [Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) è una build sandboxed comoda per l'uso desktop, ma non installa un servizio di sistema per impostazione predefinita. Per una distribuzione che RustDesk non pacchettizza direttamente, punta prima sul **Flatpak** — dato che include il proprio runtime, tende a essere l'opzione più ampiamente compatibile. L'AppImage è un'alternativa portatile a file singolo, ma in pratica la sua compatibilità è più incostante (per esempio potrebbe richiedere `libfuse2` su Ubuntu recenti).

In pratica RustDesk viene usato su Ubuntu, Debian, Fedora, RHEL/CentOS, openSUSE, Arch e NixOS, con build per **x86_64, ARM64 (aarch64) e ARM32 (ARMv7)** — quindi funziona sia su schede e server ARM sia su PC standard.

## X11 contro Wayland: la parte che conta davvero

Questo è l'aspetto singolarmente più importante da capire su RustDesk su Linux, perché determina se il controllo remoto "funziona subito" oppure richiede prima una piccola modifica di configurazione.

**X11 (Xorg): il percorso di cattura più diretto, dove la tua distribuzione lo offre ancora.** Con X11, RustDesk legge il framebuffer direttamente e inietta l'input direttamente, quindi la cattura e il controllo di mouse/tastiera sono più diretti possibile e i cambi di monitor vengono rilevati dinamicamente. Molti display manager permettono ancora di scegliere "Xorg"/"X11" da un menu a forma di ingranaggio nella schermata di accesso. Tieni presente, però, che diverse distribuzioni stanno passando a Wayland esclusivamente ed eliminando la sessione X11 — quindi considera X11 una comodità disponibile dove capita, non qualcosa su cui progettare il tuo deployment.

**Wayland: RustDesk offre probabilmente il supporto più solido tra tutti gli strumenti di desktop remoto.** RustDesk supporta Wayland dalla versione 1.2.0 e continua ad ampliarne il supporto. Poiché i compositor Wayland non consentono l'accesso diretto al framebuffer, RustDesk cattura lo schermo tramite il servizio `xdg-desktop-portal` e [PipeWire](https://deepwiki.com/rustdesk/rustdesk/6.3.1-wayland-support), e inietta l'input tramite il modulo del kernel `uinput`. Dal design stesso di Wayland derivano due conseguenze — che si applicano a ogni strumento di condivisione schermo su Wayland, non solo a RustDesk:

- **Consenso per ogni connessione.** Il portale mostra una finestra di dialogo che chiede di selezionare quale display condividere. Si tratta di una funzione di sicurezza voluta da Wayland, non di un bug di RustDesk — un'app in background non può iniziare a registrare lo schermo di nascosto. Il Portal v4 e versioni successive supportano un "restore token" che evita di richiedere il consenso ogni singola volta, ma la prima condivisione richiede comunque un clic sullo schermo.
- **Solo sessione attiva.** La cattura su Wayland è legata alla sessione grafica con accesso già effettuato. La cattura della schermata di login (greeter) di Wayland non è ancora supportata — è in fase di sviluppo attivo ([PR #15420](https://github.com/rustdesk/rustdesk/pull/15420)). Per l'accesso prima del login, oggi si usa la configurazione headless/display virtuale descritta più avanti, oppure una sessione X11 sulle distribuzioni che ne offrono ancora una.

Il supporto a Wayland continua a migliorare — RustDesk 1.4.3 (ottobre 2025), per esempio, [ha aggiunto la condivisione multi-monitor per Wayland](https://ubuntuhandbook.org/index.php/2025/10/rustdesk-released-1-4-3-with-multi-monitor-for-wayland-virtual-mouse/). Ma se ti connetti e vedi uno schermo nero su una macchina Wayland, quasi sempre il problema è che il percorso portal/PipeWire non è soddisfatto. Il nostro approfondimento dedicato a [RustDesk connesso ma in attesa dell'immagine](/it/blog/rustdesk-connesso-in-attesa-dellimmagine-guida-completa-alla-risoluzione) analizza nello specifico il caso dello schermo nero su Wayland.

## Accesso non presidiato su Linux

Per accesso non presidiato si intende la connessione a una macchina senza nessuno seduto davanti — lo scenario classico del supporto remoto. Su Linux la procedura è:

1. Installa tramite `.deb` o `.rpm` in modo che il servizio systemd venga registrato, oppure fai clic su **Abilita servizio** nell'app.
2. In RustDesk, imposta una **password permanente** complessa nelle impostazioni di connessione (e idealmente attiva l'autenticazione a due fattori).
3. Per l'accesso prima del login o tra un login utente e l'altro, usa la configurazione headless con display virtuale descritta più avanti (qui si applica il limite della schermata di login di Wayland trattato sopra).

Una realtà di Wayland di cui tenere conto: il portale basato sul consenso descritto nella sezione su Wayland rende la cattura completamente non presidiata più difficile rispetto a X11, almeno finché il supporto non presidiato in sviluppo non sarà disponibile — quindi per le macchine non presidiate pianifica la configurazione headless con display virtuale.

## Linux headless: server senza monitor

Un caso d'uso molto comune su Linux è una macchina senza alcun display collegato — un server domestico, una macchina da laboratorio, una VM. In questo caso il problema non è RustDesk, ma lo stack grafico: senza un monitor collegato, X o Wayland non allocano mai un framebuffer, quindi non c'è letteralmente nessuna immagine da catturare e il risultato è uno schermo nero.

Tre modi per dargli qualcosa da renderizzare:

- **Un dummy plug** — un economico dongle fisico HDMI/DisplayPort "headless" che fa credere alla GPU che un monitor sia collegato.
- **Un driver di display virtuale** — `xserver-xorg-video-dummy` su X11, oppure un'opzione a livello kernel come VKMS.
- **La modalità headless opzionale di RustDesk** — attivala con `sudo rustdesk --option allow-linux-headless Y`. Secondo la [wiki Headless Linux Support](https://github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support) è disattivata per impostazione predefinita, testata principalmente su Ubuntu con GNOME, e richiede pacchetti come `xserver-xorg-video-dummy` e `lightdm`. Puoi recuperare l'ID della macchina con `sudo rustdesk --get-id` e impostare una password con `sudo rustdesk --password <password>`.

La modalità headless presenta ancora alcune asperità, quindi trattala come "funziona, ma con attenzione" piuttosto che come una soluzione chiavi in mano.

## Self-hosting del server RustDesk su Linux

Tutto quanto sopra riguarda il _client_. L'altra metà della storia di RustDesk su Linux è che il **server** — il servizio `hbbs` per ID/rendezvous e il relay `hbbr` — è un'applicazione nativa per Linux, di cui Linux è l'ambiente naturale. È questo che ti permette di mantenere la mediazione delle sessioni e il traffico di relay sulla tua infrastruttura, invece di instradarlo attraverso il cloud di un fornitore.

Hai due opzioni. Il **server community** open source gratuito funziona a tempo indeterminato senza alcun costo e copre la funzione principale di connessione e relay. **RustDesk Server Pro** aggiunge una console web self-hosted, gruppi di dispositivi, una rubrica condivisa, un generatore di client con branding personalizzato, e [LDAP/Active Directory e SSO OIDC](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/ldap/). Inoltre non sei obbligato a usare Docker — vedi [eseguire Server Pro senza Docker](https://rustdesk.com/docs/it/self-host/rustdesk-server-pro/installscript/) per un'installazione su normale VM o bare-metal. Se stai dimensionando l'hardware per una flotta di grandi dimensioni, pianifica la capacità in base al tuo profilo reale di concorrenza e di relay prima di impegnarti.

Una nota sul self-hosting: il server community gratuito e Server Pro sono tuoi da gestire, aggiornare e proteggere. I requisiti hardware sono contenuti e, una volta configurato, la manutenzione è leggera — e il supporto RustDesk può aiutarti in caso di domande. Questa proprietà è proprio il punto centrale. (Anche la licenza di Server Pro richiede un percorso in uscita verso rustdesk.com per attivarsi e restare valida.)

## Per iniziare

Installa il pacchetto per la tua distribuzione, imposta una password permanente per l'accesso non presidiato e — se sei qui per motivi di sovranità dei dati — attiva il server community gratuito. Per i dettagli aggiornati sui piani, [rustdesk.com/pricing](https://rustdesk.com/pricing) è il riferimento ufficiale, mentre [sales@rustdesk.com](mailto:sales@rustdesk.com) può illustrarti Server Pro. Vuoi prima vederlo in azione? [Guarda RustDesk in azione](https://www.youtube.com/@rustdesk).
